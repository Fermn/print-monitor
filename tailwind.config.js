/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./*.{html, js, erb}",
    "./views/**/*.erb",
    "./public/**/*.html",
    "./public/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      'shell-green': '#ecede7',
      white: colors.white,
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
