import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import { PersonalizationData, MemoryMoment } from '../types.ts';

interface OnePageExperienceProps {
  personalization: PersonalizationData;
  moment: MemoryMoment;
}

const letterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.25,
    },
  },
};

const letterItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(5px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const OnePageExperience: React.FC<OnePageExperienceProps> = ({
  personalization,
  moment,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="w-full flex-1 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch h-full min-h-[calc(100vh-6.5rem)]">
        {/* Left Column: Retained Single Image with 'Thank You' Caption */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="relative group rounded-3xl overflow-hidden bg-cream border border-taupe-200 shadow-xl flex-1 min-h-[380px] lg:min-h-full flex flex-col">
            {/* Image Surface */}
            <div className="relative w-full h-full flex-1 overflow-hidden bg-taupe-100">
              <motion.img
                src={moment.image}
                alt="Café Latte warmth with journal"
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.08, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.3,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                onClick={() => setIsLightboxOpen(true)}
              />

              {/* Scrim Overlay for contrast */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.2 }}
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/25 to-transparent"
                aria-hidden="true"
              />

              {/* Lightbox Trigger Icon */}
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 0.85, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md bg-espresso/50 text-foam hover:bg-espresso/80 border border-foam/20 transition-all hover:opacity-100"
                title="View Full Resolution"
              >
                <Maximize2 className="w-4 h-4" />
              </motion.button>

              {/* Top quiet kicker on image */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-sans uppercase tracking-widest text-foam/90 backdrop-blur-md bg-espresso/40 px-3 py-1.5 rounded-full border border-foam/15"
              >
                <Sparkles className="w-3 h-3 text-[#E8C28A]" />
                <span>To Papa Ciao</span>
              </motion.div>

              {/* Prominent Editorial 'Thank You' Caption */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="absolute bottom-6 left-6 right-6 text-foam space-y-2"
              >
                <div className="backdrop-blur-md bg-espresso/60 p-4 sm:p-5 rounded-2xl border border-foam/15 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.2em] text-[#E8C28A] font-medium">
                    <span></span>
                  </div>
                  <h3 className="font-serif italic text-2xl sm:text-3xl text-foam font-normal tracking-tight">
                    Thank You
                  </h3>
                  <p className="text-xs sm:text-sm text-taupe-100/90 font-sans font-light leading-relaxed">
                    With endless warmth and gratitude for your generosity and belief in me.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Column: The Letter on the other side */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative rounded-3xl bg-cream border border-taupe-200 shadow-xl p-6 sm:p-10 lg:p-12 flex-1 flex flex-col justify-between overflow-hidden">
            {/* Subtle paper grain texture */}
            <div
              className="pointer-events-none absolute inset-0 bg-grain opacity-40 rounded-3xl"
              aria-hidden="true"
            />

            {/* Letter Top Title */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 border-b border-taupe-200/80 pb-4 mb-6"
            >
              <span className="font-serif italic text-sm text-taupe-500">
                Private Dispatch
              </span>
              <p className="text-xs font-sans text-taupe-400 tracking-wide uppercase pt-0.5">
                To An Awesome Uncle
              </p>
            </motion.div>

            {/* Letter Body Content with staggered framer-motion entrance */}
            <motion.div
              variants={letterContainerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10 overflow-y-auto pr-2 max-h-[55vh] lg:max-h-[58vh] space-y-6 text-espresso scroll-smooth"
            >
              {/* Greeting */}
              <motion.h2
                variants={letterItemVariants}
                className="font-serif italic text-3xl sm:text-4xl font-medium tracking-tight text-espresso"
              >
                {personalization.letterGreeting}
              </motion.h2>

              {/* Paragraphs with Drop-cap */}
              <div className="space-y-4 font-serif text-lg sm:text-xl text-roast leading-relaxed font-normal">
                {personalization.letterBody.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={letterItemVariants}
                    className="text-pretty"
                  >
                    {index === 0 && (
                      <span className="float-left text-4xl sm:text-5xl font-serif text-bronze mr-2.5 leading-none font-bold">
                        {paragraph.charAt(0)}
                      </span>
                    )}
                    {index === 0 ? paragraph.slice(1) : paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Sign-off & Signature */}
              <motion.div
                variants={letterItemVariants}
                className="pt-6 space-y-1.5 border-t border-taupe-200/80"
              >
                <p className="font-serif italic text-base text-mocha">
                  {personalization.letterSignoff}
                </p>
                <p className="font-serif text-2xl font-semibold tracking-tight text-espresso">
                  {personalization.senderName}
                </p>
              </motion.div>
            </motion.div>

            {/* Letter Bottom Hallmark with Golden Wax Seal Monogram & Copyright Icon */}
            <div className="relative z-10 pt-5 mt-4 border-t border-taupe-200/80 flex items-center justify-between text-xs text-taupe-400 font-sans">
              <div className="flex items-center gap-2">
                {/* Wax Seal Mini Monogram */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C49B66] to-[#7D5325] border border-[#D8B47F]/60 flex items-center justify-center text-[#FAF0DC] shadow-xs">
                  <span className="font-serif text-[9px] font-bold">PC</span>
                </div>
                <span className="font-serif italic text-taupe-500">
                  Forever preserved for Papa Ciao ©
                </span>
              </div>

              <span className="font-mono text-sm tracking-wider text-taupe-400">
                ®
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-xl bg-espresso/90 flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-foam max-w-7xl mx-auto w-full">
              <div className="space-y-0.5">
                <span className="font-serif italic text-lg">Thank You</span>
                <p className="text-xs text-taupe-300 font-sans">
                  Dedicated to Papa Ciao · From Faith
                </p>
              </div>

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-foam transition-colors"
                title="Close viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Image View */}
            <div className="flex-1 flex items-center justify-center py-4 max-w-6xl mx-auto w-full">
              <img
                src={moment.image}
                alt="Thank You"
                referrerPolicy="no-referrer"
                className="max-h-[78vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />
            </div>

            {/* Bottom Caption */}
            <div className="text-center max-w-xl mx-auto w-full text-foam pb-2">
              <p className="text-xs sm:text-sm font-sans font-light text-taupe-200 leading-relaxed">
                Thank you for the new laptop, Papa Ciao. It means the world to me.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
