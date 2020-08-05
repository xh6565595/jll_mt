<template>
	<view class="pages">
		<view class="tabBar">
			<sun-tab :value.sync="current" @change="objectChange" :tabList="tabObjectList" rangeKey="name" activeColor="#FF7647"></sun-tab>
		</view>
		<view v-if="list.length>0" class="orderBox">
			<block v-for="(item, index) in list" :key="index">
				<navigator :url="'../repairDetail/repairDetail?code=' + item.task_code " class="orderItems">
					<view class="flex flex_center cm_bdb top">
						<view class="f1">上门服务时间：{{item.task_service_time}}</view>
						<text class="status ">{{item.task_service_status==1?'已完成':'待安装'}}</text>
					</view>
					<view class="content">
						<!-- <view class="cm_title">订单号：{{item.buy_name}}</view> -->
						<view class="cm_title">联系人：{{item.buy_name}}</view>
						<view class="text">联系方式：{{item.buy_phone}}</view>
						<view class="text">服务地址：{{item.buy_address}}</view>
					</view>
					<view class="footer flex flex_center">
						<tuiButton size="mini" type="default" circle>开始维修</tuiButton>
						<tuiButton  size="mini" type="error" plain circle>平台致电</tuiButton>
					</view>
				</navigator>
			</block>
			<LoadMore :status="loadStatus" />
		</view>
		 <view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">暂无明细</tui-tips>
		</view>
		<!-- <tui-modal :show="modal" @click="handleClick" @cancel="hide" content="确定该退款订单么？" :maskClosable="false" color="#333" :size="32"></tui-modal> -->
		<!-- <tuiFab bgColor="#FF7647"></tuiFab> -->
		<!-- <view class="msgTap flex flex_center" hover-class="cm_hover_m" @tap="_msg"><text class="iconfont icon-xiaoxi" style="font-size: 32rpx;color: #fff;"></text></view> -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiTips from '@/components/extend/tips/tips';
import sunTab from '@/components/sun-tab/sun-tab.vue';
import tuiFab from '@/components/tui-fab/tui-fab';
export default {
	data() {
		return {
			baseKey: 'GetUserTaskList',
			hasRow: 'Rows',
			list:[],
			formParams: {
				task_status: '0', // 0-待安装 1-已安装
				pageIndex: 1,
				pageSize: 10
			},
			tabObjectList: [
				//对象数组赋值
				{
					name: '待维修',
					value: 0
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
	computed: mapState(['userInfo','hasLogin']),
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
		let that = this 
		this._loadData('refresh');
		uni.$on('refreshCenter',()=>{
			that._loadData('refresh');
		})
	},
	onShow(){
		if(this.hasLogin){
			this._loadData('refresh');
		}
		
	},
	methods: {
		_msg(){
			uni.navigateTo({
				url:'/pages/sisMsg/sisMsg'
			})
		},
		objectChange(e) {
			this.current = parseInt(e.tab.value);
			this.formParams.task_status  = parseInt(e.tab.value);
			this._loadData('refresh')
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
									name: 	`待派单(${res.Data.count.await_count})`,
									value: 0
								},
								{
									name: `已完成(${res.Data.count.accomplish_count})`,
									value: 1
								}
						]
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
