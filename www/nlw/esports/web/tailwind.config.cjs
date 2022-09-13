/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {}
    extend: {
      backgroundimage:{
        galaxy:"url('/background-galaxy.png')",
      }
    }

  plugins: [],
}
 
