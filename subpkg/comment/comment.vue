<template>
	<view class="root">
		<mover  :isBack="true">
			<view slot="content">动态详情</view>
		</mover>
		<!-- 头部区域 -->
		<template v-if="showOneInfo">
			<view class="comment-header">
				<view class="comment-header-left">
					<view class="comment-header-left-info">
						<view class="info-left">
							<image :src="userData.headPicture" mode="aspectFill" alt="" style="height: 40px;width: 40px;"></image>
						</view>
						<view class="info-right">
							<h2>{{userData.diary.diaryUserName}} <text>√</text></h2>
							<p>
								<text>{{dateDiff(userData.diary.createTime)}}</text>
								<text>·</text>
								<text>20km</text>
							</p>
						</view>
					</view>
				</view>

				<view class="comment-header-right">
					<text class="btnConcern" @click="sendAttention()">{{userData.alreadyConcern==0?"关注":"已关注"}}</text>
				</view>
			</view>

			<!-- 消息区 -->
			<view class="comment-personmessage">
				<view class="personmessage-main">
					<text>{{userData.diary.diaryContent}}</text>
					<view class="personmessage-images">
						<image :src="item" alt="" v-for="(item, i) in userData.picture" mode="aspectFill" :key="i"></image>
						<video :src="userData.video" v-if="userData.video" mode="aspectFill"></video>
					</view>
				</view>
				<view class="personmessage-btn">
					<view class="btn-info-left">
						<uni-icons type="more" size="25" @click="toggle"></uni-icons>
					</view>
					<view class="btn-info-right">
						<view class="like" @click="addLike()">
							<!-- 点赞 -->
							<uni-icons type="heart"
								:color="userData.alreadyLike == 1 ? 'red' : ''"
								size="25">
							</uni-icons>
							<text>{{userData.diary.diaryLove < 100 ? userData.diary.diaryLove : '99+'}}</text>
						</view>
						<view class="comment" @click="showHuifu">
								<uni-icons type="chatbubble" size="25" color="#777"></uni-icons>
								<text>{{userData.diary.diaryComment==0?'回复':userData.diary.diaryComment}}</text>
							</view>
						
					</view>
				</view>
			</view>

		</template>

		<!-- 评论区 -->
		<view class="root-content"></view>
		<uni-transition  mode-class="slide-right" :show="true">
			<view v-if="showComments">
				<mescroll-uni :style="{height:wh}" ref="mescrollRef" style="display: block;width: 100%;" @init="init" @down="downCallback"
					:down="downOption" :up="upOption" @up="upCallback" :fixed="true">
					<comment-detail :data="data" @commentListClick="commentListClick"></comment-detail>
				</mescroll-uni>
			</view>
		</uni-transition>



		<uni-popup ref="huifu" background-color="#fff">
			<comment-replay @closeHuifu="closeHuifu"></comment-replay>
		</uni-popup>
			<uni-popup type="bottom" ref="commentListShow" background-color="#fff">
		        <comment-list-index v-if="commentListShow" :obj="obj" @huifuBack="huifuBack"></comment-list-index>
			</uni-popup>
			
			<!-- 举报和关注弹窗 -->
			<uni-popup ref="tip" type="bottom" background-color="#fff">
				<view class="tip-content">
					<text @click="btn_report()">匿名举报</text>
					<hr>
					<text @click="$refs.tip.close()">取消</text>
				</view>
			</uni-popup>
			<!-- 投诉 -->
			<uni-popup ref="report" background-color="#fff">
				<report-check @close="closeReport" :reportedUserId="reportedUserId" :reportedId="reportedId" :type="1">
				</report-check>
			</uni-popup>
	</view>
</template>

