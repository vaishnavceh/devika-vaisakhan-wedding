import React from 'react';

export const NilavilakkuLamp: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48,
}) => (
  <svg
    width={size}
    height={size * 1.5}
    viewBox="0 0 100 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    {/* Flame glow */}
    <ellipse cx="50" cy="22" rx="12" ry="18" fill="url(#flameGlow)" opacity="0.6" />
    {/* Flame inner */}
    <path
      d="M50 8C47 16 43 21 44 26C45 31 47 34 50 34C53 34 55 31 56 26C57 21 53 16 50 8Z"
      fill="url(#flameGradient)"
    />
    <path
      d="M50 16C49 20 47 23 47 26C47 29 48 31 50 31C52 31 53 29 53 26C53 23 51 20 50 16Z"
      fill="#FFF3DF"
    />

    {/* Lamp crown / wick holder */}
    <ellipse cx="50" cy="35" rx="8" ry="3" fill="#B49360" stroke="#7B6036" strokeWidth="1" />
    <path d="M46 36L44 42H56L54 36H46Z" fill="#9B7C4B" />

    {/* Upper oil basin */}
    <ellipse cx="50" cy="44" rx="28" ry="9" fill="url(#brassGradient)" stroke="#7B6036" strokeWidth="1.2" />
    <ellipse cx="50" cy="43" rx="24" ry="7" fill="#8C6E3D" opacity="0.7" />
    {/* Oil surface shimmer */}
    <ellipse cx="50" cy="43" rx="18" ry="4" fill="#C7A877" opacity="0.5" />

    {/* Stem segments */}
    <path d="M47 48L46 64H54L53 48H47Z" fill="url(#brassGradient)" />
    {/* Upper node ring */}
    <ellipse cx="50" cy="65" rx="10" ry="3.5" fill="#C7A877" stroke="#7B6036" strokeWidth="1" />
    {/* Central bulb */}
    <ellipse cx="50" cy="78" rx="8" ry="9" fill="url(#brassGradient)" stroke="#7B6036" strokeWidth="1" />
    {/* Lower node ring */}
    <ellipse cx="50" cy="91" rx="11" ry="4" fill="#C7A877" stroke="#7B6036" strokeWidth="1" />

    {/* Lower Stem */}
    <path d="M46 93L44 116H56L54 93H46Z" fill="url(#brassGradient)" />

    {/* Tiered Pedestal Base */}
    <ellipse cx="50" cy="118" rx="20" ry="6" fill="#9B7C4B" stroke="#7B6036" strokeWidth="1" />
    <path d="M30 119L22 136H78L70 119H30Z" fill="url(#brassGradient)" stroke="#7B6036" strokeWidth="1" />
    <ellipse cx="50" cy="136" rx="34" ry="8" fill="#7B6036" />
    <ellipse cx="50" cy="134" rx="32" ry="7" fill="url(#brassGradient)" stroke="#7B6036" strokeWidth="1.2" />
    <ellipse cx="50" cy="140" rx="36" ry="6" fill="#551F32" opacity="0.3" />

    <defs>
      <linearGradient id="flameGradient" x1="50" y1="8" x2="50" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE082" />
        <stop offset="0.5" stopColor="#FFA000" />
        <stop offset="1" stopColor="#E65100" />
      </linearGradient>
      <radialGradient id="flameGlow" cx="50" cy="22" r="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFD54F" stopOpacity="0.8" />
        <stop offset="1" stopColor="#FF6F00" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="brassGradient" x1="20" y1="35" x2="80" y2="140" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F5EEDF" />
        <stop offset="0.25" stopColor="#C7A877" />
        <stop offset="0.55" stopColor="#B49360" />
        <stop offset="0.85" stopColor="#8C6E3D" />
        <stop offset="1" stopColor="#674C23" />
      </linearGradient>
    </defs>
  </svg>
);

