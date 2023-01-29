<template>
	<view>
		<mover>
              <view slot="content">个人中心</view>
        </mover>
		<view class="root">
			<view class="head">
			</view>
			
			<!-- 主信息部分 -->
			<view class="main">
				<view class="main-top">
					<div class="top-left">
						<view class="top-logo">
							<image @click="chooseImage" v-if="baseData.headPicPath" :src="baseData.headPicPath" alt="" mode="aspectFill"/>
							<view class="empty-image" @click="chooseImage" v-else>
								<uni-icons type="person-filled" size="80" color="#eee"></uni-icons>
							</view>
						</view>
						<view class="top-left-right">
							<text class="h1" @click="inputDialogToggle">
								<text>{{baseData.nickName?baseData.nickName:""}}</text>
							</text>
							<text class="p1">
								<text>用户ID：{{baseData.personId}}</text>
								<uni-icons type="compose" size="16" @click="copyText(baseData.personId)"></uni-icons>
							</text>
			
							<text class="p1">
								<text>暂无简历</text>
								<uni-icons type="compose" size="16" @click="gotoResume"></uni-icons>
							</text>
						</view>
					</div>
					<view class="top-right">
						<text v-if="!baseData.signIn" @click="makeSignUp">签到</text>
						<text v-else class="isFlaged">今日已签到</text>
					</view>
				</view>
				<view class="main-bottom">
					<view class="bottom-item" @click="gotoBillBoard(1)">
						<text class="item-num">{{baseData.attentionCount}}</text>
						<text class="item-title">关注</text>
					</view>
					<view class="bottom-item" @click="gotoBillBoard(2)">
						<text class="item-num">{{baseData.fanCount}}</text>
						<text class="item-title">粉丝</text>
					</view>
					<view class="bottom-item" @click="openLikes">
						<text class="item-num">{{baseData.like}}</text>
						<text class="item-title">点赞</text>
					</view>
					<view class="bottom-item" @click="openSorts">
						<text class="item-num">{{baseData.sorts}}</text>
						<text class="item-title">积分</text>
					</view>
				</view>
			</view>
			
			<view class="like-ul">
				<view style="display: flex;justify-content: space-between;" @click="gotoLike()">
					<text>喜欢列表 </text>
						<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="banner">
				<view class="banner-vip section" @click="gotoPrivilege">
					<view class="section-one">
						<text>我的特权</text>
						<uni-icons type="forward" size="20"></uni-icons>
					</view>
					<view class="section-two">
						<text>特权享更多权益·飞速脱单</text>
					</view>
					<view class="section-three">
						<text>开通特权</text>
					</view>
				</view>
				<view class="banner-info section" @click="gotoCheckPerson">
					<view class="section-one">
						<text>完善资料</text>
						<uni-icons type="forward" size="20"></uni-icons>
					</view>
					<view class="section-two">
						<text>完成度越高越容易推荐</text>
					</view>
					<view class="section-three">
						<text>{{InfoRate}}%</text>
					</view>
				</view>
			</view>
			
			<!-- 动态 -->
			<person-active @personActive="personActive" :personActiveData="personActiveData"></person-active>
			
			<!-- 发表动态按钮 -->
			<view class="active-btn" @click="gotoShare">
				<uni-icons type="camera-filled" size="22" color="#fff"></uni-icons>
				<text>发动态</text>
			</view>
			
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog ref="inputClose"  mode="input" title="修改你的用户昵称" :value="baseData.nickName"
					placeholder="请输入昵称,长度不超过10个字符!" @confirm="dialogInputConfirm"></uni-popup-dialog>
			</uni-popup>
		</view>
		<!-- 举报和关注弹窗 -->
		<uni-popup ref="tip" type="bottom" background-color="#fff">
			<view class="tip-content">
				<text @click="btn_delete()">删除动态</text>
				<hr>
				<text @click="$refs.tip.close()">取消</text>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import my from '@/apis/my.js'
	import around from '@/apis/around.js'
	import { getDay, getMonth } from "@/apis/tools"
	import { returnRate, formdataify } from '@/apis/tools.js'
	import { mapMutations,mapState } from 'vuex'
	
	export default {
		data() {
			return {
				// 是否有角标
				value: 1,
				// 个人信息
				baseData: {
					username: 'xxx',
					personId: '',
					headPicPath: '',
					attentionCount: 0,
					fanCount: 0,
					like: 0, //点赞
					sorts: 0, //积分
				},
				moreData: {},
				// 动态的数据
				personActiveData: [],
				isLoading: false,//节流器
				paramsData: {
					userId: "1",
					page: 1,
					size: 3
				},
				reward: 5,//签到增加的积分
				objs:{}
			}
		},
		onShow() {
			this.paramsData.userId =  this.loginUser.userId
			this.getData()
			this.getActiveData();
		},
		mounted() {
			uni.$on("backUpdate",()=>{
				this.paramsData.page=1;
				this.getActiveData()
			})
		},
		computed: {
			...mapState('user',['loginUser']),
			// 资料完善比率
			InfoRate() {
				if(!this.moreData.personBasicInfo){
					return 0
				}
				const obj = {
					...this.moreData.personBasicInfo,
					...this.moreData.personDetailInfo,
					...this.moreData.requirement
				}
				return returnRate(obj) * 100
			}
		},
		// 下拉触底
		onReachBottom(){
			// 节流器
			if(!this.isLoading){
				this.paramsData.page++
				this.getActiveData()
			}					
		},
		methods: {
			...mapMutations('common', ['setBaseInfo', 'setMoreInfo', 'setAlbumInfo']),
			
			// 弹出修改昵称的弹框
			inputDialogToggle() {
				this.$refs.inputDialog.open()
			},
			
			personActive(item){
				console.log(item)
				this.objs = item;
				this.$refs.tip.open()
			},
			
			btn_delete(){
				this.$tip.confirm('是否删除').then(()=>{
					around.deleteDiary(
					{
						diaryId:this.objs.diary.diaryId
					}).then((res)=>{
						uni.showToast({
							icon:"none",
							title:"删除成功"
						})
						setTimeout(()=>{
							this.paramsData.page=1;
							this.getActiveData()
							this.$refs.tip.close()
						},500)
				
					}).catch((err)=>{
						
					})
				})
			},
			
			async dialogInputConfirm(val) {
				if(val.length > 10) {
					this.$showMsg('昵称长度不能大于10个字符！')
					setTimeout(() => {
						this.$showMsg('更新失败！')
					}, 2000)
					return
				}
				uni.showLoading({
					title: '正在更新中'
				})
				const { data: res } = await my.changeNickName({
					loginName: this.loginUser.loginName,
					nickName: val
				})
				console.log(res);
				let that = this
				setTimeout(() => {
					uni.hideLoading()
					if(res.resultCode == 200) {
						if(that.baseData.headPicPath==undefined){
							that.baseData.nickName=val
						}else{
							that.$set(that.baseData, 'nickName', val)
						}		
						this.$showMsg('更新昵称成功！')
					}
					// 关闭窗口后，恢复默认内容
					this.$refs.inputDialog.close()
				}, 1000)
			},
			
			// 更新头像
			async changeUserImage(url){
				uni.showLoading({title: '更新中',mask:true});
				const { data: res } = await my.changeUserImage({
					loginName: this.loginUser.loginName,
					headPicPath: url
				})	
				let that = this
				setTimeout(() => {
					uni.hideLoading();
					if(res.resultCode == 200) {
						if(that.baseData.headPicPath==undefined){
							that.baseData.headPicPath=data.data.url
						}else{
							that.$set(that.baseData, 'headPicPath', data.data.url)
						}	
						that.$showMsg('更新头像成功！')
					}
				}, 1000)
			},
			
			// 选择拍照还是相册
			chooseImage() {
				var that = this;
				uni.showActionSheet({
					itemList: ['相册', '拍照'],
					itemColor: "darkorange",
					success: function(res) {
						if (!res.cancel) {
							if (res.tapIndex == 0) {
								that.chooseOneImage('album')
							} else if (res.tapIndex == 1) {
								that.chooseOneImage('camera')
							}
						}
					}
				})
			},
			
			// 调用图片
			chooseOneImage(type) {
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
									that.changeUserImage(data.data.url)
								}
							});
						})				
					}
				});
			},
			
			// 获取动态信息
			async getActiveData(){
				uni.showLoading({title: '动态加载中',mask:true});
				this.isLoading = true
				const {data: res} = await my.getMyDiary(this.paramsData)
				this.isLoading = false
				uni.hideLoading();
				if(res.data){
					// 根据动态发布时间获取日月
					let arr = res.data.map(item => {
						item.day = getDay(item.diary.createTime)
						item.month = getMonth(item.diary.createTime)
						return item
					})
					if(this.paramsData.page==1){
						this.personActiveData =arr
					}else{
						this.personActiveData = this.personActiveData.concat(arr)
					}
					// 合并动态数组
			
				}				
			},

			// 获取信息
			async getData() {
				uni.showLoading({title: '信息加载中',mask:true})
				// // 系统信息
				const {data: res1 } = await my.getBaseData({
					personId: this.loginUser.userId
				})
				// 用户信息
				const {data: res2} = await my.getAllData({
					personId: this.loginUser.userId
				})
				// 解决后端传来的时间字段不匹配问题
				// res2.data.personBasicInfo.expectedMarryTime = res2.data.personBasicInfo.expectedMarryTime.split('T')[0]
				// 相册
				const {data: res3} = await my.searchAlbumListByUserId({
					userId: this.loginUser.userId
				})
				console.log(res2.data);
				uni.hideLoading()
				this.baseData = res1.data				
				this.moreData = res2.data
				this.setBaseInfo(res1.data)
				this.setMoreInfo(res2.data)
				this.setAlbumInfo(res3.data)
			},

			// 复制id
			copyText(value) {
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: '复制内容',
					success: () => { //点击复制内容的后调函数
						uni.setClipboardData({
							data: value, //要被复制的内容
							success: () => { //复制成功的回调函数
								uni.showToast({ //提示
									title: '复制成功'
								})
							}
						});
					}
				});
			},
			
			openLikes(){
				this.$showMsg("你的点赞有" + this.baseData.like + "个！")
			},
			openSorts(){
				this.$showMsg("下一版本更新积分功能哦！")
			},
			// 打开简历
			gotoResume() {
				this.$showMsg("下一版本更新简历功能哦！")
			},
			// 查看关注页面
			gotoBillBoard(type) {
				if(type === 2) {
					if(this.baseData.isVip != 1){
						this.$showMsg('查看谁喜欢你？获取特权竞享权益')
						setTimeout(function(){
							uni.navigateTo({
								url: '/subpkg/privilege/privilege'
							})
						},2000)						
						return
					}
				}
				uni.navigateTo({
					url: '/subpkg/billboard/billboard?type=' + type
				})
			},
			
			// 签到
			async makeSignUp() {
				uni.showLoading({title: '信息加载中',mask:true})
				const {
					data: res
				} = await my.signIn({
					reward: this.reward,
					loginName: this.loginUser.loginName
				})
				uni.hideLoading()
				this.$showMsg(res.message)
				this.baseData.signIn = true
				let that = this
				setTimeout(function() {
					that.$showMsg('积分 + ' + that.reward)
					that.baseData.sorts += that.reward
				}, 1000)

			},
			// 跳转到喜欢界面
			gotoLike() {
				uni.navigateTo({
					url: '/subpkg/like/like'
				})
			},
			// 跳转到vip充值页
			gotoPrivilege() {
				uni.navigateTo({
					url: '/subpkg/privilege/privilege'
				})
			},
			// 跳转到评论页
			gotoShare() {
				uni.navigateTo({
					url: '/subpkg/share/share'
				})
			},
			// 跳转到资料完善页面
			gotoCheckPerson() {
				uni.navigateTo({
					url: '/subpkg/checkPerson/checkPerson'
				})
			},		
		}
	}
