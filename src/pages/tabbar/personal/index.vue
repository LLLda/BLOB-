<template>
  <view class="index-page">
    <view class="main">
      <view class="header-box">
        <view class="handle-btn">
          <view class="btn" @click="toEditInfo">
            <u-icon name="setting" size="40" color="#dbdbdb"></u-icon>
          </view>
        </view>
        <view class="head-img">
          <u-image
            width="100%"
            height="100%"
            border-radius="50%"
            :src="userInfo.userC_imgUrl"
          ></u-image>
        </view>
        <view class="name"> {{ userInfo.userC_name }} </view>
        <view class="info-box">
          <view class="right-line">
            <span class="label"> 年龄 </span>
            {{ userInfo.userC_age }}
          </view>
          <view>
            <span class="label"> 性别 </span>
            {{ getSex() }}
          </view>
        </view>
      </view>
      <u-gap height="30" bg-color="#f2f2f2"></u-gap>
      <view class="service-box">
        <view class="row">
          <view class="grid" @click="attendance">
            <view class="image">
              <image src="../../../static/mine/jfqd.png"></image>
            </view>
            <view>积分:{{ userInfo.userC_integral }}</view>
          </view>
          <!-- <view class="grid">
            <view class="image">
              <image src="../../../static/mine/stxy.png"></image>
            </view>
            <view>我的求助帖</view>
            <image :src="newIcon" class="new-badage"></image>
          </view> -->
          <view class="grid" @click="toHistory(4)">
            <view class="image">
              <image src="../../../static/mine/nxsc.png"></image>
            </view>
            <view>兑换记录</view>
          </view>
          <view class="grid" @click="toHistory(1)">
            <view class="image">
              <image src="../../../static/mine/lxkf.png"></image>
            </view>
            <view>我的点赞</view>
          </view>
          <view class="grid" @click="toHistory(2)">
            <view class="image">
              <image src="../../../static/mine/wddd.png"></image>
            </view>
            <view>我的评论</view>
          </view>
          <view class="grid" @click="toHistory(3)">
            <view class="image">
              <image src="../../../static/mine/wdzl.png"></image>
            </view>
            <view>我的收藏</view>
          </view>
          <view class="grid" @click="logout">
            <view class="image">
              <image src="../../../static/mine/wdzl.png"></image>
            </view>
            <view>退出登录</view>
          </view>
          <!-- <view class="grid" @tap="addresses">
					<view class="image">
						<image src="../../../static/mine/shdz.png"></image>
					</view>
					<view>收货地址</view>
				</view>
				<view class="grid" @tap="services">
					<view class="image">
						<image src="../../../static/mine/gdfw.png"></image>
					</view>
					<view>更多服务</view>
				</view> -->
        </view>
      </view>
      <!-- <view class="cell-group">
        <u-cell-item icon="edit-pen" title="我的动态"></u-cell-item>
        <u-cell-item icon="heart" title="收藏"></u-cell-item>
        <u-cell-item icon="eye" title="我的关注"></u-cell-item>
        <u-cell-item icon="email" title="投诉反馈"></u-cell-item>
      </view> -->
    </view>
    <!--底部导航-->
    <u-tabbar
      :hide-tab-bar="true"
      :list="list"
      :mid-button="true"
      inactive-color="#bfbfbf"
      active-color="#1296db"
      @change="changeTab"
    ></u-tabbar>
  </view>
</template>

<script>
// import constant from "@/common/js/utils/constant";

