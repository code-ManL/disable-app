<template>
	<view class="item-box">
		<view class="left-img">
			<image mode="aspectFill" :src="data.headPicture" alt="" v-if="data.headPicture">
			<image mode="aspectFill" src="../../static/images/user.jpg" alt="" v-else>
		</view>
		<view class="right-box">
			<view class="title-info">
				<text class="h2" :style="{'margin-left':data.flag ? '0px' : '10px'}"
					v-if="data.diary.diaryUserName">{{data.diary.diaryUserName}}</text>
				<!-- 如果不是广告 -->
				<text class="p1" v-if="data.flag">
					<text style="margin-left: 20rpx;">{{dateDiff(data.diary.createTime)}}</text>
					<text>·</text>
					<text>{{getLocal(data.location)}}</text>
				</text>
				<!-- 如果是广告 -->
				<template v-else>
					<text class="p1" style="font-size: 30rpx;margin: 10rpx 0;">
						{{data.diary.diaryContent}}
					</text>
					<view class="advertise" style="position: absolute;top: 0; right: 40rpx;">
						<uni-tag text="广告"></uni-tag>
					</view>
				</template>
			</view>
			<view class="content-info" @click="gotoComment">
				<!-- 不是广告 -->
				<text v-if="data.flag">{{data.diary.diaryContent}}</text>
				<view class="cont-info-img" >
					<image :src="item" v-for="(item, i) in data.picture" :key="i" mode="aspectFill">
					<video v-if="data.video" :src="data.video" mode="aspectFill"></video>
				</view>
			</view>
			<view class="btn-info">
				<template v-if="data.flag">
					<view class="btn-info-left">
						<uni-icons type="more-filled" color="#d0d2d4" size="20" @click="openPopu"></uni-icons>
					</view>
					<view class="btn-info-right">
						<!-- 点赞 -->
						<view class="like" style="margin-right: 10rpx;">
							<uni-icons type="heart" size="25" @click="addLike" :color="data.alreadyLike==1?'red':'#333333'">
							</uni-icons>
							<text>{{data.diary.diaryLove < 100 ? data.diary.diaryLove : '99+' }}</text>
						</view>
						<!-- 跳转评论页面 -->
						<view class="comment" @click="gotoComment">
							<uni-icons type="chatbubble" size="25"></uni-icons>
							<text>{{data.diary.diaryComment < 100 ? data.diary.diaryComment : '99+' }}</text>
						</view>
					</view>
				</template>
				<template v-else>
					<view class="btn-info-left" style="display: flex;color: #a5a5a5;font-size: 16px;">
						<uni-icons type="paperclip" color="#d0d2d4" size="20"></uni-icons>
						<text style="margin-left: 5px;">查看详情</text>
					</view>
					<view class="btn-info-right" style="margin-right: 15px;">
						<uni-icons type="more" color="#d0d2d4" size="20" @click="openPopu"></uni-icons>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	import around from '../../apis/around.js'
	export default {
		name: "message-box",
		props: {
			datas:{
				type:Object,
				default:{
					flag:"",
					headPicture:"",
					alreadyLike:0,
					diary:{
						createTime:"",
						diaryUserName:"",
						diaryLove:"",
						diaryComment:""
					}
				}
			}
		},
		data() {
			return {
				code: 0,
				myInfo: {
					loginName: "",
					nickName: "",
					userId: ""
				},
				data:{
					flag:"",
					headPicture:"",
					alreadyLike:0,
					diary:{
						createTime:"",
						diaryUserName:"",
						diaryLove:"",
						diaryComment:""
					}
				}
			};
		},
		methods: {
			dateDiff(nowTime) {
				if (!nowTime) return '';
				nowTime = nowTime.replace(/年/g, '/');
				nowTime = nowTime.replace(/月/g, '/');
				nowTime = nowTime.replace(/日/g, '/');
				nowTime = nowTime.replace(/时/g, ':')
				nowTime = nowTime.replace(/分/g, ':');
				nowTime = nowTime.replace(/秒/g, '');
				const arg = [nowTime]
				const now = arg[1] ? arg[1] : new Date().getTime()
				const diffValue = now - new Date(arg[0].replace(/-/g, '/')).getTime()
				let result = ""
				const minute = 1000 * 60
				const hour = minute * 60
				const day = hour * 24
				const halfamonth = day * 15
				const month = day * 30
				const year = month * 12

				const _year = diffValue / year
				const _month = diffValue / month
				const _week = diffValue / (7 * day)
				const _day = diffValue / day
				const _hour = diffValue / hour
				const _min = diffValue / minute
				if (_year >= 1) result = parseInt(_year) + "年前"
				else if (_month >= 1) result = parseInt(_month) + "个月前"
				else if (_week >= 1) result = parseInt(_week) + "周前"
				else if (_day >= 1) result = parseInt(_day) + "天前"
				else if (_hour >= 1) result = parseInt(_hour) + "个小时前"
				else if (_min >= 1) result = parseInt(_min) + "分钟前"
				else result = "刚刚"
				return result
			},
			
            getLocal(location){
                if(location){
                    location=location.split(",");
                    if(location.length==2){
                         return this.$space(Number(location[0]),Number(location[1]))  
                    }else{
                         return '暂无位置'
                    }
                  
                }else{
                    return '暂无位置'
                }

            },
            openPopu() {
				this.$emit('openPopu', true)
			},
			gotoComment() {
				uni.navigateTo({
					url: `/subpkg/comment/comment?diaryId=${this.data.diary.diaryId}`
				})
			},
			// 添加喜欢
			addLike() {
				let _this = this
				around.addLike({
					userId: this.myInfo.userId,
					diaryId: this.data.diary.diaryId
				}).then(res => {
					// 待改 
					if(_this.data.alreadyLike == 1){
						_this.data.diary.diaryLove--;
						_this.data.alreadyLike=0;
						_this.$showMsg('取消成功', 1000)
					}else{
						_this.data.diary.diaryLove++;
						_this.data.alreadyLike=1;
						_this.$showMsg('点赞成功', 1000)
					}
						_this.$forceUpdate();
					_this.data.diary.diaryLove = res.data.map.total;
				})
			}
		},
		mounted() {
			this.code = this.data.alreadyLike;
			this.myInfo = this.$store.state.user.loginUser ? this.$store.state.user.loginUser : {
				loginName: "",
				nickName: "",
				userId: "1"
			},
			this.data = this.datas
		}
	}
