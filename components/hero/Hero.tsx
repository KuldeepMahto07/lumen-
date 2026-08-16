'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { DUR, EASE } from '@/lib/animations';
import { BRAND } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import styles from './Hero.module.css';

const WORDMARK = 'LUMEN'.split('');

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (!reduced) {
        // Intro timeline — image settles, chrome fades, wordmark rises.
        const tl = gsap.timeline({ defaults: { ease: EASE.out } });
        tl.from(`.${styles.imageInner}`, {
          scale: 1.35,
          duration: DUR.epic,
          ease: 'power2.out',
        })
          .fromTo(
            `.${styles.letter}`,
            { yPercent: 110 },
            { yPercent: 0, duration: DUR.slow, stagger: 0.08 },
            0.25,
          )
          .from(
            `[data-hero-fade]`,
            { autoAlpha: 0, y: 24, duration: DUR.base, stagger: 0.09 },
            0.6,
          );

        // Parallax on scroll: media drifts, wordmark lifts and fades.
        gsap.to(`.${styles.imageInner}`, {
          yPercent: 18,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
        gsap.to(`.${styles.wordmark}`, {
          yPercent: -30,
          autoAlpha: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="hero" ref={root} className={styles.hero} data-theme="dark">
      <div ref={media} className={styles.media}>
        <div className={styles.imageInner}>
          <Image
            src="/media/hero-runners.jpg"
            alt="Cyclists at first light"
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
        </div>
        <div className={styles.scrim} />
      </div>

      <div className={styles.top}>
        <span className="mono" data-hero-fade>
          {BRAND.tagline}
        </span>
        <span className="mono" data-hero-fade>
          Vol. 01 — Winter
        </span>
      </div>

      <div className={styles.center}>
        <h1 className={styles.wordmark} aria-label={BRAND.name}>
          {WORDMARK.map((ch, i) => (
            <span key={i} className={styles.letterMask} aria-hidden="true">
              <span className={styles.letter}>{ch}</span>
            </span>
          ))}
        </h1>
      </div>

      <div className={styles.bottom}>
        <div className={styles.coords} data-hero-fade>
          <span className="mono mono--lime">◦</span>
          <span className="mono">{BRAND.coords}</span>
        </div>
        <p className={styles.lede} data-hero-fade>
          A cycling collective that treats the city as a training surface —
          rain, gradient and wind logged as data, not obstacles.
        </p>
        <div className={styles.scroll} data-hero-fade>
          <span className="mono">Scroll</span>
          <span className={styles.scrollLine} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
