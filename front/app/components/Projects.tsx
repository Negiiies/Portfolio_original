'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

interface Project {
  number: string;
  title: string;
  artist: string;       // sous-titre style "artiste"
  badge: string;
  description: string;
  tracks: string[];     // tags → tracklist
  status: string;
  statusColor: 'gold' | 'green' | 'orange';
  link?: string;
  image: string;
  imageBg: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'SaaS Gamification',
    artist: 'Next.js · Node.js · Multi-tenant',
    badge: 'SaaS B2B',
    description: "Plateforme multi-tenant permettant aux restaurants de créer des roues de la fortune pour gamifier la collecte d'avis Google.",
    tracks: ['01  Multi-tenant architecture', '02  QR code temporaire', '03  Dashboard dédié', '04  Livré en production'],
    status: 'Livré en production',
    statusColor: 'green',
    link: 'https://ryturn.fr/',
    image: '/images/projects/saas.jpg',
    imageBg: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accentColor: '#22c55e',
  },
  {
    number: '02',
    title: 'Bel Institut',
    artist: 'Next.js · React · TypeScript',
    badge: 'Site Client',
    description: 'Site pour un institut de maquillage permanent. Design élégant, responsive, réservation en ligne.',
    tracks: ['01  Design élégant', '02  Réservation en ligne', '03  Témoignages clients', '04  Responsive mobile'],
    status: 'En ligne',
    statusColor: 'green',
    link: 'https://belmaquillagepermanent.fr/',
    image: '/images/projects/bel.jpg',
    imageBg: 'linear-gradient(145deg, #2d1b33 0%, #3d1a3a 50%, #1a0d1f 100%)',
    accentColor: '#ec4899',
  },
  {
    number: '03',
    title: 'App École 89',
    artist: 'React · Symfony · PHP · SQL',
    badge: 'Application Interne',
    description: 'Application web interne pour le suivi pédagogique. Gestion des présences, notes et progression.',
    tracks: ['01  Suivi pédagogique', '02  Gestion des présences', '03  Sécurité by design', '04  Déployé en interne'],
    status: 'Déployé',
    statusColor: 'green',
    image: '/images/projects/ecole89.jpg',
    imageBg: 'linear-gradient(145deg, #0d2137 0%, #0a3d62 50%, #071e2a 100%)',
    accentColor: '#3b82f6',
  },
  {
    number: '04',
    title: 'Jeu Alibi',
    artist: 'Three.js · WebGL · Node.js',
    badge: 'En développement',
    description: "Jeu multijoueur d'enquête en 3D. Deux joueurs partagent des infos, un inspecteur cherche les incohérences.",
    tracks: ['01  Interface 3D immersive', '02  Multijoueur temps réel', '03  WebGL rendering', '04  Bientôt disponible'],
    status: 'En développement',
    statusColor: 'orange',
    image: '/images/projects/alibi.jpg',
    imageBg: 'linear-gradient(145deg, #1a0a00 0%, #2d1500 50%, #1a0a00 100%)',
    accentColor: '#f97316',
  },
  {
    number: '05',
    title: 'K-Shop',
    artist: 'React · Express · PostgreSQL',
    badge: 'En développement',
    description: "Site e-commerce produits coréens. Catalogue, panier, paiement sécurisé et gestion des stocks.",
    tracks: ['01  Catalogue complet', '02  Panier & paiement', '03  Gestion des stocks', '04  Bientôt disponible'],
    status: 'En développement',
    statusColor: 'orange',
    image: '/images/projects/kshop.jpg',
    imageBg: 'linear-gradient(145deg, #0a1a0a 0%, #1a3a1a 50%, #0a1a0a 100%)',
    accentColor: '#f97316',
  },
];

const N = projects.length;
const DWELL = 1 / N;

