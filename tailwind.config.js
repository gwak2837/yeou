/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        fox: {
          100: '#fef2e6',
          200: '#fdd8b5',
          300: '#fcbe83',
          400: '#faa451',
          500: '#f98a20',
          600: '#df7006',
          700: '#ae5705',
          800: '#7c3e03',
          900: '#4a2502',
        },
      },
    },
  },
  plugins: [],
}
