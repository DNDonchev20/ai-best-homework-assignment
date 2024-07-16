/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#50E3C2",
        accent: "#F5A623",
        background: "#F4F5F7",
        text: "#333333",
      },
    },
  },
  plugins: [],
};
