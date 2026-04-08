'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

/* ═══════════════════════════════════════════════
   CONFIG
═══════════════════════════════════════════════ */
const TOTAL_FRAMES = 60;
const FRAME_PATH = (i: number) =>
  `/images/bust-frames/frame_${String(i).padStart(3, '0')}.jpg`;

/* Textes qui apparaissent à des frames précises
   in  = frame d'entrée  |  out = frame de sortie */
const SCENES: Scene[] = [
  {
    id: 'intro',
    lines: [
      { text: 'LE Dylan',              size: 'xl',  weight: 900, color: '#f1f5f9' },
      { text: 'Développeur · Cybersécurité', size: 'sm', weight: 400, color: '#94a3b8' },
    ],
    pos: 'bottom-left',
    in: 2, out: 18,
  },
  {
    id: 'school',
    lines: [
      { text: 'École 89',              size: 'xl',  weight: 900, color: '#f1f5f9' },
      { text: 'Master Cybersécurité',  size: 'sm',  weight: 400, color: '#00d4ff' },
    ],
    pos: 'bottom-right',
    in: 22, out: 36,
  },
  {
    id: 'offsec',
    lines: [
      { text: 'Offensive Security',    size: 'xl',  weight: 900, color: '#f1f5f9' },
      { text: 'Pentest · Red Team',    size: 'sm',  weight: 400, color: '#a78bfa' },
    ],
    pos: 'top-left',
    in: 38, out: 50,
  },
  {
    id: 'stack',
    lines: [
      { text: 'Full-Stack & Secure',   size: 'xl',  weight: 900, color: '#f1f5f9' },
      { text: 'Next.js · Node.js · PHP', size: 'sm', weight: 400, color: '#00d4ff' },
    ],
    pos: 'top-right',
    in: 52, out: 60,
  },
];

interface Scene {
  id: string;
  lines: { text: string; size: 'xl' | 'sm'; weight: number; color: string }[];
  pos: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  in: number;
  out: number;
}

/* ═══════════════════════════════════════════════
   Composant principal
═══════════════════════════════════════════════ */
export default function BustSection() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const curRef    = useRef(0);   // frame courante interpolée
  const tgtRef    = useRef(0);   // frame cible (depuis scroll)
  const rafRef    = useRef<number>(0);

  const [loaded, setLoaded] = useState(0);
  const [ready,  setReady]  = useState(false);

  /* ── Préchargement ── */
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new window.Image();
      img.src = FRAME_PATH(i + 1);
      const finish = () => { done++; setLoaded(done); if (done === TOTAL_FRAMES) setReady(true); };
      img.onload  = finish;
      img.onerror = finish;
      return img;
    });
    framesRef.current = imgs;
  }, []);

  /* ── Boucle canvas — cover fullscreen ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      curRef.current += (tgtRef.current - curRef.current) * 0.1;
      const frames = framesRef.current;
      const idx = Math.round(curRef.current);
      const img = frames[Math.max(0, Math.min(idx, frames.length - 1))];

      if (img?.complete && img.naturalWidth > 0) {
        const { width: cw, height: ch } = canvas;
        const iw = img.naturalWidth, ih = img.naturalHeight;

        /* Cover ancré en haut : remplit la largeur, tête toujours visible */
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale, dh = ih * scale;
        const dx = (cw - dw) / 2;
        // Ancre vers le haut : on coupe en bas plutôt qu'en haut
        const dy = dh > ch ? -(dh - ch) * 0.08 : (ch - dh) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── Scroll → frame ── */
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  useEffect(() => smooth.on('change', (v) => {
    tgtRef.current = v * (TOTAL_FRAMES - 1);
  }), [smooth]);

  /* ── UI values ── */
  const progressW   = useTransform(smooth, [0, 1], ['0%', '100%']);
  const hintOpacity = useTransform(smooth, [0, 0.06], [1, 0]);
  const overlayOpacity = useTransform(smooth, [0, 0.04], [0, 1]);

  const pct = Math.round((loaded / TOTAL_FRAMES) * 100);

  return (
    <div ref={outerRef} style={{ height: '600vh', position: 'relative' }}>

      {/* ── Sticky fullscreen ── */}
      <div style={{
        position: 'sticky', top: 0,
        width: '100vw', height: '100vh',
        overflow: 'hidden', background: '#000',
      }}>

        {/* Canvas — fullscreen cover */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            display: 'block',
          }}
        />

        {/* Vignette pour lisibilité du texte */}
        <motion.div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            background: `
              radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 75%, rgba(0,0,0,0.6) 100%)
            `,
            pointerEvents: 'none', zIndex: 2,
            opacity: overlayOpacity,
          }}
        />

        {/* ── Scenes (textes) ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }}>
          {SCENES.map((scene) => (
            <SceneText key={scene.id} scene={scene} smooth={smooth} />
          ))}
        </div>

        {/* ── Numéro de section ── */}
        <motion.div style={{
          position: 'absolute', top: '28px', left: '32px', zIndex: 5,
          opacity: overlayOpacity,
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.15em',
          }}>
            03 / À PROPOS
          </span>
        </motion.div>

        {/* ── Frame counter (dev) ── */}
        <FrameCounter smooth={smooth} />

        {/* ── Scroll hint ── */}
        <motion.div style={{
          position: 'absolute', bottom: '56px', left: '50%', translateX: '-50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          opacity: hintOpacity, zIndex: 5, pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.45)', letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            scroll
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: 'bounceArrow 1.6s ease-in-out infinite' }}>
            <path d="M7 2v10M7 12L3 8M7 12l4-4" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        {/* ── Barre de progression ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px', zIndex: 6, background: 'rgba(255,255,255,0.06)',
        }}>
          <motion.div style={{
            height: '100%', width: progressW,
            background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
            boxShadow: '0 0 8px rgba(0,212,255,0.5)',
          }}/>
        </div>

        {/* ── Loading overlay ── */}
        {!ready && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 20,
            background: '#000',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '20px',
          }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8125rem', color: '#00d4ff', letterSpacing: '0.1em',
            }}>
              Chargement…
            </div>
            <div style={{
              width: '180px', height: '1px',
              background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                width: `${pct}%`, transition: 'width 0.1s linear',
                background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
              }}/>
            </div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em',
            }}>
              {pct} %
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Texte cinématique lié aux frames
═══════════════════════════════════════════════ */
const POS_STYLES: Record<Scene['pos'], React.CSSProperties> = {
  'bottom-left':  { bottom: '10%', left: '6vw',  alignItems: 'flex-start' },
  'bottom-right': { bottom: '10%', right: '6vw', alignItems: 'flex-end'   },
  'top-left':     { top: '14%',    left: '6vw',  alignItems: 'flex-start' },
  'top-right':    { top: '14%',    right: '6vw', alignItems: 'flex-end'   },
};

