<template>
  <!-- <BgCover>
    <template #bgCoverContent>
      <Motto/>
    </template>
  </BgCover> -->
  <div class="home-content">
    <el-input
      v-model="username"
      placeholder="Please input username"
      clearable
    />
    <el-input v-model="message" placeholder="Please input message" clearable />
    <el-button @click="sendMessage" type="primary">SEND MESSAGE</el-button>
    <el-descriptions
      title="message box"
      :column="1"
      :size="size"
      direction="vertical"
      :style="blockMargin"
    >
      <el-descriptions-item label="message">kooriookami</el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script setup>
import { onMounted, ref, inject, getCurrentInstance, computed } from 'vue'
import Motto from '@/components/Motto.vue'
import BgCover from '@/components/BgCover.vue'
import ArticlesApi from '../api/articlesApi.js'
import VueSocketIO from 'vue-3-socket.io'
import io from 'socket.io-client'
const username = ref('')
const message = ref('')
const infoList = ref([])
const size = ref('')
const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  }
})
// const _this = getCurrentInstance()
// console.log(_this);
let socket
onMounted(() => {
  //-------------------------------------------------
  //version 1 
  socket = new VueSocketIO({  
    connection: 'http://127.0.0.1:7001'  
  }) 
  socket.io.on('connect', () => { 
    console.log('connected');  
  }) 
  socket.io.on("disconnect", () => {  
    console.log('disconnected'); 
  });  
  socket.io.on("res", () => {  
     console.dir('data is',data); 
  });  
  socket.emitter.addListener('res', (data) => { 
    console.dir(data); 
  }, { $options: { name: 'Home' } })  
  //-------------------------------------------------
})
const sendMessage = () => {
  console.dir('send message');
  //version 1
  socket.io.emit("index", `{date: ${new Date()}, user: ${username.value} text: ${message.value}}`);
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