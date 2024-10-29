/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#1F1F1F', 
        lightGray : "#292929",
        maroon : '#812323',
        beige : "#C6C6C6",
        hoverRed : "#A74646",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}