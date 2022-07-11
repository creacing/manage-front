<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="sideMenuOpen"
        @close="sideMenuClose"
      >
        <el-menu-item
          v-for="menu in sideMenuList"
          :key="menu"
          :index="menu.index"
          @click="menu.cb"
          ><el-icon><Sugar /></el-icon>{{ menu.name }}</el-menu-item
        >
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { articlesStore } from "./../store/articles.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const sideMenuList = [
  {
    name: "文章管理",
    index: "1",
    cb: () => {
      router.push({ path: "/articles" });
    },
  },
  {
    name: "行情关注",
    index: "2",
    cb: () => {
      router.push({ path: "/stocks" });
    },
  },
  {
    name: "我的设置",
    index: "2",
    cb: () => {
      router.push({ path: "/mySettings" });
    },
  },
];
const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath);
};
const store = articlesStore();
const articlesTitles: string[] = ref(["demo"]);

// articlesTitles.value = articlesStore.articlesTitles
onMounted(() => {
  setTimeout(() => {
    articlesTitles.value = store.articlesTitles;
  });
});

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
