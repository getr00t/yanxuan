import request from './request'
// index
export const GetHomeData = () => request.get(`/index/index`)
// 搜索框数据
export const GetPopupData = () => request.get(`/search/index`)
