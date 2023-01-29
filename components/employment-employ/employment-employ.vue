<template>
	<view>
		<view class="message">
			<view class="message-title">
				<h2>最新消息</h2>
			</view>
			<view class="message-list">
				<view class="message-item" v-for="(item, i) in messageList" :key="i">
					<img :src="item.imagePath" alt="">
					<p>{{item.text}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"employment-employ",
		data() {
			return {
				messageList: [
					{
						imagePath: '../../static/images/activity/activity1.jpg',
						text: '残疾人最新就业资料整合来了'
					},
					{
						imagePath: '../../static/images/activity/activity2.jpg',
						text: '残疾人如何逆袭，且看今朝'
					},
					{
						imagePath: '../../static/images/activity/activity3.jpg',
						text: '原来最适合我们的竟然是这个'
					},
					{
						imagePath: '../../static/images/activity/activity4.jpg',
						text: '有些东西你万万想不到'
					},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
.message{
	.message-title{
		height: 100rpx;
		line-height: 100rpx;
		
		h2{
			font-weight: normal;
			font-size: 16px;
		}
	}
	
	.message-list{
		.message-item{
			margin-bottom: 40rpx;
			
			img{
				width: 100%;
			}
		}
		
	}
}
</style>