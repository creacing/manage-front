<template>
  home
</template>
<script setup>
import { ref } from 'vue'
import ArticlesApi from '../api/articlesApi.js'
const currentPage = ref(0);
const pageValue = 9
const params = {
  currentPage:currentPage.value,
  pageValue
}
ArticlesApi.queryAllArticles(params).then(res => {
  if(res && res.code === '20000'){
   const { data } = res
    console.log('res is:', data);
  }
})
defineProps({
  msg: String
})

</script>
<style lang="scss" scope>
</style>