<script>
	import comment from '../../apis/comment.js';
	import around from '../../apis/around.js';
	import my from '../../apis/my.js';
	import recomment from "@/apis/recomment.js"
	import commentListIndex from "../../components/comment-detail/comment-list.vue"
	import reportCheck from '@/components/report-check/report-check.vue'
	export default {

		data() {
			return {
				wh: 0,
				page: 2,
				total: 0,
				flag: true,
				downOption: {
					use: true,
					auto: false,
					page: {
						num: 0,
						size: 10
					},
					textLoading: '加载中....',
				},
				// 上拉加载的常用配置
				upOption: {
					use: true,
					auto: false,
					page: {
						num: 0,
						size: 10
					},
					textNoMore: '~暂无更多评论~'
					// empty: {
					// 	tip: '暂无相关数据'
					// }
				},
				showOneInfo: false,
				showComments: false,
				diaryId: 0,
				commentListShow:false,
				data: [],
				userData: {
					alreadyConcern:0,
					headPicture:"",
					alreadyLike:0,
					diary:{
						picture:[],
						diaryLove:0,
						diaryUserName:"",
						createTime:"",
						diaryContent:""
					}
				},
				code: 0,
				backUpdate: {},
				diaryId: '',
                commentObj:{},
				obj:{},
				reportedUserId:"",
				reportedId:"",
			};
		},
		components:{commentListIndex,reportCheck},
		methods: {
			closeReport(){
				this.$refs.report.close()
					this.$refs.tip.close()
			},
			btn_report(){
				this.$refs.report.open()
			},
			toggle(){
				this.reportedUserId=this.userData.diary.diaryUserId;
				this.reportedId = this.userData.diary.diaryId;
				this.$refs.tip.open()
			},
			commentListClick(item){
				this.obj = item;
				this.$refs.commentListShow.open();
				this.commentListShow=true
			},
			showHuifu() {
				this.commentObj.commentId="";
				this.$refs.huifu.open('bottom');
			},
			closeHuifu(info) {
				if(info.commentContent==""||!info.showjudge){
					this.$refs.huifu.close();
					return
				}
                if(this.commentObj.commentId){
                    around.publishCommentReply({
                    	diary_id:this.diaryId,
                    	comment_id:this.commentObj.commentId,
                    	reply_content:info.commentContent,
                        comment_user_id:this.commentObj.commentatorIp,
                        comment_user_name:this.commentObj.commentatorName?this.commentObj.commentatorName:""
                    }).then((res)=>{
						setTimeout(()=>{
							this.$refs.huifu.close();
							this.OneInfo()
							this.mescroll.resetUpScroll();
							this.$showMsg("评论成功",2000)
						},1000)

                    }).catch((err)=>{
                    	
                    })
                }else{
                    around.publishComment({
                    	diaryId:this.diaryId,
                    	comment:info.commentContent
                    }).then((res)=>{
							setTimeout(()=>{
                    	this.$refs.huifu.close();
						this.OneInfo()
                        this.mescroll.resetUpScroll();
                    	this.$showMsg("评论成功",2000);
						},1000)
                    }).catch((err)=>{
                    	
                    })
                }

			},
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
			//关注和取消用户
			sendAttention() {
				if (this.userData.alreadyCollect == 1) {
					my.addAttention({
						userId: this.userData.diary.diaryUserId,
						follower: this.$store.state.user.loginUser.userId
					}).then((res) => {
						uni.showToast({
							icon: "none",
							title: "已取消"
						})
						this.userData.alreadyConcern = 0
					}).catch(() => {
				
					})
				} else {
					my.cancelAttention({
						userId: this.userData.diary.diaryUserId,
						follower: this.$store.state.user.loginUser.userId
					}).then((res) => {
						uni.showToast({
							icon: "none",
							title: "关注成功"
						})
						this.userData.alreadyConcern = 1
					}).catch(() => {
				
					})
				}
			},

			init(mescroll) {
				this.mescroll = mescroll;
				this.$emit('init', mescroll)
			},
			// 返回上一页
			gotoBack() {
				let _this = this
				_this.$emit('backUpdate')
				uni.navigateBack()
			},
			downCallback(e) {
                this.mescroll.resetUpScroll();
			},
			upCallback(e) {
				this.page = e.num;
                this.getMoreInfo()
			},
			getMoreInfo(fn) {
				let _this = this;
					comment.getCommentList({
						diaryId: this.diaryId,
						size: 10,
						page: this.page
					}).then(res => {
                        if(res.data.data){
                            if (_this.data.length + res.data.data.length == _this.total) {
                            	_this.flag = false
                            	_this.mescroll.optDown.textSuccess = '暂无更多数据'
                            }
                            if (_this.page == 1) {
                            	_this.data = res.data.data?res.data.data:[]
                            } else {
                            	_this.data = _this.data.concat(res.data.data)
                            }
                        }
						_this.mescroll.endByPage(res.data.data.length, parseInt(_this.total));
					})
			},
			// 获取新的列表数据
			getComments() {
				let _this = this;
				comment.getCommentList({
					diaryId: this.diaryId,
					page: 1,
					size: 10
				}).then(res => {
					_this.data = res.data.data?res.data.data:[]
					_this.showComments = true
					if (_this.data)
						_this.total = _this.data[0].total;
				})
			},
			// 添加喜欢
			addLike() {	
				let _this = this;
				this.code == 1 ? this.$showMsg('取消成功', 1000) : this.$showMsg('点赞成功', 1000)
				around.addLike({
					diaryId: this.userData.diary.diaryId
				}).then(res => {
					_this.userData.diary.diaryLove = res.data.map.total
					_this.userData.alreadyLike = _this.userData.alreadyLike == 0 ? 1 : 0
				})
			},
			// 获取一条展示数据
			OneInfo() {
				let _this = this;
				comment.getOneInfo({
					diaryId: this.diaryId
				}).then(res => {
					_this.userData = res.data.data
					_this.showOneInfo = true
					_this.code = _this.userData.alreadyLike;
					_this.$nextTick(()=>{
						uni.getSystemInfo({
						  success: resu => {
						    const query = uni.createSelectorQuery()
						    query.select('.root-content').boundingClientRect()
						    query.exec(res => {
						      const scrollHeight= resu.windowHeight - res[0].top + 'px';
						      _this.wh = scrollHeight
						    })
						  }
						})
					})
				})
			}
		},
		onLoad(options) {
			this.diaryId = options.diaryId
			this.OneInfo()
			this.getComments();
            uni.$on("huifuBack",(commentObj)=>{

                this.commentObj=commentObj;
				this.$refs.commentListShow.close();
                this.$refs.huifu.open('bottom');
            })
		}
	}