export const AalilaLeaf: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    {/* Auspicious Peepal Leaf / Aalila with elongated tip */}
    <path
      d="M32 4C32 4 14 16 14 34C14 47 24 55 32 58C40 55 50 47 50 34C50 16 32 4 32 4Z"
      stroke="#B49360"
      strokeWidth="1.5"
      fill="#35483D"
      fillOpacity="0.08"
    />
    <path d="M32 4V58" stroke="#B49360" strokeWidth="1.2" />
    <path d="M32 20C26 24 21 28 20 33" stroke="#B49360" strokeWidth="0.8" opacity="0.7" />
    <path d="M32 20C38 24 43 28 44 33" stroke="#B49360" strokeWidth="0.8" opacity="0.7" />
    <path d="M32 32C26 36 22 41 21 46" stroke="#B49360" strokeWidth="0.8" opacity="0.7" />
    <path d="M32 32C38 36 42 41 43 46" stroke="#B49360" strokeWidth="0.8" opacity="0.7" />
    {/* Extended tail */}
    <path d="M32 4C32 2 33 0 34 -2" stroke="#B49360" strokeWidth="1" />
  </svg>
);

export const JasmineSprig: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="80"
    height="32"
    viewBox="0 0 80 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
    aria-hidden="true"
  >
    {/* Vine stem */}
    <path
      d="M4 16C18 12 32 20 48 14C60 10 70 18 76 16"
      stroke="#B49360"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path
      d="M20 15C18 10 12 9 10 12C8 15 13 18 20 15Z"
      fill="#35483D"
      opacity="0.3"
      stroke="#35483D"
      strokeWidth="0.7"
    />
    <path
      d="M44 15C46 21 52 22 54 19C56 16 51 13 44 15Z"
      fill="#35483D"
      opacity="0.3"
      stroke="#35483D"
      strokeWidth="0.7"
    />
    {/* Buds / Jasmine Petals */}
    <ellipse cx="32" cy="18" rx="3.5" ry="5" transform="rotate(-20 32 18)" fill="#F8F4EC" stroke="#B49360" strokeWidth="0.8" />
    <ellipse cx="64" cy="13" rx="3.5" ry="5" transform="rotate(25 64 13)" fill="#F8F4EC" stroke="#B49360" strokeWidth="0.8" />
    <circle cx="33" cy="19" r="1.5" fill="#B49360" opacity="0.6" />
    <circle cx="63" cy="14" r="1.5" fill="#B49360" opacity="0.6" />
  </svg>
);

export const HeirloomCrest: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>
    <svg
      width="90"
      height="90"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke="#B49360" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="41" stroke="#551F32" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="37" stroke="#B49360" strokeWidth="0.8" />
      
      {/* 4 Cardinal points traditional Kerala lotus buds */}
      <circle cx="50" cy="9" r="2.5" fill="#B49360" />
      <circle cx="50" cy="91" r="2.5" fill="#B49360" />
      <circle cx="9" cy="50" r="2.5" fill="#B49360" />
      <circle cx="91" cy="50" r="2.5" fill="#B49360" />

      {/* Internal decorative arcs */}
      <path d="M30 50C30 38 40 30 50 30C60 30 70 38 70 50" stroke="#B49360" strokeWidth="0.8" opacity="0.5" />
      <path d="M30 50C30 62 40 70 50 70C60 70 70 62 70 50" stroke="#B49360" strokeWidth="0.8" opacity="0.5" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-burgundy-700 select-none">
      <span className="font-display text-2xl font-normal tracking-wide text-burgundy-800">
        D<span className="text-gold-500 text-sm mx-1">&amp;</span>V
      </span>
    </div>
  </div>
);

export const OrnamentalDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`} aria-hidden="true">
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-gold-500/60 to-gold-500" />
    <span className="text-gold-500 text-xs sm:text-sm">✦</span>
    <span className="text-burgundy-700 text-base">❦</span>
    <span className="text-gold-500 text-xs sm:text-sm">✦</span>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-gold-500/60 to-gold-500" />
  </div>
);
