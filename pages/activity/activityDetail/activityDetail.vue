<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<!-- <view class="proItemsBox addressBox ">
			<view class="flex flex_center address tui-skeleton-fillet">
				<image src="/static/image/logo.png" mode="scaleToFill" class="icon"></image>
				<view class="f1  tui-skeleton-rect">
					<view style="margin-bottom: 20rpx;">{{ item.buy_address }}</view>
					<view class="flex flex_center">
						<text class="cm_text ">{{ item.buy_name }}</text>
						<text class="cm_text ">{{ item.buy_phone }}</text>
						<view class="f1"></view>
					</view>
				</view>
			</view>
		</view> -->

			<view class="panel">
				<view class="cm_bdb" style="padding-bottom: 40rpx;">
					<block v-for="(it, index) in item.project_list" :key="index">
						<view class="  tui-skeleton-fillet">
							<!-- <view style="padding: 20rpx;"> -->
							<view class="cm_items flex  flex_center tui-skeleton-fillet">
								<image v-if="it.skus_img" :src="it.skus_img" mode="aspectFill" class="itemLogo "></image>
								<view class="f1 ">
									<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{ it.order_name }}</view>
									<view class="cm_des flex flex_center" style="justify-content: flex-start;" v-if="it.project_parameter_type == 1">
										<tui-tag shape="circle" size="mini" type="gray" class="cm_t_20">{{ it.skus_name }}</tui-tag>
										<view class="f1"></view>
										<view class="flex flex_center">
											<text class="iconfont icon-guanbi"></text>
											<text>{{ it.project_num }}</text>
										</view>
									</view>
									<view class=" tui-skeleton-fillet flex flex_center">
										<text class="cm_price  cm_item_price">￥{{ it.price }}</text>
										<view class="f1"></view>
									</view>
									<view style="margin-top: 4rpx;">
										<view v-if="it.project_service1">
											<text class=" cm_t_20 selectTags">{{ it.project_service1.service_name }} ￥{{ it.project_service1.service_price }}</text>
											<!-- <view class="">￥{{item.project_service1.service_price}}</view> -->
										</view>
										<view v-if="it.project_service2">
											<text class=" cm_t_20 selectTags">{{ it.project_service2.service_name }} ￥{{ it.project_service2.service_price }}</text>
											<!-- <view class="">￥{{item.project_service2.service_price}}</view> -->
										</view>
										<view v-if="it.project_service3">
											<text class=" cm_t_20 selectTags">{{ it.project_service3.service_name }} ￥{{ it.project_service3.service_price }}</text>
											<!-- <view class="">￥{{item.project_service3.service_price}}</view> -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
					<view class="cells flex flex_center cm_bdb" style="padding-bottom: 20rpx;">
						<view class=" ">免单成功</view>
						<view class="f1 text cm_tex_r">{{ item.event_time }}</view>
					</view>
					<view class="flex flex_center flex_between" style="margin-top: 40rpx;padding: 0 50rpx;">
						<view class="submenber">
							<image
								:src="eventInfo[0].consumer_head ? eventInfo[0].consumer_head : '/static/image/hd_yq.png'"
								mode="aspectFill"
								class="avatar"
							></image>
						</view>
						<view class="submenber">
							<image
								:src="eventInfo[1].consumer_head ? eventInfo[1].consumer_head : '/static/image/hd_yq.png'"
								mode="aspectFill"
								class="avatar"
							></image>
						</view>
						<view class="submenber">
							<image
								:src="eventInfo[2].consumer_head ? eventInfo[2].consumer_head : '/static/image/hd_yq.png'"
								mode="aspectFill"
								class="avatar"
							></image>
						</view>
					</view>
				</view>
				<!-- <view class=" flex flex_center" style="line-height: 80rpx;height: 80rpx;">
					<view class="f1"></view>
					<view class=""><text>共1件，合计:</text></view>
					<text class="cm_price">￥{{ item.pay_price }}</text>
				</view> -->
			</view>
			<view class="proItemsBox  flex flex_center">
				<text class="cm_title ">购买时间</text>
				<view class="f1"></view>
				<text class="gray">{{ item.pay_date }}</text>
			</view>
			<view class="proItemsBox  " style="padding: 0">
				<view class="cm_title t tui-skeleton-fillet flex flex_center">
					<text>返还详情</text>
					<text class="f1"></text>
				</view>
				<view class="  tui-skeleton-fillet">
					<tui-list-cell :hover="false">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">支付金额</view>
							<view class="tui-input f1 cm_tex_l">￥{{ item.pay_price }}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-if="is_inster">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">安装费用</view>
							<view class="tui-input f1 cm_tex_l">￥{{ item.project_list[0].service_total_price }}</view>
							<text style="color:#DD3A30">不可退</text>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">税费({{tex}}%)</view>
							<view class="tui-input f1 cm_tex_l">￥{{ item.taxes_price }}</view>		
							<text style="color:#DD3A30" v-if="is_taxes">不可退</text>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">退还金额</view>
							<view class="tui-input f1 cm_tex_l">￥{{ item.return_price }}</view>
						</view>
					</tui-list-cell>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
