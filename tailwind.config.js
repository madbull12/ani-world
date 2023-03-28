/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        xxs: "281px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        pinkTheme: {
          primary: "#FF0077",
          secondary:"#ffc7e1",

          ".btnOverlay": {
            "background-color": "rgba(255,0,115,0.14)",
          },
          ".borderOverlay": {
            background:
              "radial-gradient(circle, #FF0077 0%, rgba(0,0,0,0) 100%)",
          },
          "  .radialOverlayGradient": {
            " background": "rgb(0, 0, 0)",
            background:
              "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%,rgba(255, 0, 119, 0.2) 50%,rgba(0, 0, 0, 0) 100%)",

            "background-attachment": "fixed",
            "background-position": "bottom -200px center",
            "background-repeat": "no-repeat",
          },
        },
        purpleTheme: {
          primary: "#8A33E1",
          ".btnOverlay": {
            "background-color": "rgba(138, 51, 225, 0.14)",
          },
          ".borderOverlay": {
            background:
              "radial-gradient(circle, #8A33E1 0%, rgba(0,0,0,0) 100%)",
          },
          "  .radialOverlayGradient": {
            " background": "rgb(0, 0, 0)",
            background:
              "linear-gradient(180deg,rgba(0, 0, 0, 0) 0%,rgba(138, 51, 225, 0.2) 50%,rgba(0, 0, 0, 0) 100%)",

            "background-attachment": "fixed",
            "background-position": "bottom -200px center",
            "background-repeat": "no-repeat",
          },
          
        },
      },
    ],
  },
};
