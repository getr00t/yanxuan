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
    children: [
      {
        // 二级路由要么不带“/”,要么就带上完整路径地址:包括一级路径地址一起带上，完整的路径，如:'/home/popup'
        path: 'popup',
        component: Popup
      }
    ]
  },
  {
    path: '/topic',
    component: () => import(/* webpackChunkName: "about" */ '@/components/Topic')
  }, {
    path: '/sort',
    component: () => import(/* webpackChunkName: "about" */ '@/components/Sort')
  }, {
    path: '/shoppingcart',

    component: () => import(/* webpackChunkName: "about" */ '@/components/ShoppingCart')
  }, {
    path: '/mine',
    component: () => import(/* webpackChunkName: "about" */ '@/components/Mine')
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
  let token = localStorage.getItem("token")
  if (to.path == "/shoppingcart") {
    if (token) {
      // 只适应shoppingcart路由放行
      next()
    }
    else {
      // 路由里面获取不到this这里需要注意使用toast
      Vue.prototype.$toast.fail('请登录');
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
