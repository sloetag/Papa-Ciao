import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, RotateCcw, Heart, Sparkles, SlidersHorizontal } from 'lucide-react';
import { PersonalizationData } from '../types.ts';
import { DEFAULT_PERSONALIZATION } from '../data/gratitudeData.ts';
import { sound } from '../utils/audio.ts';

interface PersonalizeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: PersonalizationData;
  onSave: (newData: PersonalizationData) => void;
}

export const PersonalizeDrawer: React.FC<PersonalizeDrawerProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
}) => {
  const [formData, setFormData] = useState<PersonalizationData>(data);
  const [justSaved, setJustSaved] = useState(false);

  const handleChange = (
    field: keyof PersonalizationData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleParagraphChange = (index: number, text: string) => {
    const updated = [...formData.letterBody];
    updated[index] = text;
    handleChange('letterBody', updated);
  };

  const handleSave = () => {
    onSave(formData);
    setJustSaved(true);
    sound.playChime(659.25, 0.3);
    setTimeout(() => {
      setJustSaved(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    setFormData(DEFAULT_PERSONALIZATION);
    onSave(DEFAULT_PERSONALIZATION);
    sound.playChime(440, 0.3);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-espresso/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-foam border-l border-taupe-200 shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-taupe-200 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-taupe-500 font-medium">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-bronze" />
                    <span>Personalization</span>
                  </div>
                  <h3 className="font-serif text-xl text-espresso font-medium">
                    Tailor This Dedication
                  </h3>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-taupe-200 text-taupe-400 hover:text-espresso hover:border-taupe-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Form Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-sans">
                {/* Names */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-taupe-500 font-medium uppercase tracking-wider">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={formData.recipientName}
                      onChange={(e) => handleChange('recipientName', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-taupe-200 text-espresso focus:outline-none focus:ring-1 focus:ring-bronze"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-taupe-500 font-medium uppercase tracking-wider">
                      Sender Name
                    </label>
                    <input
                      type="text"
                      value={formData.senderName}
                      onChange={(e) => handleChange('senderName', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-taupe-200 text-espresso focus:outline-none focus:ring-1 focus:ring-bronze"
                    />
                  </div>
                </div>

                {/* Relationship Dedication Title */}
                <div className="space-y-1.5">
                  <label className="text-taupe-500 font-medium uppercase tracking-wider">
                    Relationship Dedication Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.relationshipTitle}
                    onChange={(e) => handleChange('relationshipTitle', e.target.value)}
                    placeholder="e.g. To An Extraordinary Soul"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-taupe-200 text-espresso focus:outline-none focus:ring-1 focus:ring-bronze"
                  />
                </div>

                {/* Hero Headline */}
                <div className="space-y-1.5">
                  <label className="text-taupe-500 font-medium uppercase tracking-wider">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={formData.heroHeadline}
                    onChange={(e) => handleChange('heroHeadline', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-taupe-200 text-espresso focus:outline-none focus:ring-1 focus:ring-bronze"
                  />
                </div>

                {/* Hero Subhead */}
                <div className="space-y-1.5">
                  <label className="text-taupe-500 font-medium uppercase tracking-wider">
                    Hero Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={formData.heroSubhead}
                    onChange={(e) => handleChange('heroSubhead', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-taupe-200 text-espresso focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
                  />
                </div>

                {/* Letter First Paragraph */}
                <div className="space-y-1.5">
                  <label className="text-taupe-500 font-medium uppercase tracking-wider">
                    Letter Opening Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={formData.letterBody[0] || ''}
                    onChange={(e) => handleParagraphChange(0, e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-taupe-200 text-espresso focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
                  />
                </div>

                {/* Secret Note */}
                <div className="space-y-1.5">
                  <label className="text-taupe-500 font-medium uppercase tracking-wider">
                    Hidden Postscript Note (Revealed upon scratch)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.secretNote}
                    onChange={(e) => handleChange('secretNote', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream border border-taupe-200 text-espresso focus:outline-none focus:ring-1 focus:ring-bronze resize-none"
                  />
                </div>

                {/* Reset button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-taupe-500 hover:text-espresso transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Original Default</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-taupe-200 bg-cream/60 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-full border border-taupe-200 text-xs font-medium text-taupe-500 hover:text-espresso transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 py-2.5 rounded-full bg-espresso hover:bg-roast text-foam text-xs font-medium transition-colors text-center shadow-xs flex items-center justify-center gap-1.5"
                >
                  {justSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <span>Apply Changes</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
