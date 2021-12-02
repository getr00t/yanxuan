<template>
  <div>
    <div class="history" v-show="isShow">
      <div class="top">
        <h3>历史记录</h3>
        <van-icon name="delete-o" @click="DellHistory" />
      </div>
      <div class="botton" >
        <van-tag
          @click="tagValue(item)"
          plain
          type="default"
          v-for="(item, index) in historyKeywordList"
          :key="index"
          >{{ item }}</van-tag
        >
      </div>
    </div>
    <div class="hot">
      <div class="top">
        <h3>热门搜索</h3>
      </div>
      <div class="botton">
        <van-tag
          plain
          :type="item.is_hot == 1 ? 'danger' : 'default'"
          v-for="(item, index) in hotKeywordList"
          :key="index"
          @click="tagValue(item.keyword)"
          >{{ item.keyword }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
import { GetPopupData, PostClearHistory } from "@/request/api";
export default {
  data() {
    return {
      isShow: true,
      historyKeywordList: [],
      hotKeywordList: [],
      defaultKeyword: "",
    };
  },
  created() {
    this.GetPopup();
  },
  methods: {
    // 历史+热门标签
    async GetPopup() {
      const { data: res } = await GetPopupData();
      if (res.errno == 0) {
        this.historyKeywordList = res.data.historyKeywordList;
        this.hotKeywordList = res.data.hotKeywordList;
        this.defaultKeyword = res.data.defaultKeyword.keyword;
        this.$emit("myEvent", this.defaultKeyword);
      }
    },
    // 点击标签
    tagValue(item) {
      this.defaultKeyword = item;
      this.$emit("DiyEvent", item);
      this.$emit("myEvent", this.defaultKeyword);
    },
    // 清除搜索历史
    async DellHistory() {
      const { data: res } = await PostClearHistory();
      if (res.errno == 0) {
          this.$toast.success("删除成功");
          setTimeout(() => {
            this.isShow = false;
          }, 1000);
        
      }
    },
  },
};
</script>

<style lang="less" scoped>
.history {
  background: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.533333rem 0.266667rem 0.08rem;
    font-size: 0.426667rem;
    h3 {
      text-align: center;
      font-weight: 400;
    }
  }
  .botton {
    padding-bottom: 0.266667rem;
    .van-tag {
      margin: 0.133333rem 0.266667rem;
      padding: 0.08rem;
      font-size: 0.32rem;
    }
  }
}
.hot {
  background: #fff;
  margin-top: 0.533333rem;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.533333rem 0.266667rem 0.08rem;
    font-size: 0.426667rem;
    h3 {
      text-align: center;
      font-weight: 400;
    }
  }
  .botton {
    padding-bottom: 0.266667rem;
    .van-tag {
      margin: 0.133333rem 0.266667rem;
      padding: 0.08rem;
      font-size: 0.32rem;
    }
  }
}
</style>