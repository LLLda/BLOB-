import Vue from 'vue';
// import constant from "@/common/js/utils/constant";

const tabList = [
    {
        iconPath: '../../../static/tab-home.png',
        selectedIconPath: "../../../static/tab-home-current.png",
        text: '首页',
        // count: 2,
        isDot: false,
        customIcon: true,
        pagePath: '/pages/tabbar/index/index'
    },
    {
        iconPath: "../../../static/tab-cate.png",
        selectedIconPath: "../../../static/tab-cate-current.png",
        text: '分区',
        customIcon: true,
        pagePath: '/pages/tabbar/classification/index'
    },
    {
        iconPath: "../../../static/tab-qrCode.png",
        selectedIconPath: "../../../static/tab-qrCode-current.png",
        midButton: true,
        customIcon: true,
        text: '发布',
        pagePath: '/pages/tabbar/qrcode/qrcode'
    },
    {
        iconPath: "../../../static/tab-new.png",
        selectedIconPath: "../../../static/tab-new-current.png",
        text: '礼品',
        customIcon: true,
        pagePath: '/pages/tabbar/message/index'
    },
    {
        iconPath: "../../../static/tab-my.png",
        selectedIconPath: "../../../static/tab-my-current.png",
        text: '我的',
        // count: 23,
        isDot: false,
        customIcon: true,
        pagePath: '/pages/tabbar/personal/index'
    }
]

//缓存上一个点击的导航下标
const changeLastPage = (val) => {
    Vue.prototype.$lastPage = val;
}


//改变授权状态
const changeAuthorStatus = (status)=>{
    console.log(status,'======>>>');
    constant.setUserAuthor(status);
}

module.exports = {
    tabList:tabList,
    changeLastPage,
    changeAuthorStatus
}

