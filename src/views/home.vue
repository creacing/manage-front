<template>
  <div class="message-content">
    <div><span>room name</span></div>
    <div class="messages">
      <el-descriptions
        title=""
        :column="1"
        :size="size"
        direction="vertical"
        :style="blockMargin"
      >
        <el-descriptions-item
          v-for="info in infoList"
          :key="info"
          :label="info.username"
          >{{ `${info.date}   ${info.text}` }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="send-message">
      <el-input
        v-model="message"
        placeholder="Please input message"
        clearable
        class="messagge-input"
      />
      <el-button @click="sendMessage" type="primary">SEND MESSAGE</el-button>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, computed, nextTick } from "vue";
import VueSocketIO from "vue-3-socket.io";
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

let socket;
onMounted(() => {
  const socketConfig = {
    connection:
      "http://127.0.0.1:7001" + "?usekey=" + localStorage.getItem("m-token"),
  };
  socket = new VueSocketIO(socketConfig);

  socket.io.on("connect", () => {
    console.log("connected");
  });
  socket.io.on("disconnect", () => {
    console.log("disconnected");
  });
  socket.emitter.addListener(
    "data",
    (data) => {
      console.log('data is:', data);
      infoList.value.push(data);

      //scroll to bottom
      nextTick(() => {
        const outer = document.getElementsByClassName('messages')[0]
        const inner = document.getElementsByClassName('el-descriptions')[0]
        outer.scrollTop = inner.scrollHeight
      })
    },
    { $options: { name: "Home" } }
  );
  socket.emitter.addListener(
    "res",
    (data) => {
      console.log('res is:', data);
      if (data.token === 'expired') {
        localStorage.removeItem('m-token')
        router.push({ path: "/login" });
      }
    },
    { $options: { name: "Home" } }
  );
});
const sendMessage = () => {
  if (message.value === "") {
    return;
  }

  const date = new Date();
  socket.io.emit("index", {
    date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 
${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} message:`,
    text: message.value,
  });
};

defineProps({
  msg: String,
});
</script>
<style lang="scss" scope>
.message-content {
  box-sizing: border-box;
  padding: 1rem;
  height: 100%;
  width: 100%;
  background-color: #fff;
}
.send-message {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 5rem;
  .messagge-input {
    margin-bottom: 0.5rem;
    .el-input__wrapper {
      // box-shadow: unset;
      box-shadow: 0 1px 0 #dcdfe6;
      border-radius: 0;
    }
  }
}
.messages {
  margin-bottom: 1rem;
  height: calc(100% - 8rem);
  overflow: auto;
}
</style>