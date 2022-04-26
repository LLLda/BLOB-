<template>
  <view>
    <articlebox
      v-if="article_info"
      :article_info="article_info"
      @flash="flash"
      type="1"
    ></articlebox>
    <u-gap height="20" bg-color="#f2f2f2"> </u-gap>
    <view class="contain-box">
      <view class="header">最新评论</view>
      <scroll-view scroll-y="true" style="height:950rpx">
        <view v-for="item in commentList" :key="item">
          <view class="header-box">
            <view class="left">
              <view class="head-img">
                <u-image
                  width="70rpx"
                  height="70rpx"
                  border-radius="35rpx"
                  :src="item.userCS[0].userC_imgUrl"
                ></u-image>
              </view>
              <view class="info">
                <view class="name">
                  {{ item.userCS[0].userC_name }}
                </view>
              </view>
            </view>
          </view>

          <view class="main-text">
            {{ item.comments[0].comment_content }}
          </view>
          <view class="tip">
            {{
              $u.timeFormat(
                item.comments[0].comment_time,
                "yyyy年mm月dd日 hh:MM:ss"
              )
            }}
          </view>
          <u-gap height="5" bg-color="#f2f2f2"> </u-gap>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import articlebox from "@/components/article_box.vue";
export default {
  components: {
    articlebox,
  },
  onLoad(options) {
    this.topicId = options.topicId;
    this.init();
  },
  data() {
    return {
      article_info: null,
      commentList: null,
    };
  },
  methods: {
    // 初始化
    init() {
      this.getTopic();
      this.getComment();
    },
    //获取帖子信息
    getTopic() {
      uni.request({
        url: "http://localhost:8001/api/topic/getTopicAll",
        success: (res) => {
          // this.goods = res.data
          res.data.forEach((item) => {
            if (item.topics[0].topic_id == this.topicId) {
              this.article_info = item;
            }
          });
        },
      });
    },
    // 获取评论
    getComment() {
      const data = {
        topicId: this.topicId,
      };
      uni.request({
        url: "http://localhost:8001/api/comment/getCommentsAll",
        data,
        success: (res) => {
          this.commentList = res.data;
        },
      });
    },
    // 页面刷新
    flash(){
      console.log(777);
      this.init()
    }
  },
};
</script>

<style lang="scss" scoped>
.contain-box {
  color: #222222;
  padding: 20rpx;
  background-color: #ffffff;
  .header {
    font-size: 32rpx;
    color: #222222;
  }
  .header-box {
    margin: 20rpx 0;
    display: flex;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .head-img {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        image {
          width: 40rpx;
          height: 40rpx;
          border-radius: 50%;
        }
      }
      .info {
        margin-left: 50rpx;
        .name {
          font-size: 22rpx;
          font-weight: 550;
          margin-bottom: 10rpx;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      .btn {
        color: #ffffff;
        background: linear-gradient(to right, #ff623e, #fcbc27);
        height: 50rpx;
        border-radius: 25rpx;
        font-size: 25rpx;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
        .text {
          margin-left: 8rpx;
        }
      }
    }
  }
  .main-text {
    margin: 40rpx 20rpx 20rpx;
    // margin-top: 40rpx;
    // margin-bottom: 20rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: #222222;
  }
  .tip {
    font-size: 20rpx;
    color: #bfbfbf;
    margin-bottom: 20rpx;
  }
  .img-list-box {
    .row-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 2vw;
      .column-box {
        display: flex;

        .img-single {
          width: 30vw;
          height: 30vw;
        }
      }
    }
  }
  .handle-box {
    display: flex;
    border-top: 1px solid #f2f2f2;
    padding-top: 20rpx;
    view {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .label {
        margin-right: 10rpx;
      }
    }
  }
}
</style>
