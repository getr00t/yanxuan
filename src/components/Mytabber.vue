<template>
  <div class="tabbar_box">
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/topic">专题</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/sort">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/shoppingcart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
};
</script>

<style lang="less" scoped>
</style>