</script>

<style lang="scss">
	.item-box {
		display: flex;
		background-color: #fff;
		position: relative;
		margin-bottom: 40rpx;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 90%;
			height: 2rpx;
			background-color: #f0eef1;
		}

		.left-img {

			image {
				margin: 0 16rpx;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: 2rpx solid #eee;
			}
		}

		.right-box {
			width: calc(100vw - 112rpx);
			box-sizing: border-box;
			padding-right: 20rpx;

			.title-info {
				// height: 140px;
				position: relative;

				.h2 {
					font-size: 28rpx;
					height: 50rpx;
					line-height: 50rpx;
				}

				.p1 {
					font-size: 24rpx;
					height: 30rpx;
					line-height: 30rpx;
					color: #a5a395;

					text:nth-child(2) {
						margin: 0 4rpx;
					}
				}


			}

			.content-info {
				margin-top: 20rpx;

				text {
					font-size: 28rpx;
					word-wrap: break-word;
				}

				.cont-info-img {
					margin-top: 20rpx;

					// background-color: red;
					image {
						width: 260rpx;
						margin-right: 20rpx;
						height: 260rpx;
						border-radius: 20rpx;
						margin-bottom: 10rpx;
					}
					video{
						width: 450rpx;
						margin-right: 20rpx;
						height: 300rpx;
						border-radius: 20rpx;
						margin-bottom: 10rpx;
					}
				}
			}

			.btn-info {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				display: flex;
				justify-content: space-between;

				.btn-info-right {
					display: flex;

					&>view {
						display: flex;
						align-items: center;

						text {
							font-size: 24rpx;
							margin-right: 6rpx;
							color: #a5a395;
						}
					}

				}
			}
		}
	}
</style>
