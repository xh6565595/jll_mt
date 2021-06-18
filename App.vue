<script>
	import http from '@/utils/http/index.js';
	// const jweixin = require('jweixin-module');

	export default {
		data() {
			return {
				loadModal: true,
				updatedInfo: {},
				result: '',
				effective: '',
				formParams: {
					"openId": "",
					"vilidate": "",
					"mobile": "",
					"invitation": "", //邀请码
					"nickname": "", //微信昵称
					"headimgurl": "", //用户头像
					"share_user_id": "", //userid 分享活动
				},
				seconds: 0,
				time: null,
				iviCode: '',
				shareData: ''
			};
		},
		onLaunch: function(options) {
			// console.log('App Launch', options);
			// uni.removeStorageSync('access_token')		
			let that = this;
			uni.getSystemInfo({
				success: res => {
					// console.log('手机信息res'+res.model)
					let modelmes = res.model;
					if (modelmes.search('iPhone X') != -1) {
						that.$store.commit('setPhoneX', true);
					}
				}
			});
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							wx.showModal({
								title: '更新提示',
								content: '新版本已经准备好，是否重启应用？',
								success: function(res) {
									if (res.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
									}
								}
							})
						})
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							wx.showModal({
								title: '已经有新版本了哟~',
								content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
							})
						})
					}
				})
			} else {
				// 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
				wx.showModal({
					title: '提示',
					content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
				})
			}
			// let icode = ''
			// if(options.q){
			// 	let  url = decodeURIComponent(options.q);
			// 	icode = url.split('icode=')[1]
			// }else if(options.icode){
			// 	icode = options.icode
			// }
			// // console.log(icode);
			// this.shareData = {
			// 	proCode:options.pcode?options.pcode:'',  //商品code
			// 	userId:options.ucode?options.ucode:'' ,  //人物code
			// 	odrCode:options.ocode?options.ocode:'' ,  //人物code
			// 	iviCode:icode?icode:'',
			// }
			// // console.log(this.shareData );
			// if(that.shareData.proCode || that.shareData.userId || that.shareData.odrCode || that.shareData.iviCode){
			// 	that.$store.commit('setShare',{proCode:that.shareData.proCode,userId:that.shareData.userId,orderCode:that.shareData.odrCode,iviCode:that.shareData.iviCode})
			// }


			// const jll_opid =  uni.getStorageSync('jll_opid');  
			// if(jll_opid){
			// 	that.autoLogin(jll_opid)
			// }else{
			// 	uni.login({
			// 	  provider: 'weixin', 
			// 	  success: function (res) {
			// 		let code =  res.code;
			// 		// 获取code换opid 
			// 		that.getopId(code)	
			// 	  }
			// 	});
			// }
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		onShareAppMessage(res) {
			return {
				title: '洁利来智能马桶',
				path: `/pages/index/index`,
				imageUrl: 'http://gllo.kuxiong999.com/upload/head/jjl.png'
			};
		},
		methods: {

			// 换取opndid
			async getopId(code) {
				let that = this
				try {
					// this.$ui.showloading()
					let res = await this.$api.GetOpenId({
						wx_code: code
					}, false);
					// this.$ui.hideloading()
					// console.log(res)
					if (res.Success) {
						// oNDKY5B658gwmlw5vZnwEUOdG1io
						let opid = res.Msg;
						uni.setStorageSync('jll_opid', opid);
						that.formParams.openId = opid
						// that.$refs.userBox.showModal()
						// 自动登录一次
						that.autoLogin(opid)

					} else {
						that.$ui.hideloading()

					}
				} catch (err) {
					that.$ui.hideloading()
				}
			},
			// opid直接登录
			async autoLogin(opid) {
				let that = this;

				try {
					let res = await this.$api.WxTokenLogin({
						openId: opid
					}, false);
					// this.$ui.hideloading()
					// uni.navigateTo({
					// 	url:'/pages/login/login'
					// })	
					// 	return
					if (res.Success) {
						that.$store.commit('login');
						uni.setStorageSync('access_token', res.Data.hp)
						that.initUser()

					} else {
						this.$ui.hideloading()
						if (res.Msg && res.Msg != '用户不存在') {
							this.$ui.toast(res.Msg)
						}
						// if(that.shareData.proCode && that.shareData.userId && that.shareData.odrCode){
						// 	uni.redirectTo({
						// 		url: '/pages/main/details/details?code='+ that.shareData.proCode
						// 	});
						// }else{
						// uni.redirectTo({
						// 	url:'/pages/loding/loding'
						// })	
						// }			
					}
				} catch (err) {
					this.$ui.hideloading()
					this.$ui.toast(err)
				}
			},
			// 加载登录账户信息
			async initUser(callback) {
				let that = this;
				try {
					let res = await this.$api.getConsumer({}, false);
					if (res.Success) {
						if (res.Data) {
							that.$store.commit('setUserInfo', res.Data);
							setTimeout(() => {
								if (res.Data.consumer_type == 3) {
									// if(false){
									// 安装员
									uni.redirectTo({
										url: '/pages/main/serverCenter/serverCenter'
									});
								} else {
									//  消费者 3是安装 2推广者
									// 记录信息
									// if(that.shareData.proCode && that.shareData.userId && that.shareData.odrCode){
									// 	uni.redirectTo({
									// 		url: '/pages/main/details/details?code='+ that.shareData.proCode
									// 	});
									// }else{
									// 	// uni.redirectTo({
									// 	// 	url: '/pages/loding/loding'
									// 	// });
									// }						
								}
							}, 500)
						}
					} else {
						that.$ui.toast(res.Msg);
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			}

		}
	};
</script>

<style lang="scss">
	@import '/static/font/iconfont.css';
	@import '/static/common/animate.css';
	/*每个页面公共css */
	@import '/static/common/common.css';


	button {
		border: none;
		border-radius: 50rpx;

		&:after {
			border: none;
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

	.cm_items .subavatars {
		width: 50rpx;
		height: 50rpx;
		border: 2rpx solid #fff;
		border-radius: 50%;
	}

	.cm_items .selectTags {
		padding: 0 24rpx;
		height: 38rpx;
		line-height: 38rpx;
		border-radius: 19rpx;
		background-color: #fef2e9;
		color: #f35b28;
		font-size: 22rpx;
	}

	.cm_items .cm_item_price {
		color: #dd3a30;
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

		.proItemTop {
			padding: 0 0 16rpx 0;
			margin-bottom: 16rpx;

			.shopLogo {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.status {
				color: #dd3a30;
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

			.stags {
				font-size: 20rpx;
			}

			.name {
				font-size: 28rpx;
				max-height: 80rpx;
				line-height: 1.4;
				margin-top: 6rpx;
			}

			.special {
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
			background: #f9f9f9;
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
