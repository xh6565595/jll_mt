<template>
	<view>
		<scroll-view class="page" scroll-y="true" @scrolltolower="loadMore">
			<view v-if="list.length > 0">
				<block v-for="(item, index) in list" :key="index">
					<view class="proItemsBox ">
						<view class=" flex  flex_center proItemTop cm_bdb">
							<!-- <image :src="item.shop_logo" mode="widthFix" class="shopLogo"></image> -->
							<!-- <view class="f1 cm_tex_l">{{item.shop_name}}</view> -->
							<view class=" cm_tex_l">订单号：</view>
							<view class="cm_des f1">{{item.order_code}}</view>
							<view class="status">{{ item.order_status | orderStatusFilter }}</view>
						</view>
						<block v-for="(it, ind) in item.project_list" :key="ind">						
							<navigator :url="'/pages/features/order/orderDetail/orderDetail?code=' + item.order_code" class="picBox flex  flex_center">
								<!-- <view class="picBox flex  flex_center" >						 -->
								<image :src="it.skus_img" mode="aspectFill" class="avatar" lazy-load="true"></image>
								<view class="f1" >
									<view class="flex _flex_center">
										<view class="f1 cm_title   name cm_ellipsis2 tui-skeleton-fillet">{{ it.order_name }}</view>
										<view class="flex flex_center">
											<text class="iconfont icon-guanbi gray"></text>
											<text class="gray">1</text>
										</view>
									</view>
									
									<view class="special flex flex_center" style="justify-content: flex-start;">
										<!-- <tui-tag shape="circle" size="mini" type="gray" class=" stags">{{ it.skus_name }}</tui-tag> -->
										<text class="cm_des">{{ it.skus_name }}</text>
									</view>
									<view class=" tui-skeleton-fillet flex flex_center" style="margin-top: 10rpx;">
										<text class=" ">￥{{ it.alone_price }}</text>
										<view class="f1"></view>
										
									</view>
								</view>
								<!-- </view> -->
							</navigator>
						</block>
						
						<!-- <view class=" tui-skeleton-fillet flex flex_center cm_bdb" style="height: 80rpx;">
							<view class="f1">邮费：</view>
							<view class="">{{ item.is_ems?'￥'+item.is_ems:'包邮' }}</view>
						</view>
						<view class=" tui-skeleton-fillet flex flex_center cm_bdb" style="height: 80rpx;">
							<view class="f1">服务费用：</view>
							<view class="">{{ '￥'+item.service_total_price }}</view>
						</view> -->
						<view class=" tui-skeleton-fillet flex flex_center  " >
							<view class="f1"></view>
							<view class="cm_des">共 {{ item.goods_num }} 件商品</view>
							<view class=" cm_t_32  " style="margin-left: 24rpx;">合计：<text class="cm_price">￥{{ item.pay_price }}</text></view>
						</view>
						<!-- <view class="flex flex_center contentBox ">
							<view class="f1"></view>
							<button class="cm_tags primary" size="mini" v-if="item.order_status == 0" @tap="_href(item.order_code)">立即付款</button>
							<button class="cm_tags" size="mini" v-if="item.order_status == 0" @tap="_cancel(item.order_code)">取消订单</button>
							<button class="cm_tags primary" size="mini" v-if="item.order_status == 1" @tap="prompt(item.order_code)">提醒发货</button>
							<button class="cm_tags primary" size="mini" v-if="item.order_status == 2" @tap="sure(item.order_code)">确认收货</button>
							<button class="cm_tags primary" size="mini" v-if="item.order_status == 2" @tap="scan(item.order_code)">查看物流</button> 
						</view> -->
					</view>
				</block>
				<LoadMore :status="loadStatus" />
			</view>
			<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
				<tui-tips :fixed="false" imgUrl="/static/img/toast/img_noorder_3x.png">暂无订单</tui-tips>
			</view>

			<!-- <tui-modal :show="modal2" @click="handleClick" @cancel="hide" content="确定退出登录吗？" :maskClosable="false" color="#333" :size="32"></tui-modal> -->
		</scroll-view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiTips from '@/components/extend/tips/tips';
