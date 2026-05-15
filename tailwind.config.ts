import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 20px 45px rgba(0, 0, 0, 0.18)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(10,14,20,0.56) 0%, rgba(10,14,20,0.88) 100%)',
      },
      colors: {
        ink: '#0A0E14',
        charcoal: '#121923',
        obsidian: '#0b0f18',
        copper: '#b27844',
        smoke: '#d8d8d8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
