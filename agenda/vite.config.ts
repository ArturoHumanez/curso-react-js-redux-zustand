import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Definir conf de servidor de desarrollo
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server:{
    port:3000
  }
})
