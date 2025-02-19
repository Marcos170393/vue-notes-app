import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    rollupOptions:{
      external: ['vue'],
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'vue'
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3300,
  },
  plugins: [
    vue(),
    tailwindcss(),
  ],
  base: process.env.NODE_ENV === 'production' ? '/vue-notes-app/' : '/'
})
