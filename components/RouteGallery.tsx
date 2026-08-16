'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { EASE } from '@/lib/animations';
import { ROUTES } from '@/lib/constants';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import styles from './RouteGallery.module.css';

export function RouteGallery() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr || reduced) return;

    const ctx = gsap.context(() => {
      const distance = () => tr.scrollWidth - window.innerWidth;

      const horizontal = gsap.to(tr, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + distance(),
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Per-panel entrances tied to the horizontal scroll container.
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.panel}`);
      panels.forEach((panel) => {
        const name = panel.querySelector(`.${styles.name}`);
        const details = panel.querySelectorAll('[data-route-detail]');
        if (name) {
          gsap.from(name, {
            xPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          });
        }
        if (details.length) {
          gsap.from(details, {
            yPercent: 60,
            autoAlpha: 0,
            duration: 0.8,
            ease: EASE.out,
            stagger: 0.08,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left 62%',
            },
          });
        }
      });

      ScrollTrigger.refresh();
    }, sec);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="routes"
      ref={section}
      className={styles.section}
      data-theme="light"
      aria-label="Routes"
    >
      <div ref={track} className={`${styles.track} ${reduced ? styles.trackStacked : ''}`}>
        {/* Intro panel */}
        <div className={`${styles.panel} ${styles.intro}`}>
          <span className="mono">03 — Routes</span>
          <h2 className={styles.introTitle}>
            <span>Three lines.</span>
            <span className={styles.introSerif}>No ranking.</span>
          </h2>
          <div className={styles.introFoot}>
            <span className="mono">Drag / scroll to traverse</span>
            <span className={styles.arrow}>→→→</span>
          </div>
        </div>

        {/* Route panels */}
        {ROUTES.map((route) => (
          <article key={route.name} className={styles.panel}>
            <div className={styles.routeTop}>
              <span className="mono" data-route-detail>
                Route / {route.index}
              </span>
              <span className="mono" data-route-detail>
                {route.surface}
              </span>
            </div>

            <div className={styles.routeMain}>
              <h3 className={styles.name}>{route.name}</h3>
              <p className={styles.subtitle} data-route-detail>
                {route.subtitle}
              </p>
            </div>

            <div className={styles.routeFoot}>
              <p className={styles.detail} data-route-detail>
                {route.detail}
              </p>
              <div className={styles.metric} data-route-detail>
                <span className={styles.metricValue}>{route.distance}</span>
                <span className="mono">Total distance</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
