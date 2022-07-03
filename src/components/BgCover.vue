<template>
  <div class="my-bg-cover">
    <slot name="bgCoverContent"></slot>
  </div>
</template>
<script setup>
import { ref } from "vue";
</script>
<style lang='scss' scoped>
.my-bg-cover {
  position: relative;
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(to top, #12c0fa 0%, #158df4 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: -1;
}
</style>