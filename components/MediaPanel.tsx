'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { BRAND } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import styles from './MediaPanel.module.css';

const WORDS = ['Hold', 'the', 'line.'];

export function MediaPanel() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const sec = section.current;
    if (!sec || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          pin: `.${styles.viewport}`,
          start: 'top top',
          end: '+=140%',
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        `.${styles.imageInner}`,
        { scale: 1.25, yPercent: -6 },
        { scale: 1.05, yPercent: 6, ease: 'none' },
        0,
      )
        .from(
          `.${styles.word} span`,
          { yPercent: 115, stagger: 0.15, ease: 'power3.out', duration: 1 },
          0.1,
        )
        .from(
          `.${styles.counter}`,
          { autoAlpha: 0, x: 40, ease: 'power2.out', duration: 0.8 },
          0.2,
        )
        .to(`.${styles.scrim}`, { opacity: 0.85, ease: 'none' }, 0);

      ScrollTrigger.refresh();
    }, sec);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="protocol" ref={section} className={styles.section}>
      <div className={styles.viewport}>
        <div className={styles.media}>
          <div className={styles.imageInner}>
            <Image
              src="/media/dusk.jpg"
              alt="Rider on a wet dusk descent"
              fill
              sizes="100vw"
              className={styles.image}
            />
          </div>
          <div className={styles.scrim} />
        </div>

        <div className={styles.top}>
          <span className="mono">{BRAND.coords}</span>
          <span className="mono">Training ride / {BRAND.city} / Rain protocol</span>
        </div>

        <h2 className={styles.headline} aria-label="Hold the line.">
          {WORDS.map((w, i) => (
            <span key={i} className={styles.word} aria-hidden="true">
              <span>{w}</span>
            </span>
          ))}
        </h2>

        <div className={styles.counter} aria-hidden="true">
          <span className={styles.counterValue}>74</span>
          <span className={styles.counterUnit}>km</span>
        </div>
      </div>
    </section>
  );
}
