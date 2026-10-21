import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar as CalendarIcon, ExternalLink, Download, Check } from 'lucide-react';
import { WeddingEvent } from '../data/weddingData';
import { NilavilakkuLamp, AalilaLeaf } from '../components/KeralaMotifs';
import { downloadIcsFile, getGoogleCalendarUrl } from '../lib/calendar';

interface SectionProps {
  ceremony: WeddingEvent;
}

export const Section03Ceremony: React.FC<SectionProps> = ({ ceremony }) => {
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleDownload = () => {
    downloadIcsFile(ceremony);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section id="ceremony" className="relative py-20 sm:py-28 px-4 sm:px-8 bg-ivory-100 parchment-grain border-t border-gold-500/20">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-sans font-semibold tracking-[0.28em] uppercase text-gold-700 block mb-2">
            The Marriage Ceremony
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium text-burgundy-800 tracking-tight">
            {ceremony.title}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <div className="h-[1px] w-8 bg-gold-500/40" />
            <AalilaLeaf size={16} />
            <div className="h-[1px] w-8 bg-gold-500/40" />
          </div>
        </div>

        {/* Responsive Editorial Composition Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8 }}
          className="relative bg-parchment-50 border border-gold-500/30 rounded-sm shadow-heirloom overflow-hidden"
        >
          {/* Top Kasavu Band */}
          <div className="kasavu-border opacity-80" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
            {/* Left Column: Date and Muhurtham Spotlight */}
            <div className="md:col-span-5 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gold-500/25 pb-8 md:pb-0 md:pr-8">
              <div className="mb-4">
                <NilavilakkuLamp size={36} />
              </div>

              {/* Day & Date Presentation */}
              <span className="sr-only">Sunday, 06 December 2026</span>
              <span className="font-sans text-xs uppercase tracking-[0.24em] font-semibold text-gold-700 mb-1">
                Sunday
              </span>
              <div className="font-display text-5xl sm:text-6xl text-burgundy-800 font-medium tracking-tight">
                06
              </div>
              <span className="font-sans text-sm uppercase tracking-[0.22em] text-charcoal-700 font-medium">
                December 2026
              </span>
              <span className="text-[11px] font-sans text-gold-700 mt-1 block">
                Sunday, 06 December 2026
              </span>
              {ceremony.malayalamDate && (
                <span className="font-malayalam text-xs text-gold-700/80 mt-1">
                  {ceremony.malayalamDate}
                </span>
              )}

              {/* Auspicious Muhurtham Box */}
              <div className="mt-6 w-full max-w-xs bg-ivory-100/90 border border-gold-500/30 rounded-sm p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-burgundy-800 mb-1">
                  <Clock className="w-3.5 h-3.5 text-gold-600" />
                  <span className="text-[11px] font-sans font-semibold tracking-[0.2em] uppercase text-gold-700">
                    Auspicious Muhurtham
                  </span>
                </div>
                <div className="font-display text-lg sm:text-xl font-medium text-burgundy-800">
                  {ceremony.time}
                </div>
                <span className="text-[11px] font-serif italic text-charcoal-500">
                  Asia / Kolkata (IST)
                </span>
              </div>
            </div>

            {/* Right Column: Venue, Details, & Action Controls */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-full bg-parchment-100 text-burgundy-700 border border-gold-500/30 mt-1">
                    <MapPin className="w-5 h-5 text-burgundy-800" />
                  </div>
                  <div>
                    <span className="text-[11px] font-sans font-semibold tracking-[0.22em] uppercase text-gold-700 block mb-1">
                      Sacred Wedding Venue
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-burgundy-800 leading-snug">
                      {ceremony.venue}
                    </h3>
                    <p className="font-sans text-sm text-charcoal-500 mt-1 leading-relaxed">
                      {ceremony.address}
                    </p>
                    <p className="font-serif italic text-xs text-gold-700/90 mt-1">
                      Historic temple sanctum in Kollam district, Kerala
                    </p>
                  </div>
                </div>

                {ceremony.orderNote && (
                  <div className="mt-4 p-3 bg-ivory-50/70 border-l-2 border-gold-500 text-xs font-serif italic text-charcoal-500">
                    {ceremony.orderNote}
                  </div>
                )}
              </div>

              {/* Action Buttons: Maps & Calendar */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={ceremony.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-sm bg-burgundy-700 text-ivory-50 text-xs font-sans font-medium uppercase tracking-[0.14em] hover:bg-burgundy-800 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                {/* Calendar Dropdown / Actions */}
                <div className="flex items-center gap-2">
                  <a
                    href={getGoogleCalendarUrl(ceremony)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Add to Google Calendar"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-sm border border-gold-500/40 bg-ivory-100 text-burgundy-800 hover:bg-parchment-100 transition-colors text-xs font-sans font-medium tracking-wide"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-gold-600" />
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
