import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Resumes from './components/Resumes';
import Contact from './components/Contact';
import StarField from './components/StarField';
import Cursor from './components/Cursor';
import ThemeToggle from './components/ThemeToggle';
import Lenis from 'lenis';
import { profile } from './data/portfolio';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <StarField />

      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Resumes />
        <Contact />
      </main>

      <div
        className={`fixed inset-0 pointer-events-none z-[100] contrast-150 brightness-150 ${theme === 'light' ? 'opacity-[0.015]' : 'opacity-[0.03]'}`}
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      <footer className="py-10 text-center text-slate-500 border-t border-white/5 backdrop-blur-sm">
        <p className="text-sm font-inter">
          &copy; {new Date().getFullYear()} {profile.fullName}. {profile.footerNote}
        </p>
      </footer>
      <ThemeToggle />
    </div>
  );
}

export default App;
