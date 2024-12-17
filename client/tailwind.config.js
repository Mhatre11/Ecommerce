import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      serif: ["Inter", "ui-serif", "Georgia"],
      body: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          50: '#E3F2FD',    // Lightest shade
          100: '#BBDEFB',   // Light shade
          200: '#64B5F6',   // Base color
          300: '#2196F3',   // Darker shade
          400: '#1976D2',   // Darkest shade
          500: '#0D47A1'    // Deep accent
        },
        secondary: {
          50: '#F1F8E9',   // Lightest shade
          100: '#DCEDC8',  // Light shade
          200: '#8BC34A',  // Base color
          300: '#689F38',  // Darker shade
          400: '#558B2F',  // Darkest shade
          500: '#33691E'   // Deep accent
        },
        neutral: {
          50: '#FAFAFA',   // Almost white
          100: '#F5F5F5',  // Light gray
          200: '#EEEEEE',  // Soft gray
          300: '#E0E0E0',  // Medium gray
          400: '#BDBDBD',  // Gray
          500: '#9E9E9E',  // Dark gray
          600: '#757575',  // Darker gray
          700: '#616161',  // Very dark gray
          800: '#424242',  // Almost black
          900: '#212121'   // Deep black
        },
        error: {
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF5350',
          300: '#F44336',
          400: '#D32F2F'
        },
        success: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#4CAF50',
          300: '#388E3C',
          400: '#2E7D32'
        }
      },
      animation: {
        'text-reveal': 'textReveal 0.5s ease-out',
        'underline': 'underlineAnimation 0.3s ease-out',
      },
      keyframes: {
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        underlineAnimation: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        }
      }
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
});
