import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
    ],
  },
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 9015,
    // 是否开启 https
    https: false,
    proxy: {
      "/api": {
        target: "http://localhost:3001/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  }
})