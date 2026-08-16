'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { getLenis } from '@/hooks/useSmoothScroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import { NAV_SECTIONS, BRAND } from '@/lib/constants';
import styles from './Navigation.module.css';

export function Navigation() {
  const ids = NAV_SECTIONS.map((s) => s.id);
  const active = useActiveSection(ids);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [hidden, setHidden] = useState(false);
  const [overLight, setOverLight] = useState(false);
  const lastY = useRef(0);

  // Scroll-progress fill + hide-on-scroll-down / show-on-scroll-up.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${self.progress})`;
        }
        const y = self.scroll();
        setHidden(y > lastY.current && y > 600);
        lastY.current = y;
      },
    });

    // Flip the nav ink to dark while a light-themed section sits under it.
    const lights = gsap.utils.toArray<HTMLElement>('[data-theme="light"]');
    const inkTriggers = lights.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 8%',
        end: 'bottom 8%',
        onToggle: (self) => setOverLight(self.isActive),
      }),
    );

    return () => {
      st.kill();
      inkTriggers.forEach((t) => t.kill());
    };
  }, []);

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`${styles.header} ${hidden ? styles.headerHidden : ''} ${
        overLight ? styles.headerLight : ''
      }`}
      data-nav
    >
      <button className={styles.brand} onClick={() => goTo('hero')} aria-label="LUMEN home">
        <span className={styles.brandMark}>◑</span>
        <span className={styles.brandName}>{BRAND.name}</span>
      </button>

      <div className={styles.center}>
        <span className="mono">
          {BRAND.discipline} <span className={styles.slash}>/</span> {BRAND.city}
        </span>
      </div>

      <nav className={styles.pill} aria-label="Sections">
        <span className={styles.pillMark} aria-hidden="true" />
        <ul className={styles.ticks}>
          {NAV_SECTIONS.map((s) => (
            <li key={s.id}>
              <button
                className={`${styles.tick} ${active === s.id ? styles.tickActive : ''}`}
                onClick={() => goTo(s.id)}
                aria-current={active === s.id ? 'true' : undefined}
              >
                <span className={styles.tickIndex}>{s.index}</span>
                <span className={styles.tickLabel}>{s.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <span className={styles.progressTrack} aria-hidden="true">
          <span ref={progressRef} className={styles.progressFill} />
        </span>
      </nav>
    </header>
  );
}
