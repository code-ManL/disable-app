<template>
	<view>
		<!-- 搜索框 -->
		<view class="search">
			<uni-search-bar v-model="searchValue" @input="input" placeholder="搜索用户名称" clearable></uni-search-bar>
		</view>
		
		<!-- 列表 -->
		<view class="list" v-if="list.length != 0">
			<view class="item" v-for="(item, i) in list" :key="i">
				<view class="left">
					<image :src="item.headPicPath" mode="" />
					<view class="info">
						<text class="name">{{item.nickName}}</text>
					</view>
				</view>
				<view class="right">
					<text v-if="item.status === 1" @click="cancelAttention(item, i)">取消关注</text>
					<text v-else style="background-color: darkorange;" @click="addAttention(item, i)">回关</text>
				</view>
			</view>
		</view>
		<view class="empty" v-else>
			<text>你还没有粉丝关注哦！</text>
		</view>
	</view>
</template>

<script>
	import my from '@/apis/my.js'
	import { mapState } from 'vuex'
	export default {
		name:"fan",
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				searchValue: '',
			};
		},
		computed: {
			...mapState('user',['loginUser']),
		},
		methods: {
			
			async cancelAttention(item, i){
				const { data: res} = await my.cancelAttention({
					userId: item.userId,
					follower: this.loginUser.userId
				})
				if(res.resultCode === 200){
					this.$showMsg('取消成功！')
					this.$set(this.list[i], 'status', 1)
				}
			},
			async addAttention(item, i){
				const { data: res} = await my.addAttention({
					userId: item.userId,
					follower: this.loginUser.userId
				})
				if(res.resultCode === 200){
					this.$showMsg('回关成功！')
					this.$set(this.list[i], 'status', 2)
				}
				console.log(res);
			}
		}
	}
</script>

<style lang="scss" scoped>
.item{
	height: 120rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 20rpx 0;
	    padding: 0 40rpx;
	    box-sizing: border-box;
	.left{
		display: flex;
		align-items: center;
		
		image{
			height: 100rpx;
			width: 100rpx;
			border-radius: 50%;
			margin-right: 20rpx;
			border: 2rpx solid #eee;
		}
		
		.info{
			width: 300rpx;
			
			h2{
				font-size: 14px;
			}
			
			p{
				font-size: 12px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		
		
	}
	.right{
		
		text{
			padding: 10rpx 30rpx;
			border-radius: 10rpx;
			background-color: darkorange;	
			color: #fff;
		}
	}
}

.item:not(:last-child){
	border-bottom: 2rpx solid #eee;
}

.empty{
	width: 100%;
	height: 200rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	
	text{
		color: #777;
	}
}
</style>