<template>
  <div class="root_box">
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
    <!-- 商品数据 -->
    <van-checkbox-group v-model="result">
      <van-checkbox
        v-for="item in cartList"
        :key="item.id"
        :name="item.id"
        v-model="checked"
      >
        <van-card
          :num="item.number"
          :price="item.retail_price.toFixed(2)"
          :title="item.goods_name"
          class="goods-card"
          :thumb="item.list_pic_url"
        />
      </van-checkbox>
    </van-checkbox-group>
    <div class="bugs"></div>
    <!-- <van-swipe-cell>
     <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
    </van-swipe-cell> -->
    <!-- 提交订单栏 -->
    <van-submit-bar :price="goodsAmount"  button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        累计共{{ 0}}件商品，可点击
        <van-button type="primary" size="small">编辑</van-button>
        <span @click="onClickEditAddress"> 按钮进行商品数量修改 </span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { GetCartDeta } from "@/request/api";
export default {
  data() {
    return {
      // 单价
      retail_price: "",
      // 商品总列表
      cartList: "",
      // 复选框组
        result: [],
      checked: true,
      // 所有商品总价
      goodsAmount: 0,
    };
  },
  created() {
    this.GetCart();
  },
  methods: {
    async GetCart() {
      const { data: res } = await GetCartDeta();
      if (res.errno == 0) {
        console.log(res.data.cartList);
        this.cartList = res.data.cartList;
        this.goodsAmount = res.data.cartTotal.goodsAmount.toFixed(2)*100;
      }
      console.log(this.goodsAmount);
    },
    onClickEditAddress() {
      console.log(1);
    },
    onSubmit() {
      console.log(1);
    },
    toggleAll() {
      // this.checked = true;
      // this.$refs.checkboxGroup.toggleAll();
    },
  },
};
</script>

<style lang="less" scoped>
.root_box {
  background-color: #efefef;
  .goods-card {
    margin: 0;
    background-color: #fff;
  }

  .delete-button {
    height: 100%;
  }
  // 顶部文字
  .text_box {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
    padding: 0.266667rem 0rem;
    font-size: 0.333333rem;
  }
  .van-swipe-cell {
    background-color: #fff;
    padding: 0.133333rem 0.266667rem;
  }
  // 提交订单
  .van-submit-bar {
    width: 100%;
    bottom: 1.333333rem;
  }
  // 商品卡片
  .van-checkbox-group {
    background-color: #fff;
    padding: 0.133333rem 0.266667rem;
    box-sizing: border-box;
    .van-checkbox {
      border-bottom: 0.013333rem solid #ccc;
      /deep/.van-checkbox__label {
        width: 100%;
      }
    }
  }
  .bugs {
    margin-bottom: 0.453333rem;
  }
}
</style>