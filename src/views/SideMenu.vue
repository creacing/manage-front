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
          ><el-icon>
            <ChatDotRound v-if="menu.index === '0'" />
            <Notebook v-if="menu.index === '1'" />
            <Sugar v-if="menu.index === '2'" />
            <Setting v-if="menu.index === '3'" />
            <ChatSquare v-if="menu.index === '4'" />
            <VideoPlay v-if="menu.index === '5'" />
            <ShoppingBag v-if="menu.index === '6'" />
            <Magnet v-if="menu.index === '7'" /> </el-icon
          >{{ menu.name }}</el-menu-item
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
    name: "加入聊天",
    index: "0",
    cb: () => {
      router.push({ path: "/home" });
    },
  },
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
    index: "3",
    cb: () => {
      router.push({ path: "/mySettings" });
    },
  },
  {
    name: "邮件管理",
    index: "4",
    cb: () => {
      router.push({ path: "/mail" });
    },
  },
  {
    name: "音乐测试",
    index: "5",
    cb: () => {
      router.push({ path: "/music" });
    },
  },
  {
    name: "关注商品",
    index: "6",
    cb: () => {
      router.push({ path: "/product" });
    },
  },
  {
    name: "WIFI信息",
    index: "7",
    cb: () => {
      router.push({ path: "/wifiManage" });
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
