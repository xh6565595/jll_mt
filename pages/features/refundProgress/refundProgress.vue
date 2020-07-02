<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<!-- <view class="status">{{ item.audit_status | auditStatusFilter }}</view> -->
			<view class="proItemsBox ">
				<view class="picBox">
					<view class=" flex  flex_center " style="align-items: flex-start;">
						<!-- <view class="picBox flex  flex_center" >						 -->
						<image :src="item.project_img" mode="aspectFill" class="avatar" lazy-load="true"></image>
						<view class="f1">
							<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{ item.project_name }}</view>
							<view class="cm_des flex flex_center" style="justify-content: flex-start;">
								<tui-tag shape="circle" size="mini" type="gray" class=" stags">{{ item.project_sku }}</tui-tag>
							</view>

							<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;">
								<text class="">退款金额：{{ item.apply_price }}</text>
								<view class="f1"></view>
								<text class="">{{ item.refund_type | refundTypeFilter}}</text>
								<!-- <view class="cm_des">
									<Icon name="shut" :size="14" color="#999"></Icon>
									{{ item.project_num }}
								</view> -->
							</view>
						</view>
						<!-- </view> -->
					</view>
				</view>
			</view>
			<view class="box">
				<block v-for="(item, index) in scheduleList" :key="index">
					<view class="cells flex flex_center" >
						<view class="aside flex flex_start">
							<view class="icon" >{{index+1}}</view>
						</view>
						<view class="f1">
							<view class="flex flex_center top">				
								<view class="f1 title " >{{item.record_step}}</view>
								<view class="cm_des">{{item.operation_time}}</view>
							</view>
							<view class="cm_des bottom cm_bdb">
								{{item.operation_content}}
							</view>
						</view>					
					</view>
					
				</block>
			</view>
			<view class="flex flex_center" style="padding: 20rpx;">
				<tui-button type="primary" shape="circle"  :loading="loading" @tap="_phone">联系卖家</tui-button>
				<!-- <tui-button type="primary" :plain="true" shape="circle" :loading="loading" @tap="_hide">取消</tui-button> -->
			</view>
		</view>
	</view>
</template>

<script>
import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
import tuiListView from '@/components/list-view/list-view';
import tuiListCell from '@/components/list-cell/list-cell';
import Utils from '@/utils/utils.js';
const global_Set_jll =  uni.getStorageSync('global_Set_jll')
export default {
	data() {
		return {
			item: '',
			loading: false,
			scheduleList: [],
			skeletonShow: true,
			formParams: {
				"refund_code": ""
			},
		};
	},
	onLoad(options) {
		this.formParams.refund_code = options.code;
		this.loadData();
	},
	components: {
		tuiListCell,
		tuiSkeleton,
		tuiListView
	},
	methods: {
		_phone(){
			// 客服热线
				uni.showModal({
					title: '提示',
					content: '是否确定拨打商家电话',
					success: function(res) {
						if (res.confirm) {
							uni.makePhoneCall({
								phoneNumber: global_Set_jll.service_mobile //仅为示例
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
		},
	
		
		async loadData(callback) {
			let that = this;
			try {
				// this.$ui.showloading();

				let res = await this.$api.GetRefundOrderInfo(this.formParams, false);
				// this.$ui.hideloading();
				console.log(res);
				if (res.Success) {
					if (res.Data) {
						that.item = res.Data.refundModel;
						that.scheduleList = res.Data.scheduleList;
					}
					that.skeletonShow = false;
				} else {
					that.$ui.toast(res.Msg);
				}
				if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding-bottom: 100rpx;
	.status {
		line-height: 76rpx;
		background: #50ab9f;
		color: #fff;
		text-align: center;
	}
	.picBox {
		margin-bottom: 0;
		.avatar {
			width: 160rpx;
			height: 160rpx;
		}
	}
	.textarea {
		height: 150rpx;
		margin-top: 24rpx;
	}
	.container {
		padding: 0 20rpx;
	}
	.box {
		margin-top: 20rpx;
		background: #fff;
		padding: 20rpx;
		.cells{
			height: 140rpx;
			margin-top: 16rpx;
			position: relative;
			.aside{
				width: 64rpx;
				height: 140rpx;
				.icon{
					width: 40rpx;
					height: 40rpx;
					border-radius: 50%;
					background: #999;
					color: #fff;
					display: block;
					text-align: center;
					line-height: 40rpx;
				}
			}
			.top{
				// height: 88rpx;
				margin-bottom: 20rpx;
				height: 40rpx;
				.title{
					color:#999; 
					font-size: 32rpx;
				}
			}
			.bottom{
				height: 80rpx;
			}
			&::before{
				content: '';
				position: absolute;
				width: 4rpx;
				height: 80rpx;
				background: var(--cl_primary);
				left: 18rpx;
				bottom: 0;
			}
			&:last-child{
				.title{
					color:var(--cl_primary); 
					font-size: 32rpx;
				}
				.cm_des{
					color:var(--cl_primary); 
				}
				.icon{
					background: var(--cl_primary);
				}
				&::before{
					content: '';
					position: absolute;
					width: 0;
					height: 0;
				}
			}
		}
		
		
	}
	
}
</style>
