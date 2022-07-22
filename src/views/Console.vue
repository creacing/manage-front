<template>
  <div class="my-console">
    <el-input v-model="input" placeholder="Please input" />
    <div class="my-logs">
      <div class="my-log">xxx</div>
      <div class="my-log">xxx</div>
      <div class="my-log">xxx</div>
      <div class="my-log">xxx</div>
      <div class="my-log">xxx</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const input = ref("");
</script>