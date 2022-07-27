import SockJS from 'sockjs-client' // socket
import Stomp from 'stompjs'

class SocketMessage {
  constructor() {
    this.wsUrl = '127.0.0.1:7001' // websocket url地址
    this.stompClient = null // socket 服务
    this.messageList = [] // 主动推送消息队列

    this.passiveMessageDict = {} // 被动推送对象
    this.setSocketAutoDisconnect()
  }
  // 建立websocket连接
  socketConnect() {
    this.setUser()
    const host = this.wsUrl
    const token = this.accessToken
    const url = host + '?access_token=' + token
    const socket = new SockJS(url)

    this.stompClient = Stomp.over(socket)
    // 判断是主动接收还是被动监听
    if (this.socketMode === 'active') {
      this.stompClient.connect({ name: 'admin' }, () => this.activeConnect(), this.errorCallback)
    } else {
      this.stompClient.connect({ name: 'admin' }, () => this.passiveConnect(), this.errorCallback)
    }
  }

  // 建立主动连接
  activeConnect() {
    // 初始化
    const userId = this.userInfo.USER_ID
    const deptId = this.userInfo.DEPT_ID

    this.socketSubscribe(`/user/${userId}/queue/sub`, response => {
      const data = JSON.parse(response.body)
      // 需要订阅消息
      if (data && data.sub === 1) {
        const msgDest = data.msgDest
        const subscribeCallback = (res) => {
          const userData = JSON.parse(res.body)
          this.handleMsg(userData)
          this.bus.$emit('sendSocketMessage', { userData })
        }
        if (msgDest.includes('user') && !this.activeSocketMsgStatus['user']) { // 订阅用户消息
          this.activeSocketMsgStatus['user'] = true
          this.socketSubscribe(`/user/${userId}/queue/getResponse`, subscribeCallback)
        }
        if (msgDest.includes('dept') && !this.activeSocketMsgStatus['dept']) { // 订阅部门消息
          this.activeSocketMsgStatus['dept'] = true
          this.socketSubscribe(`/mass/${deptId}`, subscribeCallback)
        }
        if (msgDest.includes('topic') && !this.activeSocketMsgStatus['topic']) { // 订阅广播消息
          this.activeSocketMsgStatus['topic'] = true // 已订阅
          this.socketSubscribe('/topic/getResponse', subscribeCallback)
        }
      }
    })
  }

  // 建立被动连接
  passiveConnect() {
    const userId = this.userInfo.USER_ID
    // 建立连接后，订阅全量历史
    this.socketSubscribe(`/user/${userId}/topic/totalLog`, res => {
      if (this.initedSocketSubscribe) return
      const data = JSON.parse(res.body)
      data.forEach(item => {
        // 初始化，推入数据
        if (item.sysCode) {
          this.passiveMessageDict[item.sysCode] = {}
          this.passiveMessageDict[item.sysCode].msgList = []
          this.passiveMessageDict[item.sysCode].msgList.push(item)
        }
      })
      console.log('初始化建立连接', this.passiveMessageDict)
      // 循环整个passiveMessageDict，建立订阅
      Object.keys(this.passiveMessageDict).forEach(key => {
        // 开始建立topic监听
        this.socketSubscribe(key, res => {
          const data = JSON.parse(res.body)

          this.passiveMessageDict[key].msgList.push(data)
          console.log('推送', this.passiveMessageDict)
          // 消息处理
          this.handleMessage(data)
          // 消息推送，只有当消息推送状态打开时，才推送，否则只缓存
          if (this.passiveMessageDict[key].sendMessage) {
            this.bus.$emit('sendSocketMessage', { data })
          }
        })
      })
      this.initedSocketSubscribe = true
    }, true)
    // 发送 onConnect 接收全量更新数据
    this.stompClient.send('/onConnect', {}, userId)
  }

  // 断开链接
  socketDisconnect() {
    if (!this.wsUrl || !this.isTopWindow) return
    if (this.stompClient) {
      this.stompClient.disconnect()
    }
    this.showSocketMsg = false
    // 主动模式下的重置
    if (this.socketMode === 'active') {
      this.messageList = []
      Object.keys(this.activeSocketMsgStatus).forEach(item => {
        this.activeSocketMsgStatus[item] = false
      })
    } else {
      // 被动模式下的重置
      this.passiveMessageDict = {}
    }
    // 更新list
    store.dispatch('user/setWsMSgList', [])
  }

  // 默认断开连接
  setSocketAutoDisconnect() {
    if (!this.wsUrl || !this.isTopWindow) return
    window.onbeforeunload = () => {
      this.socketDisconnect()
    }
  }

  socketSubscribe(url, cb, passiveForce = false) {
    if (!this.stompClient) return
    if (this.socketMode === 'active' || passiveForce) {
      // 用箭头函数确保this指向
      this.stompClient.subscribe(url, cb)
      return
    }
    if (this.socketMode === 'passive') {
      // 被动情况下，需要检查是否重复订阅
      if (!this.passiveMessageDict[url].subscribe) {
        this.passiveMessageDict[url].subscribe = this.stompClient.subscribe(url, cb) // 初始化建立连接
        this.passiveMessageDict[url].sendMessage = false // 初始化是否需要发送推送
      } else {
        // 测试用
        console.log('连接已经建立')
      }
    }
  }

  // 处理消息
  handleMessage(data) {
    if (!data) return
    switch (data.msgType) {
      case 1: { // 强类型
        this.messageList.push(data.content)
        break
      } case 2: { // 弱类型
        ////////////////////
        // ({ title: '提示', desc: data && data.content })
        break
      } case 3: { // 列表类型
        const wsMSgList = store.state.user.wsMSgList
        const content = this.socketMode === 'active' ? JSON.parse(data.content) : data.content
        wsMSgList.push(content)
        store.dispatch('user/setWsMSgList', wsMSgList)
        break
      }
    }
  }

  errorCallback(error) {
    console.log(error)
  }
}

const instance = new SocketMessage()

export default instance