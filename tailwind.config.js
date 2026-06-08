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
        brand: {
          DEFAULT: '#4B2ACF',
          light:   '#EEE9FF',
          mid:     '#6344E0',
        },
        surface:  '#F7F6F2',
        ink:      '#0D0E12',
        success:  '#059669',
        warning:  '#D97706',
        danger:   '#DC2626',
      },
      fontSize: {
        'display': ['3rem',    { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'heading':  ['1.875rem',{ lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'subhead':  ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.005em',fontWeight: '500' }],
      },
    },
  },
  plugins: [],
}
