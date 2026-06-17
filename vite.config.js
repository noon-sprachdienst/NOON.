import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    open: false,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (id.includes('three') || id.includes('three-globe')) return 'globe'
          if (id.includes('leaflet')) return 'leaflet'
          if (id.includes('react')) return 'vendor'
          return 'vendor-misc'
        }
      }
    }
  }
})
