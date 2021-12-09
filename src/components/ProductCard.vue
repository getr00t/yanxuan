<template>
  <div>
    <ul class="top_box">
      <li v-for="(item, index) in goodsListArr" :key="index">
        <img :src="item.list_pic_url" alt="img" />
        <h6 class="van-ellipsis">{{ item.name }}</h6>
        <span>￥{{ item.retail_price }}元</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["goodsListArr"],
  data() {
    return {
      // imgurl: require("@/assets/logo.png"),
    };
  },
  created() {},
};
</script>

<style lang="less" scoped>
.top_box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  li {
    width: 50%;
    padding: 0.266667rem;
    box-sizing: border-box;
    background: #fff;
  }
  h6 {
    font-weight: 400;
    font-size: 0.373333rem;
  }
  img {
    width: 100%;
    display: block;
  }
  span {
    color: #8b0000;
    font-weight: 400;
    font-size: 0.373333rem;
  }
}
</style>