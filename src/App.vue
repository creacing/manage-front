<template>
  <div class="my-app">
    <!-- <Nav /> -->
    <Layout>
      <template #content>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </template>
    </Layout>
    <!-- <Copywright /> -->
  </div>
</template>
<script setup>
// import Nav from "@/components/Nav.vue";
// import Copywright from "@/components/Copywright.vue";
import Layout from '@/views/Layout.vue';
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
  min-height: 100vh;
  height: 100vh;
}
/* 滚动条的宽度 */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/* 滚动条的按钮 */
::-webkit-scrollbar-button {
  display: none;
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 5px;
}
</style>
