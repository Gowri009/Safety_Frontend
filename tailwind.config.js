/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0b1325',
          light: '#f5f6f8',
          orange: '#f17a41',
          gray: '#8c9bab',
          muted: '#4b5b76'
        }
      }
    },
  },
  plugins: [],
}

