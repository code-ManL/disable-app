<template>
	<view class="list-box">
		<mover :isBack="true">
             <view slot="content">{{isConcern==1?"喜欢的人":"不喜欢的人"}}</view>
        </mover>
		<view class="header">
			<text :class="isConcern == 1 ? 'active' : ''" @click="isConcern=1;inits()">喜欢</text>
			<text :class="isConcern == 2 ? 'active' : ''" @click="isConcern=2;inits()">不喜欢</text>
		</view>

		<mescroll-uni ref="mescrollRef" @init="init" @down="downCallback" :down="downOption" :up="upOption"
			@up="upCallback" :style="{height:wh+'px'}" :fixed="false" style="width: 100%;display: block;">
		<view class="list-header" v-for="item in likeList">
			<image class="img" :src="item.headPicture"
				mode="aspectFill" />
			</image>

			<view class="text1">
				<text class="name">{{item.userName}}</text>
				<text class="content">{{item.introduce?item.introduce:"暂无介绍"}}</text>
			</view>
			<view class="like"  @click="btn_like(item)" v-if="isConcern == 1">
				已喜欢
			</view>
			<view class="like" @click="btn_like(item)" style="background-color: #eeeeee;color: #000000;" v-else>
				不喜欢
			</view>

		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import recomment from '@/apis/recomment.js'
	import my from '@/apis/my.js'
	import { mapState } from 'vuex'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], 
		data() {
			return {
				isConcern:1,
				wh:0,
				downOption: {
					use: true,
					auto: false,
					page: {
						num: 0,
						size: 10
					},
					textLoading: '加载中....',
				},
				upOption: {
					use: true,
					auto: false,
					page: {
						num: 0,
						size: 10
					},
					textNoMore: '~暂无更多信息~'
				},
				mescroll:null,
				likeList:[],
				myInfo:{
					loginName: "",
					nickName: "",
					userId: ""
				}
			}
		},
		mounted() {
			this.wh = uni.getSystemInfoSync().windowHeight - 200;
			this.myInfo = this.$store.state.user.loginUser ? this.$store.state.user.loginUser : {
				loginName: "",
				nickName: "",
				userId: ""
			};
			this.getLikeList({
				num:1
			});
		},
		methods: {
			...mapState('user', ['loginUser']),
			btn_like(item){
				recomment.loveUser({
					likedUserId: item.userId
				}).then((res) => {
				}).catch(() => {
				
				})
			},
			init(mescroll) {
				this.mescroll = mescroll;
				this.$emit('init', mescroll)
			},
			inits(){
			 this.mescroll.resetUpScroll();
			},
			gotoBack() {
				uni.navigateBack()
			},
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			upCallback(e) {
				this.getLikeList(e);
			},
			getLikeList(e){
				if(this.isConcern==1){
					my.getLikeUsers({
						page:e.num,
						size:10,
						userId:this.myInfo.userId
					}).then((res)=>{
						if(e.num==1){
							this.likeList = res.data.data?res.data.data:[];
						}else{
							this.likeList = this.likeList.concat(res.data.data?res.data.data:[]);
						}
					   this.mescroll.endByPage(10,res.data.map.pages?res.data.map.pages:0);
					}).catch((err)=>{
						
					})
				}else{
					my.getDisLikeUsers({
						page:e.num,
						size:10,
						userId:this.myInfo.userId
					}).then((res)=>{
						if(e.num==1){
							this.likeList = res.data.data?res.data.data:[];
						}else{
							this.likeList = this.likeList.concat(res.data.data?res.data.data:[]);
						}
					   this.mescroll.endByPage(10,res.data.map.pages?res.data.map.pages:0);
					}).catch((err)=>{
						
					})
				}

			},
			
		},
	}
</script>

<style lang="scss" scoped>
	.header {
			height: 80rpx;
			display: flex;
			box-sizing: border-box;
            width: 100%;
            margin: 20rpx auto 0;
            text {
            	font-size: 32rpx;
            	display: inline-block;
            	color: #3f3f3f;
                margin-left: 60rpx;
            }
            
            .active{
                color: #000000 !important;
                position: relative;
                font-weight: bold;
            }
            .active::after{
                position: absolute;
                top: 50rpx;
                content: " ";
                width: 90%;
                left: 5%;
                height: 6rpx;
                background-color: #FB966E;
            }
		}
	
	.list-box {
		margin-top: 20rpx;
		.list-header {
			width: 100%;
			padding: 10rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: flex-start;
			background-color: #ffffff;
			padding-bottom: 20rpx;

			.img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}

			.text1 {
				width: 400rpx;
				margin-left: 20rpx;

				.name {
					display: block;
				}

				.content {
					display: block;
					font-size: 26rpx;
					margin-top: 10rpx;
					color: #4c4b4b;
				}
			}
			
			.like{
		padding: 10rpx 20rpx;
		    font-size: 30rpx;
		    line-height: 1;
		    background: rgba(249, 95, 129, 1);
		    height: 40rpx;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    border-radius: 20rpx;
		    color: #FFFFFF;
			margin-top: 20rpx;
			margin-left: 40rpx;
			}
		}

		.list-content {
			margin-top: 30rpx;
			background-color: #ffffff;
			height: 60rpx;
		}
	}
</style>
