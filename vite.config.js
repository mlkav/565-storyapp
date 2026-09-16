import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: [
          'import',
          'global-builtin',
          'color-functions',
          'if-function',
        ],
      },
    },
  },
});