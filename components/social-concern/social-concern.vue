<template>
	<view>
		<mescroll-uni ref="mescrollRef" @init="init" @down="downCallback" :down="downOption" :up="upOption"
			@up="upCallback" :style="{height:wh+'px'}" :fixed="true">
			<message-box :data="item" v-for="(item, i) in acitveData" :key="i" @openPopu="openPopu"></message-box>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		name: "social-concern",
		mixins: [MescrollMixin], // 使用mixin
		props:['request'],
		data() {
			return {
				total: 0,
				page: 2,
				downOption: {
					use: true,
					auto: false,
					page: {
						num: 1,
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
					textNoMore: '~暂无更多信息~'
					// empty: {
					// 	tip: '暂无相关数据'
					// }
				},
				mescroll: null,
				wh: 0,
				getInfo: false,
				acitveData: [],
				flag: true
			};
		},
		methods: {
			init(mescroll) {
				this.mescroll = mescroll;
				this.$emit('init', mescroll)
			},
			downCallback(e) {
				let _that = this;
				// console.log(e);
				if (_that.flag == true) {
					_that.request({
						page: _that.page,
						size: 10,
						userId: 1
					}).then(res => {
						_that.page++
						_that.acitveData.unshift(...res.data)
						if (res.data.length < 10) {
							_that.flag = false
							_that.mescroll.optDown.textSuccess = '暂无更多数据'
						}
						_that.mescroll.endByPage(res.data.length, 1);
					})
				} else {
					_that.mescroll.endByPage(1, 1);
				}
			},
			upCallback(e) {
				let _that = this;
				if (_that.flag == true) {
					_that.request({
						page: _that.page,
						size: 10,
						userId: 1
					}).then(res => {
						_that.page++
						_that.acitveData.push(...res.data)
						if (res.data.length < 10) {
							_that.flag = false
							_that.mescroll.optDown.textSuccess = '暂无更多数据'
						}
						_that.mescroll.endByPage(res.data.length, 10000);
					})
				}

			},
			openPopu() {
				this.$emit('openPopu', true)
			},
			gotoComment() {
				uni.navigateTo({
					url: '/subpkg/comment/comment'
				})
			},
			// 获取附近用户信息
			getAroundInfo(page) {
				let _that = this;
				uni.showLoading({
					title: '加载中'
				});
				
				// this.$emit('request',{})
				
				_that.request({
					page,
					size: 10,
					userId: 1
				}).then(res => {
					_that.infoInit(res)
					uni.hideLoading()
				})
			},
			infoInit(res) {
				this.acitveData = []
				this.acitveData = res.data
				this.page = 2;
				this.flag = true
				this.getInfo = true;
				this.mescroll.optDown.textSuccess = '加载成功'
			},
			backUpdate() {
				this.getAroundInfo(1)
			}
		},
		mounted() {
			this.getAroundInfo(1);
			this.$bus.$on('backUpdate', this.backUpdate)
			this.wh = uni.getSystemInfoSync().windowHeight - 103;
		},

	}
</script>

<style lang="scss">
	// 单个信息盒子

	.social-close {
		background-color: red;
	}

	.item-box {
		display: flex;
		background-color: #fff;

		.left-img {

			img {
				margin: 0 8px;
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}
		}

		.right-box {
			width: calc(100vw - 56px);

			.title-info {
				height: 40px;


				h2 {
					font-size: 14px;
					height: 25px;
					line-height: 25px;
				}

				p {
					font-size: 12px;
					height: 15px;
					line-height: 15px;
					color: #a5a395;

					span:nth-child(2) {
						margin: 0 2px;
					}
				}
			}

			.content-info {
				margin-top: 10px;

				p {
					font-size: 14px;
					word-wrap: break-word;
				}

				.cont-info-img {
					margin-top: 10px;

					img {
						width: 130px;
						height: 130px;
						border-radius: 10px;
					}
				}
			}

			.btn-info {
				margin-top: 10px;
				margin-bottom: 20px;
				display: flex;
				justify-content: space-between;

				.btn-info-right {
					display: flex;

					&>view {
						display: flex;
						align-items: center;

						span {
							font-size: 12px;
							margin-right: 10px;
							color: #a5a395;
						}
					}
				}
			}
		}
	}
</style>
