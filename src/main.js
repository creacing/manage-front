import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/router.js'
import SocketIO from './plugins/io'

const app = createApp(App)
// app.use(SocketIO, {
//   connection: 'http://127.0.0.1:7001',
// })

// import ClientSocketIO from 'socket.io-client'
// import VueSocketIO from 'vue-3-socket.io'
// app.use(new VueSocketIO({
//   connection: 'ws://127.0.0.1:7001'
// }))

app.use(ElementPlus)
app.use(router)
app.mount('#app')
