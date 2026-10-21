import React from 'react';
import { useWeddingData } from './hooks/useWeddingData';
import { Navigation } from './components/Navigation';
import { AudioPlayer } from './components/AudioPlayer';
import { Section01Hero } from './sections/Section01Hero';
import { Section02Invitation } from './sections/Section02Invitation';
import { Section03Ceremony } from './sections/Section03Ceremony';
import { Section04Reception } from './sections/Section04Reception';
import { Section05Countdown } from './sections/Section05Countdown';
import { Section06Blessings } from './sections/Section06Blessings';
import { Section07Closing } from './sections/Section07Closing';

export const App: React.FC = () => {
  const { data } = useWeddingData();

  const handleScrollToInvitation = () => {
    const el = document.getElementById('invitation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-700 font-sans selection:bg-gold-200 selection:text-burgundy-900 relative">
      {/* Discreet floating section navigation */}
      <Navigation />

      {/* Main scrolling story experience */}
      <main className="w-full">
        {/* Section 01: Welcome / Hero */}
        <Section01Hero onScrollToNext={handleScrollToInvitation} />

        {/* Section 02: Solemn Heirloom Invitation */}
        <Section02Invitation data={data} />

        {/* Section 03: The Sacred Union (Wedding Ceremony) */}
        <Section03Ceremony ceremony={data.events.ceremony} />

        {/* Section 04: An Evening of Celebration (Wedding Reception) */}
        <Section04Reception reception={data.events.reception} />

        {/* Section 05: Muhurtham Countdown */}
        <Section05Countdown targetIso={data.countdown.targetIso} />

        {/* Section 06: Family Blessings & Contacts */}
        <Section06Blessings data={data} />

        {/* Section 07: Final Invitation Closing */}
        <Section07Closing data={data} />
      </main>

      {/* Ambient background music toggle */}
      <AudioPlayer />
    </div>
  );
};

export default App;
