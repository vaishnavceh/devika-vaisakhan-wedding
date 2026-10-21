import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Clock, MapPin, ExternalLink, Download, Check } from 'lucide-react';
import { WeddingEvent } from '../data/weddingData';
import { downloadIcsFile, getGoogleCalendarUrl } from '../lib/calendar';
import { JasmineSprig } from '../components/KeralaMotifs';

interface SectionProps {
  reception: WeddingEvent;
}

export const Section04Reception: React.FC<SectionProps> = ({ reception }) => {
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleDownload = () => {
    downloadIcsFile(reception);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="reception" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-ivory-100/70 parchment-grain border-t border-gold-500/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-700 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase mb-3">
            <span>Pre-Ceremony Celebration</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-burgundy-800 tracking-tight">
            {reception.title}
          </h2>
          <p className="font-serif italic text-charcoal-500 text-sm sm:text-base mt-2">
            Hosted by Sunil Kumar B &amp; Preetha M at the bride&apos;s residence
          </p>
          <div className="mt-3">
            <JasmineSprig className="mx-auto" />
          </div>
        </div>

        {/* Editorial Residence Celebration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8 }}
          className="relative bg-parchment-50 border border-gold-500/30 rounded-sm shadow-heirloom overflow-hidden"
        >
          {/* Top Kasavu Band */}
          <div className="kasavu-border opacity-70" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
            {/* Left Column: Date & Time Highlight */}
            <div className="md:col-span-5 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gold-500/25 pb-8 md:pb-0 md:pr-8">
              <div className="w-12 h-12 rounded-full bg-parchment-100 flex items-center justify-center border border-gold-500/30 text-burgundy-800 mb-4">
                <Home className="w-6 h-6 text-burgundy-800" />
              </div>

              <span className="sr-only">Saturday, 05 December 2026</span>
              <span className="font-sans text-xs uppercase tracking-[0.24em] font-semibold text-gold-700 mb-1">
                Saturday
              </span>
              <div className="font-display text-5xl sm:text-6xl text-burgundy-800 font-medium tracking-tight">
                05
              </div>
              <span className="font-sans text-sm uppercase tracking-[0.22em] text-charcoal-700 font-medium">
                December 2026
              </span>
              <span className="text-[11px] font-sans text-gold-700 mt-1 block">
                Saturday, 05 December 2026
              </span>

              {/* Timing Badge */}
              <div className="mt-6 w-full max-w-xs bg-ivory-100/90 border border-gold-500/30 rounded-sm p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-burgundy-800 mb-1">
                  <Clock className="w-3.5 h-3.5 text-gold-600" />
                  <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-gold-700">
                    Reception Time
                  </span>
                </div>
                <div className="font-display text-lg sm:text-xl font-medium text-burgundy-800">
                  {reception.time}
                </div>
                <span className="text-[11px] font-serif italic text-charcoal-500">
                  Saturday Evening
                </span>
              </div>
            </div>

            {/* Right Column: Venue, Address, & Directions */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-full bg-parchment-100 text-burgundy-700 border border-gold-500/30 mt-1">
                    <MapPin className="w-5 h-5 text-burgundy-800" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-gold-700 block mb-1">
                      Reception Venue
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-burgundy-800 leading-snug">
                      {reception.venue}
                    </h3>
                    
                    <div className="mt-3 p-3.5 rounded-sm bg-ivory-50/80 border border-gold-500/20 text-charcoal-700 font-serif leading-relaxed text-sm">
                      <p className="font-medium text-burgundy-900">Amerivila Veedu</p>
                      <p>Thattarkonam P.O., Peroor</p>
                      <p>Kollam, Kerala — 691005</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-forest-50/60 border-l-2 border-forest-500 text-xs font-sans text-forest-900 leading-relaxed">
                  <strong className="font-semibold text-forest-950">Ceremonial Sequence: </strong>
                  The reception is hosted at the bride&apos;s home on Saturday evening to welcome guests before Sunday&apos;s temple union.
                </div>
              </div>

              {/* Action Buttons: Maps & Calendar */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={reception.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-burgundy-700 text-ivory-50 text-xs font-sans font-medium uppercase tracking-[0.14em] hover:bg-burgundy-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>Residence Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {/* Calendar Dropdown / Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={getGoogleCalendarUrl(reception)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Add Reception to Google Calendar"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-sm border border-gold-500/40 bg-ivory-100 text-burgundy-800 hover:bg-parchment-100 transition-colors text-xs font-sans font-medium tracking-wide"
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-600" />
                    <span>Google Cal</span>
                  </a>

                  <button
                    onClick={handleDownload}
                    title="Download .ICS for Apple / Outlook"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-sm border border-gold-500/40 bg-ivory-100 text-burgundy-800 hover:bg-parchment-100 transition-colors text-xs font-sans font-medium tracking-wide focus:outline-none"
                  >
                    {downloaded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-forest-700" />
                        <span className="text-forest-700">Saved</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5 text-gold-600" />
                        <span>.ICS File</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
