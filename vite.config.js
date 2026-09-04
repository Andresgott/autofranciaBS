import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const N8N_BASE_URL = process.env.VITE_AF_N8N_BASE_URL || 'http://localhost:5678'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/autofrancia/availability': {
        target: N8N_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/autofrancia/availability', '/webhook/autofrancia-availability'),
      },
      '/api/autofrancia/lead': {
        target: N8N_BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/autofrancia/lead', '/webhook/autofrancia-lead'),
      },
    },
  },
})
