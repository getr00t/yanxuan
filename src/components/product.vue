<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled />
      <van-dropdown-item
        v-model="value"
        title="价格"
        :options="option"
        @change="ChangePriceValue"
      />
      <van-dropdown-item
        v-model="TargetValue"
        title="分类"
        :options="NewfilterCategory"
        @change="CategoryChange"
      />
    </van-dropdown-menu>
    <!-- 商品卡片-->
    <van-empty
      v-if="goodsList.length == 0"
      image="search"
      description="暂无商品"
    />
    <ProductCard :goodsListArr="goodsList" v-else></ProductCard>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
export default {
  components: {
    ProductCard,
  },
  props: ["goodsList", "filterCategory"],
  data() {
    return {
      value: "",
      TargetValue: 0,
      NewfilterCategory: [],
      option: [
        { text: "由高到底", value: "desc" },
        { text: "由低到高", value: "asc" },
      ],
    };
  },
  created() {
    let NewArr = this.filterCategory.map((item) => {
      if (item.checked) {
        this.TargetValue = item.id;
      }
      return { text: item.name, value: item.id, ...item };
    });
    this.NewfilterCategory = NewArr;
  },
  methods: {
    // 分类
    CategoryChange(CategoryValue) {
      this.$emit("CategoryChange", CategoryValue);
    },
    // 价格
    ChangePriceValue(OrderValue) {
      this.$emit("OrderChange", OrderValue);
    },
  },
};
</script>

<style lang="less" scoped>
</style>