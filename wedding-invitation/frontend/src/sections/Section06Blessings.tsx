import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Heart, Check, Copy } from 'lucide-react';
import { WeddingData } from '../data/weddingData';
import { JasmineSprig, OrnamentalDivider } from '../components/KeralaMotifs';

interface SectionProps {
  data: WeddingData;
}

export const Section06Blessings: React.FC<SectionProps> = ({ data }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyPhone = (raw: string, index: number) => {
    navigator.clipboard.writeText(raw);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="blessings" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-ivory-100/80 parchment-grain border-t border-gold-500/20">
      <div className="max-w-2xl mx-auto text-center">
        {/* Subtle Decorative Floral Header */}
        <div className="mb-4">
          <JasmineSprig className="mx-auto" />
        </div>

        {/* Section Heading */}
        <span className="text-[11px] font-sans font-semibold tracking-[0.28em] uppercase text-gold-700 block mb-2">
          {data.familyBlessings.note}
        </span>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-burgundy-800 tracking-tight mb-8">
          Family &amp; Blessings
        </h2>

        {/* Sharing the Happiness Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-parchment-50 border border-gold-500/30 rounded-sm p-8 sm:p-12 shadow-heirloom text-center"
        >
          <div className="w-10 h-10 rounded-full bg-parchment-100 flex items-center justify-center border border-gold-500/30 text-gold-600 mx-auto mb-4">
            <Heart className="w-4 h-4 text-burgundy-700 fill-burgundy-700/20" />
          </div>

          <p className="font-serif italic text-base sm:text-lg text-charcoal-500 font-light mb-3">
            Sharing the happiness
          </p>

          <h3 className="font-display text-2xl sm:text-3xl font-medium text-burgundy-800 tracking-tight">
            {data.familyBlessings.sharingHappiness}
          </h3>

          <OrnamentalDivider className="my-6" />

          {/* Bride-side Contact Numbers */}
          <div className="mt-8 pt-4 border-t border-gold-500/20">
            <span className="text-[10px] font-sans font-semibold tracking-[0.22em] uppercase text-gold-700 block mb-4">
              Bride&apos;s Family Enquiries &amp; Coordination
            </span>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {data.contacts.numbers.map((contact, idx) => (
                <div
                  key={contact.raw}
                  className="w-full sm:w-auto inline-flex items-center justify-between gap-3 px-4 py-2.5 rounded-sm bg-ivory-50 border border-gold-500/30 text-charcoal-700 hover:border-gold-500 transition-colors shadow-xs"
                >
                  <a
                    href={`tel:${contact.tel}`}
                    className="flex items-center gap-2 text-xs font-sans font-medium text-burgundy-800 hover:text-burgundy-950 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>{contact.display}</span>
                  </a>

                  <button
                    onClick={() => handleCopyPhone(contact.raw, idx)}
                    title="Copy phone number"
                    className="text-gold-600 hover:text-burgundy-800 p-1 rounded focus:outline-none focus:ring-1 focus:ring-gold-500"
                    aria-label={`Copy phone number ${contact.display}`}
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-forest-700" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
