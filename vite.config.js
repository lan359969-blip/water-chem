import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'src/pages/home/index.html'),
        dosing: resolve(__dirname, 'src/pages/dosing/index.html')
      }
    }
  }
})