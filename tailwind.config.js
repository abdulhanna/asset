module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    fontFamily: {
      sans: ['Roboto'],
    },

    extend: {
      colors: {
        // Configure your color palette here

        primary: '#3B5FDA',
        secondary: '#2D3192',
        background: '#EDF1F4',
        cardBottom: '#FAFAFA',
        textColor: '#666',
        light_green: '#f2fcf5',
        menuBG: 'rgba(7,109,169,0.12)',
        menuText: '#076DA9',
        fieldBg: 'rgba(196,196,196,0.25)',
      },
    },
  },
  plugins: [],
};
