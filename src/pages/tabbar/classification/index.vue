<template>
  <view class="indexContent">
    <u-sticky :enable="enable">
      <view style="background: #ffffff; border-bottom: 1px solid #f2f2f2">
        <view class="border-bottom">
          <u-tabs
            active-color="#0DE0FE"
            :list="tabs"
            :current="tabIndex"
            @change="tabChange"
            v-if="tabs"
          ></u-tabs>
        </view>
      </view>
    </u-sticky>
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
    <view>
      <u-tabbar
        :hide-tab-bar="true"
        :list="list"
        :mid-button="true"
        inactive-color="#bfbfbf"
        active-color="#1296db"
        @change="changeTab"
      ></u-tabbar>
    </view>
  </view>
</template>

<script>


import imgarticlebox from "@/components/img_article_box.vue";
import articlebox from "@/components/article_box.vue";
import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
export default {
  mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
  components: { imgarticlebox,articlebox },
  data() {
    return {
      enable: true,
      tabs: [],
      upOption: {},
      tabIndex: 0, // 当前菜单下标
      preIndex: 0, // 前一个菜单下标
      navTop: null, // nav距离到顶部的距离 (如计算不准确,可直接写死某个值)
      isShowSticky: false, // 是否悬浮
      /*吸顶悬浮，上拉加载，下拉刷新组件 end*/
      list: [],
      goods: [],
    };
  },
  onShow() {
    if (!uni.getStorageSync("userId")) {
      uni.navigateTo({ url: "/pages/login/index" });
    }
    this.getClassify()
    this.list = this.$tabList;
    this.getIndex(uni.getStorageSync("classifyFlag"));
  },
  methods: {
    changeTab(res) {
    },
    // 切换tab
    tabChange(index) {
      this.goods = null
      this.tabIndex = index;
      this.getTopic(this.tabs[index].classify_id)
      this.downCallback();
    },
    // 获取tab栏数据
    getClassify(){
      uni.request({
        url: "http://localhost:8001/api/classify/getList",
        success: (res) => {
          res.data.forEach(item=>{
            item.name = item.classify_name;
            this.tabs.push(item);
          })
          console.log(this.tabs);
          this.getTopic(this.tabs[uni.getStorageSync("classifyFlag")].classify_id)
        },
      });
    },
    // 获取tab当前index
    getIndex(index){
      if(index >= 0){
        this.tabIndex = index
      } else {
        this.tabIndex = 0
      }
    },
    // 获取该分区下的帖子
    getTopic(index){
      uni.request({
        url: "http://localhost:8001/api/topic/getTopicByClassify",
        data:{
          classifyId:index
        },
        success: (res) => {
          this.goods = res.data;
        }
      });
    },


    mescrollInit() {},
    //下拉刷新
    downCallback() {
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
.mess-box {
}
.u-tab-view {
  width: 200rpx;
  height: 100%;
}

.u-tab-item {
  height: 110rpx;
  background: #f6f6f6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26rpx;
  color: #444;
  font-weight: 400;
  line-height: 1;
}

.u-tab-item-active {
  position: relative;
  color: #000;
  font-size: 30rpx;
  font-weight: 600;
  background: #fff;
}

.u-tab-item-active::before {
  content: "";
  position: absolute;
  border-left: 4px solid $u-type-primary;
  height: 32rpx;
  left: 0;
  top: 39rpx;
}

.u-tab-view {
  height: 100%;
}
.tabs-box {
  border-bottom: 1px solid #f2f2f2;
}
</style>
