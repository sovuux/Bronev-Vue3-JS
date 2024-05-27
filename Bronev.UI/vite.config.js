import { fileURLToPath, URL } from 'node:url'
import mkcert from 'vite-plugin-mkcert'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgr from  'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        mkcert(),
        svgr()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        cors: true,
        https: true,
        proxy: {
            "/api": {
                changeOrigin: true,
                target: "https://dist.nd.ru",
            }
        },
        port: 8080
    }
})
