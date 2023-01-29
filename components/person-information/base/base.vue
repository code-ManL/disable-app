<template>
	<view>
		<myProgress :data="data"></myProgress>

		<!-- tip -->
		<view class="tip">
			<p>各位用户，个人资料内容需要遵守相关法律法规和社区规定，需要审核后才能生效，请严格遵守规定填写资料</p>
		</view>

		<!-- images -->
		<view class="image-active">
			<view class="image-list">
				<view class="image-item" v-for="(item, i) in userImages" :key="i" @click="uploadActiveImage(item, i)">
					<view class="box" v-if="item.picPath">
						<image :src="item.picPath" mode="aspectFill" alt=""></image>
						<view class="close" @click="deleteActiveImage(item, i)">
							<uni-icons type="closeempty" size="16" color="darkorange"></uni-icons>
						</view>
						<view v-if="i === 0" class="host">
							<text>主图</text>
						</view>
					</view>
					<view class="" v-else>
						<uni-icons type="auth" size="50" color="#eee"></uni-icons>
					</view>
				</view>

			</view>
			<view class="image-text">
				<text>{{baseInfo.isVip == 1 ? '特权用户可上传9':'图片秀仅限6'}}张图片哦！</text>
			</view>
		</view>

		<view class="section">
			<text class="label">个人MV</text>
			<view class="content" @click="chooseVedio()">
				<view v-if="!data.mv" class="camera">
					<text>点击上传</text>
					<uni-icons class="icon-camera" type="camera-filled" size="30" color="#ffb795"></uni-icons>
				</view>
				<text v-else>已上传成功！</text>
			</view>
		</view>


		<view class="section">
			<text class="label">用户名</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.personName">
			</view>
		</view>

		<view class="section">
			<text class="label">年龄</text>
			<view class="content" @click="tips">
				<text>{{data.age}}</text>
				<text class="unit">岁</text>
			</view>
		</view>

		<view class="section">
			<text class="label">性别</text>
			<view class="content" @click="tips">
				<text>{{data.sex == 1 ? '男' : '女'}}</text>
			</view>
		</view>

		<view class="section">
			<text class="label">身高</text>
			<view class="content">
				<input type="number" class="input" placeholder="请输入" v-model="data.height">
				<text class="unit">cm</text>
			</view>
		</view>

		<view class="section">
			<text class="label">体重</text>
			<view class="content">
				<input type="number" class="input" placeholder="请输入" v-model="data.weight">
				<text class="unit">斤</text>
			</view>
		</view>

		<view class="diliver">

		</view>

		<view class="section">
			<text class="label">工作地区</text>
			<view class="content">
				<input type="text" class="input" placeholder="请选择地区" @click="openAddres1" disabled="true"
					v-model="data.workAddr">
				<lb-picker ref="picker1" mode="multiSelector" :list="workAddr" :level="3" :dataset="{ name: '1' }"
					@confirm="bindworkAddrChange">
				</lb-picker>
			</view>
		</view>

		<view class="section">
			<text class="label">户籍情况</text>
			<view class="content">
				<view class="content">
					<input type="text" class="input" placeholder="请选择地区" @click="openAddres2" disabled="true"
						v-model="data.householdAddr">
					<lb-picker ref="picker2" mode="multiSelector" :list="workAddr" :level="3" :dataset="{ name: '2' }"
						@confirm="bindhouseholdAddrChange">
					</lb-picker>
				</view>
			</view>
		</view>

		<view class="section">
			<text class="label">婚姻情况</text>
			<view class="content">
				<picker @change="bindmaritalStatusChange" :range="maritalStatus" :value="data.maritalStatus">
					<view v-if="data.maritalStatus" class="uni-input">
						{{maritalStatus[data.maritalStatus] || data.maritalStatus }}
					</view>
					<view v-else>请选择</view>
				</picker>
			</view>
		</view>

		<view class="section">
			<text class="label">学历</text>
			<view class="content">
				<picker @change="binddegreeChange" :range="degree" :value="data.degree">
					<view v-if="data.degree" class="uni-input">
						{{degree[data.degree] || data.degree}}
					</view>
					<view v-else>请选择</view>
				</picker>
			</view>
		</view>

		<view class="section">
			<text class="label">月收入</text>
			<view class="content">
				<input type="number" class="input" placeholder="请输入" v-model="data.income">
				<text class="unit">元</text>
			</view>
		</view>

		<view class="diliver">
		</view>

		<view class="section">
			<text class="label">职业</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.occupation">
			</view>
		</view>

		<view class="section">
			<text class="label">住房情况</text>
			<view class="content">
				<picker @change="bindhousingStatusChange" :range="housingStatus" :value="data.housingStatus">
					<view v-if="data.housingStatus" class="uni-input">
						{{housingStatus[data.housingStatus] || data.housingStatus}}
					</view>
					<view v-else>请选择</view>
				</picker>
			</view>
		</view>

		<view class="section">
			<text class="label">购车情况</text>
			<view class="content">
				<picker @change="bindcarStatusChange" :range="carStatus" :value="data.carStatus">
					<view v-if="data.carStatus" class="uni-input">
						{{carStatus[data.carStatus] || data.carStatus}}
					</view>
					<view v-else>请选择</view>
				</picker>
			</view>
		</view>


		<view class="section">
			<text class="label">期待结婚时间</text>
			<view class="content">
				<!-- <input type="text" class="input" placeholder="请输入" v-model="data.expectedMarryTime"> -->
				<picker mode="date" :value="data.expectedMarryTime" :start="startDate" :end="endDate"
					@change="bindexpectedMarryTimeChange">
					<view class="uni-input">{{data.expectedMarryTime}}</view>
				</picker>
			</view>
		</view>

		<view class="section">
			<text class="label">自我介绍</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.personIntro">
			</view>
		</view>

		<view class="section">
			<text class="label">爱情宣言</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.personSign">
			</view>
		</view>

		<view class="diliver">

		</view>

		<view class="section">
			<text class="label">手机</text>
			<view class="content" @click="tips">
				<text>{{data.phone}}</text>
			</view>
		</view>

		<view class="section">
			<text class="label">微信</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.wechat">
			</view>
		</view>

		<view class="section">
			<text class="label">微信二维码</text>
			<view class="content" @click="chooseimage()">
				<view v-if="!data.wechatCodeImagesPath" class="camera">
					<text>点击上传</text>
					<uni-icons class="icon-camera" type="camera-filled" size="30" color="#ffb795"></uni-icons>
				</view>
				<text v-else>已上传成功！</text>
			</view>
		</view>

		<view class="section">
			<text class="label">QQ</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.qq">
			</view>
		</view>

		<view class="section">
			<text class="label">邮箱</text>
			<view class="content">
				<input type="text" class="input" placeholder="请输入" v-model="data.email">
			</view>
		</view>

		<view class="btn-next">
			<button @click="nextPage">下一步</button>
		</view>
	</view>
