import VueSocketIO from "vue-3-socket.io";

class Socket{
  constructor(connection){
    this.socketConfig = {
      connection
    }
    this.socket = null
  }
  init(cb){
    this.socket = new VueSocketIO(this.socketConfig)

    this.socket.io.on("connect", () => {
      console.log("connected");
    });
    this.socket.io.on("disconnect", () => {
      console.log("disconnected");
    });

    socket.emitter.addListener(
      "data",
      (data) => {
        console.log('data is:', data);
      },
      { $options: { name: "" } 
    })

    socket.emitter.addListener(
      "res",
      (data) => {
        console.log('res is:', data);
      },
      { $options: { name: "" } 
    });
  }
}

export default Socket