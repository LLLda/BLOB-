<template>
  <view>
    <template v-if="dataList.length > 0">
      <view v-for="(item, index) in dataList" :key="index">
        <u-gap height="20" bg-color="#f2f2f2"></u-gap>
        <history-box :historyItem="item" :type="type"></history-box>
        <u-gap
          height="20"
          bg-color="#f2f2f2"
          v-if="dataList.length - 1 == index"
        ></u-gap>
      </view>
    </template>
    <view class="empty" v-else> 
      暂无记录
    </view>
  </view>
</template>

<script>
import historyBox from "@/components/history_box.vue";
export default {
  components: {
    historyBox,
  },
  data() {
    return {
      dataList: [],
      type: 1,
    };
  },
  onLoad(options) {
    if (options.type === "1") {
      this.type = 1;
      this.getLike();
    } else if (options.type === "2") {
      this.type = 2;
      this.getComment();
    } else if (options.type === "3") {
      this.type = 3;
      this.getCollect();
    } else {
      this.type = 4;
      this.getCommodity();
    }
  },
  methods: {
    // 获取点赞记录
    getLike() {
      uni.request({
        url: "http://localhost:8001/api/like/getLikeRecord",

        data: {
          userCId: uni.getStorageSync("userId"),
        },
        success: (res) => {
          this.dataList = res.data;
        },
        fail: (res) => {
          this.dataList = [];
        },
      });
    },
    // 获取评论记录
    getComment() {
      uni.request({
        url: "http://localhost:8001/api/comment/getCommentRecord",
        data: {
          userCId: uni.getStorageSync("userId"),
        },
        success: (res) => {
          this.dataList = res.data;
          this.type = 0;
        },
        fail: (res) => {
          this.dataList = [];
        },
      });
    },
    // 获取收藏记录
    getCollect() {
      uni.request({
        url: "http://localhost:8001/api/collect/getCollectRecord",
        data: {
          userCId: uni.getStorageSync("userId"),
        },
        success: (res) => {
          this.dataList = res.data;
        },
        fail: (res) => {
          this.dataList = [];
        },
      });
    },
    // 获取兑换记录
    getCommodity() {
      uni.request({
        url: "http://localhost:8001/api/commodity/getCommodityRecord",
        data: {
          userCId: uni.getStorageSync("userId"),
        },
        success: (res) => {
          this.dataList = res.data;
          this.type = 2;
        },
      });
    },
  },
};
</script>

<style scoped>
.empty{
  margin-top: 400rpx;
  display: flex;
  justify-content: center;
}
</style>
