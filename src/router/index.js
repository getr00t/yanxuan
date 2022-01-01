import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Popup from '@/views/MyPopup.vue';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { tabbarisshow: true },
    children: [
      {
        // 二级路由要么不带“/”,要么就带上完整路径地址:包括一级路径地址一起带上，完整的路径，如:'/home/popup'
        path: 'popup',
        meta: { tabbarisshow: true },
        component: Popup
      }
    ]
  },
  {
    path: '/topic',
    meta: { tabbarisshow: true },

    component: () => import(/* webpackChunkName: "about" */ '@/components/Topic')
  }, {
    path: '/sort',
    meta: { tabbarisshow: true },

    component: () => import(/* webpackChunkName: "about" */ '@/components/Sort')
  }, {
    path: '/shoppingcart',
    meta: { tabbarisshow: true },

    component: () => import(/* webpackChunkName: "about" */ '@/components/ShoppingCart')
  }, {
    path: '/mine',
    meta: { tabbarisshow: true },

    component: () => import(/* webpackChunkName: "about" */ '@/components/Mine')
  }, {
    path: '/detail/:id',
    component: () => import(/* webpackChunkName: "about" */ '@/components/Detail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 解决官网bug路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  undefined
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// 导航守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("X-Nideshop-Token")
  if (to.path == "/shoppingcart") {
    if (token) {
      // 只适应shoppingcart路由放行
      next()
    }
    else {
      // 路由里面获取不到this这里使用toast需要注意！！！
      Vue.prototype.$toast.fail('请先登录');
      setTimeout(() => {
        next('/mine');
      }, 1000);
      return
    }
  }
  // 适配所以路由放行
  next();
})
export default router
