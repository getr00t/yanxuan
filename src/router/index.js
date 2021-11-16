import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import popup from '../views/MyPopup.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',

  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        // 二级路由要么不带“/”,要么就带上完整路径地址，包括一级路径地址一起带上，完整的路径，如:'/home/popup'
        path: 'popup',
        component: popup,
    
      },
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
