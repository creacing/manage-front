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
      path:'/',
      component:Home,
    },
    {
      path:'/about',
      component:About,
    },
    {
      path:'/tags',
      component:Tags,
    },
    {
      path:'/archives',
      component:Archives,
    },
    {
      path:'/collections',
      component:Collections,
    }
  ]
})

export default router