<template>
  <MyCard>
    <template #my-content></template>
  </MyCard>
</template>
<script setup>
import { ref } from "vue";
import MyCard from "@/components/MyCard.vue";
</script>