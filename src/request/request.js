import axios from 'axios'
// 创建实例
const instance = axios.create({
   baseURL: 'http://kumanxuan1.f3322.net:8001',
   timeout: 2000,
   method: 'post',
   headers: {
     'Content-Type': 'application/json; charset=utf-8'
   },
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
   axios.defaults.headers['token'] = localStorage.getItem('token');
   // 在发送请求之前做些什么
   return config;

}, function (error) {
   // 对请求错误做些什么
   return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
   // 对响应数据做点什么
   return res.data;
}, function (error) {
   // 对响应错误做点什么
   return Promise.reject(error);
});
export default instance;