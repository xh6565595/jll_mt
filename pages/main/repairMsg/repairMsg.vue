<template>
	<view class="container">
		<view class="boxs statusBox  ">
			设备编号：{{device_num}}
		</view>
		<view v-if="order_info">
			
			
			<!-- 订单信息 -->
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
			<!-- 维修历史 -->
			<view class="boxs">
				<view class="flex flex_center   " style="padding:20rpx 0 ;">
					<text for="" class="cm_title">维修历史</text>
					<view class="f1"></view>
				</view>
				<view style="padding: 20rpx;">
					<tui-time-axis v-if="mendlog_list.length">
						<tui-timeaxis-item bgcolor="none" v-for="(item,index) in mendlog_list" :key="index">
							<template slot:node>
								<view class="tui-node tui-bg-primary">
									<!-- <tui-icon name="check" color="#fff" :size="14" :bold="true"></tui-icon> -->
									<image v-if="item.mend_status!=1" src="../../../static/img/wl_xz.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;"></image>
									<text v-else style="width: 20rpx;height:20rpx;border-radius: 50%;background: #ebebeb;"> </text>
								</view>
							</template>
									
							<template slot:content>
								<view  v-if="item.mend_status==1">
									<view class="tui-order-desc" :style="{'color':'#999'}">{{item.mend_status | mend_statusFilter}}</view>
									<view class="tui-order-time tui-gray" :style="{'color':'#999'}">维修师傅：{{item.task_service_user_name}}</view>
									<view class="tui-order-time tui-gray" :style="{'color':'#999'}">维修时间：{{item.booking_time}}</view>
								<!-- 	<view class="tui-order-time tui-gray" :style="{'color':'#999'}" >联系方式：{{item.task_service_user_mobile}}</view>
									<view class="tui-order-time tui-gray" :style="{'color':'#999'}">维修地址：{{item.task_service_add}}</view> -->
									<view class="tui-order-time tui-gray" :style="{'color':'#999'}">故障备注：{{item.mend_detail}}</view>
								</view>
								<view v-else>
									<view class="tui-primary-title" >{{item.mend_status | mend_statusFilter}}</view>
									<view class="tui-primary" >报修人：{{item.booking_user}}</view>
									<view class="tui-primary" >报修时间：{{item.booking_time}}</view>
								<!-- 	<view class="tui-primary" >联系方式：{{item.booking_mobile}}</view>
									<view class="tui-primary" >维修地址：{{item.task_service_add}}</view> -->
									<view class="tui-primary">故障详情：{{ item.mend_detail }}</view>
									<!-- <view style="background-color: #f2f2f2;padding: 16rpx;font-size: 24rpx;">备注：{{item.task_remak}}</view> -->
								</view>					
								
							</template>
						</tui-timeaxis-item>
					</tui-time-axis>
					<view v-else style="padding: 40rpx 0;text-align: center;"> 暂无物流反馈，请耐心等候</view>	
				</view>
				
			</view>
			
			<!-- 安装信息 -->
			<view class="boxs">
				<view class="flex flex_center   " style="padding-top: 20rpx;">
					<text for="" class="cm_title">安装信息</text>
					<view class="f1"></view>
				</view>		
				<view class="flex flex_center listItems">
					<text for="" class="text">安装师傅</text>
					<view class="f1"> {{install_info.task_service_user_name}}</view>
				</view>
				<view class="flex flex_center listItems">
					<text for="" class="text">联系方式</text>
					<view class="f1">{{install_info.task_service_user_mobile}}</view>
				</view>
				<view class="flex flex_center listItems">
					<text for="" class="text">安装时间</text>
					<view class="f1">{{install_info.booking_time}}</view>
				</view>
				<view class="flex flex_center listItems ">
					<text for="" class="text">服务商</text>
					<view class="f1">{{install_info.task_service_name}}</view>
				</view>
				<view class="flex flex_center listItems last">
					<text for="" class="text">安装地址</text>
					<view class="f1">{{install_info.task_service_add}}</view>
				</view>		
			</view>
			

			<button type="success" class="cm_btn" hover-class="cm_hover" @tap="submit">开始维修</button>
			<!-- <button type="success" class="cm_btn" hover-class="cm_hover" @tap="submit">开始安装</button> -->
			<view class="cm_des kefu "  @click="_call">联系客服</view>
		</view>
	</view>
</template>

<script>
	import tuiTimeAxis from "@/components/time-axis/time-axis"
	import tuiTimeaxisItem from "@/components/timeaxis-item/timeaxis-item"
const {service_mobile}  = uni.getStorageSync('global_Set_jll')
export default {
	data() {
		return {
			order_code: '',
			device_num: '',
			current: 0,
			device:'',
			install_info:'',
			repair_info:'', //安装信息
			order_info:'',
			mendlog_list:[],
			taskCode:''
		};
	},
	components: {
		tuiTimeAxis,
		tuiTimeaxisItem
	},
	onLoad(options) {
		const repairMsg = uni.getStorageSync('repairMsg');
		// console.log(repairMsg)
		this.install_info = repairMsg.app_install_info
		this.order_info = repairMsg.app_order_info
		this.mendlog_list = repairMsg.app_mendlog_list
		
		this.order_code = repairMsg.app_order_info.order_code;
		this.device_num = options.device;
		this.taskCode = options.wcode;
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
			let data = {order_code:this.order_code}
			let res = await this.$api.BeginMend(data, false);
			this.$ui.hideloading()
			if (res.Success) {
				// that.install_info = res.Data	// that._loadOrder({order_code:res.Data.order_code})
				that.$ui.toast('设备开始维修');
				setTimeout(()=>{
					uni.redirectTo({
						// url:'/pages/main/repairDetail/repairDetail?code='+ this.order_code,
						url:`/pages/main/repairDetail/repairDetail?code=${that.order_code}&wcode=${that.taskCode}`
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
	.tui-order-tracking {
		padding: 30rpx 30rpx 30rpx 40rpx;
		background: #fff;
		margin-top: 16rpx;
		box-sizing: border-box;
	}
	
	.tui-order-title {
		color: #333;
		font-weight: bold;
		font-size: 32rpx;
		font-family: "microsoft yahei";
	}
	
	.tui-order-desc {
		font-size: 28rpx;
		color: #999;
		// padding: 12rpx 0;
		// line-height: 1.2;
		padding-bottom: 20rpx;
	}
	
	.tui-ptop {
		display: flex;
		justify-content: flex-start;
		line-height: 28rpx;
	}
	
	.tui-order-time {
		font-size: 24rpx;
		line-height: 1.2;
		// font-weight: bold;
	}
	
	.tui-gray {
		color: #848484 !important;
	}
	
	.tui-light-gray {
		color: #888 !important;
	}
	.tui-primary-title{
		font-size: 32rpx;
		font-weight: 600;
		padding-bottom: 20rpx;
	}
	.tui-primary {
		color: #333;
		font-size: 28rpx;
		line-height: 1.6;
	}
}
</style>
