import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

// source knowledge:
// https://www.youtube.com/watch?v=t-nchkL9yIg
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'minifig_builder',
      filename: 'remoteEntry.js',
      exposes: {
        './BuilderButton': './src/components/BuilderButton',
        './BuilderApp': './src/App',
      },
    }),
  ],

  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
