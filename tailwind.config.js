/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        type: {
          '0%': { width: '0ch' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
          '100%': { borderColor: 'white' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        type: 'type 2s steps(20) 1 forwards',
        blink: 'blink 0.7s infinite',
      },
    },
  },
  plugins: [],
};