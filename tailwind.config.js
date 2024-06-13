/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marvel-red': '#EC1D24',
        'marvel-black': '#202020',
      },
    },
  },
  plugins: [],
}

