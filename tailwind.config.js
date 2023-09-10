/** @type {import('tailwindcss/types').Config} */
const config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["night", "winter"],
  },
};

module.exports = config;
