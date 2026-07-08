/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07111d',
          900: '#0b1624',
          800: '#132131',
          700: '#1d2e42'
        },
        gold: {
          500: '#d4a24a',
          600: '#b98731',
          700: '#8f6728'
        },
        warm: {
          50: '#fbf7ef',
          100: '#f5ecdc',
          200: '#ead9be'
        },
        graphite: '#252a31'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'Times New Roman', 'serif']
      },
      boxShadow: {
        soft: '0 24px 70px rgba(7, 17, 29, 0.14)'
      }
    }
  },
  plugins: []
};
