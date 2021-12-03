<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/Topic">专题</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/sort">分类</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/ShoppingCart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
   data(){
      return{
         active:0
      }
   }
   
};
</script>

<style>
</style>