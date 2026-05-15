import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/website-template/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
});
