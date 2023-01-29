<template>
	<view class="list-box">
		<text class="header-text">全部回复</text>
		<view class="list-header">
			<image class="img" :src="userData.headPicture" mode="aspectFill" />
			</image>

			<view class="text1">
				<text class="name">{{userData.comment.commentatorName}}</text>
				<text class="content">{{userData.comment.commentBody}}</text>
				<text class="time" @click="btn_more()">{{dateDiff(userData.comment.commentCreateTime)}} <text
						class="more">回复</text></text>
			</view>
			<view style="text-align: center;">
				<uni-icons class="heart" type="heart" :color="userData.alreadyLike == 1 ? 'red' : ''" size="25">
				</uni-icons>
				<text class="zan" @click="addLike(userData)"
					:style="{'color':userData.alreadyLike == 1 ? 'red' : ''}">{{userData.comment.likeAmount}}</text>
			</view>

		</view>

		<view class="list-content">
			<mescroll-uni ref="mescrollRef" @init="init" @down="downCallback" :down="downOption" :up="upOption"
				@up="upCallback" height="40vh" :fixed="true" style="width: 100%;display: block;">
				<view class=" list-header" v-for="item in commentList">
					<image class="img" :src="item.headPicture" mode="aspectFill" />
					</image>

					<view class="text1">
						<text class="name">{{item.comment.replyUserName}}</text>
						<text class="content">回复<text
								style="color:rgba(249, 95, 129, 1)">{{item.comment.commentUserName}}</text>：{{item.comment.replyContent}}</text>
						<text class="time" @click="btn_more()">{{dateDiff(item.comment.createTime)}} <text
								class="more">回复</text></text>
					</view>
					<view style="text-align: center;">
						<uni-icons class="heart" type="heart" @click="addLikes(item)"
							:color="item.alreadyLike == 1 ? 'red' : ''" size="25">
						</uni-icons>
						<text class="zan"
							:style="{'color':item.alreadyLike == 1 ? 'red' : ''}">{{item.comment.likeAmount}}</text>
					</view>
				</view>
			</mescroll-uni>
		</view>

	</view>
</template>

<script>
	import comment from '../../apis/comment.js'
	import around from '../../apis/around.js'

	export default {
		props: ["obj"],
		data() {
			return {
				userData: {
					alreadyLike: 1,
					headPicture: "",
					comment: {
						commentatorName: "",
						commentBody: "",
						commentCreateTime: "",
						likeAmount: ""
					}
				},
				commentList: [],
				downOption: {
					use: true,
					auto: false,
					page: {
						num: 0,
						size: 10
					},
					textLoading: '加载中....',
				},
				upOption: {
					use: true,
					auto: false,
					page: {
						num: 0,
						size: 10
					}
				},
			}
		},
		watch: {
			obj: {
				deep: true,
				handler(val) {
					this.userData = this.obj;
					this.mescroll.resetUpScroll();
				}
			}
		},
		mounted() {
			this.userData = this.obj;
			this.mescroll.resetUpScroll();
		},
		methods: {
			// 添加喜欢
			addLike(item) {
				let _this = this;
				item.alreadyLike == 1 ? uni.$showMsg('取消成功', 1000) : uni.$showMsg('点赞成功', 1000)
				around.addLike({
					diaryId: item.comment.diaryId
				}).then(res => {
					item.comment.likeAmount = res.data.map.total
					item.alreadyLike = item.alreadyLike == 0 ? 1 : 0
				})
			},
			btn_more() {
				uni.$emit("huifuBack", this.userData.comment)
			},
			// 添加喜欢
			addLikes(item) {
				let _this = this;
				item.alreadyLike == 1 ? uni.$showMsg('取消成功', 1000) : uni.$showMsg('点赞成功', 1000)
				around.addLikeReply({
					commentId: item.comment.replyId
				}).then(res => {
					item.comment.likeAmount = res.data.map.total
					item.alreadyLike = item.alreadyLike == 0 ? 1 : 0
				})
			},
			init(mescroll) {
				this.mescroll = mescroll;
				this.$emit('init', mescroll)
			},
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			upCallback(e) {
				this.getDetailList(e);
			},
			dateDiff(nowTime) {
				if (!nowTime) return '';
				nowTime = nowTime.replace(/年/g, '/');
				nowTime = nowTime.replace(/月/g, '/');
				nowTime = nowTime.replace(/日/g, '/');
				nowTime = nowTime.replace(/时/g, ':')
				nowTime = nowTime.replace(/分/g, ':');
				nowTime = nowTime.replace(/秒/g, '');
				const arg = [nowTime]
				const now = arg[1] ? arg[1] : new Date().getTime()
				const diffValue = now - new Date(arg[0].replace(/-/g, '/')).getTime()
				let result = ""
				const minute = 1000 * 60
				const hour = minute * 60
				const day = hour * 24
				const halfamonth = day * 15
				const month = day * 30
				const year = month * 12

				const _year = diffValue / year
				const _month = diffValue / month
				const _week = diffValue / (7 * day)
				const _day = diffValue / day
				const _hour = diffValue / hour
				const _min = diffValue / minute
				if (_year >= 1) result = parseInt(_year) + "年前"
				else if (_month >= 1) result = parseInt(_month) + "个月前"
				else if (_week >= 1) result = parseInt(_week) + "周前"
				else if (_day >= 1) result = parseInt(_day) + "天前"
				else if (_hour >= 1) result = parseInt(_hour) + "个小时前"
				else if (_min >= 1) result = parseInt(_min) + "分钟前"
				else result = "刚刚"
				return result
			},
			//获取回复
			getDetailList(e) {
				let _this = this;
				this.$showMsg("获取中...");
				comment.getComments({
					commentId: this.userData.comment.commentId,
					page: e.num,
					size: 10
				}).then(res => {
					if (res.data.data) {
						if (e.num == 1) {
							_this.commentList = res.data.data
						} else {
							_this.commentList = _this.commentList.concat(res.data.data)
						}
					}
					_this.mescroll.endByPage(10, 1000);
					uni.hideToast()
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.list-box {
		background-color: #817f7f12;
		height: 60vh;

		.header-text {
			font-size: 32rpx;
			text-align: center;
			display: block;
			background-color: #ffffff;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
			border-bottom: 1rpx solid #35353521;
		}

		.list-header {
			width: 100%;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			background-color: #ffffff;
			padding: 20rpx 30rpx;
			align-items: center;
			.img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.text1 {
				width: 450rpx;
				margin-left: 20rpx;

				.name {
					display: block;
				}

				.content {
					display: block;
					font-size: 26rpx;
					margin-top: 10rpx;
					color: #4c4b4b;
				}

				.time {
					display: block;
					font-size: 24rpx;
					color: #615e5e;
					margin-top: 10rpx;

					.more {
						color: #000000;
						margin-left: 20rpx;
					}
				}
			}

			.heart {
				margin-top: 40rpx;
				margin-left: 40rpx;
			}

			.zan {
				display: block;
				margin-left: 40rpx;
			}
		}

		.list-content {
			margin-top: 30rpx;
			background-color: #ffffff;
			height: calc(60vh - 200rpx);
			overflow: auto;
			padding: 20rpx 0;
			box-sizing: border-box;
		}
	}
</style>
