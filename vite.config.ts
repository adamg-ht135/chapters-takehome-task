/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { configDefaults } from 'vitest/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'static',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@types': path.resolve(__dirname, './src/types'),
      '@config': path.resolve(__dirname, './src/config'),
      '@api': path.resolve(__dirname, './src/api'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@tests': path.resolve(__dirname, './src/tests'),
    },
  },
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, '**/e2e/**'],
    environment: 'jsdom',
    setupFiles: [],
    // By default, vitest tries to cache results under node_moudles, which
    // doesn't work in CI and nix-shell because it's read-only.
    cache: {
      dir: '.vitest',
    },
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
});
