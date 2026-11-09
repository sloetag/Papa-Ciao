import React from 'react';
import { Sun, Coffee, Moon } from 'lucide-react';
import { ThemeMode } from '../types.ts';

interface HeaderProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onThemeChange,
}) => {
  return (
    <header className="w-full border-b border-taupe-200/80 bg-foam/95 backdrop-blur-md transition-colors duration-500 shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Top wordmark: One Lege 😂 (single-line, no wrapping or stacking) */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-espresso whitespace-nowrap shrink-0">
          <span className="font-serif italic text-lg sm:text-xl md:text-2xl font-semibold tracking-tight">
            One Lege
          </span>
          <span className="text-base sm:text-lg not-italic" role="img" aria-label="laughing">
            😂
          </span>
        </div>

        {/* Café Latte / Taupe Theme Transition Toggle (Compact icons on mobile, full labels on desktop) */}
        <div className="flex items-center p-0.5 sm:p-1 bg-taupe-100/70 rounded-full border border-taupe-200/70 shrink-0">
          <button
            onClick={() => onThemeChange('morning')}
            title="Morning Oat & Foam (Airy Ivory)"
            aria-label="Morning Theme"
            className={`flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium transition-all ${
              theme === 'morning'
                ? 'bg-foam text-espresso shadow-xs'
                : 'text-taupe-400 hover:text-espresso'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Morning</span>
          </button>
          <button
            onClick={() => onThemeChange('latte')}
            title="Velvet Café Latte (Warm Taupe)"
            aria-label="Latte Theme"
            className={`flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium transition-all ${
              theme === 'latte'
                ? 'bg-taupe-300 text-espresso shadow-xs'
                : 'text-taupe-400 hover:text-espresso'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Latte</span>
          </button>
          <button
            onClick={() => onThemeChange('dusk')}
            title="Dusk Espresso (Deep Taupe)"
            aria-label="Dusk Theme"
            className={`flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium transition-all ${
              theme === 'dusk'
                ? 'bg-roast text-foam shadow-xs'
                : 'text-taupe-400 hover:text-espresso'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dusk</span>
          </button>
        </div>
      </div>
    </header>
  );
};
