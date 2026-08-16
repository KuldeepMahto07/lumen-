'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Drives the whole page with Lenis smooth scrolling and hands the scroll clock
 * to GSAP so ScrollTrigger stays in perfect sync. Mounted once, near the root.
 * When the user prefers reduced motion we skip Lenis entirely and let the
 * browser scroll natively while still refreshing ScrollTrigger.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [enabled]);
}