function useCardProgress(smooth: ReturnType<typeof useSpring>, idx: number) {
  const center   = (idx + 0.5) * DWELL;
  const inStart  = Math.max(0, center - DWELL * 0.7);
  const inPeak   = Math.max(0, center - DWELL * 0.15);
  const outPeak  = Math.min(1, center + DWELL * 0.15);
  const outEnd   = Math.min(1, center + DWELL * 0.7);
  const scale   = useTransform(smooth, [inStart, inPeak, outPeak, outEnd], [0.80, 1.02, 1.02, 0.80]);
  const opacity = useTransform(smooth, [inStart, inPeak, outPeak, outEnd], [0.35, 1, 1, 0.35]);
  const vinyl   = useTransform(smooth, [inStart, inPeak, outPeak, outEnd], ['0%', '40%', '40%', '0%']);
  return { scale, opacity, vinyl };
}

/* Vinyl record SVG */
function Vinyl({ color, spinning }: { color: string; spinning: boolean }) {
  return (
    <div style={{
      width: '100%', height: '100%', borderRadius: '50%',
      background: '#111',
      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 8px 32px rgba(0,0,0,0.6)',
      position: 'relative', overflow: 'hidden',
      animation: spinning ? 'spin 4s linear infinite' : 'none',
    }}>
      {/* Grooves */}
      {[20, 28, 36, 44, 52, 60, 68, 76, 84].map(r => (
        <div key={r} style={{
          position: 'absolute',
          inset: `${(100-r)/2}%`,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.04)',
        }} />
      ))}
      {/* Label center */}
      <div style={{
        position: 'absolute', inset: '30%',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}33, ${color}11)`,
        border: `1px solid ${color}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: '18%', height: '18%', borderRadius: '50%', background: '#000', border: `1px solid ${color}66` }} />
      </div>
      {/* Shine */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function AlbumCard({ project, scale, opacity, vinylX }: {
  project: Project;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scale: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opacity: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vinylX: any;
}) {
  return (
    <motion.div style={{ scale, opacity, transformOrigin: 'center', position: 'relative', flexShrink: 0 }}>
      {/* Vinyl behind */}
      <motion.div style={{
        position: 'absolute',
        top: '5%', right: 0,
        width: '90%', height: '90%',
        x: vinylX,
        zIndex: 0,
      }}>
        <Vinyl color={project.accentColor} spinning={true} />
      </motion.div>

      {/* Album cover */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative', zIndex: 1,
        boxShadow: `0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)`,
      }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0, background: project.imageBg }}>
          <img src={project.image} alt={project.title} draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
          />
        </div>

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)',
        }} />

        {/* WIP strip */}
        {project.statusColor === 'orange' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
            animation: 'shimmer 2.4s ease-in-out infinite',
          }} />
        )}

        {/* Badge */}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem',
            color: project.accentColor,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            border: `1px solid ${project.accentColor}44`,
            borderRadius: '999px', padding: '3px 9px',
            letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            {project.badge}
          </span>
        </div>

        {/* Number */}
        <div style={{ position: 'absolute', top: 10, right: 12 }}>
          <span style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.1)' }}>
            {project.number}
          </span>
        </div>

        {/* Bottom info */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px' }}>
          <div style={{ fontFamily: 'Archivo Black, Arial Black, sans-serif', fontSize: 'clamp(0.9rem, 1.8vw, 1.15rem)', color: '#f1f5f9', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '4px' }}>
            {project.title}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: project.accentColor, opacity: 0.8, letterSpacing: '0.06em' }}>
            {project.artist}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Now Playing bar */
