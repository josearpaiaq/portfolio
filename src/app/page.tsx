'use client';

import { useEffect } from 'react';
import MoreOptionsComponent from '@/components/MoreOptionsComponent';
import Navbar from '@/components/Navbar';
import { sectionsConfig } from '@/constants';
import useStore from '@/store';
import About from '@/views/About';
import Contact from '@/views/Contact';
import Experience from '@/views/Experience';
import Home from '@/views/Home';
import Projects from '@/views/Projects';
import TechStackPage from '@/views/TechStackPage';

export default function App() {
  const setActiveSection = useStore((state) => state.setActiveSection);

  useEffect(() => {
    const sections = Object.values(sectionsConfig)
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);

    // Fires when a section crosses the middle band of the viewport, so the
    // active nav link tracks correctly even for sections taller than the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: document.getElementById('main'), rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <Navbar />
      <main
        id="main"
        className="min-h-0 flex-1 overflow-y-scroll overscroll-y-none md:snap-y md:snap-mandatory"
      >
        <Home />
        <About />
        <Experience />
        <Projects />
        <TechStackPage />
        <Contact />
      </main>

      <MoreOptionsComponent />
    </div>
  );
}
