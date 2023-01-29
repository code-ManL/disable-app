<template>
	<view class="">
		<view class="group-item" v-for="(item,inde) in groupItem">
			<view class="item-pic">
				<img :src="item.imagPath" alt="">
			</view>
			<view class="item-content">
				<view class="item-detail">
					<text class="detail-title">
						{{item.title}}
					</text>
					<text class="detail-describe" style="color:#cfcccf">
						{{item.content}}
					</text>
				</view>
				<view class="add-item">
					<view class="add-content">
						<uni-icons type="plusempty" size="16" color="white"></uni-icons>
						<text>加群</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "group-item",
		data() {
			return {
				groupItem: [{
						imagPath: '../../static/images/user.jpg',
						title: '全国聋人单身群',
						content: '专注于.....'
					},
					{
						imagPath: '../../static/images/user.jpg',
						title: '全国聋人单身群',
						content: '专注于.....'
					},
					{
						imagPath: '../../static/images/user.jpg',
						title: '全国聋人单身群',
						content: '专注于.....'
					},
				]
			};
		}
	}
</script>

<style lang="scss">
	.group-item {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		padding-left: 10px;
		margin-bottom: 20px;
		.item-pic {
			height: 100%;
			width: 60px;

			img {
				border-radius: 50%;
				height: 100%;
				width: 100%;
			}
		}

		.item-content {
			flex: 1;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 7px 0;
			box-sizing: border-box;

			.item-detail {
				height: 100%;
				padding: 0 10px;
				flex: 1;
				display: flex;
				flex-direction: column;

				.detail-title,
				.detail-describe {
					width: 200px;
					flex: 1;
					overflow: hidden;
					flex-wrap: nowrap;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.add-item {
				width: 80px;
				height: 100%;
				padding: 5px;
				box-sizing: border-box;

				.add-content {
					font-size: 14px;
					color: white;
					height: 100%;
					border-radius: 20px;
					width: 100%;
					background-color: #fa976e;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
</style>
