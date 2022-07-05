<template>
  <div class="message-content">
    <div class="send-message">
      <el-input
        v-model="message"
        placeholder="Please input message"
        clearable
        class="messagge-input"
      />
      <el-button @click="sendMessage" type="primary">SEND MESSAGE</el-button>
    </div>
    <div class="message-show">
      <el-descriptions
        title="messages"
        :column="1"
        :size="size"
        direction="vertical"
        :style="blockMargin"
      >
        <el-descriptions-item
          v-for="info in infoList"
          :key="info"
          :label="info.username"
          >{{ `${info.date}   ${info.text}` }}</el-descriptions-item
        >
      </el-descriptions>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, inject, getCurrentInstance, computed } from "vue";
import ArticlesApi from "../api/articlesApi.js";
import VueSocketIO from "vue-3-socket.io";
// import SocketIO from "socket.io-client";
const message = ref("");
const infoList = ref([]);
const size = ref("");
const blockMargin = computed(() => {
  const marginMap = {
    large: "32px",
    default: "28px",
    small: "24px",
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
// const _this = getCurrentInstance()
// console.log(_this);
let socket;
onMounted(() => {
  const socketConfig = {
    connection:
      "http://127.0.0.1:7001" + "?usekey=" + localStorage.getItem("m-token"),
  };
  //-------------------------------------------------
  //version 1
  socket = new VueSocketIO(socketConfig);

  socket.io.on("connect", () => {
    console.log("connected");
  });
  socket.io.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.io.on("res", () => {
    console.dir("data is", data);
  });
  socket.emitter.addListener(
    "data",
    (data) => {
      console.log('data is:', data);
      infoList.value.push(data);
    },
    { $options: { name: "Home" } }
  );
  socket.emitter.addListener(
    "res",
    (data) => {
      console.log('res is:', data);
      if (data.token === 'expired') {
        localStorage.removeItem('m-token')
      }
    },
    { $options: { name: "Home" } }
  );
  //-------------------------------------------------
});
const sendMessage = () => {
  if (message.value === "") {
    return;
  }
  console.dir("send message");
  //version 1
  // console.log('socket.io.emit',socket.io.emit);
  const date = new Date();
  socket.io.emit("index", {
    date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 
${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} message:`,
    text: message.value,
  });
};

const currentPage = ref(0);
const pageValue = 9;
const params = {
  currentPage: currentPage.value,
  pageValue,
};
ArticlesApi.queryAllArticles(params).then((res) => {
  if (res?.code === "20000") {
    const { data } = res;
  }
});
defineProps({
  msg: String,
});
</script>
<style lang="scss" scope>
.message-content {
  width: 70%;
  background-color: #fff;
  position: fixed;
  height: 80vh;
  //   background-color: blue;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}
.send-message {
  display: flex;
  justify-content: space-between;
  .messagge-input {
    width: 80%;
  }
}
.message-show {
  height: calc(100% - 60px);
  overflow: auto;
}
</style>