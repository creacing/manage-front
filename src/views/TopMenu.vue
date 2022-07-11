<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item
      v-for="menu in topMenuList"
      :index="menu.index"
      @click="menu.cb"
      :key="menu"
      >{{ menu.name }}</el-menu-item
    >
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const topMenuList = [
  {
    name: "系统监控",
    index: "1",
    cb: () => {
      router.push({ path: "/serverManage" });
    },
  },
  {
    name: "用户管理",
    index: "2",
    cb: () => {
      router.push({ path: "/users" });
    },
  },
];
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
</script>