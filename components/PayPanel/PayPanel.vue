<template>
	<view class="modal" v-if="panelshow">
		<view class="panel animated slideInUp" v-if="panelshow">
			<view class="cm_title cm_t_32">选择支付方式</view>
			<view style="margin-bottom: 60rpx;">
				<view class="cm_bdb" v-if="payList.indexOf('CCB') > -1">
					<view class="cells flex flex_center " @click="_choose(3)">
						<image src="/static/image/js.png" mode="scaleToFill" class="icons"></image>
						<view class="f1 cm_title">建设银行卡支付</view>
						<image src="/static/image/xz.png" mode="scaleToFill" class="icons" v-if="formParams.pay_type == 3"></image>
						<text class="wxz" v-else></text>
					</view>
					<view v-if="formParams.pay_type == 3" class="animated fadeIn">
						<view class="cm_title ">分期方式</view>
						<!-- <view class="slider "> -->
						<scroll-view scroll-x="true" class="slider">
							<view class="flex flex_center " style="width: 1208rpx;">
								<view class="bar  flex flex_y flex_center" @click="_way('')" :class="{ active: formParams.install_num == 0 }">
									<view>不分期</view>
									<!-- <view class="cm_des">手续费{{item.charge}}/期</view> -->
								</view>
								<block v-for="(item, index) in agrs" :key="index">
									<view class="bar  flex flex_y flex_center" @click="_way(item.num)" :class="{ active: formParams.install_num == item.num }">
										<view>￥{{ item.price }} × {{ item.num }}期</view>
										<view class="cm_des">免息</view>
									</view>
								</block>
							</view>
						</scroll-view>
						<!-- </view> -->
					</view>
				</view>
				<view class="cells flex flex_center cm_bdb" @click="_choose(4)" v-if="payList.indexOf('SYK') > -1">
					<image src="/static/image/wx.png" mode="scaleToFill" class="icons"></image>
					<view class="f1 cm_title">微信支付</view>
					<image src="/static/image/xz.png" mode="scaleToFill" class="icons" v-if="formParams.pay_type == 4"></image>
					<text class="wxz" v-else></text>
				</view>
				<view class="cells flex flex_center cm_bdb" @click="_choose(2)" v-if="payList.indexOf('wx') > -1">
					<image src="/static/image/wx.png" mode="scaleToFill" class="icons"></image>
					<view class="f1 cm_title">微信支付</view>
					<image src="/static/image/xz.png" mode="scaleToFill" class="icons" v-if="formParams.pay_type == 2"></image>
					<text class="wxz" v-else></text>
				</view>
				<view class="cells flex flex_center" @click="_choose(1)" v-if="payList.indexOf('Alipay') > -1">
					<image src="/static/image/zf.png" mode="scaleToFill" class="icons"></image>
					<view class="f1 cm_title">支付宝支付</view>
					<image src="/static/image/xz.png" mode="scaleToFill" class="icons" v-if="formParams.pay_type == 1"></image>
					<text class="wxz" v-else></text>
				</view>
			</view>
			<form  report-submit="true" @submit="_submit">
				<view class="flex flex_center">		
					<button type="primary" class="f1 sbtn cm_btn_plain" :plain="true" shape="circle" :loading="loading" @tap="_hide">取消</button>
					<button type="primary" class="f1 cm_btn sbtn" shape="circle" :loading="loading"  form-type='submit' >提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import Utils from '@/utils/utils.js';
