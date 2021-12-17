<template>
  <div class="root_box">
    <van-swipe class="swiper_box">
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
    <!-- 介绍 -->
    <div class="center">
      <van-row type="flex" justify="center" class="title_box">
        <van-col>
          {{ name }}
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" class="title_box">
        <van-col>{{ goods_brief }}</van-col>
      </van-row>
      <van-row type="flex" justify="center" class="title_box">
        <van-col style="color: red">￥{{ retail_price }}.00元</van-col>
      </van-row>
    </div>
    <!-- 弹出层 -->
    <van-cell @click="showsku" class="popup_box" is-link>
      <p>展示弹出层</p>
    </van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-sku
        v-model="isshow"
        :sku="sku"
        :goods="goods"
        :goods-id="goodsId"
        :quota="quota"
        :quota-used="quotaUsed"
        :hide-stock="sku.hide_stock"
        :message-config="messageConfig"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
      />
    </van-popup>
    <!-- 商品参数 -->
    <div class="Productdata">
      <h2>商品参数</h2>
      <ul>
        <li v-for="(item, index) in attribute" :key="index">
          <span class="spanno">
            {{ item.name }}
          </span>
          <span>{{ item.value }}</span>
        </li>
      </ul>
      <div class="img_box" v-html="goods_desc">
      </div>
    </div>
    <!-- 常见问题 -->
    <div class="issue"></div>
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
      name: "",
      // 产品描述
      goods_brief: "",
      // 产品价格
      retail_price: "",
      // 商品参数
      attribute: "",
      // 商品信息
      goods_desc: "",
      // 弹出层
      show: false,
      isshow: false,
      goodsId: "",
      quota: 0,
      quotaUsed: 0,
      sku: {
        // 数据结构见下方文档
      },
      goods: {
        // 数据结构见下方文档
      },
      messageConfig: {
        // 数据结构见下方文档
      },
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    async getdata() {
      const { data: res } = await GetDetail(this.$route.params.id);
      if (res.errno == 0) {
        this.gallery = res.data.gallery;
        this.name = res.data.info.name;
        this.goods_brief = res.data.info.goods_brief;
        this.retail_price = res.data.info.retail_price;
        this.attribute = res.data.attribute;
        this.goods_desc = res.data.info.goods_desc;

        console.log(this.goods_desc);
      }
    },
    // 弹出层
    showsku() {
      console.log(1);
      this.show = true;
    },
    onBuyClicked() {
      console.log(2);
    },
    onAddCartClicked() {
      console.log(3);
    },
  },
};
</script>
<style lang="less" scoped>
.root_box {
  background-color: #efefef;
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
  .center {
    background-color: #ffff;
    .title_box {
      font-size: 0.466667rem;
      box-sizing: border-box;
      padding: 0.4rem 0rem;
    }
  }
  .popup_box {
    border-top: 1px solid #323233;
  }
  .Productdata {
    background-color: #ffff;
    margin-top: 0.4rem;
    padding: 0.4rem 0rem;
    box-sizing: border-box;
    width: 100%;
    h2 {
      height: 1.066667rem;
      line-height: 1.066667rem;
      color: #323233;
      font-size: 0.4rem;
      margin-left: 0.4rem;
    }
    ul {
      width: 95%;
      margin: 0 auto;
      li {
        margin-bottom: 0.4rem;
        box-sizing: border-box;
        padding: 0.266667rem 0rem;
        border-radius: 0.133333rem;
        background: #efefef;
        font-size: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .spanno {
        color: #999;
        margin-left: 0.666667rem;
        margin-right: 0.266667rem;
      }
    }
    .img_box {
      /deep/ img {
        width:100%;
        display: block;
      }
    }
  }
  .issue {
    background-color: #ffff;
  }
}
</style>