<!-- 退款选项 -->

<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<view class="content">
				<view class=" statusBox  ">
					设备编号：{{ app_install_info.device_num }}
				</view>
				
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
							<view class="f1">
								上门服务时间：{{app_install_info.booking_time}}
							</view>
							<text class="status ">{{app_install_info.task_service_status | install_statusFilter }}</text>
						</view>	
						<view class="content ">
							<view class="cm_title">服务信息</view>
						
							<view class="flex flex_center listItems " v-if="app_install_info.task_service_status!=1">
								<text  class="text">预约人：</text>
								<view class="f1"> {{ app_install_info.booking_user }} </view>
							</view>
							<view class="flex flex_center listItems " v-if="app_install_info.task_service_status!=1">
								<text  class="text">联系方式：</text>
								<view class="f1"> {{ app_install_info.booking_mobile }} </view>
							</view>
							
							<view class="flex flex_center listItems" >
								<text  class="text">安装单号：</text>
								<view class="f1 cm_ellipsis">{{ app_install_info.task_code }}</view>
							</view>
							<view class="flex flex_center listItems" >
								<text  class="text">派单时间：</text>
								<view class="f1 cm_ellipsis">{{ app_install_info.task_create_time }}</view>
							</view>
							<view class="flex flex_center listItems" v-if="app_install_info.task_service_status!=2">
								<text  class="text">开始时间：</text>
								<view class="f1 cm_ellipsis">{{ app_install_info.service_begin_time }}</view>
							</view>
							<view class="flex flex_center listItems last" v-if="app_install_info.task_service_status==1">
								<text  class="text">结束时间：</text>
								<view class="f1 cm_ellipsis">{{ app_install_info.service_end_time }}</view>
							</view>
							<view class="flex flex_center listItems " v-if="app_install_info.task_service_status!=1">
								<text  class="text">安装地址：</text>				
								<view class="f1">{{ app_install_info.task_service_add }}</view>
							</view>
							<!-- <view class="flex flex_center listItems " v-if="app_install_info.task_service_status!=1">
								<view class="f1">{{ app_install_info.task_service_add }}</view>
							</view> -->
						</view>
					
					</view>
				</view>
				<view class="box" @click="_call(app_install_info.booking_mobile)" style="padding: 20rpx;" v-if="app_install_info.task_service_status!=1">
						<view class="flex flex_center">
							<image src="../../../static/img/phone.png" mode="widthFix" class="call"></image>
							<text>致电预约人</text>
						</view>
				</view>
				
			
				
				
				<view class="box"  style="padding: 20rpx;" v-if="app_install_info.task_service_status !=1">
					<view >
						<view class="cm_title">填写服务码</view>
						<view class="container flex flex_center">
							 <one-input ref="hi" type="box" @input="input" @finish="finish" :maxlength="4"></one-input>					 
						</view>		
					</view>
				</view>
				
				
				<!-- 安装图片 -->
				<view class="box" style="padding: 20rpx;" v-if="app_install_info.task_service_status !=1">
					<view class="cm_title">上传图片</view>
					<view class="container">			
						<view class="tui-box-upload">
							<tui-upload :serverUrl="serverUrl" :value="oringinImg"  fileKeyName="problem" @complete="result" @remove="remove"></tui-upload>
						</view>
					</view>
					<view class=" cm_des" style="padding: 20rpx ;padding-top: 0;">最多上传3张</view>
				</view>
				<view v-else  class="box" style="padding: 20rpx;">
					<view class="cm_title">安装图片</view>
					<view class="container flex  flex_center">			
						<block v-for="(item,index ) in imageData" :key="index">
							<view style="width: 160rpx;height: 160rpx;margin: 10rpx;overflow: hidden;">
								<image :src="item" mode="widthFix" @tap="_pre(item)" style="width: 160rpx;height: 160rpx;"></image>
							</view>					
						</block>
					</view>				
				</view>
				 
				
				<view class="box" style="padding: 20rpx;" v-if="app_install_info.task_service_status !=1">
					<view class="cm_title">安装内容</view>
					<view class="container">			
						<textarea v-model="formParams.task_remak" placeholder="请输入安装内容"  style="min-height: 160rpx;" auto-height/>
					</view>
				</view>
				<view class="box" style="padding: 20rpx;" v-else>
					<view class="cm_title">安装内容</view>
					<view class="container">			
						{{ app_install_info.task_remak }} 
					</view>
				</view>
				
				<view class="box" style="padding: 20rpx;" v-if="app_install_info.task_service_status ==1">
					<view class="cm_title">服务反馈</view>
					<view class="container">
						{{ app_install_info.service_evaluate }} 
					</view>
				</view>
				<view class="box" style="padding: 20rpx;" v-if="app_install_info.task_service_status ==1">
					<view class="cm_title">服务反馈</view>

					<view class="container">
						{{ app_install_info.service_remak }} 
					</view>
				</view>
				<view class=" tui-skeleton-fillet" style="margin-top: 72rpx;padding: 0 20rpx;"  v-if="app_install_info.task_service_status==3">
					<tui-button type="primary" shape="circle" :loading="loading" @tap="_complete">完成安装</tui-button>
				</view>
			</view>
		</view>
	</view>
</template>
 
