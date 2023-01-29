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
						<text>{{data.sex == 'male'? "男士":"女士"}}你好，请问你的年龄是？</text>
					</view>
				</uni-transition>
			</view>
			<uni-transition mode-class="fade" :show="showIndex > 1">
				<view class="tip">
					<text>提示：年龄需要达18岁以上才能使用本平台</text>
				</view>
			</uni-transition>
		</view>
		<uni-transition mode-class="zoom-in" :show="showIndex > 2">
			<view class="message-bottom">
				<view class="age-input">
					<input type="number" placeholder="请输入你的年龄" v-model="age"/>
				</view>
				<view class="btnSure">
					<button @click="pass">确定</button>
				</view>
			</view>
		</uni-transition>
	</view>
</template>

<script>
	export default {
		props: ['data'],
		data() {
			return {
				showIndex: 0,
				age: ''
			};
		},
		methods: {
			pass() {
				if(this.age)
					this.$emit('pass', this.age)
				else
					this.$showMsg('请填写信息')
			},
			delay() {
				let $this = this
				var i = 0;
				function delay_exec() {
					if ((i++) < 3) {
						setTimeout(function() {
							$this.showIndex++
							return delay_exec();
						}, 1000);
					}
				}
				delay_exec();
			}
		},
		mounted(){
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

	.message-bottom {
		margin-top: 50px;
		height: 100px;
		padding: 0 20px;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		align-items: center;

		.age-input {
			border: 2px solid #ffb4c0;
			width: 80%;
			height: 40px;
			line-height: 40px;
			padding-left: 5px;
			border-radius: 10px;

			input {
				height: 40px;
				line-height: 40px;
			}
		}

		.btnSure {
			height: 40px;
			width: 80%;
			margin-top: 20px;

			button {
				border-radius: 10px;
				background-color: darkorange;
				font-size: 14px;
				color: #fff;
			}
		}
	}
</style>
