<template>
	<view>
		<myProgress :data="data"></myProgress>
		
		<view class="section">
			<text class="label">年龄范围</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.ageRange">
			</view>
		</view>

		<view class="section">
			<text class="label">身高范围</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.heightRange">
			</view>
		</view>

		<view class="section">
			<text class="label">婚姻情况</text>
			<view class="content">
				<picker @change="bindmarryStatusChange" :range="marryStatus" :value="data.marryStatus">
					<view v-if="data.marryStatus" class="uni-input">
						{{marryStatus[data.marryStatus] || data.marryStatus}}
					</view>
					<view v-else>请选择</view>
				</picker>
			</view>
		</view>

		<view class="section">
			<text class="label">教育背景</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.educationBackground">
			</view>
		</view>
		
		<view class="diliver"></view>
		
		<view class="section">
			<text class="label">收入要求</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.income">
			</view>
		</view>
		
		<view class="section">
			<text class="label">购房情况</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.housingStatus">
			</view>
		</view>
		
		<view class="section">
			<text class="label">购车情况</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.carStatus">
			</view>
		</view>
		
		<view class="section">
			<text class="label">其他要求</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.otherRequirements">
			</view>
		</view>

		<view class="diliver"></view>

		<view class="btn-next">
			<button @click="gotoPre">保存资料</button>
		</view>
	</view>
</template>

<script>
	import myProgress from "@/components/person-information/progress/progress.vue"
	import { mapState } from 'vuex'
	export default {
		data() {
			const marryStatus = ['请选择', '未婚', '二婚', '已婚']
			return {
				marryStatus,
				data: {
					ageRange: '',
					heightRange: '',
					marryStatus: '',
					educationBackground: '',
					income: '',
					housingStatus: '',
					carStatus: '',
					otherRequirements: '',
				}
			};
		},
		components: {
			myProgress
		},
		computed: {
			...mapState('common', ['moreInfo']),
		},
		watch: {
			data: {
				deep: true,
				handler(val){
					this.$emit('changeMarry', val)
				}
			}
		},
		created(){
			this.data = this.moreInfo.requirement
		},
		methods: {
			gotoPre() {
				this.$emit('gotoPre', null)
			},
			// 单位类型
			bindmarryStatusChange(e) {
				this.data.marryStatus = e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	.section {
		height: 110rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.label {
			font-weight: bold;
		}

		.content {
			color: #989898;

			.camera {
				border: 2rpx solid #ffb795;
				display: flex;
				align-items: center;
				height: 50rpx;
				padding: 0 20rpx;
				border-radius: 50rpx;

				text {
					color: #ffb795;
				}

				.icon-camera {
					margin-left: 20rpx;
				}
			}

			.input {
				font-size: 28rpx;
				text-align: right;
			}
		}

	}

	.section:not(:last-child) {
		border-bottom: 2rpx solid #eee;
	}

	.section-bottom {
		border-bottom: 8rpx solid #eee;
	}

	.diliver {
		width: 100%;
		height: 8rpx;
		background-color: #eee;
	}

	.btn-next {
		margin: 30rpx 0;

		button {
			border-radius: 20rpx;
			color: #fff;
			background: linear-gradient(#ffaa7f, #ff557f);
		}
	}
</style>
