import { fileURLToPath, URL } from 'node:url'

import { defineConfig, optimizeDeps } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      "/graphql": "http://server:60001/graphql",
    },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    }
  },
  // optimizeDeps: {
  //   exclude: ["@graphql-typed-document-node/core"]
  // }
})