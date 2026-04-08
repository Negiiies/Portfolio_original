'use client';
import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId: number;

    const SIZE = 600;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      el.style.transform = `translate(${currentX - SIZE / 2}px, ${currentY - SIZE / 2}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle at center, rgba(0,212,255,0.055) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9998,
        mixBlendMode: 'screen',
        willChange: 'transform',
      }}
    />
  );
}
