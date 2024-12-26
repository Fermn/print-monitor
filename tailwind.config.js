/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.{html, js, erb}",
    "./views/**/*.erb",
    "./public/**/*.html",
    "./public/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

