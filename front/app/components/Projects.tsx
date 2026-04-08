'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';

interface Project {
  number: string;
  title: string;
  badge: string;
  description: string;
  tags: string[];
  status: string;
  statusColor: 'gold' | 'green' | 'orange';
  link?: string;
  image: string;
  imageBg: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'SaaS Gamification',
    badge: 'SaaS B2B',
    description: "Plateforme multi-tenant permettant aux restaurants de créer des roues de la fortune pour gamifier la collecte d'avis Google. QR code temporaire, dashboard dédié.",
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Multi-tenant'],
    status: 'Livré en production',
    statusColor: 'green',
    link: 'https://ryturn.fr/',
    image: '/images/projects/saas.jpg',
    imageBg: 'linear-gradient(135deg, #e8e4dc 0%, #f5f2ec 40%, #ddd8ce 100%)',
  },
  {
    number: '02',
    title: 'Bel Institut',
    badge: 'Site Client',
    description: 'Site pour un institut de maquillage permanent. Design élégant, responsive, réservation en ligne et témoignages clients.',
    tags: ['Next.js', 'React', 'TypeScript', 'Responsive'],
    status: 'En ligne',
    statusColor: 'green',
    link: 'https://belmaquillagepermanent.fr/',
    image: '/images/projects/bel.jpg',
    imageBg: 'linear-gradient(135deg, #ede9e1 0%, #f8f5ef 40%, #e2ddd5 100%)',
  },
  {
    number: '03',
    title: 'App École 89',
    badge: 'Application Interne',
    description: 'Application web interne pour le suivi pédagogique à École 89. Gestion des présences, notes et progression avec sécurité dès la conception.',
    tags: ['React', 'Symfony', 'PHP', 'SQL'],
    status: 'Déployé en interne',
    statusColor: 'green',
    image: '/images/projects/ecole89.jpg',
    imageBg: 'linear-gradient(135deg, #e4e8e4 0%, #f2f5f2 40%, #d8ddd8 100%)',
  },
  {
    number: '04',
    title: 'Jeu Alibi',
    badge: 'En développement',
    description: "Jeu multijoueur d'enquête : deux joueurs partagent des informations communes, un inspecteur les interroge séparément pour détecter les incohérences. Interface 3D immersive.",
    tags: ['Three.js', 'WebGL', 'Multijoueur', 'Node.js'],
    status: 'En développement',
    statusColor: 'orange',
    image: '/images/projects/alibi.jpg',
    imageBg: 'linear-gradient(135deg, #e8e6ed 0%, #f4f2f8 40%, #dddae5 100%)',
  },
  {
    number: '05',
    title: 'K-Shop',
    badge: 'En développement',
    description: "Site e-commerce spécialisé en produits coréens (cosmétiques, food, culture). Catalogue complet, panier, paiement sécurisé et gestion des stocks.",
    tags: ['React', 'Express', 'PostgreSQL', 'E-commerce'],
    status: 'En développement',
    statusColor: 'orange',
    image: '/images/projects/kshop.jpg',
    imageBg: 'linear-gradient(135deg, #e8ede8 0%, #f2f7f2 40%, #dae3da 100%)',
  },
];

/* 5 cards → each takes 1/5 of scroll */
const N = projects.length;
const DWELL = 1 / N; // 0.2

function makeScale(smooth: ReturnType<typeof useSpring>, idx: number) {
  const center = (idx + 0.5) * DWELL;
  const inStart  = center - DWELL * 0.6;
  const inPeak   = center - DWELL * 0.1;
  const outPeak  = center + DWELL * 0.1;
  const outEnd   = center + DWELL * 0.6;
  return useTransform(
    smooth,
    [Math.max(0, inStart), inPeak, outPeak, Math.min(1, outEnd)],
    [0.72, 1.04, 1.04, 0.72],
  );
}

