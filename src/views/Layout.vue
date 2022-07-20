<template>
  <div class="my-topmenu" v-show="isLogin">
    <TopMenu />
  </div>
  <div :class="isLogin ? 'my-body' : 'my-body-login'">
    <div class="my-sidemenu" v-show="isLogin">
      <SideMenu />
    </div>
    <div :class="isLogin ? 'my-content' : 'my-content-isLogin'">
      <slot name="content">
        <div class="my-demo">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div class="card-header">
                <span>Card name</span>
                <el-button class="button" text>Operation button</el-button>
              </div>
            </template>
            <div v-for="o in 4" :key="o" class="text item">
              {{ "List item " + o }}
            </div>
          </el-card>
        </div>
      </slot>
    </div>
  </div>
</template>
<script setup>
import TopMenu from "@/views/TopMenu.vue";
import SideMenu from "@/views/SideMenu.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";
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

// onMounted(() => {
//   window.addEventListener('click', () => {
//     const route = router.currentRoute.value.fullPath;
//     const token = localStorage.getItem('m-token')
//     if (!token) {
//       router.push({ path: "/login" });
//     }
//     console.log('eeeeeeeeeeeee',route);

//     if (route === '/login') {
//       isLogin.value = false
//     } else {
//       isLogin.value = true
//     }
//   })
// })
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
    overflow: auto;
    height: 100%;
    width: calc(100% - 12.5rem);
    padding: 1rem;
    box-sizing: border-box;
    background-color: #f5f5f5;
    position: relative;
    .my-demo {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 18px;
      }

      .box-card {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>