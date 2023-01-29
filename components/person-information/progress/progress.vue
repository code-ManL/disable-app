<template>
	<!-- 完成度 -->
	<view class="root">
		<view class="progress-box">
			<view class="item"
				v-for="(item, i) in progressInteger" :key="i">
				<view class="item-circle" :style="'background-color: rgba(255, 140, 0,' +  (item * 0.1) + ');'">
					
				</view>
			</view>
		</view>
		<view class="progress-text">
			当前资料完成度{{(progressNum * 100).toFixed(0) + '%'}}
		</view>
	</view>
</template>

<script>
	import {
		returnRate
	} from '@/apis/tools.js'
	export default {
		props: ['data'],
		computed: {
			progressNum() {
				return returnRate(this.data)
			},
			// 资料完成度数字
			progressInteger() {
				return parseInt(Math.floor(this.progressNum * 10))
			}
		},
	}
</script>

<style lang="scss" scoped>
	.root {
		height: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.progress-box {
			height: 50rpx;
			width: 70%;
			background-color: #eee;
			border-radius: 50rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.item {
				height: 100%;
				width: calc(100% / 10);
				display: flex;
				align-items: center;
				justify-content: center;
				
				.item-circle{
					height: 30rpx;
					width: 30rpx;
					border-radius: 50%;
					background-color: rgba(255, 140, 0, 1);
				}
			}
		}

		.progress-text {
			margin-top: 20rpx;
			color: #ddd;
		}
	}
</style>
