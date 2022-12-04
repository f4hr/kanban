// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: colors.sky,
        info: colors.sky,
        danger: colors.red,
        success: colors.green,
        main: colors.zinc,
        border: colors.gray,
      },
    },
  },
};
