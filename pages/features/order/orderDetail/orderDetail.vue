<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton" :style="{'padding-bottom':ifx?'200rpx':'150rpx'}">
			
			<view class="bgbox flex flex_center ">
				<view class="f1">
					<view style="font-size: 36rpx;font-weight: 600;line-height: 2;">{{ item.order_status | orderStatusFilter }}</view>
					<text style="font-size: 24rpx;font-weight: 400;">{{ statusText }}</text>
				</view>
				<!-- <button class="yanchi" @tap="yanchi" v-if="item.order_status == 1">延迟发货</button> -->
				<view class="flex flex_y" style="align-items: flex-end" v-if="item.order_status == 1">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<button class="yanchi" >我要延迟发货</button>
					</picker>				
				</view>			
			</view>

			<view class="proItemsBox  " v-if="item.order_status == 5">
				<view class="cm_title">服务码</view>
				<view class="flex flex_center  tui-skeleton-fillet numsBox">
					<view class="  tui-skeleton-rect nums">{{ item.service_code[0] }}</view>
					<view class="  tui-skeleton-rect nums">{{ item.service_code[1] }}</view>
					<view class="  tui-skeleton-rect nums">{{ item.service_code[2] }}</view>
					<view class="  tui-skeleton-rect nums">{{ item.service_code[3] }}</view>
				</view>
				<view class="fwTip">等待马桶安装完后，请出示服务码给安装师傅</view>
			</view>

			<view class="proItemsBox  " style="padding: 0" v-if="item.order_status == 5&&item.service_info.consumer_code!=null">
				<view class="cm_title t tui-skeleton-fillet flex flex_center">
					<text>安装人员信息</text>
					<text class="f1"></text>
					<button class=" " size="mini" @tap="_call(item.service_info.consumer_mobile)">拨打电话</button>
				</view>
				<view class="flex  flex_center" style="padding: 0 30rpx;">
					<image :src="item.service_info.consumer_head" mode="" style="width: 80rpx;height: 80rpx;border-radius: 50%;margin-right: 20rpx;"></image>
					<view class="f1">
						<view class="  cm_title">{{ item.service_info.consumer_nick_name }}</view>
						<view class="  cm_des">{{ item.service_info.consumer_mobile }}</view>
					</view>
				</view>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell flex flex_center tui-cell-last">
						<view class="tui-title cm_text">服务商:</view>
						<view class="tui-input f1 cm_tex_r">{{ item.service_info.service_name }}</view>
					</view>
				</tui-list-cell>				
			</view>
			<view class="proItemsBox flex flex_center" v-else-if="item.order_status == 5">
				<text>我已收货</text>
				<view class="f1"></view>
				<view class=""  @tap="_kefuMenu">联系客服</view>
			</view>
			<view class="proItemsBox addressBox ">

				<view class="flex flex_center address tui-skeleton-fillet" >
					<image src="/static/image/xq_dz.png" mode="scaleToFill" class="icon"></image>
					<view class="f1  tui-skeleton-rect">
						<view style="margin-bottom: 20rpx;">{{ item.buy_address }}</view>
						<view class="flex flex_center">
							<text class="cm_text ">{{ item.buy_name }}</text>
							<text class="cm_text ">{{ item.buy_phone }}</text>
							<view class="f1"></view>
						</view>
					</view>
				</view>
			</view>

			<view class="panel">
				<view class="flex flex_center itemBoxTop">
					<image src="/static/image/logo.png" mode="" class="shopIcon"></image>
					<view class="cm_title f1">洁利来官方店</view>
					<!-- <Icon name="arrowright" :size="16"></Icon> -->
				</view>

				<view class="cm_bdb" style="padding-bottom: 40rpx;">
					<block v-for="(it, index) in item.project_list" :key="index">
						<view class="  tui-skeleton-fillet">
							<!-- <view style="padding: 20rpx;"> -->
							<view class="cm_items flex  flex_center tui-skeleton-fillet" @tap="_hrefPro(it.project_code)">
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
							<view class="cells flex flex_center" >
								<view class="label cm_tex_r">运费</view>
								<view class="f1 text">{{ item.is_ems?'￥'+item.is_ems:'包邮' }}</view>
							</view>
							<view class="cells flex flex_center">
								<view class="label cm_tex_r">税费({{tex}}%)</view>
								<view class="f1 text">￥{{ item.taxes_price }}</view>
							</view>
							<view class="cells flex flex_center" v-if="is_inster">
								<view class="label cm_tex_r" >安装费用</view>
								<view class="f1 text">￥{{ item.service_total_price }}</view>
							</view>
							<!-- </view> -->
						</view>
					</block>
				</view>
				<view class=" flex flex_center" style="line-height: 80rpx;height: 80rpx;">
					<view class="f1"></view>
					<view class=""><text>共1件，合计:</text></view>
					<text class="cm_price">￥{{ item.pay_price }}</text>
				</view>
			</view>
			<view class="proItemsBox  " @click="_call">
				<view class="flex flex_center">
					<image src="../../../../static/img/phone.png" mode="widthFix" class="call"></image>
					<text>联系卖家</text>
				</view>
			</view>

			<view class="proItemsBox  " style="padding: 0">
				<view class="cm_title t tui-skeleton-fillet flex flex_center">
					<text>订单详情</text>
					<text class="f1"></text>
					
				</view>
				<view class="  tui-skeleton-fillet">
					<tui-list-cell :hover="false">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">订单号</view>
							<view class="tui-input f1 cm_tex_r">{{ item.order_code }}</view>
							<button class="cm_tags smallBtn" size="mini" @tap="_copy(item.order_code)">复制</button>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-if="item.order_status == 0 ">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">创建时间</view>
							<view class="tui-input f1 cm_tex_r">{{item.create_time}}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-else-if="item.order_status == 5">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">完成时间</view>
							<view class="tui-input f1 cm_tex_r">{{item.finish_date }}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-else-if="item.order_status == 2">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">发货时间</view>
							<view class="tui-input f1 cm_tex_r">{{item.dispatch_date }}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-else>
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">支付时间</view>
							<view class="tui-input f1 cm_tex_r">{{item.pay_date }} </view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-if="item.order_status != 0">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">支付方式</view>
							<view class="tui-input f1 cm_tex_r">{{ item.pay_type | payTypeFilter }}</view>
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" :last="true" v-if="item.ems_code">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">快递单号</view>
							<view class="tui-input f1 cm_tex_r">{{ item.ems_code }}</view>
						</view>
					</tui-list-cell>
				</view>
			</view>
			<view class="proItemsBox  " style="padding: 0" v-if="ifInvoice ">
				<view class="cm_title t tui-skeleton-fillet flex flex_center">
					<text>发票信息</text>
					<text class="f1"></text>
				</view>
				<view class="  tui-skeleton-fillet">			
					<tui-list-cell :hover="false" >
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">个人/公司</view>
							<view class="tui-input f1 cm_tex_r">{{ invoiceMsg.invoice_title }}</view>
						
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-if="invoiceMsg.apply_type==0">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">税号</view>
							<view class="tui-input f1 cm_tex_r">{{ invoiceMsg.invoice_number }}</view>					
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false"  v-if="invoiceMsg.invoice_type==0">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">邮寄地址</view>
							<view class="tui-input f1 cm_tex_r">{{ invoiceMsg.detailed_address }}</view>
						
						</view>
					</tui-list-cell>
					<tui-list-cell :hover="false" v-if="invoiceMsg.invoice_type==1">
						<view class="tui-line-cell flex flex_center tui-cell-last">
							<view class="tui-title cm_text">电子邮箱</view>
							<view class="tui-input f1 cm_tex_r">{{ invoiceMsg.mail }}</view>					
						</view>
					</tui-list-cell>
				</view>
			</view>
			
			<view class="footerBox" :style="{'padding-bottom':ifx?'40rpx':''}">
				<view class="footerMark" v-if="item.order_status == 1 && item.delay_ems_time">发货时间：{{ item.delay_ems_time }}</view>
				<view class="footer flex flex_center" v-if="item.order_status != 5" >
					<view class="f1"></view>
					<tui-button type="primary" class="btns" size="small" shape="circle" @tap="_invoice" v-if="item.order_status!= 0 && !ifInvoice ">开具发票</tui-button>
					<tui-button type="primary" class="btns" size="small" shape="circle" @tap="_readyToPay" v-if="item.order_status == 0">立即付款</tui-button>
					<tui-button type="primary" class="btns" size="small" plain shape="circle" @tap="cancelOrder" v-if="item.order_status == 0">删除订单</tui-button>
					<tui-button type="primary" class="btns" size="small" shape="circle" v-if="item.order_status == 1" @tap="prompt(item.order_code)">提醒发货</tui-button>
					<tui-button type="primary" class="btns" size="small" shape="circle" v-if="item.order_status == 2" @tap="sure(item.order_code)">确认收货</tui-button>
					<tui-button type="primary" class="btns" size="small" shape="circle" plain v-if="item.order_status == 2" @tap="scan(item.order_code)">查看物流</tui-button>
				</view>			
			</view>		
		</view>
		<PayPanel ref="payPanel" :oderId="oderId" :amout="item.pay_price" @success="success" @cancel="cancel"></PayPanel>
		<accredit ref="kf" :autoClose="true">
			<view slot='content' class="fkContent">
				<image src="/static/image/kfbg.jpg" mode="widthFix" class="bg" ></image>
				<view style="padding: 50rpx;">
					<view class="gray" style="line-height: 2;">我们将会全心全意为您提供满意周到的咨询服</view>
					<button type="text" class="cm_btn" hover-class="cm_hover_m" open-type="contact">和他聊聊</button>
					<button type="text" class="cm_btn_plain" hover-class="cm_hover_m" @tap="_kefu">拨打客服热线</button>
				</view>
				<image src="/static/image/close.png" mode="widthFix" class="closeBtn" ></image>
			</view>
		</accredit>
	</view>
