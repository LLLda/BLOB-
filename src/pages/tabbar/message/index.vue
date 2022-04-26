<template>
  <view class="indexContent">
    <mk-goods-list :goods="goods" @clickItem="goodsItem"></mk-goods-list>
    <!-- <view v-for="(item, index) in list" :key="index">
				<view>
					<messbox></messbox>
				</view>
				<view>
					<u-gap height="20" bg-color="#f2f2f2" v-if="index < list.length-1"></u-gap>
				</view>
			</view>
		</view> -->
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
import MkGoodsList from "@/components/mk-goods-list/mk-goods-list.vue";
import messbox from "@/components/message_box.vue";
// import constant from '@/common/js/utils/constant.js'
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
  mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
  components: { MkGoodsList, messbox },
  data() {
    return {
      list: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      goods: [], // 商品信息
    };
  },
  onLoad() {
    if (!uni.getStorageSync("userId")) {
      uni.navigateTo({ url: "/pages/login/index" });
    }
    this.getCommodity();
    this.list = this.$tabList;
  },
  methods: {
    changeTab(res) {
      if (res != 2) {
        this.$changeFun(res);
      }
    },
    // 获取商品信息
    getCommodity() {
      uni.request({
        url: "http://localhost:8001/api/commodity/getCommodity",
        success: (res) => {
          this.goods = res.data;
        },
      });
    },
    // 点击兑换礼品
    goodsItem(item, e) {
      console.log(item, 999);
      uni.request({
        url: "http://localhost:8001/api/userC/getUserCById",
        data: {
          userCId: uni.getStorageSync("userId"),
        },
        success: (res) => {
          const user = res.data[0];
          if (user.userC_integral < item.commodity_integral) {
            uni.showToast({
              title: "积分不足",
              icon: "error",
              duration: 1000,
            });
          } else {
            uni.showModal({
              title: "提示",
              content: `确认花费${item.commodity_integral}积分兑换[${item.commodity_name}]?`,
              success: async (res) => {
                uni.request({
                  url: "http://localhost:8001/api/commodity/addCommodityRecord",
                  method: "POST",
                  data: {
                    userCId: uni.getStorageSync("userId"),
                    commodityId: item.commodity_id,
                    commodityRecordTime: new Date().getTime(),
                  },
                  header: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Requested-With": "xmlhttprequest",
                  },
                  success: (res) => {
                    uni.request({
                      url: "http://localhost:8001/api/userC/editIntegral",
                      method: "get",
                      data: {
                        userCId: uni.getStorageSync("userId"),
                        integral: user.userC_integral - item.commodity_integral,
                      },
                      success: (res) => {
                        if (res.data === "success") {
                          uni.showToast({
                            title: "兑换成功",
                            icon: "success",
                            duration: 1000,
                          });
                        }
                      },
                    });
                  },
                });
              },
            });
          }
        },
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
.indexContent {
  padding-bottom: 150rpx;
}
.item {
  display: flex;
}
image {
  width: 120rpx;
  flex: 0 0 120rpx;
  height: 120rpx;
  margin-right: 20rpx;
  border-radius: 12rpx;
}

.title {
  text-align: left;
  font-size: 28rpx;
  color: $u-content-color;
  margin-top: 20rpx;
}
.pay-tabbar {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 0 2px #f0f0f0;
  display: flex;
  align-items: center;
  padding: 25rpx;
  .left {
    display: flex;
    align-items: center;
    flex: 1;
    font-weight: 600;
    view {
      width: 36rpx;
      height: 36rpx;
      margin-right: 10rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    font-weight: 600;
    .price {
      color: red;
      margin-right: 15rpx;
      font-weight: 500;
    }
  }
}
.goods-box {
  display: flex;
  padding: 25rpx;
  padding-right: 0;
  &-single {
    // border-bottom: 1px solid #f0f0f0;
  }
  .selected-box {
    width: 35rpx;
    position: relative;
    image {
      width: 36rpx;
      height: 36rpx;
      position: absolute;
      top: 50%;
      margin-top: -18rpx;
    }
  }
  .goods-img {
    width: 180rpx;
    height: 180rpx;
    overflow: hidden;
    border-radius: 5rpx;
    box-shadow: 0 0 2px #f0f0f0;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    flex: 1;
    margin-left: 18rpx;
    .title {
      width: 400rpx;
      font-size: 32rpx;
      font-weight: 700;
      margin-bottom: 18rpx;
      .text-box {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .info {
      color: #dcdfe6;
      font-size: 23rpx;
      margin-bottom: 18rpx;
    }
    .price {
      .big-text {
        font-weight: 800;
        font-size: 35rpx;
      }
    }
    .count {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
