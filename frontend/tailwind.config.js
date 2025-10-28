/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{vue,html}'
  ],
  theme: {
    extend: {
      colors: {
        udaanBlue: '#BEE3F8',
        udaanPink: '#FBCFE8',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      }
    }
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  }
};