export default {
	data() {
		return {
			list: [],
			loadStatus: 'more',
			formParams: {
				order_status: '',
				pageIndex: 1,
				pageSize: 10
			},

			currentItem: '' //记录当前操作的item
		};
	},
	computed: mapState(['hasLogin']),
	components: {
		tuiTips
	},
	props: {
		//点击遮罩 是否可关闭
		order_status: {
			type: String,
			default: ''
		}
	},
	created() {
		this.formParams.order_status = this.order_status ? this.order_status : '';
		// this._loadData('refresh');
	},
	methods: {
		// 跳转
		_href(code) {
			uni.navigateTo({
				url: '/pages/features/order/orderDetail/orderDetail?code=' + code
			});
		},
		// 创建订单/
		// toPay(item){
		// 	console.log(item);

		// },
		// // 取消订单
		// cancel(code){
		// 	// console.log(item)
		// 	this.$emit('cancel',code)
		// },
		imageLoad(index) {
			this.$set(this.list[index], 'load', true);
		},
		loadError(index) {
			// console.log('图片未找到');
			this.list[index].goods_picture = '/static/img/noPic.jpg';
		},
		async prompt(code) {
			let that = this;
			try {
				let data = {
					order_code: code
				};
				this.$ui.showloading();
				let res = await this.$api.Prompt(data);
				this.$ui.hideloading();
				if (res.Success) {
					that.$ui.toast('提醒发货成功');
					that.refresh();
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		async _loadData(type, callback) {
			let that = this;
			try {
				if (type == 'refresh') {
					this.formParams.pageIndex = 1;
					// this.list = [];
				} else {
					that.loadStatus = 'loading';
				}
					// this.$ui.showloading();
				let res = await this.$api.GetOrderList(this.formParams);
				// this.$ui.hideloading();
				if (type == 'refresh') {
					// this.$ui.hideloading()
				} else {
					// that.loadStatus = 'loading'
				}
				if (res.Success) {
					if (type == 'refresh') {
						// 刷新
						that.loadStatus = 'more';
						that.list = res.Data.Rows;
						// console.log(that.list.length);
						if (res.Data.Total < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
						}
					} else {
						// console.log(res.Data.Rows.length)
						// 更多
						if (res.Data.Rows.length == 0) {
							that.loadStatus = 'noMore';
						} else {
							let arr = that.list.concat(res.Data.Rows);
							that.list = arr;
							that.loadStatus = 'more';
						}
					}
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
			// this.loadModal = false;
			// this.$ui.hideloading();
			if (callback) callback();
		},
		refresh() {
			this.formParams.pageIndex = 1;
			// this.list = [];
			this._loadData('refresh', () => {
				uni.stopPullDownRefresh();
			});
		},
		loadMore() {
			if (this.loadStatus != 'more') {
				return;
			}
			this.formParams.pageIndex += 1;
			this.loadStatus = 'loading';
			this._loadData('more', () => {
				// this.loadStatus = 'more'
			});
		},
		// 查看物流
		scan(code) {
			uni.navigateTo({
				url: '/pages/features/ems/ems?orderCode=' + code
			});
		},
		// 发起退款
		refund(item) {
			// let  data = {
			// 	action:'refund',
			// 	code:code
			// }
			// this.$emit('refund',item)
			this.$store.commit('currenPro', item);
			uni.navigateTo({
				url: '/pages/features/refundAction/refundAction'
			});
		},
		// 发起退款
		sure(code) {
			// let  data = {
			// 	action:'sure',
			// 	code:code
			// }
			this.$emit('sure', code);
		},
		// 取消订单
		_cancel(code) {
			this.$emit('cancel', code);
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	width: 100%;
	height: calc(100vh - 160rpx);
	overflow-y: scroll;
	padding: 20rpx;
	.proItemsBox{
		border-radius: 16rpx;
		overflow: hidden;
	}
}
</style>
