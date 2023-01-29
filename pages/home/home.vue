<template>
	<view class="root">
		<!-- 设置部分的抽屉盒子 -->
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content">
				<view class="content-box">
					<view class="popup-top">
						<view class="top-left">
							<span>快捷应用</span>
						</view>
						<view class="top-right" @click="closePopup">
							<span>关闭</span>
							<uni-icons type="list" size="25" color="pink"></uni-icons>
						</view>
					</view>
					<view class="popup-bottom">
						<navigator class="popup-item" v-for="(item, i) in buttonsList" :key="i" url="#">
							<view class="item-box">
								<img :src="item.iconPath" alt="">
							</view>
							<span>{{item.text}}</span>
						</navigator>
					</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 头部 -->
		<view class="header">
			<view class="header-logo">
				<!-- <img src="@/static/images/user.jpg" alt=""> -->
				<uni-icons type="contact-filled" size="35" color="#fff"></uni-icons>
			</view>
			<view class="header-btn" @click="changeSetting">				
				<uni-icons type="list" size="35" color="#fff"></uni-icons>
			</view>
		</view>
		
		<!-- banner -->
		<view class="banner">
			<!-- 轮播图区域 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item, i) in swiperList" :key="i">
					<navigator class="swiper-item" url="#">
						<image :src="item.imagepath"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 内容区 -->
		<view class="body">
			<!-- 按钮区 -->
			<view class="body-buttons">
				<navigator class="buttons-item" v-for="(item, i) in buttonsList" :key="i" url="#">
					<view class="item-box">
						<img :src="item.iconPath" alt="">
					</view>
					<span>{{item.text}}</span>
				</navigator>
			</view>
			<!-- 广告区 -->
			<view class="body-adver">
				<navigator class="adver-item" v-for="(item, i) in adverList" :key="i" url="#">
					<img :src="item.imagePath" alt="" mode="">
				</navigator>
			</view>
			
			<!-- 活动区 -->
			<view class="body-activity">
				<view class="activity-title">
					<span>最新活动</span>
				</view>
				<navigator class="activity-item" v-for="(item, i) in activityList" :key="i" url="#">
					<img :src="item.imagePath" alt="" mode="">
				</navigator>
			</view>
			
			<!-- 推荐区 -->
			<view class="body-recomment">
				<view class="recomment-title">
					<view class="title-left">
						<span>推荐嘉宾</span>
					</view>
					<view class="title-right">
						<span>
							高分优质单身男女,						
						</span>
						<view class="right-art" @click="gotoRank">
							<span>上榜！</span>
							<uni-icons type="arrow-right" size="25" color="red"></uni-icons>
						</view>
					</view>
				</view>
				<view class="recomment-list">
					<view class="recomment-item" v-for="(item, i) in recommentList" :key="i">
						<view class="item-img">
							<img :src="item.imagePath" alt="">
							<span class="img-prove">已认证</span>
						</view>
						<view class="item-info">
							<p>
								<span class="info-age">{{item.age}}岁</span>·
								<span class="info-high">{{item.high}}cm</span>·
								<span class="info-rank">{{item.rank}}</span>
							</p>
							<p>
								<span class="info-disType">{{item.disType}}</span>·
								<span class="info-disLevel">{{item.disLevel}}</span>
							</p>
							<p class="info-imp">
								<span class="info-address">
									<uni-icons type="location" size="15" color="red"></uni-icons>
									<span>{{item.position}}</span>
								</span>
								<span class="info-opration">{{item.operation}}</span>
							</p>
						</view>
					</view>
				</view>
				<view class="recomment-more">
					<span class="more-box" @click="gotoChoose">
						查看更多嘉宾
					</span>
				</view>
			</view>
			
			<!-- 文章分享区 -->
			<view class="body-article">
				<navigator class="article-item" v-for="(item, i) in articleList" :key="i" url="#">
					<img :src="item.imagePath" alt="" mode="">
				</navigator>
			</view>
		</view>
		
		<!-- 页脚区 -->
		<view class="footer">
			<view class="footer-top">
				<span></span>
				<text>残疾人单身男女的优质选择</text>
				<span></span>
			</view>
			<view class="footer-info">
				<p>Copyright @2022-2032 ASYBDSA.COM All rights reserved</p>
				<p>渝公网安备 161315632112332号</p>
				<p>工信部备案号： 渝ICP备1899565号-1</p>
				<p>版权号：国作登字-2022-F-000156dsa5</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 打开设置窗口
	
				// 轮播图
				swiperList: [{
					imagepath: '/static/images/swiper/1.jpg'
				},{
					imagepath: '/static/images/swiper/2.jpg'
				},{
					imagepath: '/static/images/swiper/3.jpg'
				}],
				// 快捷按钮区
				buttonsList: [
					{
					iconPath: '/static/images/tabs/约会.png',
					text: '约吧'
				},{
					iconPath: '/static/images/tabs/my-active.png',
					text: '单身群'
				},{
					iconPath: '/static/images/tabs/cate.png',
					text: '活动'
				},{
					iconPath: '/static/images/biaoqing.png',
					text: '情感测试'
				},{
					iconPath: '/static/images/tabs/cart.png',
					text: '待补充'
				},{
					iconPath: '/static/images/tabs/cart.png',
					text: '待补充'
				},{
					iconPath: '/static/images/tabs/cart.png',
					text: '待补充'
				},{
					iconPath: '/static/images/tabs/cart.png',
					text: '待补充'
				}],
				// 广告
				adverList: [{
					imagePath: '/static/images/activity/activity1.jpg'
				}],
				// 活动
				activityList: [{
					imagePath: '/static/images/activity/activity2.jpg'
				},{
					imagePath: '/static/images/activity/activity3.jpg'
				}],
				// 推荐嘉宾
				recommentList: [{
					imagePath: '/static/images/user.jpg',
					age: '18岁',
					high: '178cm',
					rank: '大专',
					disType: '精神残疾',
					disLevel: '二级',
					position: '南岸区',
					operation: '自由职业者'
				},{
					imagePath: '/static/images/user2.jpg',
					age: '18岁',
					high: '178cm',
					rank: '大专',
					disType: '精神残疾',
					disLevel: '二级',
					position: '南岸区',
					operation: '自由职业者'
				},{
					imagePath: '/static/images/home/img1.png',
					age: '18岁',
					high: '178cm',
					rank: '大专',
					disType: '精神残疾',
					disLevel: '二级',
					position: '南岸区',
					operation: '自由职业者'
				},{
					imagePath: '/static/images/content2.jpg',
					age: '18岁',
					high: '178cm',
					rank: '大专',
					disType: '精神残疾',
					disLevel: '二级',
					position: '南岸区',
					operation: '自由职业者'
				}],
				articleList: [{
					imagePath: '/static/images/activity/activity4.jpg'
				}]
			}
		},
		methods: {
			// 关闭弹窗
			closePopup(){
				this.$refs.popup.close()
			},
			// 改变设置状态
			changeSetting(){
				this.$refs.popup.open('top')
			},
			// 去往选择页面
			gotoChoose() {
				this.$showMsg('选择页面未完成')
			},
			// 上主页榜
			gotoRank() {
				this.$showMsg('榜单更换功能未完成')
			}
		},
	}
