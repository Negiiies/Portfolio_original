'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const TOTAL_FRAMES = 60;
const FRAME_PATH = (i: number) =>
  `/images/bust-frames/frame_${String(i).padStart(3, '0')}.jpg`;

async function removeBackground(img: HTMLImageElement): Promise<ImageBitmap> {
  const oc = new OffscreenCanvas(img.naturalWidth, img.naturalHeight);
  const cx = oc.getContext('2d')!;
  cx.drawImage(img, 0, 0);
  const id = cx.getImageData(0, 0, oc.width, oc.height);
  const d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    const b = d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114;
    if (b < 18) d[i + 3] = 0;
    else if (b < 55) d[i + 3] = Math.round(((b - 18) / 37) * 255);
  }
  cx.putImageData(id, 0, 0);
  return oc.transferToImageBitmap();
}

const BLOCKS = [
  {
    num: '01',
    tag: 'Identité',
    title: 'LE\nDylan',
    body: 'Développeur & Spécialiste Cybersécurité — disponible en alternance.',
    side: 'left' as const,
  },
  {
    num: '02',
    tag: 'Formation',
    title: 'École\n89',
    body: 'Master Cybersécurité · Paris. Pentest, red team, architecture sécurisée.',
    side: 'right' as const,
  },
  {
    num: '03',
    tag: 'Expertise',
    title: 'Offensive\nSecurity',
    body: 'Red Team · Pentest · Analyse de vulnérabilités. La sécurité dès la conception.',
    side: 'left' as const,
  },
  {
    num: '04',
    tag: 'Stack',
    title: 'Full-Stack\n& Secure',
    body: 'Next.js · Node.js · PHP · SQL. Des produits en production, pas des maquettes.',
    side: 'right' as const,
    cta: true,
  },
] as const;

