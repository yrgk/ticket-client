import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: ["https://0rxz0nmp-5173.euw.devtunnels.ms/"] }
  // server: {
    // port: 3006,
  // },
})
