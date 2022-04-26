<template>
  <view style="background-color: #ffffff; height: 100% !important">
    <view class="context">
      <view
        style="
          background-color: #ffffff;
          height: 500upx;
          text-align: center;
          padding-top: 100upx;
        "
      >
        <image
          lazy-load="true"
          :src="logoUrl"
          style="width: 294upx; height: 294upx; border-radius: 50%"
        ></image>
      </view>
      <view
        style="
          background-color: #ffffff;
          height: 150upx;
          text-align: center;
          padding: 50upx;
        "
      >
        <input
          style="
            border-bottom: 2upx solid #d5d4d4;
            text-align: start;
            margin: 50upx 0;
          "
          placeholder="请输入用户名"
          v-model="username"
        />
      </view>
      <view
        style="
          background-color: #ffffff;
          text-align: center;
          padding: 50upx;
          display: flex;
        "
      >
        <input
          v-if="!isShow"
          class="password"
          password="true"
          placeholder="请输入密码"
          v-model="password"
        />
        <input
          v-else
          class="password"
          placeholder="请输入密码"
          v-model="password"
        />

        <view
          :class="isShow ? 'icon-icon-eye-open' : 'icon-icon-eye-close'"
          class="iconfont changeShow"
          :style="{ color: themeColor }"
          style="font-size: 60upx"
          @tap="isShowPassword"
        ></view>
      </view>
      <view style="text-align: center; margin-top: 100upx">
        <view
          class="login"
          :style="{ 'background-color': themeColor }"
          @tap="loginFun"
          >登录</view
        >
        <view
          class="login"
          :style="{ 'background-color': themeColor }"
          @tap="register"
          >注册</view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    themeColor: {
      type: String,
      default: "#33CCCC",
    },
    logoUrl: {
      type: String,
      default: "",
    },
  },
  computed: {
    style_xuan() {
      let that = this;
      var themeColor = that.themeColor;
      var isRemeber = that.isRemeber;
      var style = "";

      if (isRemeber) {
        style += `color:${themeColor};`;
      }
      return style;
    },
  },
  data() {
    return {
      isShow: false, //是否显示输的密码
      username: "",
      password: "",
    };
  },

  methods: {
    getUserByname(name) {
      uni.request({
        url: "http://localhost:8001/api/userC/getUserCById",
        data: {
          userLogName: name,
        },
        success: (res) => {
          uni.setStorageSync("userId", res.data[0].userC_Id);
        },
      });
    },
    isShowPassword() {
      let that = this;
      that.isShow = !that.isShow;
    },
    loginFun() {
      let that = this;
      let data = {
        userLogName: that.username,
        userPwd: that.password,
      };
      uni.request({
        url: "http://localhost:8001/api/userC/checkLoginInfo",
        method: "POST",
        data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "xmlhttprequest",
        },
        success: (res) => {
          if (res && res.data === true) {
            this.getUserByname(data.userLogName);
            uni.switchTab({ url: "/pages/tabbar/index/index" });
          } else {
            uni.showToast({
              title: "账号密码错误",
              icon: "error",
              duration: 1000,
            });
          }
        },
      });
    },
    register() {
      let that = this;
      let data = {
        userCLogName: that.username,
        userCPwd: that.password,
        userCName: "是新用户哟",
        userCImgUrl:
          "http://127.0.0.1:8001/file/test/5e48c861-fd81-4b34-9683-8a49356082d8.jpg",
      };
      uni.request({
        url: "http://localhost:8001/api/userC/addUserC",
        method: "POST",
        data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "xmlhttprequest",
        },
        success: (res) => {
          if (res && res.data === "success") {
            this.getUserByname(data.userLogName);
            uni.showToast({
              title: "注册成功",
              icon: "success",
              duration: 1000,
            });
          } else {
            uni.showToast({
              title: "注册失败",
              icon: "error",
              duration: 1000,
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
page,
.content {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
view {
  box-sizing: border-box;
}
.cf-hengStart {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.xuanShowBox {
  padding-left: 40upx;
  .icon-weixuan {
    color: #eaeeed;
  }

  .xuanShowTip {
    padding-left: 10upx;
  }
}

.password {
  border-bottom: 2upx solid #d5d4d4;
  text-align: start;
  width: 70%;
}

.login {
  color: #ffffff;
  width: 80%;
  border-radius: 68upx;
  margin: 20upx auto;
  padding: 20upx;
  font-size: 40upx;
}

.changeShow {
  font-size: 36upx;
  position: relative;
  top: -12upx;
  left: 84upx;
}

uni-page-wrapper {
  background-color: #ffffff;
  height: 100%;
}

uni-page-body {
  height: 100%;
}
</style>
