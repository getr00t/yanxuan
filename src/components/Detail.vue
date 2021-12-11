<template>
  <div>
    <van-swipe :autoplay="3000" class="swiper_box">
      <van-swipe-item v-for="item in imglist" :key="item.id">
        <img  :src=item.gallery.img_url />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { GetDetail } from "@/request/api";
export default {
  data() {
    return {
      infolist: [],
      imglist:[]
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    async getdata() {
      const { data: res } = await GetDetail(this.$route.params.id);
      this.infolist = res.data.info;
      this.imglist = res.data.gallery;
        console.log(this.imglist);
    },
  },
};
</script>
<style lang="less" scoped>
.swiper_box {
  img {
    // width: 100px;
    // height: 1.333333rem;
  }
}
</style>