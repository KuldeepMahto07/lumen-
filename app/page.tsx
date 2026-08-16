import { Navigation } from '@/components/nav/Navigation';
import { Hero } from '@/components/hero/Hero';
import { Stats } from '@/components/Stats';
import { Manifesto } from '@/components/Manifesto';
import { RouteGallery } from '@/components/RouteGallery';
import { MediaPanel } from '@/components/MediaPanel';
import { SplitLayout } from '@/components/SplitLayout';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Stats />
        <Manifesto />
        <RouteGallery />
        <MediaPanel />
        <SplitLayout />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
