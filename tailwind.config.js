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
      keyframes: {
        ripple: {
          '0%': {
            top: '1rem',
            left: '1rem',
            width: 0,
            height: 0,
            opacity: 0,
          },
          '4.9%': {
            top: '1rem',
            left: '1rem',
            width: 0,
            height: 0,
            opacity: 0,
          },
          '5%': {
            top: '1rem',
            left: '1rem',
            width: 0,
            height: 0,
            opacity: 1,
          },
          '100%': {
            top: 0,
            left: 0,
            width: '2rem',
            height: '2rem',
            opacity: 0,
          },
        },
        skeleton: {
          '0%, 100%': {
            'border-color': 'transparent',
          },
          '50%': {
            'border-color': '#f98a20',
          },
        },
        skeletonPlaceholder: {
          '0%, 100%': {
            'border-color': 'rgb(226 232 240)',
          },
          '50%': {
            'border-color': '#f98a20',
          },
        },
        skeletonBg: {
          '0%, 100%': {
            background: 'rgb(100,116,139,0.05)',
          },
          '50%': {
            background: 'rgb(100,116,139,0.2)',
          },
        },
      },
    },
  },
  plugins: [],
}
