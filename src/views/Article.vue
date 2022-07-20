<template>
  <div class="my-article">
    <div class="left-archives">
      <el-button class="upload-btn mb" @click="Upload"
        >Upload<el-icon class="el-icon--right"><Upload /></el-icon
      ></el-button>
      <Archives @node-click="nodeClick" />
    </div>
    <div class="right-articles">
      <div class="ac-title">
        <h1>{{ myTitle }}</h1>
      </div>
      <div class="ac-group mb">
        <div class="ac-date">{{ myDate }}</div>
        <div class="ac-tags">
          <el-icon><CollectionTag v-if="myTags" /></el-icon>{{ myTags }}
        </div>
      </div>
      <div class="ac-description">{{ myDescription }}</div>
      <div class="ac-content"><div v-html="myContent"></div></div>
      <el-button class="create-btn" @click="createArticle">Create</el-button>
    </div>
  </div>

  <CreateArticle @closeDialog="closeDialog" :dialogVisible="dialogVisible" />
</template>
<script setup>
import { ref } from "vue";
import ArticlesApi from "@/api/articlesApi.js";
import Archives from "./Archives.vue";
import CreateArticle from "./CreateArticle.vue";
//get
const myTitle = ref("");
const myDate = ref("");
const myTags = ref("");
const myDescription = ref("");
const myContent = ref("");
const nodeClick = (title) => {
  ArticlesApi.queryAllArticles({ articleTitle: title }).then((res) => {
    const acInfo = res.data[0];
    const { date, content, description, tags, title } = acInfo;
    myTitle.value = title;
    myDate.value = date;
    myTags.value = tags;
    myDescription.value = description;
    myContent.value = content;
  });
};
//create
const dialogVisible = ref(false);
const createArticle = () => {
  dialogVisible.value = true;
};
//upload
const Upload = () => {};
//close
const closeDialog = () => {
  console.log("关闭弹窗");
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped>
.upload-btn {
  width: 100px;
  // text-align: center;
  .el-icon {
    color: #000;
  }
}
.mb {
  margin-bottom: 1rem;
}
.my-article {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.left-archives {
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-right: 0.5rem;
  height: 100%;
  width: 30%;
  min-width: 200px;
  background-color: #fff;
}

// .left-archives:hover {
//   transform: translateY(-4px) scale(1.02);
//   box-shadow: 0 14px 24px #0003;
//   z-index: 999;
//   border-radius: 6px;
// }
.right-articles {
  .ac-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ac-date {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 900;
  }
  .ac-tags {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ac-description {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ac-content {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  position: relative;
  // background-color: #999;
  height: 100%;
  width: 70%;
}
.left-archives,
.right-articles {
  box-sizing: border-box;
  height: 100%;
  min-width: 400px;
  .create-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
}
.ac-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>