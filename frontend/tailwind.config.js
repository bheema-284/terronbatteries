import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    path.join(__dirname, 'index.html'),
    path.join(__dirname, 'src/**/*.{js,ts,jsx,tsx}'),
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#111E31',       // EXACT LOGO BACKGROUND COLOR CODE
          surface: '#0b1523',  // Slightly darker accent
          card: '#16273f',     // Harmonized card surface
          elevated: '#1c314f', // Elevated hover / active state
          border: '#233d62',   // Sleek border matching logo
          borderLight: '#32568a',
          accent: '#38bdf8',   // Electric cyan highlight
          blue: '#2563eb',
          chrome: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
