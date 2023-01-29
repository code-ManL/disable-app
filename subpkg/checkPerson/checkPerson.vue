<template>
	<view class="root">
		<mover></mover>
		<view class="fixed">
			<!-- 头部 -->
			<view class="header">
				<view class="header-left">
					<uni-icons type="back" size="25" @click="gotoBack"></uni-icons>
					<text>编辑资料</text>
				</view>
				<view class="header-right" v-if="isPre">
					<text class="btnSend" @click="finish">完成</text>
				</view>
			</view>

			<!-- 选择编辑或者预览 -->
			<view class="banner">
				<view class="preScan"
					:style="isPre ? 'border-bottom: 6rpx solid darkorange;; color: darkorange;' : 'border-bottom: 6rpx solid #eee; color: #000;'"
					@click="isPre = true">
					<text>预览</text>
				</view>
				<view class="edit"
					:style="!isPre ? 'border-bottom: 6rpx solid darkorange;; color: darkorange;' : 'border-bottom: 6rpx solid #eee; color: #000;'"
					@click="isPre = false">
					<text>编辑</text>
				</view>
			</view>

			
		</view>

		<scroll-view scroll-y="true">
			<view class="sedMenu" v-if="!isPre">
				<!-- 菜单 -->
				<view class="menu">
					<view :class="type === 1 ? 'active' : ''" @click="type = 1">
						<text>基本资料</text>
					</view>
					<view :class="type === 2 ? 'active' : ''" @click="type = 2">
						<text>详细资料</text>
					</view>
					<view :class="type === 3 ? 'active' : ''" @click="type = 3">
						<text>择偶要求</text>
					</view>
				</view>
							
			</view>
			<view class="main">
				<personage 
				v-if="isPre" 
				:imageList="albumData"
				@gotoEdit="gotoEdit"
				></personage>
				<view v-else>								
					<baseCom 
					v-if="type === 1" 
					@changeImagesList="changeImagesList" 
					@changeBase="changeBase" 
					@nextPage="nextPage"
					></baseCom>
					<detail 
					v-else-if="type === 2" 
					@changeDetail="changeDetail" 
					@nextPage="nextPage"
					></detail>
					<marrary 
					v-else  
					@changeMarry="changeMarry" 
					@gotoPre="gotoPre"
					></marrary>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import baseCom from "@/components/person-information/base/base.vue"
	import detail from "@/components/person-information/detail/detail.vue"
	import marrary from "@/components/person-information/marrary/marrary.vue"
	import personage from '@/components/personage/index.vue'
	import my from '@/apis/my.js'
	import { mapState, mapMutations } from 'vuex'
	export default {
		name: "checkinformation",
		data() {
			return {
				// 是否为预览状态
				isPre: true,
				isFinish: false,
				type: 1,//三类资料组件切换			
				baseData: {},
				personData: {},
				albumData: [],
				
				cacheData: {},//缓存的更改数据
			};
		},
		components: {
			baseCom, detail, marrary, personage
		},
		computed: {
			// 引入个人数据
			...mapState('common',['baseInfo','moreInfo','albumInfo']),
		},
		mounted(){			
			this.getData()
		},
		methods: {
			...mapMutations('common',['setMoreInfo']),
			// 从预览页主动跳转至编辑
			gotoEdit(val){
				this.isPre = false
				this.type = val
			},
			// 获取信息
			async getData() {
				this.baseData = this.baseInfo
				this.personData = this.moreInfo
				this.albumData = this.albumInfo
				this.cacheData = this.moreInfo	
			},
			
			// 监视缓存数据
			// 相册缓存的更改信息				
			changeImagesList(val){
				this.albumData = val
			},
			// 改变基础信息
			changeBase(val){
				this.cacheData.personBasicInfo = val
			},
			// 改变详细信息
			changeDetail(val){
				this.cacheData.personDetailInfo = val
			},
			// 改变择偶信息
			changeMarry(val){
				this.cacheData.requirement = val
			},			
			
			// 下一页
			nextPage(){
				this.type++
			},
			
			// 更新数据调往预览页
			gotoPre(data){
				if(this.saveUpdate())
					this.isPre = true
			},
			// 更新数据
			async saveUpdate(){
				let success = false
				uni.showLoading({title: '数据更新中',mask:true})
				const {data: res1} = await my.changePersonBasicInfo(this.cacheData.personBasicInfo)
				const {data: res2} = await my.changePersonDetailInfo(this.cacheData.personDetailInfo)
				const {data: res3} = await my.changeRequirements(this.cacheData.requirement)
				uni.hideLoading()
							
				if(res1.resultCode === 200 && res2.resultCode === 200 && res3.resultCode === 200){
					this.setMoreInfo(this.cacheData)//更新vuex
					this.$showMsg("保存成功！")
					success = true
				}else{
					this.$showMsg("部分数据遗失！")
				}
				return success 			
			},

			// 返回
			gotoBack() {
				uni.switchTab({
					url: '/pages/person/person'
				})
			},
			// 保存修改
			finish() {				
				if(this.saveUpdate()){
					this.gotoBack()
				}					
			},
		}
	}
</script>

<style lang="scss" scoped>
	.fixed {
		position: sticky;
		top: 70rpx;
		z-index: 5;
	}

	.header {

		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		padding: 0 30rpx;


		.header-left {
			display: flex;
			align-items: center;
			height: 100%;

			text {
				font-size: 44rpx;
				font-weight: bold;
				margin-left: 10rpx;
			}

		}

		.header-right {
			display: flex;
			align-items: center;
			border-radius: 50rpx;
			padding: 10rpx 40rpx;
			height: 50rpx;
			background-color: #f9976f;

			.btnSend {
				display: inline-block;
				text-align: center;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}

	.banner {
		display: flex;
		justify-content: center;
		height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		background-color: #fff;
		margin-bottom: 20rpx;

		view {
			width: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 6rpx solid #eee;
			margin: 0 40rpx;
		}

		.preScan {
			border-bottom: 6rpx solid darkorange;
			color: darkorange;
		}

	}

	

	.sedMenu{
		background-color: #fff;
		padding: 30rpx;
		
		.menu {
		
			display: flex;
			box-sizing: border-box;
			font-size: 28rpx;
			height: 80rpx;
			background-color: #fff;
		
			view {
				width: 120rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 40rpx;
			}
		
			.active {
				color: darkorange;
			}
		}
		

	}

	.main {
		padding: 0 30rpx;
	}
	
	
</style>