</template>

<script>
	import myProgress from "@/components/person-information/progress/progress.vue"
	import {
		mapState
	} from 'vuex'
	import LbPicker from '@/components/lb-picker'
	import areaInfo from "./area-data-min.js"
	import {
		getDate
	} from "@/apis/tools"
	import my from '@/apis/my.js'
	export default {
		data() {
			const maritalStatus = ['请选择', '未婚', '二婚', '已婚']
			const degree = ['请选择', '小学', '初中', '高中', '本科', '中专', '职高', '大专', '其他']
			const housingStatus = ['请选择', '已买房', '未买房']
			const carStatus = ['请选择', '已买车', '未买车']
			const currentDate = getDate({
				format: true
			})
			return {
				workAddr: areaInfo,
				maritalStatus,
				degree,
				housingStatus,
				carStatus,
				data: {
					workAddr: ""
				},
				uploadPostion: 1, //上传类型，1动态，2头像，3微信二维码
				userImages: [],
			};
		},
		components: {
			myProgress,
			LbPicker
		},
		computed: {
			...mapState('common', ['baseInfo', 'moreInfo', 'albumInfo']),
			startDate() {
				return getDate('start');
			},
			endDate() {
				return getDate('end');
			}
		},
		watch: {
			userImages: {
				deep: true,
				handler(val) {
					this.$emit('changeImagesList', val)
				}
			},
			data: {
				deep: true,
				handler(val) {
					this.$emit('changeBase', val)
				}
			},
		},
		created() {
			console.log(this.albumInfo);
			this.data = this.moreInfo.personBasicInfo ? this.moreInfo.personBasicInfo : {}
			this.userImages = this.fillInGaps(this.albumInfo)
			console.log(this.userImages);
			this.householdAddr = this.workAddr
		},
		methods: {
			// 选择MV视频
			chooseVedio() {
				let that = this;
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: function(res) {
						uni.showLoading({
							title: '视频上传中，请耐心等待',
							mask: true
						})
						uni.uploadFile({
							url: that.vuex_uploadAction,
							filePath: res.tempFilePath,
							name: 'file',
							header: {
								token: "" // 挂载请求头为用户的 token
							},
							success: function(arr) {
								uni.hideLoading()
								let data = JSON.parse(arr.data);
								that.$set(that.data, 'mv', data.data.url)
							}
						});
					}
				});
			},

			// 不足6张图片补齐空位,vip9张
			fillInGaps(albumInfo) {
				let len = 6
				if (this.baseInfo.isVip == 1)
					len = 9
				if (albumInfo.length === len) return albumInfo
				let data = albumInfo			
				for (let i = albumInfo.length; i < len; i++) {
					data.push({
						createTime: '',
						id: '',
						likeCounts: '',
						picDesc: '',
						picPath: '',
						status: '',
						userId: this.baseInfo.personId,
					})
				}
				return data
			},

			openAddres1() {
				this.$refs.picker1.show();
			},

			openAddres2() {
				this.$refs.picker2.show();
			},
			// 选择户籍地区
			bindhouseholdAddrChange(e) {
				// 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
				if (e) {
					const name = e.dataset.name;
					this.data.householdAddr = e.item.map(m => m.label).join('-');
				}
			},
			// 选择户籍地区
			bindworkAddrChange(e) {
				// 如果存在多个picker，可以在picker上设置dataset属性，confirm中获取，就能区分是哪个picker了
				if (e) {
					this.data.workAddr = e.item.map(m => m.label).join('-');
				}
			},
			// 上传动态图片
			async uploadActiveImage(obj, i) {
				let that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						res.tempFilePaths.forEach((item) => {
							uni.showLoading({
								title: '图片加载中',
								mask: true
							})
							uni.uploadFile({
								url: that.vuex_uploadAction,
								filePath: item,
								name: 'file',
								header: {
									token: "" // 挂载请求头为用户的 token
								},
								success: function(arr) {
									uni.hideLoading()
									let data = JSON.parse(arr.data);
									if (item.id) {
										that.changeActiveImage(obj, i, data.data.url)
									} else {
										that.addActiveImage(obj, i, data.data.url)
									}
								}
							});
						})
					}
				});


			},
			// 更新动态的一张图片
			async changeActiveImage(item, i, url) {
				delete item.createTime
				item.picPath = url
				uni.showLoading({
					title: '图片更新中',
					mask: true
				})
				const {
					data: res
				} = await my.changePicture(item)
				uni.hideLoading()
				if (res.resultCode == 200) {
					this.$set(this.userImages[i], 'picPath', url)
					this.$showMsg('修改成功！')
				}
			},
			// 添加动态的一张图片
			async addActiveImage(item, i, url) {
				delete item.createTime
				delete item.id
				item.picPath = url
				uni.showLoading({
					title: '图片上传中',
					mask: true
				})
				const {
					data: res
				} = await my.addPicture(item)
				uni.hideLoading()
				if (res.resultCode == 200) {
					console.log(this.userImages[i].picPath);
					this.$set(this.userImages[i], 'picPath', url)
					this.$showMsg('添加成功！')
				}
			},
			// 删除动态的一张图片
			deleteActiveImage(item, i) {
				uni.showLoading({
					title: '图片正在删除',
					mask: true
				})
				my.deletePicture({
					id: item.id
				}).then(res => {
					uni.hideLoading()
					this.$showMsg(res.data.message)
					if (!res.data.message.includes('删除失败')) {
						this.userImages.splice(i, 1)
						this.userImages.push({
							createTime: '',
							id: '',
							likeCounts: '',
							picDesc: '',
							picPath: '',
							status: '',
							userId: this.baseInfo.personId,
						})
					}

				})
				event.stopPropagation() //组织事件冒泡

			},

			tips() {
				this.$showMsg('该信息不可更改！')
			},

			nextPage() {
				this.$emit('nextPage', null)
			},
			//期待结婚时间
			bindexpectedMarryTimeChange(e) {
				this.data.expectedMarryTime = e.detail.value
			},
			//学历
			binddegreeChange(e) {
				this.data.degree = e.detail.value
			},
			//选择买房
			bindhousingStatusChange(e) {
				this.data.housingStatus = e.detail.value
			},
			// 选择买车
			bindcarStatusChange(e) {
				this.data.carStatus = e.detail.value
			},
			// 选择婚姻情况
			bindmaritalStatusChange(e) {
				this.data.maritalStatus = e.detail.value
			},


			// 拍照
			chooseimage() {
				var that = this;
				uni.showActionSheet({
					itemList: ['相册', '拍照'],
					itemColor: "darkorange",
					success: function(res) {
						if (!res.cancel) {
							if (res.tapIndex == 0) {
								that.chooseWxImage('album')
							} else if (res.tapIndex == 1) {
								that.chooseWxImage('camera')
							}
						}
					}
				})
			},

			// 调用微信图片
			chooseWxImage(type) {
				let that = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'],
					sourceType: [type],
					success: function(res) {
						res.tempFilePaths.forEach((item) => {
							uni.uploadFile({
								url: that.vuex_uploadAction,
								filePath: item,
								name: 'file',
								header: {
									token: "" // 挂载请求头为用户的 token
								},
								success: function(arr) {
									let data = JSON.parse(arr.data);
									that.$set(that.data, 'wechatCodeImagesPath', data.data
										.url)
								}
							});
						})
					}
				});
			},

			// 跳转到编辑详情页面
			gotoEditDetail(value) {
				uni.navigateTo({
					url: '/subpkg/editDetail/editDetail?id=' + value
				})
			},

		}
	}
