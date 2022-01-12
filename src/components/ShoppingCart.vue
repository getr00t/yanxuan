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
        :name="item.product_id"
        v-model="item.checked"
        @click="CheckedHeadl(item)"
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
    <van-submit-bar
      :price="checkedGoodsAmount"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll">全选</van-checkbox>
      <template #tip>
        累计共{{ checkedGoodsCount }}件商品，可点击
        <van-button type="primary" size="small">编辑</van-button>
        <span @click="onClickEditAddress"> 按钮进行商品数量修改 </span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { GetCartDeta, Postchecked } from "@/request/api";
export default {
  data() {
    return {
      // 单价
      retail_price: "",
      // 商品总列表
      cartList: "",
      // 复选框组
      result: [],
      // 所有商品总价
      checkedGoodsAmount: 0,
      // 选中的商品总数
      checkedGoodsCount: "",
    };
  },
  created() {
    this.GetCart();
  },
  computed: {
    // 全选框
    checkedAll: {
      get() {
        console.log(this.result.length);
        console.log(this.cartList.length);
        return this.result.length == this.cartList.length ? true : false;
      },
      async set(newchecked) {
        let newarr = [];
        this.cartList.map((item) => {
          newarr.push(item.product_id);
        });
        console.log(newarr);
        const data = {
          isChecked: newchecked ? 1 : 0,
          // join默认是以,号分割
          productIds: newarr.join(),
        };
        console.log(data);
        const { data: res } = await Postchecked(data);
        if (res.errno == 0) {
          // this.cartList = res.data.cartList;
          // this.checkedGoodsAmount =
          //   res.data.cartTotal.checkedGoodsAmount.toFixed(2) * 100;
          // this.checkedGoodsCount = res.data.cartTotal.checkedGoodsCount;
        }
      },
    },
  },
  methods: {
    async GetCart() {
      const { data: res } = await GetCartDeta();
      if (res.errno == 0) {
        this.cartList = res.data.cartList;
        this.checkedGoodsAmount =
          res.data.cartTotal.checkedGoodsAmount.toFixed(2) * 100;
        this.checkedGoodsCount = res.data.cartTotal.checkedGoodsCount;
      }
      // this.result = [];
      this.cartList.map((item) => {
        if (item.checked == 1) {
          this.result.push(item.product_id);
        }
      });
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
    // 复选框状态
    async CheckedHeadl(item) {
      console.log(item.checked);
      const data = {
        isChecked: item.checked == 1 ? 0 : 1,
        productIds: item.product_id.toString(),
      };
      const { data: res } = await Postchecked(data);
      if (res.errno == 0) {
        this.cartList = res.data.cartList;
        this.checkedGoodsAmount =
          res.data.cartTotal.checkedGoodsAmount.toFixed(2) * 100;
        this.checkedGoodsCount = res.data.cartTotal.checkedGoodsCount;
      }
      console.log(item.product_id);
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