// Content model for the LUMEN experience. Keeping copy and data here keeps the
// components declarative and makes the narrative easy to re-sequence.

export const BRAND = {
  name: 'LUMEN',
  discipline: 'Performance Cycling',
  city: 'Porto',
  coords: '41.1579° N / 08.6291° W',
  tagline: 'Three lines. No ranking.',
} as const;

export type NavSection = {
  id: string;
  index: string;
  label: string;
};

export const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', index: '01', label: 'Index' },
  { id: 'manifesto', index: '02', label: 'Ride' },
  { id: 'routes', index: '03', label: 'Routes' },
  { id: 'protocol', index: '04', label: 'Protocol' },
  { id: 'ethos', index: '05', label: 'Ethos' },
  { id: 'join', index: '06', label: 'Join' },
];

export type Stat = {
  value: string;
  unit?: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: '06:12', label: 'First light departure' },
  { value: '1,240', unit: 'm', label: 'Vertical gained' },
  { value: '74', unit: 'km', label: 'Wet asphalt' },
];

export type Route = {
  index: string;
  name: string;
  subtitle: string;
  detail: string;
  distance: string;
  surface: string;
  image: string;
};

export const ROUTES: Route[] = [
  {
    index: '01',
    name: 'Serra',
    subtitle: 'East line',
    detail: 'A climb that starts before the city wakes. Granite switchbacks into fog.',
    distance: '52 km',
    surface: 'Broken tarmac',
    image: '/media/stairs.jpg',
  },
  {
    index: '02',
    name: 'Douro',
    subtitle: 'Service road',
    detail: 'River-level tempo. Long, flat, relentless — held wheel to wheel.',
    distance: '68 km',
    surface: 'Smooth asphalt',
    image: '/media/dusk.jpg',
  },
  {
    index: '03',
    name: 'Atlantic',
    subtitle: 'Crosswind',
    detail: 'Exposed coastal drag. The wind decides the pace, never the legs.',
    distance: '74 km',
    surface: 'Wet asphalt',
    image: '/media/city-lace.jpg',
  },
];

export const MANIFESTO_LINES = [
  'Ride what',
  'the city',
  'gives you.',
] as const;

export const ETHOS = {
  eyebrow: 'The protocol',
  serif: 'Rain is not bad weather.',
  serifAccent: 'It is data.',
  body: [
    'We do not wait for conditions. We read them. Every ride is logged, every',
    'surface measured, every line held under load. Precision is not a setting —',
    'it is a practice repeated until it disappears into instinct.',
  ],
  meta: [
    { k: 'Founded', v: 'Porto · 2019' },
    { k: 'Cadence', v: 'Weekly · 06:00' },
    { k: 'Members', v: 'By invitation' },
  ],
};

export const QUOTE = {
  text: 'Hold the line.',
  attribution: 'The only instruction we give.',
};
