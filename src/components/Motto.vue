<template>
  <div class="motto">
    <div style="display: flex">
      <p class="my-motto">{{ myMotto }}</p>
      <p class="my-input-symbol" style="color: #fff">|</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const myMotto = ref("");

const showMotto = () => {
  const mottoList = ["Practice makes perfect.", "Its my pleasure."]
  let timer = null,
    count = 1,
    reverseFlag = false,
    currentMotto = 0;
  const mottoListLen = mottoList.length;

  timer = setInterval(() => {
    const motto = mottoList[currentMotto];
    const mottoLen = motto.length;
    myMotto.value = motto.slice(0, count);

    count === mottoLen ? (reverseFlag = true) : null;

    if (count === 0) {
      reverseFlag = false;
      currentMotto++;

      if (currentMotto === mottoListLen) {
        currentMotto = 0;
      }
    }

    !reverseFlag ? count++ : count--;
  }, 200);
};
showMotto();


</script>
<style lang='scss' scoped>
.my-motto {
  color: #fff;
}
</style>
