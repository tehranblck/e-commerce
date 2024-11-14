import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
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
      animation: {
        glow: 'glow 1.5s ease-in-out infinite',
        pulseBorder: 'pulseBorder 1.5s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px #ff99cc' },
          '50%': { boxShadow: '0 0 20px #ff99cc' },
        },
        pulseBorder: {
          '0%, 100%': { borderColor: '#ff99cc' },
          '50%': { borderColor: '#ff66b2' },
        },
      },
    },
  },
  plugins: [],
}

export default config
