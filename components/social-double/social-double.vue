<template>
	<view>
		<mescroll-uni ref="mescrollRef" @init="init" @down="downCallback" :down="downOption" :up="upOption"
			@up="upCallback" :height="wh+'px'" :fixed="true" style="width: 100%;display: block;">
			<template v-if="contentShow">
			<template v-for="(item, i) in acitveData">
			   <message-box :datas="item" @openPopu="openPopu(item)"></message-box>
			</template>
			</template>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		name: "social-concern",
		mixins: [MescrollMixin], // 使用mixin
		props: ['request', 'getTotal'],
		data() {
			return {
				page: 2,
				total: 0,
				contentShow:true,
				downOption: {
					use: true,
					auto: false,
					page: {
						num: 0,
						size: 10
					},
					textLoading: '加载中....',
				},
				myInfo:{},
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
				this.mescroll.resetUpScroll();
			},
			upCallback(e) {
				this.page = e.num;
				this.getMoreInfo()
			},
			getMoreInfo() {
				let _that = this;
				if (_that.flag == true) {
					_that.request({
						page: _that.page,
						size: 10
					}).then(res => {
						if (_that.acitveData.length + res.data.data.length == _that.total) {
							_that.flag = false
							_that.mescroll.optDown.textSuccess = '暂无更多数据'
						}
						if (_that.page == 1) {
							_that.contentShow=false
							_that.acitveData = res.data.data;
							_that.$nextTick(()=>{
								_that.contentShow=true;
							})
						} else {
							_that.acitveData = _that.acitveData.concat(res.data.data)
						}
						_that.mescroll.endByPage(10, parseInt(_that.total / 10));
					})
				} else {
					_that.mescroll.endByPage(10, parseInt(_that.total / 10));
				}
			},
			openPopu(item) {
				this.$emit('openPopu', item)
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
				_that.request({
					page,
					size: 10,
				}).then(res => {
					console.log(res);
					_that.infoInit(res)
					uni.hideLoading()
				})
			},
			// 初始化信息
			infoInit(res) {
				this.acitveData = []
				this.acitveData = res.data.data;
				this.page = 1
				this.flag = true
				this.getInfo = true
				this.mescroll.optDown.textSuccess = '加载成功'
			},
			// 重新获取数据
			backUpdate() {
			   this.mescroll.resetUpScroll();
			},
			// 获取总数量
			initTotal() {
				let _that = this;
				this.getTotal().then(res => {
					_that.total = res.data.data
				})
			}
		},
		mounted() {
			this.myInfo = this.$store.state.user.loginUser ? this.$store.state.user.loginUser : {
				loginName: "",
				nickName: "",
				userId: "1"
			};
			this.initTotal();
			this.getAroundInfo(1);
			uni.$off("backUpdate")
			uni.$on('backUpdate', this.backUpdate)
			this.wh = uni.getSystemInfoSync().windowHeight - 145;
		},

	}
</script>

<style lang="scss">
</style>
