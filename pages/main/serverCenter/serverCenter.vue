<template>
	<view class="pages">
		<view class="header">
			<view class="mshBar flex flex_center">
				<view class="f1 cm_ellipsis">阿范德萨发斯蒂芬是的发送大发送到发送到发送到发送地方上的</view>
				<!-- <text class="text">查看全部</text>
				<text class="iconfont icon-fanhui3 text"></text> -->
			</view>
			<!-- <view class="marchantBox"> -->
				<view class="marchantBox flex flex_center">
					<image :src="userInfo.consumer_head" mode="aspectFill" class="avatar"></image>
					<view class="f1">
						<view style="line-height: 1.5;" class="cm_title">{{userInfo.consumer_name}}</view>
						<view style="line-height: 1.2;" class="cm_text ">工号：{{userInfo.invitation_code}}</view>
						<view style="line-height: 1.2;" class="cm_text">所属服务商：{{userInfo.consumer_name}}</view>
					</view>
				</view>
			<!-- </view> -->
			<view class="tabBar">
				<sun-tab :value.sync="current" @change="objectChange" :tabList="tabObjectList" rangeKey="name"
				 activeColor="#FF7647"></sun-tab>
			</view>	
		</view>
		
		<view class="orderBox">
			<!-- <view class="orderItems"> -->
			<navigator url="../serverDetail/serverDetail" class="orderItems">
				<view class="flex flex_center cm_bdb top">
					<view class="f1">
						上门服务时间：2018-12-2 10：10：10
					</view>
					<text class="status ">sdfads</text>
				</view>	
				<view class="content">
					<view class="cm_title">服务地址</view>
					<view class="text">工号：123421</view>
					<view class="text">所属服务商：1士大夫地方</view>
				</view>
			</navigator>
			<!-- </view> -->
		</view>
		<!-- <view v-if="list.length>0" >
			<view class="blank"></view>
			<block v-for="(item, index) in list" :key="index">
				<view class="proItemsBox  ">
					<view class="flex flex_center cm_bdb content">
						<view class="f1">
							<view class=" name">{{item.detail_remark}}</view>
							<text class="text">{{item.detail_time}}</text>
						</view>
						<text class="cm_prize ">{{detail_type==0?'+':'-'}}{{item.account_change}}</text>
					</view>				
				</view>
			</block>
			<LoadMore :status="loadStatus" />
		</view> -->
		<!-- <view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">暂无明细</tui-tips>
		</view> -->
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" content="确定该退款订单么？" :maskClosable="false" color="#333"
		 :size="32"></tui-modal>
		<!-- <tuiFab bgColor="#FF7647"></tuiFab> -->
		<view class="msgTap flex flex_center" hover-class="cm_hover_m">
				<text class="iconfont icon-xiaoxi" style="font-size: 32rpx;color: #fff;"></text>
		</view>
	</view>
</template>

<script>
	
	import {
		mapState
	} from 'vuex';
		import tuiTips from "@/components/extend/tips/tips"
	import sunTab from '@/components/sun-tab/sun-tab.vue';
	import tuiFab from '@/components/tui-fab/tui-fab';
	export default {
		data() {
			return {
				tabObjectList: [
					//对象数组赋值
					{
						name: '待派单（2）',
						value: 0
					},
					{
						name: '已完成',
						value: 1
					}
				],
				detailType1:0,
				detailType2:1,
				current: 0,
				type: 1,
				modal: false,
				currentCode: '' //当前操作的条目code
			};
		},
		computed: mapState(['hasLogin','userInfo']),
		components: {
			sunTab,
			tuiTips,
			tuiFab
		},
		onLoad(options) {
			// alert(options.type)
			this.type = options.type
			console.log(this.userInfo)
	
		},

		methods: {
			objectChange(e) {
				this.current = parseInt(e.tab.value)
			},
			_change(event) {
				this.current = parseInt(event.detail.current);
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
			.mshBar{
				height: 74rpx;
				line-height: 74rpx;
				background: #FFEDE2;
				color: #EC6D43;
				padding: 0 30rpx;
			}
			.marchantBox{
				height: 180rpx;
				padding:0 40rpx;
				background-color: #fff;
				width: 100%;
				.avatar{
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

		.orderBox{
			padding: 20rpx;
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
		.msgTap{
			width: 100rpx;
			height: 100rpx;
			background-color: var(--cl_primary);
			border-radius: 50%;
			position: fixed;
			bottom: 60rpx;
			right: 60rpx;
			box-shadow: 0 0 8rpx #2E2E2E;
		}
	}
</style>
