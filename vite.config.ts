/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@nabla/vite-plugin-eslint';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    visualizer({
      template: 'treemap',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['jest-extended/all', './src/setupTests.ts'],
  },
});
