<!-- 退款选项 -->

<template>
	<view class="pages">
		<!-- <view class="mshBar flex flex_center">
			<view class="f1 cm_ellipsis">阿范德萨发斯蒂芬是的发送大发送到发送到发送到发送地方上的</view>
			<text class="text">查看全部</text>
			<text class="iconfont icon-fanhui3 text"></text>
		</view> -->
		<view class="content">
			<view class="orderBox">
				<view class="orderItems">
				<!-- <navigator url="../serverDetail/serverDetail" class="orderItems"> -->
					<view class="flex flex_center cm_bdb top">
						<view class="f1">
							上门服务时间：{{item.task_service_time}}
						</view>
						<text class="status ">{{item.task_service_status==1?'已完成':'待安装'}}</text>
					</view>	
					<view class="content cm_bdb">
						<view class="cm_title">服务地址</view>
						<view class="text">联系人：{{item.buy_name}}</view>
						<view class="text">联系方式：{{item.buy_phone}}</view>
						<view class="text">订单号：{{item.order_code}}</view>
						<view class="text">服务地址：{{item.buy_address}}</view>
					</view>
					<view class="flex flex_center cm_bdb top">
						<view class="f1">
							安装费用
						</view>
						<text class="cm_price ">￥{{item.install_price}}</text>
					</view>	
				<!-- </navigator> -->
				</view>
			</view>
			<view class="box" @click="_call" style="padding: 20rpx;">
					<view class="flex flex_center">
						<image src="../../../static/img/phone.png" mode="widthFix" class="call"></image>
						<text>联系卖家</text>
					</view>
			</view>
			
			<view class="box"  style="padding: 20rpx;" v-if="item.task_service_status==0">
				<view class="cm_title">填写服务码</view>
				<view class="container flex flex_center">
					 <one-input ref="hi" type="box" @input="input" :maxlength="4"></one-input>
				</view>		
			</view>
			
			<view class="box" style="padding: 20rpx;" v-if="item.task_service_status==0">
				<view class="cm_title">上传图片</view>
				<view class="container">			
					<view class="tui-box-upload">
						<tui-upload :serverUrl="serverUrl" :value="oringinImg"  fileKeyName="problem" @complete="result" @remove="remove"></tui-upload>
					</view>
				</view>
				<view class=" cm_des" style="padding: 20rpx ;padding-top: 0;">最多上传3张</view>
			</view>
			
			<view class=" tui-skeleton-fillet" style="margin-top: 72rpx;padding: 0 20rpx;" v-if="item.task_service_status==0">
			<tui-button type="primary" shape="circle" :loading="loading" @tap="_readyTo">提交</tui-button>
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
				item:'',
				loading:false,
			
				formParams: {
					"order_code":"",
					"service_code":"",
					"task_service_img":''
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
			...mapState(['currentPro']),	
			refundPrice() {
				return (this.item.price + this.item.service_total_price).toFixed(2);
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
			input(e){
				this.formParams.service_code = e
			},
			_call() {
				uni.makePhoneCall({
					phoneNumber: this.item.task_service_user_mobile //仅为示例
				});
			},
			
			// 加载详情
			async loadData(){
				let that = this;
				try {
					// this.$ui.showloading();
					let data = {
						task_code:this.code
					}
					let res = await this.$api.GetUserTaskDetail(data, false);
					// this.$ui.hideloading();
					// console.log(res)
					if (res.Success) {
						if (res.Data) {
							that.item = res.Data;
							that.formParams.order_code = res.Data.order_code;
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
			async _readyTo(){
				if(this.formParams.service_code.length!=4){
					this.$ui.toast('请输入正确的服务码')
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
						that.$refs.hi.set('')
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
				
			},
			result(e) {
				// console.log(1,e)
				this.imageData = e.imgArr;
				this.formParams.task_service_img = this.imageData.join(',')
			},
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
				}
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
