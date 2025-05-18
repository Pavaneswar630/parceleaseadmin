/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066FF', // Primary color
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        secondary: {
          50: '#F5F7FA', // Secondary color (light grey background)
          100: '#e9edf2',
          200: '#d4dbe6',
          300: '#b8c5d9',
          400: '#9daccc',
          500: '#8294bf',
          600: '#6a7db2',
          700: '#5668a5',
          800: '#475594',
          900: '#394481',
        },
        accent: {
          50: '#fff5e6',
          100: '#ffeacc',
          200: '#ffd699',
          300: '#ffc266',
          400: '#ffad33',
          500: '#FF9933', // Accent color
          600: '#cc7a29',
          700: '#995c1f',
          800: '#663d14',
          900: '#331f0a',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        text: {
          primary: '#1A1A1A',   // Headings
          secondary: '#4D4D4D', // Content
          muted: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
      },
      boxShadow: {
        'custom': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'custom-lg': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};