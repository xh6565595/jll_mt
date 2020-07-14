<template>
	<view class="pages">
		<view class="modalBg flex flex_center" v-if ="refundModal">
			<view class="tui-modal-custom animated fadeIn">
				<view class="tui-prompt-title box">填写物流单号</view>
				<view style="padding: 0 20rpx;" class="box">
					<input placeholder="请填写退货商品的物流单号" class="tui-input" type="text" v-model="ems_code" />
				</view>			
				<!-- <tui-button type="primily"   size="small">立即提交</tui-button> -->
				<view class="flex flex_center box" style="border-top: 1rpx solid #e6e6e6;">
					<view class="f1 modalButton" @tap="hide" style="border-right: 1rpx solid #e6e6e6;">取消</view>
					<view class="f1 modalButton" @tap="_agreeRefund(true)" style="color: #039798;">立即提交</view>
				</view>
				<!-- <button class="btn-primary tui-btn-submit" hover-class="btn-hover" tap="_agreeRefund">立即提交</button> -->
			</view>
		</view>
	
		<view class="tabBar">
			<sun-tab :value.sync="current" @change="objectChange"  @touch="refreshCurrent"  :tabList="tabObjectList" rangeKey="name" activeColor="#FF7647"></sun-tab>
		</view>
		<!-- <view class="swiper banners" ></view> -->
		<swiper class="swiper banners" :indicator-dots="false" :autoplay="false" :current.sync="current" @change="_change" :skip-hidden-item-layout="true" :duration="200">
			<swiper-item class="swiper-item ">
				<OrderList  order_status="0" @refund="refund" @cancel="cancel" @sure="sure" ref="list0"></OrderList> 
			</swiper-item>
			<swiper-item class="swiper-item ">
				<OrderList order_status="1" @refund="refund" @cancel="cancel" @sure="sure" ref="list1"></OrderList>
			</swiper-item>
			<swiper-item class="swiper-item ">
				<OrderList order_status="2" @refund="refund" @cancel="cancel" @sure="sure" ref="list2"></OrderList>
			</swiper-item>
			<swiper-item class="swiper-item ">
				<OrderList  order_status="3" @refund="refund" @cancel="cancel" @sure="sure" ref="list3"></OrderList>
			</swiper-item>
			<swiper-item class="swiper-item ">
				<OrderList  order_status="4" @refund="refund" @cancel="cancel" @sure="sure" ref="list4"></OrderList>
			</swiper-item>
		</swiper>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :content="content" :maskClosable="false" color="#333" :size="32"></tui-modal>
		
	</view> 
</template>

