<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="sideMenuOpen"
        @close="sideMenuClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><document /></el-icon>
            <span>文章管理</span>
          </template>
          <el-menu-item
            :index="`1-${index}`"
            v-for="(title, index) in articlesTitles"
            :key="title"
          >
            <el-icon><document /></el-icon>
            <span>{{ title }}</span></el-menu-item
          >
          <!-- <el-menu-item index="1-2"
            ><el-icon><document /></el-icon> <span>Article2</span></el-menu-item
          >
          <el-menu-item index="1-3"
            ><el-icon><document /></el-icon> <span>Article3</span></el-menu-item
          >
          <el-menu-item index="1-4"
            ><el-icon><document /></el-icon> <span>Article4</span></el-menu-item
          >
          <el-menu-item index="1-5"
            ><el-icon><document /></el-icon> <span>Article5</span></el-menu-item
          > -->
        </el-sub-menu>
        <!-- <el-sub-menu index="2">
          <template #title>
            <el-icon><document /></el-icon>
            <span>Examples</span>
          </template>
          <el-menu-item index="2-1">Examples1</el-menu-item>
          <el-menu-item index="2-2">Examples2</el-menu-item>
          <el-menu-item index="2-3">Examples3</el-menu-item>
          <el-menu-item index="2-4">Examples4</el-menu-item>
          <el-menu-item index="2-5">Examples5</el-menu-item>
        </el-sub-menu> -->
        <el-menu-item index="2"><el-icon><Sugar /></el-icon>行情关注</el-menu-item>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>我的设置</span>
          </template>
          <el-menu-item index="3-1">Settings1</el-menu-item>
          <el-menu-item index="3-2">Settings2</el-menu-item>
          <el-menu-item index="3-3">Settings3</el-menu-item>
          <el-menu-item index="3-4">Settings4</el-menu-item>
          <el-menu-item index="3-5">Settings5</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { articlesStore } from "./../store/articles.js";
import { ref, onMounted } from "vue-demi";

const store = articlesStore();
const articlesTitles: string[] = ref(["demo"]);

// articlesTitles.value = articlesStore.articlesTitles
onMounted(() => {
  setTimeout(() => {
    articlesTitles.value = store.articlesTitles;
  });
});

const sideMenuList = {};
const sideMenuOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const sideMenuClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>
<style lang="scss" scoped>
.tac {
  height: 100%;
  // width: 200px;
  .el-menu {
    height: 100%;
  }
}
</style>
