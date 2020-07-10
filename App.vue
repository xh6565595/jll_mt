<script>
	import http from '@/utils/http/index.js';
	// const jweixin = require('jweixin-module');
	
	export default {
		onLaunch: function(options) {
			console.log('App Launch');
			// this.initUser()
			// if(this.is_weixn){
			// 	this._iniWxJdk();
			// }
			console.log('app',options)
			
			uni.showShareMenu({ 
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		
		methods:{
			// 是否微信浏览器
			// is_weixn() {
			// 	var ua = navigator.userAgent.toLowerCase();
			// 	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			// 		return true;
			// 	} else {
			// 		return false;
			// 	}
			// },
			async autoLogin() {
				let that = this;
				const user = uni.getStorageSync('user');
				// console.log(user)
				let loginParams = {}
				if (user) {
					loginParams.username = user.username;
					loginParams.password = user.password;
				} else {
					// uni.reLaunch({
					// 	url: '/pages/main/main'
					// });
					return false; 
				}
			
				try {
					let res = await this.$api.userLogin(loginParams, false);
		
					if (res.Success) {
						uni.setStorageSync('user',loginParams);
						
						that.$store.commit('login');
	
						that.initUser();  
					} else {
					}
				} catch (err) {
				}
			},
			// 加载登录账户信息
			async initUser(callback) { 
				let that = this;
				try {
					// this.$ui.showloading();
			
					let res = await this.$api.getConsumer({}, false);
					// this.$ui.hideloading();
			
					// console.log(res)
					if (res.Success) {
						if (res.Data) {
							that.$store.commit('setAccountInfo', res.Data);
							// that.userAccount = res.Data;
							that.$store.commit('login');
							console.log('login')
						}
					} else {
						that.$ui.toast(res.Msg);
						that.$store.commit('logout');
						uni.removeStorageSync('hepai_token')
					}
					if (callback) callback();
				} catch (err) {
					// console.log('请求结果false : ' + err);
				}
			},
			async _iniWxJdk() {
				let that = this;
				try {
					// #ifdef H5
					let url = window.location.href;
					// let url = 'http://192.168.1.5:8080'
					// #endif
					let res = await this.$api.GetWxJsApiConfig({ url: url }, true);
					// console.log(666,res)
					if (res.Success) {
						let set = res.Data;
						jweixin.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: set.appId, // 必填，公众号的唯一标识
							timestamp: set.timestamp, // 必填，生成签名的时间戳
							nonceStr: set.noncestr, // 必填，生成签名的随机串
							signature: set.signature, // 必填，签名
							jsApiList: [
								'onMenuShareAppMessage',
								'onMenuShareTimeline',
								'onMenuShareQQ',
								'onMenuShareQZone',
								'onMenuShareWeibo',
								'chooseWXPay',
								'chooseImage',
								'uploadImage'
							] // 必填，需要使用的JS接口列表
						});
						jweixin.ready(function() {
							// alert('ok')
							// 我自己的pid
							// let parentId = that.accountInfo.invitation_code
							let options = {
								title: 'GLLO健康智能马桶', // 分享标题
								link: http.mainUrl + 'index.html', // 分享链接，记得使用绝对路径，不能用document.URL
								imgUrl: 'http://h5.gllo.com.cn/upload/head/jjl.png', // 分享图标
								desc: 'GLLO健康智能马桶', // 分享描述
								success: function() {
									console.info('分享成功！');
								},
								cancel: function() {
									console.info('取消分享！');
									// 用户取消分享后执行的回调函数
								}
							};
							// jweixin.updateTimelineShareData(options); // 分享到朋友圈
							// jweixin.updateAppMessageShareData(options); // 分享给朋友
							jweixin.onMenuShareAppMessage(options); // 分享到朋友圈
							jweixin.onMenuShareTimeline(options); // 分享给朋友
							jweixin.onMenuShareQQ(options); // 分享到朋友圈
							jweixin.onMenuShareQZone(options); // 分享给朋友
							jweixin.onMenuShareWeibo(options); // 分享到朋友圈
						});
						jweixin.error(function(res) {
							// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
							console.log(JSON.stringify(res));
						});
					} else {
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			}
		}
		
	}
</script>

<style lang="scss">
	@import '/static/font/iconfont.css';
	@import '/static/common/animate.css';	
	
	/*每个页面公共css */
	@import '/static/common/common.css';
	button {
		border: none ;
		border-radius: 50rpx;
		&:after{
			border: none
		}
	}
	
	// 活动的条目
	.cm_items {
		align-items: flex-start;
	}
	.cm_items .itemLogo {
		width: 180rpx;
		height: 180rpx;
		border-radius: 10rpx;
		margin-right: 24rpx;
		background-color: #f9f9f9;
	}
	
	.cm_items .cm_price_box {
		margin-top: 20rpx;
	}
	.cm_items .cm_des {
		margin-top: 14rpx;
	}
	.cm_items .subavatars{
		width: 50rpx;
		height: 50rpx;
		border: 2rpx solid #fff;
		border-radius: 50%;
	}
	.cm_items  .selectTags{
		padding: 0 24rpx;
		height: 38rpx;
		line-height: 38rpx;
		border-radius: 19rpx;
		background-color: #FEF2E9;
		color: #F35B28;
		font-size: 22rpx;
	}
	
	.cm_items  .cm_item_price{
		color: #DD3A30;
		font-weight: 600;
		margin-top: 24rpx;
		margin-bottom: 24rpx;
	}
	
	// 普通条目  订单部分
	.proItemsBox {
		width: 100%;
		// height: 384rpx;
		background: #fff;
		margin-bottom: 16rpx;
		padding: 24rpx 20rpx;
		.proItemTop{
			padding: 0 0 16rpx  0 ;
			margin-bottom: 16rpx;
			.shopLogo{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.status{
				color: #DD3A30;
			}
		}
 
		.picBox {
			width: 100%;
			margin-bottom: 20rpx;
			line-height: 90rpx;
			align-items: flex-start;
			.avatar {
				width: 180rpx;
				height: 180rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				overflow: hidden;
	
				img {
					width: 180rpx;
					height: 180rpx;
				}
			}
			.stags{
				font-size: 20rpx;
			}
			.name {
				font-size: 28rpx;
				max-height: 80rpx;
				line-height: 1.4;
				margin-top: 6rpx;
			}
			.special{
				margin-top: 14rpx;
				margin-bottom: 32rpx;
			}
			.jd {
				width: 152rpx;
				line-height: 58rpx;
				height: 58rpx;
				border: none;
				background: var(--cl_primary);
				color: #333;
				text-align: center;
				padding: 0;
				font-size: 26rpx;
				border-radius: 8rpx;
			}
		}
	
		.contentBox {
			justify-content: flex-end !important;
			margin-top: 20rpx;
			// padding-top: 24rpx;
			// border-top: 1rpx solid #e5e5e5;
			
			.cm_tags {
				margin-left: 16rpx;
				// font-size: 20rpx;
			}
		}
	
		.picBox:last-child {
			margin-bottom: 0;
		}
	}
// 块状条目
	.proItemsBoxBlock {
		width: calc((100vw - 56rpx) / 2);
		height: 560rpx;
		background: #fff;
		border-radius: 14rpx;
		margin-top: 16rpx;
		overflow: hidden;
	
		.picBox {
			width: 100%;
			height: 356rpx;
			position: relative;
			
			.pre {
				width: 100%;
				height: 347rpx;
				opacity: 0;
			}
			
			.timeBox {
				position: absolute;
				left: 0;
				bottom: -4rpx;
				width: 100%;
				height: 52rpx;
				line-height: 52rpx;
				background: $uni-color-error;
				color: #fff;
				text-align: center;
			}
		}
	
		.msgBox {
			padding: 16rpx;
			
			.tags {
				background: red;
				color: #fff;
				padding: 0 8rpx;
				border-radius: 4rpx;
				font-size: 20rpx;
				line-height: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
				margin-top: -8rpx;
			}
			.cm_text {
				line-height: 64rpx;
				justify-content: flex-start;
			}
	
			.has {
				margin-top: 14rpx;
				padding: 0 16rpx;
				line-height: 36rpx;
				height: 36rpx;
				border-radius: 18rpx;
				font-size: 24rpx;
				background: #f7f7f7;
			}
		}
	}
	// 灰色底 条目
	.proItemsBoxgray {
		width: 100%;
		background: #fff;
		margin-bottom: 0;
		border-bottom: 1rpx solid #eee;	
	
		.picBox {
			width: 100%;
			background: #F9F9F9;
			line-height: 90rpx;
			padding: 24rpx 20rpx;
			align-items: flex-start;
			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
				overflow: hidden;
	
				img {
					width: 150rpx;
					height: 150rpx;
				}
			}
	
			.name {
				margin-bottom: 6rpx;
				font-size: 28rpx;
				max-height: 80rpx;
				line-height: 1.2;
				margin-top: 6rpx;
			}
		}
	
		.contentBox {
			justify-content: flex-end !important;
			// margin-top: 20rpx;
			padding-top: 24rpx;
			border-top: 1rpx solid #e5e5e5;
	
			.cm_tags {
				margin-left: 16rpx;
			}
		}
	
		&:last-child {
			margin-bottom: 0;
		}
	}
</style> 
