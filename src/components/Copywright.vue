<template>
  <footer class="blog-info">
    <p>
      Powered by
      <a
        class="author-info"
        href="https://github.com/creacing?tab=repositories"
        target="_blank"
        title="作者"
        >Creazing</a
      >
      | Copyright © 2022-{{ date }} | MIT License
    </p>
  </footer>
</template>
<script setup>
const date = new Date().getFullYear();
</script>
<style lang='scss' scoped>
.blog-info {
  box-sizing: border-box;
  margin-top: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  text-align: center;
  width: 100%;
  padding: 0 20px;
  background-color: rgb(62, 69, 80);
  color: #fff;
  .author-info {
    color: #000;
    font-weight: bold;
  }
}
</style>
