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
        >{{ menu.name }}</el-menu-item
      >
    </el-menu>
    <div class="my-topbarsettings" @click="openDrawer">
      <el-icon>
        <More />
      </el-icon>
    </div>
  </div>

  <RightDrawer :showDrawer="showDrawer" @changeDrawer="changeDrawer" />
</template>

<script lang="ts" setup>
import RightDrawer from "../components/RightDrawer.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import getTopMenuList from "@/configs/topMenuList.js";
const showDrawer = ref(false);
const topMenuList = getTopMenuList(router);
const activeIndex = ref("0");
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const openDrawer = () => {
  showDrawer.value = true;
};
const changeDrawer = () => {
  showDrawer.value = false;
};
</script>
<style lang="scss" scoped>
.my-topbar {
  position: relative;
  display: flex;
  justify-content: center;
}
.my-topbarsettings {
  position: absolute;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  .el-icon {
    color: #fff;
  }
  .el-icon:hover {
    color: aqua;
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