'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { DUR, EASE } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in seconds after the trigger fires. */
  delay?: number;
  /** Vertical travel distance in px. */
  y?: number;
  /** Whether to also fade in blur for a soft focus-pull. */
  blur?: boolean;
  /** ScrollTrigger start position. */
  start?: string;
};

/**
 * Generic scroll-in reveal: opacity + translate (+ optional blur), driven once
 * as the element enters the viewport. Respects reduced-motion by rendering the
 * final state immediately.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 40,
  blur = false,
  start = 'top 85%',
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y,
          filter: blur ? 'blur(12px)' : 'blur(0px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: DUR.slow,
          ease: EASE.reveal,
          delay,
          scrollTrigger: { trigger: el, start },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, delay, y, blur, start]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={reduced ? undefined : { opacity: 0, visibility: 'hidden' }}
    >
      {children}
    </Tag>
  );
}
