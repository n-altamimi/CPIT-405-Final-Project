import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/CPIT-405-Final-Project/',
  plugins: [react()],
})