function makeOpacity(smooth: ReturnType<typeof useSpring>, idx: number) {
  const center = (idx + 0.5) * DWELL;
  const inStart  = center - DWELL * 0.6;
  const inPeak   = center - DWELL * 0.1;
  const outPeak  = center + DWELL * 0.1;
  const outEnd   = center + DWELL * 0.6;
  return useTransform(
    smooth,
    [Math.max(0, inStart), inPeak, outPeak, Math.min(1, outEnd)],
    [0.28, 1, 1, 0.28],
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

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 22, restDelta: 0.001 });

  const cardScales    = projects.map((_, i) => makeScale(smooth, i));
  const cardOpacities = projects.map((_, i) => makeOpacity(smooth, i));

  /* Mobile: translate X to center active card (75vw wide + 7vw gap ≈ 82vw per step) */
  const mobileStops = projects.map((_, i) => i / (N - 1));
  const mobileVals  = projects.map((_, i) => `${-82 * i}vw`);
  const mobileX = useTransform(smooth, mobileStops, mobileVals);

  return (
    /* 500vh: 5 cards × 100vh */
    <div ref={outerRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden', background: '#000',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div ref={titleRef} style={{ padding: 'clamp(28px,5vh,48px) 6vw 16px', flexShrink: 0 }}>
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
              {N} projets · scroll →
            </span>
          </motion.div>
        </div>

        {/* ── DESKTOP: all cards visible side by side ── */}
        {!isMobile && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '0 3vw 20px',
            overflow: 'hidden',
          }}>
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                style={{
                  width: 'clamp(140px, 17vw, 240px)',
                  height: 'clamp(200px, 58vh, 420px)',
                  flexShrink: 0,
                  scale: cardScales[i],
                  opacity: cardOpacities[i],
                  borderRadius: '18px',
                  overflow: 'visible',
                  position: 'relative',
                  transformOrigin: 'center center',
                  userSelect: 'none',
                }}
              >
                <CardInner project={project}  />
              </motion.div>
            ))}
          </div>
        )}

        {/* ── MOBILE: 1 card centered, others peek on sides ── */}
        {isMobile && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
            <motion.div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7vw',
              paddingLeft: '12.5vw',
              x: mobileX,
              width: 'max-content',
              paddingBottom: '40px',
            }}>
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  style={{
                    width: '75vw',
                    aspectRatio: '3 / 4',
                    flexShrink: 0,
                    opacity: cardOpacities[i],
                    borderRadius: '18px',
                    overflow: 'visible',
                    position: 'relative',
                    userSelect: 'none',
                  }}
                >
                  <CardInner project={project}  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        <ActiveDots smooth={smooth} />
      </div>

      <style>{`
        *:focus { outline: none !important; }
        a { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}

/* ── Card content ── */
function CardInner({ project }: {
  project: Project;
}) {
  const statusColors = {
    green:  { dot: '#22c55e', glow: 'rgba(34,197,94,0.7)' },
    gold:   { dot: '#d4af37', glow: 'rgba(212,175,55,0.7)' },
    orange: { dot: '#f97316', glow: 'rgba(249,115,22,0.7)' },
  };
  const sc = statusColors[project.statusColor];
  const accentColor = project.statusColor === 'orange' ? '#f97316' : '#d4af37';
  const accentBorder = project.statusColor === 'orange' ? 'rgba(249,115,22,0.4)' : 'rgba(212,175,55,0.3)';

  /* details always visible */
  const detailsOp = 1;

  return (
    <>

      {/* Inner card */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '18px',
        overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
      }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0, background: project.imageBg }}>
          <img
            src={project.image} alt={project.title} draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
          />
        </div>

        {/* Gradient — dark at bottom for text on light marble */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, transparent 25%, rgba(0,0,0,0.45) 58%, rgba(0,0,0,0.92) 100%)',
          pointerEvents: 'none',
        }} />

        {/* WIP shimmer */}
        {project.statusColor === 'orange' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, transparent, #f97316, #fbbf24, #f97316, transparent)',
            animation: 'shimmer 2.4s ease-in-out infinite',
          }} />
        )}

        {/* Top row — always visible */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', right: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
            color: accentColor, background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${accentBorder}`,
            borderRadius: '999px', padding: '3px 9px',
            letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            {project.badge}
          </span>
          <span style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.12)' }}>
            {project.number}
          </span>
        </div>

        {/* Bottom — title always visible, details only when active */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '14px 14px 18px' }}>

          {/* Title — always visible */}
          <h3 style={{
            fontFamily: 'Archivo Black, Arial Black, sans-serif',
            fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
            fontWeight: 900, color: '#f1f5f9',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            margin: '0 0 10px',
          }}>
            {project.title}
          </h3>

          {/* Details — fade in when active */}
          <motion.div style={{ opacity: detailsOp }}>
            <p style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(0.7rem, 1.1vw, 0.8rem)',
              color: 'rgba(148,163,184,0.9)',
              lineHeight: 1.55, margin: '0 0 10px',
            }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem',
                  color: '#b8960c',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '4px', padding: '2px 7px',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: sc.dot, boxShadow: `0 0 5px ${sc.glow}`, display: 'block', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#64748b' }}>{project.status}</span>
              </div>
              {project.link ? (
                <a
                  href={project.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600,
                    color: accentColor, textDecoration: 'none', outline: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Voir →
                </a>
              ) : (
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#475569', fontStyle: 'italic' }}>
                  {project.statusColor === 'orange' ? 'Bientôt' : 'Confidentiel'}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes shimmer { 0%,100%{opacity:0.5} 50%{opacity:1} }`}</style>
    </>
  );
}

/* ── Dot indicators ── */
function ActiveDots({ smooth }: { smooth: ReturnType<typeof useSpring> }) {
  const dots = projects.map((_, i) => {
    const center   = (i + 0.5) * DWELL;
    const inStart  = center - DWELL * 0.5;
    const outEnd   = center + DWELL * 0.5;
    return useTransform(smooth,
      [Math.max(0, inStart), center, Math.min(1, outEnd)],
      [0.22, 1, 0.22],
    );
  });

  return (
    <div style={{
      position: 'absolute', bottom: '18px', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', gap: '8px', zIndex: 10,
    }}>
      {dots.map((op, i) => (
        <motion.div key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: projects[i].statusColor === 'orange' ? '#f97316' : '#d4af37',
          boxShadow: projects[i].statusColor === 'orange'
            ? '0 0 5px rgba(249,115,22,0.6)'
            : '0 0 5px rgba(212,175,55,0.6)',
          opacity: op,
        }} />
      ))}
    </div>
  );
}
