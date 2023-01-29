<template>
	<view class="root">
		<mover>
             <view slot="content">广场</view>
        </mover>
		<!-- social头部-->
		<view class="social-header">
			<!-- 关注和附近按钮切换 -->
			<view class="social-header-left">
				<text :style="!isClose? activeStyle: ''" id="concern" @click="isClose = false">关注</text>
				<text :style="isClose? activeStyle: ''" id="close" @click="isClose = true">附近</text>
				<text>
					<uni-icons type="list" size="30" color="darkorange" @click="changeSetting()">
					</uni-icons>
				</text>
			</view>

			<view class="social-header-right">
				<text class="btnSend" @click="gotoShare">发动态</text>
			</view>

		</view>

		<!-- 关注 -->
		<uni-transition mode-class="slide-right" :show="true">
			<template v-if="!isClose">
				<social-double :request="requestCare" :getTotal="getTotalCare" @openPopu="openPopu"></social-double>
			</template>
		</uni-transition>

		<!-- 附近 -->
		<uni-transition mode-class="slide-left" :show="true">
			<template v-if="isClose">


				<social-double :request="requestClose" :getTotal="getTotalAround" @openPopu="openPopu"></social-double>
			</template>
		</uni-transition>

		<!-- 举报和关注弹窗 -->
		<uni-popup ref="tip" background-color="#fff">
			<view class="tip-content">
				<text @click="btn_attention()">{{alreadyConcern == 0 ? "关注":"不再关注"}}</text>
				<text @click="btn_report()">匿名举报</text>
				<hr>
				<text @click="$refs.tip.close()">取消</text>
			</view>
		</uni-popup>

		<!-- 设置部分的抽屉盒子 -->
		<uni-popup ref="popup" background-color="#fff">
			<social-apps @closePopup="closePopup"></social-apps>
		</uni-popup>

		<!-- 不定期活动按钮 -->
		<uni-transition mode-class="fade" :show="activeBtn.show && isClose">
			<!-- <activity-btn :activeBtn="activeBtn"></activity-btn> -->
		</uni-transition>


		<!-- 投诉 -->
		<uni-popup ref="report" background-color="#fff">
			<report-check @close="closeReport" :reportedUserId="reportedUserId" :reportedId="reportedId" :type="1">
			</report-check>
		</uni-popup>


	</view>
</template>

<script>
	import around from '../../apis/around.js'
	import recomment from '../../apis/recomment.js'
	import care from '../../apis/care.js'
	import my from '../../apis/my.js'
	import reportCheck from '@/components/report-check/report-check.vue'

	export default {
		name: 'social',
		components: {
			reportCheck
		},
		data() {
			return {
				// 活动按钮定制
				activeBtn: {
					show: false, //是否存在
					type: 'button', //样式为按钮
					bgc: 'light', //背景为浅色
				},
				isClose: false,
				activeStyle: 'font-weight: bold;color: black;', //active样式
				requestClose: around.getRecomment,
				requestCare: care.getCarefor,
				getTotalAround: around.getTotal,
				getTotalCare: care.getTotal,
				reportedUserId: "",
				reportedId: "",
				alreadyConcern: 0
			};
		},
		mounted() {
			let $this = this
			// 延时广告出现
			setTimeout(function() {
				$this.activeBtn.show = true
			}, 1000)
		},
		methods: {

			//审核
			btn_report() {
				this.$refs.report.open();
			},

			//关注
			btn_attention() {
				let _that = this
				if (this.alreadyConcern == 0) {
					my.addAttention({
						userId: this.reportedUserId,
						follower: this.$store.state.user.loginUser.userId
					}).then((res) => {
						uni.showToast({
							icon: "none",
							title: "关注成功"
						})
						this.alreadyConcern = 1
						_that.$refs.tip.close();
					}).catch(() => {

					})
				} else {
					my.cancelAttention({
						userId: this.reportedUserId,
						follower: this.$store.state.user.loginUser.userId
					}).then((res) => {
						uni.showToast({
							icon: "none",
							title: "已取消"
						})
						this.alreadyConcern = 0;
						_that.$refs.tip.close();

					}).catch(() => {

					})
				}
			},

			//关闭
			closeReport() {
				this.$refs.tip.close();
				this.$refs.report.close();
			},

			gotoShare() {
				uni.navigateTo({
					url: '/subpkg/share/share'
				})
			},
			openPopu(item) {
				this.alreadyConcern = item.alreadyConcern;
				this.reportedId = item.diary.diaryUserId
				this.reportedUserId = item.diary.diaryUserId
				this.$refs.tip.open('bottom')
			},
			// 关闭弹窗
			closePopup() {
				this.$refs.popup.close()
			},
			// 改变设置状态
			changeSetting() {
				this.$refs.popup.open('top')
			},
		},
	}
</script>

<style lang="scss" socped>
	// 头部
	.social-header {
		height: 100rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: sticky;
		width: 100%;
		z-index: 99;
		background-color: #fff;
		padding: 0 20rpx;

		// background-color: yellow;
		.social-header-left {
			display: flex;
			width: 50%;
			line-height: 100rpx;
			justify-content: space-around;
			align-items: center;

			text {
				margin-right: 30rpx;
				color: gray;
				font-size: 36rpx;
				display: flex;
				align-items: center;
			}

			.active {
				font-weight: bold;
				color: black;
			}
		}

		.social-header-right {
			margin-right: 10rpx;

			.btnSend {
				display: inline-block;
				text-align: center;
				padding: 10rpx 20rpx;
				height: 80%;
				border-radius: 28rpx;
				color: #fff;
				font-size: 24rpx;
				background-color: #fc966b;
			}
		}
	}

	// 弹窗
	.tip-content {
		margin-top: 20rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		hr {
			margin: 10rpx 0;
			height: 4rpx;
			width: 100%;
			background-color: #ccc;
		}

		text {
			display: inline-block;
			line-height: 80rpx;
		}

		text:nth-child(2) {
			color: orange;
		}
	}
</style>
