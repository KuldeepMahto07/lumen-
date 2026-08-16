'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import styles from './Marquee.module.css';

type MarqueeProps = {
  items: string[];
  /** Base seconds per loop; lower is faster. */
  speed?: number;
  className?: string;
  reverse?: boolean;
};

/**
 * Seamless marquee. Two identical tracks translate -50% in a linear loop;
 * scroll velocity nudges the speed for a reactive feel.
 */
export function Marquee({ items, speed = 22, className, reverse = false }: MarqueeProps) {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = track.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.set(el, { xPercent: reverse ? -50 : 0 });
      gsap.to(el, {
        xPercent: reverse ? 0 : -50,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    }, el);
    return () => ctx.revert();
  }, [reduced, speed, reverse]);

  const content = [...items, ...items];

  return (
    <div className={`${styles.wrap} ${className ?? ''}`} aria-hidden="true">
      <div ref={track} className={styles.track}>
        {content.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot}>◦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
