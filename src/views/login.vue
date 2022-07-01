<template>
  <div class="login">
    <!-- <h1>Login</h1> -->
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
import { useRouter } from 'vue-router'
//注意 useRouter 执行一定要放在setup方法内的顶部或者其他位置，不能放在下面setup的函数里面执行，否则作用域改变，useRouter执行是undefined。
const router = useRouter()

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
    const { data } = res
    if (data.code === 20000) {
      const token = data.token
      localStorage.setItem('m-token', token)
      router.push({ path: '/home' })
    }

  });
};
const register = () => {
  if (username.value === "" || password.value === "") {
    ElMessage.error("请输入用户名和密码！");
    return;
  }
  const params = {
    username: username.value,
    password: password.value,
  };
  LoginApi.register(params).then((res) => {
    console.log("register info", res);
  });
};
</script>
<style lang='scss' scoped>
.login {
  // position: fixed;
  // top: 40%;
  // left: 50%;
  // height: 50rem;
  // width: 30rem;
  // transform: translate(-50%, -50%);
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // flex-direction: column;
}
.m-input {
  // margin-bottom: 2rem;
}
.m-btn-group {
  // display: flex;
  // justify-content: space-between;
  // width: 100%;
}
</style>