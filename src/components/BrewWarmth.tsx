import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Send, Heart, Check, Sparkles, MessageSquare } from 'lucide-react';
import { ReplyNote } from '../types.ts';
import { sound } from '../utils/audio.ts';

interface BrewWarmthProps {
  recipientName: string;
  senderName: string;
}

const LATTE_ART_DESIGNS = [
  { id: 'heart', label: 'Heart Pour', desc: 'Symbol of pure gratitude' },
  { id: 'rosetta', label: 'Rosetta Leaf', desc: 'Symbol of growth & peace' },
  { id: 'tulip', label: 'Layered Tulip', desc: 'Symbol of deep friendship' },
  { id: 'swan', label: 'Graceful Swan', desc: 'Symbol of elegance & calm' }
];

export const BrewWarmth: React.FC<BrewWarmthProps> = ({
  recipientName,
  senderName,
}) => {
  const [selectedArt, setSelectedArt] = useState('heart');
  const [isBrewing, setIsBrewing] = useState(false);
  const [hasBrewed, setHasBrewed] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyNotes, setReplyNotes] = useState<ReplyNote[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gratitude_reply_notes');
      if (saved) {
        setReplyNotes(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  const handleBrew = () => {
    setIsBrewing(true);
    sound.playSteamPour();
    setTimeout(() => {
      setIsBrewing(false);
      setHasBrewed(true);
      sound.playChime(659.25, 0.4);
    }, 900);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    const newNote: ReplyNote = {
      id: Date.now().toString(),
      sender: recipientName,
      message: replyMessage.trim(),
      timestamp: 'Just now',
      latteArt: selectedArt
    };

    const next = [newNote, ...replyNotes];
    setReplyNotes(next);
    try {
      localStorage.setItem('gratitude_reply_notes', JSON.stringify(next));
    } catch {
      // silent
    }
    setReplyMessage('');
    setSubmitted(true);
    sound.playChime(784, 0.4);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="warmth" className="py-20 md:py-28 bg-foam relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-taupe-500 font-medium">
            <Coffee className="w-3.5 h-3.5 text-bronze" />
            <span>Café Latte Ritual</span>
            <span aria-hidden="true">·</span>
            <span>Shared Warmth</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-espresso font-normal tracking-tight">
            A Cup Poured in Thanks
          </h2>
          <p className="text-sm sm:text-base text-mocha font-light">
            Brew a steaming artisanal cup of café latte, select your milk art, or leave a quiet note back to {senderName}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Interactive Cup & Steam Simulation */}
          <div className="lg:col-span-6 rounded-3xl bg-cream p-8 sm:p-10 border border-taupe-200/90 shadow-sm flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-wider text-taupe-400 font-sans font-medium">
                Step 1: Choose Your Latte Art
              </span>

              {/* Segmented Selection */}
              <div className="grid grid-cols-2 gap-2.5">
                {LATTE_ART_DESIGNS.map((design) => (
                  <button
                    key={design.id}
                    onClick={() => {
                      setSelectedArt(design.id);
                      sound.playChime(523.25, 0.2);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedArt === design.id
                        ? 'bg-foam border-espresso text-espresso shadow-xs'
                        : 'bg-cream/40 border-taupe-200/60 text-taupe-500 hover:border-taupe-300'
                    }`}
                  >
                    <div className="text-xs font-medium">{design.label}</div>
                    <div className="text-[11px] text-taupe-400">{design.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Cup Display with Steam */}
            <div className="relative py-8 flex flex-col items-center justify-center min-h-[220px]">
              {/* Rising Steam Effect */}
              <AnimatePresence>
                {(isBrewing || hasBrewed) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute -top-4 flex items-center gap-2 pointer-events-none text-taupe-300/70"
                  >
                    <svg className="w-8 h-12" viewBox="0 0 30 60" fill="none">
                      <path
                        d="M10 50 Q5 30 15 20 T10 0"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg className="w-6 h-14" viewBox="0 0 30 60" fill="none">
                      <path
                        d="M15 55 Q20 35 10 20 T18 0"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <svg className="w-7 h-10" viewBox="0 0 30 60" fill="none">
                      <path
                        d="M12 45 Q7 25 14 15 T12 0"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ceramic Cup & Saucer */}
              <div className="relative flex items-center justify-center">
                {/* Saucer */}
                <div className="absolute -bottom-3 w-48 h-8 rounded-[100%] bg-taupe-200/80 shadow-inner border border-taupe-300/50" />

                {/* Cup Rim Top-down/Angled View */}
                <motion.div
                  animate={{ scale: isBrewing ? [1, 1.02, 1] : 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-b from-[#FAF8F5] via-[#ECE5DB] to-[#D5C8B8] p-3 shadow-lg border border-taupe-200 flex items-center justify-center"
                >
                  {/* Coffee Surface */}
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#684C38] via-[#4F3929] to-[#36251A] flex items-center justify-center p-2 shadow-inner relative overflow-hidden">
                    {/* Steamed Foam Crema Ring */}
                    <div className="absolute inset-1 rounded-full border-2 border-[#D2B48C]/40 opacity-80" />

                    {/* Latte Art Micro-foam Illustration */}
                    <div className="text-[#FAF8F5] opacity-90 drop-shadow-xs flex items-center justify-center">
                      {selectedArt === 'heart' && (
                        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                      {selectedArt === 'rosetta' && (
                        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 22V2M12 6c-3-2-6 0-6 3s3 3 6 1M12 11c3-2 6 0 6 3s-3 3-6 1M12 15c-3-2-6 0-6 3s3 3 6 1M12 19c3-2 6 0 6 3s-3 3-6 1" strokeLinecap="round" />
                        </svg>
                      )}
                      {selectedArt === 'tulip' && (
                        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2c-.5 3-3 5-3 8 0 3.3 2.7 6 6 6s6-2.7 6-6c0-3-2.5-5-3-8-.5 3-2 5-3 5s-2.5-2-3-5z" opacity="0.9" />
                          <path d="M12 16v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {selectedArt === 'swan' && (
                        <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 18c0-3 2-6 6-6 3 0 5-2 5-5a3 3 0 00-6 0v2" strokeLinecap="round" />
                          <circle cx="11" cy="7" r="1" fill="currentColor" />
                          <path d="M6 18c2 2 8 2 12 0-2-4-6-6-12 0z" fill="currentColor" opacity="0.6" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Cup Handle */}
                  <div className="absolute -right-3 top-10 w-4 h-12 rounded-r-lg border-2 border-taupe-300 bg-cream" />
                </motion.div>
              </div>
            </div>

            {/* Pour Button */}
            <button
              onClick={handleBrew}
              disabled={isBrewing}
              className="w-full py-3 bg-espresso hover:bg-roast text-foam rounded-full text-xs font-medium uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-taupe-300" />
              <span>{isBrewing ? 'Steaming Oat Milk...' : 'Pour Fresh Warmth'}</span>
            </button>
          </div>

          {/* Right Column: Return Note / Reaction Box */}
          <div className="lg:col-span-6 rounded-3xl bg-cream p-8 sm:p-10 border border-taupe-200/90 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-taupe-400 font-sans font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-bronze" />
                <span>Step 2: Leave a Quiet Whisper</span>
              </div>
              <h3 className="font-serif text-2xl text-espresso font-normal">
                Reply to {senderName}
              </h3>
              <p className="text-sm text-mocha font-light">
                If this letter touched you, leave a small thought, memory, or simple “thank you” in return. It will be stored here on this page.
              </p>
            </div>

            <form onSubmit={handleSendReply} className="space-y-4">
              <div className="relative">
                <textarea
                  rows={4}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={`Write your note to ${senderName}...`}
                  className="w-full rounded-2xl bg-foam border border-taupe-200 p-4 text-sm text-espresso placeholder:text-taupe-400 focus:outline-none focus:ring-2 focus:ring-bronze/40 focus:border-bronze resize-none transition-all font-sans"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-taupe-400 font-sans">
                  From: <strong className="text-espresso">{recipientName}</strong>
                </span>

                <button
                  type="submit"
                  disabled={!replyMessage.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 bg-espresso hover:bg-roast disabled:opacity-40 text-foam rounded-full text-xs font-medium transition-colors whitespace-nowrap shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Leave Whisper</span>
                </button>
              </div>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Your return message has been gently placed into this page.</span>
                </div>
              )}
            </form>

            {/* Previous Notes List */}
            {replyNotes.length > 0 && (
              <div className="pt-4 border-t border-taupe-200/70 space-y-3">
                <span className="text-xs uppercase tracking-wider text-taupe-400 font-sans font-medium">
                  Preserved Replies
                </span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {replyNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-foam border border-taupe-100 text-xs text-roast space-y-1"
                    >
                      <p className="font-serif italic text-sm">“{note.message}”</p>
                      <div className="flex items-center justify-between text-[10px] text-taupe-400">
                        <span>— {note.sender}</span>
                        <span>{note.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
