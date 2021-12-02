<template>
  <div>
    <van-list :finished="finished" finished-text="没有更多了" >
      <van-cell v-for="item in Arrlist" :key="item" :title="item" @click="DiyClick(item)"/>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      finished: true,
    };
  },
  // 父传子，在子组件里使用props接受数据
  props: ["Arrlist"],
  created(){
  },
    methods: {
    DiyClick(item){
      this.$emit("listData",item)
    }
  },
};
</script>

<style>
</style>