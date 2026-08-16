'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { DUR, EASE } from '@/lib/animations';
import { ETHOS } from '@/lib/constants';
import { Reveal } from '@/components/anim/Reveal';
import { SplitText } from '@/components/anim/SplitText';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import styles from './SplitLayout.module.css';

export function SplitLayout() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      // Clip-path mask reveal + slow zoom on the image.
      gsap.fromTo(
        `.${styles.figure}`,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: DUR.epic,
          ease: EASE.inOut,
          scrollTrigger: { trigger: el, start: 'top 75%' },
        },
      );
      gsap.from(`.${styles.figure} img`, {
        scale: 1.3,
        duration: DUR.epic,
        ease: EASE.out,
        scrollTrigger: { trigger: el, start: 'top 75%' },
      });
      gsap.to(`.${styles.figureInner}`, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="ethos" ref={root} className={`section ${styles.section}`}>
      <div className={styles.grid}>
        <div className={styles.figure}>
          <div className={styles.figureInner}>
            <Image
              src="/media/strength.jpg"
              alt="Athlete training in low light"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className={styles.image}
            />
          </div>
          <span className={`mono ${styles.figCaption}`}>Fig. 04 — Load</span>
        </div>

        <div className={styles.body}>
          <Reveal as="span" className="mono mono--lime">
            05 — {ETHOS.eyebrow}
          </Reveal>

          <h2 className={`serif ${styles.headline}`}>
            <SplitText lines={[ETHOS.serif]} stagger={0} />
            <span className={styles.accent}>
              <SplitText lines={[ETHOS.serifAccent]} stagger={0} start="top 80%" />
            </span>
          </h2>

          <Reveal as="p" className={styles.copy} start="top 85%" blur>
            {ETHOS.body.join(' ')}
          </Reveal>

          <dl className={styles.meta}>
            {ETHOS.meta.map((m, i) => (
              <Reveal as="div" key={m.k} className={styles.metaRow} delay={i * 0.08}>
                <dt className="mono">{m.k}</dt>
                <dd className={styles.metaValue}>{m.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
