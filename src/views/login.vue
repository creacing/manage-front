<template>
  <el-input v-model="username" placeholder="Please input username" />
  <el-input
    v-model="password"
    type="password"
    placeholder="Please input password"
    show-password
  />
  <el-button type="primary" @click="submit">Submit</el-button>
</template>
<script setup>
import LoginApi from '@/api/loginApi.js'
import { ref } from 'vue'
const username = ref('')
const password = ref('')
const submit = () => {
  console.log(submit);
  const params = {
    username:username.value,
    password:password.value
  }
  LoginApi.login(params).then(res=>{
    console.log('login info',res);
  })

}
</script>