import {createRouter,createWebHistory} from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Tags from '@/views/Tags.vue'
import Archives from '@/views/Archives.vue'
import Collections from '@/views/Collections.vue'
import Login from '@/views/Login.vue'
const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/home',
      component:Home,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path:'/',
      component:Home,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path:'/about',
      component:About,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path:'/tags',
      component:Tags,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path:'/archives',
      component:Archives,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      path:'/collections',
      component:Collections,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
    }
  ]
})
//地址重定向
router.beforeEach((to,from,next)=>{
  // console.log('to,from,next',to,from,next);
	if(to.meta.requireAuth){  // 判断该路由是否需要登录权限
      if(localStorage.getItem("m-token")) {  // 从本地存储localStorage获取当前的token是否存在
          next()
      }else{
          next('/login') //如果token不存在，就跳到首页
      }
	}else{
      if(localStorage.getItem("m-token") && to.path == '/login') {  //token存在时候，进去登录页面就自动跳转到首页
          next('/home')
      }else{
          next()
      }
    }
});


export default router