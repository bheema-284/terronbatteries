/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#112240',
          850: '#0d1b33',
          900: '#0a162b',
          950: '#060e1c'
        },
        terron: {
          50: '#f0fdf4',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          chrome: '#e2e8f0'
        },
        electric: {
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Montserrat', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
