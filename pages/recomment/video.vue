<template>
	<view class="page">
		<swiper class="swiper" :circular="circular" :vertical="true" @change="onSwiperChange">
			<swiper-item v-for="(item,index) in videoList" :key="item.diary.id">
				<video @click="videoplay(index)" class="video" :id="'video'+item.diary.id" :ref="'video'+item.diary.id"
					:src="item.video" :controls="false" :loop="true" :show-center-play-btn="false" preload="auto"
					x5-playsinline="" playsinline="true" webkit-playsinline="true" x-webkit-airplay="allow"
					x5-video-player-type="h5" x5-video-player-fullscreen="" x5-video-orientation="portraint">
				</video>
				<view class="detail-box">
					<view class="name">{{item.diary.diaryUserName}}</view>
					<view class="detail">{{item.diary.diaryTitle}}</view>
				</view>
			</swiper-item>
		</swiper>
		<cover-view>
			<cover-image :src="avatar_img" class="video-image"></cover-image>
			<cover-view class="video-love" @click="love()">
				<template v-if="alreadyLike==1">
					<image src="../../static/images/home/1-1.png" class="img2"></image>
				</template>
				<template v-else>
					<image src="../../static/images/home/6.png" class="img2"></image>
				</template>

				<view class="video-num">{{love_num}}</view>
			</cover-view>
			<cover-view class="video-comm" @click="comm()">
				<image src="../../static/images/home/7.png" class="img2"></image>
				<view class="video-num">{{comm_num}}</view>
			</cover-view>
<!-- 			<cover-view class="video-redo" @click="collect()">
				<template v-if="isactive==1">
					<image src="../../static/images/home/2-1.png" class="img2"></image>
				</template>
				<template v-else>
					<image src="../../static/images/home/8.png" class="img2"></image>

				</template>
				<view class="video-num">{{redo_num}}</view>
			</cover-view> -->
		</cover-view>
	</view>
