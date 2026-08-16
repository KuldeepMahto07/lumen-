'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far the element follows the cursor (0–1). */
  strength?: number;
};

/**
 * Wraps an interactive element so it gently drifts toward the cursor while
 * hovered and springs back on leave. No-op under reduced motion / touch.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out' });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}
