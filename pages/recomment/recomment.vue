<template>
	<view class="home-container">
		<mover v-if="header">
			<view slot="content">首页</view>
		</mover>
		<!-- 头部 -->
		<uni-transition ref="ani" custom-class="transition" mode-class="fade" :show="header">
			<view :animation="animationHeader" class="home-header">
				<view class="header-left">
					<text @click="isImages = true">
						<text
							:style="isImages?'color: darkorange; font-weight: bold':'color: #000000; font-weight: normal'">图片秀</text>
					</text>
					<text @click="isImages = false">
						<text
							:style="!isImages?'color: darkorange; font-weight: bold':'color: #000000; font-weight: normal'">视频秀</text>
					</text>
				</view>
				<view class="header-right">
					<image @click="gotoSearch" src="@/static/images/home/seach.png" style="margin-right: 22rpx;">
					</image>
					<image @click="openPopup" v-if="isImages" src="@/static/images/home/screen.png"></image>
				</view>
			</view>
		</uni-transition>

		<template v-if="isImages">
			<view class="home-body" :style="{'margin-top':StatusBar+'px','position':'absolute'}">
				<view class="back-detail" @click="backdetail" v-if="!header">
					<image src="@/static/images/home/shang.png"></image>
				</view>
				<movable-area :animation="animationData" class="movable-area movable-area0">
					<movable-view id="1" :x="x" :y="y" out-of-bounds="true" class="movable-view" show-scrollbar
						direction="all" @change="onChange" :disabled="movedisable">
				<swiper style="width: 100%;height: 100%;" circular @change="changeSwiper" :current="selectIndex" :indicator-dots="indicatorDots">
					<swiper-item v-for="(item,index) in imgList" :key="index" style="overflow: auto;">
						<view class="home-swiper" v-if="header">
							<image :src="item.headPath" @click="header=false" class="swiper-img" mode="aspectFill">
							</image>
							<view class="swiper_detail">
								<view class="mask">
								</view>

								<view class="userName">
									{{item.username}}
								</view>
								<view class="userDetail">
									<text>{{item.houseAddress}}</text>
									<!-- 前往详情页 -->
									<image @click="checkDetail" src="@/static/images/home/shang.png" mode="aspectFill">
									</image>
								</view>
								<view class="userConstellation">
									<text>{{item.disableType}}（{{item.disableLevel}}级）</text>
									<text>{{item.age}}岁</text>
								</view>
								<view class="control">
									<view class="back" @click="NoDislikeUser(item,index)">
										<image src="@/static/images/home/5.png"></image>
									</view>

									<view class="cancel" @click="disLike(item,index)">
										<image src="@/static/images/home/3.png"></image>
									</view>

									<view class="like" @click="like(item,index)">
										<image src="@/static/images/home/1.png"></image>
									</view>

									<view class="collection" @click="collect(item)">
										<image src="@/static/images/home/4.png" v-if="!attentionShow"></image>
										<image src="@/static/images/home/4-1.png" v-else></image>
									</view>
								</view>
							</view>
						</view>

						<template v-else>
							<person-info @backdetail="backdetail" :isTemplate="true" :items="obj"></person-info>
						</template>
					</swiper-item>
				</swiper>
					</movable-view>
				</movable-area>
			</view>
		</template>

		<template v-else>
			<videos></videos>
		</template>
		<!-- 设置按钮的弹框 -->
		<uni-popup ref="homeSetting">
			<recomment-setting @closePopup="closePopup" @selectPopup="selectPopup"></recomment-setting>
		</uni-popup>

		<!-- 提示或者广告按钮的弹框 -->
		<uni-popup ref="recommentAdver" mask-background-color="rgba(0,0,0,0.2)">
			<recomment-adver @closeAdver="closeAdver"></recomment-adver>
		</uni-popup>


	</view>
</template>

