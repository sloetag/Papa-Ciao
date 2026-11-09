import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronDown, Sparkles } from 'lucide-react';
import { GratitudeReason } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface GratitudeTilesProps {
  reasons: GratitudeReason[];
  recipientName: string;
}

export const GratitudeTiles: React.FC<GratitudeTilesProps> = ({
  reasons,
  recipientName,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(reasons[0]?.id || null);
  const [cherishedIds, setCherishedIds] = useState<Set<string>>(new Set([reasons[0]?.id]));
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const tags = ['all', 'Presence & Listening', 'Strength & Composure', 'Joy & Lightness', 'Trust & Authenticity'];

  const filteredReasons = selectedTag === 'all'
    ? reasons
    : reasons.filter((r) => r.tag === selectedTag);

  const toggleExpand = (id: string) => {
    const isNowExpanded = expandedId !== id;
    setExpandedId(isNowExpanded ? id : null);
    sound.playChime(isNowExpanded ? 523.25 : 392, 0.25);
  };

  const toggleCherish = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const next = new Set(cherishedIds);
    if (next.has(id)) {
      next.delete(id);
      sound.playChime(392, 0.25);
    } else {
      next.add(id);
      sound.playChime(784, 0.35);
    }
    setCherishedIds(next);
  };

  return (
    <section id="reasons" className="py-20 md:py-28 bg-foam relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-taupe-500 font-medium">
              <span>Gratitude Chronicle</span>
              <span aria-hidden="true">·</span>
              <span>Ten Things I Cherish</span>
              <span aria-hidden="true">·</span>
              <span className="text-bronze flex items-center gap-1 font-mono tabular-nums">
                <Heart className="w-3 h-3 fill-bronze text-bronze" /> {cherishedIds.size} saved
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal tracking-tight">
              Why You Are Appreciated
            </h2>
            <p className="text-sm sm:text-base text-mocha font-light">
              Tap any tile to unfold a deeper memory or touch the heart to bookmark a cherished sentiment.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-taupe-100/70 rounded-xl border border-taupe-200/50 self-start md:self-end">
            <button
              onClick={() => {
                setSelectedTag('all');
                sound.playChime(440, 0.2);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                selectedTag === 'all'
                  ? 'bg-foam text-espresso shadow-xs'
                  : 'text-taupe-500 hover:text-espresso'
              }`}
            >
              All Ten
            </button>
            <button
              onClick={() => {
                setSelectedTag('Presence & Listening');
                sound.playChime(493.88, 0.2);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                selectedTag === 'Presence & Listening'
                  ? 'bg-foam text-espresso shadow-xs'
                  : 'text-taupe-500 hover:text-espresso'
              }`}
            >
              Presence
            </button>
            <button
              onClick={() => {
                setSelectedTag('Joy & Lightness');
                sound.playChime(523.25, 0.2);
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                selectedTag === 'Joy & Lightness'
                  ? 'bg-foam text-espresso shadow-xs'
                  : 'text-taupe-500 hover:text-espresso'
              }`}
            >
              Joy
            </button>
          </div>
        </div>

        {/* Bento Grid of Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredReasons.map((reason) => {
            const isExpanded = expandedId === reason.id;
            const isCherished = cherishedIds.has(reason.id);

            return (
              <motion.div
                key={reason.id}
                layout
                onClick={() => toggleExpand(reason.id)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-300 relative overflow-hidden ${
                  isExpanded
                    ? 'bg-cream border-taupe-300 shadow-md ring-1 ring-taupe-300/40'
                    : 'bg-foam hover:bg-cream/50 border-taupe-100 hover:border-taupe-200 shadow-xs'
                }`}
              >
                {/* Background grain */}
                <div
                  className="pointer-events-none absolute inset-0 bg-grain opacity-30"
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-4">
                  {/* Top Row: Clean Editorial Numbering & Tag & Cherish Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-bronze tabular-nums">
                        {reason.number}.
                      </span>
                      <span className="text-xs text-taupe-400 font-sans tracking-wide">
                        {reason.tag}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => toggleCherish(e, reason.id)}
                        className={`p-2 rounded-full border transition-all ${
                          isCherished
                            ? 'bg-rose-50 text-rose-600 border-rose-200'
                            : 'border-transparent text-taupe-300 hover:text-rose-500 hover:bg-rose-50/50'
                        }`}
                        title={isCherished ? 'Cherished memory' : 'Mark as cherished'}
                      >
                        <Heart
                          className={`w-4 h-4 ${isCherished ? 'fill-rose-500 text-rose-500' : ''}`}
                        />
                      </button>
                      <ChevronDown
                        className={`w-4 h-4 text-taupe-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180 text-espresso' : ''
                        }`}
                      />
                    </div>
                  </div>

                  {/* Title & Preview */}
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-xl sm:text-2xl text-espresso font-medium tracking-tight">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-mocha font-sans leading-relaxed font-light">
                      {reason.preview}
                    </p>
                  </div>

                  {/* Expanded Detail Accordion */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="pt-4 border-t border-taupe-200/70 space-y-3"
                      >
                        <p className="text-sm font-sans text-roast leading-relaxed">
                          {reason.detail}
                        </p>

                        {reason.quote && (
                          <blockquote className="font-serif italic text-base text-bronze pt-1">
                            {reason.quote}
                          </blockquote>
                        )}

                        <div className="flex items-center justify-between text-[11px] text-taupe-400 font-sans pt-2">
                          <span>Dedicated to {recipientName}</span>
                          <span>Click card to collapse</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