</script>

<style lang='scss' scoped>
	.root {
		padding: 0 20rpx;
		background-color: #fcfcfc;
	}

	.head {
		border-bottom: 2rpx solid #eee;
	}

	/* 头部 */
	.header {
		height: 100rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #eee;

		.header-prove {
			display: flex;
			align-items: center;
			background-color: #eee;
			padding: 10rpx 20rpx;
			border-radius: 20rpx;
		}
	}

	/* 信息页 */
	.main {
		margin: 20rpx 0 0rpx 0;

		.main-top {
			display: flex;
			justify-content: space-between;
			margin-bottom: 40rpx;
			height: 200rpx;


			.top-left {
				display: flex;

				.top-logo {
					width: 200rpx;
					height: 200rpx;
					box-sizing: border-box;

					image {
						width: 200rpx;
						height: 200rpx;
						border-radius: 30rpx;
						border: 4rpx solid #fff;
					}

					.empty-image {
						height: 200rpx;
						width: 100%;
						display: flex;
						justify-content: center;
						flex-direction: column;
						align-items: center;
						font-size: 20px;
						border-radius: 30rpx;
						border: 4rpx solid #eee;
					}
				}

				.top-left-right {
					display: flex;
					flex-direction: column;
					justify-content: flex-end;
					margin-left: 30rpx;

					.h1 {
						height: 100rpx;
						line-height: 100rpx;
						font-size: 40rpx;
					}

					.p1 {
						height: 50rpx;
						line-height: 50rpx;
						display: flex;

						text {
							margin-right: 10rpx;
						}
					}
				}
			}

			.top-right {
				display: flex;
				align-items: flex-end;

				text {
					padding: 0 30rpx;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 60rpx;
					color: #fff;
					letter-spacing: 2rpx;
					background: darkorange;
				}

				.isFlaged {
					background: #ccc;
				}
			}
		}

		.main-bottom {
			display: flex;
			justify-content: space-around;

			.bottom-item {
				position: relative;
				width: calc((100% - 40rpx)/4);
				display: flex;
				align-items: center;
				flex-direction: column;
				background-color: #fff;
				padding: 10rpx 20rpx;
				border-radius: 20rpx;

				.item-num {
					font-weight: bold;
					font-size: 32rpx;
				}

				.item-title {
					color: #777;
				}
			}

			.bottom-item:not(:last-child):before {
				content: "";
				height: 30rpx;
				width: 2rpx;
				background-color: #ddd;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				z-index: 20;
			}
		}
	}

	/* 推荐 */
	.banner {
		display: flex;
		justify-content: space-between;

		.section {
			width: calc((100% - 80rpx)/2);
			padding: 20rpx 0 20rpx 20rpx;
			background-color: #fff;
			border-radius: 20rpx;
			border: 4rpx solid darkorange;

			.section-one {
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					font-weight: bold;
					font-size: 30rpx;
				}
			}

			.section-two {
				text {
					color: #777;
					font-size: 24rpx;
				}
			}

			.section-three {
				margin-top: 20rpx;

				text {
					color: #fff;
					height: 60rpx;
					line-height: 60rpx;
					border-radius: 30rpx;
					padding: 10rpx 50rpx;
					background: linear-gradient(90deg, #ffaa7f, #ff557f);
				}
			}
		}

	}
	/* // 弹窗 */
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
	

	/* 动态按钮 */
	.active-btn {
		position: fixed;
		bottom: 120rpx;
		right: 20rpx;
		background-color: darkorange;
		z-index: 5;
		font-size: 14px;
		color: #fff;
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		border-radius: 20rpx;

		text {
			margin-left: 10rpx;
		}
	}
	
	.like-ul{
		padding: 40rpx 20rpx;
	}
</style>
