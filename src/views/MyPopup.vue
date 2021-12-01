<template>
  <div class="header">
    <van-search
      class="search-top"
      v-model="SearchValue"
      @cancel="Gotohome"
      @search="EnterSearch"
      @clear="clearValue"
      show-action
      shape="round"
      background="#fff"
      :placeholder="placeholderValue"
      @input="myinput"
    >
    </van-search>
    <!-- 历史热门页，子传父 -->
    <HistoryHot
      @myEvent="handleEvent"
      v-if="isFlag == 1"
      @DiyEvent="HistoryHotValue"
    ></HistoryHot>
    <!-- 实时搜索 -->
    <HelperList :Arrlist="Timelist" v-else-if="isFlag == 2"></HelperList>
    <!-- 产品页 -->
    <Product
      v-else
      :goodsList="goodsList"
      :filterCategory="filterCategory"
      @CategoryChange="ChangeValue"
      @OrderChange="OrderValue"
    ></Product>
  </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot";
import Product from "@/components/product";
import HelperList from "@/components/helperList";
import { GetsSearchData, GetLiveHelper } from "@/request/api";
export default {
  data() {
    return {
      // 实时搜索
      SearchValue: "",
      placeholderValue: "",
      isFlag: 1,
      isShow: "",
      goodsList: [],
      filterCategory: [],
      categoryId: 0,
      order: "desc",
      sort: "id",
      // 实时返回数据
      Timelist: [],
    };
  },
  components: {
    HistoryHot,
    Product,
    HelperList,
  },
  created() {
  },
  methods: {
    Gotohome() {
      this.clearValue();
      this.$router.go(-1);
    },
    async EnterSearch() {
            console.log(this.goodsList.length);
      const SoData = this.$qs.stringify({
        keyword: this.SearchValue,
        categoryId: this.categoryId,
        order: this.order,
        sort: this.sort,
      });  
      const { data: res } = await GetsSearchData(SoData);
      if (res.data.data.length !== 0) {
        this.filterCategory = res.data.filterCategory;
        this.goodsList = res.data.goodsList;
        this.isFlag = !this.isFlag;
      console.log(this.goodsList.length);
      }
    },
    clearValue() {
      this.SearchValue = "";
    },
    // 历史和热门子传父
    handleEvent(event) {
      this.placeholderValue = event;
    },
    // 分类子传父
    ChangeValue(event, isShow) {
      this.categoryId = event;
      this.isShow = isShow;
      console.log(this.isShow);
      this.isFlag = !this.isFlag;
      this.EnterSearch();
    },
    // 价格排列顺序子传父
    OrderValue(event) {
      console.log(event);
      this.order = event;
      this.sort = "price";
      this.isFlag = !this.isFlag;
      this.EnterSearch();
    },
    // 实时搜索
    myinput(value) {
      this.SearchValue = value;
      this.onLoad(value);
    },
    async onLoad(SearchValue) {
      const HelperData = this.$qs.stringify({
        keyword: SearchValue,
      });
      const { data: res } = await GetLiveHelper(HelperData);
      if (res.errno == 0) {
        this.isFlag = 2;
        this.Timelist = res.data;
      }
    },
    // 点击历史和热门标签
    HistoryHotValue(event) {
      this.SearchValue = event;
      this.EnterSearch();
      console.log(event);
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  position: absolute;
  top: 0;
  z-index: 999;
  background: #efefee;
  width: 10rem;
  height: 100%;
  .search-top {
    width: 100%;
    height: 1.4rem;
  }
}
</style>