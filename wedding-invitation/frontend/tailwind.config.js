/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF7',
          100: '#F8F4EC', // Main Warm Ivory
          200: '#F1E9DB',
          300: '#E7DCB6',
        },
        burgundy: {
          50: '#FDF2F4',
          100: '#F9E2E7',
          500: '#7E2A47',
          700: '#551F32', // Main Deep Burgundy
          800: '#431726',
          900: '#2F0E1A',
        },
        gold: {
          100: '#F5EEDF',
          200: '#E7D7BA',
          400: '#C7A877',
          500: '#B49360', // Main Antique Gold
          600: '#9B7C4B',
          700: '#7B6036',
        },
        forest: {
          100: '#EBF0EC',
          500: '#4E6A5A',
          700: '#35483D', // Main Forest Green
          800: '#26342C',
          900: '#1A241E',
        },
        charcoal: {
          100: '#8A8580',
          300: '#524F4B',
          500: '#393633',
          700: '#252321', // Main Charcoal
          900: '#161514',
        },
        parchment: {
          50: '#FAF7F2',
          100: '#EDE5D8', // Main Muted Parchment
          200: '#E2D7C5',
          300: '#D5C7B0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        ceremonial: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'DM Sans', 'system-ui', 'sans-serif'],
        malayalam: ['"Noto Serif Malayalam"', 'serif'],
      },
      boxShadow: {
        'heirloom': '0 10px 40px -10px rgba(85, 31, 50, 0.08), 0 4px 12px -2px rgba(180, 147, 96, 0.1)',
        'heirloom-deep': '0 20px 50px -12px rgba(37, 35, 33, 0.15)',
        'gold-glow': '0 0 25px rgba(180, 147, 96, 0.25)',
      },
    },
  },
  plugins: [],
};
