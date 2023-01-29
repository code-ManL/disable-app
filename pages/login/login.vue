<template>
	<view>
		<view class="login-container">
			<!-- #ifdef MP-ALIPAY || MP-WEIXIN-->
<!-- 			<view class="other-login-way">
				<view class="quick-login">
					<text class="quick-text">快捷登录</text>
				</view> -->
				<!-- @getphonenumber="wxOneLogin"  open-type="getPhoneNumber" -->
<!-- 				<button style="border: 0; background-color: #FBFBFB;" class="flex-button" @click="btn_login()">
					<image class="icon-wechat" src="@/static/images/wechat.png" mode="scaleToFill"></image>
					一键登录
				</button>
			</view> -->
			<!-- #endif -->
			<view class="other-login-way">
			<input class="uni-input" type="number" v-model="tel" placeholder="这是一个手机号" />
			<button style="border: 0; background-color: #FBFBFB;" class="flex-button" @click="btn_login()">
				一键登录
			</button>
			</view>
		</view>
	</view>
</template>
	
<script>
	import auth from "@/apis/auth.js"
	import {
		ACCESS_TOKEN
	} from '@/common/util/constants.js';
     import webSocket from "@/common/util/webSocket.js"
	export default {
		data() {
			return {
				tel:"",
				longitude:"",
				latitude:""
			};
		},
		mounted() {
			 // webSocket.open(this.$store.state.user.loginUser.userId);
			// uni.reLaunch({
			//     url:"/pages/recomment/recomment"
			// });
			
            if(uni.getStorageSync(ACCESS_TOKEN)){
                if(uni.getStorageSync("userData")){
                   this.$store.commit('user/SETLOGINUSER',uni.getStorageSync("userData"));
                }
                //创建webSocket;
                webSocket.open(this.$store.state.user.loginUser.userId);
                uni.reLaunch({
                    url:"/pages/recomment/recomment"
                });
            }else{
                //获取授权码
                // #ifdef MP-ALIPAY || MP-WEIXIN
                 this.get_local();
                // #endif
                // #ifdef  APP-PLUS
                this.getPhoneCardDetail();
                // plus.ios.importClass()
                // #endif
            }
		},
		methods: {
			get_local(){
				let _that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						_that.longitude= res.longitude;
						_that.latitude=res.latitude;
					}
				});
			},
			//获取当前手机手机卡信息
			getPhoneCardDetail() {
				uni.preLogin({
					provider: 'univerify',
					success: (e) => {
						uni.login({
							provider: 'univerify',
							univerifyStyle: { // 自定义登录框样式
								fullScreen: true
							},
							success: (res) => { // 登录成功
								console.log(res)
								uniCloud.callFunction({
									name: 'getPhoneNumber', // 云函数名称
									data: { //传给云函数的参数
										'access_token': res.authResult
										.access_token, // 客户端一键登录接口返回的access_token
										'openid': res.authResult
											.openid // 客户端一键登录接口返回的openid
									},
									success(callRes) {
										// 此处可获得手机号，调用后端接口
										console.log(callRes.result.data);
										
										uni.redirectTo({
											url: "/pages/recomment/recomment"
										})
									},
									fail(callErr) {
										console.log('调用云函数出错', callErr)
									},
									complete() {
										uni.closeAuthView() //关闭授权登录界面
									}
								})
							}
						})

					},
					fail(res) {
						console.log(res)
						// 预登录失败
						//如果手机没有插入有效的sim卡，或者手机蜂窝数据网络关闭，
						//都有可能造成预登录校验失败。
					}
				})
			},
			wxGetUserInfo() {
				let _that = this;
				uni.login({
					scopes: 'auth_user',
					success: res => {
						var code = res.code;
					}
				})
			},
			btn_login(){
				if(this.longitude==""){
					this.$tip.confirm("请获取定位").then(()=>{
						this.get_local()
					})
					return
				}
				uni.showLoading({
					title:"正在登陆"
				})
				auth.login({
					tel:this.tel,
					longitude:this.longitude,
					latitude:this.latitude
				}).then((res)=>{
                    //登录成功token
					uni.setStorageSync(ACCESS_TOKEN,res.data.data.token);
                    uni.setStorageSync("userData",res.data.data.user);
                    //保存用户信息
                    webSocket.open(res.data.data.user.userId);
                this.$store.commit('user/SETLOGINUSER',res.data.data.user);
				   setTimeout(()=>{
					   uni.hideLoading()
					   uni.reLaunch({
					       url:"/pages/recomment/recomment"
					   })
				   },2000)
		
				}).catch(()=>{
					 uni.hideLoading()
				})
			}

		},
	};
</script>
<style scoped lang="scss">
	@import url("./login.css");
	
	.uni-input{
		height: 100rpx;
		margin-bottom: 30rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 0 20rpx;
		border: 1rpx solid #e3e3e3;
	}
	
	.flex-button{
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	
</style>