</script>

<style lang="scss">
	.tip {
		margin-top: 20rpx;
		color: #777;
		align-items: center;
		margin-bottom: 40rpx;
		font-size: 24rpx;
	}

	.image-active {
		.image-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.image-item {
				height: 300rpx;
				width: calc((100% - 80rpx) / 3);

				margin: 10rpx 0;
				border: 4rpx dotted #ccc;
				border-radius: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.box {
					position: relative;
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
						border-radius: 30rpx;
					}

					.close {
						position: absolute;
						bottom: 20rpx;
						right: 20rpx;
						height: 50rpx;
						width: 50rpx;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #fff;
					}

					.host {
						position: absolute;
						top: 20rpx;
						left: 20rpx;
						width: 100rpx;
						height: 60rpx;
						border-radius: 20rpx;
						font-size: 24rpx;
						color: #fff;
						background-color: rgba(0, 0, 0, 0.3);
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}

		.image-text {
			margin: 50rpx 0;
			text-align: center;
			color: #ddd;
		}
	}


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
			display: flex;
			align-items: center;

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
				font-size: 24rpx;
				text-align: right;
			}

			.unit {
				margin-left: 10rpx;
				font-size: 24rpx;
				font-family: 'kaiti';
			}
		}

	}

	.section:not(:last-child) {
		border-bottom: 2rpx solid #eee;
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
