<template>
	<view>

		<view class="login-container">
			<!-- 上部分盒子 -->
			<view class="login-top">
				<!-- 图标 -->
				<uni-icons type="contact-filled" size="100" color="pink"></uni-icons>
				<!-- 应用名称 -->
				<span>残疾人约吧</span>
				<!-- 宣言 -->
				<p>找到你的知心恋人</p>
			</view>
			<!-- 登录按钮盒子 -->
			<view class="login-main">
				<!-- 跳转按钮 -->
				<button @click="pass" :style="btnStyle"><text>{{phoneNumber}}</text> 一键登录</button>
				<button @click="userOtherPhone">使用其他手机号</button>
				<p>未注册手机验证后将自动注册</p>
				<span  @click="userOtherPhone">
					<img src="@/static/images/wechat.png" alt="">
				</span>
			</view>
			<!-- 下部分登录 -->
			<view class="login-bottom">
				<checkbox :checked="argeeDeal" @click="argeeDeal = !argeeDeal"></checkbox>
				<!-- <p>我已阅读并同意<span> 《中国移动号码服务条款》</span>、<span> 《用户协议》</span>和<span> 《隐私政策》</span></p> -->
				<p>我已阅读并同意<text>《中国移动号码服务条款》</text>、<text>《用户协议》</text>和<text> 《隐私政策》</text></p>
			</view>
		</view>
				
		<view>
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff">
				<view class="popup-content">
					<view class="">
						<view class="exit">
							<i class="iconfont icon-quxiao" @click="btnClose"></i>
						</view>
						<view class="content">
							<view class="text">
								<p>请阅读并同意以下条款</p>
								<p><text>《中国移动号码服务条款》</text>、<text>《用户协议》</text>和<text> 《隐私政策》</text></p>
							</view>
							<view class="button-box">
								<button @click="changeAgree">同意并继续</button>
							</view>
						</view>
					</view>	
				</view>				
			</uni-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: '124235****424',
				argeeDeal: false, //复选框协议同意
				btnStyle: '', //按钮改变变色的样式
			};
		},
		methods: {
			// 同意并关闭弹窗
			btnClose(){
				this.$refs.popup.close()
			},
			// 下一步
			pass() {
				// 未同意协议
				if(!this.argeeDeal)
					this.$refs.popup.open('bottom')
				else{
					this.$emit('pass', this.phoneNumber)
				}					
				
			},
			//使用其他手机号
			userOtherPhone(){
				this.$showMsg('未开放')
			},
			//点击同意协议
			changeAgree() {
				this.argeeDeal = true				
				this.btnClose()
			},
		},
	}
</script>

<style lang="scss" scoped>	
	.login-container {
		background: linear-gradient(-135deg, pink, #fff, #fff, #fff);

		.login-top {
			height: 45vh;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			font-weight: bold;

			span {
				font-size: 25px;
				font-family: '华文行楷';
			}

			p {
				margin-top: 10px;
				font-size: 12px;
				color: #ccc;
				font-family: kaiti;
			}
		}

		.login-main {
			height: 45vh;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			button {
				width: 80%;
				outline: none;
				border: none;
				line-height: 120rpx;
				height: 120rpx;
				font-size: 14px;
				margin-bottom: 30rpx;
				border-radius: 15px;
				color: #777;
				
				text{
					font-size: 13px;
					margin-right: 10rpx;
				}
			}

			button:first-child {
				background-color: darkorange;
				color: #fff;
			}

			button:last-child {
				background-color: #eeeeee;
			}

			p {
				font-size: 12px;
				color: #777;
			}

			span {
				display: inline-block;
				margin-top: 30px;
				height: 40px;
				width: 40px;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #eeeeee;
				border-radius: 15px;

				img {
					height: 20px;
					width: 20px;
				}
			}
		}

		.login-bottom {
			height: 10vh;
			width: 80%;
			margin: 0 auto;
			font-size: 12px;
			color: #ccc;
			display: flex;
			justify-content: center;
			align-items: center;
			
			p {

				// white-space:nowrap;
				text {
					display: inline-block;
					color: #777;
				}
			}


		}


	}

	.popup-content {
		background-color: #999999;
	
		&>view{
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;
			
			.exit{
				width: 100%;
				height: 80rpx;
				line-height: 80rpx;
				
				i{
					float: right;
					margin-right: 40rpx;
					font-size: 18px;
					color: #ccc;
					font-weight: bold;
				}
			}
			
			.content{
				padding: 0 80rpx;
								
				.text{
					margin-bottom: 80rpx;
					p:first-child{
						font-weight: bold;
						font-size: 22px;
					}
					
					p:nth-child(2){
						font-size: 12px;
						color: #999999;
						margin-top: 20rpx;						
						
						text{
							font-weight: bold;
						}
					}
				}
			}
			
			.button-box{
				margin-bottom: 90rpx;
				
				button{
					height: 100rpx;
					line-height: 100rpx;
					background-color: darkorange;
					border-radius: 20rpx;
					color: #fff;
					font-size: 14px;
				}
			}
		}
	}
</style>
