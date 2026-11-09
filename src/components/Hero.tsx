import React from 'react';
import { motion } from 'motion/react';
import { Mail, Sparkles, ArrowDown } from 'lucide-react';
import { PersonalizationData } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface HeroProps {
  personalization: PersonalizationData;
  onOpenLetter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ personalization, onOpenLetter }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Subtle organic warm radial aura */}
      <div
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-taupe-200/40 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Typography & Intent */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Quiet Kicker (Zero-Pill Discipline) */}
            <div className="flex items-center gap-2 text-xs font-medium text-taupe-500 uppercase tracking-widest">
              <span>A Personal Dedication</span>
              <span aria-hidden="true">·</span>
              <span>For {personalization.recipientName}</span>
              <span aria-hidden="true">·</span>
              <span className="text-bronze flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Keepsake
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-espresso font-normal leading-[1.12] tracking-tight text-balance">
              {personalization.heroHeadline}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-mocha leading-relaxed font-sans max-w-xl font-light">
              {personalization.heroSubhead}
            </p>

            {/* Interactive Primary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  sound.playWaxSnap();
                  onOpenLetter();
                }}
                className="group flex items-center gap-2.5 px-6 py-3.5 bg-espresso text-foam hover:bg-roast rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Mail className="w-4 h-4 text-taupe-200 group-hover:scale-110 transition-transform" />
                <span>Open The Letter</span>
              </button>

              <a
                href="#moments"
                onClick={() => sound.playChime(440, 0.4)}
                className="flex items-center gap-2 px-5 py-3.5 bg-taupe-100/70 hover:bg-taupe-200/80 text-espresso rounded-full text-sm font-medium transition-colors border border-taupe-200/60 whitespace-nowrap"
              >
                <span>Browse Moments</span>
                <ArrowDown className="w-4 h-4 text-taupe-500" />
              </a>
            </div>

            {/* Quiet metadata footer line */}
            <div className="pt-6 border-t border-taupe-100 flex items-center gap-4 text-xs text-taupe-400 font-sans">
              <span>Warm Café Latte Tones</span>
              <span aria-hidden="true">·</span>
              <span>Curated in 4K Full HD</span>
              <span aria-hidden="true">·</span>
              <span>From {personalization.senderName}</span>
            </div>
          </motion.div>

          {/* Right Column: 16:9 Marquee Asset Frame with artisanal depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group rounded-3xl p-3 bg-cream border border-taupe-200/80 shadow-xl shadow-taupe-400/10 transition-transform duration-500 hover:shadow-2xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-2xl bg-taupe-100">
                <img
                  src="/src/assets/images/hero_cafe_latte_warmth_1794219996412.jpg"
                  alt="Artisanal café latte in warm morning sunlight with handwritten journal"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle warm gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-60"
                  aria-hidden="true"
                />

                {/* Quiet caption badge inside corner */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-foam backdrop-blur-md bg-espresso/60 px-3.5 py-2 rounded-xl border border-foam/15">
                  <span className="font-serif italic text-sm">Morning brew & quiet thoughts</span>
                  <span className="font-mono text-[11px] opacity-80">4K · Editorial</span>
                </div>
              </div>

              {/* Decorative mini corner accent */}
              <div className="mt-3 px-2 flex items-center justify-between text-[11px] text-taupe-400 font-sans tracking-wide">
                <span>WARMTH IN EVERY DETAIL</span>
                <span>OCTOBER SANCTUARY</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
