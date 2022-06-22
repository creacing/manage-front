import axios from "axios";

//axios创建对象
const Server = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  // baseURL: '/api',
  timeout: 8_000
})
//定义前置拦截 请求发出去前触发
Server.interceptors.request.use(config=>{
  return config
},error=>{
  return Promise.reject(error)
})
//定义后置拦截器 响应拦截 服务器响应回来之前触发
Server.interceptors.response.use(response=>{
  return response.data
},error=>{
  return Promise.reject(error)
})

export default Server