</script>

<style lang="scss" scoped>
	.popup-content{
		background-color: transparent;
		
		.content-box{
			padding: 0 20rpx;
			background-color: #fff;
			border-radius: 0 0 30rpx 30rpx;
			
			.popup-top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border: 1px solid #fcfcfc;
				
				
				.top-right {
					display: flex;
					align-items: center;
				}
			}
			
			.popup-bottom{
				width: 100%;
				padding-top: 50rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				
				.popup-item{
					height: 150rpx;
					width: calc((750rpx - 40rpx) / 4); 
					margin-bottom: 30rpx;
					background-color: #fff;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					.item-box{
						width: 100rpx;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #ccc;
						border-radius: 50rpx;
						margin-bottom: 6rpx;
						
						img{
							width: 60%;
							height: 60%;
						}
					}
										
					
				}
			}
		}
	}
	.root{
		.header{
			padding: 0 20rpx;
			height: 100rpx;
			background-color: darkorange;
			display: flex;
			justify-content: space-between;

			.header-logo, .header-btn{
				display: flex;
				align-items: center;
			}
		}
		
		.banner{
			margin: 20rpx;
			height: 330rpx;
			// background-color: aquamarine;
			
			swiper {
				height: 100%;
				border-radius: 20rpx;
				background-color: #fff;
				
				.swiper-item, image {
					height: 100%;
					width: 100%;
					border-radius: 20rpx;
				}
			}
		}
		
		.body{
			padding: 0 20rpx;
			
			.body-buttons{
				width: 100%;
				padding-top: 50rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				
				.buttons-item{
					height: 150rpx;
					width: calc((750rpx - 40rpx) / 4); 
					margin-bottom: 30rpx;
					background-color: #fff;
					display: flex;
					flex-direction: column;
					align-items: center;
					
					.item-box{
						width: 100rpx;
						height: 100rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: #fc9168;
						border-radius: 20rpx;
						margin-bottom: 6rpx;
						
						img{
							width: 60%;
							height: 60%;
						}
					}
					
					
					// .item-box:nth-child(2){
					// 	background-color: #87b9f8;
					// }
					
					// .item-box:nth-child(3){
					// 	background-color: #fc9168;
					// }
					
					// .item-box:nth-child(4){
					// 	background-color: #fc88c5;
					// }
					
				}
			}
			
			.body-adver{
				margin-bottom: 40rpx;	
				
				.adver-item{
					width: 100%;
					border-radius: 40rpx;
					
					img{
						width: 100%;
						border-radius: 40rpx;
					}
				}
			}
			
			.body-activity{
				
				.activity-title{
					height: 60rpx;
					line-height: 60rpx;
					
					span{
						font-weight: bold;
						
					}
				}
				
				.activity-item{
					width: 100%;
					border-radius: 40rpx;
					margin-bottom: 20rpx;
					
					img{
						width: 100%;
						border-radius: 40rpx;
					}
				}
			}
			
			.body-recomment{
				
				.recomment-title{
					height: 100rpx;				
					display: flex;
					justify-content: space-between;
					
					
					&>view{
						display: flex;
						align-items: center;
						
						span{						
							padding: 5rpx 10rpx;
							display: inline-block;
							height: 50rpx;
							line-height: 50rpx;
							
						}
					}
					
					.title-left{
						span{
							background-color: red;
							color: #fff;
							padding: 0 30rpx;
							border-radius: 30rpx;						
						}
					}
					
					.title-right{
						font-size: 12px;
						
						.right-art{
							display: flex;
							align-items: center;
							color: red;					
						}
					}
				}
				
				.recomment-list{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-around;
					
					.recomment-item{
						width: calc((100% - 40rpx - 20rpx)/2);
						margin-bottom: 40rpx;
						border-radius: 10rpx;
						box-shadow: 1px 1px 1px rgba(0,0,0,0.1), 
						1px -1px 1px rgba(0,0,0,0.1),
						-1px -1px 1px rgba(0,0,0,0.1);
						
						.item-img{
							position: relative;
							
							img{
								border-radius: 10rpx 10rpx 0 0;
								width: 100%;
								height: 60%;
							}
							
							.img-prove{
								position: absolute;
								top: 0;
								left: 0;
								height: 40rpx;
								line-height: 40rpx;
								font-size: 12px;
								border-radius: 10rpx 20rpx 20rpx 0;
								padding: 0 15rpx 0 10rpx;
								background-color: #00e100;
								color: #fff;
								letter-spacing: 2rpx;
							}
						}
						
						.item-info{
							p{
								text-align: center;
								line-height: 50rpx;
								font-size: 12px;
								color: #777;
								
								span{
									margin: 0 6rpx;
								}
							}
							
							.info-imp{
								color: red;
								font-size: 10px;
								margin-bottom: 20rpx;
								
								&>span{
									border-radius: 20rpx;
									height: 50rpx;
									padding: 5rpx 10rpx;
									background-color: rgba(255, 0, 0, 0.1);
								}
							}
						}
					}
					
				}
			
				.recomment-more {
					height: 100rpx;
					margin-bottom: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.more-box{
						padding: 5rpx 60rpx;
						height: 50rpx;
						line-height: 50rpx;
						background-color: #eee;
						color: #414141;
						border-radius: 50rpx;
					}
				}
			}
							
			.body-article{
				margin-bottom: 40rpx;
				
				.article-item{
					width: 100%;
					border-radius: 40rpx;
					
					img{
						width: 100%;
						border-radius: 40rpx;
					}
				}
			}
		}
		
		.footer{
			padding: 0 20rpx;
			color: #777;
			
			.footer-top{
				display: flex;
				align-items: center;
				font-size: 13px;
				
				span{
					height: 2rpx;
					background-color: #ccc;
					width: 178rpx;				
				}
				text{
					margin: 0 20rpx;
				}
			}
			
			.footer-info{
				margin-top: 20rpx;
				font-size: 12px;

				p{
					text-align: center;
				}
			}
		}
	}
</style>