const global_Set_jll = uni.getStorageSync('global_Set_jll');
// const jweixin = require('jweixin-module')
export default {
	data() {
		return {
			loading: false,
			agrs: [
				{
					price: 100, //每期金额
					num: 6, //期数
					charge: 2 //每期手续费
				},
				{
					price: 100, //每期金额
					num: 12, //期数
					charge: 2 //每期手续费
				},
				{
					price: 100, //每期金额
					num: 24, //期数
					charge: 2 //每期手续费
				}
			],
			formParams: {
				 "pay_type":"4",   ////1-支付宝 2-微信 3-CBB(建行支付)
				 "order_num":"",   //订单号
				 "install_num":"",  //分期数
				 "formId":''
			},
			panelshow: false,
			payList: []
		};
	},
	props: {
		amout: {
			//是否是统一规格
			Type: Number,
			default: 0
		},
		oderId: {
			//图片
			Type: String,
			default: ''
		}
	},
	created() {
		global_Set_jll.pay_route.forEach(item => {
			this.payList.push(item.Value);
		});
		// console.log(this.payList)
	},
	watch: {
		oderId(n, o) {
			if (n) {
				this.formParams.order_num = n;
				this.initPrice();
			}
		}
	},
	methods: {
		_way(k) {
			this.formParams.install_num = k;
		},
		// 初始化价格
		initPrice() {
			let n = this.amout;
			if (!n) return;
			this.agrs.forEach(item => {
				item.price = (n / item.num).toFixed(2);
			});
		},
		_show() {
			this.panelshow = true;
		},
		_hide() {
			this.panelshow = false;
			this.$emit('cancel');
			// this._href();
		},
		_choose(k) {
			this.formParams.pay_type = k;
		},
		// 提交支付
		async _submit(e) {
			// console.log(e.detail.formId);		
			let formId = e.detail.formId
			// debugger
			// console.log(formId)
			this.formParams.formId = e.detail.formId
			if (this.formParams.pay_type == 1) {
				uni.showToast('开发中');
				this._pay(1);
			} else if (this.formParams.pay_type == 2) {
				// uni.showToast('开发中')
				this._pay(2);
			} else if (this.formParams.pay_type == 3) {
				//建行支付
				this._pay(3);
			} else if (this.formParams.pay_type == 4) {
				this._pay(4);
			}
		},
		_href() {
			uni.redirectTo({
				url: '/pages/features/order/orderDetail/orderDetail?code=' + this.formParams.order_num
			});
		},
		// 支付接口
		async _pay(k, callback) {
			let that = this;
			// this.formParams.pay_type = k;
			// console.log(this.formParams)
			// return;
			try {
				that.loading1 = true;
				// console.log(this.formParams);
				let res = await this.$api.toPayment(this.formParams);
				// console.log(res);
				// let data = {
				// 	ORDERID:this.formParams.order_num,
				// 	PAYMENT:0.01,
				// 	SUCCESS:'Y',
				// 	ACCDATE:20200415
				// }
				// let res = await this.$api.mockPay(data)
				
				that.loading1 = false;
				if (res.Success) {
					let data = res.Data.js_prepay_info
					let b =  `{${data}}`;
					    b = b.replace(/'/g,'"')
					    // console.log(b)
					let config =JSON.parse(b)
					if (k == 1) {
						// 支付宝支付
						that._toAliPay(config);
					} else if (k == 2 || k == 4) {
						// 微信支付 小程序
						that._wxPay(config);
					} else if (k == 3) {
						// 建行
						window.location.href = data;
					}
					// that.$emit('success');
					// that._href()
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}

			if (callback) callback();
		},

		// 微信支付
		async _wxPay(data) {
			let that = this;
			// console.log(data)
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: data.timeStamp,
				nonceStr: data.nonceStr,
				package: data.package,
				signType: data.signType,
				paySign: data.paySign,
				success: function(res) {
					// console.log('success:' + JSON.stringify(res));
					uni.redirectTo({
						url: '/pages/success/success'
					});
					that.$emit('success');
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.modal {
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.4);
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	.panel {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		background: #fff;
		border-radius: 20rpx 20rpx 0 0;
		padding: 20rpx;
		.cells {
			min-height: 110rpx;
			.cm_title {
				padding: 0 20rpx;
			}
			.icons {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
			}
			.wxz {
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				border: 1rpx solid #f1f1f1;
			}
			&:active {
				background: #f3f3f3;
			}
		}
		.slider {
			width: 100%;
			height: 100rpx;
			// background: red;
			margin: 40rpx 0;
			overflow-x: auto;
			.bar {
				width: 282rpx;
				height: 98rpx;
				border-radius: 4rpx;
				color: #333;
				background: #f3f3f3;
				margin: 0 20rpx;
				.cm_des {
					margin-top: 10rpx;
					// color: #DD3A30;
				}
			}
			.active {
				border: 2rpx solid #dd3a30;
				color: #dd3a30;
				background: #fff5f5;
				.cm_des {
					color: #dd3a30;
				}
			}
		}
		.cm_bdb {
			position: relative;
			border-bottom: 1rpx solid #f1f1f1;
		}
	}
	.sbtn {
		// transform: scale(.8);
		display: block;
		// height: 60rpx!important;
		// line-height: 60rpx!important;
		margin: 0 20rpx;
	}
}
</style>
