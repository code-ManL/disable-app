<template>
	<view>
		<div class="header">
			<image :src="baseInfo.headPicPath" mode="aspectFill" v-if="baseInfo.headPicPath"></image>
			<image src="../../static/images/user.jpg" mode="aspectFill" v-else></image>
		</div>

		<view class="footer">
						
			<!-- 姓名 -->
			<view class="footer-header">
				<view class="userName">
					<text>{{baseInfo.nickName}}</text>
				</view>
				<view class="address">
					<text>{{baseInfo.householdAddr?baseInfo.householdAddr:"暂无位置"}}(0km)</text>
					<text class="point">·</text>
					<text style="color: #F95F81;">正活跃</text>
				</view>
			</view>

			<!-- 相册 -->
			<view class="photos">
				<view class="title">
					<text class="pic">图片秀</text>
					<text class="look">查看全部</text>
				</view>
				<view class="">
					<scroll-view class="scroll-view" scroll-x="true" scroll-left="120">
						<view class="list" v-if="imageList.length != 0">
							<view class="scroll-view-item" v-for="(item, i) in imageList" :key="i">
								<image :src="item.picPath" mode="aspectFill"></image>
							</view>
						</view>
						<view class="empty" v-else>
							你还没有上传相册哦！
						</view>
					</scroll-view>
				</view>
			</view>

			<!-- MV -->
			<view class="mv">
				<view class="title">
					<text class="pic">个人MV</text>
				</view>
				<view class="">
					<view class="mvBox" v-if="mvPath">
						<video id="myVideo" :src="mvPath" controls></video>
						<text class="mvTip">对外最闪亮的一张名片</text>
					</view>
					<text v-else @click="gotoEdit">快来添加自己的MV吧，上传自己showTime时刻！</text>
				</view>
			</view>
			
			<homeItem title="关于我" :content="introduce" v-if="introduce"></homeItem>
			<homeItem title="爱情宣言" :content="loveSaying"  v-if="loveSaying"></homeItem>
			<homeItem title="我的标签" :list="tag"></homeItem>
			<homeItem title="我的兴趣" :list="hobby"></homeItem>
			<homeItem title="更多信息" :baseData="baseInfo"></homeItem>
		</view>
	</view>

</template>

<script>
	import homeItem from '@/components/recomment-item/recomment-item.vue'
	import { mapState } from 'vuex'
	export default {
		name: "personage",
		components: {
			homeItem
		},
		props: {
			imageList: {
				type: Array,
				default: []
			}
		},
		
		computed: {
			...mapState('common', ['baseInfo', 'moreInfo']),
			
			tag(){
				let tagStr = this.moreInfo.personDetailInfo?this.moreInfo.personDetailInfo.personTag:""
				return tagStr.split(' ')
			},
			hobby(){
				let hobbyStr = this.moreInfo.personDetailInfo?this.moreInfo.personDetailInfo.hobby:""
				return hobbyStr.split(' ')
			},
			introduce(){
				let personIntro = this.moreInfo.personBasicInfo?this.moreInfo.personBasicInfo.personIntro:""
				return personIntro
			},
			loveSaying(){
				let personSign = this.moreInfo.personBasicInfo?this.moreInfo.personBasicInfo.personSign:""
				return personSign			
			},
			mvPath(){
				let mv = this.moreInfo.personBasicInfo?this.moreInfo.personBasicInfo.mv:''
				return mv			
			},
		},
		methods: {
			gotoEdit(){
				this.$emit('gotoEdit', 1)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.header{
		padding: 0 30rpx;
		
		image{
			border-radius: 30rpx;
			width: 100%;
		}
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
				
				image{
					height: 100%;
					width: 100%;
				}
			}
		}
		
		.mv{
			.mvBox{
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				
				
				.mvTip{
					margin-top: 10rpx;
					font-size: 12px;
					color: #ddd;
				}
			}
		}

	}
</style>
