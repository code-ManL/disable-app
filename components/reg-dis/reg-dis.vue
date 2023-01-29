<template>
	<view>
		<view class="message-info">
			<view class="img-logo">
				<uni-transition mode-class="zoom-in" :show="true">
					<uni-icons type="contact-filled" size="40" color="pink"></uni-icons>
				</uni-transition>
			</view>
			<view class="">
				<uni-transition mode-class="fade" :show="showIndex > 0">
					<view class="">
						<text>最后一步，上传残疾人证明材料。（残疾证号或者证件正反照）</text>
					</view>
				</uni-transition>			
			</view>
			<uni-transition mode-class="fade" :show="showIndex > 1">
				<view class="tip">
					<text>小助手温馨提示：不上传材料不能进行交友噢~</text>
				</view>
			</uni-transition>			
		</view>
		<uni-transition mode-class="zoom-in" :show="showIndex > 2">
			<view class="message-bottom">
				<button class="mini-btn" type="warn" size="mini" @click="show">提交残疾证号</button>
				<button class="mini-btn" type="warn" size="mini" @click="show">提交残疾证照片</button>
				<button class="login" @click="login">注册完成！</button>
			</view>
		</uni-transition>		
	</view>
</template>

<script>
	export default {
		props:['data'],
		data() {
			return {
				showIndex: 0
			}
		},
		methods: {
			login() {
				this.data.disNumber = ''
				this.data.disImg = ''
				console.log(this.data);
				uni.switchTab({
					url: '/pages/home/home'
				})
				this.$showMsg("登录成功！")
			},
			show() {
				this.$showMsg('未开放')
			},
			// 延时动画
			delay() {
				let $this = this
				var i = 0;

				function delay_exec() {
					if ((i++) < 3) {
						setTimeout(function() {
							$this.showIndex++
							return delay_exec();
						}, 1000);
					}
				}

				delay_exec();
			}
		},
		mounted() {
			this.delay()
		}
	}
</script>

<style lang="scss" scoped>
	.message-info {
		padding: 20px 20px 0 20px;
		font-size: 14px;

		&>view {
			margin-top: 10px;

			view {
				margin-top: 10px;
				width: 80%;
				line-height: 30px;
				background-color: #fff;
				padding: 3px 10px;
				border-radius: 10px;
			}
		}

		.tip {
			margin-top: 10px;

			text {
				display: inline-block;
				font-size: 12px;
				background-color: #ccc;
				color: #fff;
				line-height: 25px;
				border-radius: 5px;
				padding: 0 10px;
			}
		}
	}

	.message-bottom {
		margin-top: 30px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		height: 150px;

		button {
			width: 60%;
			height: 40px;
			line-height: 40px;
		}

		button:last-child {
			background-color: darkorange;
			color: #fff;
		}

	}
</style>