function SceneText({
  scene,
  smooth,
}: {
  scene: Scene;
  smooth: ReturnType<typeof useSpring>;
}) {
  const inP  = scene.in  / TOTAL_FRAMES;
  const outP = scene.out / TOTAL_FRAMES;
  const FADE = 0.04; // durée du fondu en unité de progress

  const opacity = useTransform(
    smooth,
    [inP, inP + FADE, outP - FADE, outP],
    [0,   1,          1,           0   ]
  );
  const y = useTransform(smooth, [inP, inP + FADE], [18, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        opacity,
        y,
        ...POS_STYLES[scene.pos],
      }}
    >
      {scene.lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: line.size === 'xl'
              ? 'Archivo Black, Arial Black, sans-serif'
              : 'JetBrains Mono, monospace',
            fontSize: line.size === 'xl'
              ? 'clamp(1.75rem, 4vw, 3.5rem)'
              : 'clamp(0.8125rem, 1.2vw, 1rem)',
            fontWeight: line.weight,
            color: line.color,
            lineHeight: line.size === 'xl' ? 1.05 : 1.5,
            letterSpacing: line.size === 'xl' ? '-0.02em' : '0.04em',
            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          }}
        >
          {line.text}
        </div>
      ))}

      {/* Ligne décorative sous le texte principal */}
      <div style={{
        width: '40px', height: '2px', borderRadius: '1px',
        background: scene.lines[1]?.color ?? '#00d4ff',
        boxShadow: `0 0 8px ${scene.lines[1]?.color ?? '#00d4ff'}`,
        marginTop: '4px',
      }}/>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Dev helper — compteur de frame
   → supprime en prod si tu veux
═══════════════════════════════════════════════ */
function FrameCounter({ smooth }: { smooth: ReturnType<typeof useSpring> }) {
  const frame = useTransform(smooth, (v) => Math.round(v * (TOTAL_FRAMES - 1)) + 1);
  return (
    <motion.div style={{
      position: 'absolute', top: '28px', right: '32px', zIndex: 5,
      fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem',
      color: 'rgba(0,212,255,0.3)', letterSpacing: '0.06em',
    }}>
      <motion.span>{frame}</motion.span>
      <span style={{ color: 'rgba(255,255,255,0.15)' }}> / {TOTAL_FRAMES}</span>
    </motion.div>
  );
}
