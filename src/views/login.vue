<template>
  <div class="login">
    <h1>Login</h1>
    <el-input
      v-model="username"
      placeholder="Please input username"
      class="m-input"
    />
    <el-input
      v-model="password"
      type="password"
      placeholder="Please input password"
      show-password
      class="m-input"
    />
    <div class="m-btn-group">
      <el-button type="primary" @click="register">Register</el-button>
      <el-button type="primary" @click="submit">Submit</el-button>
    </div>
  </div>
</template>
<script setup>
import LoginApi from "@/api/loginApi.js";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const username = ref("");
const password = ref("");
const submit = () => {
  if (username.value === "" || password.value === "") {
    ElMessage.error("请输入用户名和密码！");
    return;
  }
  const params = {
    username: username.value,
    password: password.value,
  };
  LoginApi.login(params).then((res) => {
    console.log("login info", res);
  });
};
const register = () => {
  console.log("register info");
};
</script>
<style lang='scss' scoped>
.login {
  position: fixed;
  top: 40%;
  left: 50%;
  height: 50rem;
  width: 30rem;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.m-input {
  margin-bottom: 2rem;
}
.m-btn-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>