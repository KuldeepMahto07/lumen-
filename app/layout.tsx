import type { Metadata, Viewport } from 'next';
import { Archivo, Cormorant, JetBrains_Mono } from 'next/font/google';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import '@/styles/globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-jb',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LUMEN — Performance Cycling / Porto',
  description:
    'LUMEN is a performance cycling collective in Porto. Three lines. No ranking. Rain is not bad weather — it is data.',
  metadataBase: new URL('https://lumen.cc'),
  openGraph: {
    title: 'LUMEN — Performance Cycling / Porto',
    description: 'Three lines. No ranking. Hold the line.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#090909',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <body>
        <div className="grain" aria-hidden="true" />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
