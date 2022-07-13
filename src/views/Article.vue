<template>
  <div class="my-article">
    <div class="left-archives">
      <Archives />
    </div>
    <div class="right-articles"></div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Archives from "./Archives.vue";
</script>
<style lang="scss" scoped>
.my-article {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.left-archives {
  margin-right: 0.5rem;
  height: 100%;
  width: 30%;
}
.right-articles {
  background-color: #999;
  height: 100%;
  width: 70%;
}
.left-archives,
.right-articles {
  box-sizing: border-box;
  height: 100%;
}
</style>