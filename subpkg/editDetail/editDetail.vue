<template>
	<view class="root">
		<mover></mover>
		<view class="header">
			<view class="header-left" @click="gotoBack">
				<uni-icons type="back" size="20" @click="gotoBack"></uni-icons>
				<text>取消</text>
			</view>
			<view class="header-right">
			</view>
		</view>
		<view class="box">
			<view v-if="type == 1">
				<view class="add">
					<input class="input" type="text" placeholder="添加你的爱好" v-model="keyword">
					<button class="btn" @click="add">添加</button>
				</view>
				<h2 class="title">你的爱好</h2>
				<view class="result">
					<view class="item" v-if="list.length != 0" v-for="(item, i) in list" :key="i">
						<uni-icons type="vip-filled" size="12" color="darkorange"></uni-icons>
						<text>{{item}}</text>
					</view>
					<text v-else>暂无爱好</text>
				</view>
			</view>
			<view v-else>
				<view class="add">
					<input class="input" type="text" placeholder="添加你的标签" v-model="keyword">
					<button class="btn" @click="add">添加</button>
				</view>
				<h2 class="title">你的标签</h2>
				<view class="result">
					<view class="item" v-if="list.length != 0" v-for="(item, i) in list" :key="i">
						<uni-icons type="vip-filled" size="12" color="darkorange"></uni-icons>
						<text>{{item}}</text>
					</view>
					<text v-else>暂无标签</text>
				</view>
			</view>
		</view>
		<view class="footer">
			<button @click="clear">清除</button>
			<button @click="finish">完成</button>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				type: 1, //hobby或者tag
				keyword: '',				
				list: [],
				result: '',
			};
		},
		onLoad(value){
			if(value.type){
				this.type = value.type
				this.list = value.str.split(' ')
			}
		},
		methods: {
			...mapMutations('other',['SetTag','SetHobby']),
			add(){
				this.list.push(this.keyword) 
				this.keyword = ''
			},
			clear(){
				this.list = []
			},
			gotoBack(){
				uni.navigateBack()
			},
			finish(){
				this.list.forEach((item, i) => {
					this.result += item + (i === this.list.length - 1 ? '':' ')
				})
				if(this.type == 1){
					this.SetHobby(this.result)
				}else{
					this.SetTag(this.result)
				}
				this.gotoBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
.root{
	padding: 0 30rpx;
	
	.header {
	
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
	
	
		.header-left {
			display: flex;
			align-items: center;
			height: 100%;
	
			text {
				font-size: 36rpx;
				font-weight: bold;
				margin-left: 10rpx;
			}
	
		}
	
		.header-right {

		}
	}
	
	button{
		height: 60rpx;
		line-height: 60rpx;
		background: linear-gradient(#ffaa7f, #ff557f);
		color: #fff;
		font-size: 28rpx;
	}
	
	.box{
		margin-top: 30rpx;
	}
	
	.add{
		display: flex;
		align-items: center;
		height: 100rpx;
		justify-content: space-between;
		
		.input{
			border: 2rpx solid #ddd;
			border-radius: 20rpx;
			height: 80rpx;
			padding: 0 20rpx;
		}
			
	}
	
	
	
	.title{
		margin: 30rpx 0;
		font-size: 36rpx;
	}
	
	.result{
		border: 8rpx solid #eee;
		min-height: 80rpx;
		width: calc(100% - 80rpx);
		border-radius: 30rpx;
		padding: 30rpx;
		display: flex;
		flex-wrap: wrap;
		
		.item{
			padding: 5rpx 10rpx;
			margin: 10rpx 20rpx;
			display: flex;
			align-items: center;
			border: 4rpx solid #eee;
			border-radius: 20rpx;
			color: darkorange;
		}
	}
	
	.footer{
		margin-top: 50rpx;
		display: flex;
		justify-content: space-between;
	}
}
</style>
