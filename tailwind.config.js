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
      'model-bg': '#b3e2f6',
      'paper-bois': '#feeeab',
    },
    extend: {
      backgroundImage: {
        'printers-pattern': "url('/images/printers_5%.png')",
        'print-kit': "url('/images/print-kit.png')",
        'grey-pattern': "url('/images/paper-stack-bg.gif')",
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
