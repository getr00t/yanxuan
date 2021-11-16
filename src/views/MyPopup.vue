<template>
  <div class="header">
    <van-search
      class="search-top"
      v-model="SearchValue"
      @cancel="Gotohome"
      @search='EnterSearch'
      @clear='clearValue'
      show-action
      shape="round"
      background="#fff"
      :placeholder="placeholderValue"
    >
    </van-search>
    <!-- 子传父 -->
    <HistoryHot @myEvent="handleEvent"></HistoryHot>
  </div>
</template>

<script>
import HistoryHot from '@/components/HistoryHot';
export default {
 
  data() {
    return {
      SearchValue: "",
      placeholderValue: "",
    };
  },
   components:{
    HistoryHot
  },
  methods: {
      Gotohome() {
      this.$router.go(-1);
    },
    EnterSearch(){
      console.log(this.SearchValue);
    },
  clearValue(){
    console.log(1);
    this.placeholderValue=''
  },
  // 子传父
    handleEvent(event){
      this.placeholderValue=event
      }
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
    height: 1rem;
  }
}
</style>