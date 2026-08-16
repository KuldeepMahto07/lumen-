'use client';

import { SplitText } from '@/components/anim/SplitText';
import { Reveal } from '@/components/anim/Reveal';
import styles from './Manifesto.module.css';

export function Manifesto() {
  return (
    <section id="manifesto" className={`section ${styles.section}`}>
      <div className={styles.head}>
        <Reveal as="span" className="mono mono--lime">
          02 — The ride
        </Reveal>
        <Reveal as="span" className="mono" delay={0.1}>
          No leaderboard · No numbers · Only the line
        </Reveal>
      </div>

      <h2 className={`display ${styles.headline}`}>
        <SplitText lines={['Ride what']} stagger={0} />
        <SplitText lines={['the city']} stagger={0} start="top 82%" />
        <span className={styles.accentLine}>
          <SplitText lines={['gives you.']} stagger={0} start="top 80%" />
        </span>
      </h2>

      <Reveal as="p" className={styles.support} start="top 88%" blur>
        Some mornings the road offers a tailwind. Some offer sheeting rain and a
        headwind that never lets go. We take the assignment either way — the
        weather is simply today&rsquo;s brief.
      </Reveal>
    </section>
  );
}
