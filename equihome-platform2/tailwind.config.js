/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'draw': {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 }
        },
        'grow-up': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      },
      animation: {
        'draw': 'draw 2s ease-out forwards',
        'grow-up': 'grow-up 1s ease-out forwards',
        'slide-right': 'slide-right 1s ease-out forwards'
      }
    }
  },
  plugins: [],
}