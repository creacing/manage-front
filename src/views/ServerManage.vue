<template></template>
<script setup>
import { ref, onMounted } from "vue";
import VueSocketIO from "vue-3-socket.io";
let socket;
onMounted(() => {
  const socketConfig = {
    connection:
      "http://127.0.0.1:7001/server" + "?usekey=" + localStorage.getItem("m-token"),
  };
  socket = new VueSocketIO(socketConfig);

  socket.io.on("connect", () => {
    console.log("connected /sever");
  });
  socket.io.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.emitter.addListener(
    "data",
    (data) => {
      console.log('data is:', data);
    },
    { $options: { name: "ServerManage" } }
  );
  socket.emitter.addListener(
    "res",
    (data) => {
      console.log('res is:', data);
    },
    { $options: { name: "ServerManage" } }
  );
  socket.io.emit("index", 'start get server info');
});
</script>