<template>
  <div
    class="search-dialog"
    v-show="showSearchDiolag"
    :class="
      searchRes.length > 8 ? 'higher-search-dialog' : 'lower-search-dialog'
    "
  >
    <div style="display: flex">
      <img src="/search.svg" alt="" style="width: 2rem; width: 2rem" />
      <div class="search-input-txt">搜索</div>
    </div>
    <input
      v-model="inputValue"
      class="search-input-text"
      type="text"
      @input="searchForValue"
    />
    <ul class="search-list">
      <li v-for="title in searchRes" :key="title" class="search-list-item">
        <div class="search-item">
          <router-link to="/">
            <a
              @click="goToArticle(title)"
              style="
                color: rgb(65, 185, 131);
                height: 3rem;
                display: block;
                display: flex;
                align-items: center;
              "
              >{{ title }}</a
            >
          </router-link>
        </div>
        <div class="row-space-line"></div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ArticlesApi from '@/api/articlesApi.js'
import { debounce } from '@/utils/utils.js'
const props = defineProps({
  showSearchDiolag: Boolean
})
const emit = defineEmits(['close'])
const inputValue = ref("");
const searchRes = ref([]);

const handleQuery = (title) => {
  searchRes.value = [];
  //do something
  let param = null
  if (title) {
    param = {
      articleTitle: title
    }
  } else {
    param = {
      keywords: inputValue.value
    }
  }

  ArticlesApi.queryAllArticles(param).then(res => {
    if (res?.code === '20000') {
      const { data } = res
      searchRes.value = data
    }
  })
}
const debounceFun = debounce(handleQuery, 1000)
const searchForValue = () => {
  if (inputValue.value === "") {
    searchRes.value = []
    return;
  }

  debounceFun()
};

const goToArticle = (title) => {
  handleQuery(title)
  emit('close', false)
};

</script>
<style lang='scss' scoped>
//隐藏滚动条
::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
}

.row-space-line {
  border-bottom: 1px solid rgb(229, 229, 229, 1);
}

.search-dialog {
  box-sizing: border-box;
  width: 90vw;
  position: fixed;
  top: 15vh;
  left: 50%;
  z-index: 11;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 5px;
  background-color: #12121c;
}
.higher-search-dialog {
  height: 70vh;
}
.lower-search-dialog {
  height: 50vh;
}

.search-input-text {
  width: 100%;
  min-height: 3rem;
  padding: 0;
  border: none;
  background-color: rgba(18, 18, 28, 0);
  border-bottom: 1px solid rgb(158, 158, 158);
  font-size: 1rem;
  color: #43b672;
}
.search-input-txt {
  margin-left: 10px;
  color: rgb(255, 255, 255);
  font-size: 20px;
}
.search-input-text:focus {
  outline: none;
}
.search-list {
  list-style: none;
  padding: 0;
  overflow: auto;
}
.search-item > a {
  text-decoration: none;
  color: black;
}
.search-item > a:hover {
  color: mediumslateblue;
}
/* 搜索弹框滚动条样式 */
/* 滚动条的宽度 */
::-webkit-scrollbar {
  width: 5px;
}
/* 滚动条的按钮 */
::-webkit-scrollbar-button {
  display: none;
}
/* 滚动条的滑块 */
::-webkit-scrollbar-thumb {
  background-color: grey;
  border-radius: 5px;
}
</style>