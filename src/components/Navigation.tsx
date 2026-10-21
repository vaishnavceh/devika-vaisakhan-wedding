import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('invitation');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);

      const sections = ['invitation', 'ceremony', 'reception', 'countdown', 'blessings'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!scrolled) return null;

  const navItems = [
    { id: 'invitation', label: 'Invitation' },
    { id: 'ceremony', label: 'Ceremony' },
    { id: 'reception', label: 'Reception' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'blessings', label: 'Blessings' },
  ];

  return (
    <nav
      aria-label="Wedding Sections"
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 max-w-[92vw]"
    >
      <div className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full bg-ivory-50/90 backdrop-blur-md border border-gold-500/35 shadow-heirloom text-xs">
        <Sparkles className="w-3 h-3 text-gold-600 hidden sm:inline ml-1" />
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-2.5 sm:px-3 py-1 rounded-full font-sans tracking-wide transition-all whitespace-nowrap text-[11px] sm:text-xs ${
              activeSection === item.id
                ? 'bg-burgundy-700 text-ivory-50 font-medium shadow-xs'
                : 'text-charcoal-700 hover:text-burgundy-800 hover:bg-parchment-100/60'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
