import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css'
import 'vant/lib/index.css'
import '@/vantui'
import 'amfe-flexible'
import  qs from 'qs'

Vue.prototype.$qs = qs
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
