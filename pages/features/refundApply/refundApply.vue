<!-- 退款选项 -->

<template>
	<view class="pages">
		<view class="proItemsBox  tui-skeleton-fillet" >
			<view class="picBox flex  flex_center tui-skeleton-fillet">
				<image v-if="item.skus_img || item.project_img" :src="item.skus_img || item.project_img" mode="aspectFill" class="avatar "></image>
				<view class="f1 " >
					<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{type==3?item.project_name: item.order_name }}</view>
					<view class="cm_des flex flex_center" style="justify-content: flex-start;">
						<tui-tag shape="circle" size="mini" type="gray" class=" stags">{{ type==3?item.project_sku: item.skus_name }}</tui-tag>
					</view>
					<view style="margin-top: 4rpx;" v-if="type!=3">
						<view class="cm_des flex flex_center" v-if="item.order_project_service1">
							<view class="f1" style="color: #E56D00;">{{ item.order_project_service1 }}</view>
						</view>
						<view class="cm_des flex flex_center" v-if="item.order_project_service2">
							<view class="f1" style="color: #E56D00;">{{ item.order_project_service2 }}</view>
						</view>
						<view class="cm_des flex flex_center" v-if="item.order_project_service3">
							<view class="f1" style="color: #E56D00;">{{ item.order_project_service3 }}</view>
						</view>
					</view>
					<!-- <view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;"  v-if="type==3">
						<text class=" cm_t_32">退款金额：{{ item.apply_price }}</text>
						<view class="f1"></view>
				
					</view> -->
					<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;" v-if="type!=3" >
						<text class="cm_prize cm_t_32">￥{{ item.alone_price }}</text>
						<view class="f1"></view>
						<view class="cm_des">
							<Icon name="shut" :size="14" color="#999"></Icon>
							{{ item.project_num }}
						</view>
					</view>
				</view>
			</view>			
		</view>
		
		<view class="box">
			<view class="cells flex flex_center"  @tap="_toggle">
				<view class="cm_title"> 退款原因</view>
				<view class=" f1">{{formParams.reason}}</view>
				<Icon name="arrowright" :size="14" color="#999"></Icon>
			</view>
		</view>
		
		<view class="box">
			<view class="cells " style="padding: 20rpx ;">
				<view class=" flex flex_center" style="width: 100%;position: relative;"  v-if="hasEms">
					<view class="cm_title f1"> 邮费</view>
					<text class=" cm_tex_r" >{{hasEms}}</text> 
					<!-- <input class="cm_prize cm_tex_r"  type="number"  @input="onInput" placeholder=""   v-model="formParams.apply_price"  />	 -->
				</view>
				<view class=" flex flex_center" style="width: 100%;position: relative;"  >
					<view class="cm_title f1"> 商品金额</view>
					<text class=" cm_tex_r" >{{sumPrice}}</text> 
					<!-- <input class="cm_prize cm_tex_r"  type="number"  @input="onInput" placeholder=""   v-model="formParams.apply_price"  />	 -->
				</view>
				<view class=" flex flex_center" style="width: 100%;position: relative;" >
					<view class="cm_title f1"> 退款金额</view>
					<text class="cm_prize posUnit" :style="{'right':(formParams.apply_price+'').length*18+'rpx'}">￥</text> 
					<input class="cm_prize cm_tex_r"  type="number"  @input="onInput" placeholder=""   v-model="formParams.apply_price"  />	
				</view>
				<view style="margin-top: 20rpx;" class="cm_des">
					退款金额可修改，最多￥{{max}}不含运费				
				</view>		 
			</view>
		</view>
		
		<view class="box" v-if="type!=0 && formParams.refund_type!=0">
			<view class="cells " style="padding: 20rpx ;">
				<view class="cm_title f1"> 退款说明</view>			
				<textarea   v-model="formParams.reason_detail" style="margin-top: 20rpx;"  class="cm_des textarea" placeholder="选填，详细填写您的退货说明" /> 
			</view>
			
			<view class="container">			
				<view class="tui-box-upload">
					<tui-upload :serverUrl="serverUrl" :value="oringinImg"  fileKeyName="problem" @complete="result" @remove="remove"></tui-upload>
				</view>
			</view>
			<view class="container cm_des" style="padding-bottom: 20rpx ;">最多上传3张</view>
		</view>
		
		<view class=" tui-skeleton-fillet" style="margin-top: 72rpx;padding: 0 20rpx;">
			<tui-button type="primary" shape="circle" :loading="loading" @tap="_readyTo">{{type==3?'重新提交':'提交'}} </tui-button>
		</view>
		
		<view class="modal flex  flex_y flex_center " v-if="show">
			<view class="panel animated fadeIn">
				<view class="cell cm_title flex flex_center" style="padding: 0 30rpx;">
					<view class="f1">请选择退款原因</view>
					<Icon name="close" :size="16" @tap="_toggle"></Icon>
				</view>
				<block v-for="(item,index) in reasonList" :key="index">					
					<view class="cell flex flex_center"  @tap="_setDefault(item)">
						<view class="leftBar flex flex_center">
							<image v-if="formParams.reason==item"  src="/static/img/wl_xz.png" mode="scaleToFill" style="width: 32rpx;height: 32rpx;"></image>
							<text v-else class="noDefault"></text>
						</view>
						<view class="f1">
							{{item}}			
						</view>
					</view>
				</block>			
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
	export default {
		data() {
			return {
				item:'',
				loading:false,
				reasonList:[	
					'不想要了',
					'多拍、错拍、不想要',
					'不喜欢、效果不好',
					'商品成分描述不符',
					'材质与商品描述不符',
					'大小尺寸与商品描述不符',
					'生产日期、保质期与商品描述不符',
					'质量问题',
					'收到商品少件、破损或者污渍',
					'商家发错货',
					'假冒品牌',
					'其他'
				],
				formParams: {
					"order_code_child":"",
					"apply_price":0,
					"reason":"多拍、错拍、不想要",
					"reason_detail":'',
					// "ems_company_name":"",
					// "ems_number":"",
					refund_code:'',
					"CertPic":"",
				},
				show:false,
				oringinImg:[],  //初始化数组
				imageData: [],
				//上传地址
				serverUrl:http.baseUrl+'/api/Upload/UploadImg',
				time: '',
				sumPrice:0,
				max:0,
				hasEms:0
			};
		},
		components:{
			tuiListCell,
			tuiListView, 
			tuiUpload
		},
		computed: {
			...mapState(['currentPro']),	
			refundPrice() {
				return (this.item.price + this.item.service_total_price).toFixed(2);
			}
		},
		onLoad(options){
			
			this.type = options.type
			// 0仅退款  1退货退款 3编辑状态
			// console.log(this.currentPro)
			if(options.type==3){
				// 编辑状态
				this.loadData(this.currentPro.refund_code)
				this.formParams.refund_code = this.currentPro.refund_code			
			}else if(this.type==0){
					// 0仅退款
				this.item = this.currentPro
				this.ifLast(this.item.child_order_code)
				
			}else{	
				// 1退货退款
				this.item = this.currentPro
				this.formParams.order_code_child = this.currentPro.child_order_code
				this.formParams.apply_price = this.currentPro.refund_price
				this.sumPrice = this.currentPro.refund_price
				this.max = this.currentPro.refund_price
				this.formParams.refund_type = options.type  //1退貨退款 -0 僅退款
			}
		},
		methods:{
			// 是否是最后一个子订单
			async ifLast(code){
				let that = this;
				try {
					// this.$ui.showloading();
					
					let res = await this.$api.ifLastSubOrder({order_code:code}, false);
					// this.$ui.hideloading();
					
					if (res.Success ) { 
						// 需要退邮费
		
						this.formParams.order_code_child = this.currentPro.child_order_code
						this.formParams.apply_price = this.currentPro.refund_price + res.Data.ems_price
						
						this.sumPrice = this.currentPro.refund_price
						this.max = this.currentPro.refund_price + res.Data.ems_price
						this.hasEms = res.Data.is_succeed?res.Data.ems_price:0
						this.formParams.refund_type = 0  //1退貨退款 -0 僅退款
					} else {
						that.$ui.toast(res.Msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			// 加载详情
			async loadData(code){
				let that = this;
				try {
					// this.$ui.showloading();
					
					let res = await this.$api.GetRefundOrderInfo({refund_code:code}, false);
					// this.$ui.hideloading();
					// console.log(res)
					if (res.Success) {
						if (res.Data) {
							that.item = res.Data.refundModel;
							that.formParams.order_code_child =  res.Data.refundModel.order_child_code
							that.formParams.apply_price =  res.Data.refundModel.refund_price
							that.sumPrice = res.Data.refundModel.refund_price
							that.formParams.refund_type = res.Data.refundModel.refund_type //1退貨退款 -0 僅退款
							that.formParams.reason = res.Data.refundModel.reason
							
							that.max = res.Data.refundModel.apply_price
							that.formParams.reason_detail = res.Data.refundModel.reason_detail
							that.oringinImg = res.Data.refundModel.CertPic.split(',')
							that.formParams.CertPic = that.oringinImg.join(',')
							
							// console.log(that.oringinImg )
						}
						that.skeletonShow = false
					} else {
						that.$ui.toast(res.Msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			onInput(e) {
				let value = e.detail.value;
				// console.log(1,value)
				let arr = value.split('.');
				if (this.time) {
					clearTimeout(this.time);
					this.time = '';
				}
				// 防抖判断
				this.time = setTimeout(() => {
					let str = value;
					if (arr[1] && arr[1].length >= 2) {
						// 小数大4位
						str = value.match(/^\d+\.(\d){2}/)[0];
						// console.log('超过4位')
					}
					// 是否超过最大值
					if (Number(str) >= this.max) {
						// console.log('超过最大值')
						str = this.max
						// console.log('nomal',str)
					}
					
					// this.realvalue = str;
					this.formParams.apply_price = Number(str)
					// let name = 'formParams.apply_price'
					// this.$set(this.formParams,'apply_price', Number(str))
					
					clearTimeout(this.time);
					this.time = '';
				}, 500);
			},
			// 提交
			async _readyTo(){
				// console.log(this.formParams)
				
				// return
				let that =  this
				try {
					// this.$ui.showloading();
					let res = await this.$api.ApplyRefund(this.formParams);
					// this.$ui.hideloading();
					if (res.Success) {				
		
						that.$ui.toast('提交成功');
						setTimeout(function() {
							if(that.type==3){
								uni.$emit('refresh_orderDetail')
								uni.$emit('refresh_refundDetail')
								uni.$emit('refresh_refundList')
								uni.navigateBack({
									
								})
							}else{
								uni.redirectTo({
									url: '/pages/features/refundDetail/refundDetail?code='+res.Data
								});
							}						
						}, 1000);
					} else {
						that.$ui.toast(res.Msg);
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
				
				
			},
			_toggle(){
				this.show = !this.show
			},
			_setDefault(item){
				this.formParams.reason = item
				this._toggle()
			},
			result(e) {
				// console.log(1,e)
				this.imageData = e.imgArr;
				this.formParams.CertPic = this.imageData.join(',')
			},
			remove(e) {
				//移除图片
				console.log(2,e)
				let index = e.index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		
		.box{
			margin-top: 20rpx;
			background: #fff;
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
				padding:0 20rpx;
			}
			
		}
		.picBox {
			margin-bottom: 0;
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
