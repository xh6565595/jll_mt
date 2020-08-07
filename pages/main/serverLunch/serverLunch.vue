<template>
	<view class="pages">
		<view class="tabBar">
			<sun-tab :value.sync="current" @change="objectChange" :tabList="tabObjectList" rangeKey="name" activeColor="#FF7647"></sun-tab>
		</view>
		<view v-if="list.length > 0" class="orderBox">
			<block v-for="(item, index) in list" :key="index">
				<!-- <navigator :url="'../installMsg/installMsg?code=' + item.task_code " class="orderItems"> -->
				<view class="orderItems" >
					<view class="flex flex_center cm_bdb top">
						<view class="f1">服务时间：{{ item.booking_time }}</view>
						<text class="status ">{{ item.task_service_status | install_statusFilter }}</text>
					</view>
					<view class="content" @tap="_scanCode(item)">
			
						<view class="flex flex_center listItems">
							<text  class="text">安装编号：</text>
							<view class="f1 cm_ellipsis">{{ item.task_code }}</view>
						</view>
						<!-- <view class="flex flex_center listItems">
							<text  class="text">设备编号：</text>
							<view class="f1 cm_ellipsis">{{ item.device_num }}</view>
						</view> -->
						<view class="flex flex_center listItems " v-if="item.task_service_status!=1">
							<text  class="text">预约人：</text>
							<view class="f1"> {{ item.booking_user }} </view>
						</view>
						<view class="flex flex_center listItems " v-if="item.task_service_status!=1">
							<text  class="text">联系方式：</text>
							<view class="f1"> {{ item.booking_mobile }} </view>
						</view>
						<view class="flex flex_center listItems last" v-if="item.task_service_status!=1">
							<text  class="text">安装地址：</text>
							<view class="f1">{{ item.task_service_add }}</view>
						</view>
						<view class="flex flex_center listItems " >
							<text  class="text">派单时间：</text>
							<view class="f1"> {{ item.task_create_time }} </view>
						</view>
						<view class="flex flex_center listItems "  v-if="item.task_service_status!=2">
							<text  class="text">开始时间：</text>
							<view class="f1"> {{ item.service_begin_time }} </view>
						</view>
						<view class="flex flex_center listItems "  v-if="item.task_service_status==1">
							<text  class="text">结束时间：</text>
							<view class="f1"> {{ item.service_end_time }} </view>
						</view>
					</view>
					<view class="footer flex flex_center">
						<view class="f1"></view>
						<tuiButton size="mini"   type="primary"  style="margin-right: 10rpx;" v-if="item.task_service_status!=1"  @tap="_scanCode(item)">{{item.task_service_status==2?'扫描设备':'立即安装'}}</tuiButton>
						<tuiButton size="mini"   type="default" style="margin-right: 10rpx;"  v-if="item.task_service_status!=1"   @tap="_call(item.booking_mobile)">致电预约人</tuiButton>
						<tuiButton size="mini" type="default"    @tap="_call('')">平台致电</tuiButton>
					</view>
				</view>
			</block>
			<LoadMore :status="loadStatus" />
		</view>
		<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else><tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">暂无明细</tui-tips></view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiTips from '@/components/extend/tips/tips';
