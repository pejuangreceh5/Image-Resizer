/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // WAJIB: biar nggak otomatis dark
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
