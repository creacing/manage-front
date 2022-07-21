<template>
  <div class="my-topbar">
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
      >{{ menu.name }}</el-menu-item>
    </el-menu>
    <div class="topbar-settings">
      <el-icon>
        <Apple />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const topMenuList = [
  {
    name: "MY ADMIN",
    index: "0",
    cb: () => {
      router.push({ path: "/" });
    },
  },
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
const activeIndex = ref("0");
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
</script>
<style lang="scss" scoped>
.my-topbar {
  position: relative;
  display: flex;
  justify-content: center;
}
.my-topbar-settings {
  position: absolute;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  .el-icon {
    color: #fff;
  }
}
.el-menu-demo {
  width: 100%;
  background-color: rgb(20, 20, 20);
  .el-menu-item {
    color: rgb(255, 255, 255);
  }
}
</style>