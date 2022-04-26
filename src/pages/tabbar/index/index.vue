<template>
  <view class="indexContent">
    <u-notice-bar mode="horizontal" :list="anText"></u-notice-bar>
    <view class="wrap" v-if="classify">
      <view class="classify" v-for="(item,index) in classify" :key="index" @click="toClassify(index)">
        {{item.classify_name}}
      </view>
      <view class="classify" @click="toClassify(0)">
        更多内容
      </view>
    </view>
    <u-gap height="20" bg-color="#f2f2f2" v-if="goods.length>0"></u-gap>
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
    >
      <view class="goods-list" v-if="goods">
        <view class="single-box-1" v-for="(item, index) in goods" :key="index">
          <view>
            <articlebox v-if="item" :article_info="item"></articlebox>
          </view>
          <u-gap height="20" bg-color="#f2f2f2" v-if="index < goods.length - 1">
          </u-gap>
        </view>
      </view>
    </mescroll-body>
    <u-tabbar
      :hide-tab-bar="true"
      :list="list"
      :mid-button="true"
      inactive-color="#bfbfbf"
      active-color="#1296db"
      @change="changeTab"
    >
    </u-tabbar>
  </view>
</template>

<script>
import zsMarquee from "@/components/zs-marquee/zs-marquee.vue";
import articlebox from "@/components/article_box.vue";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
  mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
  components: {
    articlebox,
    zsMarquee,
  },
  data() {
    return {
      enable: true,
      // tabs: tabItem,
      upOption: {},
      tabIndex: 0, // 当前菜单下标
      preIndex: 0, // 前一个菜单下标
      anText: [], // 公告内容
      classify: null, // 分区信息
      /*吸顶悬浮，上拉加载，下拉刷新组件 end*/
      list: [],
      goods: null,
      windowWidth: 0,
    };
  },
  onShow() {
    this.getAnnoucement();
    this.getTopic();
    this.getClassify();
    if (!uni.getStorageSync("userId")) {
      uni.navigateTo({ url: "/pages/login/index" });
    }

    this.list = this.$tabList;
    uni.getSystemInfo({
      success: (res) => {
        this.windowWidth = res.windowWidth;
      },
    });
    return;
  },
  // 在对应的show和hide页面生命周期中打开或关闭监听
  onShow() {
    this.enable = true;
  },
  onHide() {
    this.enable = false;
  },
  methods: {
    // 获取公告信息
    getAnnoucement() {
      uni.request({
        url: "http://localhost:8001/api/announcement/getList",
        success: (res) => {
          this.anText = [res.data[res.data.length - 1].announcement_content];
        },
      });
    },
    // 获取分区
    getClassify(){
      uni.request({
        url: "http://localhost:8001/api/classify/getList",
        success: (res) => {
          this.classify = res.data.slice(0,7)
        },
      });
    },
    // 分区跳转
    toClassify(index){
      uni.setStorageSync("classifyFlag",index)
      uni.switchTab({ url: `/pages/tabbar/classification/index` })
    },
    // 获取帖子信息
    getTopic() {
      uni.request({
        url: "http://localhost:8001/api/topic/getTopicAll",
        success: (res) => {
          this.goods = res.data;
        }
      });
    },
    // 切换菜单
    // tabChange(index) {
    //   this.tabIndex = index;
    //   this.downCallback();
    // },
    changeTab(res) {
      console.log(res);
      if (res != 2) {
        this.$changeFun(res);
      }
    },
    mescrollInit() {},
    //下拉刷新
    downCallback() {
      this.getAnnoucement();
      this.getTopic();
      this.getClassify();
      this.list = this.$tabList;
      if (!uni.getStorageSync("userId")) {
        uni.navigateTo({ url: "/pages/login/index" });
      }
      //...自定义的页码设置为1；以及goods数据设置为[]
      this.upCallback();
    },
    //上拉加载下一页
    upCallback() {
      //...请求
      //...goods追加数据
      setTimeout(() => {
        this.mescroll.endSuccess(this.goods.length);
      }, 1000);
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
  position: relative;
}

.authorBtn {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
}

/*吸顶悬浮，上拉加载，下拉刷新组件*/
.demo-tip {
  padding: 18rpx;
  font-size: 24rpx;
  text-align: center;
}

/*吸顶悬浮，上拉加载，下拉刷新组件end*/

.popup-content {
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
  font-family: "Microsoft YaHei UI";

  .loginTip {
    font-size: 40rpx;
    text-align: center;
  }

  .loginBtn {
    position: relative;
    display: flex;
    width: 90%;
    height: 100rpx;
    margin: 60rpx auto;
    border-radius: 20rpx;
    background-color: #c69c6c;
    justify-content: center;
    align-items: center;
    font-size: 35rpx;
    color: #ffffff;

    .item {
      flex: auto;

      &:nth-child(2) {
        padding-right: 10rpx;
      }
    }
  }
}
.wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .classify{
    background-color: #fff;
    margin: 10rpx 10rpx 0 10rpx;
    width: 165rpx;
    height: 75rpx;
    line-height: 75rpx;
    text-align: center;
  }
}

</style>
