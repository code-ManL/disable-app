<template>
	<view>
		<view class="message-info">			
			<view class="img-logo">
				<uni-transition mode-class="zoom-in" :show="true">
					<uni-icons type="contact-filled" size="40" color="pink"></uni-icons>
				</uni-transition>
			</view>
			
			<view class="">				
				<uni-transition mode-class="fade" :show="showIndex > 0">
					<view class="">
						<text>为了给你推荐更合适的好友，请先告诉我你的一些基本信息。</text>
					</view>
				</uni-transition>
				<uni-transition mode-class="fade" :show="showIndex > 1">
					<view class="">
						<text>你的性别是？</text>
					</view>
				</uni-transition>
			</view>
			<uni-transition mode-class="fade" :show="showIndex > 2">
				<view class="tip">
					<text>提示：性别一旦确定无法更改</text>
				</view>
			</uni-transition>
		</view>
		<uni-transition mode-class="zoom-in" :show="showIndex > 3">
			<view class="message-bottom">
				<view class=""  @click="pass('male')">
					<image src="@/static/person/boy.png"></image>
					<text>男</text>
				</view>
				<view class=""  @click="pass('female')">
					<image src="@/static/person/girl.png"></image>
					<text>女</text>
				</view>
			</view>
		</uni-transition>		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showIndex: 0,
			};
		},

		methods: {

			pass(sex){
				this.$emit('pass', sex)
			},
			// 延时动画
			delay(){
				let $this = this
				var i=0;
				function delay_exec(){
				     if((i++)<5){
				          setTimeout(function (){
							$this.showIndex++
				            return delay_exec();			
				          },1000);			        
				     }
				}
			
				delay_exec();
			}
		},
		mounted() {
			this.delay()
		}
	}
</script>

<style lang="scss" scoped>
	.message-info {
		padding: 20px 20px 0 20px;
		font-size: 14px;
		
		& > view {
			margin-top: 10px;
			
			view {
				margin-top: 10px;
				width: 80%;
				line-height: 30px;
				background-color: #fff;
				padding: 5px 10px;
				border-radius: 10px;
			}
		}	
		
		.tip{	
			margin-top: 10px;
			
			text{
				display: inline-block;
				font-size: 12px;
				background-color: #ccc;
				color: #fff;
				line-height: 25px;
				border-radius: 5px;
				padding: 0 10px;
			}
		}
	}
	
	.message-bottom{
		margin-top: 50px;
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: space-around;
		
		view{
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			border: 1px solid #eee;
			width: 30%;
			border-radius: 10px;
			
			image{
				height: 50px;
				width: 50px;
			}
		}
	}

</style>
