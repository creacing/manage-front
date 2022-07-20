<template>
  <div class="my-article">
    <div class="left-archives">
      <Archives @node-click="nodeClick" />
    </div>
    <div class="right-articles">
      <div class="ac-title">{{ myTitle }}</div>
      <div class="ac-date">{{ myDate }}</div>
      <div class="ac-tags">{{ myTags }}</div>
      <div class="ac-description">{{ myDescription }}</div>
      <div class="ac-content" v-html="myContent"></div>
      <el-button class="createBtn" @click="createArticle">Create</el-button>
    </div>
  </div>

  <CreateArticle :dialogVisible="dialogVisible" />
</template>
<script setup>
import { ref } from "vue";
import ArticlesApi from "@/api/articlesApi.js";
import Archives from "./Archives.vue";
import CreateArticle from "./CreateArticle.vue";
//get
const myTitle = ref('')
const myDate = ref('')
const myTags = ref('')
const myDescription = ref('')
const myContent = ref('')
const nodeClick = (title) => {
  ArticlesApi.queryAllArticles({ articleTitle: title }).then((res) => {
    const acInfo = res.data[0];
    const { date, content, description, tags, title } = acInfo
    myTitle.value = title
    myDate.value = date
    myTags.value = tags
    myDescription.value = description
    myContent.value = content
  })
}
//create
const dialogVisible = ref(false)
const createArticle = () => {
  dialogVisible.value = true
}
</script>
<style lang="scss" scoped>
.my-article {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.left-archives {
  margin-right: 0.5rem;
  height: 100%;
  width: 30%;
  min-width: 200px;
}
.right-articles {
  position: relative;
  background-color: #999;
  height: 100%;
  width: 70%;
}
.left-archives,
.right-articles {
  box-sizing: border-box;
  height: 100%;
  min-width: 400px;
  .createBtn {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
}
</style>