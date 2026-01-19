import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent-color)'
      },
      fontFamily: {
        sans: ['var(--app-font)', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
} satisfies Config;
