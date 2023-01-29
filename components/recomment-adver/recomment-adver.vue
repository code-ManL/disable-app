<template>
	<view class="root">
		<view class="header">
			<img src="@/static/images/otherIcon/teen.png" alt="">
		</view>
		<view class="main">
			<h2>完善资料后，交友神速哦</h2>
			<p>检测的你的资料填写进度只有20%，完善更多资料以获取更多的曝光量，佳人相约就在此刻</p>
		</view>
		<view class="body">
			<button @click="closeAdver">我知道了</button>
			<text @click="goOver">不再提示</text>
			<text @click="gotoCheckPerson">完善资料</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"recomment-adver",
		methods:{
			goOver(){
				// localStorage.setItem('tipToFileData', true)
				this.closeAdver()
			},
			closeAdver(){
				this.$emit('closeAdver', true)
			},
			gotoCheckPerson(){
				this.closeAdver()
				uni.navigateTo({
					url: '/subpkg/checkPerson/checkPerson'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.root{
		width: 500rpx;
		background-color: #fff;
		border-radius: 40rpx;
		padding: 30rpx 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.header{
			width: 60%;
			
			img{
				width: 100%;
			}
		}
		
		.main{
			text-align: center;
			
			p{
				margin-top: 20rpx;
				color: #777;
			}
		}
		
		.body{
			margin-top: 20rpx;
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			button{
				display: inline-block;
				width: 100%;
				border: none;
				border-radius: 20rpx;
				background-color: darkorange;
				color: #fff;
				margin-bottom: 20rpx;
			}
			
			text{
				color: darkorange;
				margin-top: 20rpx;
			}
		}
	}
</style>