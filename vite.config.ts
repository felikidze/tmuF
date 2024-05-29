import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@components": `${path.resolve(__dirname, './src/components/')}`,
      "@router": `${path.resolve(__dirname, './src/components/router/')}`,
      "@models": `${path.resolve(__dirname, './src/models/')}`,
      "@context": `${path.resolve(__dirname, './src/components/context/')}`,
      "@consts": `${path.resolve(__dirname, './src/components/consts')}`
    }
  }
});
