<template>
	<view class="root">
		<mover></mover>

		<!-- 头部 -->
		<view class="header">
			<view class="left" @click="gotoBack">
			        <uni-icons type="back" size="25"></uni-icons>
				<text>我的特权</text>
			</view>
		</view>

		<!--  -->
		<view class="cards">
			<view class="card-vip">
				<view class="vip-innerbox">
					<view class="vip-top">
						<text><text>VIP</text> 会员</text>
					</view>
					<view class="vip-bottom">
						<image :src="data.headPicPath" alt="">
							<text v-if="!isVip">暂未激活会员</text>
							<text v-else>会员用户<text style="margin-left: 10rpx;">会员到期 {{vipDuring}}</text></text>
					</view>
				</view>
			</view>
		</view>

		<!-- 充值卡片 -->
		<view class="cardChoose" v-if="!isVip || isBuy">
			<view :class="'choose-item ' + (chooseVip.id == item.id ? 'choose-active' : '') "
				v-for="(item, i) in vipPrice" :key="i" @click="changeVip(i)">
				<text class="one"><text>{{item.time}}</text>个月</text>
				<text class="two">￥{{item.price}}/月</text>
				<text class="three">￥{{(item.time * item.price).toFixed(0)}}</text>
				<view class="name">{{item.name}}</view>
			</view>
		</view>

		<!-- 续费 -->
		<view class="choosePro" v-if="!isVip">
			<checkbox :checked="checked" color="darkorange" />
			<text>
				同意
				<text>《自动续费协议》</text>
				<text>最高可享三倍加速配对</text>
				，到期后以{{chooseVip.totalPrice}}元/{{chooseVip.name}}自动续费，可随时取消
			</text>
		</view>

		<!-- 按钮 -->
		<view class="xufei" v-if="isVip && !isBuy">
			<text @click="isBuy = true">继续充值</text>
			<text @click="closeChecked">关闭续费</text>
		</view>

		<!-- 特权 -->
		<view class="privileges">
			<view class="privilege-title">
				<text>VIP特权</text>
			</view>
			<view class="privilege-list">
				<view class="privilege-item" v-for="(item, i) in privileges" :key="i">
					<image :src="item.icon" alt="">
						<view class="item-right">
							<h3>{{item.name}}</h3>
							<p>{{item.description}}</p>
						</view>
				</view>
			</view>
		</view>

		<!-- 购买 -->
		<view class="buy" v-if="!isVip || isBuy">
			<view class="buy-top" v-if="isWechat" @click="isWechat = false">
				<view class="top-left">
					<image src="../../static/images/wechat.png" alt="" mode="aspectFill">
						<text>微信</text>
				</view>
				<view class="top-right">
					<uni-icons type="forward" size="25" color="#777"></uni-icons>
				</view>
			</view>
			<view class="buy-top" v-else @click="isWechat = true">
				<view class="top-left">
					<image src="../../static/images/pay.png" alt="" mode="aspectFill">
						<text>支付宝</text>
				</view>
				<view class="top-right">
					<uni-icons type="forward" size="25" color="#777"></uni-icons>
				</view>
			</view>
			<view class="buy-btn">
				<button @click="openVip" v-if="!isVip">
					<text class="price">￥{{chooseVip.totalPrice}}</text>
					<text>立即购买</text>
				</button>
				<button @click="renewalVip" v-else>
					<text class="price">￥{{chooseVip.totalPrice}}</text>
					<text>立即续费</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import my from '@/apis/my.js'
	import {
		returnDuringTime
	} from '@/apis/tools.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				// 是否是微信
				isWechat: true,
				// 勾选同意协议
				checked: true,

				isVip: false, //vip的判断
				isBuy: false, //继续付费

				vipPrice: [],
				data: {},

				// 选择的vip
				chooseVip: {},
				vipTime: '', //过期时间

				// vip特权
				privileges: [{
						icon: '../../static/icon/active/privilege/view.png',
						name: '查看谁喜欢你',
						description: '可以随时随地查看心仪的朋友'
					},
					{
						icon: '../../static/icon/active/privilege/collection.png',
						name: '每天5个超级喜欢',
						description: '心仪的朋友可以超级喜欢哦'
					},
					{
						icon: '../../static/icon/active/privilege/collection.png',
						name: '动态图片扩展',
						description: '动态可以发更多的图片了'
					},
					{
						icon: '../../static/icon/active/privilege/collection.png',
						name: '相册扩展',
						description: '相册长度增加至9张'
					},
					{
						icon: '../../static/icon/active/privilege/back.png',
						name: '划错随时返回',
						description: '划错了，没关系，一键返回'
					},
				]

			};
		},
		computed: {
			...mapState('user',['loginUser']),
			...mapState('common',['baseInfo']),
			vipDuring() {
				return this.baseInfo.expirationTime
			}
		},
		mounted() {	
			this.isVip = this.baseInfo.isVip === 1
			this.data = this.baseInfo
			this.getVipPackageList()		
		},
		methods: {
			// 获取套餐信息
			async getVipPackageList() {
				const {data: res} = await my.getVipPackageList({
					start: 1,
					limit: 3
				})
				if (res.resultCode === 200) {
					this.vipPrice = res.data
					this.chooseVip = this.vipPrice[0]
				}
			
			},
			// 关闭续费
			closeChecked() {
				this.checked = false
				this.$showMsg('连续续费已关闭')
			},
			// 开通VIP
			async openVip() {
				uni.showLoading({title: '动态加载中',mask:true});
				const {
					data: res
				} = await my.openVip({
					loginName: this.loginUser.loginName,
					month: this.chooseVip.time
				})
				uni.hideLoading()
				if (res.resultCode === 200) {
					this.vipTime = res.data;
					this.isVip = true
					this.isBuy = false
				}
				this.$showMsg(res.message)
			},
			// 续费VIP
			async renewalVip() {
				uni.showLoading({title: '动态加载中',mask:true});
				const {
					data: res
				} = await my.renewalVip({
					loginName: this.loginUser.loginName,
					month: this.chooseVip.time
				})
				uni.hideLoading()
				if (res.resultCode === 200) {
					this.vipTime = res.data;
					this.isVip = true
					this.isBuy = false
					this.$showMsg("你已成功续费" + this.chooseVip.time + '个月')
				}
			},
			gotoBack() {
				uni.switchTab({
					url: '/pages/person/person'
				})
			},
			// 改变vip选择
			changeVip(index) {
				this.chooseVip = this.vipPrice[index]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.root {
		padding: 0 20rpx;

		.header {
			height: 80rpx;

			.left {
				display: flex;
				align-items: center;

				image {
					height: 35rpx;
					width: 35rpx;
					margin: 0 20rpx;
				}

				text {
					font-size: 36rpx;
					font-weight: bold;
				}
			}

		}

		.cards {
			.card-vip {
				width: 700rpx;
				height: 220rpx;
				background: linear-gradient(#ffaa7f, #ff557f);
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 30rpx;

				.vip-innerbox {
					width: 98%;
					height: 92%;
					border: 4rpx solid #fff;
					box-sizing: border-box;
					border-radius: 30rpx;
					padding: 20rpx 0 20rpx 30rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.vip-top {
						font-size: 40rpx;
						color: #fff;
						font-family: 'kaiti';

						text {
							font-weight: bold;
							margin-right: 8rpx;
							letter-spacing: 4rpx;
						}
					}

					.vip-bottom {
						display: flex;
						align-items: center;
						color: #fbfcda;
						font-size: 24rpx;

						image {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							margin-right: 10rpx;
						}
					}
				}
			}
		}

		.cardChoose {
			margin-top: 60rpx;
			display: flex;
			justify-content: space-around;

			.choose-item {
				width: 200rpx;
				border: 8rpx solid #eee;
				border-radius: 30rpx;
				color: #777;
				display: flex;
				flex-direction: column;
				align-items: center;
				padding-top: 20rpx;
				position: relative;

				text {
					margin-top: 15rpx;

					text {
						font-size: 48rpx;
					}
				}

				.three {
					width: 100%;
					height: 60rpx;
					line-height: 60rpx;
					font-weight: bold;
					background-color: #eee;
					text-align: center;
					color: #fff;
				}

				.name {
					position: absolute;
					top: -40rpx;
					left: 50%;
					transform: translateX(-50%);
					width: 130rpx;
					height: 50rpx;
					line-height: 50rpx;
					background-color: #eee;
					color: #fff;
					text-align: center;
					border-radius: 20rpx;
				}
			}

			.choose-active {
				border: 8rpx solid #f9607f;
				color: #f9607f;

				.name {
					background-color: #f9607f;
				}

				.three {
					background-color: #f9607f;
				}
			}
		}

		.choosePro {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			font-size: 24rpx;

			checkbox {
				transform: scale(0.8);
			}

			text {
				color: #a8a8a8;

				text:first-child {
					color: #000;
				}

				text:nth-child(2) {
					color: darkorange;
				}
			}
		}

		.xufei {
			width: 100%;
			display: flex;
			justify-content: space-around;
			height: 80rpx;
			align-items: center;
			color: #ddd;
			margin-top: 20rpx;

			text:first-child {
				color: orange;
			}
		}

		.privileges {
			margin-top: 40rpx;
			margin-bottom: 250rpx;

			.privilege-title {
				height: 60rpx;
				line-height: 60rpx;

				text {
					color: #777;
					font-weight: bold;
				}
			}

			.privilege-list {
				.privilege-item {
					height: 100rpx;
					display: flex;
					align-items: center;
					margin: 25rpx 0;

					image {
						height: 100rpx;
						width: 100rpx;
						margin-right: 30rpx;
					}

					.item-right {
						h3 {
							font-size: 28rpx;
						}

						p {
							margin-top: 10rpx;
							color: #777;
							font-size: 24rpx;
						}
					}
				}
			}
		}

		.buy {
			position: fixed;
			bottom: 0;
			z-index: 6;
			width: 100%;
			background-color: #fff;
			padding: 0 20rpx 20rpx 20rpx;
			border-top: 4rpx solid #eee;
			box-sizing: border-box;

			.buy-top {
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;

				.top-left {
					display: flex;
					align-items: center;

					image {
						height: 40rpx;
						width: 40rpx;
						margin-right: 30rpx;
					}
				}

				.top-right {
					margin-right: 20rpx;
				}
			}

			.buy-btn {


				button {
					width: 90%;
					background: linear-gradient(#ffaa7f, #ff557f);
					border-radius: 20rpx;

					text {
						color: #fff;
						font-weight: bold;
					}

					.price {
						margin-right: 20rpx;
					}
				}
			}
		}
	}
</style>
