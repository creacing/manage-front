<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">SYSTEM</el-menu-item>
    <el-menu-item index="2">manage</el-menu-item>
    <el-sub-menu index="3">
      <template #title>Workspace</template>
      <el-menu-item index="3-1">Workspace1</el-menu-item>
      <el-menu-item index="3-2">Workspace2</el-menu-item>
      <el-menu-item index="3-3">Workspace3</el-menu-item>
    </el-sub-menu>
  </el-menu>
  <div class="h-6" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

const activeIndex = ref("1");
const activeIndex2 = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>