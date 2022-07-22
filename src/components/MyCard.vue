<!-- n-new -->
<template>
  <div class="my-card" :style="{ width: width, height: height }">
    <slot name="my-content"
      ><div>2022-06-22</div>
      <div>初始化项目</div>
    </slot>
  </div>
  <div class="my-card" :style="{ width: width, height: height }">
    <slot name="my-content"
      ><div>2022-06-22</div>
      <div>更新日志1</div>
    </slot>
  </div>
  <div class="my-card" :style="{ width: width, height: height }">
    <slot name="my-content"
      ><div>2022-06-22</div>
      <div>更新日志2</div>
    </slot>
  </div>
</template>
<script setup>
import { ref, toRefs } from "vue";
const props = defineProps({
  width: {
    default: "100%",
    type: String || Number,
  },
  height: {
    default: "100px",
    type: String || Number,
  },
});
const { width, height } = toRefs(props);
</script>
<style lang="scss" scoped>
.my-card {
  min-width: 100px;
  padding: 25px;
  background-color: #e9edf1;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.my-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 14px 24px #0003;
  z-index: 999;
  border-radius: 6px;
}
</style>