import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { AalilaLeaf } from '../components/KeralaMotifs';

interface SectionProps {
  targetIso?: string;
}

export const Section05Countdown: React.FC<SectionProps> = ({
  targetIso = '2026-12-06T12:05:00+05:30',
}) => {
  const { days, hours, minutes, seconds, isCompleted, hasMounted } = useCountdown(targetIso);

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <section id="countdown" className="relative py-20 sm:py-24 px-4 sm:px-8 bg-ivory-100 parchment-grain border-t border-gold-500/20">
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <AalilaLeaf size={18} />
            <span className="text-[11px] font-sans font-semibold tracking-[0.28em] uppercase text-gold-700">
              Auspicious Moments Ahead
            </span>
            <AalilaLeaf size={18} className="transform scale-x-[-1]" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-burgundy-800 tracking-tight">
            Counting Down to Muhurtham
          </h2>
          <p className="font-serif italic text-xs sm:text-sm text-charcoal-500 mt-1">
            06 December 2026 • 12:05 PM IST
          </p>
        </div>

        {/* Countdown Grid or Completed Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-2xl mx-auto bg-ivory-50/90 border border-gold-500/30 rounded-sm p-6 sm:p-10 shadow-heirloom"
        >
          {isCompleted ? (
            <div className="py-6 text-center">
              <span className="text-3xl sm:text-4xl text-gold-600 block mb-3 font-serif">❦</span>
              <h3 className="font-display text-2xl sm:text-3xl text-burgundy-800 font-medium">
                The Sacred Union Has Begun
              </h3>
              <p className="font-serif italic text-charcoal-500 mt-2 text-sm sm:text-base">
                May Dr. Devika Rani &amp; Vaisakhan be showered with eternal joy, peace, and togetherness.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2 sm:gap-6 divide-x divide-gold-500/20">
              {units.map((unit, index) => (
                <div key={unit.label} className={`flex flex-col items-center ${index !== 0 ? 'pl-2 sm:pl-4' : ''}`}>
                  <div className="font-display text-3xl sm:text-5xl md:text-6xl font-light text-burgundy-800 tracking-tight min-w-[2.2ch] text-center">
                    {hasMounted ? String(unit.value).padStart(2, '0') : '--'}
                  </div>
                  <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-gold-700 mt-2">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Timezone & Traditional Note */}
          <div className="mt-8 pt-4 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-charcoal-400 font-sans tracking-wider gap-2">
            <span>TIMEZONE: ASIA / KOLKATA (IST)</span>
            <span className="font-malayalam text-gold-700 font-medium">മുഹൂർത്തം: 12:05 PM - 12:25 PM</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
