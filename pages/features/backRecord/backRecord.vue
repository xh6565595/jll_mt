<template>
	<view class="page">
		<!-- <scroll-view class="page" scroll-y="true" @scrolltoupper="refresh" @scrolltolower="loadMore"> -->
		<view v-if="list.length>0">
			<view class="blank"></view>
			<block v-for="(item, index) in list" :key="index">
				<view class="proItemsBox  ">
					<View class="proTitle">{{item.settle_time}}</View>
					<View class="proText">订单号：{{item.busi_code}}</View>
					<view class="flex flex_center  content">
						<view class="f1">
							<view class=" name">{{item.project_name}}</view>
							<text class="text">{{item.before_price_test}}</text>
						</view>
						<text class="cm_prize ">{{item.settle_price}}</text>
					</view>

				</view>
			</block>
			<LoadMore :status="loadStatus" />
		</view>
		<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">暂无明细</tui-tips>
		</view>

		<!-- <tui-modal :show="modal2" @click="handleClick" @cancel="hide" content="确定退出登录吗？" :maskClosable="false" color="#333" :size="32"></tui-modal> -->
		<!-- </scroll-view> -->

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import tuiTips from "@/components/extend/tips/tips"
	export default {
		data() {
			return {
				list: [],
				loadStatus: 'more',
				formParams: {
					// "detail_type": 0,
					"pageIndex": 1,
					"pageSize": 10,
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
			detail_type: {
				type: Number,
				default: 0
			},
		},
		onLoad(options) {
			this.formParams.order_code = options.code
			this._loadData('refresh')
		},
		onReachBottom() {
			this.loadMore()
		},
		onPullDownRefresh() {
			this.refresh()
		},
		methods: {
			imageLoad(index) {
				this.$set(this.list[index], 'load', true);
			},
			loadError(index) {
				// console.log('图片未找到');
				this.list[index].goods_picture = '/static/img/noPic.jpg';
			},
			async _loadData(type, callback) {

				let that = this
				try {
					if (type == 'refresh') {
						// this.$ui.showloading()
					} else {
						that.loadStatus = 'loading'
					}
					// console.log(JSON.stringify(this.formParams))
					let res = await this.$api.rebackList(this.formParams);
					// console.log(res)
					if (type == 'refresh') {
						// this.$ui.hideloading()
					} else {
						// that.loadStatus = 'loading'
					}
					if (res.Success) {

						if (type == 'refresh') {
							// 刷新
							that.loadStatus = 'more'
							that.list = res.Data.Rows
							if (res.Data.Total < that.formParams.pageSize) {
								that.loadStatus = 'noMore'
							}
						} else {
							// console.log(res.Data.Rows.length)
							// 更多
							if (res.Data.Rows.length == 0) {
								that.loadStatus = 'noMore'
							} else {
								let arr = that.list.concat(res.Data.Rows);
								that.list = arr;
								that.loadStatus = 'more'
							}

						}


					} else {

						that.$ui.toast(res.Msg)
					}
				} catch (err) {
					console.log('请求结果false : ' + err)
				}
				// this.loadModal = false;
				// this.$ui.hideloading();
				if (callback) callback()
			},
			refresh() {
				// this.formParams.pageIndex = 1;
				// this.list = []
				// this._loadData('refresh', () => {
				// 	uni.stopPullDownRefresh();
				// })
			},
			loadMore() {
				if (this.loadStatus != 'more') {
					return;
				}
				this.formParams.pageIndex += 1;
				this.loadStatus = 'loading'
				this._loadData('more', () => {
					// this.loadStatus = 'more'
				})
			},
			// 查看退款
			scanTranfer() {

			}

		}
	};
</script>

<style lang="scss" scoped>
	.page {
		width: 100%;
		padding: 20rpx;

		.blank {
			width: 100%;
			height: 16rpx;
			background: #f8f8f8;
		}

		.proItemsBox {
			width: 100%;
			background: #fff;
			padding: 20rpx;
			border-radius: 20rpx;

			.proTitle {
				    line-height: 70rpx;
				    color: #666;
				    font-size: 28rpx;
				    font-weight: 600;
				    border-bottom: 1rpx solid #f8f8f8;
				    margin-bottom: 20rpx;
			}

			.content {
				padding: 20rpx 0;

				.name {
					margin-bottom: 16rpx;
					font-size: 28rpx;
					max-height: 80rpx;
					line-height: 1;
					margin-top: 12rpx;
				}

				.text {
					line-height: 1;
					height: 58rpx;
					border: none;
					color: #999;
					// padding: 0;
					font-size: 26rpx;
					// border-radius: 8rpx;
				}

				.cm_prize {
					font-size: 32rpx;
					color: #E02E24;
					font-weight: 600;
				}
			}

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
