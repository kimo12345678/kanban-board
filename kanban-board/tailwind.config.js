/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {      backgroundColor: {
      'custom-blue': '#5A67D8',
    }
  ,colors: {
    'custom-blue1': '#bad1e0',
    'custom-scroll-thumb': '#bccfe8',
    'custom-scroll-thumb-hover': '#a2bddf',
  },},
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true }),],
}

