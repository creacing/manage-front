import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env':{
      'VUE_APP_BASE_URL': 'http://127.0.0.1:7001'
    }
  },
  resolve:{
    alias:[
      {find:'@',replacement:path.resolve(__dirname,'src')}
    ]
  },
  server:{
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
 
})
