'use client';

import React from 'react';

/* ── Marble CSS background ── */
export const marbleBg = `
  linear-gradient(112deg,
    transparent 0%, transparent 24%,
    rgba(212,175,55,0.07) 24.5%, rgba(255,215,0,0.16) 25%, rgba(212,175,55,0.06) 25.5%,
    transparent 27%),
  linear-gradient(68deg,
    transparent 55%, rgba(212,175,55,0.05) 56.5%, rgba(255,215,0,0.12) 57%, rgba(212,175,55,0.04) 57.5%,
    transparent 59%),
  linear-gradient(148deg,
    transparent 8%, rgba(255,255,255,0.015) 10%, rgba(255,255,255,0.035) 11%, transparent 13%),
  linear-gradient(212deg,
    transparent 30%, rgba(255,255,255,0.01) 33%, rgba(255,255,255,0.025) 34%, transparent 36%),
  radial-gradient(ellipse at 25% 35%, rgba(28,22,10,0.9) 0%, transparent 65%),
  #0f0d09
`;

export const marbleBorder = '1px solid rgba(212,175,55,0.22)';
export const marbleShadow = '0 0 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.08), inset 0 0 80px rgba(0,0,0,0.4)';
export const marbleGlow   = '0 0 60px rgba(212,175,55,0.1)';

/* ── Gold crack SVG patterns ── */
const CRACK_A = (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.55 }}>
    <defs>
      <linearGradient id="ga" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stopColor="#b8860b" stopOpacity="0" />
        <stop offset="30%"  stopColor="#ffd700" stopOpacity="1" />
        <stop offset="70%"  stopColor="#d4af37" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
      </linearGradient>
      <filter id="fa"><feGaussianBlur stdDeviation="0.3" /></filter>
    </defs>
    {/* main crack */}
    <path d="M 78 2 L 62 18 L 69 36 L 54 58 L 60 78 L 48 95" stroke="url(#ga)" strokeWidth="0.8" filter="url(#fa)" />
    {/* glow duplicate */}
    <path d="M 78 2 L 62 18 L 69 36 L 54 58 L 60 78 L 48 95" stroke="#ffd700" strokeWidth="0.25" opacity="0.6" />
    {/* branches */}
    <path d="M 62 18 L 84 28 L 96 22" stroke="url(#ga)" strokeWidth="0.5" opacity="0.7" />
    <path d="M 54 58 L 36 64 L 28 76" stroke="url(#ga)" strokeWidth="0.4" opacity="0.5" />
    <path d="M 28 76 L 18 72" stroke="url(#ga)" strokeWidth="0.3" opacity="0.3" />
  </svg>
);

const CRACK_B = (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.55 }}>
    <defs>
      <linearGradient id="gb" x1="100%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%"   stopColor="#b8860b" stopOpacity="0" />
        <stop offset="35%"  stopColor="#ffd700" stopOpacity="1" />
        <stop offset="65%"  stopColor="#d4af37" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
      </linearGradient>
      <filter id="fb"><feGaussianBlur stdDeviation="0.3" /></filter>
    </defs>
    <path d="M 5 80 L 22 62 L 16 44 L 34 22 L 44 4" stroke="url(#gb)" strokeWidth="0.8" filter="url(#fb)" />
    <path d="M 5 80 L 22 62 L 16 44 L 34 22 L 44 4" stroke="#ffd700" strokeWidth="0.25" opacity="0.6" />
    <path d="M 22 62 L 4 52 L 2 40" stroke="url(#gb)" strokeWidth="0.5" opacity="0.6" />
    <path d="M 34 22 L 54 30 L 68 24" stroke="url(#gb)" strokeWidth="0.4" opacity="0.5" />
    <path d="M 68 24 L 80 18" stroke="url(#gb)" strokeWidth="0.3" opacity="0.3" />
  </svg>
);

const CRACK_C = (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.55 }}>
    <defs>
      <linearGradient id="gc" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%"   stopColor="#b8860b" stopOpacity="0" />
        <stop offset="30%"  stopColor="#ffd700" stopOpacity="0.9" />
        <stop offset="70%"  stopColor="#d4af37" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
      </linearGradient>
      <filter id="fc"><feGaussianBlur stdDeviation="0.3" /></filter>
    </defs>
    <path d="M 52 0 L 42 24 L 57 48 L 46 72 L 52 98" stroke="url(#gc)" strokeWidth="0.8" filter="url(#fc)" />
    <path d="M 52 0 L 42 24 L 57 48 L 46 72 L 52 98" stroke="#ffd700" strokeWidth="0.25" opacity="0.6" />
    <path d="M 42 24 L 20 34 L 10 28" stroke="url(#gc)" strokeWidth="0.5" opacity="0.6" />
    <path d="M 57 48 L 78 54 L 88 46" stroke="url(#gc)" strokeWidth="0.4" opacity="0.5" />
    <path d="M 46 72 L 62 78 L 72 88" stroke="url(#gc)" strokeWidth="0.3" opacity="0.4" />
  </svg>
);

const CRACK_D = (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.45 }}>
    <defs>
      <linearGradient id="gd" x1="0%" y1="0%" x2="100%" y2="80%">
        <stop offset="0%"   stopColor="#b8860b" stopOpacity="0" />
        <stop offset="40%"  stopColor="#ffd700" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#b8860b" stopOpacity="0" />
      </linearGradient>
      <filter id="fd"><feGaussianBlur stdDeviation="0.3" /></filter>
    </defs>
    <path d="M 10 5 L 28 22 L 22 40 L 40 55 L 35 75 L 55 88 L 68 98" stroke="url(#gd)" strokeWidth="0.7" filter="url(#fd)" />
    <path d="M 10 5 L 28 22 L 22 40 L 40 55 L 35 75 L 55 88 L 68 98" stroke="#ffd700" strokeWidth="0.2" opacity="0.5" />
    <path d="M 28 22 L 50 15 L 60 8" stroke="url(#gd)" strokeWidth="0.4" opacity="0.5" />
    <path d="M 40 55 L 62 50 L 78 55" stroke="url(#gd)" strokeWidth="0.35" opacity="0.4" />
  </svg>
);

export const CRACKS = [CRACK_A, CRACK_B, CRACK_C, CRACK_D];

interface MarbleCardProps {
  children: React.ReactNode;
  crackIndex?: number;
  style?: React.CSSProperties;
}

export default function MarbleCard({ children, crackIndex = 0, style }: MarbleCardProps) {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '20px',
      background: marbleBg,
      border: marbleBorder,
      boxShadow: marbleShadow,
      ...style,
    }}>
      {CRACKS[crackIndex % CRACKS.length]}
      {children}
    </div>
  );
}
