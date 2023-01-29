<template>
	<view class="popup-content">
		<view class="content-box">
			<view class="popup-top">
				<view class="top-left">
					<span>快捷应用</span>
				</view>
				<view class="top-right" @click="closePopup">
					<span>关闭</span>
					<uni-icons type="list" size="25" color="pink"></uni-icons>
				</view>
			</view>
			<view class="popup-bottom">
				<navigator class="popup-item" v-for="(item, i) in buttonsList" :key="i" :url="item.pagePath">
					<view class="item-box" :style="'background-color:'+item.bgc">
						<img :src="item.iconPath" alt="">
					</view>
					<span>{{item.text}}</span>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "social-apps",
		data() {
			return {
				buttonsList:[],
				// 快捷按钮区
				// buttonsList: [{
				// 	iconPath: '../../static/images/tabs/compromise.png',
				// 	text: '约吧',
				// 	pagePath: '/subpkg/recomment/recomment',
				// 	bgc: '#feab79'
				// }, {
				// 	iconPath: '../../static/images/tabs/my-active.png',
				// 	text: '单身群',
				// 	pagePath: '/subpkg/group/group',
				// 	bgc: '#8dbbf6'
				// }, {
				// 	iconPath: '../../static/images/tabs/cate.png',
				// 	text: '活动',
				// 	pagePath: '/subpkg/activity/activity',
				// 	bgc: '#ff9771'
				// }, {
				// 	iconPath: '../../static/images/biaoqing.png',
				// 	text: '情感测试',
				// 	pagePath: '/subpkg/emotionTesting/emotionTesting',
				// 	bgc: '#fe8cc8'
				// }, {
				// 	iconPath: '../../static/images/tabs/cart.png',
				// 	text: '待补充',
				// 	pagePath: '#',
				// 	bgc: '#febd3d'
				// }, {
				// 	iconPath: '../../static/images/tabs/cart.png',
				// 	text: '待补充',
				// 	pagePath: '#',
				// 	bgc: '#5ad6d6'
				// }, {
				// 	iconPath: '../../static/images/tabs/cart.png',
				// 	text: '待补充',
				// 	pagePath: '#',
				// 	bgc: '#69d0a5'
				// }, {
				// 	iconPath: '../../static/images/tabs/cart.png',
				// 	text: '待补充',
				// 	pagePath: '#',
				// 	bgc: '#fdad18'
				// }],
			};
		},
		methods: {
			closePopup() {
				this.$emit('closePopup', true)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-content {
		// wait change
		margin-top: 100rpx;
		background-color: transparent;

		.content-box {
			padding: 0 20rpx;
			background-color: #fff;
			border-radius: 0 0 30rpx 30rpx;

			.popup-top {
				display: flex;
				justify-content: space-between;
				align-items: center;


				.top-right {
					display: flex;
					align-items: center;
				}
			}

			.popup-bottom {
				width: 100%;
				padding-top: 50rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;

				.popup-item {
					height: 150rpx;
					width: calc((750rpx - 40rpx) / 4);
					margin-bottom: 30rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 14px;

					.item-box {
						width: 100rpx;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #ccc;
						border-radius: 50rpx;
						margin-bottom: 6rpx;
						border: 2rpx solid #777;
						box-shadow: 1px 1px 5px #777;

						img {
							width: 60%;
							height: 60%;
						}
					}

				}
			}
		}
	}
</style>
