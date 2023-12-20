import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'custom': 'inset 0 2px 4px rgba(0, 203, 162,0.2)',
      },
      borderRadius: {
        'num-full': '9999px',
        'num-2xl': '1rem',
      },
      transitionProperty: {
        'border-radius': 'border-radius',
      },
    },
  },
  plugins: [],
}

export default config
