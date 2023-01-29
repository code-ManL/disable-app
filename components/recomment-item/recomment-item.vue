<template>
	<view class="about" :style="{'border-bottom':title=='我的账号' ? 'none': '6rpx solid e6e6e64f' }">
		<view class="title">
			<text class="me">{{title}}</text>
		</view>
		<text v-if="content" class="content">
			{{content}}
		</text>
		
		<view class="content-item">
			<view v-if="title=='我的兴趣'" class="">
				<view class="all travel">
					<view class="left">
						<i class="iconfont icon-lvyou"></i>
					</view>
					<view class="right">
						<view class="list" v-if="list.length != 0">
							<text class="item" v-for="(item,index) in list" :key="index">{{item}}</text>
						</view>
						<view class="empty" v-else>
							<text>用户未设置兴趣哦！</text>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="title=='我的标签'" class="">
				<view class="all run">
					<view class="left">
						<i class="iconfont icon-biaoqian"></i>
					</view>
					<view class="right">
						<view class="list" v-if="list.length != 0">
							<text class="item" v-for="(item,index) in list" :key="index">{{item}}</text>
						</view>
						<view class="empty" v-else>
							<text>用户未设置兴趣哦！</text>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="title=='更多信息'" class="">
				<view class="more">
					<view>ID: {{baseData.personId}}</view>
					<view class="info">
						<view>粉丝: <text>{{baseData.fanCount}}</text></view>
						<view>关注: <text>{{baseData.attentionCount}}</text></view>
					</view>				
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['title', 'content','list', 'baseData'],
	}
</script>

<style lang="scss" scoped>
	.about {
		width: 100%;
		padding-bottom: 30rpx;
		margin-bottom: 80rpx;

		.title {
			display: flex;

			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;

			.me {
				font-weight: 700;
				font-size: 32rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #000000;
			}
		}

		.content {
			width: 100%;
			color: #777777;
			display: inline-block;
			white-space: pre-wrap;
			height: auto;
			margin-bottom: 20rpx;
			text-indent: 2em;
		}

		.content-item {
			display: flex;
			flex-direction: column;

			.all {
				display: flex;

				.left {
					width: 15%;

					i {
						font-size: 70rpx;
					}

					.icon-paobuji {
						font-size: 100rpx;
					}
				}

				.right {
					display: flex;
					width: 85%;
					
					.list{
						display: flex;
						flex-wrap: wrap;
						align-content: flex-start;
						justify-content: flex-start;
					}

					text {
						margin-bottom: 20rpx;
						margin-left: 30rpx;
						height: 60rpx;
						box-sizing: border-box;
						border-radius: 30rpx;
						border: 4rpx solid #d8d8d833;
						padding: 0 20rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}


				}

			}

		}
	}
	
	.more{
		font-size: 12px;
		
		&>view{
			line-height: 60rpx;
			font-weight: bold;
			
			text{
				margin: 0 30rpx 0 20rpx;
				color: #777;
				font-weight: normal;
			}
		}
		
		.info{
			display: flex;
		}
	}
</style>
