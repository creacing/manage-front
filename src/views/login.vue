<template>
  <div class="login">
    <el-input v-model="username" placeholder="Please input username" />
    <el-input
      v-model="password"
      type="password"
      placeholder="Please input password"
      show-password
    />
    <el-button type="primary" @click="submit">Submit</el-button>
  </div>
</template>
<script setup>
import LoginApi from "@/api/loginApi.js";
import { ref } from "vue";
const username = ref("");
const password = ref("");
const submit = () => {
  console.log(submit);
  const params = {
    username: username.value,
    password: password.value,
  };
  LoginApi.login(params).then((res) => {
    console.log("login info", res);
  });
};
</script>
<style lang='scss' scoped>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  height: 50rem;
  width: 30rem;
  transform: translate(-50%, -50%);
}
</style>