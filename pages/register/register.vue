<template>
	<view class="root">
		<!-- 退出和步骤条 -->
		<uni-transition mode-class="slide-right" :show="pages !== 1">
			<view class="register-step">	
				<view class="backTo">
					<i class="iconfont icon-quxiao" @click="cancleRegister"></i>
					<text>欢迎来到残疾人约吧</text>
				</view>
				<view class="step">
					<uni-steps :options="steps" :active="pages-2" active-color="darkorange"/>
				</view>			
			</view>
		</uni-transition>	
<!-- <reg-img ></reg-img> -->
		<!-- 几个组件页面 -->
		<reg-phone v-if="pages === 1" @pass="addPagePhone"></reg-phone>
		<reg-sex v-else-if="pages === 2" @pass="addPageSex"></reg-sex>
		<reg-age v-else-if="pages === 3" @pass="addPageAge" :data="data"></reg-age>
		<reg-img v-else-if="pages === 4" @pass="addPageImg"></reg-img>
		<reg-dis v-else :data="data"></reg-dis>
		
		<!-- 取消注册提示窗 -->
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog cancelText="继续注册" confirmText="返回首页" content="确定要退出注册吗？" @confirm="dialogConfirm"
				@close="dialogClose">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pages: 1, //登录组件页面
				steps: [{
					title: '性别'
				}, {
					title: '年龄'
				}, {
					title: '头像'
				}, {
					title: '认证'
				}],
				data: {}, //注册的数据
			};
		},
		methods: {
			addPagePhone(val){
				this.data.phone = val
				this.addPages()
			},
			addPageSex(val){
				this.data.sex = val
				this.addPages()
			},
			addPageAge(val){
				this.data.age = val
				this.addPages()
			},
			addPageImg(val){
				this.data.img = val
				this.addPages()
			},
			addPages(){
				this.pages++
			},
			cancleRegister() {
				this.$refs.alertDialog.open()
			},
			dialogConfirm() {
				this.pages = 1
			},
			dialogClose(){
				this.$refs.alertDialog.close()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.root{
		height: 100vh;
		background-color: #fff6f1;	
	}

	.register-step {
		height: 15vh;
		padding: 0 40rpx;
		
		.backTo {
			margin-bottom: 40rpx;
			line-height: 80rpx;
			height: 80rpx;
			
			i {
				font-weight: bold;
				float: left;
				margin-left: 20rpx;
			}
			
			text{
				float: left;
				margin-left: 150rpx;
			}
		}
		
		
	}
	

</style>
