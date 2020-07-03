<template>
	<view class="pages ">
		<!-- <view class="bg"></view> -->

		<view class=" content">
			<image src="../../static/image/yq_bg.jpg" mode="widthFix" class="bg"></image>

			<!-- <view class="headTip">邀请码</view> -->
			<view class="fxmBox">
				<image src="../../static/image/yq_tt.png" mode="widthFix" class="bg"></image>
				<view class="cm_title title">邀请码：HMJHJHH: {{ accountInfo.consumer_nick_name }}</view>
			</view>

			<view class="sqrBox">
				<tki-qrcode ref="qrcode0" cid="qrcode0" :val="share[0].url" :unit="'rpx'" :size="280" :onval="true" :loadMake="true" @result="qrRstoreUrl" />
			</view>
			<view class="bBox ">
				<button type="primary" class="btns" shape="circle" :disabled="false" :loading="loading1" @click="_save">保存二维码</button>
				<!-- <a :href="share[0].imgBase">qqq</a> -->
				<button type="primary" class="btns" shape="circle" :disabled="false" :loading="loading2" @click="_copy">复制推广链接</button>
			</view>

			<!-- 	<view v-if="QrSrcL" class="modalBox flex_y flex flex_center animated bounceInUp">
				<img  :src="QrSrcL" class="pagebanner"  alt="">
				<view class="cm_pd10 flex flex_y flex_center">				
					<view class="cm_tex_c" style="line-height: 3;color: #666;" >长按图片保存到手机，分享给小伙伴吧！</view>
					<tui-button type="primary" style="width: 80vw;margin: 0 auto;" shape="circle" :disabled="false" @tap="_cancel">确认返回</tui-button>
				</view>			
			</view> -->
			<view id="hidden" style="display: none;"></view>
		</view>
	</view>
</template>

<script>
import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue';
// import http from '@/utils/http/index.js';
import wmPoster from '@/components/wm-poster/wm-poster.vue';
// import html2canvas from 'html2canvas'
export default {
	data() {
		return {
			parentId: '',
			QrSrcL: '',
			share: [
				{
					url: '213121324',
					imgBase: ''
				},
				{
					url: '6234ddfg',
					imgBase: ''
				}
			],
			shareUrl: 'http://hp.fjhjc.net/page/index.html',

			accountInfo: '',
			loading: false,
			loading1: false,
			loading2: false
		};
	},
	computed: {
		levelAccount() {
			// console.log( this.$store.state.levelAccount)
			return this.$store.state.levelAccount;
		}
	},
	components: {
		tkiQrcode,
		wmPoster
	},
	onLoad() {},
	methods: {
		// 生成海报
		_createPoster() {
			if (this.loading) return;

			uni.showLoading({
				title: '生成中',
				mask: true
			});

			this.loading = true;
			// let that = this
			//  html2canvas(document.body).then(function(canvas) {
			// 	document.getElementById("hidden").appendChild(canvas);
			// 	var  url = canvas.toDataURL('image/jpeg', 1.0);
			// 	// console.log(url);
			// 	that.loading = false;
			// 	that.QrSrcL = url;
			// 		uni.hideLoading()
			// });
		},
		qrRstoreUrl(e) {
			this.share[0].imgBase = e;
			console.log(e);
		},
		qrRinvideUrl(e) {
			this.share[1].imgBase = e;
			console.log(e);
		},
		// 关闭
		_cancel() {
			(this.QrSrcL = ''), (this.inbanner = true);
		},
		// 保存图片
		_save() {
			let that = this;
			uni.showActionSheet({
				itemList: ['店铺二维码', '邀请二维码'],
				success: e => {
					let index = e.tapIndex;
					// // alert(that.share[index].imgBase);
					uni.saveImageToPhotosAlbum({
						filePath: that.share[index].imgBase,
						success: function() {
							// alert(that.share[index].imgBase);
							uni.showToast({
								title: '保存成功',
								icon: 'none'
							});
						},
						fail(err) {
							uni.showModal({
								title: '小贴士提醒您',
								content: '请在手机外部浏览器打开',
								cancelText: '仍要下载',
								confirmText: '我知道了',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
										that.downloadFile(that.share[index].imgBase, '二维码');
									}
								}
							});
						}
					});
				}
			});
		},
		downloadFile(content, fileName) {
			// blob对象
			let base64ToBlob = function(dataurl) {
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new File([u8arr], fileName, { type: mime });
			};
			let aLink = document.createElement('a');
			let blob = base64ToBlob(content); //new Blob([content]);
			let evt = document.createEvent('HTMLEvents');
			evt.initEvent('click', true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
			aLink.download = fileName;
			aLink.href = URL.createObjectURL(blob);
			aLink.click();
		},
		// 复制链接
		_copy() {
			let that = this;
			uni.showActionSheet({
				itemList: ['店铺链接', '邀请链接'],
				success: e => {
					let index = e.tapIndex;
					uni.setClipboardData({
						data: that.share[index].url,
						success: function() {
							console.log('success');
							uni.showModal({
								title: '复制成功',
								content: '邀请码已复制到粘贴板',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										//console.log('用户点击确定');
									} else if (res.cancel) {
										//console.log('用户点击取消');
									}
								}
							});
						}
					});
				}
			});
		},
		// 复制链接
		sharurl(k) {
			let str = this.shareUrl;

			uni.setClipboardData({
				data: str,
				success: function() {
					console.log('success');
					uni.showModal({
						title: '复制成功',
						content: '推广链接已复制到粘贴板',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								//console.log('用户点击确定');
							} else if (res.cancel) {
								//console.log('用户点击取消');
							}
						}
					});
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.pages {
	width: 100vw;
	height: 100vh;
	background: #bf7d13;
	.content {
		width: 100vw;
		height: 1198rpx;
		position: relative;
		padding-top: 440rpx;
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
			top:304rpx;
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

	.text {
		color: #fff;
		line-height: 2;
		font-size: 24rpx;
	}
	.modalBox {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		background: #fff;
		.pagebanner {
			width: 80vw;
			height: 80vh;
			border: 1rpx solid #fff;
		}
		.cm_btn {
			background: #e2bf68;
		}
	}
}
</style>
