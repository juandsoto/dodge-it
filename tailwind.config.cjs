/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#152238",
        primary: "#3379c2",
        dark: "#204F7F",
        light: "#ded",
        danger: "#a51c30",
      },
    },
  },
  plugins: [],
};
