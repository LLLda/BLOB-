<template>
  <view class="contain-box">
    <view class="header-box">
      <view class="left">
        <view class="head-img">
          <u-image
            width="70rpx"
            height="70rpx"
            border-radius="35rpx"
            :src="article_info.userCS[0].userC_imgUrl"
          ></u-image>
        </view>
        <view class="info">
          <view class="name">
            {{ article_info.userCS[0].userC_name }}
          </view>
          <view class="tip">
            {{
              $u.timeFormat(
                article_info.topics[0].topic_time,
                "yyyy年mm月dd日 hh:MM:ss"
              )
            }}
            <!-- 来自{{article_info.machine}} -->
          </view>
        </view>
      </view>
      <!-- <view class="right">
				<view class="btn">
					<u-icon name="plus" color="#FFFFFF"></u-icon>
					<span class="text">
						关注
					</span>
					
				</view>
			</view> -->
    </view>
    <view @click="toTopic(article_info)">
      <view class="main-text">
        {{ article_info.topics[0].topic_content }}
      </view>
      <view class="" v-if="article_info.topics[0].topic_imgUrl">
        <u-grid :col="3" :border="false" v-if="article_info.topics[0].topic_imgUrl != null">
          <u-grid-item v-for="(item, index) in JSON.parse(article_info.topics[0].topic_imgUrl)"
						:key="index">
            <!-- v-for="(item, index) in article_info.imgList"
						:key="index" -->
            <u-image
              width="200rpx"
              height="200rpx"
              border-radius="10rpx"
              :src="item"
            ></u-image>
          </u-grid-item>
        </u-grid>
      </view>
    </view>
    <view style="clear: both"></view>
    <view class="handle-box">
      <view @click="like" v-if="!isLike">
        <span class="label">
          <u-icon name="thumb-up"></u-icon>
        </span>
        <span> 点赞 ({{ likeCount }}) </span>
      </view>
      <view v-else @click="dislike">
        <span class="label">
          <u-icon name="thumb-up-fill"></u-icon>
        </span>
        <span style="color: black"> 点赞 ({{ likeCount }}) </span>
      </view>
      <view @click="comment(article_info.topics[0].topic_id)">
        <span class="label">
          <u-icon name="chat"></u-icon>
        </span>
        <span> 评论 ({{ article_info.comments + t }}) </span>
      </view>
      <view @click="collect" v-if="!isCollect">
        <span class="label">
          <u-icon name="star"></u-icon>
        </span>
        <span> 收藏({{ collectCount }}) </span>
      </view>
      <view v-else @click="delcollect">
        <span class="label">
          <u-icon name="star-fill"></u-icon>
        </span>
        <span style="color: black"> 收藏({{ collectCount }}) </span>
      </view>
    </view>
    <view>
      <u-popup
        v-model="show"
        mode="bottom"
        border-radius="14"
        :height="popupHeight"
      >
        <view class="popup-box">
          <view class="popup-header" v-if="!type"> 最近评论 </view>
          <scroll-view scroll-y="true" style="height: 500rpx" v-if="!type">
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
                    <view class="tip">
                      {{
                        $u.timeFormat(
                          item.comments[0].comment_time,
                          "yyyy年mm月dd日 hh:MM:ss"
                        )
                      }}
                      <!-- 来自{{article_info.machine}} -->
                    </view>
                  </view>
                </view>
              </view>

              <view class="main-text">
                {{ item.comments[0].comment_content }}
              </view>
            </view>
          </scroll-view>
          <view>
            <u-input
              v-model="value"
              type="textarea"
              border="true"
              autoHeight="false"
              height="200rpx"
              maxlength="100"
            />
          </view>
          <u-button
            @click="addComment"
            class="commentBtn"
            size="medium"
            :plain="true"
            >评论</u-button
          >
        </view>
      </u-popup>
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
export default {
  name: "article_box",
  mounted() {
    if (this.type) {
      this.popupHeight = "400rpx";
    }
    this.checkLike();
    this.checkCollect();
  },
  props: {
    article_info: {
      type: Object,
    },
    type: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isLike: false,
      isCollect: false,
      likeCount: this.article_info.likes, // Like计数
      collectCount: this.article_info.collects, // collect计数
      t: 0, // 评论计数
      show: false,
      commentList: [],
      value: "", // 评论内容
      popupHeight: "900rpx",
    };
  },
  methods: {
    getImgList(list) {
      let newList = [[]];
      for (let i = 0; i < list.length; i++) {
        newList[newList.length - 1].push(list[i]);
        if ((i + 1) % 3 == 0) {
          newList.push([]);
        }
      }
      return newList;
    },
    // 跳转详情页
    toTopic(info) {
      uni.navigateTo({
        url: `/pages/topic/index?topicId=${info.topics[0].topic_id}`,
      });
    },
    // 是否已点赞
    checkLike() {
      const data = {
        userCId: uni.getStorageSync("userId"),
        topicId: this.article_info.topics[0].topic_id,
      };
      uni.request({
        url: "http://localhost:8001/api/like/checkLike",
        data,
        success: (res) => {
          this.isLike = res.data;
        },
      });
    },
    // 点赞
    like() {
      const data = {
        userCId: uni.getStorageSync("userId"),
        topicId: this.article_info.topics[0].topic_id,
      };
      uni.request({
        url: "http://localhost:8001/api/like/addLike",
        data,
        success: (res) => {
          this.isLike = true;
          this.likeCount += 1;
        },
      });
    },
    // 取消点赞
    dislike() {
      const data = {
        userCId: uni.getStorageSync("userId"),
        topicId: this.article_info.topics[0].topic_id,
      };
      uni.request({
        url: "http://localhost:8001/api/like/delLike",
        data,
        success: (res) => {
          this.isLike = false;
          this.likeCount -= 1;
        },
      });
    },
    // 是否已收藏
    checkCollect() {
      const data = {
        userCId: uni.getStorageSync("userId"),
        topicId: this.article_info.topics[0].topic_id,
      };
      uni.request({
        url: "http://localhost:8001/api/collect/checkCollect",
        data,
        success: (res) => {
          this.isCollect = res.data;
        },
      });
    },
    // 收藏
    collect() {
      const data = {
        userCId: uni.getStorageSync("userId"),
        topicId: this.article_info.topics[0].topic_id,
      };
      uni.request({
        url: "http://localhost:8001/api/collect/addCollect",
        data,
        success: (res) => {
          this.isCollect = true;
          this.collectCount += 1;
        },
      });
    },
    // 取消收藏
    delcollect() {
      const data = {
        userCId: uni.getStorageSync("userId"),
        topicId: this.article_info.topics[0].topic_id,
      };
      uni.request({
        url: "http://localhost:8001/api/collect/delCollect",
        data,
        success: (res) => {
          this.isCollect = false;
          this.collectCount -= 1;
        },
      });
    },
    // 展开评论
    comment(id) {
      this.show = true;
      const data = {
        topicId: id,
      };
      uni.request({
        url: "http://localhost:8001/api/comment/getCommentsAll",
        data,
        success: (res) => {
          this.commentList = res.data;
        },
      });
    },
    // 提交评论
    addComment() {
      const data = {
        topicId: this.article_info.topics[0].topic_id,
        userCId: uni.getStorageSync("userId"),
        commentContent: this.value,
        commentTime: new Date().getTime(),
      };
      uni.request({
        url: "http://localhost:8001/api/comment/addComment",
        method: "POST",
        data,
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "xmlhttprequest",
        },
        success: (res) => {
          if (this.type) {
            this.$emit("flash",0);
          }
          this.value = "";
          this.comment(this.article_info.topics[0].topic_id);
          if(!this.type){
            this.t += 1;
          }
          this.$refs.uToast.show({
            title: "评论成功",
            type: "success",
            icon: true,
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.contain-box {
  color: #222222;
  padding: 20rpx;
  background-color: #ffffff;
  .header-box {
    display: flex;
    .left {
      flex: 1;
      display: flex;
      align-items: center;
      .head-img {
        width: 70rpx;
        height: 70rpx;
        border-radius: 50%;
        image {
          width: 70rpx;
          height: 70rpx;
          border-radius: 50%;
        }
      }
      .info {
        margin-left: 15rpx;
        .name {
          font-size: 32rpx;
          font-weight: 550;
          margin-bottom: 10rpx;
        }
        .tip {
          font-size: 23rpx;
          color: #bfbfbf;
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
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    font-size: 26rpx;
    font-weight: 500;
    color: #222222;
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
.popup-box {
  padding: 20rpx 30rpx 10rpx;
}
.popup-header {
  padding: 20rpx 0rpx 10rpx;
  font-size: 25rpx;
  font-weight: bold;
}
.commentBtn {
  position: absolute;
  bottom: 50rpx;
  right: 30rpx;
  margin-top: 20rpx;
}
</style>
