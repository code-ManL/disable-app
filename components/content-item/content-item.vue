<template>
	<view class="item-container">
		<view class="item-left">
			<view class="user-name" style="color:#a9a9a9">
				<view class="travel-img" v-if="user.replyUserName">
					<image :src="replyPic" alt="" />
				</view>

				<text>{{user.replyUserName ? user.replyUserName: user.commentatorName}}</text>
				<template v-if="user.replyUserName">
					<view class="travel-tag">
						<text class="tag-content" @click="showHuifu">回复</text>
						<uni-icons type="paperplane" size="14"></uni-icons>
					</view>
					<text>{{user.replyUserName}}</text>
				</template>

			</view>
			<view class="user-comment">
				{{user.replyUserName ? user.replyContent : user.commentBody}}
			</view>
			<view class="user-comment-time">
				<view class="time-detail">
					{{user.replyUserName ? dateDiff(user.createTime) : dateDiff(user.commentCreateTime)}}
				</view>

				<view class="btn-comment" @click="showHuifu">
					回复
				</view>
			</view>


		</view>
		<view class="item-right" @click="addLike">
			<uni-icons type="heart" style="width: 100%;text-align: center;" :color="alreadyItem.alreadyLike == 1 ? 'red' : ''"
				size="20"></uni-icons>
			<text>{{user.likeAmount < 100 ? user.likeAmount : '99+'}}</text>
		</view>

	</view>
</template>

<script>
	import comment from '../../apis/comment.js'
	import around from '../../apis/around.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "content-item",
		props: ['users', 'replyPic', 'alreadyItems'],
		data() {
			return {
				code: 0,
				user:{
					likeAmount:0,
					replyUserName:"",
					createTime:"",
					commentCreateTime:"",
					commentatorName:"",
					commentBody:""
				},
				alreadyItem:{
					alreadyLike:0
				}
			};
		},
		watch:{
			users: {
				deep: true,
				handler(val) {
					this.user = this.users;
				}
			},
			alreadyItems:{
				deep: true,
				handler(val) {
					this.alreadyItem = this.alreadyItems
				}
			},
		},
		methods: {
			...mapState('user', ['loginUser']),

			dateDiff(nowTime) {
				if (!nowTime) return '';
				nowTime=nowTime.replace(/年/g, '/');
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

			showHuifu() {
				uni.$emit("huifuBack",this.user)
			},
			addLike() {
				let _this = this
				this.alreadyItem.alreadyLike = false
				this.code == 1 ? this.$showMsg('取消成功', 1000) : this.$showMsg('点赞成功', 1000)
				if (this.user.replyUserName) {
					comment.addLikeComment({
						userId: this.loginUser.userId,
						commentId: this.user.replyId
					}).then(res => {
						_this.user.likeAmount = res.data.map.total;
					})
					_this.alreadyItem.alreadyLike = _this.alreadyItem.alreadyLike == 0 ? 1 : 0
				} else {
					comment.addLike({
						userId: this.loginUser.userId,
						commentId: this.user.commentId
					}).then(res => {
						_this.user.likeAmount = res.data.map.total;
					})
					_this.alreadyItem.alreadyLike = _this.alreadyItem.alreadyLike == 0 ? 1 : 0
				}
			},
			show() {
				uni.$emit('showHuifu')
			}
		},
		mounted() {
				this.user = this.users;
						this.alreadyItem = this.alreadyItems
		}
	}
</script>

<style lang="scss">
	.item-container {
		width: 100%;
		display: flex;
		margin-bottom: 10rpx;

		.item-left {
			width: 85%;

			.user-name {
				display: flex;
				height: 40rpx;

				.travel-img {
					height: 100%;
					width: 40rpx;
					margin-right: 20rpx;

					image {
						height: 100%;
						width: 100%;
						border-radius: 50%;
					}
				}

				.travel-tag {
					height: 100%;
					width: 120rpx;
					box-sizing: border-box;
					padding: 0 16rpx;

					.tag-content {
						box-sizing: border-box;
						padding: 2rpx;
						font-size: 4rpx;
						margin-right: 4rpx;
						background-color: #efefef;
						color: #8e8e8e;
					}



				}
			}

			.btn-comment{

			}

			.user-comment{
				padding: 10rpx 0;
			}
			.user-comment-time {
				display: flex;
				color: #a9a9a9;
				box-sizing: border-box;
				padding-right: 20rpx;
				align-items: center;


				.btn-comment{
					font-size: 24rpx;
					margin-left: 20rpx;
				}

				.time-detail {
					font-size: 24rpx;
				}
			}

		}

		.item-right {
			display: flex;
			flex-direction: column;
			margin-top: 10rpx;
			height: 100%;
			width: 15%;
			color: #a9a9a9;

			// background-color: red;
			text {

				width: 100%;
				text-align: center;
			}
		}
	}
</style>
