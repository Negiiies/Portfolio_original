'use client';

import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface Project {
  number: string;
  title: string;
  badge: string;
  description: string;
  tags: string[];
  status: string;
  link?: string;
  image: string;
  imageBg: string;
}

const projects: Project[] = [
  {
    number: '01',
    title: 'SaaS Gamification',
    badge: 'SaaS B2B',
    description: "Roue de la fortune multi-tenant pour gamifier la collecte d'avis Google. QR code temporaire, dashboard restaurant.",
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Multi-tenant'],
    status: 'Livré en production',
    link: 'https://ryturn.fr/',
    image: '/images/projects/saas.jpg',
    imageBg: 'linear-gradient(135deg, #0a0a18 0%, #0d1a2e 100%)',
  },
  {
    number: '02',
    title: 'Bel Institut',
    badge: 'Site Client',
    description: 'Site pour un institut de maquillage permanent. Design élégant, réservation, témoignages clients.',
    tags: ['Next.js', 'React', 'TypeScript', 'Responsive'],
    status: 'En ligne',
    link: 'https://belmaquillagepermanent.fr/',
    image: '/images/projects/bel.jpg',
    imageBg: 'linear-gradient(135deg, #180a14 0%, #2e0d1a 100%)',
  },
  {
    number: '03',
    title: 'App École 89',
    badge: 'Application Interne',
    description: 'Suivi pédagogique : présences, notes, progression. Sécurité intégrée dès la conception.',
    tags: ['React', 'Symfony', 'PHP', 'SQL'],
    status: 'Déployé en interne',
    image: '/images/projects/ecole89.jpg',
    imageBg: 'linear-gradient(135deg, #0a0f18 0%, #05141a 100%)',
  },
];

