<template>
  <view class="container" @click="toTopic(historyItem.topics[0].topic_id)">
    <view v-if="type !== 4">
      <view class="comment" v-if="type === 0"
        >评论内容：{{ historyItem.commentContent }}</view
      >
      <view class="content">{{ historyItem.topics[0].topic_content }}</view>
      <view class="tip">
        {{
          $u.timeFormat(
            historyItem.topics[0].topic_time,
            "yyyy年mm月dd日 hh:MM:ss"
          )
        }}
      </view>
    </view>
    <view v-else>
      <view
        >兑换时间：{{
          $u.timeFormat(
            historyItem.commodityRecordTime,
            "yyyy年mm月dd日 hh:MM:ss"
          )
        }}</view
      >

      <view> 奖品名：{{ historyItem.commodityList[0].commodity_name }} </view>
      <view> 状态：{{ getText() }} </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "historyBox",
  props: {
    historyItem: {
      type: Object,
    },
    type: {
      type: Number,
    },
  },
  methods: {
    // 跳转详情
    toTopic(id){
      uni.navigateTo({
        url: `/pages/topic/index?topicId=${id}`,
      })
    },
    // 奖品状态文字
    getText() {
      if (this.historyItem.commodityRecordStatus === 0) {
        return "已兑现";
      } else {
        return "待兑现";
      }
    },
  },
};
</script>

<style>
.container {
  padding: 20rpx 40rpx;
}
.content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.comment {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tip {
  font-size: 23rpx;
  color: #bfbfbf;
}
</style>
