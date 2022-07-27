<template>
  <div class="my-console">
    <div style="display: flex">
      <el-input v-model="input" placeholder="Please input" />
      <el-button type="primary" @click="getConsoleResult">
        <el-icon>
          <Refresh />
        </el-icon>
      </el-button>
    </div>

    <div class="my-logs">
      <div class="my-log" v-for="log in logs" :key="log">{{log}}</div>
    </div>
  </div>
</template>

<script setup>
import ConsoleApi from '@/api/console.js'
import { ref } from "vue";
const input = ref("");
const logs = ref([])
const getConsoleResult = () => {
  if (input.value === '') {
    return
  }
  const param = {
    commend: input.value
  }
  ConsoleApi.sendCommend(param).then(res => {
    console.log('res', res);
    logs.value = res.data.split('\r\n')
  })
}
</script>