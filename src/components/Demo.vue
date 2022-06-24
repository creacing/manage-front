<template>
  <h1>{{ msg }}</h1>
</template>
<script setup>
import { ref } from 'vue'
import ArticlesApi from './../api/articlesApi.js'
ArticlesApi.queryAllArticles().then(res => {
  console.log('res', res);
})
defineProps({
  msg: String
})

</script>