import tuiListView from '@/components/list-view/list-view';
import tuiListCell from '@/components/list-cell/list-cell';
import Utils from '@/utils/utils.js';
const global_Set_jll = uni.getStorageSync('global_Set_jll');
export default {
	data() {
		return {
			item: '',
			loading1: false,
			loading2: false,
			formParams: {
				order_code: '',
				ems_code: ''
			},
			oderId: '',
			// 支付参数
			payParams: {
				pay_type: 0, //1-支付宝 2-微信
				pay_source: 0, //0-定额充值 1-聚友手续费 2-粉丝手续费 3-VIP手续费
				order_num: '' //订单号
			},
			skeletonShow: true,
			showPickerStatus: false,
			// 延迟时间
			date: '',
			eventInfo:'',
			is_taxes:0,
			is_inster:0,
			tex:0
		};
	},
	onLoad(options) {
		this.formParams.order_code = options.code;
		this.payParams.order_num = options.code;
		
		this.is_taxes = global_Set_jll.is_taxes
		this.is_inster = global_Set_jll.is_inster
		this.tex = global_Set_jll.taxes_ratio*100
		let that = this;
		uni.$on('refresh_orderDetail', () => {
			that.loadData();
		});
	},
	onShow() {
		this.loadData();
	},
	computed: {
		statusText() {
			let t = '';
			switch (parseInt(this.item.order_status)) {
				case 0:
					t = '请你尽快完成订单付款';
					break;
				case 1:
					t = '卖家将在48小时内发货';
					break;
				case 2:
					t = '商品已经在运送途中,请保持手机畅通';
					break;
				case 3:
					t = '您已确认签收货物';
					break;
				case 4:
					t = '等待商家退款';
					break;
				case 5:
					t = '交易已成功';
					break;
				default:
					t = '交易已关闭';
					break;
			}
			return t;
		},
		startDate() {
			console.log(this.getDate('start'));
			return this.getDate('start');
		},
		endDate() {
			console.log(this.getDate('end'));
			return this.getDate('end');
		}
	},
	components: {
		tuiListCell,
		tuiSkeleton,
		tuiListView
	},
	methods: {
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year;
				// if(this.item.delay_ems_time){
				// 	return this.item.delay_ems_time
				// }else{
				// 	year = year
				// }
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;

			return `${year}-${month}-${day}`;
		},
		bindDateChange(e) {
			let that = this;
			let d = e.detail.value;
			uni.showModal({
				title: 'GLLO健康智能马桶提醒您',
				content: '你将延迟该订单的发货时间',
				success(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						that._beLast(d);
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 延迟发货
		async _beLast(d) {
			let that = this;
			try {
				// this.$ui.showloading();
				let data = {
					order_code: this.formParams.order_code,
					delay_ems_time: d
				};
				let res = await this.$api.Delayed(data, false);
				// this.$ui.hideloading();
				if (res.Success) {
					that.$ui.toast('延迟发货成功');
					setTimeout(() => {
						that.loadData();
					}, 1000);
				} else {
					that.$ui.toast(res.Msg);
				}
				if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		// 发起退款
		async sure(code) {
			let that = this;
			try {
				// this.$ui.showloading();
				let data = {
					order_code: code
				};
				let res = await this.$api.Receiving(data, false);
				// this.$ui.hideloading();
				if (res.Success) {
					that.$ui.toast('收货成功');
					setTimeout(() => {
						that.loadData();
					}, 1000);
				} else {
					that.$ui.toast(res.Msg);
				}
				if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		async prompt(code) {
			let that = this;
			try {
				let data = {
					order_code: code
				};
				this.$ui.showloading();
				let res = await this.$api.Prompt(data);
				this.$ui.hideloading();
				if (res.Success) {
					that.$ui.toast('提醒发货成功');
					that.refresh();
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		// 查看物流
		scan(code) {
			uni.navigateTo({
				url: '/pages/features/ems/ems?orderCode=' + code
			});
		},
		_call() {
			uni.makePhoneCall({
				phoneNumber: this.item.seller_phone //仅为示例
			});
		},
		_copy(str) {
			// alert(str)
			uni.setClipboardData({
				data: str,
				success: function() {
					// console.log('success');
					// uni.showToast( '复制成功')
					this.$ui.toast('复制成功');
				}
			});
			// let content = str; // 复制内容，必须字符串，数字需要转换为字符串
			// const result = h5Copy(content);
			// if (result === false) {
			// 	uni.showToast({
			// 		title: '不支持'
			// 	});
			// } else {
			// 	uni.showToast({
			// 		title: '复制成功',
			// 		icon: 'none'
			// 	});
			// }
		},
		_refundDetail(item) {
			uni.navigateTo({
				url: '/pages/features/refundDetail/refundDetail?code=' + item.refund_code
			});
		},
		_hrefStore(code) {
			uni.switchTab({
				url: '/pages/main/main'
			});
		},
		_hrefPro(code) {
			uni.navigateTo({
				url: '/pages/main/details/details?code=' + code
			});
		},
		// 发起退款
		_refund(item) {
			// this.$emit('refund',item)
			// alert(this.item.order_status)
			this.$store.commit('currenPro', item);
			if (this.item.order_status == 0) {
				return;
			}
			if (this.item.order_status == 1) {
				// 还未发货
				uni.navigateTo({
					url: '/pages/features/refundApply/refundApply?type=0'
				});
			} else {
				uni.navigateTo({
					url: '/pages/features/refundAction/refundAction'
				});
			}
		},
		imageLoad(index) {
			this.$set(this.item, 'load', true);
		},
		loadError(index) {
			// console.log('图片未找到');
			this.item.project_img = '/static/img/noPic.jpg';
		},
		async loadData(callback) {
			let that = this;
			try {
				// this.$ui.showloading();
				let data = {
					order_code: this.formParams.order_code,
					share_user_id: ''
				};
				let res = await this.$api.GetShareOrderInfo(data, false);
				// this.$ui.hideloading();

				// console.log(res)
				if (res.Success) {
					if (res.Data) {
						that.item = res.Data;
						that.formParams.ems_code = res.Data.ems_code;
						that.oderId = res.Data.order_code;
						that.eventInfo = res.Data.user_list.list;
					}
					that.skeletonShow = false;
				} else {
					that.$ui.toast(res.Msg);
				}
				if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		_readyToPay() {
			let that = this;
			this.$refs.payPanel._show();
		},

		// 取消订单
		async cancelOrder() {
			let that = this;
			try {
				that.$ui.showloading();
				let res = await this.$api.CancelOrder({ order_code: that.payParams.order_num });
				that.$ui.hideloading();
				if (res.Success) {
					that.$ui.toast('取消成功');
					setTimeout(() => {
						uni.$emit('refresh_order');
						uni.navigateBack({});
					}, 500);
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		// 支付接口
		success() {
			// alert('支付接口')
			this.loadData();
		},
		cancel() {
			// uni.redirectTo({
			// 	url: '/pages/features/order/orderDetail/orderDetail?code=' + this.payParams.order_num
			// });
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding: 20rpx;
	position: relative;
	.submenber {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
		overflow: hidden;
		.avatar {
			width: 100%;
			height: 100%;
			background-color: #f2f2f2;
		}
	}
	.bgbox {
		font-size: 40rpx;
		text-align: left;
		// padding: 40rpx 0;
		background: var(--cl_theme);
		color: #fff;
		font-weight: 600;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
		width: 100%;
		height: 260rpx;
		padding: 20rpx 40rpx;
		padding-bottom: 100rpx;
		.yanchi {
			height: 58rpx;
			line-height: 56rpx;
			border-radius: 29rpx;
			border: 1rpx solid #fff;
			text-align: center;
			color: #fff;
			background-color: transparent;
		}
		&.text-red {
			color: red;
		}
	}
	.proItemsBox {
		border-radius: 12rpx;
		overflow: hidden;
		position: relative;
		z-index: 10;
		.numsBox {
			height: 140rpx;
			line-height: 140rpx;
			.nums {
				width: 100rpx;
				height: 100rpx;
				line-height: 100rpx;
				// background: red;
				font-size: 48rpx;
				font-weight: 600;
				text-align: center;
			}
		}
		.call {
			width: 50rpx;
			height: 50rpx;
			margin-right: 20rpx;
		}
		.fwTip {
			height: 62rpx;
			line-height: 62rpx;
			background-color: #ffe2e2;
			color: #e53131;
			border-radius: 8rpx;
			padding: 0 20rpx;
		}
		.smallBtn {
			height: 50rpx;
			line-height: 50rpx;
			border-radius: 25rpx;
			padding: 0 10rpx;
			font-size: 24rpx;
			margin-left: 10rpx;
		}
	}
	.addressBox {
		// margin-top: 160rpx;
		z-index: 1;
		position: relative;
		text-align: left;
		padding: 0 20rpx;
		.address {
			height: 140rpx;
			line-height: 140rpx;
		}
		.icon {
			width: 80rpx;
			height: 80rpx;
			margin-right: 26rpx;
		}
		.cm_title {
			margin-bottom: 10rpx;
		}
		.cm_text {
			text-align: left;
			color: #999;
			margin-right: 20rpx;
		}
	}
	.panel {
		margin-bottom: 16rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background: #fff;
		padding: 20rpx;
		padding-bottom: 0;
		.itemBoxTop {
			padding-bottom: 20rpx;

			background: #fff;
			.shopIcon {
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
				margin-right: 14rpx;
			}
		}
		.cells {
			margin-top: 40rpx;
			.label {
				width: 180rpx;
				margin-right: 20rpx;
			}
			.text {
				color: #999;
			}
		}
	}
	.shopIcon {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		margin-right: 8rpx;
	}
	.contentBox {
		padding: 10rpx 0;
		margin-top: 20rpx;
	}
	.buyer {
		padding: 10rpx 0;
	}
	.t {
		padding: 20rpx 32rpx;
	}

	.tui-line-cell {
		width: 100%;
	}

	.tui-title {
		width: 110rpx;
		margin-right: 20rpx;
		text-align: left;
	}
	.footerMark {
		position: fixed;
		left: 0;
		bottom: 100rpx;
		height: 50rpx;
		line-height: 50rpx;
		width: 100%;
		padding: 0 20rpx;
		z-index: 100;
		background-color: #fffdef;
		color: #fc872d;
		text-align: center;
	}
	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100rpx;
		background: #fff;
		border-top: 1rpx solid #f2f2f2;
		width: 100%;
		padding: 0 20rpx;
		z-index: 100;
		.btns {
			margin-left: 20rpx;
		}
	}
	.tui-mask-screen {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 99996;
		transition: all 0.3s ease-in-out;
		opacity: 0;
		visibility: hidden;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}

	.tui-picker-box {
		width: 100%;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 99999;
		visibility: hidden;
		transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.3s ease-in-out;
		min-height: 20rpx;
		background: #fff;
	}

	.tui-pickerbox-show {
		transform: translate3d(0, 0, 0);
		visibility: visible;
	}

	.picker-header {
		width: 100%;
		height: 90rpx;
		padding: 0 46rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		font-size: 32rpx;
		background: #fff;
	}

	.list-item::after {
		left: 0;
	}

	.btn-cancle {
		padding: 20rpx;
		color: #888;
	}

	.btn-sure {
		padding: 20rpx;
		color: #5677fc;
	}

	.picker-view {
		width: 100%;
		height: 260px;
	}

	.item {
		line-height: 50px;
		text-align: center;
	}
}
</style>
