import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // permet: import { CanvasPanel } from 'player-iiif-video'
      'player-iiif-video': path.resolve(__dirname, 'PlayerIIFVideo/src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/chunk.js', // pour d'éventuels chunks
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/app.css';
          }
          return 'assets/[name].[ext]';
        }
      }
    }
  }
})
