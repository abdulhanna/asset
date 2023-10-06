const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./proj-components/**/*.{js,ts,jsx,tsx}",
  ],

  

  theme: {
    extend: {
      colors: {
        // Configure your color palette here

        primary: "#3B5FDA",
        secondary: "#2D3192",
        background: "#EDF1F4",
        cardBottom: "#FAFAFA",
        textColor: "#666",
        light_green: "#f2fcf5",
        menuBG: "rgba(7,109,169,0.12)",
        menuText: "#076DA9",
        fieldBg: "rgba(196,196,196,0.25)",
      },
      

      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }

        "3xl": "1920px",
        // => @media (min-width: 1920px) {... }
      },

      container: {
        padding: {
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "4rem",
          "3xl": "4rem",
        },
      },

      fontFamily: {
        body: ["Public Sans", "sans-serif"],
      },
    },
  },
  plugins: [
      plugin(function({ addUtilities }) {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        '.content-hidden': {
          'content-visibility': 'hidden',
        },
        '.content-visible': {
          'content-visibility': 'visible',
        },

      })
    })
  ],
     

};
