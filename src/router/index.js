import { createRouter, createWebHashHistory } from 'vue-router'


import main from "@/views/main.vue"
import commit from "@/views/commit.vue"
import showcomponent from "@/views/show.vue"
import welcome from "@/views/welcome.vue"
import introduction from "@/views/introduction.vue"
import about from "@/views/about.vue"



const router = createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path:'/',
      redirect:'/welcome'
    },
    // {
    //   path: '/commit',
    //   name:'commit',
    //   component: commit,
    // },
    {
      path: '/main',
      component: main,
      redirect:'/introduction',
      children:[
        {
          path:'/welcome',
          component:welcome,
        },
        {
          path:'/introduction',
          component:introduction,
        },
        {
          path: '/commit',
          component:commit,
        },
        {
          path: '/show/:videoUrl*', // 使用 * 表示可以匹配任意长度的路径参数
          component: showcomponent
        },
        {
          path: '/about',
          component: about,
        }
      ]
    }
  ]
})
export default router
