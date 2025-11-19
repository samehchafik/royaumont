import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // permet: import { CanvasPanel } from 'player-iiif-video'
      'player-iiif-video': path.resolve(__dirname, 'PlayerIIFVideo/src'),
    },
    dedupe: ['react', 'react-dom'],
  }
})
