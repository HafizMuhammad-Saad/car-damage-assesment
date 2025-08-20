import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
        tailwindcss(),

  ],
  server: {
    proxy: {
      "/api": {
        target: "https://v1.motorapi.dk",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        headers: {
          "X-AUTH-TOKEN": "fk567fif1y7qjoc7rdai18llty7l3tnq"
        }
      }
    }
  }
})
