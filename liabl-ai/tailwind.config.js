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
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#1A4FD8',
          light:   '#EEF3FF',
          mid:     '#3B6AEF',
        },
        surface: '#F7F6F2',
        ink:     '#0D0E12',
      },
    },
  },
  plugins: [],
}
