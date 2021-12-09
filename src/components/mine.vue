<template>
  <div>
    <div class="top_box" @click="ShowLogin">
      <div class="l_box">
        <van-image
          class="image-placeholder-background-color"
          round
          width=".933333rem"
          height=".933333rem"
          :src="imgurl"
        />
        <span>{{ text }}</span>
      </div>
      <van-icon :name="iconname" class="r_box" />
    </div>
    <van-dialog
      v-model="show"
      :showConfirmButton="false"
      closeOnClickOverlay
      @closed="offclose"
    >
      <van-form>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="pwd"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="button"
            @click="onSubmit"
            >注册登录</van-button
          >
        </div>
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
import { PostLogin } from "@/request/api";
export default {
  data() {
    return {
      // 显示登录框
      show: false,
      // 退出登录
      exitlogin: false,
      username: "",
      pwd: "",
      text: "点击登录",
      iconname: "arrow",
      imgurl: "https://b.yzcdn.cn/vant/icon-demo-1126.png",
    };
  },
  created() {
    this.GetToken();
  },
  methods: {
    async onSubmit() {
      let logindata = {
        username: this.username,
        pwd: this.pwd,
      };
      const { data: res } = await PostLogin(logindata);
      let { userInfo, token } = res.data;
      if (res.errno == 0) {
        localStorage.setItem("token", token);
        // localStorage只能存字符串，如果需要存对象，首先要转化为字符串 利用JSON.stringify() ( 存单个就不用考虑这些了 )
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        const newuserInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.text = newuserInfo.username;
        this.imgurl = newuserInfo.avatar;
        this.$toast.success("登录成功");
        this.iconname = "cross";
        this.show = false;
      }
    },
    ShowLogin() {
      if (this.iconname == "cross") {
        this.$dialog
          .confirm({
            title: "确认退出账号",
            message: "是否想要退出当前账号？",
          })
          .then(() => {
            // on confirm
            localStorage.clear();
          })
          .catch(() => {
            // on cancel
          });
        return;
      }
      this.show = true;
    },
    offclose() {
      // (this.username = ""), (this.pwd = "");
    },
    // 获取本地token
    GetToken() {
      const newuserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (localStorage.getItem("token")) {
        this.text = newuserInfo.username;
        this.imgurl = newuserInfo.avatar;
        this.iconname = "cross";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.top_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  height: 2.666667rem;
  padding: 0rem 0.266667rem;
  background-color: #333;
  color: #fff;
  .l_box {
    .image-placeholder-background-color {
      background-color: #fff;
      // 文字和图片对齐居中
      vertical-align: middle;
    }
    span {
      margin-left: 0.266667rem;
      font-size: 0.333333rem;
    }
  }
  .r_box {
    font-size: 0.266667rem;
  }
}
</style>