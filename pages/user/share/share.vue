<template>
	<view class="pages">
		<image class="bg" :src="'../../../static/defaultshare1.jpg'" mode="widthFix"></image>
		<view class="content">
			<!-- <view class="headTip">邀请码</view> -->
			<view class="fxmBox">
				<image src="../../../static/image/yq_tt.png" mode="widthFix" class="bg"></image>
				<view class="cm_title title">邀请码：{{userInfo.invitation_code }}</view>
			</view>

			<view class="sqrBox" v-if="shareUrl">
				<tkiQrcode ref="qrcode0" cid="qrcode0" :val="shareUrl" :unit="'rpx'" :size="280" :onval="true" :loadMake="true" @result="qrRstoreUrl" />
			</view>
			<view class="bBox ">
				<button type="primary" class="btns" shape="circle" :disabled="false" :loading="loading1" @click="shareFc">保存二维码</button>
				<!-- <a :href="share[0].imgBase">qqq</a> -->
				<button type="primary" class="btns" shape="circle" :disabled="false" open-type="share" :loading="loading2">分享推广链接</button>
			</view>
			<view id="hidden" style="display: none;"></view>
		</view>
		<view class="flex_row_c_c modalView" :class="qrShow ? 'show' : ''" @tap="hideQr()">
			<view class="flex_column">
				<view class="backgroundColor-white padding1vh border_radius_10rpx"><image :src="poster.finalPath" mode="widthFix" class="posterImage"></image></view>
				<view class="flex_row marginTop2vh sharapk flex flex_center">
					<view class="flex flex_y flex_center" @tap.prevent.stop="saveImage()">
						<!-- <image src="../../../static/img/xzbc.png" style="background: #fff;"></image>
						<text style="color: #fff;">保存图片</text> -->
						<view class="cm_btn"> 保存图片</view>
					</view>
					
				</view>
			</view>
		</view>
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{ width: (poster.width * 2 || 0) + 'rpx', height: (poster.height * 2 || 0) + 'rpx' }"></canvas>
		</view>
	</view>
</template>

