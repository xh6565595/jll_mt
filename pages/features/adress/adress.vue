<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<view v-if="list.length > 0">
				<block v-for="(item, index) in list" :key="index">
					<view class="cardItems flex flex_center ">
						<view class="leftBar flex flex_center tui-skeleton-rect" @tap="_setDefault(item)">
							<image v-if="item.status == 1" src="../../../static/img/wl_xz.png" mode="scaleToFill" style="width: 32rpx;height: 32rpx;"></image>
							<!-- <image src="../../../static/img/wl_xz.png" mode="scaleToFill" style="width: 32rpx;height: 32rpx;"></image> -->
							<text v-else class="noDefault"></text>
						</view>
						<view class="f1 content" @tap="_action(item)">
							<view class="flex flex_center top tui-skeleton-fillet">
								<text class="cm_title" style="margin-right: 30rpx;">{{ item.receiving_user }}</text>
								<text class="cm_text f1">{{ item.receiving_mobile }}</text>
							</view>
							<view class="cm_des tui-skeleton-fillet">{{ item.detailed_address }}</view>
						</view>
						<view class="rightBar flex flex_center" @tap="delect(item)">
							<text class="iconfont icon-guanbi"></text>
						</view>
					</view>
				</block>
			</view>
			<!-- <view v-else class="cm_tex_c" style="line-height: 160rpx;">您还没有地址</view> -->
			<view v-else class="flex flex_center" style="width: 100%;height: 30vh; padding-top: 30rpx;">
				<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">您还没有地址信息</tui-tips>
			</view>
			<view style="padding:  30rpx;">
				<navigator url="/pages/features/newAdress/newAdress">
					<tui-button type="primary" shape="circle" :disabled="false" :loading="loading">
						<view class="flex flex_center cm_title" style="width: 100%;height:100%;color: #fff;">
							新建地址
							<text class="iconfont icon-biji" style="color: #fff;"></text>
						</view>
					</tui-button>
				</navigator>
			</view>
			<tui-modal :show="modal" @click="handleClick" @cancel="hide" content="确定删除地址？" :maskClosable="false" color="#333" :size="32"></tui-modal>
		</view>
	</view>
</template>

<script>
import tuiTips from '@/components/extend/tips/tips';

import { mapState } from 'vuex';
export default {
	data() {
		return {
			action: '', //动作标记
			list: [],
			formParams: {
				pageIndex: 1,
				pageSize: 100
			},
			// loadStatus:'more',
			loading: false,
			currentCode: '',
			modal: false,
			skeletonShow:true
		};
	},
	computed: mapState(['hasLogin']),
	components: {
		tuiTips
	},
	onLoad(options) {
		let that = this;
		let type = options.action;
		if (type == 'switch') {
			// 确认拍品选择地址
			this.action = 'switch';
		}
		this._loadData('refresh');
		uni.$on('refresh_address', () => {
			that._loadData();
		});
	},

	methods: {
		// 动作
		_action(item) {
			switch (this.action) {
				case 'switch':
					uni.$emit('refresh_sureAuction', item);
					uni.navigateBack({});
					break;
				default:
					break;
			}
		},
		// 设置默认
		async _setDefault(item) {
			let that = this;
			try {
				let data = {
					address_code: item.address_code
				};
				uni.showLoading({});
				let res = await this.$api.DefaultAddress(data, false);
				this.$ui.hideloading();
				if (res.Success) {
					that.$ui.toast('设置成功');
					setTimeout(() => {
						that._loadData('refresh');
						// that.refresh()
					}, 1000);
				} else {
					that.$ui.toast(res.Msg);
				}
				if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		//
		async _loadData(type, callback) {
			let that = this;
			try {
				this.$ui.showloading();
				let res = await this.$api.GetAddressList(this.formParams);
				this.$ui.hideloading();
				if (res.Success) {
					that.list = res.Data.Rows;
					that.skeletonShow = false
				} else {
					this.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
			// this.loadModal = false;
			// this.$ui.hideloading();
			if (callback) callback();
		},
		// 删除地址
		delect(item) {
			this.modal = true;
			this.currentCode = item.address_code;
		},
		handleClick(e) {
			let index = e.index;
			if (index === 0) {
				// this.tui.toast("你点击了取消按钮")
			} else {
				// this.tui.toast("你点击了确定按钮")
				this._delect();
			}
			this.modal = false;
		},
		async _delect(callback) {
			let that = this;
			try {
				// this.$ui.showloading();
				let data = {
					address_code: this.currentCode
				};
				let res = await this.$api.addressDel(data, false);
				// this.$ui.hideloading();
				if (res.Success) {
					uni.$emit('refresh_addressList');
					that.$ui.toast('删除成功');
					that.currentCode = '';
					setTimeout(() => {
						that._loadData('refresh');
						// that.refresh()
					}, 1000);
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
	.cardItems {
		background: #fff;
		margin-top: 16rpx;

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

		.rightBar {
			width: 92rpx;
			height: 92rpx;
		}

		.content {
			padding: 34rpx 0;

			.top {
				margin-bottom: 20rpx;
			}

			.cm_des {
				line-height: 1.2;
			}
		}
	}
}
</style>
