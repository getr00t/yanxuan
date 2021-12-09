<template>
  <div class="header">
    <div v-if="$route.path == '/home'">
      <van-search
        class="search-top"
        v-model="SearchValue"
        disabled
        shape="round"
        background="#fff"
        placeholder="请输入搜索关键词"
        @click="GoPopup"
      />
      <!-- 解决固定定位 -->
      <div class="clear_fixed"></div>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa" >
        <van-swipe-item v-for="item in BannerList" :key="item.id">
          <img
            :src="item.image_url"
            width="100%"
            style="display: block"
            alt="luyouqihome"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 弹出层子路由 -->
    <!-- 动画，使用的vant现场内置样式类名-->
    <transition name="van-slide-right">
      <router-view v-if="$route.path == '/home/popup'"></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import { GetHomeData } from "@/request/api";
export default {
  data() {
    return {
      SearchValue: "",
      BannerList: [],
    };
  },
  created() {
    this.GteHome();
  },

  methods: {
    async GteHome() {
      const { data: res } = await GetHomeData();
      if (res.errno === 0) {
        this.BannerList = res.data.banner;
      }
    },
    // 跳转弹出层
    GoPopup() {
      this.$router.push(`home/popup`);
    },
  },
  components: {},
};
</script>
<style lang="less" scoped>
// 解决固定定位
.clear_fixed {
  width: 100%;
  height: 1rem;
}
.header {
  width: 10rem;
  height: 13.333333rem;
  margin: 0 auto;
}
.my-swipe .van-swipe-item {
  width: 10rem;
  background-color: #39a9ed;
}
.search-top {
  // pc端显示h5效果固定定位必须给具体宽度。不要100%，会撑满整个浏览器，固定定位是以浏览器窗口为基准。
  position: fixed;
  top: 0;
  width: 10rem;
  height: 1.4rem;
  z-index: 999;
}
//  自己写动画待续bugs
// .slide-fade-enter,
// .slide-fade-leave-to {
//   right: -100%;
// }
// .slide-fade-enter-active,.slide-fade-leave-active{
//   transition: right 1s linear;
// }
// .slide-fade-enter-to,.slide-fade-leave
// /* .slide-fade-leave-active for below version 2.1.8 */ {
//   transform: translate(-100%);
//   right: 0;
// }
</style>