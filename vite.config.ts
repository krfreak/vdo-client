import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  cacheDir: '../node_modules/.vite/client',

  plugins: [vue(), vueJsx()],

  server: {
    port: 4200,
    host: 'localhost'
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  build: {
    sourcemap: true
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
