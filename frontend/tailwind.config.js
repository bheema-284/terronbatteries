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
          bg: '#111E31',          // EXACT LOGO NAVY BACKGROUND
          card: '#15243C',         // Card background
          surface: '#0E1A2C',      // Elevated surface
          border: '#1E3352',       // Border line
          gold: '#EAB308',         // BROCHURE GOLD
          goldLight: '#FBBF24',
          goldDark: '#CA8A04',
          silver: '#CBD5E1',       // METALLIC SILVER
          silverLight: '#F1F5F9',
          silverDark: '#94A3B8',
          blue: '#38BDF8',         // ELECTRIC BLUE GLOW
          blueDark: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
