<template>
	<view class="">
		<mover></mover>
		<view class="gruop-header">
			<view class="group-back" @click="gotoBack">
				<uni-icons type="back" size="25"></uni-icons>
			</view>
			<view class="header-item" v-for="(item,index) in titleList">
				<text @click="changeChoose(index)"
					:class="['header-contnet',index === active ? 'active' : '']">{{item}}</text>
			</view>
		</view>
		<view class="gruop-content">
			<group-item></group-item>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleList: ['最新', '我的', '筛选'],
				active: 0
			}
		},
		methods: {
			add() {
				uni.navigateTo({
					url: '/subpkg/xiangqing/xiangqing'
				})
			},
			changeChoose(index) {
				this.active = index
			},
			gotoBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.gruop-header {
		display: flex;
		height: 40px;
		border-bottom: 1px solid #f9f9f9;
		margin-bottom: 40px;
		.group-back{
			height: 100%;
			line-height: 40px;
			margin-left: 10px;
		}
		.header-item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;

			.header-contnet {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;

				&.active {
					color: #f79667;

					&::before {
						position: absolute;
						content: '';
						height: 1px;
						width: 100%;
						background-color: red;
						bottom: 0;
						left: 0;
					}
				}

			}

		}
	}
</style>
