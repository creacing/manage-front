//import SockJS from 'sockjs-client' // socket event.js:8 Uncaught ReferenceError: global is not defined at node_modules/so
import SockJS from 'sockjs-client/dist/sockjs.js' // socket
import Stomp from 'stompjs'

class MySocket {
  constructor(wsUrl = 'http://127.0.0.1:7001/') {
    this.wsUrl = 'http://127.0.0.1:7001/socket.io/?usekey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2NTkwODEzODksImV4cCI6MTY1OTA4NDk4OX0.dTdEC5eTBeaFbweDFTEpY14c_S8oi-P4OsQVeN03OTM&EIO=3&transport=websocket&sid=kL1bWLGZM1RpJAsMAAAD' // websocket url地址
    this.stompClient = null
    this.connect()
  }
  // 建立websocket连接
  connect() {
    const host = this.wsUrl
    // const token = localStorage.getItem('m-token')
    const token = ''
    // const url = `${host}?${token}`
    const url = `${host}`

    const socket = new SockJS(url)
    // 获取STOMP子协议的客户端对象
    this.stompClient = Stomp.over(socket)
    this.stompClient.connect('connect',
      (success) => {
        stompClient.subscribe('/server', function (message) {
          console.warn(message.body);
          console.warn(JSON.parse(message.body));

        });
        console.log('webSocket连接成功:', success)
      },
      (error) => {
        console.log('webSocket连接失败:', error)
      }
    )
  }
  // 销毁ws连接
  disconnect () {
    this.stompClient?.disconnect()
  }
}
const mySocket = new MySocket()
export default mySocket


//test
// MySocket.instance.subscribe(`/`, (message) => {
//     const res = JSON.parse(message.body)
//     console.log(res);
// })