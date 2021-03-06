import axios from 'axios'
import Vue from 'vue'
// 创建实例
const instance = axios.create({
   baseURL: 'http://kumanxuan1.f3322.net:8001',
   timeout: 2000,
   // headers: {
   //   'Content-Type': 'application/json; charset=utf-8'
   // },
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
   if (config.timeout > 2000) {
      Vue.prototype.$toast.setDefaultOptions({ duration: 120000 });
      Vue.prototype.$toast.fail('网络请求超时请检查网络或联系网络管理员')
   }
   if (localStorage.getItem("X-Nideshop-Token")) {
      config.headers["X-Nideshop-Token"] = localStorage.getItem("X-Nideshop-Token");

   }
   // 在发送请求之前做些什么
   return config;

}, function (error) {
   // 对请求错误做些什么
   return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
   // 对响应数据做点什么
   return res;
}, function (error) {
   // 对响应错误做点什么
   return Promise.reject(error);
});
export default instance;