</template>
<script>
	import recomment from "@/apis/recomment.js"
	import around from "@/apis/around.js"
	import { mapMutations,mapState } from 'vuex'
	export default {
		data() {
			return {
				avatar_img: '',
				love_num: 0,
				comm_num: 0,
				redo_num: 0,
				current_nav: 1,
				isactive: false,
				circular: true,
				videoList: [],
				_videoIndex: 0,
				videoDataList: [],
				_videoContextList: [],
				alreadyLike: 0,
				videoPage: {
					index: 1,
					size: 10
				}
			}
		},
		mounted() {
			this.getVideoList();
		},
		methods: {
			...mapState('user',['loginUser']),
			//获取视频秀
			getVideoList(page) {
				let _that = this;
				recomment.getUserVedio({
					page: this.videoPage.index,
					size: this.videoPage.size,
					userId: this.loginUser.userId
				}).then((res) => {
					if (this.videoPage.index == 1) {
						_that.videoList = res.data.data ? res.data.data : [];
						_that.init()
					} else {
						_that.videoList = _that.videoList.concat(res.data.data ? res.data.data : [])
					}
				}).catch(() => {

				})
			},
			init() {
				this._videoIndex = 0;
				this._videoContextList = [];
				for (var i = 0; i < this.videoList.length; i++) {
					this._videoContextList.push(uni.createVideoContext('video' + this.videoList[i].diary.id, this));
				}
				this._videoDataIndex = 0;
				if (this._videoContextList.length > 0) {
					setTimeout(() => {
						this._videoContextList[this._videoIndex].play();
						this.alreadyLike = this.videoList[this._videoIndex].alreadyLike;
                        this.isactive = this.videoList[this._videoIndex].alreadyCollect;
						this.avatar_img = this.videoList[this._videoIndex].headPicture;
						this.love_num = this.videoList[this._videoIndex].diary.diaryLove;
						this.comm_num = this.videoList[this._videoIndex].diary.diaryComment;
						this.redo_num = this.videoList[this._videoIndex].diary.diaryCollect;
					}, 200);
				}

			},
			videoplay(index) {
				const id = this.videoList[index].diary.id
				const video = uni.createVideoContext("video"+id, this)
				if (this.videoList[index].play) {
					this._videoContextList[index].pause();
					this.videoList[index].play = false
				} else {
					this._videoContextList[index].play();
					this.videoList[index].play = true
				}
			},
			onSwiperChange(e) {
				let currentIndex = e.detail.current;
				if (currentIndex === this._videoIndex) {
					return;
				}

				let isNext = false;
				if (currentIndex === 0 && this._videoIndex === this.videoList.length - 1) {
					isNext = true;
				} else if (currentIndex === this.videoList.length - 1 && this._videoIndex === 0) {
					isNext = false;
				} else if (currentIndex > this._videoIndex) {
					isNext = true;
				}

				if (isNext) {
					this._videoDataIndex++;
				} else {
					this._videoDataIndex--;
				}

				if (this._videoDataIndex < 0) {
					this._videoDataIndex = this.videoDataList.length - 1;
				} else if (this._videoDataIndex >= this.videoDataList.length) {
					this._videoDataIndex = 0;
				}

				this.circular = (this._videoDataIndex != 0);

				if (this._videoIndex >= 0) {
					this._videoContextList[this._videoIndex].pause();
					this._videoContextList[this._videoIndex].seek(0);
				}

				this._videoIndex = currentIndex;
				this.alreadyLike = this.videoList[this._videoIndex].alreadyLike;
				this.avatar_img = this.videoList[this._videoIndex].headPicture;
				this.love_num = this.videoList[this._videoIndex].diary.diaryLove;
				this.comm_num = this.videoList[this._videoIndex].diary.diaryComment;
				this.redo_num = this.videoList[this._videoIndex].diary.diaryCollect;
				setTimeout(() => {
					this.updateVideo(isNext);
				}, 200);
				if (this._videoIndex == (this.videoList.length - 2)) {
					this.videoPage.index++;
					this.getVideoList();
				}
			},
			getNextIndex(isNext) {
				let index = this._videoIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.videoList.length - 1;
				} else if (index >= this.videoList.length) {
					return 0;
				}
				return index;
			},
			getNextDataIndex(isNext) {
				let index = this._videoDataIndex + (isNext ? 1 : -1);
				if (index < 0) {
					return this.videoDataList.length - 1;
				} else if (index >= this.videoDataList.length) {
					return 0;
				}
				return index;
			},
			updateVideo(isNext) {
				setTimeout(() => {
					this._videoContextList[this._videoIndex].play();
				}, 200);
			},
			love(item) {
				around.addLike({
					userId: this.loginUser.userId,
					diaryId: this.videoList[this._videoIndex].diary.diaryId
				}).then((res) => {
					if (this.alreadyLike == 0) {
						this.love_num += 1
						this.alreadyLike = 1;
						this.videoList[this._videoIndex].alreadyLike = 1;
					} else {
						this.alreadyLike = 0;
						this.love_num -= 1
						this.videoList[this._videoIndex].alreadyLike = 0;
					}

				}).catch(() => {

				})
			},
			comm() {
				//跳转动态详情评论
				uni.navigateTo({
					url: `/subpkg/comment/comment?diaryId=${this.videoList[this._videoIndex].diary.id}`
				})
			},

			//收藏
			collect() {
					recomment.collect({
						userId:this.loginUser.userId,
						type: "1",
						likedId: this.videoList[this._videoIndex].diary.id
					}).then((res) => {
						if(this.videoList[this._videoIndex].alreadyCollect==0){
							uni.showToast({
								icon: "none",
								title: "收藏成功"
							});
							 this.isactive=1;
							 this.redo_num++
							this.videoList[this._videoIndex].alreadyCollect=1
						}else{
							uni.showToast({
								icon: "none",
								title: "已取消"
							});
							 this.isactive=0;
							 this.redo_num--;
							this.videoList[this._videoIndex].alreadyCollect=0
						}
			

					}).catch(() => {

					})

			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.detail-box {
		position: absolute;
		position: absolute;
		bottom: 40rpx;
		z-index: 4;
		color: #ffffff;
		left: 20rpx;


	}

	.detail-box .name {
		font-size: 32rpx;
		font-family: PingFang SC-Bold, PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}

	.detail-box .detail {
		width: 500rpx;
		font-size: 26rpx;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin-top: 10rpx;
	}

	.page {
		flex: 1;
		width: 750rpx;
	}

	.swiper {
		height: calc(100vh - 320rpx);
		flex: 1;
	}

	.swiper-item {
		flex: 1;
	}

	.video {
		position: relative;
		flex: 1;
		/* #ifndef APP-PLUS */
		width: 100%;
		/* #endif */
		height: calc(100vh - 240rpx);
		z-index: 0;
	}

	cover-view,
	cover-image {
		display: inline-block;
	}

	.video-image {
		position: fixed;
		bottom: 52vh;
		right: 10px;
		height: 60px;
		width: 60px;
		border-radius: 50%;
		border: 3px solid #fff;
		z-index: 100;
	}

	.img2 {
		width: 90rpx;
		height: 80rpx;
		margin-bottom: 20rpx;
	}

	.video-love {
		position: fixed;
		bottom: 35vh;
		right: 42rpx;
		z-index: 100;
	}

	.video-num {
		text-align: center;
		position: relative;
		bottom: 5px;
		font-size: 14px;
		font-weight: bold;
		color: #FFFFFF;
		z-index: 100;
	}

	.video-comm {
		position: fixed;
		bottom: 22vh;
		right: 42rpx;
		z-index: 100;
	}

	.video-redo {
		position: fixed;
		bottom: 9vh;
		right: 42rpx;
		z-index: 100;
	}

	.nav_b {
		border-top: #888888 solid 1px;
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		height: 45px;
		line-height: 45px;
		color: #FFFFFF;
		font-size: 16px;
		font-weight: bold;
	}

	.nav_f {
		text-align: center;
		width: 20%;
	}

	.current_nav_f {
		position: fixed;
		bottom: 0;
		width: 10vw;
		margin: 0 5vw;
		border-bottom: #fff solid 3px;
	}
</style>
