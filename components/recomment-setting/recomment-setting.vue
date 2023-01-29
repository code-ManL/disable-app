<template>
	<view class="homeSetting">
		<view class="homeSetting-box">
			<!-- 头部按钮 -->
			<view class="homeSetting-header">
				<uni-icons type="closeempty" size="25" @click="closePopup"></uni-icons>
				<text>筛选</text>
				<text class="btnSure" @click="sendMessage">确定</text>
			</view>
			<!-- 选项区域 -->
			<scroll-view scroll-y="true" class="homeSetting-main" style="height: 850rpx">
				<view class="age-and-distance">
					<view class="box">
						<view class="top">
							<text class="title">年龄</text>
							<text
								class="value">{{ageRangeValue[0] + ' - ' + ageRangeValue[1] + (ageRangeValue[1] == ageRangeMax ? '+':'')}}</text>
						</view>
						<view class="bottom">
							<slider-range :value="ageRangeValue" :min="ageRangeMin" :max="ageRangeMax" :step="step"
								:bar-height="3" :block-size="26" background-color="#EEEEF6" active-color="#FF6B00"
								:decorationVisible="true" :tipVisible="false"
								@change="handleAgeRangeChange"></slider-range>
						</view>
					</view>
					<view class="box">
						<view class="top">
							<text class="title">距离</text>
							<text
								class="value">{{distanceRangeValue[0] + ' - ' + distanceRangeValue[1] + 'km'+ (distanceRangeValue[1] == distanceRangeMax ? '+':'')}}</text>
						</view>
						<view class="bottom">
							<slider-range :value="distanceRangeValue" :showLeft="false" :min="distanceRangeMin"
								:max="distanceRangeMax" :step="step" :bar-height="3" :block-size="26"
								background-color="#EEEEF6" active-color="#FF6B00" 
								:decorationVisible="true" :tipVisible="false" @change="handleDistanceRangeChange">
							</slider-range>
						</view>
					</view>
				</view>
				<view class="sex">
					<text class="title">显示性别</text>
					<view class="list">
						<view :class="'item' + (sexChoose == 0 ? ' active' : '')" @click="sexChoose = 0">
							<image src="../../static/icon/recomment/man.png" alt="" mode="aspectFill" />
							<text>男生</text>
						</view>
						<view :class="'item' + (sexChoose == 1 ? ' active' : '')" @click="sexChoose = 1">
							<image src="../../static/icon/recomment/woman.png" alt="" mode="aspectFill" />
							<text>女生</text>
						</view>
						<view :class="'item' + (sexChoose == 2 ? ' active' : '')" @click="sexChoose = 2">
							<image src="../../static/icon/recomment/no-limit.png" alt="" mode="aspectFill" />
							<text>不限</text>
						</view>
					</view>
				</view>
				<view class="tag">
					<text class="title">标签</text>
					<view class="list">
						<view :class="'item' + (tagChoose == i ? ' active' : '')" v-for="(item, i) in tags" :key="i"
							@click="tagChoose = i">
							<text>{{item}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import SliderRange from '@/components/primewind-sliderrange/components/primewind-sliderrange/index.vue'
	import filters from '../../apis/filter.js'
	export default {
		name: "recomment-setting",
		components: {
			SliderRange
		},
		data() {
			return {
				tags: ["靠谱", '温柔', '善良', '和蔼', '务实', '厚道', '喜欢简单', '成熟','开朗','正直','慷慨','自爱'],
				sexList: ['男', '女', '不限'],
				sexChoose: 3,
				tagChoose: 0,
				step: 1, //拖动的步长
				ageRangeMin: 18,
				ageRangeMax: 60,
				ageRangeValue: [18, 60],
				distanceRangeMax: 100,
				distanceRangeMin: 0,
				distanceRangeValue: [0, 100],
			};
		},
		methods: {
			handleAgeRangeChange(e) {
				this.ageRangeValue = e
			},
			handleDistanceRangeChange(e) {
				this.distanceRangeValue = e
			},
			closePopup() {
				this.$emit('closePopup')
			},
			sendMessage() {
				this.$emit('selectPopup', {
					//女2
					//男1
					age1: this.ageRangeValue[0],
					age2: this.ageRangeValue[1],
					distance: this.distanceRangeValue[1],
					sex: this.sexList[this.sexChoose]=="男"?1:this.sexList[this.sexChoose]=="女"?2:"",
					tag: this.tags[this.tagChoose],
				})

			}
		}
	}
</script>

<style lang="scss">
	// 弹出层的盒子设置
	.homeSetting {
		overflow: auto;
		background-color: transparent;

		.homeSetting-box {
			height: 100%;
			background-color: #fff;
			border-radius: 40rpx 40rpx 0 0;
			padding: 30rpx 20rpx 0 20rpx;

			.homeSetting-header {
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 32rpx;
				font-weight: bold;
				letter-spacing: 2rpx;
				border-bottom: 2rpx solid #eee;

				.btnSure {
					color: darkorange;
				}
			}

			.homeSetting-main {
				margin-top: 40rpx;

				.age-and-distance {
					.box {

						.top {
							display: flex;
							justify-content: space-between;

							.title {
								color: #777;
							}

							.value {
								font-weight: bold;
							}
						}

						.bottom {
							margin-top: -40rpx;
							width: 100%;
							margin-bottom: 20rpx;
						}
					}
				}

				.sex {
					.title {
						height: 60rpx;
						line-height: 60rpx;
						color: #777;
					}

					.list {
						height: 300rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.item {
						width: 200rpx;
						height: 200rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						border: 4rpx solid #eee;
						border-radius: 40rpx;

						image {
							width: 50rpx;
							height: 50rpx;
							margin-bottom: 20rpx;
						}
					}

					.active {
						border: 4rpx solid darkorange;
					}
				}

				.tag {
					.title {
						height: 60rpx;
						line-height: 60rpx;
						color: #777;
					}

					.list {
						width: 100%;
						display: flex;
						flex-wrap: wrap;

						.item {
							margin: 15rpx;
							padding: 10rpx 30rpx;
							border: 4rpx solid #eee;
							border-radius: 30rpx;

							text {
								font-size: 24rpx;
							}
						}

						.active {
							background-color: #fce6d8;
							color: darkorange;
							border: 4rpx solid transparent;
						}
					}
				}
			}
		}
	}
</style>
