
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from './store'
import tip from './common/util/tip.js'
//封装弹框的方法
Vue.prototype.$showMsg = function(title = '功能未完善！', duration = 1500) {
	uni.showToast({
		title, duration, icon: 'none'
	})
}
// tip
Vue.prototype.$tip = tip;


Vue.config.productionTip = false
Vue.prototype.vuex_uploadAction = "http://222.177.66.230:9898/upload";
Vue.prototype.webSocketApi = "ws://222.177.66.230:8081/websocket/";

import cuCustom from './components/colorui/components/cu-custom.vue'
Vue.component('mover', cuCustom)

//根据经纬度计算距离
Vue.prototype.$space = function(lat1, lng1) {
    let lat2;
    let lng2;
    if(store.state.common.moreInfo.personBasicInfo){
         lat2=Number(store.state.common.moreInfo.personBasicInfo.latitude);
         lng2=Number(store.state.common.moreInfo.personBasicInfo.longitude);
    }
    if(lat1&&lng1&&lat2&&lng2){
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(
            Math.sin(b / 2), 2)));
        s = s * 6378.137;
        s = Math.round(s * 10000) / 10000;
        if(s<100){
             return "100m以内" // 单位千米
        }else if(s<1000){
            return "1km" // 单位千米
        }else{
             return s.toFixed(0)+"km" // 单位千米
        }
       
    }else{
        return "暂无位置"
    }

}


App.mpType = 'app'

const app = new Vue({
	store,
    ...App,
	beforeCreate() {
		Vue.prototype.$bus = this
	}
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
