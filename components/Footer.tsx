'use client';

import { BRAND, NAV_SECTIONS } from '@/lib/constants';
import { getLenis } from '@/hooks/useSmoothScroll';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.4 });
    else target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={`section ${styles.footer}`}>
      <div className={styles.top}>
        <button className={styles.wordmark} onClick={() => goTo('hero')}>
          {BRAND.name}
        </button>
        <p className={styles.blurb}>
          {BRAND.discipline} collective — {BRAND.city}.<br />
          {BRAND.tagline} {BRAND.coords}
        </p>
      </div>

      <nav className={styles.cols} aria-label="Footer">
        <div className={styles.col}>
          <span className="mono">Index</span>
          <ul>
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <button onClick={() => goTo(s.id)} className={styles.link}>
                  <span className={styles.linkIndex}>{s.index}</span>
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <span className="mono">Channels</span>
          <ul>
            <li><a className={styles.link} href="#">Instagram</a></li>
            <li><a className={styles.link} href="#">Strava club</a></li>
            <li><a className={styles.link} href="#">Journal</a></li>
            <li><a className={styles.link} href="mailto:ride@lumen.cc">ride@lumen.cc</a></li>
          </ul>
        </div>
      </nav>

      <div className={styles.base}>
        <span className="mono">© {year} {BRAND.name}</span>
        <span className="mono">Hold the line</span>
        <span className="mono">Made in {BRAND.city}</span>
      </div>
    </footer>
  );
}