</script>

<style lang="scss">
	.root {
		box-sizing: border-box;
           
		   
		.comment-personmessage{
			padding: 0 20rpx;
			width: 100%;
			box-sizing: border-box;
		}
		.comment-header {
			position: relative;
			// top: 70rpx;
	       padding: 0 20rpx;
			width: 100%;
			box-sizing: border-box;
			height: 100rpx;
			z-index: 10;
			background-color: #fff;
			display: flex;
			justify-content: space-between;

			.comment-header-left {
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				
				.comment-header-left-info {
					
					display: flex;
					align-items: center;
					height: 100rpx;

					.info-left {
						margin-right: 20rpx;
						height: 100%;
						display: flex;
						align-items: center;

						image {
							height: 20rpx;
							width: 20rpx;
							border-radius: 50%;
						}
					}

					.info-right {
						h2 {
							font-size: 28rpx;

							text {
								margin-left: 10rpx;
								display: inline-block;
								background: radial-gradient(yellow, orange);
								border-radius: 50%;
								width: 40rpx;
								height: 40rpx;
								text-align: center;
								color: red;
							}
						}

						p {
							font-size: 24rpx;
							color: #777;
						}
					}
				}
			}

			.comment-header-right {
				display: flex;
				align-items: center;

				text {
					display: inline-block;
					padding: 10rpx 20rpx;
					background-color: orange;
					border-radius: 20rpx;
					color: #fff;
					font-size: 28rpx;
				}
			}
		}


		.comment-personmessage {
			.personmessage-main {
				margin-top: 20rpx;

				text {
					font-size: 28rpx;
					word-wrap: break-word;
				}

				.personmessage-images {
					margin-top: 20rpx;

					// display: flex;
					// flex-wrap: wrap;
					// justify-content: space-around;
					// align-content: flex-end;
					// background-color: red;
					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 20rpx;
						margin-right: 20rpx;
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

			.personmessage-btn {
				margin-top: 20rpx;
				margin-bottom: 40rpx;
				display: flex;
				justify-content: space-between;

				.btn-info-left {
					display: flex;
					align-items: center;
				}

				.btn-info-right {
					display: flex;

					&>view {
						display: flex;
						align-items: center;

						text {
							font-size: 24rpx;
							margin-right: 10rpx;
							color: #a5a395;
						}
					}
					.comment{
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}
	// 弹窗
	.tip-content {
		margin-top: 20rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	
		hr {
			margin: 10rpx 0;
			height: 4rpx;
			width: 100%;
			background-color: #ccc;
		}
	
		text {
			display: inline-block;
			line-height: 80rpx;
		}
	
		text:nth-child(1) {
			color: orange;
		}
	}
</style>
