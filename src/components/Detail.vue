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
    <van-sku
      v-model="iSshow"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      @stepper-change="changenumber"
    />
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
      <div class="img_box" v-html="goods_desc"></div>
    </div>
    <!-- 常见问题 -->
    <div class="issue">
      <span class="l_span"></span>
      <h1 class="issue_title">常见问题</h1>
      <span class="r_span"></span>
    </div>
    <div class="question" v-for="item in issue" :key="item.id">
      <h6>{{ item.question }}</h6>
      <p>{{ item.answer }}</p>
    </div>
    <!-- 相关产品 -->
    <div class="related">
      <span class="l_span"></span>
      <h1 class="issue_title">相关产品</h1>
      <span class="r_span"></span>
    </div>
    <ProductCard :goodsListArr="relatedList"></ProductCard>
    <!-- 解决商品导航固定定位挡住 -->
    <div class="handle_bug"></div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon
        icon="star-o"
        text="未收藏"
        v-if="iSHide"
        @click="HideStar"
      />
      <van-goods-action-icon
        icon="star"
        text="已收藏"
        color="#ff5000"
        v-else
        @click="HideStar"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="badge"
        @click="clickcart"
      />
      <van-goods-action-button type="danger" text="立即购买" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="showsku"
      />
    </van-goods-action>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import {
  GetDetail,
  GetRelated,
  Getgoodscount,
  PostAddcart,
} from "@/request/api";
export default {
  components: { ProductCard },
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
      attribute: [],
      // 商品信息
      goods_desc: "",
      // 常见问题
      issue: [],
      // 相关产品
      relatedList: [],
      // 弹出层
      iSshow: false,
      // 购物车数量
      badge: 0,
      // 产品id，来自productList的第一个数组项中的id
      productId: "",
      // 加入购物车数量
      number: 0,
      sku: {
        // 数据结构见下方文档
        hide_stock: false,
        tree: [],
        // 价格
        price: "",
        // 库存
        stock_num: 0,
      },
      goods: {
        // 数据结构见下方文档
        picture: "",
      },
      // 商品导航收藏
      iSHide: true,
    };
  },
  created() {
    this.getdata();
    this.GetRelated();
    this.goodscount();
  },
  methods: {
    // 产品明细
    async getdata() {
      const { data: res } = await GetDetail(this.$route.params.id);
      if (res.errno == 0) {
        this.gallery = res.data.gallery;
        this.name = res.data.info.name;
        this.goods_brief = res.data.info.goods_brief;
        this.goods.picture = res.data.info.list_pic_url;
        this.retail_price = res.data.info.retail_price;
        this.sku.price = res.data.info.retail_price.toFixed(2) + "元";
        this.sku.stock_num = res.data.info.goods_number;
        this.attribute = res.data.attribute;
        this.goods_desc = res.data.info.goods_desc;
        this.issue = res.data.issue;
        this.productId = res.data.productList[0].id;
      }
    },
    // 相关产品
    async GetRelated() {
      const { data: res } = await GetRelated(this.$route.params.id);
      this.relatedList = res.data.goodsList;
    },
    // 弹出sku
    async showsku() {
      this.iSshow = true;
      if (this.iSshow) {
        let data = {
          goodsId: this.$route.params.id,
          productId: this.productId,
          number: this.number,
        };
        const { data: res } = await PostAddcart(data);
      } else {
        this.iSshow = false;
      }
    },
    // 获取购物车数量
    async goodscount() {
      if (localStorage.getItem("X-Nideshop-Token")) {
        const { data: res } = await Getgoodscount();
        if (res.errno == 0) {
          this.badge = res.data.cartTotal.goodsCount;
          console.log(res);
        }
      }
    },

    //  查看购物车详情
    clickcart() {
      // if (localStorage.getItem("X-Nideshop-Token")) {
      // }
      // this.$toast("请先登录")
      // this.$router.push(`/mine`);
    },
    // 购买数量
    changenumber(value) {
      this.number = value;
      console.log(this.number);
    },

    // 商品导航
    onClickIcon() {
      this.$toast("点击图标");
    },
    onClickButton() {
      this.$toast("点击图标");
    },
    // 收藏
    HideStar() {
      this.iSHide = !this.iSHide;
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
    border-top: 0.013333rem solid #323233;
  }
  // sku高度
  .van-sku-container {
    min-height: 30%;
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
        width: 100%;
        display: block;
      }
    }
  }
  .issue {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.4rem;
    margin-top: 0.266667rem;
    padding: 0.333333rem 0rem;
    .issue_title {
      padding: 0.133333rem 0.533333rem;
      font-size: 0.24rem;
    }
    .l_span {
      border-top: 0.026667rem solid #ccc;
      width: 1.333333rem;
    }
    .r_span {
      border-top: 0.026667rem solid #ccc;
      width: 1.333333rem;
    }
  }
  .question {
    background-color: #ffff;
    box-sizing: border-box;
    padding: 0rem 0.266667rem;
    font-size: 0.186667rem;
    h6 {
      display: flex;
      align-items: center;
      padding: 0.266667rem 0rem;
      font-size: 0.4rem;
      &::before {
        content: "";
        margin-right: 0.133333rem;
        width: 0.08rem;
        height: 0.08rem;
        border-radius: 50%;
        background-color: red;
      }
    }
    p {
      color: #666666;
      font-size: 0.266667rem;
    }
  }
  // 相关产品
  .related {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.4rem;
    padding: 0.333333rem 0rem;
    .issue_title {
      padding: 0.133333rem 0.533333rem;
      font-size: 0.24rem;
    }
    .l_span {
      border-top: 0.026667rem solid #ccc;
      width: 1.333333rem;
    }
    .r_span {
      border-top: 0.026667rem solid #ccc;
      width: 1.333333rem;
    }
  }
  // 解决固定定位占位
  .handle_bug {
    background-color: #fff;
    width: 100%;
    height: 1.333333rem;
  }
  .van-goods-action {
    z-index: 9999;
  }
}
</style>