import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      // iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
      symbolId: 'icon-[dir]-[name]'
      // inject: 'body-first',
      // customDomId: '__svg__icons__dom__',
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true
    // https: true
  }
})
