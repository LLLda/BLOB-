<template>
  <view class="d-flex flex-column">
    <view class="container flex-fill form">
      <view class="avatar-box">
        <u-avatar
          :src="userInfo.userC_imgUrl"
          size="large"
          @click="changeAvatar"
        ></u-avatar>
      </view>
      <list-cell :hover="false">
        <view class="form-input w-100 d-flex align-items-center">
          <view class="label">昵称</view>
          <view class="input flex-fill">
            <input
              type="text"
              placeholder="请填写昵称"
              placeholder-class="text-color-assist font-size-base"
              v-model="userInfo.userC_name"
            />
          </view>
        </view>
      </list-cell>
      <list-cell :hover="false">
        <view class="form-input w-100 d-flex align-items-center">
          <view class="label">新密码</view>
          <view class="input flex-fill">
            <input type="text" v-model="userInfo.userC_pwd" />
          </view>
        </view>
      </list-cell>
      <list-cell :hover="false">
        <view class="form-input w-100 d-flex align-items-center">
          <view class="label">性别</view>
          <view class="input flex-fill">
            <view class="radio-group">
              <view
                class="radio"
                :class="{ checked: userInfo.userC_sex == '1' }"
                style="margin-right: 10rpx"
                @click="userInfo.userC_sex = 1"
                >先生</view
              >
              <view
                class="radio"
                :class="{ checked: userInfo.userC_sex == '0' }"
                @click="userInfo.userC_sex = 0"
                >女士</view
              >
            </view>
          </view>
        </view>
      </list-cell>
      <list-cell>
        <view class="form-input w-100 d-flex align-items-center">
          <view class="label">年龄</view>
          <view class="input flex-fill">
            <input type="number" v-model="userInfo.userC_age" />
          </view>
        </view>
      </list-cell>
      <list-cell>
        <view class="form-input w-100 d-flex align-items-center">
          <view class="label">认证学生</view>
          <view class="input flex-fill">
            <input
              type="text"
              :value="userInfo.userC_realName"
              disabled
              v-if="userInfo.userC_realStatus"
            />
            <input
              type="text"
              value="暂未认证"
              disabled
              v-else
              @click="showReal"
            />
          </view>
        </view>
      </list-cell>
    </view>
    <u-gap height="20" bg-color="#f2f2f2"></u-gap>
    <view class="btn-box d-flex align-items-center just-content-center">
      <button type="primary" class="save-btn" @tap="save">保存</button>
    </view>
    <u-popup v-model="show" mode="bottom" border-radius="14" height="400rpx">
      <view class="real-box">
        姓名:
        <u-input v-model="realInfo.name" placeholder="请输入姓名" type="text" />
        学号:
        <u-input
          v-model="realInfo.number"
          placeholder="请输入学号"
          type="number"
        />
        <u-button @click="checkReal" size="medium" :plain="true">认证</u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import listCell from "@/components/list-cell/list-cell";

export default {
  components: {
    listCell,
  },
  data() {
    return {
      userNow: {}, // 暂存用户信息
      userInfo: "", // 用户信息
      show: false, // 弹窗展开标志
      realInfo: {
        name: "",
        number: "",
      }, // 认证信息
    };
  },
  computed: {},
  onShow() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      uni.request({
        url: "http://localhost:8001/api/userC/getUserCById",
        data: {
          userCId: uni.getStorageSync("userId"),
        },
        success: (res) => {
          this.userNow = JSON.parse(JSON.stringify(res.data[0]));
          this.userInfo = JSON.parse(JSON.stringify(res.data[0]));
          this.userInfo.userC_pwd = null;
        },
      });
    },
    // 认证弹窗
    showReal() {
      this.show = true;
    },
    // 信息认证
    checkReal() {
      uni.request({
        url: "http://localhost:8001/api/real/checkRealInfo",
        method: "POST",
        data: {
          userCId: uni.getStorageSync("userId"),
          realName: this.realInfo.name,
          realNumber: Number(this.realInfo.number),
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "xmlhttprequest",
        },
        success: (res) => {
          if (res.data === true) {
            uni.showToast({
              title: "认证成功",
              icon: "success",
              duration: 1000,
            });
            thids.show = false;
            this.getUserInfo();
          } else {
            uni.showToast({
              title: "认证失败",
              icon: "error",
              duration: 1000,
            });
          }
        },
      });
    },
    // 提交修改信息
    save() {
      if(this.userInfo.userC_name && this.userInfo.userC_age && this.userInfo.userC_sex){
      uni.request({
        url: "http://localhost:8001/api/userC/editUserCById",
        method: "POST",
        data: {
          userCId: uni.getStorageSync("userId"),
          userCPwd: this.userInfo.userC_pwd || this.userNow.userC_pwd,
          userCName: this.userInfo.userC_name || this.userNow.userC_name,
          userCAge:
            this.userInfo.userC_age === null
              ? this.userNow.userC_age
              : this.userInfo.userC_age,
          userCSex:
            this.userInfo.userC_sex === null
              ? this.userNow.userC_sex
              : this.userInfo.userC_sex,
          userCImgUrl: this.userInfo.userC_imgUrl || this.userNow.userC_imgUrl,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "xmlhttprequest",
        },
        success: (res) => {
          if (res.data === "success") {
            uni.showToast({
              title: "修改信息成功",
              icon: "success",
              duration: 1000,
            });
            uni.switchTab({ url: "/pages/tabbar/personal/index" });
          } else {
            uni.showToast({
              title: "修改失败",
              icon: "error",
              duration: 1000,
            });
          }
        },
      });
      }else{
        uni.showToast({
              title: "信息未填写完整",
              icon: "error",
              duration: 1000,
            });
      }
    },
    // 上传头像
    changeAvatar() {
      uni.chooseImage({
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          uni.uploadFile({
            url: "http://localhost:8001/api/uploadFile",
            filePath: tempFilePaths[0],
            name: "file",
            success: (uploadFileRes) => {
              this.userInfo.userC_imgUrl = uploadFileRes.data;
            },
          });
        },
      });
    },
  },
};
</script>

<style scoped>
page {
  height: 100%;
}

.container {
  padding: 20rpx 30rpx;
}

.form {
  border-radius: 8rpx;
}

.label {
  width: 160rpx;
  font-size: 28rpx;
  color: #5a5b5c;
}

.input {
}

.radio-group {
  display: flex;
  justify-content: flex-start;
}
.radio {
  padding: 10rpx 30rpx;
  border-radius: 6rpx;
  border: 2rpx solid #919293;
  color: #919293;
  font-size: 28rpx;
}
.checked {
  background-color: #adb838;
  color: #fff;
  border: 2rpx solid #adb838;
}

.btn-box {
  margin-top: 20rpx;
  height: calc((100vh - 40rpx) / 2);
}

.save-btn {
  width: 90%;
  border-radius: 50rem !important;
  font-size: 32rpx;
}
.real-box {
  padding: 20rpx 30rpx;
}
.avatar-box {
  padding: 40rpx 0 0;
  display: flex;
  justify-content: center;
}
</style>
