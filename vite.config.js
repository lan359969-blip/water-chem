import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: true,      // ⭐ 允许手机访问
    port: 3000,
    open: true
  }
})