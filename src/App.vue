<template>
  <div class="my-app">
    <!-- <Nav /> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- <Copywright /> -->
  </div>
</template>
<script setup>
import Nav from '@/components/Nav.vue'
import Copywright from '@/components/Copywright.vue'
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
.my-app {
  position: relative;
}
</style>
