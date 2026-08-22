import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#131313',
          surface: '#1A1A1A',
          subtle: '#222222',
        },
        rosegold: {
          light: '#F5D3D8',
          DEFAULT: '#E2A4AD',
          dark: '#B8737D',
          muted: '#8A555D',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.35em',
        'widest-2xl': '0.5em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
