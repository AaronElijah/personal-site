const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        satellite: 5000,
        skyscraper: 1000,
        'tower-block': 500,
        house: 200,
        'bungalow-chimney': 110,
        bungalow: 100,
        shed: 50,
        postbox: 10,
        curb: 1,
        pavement: 0,
        pothole: -10,
        ditch: -20,
        sewer: -100,
        mine: -300,
        seabed: -1000,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        '.x-invisible-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        '.x-invisible-scrollbar': {
          '-ms-overflow-style': 'none' /* IE and Edge */,
          'scrollbar-width': 'none' /* Firefox */,
        },
      })
    }),
  ],
}
