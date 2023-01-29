<template>
	<view>
		<swiper class="swiper" indicator-dots="true" circular="true">
			<swiper-item v-for="(item, i) in swiperList" :key="i">
				<view class="swiper-item">
					<image mode="aspectFill" :src="item.picPath" alt="" />
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "recomment-swiper",
		props: ['swiperList'],
	}
</script>

<style lang="scss" scoped>
	.swiper {
		min-height: 800rpx;
		height: 900rpx;
		.swiper-item {
			width: 100%;
			height: 100%;

			image {
				border-radius: 60rpx;
				width: 100%;
				height: 100%;
			}
		}
		
		.wx-swiper-dot {
			position: relative;
			bottom: 900rpx;
			width: 100rpx;
			height: 3rpx;
			color: #fff;
		}
	}
	
</style>
