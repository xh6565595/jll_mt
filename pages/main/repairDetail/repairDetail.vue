<!-- 退款选项 -->

<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<view class="content">
				<view class=" statusBox  ">设备编号：{{ app_install_info.device_num }}</view>
				
				<view class="box products flex flex_center">
					<image  :src="app_order_info.skus_img" mode="aspectFill" class="itemLogo "></image>
					<view class="f1 " style="min-height: 160rpx;" >
						<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{app_order_info.project_name}}</view>
						<view class="cm_des flex flex_center" style="justify-content: flex-start;" >
							<tui-tag shape="circle" size="mini" type="gray" class="cm_t_20">{{ app_order_info.skus_difference }}</tui-tag>
							<view class="f1"></view>
						</view>
					</view>
				</view>
				<view class="orderBox">
					<view class="orderItems">
						<!-- <navigator url="../serverDetail/serverDetail" class="orderItems"> -->
						<view class="flex flex_center cm_bdb top">
							<view class="f1">服务时间：{{ app_install_info.booking_time }}</view>
							<text class="status ">{{ app_mend_info.mend_status | mend_statusFilter }}</text>
						</view>
						<view class="content ">
							<view class="cm_title">服务信息</view>
							<view class="flex flex_center listItems last">
								<text class="text">维修单号：</text>
								<view class="f1">{{ app_mend_info.task_code }}</view>
							</view>
							<view class="flex flex_center listItems last"  v-if="app_mend_info.mend_status!=1">
								<text class="text">报修人：</text>
								<view class="f1">{{ app_mend_info.booking_user }}</view>
							</view>
							<view class="flex flex_center listItems last"  v-if="app_mend_info.mend_status!=1">
								<text class="text">联系方式：</text>
								<view class="f1">{{ app_mend_info.booking_mobile }}</view>
							</view>
							<view class="flex flex_center listItems last"  v-if="app_mend_info.mend_status!=1">
								<text class="text">维修地址：</text>
								<view class="f1">{{ app_mend_info.task_service_add }}</view>
							</view>
							<view class="flex flex_center listItems" >
								<text  class="text">派单时间：</text>
								<view class="f1 cm_ellipsis">{{ app_mend_info.task_create_time }}</view>
							</view>
							<view class="flex flex_center listItems"  v-if="app_mend_info.mend_status!=2">
								<text  class="text">开始时间：</text>
								<view class="f1 cm_ellipsis">{{ app_mend_info.service_begin_time }}</view>
							</view>
							<view class="flex flex_center listItems last" v-if="app_mend_info.mend_status==1">
								<text  class="text">结束时间：</text>
								<view class="f1 cm_ellipsis">{{ app_mend_info.service_end_time }}</view>
							</view>
							
						</view>
					</view>
				</view>

				

				<view class="box" @click="_call(app_mend_info.booking_mobile)" style="padding: 20rpx;"  v-if="app_mend_info.mend_status!=1">
					<view class="flex flex_center">
						<image src="../../../static/img/phone.png" mode="widthFix" class="call"></image>
						<text>联系报修人</text>
					</view>
				</view>

				<view class="box" style="padding: 20rpx;" v-if="app_mend_info.mend_status  != 1">
					<view class="cm_title">填写服务码</view>
					<view class="container flex flex_center"><one-input ref="hi" type="box" @input="input" @finish="finish" :maxlength="4"></one-input></view>
				</view>

				<view class="box" style="padding: 20rpx;" v-if="app_mend_info.mend_status  != 1" >
					<view class="cm_title">上传图片</view>
					<view class="container">
						<view class="tui-box-upload">
							<tui-upload :serverUrl="serverUrl" :value="oringinImg" fileKeyName="problem" @complete="result" @remove="remove"></tui-upload>
						</view>
					</view>
					<view class=" cm_des" style="padding: 20rpx ;padding-top: 0;">最多上传3张</view>
				</view>
				<view v-else  class="box" style="padding: 20rpx;">
					<view class="cm_title">维修图片</view>
					<view class="container flex  flex_center">			
						<block v-for="(item,index ) in imageData" :key="index">
							<view style="width: 160rpx;height: 160rpx;margin:0 10rpx;overflow: hidden;">
								<image :src="item" mode="widthFix" style="width: 160rpx;height: 160rpx;" @tap="_pre(item)"></image>
							</view>					
						</block>
					</view>				
				</view>
				
				<view class="box flex flex_center" style="padding: 20rpx;" @tap="_choose" v-if="app_mend_info.mend_status  != 1">
					<view class="cm_title">维修内容</view>
					<view class=" f1 cm_tex_r  ">
						<!-- <textarea v-model="formParams.task_remak" placeholder="请输入安装内容"  style="min-height: 160rpx;" auto-height/> -->
						{{ formParams.task_remak }}
					</view>
					<text class="iconfont icon-fanhui3"></text>
				</view>
				<view class="box" style="padding: 20rpx;" v-else>
					<view class="cm_title">维修内容</view>
					<view class="container">			
						{{ app_mend_info.task_remak }} 
					</view>
				</view>
				
				<view class="box" style="padding: 20rpx;" v-if="app_mend_info.mend_status ==1">
					<view class="cm_title">服务反馈</view>
					<view class="container">			
						{{ app_mend_info.service_evaluate }} 
					</view>
				</view>
				<view class="box" style="padding: 20rpx;" v-if="app_mend_info.mend_status ==1">
					<view class="cm_title">服务反馈</view>
					<view class="container">
						{{ app_mend_info.service_remak }} 
					</view>
				</view>
				
				<view class="box" style="padding: 20rpx;">
					<view class="flex flex_center   " style="padding:20rpx 0 ;">
						<text for="" class="cm_title">维修历史</text>
						<view class="f1"></view>
					</view>
					<view style="padding: 20rpx;">
						<tui-time-axis v-if="mendlog_list.length">
							<tui-timeaxis-item bgcolor="none" v-for="(item, index) in mendlog_list" :key="index">
								<template v-slot:node>
									<view class="tui-node tui-bg-primary">
										<!-- <tui-icon name="check" color="#fff" :size="14" :bold="true"></tui-icon> -->
										<image v-if="item.mend_status != 1" src="../../../static/img/wl_xz.png" mode="aspectFit" style="width: 30rpx;height: 30rpx;"></image>
										<text v-else style="width: 20rpx;height:20rpx;border-radius: 50%;background: #ebebeb;"></text>
									</view>
								</template>
				
								<template v-slot:content>
									<view v-if="item.mend_status == 1">
										<view class="tui-order-desc" :style="{ color: '#999' }">{{ item.mend_status | mend_statusFilter }}</view>
										<view class="tui-order-time tui-gray" :style="{ color: '#999' }">维修师傅：{{ item.task_service_user_name }}</view>
										<view class="tui-order-time tui-gray" :style="{ color: '#999' }">维修时间：{{ item.booking_time }}</view>
										<!-- <view class="tui-order-time tui-gray" :style="{ color: '#999' }"  v-if="app_mend_info.mend_status==1">联系方式：{{ item.task_service_user_mobile }}</view>
										<view class="tui-order-time tui-gray" :style="{ color: '#999' }"  v-if="app_mend_info.mend_status==1">维修地址：{{ item.task_service_add }}</view> -->
										<view class="tui-order-time tui-gray" :style="{ color: '#999' }"  >故障详情：{{ item.mend_detail }}</view>
									</view>
									<view v-else>
										<view class="tui-primary-title">{{ item.mend_status | mend_statusFilter }}</view>
										<view class="tui-primary">报修人：{{ item.booking_user }}</view>
										<view class="tui-primary">报修时间：{{ item.booking_time }}</view>
									<!-- 	<view class="tui-primary">联系方式：{{ item.booking_mobile }}</view>
										<view class="tui-primary">维修地址：{{ item.task_service_add }}</view> -->
										<view class="tui-primary">故障详情：{{ item.mend_detail }}</view>
										<!-- <view style="background-color: #f2f2f2;padding: 16rpx;font-size: 24rpx;">备注：{{item.task_remak}}</view> -->
									</view>
								</template>
							</tui-timeaxis-item>
						</tui-time-axis>
						<view v-else style="padding: 40rpx 0;text-align: center;">暂无物流反馈，请耐心等候</view>
					</view>
				</view>
				<view class=" tui-skeleton-fillet" style="margin-top: 72rpx;padding: 0 20rpx;" v-if="app_mend_info.mend_status  != 1">
					<tui-button type="primary" shape="circle" :loading="loading" @tap="_complete">完成维修</tui-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiListCell from '@/components/list-cell/list-cell';
