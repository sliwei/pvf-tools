const plugin = require('tailwindcss/plugin')

// Rotate Y utilities
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)'
    }
  })
})

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        def: '#d35f15'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), rotateY]
}