<script>
	import personage from '@/components/personage/index.vue'
	import videos from './video.vue'
	import recomment from "@/apis/recomment.js"
	export default {
		components: {
			videos,
			personage
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				// 是否展示图片组件
				isImages: true,
				// 主题，默认白色
				theme: {
					backgroundColor: '#fff',
					backgroundImage: '',
				},
				movedisable: false,
				footer: false,
				animationDetail: {},
				animationHeader: {},
				header: true,
				animationData: {},
				// 用户信息
				personageData: {},
				selectIndex: 0,
				obj: {
					username: "",
					disableType: "",
					disableLevel: "",
					age: "",
					headPath: "",
					houseAddress: "",
					hobbies: [],
					picShow: [],
					tags: []
				},

				nowid: 3,
				x: 0,
				y: 0,
				old: {
					x: 0,
					y: 0
				},
				page: {
					page: 1,
					size: 10,
					age1: "",
					age2: "",
					distance: "",
					sex: "",
					tag: "",
				},
				imgList: [],
				showMove: false,
				collectShow: false,
				attentionShow: false
			}
		},
		onLoad() {
			this.loadAdver();
			this.getRecommentList();
		},
		methods: {
            
            //切换用户
            changeSwiper(e){
                this.selectIndex=e.detail.current;
                this.obj = this.imgList[this.selectIndex];
            },
			//撤回不喜欢
			NoDislikeUser(item,index) {
				recomment.cancelDislikeUser({
					user_id: "",
					dislike_user_id: ""
				}).then((res) => {

				}).catch(() => {

				})
			},
			//不喜欢用户
			disLike(item,index) {
				recomment.dislikeUser({
					dislikeUserId: item.userId+""
				}).then((res) => {
                     this.imgList.splice(index,1)
				}).catch(() => {

				})
			},

			//喜欢用户
			like(item,index) {
				recomment.loveUser({
					likedUserId: this.obj.userId
				}).then((res) => {
                    uni.showToast({
                        icon:"none",
                        title:"已喜欢用户，等待回复"
                    })
                    setTimeout(()=>{
                        this.imgList.splice(index,1)
                    },1500)
					// this.moveOutrb();
				}).catch(() => {

				})
			},

			//收藏
			collect() {
				recomment.collect({
					userId: this.$store.state.user.loginUser.userId ? this.$store.state.user.loginUser.userId : "",
					type: "2",
					likedId: this.obj.userId
				}).then((res) => {
					if (this.collectShow) {
						this.collectShow = false;
						uni.showToast({
							icon: "none",
							title: "收藏成功"
						})
					} else {
						this.collectShow = true;
						uni.showToast({
							icon: "none",
							title: "已取消"
						})
					}

				}).catch(() => {

				})
			},


			//获取图片秀list
			getRecommentList() {
				recomment.getRecomment(this.page).then(response => {
					if (this.page.page == 1) {
						this.obj = response.data.data[0] ? response.data.data[0] : {
							headPath: "",
							houseAddress: "",
							hobbies: [],
							picShow: [],
							tags: []
						};
						this.imgList = response.data.data;
						this.selectIndex = 0;
						this.collectShow = this.imgList[this.selectIndex].alreadyCollect == 1 ? true : false;
					} else {
						this.imgList = this.imgList.concat(response.data.data);
					}
				}).catch(error => {

				})
			},

			// 关闭提示广告
			closeAdver() {
				this.$refs.recommentAdver.close()
				// localStorage.setItem('isFirstAdver', true)
			},
			// 弹出广告
			loadAdver() {
				// if (localStorage.getItem('tipToFileData')) return;
				// let $this = this
				// setTimeout(function() {
				// 	$this.$refs.recommentAdver.open('center')
				// }, 1000)
			},
			// 关闭筛选弹出层
			closePopup() {
				// console.log(obj); //筛选的数据
				this.$refs.homeSetting.close()
			},
			selectPopup(item) {
				this.page = {
					page: 1,
					size: 10,
					age1: item.age1,
					age2: item.age2,
					distance: item.distance,
					sex: item.sex,
					tag: item.tag,
				};
				this.$refs.homeSetting.close()
				this.getRecommentList()
			},
			// 弹出筛选弹出层
			openPopup() {
				this.$refs.homeSetting.open('bottom')
			},

			// 筛选
			shaixuan() {
				this.$showMsg('筛选功能未开放')
			},
			// 跳转到搜索页面
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},

			// 详情页返回
			backdetail() {
				this.header = true;
				this.footer = false;
				this.movedisable = false;
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				this.animation = animation
				this.animation.translateY(0).width(95 + "%").height(100 + "%").top(0 + "rpx").step()
				this.animationData = this.animation.export()
			},

			// 拖动的
			tap(e) {
				this.x = this.old.x
				this.y = this.old.y
				this.$nextTick(function() {
					this.x = 30
					this.y = 30
				})
			},

			// 进入详情页
			checkDetail() {
				this.footer = true;
				this.header = false;
				this.movedisable = true;
				this.animationData = {};
				var animation = uni.createAnimation({
					duration: 1000,
					timingFunction: 'ease',
				})
				this.animation = animation
				this.animation.width(100 + 'vw').top(-10 + "rpx").step()
				this.animationData = this.animation.export()
			},

			clear() {
				this.animation.rotate(0).translateY(0).translateX(0).step()
			},

			// 四种动画方式
			moveOutlb() {
				this.animation.translateY(230).rotate(-10).translateX(-500).step();
				this.clear()
				this.animationData = this.animation.export()
			},

			moveOutlt() {
				this.animation.translateY(-230).rotate(-10).translateX(-500).step()
				this.clear()
				this.animationData = this.animation.export()
			},

			moveOutrb() {
				this.animation.translateY(230).rotate(10).translateX(500).step()
				this.clear()
				this.animationData = this.animation.export()
			},

			moveOutrt() {
				this.animation.translateY(-230).rotate(10).translateX(500).step()
				this.clear()
				this.animationData = this.animation.export()
			},

			// 控制动画的播放
			onChange(e) {
				// this.animationData = {};
				// let x = e.detail.x
				// let y = e.detail.y
				// let distance = 5 // 控制拖动长度

				// if (Math.abs(x) >= distance && Math.abs(y) >= distance) {
				// 	// this.moveOutlb((e.detail.x,e.detail.y))
				// 	var animation = uni.createAnimation({
				// 		duration: 500,
				// 		timingFunction: 'ease-in-out',
				// 	})
				// 	this.animation = animation;
				// 	if (x < 0 && y > 0) {
				// 		this.moveOutlb();
				// 		if (!this.showMove) {
				// 			setTimeout(() => {
				// 				this.disLike();
				// 				this.showMove = false;
				// 			}, 1000)
				// 		}
				// 		this.showMove = true;
				// 	} else if (x < 0 && y < 0) {
				// 		this.moveOutlt()
				// 		if (!this.showMove) {
				// 			setTimeout(() => {
				// 				this.disLike();
				// 				this.showMove = false;
				// 			}, 1000)
				// 		}
				// 		this.showMove = true;
				// 	} else if (x > 0 && y < 0) {
				// 		this.moveOutrt()
				// 		if (!this.showMove) {
				// 			setTimeout(() => {
				// 				this.like();
				// 				this.showMove = false;
				// 			}, 1000)
				// 		}
				// 		this.showMove = true;
				// 	} else {
				// 		this.moveOutrb();
				// 		if (!this.showMove) {
				// 			setTimeout(() => {
				// 				this.like();
				// 				this.showMove = false;
				// 			}, 1000)
				// 		}
				// 		this.showMove = true;
				// 	}
				// }

				// this.nowid = e.target.id
			}
		},
	}
