/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      // Custom color palette based on theme-palette.scss
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#b87c4c', // Main brand color
          50: '#faf8f6',
          100: '#f3ede5',
          200: '#e6dacb',
          300: '#d4c2a8',
          400: '#c4a484',
          500: '#b87c4c', // Main brand color
          600: '#9e653f',
          700: '#845439',
          800: '#6b4432',
          900: '#52382a',
        },
        // Accent colors
        accent: {
          50: '#f0f5ef',
          100: '#d9e6d7',
          200: '#b8d3b4',
          300: '#a8bba3', // Main accent
          400: '#8fa28a',
          500: '#7a8d73',
          600: '#6b7a64',
          700: '#5a6655',
          800: '#4a5246',
          900: '#3a3e37',
        },
        // Neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        // Semantic colors
        success: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fbbf24',
          dark: '#d97706',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          dark: '#dc2626',
        },
        info: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
          dark: '#0891b2',
        },
        // Background colors
        background: {
          DEFAULT: '#f7f1de', // Cream background
          surface: '#ffffff',
          'surface-hover': '#fbf6e9',
          'surface-active': '#f6ecd7',
        },
        // Text colors
        text: {
          primary: '#1f2937',
          secondary: '#6b7280',
          disabled: '#9ca3af',
          hint: '#9ca3af',
        },
        // Border colors
        border: {
          light: '#e3d8c5',
          medium: '#d4c2a8',
          dark: '#b87c4c',
        },
      },
      // Custom spacing scale
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      // Custom font sizes
      fontSize: {
        'xs': ['12px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.5' }],
        'lg': ['18px', { lineHeight: '1.6' }],
        'xl': ['20px', { lineHeight: '1.6' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['28px', { lineHeight: '1.3' }],
        '4xl': ['32px', { lineHeight: '1.2' }],
      },
      // Custom font weights
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      // Custom border radius
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      // Custom shadows
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.08)',
        'md': '0 2px 8px rgba(0, 0, 0, 0.12)',
        'lg': '0 4px 16px rgba(0, 0, 0, 0.16)',
        'xl': '0 8px 24px rgba(0, 0, 0, 0.2)',
      },
      // Custom font family
      fontFamily: {
        'sans': ['Cairo', 'system-ui', 'sans-serif'],
      },
      // Custom transitions
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '350ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      // Custom animations
      animation: {
        'fadeIn': 'fadeIn 200ms ease-out',
        'slideIn': 'slideIn 200ms ease-out',
        'slideInRTL': 'slideInRTL 200ms ease-out',
        'scaleIn': 'scaleIn 200ms ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin': 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRTL: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      // Z-index scale
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class', // only generate classes
    }),
  ],
  // RTL support
  corePlugins: {
    preflight: true,
  },
}

