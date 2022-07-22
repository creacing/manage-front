<template>
  <ul style="list-style: none">
    <li v-for="set in setList" class="my-set" :key="set.name">
      <div class="my-setname">{{ set.name }}</div>
      <div>
        <el-switch
          v-model="value"
          size="large"
          active-text="Light"
          inactive-text="Dark"
          @change="set.cb"
        />
      </div>
    </li>
  </ul>
</template>
<script setup>
import { ref } from "vue";
const value = ref(true);
let bgColorFlag = false;
const setList = [
  {
    name: "外观",
    cb: () => {
      console.log("改变外观");
      const myContent = document.getElementById("my-content");
      bgColorFlag = !bgColorFlag;
      myContent.style.backgroundColor = bgColorFlag
        ? "rgb(0, 0, 0)"
        : "rgb(255, 255, 255)";
      // console.log(myContent.style.backgroundColor);
      // if (myContent.style.backgroundColor === "rgb(0, 0, 0)") {
      //   myContent.style.backgroundColor = "rgb(255, 255, 255)";
      // } else {
      //   myContent.style.backgroundColor = "rgb(0, 0, 0)";
      // }
    },
  },
];
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