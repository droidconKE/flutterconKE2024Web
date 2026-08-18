/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './constant/**/*.{js,ts}',
    './globals.css',
    './styles/**/*.{css,scss,sass}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 2026 rebrand — flutter-blue primary + magenta accent (retires amber).
        // Existing token names kept (remapped) so nothing breaks; component
        // cleanup is per-phase. New ramps below: bg-blue-500, text-magenta-500…
        primary: '#008BFF',
        secondary: '#F73EDE',
        accent: '#F73EDE',
        // white exists
        lighter: '#F5F5F5',
        light: '#707070',
        black: '#20201E',
        'accent-2': '#FFA7F5',
        'secondary-2': '#FF57E9',
        'accent-3': '#F73EDE4D',
        // dark
        'primary-dark': '#008BFF',
        'secondary-dark': '#F73EDE',
        'accent-dark': '#F73EDE',
        'white-dark': '#ffffff',
        // for white bgs in dark
        dark: '#000000',
        'lighter-dark': '#F5F5F5',
        'light-dark': '#707070',
        'darker-dark': '#191D1D',
        'black-dark': '#000000',
        'accent-2-dark': '#FFA7F5',
        'accent-3-dark': '#F73EDE4D',
        'secondary-2-dark': '#FF57E9',
        // Full ramps from the Figma variable export (public/docs/colors)
        blue: {
          50: '#EDFAFF',
          100: '#D6F3FF',
          200: '#B5EBFF',
          300: '#83E1FF',
          400: '#48CEFF',
          500: '#1EB3FF',
          600: '#069AFF',
          700: '#008BFF',
          800: '#086AC5',
          900: '#0D5A9B',
        },
        magenta: {
          50: '#FFF3FE',
          100: '#FFE7FE',
          200: '#FFCEFC',
          300: '#FFA7F5',
          400: '#FF57E9',
          500: '#F73EDE',
          600: '#DB1EBE',
          700: '#B6159A',
          800: '#95137D',
          900: '#791664',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
