const io = require("socket.io-client");
const socket = io("http://127.0.0.1:7001");
console.log("socket", socket);
// server-side
socket.on("connection", (socket) => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

// client-side
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("disconnect", () => {
    console.log(socket.id); // undefined
});

socket.emit("index", "xxxxxxx");