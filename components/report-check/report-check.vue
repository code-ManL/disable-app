<template>
	<view class="root">
		<view class="main">
			<text class="h2">请填写举报原因</text>
		</view>
		<textarea class="input1" v-model="reason"  placeholder="请填写举报原因"/>
		<view class="body">
			<button @click="saves">确认</button>
			<text @click="btnNo()">取消</text>
		</view>
	</view>
</template>

<script>
	import around from '../../apis/share.js'
	export default {
		name:"recomment-adver",
		props:["reportedUserId","reportedId","type"],
		data(){
			return{
				reason:""
			}
		},
		methods:{
			btnNo(){
				this.$emit("close")
			},
			//提交原因
			saves(){
				if(this.reason==""){
					uni.showToast({
						icon:"none",
						title:"请填写举报原因"
					})
					return
				}
				around.insertReport({
					reportedUserId:this.reportedUserId,
					reportedId:this.reportedId,
					type:this.type,
					reason:this.reason
				}).then((res)=>{
					uni.showToast({
						icon:"none",
						title:"举报成功"
					})
					this.$emit("close")
				}).catch(()=>{
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.input1{
    height: 160rpx;
    margin: 20rpx 0;
    text-align: left;
    padding: 30rpx;
    box-sizing: border-box;
    width: 100%;
    border: 1rpx solid darkorange;
	}
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