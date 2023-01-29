<template>
	<view class="root">
		<view class="box" v-if="activeBtn.type === 'button'">
			<text>{{button.text}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "activity-btn",
		props: ['activeBtn'],
		data() {
			return {
				button: {
					img: 'static/images/otherIcon/redbag.png',
					text: '惊喜多多'
				},
				bgcColor: {
					light: 'green'
				}
			};
		}
	}
</script>

<style lang="scss" scoped>
	.root {
		position: fixed;
		right: 20rpx;
		// 要改top值
			top: 350rpx;
		// 
		background: linear-gradient(to bottom,#F95F81 ,#FB966E);
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		background-color: rgba(102, 101, 70, 0.1);
		box-shadow: 1px 1px 1px #eee;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid #FB966E;
		.box {
			width: 50%;
			height: 50%;
			text-align: center;
			display: flex;
			align-items: center;
			
			text {
				font-size: 15px;
				color: white;
			}
		}
	}
</style>
