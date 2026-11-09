import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { ThemeMode, PersonalizationData } from './types.ts';
import { DEFAULT_PERSONALIZATION, SINGLE_MOMENT } from './data/gratitudeData.ts';
import { Loader } from './components/Loader.tsx';
import { Header } from './components/Header.tsx';
import { OnePageExperience } from './components/OnePageExperience.tsx';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [theme, setTheme] = useState<ThemeMode>('morning');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const personalization: PersonalizationData = DEFAULT_PERSONALIZATION;

  // Sync theme class on body
  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Monitor scroll for Back to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-foam text-espresso transition-colors duration-700 ease-in-out flex flex-col justify-between selection:bg-taupe-200 selection:text-espresso scroll-smooth">
      {/* Intro Loader Page: 'for papa ciao' */}
      <AnimatePresence>
        {showLoader && <Loader onEnter={() => setShowLoader(false)} />}
      </AnimatePresence>

      {/* Header with Theme Toggle only */}
      <Header
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* One Page Experience: Single image with 'Thank You' caption, letter on other side */}
      <main className="flex-1 flex flex-col justify-center">
        <OnePageExperience
          personalization={personalization}
          moment={SINGLE_MOMENT}
        />
      </main>

      {/* Discreet Footer with Copyright and Registration Icons */}
      <footer className="w-full py-4 px-6 text-center text-xs font-sans text-taupe-400 border-t border-taupe-100/60 transition-colors duration-500 flex items-center justify-center gap-2">
        <span>Dedicated with deep gratitude · Forever preserved for Papa Ciao ©</span>
        <span aria-hidden="true">·</span>
        <span className="font-mono text-sm leading-none" title="Registered">®</span>
      </footer>

      {/* Smooth Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-cream border border-taupe-200 text-espresso shadow-lg hover:bg-taupe-100 hover:shadow-xl transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-bronze/40"
            title="Back to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-espresso" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
