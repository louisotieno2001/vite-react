/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'black': '#000000',
        'ion-blue': '#00E5FF',
        'fusion-pink': '#FF007A',
        'solar-orange': '#FFC700',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(255, 0, 122, 0.4), 0 0 15px rgba(0, 229, 255, 0.2)' },
          '50%': { boxShadow: '0 0 10px rgba(255, 0, 122, 0.6), 0 0 20px rgba(0, 229, 255, 0.4)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        marquee: { // Add this
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s infinite ease-in-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        marquee: 'marquee 60s linear infinite', // Add this
      },
      screens: {
        '2xl': '1536px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
