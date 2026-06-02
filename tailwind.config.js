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
      },
      colors: {
        brand: {
          DEFAULT: '#4B2ACF',
          light:   '#EEE9FF',
          mid:     '#6344E0',
        },
        surface: '#F7F6F2',
        ink:     '#0D0E12',
      },
    },
  },
  plugins: [],
}
