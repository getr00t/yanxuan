<template>
  <div class="root_box">
    <van-swipe :autoplay="3000" class="swiper_box">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <van-image
          width="100%"
          lazy-load
          :src="item.img_url"
          style="display: block"
        />
      </van-swipe-item>
    </van-swipe>
    <van-row class="text_box">
      <van-col>
        <van-icon name="checked" color="red" />
        30天无忧退货
      </van-col>
      <van-col>
        <van-icon name="checked" color="red" />
        48小时快速退费
      </van-col>
      <van-col>
        <van-icon name="checked" color="red" />
        满88元免邮费
      </van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col >{{name}}</van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col >{{goods_brief}}</van-col>
    </van-row>
    <van-row type="flex" justify="center">
      <van-col >￥{{retail_price}}.00元</van-col>
    </van-row>
  </div>
</template>

<script>
import { GetDetail } from "@/request/api";
export default {
  data() {
    return {
      // 轮播图
      gallery: [],
      // 产品标题
      name:"",
      // 产品描述
      goods_brief:"",
      // 产品价格
      retail_price:""
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      const { data: res } = await GetDetail(this.$route.params.id);
      this.gallery = res.data.gallery;
      this.name = res.data.info.name;
      this.goods_brief = res.data.info.goods_brief;
      this.retail_price = res.data.info.retail_price;
      console.log( this.goods_brief);
    },
  },
};
</script>
<style lang="less" scoped>
.root_box {
  .text_box {
    background-color: #efefef;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    padding: 0.266667rem 0rem;
    font-size: 0.333333rem;
  }
}
</style>