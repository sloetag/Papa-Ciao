import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Check, Copy, Printer, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { PersonalizationData } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface WaxSealLetterProps {
  personalization: PersonalizationData;
  isOpen: boolean;
  onToggle: () => void;
}

export const WaxSealLetter: React.FC<WaxSealLetterProps> = ({
  personalization,
  isOpen,
  onToggle,
}) => {
  const [copied, setCopied] = useState(false);
  const [hasHearted, setHasHearted] = useState(false);

  const handleCopy = () => {
    const fullText = `${personalization.letterGreeting}\n\n${personalization.letterBody.join('\n\n')}\n\n${personalization.letterSignoff}\n${personalization.senderName}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    sound.playChime(659.25, 0.4);
    setTimeout(() => setCopied(false), 2400);
  };

  const handlePrint = () => {
    sound.playChime(523.25, 0.3);
    window.print();
  };

  const handleHeart = () => {
    setHasHearted(!hasHearted);
    sound.playChime(hasHearted ? 392 : 784, 0.4);
  };

  return (
    <section id="letter" className="py-20 md:py-28 bg-cream/60 relative">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <p className="text-xs uppercase tracking-widest text-taupe-500 font-medium">
            Personal & Confidential
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal tracking-tight">
            The Sealed Letter
          </h2>
          <p className="text-sm sm:text-base text-mocha font-light">
            {isOpen
              ? 'A letter written just for you, preserved in warm taupe and cream.'
              : 'Tap the golden wax seal below to break the seal and unfold the handwritten letter.'}
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative">
          {!isOpen ? (
            /* Closed Envelope View with Wax Seal */
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div
                onClick={() => {
                  sound.playWaxSnap();
                  onToggle();
                }}
                className="cursor-pointer group relative bg-oat rounded-2xl p-8 sm:p-14 border border-taupe-200/90 shadow-2xl shadow-taupe-400/15 hover:shadow-taupe-400/25 transition-all duration-500 overflow-hidden"
              >
                {/* Envelope Flap Lines */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1/2 border-b border-taupe-300/40 opacity-70"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-grain opacity-40"
                  aria-hidden="true"
                />

                <div className="text-center space-y-6 relative z-10">
                  <div className="font-serif italic text-sm text-taupe-400">
                    Airmail · Private Dispatch
                  </div>

                  <div className="space-y-1">
                    <p className="font-serif text-xl sm:text-2xl text-espresso font-medium tracking-tight">
                      For: {personalization.recipientName}
                    </p>
                    <p className="text-xs text-taupe-500 font-sans tracking-wide">
                      {personalization.relationshipTitle}
                    </p>
                  </div>

                  {/* Wax Seal Button */}
                  <div className="pt-4 flex flex-col items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#C49B66] via-[#A87943] to-[#7D5325] shadow-lg shadow-black/20 flex items-center justify-center border-2 border-[#D8B47F]/40"
                    >
                      {/* Wax stamp inner ring */}
                      <div className="w-15 h-15 rounded-full border border-[#FAF0DC]/50 flex flex-col items-center justify-center text-foam">
                        <Sparkles className="w-5 h-5 text-[#FAF0DC] animate-pulse" />
                        <span className="font-serif text-[10px] tracking-tighter uppercase font-semibold text-[#FAF0DC]">
                          SEAL
                        </span>
                      </div>

                      {/* Wax drop organic accents */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#A87943]/80 blur-[0.5px]" />
                      <div className="absolute -top-1 -left-1 w-3.5 h-3.5 rounded-full bg-[#8E6333]/80 blur-[0.5px]" />
                    </motion.div>

                    <p className="mt-4 text-xs font-medium text-taupe-500 group-hover:text-espresso transition-colors">
                      Click to break wax seal & read
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Letter View */
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative bg-foam rounded-3xl p-8 sm:p-14 border border-taupe-200 shadow-2xl shadow-taupe-500/10">
                {/* Paper texture overlay */}
                <div
                  className="pointer-events-none absolute inset-0 bg-grain opacity-60 rounded-3xl"
                  aria-hidden="true"
                />

                {/* Letter Top Controls */}
                <div className="relative z-10 flex items-center justify-between border-b border-taupe-100 pb-5 mb-8">
                  <div className="flex items-center gap-2 text-xs text-taupe-400 font-sans tracking-wider uppercase">
                    <Mail className="w-3.5 h-3.5 text-bronze" />
                    <span>Unsealed Document</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleHeart}
                      className={`p-2 rounded-full border transition-all ${
                        hasHearted
                          ? 'bg-rose-50 text-rose-600 border-rose-200'
                          : 'border-taupe-200 text-taupe-400 hover:text-espresso'
                      }`}
                      title={hasHearted ? 'Cherished' : 'Cherish this letter'}
                    >
                      <Heart
                        className={`w-4 h-4 ${hasHearted ? 'fill-rose-500 text-rose-500' : ''}`}
                      />
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-full border border-taupe-200 text-taupe-400 hover:text-espresso hover:border-taupe-300 transition-colors"
                      title="Copy letter text"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="p-2 rounded-full border border-taupe-200 text-taupe-400 hover:text-espresso hover:border-taupe-300 transition-colors"
                      title="Print or Save PDF"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        sound.playChime(392, 0.3);
                        onToggle();
                      }}
                      className="p-2 rounded-full border border-taupe-200 text-taupe-400 hover:text-espresso hover:border-taupe-300 transition-colors"
                      title="Reseal letter"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Letter Body */}
                <div className="relative z-10 space-y-6 text-espresso">
                  {/* Salutation */}
                  <h3 className="font-serif italic text-2xl sm:text-3xl font-medium tracking-tight text-espresso">
                    {personalization.letterGreeting}
                  </h3>

                  {/* Paragraphs */}
                  <div className="space-y-4 font-serif text-lg sm:text-xl text-roast leading-relaxed font-normal">
                    {personalization.letterBody.map((paragraph, index) => (
                      <p key={index} className="text-pretty">
                        {index === 0 && (
                          <span className="float-left text-4xl sm:text-5xl font-serif text-bronze mr-2 leading-none font-bold">
                            {paragraph.charAt(0)}
                          </span>
                        )}
                        {index === 0 ? paragraph.slice(1) : paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Sign-off */}
                  <div className="pt-8 space-y-2 border-t border-taupe-100/80">
                    <p className="font-serif italic text-base text-mocha">
                      {personalization.letterSignoff}
                    </p>
                    <p className="font-serif text-2xl font-semibold tracking-tight text-espresso">
                      {personalization.senderName}
                    </p>
                  </div>

                  {/* Authenticity Monogram Stamp */}
                  <div className="pt-6 flex items-center justify-between text-xs text-taupe-400 font-sans">
                    <span className="font-serif italic text-taupe-500">
                      Forever preserved with care
                    </span>
                    <span className="font-mono text-[11px] tracking-wider uppercase">
                      NO. GRT-{personalization.recipientName.toUpperCase().slice(0, 4)}-2026
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
