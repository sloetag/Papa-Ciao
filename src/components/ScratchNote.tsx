import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Eye, RotateCcw, Sparkles, Lock, Unlock } from 'lucide-react';
import { sound } from '../utils/audio.ts';

interface ScratchNoteProps {
  secretNote: string;
  recipientName: string;
}

export const ScratchNote: React.FC<ScratchNoteProps> = ({
  secretNote,
  recipientName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Support high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Warm Taupe / Café Latte Foil Gradient
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#D5C8B8');
    gradient.addColorStop(0.3, '#BAAA99');
    gradient.addColorStop(0.7, '#A89783');
    gradient.addColorStop(1, '#8C7B68');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle decorative pattern lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let i = -rect.height; i < rect.width + rect.height; i += 18) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + rect.height, rect.height);
      ctx.stroke();
    }

    // Callout text on the foil
    ctx.font = '500 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#FAF8F5';
    ctx.textAlign = 'center';
    ctx.fillText('✦ SCRATCH OR DRAG TO REVEAL ✦', rect.width / 2, rect.height / 2 - 4);

    ctx.font = 'italic 12px "Cormorant Garamond", serif';
    ctx.fillStyle = '#ECE5DB';
    ctx.fillText('A confidential postscript for your eyes only', rect.width / 2, rect.height / 2 + 16);

    setIsRevealed(false);
    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isRevealed) initCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCanvas, isRevealed]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    // Occasional subtle audio cue while scratching
    if (Math.random() > 0.85) {
      sound.playChime(600 + Math.random() * 200, 0.1);
    }

    // Check scratch completion periodically
    setScratchPercent((prev) => {
      const next = Math.min(100, prev + 2.5);
      if (next >= 48 && !isRevealed) {
        setIsRevealed(true);
        sound.playChime(784, 0.5);
      }
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleQuickReveal = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    sound.playChime(659.25, 0.4);
  };

  return (
    <section id="secret" className="py-20 md:py-28 bg-cream/70 relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-taupe-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-bronze" />
            <span>Interactive Revelation</span>
            <span aria-hidden="true">·</span>
            <span>Postscript</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal tracking-tight">
            A Secret Postscript
          </h2>
          <p className="text-sm sm:text-base text-mocha font-light">
            Scratch the foil surface with your mouse or finger to uncover the final message hidden beneath.
          </p>
        </div>

        {/* Scratch Card Frame */}
        <div className="max-w-xl mx-auto relative rounded-3xl p-3 bg-foam border border-taupe-200/90 shadow-xl">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-oat/50 flex items-center justify-center p-8 select-none">
            {/* The Hidden Message Layer */}
            <div className="relative z-0 text-center space-y-4 max-w-md">
              <div className="inline-flex items-center gap-1.5 text-xs text-bronze font-serif italic tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Private Word for {recipientName}</span>
              </div>
              <p className="font-serif text-lg sm:text-2xl text-espresso font-medium leading-relaxed italic">
                {secretNote}
              </p>
              <p className="text-xs text-taupe-400 font-sans">
                Keep this in your pocket on difficult days.
              </p>
            </div>

            {/* The Scratch Canvas Layer */}
            {!isRevealed && (
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10 transition-opacity duration-700"
              />
            )}
          </div>

          {/* Quick Reveal / Reset Controls */}
          <div className="mt-4 px-2 flex items-center justify-between text-xs text-taupe-500 font-sans">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs tabular-nums text-bronze font-medium">
                {Math.round(scratchPercent)}%
              </span>
              <span>revealed</span>
            </div>

            <div className="flex items-center gap-3">
              {!isRevealed ? (
                <button
                  onClick={handleQuickReveal}
                  className="flex items-center gap-1 text-xs text-espresso hover:text-roast font-medium transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quick Reveal</span>
                </button>
              ) : (
                <button
                  onClick={initCanvas}
                  className="flex items-center gap-1 text-xs text-taupe-500 hover:text-espresso transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Cover Again</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
