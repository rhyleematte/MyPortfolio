import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'MyPortfolio',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'MyPortfolio/index.html'),
      },
    },
  },
  server: {
    open: true,
  },
});
