<template>
	<view class="pages"  :style="{'padding-bottom':ifx?'40rpx':''}">
		<!-- <view> -->
		<!-- <tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton> -->
		<view class="addressBox flex flex_center tui-skeleton-rect">
			<image src="../../../static/image/xq_dz.png" mode="scaleToFill" style="width: 80rpx;height: 80rpx;margin-right: 24rpx;"></image>
			<view class="f1 " v-if="currentAddress" @tap="_switchAddress">
				<view class=" top cm_title">
					{{ currentAddress.detailed_address }}
				</view>
				<view class="adress cm_text cm_ellipsis tui-skeleton-fillet">{{ currentAddress.receiving_user }} {{ currentAddress.receiving_mobile }}</view>
			</view>
			<navigator url="/pages/features/newAdress/newAdress" v-else class="f1 noItems">尚未添加地址,立即添加</navigator>
			<!-- <Icon name="arrowright" :size="16"></Icon> -->
			<text class="iconfont icon-fanhui3"></text>
		</view>
		<view class="panel">
			<view class="flex flex_center itemBoxTop">
				<image :src="business.shop_logo" mode="" class="shopIcon"></image>
				<view class="cm_title f1">洁利来官方店</view>
				<!-- <Icon name="arrowright" :size="16"></Icon> -->
			</view>
			
			<view class="cm_bdb" style="padding-bottom: 40rpx;">
				<block v-for="(item, index) in currentOrder" :key="index">
					<view class="  tui-skeleton-fillet">
						<!-- <view style="padding: 20rpx;"> -->
							<view class="cm_items flex  flex_center tui-skeleton-fillet">
								<image v-if="item.project_img" :src="item.project_img" mode="aspectFill" class="itemLogo "></image>
								<view class="f1 ">
									<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{ item.project_name }}</view>
									<view class="cm_des flex flex_center" style="justify-content: flex-start;" v-if="item.project_parameter_type == 1">
										<tui-tag shape="circle" size="mini" type="gray" class="cm_t_20">{{ item.project_spec.difference }}</tui-tag>
										<view class="f1"></view>
										<view class="flex flex_center">
											<text class="iconfont icon-guanbi"></text>
											<text>{{ item.project_num }}</text>
										</view>
									</view>
									<view class=" tui-skeleton-fillet flex flex_center">
										<text class="cm_price  cm_item_price">￥{{ item.project_parameter_type == 1 ? item.project_spec.price : item.project_raise_price }}</text>
										<view class="f1"></view>
									</view>
									<!-- <view style="margin-top: 4rpx;">
										<view v-if="item.project_service1.service_code">
											<text class=" cm_t_20 selectTags">{{ item.project_service1.service_name }} ￥{{ item.project_service1.service_price }}</text>
										</view>
										<view v-if="item.project_service2.service_code">
											<text class=" cm_t_20 selectTags">{{ item.project_service2.service_name }} ￥{{ item.project_service2.service_price }}</text>
										</view>
										<view v-if="item.project_service3.service_code">
											<text class=" cm_t_20 selectTags">{{ item.project_service3.service_name }} ￥{{ item.project_service3.service_price }}</text>
										</view>
									</view> -->
								</view> 
							</view>
							<!-- <view class="cells flex flex_center">
								<view class="label cm_tex_r">运费</view>
								<view class="f1 text">{{ currentAddress?'￥'+allEms:'请先选择收货地址' }}</view>
							</view> -->
							<view class="cells flex flex_center">
								<view class="label cm_tex_r">税费({{tex}}%)</view>
								<view class="f1 text">￥{{shui}}</view>
							</view>
							<view class="cells flex flex_center" v-if="servePay">
								<view class="label cm_tex_r">特色服务</view>
								<view class="f1 text">￥{{ servePay}}</view>
							</view>
						<!-- </view> -->
					</view>
				</block>
			</view>

			<view class=" flex flex_center" style="line-height: 80rpx;height: 80rpx;">
				<view class="f1"></view>
				<view class=""><text>共1件，合计:</text></view>
				<text class="cm_price">￥{{ allAccount }}</text>
			</view>
		</view>
		<view class="footerBox" :style="{'padding-bottom':ifx?'40rpx':''}">
			<view class="footer  flex flex_center"  >
				<view class=" flex flex_center">
					<view class=""><text>合计:</text></view>
					<text class="cm_price">￥{{ allAccount }}</text>
				</view>
				<view class="f1"></view>
				<button class="submit" @tap="submit">提交订单</button>
			</view>
		</view>
		
		<!-- </view> -->
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :title="title" :content="content" :maskClosable="false" color="#333" :size="32"></tui-modal>
		<PayPanel ref="payPanel" :oderId="oderId" :amout="allAccount" @success="success" @cancel="cancel"></PayPanel>
	</view>