const DWELL = 0.33;

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

  /* ── Desktop: scale active=1.15, inactive=0.68 ── */
  const card0ScaleD = useTransform(smooth, [0, 0.22, DWELL + 0.08], [1.15, 1.15, 0.68]);
  const card1ScaleD = useTransform(smooth,
    [DWELL - 0.08, DWELL + 0.04, DWELL * 2 - 0.04, DWELL * 2 + 0.08],
    [0.68, 1.15, 1.15, 0.68]);
  const card2ScaleD = useTransform(smooth, [DWELL * 2 - 0.08, DWELL * 2 + 0.04, 1], [0.68, 1.15, 1.15]);

  /* ── Mobile: translate X so only active card is centered ── */
  // card width ≈ 75vw, gap 16px — translate to center each
  const mobileX = useTransform(smooth,
    [0, DWELL - 0.05, DWELL + 0.05, DWELL * 2 - 0.05, DWELL * 2 + 0.05, 1],
    ['0vw', '0vw', '-82vw', '-82vw', '-164vw', '-164vw']
  );

  /* ── opacity: active=1, inactive=0.28 ── */
  const card0Op = useTransform(smooth, [0, 0.22, DWELL + 0.08], [1, 1, 0.28]);
  const card1Op = useTransform(smooth,
    [DWELL - 0.08, DWELL + 0.04, DWELL * 2 - 0.04, DWELL * 2 + 0.08],
    [0.28, 1, 1, 0.28]);
  const card2Op = useTransform(smooth, [DWELL * 2 - 0.08, DWELL * 2 + 0.04, 1], [0.28, 1, 1]);
  const cardOpacities = [card0Op, card1Op, card2Op];

  /* ── dashed border: active=1, inactive=0 ── */
  const card0Border = useTransform(smooth, [0, 0.22, DWELL + 0.08], [1, 1, 0]);
  const card1Border = useTransform(smooth,
    [DWELL - 0.08, DWELL + 0.04, DWELL * 2 - 0.04, DWELL * 2 + 0.08],
    [0, 1, 1, 0]);
  const card2Border = useTransform(smooth, [DWELL * 2 - 0.08, DWELL * 2 + 0.04, 1], [0, 1, 1]);
  const cardBorders  = [card0Border, card1Border, card2Border];
  const cardScalesD  = [card0ScaleD, card1ScaleD, card2ScaleD];

  return (
    <div ref={outerRef} style={{ height: '400vh', position: 'relative' }}>
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
              scroll →
            </span>
          </motion.div>
        </div>

        {/* ── DESKTOP: 3 cards côte à côte ── */}
        {!isMobile && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            padding: '0 5vw 40px',
          }}>
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                style={{
                  width: 'clamp(180px, 22vw, 280px)',
                  aspectRatio: '3 / 4',
                  flexShrink: 0,
                  scale: cardScalesD[i],
                  opacity: cardOpacities[i],
                  borderRadius: '18px',
                  overflow: 'visible',
                  position: 'relative',
                  transformOrigin: 'center center',
                  userSelect: 'none',
                }}
              >
                <CardInner project={project} borderOp={cardBorders[i]} />
              </motion.div>
            ))}
          </div>
        )}

        {/* ── MOBILE: 1 card centrée, les autres débordent sur les côtés ── */}
        {isMobile && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
            <motion.div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7vw',
              paddingLeft: '12.5vw', /* center first card: (100 - 75) / 2 */
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
                  <CardInner project={project} borderOp={cardBorders[i]} />
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

/* ── Card content (shared desktop + mobile) ── */
function CardInner({ project, borderOp }: {
  project: Project;
  borderOp: MotionValue<number>;
}) {
  return (
    <>
      {/* Dashed gold border */}
      <motion.div style={{
        position: 'absolute', inset: '-8px',
        borderRadius: '24px',
        border: '2px dashed rgba(212,175,55,0.7)',
        boxShadow: '0 0 16px rgba(212,175,55,0.18)',
        pointerEvents: 'none',
        opacity: borderOp,
      }} />

      {/* Inner clipped card */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: '18px', overflow: 'hidden',
        boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
      }}>
        {/* BG */}
        <div style={{ position: 'absolute', inset: 0, background: project.imageBg }}>
          <img
            src={project.image} alt={project.title} draggable={false}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
          />
        </div>

        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 28%, rgba(0,0,0,0.6) 62%, rgba(0,0,0,0.96) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem',
            color: '#d4af37', background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '999px', padding: '4px 10px',
            letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            {project.badge}
          </span>
          <span style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '-0.02em' }}>
            {project.number}
          </span>
        </div>

        {/* Bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(14px,2.5vw,20px)' }}>
          <h3 style={{
            fontFamily: 'Archivo Black, Arial Black, sans-serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            fontWeight: 900, color: '#f1f5f9',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            margin: '0 0 6px',
          }}>
            {project.title}
          </h3>

          <p style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 'clamp(0.72rem, 1.2vw, 0.82rem)',
            color: 'rgba(148,163,184,0.85)',
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
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4af37', boxShadow: '0 0 5px rgba(212,175,55,0.7)', display: 'block', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#64748b' }}>{project.status}</span>
            </div>
            {project.link ? (
              <a
                href={project.link} target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', fontWeight: 600,
                  color: '#d4af37', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '4px', outline: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Voir →
              </a>
            ) : (
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#334155', fontStyle: 'italic' }}>Confidentiel</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ActiveDots({ smooth }: { smooth: ReturnType<typeof useSpring> }) {
  const dot0 = useTransform(smooth, [0, DWELL - 0.05, DWELL + 0.05], [1, 1, 0.22]);
  const dot1 = useTransform(smooth,
    [DWELL - 0.05, DWELL + 0.05, DWELL * 2 - 0.05, DWELL * 2 + 0.05],
    [0.22, 1, 1, 0.22]);
  const dot2 = useTransform(smooth, [DWELL * 2 - 0.05, DWELL * 2 + 0.05, 1], [0.22, 1, 1]);

  return (
    <div style={{
      position: 'absolute', bottom: '18px', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', gap: '8px', zIndex: 10,
    }}>
      {[dot0, dot1, dot2].map((op, i) => (
        <motion.div key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#d4af37', boxShadow: '0 0 5px rgba(212,175,55,0.6)',
          opacity: op,
        }} />
      ))}
    </div>
  );
}
