<template>
	<view>
		<view class="active">
			<view class="active-title">
				<text>我的动态</text>
			</view>
			<view class="active-list" v-if="personActiveData.length !== 0">
				<view class="active-item" v-for="(item, i) in personActiveData" :key="i">
					<view class="item-left">
						<text class="day">{{item.month}}</text>
						<text class="mouth">{{item.day}}月</text>
					</view>
					<view class="item-right">
						<p class="text" @click="gotoComment(item.diary.diaryId)">{{item.diary.diaryContent}}</p>
						<view class="image">
						
							<image :src="items" v-for="(items, i) in item.picture" :key="i" mode="aspectFill"></image>
							<video v-if="item.video" :src="item.video" mode="aspectFill"></video>
						</view>
						<view class="btns">
							<view class="btn-info-left" @click="btn_more(item)">
								<uni-icons type="more"  size="30"></uni-icons>
							</view>
							<view class="btn-info-right" @click="gotoComment(item.diary.diaryId)">
								<view class="like">
									<image class="icon" src="../../static/icon/active/like.png" alt="">
										<text class="num">{{item.diary.diaryLove}}</text>
								</view>
								<view class="comment" >
									<image class="icon" src="../../static/icon/active/comment.png" alt="">
										<text class="num" v-if="item.diary.diaryComment !== 0">{{item.diary.diaryComment}}</text>
										<text class="num" v-else>回复</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="active-list-empty">
					<p>没有更多了</p>
				</view>
			</view>
			<view class="active-empty" v-else>
				<view class="empty-icon">
					<uni-icons type="compose" size="60" color="#ccc">
					</uni-icons>
				</view>
				<text>发布一条动态，让大家看到你</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"person-active",
		props: {
			personActiveData: {
				type: Array,
				default: []
			}
		},
		data(){
			return{
				obj:{}
			}
		},
		methods: {			
			// 去网评论页面
			gotoComment(diaryId) {
				uni.navigateTo({
					url: '/subpkg/comment/comment?diaryId=' + diaryId
				})
			},
			btn_more(item){
				this.$emit("personActive",item)
			}
		}
	}
</script>

<style lang="scss" scoped>
/* 动态 */
	.active {
		margin-top: 20rpx;

		.active-title {
			font-weight: bold;
			margin-bottom: 10rpx;
		}

		.active-list {
			.active-item {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;

				.item-left {
					padding-top: 15rpx;
					width: 100rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					font-weight: bold;
					color: #ddd;
					margin-right: 20rpx;


					.day {
						font-size: 22px;
					}

					.mouth {
						font-size: 16px;
					}
				}

				.item-right {
					width: calc(100% - 100rpx);

					.text {
						margin: 20rpx 0;
						font-weight: bold;
					}

					.image {

						image {
							width: 160rpx;
							height: 160rpx;
							margin-right: 20rpx;
							border-radius: 10rpx;
							margin-bottom: 20rpx;
						}
						video{
							width: 450rpx;
							margin-right: 20rpx;
							height: 300rpx;
							border-radius: 20rpx;
							margin-bottom: 10rpx;
						}					
					}

					.btns {
						margin-top: 20rpx;
						display: flex;
						justify-content: space-between;
						width: calc(100% - 10rpx);

						.btn-info-right {
							display: flex;

							&>view {
								display: flex;
								align-items: center;
								margin-left: 10rpx;

								.icon {
									width: 40rpx;
									height: 40rpx;
								}

								.num {
									font-size: 20rpx;
									color: #a5a395;
									margin-left: 10rpx;
									width: 60rpx;
								}
							}
						}
					}
				}
			}

			.active-list-empty {
				width: 100%;
				text-align: center;
				margin-bottom: 50rpx;
				color: #c6c6c6;
			}
		}


		.active-empty {
			height: 400rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #ccc;

			.empty-icon {
				margin-bottom: 50rpx;
			}
		}
	}
</style>