</template>

<script>
import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
import tuiListView from '@/components/list-view/list-view';
import tuiListCell from '@/components/list-cell/list-cell';
import PayPanel from '@/components/PayPanel/PayPanel';
import Utils from '@/utils/utils.js';
import { mapState } from 'vuex';
const global_Set_jll = uni.getStorageSync('global_Set_jll');

export default {
	data() {
		return {
			payWay: 0, //支付方式 0-账户余额 1-支付宝 2-微信 3-购物券
			skeletonShow: true,
			loading: false,
			currentAddress: '',
			// currentCode:'',
			formParams: {
				create_order_type: 0, //下单方式 0-通常下单 1-购物车下单
				cart_code: '',
				goods_code: '',
				skus_code: '',
				goods_num: 0,
				share_order_code:'',
				user_address_code: '',
				goods_service_code: []
			},
			// 支付参数
			payParams: {
				pay_type: 0, //1-支付宝 2-微信
				pay_source: 0, //0-定额充值 1-聚友手续费 2-粉丝手续费 3-VIP手续费
				order_num: '' //订单号
			},
			title: 'GLLO健康智能马桶',
			content: '',
			allEms: 0, //运费
			modal: false,
			oderId: '',
			tex:0,
			ifInActive:false
		};
	},
	onLoad(options) {
		this.formParams.create_order_type = options.type;
		this.formParams.share_order_code = options.shareOrder;
		// console.log(this.formParams)
		this.tex = global_Set_jll.taxes_ratio*100
		// if(this.shareUser){
		// 	this.formParams.share_order_code = this.shareUser
		// }
		let that = this;
		uni.$on('refresh_sureAuction', item => {
			that.currentAddress = item;
			that.calcEms();
		});
		uni.$on('refresh_addressList', item => {
			that.loadAddress();
		});
		this.loadAddress();
	},
	onShow() {},
	components: {
		tuiListView,
		tuiListCell,
		tuiSkeleton,
		PayPanel
	},
	computed: {
		...mapState(['currentOrder','shareUser','sharePro','ifx']),
		allPrize() {
			let s = 0;
			this.currentOrder.forEach(item => {
				if (item.project_parameter_type == 1) {
					s += Number(item.project_spec.price) * item.project_num;
				} else {
					s += Number(item.project_raise_price) * item.project_num;
				}
			});
			return s.toFixed(2);
		},
		allAccount() {
			let s = Number(this.allPrize) 
			return s.toFixed(2);
		},
		// 税费计算
		shui(){
			return (this.allPrize*global_Set_jll.taxes_ratio).toFixed(2)
		},
		// 所有服务费
		servePay() {
			let s = 0;
			this.currentOrder.forEach(item => {
				if (item.project_service1.service_code) {
					s += item.project_service1.service_price * item.project_num;
				}
				if (item.project_service2.service_code) {
					s += item.project_service2.service_price * item.project_num;
				}
				if (item.project_service3.service_code) {
					s += item.project_service3.service_price * item.project_num;
				}
			});
			return s;
		}
	},
	methods: {
		// 计算邮费
		async calcEms() {
			let that = this;
			try {
				let d = { pjc: [], prc: [], pjn: [] };
				this.currentOrder.forEach(item => {
					d.pjc.push(item.project_code);
					d.prc.push(item.project_spec.id);
					d.pjn.push(item.project_num);
				});
				let data = {
					goods_code: d.pjc.join(','),
					user_id: d.prc.join(','),
					goods_num: d.pjn.join(','),
					user_address_code: this.currentAddress.address_code
				};
				// debugger
				this.$ui.showloading();
				let res = await this.$api.GetEmsPrice(data);
				this.$ui.hideloading();
				// console.log(data)
				if (res.Success) {
					that.allEms = res.Data;
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		_switchWay(k) {
			this.formParams.pay_type = k;
		},
		handleClick(e) {
			let index = e.index;
			if (index === 0) {
				// this.tui.toast("你点击了取消按钮")
			} else {
				// this.tui.toast("你点击了确定按钮")
				this._sure();
			}
			this.modal = false;
		},
		//地址列表
		async loadAddress(type, callback) {
			// alert(1)
			let that = this;
			try {
				let res = await this.$api.GetAddressList({ pageIndex: 1, pageSize: 100 });
				// console.log(res)
				if (res.Success) {
					let list = res.Data.Rows;
					if (list.length > 0) {
						// 存在地址
						that.currentAddress = list[0];
						// 计算邮费
						that.calcEms();
					} else {
						that.currentAddress = '';
					}
					that.skeletonShow = false;
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
			// this.loadModal = false;
			// this.$ui.hideloading();
			if (callback) callback();
		},
		// 切换地址
		_switchAddress() {
			uni.navigateTo({
				url: '/pages/features/adress/adress?action=switch'
			});
		},
		async submit(callback) {
			if (!this.currentAddress) {
				this.$ui.toast('请选择地址');
				return;
			}

			// if(this.item.is_ems>0){
			// 	this.modal =  true
			// 	return
			// }
			this._sure();
		},
		// 确认支付
		async _sure() {
			let that = this;
			// this.$ui.toast('暂未开放');
			// this.success()
			// return;
			try {
				let d = { pjc: [], prc: [], pjn: [], cart: [] };
				this.currentOrder.forEach(item => {
					d.pjc.push(item.project_code);
					d.prc.push(item.project_spec.id);
					d.pjn.push(item.project_num);
					d.cart.push(item.cart_code);
				});
				this.formParams.goods_code = d.pjc.join(',');
				this.formParams.skus_code = d.prc.join(',');
				this.formParams.goods_num = d.pjn.join(',');
				this.formParams.user_address_code = this.currentAddress.address_code;
				if (this.formParams.create_order_type == 1) {
					this.formParams.cart_code = d.cart.join(',');
				}
				// goods_service_code
				let s = [];
				// debugger
				this.currentOrder.forEach(item => {
					let a = [];
					a.push(item.project_service1.service_code ? item.project_service1.service_code : '');
					a.push(item.project_service2.service_code ? item.project_service2.service_code : '');
					a.push(item.project_service3.service_code ? item.project_service3.service_code : '');
					s.push(a.join(','));
				});
				this.formParams.goods_service_code = s;
				// debugger	
				// return
				// this.formParams.project_code = Object.values(s).join(',');
				this.$ui.showloading('订单生成中');
				let res = await this.$api.CreateOrder(this.formParams);
				this.$ui.hideloading();
				// console.log(res);
				// debugger
				if (res.Success) {
					that.payParams.order_num = res.Data.order_code;
					// that.payParams.order_num ='H7280202001140330267942143'
					that.$ui.toast('订单创建成功');
					that.ifInActive = res.Data.is_fq==1?true:false	
					// console.log(that.ifInActive)
					setTimeout(() => {
						that._readyToPay(res.Data.order_code);
					}, 500);
				} else {
					that.$ui.toast(res.Msg);
					// 重定向到代付款
					uni.redirectTo({
						url: '/pages/features/order/orderList/orderList'
					});
				}
				// if (callback) callback();
				
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		_readyToPay(ordercode) {
			this.oderId = ordercode;
			let that = this;
			this.$refs.payPanel._show(ordercode);
			// uni.showActionSheet({
			// 	itemList: ['微信支付'],
			// 	success: function(res) {
			// 		uni.showToast({
			// 			title:'开发中'
			// 		})
			// 		// that._pay(res.tapIndex);
			// 	},
			// 	fail: function(res) {
			// 		console.log(res.errMsg);
			// 		uni.redirectTo({
			// 			url:'/pages/features/order/order?current=1'
			// 		})
			// 	}
			// });
		},
		// 支付接口
		success() {
			// alert(this.formParams)
			// console.log(this.formParams);
			// alert()
			if(this.ifInActive){
				uni.switchTab({
					url: '/pages/activity/activity'
				});
			}else{
				uni.redirectTo({
					url:'/pages/features/order/order'
				})
				// uni.redirectTo({
				// 	url: '/pages/features/order/orderDetail/orderDetail?code=' + this.oderId
				// });
			}
			
		},
		cancel() {
			uni.redirectTo({
				url: '/pages/features/order/orderDetail/orderDetail?code=' + this.oderId
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding: 20rpx;
	.addressBox {
		background: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		.top {
			height: 54rpx;
			line-height: 54rpx;
			padding-right: 20rpx;
		}
		.adress {
			margin-top: 10rpx;
			font-size: 28rpx;
		}
		.noItems {
			line-height: 100rpx;
			text-align: center;
		}
	}
	.panel{
		margin-top: 16rpx;
		border-radius: 12rpx;
		overflow: hidden;
		background: #fff;
		padding: 20rpx;
		padding-bottom: 0;
		.itemBoxTop {
			// padding: 24rpx 20rpx;
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
	
	
	.lists {
		margin-top: 16rpx;
		border-radius: 12rpx;
		overflow: hidden;
	}
	.footerBox{
		position: fixed;
		width: 100vw;
		left: 0;
		bottom: 0;
		z-index: 200;
		background: #fff;		
		.footer {
			height: 100rpx;		
			background: #fff;			
			padding: 0 30rpx;
			.submit {
				padding: 0 40rpx;
				line-height: 68rpx;
				height: 68rpx;
				border-radius: 34rpx;
				background: #da1a0f;
				color: #fff;
				margin-left: 40rpx;
			}
		}
	}
	
}
</style>
