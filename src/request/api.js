import request from './request'
// index
export const GetHomeData = () => request.get(`/index/index`)
// 历史和热门数据
export const GetPopupData = () => request.get(`/search/index`)
// 搜索框
export const GetsSearchData = (params) => request.get(`/goods/list?${params}`)
// 实时搜索
export const GetLiveHelper = (params) => request.get(`/search/helper?${params}`)
