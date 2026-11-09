import React from 'react';
import { Heart, Printer, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio.ts';

interface FooterProps {
  recipientName: string;
  senderName: string;
}

export const Footer: React.FC<FooterProps> = ({
  recipientName,
  senderName,
}) => {
  return (
    <footer className="border-t border-taupe-200/80 bg-cream/80 py-16 text-espresso">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          {/* Brand & Dedication */}
          <div className="space-y-1">
            <div className="font-serif italic text-2xl font-semibold tracking-tight text-espresso">
              Gratitude
            </div>
            <p className="text-xs text-taupe-500 font-sans">
              Dedicated with love to {recipientName} from {senderName}
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex items-center gap-6 text-xs text-taupe-500 font-sans">
            <a href="#letter" className="hover:text-espresso transition-colors">
              The Letter
            </a>
            <a href="#moments" className="hover:text-espresso transition-colors">
              Moments
            </a>
            <a href="#reasons" className="hover:text-espresso transition-colors">
              Ten Reasons
            </a>
            <a href="#secret" className="hover:text-espresso transition-colors">
              Secret Note
            </a>
            <a href="#warmth" className="hover:text-espresso transition-colors">
              Warmth
            </a>
          </div>

          {/* Actions */}
          <button
            onClick={() => {
              sound.playChime(523.25, 0.3);
              window.print();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-taupe-200 bg-foam text-xs text-espresso hover:bg-taupe-100 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-taupe-500" />
            <span>Print Keepsake PDF</span>
          </button>
        </div>

        {/* Hairline divider & quiet copyright */}
        <div className="pt-8 border-t border-taupe-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-taupe-400 font-sans">
          <p>© 2026 A Dedicated Life Chapter · Crafted in Café Latte & Taupe</p>
          <div className="flex items-center gap-1.5">
            <span>Made with deep gratitude</span>
            <Heart className="w-3 h-3 text-bronze fill-bronze" />
            <span>for one exceptional person</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
