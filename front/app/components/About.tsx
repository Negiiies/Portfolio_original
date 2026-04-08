'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { marbleBg, marbleBorder, marbleShadow, CRACKS } from './MarbleCard';

const TIMELINE = [
  { period: '2025 – 2027', title: 'Master Expert Cybersécurité', place: 'École 89 — Ferrières-en-Brie', active: true },
  { period: '2022 – 2025', title: 'Bachelor CDA — RNCP Niv. 6', place: 'École 89', active: false },
  { period: '2022',         title: 'Bac Général — NSI & SES',    place: 'Lycée Val de Durance, Pertuis', active: false },
];

const FACTS = [
  { label: 'Localisation', value: 'Île de France', href: undefined },
  { label: 'Langues',      value: 'FR · EN B1 · VI C1', href: undefined },
  { label: 'Email',        value: 'Dylanle372@gmail.com', href: 'mailto:Dylanle372@gmail.com' },
  { label: 'GitHub',       value: 'github.com/Negiiies',  href: 'https://github.com/Negiiies' },
];

export default function About() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: '#000', padding: '120px 6vw', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 45% at 20% 60%, rgba(212,175,55,0.03) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8125rem', color: '#64748b', letterSpacing: '0.15em', marginBottom: '14px' }}>
            {'< 04 />'}
          </p>
          <h2 style={{
            fontFamily: 'Archivo Black, Arial Black, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, color: '#f1f5f9',
            letterSpacing: '-0.04em', lineHeight: 1, margin: 0,
          }}>
            À propos
          </h2>
          <div style={{ marginTop: '20px', height: '2px', width: '48px', borderRadius: '1px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>

          {/* Left — Bio + Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: '48px' }}
            >
              <p style={{
                fontFamily: 'Archivo Black, Arial Black, sans-serif',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                fontWeight: 900, color: '#f1f5f9',
                letterSpacing: '-0.02em', lineHeight: 1.3, margin: '0 0 24px',
              }}>
                Développeur Full-Stack<br />
                <span style={{ color: '#d4af37' }}>orienté sécurité.</span>
              </p>
              <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem', color: '#64748b', lineHeight: 1.8, margin: 0 }}>
                Je conçois des applications web robustes en combinant une expertise
                full-stack et une spécialisation en cybersécurité. Chaque ligne de code
                est pensée avec la sécurité dès la conception.
              </p>
            </motion.div>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '10px 18px',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '999px', marginBottom: '56px',
              }}
            >
              <span style={{ position: 'relative', display: 'inline-flex' }}>
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  background: '#10b981', opacity: 0.4,
                  animation: 'ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
                }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'block' }} />
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', color: '#10b981', fontWeight: 500 }}>
                Disponible pour alternance
              </span>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#334155', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '24px' }}>
                Formation
              </div>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                <div style={{
                  position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '1px',
                  background: 'linear-gradient(to bottom, #d4af37, rgba(212,175,55,0.05))',
                }} />
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                    style={{ display: 'flex', gap: '20px', paddingBottom: '28px', position: 'relative' }}
                  >
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '50%',
                      border: '2px solid #d4af37',
                      background: item.active ? '#d4af37' : '#000',
                      boxShadow: item.active ? '0 0 12px rgba(212,175,55,0.6)' : 'none',
                      flexShrink: 0, marginTop: '2px', position: 'relative', zIndex: 1,
                    }} />
                    <div>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#d4af37', marginBottom: '4px' }}>{item.period}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9375rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '2px' }}>{item.title}</div>
                      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#475569' }}>{item.place}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Marble info card */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: '20px',
              background: marbleBg,
              border: marbleBorder,
              boxShadow: marbleShadow,
              padding: '40px',
            }}>
              {CRACKS[2]}
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#4a3f1a', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '28px' }}>
                  Infos
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {FACTS.map((fact, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                      gap: '16px', padding: '16px 0',
                      borderBottom: i < FACTS.length - 1 ? '1px solid rgba(212,175,55,0.08)' : 'none',
                    }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#4a3f1a', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
                        {fact.label}
                      </span>
                      {fact.href ? (
                        <a
                          href={fact.href}
                          target={fact.href.startsWith('http') ? '_blank' : undefined}
                          rel={fact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s', textAlign: 'right' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
                        >
                          {fact.value}
                        </a>
                      ) : (
                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#94a3b8', textAlign: 'right' }}>{fact.value}</span>
                      )}
                    </div>
                  ))}
                </div>

                <a
                  href="/cv.pdf"
                  download
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    marginTop: '32px', padding: '14px 28px',
                    border: '1px solid rgba(212,175,55,0.35)',
                    borderRadius: '10px',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 600,
                    color: '#d4af37', textDecoration: 'none',
                    transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'rgba(212,175,55,0.07)';
                    el.style.borderColor = '#d4af37';
                    el.style.boxShadow = '0 0 20px rgba(212,175,55,0.15)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'transparent';
                    el.style.borderColor = 'rgba(212,175,55,0.35)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Télécharger le CV
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }`}</style>
    </section>
  );
}
