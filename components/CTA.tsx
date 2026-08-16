'use client';

import { Reveal } from '@/components/anim/Reveal';
import { SplitText } from '@/components/anim/SplitText';
import { Marquee } from '@/components/anim/Marquee';
import { Magnetic } from '@/components/anim/Magnetic';
import { QUOTE } from '@/lib/constants';
import styles from './CTA.module.css';

export function CTA() {
  return (
    <section id="join" className={styles.section}>
      <Marquee
        className={styles.marquee}
        items={['Hold the line', 'Ride the city', 'Read the weather', 'Never coast']}
        speed={28}
      />

      <div className={`section ${styles.inner}`}>
        <Reveal as="span" className="mono mono--lime">
          06 — Join
        </Reveal>

        <h2 className={`display ${styles.headline}`}>
          <SplitText lines={['Join the']} stagger={0} />
          <SplitText lines={['next ride.']} stagger={0} start="top 82%" />
        </h2>

        <div className={styles.row}>
          <Reveal as="p" className={styles.copy} start="top 90%">
            Departures every Saturday at first light. Bring a working bike, a
            rear light, and the willingness to hold a wheel. {QUOTE.attribution}
          </Reveal>

          <Magnetic strength={0.4}>
            <a href="#hero" className={styles.button}>
              <span className={styles.buttonLabel}>Request a place</span>
              <span className={styles.buttonIcon} aria-hidden="true">↗</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
