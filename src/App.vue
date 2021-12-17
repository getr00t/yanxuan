<template>
  <div id="app">
    <router-view />
    <Mytabber v-show="$route.meta.tabbarisshow"></Mytabber>
  </div>
</template>
<script>
import Mytabber from "@/components/Mytabber";

export default {
  data() {
    return {};
  },
  created() {},
  components: {
    Mytabber,
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}
/* 最小750px 1:10比例来使用，这里是相对lib-flexible.js库来分配的，因为lib-flexible是把屏幕平均分成了10分。*/
@media screen and(min-width:750px) {
  html {
    font-size: 75px !important;
  }
}
</style>