<script>
import http from '@/utils/http/index.js';
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
import _app from '@/utils/QS-SharePoster/app.js';
import { getSharePoster } from '@/utils/QS-SharePoster/QS-SharePoster.js';
export default {
	data() {
		return {
			providerList: [],
			sourceLink: http.mainUrl + '/register.html',
			type: 0,
			usrMsg: '',
			shareUrl: '',
			iconUrl: '../../../static/img/logo.jpg',
			ewmLocalUrl: '',
			poster: {},
			currentBg: 1,
			qrShow: false,
			showLoading: false,
			canvasId: 'default_PosterCanvasId'
		};
	},
	computed: {
		levelAccount() {
			// console.log( this.$store.state.levelAccount)
			return this.$store.state.levelAccount;
		},
		userInfo() {
			return this.$store.state.userInfo;
		}
	},
	onShareAppMessage(res){
		if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
				  title: '分享好友，马桶免费拿',
				  path: `/pages/index/index?icode=${this.userInfo.invitation_code}`,
				  imageUrl:'/static/share.jpg'		  
		    }
	},
	onLoad() {
		// this.version = plus.runtime.version;
		this.usrMsg = this.userInfo
		this.shareUrl =  `https://gllo.kuxiong999.com/gllo?icode=${this.userInfo.invitation_code}`
	},
	components: { tkiQrcode },
	methods: {
		choose(k) {
			this.currentBg = k;
		},
		async shareFc() {
			let that = this;
			try {
				uni.showLoading({});
				const d = await getSharePoster({
					_this: this, //若在组件中使用 必传
					type: 'testShareType',
					formData: {
						//访问接口获取背景图携带自定义数据
					},
					bgScale: 1,
					posterCanvasId: this.canvasId, //canvasId
					delayTimeScale: 20, //延时系数
					backgroundImage: '/static/defaultshare' + that.currentBg + '.jpg',
					drawArray: ({ bgObj, type, bgScale }) => {
						const dx = bgObj.width * 0.3;
						const fontSize = bgObj.width * 0.045;
						const lineHeight = bgObj.height * 0.04;
						//console.log(bgObj);
						//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
						return new Promise((rs, rj) => {
							rs([
								// {
								// 	type: 'custom',
								// 	setDraw(Context) {
								// 		Context.setFillStyle('#333333');
								// 		Context.setGlobalAlpha(1);
								// 		Context.fillRect((bgObj.width * 0.7) / 2 - 14, bgObj.height * 0.78 - 18, bgObj.width * 0.3 + 28, bgObj.width * 0.3 + 28);
								// 		// Context.setGlobalAlpha(1);
								// 	}
								// },
								// {
								// 	type: 'custom',
								// 	setDraw(Context) {
								// 		Context.setFillStyle('white');
								// 		Context.setGlobalAlpha(1);
								// 		Context.fillRect((bgObj.width * 0.7) / 2 - 10, bgObj.height * 0.78 - 14, bgObj.width * 0.3 + 20, bgObj.width * 0.3 + 20);
								// 		// Context.setGlobalAlpha(1);
								// 	}
								// },
								{
									type: 'qrcode',
									text: that.shareUrl,
									size: bgObj.width * 0.3,
									dx: (bgObj.width * 0.7) / 2,
									dy: bgObj.height * 0.4 - 4
								},
								// {
								// 	type: 'image',
								// 	url: that.usrMsg.head_image,
								// 	alpha: 1,
								// 	infoCallBack(imageInfo) {
								// 		// let scale = bgObj.width  / imageInfo.height;/*  */
								// 		return {
								// 			circleSet: {
								// 				// x: bgObj.width / 2-30,
								// 				// y: bgObj.height * 0.72,
								// 				r: 40
								// 			}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
								// 			dx: bgObj.width / 2 - 40,
								// 			dy: bgObj.height * 0.5 + 20,
								// 			dWidth: 80, // 因为设置了圆形图片 所以要乘以2
								// 			dHeight: 80
								// 		};
								// 	}
								// },

								{
									type: 'text',
									text: '邀请人：' + that.userInfo.invitation_code,
									size: 28,
									color: '#333',
									alpha: 1,
									textAlign: 'center',
									textBaseline: 'middle',
									infoCallBack(textLength) {
										_app.log('index页面的text的infocallback ，textlength:' + textLength);
										return {
											dx: bgObj.width / 2,
											dy: bgObj.height * 0.35
										};
									},
									serialNum: 0
								},
								// {
								// 	type: 'custom',
								// 	setDraw(Context) {
								// 		Context.setFillStyle('#ff8d00');
								// 		// Context.lineJoin = 'round';  //交点设置成圆角
								// 		// Context.lineWidth = 15;
								// 		Context.setGlobalAlpha(1);
								// 		Context.fillRect( bgObj.width *0.7 / 2-50, bgObj.height * 0.72, bgObj.width * 0.3+104, 30);
								// 		// Context.setGlobalAlpha(1);
								// 	}
								// },
								// {
								// 	type: 'image',
								// 	url: '/static/titleBg.jpg',
								// 	alpha: 1,
								// 	infoCallBack(imageInfo) {
								// 		return {
								// 			roundRectSet: {
								// 				r: 20
								// 			}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
								// 			dx: bgObj.width / 2 - 140,
								// 			dy: bgObj.height * 0.69,
								// 			dWidth: 280, // 因为设置了圆形图片 所以要乘以2
								// 			dHeight: 40
								// 		};
								// 	}
								// },
								// {
								// 	type: 'text',
								// 	// fontStyle: 'italic',
								// 	text: '邀请码：' + that.userInfo.invite_code,
								// 	size: 24,
								// 	color: '#fff',
								// 	alpha: 1,
								// 	textAlign: 'top',
								// 	textBaseline: 'middle',
								// 	infoCallBack(textLength) {
								// 		_app.log('index页面的text的infocallback ，textlength:' + textLength);
								// 		return {
								// 			dx: bgObj.width / 2,
								// 			dy: bgObj.height * 0.69 + 18
								// 		};
								// 	},
								// 	serialNum: 0
								// }
							]);
						});
					},
					setCanvasWH: ({ bgObj, type, bgScale }) => {
						// 为动态设置画布宽高的方法，
						console.log(bgObj);
						this.poster = bgObj;
					}
				});
				//console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath);
				this.poster.finalPath = d.poster.tempFilePath;
				this.qrShow = true;
				uni.hideLoading();
			} catch (e) {
				_app.hideLoading();
				_app.showToast(JSON.stringify(e));
				uni.hideLoading();
			}
		},
		qrRstoreUrl(e) {
			// this.share[0].imgBase = e;
			// console.log(e);
		},
		saveImage() {
			// #ifndef H5
			uni.saveImageToPhotosAlbum({
				filePath: this.poster.finalPath,
				success(res) {
					_app.showToast('保存成功');
				}
			});
			// #endif
			// #ifdef H5
			_app.showToast('保存了');
			// #endif
		},
		share() {
			// #ifdef APP-PLUS
			_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
			// #endif
			// #ifndef APP-PLUS
			_app.showToast('分享了');
			// #endif
		},
		hideQr() {
			this.qrShow = false;
		},
		qrR(e) {
			// //console.log(e);
			this.ewmLocalUrl = e;
		},
		copy() {
			let that = this;
			uni.setClipboardData({
				data: this.usrMsg.invite_code,
				success: function() {
					// //console.log('success');
					uni.showModal({
						title: '复制邀请码成功',
						content: that.usrMsg.invite_code,
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								////console.log('用户点击确定');
							} else if (res.cancel) {
								////console.log('用户点击取消');
							}
						}
					});
				}
			});
		},
		//复制分享链接
		sharurl() {
			let that = this;
			uni.setClipboardData({
				data: that.shareUrl,
				success: function() {
					// //console.log('success');
					uni.showModal({
						title: '复制成功',
						// content: '内容已复制到粘贴板，可前往其他应用粘贴查看。',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								////console.log('用户点击确定');
							} else if (res.cancel) {
								////console.log('用户点击取消');
							}
						}
					});
				}
			});
		},
		//保存图片到相册
		save() {
			uni.showActionSheet({
				itemList: ['保存图片到相册'],
				success: () => {
					uni.saveImageToPhotosAlbum({
						filePath: this.ewmLocalUrl,
						success: function() {
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							});
						}
					});
				}
			});
		},
		_share(tapIndex) {
			// let ifAgent = this.usrMsg.user_type==1?true:false   //是否是代理
			// let ifAuth = this.usrMsg.agent_status==1?true:false //当前状态允许代理  agent_status 0是未通过 1是正常
			// if(ifAgent&&!ifAuth){
			// 	uni.showModal({
			// 		title:'酷熊提醒你',
			// 		content:'当前的代理身份还未经过审核，通过分享链接注册的新用户将不会成为你的推广消费者'
			// 	})
			// 	return
			// }

			// if (this.providerList.length == 0) {
			// 	uni.showModal({
			// 		title: '当前环境无分享渠道!',
			// 		showCancel: false
			// 	});
			// 	return;
			// }
			// let itemList = this.providerList.map(function(value) {
			// 	return value.name;
			// });

			// //console.log(itemList)

			// uni.showActionSheet({
			// 	itemList: itemList,
			// 	success: res => {
			// 		//console.log(res.tapIndex)
			// 		if (this.providerList[res.tapIndex].id == 'qq') {
			// 			this.type = 1;
			// 		} else {
			// 			this.type = 0;
			// 		}
			// let that = this;
			// uni.share({
			// 	provider: this.providerList[tapIndex].id,
			// 	scene: this.providerList[tapIndex].type && this.providerList[tapIndex].type == 'WXSenceTimeline' ? 'WXSenceTimeline' : 'WXSceneSession',
			// 	type: 2,
			// 	title: '酷熊优购',
			// 	summary: '邀您下载酷熊APP，让您淘宝天猫购物省钱',
			// 	imageUrl: that.poster.finalPath,
			// 	href: this.shareUrl,
			// 	success: res => {
			// 		//console.log('success:' + JSON.stringify(res));
			// 	},
			// 	fail: e => {
			// 		uni.showModal({
			// 			content: e.errMsg,
			// 			showCancel: false
			// 		});
			// 	}
			// });
			// 	}
			// });
		},
		openLink() {
			// plus.runtime.openWeb(this.sourceLink);
		}
	}
};
</script>