<script>
	import { mapState } from 'vuex';
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiUpload from '@/components/tui-upload/tui-upload'
	import tuiListView from '@/components/list-view/list-view'
	import http from '@/utils/http/index.js'
	import oneInput from '@/components/myp-one/myp-one'
	export default {
		data() {
			return {
				app_install_info:'',
				app_order_info:'',
				loading:false,
			
				formParams: {
					"order_code":"",
					"service_code":"",
					"task_service_img":'',
					"task_remak":"",
				},
				show:false,
				oringinImg:[],  //初始化数组
				imageData: [],
				//上传地址
				serverUrl:http.baseUrl+'/api/Upload/UploadImg',
				time: '',
				sumPrice:0,
				max:0,
				hasEms:0,
				code:'',
				skeletonShow:true,
				
				
				// orderCode:''
			};
		},
		components:{
			tuiListCell,
			tuiListView, 
			tuiUpload,
			oneInput
		},
		computed: {
			// ...mapState(['currentPro']),	
			refundPrice() {
				return (this.app_install_info.price + this.app_install_info.service_total_price).toFixed(2);
			}
		},
		onLoad(options){
			
			this.code = options.code
			this.formParams.order_code = options.code
			// 0仅退款  1退货退款 3编辑状态
			// console.log(this.currentPro)
			this.loadData()
		},
		methods:{
			_pre(src){
				uni.previewImage({
				            urls: [src],
				        });
			},
			// 输完验证码码回调
			finish(e){
				uni.hideKeyboard()
				// this.submit()
				// this.reset()
			},
			input(e){
				this.formParams.service_code = e
			},
			_call(num) {
				uni.makePhoneCall({
					phoneNumber: num //仅为示例
				});
			},
			
			// 加载详情
			async loadData(){
				let that = this;
				try {
					// this.$ui.showloading();
					let data = {
						order_code:this.code
					}
					let res = await this.$api.GetAllOrderInfo(data, false);
					
					if (res.Success) {
						if (res.Data) {
							that.app_install_info = res.Data.app_install_info;
							that.app_order_info = res.Data.app_order_info;
							that.imageData = res.Data.app_install_info.task_service_img.split(',')
						}
						that.skeletonShow = false
					} else {
						that.$ui.toast(res.Msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			// 确认安装
			async _complete(){
				// if(!this.formParams.device_num){
				// 	this.$ui.toast('请输入马桶机号')
				// 	return ;
				// }
				if(this.formParams.service_code.length!=4){
					this.$ui.toast('请输入4位数服务码')
					return ;
				}
				if(!this.formParams.task_service_img){
					this.$ui.toast('请上传安装结果图片')
					return ;
				}
				let that = this;
				try {
					this.$ui.showloading();
					let res = await this.$api.OrderInstall(this.formParams, false);
					this.$ui.hideloading();
					// console.log(res)
					if (res.Success) {
						that.$ui.toast('安装成功')
						that.loadData()
						uni.$emit('refreshCenter')
					} else {
						that.$ui.toast(res.Msg)
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
				this.formParams.task_service_img = this.imageData.join(',')
			},
			// 删除图片
			remove(e) {
				//移除图片
				let index = e.index
				
				this.imageData.slice(index,1)
				this.formParams.task_service_img = this.imageData.join(',')
				console.log(this.formParams.task_service_img )
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		.mshBar{
			height: 74rpx;
			line-height: 74rpx;
			background: #FFEDE2;
			color: #EC6D43;
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
		.content{
			padding: 20rpx;
			.box{
				margin-top: 20rpx;
				background: #fff;
				border-radius: 12rpx;
				.call {
					width: 50rpx;
					height: 50rpx;
					margin-right: 20rpx;
				}
				.cells{
					width: 100%;
					min-height: 92rpx;
					line-height: 92rpx;
					background: #fff;
					padding: 0 20rpx;
					.cm_title{
						margin-right: 50rpx;
					}
					.avatar{
						width: 78rpx;
						height: 78rpx;
						border-radius: 50%;
						margin-right: 24rpx;
					}
					.posUnit{
						position: absolute;
						top: 14rpx;
						font-size: 20rpx;
						
					}
				}
				.textarea{
					height: 150rpx;
				}
				.container{
					padding:30rpx 20rpx;
					.inputs{
						border-bottom: 1rpx solid #eee;
						height: 88rpx;
						line-height: 88rpx;
					
					}
					.scan{
						width: 88rpx;
						height: 88rpx;
						// background-color: red;
						
					}
				}
				
			}
			.picBox {
				margin-bottom: 0;
			}
			.orderBox{
				.orderItems{
					border-radius: 12rpx;
					background: #fff;
					padding: 0 30rpx;
					margin-bottom: 16rpx;
					.top{
						height: 82rpx;
						line-height: 82rpx;
						.status{
							color:#DD3A30 ;
						}
					}
					.content{
						padding:20rpx 0 ;
						line-height: 2;
						.cm_title{
							line-height: 2;
						}
						.text{
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
		.statusBox{
			background: var(--cl_theme);
			color: #fff;
			min-height: 88rpx;
			line-height: 88rpx;
			border-radius: 12rpx;
			margin-bottom: 20rpx;
			padding: 0 20rpx;
			
			.status{
				font-size:36rpx;
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
		.modal{
			width: 100%;
			height: 100vh;
			background: rgba(0,0,0,.4);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10000;
			.panel{
				width: 80vw;
				// height: 80vh;
				border-radius: 14rpx;
				padding: 40rpx 20rpx;
				background: #fff;
				.cell{
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
	}
</style>
