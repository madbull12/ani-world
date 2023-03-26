/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        "xs":"400px",
        "xxs":"281px"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require("daisyui")

  ],
  daisyui:{
    themes:[
      {
        pinkTheme:{
          "primary":"#FF0077",
          "btnOverlay":"#ff007728"
        }
      }
    ]
  }
}
