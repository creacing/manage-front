<template>
  <div v-show="isLogin">
    <MyTopMenu />
  </div>
  <div :class="isLogin ? 'my-body' : 'my-body-login'">
    <div class="my-sidemenu" v-show="isLogin">
      <MySideMenu />
    </div>
    <div :class="isLogin ? 'my-content' : 'my-content-isLogin'" id="my-content">
      <slot name="content" />
    </div>
  </div>
</template>
<script setup>
import MyTopMenu from "@/views/MyTopMenu.vue";
import MySideMenu from "@/views/MySideMenu.vue";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isLogin = ref(true);
watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    if (newValue === "/login") {
      isLogin.value = false;
    } else {
      isLogin.value = true;
    }
  },
  { immediate: true }
);
</script>
<style lang="scss">
.my-body-login {
  height: 100%;
  width: 100%;
  display: flex;
}
.my-body {
  height: calc(100% - 3.75rem);
  width: 100%;
  display: flex;
  .my-sidemenu {
    width: 12.5rem;
    height: 100%;
  }
  .my-content-login {
    height: 100%;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    background-color: #f5f5f5;
    position: relative;
  }
  .my-content {
    min-width: 1200px;
    overflow: auto;
    height: 100%;
    width: calc(100% - 12.5rem);
    padding: 1rem;
    box-sizing: border-box;
    background-color: #f5f5f5;
    position: relative;
  }
}
</style>