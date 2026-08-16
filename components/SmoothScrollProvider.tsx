'use client';

import { useEffect, type ReactNode } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Mounts Lenis for the whole tree (unless the user prefers reduced motion) and
 * keeps GSAP's ScrollTrigger in lockstep with it.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  useSmoothScroll(!reduced);

  // Own scroll restoration ourselves: pinned/scrubbed ScrollTriggers must
  // initialise from the top, otherwise a restored offset lands every scrub
  // tween on its end state.
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}
