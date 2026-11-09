import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X, Download, Camera } from 'lucide-react';
import { MemoryMoment } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface MomentsGalleryProps {
  moments: MemoryMoment[];
  recipientName: string;
}

export const MomentsGallery: React.FC<MomentsGalleryProps> = ({
  moments,
  recipientName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxMoment, setLightboxMoment] = useState<MemoryMoment | null>(null);

  const active = moments[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % moments.length);
    sound.playChime(587.33, 0.25);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + moments.length) % moments.length);
    sound.playChime(493.88, 0.25);
  };

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    sound.playChime(523.25, 0.25);
  };

  const openLightbox = (m: MemoryMoment) => {
    setLightboxMoment(m);
    sound.playChime(659.25, 0.35);
  };

  const closeLightbox = () => {
    setLightboxMoment(null);
    sound.playChime(392, 0.25);
  };

  return (
    <section id="moments" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-taupe-500 font-medium">
              <Camera className="w-3.5 h-3.5 text-bronze" />
              <span>Full HD Keepsake Moments</span>
              <span aria-hidden="true">·</span>
              <span>For {recipientName}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal tracking-tight">
              Chapters & Stillness
            </h2>
            <p className="text-sm sm:text-base text-mocha font-light">
              Visual snapshots celebrating the warmth, tranquil spaces, and quiet conversations we have shared.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-taupe-200 bg-foam hover:bg-taupe-100 text-espresso transition-colors shadow-xs"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-taupe-500 px-2 tabular-nums">
              0{activeIndex + 1} / 0{moments.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-taupe-200 bg-foam hover:bg-taupe-100 text-espresso transition-colors shadow-xs"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Large Viewer */}
        <div className="relative rounded-3xl bg-cream border border-taupe-200/90 p-3 sm:p-4 shadow-xl overflow-hidden">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-taupe-100 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                src={active.image}
                alt={active.title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => openLightbox(active)}
              />
            </AnimatePresence>

            {/* Scrim Overlay */}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent"
              aria-hidden="true"
            />

            {/* Quick Zoom Trigger */}
            <button
              onClick={() => openLightbox(active)}
              className="absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md bg-espresso/50 text-foam hover:bg-espresso/80 border border-foam/20 transition-all opacity-90 hover:opacity-100"
              title="View Full 4K Screen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Overlay Caption Info */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-foam">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-sans tracking-wider uppercase text-taupe-200">
                  <span>{active.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{active.timeframe}</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight">
                  {active.title}
                </h3>
                <p className="text-xs sm:text-sm text-taupe-100/90 font-sans leading-relaxed font-light">
                  {active.caption}
                </p>
              </div>

              <button
                onClick={() => openLightbox(active)}
                className="self-start sm:self-end px-4 py-2 text-xs font-medium rounded-full backdrop-blur-md bg-foam/90 text-espresso hover:bg-foam transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                Inspect Details
              </button>
            </div>
          </div>

          {/* Interactive Thumbnails Ribbon */}
          <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-4">
            {moments.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelect(idx)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  activeIndex === idx
                    ? 'border-espresso shadow-md ring-2 ring-bronze/30 scale-[1.02]'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-taupe-300'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen 4K Lightbox Modal */}
      <AnimatePresence>
        {lightboxMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-xl bg-espresso/90 flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between text-foam max-w-7xl mx-auto w-full">
              <div className="space-y-0.5">
                <span className="font-serif italic text-lg">{lightboxMoment.title}</span>
                <p className="text-xs text-taupe-300 font-sans">
                  {lightboxMoment.location} · {lightboxMoment.timeframe}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={lightboxMoment.image}
                  download={`gratitude-${lightboxMoment.id}.jpg`}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-foam transition-colors"
                  title="Download Full HD Image"
                >
                  <Download className="w-5 h-5" />
                </a>
                <button
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-foam transition-colors"
                  title="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central High Res Frame */}
            <div className="flex-1 flex items-center justify-center py-4 max-w-6xl mx-auto w-full">
              <img
                src={lightboxMoment.image}
                alt={lightboxMoment.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              />
            </div>

            {/* Bottom Caption */}
            <div className="text-center max-w-2xl mx-auto w-full text-foam pb-2">
              <p className="text-sm font-sans font-light text-taupe-200 leading-relaxed">
                {lightboxMoment.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
