<script>
	import Vue from 'vue'
	import webSocket from "@/common/util/webSocket.js"
	import {
		ACCESS_TOKEN
	} from '@/common/util/constants.js';
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success: function(e) {
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
				}
			});
		},
			onShow: function() {
				if(uni.getStorageSync(ACCESS_TOKEN)){
			    if(uni.getStorageSync("userData")){
			       this.$store.commit('user/SETLOGINUSER',uni.getStorageSync("userData"));
			    }
			    //创建webSocket;
			    // webSocket.open(this.$store.state.user.loginUser.userId);
			}
		},
		onHide: function() {}
		}
</script>

<style lang="scss">
	/*每个页面公共css */
	// @import url("@/static/icon/iconfont/iconfont.css");
	// @import url("@/static/icon/iconfont2/iconfont.css");
	// @import '@/uni_modules/uni-scss/index.scss';
 //    @import "components/colorui/main.css";
 //    @import "components/colorui/icon.css";
 //    @import "components/colorui/animation.css";
	// @import '@/static/customicons.css';
	// 设置整个项目的背景色
</style>
