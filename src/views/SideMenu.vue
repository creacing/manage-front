<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="-1"
        class="el-menu-vertical-demo"
        @open="sideMenuOpen"
        @close="sideMenuClose"
      >
        <el-menu-item v-for="menu in sideMenuList" :key="menu" :index="menu.index" @click="menu.cb">
          <el-icon>
            <component :is="menu.icon"></component>
          </el-icon>
          {{ menu.name }}
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import getSideMenuList from "@/configs/sideMenuList.js";

const sideMenuList = getSideMenuList(router);
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};

const sideMenuOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const sideMenuClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style lang="scss" scoped>
.tac {
  transition: all 0.3s ease;
  height: 100%;
  // width: 200px;
  .el-menu {
    height: 100%;
  }
}
.tac:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 14px 24px #0003;
  z-index: 999;
  border-radius: 6px;
}
:deep(.el-menu-item) {
  transition: all 0.3s ease;
}
:deep(.el-menu-item:hover) {
  transition: all 0.3s ease;
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 14px 24px #0003;
  z-index: 999;
  border-radius: 6px;
}
</style>
