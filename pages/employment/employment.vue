<template>
	<view>
		<mover>
             <view slot="content">就业</view>
        </mover>
		<view class="banner">
			<view class="employ"
				:style="isEmploy ? 'border-bottom: 6rpx solid darkorange;; color: darkorange;' : 'border-bottom: 6rpx solid #eee; color: #000;'"
				@click="isEmploy = true">
				<text>就业</text>
			</view>
			<view class="server"
				:style="!isEmploy ? 'border-bottom: 6rpx solid darkorange;; color: darkorange;' : 'border-bottom: 6rpx solid #eee; color: #000;'"
				@click="isEmploy = false">
				<text>服务</text>
			</view>
		</view>
		
		<scroll-view scroll-y="true" >
			<view class="main">
				<employment-employ v-if="isEmploy"></employment-employ>
				<employment-server v-else></employment-server>
			</view>	
		</scroll-view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEmploy: true
			};
		}
	}
</script>

<style lang="scss" scoped>
	.banner {
		position: sticky;
		top: 70rpx;
		display: flex;
		height: 100rpx;
		box-sizing: border-box;
		font-size: 16px;
		padding-bottom: 40rpx;
		background-color: #fff;
		z-index: 2;

		view {
			width: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 6rpx solid #eee;
		}

		.employ {
			border-bottom: 6rpx solid darkorange;
			color: darkorange;
		}

		.server {}
	}
	
	.main{
		padding: 0 30rpx;
	}
</style>
