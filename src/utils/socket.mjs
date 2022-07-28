import SockJS from 'sockjs-client' // socket
import Stomp from 'stompjs'

class mySocket {
  static instance = null
  constructor() {
    this.wsUrl = '127.0.0.1:7001' // websocket url地址
    console.log('new mySocket()',new mySocket());
    mySocket.instance = new mySocket()    
    this.socketClient = null
    mySocket.instance.connect()
  }
  // 建立websocket连接
  connect() {
    const host = this.wsUrl
    const token = localStorage.getItem('m-token')
    const url = `${host}?${token}`
    const socket = new SockJS(url)
    this.socketClient = Stomp.over(socket)
    this.socketClient.connect('connect',
      (success) => {
        console.log('webSocket连接成功:', success)
      },
      (error) => {
        console.log('webSocket连接失败:', error)
      }
    )
  }
  // 销毁ws连接
  disconnect () {
    this.socketClient?.disconnect()
  }
}

export default mySocket.instance

//test
// mySocket.instance.subscribe(`/`, (message) => {
//     const res = JSON.parse(message.body)
//     console.log(res);
// })