module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        custom: '0 11px 11px rgba(235, 235, 235, 0.5)',
      },
      boxShadow: {
        custom: ' 11px 11px rgba(235, 235, 235, 0.5)',
      },
      maxHeight: {
        xxxl: '600px',
      },
      backgroundColor: {
        'custom-800': '#0d1117',
      },
      screens: {
        '2xl': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        xl: { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        lg: { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        md: { max: '767px' },
        // => @media (max-width: 767px) { ... }

        sm: { max: '639px' },
        // => @media (max-width: 639px) { ... }

        tiny: { max: '493px' },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
};
