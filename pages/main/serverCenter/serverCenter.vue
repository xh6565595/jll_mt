<template>
	<view class="pages">
		<view class="header">
			<view class="mshBar flex flex_center">
				<view class="f1 cm_ellipsis">{{ msg }}</view>
				<!-- <text class="text">查看全部</text>
				<text class="iconfont icon-fanhui3 text"></text> -->
			</view>
			<!-- <view class="marchantBox"> -->
			<view class="marchantBox flex flex_center">
				<image :src="userInfo.consumer_head" mode="aspectFill" class="avatar"></image>
				<view class="f1">
					<view style="line-height: 1.5;" class="cm_title">{{ userInfo.consumer_name }}</view>
					<view style="line-height: 1.2;" class="cm_text ">工号：{{ userInfo.serviceInfo.service_num }}</view>
					<view style="line-height: 1.2;" class="cm_text">所属服务商：{{ userInfo.serviceInfo.service_name }}</view>
				</view>
			</view>
			<!-- </view> -->
			<view class="tabBar"><sun-tab :value.sync="current" @change="objectChange" :tabList="tabObjectList" rangeKey="name" activeColor="#FF7647"></sun-tab></view>
		</view>
		
		<view v-if="list.length>0" class="orderBox">
			<block v-for="(item, index) in list" :key="index">
				<navigator :url="'../serverDetail/serverDetail?code=' + item.task_code " class="orderItems">
					<view class="flex flex_center cm_bdb top">
						<view class="f1">上门服务时间：{{item.task_service_time}}</view>
						<text class="status ">{{item.task_service_status==1?'已完成':'待安装'}}</text>
					</view>
					<view class="content">
						<view class="cm_title">联系人：{{item.buy_name}}</view>
						<view class="text">联系方式：{{item.buy_phone}}</view>
						<view class="text">服务地址：{{item.buy_address}}</view>
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
		<view class="msgTap flex flex_center" hover-class="cm_hover_m" @tap="_msg"><text class="iconfont icon-xiaoxi" style="font-size: 32rpx;color: #fff;"></text></view>
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
					name: '待派单',
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
	padding-top: 326rpx;
	.header {
		position: fixed;
		left: 0;
		top: 0;
		.mshBar {
			height: 74rpx;
			line-height: 74rpx;
			background: #ffede2;
			color: #ec6d43;
			padding: 0 30rpx;
		}
		.marchantBox {
			height: 180rpx;
			padding: 0 40rpx;
			background-color: #fff;
			width: 100%;
			.avatar {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				margin-right: 30rpx;
			}
		}
	}

	.tabBar {
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
