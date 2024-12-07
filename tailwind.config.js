/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        instabread: ["instabread", "sans-serif"],
        londrina: ["londrina", "sans-serif"],
        pinkblue: ["pinkblue", "sans-serif"],
        neonbines: ["neonbines", "sans-serif"],
        bytebounce: ["bytebounce", "sans-serif"],
      },
    },
  },
  plugins: [],
};
