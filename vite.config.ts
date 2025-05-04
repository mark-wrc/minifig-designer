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
    port: 3001, //placeholder:Port for the main app
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