import tuiUpload from '@/components/tui-upload/tui-upload';
// import tuiListView from '@/components/list-view/list-view';
import http from '@/utils/http/index.js';
import oneInput from '@/components/myp-one/myp-one';
const { task_item } = uni.getStorageSync('global_Set_jll');
import tuiTimeAxis from "@/components/time-axis/time-axis"
	import tuiTimeaxisItem from "@/components/timeaxis-item/timeaxis-item"
export default {
	data() {
		return {
			app_install_info: '',
			app_order_info: '',
			mendlog_list:[],
			app_mend_info:'',
			loading: false,

			formParams: {
				task_remak: '',
				task_code: '', //报修编码
				device_num: '', //机号
				service_code: '', //服务号
				task_service_img: '' //维修图片
			},
			show: false,
			oringinImg: [], //初始化数组
			imageData: [],
			//上传地址
			serverUrl: http.baseUrl + '/api/Upload/UploadImg',
			time: '',
			sumPrice: 0,
			max: 0,
			hasEms: 0,
			code: '',
			skeletonShow: true,
			actions: [],
			status: 1
		};
	},
	components: {
		tuiListCell,
		tuiTimeAxis,
		tuiTimeaxisItem,
		tuiUpload,
		oneInput
	},
	computed: {
		// ...mapState(['currentPro']),
		refundPrice() {
			return (this.app_install_info.price + this.app_install_info.service_total_price).toFixed(2);
		}
	},
	onLoad(options) {
		this.code = options.code;
		this.formParams.task_code = options.wcode;
		// 0仅退款  1退货退款 3编辑状态
		this.actions = task_item.map(item => {
			return item.Text;
		});
		// debugger
		this.formParams.task_remak = this.actions[0];
		this.loadData();
	},
	methods: {
		_pre(src){
			uni.previewImage({
			            urls: [src],
			        });
		},
		_choose() {
			let that = this;
			uni.showActionSheet({
				itemList: that.actions,
				success: function(res) {
					console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					that.formParams.task_remak = that.actions[res.tapIndex];
				},
				fail: function(res) {
					console.log(res.errMsg);
				}
			});
		},
		// 输完验证码码回调
		finish(e) {
			uni.hideKeyboard();
			// this.submit()
			// this.reset()
		},
		input(e) {
			this.formParams.service_code = e;
		},
		_call(num) {
			uni.makePhoneCall({
				phoneNumber: num //仅为示例
			});
		},

		// 加载详情
		async loadData() {
			let that = this;
			try {
				// this.$ui.showloading();
				let data = {
					order_code: this.code
				};
				let res = await this.$api.GetAllOrderInfo(data, false);

				if (res.Success) {
					if (res.Data) {
						that.app_install_info = res.Data.app_install_info;
						that.app_order_info = res.Data.app_order_info;
						that.app_mend_info = res.Data.app_mend_info;
						that.mendlog_list = res.Data.app_mendlog_list;
						that.formParams.device_num = res.Data.app_install_info.device_num;
						// let a = 1;
						// res.Data.app_mendlog_list.some(item => {
						// 	if (item.mend_status == 2 || item.mend_status == 3) {
						// 		a = item.mend_status;
						// 		return true;
						// 	} else {
						// 		return false;
						// 	}
						// });
						// that.status = a;
						that.imageData = res.Data.app_mend_info.task_service_img.split(',')
					}
					that.skeletonShow = false;
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		// 确认维修
		async _complete() {
			// if(!this.formParams.device_num){
			// 	this.$ui.toast('请输入马桶机号')
			// 	return ;
			// }
			if (this.formParams.service_code.length != 4) {
				this.$ui.toast('请输入4位数服务码');
				return;
			}
			if (!this.formParams.task_service_img) {
				this.$ui.toast('请上传维修结果图片');
				return;
			}
			// debugger
			let that = this;
			try {
				this.$ui.showloading();
				let res = await this.$api.OrderMend(this.formParams, false);
				this.$ui.hideloading();
				// console.log(res)
				if (res.Success) {
					that.$ui.toast('维修成功');
					that.loadData();
					uni.$emit('refreshCenter');
				} else {
					that.$ui.toast(res.Msg);
					// that.$refs.hi.set('')
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		// 上传回调
		result(e) {
			// console.log(1,e)
			this.imageData = e.imgArr;
			this.formParams.task_service_img = this.imageData.join(',');
		},
		// 删除图片
		remove(e) {
			//移除图片
			let index = e.index;

			this.imageData.slice(index, 1);
			this.formParams.task_service_img = this.imageData.join(',');
			console.log(this.formParams.task_service_img);
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	.mshBar {
		height: 74rpx;
		line-height: 74rpx;
		background: #ffede2;
		color: #ec6d43;
		padding: 0 30rpx;
	}
	.products{
		padding: 20rpx;
		margin-bottom: 20rpx;
		.itemLogo{
			width: 160rpx;
			height: 160rpx;
			border-radius: 16rpx;
			margin-right: 20rpx;
		}
	}
	.content {
		padding: 20rpx;
		.box {
			margin-top: 20rpx;
			background: #fff;
			border-radius: 12rpx;
			.call {
				width: 50rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
			.cells {
				width: 100%;
				min-height: 92rpx;
				line-height: 92rpx;
				background: #fff;
				padding: 0 20rpx;
				.cm_title {
					margin-right: 50rpx;
				}
				.avatar {
					width: 78rpx;
					height: 78rpx;
					border-radius: 50%;
					margin-right: 24rpx;
				}
				.posUnit {
					position: absolute;
					top: 14rpx;
					font-size: 20rpx;
				}
			}
			.textarea {
				height: 150rpx;
			}
			.container {
				padding: 30rpx 20rpx;
				.inputs {
					border-bottom: 1rpx solid #eee;
					height: 88rpx;
					line-height: 88rpx;
				}
				.scan {
					width: 88rpx;
					height: 88rpx;
					// background-color: red;
				}
			}
		}
		.picBox {
			margin-bottom: 0;
		}
		.orderBox {
			.orderItems {
				border-radius: 12rpx;
				background: #fff;
				padding: 0 30rpx;
				margin-bottom: 16rpx;
				.top {
					height: 82rpx;
					line-height: 82rpx;
					.status {
						color: #dd3a30;
					}
				}
				.content {
					padding: 20rpx 0;
					line-height: 2;
					.cm_title {
						line-height: 2;
					}
					.text {
						line-height: 1.4;
					}
				}
				.listItems {
					min-height: 60rpx;
					line-height: 60rpx;
					// border-bottom: 1rpx solid #e5e5e4;

					.text {
						width: 140rpx;
						text-align: right;
						margin-right: 20rpx;
					}
				}
				.last {
					border-bottom: none;
				}
			}
		}
	}
	.statusBox {
		background: var(--cl_theme);
		color: #fff;
		min-height: 88rpx;
		line-height: 88rpx;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		padding: 0 20rpx;

		.status {
			font-size: 36rpx;
			line-height: 4;
			text-align: center;
			border-bottom: 1rpx solid #fb987a;
		}

		.text {
			width: 140rpx;
			text-align: right;
			margin-right: 20rpx;
		}
	}
	.modal {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.4);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10000;
		.panel {
			width: 80vw;
			// height: 80vh;
			border-radius: 14rpx;
			padding: 40rpx 20rpx;
			background: #fff;
			.cell {
				line-height: 80rpx;
				height: 80rpx;
				.leftBar {
					width: 92rpx;
					height: 92rpx;

					.noDefault {
						width: 32rpx;
						height: 32rpx;
						border-radius: 50%;
						border: 1rpx solid #999999;
					}
				}
			}
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
		font-family: 'microsoft yahei';
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
	.tui-primary-title {
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
