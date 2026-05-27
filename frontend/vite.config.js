import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

//Crear __dirname compatible con Es module

const __filname = fileURLToPath(import.meta.url)
const __dirname = dirname(__filname)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),//cuando  veas @, interpretalo como /src
    },
  },
})