<script>
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import OrderList from './orderList/orderList.vue';
	
	 
	export default {
		data() {
			return {
				tabObjectList: [
					//对象数组赋值
					{
						name: '全部',
						value: 0
					},
					{
						name: '待付款',
						value:1
					},
					{
						name: '待发货',
						value: 2
					},
					{
						name: '待收货',
						value:3
					},
					{
						name: '已签收',
						value: 4
					},
					
				],
				// index: 1,
				current: 0,
				modal:false,
				refundModal:false,
				currentCode:'',
				content:'确认发起退货？',
				action:'',
				ems_code:''
			};
		},
		components: {
			sunTab,
			OrderList
		},
		onLoad(options){
			if(options.current){
				this.current = parseInt(options.current) 
				// alert(this.current)
				this.$nextTick(function(){
					this.$refs[`list${this.current}`]._loadData('refresh')
				})
				
			} 
			let  that = this
			uni.$on('refresh_order',()=>{
				that._refresh()
			})
		},
		onShow(){
			that._refresh()
		},
		// 下拉刷新
		onPullDownRefresh() {	
			let k = this.current;
			// alert(k)
			this.$refs[`list${k}`]._loadData('refresh')
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},1000)		
		},
		methods:{
			_back(){
				// alert(1)
				uni.switchTab({
					url:'/pages/user/user'
				})
			},
			objectChange(e){
				// alert( e.tab.value)
				// alert(1)
				this.current =parseInt( e.tab.value)
				// this.$refs[`list${this.current}`]._loadData('refresh')
			},
			_change(event){
				this.current = parseInt(event.detail.current);
				this.$refs[`list${this.current}`]._loadData('refresh')
			},
			refreshCurrent(event){
				console.log(JSON.stringify(event))
				// let k =event.tab.value
				
				// this.$refs[`list${k}`]._loadData('refresh')
			},
			// 退款退货
			refund(item){
				// console.log(item)
				let code = item.order_code
				let  status = item.order_status
				if(status==1){
					this.action = 'refund'
					this.content = '确认发起退款退货？'
					this.currentCode= code
					this.modal = true
				}else if(status==3){
					this.currentCode= code 
					this.refundModal = true
				}
			},	
			// _refund(){
				
			// },
			// 确认收货
			sure(code){
				
				this.action = 'sure'
				this.content = '您确认要收货？'
				this.currentCode= code
				this.modal = true
			},	
			cancel(code){
				this.action = 'cancel'
				this.content = '你确认取消该订单？'
				this.currentCode= code
				this.modal = true
			},
			hide(){
				this.refundModal =  false;
				this.modal = false
			},
			handleClick(e){
				let index = e.index;
				if (index === 0) {
					// this.tui.toast("你点击了取消按钮")
					
				} else {
					if(this.action == 'refund'){
						
						this._agreeRefund(false)
					}else if(this.action == 'sure'){
					
						this._sure()
					}else if(this.action == 'cancel'){
					
						this._cancel()
					}
				}
				this.modal = false
			},
			async _agreeRefund(needEms){
				// alert(needEms)
				let that= this;
				if(  needEms && !this.ems_code){
					this.$ui.toast('请输入物流单号')
					return;
				}
				this.refundModal = false
				try {
					// this.$ui.showloading();	
					let data = {
						order_code:this.currentCode
					}
					if( needEms)data.ems_code = this.ems_code
					let res = await this.$api.ApplyRefund(data, false); 
					// this.$ui.hideloading();
					if (res.Success) {
						
						that.$ui.toast('退货申请成功')
						setTimeout(()=>{
							// that._loadData('refresh');
							that._refresh()
						},1000)
					} else {
						that.$ui.toast(res.Msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			async _sure(){
				let that= this;
				try {
					// this.$ui.showloading();	
					let data = {
						order_code:this.currentCode
					}
					let res = await this.$api.Receiving(data, false); 
					// this.$ui.hideloading();
					if (res.Success) {
						
						that.$ui.toast('收货成功')
						setTimeout(()=>{
							that._refresh()
						},1000)
					} else {
						that.$ui.toast(res.Msg)
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			async _cancel(){
				let that= this;
				try {
					// this.$ui.showloading();	
					let data = {
						order_code:this.currentCode
					}
					let res = await this.$api.CancelOrder(data, false); 
					// this.$ui.hideloading();
					if (res.Success) {
					
						that.$ui.toast('取消成功')				
						setTimeout(()=>{
							// that._loadData('refresh');
							that._refresh()
						},1000)
					} else {
						that.$ui.toast(res.Msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			_refresh(){
				// console.log('刷新');
				
				this.$refs.list0._loadData('refresh')
				this.$refs.list1._loadData('refresh')
				this.$refs.list2._loadData('refresh')
				this.$refs.list3._loadData('refresh')
				this.$refs.list4._loadData('refresh')
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		
		height: calc(100vh);
		// background: blue;
		// overflow: hidden;
		.note{
			width: 100%;
			height: 66rpx;
			line-height: 66rpx;
			color: #fff;
			background: #333;
			padding: 0 20rpx;
		}
		.tabBar {
			line-height: 72rpx;
			height: 72rpx;
			background: #fff;
			overflow: hidden;
			// position: fixed;
			// top: 0;
			left: 0;
			width: 100%;
		}
		.banners{
			width: 100%;
			height: calc(100vh - 160rpx);
			// padding-top: 150rpx;
			// background: red;
			.swiper-item{
				width: 100%;
				// height: 100%;
				height: calc(100vh - 160rpx);
				// background: #0000FF;
			}
		}
		.modalBg{
			position: fixed;
			width: 100%;
			height: 100vh;
			background: rgba(0,0,0,.6);
			z-index: 100;
			
			.tui-modal-custom {
				text-align: center;
				width:80vw;
				height: 300rpx;
				border-radius: 30rpx;
				background: #fff;
				.box{
					height: 100rpx;
					line-height: 100rpx;
				}
				.tui-prompt-title {
					padding-bottom: 20rpx;
					font-size: 34rpx;
					height: 100rpx;
					line-height: 100rpx;
				}
				.tui-input {
					border: 1rpx solid #e6e6e6;
					font-size: 32rpx;
					height: 80rpx;
					line-height: 80rpx;
					border-radius: 4rpx;
				}
				.modalButton{
					height: 100%;
					line-height: 100rpx;
					font-size: 36rpx;
				}
			}
		
			
			
		}
		
	}
</style>
