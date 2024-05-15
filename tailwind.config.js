/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './constant/**/*.{js,ts}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        //
        primary: '#0062FF',
        secondary: '#FFAB00',
        accent: '#0014E6',
        // white exists
        lighter: '#F5F5F5',
        light: '#707070',
        black: '#20201E',
        'accent-2': '#54C4F7',
        'secondary-2': '#FB7B3C',
        'accent-3': '#54C4F7',
        // dark
        'primary-dark': '#0062FF',
        'secondary-dark': '#FFAB00',
        'accent-dark': '#0062FF',
        'white-dark': '#ffffff',
        // for white bgs in dark
        dark: '#20201E',
        'lighter-dark': '#F5F5F5',
        'light-dark': '#707070',
        'darker-dark': '#191D1D',
        'black-dark': '#000000',
        'accent-2-dark': '#54C4F7',
        'accent-3-dark': '#54C4F7',
        'secondary-2-dark': '#FB7B3C',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
