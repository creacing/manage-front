<template>
  <div class="my-app">
    <Nav/>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script setup>
import Nav from './components/Nav.vue'
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, body {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
