import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3300,
  },
  plugins: [
    vue(),
    tailwindcss(),
  ],
  base: process.env.NODE_ENV === 'production' ? '/REPO_NAME/' : '/'
})
