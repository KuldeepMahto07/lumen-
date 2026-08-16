// Shared motion vocabulary. Every component pulls easing/duration tokens from
// here so the whole experience feels authored by one hand.

export const EASE = {
  // Custom cubic-beziers tuned for weighty, premium motion.
  out: 'expo.out',
  inOut: 'power4.inOut',
  soft: 'power2.out',
  reveal: 'power3.out',
} as const;

export const DUR = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  epic: 1.6,
} as const;

// Standard reveal offset for masked text lines.
export const REVEAL_Y = '110%';

// Split a string into words, preserving the ability to wrap each in a mask.
export function toWords(text: string): string[] {
  return text.split(' ');
}

// Split into characters while keeping spaces as their own tokens.
export function toChars(text: string): string[] {
  return Array.from(text);
}
