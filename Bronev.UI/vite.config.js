import { fileURLToPath, URL } from 'node:url'
import mkcert from 'vite-plugin-mkcert'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        mkcert()
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
