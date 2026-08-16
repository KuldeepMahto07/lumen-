'use client';

import { useRef, type ElementType } from 'react';
import { gsap } from '@/lib/gsap';
import { DUR, EASE } from '@/lib/animations';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import styles from './SplitText.module.css';

type SplitTextProps = {
  /** Each entry becomes its own masked line. */
  lines: readonly string[] | string;
  as?: ElementType;
  className?: string;
  /** Stagger between lines in seconds. */
  stagger?: number;
  start?: string;
  /** When true the animation plays on mount rather than on scroll. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Masked line reveal. Each line sits in an overflow-hidden track and slides up
 * from below — the signature editorial entrance used across the site.
 */
export function SplitText({
  lines,
  as: Tag = 'span',
  className,
  stagger = 0.12,
  start = 'top 88%',
  immediate = false,
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const list = Array.isArray(lines) ? lines : [lines as string];

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(`.${styles.inner}`);
      gsap.set(targets, { yPercent: 110 });
      gsap.to(targets, {
        yPercent: 0,
        duration: DUR.slow,
        ease: EASE.out,
        stagger,
        delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced, stagger, start, immediate, delay]);

  return (
    <Tag ref={ref} className={className}>
      {list.map((line, i) => (
        <span key={i} className={styles.line}>
          <span
            className={styles.inner}
            style={reduced ? undefined : { transform: 'translateY(110%)' }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
