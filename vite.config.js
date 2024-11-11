import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteYaml(),
    VitePWA({ 
        registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
            name: 'f.ü.r. Moderation Cards',
            short_name: 'f.ü.r.',
            description: 'Moderation cards for Freunde üben Rücksicht project',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'fuer-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'fuer-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
