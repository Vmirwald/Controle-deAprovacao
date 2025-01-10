import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('chart.js')) {
              return 'chartjs' // Um chunk separado para Chart.js
            }
            if (id.includes('vue')) {
              return 'vue-vendor' // Um chunk separado para Vue e suas dependências
            }
            return 'vendor' // Outros módulos genéricos
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Opcional: Aumenta o limite do tamanho do chunk para evitar warnings futuros
  },
})
