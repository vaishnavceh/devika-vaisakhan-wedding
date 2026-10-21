import React from 'react';
import { motion } from 'framer-motion';
import { WeddingData } from '../data/weddingData';
import { HeirloomCrest, JasmineSprig, OrnamentalDivider } from '../components/KeralaMotifs';

interface SectionProps {
  data: WeddingData;
}

export const Section02Invitation: React.FC<SectionProps> = ({ data }) => {
  return (
    <section id="invitation" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-ivory-100/90 parchment-grain border-t border-gold-500/20">
      <div className="max-w-3xl mx-auto">
        {/* Editorial Frame Container with subtle deckled edge & Kasavu trim */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative bg-ivory-50/95 deckle-card rounded-sm px-6 py-12 sm:px-14 sm:py-16 text-center overflow-hidden"
        >
          {/* Authentic Kerala Mandala Card Texture Watermark */}
          <div
            className="absolute inset-0 bg-repeat opacity-[0.06] pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage: 'url(/images/mandala-border-bg.webp)',
              backgroundSize: '360px',
            }}
            aria-hidden="true"
          />

          {/* Subtle Golden Kasavu top & bottom accent borders */}
          <div className="absolute top-0 left-0 right-0 kasavu-border opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 kasavu-border opacity-70" />

          {/* Heirloom Crest */}
          <div className="mb-6">
            <HeirloomCrest />
          </div>

          <div className="mb-4">
            <JasmineSprig className="mx-auto" />
          </div>

          {/* Section Subtitle */}
          <span className="block text-[11px] font-sans font-semibold tracking-[0.28em] uppercase text-gold-700 mb-6">
            Solemn Wedding Invitation
          </span>

          {/* Invitation Host Copy */}
          <p className="font-serif text-base sm:text-lg text-charcoal-700 max-w-xl mx-auto leading-relaxed font-normal mb-8">
            {data.hosts.invitationNote}
          </p>

          <OrnamentalDivider className="my-6" />

          {/* Bride Display */}
          <div className="my-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-burgundy-800 tracking-tight">
              {data.couple.bride.fullName}
            </h2>
            <p className="font-serif italic text-sm sm:text-base text-gold-700 mt-1">
              Daughter of {data.couple.bride.parents}
            </p>
            <p className="font-sans text-xs text-charcoal-400 mt-0.5 tracking-wide">
              {data.couple.bride.address}, {data.couple.bride.postOffice}, {data.couple.bride.district}
            </p>
          </div>

          {/* "with" connector */}
          <div className="my-5 flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-gold-400/40" />
            <span className="font-ceremonial italic text-xl sm:text-2xl text-gold-700 font-light">
              with
            </span>
            <div className="h-[1px] w-12 bg-gold-400/40" />
          </div>

          {/* Groom Display */}
          <div className="my-6">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-burgundy-800 tracking-tight">
              {data.couple.groom.fullName}
            </h2>
            {/* Supporting Groom Family Details */}
            <p className="font-serif italic text-sm sm:text-base text-gold-700 mt-1">
              {data.couple.groom.parentsNote}
            </p>
          </div>

          <OrnamentalDivider className="my-6" />

          {/* Respectful Invocation / Conclusion */}
          <p className="font-serif text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto leading-relaxed italic mt-4">
            We solicit your esteemed presence and prayerful blessings on this joyous occasion.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
