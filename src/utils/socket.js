// import webSocket from 'websocket'

// export default class WebSocketClient {
//   static instance = null
//   static get Instance(){
//     if(!this.instance){
//       this.instance = new WebSocketClient()
//     }
//     return this.instance
//   }
//   constructor(wsurl,cb){
//     if(cb&&typeof cb === 'function'){
//       window._cb = cb
//     }else{
//       window._cb = null
//     }
//     this.initWebSocket(wsurl,cb)
//     this.websocket = null
//   }
//   initWebSocket(wsurl,cb){
//     this.websocket = new webSocket.w3cwebsocket(wsurl,'echo-protocol')
    
//     this.websocket.onopen = ()=>{
//       console.log('connect suc');
//     }
//     this.websocket.onerror = ()=>{
//       setTimeout(()=>{
//         new webSocketClient(wsurl,cb)
//       },2000)
//     }
//     this.websock.onmessage = (e) => {
//      this.webSocketOnMessage(e)
//     };
//     this.websock.onclose = (e) => {
//       // 关闭
//       this.websock.close();
//       window._cb = null;
//     };

//   }
//   sendSock(data, cb) {
//     if (cb) {
//       if (typeof cb === 'function') {
//        window._cb = callback
//       } else {
//         window._cb = data => {}
//         console.log('传参没有回调');
//       }
//     }
//     if (this.websocket.readyState === this.websocket.OPEN) {
//       this.websocket.send(data)
//     } else {
//       setTimeout(() => {
//         this.sendSock(data)
//       }, 1000)
//     }
//   }


//   // 关闭
//   webSocketclose(e) {
//     // console.log("WebSocket关闭成功");
//     this.websocket.close()
//     window._cb = null
//   }

//   // 接收数据
//   webSocketOnMessage(e) {
//     try {
//       window._cb(e.data)
//     } catch (err) {
//     }
//   }

// }
export default (onMessage) => {
    let socketUrl = '';
    let socket = null;
    let lockReconnect = false;
    let timer = null;
    const createSocket = () => {
        try {
            socket = new WebSocket(socketUrl);
            init();
        } catch (e) {
            console.log("catch" + e)
            reconnect()
        }
    }
    const reconnect = () => {
        if (lockReconnect) return;
        lockReconnect = true;
        clearTimeout(timer);
        timer = setTimeout(() => {
            createSocket();
        }, 4000);
    }

    const init = () => {
        socket.onopen = function (event) {
            console.log("WebSocket:已连接");
            //心跳检测重置
            heartCheck.reset().start();
        };

        //接收到消息的回调方法
        socket.onmessage = function (event) {
            console.log("WebSocket:收到一条消息", event.data);
            const isHeart = /pong/.test(event.data)
            if (onMessage && !isHeart) { // 触发自定义onMessage
                onMessage.call(null, event)
            }
            heartCheck.reset().start();
        };

        //连接发生错误的回调方法
        socket.onerror = function (event) {
            console.log("WebSocket:发生错误");
            reconnect();
        };

        //连接关闭的回调方法
        socket.onclose = function (event) {
            console.log("WebSocket:已关闭");
            heartCheck.reset();//心跳检测
            reconnect();
        };

        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
            socket.close();
        };
    }

    const heartCheck = {
        timeout: 5000,
        timeoutObj: setTimeout(() => { }),
        serverTimeoutObj: setInterval(() => { }),
        reset: function () {
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function () {
            var self = this;
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            this.timeoutObj = setTimeout(function () {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                socket.send(JSON.stringify({
                    "action": "ping"
                }));
                console.log('ping');
                self.serverTimeoutObj = setTimeout(function () { // 如果超过一定时间还没重置，说明后端主动断开了
                    console.log('关闭服务');
                    socket.close();//如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        }
    };
    createSocket();
}
