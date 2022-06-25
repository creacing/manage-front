<template>
  <BgCover>
    <template #bgCoverContent>
      <Motto/>
    </template>
  </BgCover>
</template>
<script setup>
import { ref } from 'vue'
import Motto from '@/components/Motto.vue'
import BgCover from '@/components/BgCover.vue'
import ArticlesApi from '../api/articlesApi.js'
const currentPage = ref(0);
const pageValue = 9
const params = {
  currentPage: currentPage.value,
  pageValue,
}
ArticlesApi.queryAllArticles(params).then(res => {
  if (res?.code === '20000') {
    const { data } = res
  }
})
defineProps({
  msg: String
})

</script>
<style lang="scss" scope>
</style>