import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    hmr: {
      port: 5173,
      host: 'localhost',
    },
    host: 'localhost',
    port: 5173,
  },
})