</template>

<script>
import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
import tuiListView from '@/components/list-view/list-view';
import tuiListCell from '@/components/list-cell/list-cell';
import Utils from '@/utils/utils.js';
import PayPanel from '@/components/PayPanel/PayPanel';
import { mapState } from 'vuex';
// import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js';
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
			is_inster:0,
			// 延迟时间
			date: '',
			tex:0,
			ifInvoice:false,
			invoiceMsg:''  //开票信息
		};
	},
	onLoad(options) {
		this.formParams.order_code = options.code;
		this.payParams.order_num = options.code;
		this.tex = global_Set_jll.taxes_ratio*100
		this.is_inster = global_Set_jll.is_inster
		let that = this;
		uni.$on('refresh_orderDetail', () => {
			that.loadData();
			that.loadInvoice();
		});
	},
	onShow() {
		this.loadData();
		this.loadInvoice();
	},
	computed: {
		...mapState(['ifx']),
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
			console.log(this.getDate('start'))
			return this.getDate('start');
		},
		endDate() {
			console.log(this.getDate('end'))
			return this.getDate('end');
		}
	},
	components: {
		tuiListCell,
		tuiSkeleton,
		tuiListView,
		PayPanel
	},
	methods: {
		// 是否开票
		async loadInvoice(){
			let that = this;
			try {
				// this.$ui.showloading();
				let data = {
					order_code: this.formParams.order_code
				};
				let res = await this.$api.IsInvoice(data, false);
	
				that.ifInvoice = res.Success
				if (res.Success) {
					that.invoiceMsg = res.Data
				} else {
					// that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err); 
			}
		},
		_invoice(){
			if(this.item.is_tax==1){
				this.$ui.toast('您已申请退税，无法开具发票');
				return 
			}
			uni.navigateTo({
				url:'/pages/features/invoice/invoice?order='+ this.formParams.order_code +'&account=' + this.item.pay_price 
			})
		},
		// 显示客服弹窗
		_kefuMenu(){
			this.$refs.kf.showModal()
		},
		// 客服
		_kefu() {
			// let phone = this.waiter.link_value;
			const phone = uni.getStorageSync('global_Set_jll').service_mobile;
			let that = this;
			this.$refs.kf.hideModal()
			uni.showModal({
				title: 'GLLO健康智能马桶提醒你',
				content: '立即致电官方客服？',
				success: function(res) {
					that.show = false;
					if (res.confirm) {
						uni.makePhoneCall({
							phoneNumber: phone //仅为示例
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year
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
			let that = this
			let d = e.detail.value;
			uni.showModal({
				title: 'GLLO健康智能马桶提醒您',
				content: '你将延迟该订单的发货时间',
				success(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						that._beLast(d)
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 延迟发货
		async _beLast(d){
			let that = this;
			try {
				// this.$ui.showloading();
				let data = {
					"order_code":this.formParams.order_code,
					"delay_ems_time":d,
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
				uni.pageScrollTo({scrollTop: 0,duration: 300});
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
					this.$ui.toast('复制成功')
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
					share_user_id:''
				};
				let res = await this.$api.getOrderDetail(data, false);
				// this.$ui.hideloading();

				// console.log(res)
				if (res.Success) {
					if (res.Data) {
						that.item = res.Data;
						that.formParams.ems_code = res.Data.ems_code;
						that.oderId = res.Data.order_code;
						// alert(that.oderId)
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
			this.$refs.payPanel._show(that.formParams.order_code);
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
	padding-top: 160rpx;
	// padding-bottom: 160rpx;
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
			border: 2rpx solid #fff;
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
		.smallBtn{
			height: 50rpx ;
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
		// width: 150rpx;
		margin-right: 20rpx;
		font-size: 28rpx;
		text-align: left;
	}
	.footerBox{
		position: fixed;
		width: 100vw;
		left: 0;
		bottom: 0;
		z-index: 100;
		background-color: #fff;
		.footerMark{
			width: 100vw;
			height: 50rpx;
			line-height: 50rpx;
			width: 100%;
			padding: 0 20rpx;
			background-color: #FFFDEF;
			color: #FC872D;
			text-align: center;
		}
		.footer {
			height: 100rpx;
			background: #fff;
			width: 100%;
			padding: 0 20rpx;
			z-index: 100;
			.btns {
				margin-left: 20rpx;
			}
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
