<template>
	<view class="comment-replay">
		<view class="replay-header">
			<text>发表评论</text>
			<uni-icons type="closeempty" size="20" @click="closeOpen(false)" color="#bfbfbf"></uni-icons>
		</view>
		<view class="replay-content">
			<textarea placeholder="想说点什么..." maxlength="235" v-model="commentContent"></textarea>
		</view>
		<view class="replay-footer" @click="closeOpen(true)">
			<text>发布</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comment-replay",
		data() {
			return {
				commentContent: '',
			};
		},
		methods: {
			closeOpen(showjudge) {
				this.$emit('closeHuifu',{
					  commentContent:this.commentContent,
					  showjudge:showjudge
				});
                this.commentContent=""
			}
		}
	}
</script>

<style lang="scss">
	// 头部
	.comment-replay {
		padding: 30rpx 40rpx;
		height: 550rpx;
		width: 100%;
		box-sizing: border-box;

		.replay-header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			text {
				font-weight: bold;
			}
		}

		.replay-content {
			margin-top: 20rpx;
			width: 100%;
			height: 250rpx;
			background-color: #fbfafa;

			textarea {
				height: 100%;
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx;
			}
		}

		.replay-footer {
			margin-top: 10rpx;
			height: 60rpx;
			width: 100%;
			text-align: right;
			line-height: 60rpx;

			text {
				color: white;
				font-size: 32rpx;
				background-color: white;
				border-radius: 25rpx;
				padding: 8rpx 35rpx;
				background: linear-gradient(to right, #fe8914 0%, #ee2413 100%);
			}
		}
	}
</style>
