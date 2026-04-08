'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { marbleBg, marbleBorder, marbleShadow, CRACKS } from './MarbleCard';

const DEV = [
  'Next.js / React',
  'TypeScript',
  'Node.js',
  'PHP / Symfony',
  'SQL',
  'Python',
  'HTML / CSS',
  'C / C++ / Rust',
];

const CYBER = [
  { name: 'Kali Linux',              prefix: '>_' },
  { name: 'Pentest (lab Docker)',    prefix: '>_' },
  { name: 'CTF · Root-Me · THM',    prefix: '//' },
  { name: 'Red Team',                prefix: '>_' },
  { name: 'ISO 27001',               prefix: '//' },
  { name: 'RGPD',                    prefix: '//' },
  { name: 'Sécurité applicative',    prefix: '>_' },
  { name: 'Docker / VirtualBox',     prefix: '>_' },
];

const TOOLS = ['Figma', 'Git', 'VSCode', 'Docker', 'WSL', 'Adobe XD'];

export default function Skills() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="skills"
      ref={ref}
      style={{ background: '#000', padding: '120px 6vw', position: 'relative', overflow: 'hidden' }}
    >
      {/* Accent glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(212,175,55,0.04) 0%, transparent 70%)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8125rem', color: '#64748b',
            letterSpacing: '0.15em', marginBottom: '14px',
          }}>
            {'< 03 />'}
          </p>
          <h2 style={{
            fontFamily: 'Archivo Black, Arial Black, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, color: '#f1f5f9',
            letterSpacing: '-0.04em', lineHeight: 1, margin: 0,
          }}>
            Stack &amp;<br />Compétences
          </h2>
          <div style={{ marginTop: '20px', height: '2px', width: '48px', borderRadius: '1px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
        </motion.div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '32px' }}>

          {/* Dev list */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: '20px',
              background: marbleBg,
              border: marbleBorder,
              boxShadow: marbleShadow,
              padding: '36px',
            }}
          >
            {CRACKS[3]}
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#d4af37', letterSpacing: '0.12em' }}>
                  {'<dev />'}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,55,0.2)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {DEV.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
                  >
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.6rem', color: 'rgba(212,175,55,0.4)',
                      letterSpacing: '0.05em', flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.04)' }} />
                    <span style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontSize: '0.9375rem', color: '#e2e8f0',
                      letterSpacing: '-0.01em',
                    }}>
                      {name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cyber terminal */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative', overflow: 'hidden',
              borderRadius: '20px',
              background: marbleBg,
              border: marbleBorder,
              boxShadow: marbleShadow,
              padding: '36px',
            }}
          >
            {CRACKS[1]}
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6875rem', color: '#d4af37', letterSpacing: '0.12em' }}>
                  {'<sec />'}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(212,175,55,0.2)' }} />
              </div>

              <div style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <div style={{ marginBottom: '16px', color: 'rgba(212,175,55,0.35)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                  $ whoami --skills
                </div>
                {CYBER.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '9px 0',
                      borderBottom: i < CYBER.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <span style={{ color: '#b8960c', fontSize: '0.7rem', flexShrink: 0 }}>{item.prefix}</span>
                    <span style={{ fontSize: '0.8125rem', color: '#d4c080' }}>{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tools strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            borderTop: '1px solid rgba(212,175,55,0.08)',
            paddingTop: '40px',
            display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
          }}
        >
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem', color: '#334155',
            letterSpacing: '0.12em', textTransform: 'uppercase', flexShrink: 0,
          }}>
            Outils
          </span>
          {TOOLS.map((tool) => (
            <span key={tool} style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.8125rem', color: '#64748b',
              padding: '6px 16px',
              border: '1px solid rgba(212,175,55,0.12)',
              borderRadius: '999px',
            }}>
              {tool}
            </span>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
