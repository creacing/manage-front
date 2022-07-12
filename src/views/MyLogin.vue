<template>
  <BgCover></BgCover>

  <div class="login">
    <div class="login-content">
      <div class="switch-tab">
        <el-tabs v-model="activeName" @tab-click="loginOrRegister">
          <el-tab-pane label="login" name="login" />
          <el-tab-pane label="register" name="register" />
        </el-tabs>
      </div>

      <el-input
        v-model="username"
        placeholder="Please input username"
        class="m-input"
        :prefix-icon="User"
      />
      <el-input
        v-model="password"
        type="password"
        placeholder="Please input password"
        show-password
        class="m-input"
        :prefix-icon="View"
      />
      <!-- <div class="m-btn-group">
        <el-button type="primary" class="login-btn" @click="register"
          >Register</el-button
        >
        <el-button type="primary" class="login-btn" @click="submit"
          >Login</el-button
        >
      </div> -->
      <el-button
        type="primary"
        class="login-btn"
        @click="register"
        v-show="!isLogin"
        :class="btnAnima === 2 ? 'login-btn-anima-in' : 'login-btn-anima-out'"
        >Register</el-button
      >
      <el-button
        type="primary"
        class="login-btn"
        @click="submit"
        v-show="isLogin"
        :class="btnAnima === 1 ? 'login-btn-anima-in' : 'login-btn-anima-out'"
        >Login</el-button
      >
    </div>
  </div>
</template>
<script setup>
import LoginApi from "@/api/loginApi.js";
import { ref, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import BgCover from "@/components/BgCover.vue";
import { User, View } from '@element-plus/icons-vue'
const btnAnima = ref(1)
//注意 useRouter 执行一定要放在setup方法内的顶部或者其他位置，不能放在下面setup的函数里面执行，否则作用域改变，useRouter执行是undefined。
const router = useRouter();
const activeName = ref('login')
const username = ref("");
const password = ref("");
const isLogin = ref(true)
const loginOrRegister = () => {
  nextTick(() => {
    if (activeName.value === 'login') {
      btnAnima.value = 1
      isLogin.value = true
    } else {
      btnAnima.value = 2
      isLogin.value = false
    }
  })

}
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
      if (res.msg) {
        ElMessage.warning(res.msg);
        return
      }
      ElMessage.success("register success!");
    }
  });
};
</script>
<style lang='scss' scoped>
.switch-tab {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  :deep(.el-tabs__item) {
    width: 6rem;
    padding: 0;
    text-align: center;
  }
}
.login {
  overflow: hidden;
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
  box-shadow: 10px 10px 10px 10px rgba($color: #000000, $alpha: 0.3);
  .login-content {
    height: 70%;
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
  }
  :deep(.el-input__wrapper) {
    box-shadow: 0 1px 0 #dcdfe6;
    border-radius: 0;
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
// .login-btn {
//   width: 5rem;
// }
.login-btn {
  width: 100%;
  position: relative;
}
.login-btn-anima-out {
  animation: moveout 1s;
  animation-fill-mode: forwards; // 把物体动画地从一个地方移动到另一个地方，并让它停留在那里
}
.login-btn-anima-in {
  animation: movein 1s;
  animation-fill-mode: forwards; // 把物体动画地从一个地方移动到另一个地方，并让它停留在那里
}
:deep(.el-button + .el-button) {
  margin-left: unset;
}
</style>

<style lang="scss">
@keyframes moveout {
  0% {
    left: 0px;
  }

  100% {
    left: 35rem;
  }
}
@keyframes movein {
  0% {
    left: -35rem;
  }

  100% {
    left: 0px;
  }
}
</style>

<!-- animation-name ：规定需要绑定到选择器的 keyframe 名称。。
animation-duration ：规定完成动画所花费的时间，以秒或毫秒计。
animation-timing-function ：规定动画的速度曲线。
animation-delay ：规定在动画开始之前的延迟。
animation-iteration-count ：规定动画应该播放的次数。
animation-direction ：规定是否应该轮流反向播放动画。 -->
