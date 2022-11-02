/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xl': '2200px',
        // => @media (min-width: 2200px) { ... }
      },
      minWidth: {
        '0': '0',
        '5': '5%',
        '7': '7%',
        '10': '10%',
        '15': '15%',
        '20': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      height: {
        xl: '40rem',
        '2xl': '60rem',
      },
      colors: {
        brand: {
          DEFAULT: "#1565c0",
          light: "#5e92f3",
          dark: "#003c8f"
        }
      },
    },
  },
  plugins: [],
};
