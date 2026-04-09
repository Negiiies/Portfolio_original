'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const MARQUEE_ITEMS = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'PHP', 'Symfony',
  'SQL', 'Python', 'HTML', 'CSS', 'C', 'C++', 'Rust', 'Docker',
  'Git', 'Figma', 'VSCode', 'WSL', 'Adobe XD', 'PostgreSQL',
];

const CYBER = [
  { cmd: 'whoami',          out: 'red-team · pentest · ctf' },
  { cmd: 'cat tools.txt',   out: 'Kali Linux · Burp Suite · Nmap' },
  { cmd: 'ls /skills/sec',  out: 'ISO 27001  RGPD  AppSec  Docker' },
  { cmd: './ctf --stats',   out: 'Root-Me ✓  TryHackMe ✓  HTB ✓' },
  { cmd: 'systemctl status',out: 'Red Team ● active (running)' },
];

function Terminal() {
  const [lines, setLines] = useState<{ cmd: string; out: string; done: boolean }[]>([]);
  const [typing, setTyping] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let li = 0;
    const next = () => {
      if (li >= CYBER.length) return;
      const { cmd, out } = CYBER[li];
      let ci = 0;
      const t = setInterval(() => {
        ci++;
        setTyping(cmd.slice(0, ci));
        if (ci >= cmd.length) {
          clearInterval(t);
          setLines(prev => [...prev, { cmd, out, done: true }]);
          setTyping('');
          li++;
          setTimeout(next, 400);
        }
      }, 38);
    };
    setTimeout(next, 600);
  }, [inView]);

  return (
    <div ref={ref} style={{
      background: '#03050a',
      borderRadius: '16px',
      border: '1px solid rgba(0,212,255,0.12)',
      boxShadow: '0 0 40px rgba(0,212,255,0.05)',
      overflow: 'hidden',
      height: '100%',
    }}>
      {/* Terminal titlebar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        {['#ef4444','#f59e0b','#10b981'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
        ))}
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#334155', marginLeft: 8, letterSpacing: '0.1em' }}>
          sec@portfolio ~ %
        </span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: '20px', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', lineHeight: 1.8 }}>
        {lines.map((line, i) => (
          <div key={i}>
            <div>
              <span style={{ color: '#00d4ff', opacity: 0.5 }}>~ </span>
              <span style={{ color: '#64748b' }}>$ </span>
              <span style={{ color: '#e2e8f0' }}>{line.cmd}</span>
            </div>
            <div style={{ color: '#d4c080', opacity: 0.8, paddingLeft: '12px', marginBottom: '6px' }}>
              {line.out}
            </div>
          </div>
        ))}
        {typing && (
          <div>
            <span style={{ color: '#00d4ff', opacity: 0.5 }}>~ </span>
            <span style={{ color: '#64748b' }}>$ </span>
            <span style={{ color: '#e2e8f0' }}>{typing}</span>
            <span style={{ animation: 'blink 1s step-end infinite', color: '#00d4ff' }}>▋</span>
          </div>
        )}
      </div>
    </div>
  );
}

function DevGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const STACK = [
    { name: 'Next.js',    color: '#ffffff' },
    { name: 'React',      color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Node.js',    color: '#68a063' },
    { name: 'PHP',        color: '#8892be' },
    { name: 'Symfony',    color: '#000000', bg: '#fff' },
    { name: 'SQL',        color: '#f29111' },
    { name: 'Python',     color: '#ffd43b' },
    { name: 'C / C++',    color: '#659ad2' },
    { name: 'Rust',       color: '#ce4123' },
    { name: 'HTML/CSS',   color: '#e34c26' },
    { name: 'Docker',     color: '#2496ed' },
  ];

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
      {STACK.map((s, i) => (
        <motion.div
          key={s.name}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '14px 10px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            cursor: 'default', transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
          }}
          whileHover={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            borderColor: s.color + '55',
            boxShadow: `0 0 20px ${s.color}22`,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
          <span style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.7rem', color: '#94a3b8',
            letterSpacing: '0.02em', textAlign: 'center', lineHeight: 1.3,
          }}>
            {s.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      id="skills"
      ref={ref}
      style={{ background: '#000', padding: '120px 0', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 20% 50%, rgba(0,212,255,0.03) 0%, transparent 70%)',
      }} />

      {/* Header */}
      <div style={{ padding: '0 6vw', maxWidth: '1100px', margin: '0 auto 64px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8125rem', color: '#64748b', letterSpacing: '0.15em', marginBottom: '14px' }}>
            {'< 03 />'}
          </p>
          <h2 style={{
            fontFamily: 'Archivo Black, Arial Black, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900, color: '#f1f5f9',
            letterSpacing: '-0.04em', lineHeight: 1, margin: 0,
          }}>
            Stack &amp;<br />
            <span style={{ color: '#d4af37' }}>Compétences</span>
          </h2>
          <div style={{ marginTop: '20px', height: '2px', width: '48px', borderRadius: '1px', background: 'linear-gradient(90deg, #d4af37, transparent)' }} />
        </motion.div>
      </div>

      {/* ── Infinite marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ overflow: 'hidden', marginBottom: '64px', position: 'relative' }}
      >
        {/* fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #000, transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #000, transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <div style={{ display: 'flex', gap: '16px', animation: 'marqueeL 28s linear infinite', width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div key={i} style={{
              padding: '8px 20px',
              borderRadius: '999px',
              border: '1px solid rgba(212,175,55,0.2)',
              background: 'rgba(212,175,55,0.04)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem', color: '#94a3b8',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {item}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', animation: 'marqueeR 22s linear infinite', width: 'max-content', marginTop: '12px' }}>
          {[...doubled].reverse().map((item, i) => (
            <div key={i} style={{
              padding: '8px 20px',
              borderRadius: '999px',
              border: '1px solid rgba(0,212,255,0.12)',
              background: 'rgba(0,212,255,0.03)',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.75rem', color: '#64748b',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {item}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Grid : dev + terminal ── */}
      <div style={{ padding: '0 6vw', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

          {/* Dev grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#d4af37', letterSpacing: '0.12em', marginBottom: '20px' }}>
              {'<dev />'}
            </div>
            <DevGrid />
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#00d4ff', letterSpacing: '0.12em', marginBottom: '20px' }}>
              {'<sec />'}
            </div>
            <Terminal />
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeL { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeR { from { transform: translateX(-50%) } to { transform: translateX(0) } }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </section>
  );
}
