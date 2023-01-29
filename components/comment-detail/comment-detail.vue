<template>
	<view class="comment-container">
		<view class="comment-title">评论</view>

		<template v-if="data">
			<view class="comment-content" v-for="(item,index) in data" :key="index">
				<view class="content-left">
					<image :src="item.headPicture" alt="" />
				</view>
				<view class="content-right">
					<content-item :users="item.comment" :alreadyItems="item"></content-item>

					<uni-transition mode-class="slide-bottom" :show="item.flag">
						<view v-if="item.flag" v-for="(item2,indexs) in commentList" :key="indexs">
							<content-item  :users="item2.comment" :alreadyItems="item2" :replyPic="item2.headPicture">
							</content-item>
						</view>
					</uni-transition>

					<view class="btn-content">
						<view class="btn-moreInfo" v-if="item.replyAmountTemp > 0" @click="showDown(item)">
							<text>共{{item.flag == false ? item.comment.replyAmount : item.replyAmountTemp}}条回复</text>
						</view>
						<view class="btn-shouqi" v-if="item.flag" @click="showUp(item)">
							<text>收起</text>
							<uni-icons :type="item.flag == false ? 'bottom' : 'top'" size="16"></uni-icons>
						</view>

					</view>
				</view>

			</view>
		</template>

	</view>
</template>

<script>
	import comment from '../../apis/comment.js'
	export default {
		name: "comment-detail",
		props: ['data'],
		data() {
			return {
				commentList: [],
				obj:{}
			};
		},
		methods: {
			showDown(item) {
				this.$emit("commentListClick",item)
			},
			showUp(item) {
				item.flag = false
				item.Flag = true
				item.replyAmountTemp = item.comment.replyAmount
			},
		},
		mounted() {
			// console.log(this.data);
		}
	}
</script>

<style lang="scss">
	.comment-container {
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		border-top: 2rpx solid #f5f5f5;

		.comment-title {
			font-weight: bold;
			margin-bottom: 20rpx;
		}

		.comment-content {
			width: 100%;
			display: flex;
			margin-bottom: 20rpx;

			.content-left {
				width: 120rpx;

				box-sizing: border-box;
				display: flex;
				justify-content: center;

				image {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
				}
			}

			.content-right {
				width: calc(100vw - 120rpx);
				height: 100%;


				.btn-content {
					// background-color: red;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					box-sizing: border-box;
					color: rgba(249, 95, 129, 1);

					.btn-shouqi {
						display: flex;
					}

					.btn-moreInfo {
						// margin-left: 80px;
						display: flex;
					}
				}

			}
		}


		.no-comment {
			width: 100%;
			height: 300rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36rpx;
			text-align: center;
			color: #a5a395;
		}
	}
</style>
