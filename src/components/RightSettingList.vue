<template>
  <ul style="list-style:none">
    <li v-for="set in setList" class="my-set">
      <div class="my-setname">{{set.name}}</div>
      <div>
        <el-switch v-model="value" size="large" active-text="Light" inactive-text="Dark" />
      </div>
    </li>
  </ul>
</template>
<script setup>
import { ref } from 'vue'
const value = ref(true)
const setList = [
  {
    name: '外观'
  },
]
</script>
<style lang="scss" scoped>
.my-set {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .my-setname {
    min-width: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>