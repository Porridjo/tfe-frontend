import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import manifestForPlugIn from './manifest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      manifest: {
        icons: [
          {
            src: "/android-chrome-512x512.png",
            sizes:"512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
})
