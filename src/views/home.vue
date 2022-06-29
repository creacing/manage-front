<template>
  <!-- <BgCover>
    <template #bgCoverContent>
      <Motto/>
    </template>
  </BgCover> -->
  <button @click="sendMessage">SEND</button>
  <div>
    <ol>
      <li v-for="item in infoList"></li>
    </ol>
  </div>
</template>
<script setup>
import { onMounted, ref, inject } from 'vue'
import Motto from '@/components/Motto.vue'
import BgCover from '@/components/BgCover.vue'
import ArticlesApi from '../api/articlesApi.js'
import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client'
const infoList = ref([])
let socket
onMounted(() => {
  //----------------------------------------------------------------------------------
  //version 1 //-------------------------------
  socket = new VueSocketIO({  //-------------------------------
    connection: 'http://127.0.0.1:7001'  //-------------------------------
  }) //-------------------------------
  socket.io.on('connect', () => { //-------------------------------
    console.log('connect', socket);  //-------------------------------
  }) //-------------------------------
  socket.io.on("disconnect", () => {  //-------------------------------
    console.log(socket.connected); //-------------------------------
  });  //-------------------------------
  socket.emitter.addListener('res', (data) => { //-------------------------------
    console.log('data', data); //-------------------------------
  }, { $options: { name: 'res' } })  //-------------------------------
  socket.io.on("message", (res) => {  //-------------------------------
    console.log("#message: ", res);  //-------------------------------
  });  //-------------------------------
  //----------------------------------------------------------------------------------
})
let count = 0
const sendMessage = () => {
  console.dir('send');
  //version 1
  socket.io.emit("index", `{count:${count++}, text2:  '客户端发送的消息'}`);
};

const currentPage = ref(0);
const pageValue = 9
const params = {
  currentPage: currentPage.value,
  pageValue,
}
ArticlesApi.queryAllArticles(params).then(res => {
  if (res?.code === '20000') {
    const { data } = res
  }
})
defineProps({
  msg: String
})

</script>
<style lang="scss" scope>
</style>