<template>
	<view>
		<div class="header">
			<image :src="item.headPath" class="swiper-img" mode="aspectFill" />
		</div>

		<view class="footer">

			<!-- 姓名 -->
			<view class="footer-header">
				<view class="userName">
					<text>{{item.username}}</text>
					<text class="focus" @click="sendAttention" v-if="item.alreadyCollect == 0">关注</text>
					<text class="focus" style="background-color: #ddd;" v-else>已关注</text>
				</view>
				<view class="address">
					<text>{{item.houseAddress}}</text>
					<text class="point">·</text>
					<text style="color: #F95F81;">26分钟前活跃</text>
				</view>
			</view>

			<!-- 相册 -->
			<view class="photos">
				<view class="title">
					<text class="pic">动态相册</text>
					<text class="look">查看全部</text>
				</view>
				<view class="">
					<scroll-view class="scroll-view" scroll-x="true" show-scrollbar="false" scroll-left="120">
						<view class="scroll-view-item" v-for="(pic, i) in item.picShow" :key="i">
							<image :src="pic" mode="aspectFill"></image>
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- MV -->
			<view class="mv">
				<view class="title">
					<text class="pic">个人MV</text>
				</view>
				<view class="mv-video">
					<video id="myVideo" :src="item.mvPath" controls></video>
				</view>
			</view>

			<!-- <homeItem title="关于我" content="美少女战士"></homeItem> -->
			<homeItem v-if="item.tags" title="我的标签" :list="item.tags"></homeItem>
			<!-- <homeItem title="我的标签"></homeItem> -->
			<homeItem v-if="item.hobbies" title="我的兴趣" :list="item.hobbies"></homeItem>

			<view class="homeitem-bottom" style="margin-bottom: 110rpx;">
				~暂无更多信息~
			</view>
		</view>
	</view>

</template>

<script>
	import homeItem from '@/components/recomment-item/recomment-item.vue'
	import recomment from "@/apis/recomment.js"
	import my from "@/apis/my.js"
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "personage",
		components: {
			homeItem
		},
		props: {

			items: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				item: {
					picShow: [],
					alreadyCollect: 0,
					username: "",
					houseAddress: "",
					mvPath: "",
					tags: [],
					hobbies: []
				}
			};
		},
		mounted() {
			this.item = this.items;
		},
		methods: {
			...mapState('user', ['loginUser']),

			backdetail() {
				uni.$emit("backdetail");
			},

			//关注用户
			sendAttention() {
				if (this.item.alreadyCollect == 1) {
					my.addAttention({
						userId: this.item.userId,
						follower: this.$store.state.user.loginUser.userId
					}).then((res) => {
						uni.showToast({
							icon: "none",
							title: "已取消"
						})
						this.item.alreadyCollect = 0
					}).catch(() => {

					})
				} else {
					my.cancelAttention({
						userId: this.item.userId,
						follower: this.$store.state.user.loginUser.userId
					}).then((res) => {
						uni.showToast({
							icon: "none",
							title: "关注成功"
						})
						this.item.alreadyCollect = 1

					}).catch(() => {

					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-img {
		width: 100%;
		height: 700rpx;
	}

	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}


	.header {
		// padding: 0 30rpx;
	}

	.footer {
		box-sizing: border-box;
		padding: 20rpx;

		.footer-header {
			margin-bottom: 60rpx;
			// background-color: bisque;

			.userName {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 54rpx;

				.focus {
					background-color: #FB966E;
					padding: 12rpx 22rpx;
					border-radius: 26rpx;
					color: white;
					font-size: 26rpx;
				}
			}

			.address {
				margin-top: 16rpx;
				color: #000000;

				.point {
					&:before {
						content: " ";
					}

					&:after {
						content: " ";
					}
				}
			}
		}

		.photos,
		.mv {
			padding-bottom: 40rpx;
			margin-bottom: 20rpx;
			border-bottom: 4rpx solid #e6e6e64f;

			.title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 28rpx;


				.pic {
					font-weight: 700;
					font-size: 32rpx;
				}

				.look {
					color: #D8D8D8;
				}
			}

			.mv-video {
				height: 400rpx;
				width: 100%;

				video {
					width: 100%;
					height: 100%;
				}
			}

			.scroll-view {
				white-space: nowrap;
				width: 100%;
			}

			.scroll-view-item {
				display: inline-block;
				margin-right: 20rpx;
				width: 160rpx;
				height: 160rpx;
				border-radius: 14rpx;
				text-align: center;
				font-size: 36rpx;
				border: 2rpx solid #D8D8D8;

				image {
					height: 100%;
					width: 100%;
				}
			}
		}


		.homeitem-bottom {
			color: #d8d8d8;
			text-align: center;

		}
	}
</style>
