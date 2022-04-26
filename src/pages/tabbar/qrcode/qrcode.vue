<template>
  <view class="indexContent">
    <u-top-tips ref="uTips"></u-top-tips>
    <u-select v-model="show" :list="options" @confirm="confirm"></u-select>
    <view class="header">
      <view class="left">
        <view @click="toLastPage">
          <u-icon name="close"></u-icon>
        </view>
      </view>
      <view class="right">
        <div class="btn" @click="saveArticle">发布</div>
      </view>
    </view>
    <view class="text-box">
      <u-field
        v-model="content"
        label-width="0"
        type="textarea"
        placeholder="分享新鲜事儿"
        :border-bottom="false"
      >
      </u-field>
    </view>
    <u-gap height="20" bg-color="#f2f2f2"></u-gap>
    <view class="classify-box">
      <u-section
        :show-line="false"
        :font-size="30"
        :title="classify.label"
        sub-title="选择分区"
        @click="show = true"
      ></u-section>
    </view>
    <u-gap height="20" bg-color="#f2f2f2"></u-gap>
    <view class="img-box">
      
          <!-- <input
            type="file"
            name="ss"
            id="getUrl"
            @change="uploadImg"
            accept="image/jpg,image/jpeg,image/png,image/bmp"
          /> -->
          <!-- style="display: none" -->
          <template v-for="(item,index) in imgUrl">
            <image
              :key="index"
              class="img"
              :src="item"
              @click="clearImg(index)"
              v-if="item"
            ></image>
          </template>

          <view class="img-choose" v-if="imgUrl.length < 9" @click="uploadImg"
            >+</view
          >
        <!-- <view class="img-item" v-for="(item, index) in imgArr" :key="index">
          <image :src="item" @click="lookImg(index)"></image>
        </view> -->
      
    </view>
    <view>
      <u-tabbar
        :hide-tab-bar="false"
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
export default {
  name: "qrcode",
  data() {
    return {
      show: false,
      list: [],
      systemNavHeight: 0,
      dataList: [],
      imgUrl: [],
      content: "",
      classify: {
        label: "求助专区",
        value: 1000000000,
      }, // 分区
      options: [], //分区选项
    };
  },
  onLoad(options) {
    if (!uni.getStorageSync("userId")) {
      uni.navigateTo({ url: "/pages/login/index" });
    }
    this.getClassify();
    this.list = this.$tabList;
  },
  methods: {
    changeTab(res) {
      if (res != 2) {
        this.$changeFun(res);
      }
    },
    // 获取分区
    getClassify() {
      uni.request({
        url: "http://localhost:8001/api/classify/getList",
        success: (res) => {
          res.data.forEach((item) => {
            item.label = item.classify_name;
            item.value = item.classify_id;
            this.options.push(item);
          });
        },
      });
    },
    confirm(e) {
      console.log(e);
      this.classify = e[0];
    },
    saveArticle() {
      if (!this.classify) {
        this.$refs.uTips.show({
          title: "请选择分区",
          type: "warning",
          duration: "1500",
        });
      } else if (!this.content) {
        this.$refs.uTips.show({
          title: "请输入内容",
          type: "warning",
          duration: "1500",
        });
      } else {
        uni.request({
          url: "http://localhost:8001/api/topic/addTopic",
          method: "POST",
          data: {
            userCId: uni.getStorageSync("userId"),
            topicContent: this.content,
            topicTime: new Date().getTime(),
            classifyId: this.classify.value,
            imgUrl: JSON.stringify(this.imgUrl),
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "xmlhttprequest",
          },
          success: (res) => {
            if (res.data === "success") {
              uni.showToast({
                title: "发布成功",
                icon: "success",
                duration: 1000,
              });
              uni.switchTab({
                url: "/pages/tabbar/index/index",
              });
            }
          },
        });
      }
    },
    // 图片上传
    uploadImg() {
      const that = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          uni.uploadFile({
            url: "http://localhost:8001/api/uploadFile",
            filePath: tempFilePaths[0],
            name: "file",
            success: (uploadFileRes) => {
              this.imgUrl.push(uploadFileRes.data)
            },
          });
        },
      });
    },
    clearImg(index) {
      this.imgUrl = this.imgUrl.filter((item,i)=>{
        return index!=i
      });
    },
  },
};
</script>
<style>
page {
  background-color: #ffffff;
}
</style>
<style scoped lang="scss">
.header {
  display: flex;
  padding: 20rpx;
  .left {
    flex: 1;
    view {
      padding: 10rpx;
    }
  }
  .right {
    .btn {
      height: 50rpx;
      padding: 0 20rpx;
      border-radius: 25rpx;
      font-size: 25rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(to right, #2fc1df, #057ed6);
      color: #ffffff;
    }
  }
}
.img-box {
  padding: 20rpx;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.img-choose {
  border: 1rpx dashed #001;
  display: flex;
  justify-content: center;
  line-height: 200rpx;
  height: 200rpx;
  width: 200rpx;
}
.img-choose:hover {
  color: burlywood;
  border-color: burlywood;
}
.img {
  margin: 0rpx 10rpx 20rpx;
  border: 1rpx dashed burlywood;
  width: 200rpx;
  height:200rpx
}
.classify-box {
  padding: 0rpx 40rpx;
  height: 150rpx;
  line-height: 150rpx;
}
</style>
