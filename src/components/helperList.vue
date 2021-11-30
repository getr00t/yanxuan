<template>
  <div>
    <van-list :finished="finished" finished-text="没有更多了" >
      <van-cell v-for="item in Timelist" :key="item" :title="item" />
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
  props: ["Timelist"],
  created(){
  },
    methods: {
    
  },
};
</script>

<style>
</style>