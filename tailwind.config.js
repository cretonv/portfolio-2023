/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      'title': ['"Basteleur Moonlight"'],
      'lato': ['"Lato"'],
    },
    extend: {
      screens: {
        '-2xl': { max: '1535px' },
        '-xl': { max: '1279px' },
        '-lg': { max: '1023px' },
        '-md': { max: '767px' },
        '-sm': { max: '639px' },
      },
      width: { fit: 'fit-content' },
      colors: {
        beige: {
          DEFAULT: "#FFF4E4",
        },
        black: {
          DEFAULT: "#181618"
        },
        white: {
          DEFAULT: "#ffffff",
          secondary: "#D9D9D9"
        },
      },
    },
  },
  plugins: [],
}

