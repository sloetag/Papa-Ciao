import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface LoaderProps {
  onEnter: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onEnter }) => {
  const words = ['for', 'Papa', 'Ciao'];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={onEnter}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-foam text-espresso cursor-pointer select-none p-6"
    >
      {/* Soft warm radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute w-[520px] h-[520px] rounded-full bg-taupe-200/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center space-y-8 max-w-lg">
        {/* Animated Headline: for Papa Ciao */}
        <div className="space-y-4">
          <h1 className="font-serif italic text-5xl sm:text-7xl md:text-8xl font-normal text-espresso tracking-tight flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + index * 0.22,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-base sm:text-xl text-mocha font-light"
          >
            With gratitude, always.
          </motion.p>
        </div>

        {/* Golden Wax Seal Emblem / Interactive Touch Trigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="pt-4 flex flex-col items-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                '0 14px 30px -4px rgba(196, 155, 102, 0.25)',
                '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#C49B66] via-[#A87943] to-[#7D5325] shadow-lg flex items-center justify-center border-2 border-[#D8B47F]/40"
          >
            <div className="w-12 h-12 rounded-full border border-[#FAF0DC]/50 flex items-center justify-center text-[#FAF0DC]">
              <Sparkles className="w-5 h-5 text-[#FAF0DC] animate-pulse" />
            </div>
          </motion.div>

          <span className="text-xs font-sans tracking-widest uppercase text-taupe-400 font-medium pt-1 animate-pulse">
            Click anywhere to open
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};
