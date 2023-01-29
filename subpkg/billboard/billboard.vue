<template>
	<view class="root">
		<mover :isBack="true">
            <view slot="content">{{isConcern==1?"我的关注":"我的粉丝"}}</view>
        </mover>
		<!-- 头部 -->
		<view class="header">
		        <text :class="isConcern == 1 ? 'active' : ''" @click="goConcern()">关注</text>
				<text :class="isConcern == 2 ? 'active' : ''" @click="gotoFan()">粉丝</text>
		</view>
		
		<view class="box">
			<concern :list="attentionList" v-if="isConcern == 1"></concern>
			<fan :list="fanList" v-if="isConcern == 2"></fan>
		</view>
	</view>
</template>

<script>
	import concern from "@/components/person-billboard/concern.vue"
	import fan from "@/components/person-billboard/fan.vue"
	import { mapState } from 'vuex'
	import my from '@/apis/my.js'
	export default {
		data() {
			return {
				isConcern: 1,
				searchValue: '',
				attentionList: [],
				fanList: [],
				attentionPage: {
					follower: 5,
					start: 1,
					limit: 10,
				},
				fanPage: {
					userId: 5,
					start: 1,
					limit: 10,
				},
				isLoading: false
			};
		},
		computed: {
			...mapState('user', ['loginUser']),
			...mapState('common', ['baseInfo']),
		},
		components: {
			concern,fan
		},
		mounted(){
			// this.attentionPage.follower = this.loginUser.userId
			this.fanPage.userId = this.loginUser.userId;
            if(this.isConcern == 1){
               this.getAttentionList()
            }else{
               this.getFanList()
            }

		},
		onLoad(options){	
			if(options.type){
                this.isConcern = parseInt(options.type)
            }
				
		},
		// 下拉触底
		onReachBottom(){
			// 节流器
			if(!this.isLoading){
				if(this.isConcern == 1){
					this.attentionPage.start++
					this.getAttentionList()
				}else{
					this.fanPage.start++
					this.getFanList()
				}				
			}					
		},
		methods: {
			// 查询关注列表
			async getAttentionList(){
				this.isLoading = true
				const { data: res} = await my.searchFan(this.attentionPage)
				if(res.resultCode === 200){
					this.attentionList = this.attentionList.concat(res.data?res.data:[]);
				}
				this.isLoading = false;
			},
			async getFanList(){
				this.isLoading = true
				const { data: res} = await my.searchAttention(this.fanPage)
				if(res.resultCode === 200){
                  this.fanList = this.fanList.concat(res.data?res.data:[]);
				}
				this.isLoading = false
			},
			goConcern(){
                this.isConcern = 1;
                if(this.attentionList.length==0){
                    this.getAttentionList();
                }
            },
			gotoFan(){
			    this.isConcern = 2;
			    if(this.fanList.length==0){
			        this.getFanList();
			    }
			},
			gotoBack() {
				uni.switchTab({
					url: '/pages/person/person'
				})
			},
			input(res){
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'contact'
				})
			}
		}
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
</style>
