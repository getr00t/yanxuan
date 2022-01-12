import request from './request'
// index
export const GetHomeData = () => request.get(`/index/index`)
// 历史和热门数据
export const GetPopupData = () => request.get(`/search/index`)
// 搜索框
export const GetsSearchData = (params) => request.get(`/goods/list?${params}`)
// 实时搜索
export const GetLiveHelper = (params) => request.get(`/search/helper?${params}`)
// 清除历史记录
export const PostClearHistory = () => request.post(`/search/clearhistory`)
// 登录
export const PostLogin = (params) => request.post(`/auth/loginByWeb`, params)
// 产品详情
export const GetDetail = (id) => request.get(`/goods/detail?id=${id}`)
// 相关产品
export const GetRelated = (id) => request.get(`/goods/related?id=${id}`)
// 购物车产品数量
export const Getgoodscount = () => request.get(`/cart/goodscount`)
// 加入购物车
export const PostAddcart = (params) => request.post(`/cart/add`, params)
// 购物车详情数据
export const GetCartDeta = () => request.get(`/cart/index`)
// 点击切换商品选中状态 baseurl/cart/checked
export const Postchecked = (params) => request.post(`/cart/checked`, params)

