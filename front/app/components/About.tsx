'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const TIMELINE = [
  { period: '2025 – 2027', title: 'Master Expert Cybersécurité', place: 'École 89 — Ferrières-en-Brie', active: true },
  { period: '2022 – 2025', title: 'Bachelor CDA — RNCP Niv. 6', place: 'École 89', active: false },
  { period: '2022',         title: 'Bac Général — NSI & SES',    place: 'Lycée Val de Durance, Pertuis', active: false },
];

const FACTS = [
  { label: 'Localisation', value: 'Île de France' },
  { label: 'Langues',      value: 'FR · EN B1 · VI C1' },
  { label: 'Email',        value: 'Dylanle372@gmail.com', href: 'mailto:Dylanle372@gmail.com' },
  { label: 'GitHub',       value: 'github.com/Negiiies',  href: 'https://github.com/Negiiies' },
];

function IDCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{ perspective: '1200px', width: '100%', maxWidth: '420px', margin: '0 auto', aspectRatio: '0.63', cursor: 'pointer' }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* ── RECTO ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          borderRadius: '20px',
          background: 'linear-gradient(145deg, #0d0d0d 0%, #111008 50%, #0a0a0a 100%)',
          border: '1px solid rgba(212,175,55,0.25)',
          boxShadow: '0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.15)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          padding: '36px 32px',
        }}>
          {/* Holographic strip top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: 'linear-gradient(90deg, #d4af37, #00d4ff, #7c3aed, #d4af37)',
            backgroundSize: '200% 100%',
            animation: 'holoshimmer 3s linear infinite',
          }} />

          {/* Corner pattern */}
          <div style={{ position: 'absolute', top: 20, right: 20, opacity: 0.06 }}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              {[0,1,2,3,4].map(i => (
                <circle key={i} cx="30" cy="30" r={8 + i * 8} fill="none" stroke="#d4af37" strokeWidth="0.5"/>
              ))}
            </svg>
          </div>

          {/* Badge type */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#334155', letterSpacing: '0.15em' }}>
              PORTFOLIO · ID
            </span>
            <div style={{
              padding: '4px 10px', borderRadius: '4px',
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.3)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'block', boxShadow: '0 0 6px #10b981', animation: 'ping2 1.4s infinite' }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#10b981', letterSpacing: '0.1em' }}>AVAILABLE</span>
            </div>
          </div>

          {/* Avatar placeholder */}
          <div style={{
            width: '88px', height: '88px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #1a1400, #2e2500)',
            border: '1px solid rgba(212,175,55,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '28px',
            boxShadow: '0 0 24px rgba(212,175,55,0.1)',
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'Archivo Black, Arial Black, sans-serif', fontSize: '2rem', color: '#d4af37', letterSpacing: '-0.04em' }}>DL</span>
          </div>

          {/* Name */}
          <div style={{ marginBottom: 'auto' }}>
            <div style={{ fontFamily: 'Archivo Black, Arial Black, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', color: '#f1f5f9', letterSpacing: '-0.04em', lineHeight: 1 }}>
              LE<br />DYLAN
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', color: '#64748b', marginTop: '10px' }}>
              Développeur · Cybersécurité
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#d4af37', marginTop: '4px', opacity: 0.7 }}>
              École 89 · Paris
            </div>
          </div>

          {/* Bottom strip */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
            {/* Fake barcode */}
            <div style={{ display: 'flex', gap: '2px', marginBottom: '8px' }}>
              {Array.from({ length: 32 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: i % 3 === 0 ? '22px' : i % 5 === 0 ? '16px' : '18px',
                  background: `rgba(212,175,55,${0.08 + (i % 4) * 0.06})`,
                  borderRadius: '1px',
                }} />
              ))}
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#1e293b', letterSpacing: '0.15em', textAlign: 'center' }}>
              DL · 2025–2027 · CYBERS3CURITE
            </div>
          </div>

          {/* Flip hint */}
          <div style={{ position: 'absolute', bottom: 14, right: 16, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#1e293b', letterSpacing: '0.1em' }}>FLIP</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1e293b" strokeWidth="2">
              <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
          </div>
        </div>

        {/* ── VERSO ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '20px',
          background: 'linear-gradient(145deg, #0a0a0a 0%, #0d0f14 50%, #0a0800 100%)',
          border: '1px solid rgba(0,212,255,0.15)',
          boxShadow: '0 0 60px rgba(0,212,255,0.06)',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          padding: '28px 28px',
        }}>
          {/* Top strip */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #d4af37, #00d4ff)',
            backgroundSize: '200% 100%',
            animation: 'holoshimmer 3s linear infinite reverse',
          }} />

          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#334155', letterSpacing: '0.15em', marginBottom: '20px' }}>
            INFORMATIONS · DÉTAIL
          </div>

          {/* Facts */}
          <div style={{ marginBottom: '20px' }}>
            {FACTS.map((fact, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                gap: '12px', padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#334155', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
                  {fact.label}
                </span>
                {fact.href ? (
                  <a href={fact.href} target={fact.href.startsWith('http') ? '_blank' : undefined}
                    rel={fact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={e => e.stopPropagation()}
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#64748b', textDecoration: 'none', textAlign: 'right' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00d4ff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#64748b')}
                  >{fact.value}</a>
                ) : (
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#64748b', textAlign: 'right' }}>{fact.value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#334155', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
            Formation
          </div>
          <div style={{ position: 'relative', flex: 1 }}>
            <div style={{ position: 'absolute', left: '6px', top: '6px', bottom: '6px', width: '1px', background: 'linear-gradient(to bottom, #d4af37, rgba(212,175,55,0.05))' }} />
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: '14px' }}>
                <div style={{
                  width: '13px', height: '13px', borderRadius: '50%', flexShrink: 0,
                  border: '2px solid #d4af37',
                  background: item.active ? '#d4af37' : '#000',
                  boxShadow: item.active ? '0 0 10px rgba(212,175,55,0.6)' : 'none',
                  marginTop: '1px', position: 'relative', zIndex: 1,
                }} />
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#d4af37', marginBottom: '2px' }}>{item.period}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#e2e8f0', marginBottom: '1px' }}>{item.title}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#475569' }}>{item.place}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CV Button */}
          <a
            href="/cv.pdf" download
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px', borderRadius: '10px',
              background: 'linear-gradient(90deg, rgba(212,175,55,0.12), rgba(212,175,55,0.06))',
              border: '1px solid rgba(212,175,55,0.3)',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8125rem', fontWeight: 600,
              color: '#d4af37', textDecoration: 'none',
              transition: 'box-shadow 0.2s',
              marginTop: '8px',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 20px rgba(212,175,55,0.2)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Télécharger le CV
          </a>
        </div>
      </motion.div>

      <style>{`
        @keyframes holoshimmer { from { background-position: 0% 0% } to { background-position: 200% 0% } }
        @keyframes ping2 { 0%,100%{box-shadow:0 0 6px #10b981} 50%{box-shadow:0 0 14px #10b981} }
      `}</style>
    </div>
  );
}

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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '64px', alignItems: 'center' }}>

          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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
            <p style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '1rem', color: '#64748b', lineHeight: 1.8, margin: '0 0 40px' }}>
              Je conçois des applications web robustes en combinant une expertise
              full-stack et une spécialisation en cybersécurité. Chaque ligne de code
              est pensée avec la sécurité dès la conception.
            </p>

            {/* Hint */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
              </svg>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#334155', letterSpacing: '0.1em' }}>
                Cliquez la carte pour la retourner
              </span>
            </div>
          </motion.div>

          {/* Right — ID Card */}
          <motion.div
            initial={{ opacity: 0, x: 32, rotateY: -15 }}
            animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: '1200px' }}
          >
            <IDCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
