import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { NilavilakkuLamp, AalilaLeaf } from '../components/KeralaMotifs';

interface SectionProps {
  onScrollToNext: () => void;
}

export const Section01Hero: React.FC<SectionProps> = ({ onScrollToNext }) => {
  return (
    <section className="relative min-h-[100svh] w-full flex flex-col items-center justify-between px-4 sm:px-8 py-10 sm:py-16 overflow-hidden bg-ivory-100 parchment-grain">
      {/* Decorative Traditional Kerala Corner Filigrees */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 opacity-60 pointer-events-none select-none">
        <AalilaLeaf size={28} className="transform -rotate-45" />
      </div>
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-60 pointer-events-none select-none">
        <AalilaLeaf size={28} className="transform rotate-45" />
      </div>
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 opacity-60 pointer-events-none select-none">
        <AalilaLeaf size={28} className="transform -rotate-135" />
      </div>
      <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 opacity-60 pointer-events-none select-none">
        <AalilaLeaf size={28} className="transform rotate-135" />
      </div>

      {/* Top Auspicious Invocation Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-center pt-4 z-10"
      >
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-parchment-100/70 border border-gold-500/30 text-gold-700 text-xs sm:text-sm font-serif tracking-[0.25em] uppercase mb-4">
          <Sparkles className="w-3 h-3 text-gold-500" />
          <span>With love and blessings</span>
          <Sparkles className="w-3 h-3 text-gold-500" />
        </div>
      </motion.div>

      {/* Central Editorial Couple Title Composition */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl w-full text-center my-auto flex flex-col items-center"
      >
        {/* Sacred Nilavilakku Brass Lamp Centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-6"
        >
          <NilavilakkuLamp size={42} className="filter drop-shadow-sm" />
        </motion.div>

        {/* Large Editorial Names */}
        <div className="relative w-full">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-burgundy-800 tracking-tight leading-[1.08] mb-4">
            <span>Devika</span>
            <span className="block sm:inline sm:mx-4 font-ceremonial italic text-gold-600 font-light text-3xl sm:text-5xl md:text-6xl">
              &amp;
            </span>
            <span>Vaisakhan</span>
          </h1>
        </div>

        {/* Heirloom Arched Couple Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: 'easeOut' }}
          className="relative my-6 group"
        >
          {/* Subtle Golden Glow / Ring Frame */}
          <div className="relative p-1.5 sm:p-2 rounded-t-full rounded-b-2xl bg-gradient-to-b from-gold-400/50 via-gold-500/30 to-burgundy-700/20 shadow-heirloom max-w-[280px] sm:max-w-[340px] md:max-w-[380px] mx-auto overflow-hidden">
            <div className="relative rounded-t-full rounded-b-xl overflow-hidden bg-ivory-200 aspect-[3/4]">
              <picture>
                <source srcSet="/images/couple-hero.webp" type="image/webp" />
                <img
                  src="/images/couple-hero.jpg"
                  alt="Dr. Devika Rani P.S. and Vaisakhan M.L. in traditional Kerala wedding attire"
                  width="1600"
                  height="2133"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </picture>
              {/* Subtle Warm Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/30 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Fine Golden Inset Border */}
            <div className="absolute inset-2 rounded-t-full rounded-b-lg border border-gold-400/40 pointer-events-none" />
          </div>
        </motion.div>

        {/* Delicate Golden Divider */}
        <div className="flex items-center justify-center gap-4 my-3 w-full max-w-xs sm:max-w-md">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-500/50 to-gold-500" />
          <span className="text-gold-600 text-xs uppercase tracking-[0.2em] font-serif">Kalyanam</span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-500/50 to-gold-500" />
        </div>

        {/* Supporting Line */}
        <p className="font-serif italic text-base sm:text-xl text-charcoal-500 max-w-lg mt-2 font-normal leading-relaxed">
          Together, a beautiful new chapter begins.
        </p>

        {/* Wedding Date Display */}
        <div className="mt-8 inline-flex items-center gap-4 px-6 py-2.5 rounded-sm border-y border-gold-500/40 bg-ivory-50/50 backdrop-blur-sm">
          <span className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-gold-700 font-semibold">
            06 December 2026
          </span>
          <span className="text-gold-500 text-xs">•</span>
          <span className="text-xs sm:text-sm font-serif italic text-charcoal-500">
            Kollam, Kerala
          </span>
        </div>
      </motion.div>

      {/* Bottom Scroll Invitation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="flex flex-col items-center gap-2 pt-6 z-10"
      >
        <button
          onClick={onScrollToNext}
          aria-label="Scroll to formal invitation"
          className="group flex flex-col items-center gap-2 text-charcoal-500 hover:text-burgundy-800 transition-colors focus:outline-none"
        >
          <span className="text-[11px] font-sans tracking-[0.22em] uppercase text-gold-700 font-medium">
            Explore Invitation
          </span>
          <div className="w-8 h-8 rounded-full border border-gold-500/30 flex items-center justify-center group-hover:border-gold-500 transition-all group-hover:translate-y-1">
            <ChevronDown className="w-4 h-4 text-gold-600" />
          </div>
        </button>
      </motion.div>
    </section>
  );
};