</script>

<style lang="scss" scoped>
	.back-detail {
		position: absolute;
		top: 50rpx;
		left: 30rpx;
		z-index: 2;
		color: #fff;
		font-size: 40rpx;
		font-weight: bold;
		padding: 0 20rpx;
		border-radius: 10rpx;
		transform: rotate(-90deg);

		image {
			width: 46rpx;
			height: 46rpx;
		}
	}

	.home-container {
		box-sizing: border-box;
		width: 100%;

		.home-header {
			height: 100rpx;
			transition: all 1s;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			z-index: 2;

			.header-left {
				margin-left: 20rpx;
				display: flex;
				height: 100%;
				align-items: center;
				font-size: 40rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FB966E;

				text {
					margin-right: 40rpx;
				}
			}

			.header-right {
				margin-right: 20rpx;
				position: relative;
				z-index: 4;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.home-body {
			height: calc(100% - 170rpx);
			border-radius: 20rpx;
			width: 100%;
			perspective: 800;
			display: flex;
			bottom: 0;
			justify-content: center;

			.movable-area,
				{
				width: 95%;
				height: 98%;
				border-radius: 20rpx;
				position: absolute;

				.movable-view {
					box-sizing: border-box;
					height: 100%;
					width: 100%;
				}

				.home-swiper {
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
					position: relative;
					z-index: 0;

					image {
						width: 100%;
						height: 100%;
						border-radius: 20rpx;
					}

					.back-detail {
						position: absolute;
						top: 50rpx;
						left: 30rpx;
						z-index: 2;
						color: #fff;
						font-size: 40rpx;
						font-weight: bold;
						padding: 0 20rpx;
						border-radius: 10rpx;
						transform: rotate(-90deg);

						image {
							width: 46rpx;
							height: 46rpx;
						}
					}

					.mask {
						position: absolute;
						background: linear-gradient(to top, black 50%, transparent);
						left: 0;
						z-index: -1;
						bottom: 0;
						width: 100%;
						height: 100%;
						border-radius: 20rpx;
					}

					.swiper_detail {
						box-sizing: border-box;
						position: absolute;
						padding: 20rpx;
						left: 0;
						width: 100%;
						padding: 20rpx 20rpx 40rpx;
						bottom: 0;
						z-index: 1;
						color: white;
						font-size: 30rpx;
						line-height: 70rpx;

						.userName {
							font-size: 50rpx;

						}

						.userDetail {
							display: flex;
							align-items: center;
							justify-content: space-between;

							image {
								width: 46rpx;
								height: 46rpx;
							}
						}

						.userConstellation {
							padding: 10rpx;

							// background-color: white;
							text {
								padding: 6rpx 20rpx;
								border-radius: 10rpx;
								font-size: 24rpx;
								background-color: #56B2EA;
								color: #ffffff;
								margin-right: 20rpx;
							}
						}

						.control {
							display: flex;
							align-items: center;
							justify-content: space-around;
							margin-top: 10rpx;
							// background-color: yellow;

							.back {
								width: 92rpx;
								height: 92rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 92rpx;
								background: #ffffff30;
							}

							.cancel {
								width: 196rpx;
								height: 92rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 92rpx;
								background: #ffffff30;
							}

							.like {
								width: 198rpx;
								height: 92rpx;
								display: flex;
								justify-content: center;
								border-radius: 92rpx;
								align-items: center;
								background: #ffffff30;
							}

							.collection {
								width: 92rpx;
								height: 92rpx;
								display: flex;
								justify-content: center;
								align-items: center;
								border-radius: 92rpx;
								background: #ffffff30;
							}

							image {
								width: 38rpx;
								height: 38rpx;
							}
						}
					}



					.swiper {
						width: 100%;
						height: 100%;
						background-color: yellow;


						.swiper-item {
							background-color: aliceblue;
							width: 100%;
							height: 100%;

							image {
								border-radius: 60rpx;
								width: 100%;
								height: 100%;
							}
						}
					}

					.footer {
						box-sizing: border-box;
						padding: 20rpx;

						.footer-header {
							margin-bottom: 60rpx;

							.userName {
								display: flex;
								align-items: center;
								justify-content: space-between;
								font-size: 54rpx;

								.focus {
									background-color: #FB966E;
									padding: 12rpx 22rpx;
									border-radius: 26rpx;
									color: white;
									font-size: 26rpx;
								}
							}

							.address {
								margin-top: 16rpx;
								color: #000000;

								.point {
									&:before {
										content: " ";
									}

									&:after {
										content: " ";
									}
								}
							}
						}

						.photos,
						.mv {
							padding-bottom: 40rpx;
							margin-bottom: 20rpx;
							border-bottom: 4rpx solid #e6e6e64f;

							.title {
								display: flex;
								align-items: center;
								justify-content: space-between;
								margin-bottom: 28rpx;


								.pic {
									font-weight: 700;
									font-size: 32rpx;
								}

								.look {
									color: #D8D8D8;
								}
							}

							.scroll-view_H {
								white-space: nowrap;
								width: 100%;
							}

							.scroll-view-item_H {

								display: inline-block;
								margin-right: 20rpx;
								width: 164rpx;
								height: 164rpx;
								border-radius: 14rpx;
								text-align: center;
								font-size: 36rpx;
							}
						}

					}

				}
			}
		}
	}
</style>
