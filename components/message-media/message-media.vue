<template>
	<view class="item-media">
		<view class="media-content" @click="goToMediaDetail">
			<img :src="data.userData.imgpath"></img>
			<view class="content-icon">
				<view class="sanjiao"></view>
			</view>
		</view>
		<view class="media-detail">
			<p class="detail-header">
				<text>{{data.message}}</text>
			</p>
			<view class="detail-footer">
				<view class="user-detail">
					<img :src="data.userData.imgpath" alt="">
					<text>{{data.userData.username}}</text>
				</view>
				<view class="user-like">
					<uni-icons type="heart" size="20"></uni-icons>
					<text>213</text>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		name: "message-media",
		props: ['data'],
		data() {
			return {

			};
		},
		methods: {
		goToMediaDetail(){
			uni.navigateTo({
				url:'/subpkg/media-detail/media-detail'
			})
		}
		}
	}
</script>

<style lang="scss">
	.item-media {
		width: 49%;
		height: 280px;

		.media-content {
			height: 65%;
			width: 100%;
			position: relative;

			img {
				height: 100%;
				width: 100%;
			}

			.content-icon {
				position: absolute;
				width: 25px;
				height: 25px;
				right: 5px;
				top: 5px;
				border-radius: 50%;
				background-color: #000000;
				opacity: .3;
				display: flex;
				align-items: center;
				justify-content: center;

				.sanjiao {
					width: 0;
					height: 0;
					border: 8px solid;
					border-radius: 20px;
					border-right: 0;
					border-style: solid;
					border-color: transparent white;
				}
			}
		}

		.media-detail {
			box-sizing: border-box;
			height: 35%;
			padding: 10px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid #EBEBEB;
			;

			.detail-header {
				width: 100%;
				height: 40px;
				display: -webkit-box;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.detail-footer {
				flex: 1;
				width: 100%;
				display: flex;
				align-items: center;
				color: #c9c9cb;
				// background-color: red;
				margin-top: 8px;

				.user-detail {
					height: 80%;
					width: 70%;
					display: flex;
					align-items: center;

					img {
						height: 30px;
						width: 30px;
						border-radius: 50%;
						margin-right: 6px;
					}

					text {
						flex: 1;
						height: 30px;
						line-height: 30px;
						flex-wrap: nowrap;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}

				.user-like {
					height: 80%;
					width: 40%;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					color: #979498;
				}
			}
		}
	}
</style>
