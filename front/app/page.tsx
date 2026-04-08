'use client';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import CursorSpotlight from '@/components/CursorSpotlight';

export default function Home() {
  return (
    <SmoothScroll>
      <CursorSpotlight />
      <main>
        <Hero />
        <div style={{ backgroundColor: '#000' }}>
          <Projects />
          <Skills />
          <About />
          <Contact />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
