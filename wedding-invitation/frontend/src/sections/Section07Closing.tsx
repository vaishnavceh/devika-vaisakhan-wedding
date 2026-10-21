import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WeddingData } from '../data/weddingData';
import { shareInvitation } from '../lib/share';
import { HeirloomCrest, AalilaLeaf } from '../components/KeralaMotifs';

interface SectionProps {
  data: WeddingData;
}

export const Section07Closing: React.FC<SectionProps> = ({ data }) => {
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const handleShare = async () => {
    const title = 'Dr. Devika Rani & Vaisakhan — Wedding Invitation';
    const text = 'You are cordially invited to celebrate the wedding of Dr. Devika Rani P.S. and Vaisakhan M.L.';
    const url = window.location.href;

    const result = await shareInvitation(title, text, url);
    if (result.success) {
      if (result.sharedVia === 'clipboard') {
        setShareStatus('Invitation link copied to clipboard!');
      } else {
        setShareStatus('Invitation shared successfully!');
      }
      setTimeout(() => setShareStatus(null), 3500);
    }
  };

  const handleShowerBlessings = () => {
    // Golden & burgundy auspicious petal shower effect
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#B49360', '#551F32', '#F8F4EC', '#D6BE93', '#35483D'],
    });
  };

  return (
    <footer className="relative py-20 sm:py-28 px-4 sm:px-8 bg-ivory-100 parchment-grain border-t border-gold-500/30 text-center overflow-hidden">
      <div className="max-w-2xl mx-auto">
        {/* Crest Motif */}
        <div className="mb-6">
          <HeirloomCrest />
        </div>

        {/* Closing Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Authentic Ceremonial Couple Portrait Card */}
          <div className="relative my-8 max-w-[280px] sm:max-w-[320px] mx-auto group">
            <div className="relative p-2 rounded-sm bg-ivory-50 border border-gold-500/40 shadow-heirloom">
              <div className="overflow-hidden rounded-xs aspect-[3/4] bg-ivory-200">
                <picture>
                  <source srcSet="/images/couple-ceremony.webp" type="image/webp" />
                  <img
                    src="/images/couple-ceremony.jpg"
                    alt="Dr. Devika Rani P.S. and Vaisakhan M.L. seated together"
                    width="1200"
                    height="1600"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                    loading="lazy"
                  />
                </picture>
              </div>
              <div className="pt-2.5 pb-1 text-center">
                <p className="font-serif italic text-xs text-gold-700 tracking-wide">
                  &ldquo;To stand by you is my heart&apos;s chosen.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <blockquote className="font-serif italic text-xl sm:text-2xl text-charcoal-700 leading-relaxed max-w-xl mx-auto font-light mb-6">
            &ldquo;{data.closing.quote}&rdquo;
          </blockquote>

          {/* Signoff */}
          <div className="mb-8">
            <span className="font-display text-lg sm:text-xl text-burgundy-800 font-medium block">
              {data.closing.signOff}
            </span>
            <p className="font-serif italic text-sm text-gold-700 mt-1">
              Sunil Kumar B &amp; Preetha M
            </p>
          </div>

          {/* Couple's Names & Date Recap */}
          <div className="inline-flex items-center gap-3 py-2 px-6 rounded-full border border-gold-500/30 bg-parchment-50 mb-8">
            <span className="font-serif text-sm text-burgundy-900 font-medium tracking-wide">
              Dr. Devika Rani P.S. &amp; Vaisakhan M.L.
            </span>
            <span className="text-gold-500 text-xs">•</span>
            <span className="font-sans text-xs uppercase tracking-wider text-charcoal-500">
              {data.closing.date}
            </span>
          </div>

          {/* Interactive Actions: Share & Shower Petals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-burgundy-700 text-ivory-50 text-xs font-sans font-medium uppercase tracking-[0.14em] hover:bg-burgundy-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
            >
              <Share2 className="w-4 h-4 text-gold-400" />
              <span>Share Invitation</span>
            </button>

            <button
              onClick={handleShowerBlessings}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-gold-500/40 bg-ivory-50 text-burgundy-800 hover:bg-parchment-100 transition-colors text-xs font-sans font-medium uppercase tracking-[0.14em] focus:outline-none"
            >
              <Sparkles className="w-4 h-4 text-gold-600" />
              <span>Shower Blessings</span>
            </button>
          </div>

          {/* Share Status Toast */}
          {shareStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-800 text-ivory-50 text-xs font-sans shadow-md"
            >
              <Check className="w-3.5 h-3.5 text-gold-400" />
              <span>{shareStatus}</span>
            </motion.div>
          )}

          {/* Minimal Traditional Footer Signature */}
          <div className="mt-16 pt-6 border-t border-gold-500/15 flex flex-col items-center gap-2 text-xs text-charcoal-400 font-sans tracking-wider">
            <div className="flex items-center gap-2">
              <AalilaLeaf size={14} />
              <span>KERALA TRADITIONAL WEDDING CELEBRATION</span>
              <AalilaLeaf size={14} className="transform scale-x-[-1]" />
            </div>
            <span>Amerivila Veedu • Thattarkonam P.O. • Peroor, Kollam</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
