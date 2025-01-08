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
      'black': colors.black,
    },
    extend: {
      backgroundImage: {
        'printers-pattern': "url('/images/printers_5%.png')",
      },
      fontFamily: {
        'robotoMono': ['RobotoMono', 'monospace'],
        'staatliches': ['Staatliches', 'serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
