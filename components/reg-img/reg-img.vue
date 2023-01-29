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
						<text>选择或者拍摄一张照片作为你的用户头像。</text>
					</view>
				</uni-transition>
			</view>
			
			<uni-transition mode-class="fade" :show="showIndex > 1">
				<view class="tip">
					<text>提示：头像必须为真实人像，拍摄美美的更有利于介绍自己哦！</text>
				</view>
			</uni-transition>
		</view>
		<uni-transition mode-class="zoom-in" :show="showIndex > 2">
			<view class="message-bottom">
				<view class="img-user">
					<img :src="img" alt="" v-if="img">
					<uni-icons type="contact-filled" size="100" color="pink" v-else></uni-icons>
				</view>
				<view class="chooseImg">
					<span @click="chooseCamera">
						<uni-icons type="camera-filled" size="40" color="pink"></uni-icons>
					</span>
					<span @click="chooseAlbum">
						<uni-icons type="image" size="40" color="pink"></uni-icons>
					</span>
				</view>
				<view class="btnSure" @click="pass">
					<button>确定</button>
				</view>
			</view>
		</uni-transition>
		

	</view>
</template>

<script>
	export default {
		name: "reg-img",
		data() {
			return {
				showIndex: 0,
				success: false, //上传成功
				img: ''
			};
		},
		methods: {
			// 拍照
			chooseimage() {
				var that = this;
				wx.showActionSheet({
					itemList: ['从相册中选择', '拍照'],
					itemColor: "darkorange",
					success: function(res) {
						if (!res.cancel) {
							if (res.tapIndex == 0) {
								that.chooseWxImage('album')
							} else if (res.tapIndex == 1) {
								that.chooseWxImage('camera')
							}
						}
					}
				})
			},
			chooseAlbum(){
				this.chooseWxImage('album')
			},
			chooseCamera(){
				this.chooseWxImage('camera')
			},
			// 调用微信图片
			chooseWxImage(type) {
				var that = this;
				wx.chooseImage({
					sizeType: ['original', 'compressed'],
					sourceType: [type],
					success: function(res) {
						console.log(res);
						// tempFilePath可以作为img标签的src属性显示图片
						that.img = res.tempFilePaths[0]
					}
				})
			},
			pass() {
				this.$emit('pass', this.img)
			},
			show() {
				this.$showMsg("未开放")
			},
			// 延时动画
			delay() {
				let $this = this
				var i = 0;

				function delay_exec() {
					if ((i++) < 5) {
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
		justify-content: center;
		align-items: center;
		flex-direction: column;

		&>view {
			margin-bottom: 20px;
		}

		.img-user {
			img {
				height: 80px;
				width: 80px;
				border-radius: 50%;
			}
		}

		.chooseImg {
			width: 100%;
			display: flex;
			justify-content: space-around;

			span {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 50px;
				width: 50px;
				border: 1px solid #eee;
				border-radius: 50%;
				box-shadow: 2px -1px 1px #fae2dd;
			}
		}

		.btnSure {
			height: 40px;
			width: 80%;

			button {
				border-radius: 10px;
				background-color: darkorange;
				font-size: 14px;
				color: #fff;
			}
		}
	}
</style>