import sunTab from '@/components/sun-tab/sun-tab.vue';
import tuiFab from '@/components/tui-fab/tui-fab';
const {service_mobile}  = uni.getStorageSync('global_Set_jll')
export default {
	data() {
		return {
			baseKey: 'GetUserTaskList',
			hasRow: 'Rows',
			list: [],
			formParams: {
				task_status: 2, // 0-待安装 1-已安装
				pageIndex: 1,
				pageSize: 10
			},
			installParams:{
				order_code: '',
				device_num: ''
			},
			tabObjectList: [
				//对象数组赋值
				{
					name: '待安装',
					value: 2
				},
				{
					name: '已完成',
					value: 1
				}
			],
			detailType1: 0,
			detailType2: 1,
			current: 0,
			type: 1,
			modal: false,
			msg: '',
			currentCode: '' //当前操作的条目code
		};
	},
	computed: mapState(['userInfo', 'hasLogin']),
	onPullDownRefresh() {
		this.formParams.pageIndex = 1;
		this.list = [];
		this._loadData('refresh');
	},
	// 上拉加载
	onReachBottom() {
		console.log(this.loadStatus);
		if (this.loadStatus == 'noMore') {
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading';
		this._loadData('add');
	},
	components: {
		sunTab,
		tuiTips,
		tuiFab
	},
	onLoad(options) {
		// alert(options.type)
		let that = this;
		this._loadData('refresh');
		uni.$on('refreshCenter', () => {
			that._loadData('refresh');
		});
	},
	onShow() {
		if (this.hasLogin) {
			this._loadData('refresh');
		}
	},
	methods: {
		_call(num){
			// console.log(num)
			uni.makePhoneCall({
				phoneNumber:num?num:service_mobile
			})
		},
		// 类型切换
		objectChange(e) {
			
			this.formParams.task_status = parseInt(e.tab.value);
			console.log(e.tab)
			let k = e.tab.value;
			if(k==2){
				this.current = 0;
			}
			
			this._loadData('refresh');
		},
		//扫码
		_scanCode(item) {
			let oid = item.order_code;
			let status = item.task_service_status
			let that = this;
			this.installParams.order_code = oid;
			
			if(status==3|| status == 1){
				uni.navigateTo({
					url:'/pages/main/serverDetail/serverDetail?code='+ oid
				})
			}else if(status==2){
				this.$ui.showloading();
				uni.scanCode({
					onlyFromCamera: true,
					scanType: ['qrCode'],
					success: function(res) {
						let result = res.result;
						let s = result.match(/mtId=(.*)mtId/);
						// console.log(s)
						// return;
						if (result && s && s[1]) {
							that.installParams.device_num = s[1];
							that._checkInstall();
						} else {
							uni.showModal({
								title: '智能厨卫提醒您',
								content: '未找到设备相关的订单信息',
								showCancel: false,
								success(e) {
									// uni.navigateBack({});
								}
							});
						}
					},
					fail: function() {
						uni.showModal({
							title: '智能厨卫提醒您',
							content: '请将二维码放在扫描框内',
							showCancel: false,
							success(e) {
								// uni.navigateBack({});
							}
						});
					},
					complete() {
						that.$ui.hideloading();
					}
				});
			}
			
		},
		// 校验安装
		// 校验机器
		async _checkInstall() {
			let that = this;
			this.$ui.showloading()
			// that.installParams = {
			// 	device_num:'gb-25',
			// 	order_code:'J72202008041143485771002'
			// }
			let res = await this.$api.CheckInstall(this.installParams, false);
			this.$ui.hideloading();		
		
			if (res.Success) {		
				// that.install_info = res.Data	
				uni.setStorageSync('installMsg',res.Data);
				uni.navigateTo({
					url:'/pages/main/installMsg/installMsg?device='+ this.installParams.device_num
				})
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
		},
		async _loadData(type) {
			let that = this;
			try {
				let res = await this.$api.GetUserTaskList(this.formParams, false);
				// console.log(res);
				if (type == 'add') {
					that.loadStatus = 'loading';
				} else {
					uni.stopPullDownRefresh();
				}
				if (res.Success) {
					if (type == 'add') {
						that.list = that.list.concat(res.Data.list.Rows);
						if (res.Data.list.Rows.length < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
							// 没有数据了
						} else {
							that.loadStatus = 'more';
						}
					} else {
						// 刷新
						that.list = res.Data.list.Rows;
						if (res.Data.list.Rows.length < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
							// 没有数据了
						} else {
							that.loadStatus = 'more';
						}
						that.refreshing = false;
						that.msg = res.Data.info;
						that.tabObjectList = [
							{
								name: `待安装(${res.Data.count.await_count})`,
								value: 2
							},
							{
								name: `已完成(${res.Data.count.accomplish_count})`,
								value: 1
							}
						];
					}
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
				that.loadStatus = 'more';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding-top: 72rpx;
	.tabBar {
		position: fixed;
		left: 0;
		top: 0;
		line-height: 72rpx;
		height: 72rpx;
		background: #fff;
		overflow: hidden;
		width: 100vw;
		z-index: 100;
	}

	.orderBox {
		padding: 20rpx;
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
					color: #666;
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
			.footer{
				height: 80rpx;
				line-height: 80rpx;
			}
		}
	}
	.msgTap {
		width: 100rpx;
		height: 100rpx;
		background-color: var(--cl_primary);
		border-radius: 50%;
		position: fixed;
		bottom: 60rpx;
		right: 60rpx;
		box-shadow: 0 0 8rpx #2e2e2e;
	}
}
</style>
