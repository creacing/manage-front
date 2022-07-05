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
</style>
