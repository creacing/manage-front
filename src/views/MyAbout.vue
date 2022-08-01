<template>
  <MyCard>
    <template #my-content></template>
  </MyCard>
</template>
<script setup>
// import mySocket from '@/utils/socket.mjs'
import { ref, onMounted } from "vue";
import MyCard from "@/components/MyCard.vue";
import mySocket from "@/utils/socket.mjs"
onMounted(() => {
  // const ws = new WebSocket('ws://127.0.0.1:7001/socket.io/?usekey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjMiLCJpYXQiOjE2NTkwODEzODksImV4cCI6MTY1OTA4NDk4OX0.dTdEC5eTBeaFbweDFTEpY14c_S8oi-P4OsQVeN03OTM&EIO=3&transport=websocket&sid=kL1bWLGZM1RpJAsMAAAD')
  // ws.onopen = function (evt) {
  //   console.log("Connection open ...");
  //   ws.send("Hello WebSockets!");
  // };

  // ws.onmessage = function (evt) {
  //   console.log("Received Message: " + evt.data);
  //   ws.close();
  // };

  // ws.onclose = function (evt) {
  //   console.log("Connection closed.");
  // };

})

</script>