/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        dark_bg: "#202020",
        gray_bg: "#424242",
        dark_green: "#096A09",
        light_green: "#51DA4C",
        lime_green: "#CEE8CA",
      },
    },
  },
  plugins: [],
};