<style scoped lang="scss">
.pages {
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background: #bf7d13;
	.bg {
		width: 100vw;
		height: 100vh;
		position: absolute;
		left: 0;
		top: 0;
		transition: all 0.5s ease;
	}
	.hover {
		width: 100vw;
		// height: 100vh;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
	}
	.content {
		width: 100vw;
		height: 1198rpx;
		position: relative;
		padding-top: 60vw;
		position: relative;
		.bg {
			width: 100vw;
			height: auto;
			position: absolute;
			z-index: 0;
			left: 0;
			top: 0;
		}
		.fxmBox{
			width: 414rpx;
			height: 88rpx;
			position: absolute;
			left: 50%;
			margin-left: -207rpx;
			top:40.5vw;
			.bg{
				position: static;
				width: 100%;
				height: 100%;
			}
			.title{
				color: #fff;
				text-align: center;
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				line-height: 70rpx;
			}
		}
		.headTip {
			width: 300rpx;
			height: 62rpx;
			line-height: 62rpx;
			border-radius: 0 0 20rpx 20rpx;
			background: linear-gradient(0deg, #ffc72c, #ff7809);
			position: absolute;
			left: 50%;
			margin-left: -150rpx;
			top: 0;
			text-align: center;
			color: #fff;
		}
	
		.sqrBox {
			width: 280rpx;
			height: 280rpx;
			margin:0 auto ;
			margin-bottom: 155rpx;
			// background: red;
			position: relative;
			box-sizing: 10;
		}
		.bBox {
			width: 100%;
			padding: 0 60rpx;
			margin-top: 40rpx;
			.btns{
				width: 530rpx;
				height: 88rpx;
				line-height: 88rpx;
				border-radius: 44rpx;
				background: linear-gradient(180deg, #FFF0C8, #F8960B);
				text-align: center;
				color: #C91512;
				margin-bottom: 32rpx;
			}
		}
		.tBox {
			margin-top: 56rpx;
			.blanks {
				width: 108rpx;
				height: 4rpx;
				background: #333;
				margin: 0 20rpx;
			}
		}
		.sBox {
			margin-top: 32rpx;
		}
	}
	.hideCanvasView {
		position: relative;
	}
	.hideCanvas {
		position: fixed;
		top: -99999rpx;
		left: -99999rpx;
		z-index: -99999;
	}
	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500rpx;
		background: rgba(0, 0, 0, 0.6);
		transition: all 0.3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}
	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}
	.flex_column {
		display: flex;
		flex-direction: column;
	}
	.backgroundColor-white {
		background-color: white;
	}
	.border_radius_10rpx {
		border-radius: 10rpx;
	}
	.padding1vh {
		padding: 1vh;
	}
	.posterImage {
		width: 60vw;
	}
	.flex_row {
		display: flex;
		flex-direction: row;
	}
	.marginTop2vh {
		margin-top: 2vh;
	}
	.sharapk {
		display: flex;
		justify-content: center;
		margin: 20rpx auto;
		width: 100%;
	}
	.sharapk view {
		margin: 20rpx;
		font-size: 28rpx;
	}
	.sharapk view image {
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
	}
}
</style>
