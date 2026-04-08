import { useEffect, useRef } from 'react';

interface LenisInstance {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo?: (target: number | string, options?: any) => void;
}

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

export const useLenisLight = (options?: LenisOptions) => {
  const lenisRef = useRef<LenisInstance | null>(null);

  useEffect(() => {
    let lenis: LenisInstance | null = null;
    let rafId: number;

    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        
        // Configuration ALLÉGÉE pour éviter les lags
        const lightOptions: LenisOptions = {
          duration: 1.0,          // Plus rapide = moins de calculs
          easing: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // Easing plus simple
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 0.8,   // Moins de transformations
          touchMultiplier: 1.5,   // Réduit pour mobile
          ...options,
        };

        lenis = new Lenis(lightOptions);
        lenisRef.current = lenis;

        // RAF optimisé - moins de calculs
        const raf = (time: number) => {
          if (lenis && lenisRef.current) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
          }
        };
        rafId = requestAnimationFrame(raf);

        if (process.env.NODE_ENV === 'development') {
          console.log('🚀 Lenis Light initialized');
        }

      } catch (error) {
        console.error('❌ Lenis Light failed:', error);
        // Fallback : pas de smooth scroll mais pas de crash
      }
    };

    initLenis();

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  const scrollTo = (target: number | string, options?: any) => {
    if (lenisRef.current?.scrollTo) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  const isReady = () => lenisRef.current !== null;

  return {
    lenis: lenisRef.current,
    scrollTo,
    isReady,
  };
};