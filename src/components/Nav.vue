<template>
  <div class="my-nav">
    <div class="my-nav-content">
      <slot name="myNavLeft">
        <div class="my-nav-content-me">
          <img class="my-nav-content-avator" src="/avator.jpg" alt="" />
          <div class="my-nav-content-author">qydxyx</div>
        </div>
      </slot>
      <div class="my-nav-links">
        <div class="my-nav-links-normal">
          <div class="my-nav-link" v-for="nav in navList" :key="nav.id">
            <img :src="nav.icon" alt="" />
            <router-link :to="nav.link">
              <a>{{ nav.text }}</a>
            </router-link>
          </div>
        </div>

        <div class="my-nav-link">
          <div class="my-nav-search" @click="isShowSearchDiolag">
            <img src="/search.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <SearchDialog :showSearchDiolag="showSearchDiolag" @close="closeDialog" />
</template>
<script setup>
import SearchDialog from './SearchDialog.vue'
import { ref } from 'vue'
const navList = [{
  id: "1",
  text: "首页",
  link: "/",
  icon: "/home.svg",
},
{
  id: "2",
  text: "归档",
  link: "/archives",
  icon: "/article.svg",
},
{
  id: "3",
  text: "分类",
  link: "/tags",
  icon: "/tag.svg",
},
{
  id: "4",
  text: "关于",
  link: "/about",
  icon: "/about.svg",
},
{
  id: "5",
  text: "收集",
  link: "/collections",
  icon: "/collection.svg",
}]
// show dialog
const showSearchDiolag = ref(false);
const isShowSearchDiolag = () => {
  showSearchDiolag.value = !showSearchDiolag.value;
};
//弹框关闭事件
const closeDialog = () => {
  showSearchDiolag.value = false
}
</script>
<style lang="scss" scoped>
.my-nav {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  height: 3.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to top, #12c0fa 0%, #158df4 100%);
  .my-nav-content {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .my-nav-content-me {
      display: flex;
      justify-content: center;
      align-items: center;
      .my-nav-content-avator {
        widows: 2rem;
        height: 2rem;
        margin-right: 1rem;
      }
      .my-nav-content-author {
        color: #fff;
      }
    }

    .my-nav-links {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .my-nav-links-normal {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @media (max-width: 1200px) {
        .my-nav-links-normal {
          display: none;
        }
      }
      .my-nav-link {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        /* 搜索图标 */
        .my-nav-search {
          z-index: 11;
          cursor: pointer;
        }
      }
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
  @media (max-width: 1200px) {
    .my-nav-content {
      width: 90%;
    }
  }
}
</style>