export default {
  data() {
    return {
      showGradeDetail: false,
      userInfo: {},
      list: [],
    };
  },
  onShow() {
    if (!uni.getStorageSync("userId")) {
      uni.navigateTo({ url: "/pages/login/index" });
    }
    // if (constant.getUserInfo()) {
    //   this.userInfo = constant.getUserInfo();
    // } else {
    //   uni.showToast({
    //     title: '用户的信息不存在',
    //     icon: 'none',
    //     mask: true
    //   })
    // }
    this.getUserInfo();
    this.list = this.$tabList;
  },
  computed: {},
  methods: {
    logout() {
      uni.removeStorageSync("userId");
      uni.showToast({
        title: "退出登录成功",
        icon: "success",
        duration: 1000,
      });
      uni.switchTab({
        url: `/pages/tabbar/index/index`,
      });
    },
    getSex() {
      if (this.userInfo.userC_sex === 0) {
        return "女";
      } else if (this.userInfo.userC_sex === 1) {
        return "男";
      } else {
        return "无";
      }
    },
    changeTab(res) {
      if (res != 2) {
        this.$lastPage = res;
      }
    },
    // 获取用户信息
    getUserInfo() {
      uni.request({
        url: "http://localhost:8001/api/userC/getUserCById",
        data: {
          userCId: uni.getStorageSync("userId"),
        },
        success: (res) => {
          this.userInfo = res.data[0];
        },
      });
    },
    // 跳转修改个人信息
    toEditInfo() {
      uni.navigateTo({
        url: "/pages/tabbar/personal/editInfo",
      });
    },
    // 签到
    attendance() {
      // 今日是否已签到
      const myDate = new Date();
      const year = myDate.getFullYear(); //获取当前年
      const mon = myDate.getMonth() + 1; //获取当前月
      const date = myDate.getDate();
      const time = new Date(
        year + "-" + mon + "-" + date + " 00:00:00"
      ).getTime();
      uni.request({
        url: "http://localhost:8001/api/sign/check",
        data: {
          userCId: uni.getStorageSync("userId"),
          time,
        },
        success: (res) => {
          if (res.data) {
            uni.showToast({
              title: "今日已经签过到了哦",
              icon: "error",
              duration: 1000,
            });
            return;
          } else {
            uni.request({
              url: "http://localhost:8001/api/userC/editIntegral",
              data: {
                userCId: uni.getStorageSync("userId"),
                integral: this.userInfo.userC_integral + 10,
              },
              success: (res) => {
                this.userInfo.userC_integral += 10;
                uni.request({
                  url: "http://localhost:8001/api/sign/add",
                  data: {
                    userCId: uni.getStorageSync("userId"),
                    time: new Date().getTime(),
                  },
                  success: (res) => {
                    this.userInfo.userC_integral += 10;
                    uni.showToast({
                      title: "签到+10积分",
                      icon: "success",
                      duration: 1000,
                    });
                  },
                });
              },
            });
          }
        },
      });
    },
    // 跳转记录
    toHistory(type) {
      uni.navigateTo({
        url: `/pages/tabbar/personal/historyList?type=${type}`,
      });
    },
  },
};
</script>
<style>
.u-mode-center-box {
  border-radius: 20rpx !important;
}
page {
  background-color: #f2f2f2;
}
</style>
<style lang="scss" scoped>
.main {
  .header-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 100rpx;
    padding-bottom: 50rpx;
    background-color: #1296db;
    position: relative;
    .handle-btn {
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      .btn {
      }
    }
    .head-img {
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
    }
    .name {
      font-size: 32rpx;
      font-weight: 600;
      margin: 20rpx 0;
    }
    .right-line {
      border-right: 2px solid #ffffff;
      margin-right: 20rpx;
      padding-right: 20rpx;
    }
    .info-box {
      display: flex;
      align-items: center;
      view {
        .label {
          color: #ffffff;
          margin-right: 10rpx;
        }
      }
    }
  }
  .cell-group {
    background-color: #ffffff;
  }
}
.service-box {
  width: 100%;
  background-color: #ffffff;
  padding: 32rpx 30rpx 10rpx;
  // box-shadow: $box-shadow;

  .row {
    display: flex;
    flex-wrap: wrap;
    // color: $text-color-assist;
    // font-size: $font-size-sm;
    padding-bottom: -40rpx;

    .grid {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 40rpx;
      width: 25%;
      position: relative;

      .image {
        image {
          width: 80rpx;
          height: 80rpx;
          margin-bottom: 20rpx;
        }
      }

      .new-badage {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        top: 0;
        right: 30rpx;
      }
    }
  }
}
</style>
