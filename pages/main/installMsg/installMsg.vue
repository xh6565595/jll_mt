<template>
	<view class="container">
		<view class="boxs statusBox  ">
			设备编号：{{device_num}}
		</view>
		<view v-if="order_info">
			<view class="boxs products flex flex_center">
				<image  :src="order_info.skus_img" mode="aspectFill" class="itemLogo "></image>
				<view class="f1 " style="min-height: 160rpx;" >
					<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{order_info.project_name}}</view>
					<view class="cm_des flex flex_center" style="justify-content: flex-start;" >
						<tui-tag shape="circle" size="mini" type="gray" class="cm_t_20">{{ order_info.skus_difference }}</tui-tag>
						<view class="f1"></view>
					</view>
				</view>
			</view>
			
			<view class="boxs">
				<view class="flex flex_center   " style="padding-top: 20rpx;">
					<text for="" class="cm_title">订单信息</text>
					<view class="f1"></view>
				</view>		
				<view class="flex flex_center listItems">
					<text for="" class="text">订单编号</text>
					<view class="f1"> {{order_info.order_code}}</view>
				</view>
				<view class="flex flex_center listItems">
					<text for="" class="text">购买人</text>
					<view class="f1">{{order_info.buy_name}}</view>
				</view>
				<view class="flex flex_center listItems">
					<text for="" class="text">联系方式</text>
					<view class="f1">{{order_info.buy_phone}}</view>
				</view>
				<view class="flex flex_center listItems ">
					<text for="" class="text">购买时间</text>
					<view class="f1">{{order_info.pay_date}}</view>
				</view>
				<view class="flex flex_center listItems last">
					<text for="" class="text">送货地址</text>
					<view class="f1">{{order_info.install_address}}</view>
				</view>
			
			</view>


			<view class="boxs">
				<view class="flex flex_center listItems ">
					<text for="" class="text">预约人</text>
					<view class="f1">{{install_info.booking_user}}</view>
				</view>
				<view class="flex flex_center listItems last">
					<text for="" class="text">联系方式</text>
					<view class="f1">{{install_info.booking_mobile}}</view>
				</view>
				<view class="flex flex_center listItems last">
					<text for="" class="cm_title">安装地址</text>
					<view class="f1"></view>
				</view>
				<view class=" listItems last">
					<view class="f1">{{install_info.task_service_add}}</view>
				</view>
			
			</view>

			<button type="success" class="cm_btn" hover-class="cm_hover" @tap="submit">开始安装</button>
			<!-- <button type="success" class="cm_btn" hover-class="cm_hover" @tap="submit">开始安装</button> -->
			<view class="cm_des kefu "  @click="_call">联系客服</view>
		</view>
	</view>
</template>

<script>
		const {service_mobile}  = uni.getStorageSync('global_Set_jll')
export default {
	data() {
		return {
			order_code: '',
			device_num: '',
			current: 0,
			device:'',
			install_info:'', //安装信息
			order_info:''
		};
	},
	onLoad(options) {
		const installMsg = uni.getStorageSync('installMsg');
		// console.log(installMsg)
		// this.install_info = installMsg
		this.install_info = installMsg.app_install_info
		this.order_info = installMsg.app_order_info
		this.order_code = installMsg.app_order_info.order_code;
		this.device_num = options.device;
		// this._scanCode()
	},
	onPullDownRefresh(){
		this._loadData();
	},
	methods: {
		// 客服热线
		_call(){
			// alert(service_mobile)
			uni.makePhoneCall({
				phoneNumber:service_mobile?service_mobile:'059183612095'
			})
		},
		// 开始维修
		async submit() {
			let that = this;
			this.$ui.showloading()
			let data = {
				order_code:this.order_code,
				device_num:this.device_num	
			}
			let res = await this.$api.BeginInstall(data, false);
			this.$ui.hideloading()
			if (res.Success) {
				// that.install_info = res.Data	// that._loadOrder({order_code:res.Data.order_code})
				that.$ui.toast('您已成功开始安装');
				setTimeout(()=>{
					uni.redirectTo({
						url:'/pages/main/serverDetail/serverDetail?code='+ this.order_code
					})
				},1000)
			} else {
				// that.$ui.toast(res.Msg)
				uni.showModal({
					title:'智能厨卫提醒您',
					content:res.Msg,
					showCancel:false,
					success(e) {
						// uni.navigateBack({
							
						// })
					}
				})
			
				if (that.skeletonShow) {
					that.skeletonShow = false;
				}
			}
			
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	background: #f4f4f4;
	padding: 20rpx;
	
	.boxs {
		padding: 0 30rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		.listItems {
			min-height: 88rpx;
			line-height: 88rpx;
			border-bottom: 1rpx solid #e5e5e4;

			.text {
				width: 140rpx;
			}
		}
		.last {
			border-bottom: none;
		}
		.textarea {
			padding-bottom: 20rpx;
			width: 100%;
			min-height: 160rpx;
			line-height: 1.4;
		}
		
	}
	.products{
		padding: 20rpx;
		.itemLogo{
			width: 160rpx;
			height: 160rpx;
			border-radius: 16rpx;
			margin-right: 20rpx;
		}
	}
	.box2 {
		background: transparent;
	}
	.cm_btn {
		margin-top: 72rpx;
	}
	.kefu{
		line-height: 88rpx;
		text-align: center;
	}
	.statusBox{
		background: var(--cl_theme);
		color: #fff;
		min-height: 88rpx;
		line-height: 88rpx;
		.text {
			width: 140rpx;
		}
		.status{
			font-size:36rpx;
			line-height: 4;
			text-align: center;
			border-bottom: 1rpx solid #fb987a;
		}
	}
}
</style>
