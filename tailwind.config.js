/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2F608D',
        'mint': '#B5CCAD',
      },
      fontFamily: {
        'sans': ['Plus Jakarta Sans'],
        'serif': ['Quando'],
        'toast': ['Outfit'],
      }
    },
  },
  plugins: [],
};
