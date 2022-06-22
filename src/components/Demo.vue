<template>
  <h1>{{ msg }}</h1>
</template>
<script setup>
import { ref } from 'vue'
import ArticlesApi from './../api/articlesApi.js'

console.log('ArticlesApi', ArticlesApi);
ArticlesApi.queryAllArticles().then(res => {
  console.log('res', res);
})
defineProps({
  msg: String
})

</script>