export default function Hero() {
  const outerRef     = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const processedRef = useRef<(ImageBitmap | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const curRef       = useRef(0);
  const tgtRef       = useRef(0);
  const rafRef       = useRef<number>(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady]   = useState(false);

  /* Préchargement */
  useEffect(() => {
    let done = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = FRAME_PATH(i + 1);
      const idx = i;
      img.onload = () => {
        removeBackground(img).then((bmp) => {
          processedRef.current[idx] = bmp;
          done++;
          setLoaded(done);
          if (done === TOTAL_FRAMES) setReady(true);
        });
      };
      img.onerror = () => { done++; setLoaded(done); if (done === TOTAL_FRAMES) setReady(true); };
    }
  }, []);

  /* Canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    /* refH capturé une fois — sert de référence fixe pour la taille du buste */
    const refH = window.innerHeight;
    const syncSize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w > 0 && h > 0) { canvas.width = w; canvas.height = h; }
    };
    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);
    const draw = () => {
      curRef.current += (tgtRef.current - curRef.current) * 0.1;
      const idx = Math.max(0, Math.min(Math.round(curRef.current), TOTAL_FRAMES - 1));
      const bmp = processedRef.current[idx];
      const { width: cw, height: ch } = canvas;
      ctx.clearRect(0, 0, cw, ch);
      if (bmp) {
        /* scale basé sur refH (fixe au montage), pas ch → buste stable même quand Safari cache sa barre */
        const scale = (refH * 0.88) / bmp.height;
        const dw = bmp.width * scale, dh = bmp.height * scale;
        ctx.drawImage(bmp, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  /* Scroll → frames */
  const hintRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const lockedH = window.innerHeight;
    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const totalScroll = outer.offsetHeight - lockedH;
      const scrolled = Math.max(0, -rect.top);
      const progress = totalScroll > 0 ? Math.min(1, scrolled / totalScroll) : 0;
      tgtRef.current = progress * (TOTAL_FRAMES - 1);
      if (hintRef.current) {
        hintRef.current.style.opacity = scrolled < lockedH * 0.06 ? '1' : '0';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const pct = Math.round((loaded / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '14px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)',
      }}>
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          {/* LD monogram */}
          <div style={{
            width: '32px', height: '32px',
            borderRadius: '7px',
            background: 'linear-gradient(135deg, #1a1400 0%, #2e2500 100%)',
            border: '1px solid rgba(212,175,55,0.35)',
            boxShadow: '0 0 12px rgba(212,175,55,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="19" height="15" viewBox="0 0 22 18" fill="none">
              {/* L */}
              <path d="M2 2 L2 16 L8 16" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {/* D */}
              <path d="M12 2 L12 16 M12 2 L16 2 Q20 2 20 9 Q20 16 16 16 L12 16" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'Archivo Black, Arial Black, sans-serif', fontSize: '0.8125rem', color: '#f1f5f9', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>LE DYLAN</div>
            <div data-nav-sub style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: '#475569', marginTop: '1px', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>École 89 — Paris</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', pointerEvents: 'auto', flexShrink: 0 }}>
          {[['PROJETS', '#projets'], ['SKILLS', '#skills'], ['CONTACT', '#contact']].map(([l, h]) => (
            <a key={h} href={h} style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.625rem', fontWeight: 500, color: '#64748b', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
              onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
            >{l}</a>
          ))}
        </div>
      </nav>
      {/* ─── Outer : toute la section hero ─── */}
      <div ref={outerRef} style={{ position: 'relative', background: '#000' }}>

        {/* ─── Buste + LE DYLAN — sticky en arrière-plan ─── */}
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          zIndex: 0, overflow: 'hidden',
        }}>
          {/* Canvas */}
          <canvas ref={canvasRef} style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            zIndex: 1, pointerEvents: 'none',
          }} />

          {/* Scroll hint */}
          <div ref={hintRef} style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
            opacity: 1, transition: 'opacity 0.3s', pointerEvents: 'none',
          }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#334155', letterSpacing: '0.14em', textTransform: 'uppercase' }}>scroll</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ animation: 'bounceArrow 1.6s ease-in-out infinite' }}>
              <path d="M6 1v10M6 11L2 7M6 11l4-4" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ─── Blocs qui scrollent par-dessus le buste ─── */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          marginTop: '-100vh',
        }}>
          <div style={{ height: '100vh' }} />

          {/* Blocs de story */}
          {BLOCKS.map((block, i) => (
            <StoryBlock key={i} block={block} />
          ))}

          {/* Espace final avant la prochaine section */}
          <div style={{ height: '20vh', background: 'linear-gradient(to bottom, transparent, #050510)' }} />
        </div>
      </div>

      {/* Loading */}
      {!ready && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#00d4ff', letterSpacing: '0.15em' }}>{pct} %</span>
          <div style={{ width: 180, height: 1, background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: 'linear-gradient(90deg,#00d4ff,#7c3aed)', transition: 'width 0.15s linear' }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounceArrow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @media (max-width: 480px) { [data-nav-sub] { display: none !important; } }
      `}</style>
    </>
  );
}

/* ── Bloc artistique ── */
function StoryBlock({ block }: { block: (typeof BLOCKS)[number] }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-12% 0px -12% 0px', once: false });
  const isLeft = block.side === 'left';

  return (
    <div style={{
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: isLeft ? 'flex-start' : 'flex-end',
      padding: '60px 0',
    }}>
      <motion.div
        ref={ref}
        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : (isLeft ? -40 : 40) }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: 'clamp(280px, 36vw, 480px)',
          marginLeft: isLeft ? '6vw' : 0,
          marginRight: isLeft ? 0 : '6vw',
        }}
      >
        {/* Numéro + tag */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          marginBottom: '24px',
        }}>
          <span style={{
            fontFamily: 'Archivo Black, Arial Black, sans-serif',
            fontSize: '4.5rem', fontWeight: 900,
            color: 'rgba(255,255,255,0.06)',
            lineHeight: 1, letterSpacing: '-0.04em',
            userSelect: 'none',
          }}>
            {block.num}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.12)' }} />
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6875rem', color: '#00d4ff',
            letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            {block.tag}
          </span>
        </div>

        {/* Titre sur deux lignes */}
        <h2 style={{
          fontFamily: 'Archivo Black, Arial Black, sans-serif',
          fontSize: 'clamp(3rem, 5.5vw, 5rem)',
          fontWeight: 900, color: '#f1f5f9',
          letterSpacing: '-0.04em', lineHeight: 0.95,
          margin: '0 0 28px',
          whiteSpace: 'pre-line',
        }}>
          {block.title}
        </h2>

        {/* Trait + corps */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <div style={{ width: '2px', flexShrink: 0, alignSelf: 'stretch', background: 'rgba(0,212,255,0.5)', borderRadius: '1px', minHeight: '100%' }} />
          <p style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 'clamp(0.875rem, 1.2vw, 1rem)',
            color: '#94a3b8', lineHeight: 1.8, margin: 0,
          }}>
            {block.body}
          </p>
        </div>

        {'cta' in block && block.cta && (
          <div style={{ marginTop: '36px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#projets" style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600,
              color: '#050510', background: '#00d4ff', padding: '12px 28px',
              borderRadius: '6px', textDecoration: 'none',
              boxShadow: '0 0 20px rgba(0,212,255,0.3)', transition: 'transform 0.15s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 36px rgba(0,212,255,0.55)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)'; }}
            >
              Voir mes projets
            </a>
            <a href="#contact" style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600,
              color: '#00d4ff', border: '1.5px solid rgba(0,212,255,0.4)',
              padding: '12px 28px', borderRadius: '6px',
              textDecoration: 'none', transition: 'transform 0.15s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = '#00d4ff'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'; }}
            >
              Me contacter
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}
