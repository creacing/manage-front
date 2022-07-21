<template>
  <div class="my-article">
    <div class="left-archives">
      <el-button class="upload-btn mb" @click="Upload"
        >批量上传<el-icon class="el-icon--right"><Upload /></el-icon
      ></el-button>
      <Archives @node-click="nodeClick" />
    </div>
    <div class="right-articles">
      <div class="right-buttongroup">
        <el-button class="create-btn" @click="createArticle"
          >创建文章</el-button
        >
        <el-button class="create-btn" @click="updateArticle"
          >更新文章</el-button
        >

        <el-button class="create-btn" @click="downloadArticle"
          ><a
            :href="downloadUrl"
            :download="downloadFileName"
            style="text-decoration: none; color: #999"
            >下载文章</a
          ></el-button
        >
      </div>

      <div class="ac-title mb">
        <div class="ac-el"><div class="">标题</div></div>
        <el-input v-model="myTitle" placeholder="Please input" class="ml" />
      </div>
      <!-- <div class="ac-group mb"> -->
      <div class="ac-date mb">
        <div class="ac-el"><div class="">日期</div></div>
        <el-input v-model="myDate" placeholder="Please input" class="ml" />
      </div>
      <div class="ac-tags mb">
        <div class="ac-el"><div class="">标签</div></div>
        <el-input v-model="myTags" placeholder="Please input" class="ml" />
        <!-- <el-icon><CollectionTag v-if="myTags" /></el-icon>{{ myTags }} -->
      </div>
      <!-- </div> -->
      <div class="ac-description mb">
        <div class="ac-el"><div class="">描述</div></div>
        <el-input
          v-model="myDescription"
          placeholder="Please input"
          class="ml"
        />
      </div>
      <div class="ac-content">
        <div class="ac-el"><div class="">内容</div></div>
        <el-input
          v-model="myContent"
          placeholder="Please input"
          show-word-limit
          type="textarea"
          rows="30"
          class="ml"
        />
        <!-- <div v-html="myContent"></div> -->
      </div>
    </div>
  </div>

  <CreateArticle @closeDialog="closeDialog" :dialogVisible="dialogVisible" />
</template>
<script setup>
import { ref } from "vue";
import ArticlesApi from "@/api/articlesApi.js";
import Archives from "./Archives.vue";
import CreateArticle from "./CreateArticle.vue";
const downloadUrl = ref("http://127.0.0.1:7001/download_posts");
const downloadFileName = ref("posts.xls");
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
//update
const updateArticle = () => {};
//download
const downloadArticle = () => {
  ArticlesApi.downloadArticle();
  // .then((res) => {
  //   // window.location.href = "";
  // });
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
.ml {
  margin-right: 1rem;
}
.mr {
  margin-right: 1rem;
}
.my {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.mx {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.mxy {
  margin: 0.5rem;
}
.my-article {
  display: flex;
  // justify-content: space-between;
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

.right-articles {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  // align-items: flex-start;
  // width: 100%;
  // min-width: 800px;
}
.left-archives {
  min-width: 300px;
  width: 300px;
  box-sizing: border-box;
}
.ac-group {
  display: flex;
  justify-content: center;
  align-items: center;
}
.right-buttongroup {
  // width: 200px;
  display: flex;
  // flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  // height: 100%;
  padding: 10px;
  // height: 100px;
  width: 100%;
  .create-btn {
    width: 100px;
  }
}
.fw {
  font-weight: 900;
}
.ac-el {
  min-width: 150px;
  background: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 5px;
}
</style>