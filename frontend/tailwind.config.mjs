/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5", // Indigo
        secondary: "#f59e0b", // Amber
        background: "#f3f4f6", // Light gray
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