function NowPlaying({ smooth }: { smooth: ReturnType<typeof useSpring> }) {
  const [active, setActive] = useState(0);
  useEffect(() => smooth.on('change', v => {
    setActive(Math.min(N - 1, Math.round(v * N - 0.5)));
  }), [smooth]);

  const p = projects[Math.max(0, Math.min(N-1, active))];

  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 6vw 20px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
        display: 'flex', alignItems: 'center', gap: '24px',
        zIndex: 10,
      }}
    >
      {/* Mini cover */}
      <div style={{
        width: 42, height: 42, borderRadius: '6px', flexShrink: 0,
        background: p.imageBg, overflow: 'hidden', position: 'relative',
        boxShadow: `0 0 12px ${p.accentColor}44`,
      }}>
        <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }} />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#f1f5f9', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {p.title}
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: p.accentColor, marginTop: '2px', opacity: 0.8 }}>
          {p.artist}
        </div>
      </div>

      {/* Tracklist */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0, flex: 1.5 }}>
        {p.tracks.slice(0, 3).map((t, i) => (
          <div key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: i === 0 ? p.accentColor : '#334155', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {t}
          </div>
        ))}
      </div>

      {/* Link */}
      <div style={{ flexShrink: 0 }}>
        {p.link ? (
          <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600,
            color: p.accentColor, textDecoration: 'none',
            padding: '7px 16px', borderRadius: '999px',
            border: `1px solid ${p.accentColor}44`,
            background: `${p.accentColor}11`,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = `${p.accentColor}22`)}
            onMouseLeave={e => (e.currentTarget.style.background = `${p.accentColor}11`)}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Voir
          </a>
        ) : (
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#1e293b' }}>
            {p.statusColor === 'orange' ? 'bientôt' : '—'}
          </span>
        )}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
        {projects.map((proj, i) => (
          <div key={i} style={{
            width: i === active ? '18px' : '6px', height: '6px',
            borderRadius: '999px',
            background: i === active ? proj.accentColor : 'rgba(255,255,255,0.1)',
            transition: 'width 0.3s, background 0.3s',
            boxShadow: i === active ? `0 0 8px ${proj.accentColor}88` : 'none',
          }} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const outerRef      = useRef<HTMLDivElement>(null);
  const titleRef      = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-60px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  /* Remap 0→1 to 0.1→0.9 so card 0 is already active at scroll=0 */
  const remapped = useTransform(scrollYProgress, [0, 1], [0.1, 0.9]);
  const smooth = useSpring(remapped, { stiffness: 55, damping: 22, restDelta: 0.001 });

  const cards = projects.map((_, i) => useCardProgress(smooth, i));

  const mobileStops = projects.map((_, i) => i / (N - 1));
  const mobileVals  = projects.map((_, i) => `${-82 * i}vw`);
  const mobileX     = useTransform(smooth, mobileStops, mobileVals);

  return (
    <div ref={outerRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden', background: '#000',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div ref={titleRef} style={{ padding: 'clamp(24px,4vh,44px) 6vw 12px', flexShrink: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' }}
          >
            <p style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3d3320', fontSize: '0.75rem', letterSpacing: '0.15em', margin: 0 }}>
              {'< 02 />'}
            </p>
            <h2 style={{
              fontFamily: 'Archivo Black, Arial Black, sans-serif',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 900, color: '#f1f5f9',
              lineHeight: 1, margin: 0, letterSpacing: '-0.04em',
            }}>
              Projets
            </h2>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#334155', letterSpacing: '0.06em' }}>
              {N} tracks · scroll →
            </span>
          </motion.div>
        </div>

        {/* DESKTOP */}
        {!isMobile && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '0 4vw 80px',
            overflow: 'hidden',
          }}>
            {projects.map((project, i) => (
              <div key={project.title} style={{
                width: 'clamp(130px, 15vw, 220px)',
                height: 'clamp(130px, 15vw, 220px)',
                flexShrink: 0,
                position: 'relative',
              }}>
                <AlbumCard
                  project={project}
                  scale={cards[i].scale}
                  opacity={cards[i].opacity}
                  vinylX={cards[i].vinyl}
                />
              </div>
            ))}
          </div>
        )}

        {/* MOBILE */}
        {isMobile && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative', paddingBottom: '80px' }}>
            <motion.div style={{
              display: 'flex', alignItems: 'center', gap: '7vw',
              paddingLeft: '12.5vw', x: mobileX, width: 'max-content',
            }}>
              {projects.map((project, i) => (
                <div key={project.title} style={{ width: '75vw', height: '75vw', flexShrink: 0, position: 'relative' }}>
                  <AlbumCard
                    project={project}
                    scale={cards[i].scale}
                    opacity={cards[i].opacity}
                    vinylX={cards[i].vinyl}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        )}

        <NowPlaying smooth={smooth} />
      </div>

      <style>{`
        @keyframes spin    { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes shimmer { 0%,100%{opacity:0.5} 50%{opacity:1} }
        *:focus { outline: none !important; }
        a { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
