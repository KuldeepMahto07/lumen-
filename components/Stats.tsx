'use client';

import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { DUR, EASE } from '@/lib/animations';
import { STATS } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import styles from './Stats.module.css';

export function Stats() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.item}`, {
        y: 60,
        autoAlpha: 0,
        duration: DUR.slow,
        ease: EASE.out,
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: 'top 78%' },
      });
      gsap.from(`.${styles.rule}`, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: DUR.slow,
        ease: EASE.out,
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: 'top 78%' },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className={`section ${styles.section}`} aria-label="Ride telemetry">
      <div ref={root} className={styles.grid}>
        {STATS.map((s, i) => (
          <div key={s.label} className={styles.item}>
            {i > 0 && <span className={styles.rule} aria-hidden="true" />}
            <p className={styles.value}>
              {s.value}
              {s.unit && <span className={styles.unit}>{s.unit}</span>}
            </p>
            <p className="mono">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
