/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      clipPath: {
        'custom-shape': 'polygon(0 0, 50% 50%, 100% 100%, 0 100%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.clip-custom': {
          clipPath: ' polygon(0 0, 50% 50%, 100% 100%, 0 100%)',
        },
      });
    },
  ],
}
