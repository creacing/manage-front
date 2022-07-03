<template>
  <BgCover></BgCover>

  <div class="login">
    <div class="login-content">
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
        <el-button type="primary" class="login-btn" @click="register"
          >Register</el-button
        >
        <el-button type="primary" class="login-btn" @click="submit"
          >Submit</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import LoginApi from "@/api/loginApi.js";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import BgCover from "@/components/BgCover.vue";

//注意 useRouter 执行一定要放在setup方法内的顶部或者其他位置，不能放在下面setup的函数里面执行，否则作用域改变，useRouter执行是undefined。
const router = useRouter();

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
    if (res.code === 20000) {
      const token = res.token;
      localStorage.setItem("m-token", token);
      router.push({ path: "/home" });
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
    if (res.code === 20000) {
      ElMessage.success("register success!");
    }
  });
};
</script>
<style lang='scss' scoped>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  height: 40rem;
  width: 30rem;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 10px 10px 10px rgba($color: #000000, $alpha: 0.3);
  .login-content {
    height: 50%;
    width: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
}
.m-input {
  //   margin-bottom: 2rem;
  height: 3rem;
  //   width: 20rem;
}
.m-btn-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.login-btn {
  width: 5rem;
}
</style>