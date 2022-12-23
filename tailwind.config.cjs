/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#3379c2",
        primary: "#204F7F",
        light: "#adb0cc",
      },
    },
  },
  plugins: [],
};
