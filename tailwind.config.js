/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['DM Sans', 'sans-serif'],
        serif: ['Syne', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Brand primary
        brand: { DEFAULT:'#4B2ACF', light:'#EEE9FF', mid:'#6344E0', deep:'#3A1FA5' },
        // Accent — energy, momentum, secondary CTAs
        accent: { DEFAULT:'#EA580C', light:'#FFEDD5', deep:'#C2410C' },
        // Success — verified, signed, complete
        success: { DEFAULT:'#15803D', light:'#DCFCE7', deep:'#14532D' },
        // Surfaces and text
        surface: '#F7F6F2',
        ink:     '#0D0E12',
        muted:   '#6B7280',
      },
    },
  },
  plugins: [],
}
