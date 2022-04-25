import App from './App'

import {tabList,changeLastPage,changeAuthorStatus} from './common/js/utils/methods';
 //底部导航
 Vue.prototype.$tabList = tabList //tabbar列表方法
 Vue.prototype.$lastPage = 0 //当前tabbar点击的上一个页面
 Vue.prototype.$changeFun =  changeLastPage
 
// #ifndef VUE3
import Vue from 'vue'

import uView from 'uview-ui';
Vue.use(uView);

Vue.config.productionTip = false 
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif