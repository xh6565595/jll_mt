<template>
	<view class="pages">
		<view class="header flex flex_center" >
			<cu-custom :isBack="false">
				<!-- <block slot="backText"></block> -->
				<block slot="content">
					<view class=" f1 flex flex_center">
						<!-- <Icon name="search" :size="20" color="#CBCBCB"></Icon> -->
						<image src="http://h5.gllo.com.cn/upload/head/jjl.png" mode="widthFix" style="width: 64rpx;height: 64rpx;border-radius: 50%;margin:0 20rpx;"></image>
						<div class="f1 cm_title">洁利来智能厨卫</div>
					</view>
				</block>
				<block slot="right" ><view class="btns flex flex_center" @click="_clear">删除</view></block>
			</cu-custom>
		</view>
		<view v-if="hasLogin">
			
			<block v-for="(item, index) in list" :key="index">
				<!-- <navigator :url="'/pages/main/details/details?code=' + item.project_code" class="proItemsBox"> -->
				<view class="proItemsBox">
					<!-- <view class="flex flex_center">
						<image :src="item.shop_logo" mode="" class="shopIcon"></image>
						<view class="cm_title f1">{{ item.shop_name }}</view>
						<Icon name="arrowright" :size="16"></Icon>
					</view> -->
					<view class="flex flex_center contenBox">
						<!-- <navigator :url="'/pages/main/details/details?code=' + item.project_code" class="flex flex_center contenBox"> -->
						<view class="checkBox" @tap="_check(item)">
							<Icon name="circle-fill" :size="16" color="#039798" v-if="item.checked"></Icon>
							<Icon name="circle" :size="16" v-else></Icon>
						</view>
						<navigator :url="'/pages/main/details/details?code=' + item.project_code" class="f1 flex flex_center " style="align-items: flex-start;">
							<!-- <view class="f1 flex flex_center " style="align-items: flex-start;"> -->
								<view class="picBox  flex flex_center">
									<image
										@load="imageLoad(index)"
										@error="loadError(index)"
										lazy-load="true"
										:src="item.project_img.split(',')[0]"
										mode="aspectFill"
										class="pre animated"
										:class="item.load ? 'fadeIn' : ''"
									></image>
								</view>

								<view class="msgBox f1">
									<view class=" cm_ellipsis2  " style="line-height: 1.3;height: 72rpx;">
										<!-- <text class="cm_t_20 tags" v-if="item.is_ems == 0">包邮</text> -->
										{{ item.project_name }}
									</view>
									<view class="cm_des">{{ item.project_spec.difference }}</view>
									<view class="cm_prize" style="margin-top: 20rpx;">
										￥{{ item.project_parameter_type == 1 ? item.project_spec.price : item.project_raise_price }}
									</view>
								</view>
							<!-- </view> -->
						</navigator>
					</view>
					<!-- </navigator> -->
					<view class="flex flex_center">
						<view></view>
						<view class="f1"></view>
						<tuiNumberbox :min="1" :value="item.project_num" data-key="index" @change="change($event, index)"></tuiNumberbox>
					</view>
					<!-- </navigator> -->
				</view>
			</block>

			<view class="footer  flex flex_center animated fadeIn" v-if="list.length > 0">
				<view class=" flex flex_center">
					<Icon name="circle-fill" :size="16" color="#039798" v-if="sellectAll" @tap="selectAll(false)"></Icon>
					<Icon name="circle" :size="16" @tap="selectAll(true)" v-else></Icon>
					<text style="margin-left: 20rpx;" v-if="sellectAll" @tap="selectAll(false)">全不选</text>
					<text style="margin-left: 20rpx;" v-else @tap="selectAll(true)">全选</text>
				</view>
				<view class="f1"></view>
				<view class=" flex flex_center">
					<text style="margin-right: 20rpx;">合计:</text>
					<text class="cm_prize">￥{{ payprice }}</text>
					<button class="submit" @tap="submit">结算</button>
				</view>
			</view>
			<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
				<tui-tips :fixed="false" imgUrl="/static/img/toast/none.png">
					还没有商品哟
					<navigator open-type="switchTab" url="../main/main">
						<tui-button type="primary" shape="circle" size="mini" style="transform: scale(0.9);margin-top: 20rpx;">去逛逛</tui-button>
					</navigator>
				</tui-tips>
			</view>
		</view>
		<view v-else class="modal flex flex_y flex_center">
			<text class="cm_des" style="margin-bottom: 20rpx;">您尚未登录</text>
			<navigator url="/pages/role/login/login"><tui-button type="primary" size="mini" shape="circle">立即登录</tui-button></navigator>
		</view>
	</view>
</template>

<script>
// 	[{
// 		"cart_code": "778b0da4b08f41049724e9e81866d305",
// 		"create_time": "2020-01-13 15:30:50",
// 		"cart_user": "1de1b2e336314c54a42da2d7b2e4cf87",
// 		"shop_name": "全绒睡衣旗舰店",
// 		"shop_logo": "http://hp.fjhjc.net/upload/head/head.jpg",
// 		"prioject_code": "420c8edbb3594c338483d1859ff61621",
// 		"project_num": 1,
// 		"project_name": "睡衣裤全绒",
// 		"project_price": 80,
// 		"project_img": "http://hp.fjhjc.net/upload/cmslinkimage/products/5B4379ED1B85E3B94718CC8CAFE62157_original.JPG",
// 		"is_ems": "0",
// 		"project_status": "1"
// 	}],
// 购物车
import tuiTips from '@/components/extend/tips/tips';
import tuiNumberbox from '@/components/numberbox/numberbox';
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			list: [],
			formParams: {
				key: '',
				type: 4,
				pageIndex: 1,
				pageSize: 10
			}
			// selectProducts: []
		};
	},
	components: {
		tuiNumberbox,
		tuiTips
	},
	onLoad() {
		let that = this;
		// const global_Set_jll = uni.getStorageSyglobal_Set_jll_Set_jll');
		// this.banners = global_Set_jll.banerList;
		uni.$on('refresh_cart', () => {
			if (this.hasLogin) {
				this._loadData('refresh');
			}
		});
		if (this.hasLogin) {
			this._loadData('refresh');
		}
	},
	onShow() {
		// if (this.hasLogin) {
		// 	this._loadData('refresh');
		// }
	},
	onNavigationBarButtonTap(e) {
		// console.log(e.index);
		
	},
	computed: {
		
		hasLogin() {
			return this.$store.state.hasLogin ? this.$store.state.hasLogin : false;
		},
		// 全选判断
		sellectAll() {
			let b = this.list.every(item => {
				if (item.checked) {
					return true;
				} else {
					return false;
				}
			});
			return b;
		},
		// 全部金额
		payprice() {
			let p = 0;
			this.list.forEach(item => {
				if (item.checked) {
					if (item.project_parameter_type == 1) {
						p += Number(item.project_spec.price * item.project_num);
					} else {
						p += Number(item.project_price * item.project_num);
					}
				}
			});
			return p.toFixed(2);
		},
		// 选择的数组
		selectProducts() {
			let s = [];
			this.list.forEach(item => {
				if (item.checked) {
					s.push(item);
				}
			});
			return s;
		}
	},
	watch: {
		hasLogin(newValue, oldValue) {
			// console.log(oldValue)
			// console.log(newValue)
			this._loadData('refresh');
			// this.loadData();
		}
	},
	methods: {
		_clear(){
			if (!this.hasLogin) {
				this.$ui.toast('请您先登录');
				return;
			}
			// alert(1)
			this._delete();
		},
		// 修改值
		change(event, index) {
			// console.log(event,index)
			this.list[index].project_num = event.value;
		},
		// 删除购物车
		async _delete() {
			if (this.selectProducts.length == 0) {
				this.$ui.toast('请选择商品');
				return;
			}
			let that = this;
			let s = [],
				data = {};
			this.selectProducts.forEach(item => {
				s.push(item.cart_code);
			});
			data.cart_code = Object.values(s).join(',');
			try {
				console.log(data);
				let res = await this.$api.cardDelete(data, false);
				// this.$ui.hideloading()
				console.log(res);
				if (res.Success) {
					that.$ui.toast('删除成功');
					that._loadData('refresh');
				} else {
					that.$ui.toast(res.Msg);
				}
				// if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		selectAll(k) {
			this.list.forEach(item => {
				item.checked = k;
			});
		},
		_check(item) {
			item.checked = !item.checked;
		},
		imageLoad(index) {
			this.$set(this.list[index], 'load', true);
		},
		loadError(index) {
			// console.log('图片未找到');
			this.list[index].project_img = '/static/img/noPic.jpg';
		},
		// 加载购物车
		async _loadData(type, callback) {
			let that = this;
			try {
				if (type == 'refresh') {
					// this.list = [];
					// that.loadStatus = 'loading';
				} else {
					that.loadStatus = 'loading';
				}
				this.$ui.showloading();
				let res = await this.$api.cardList({
					pageIndex: 1,
					pageSize: 100
				});
				this.$ui.hideloading();
				if (type == 'refresh') {
					// this.$ui.hideloading()
				} else {
					// that.loadStatus = 'loading'
				}
				console.log(res);
				if (res.Success) {
					if (type == 'refresh') {
						// 刷新
						that.loadStatus = 'more';
						that.list = that.filerArray(res.Data.Rows);
						// console.log(that.list);
					} else {
						// console.log(res.Data.Rows.length);
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
				if (callback) callback();
			}
			// this.loadModal = false;
			// this.$ui.hideloading();
			if (callback) callback();
		},
		//格式化数组
		filerArray(arr) {
			// debugger
			let a = [];
			let aa = arr.map(item => {
				item.checked = true;
				a.push(item);
			});
			// console.log(aa);
			return a;
		},
		// 结算提交订单
		submit() {
			if (this.payprice == 0) {
				this.$ui.toast('请选择商品');
				return false;
			}
			uni.showToast({
				icon: 'none',
				title: '去结算'
			});
			this.$store.commit('creatOrder', this.selectProducts);
			console.log(this.selectProducts);
			uni.navigateTo({
				url: '/pages/features/createOrder/createOrder?type=1'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding-top: 88rpx;
	.header {
		width: 100%;
		line-height: 88rpx;
		height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		position: fixed;
		background: #fff;
		z-index: 10;
		left: 0;
		top: 0;
		padding: 0 20rpx;
		// padding: 0 20rpx;
		.searchBar {
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			background: #fff;
			padding: 0 40rpx;
			margin: 0 20rpx;
		}
		.btns {
			width: 88rpx;
			height: 88rpx;
			color: #333;
			.iconfont {
				font-size: 44rpx;
			}
		}
	}
	.proItemsBox {
		width: 100%;
		// height: 532rpx;
		background: #fff;
		border-radius: 14rpx;
		margin-top: 16rpx;
		padding: 30rpx 20rpx;
		overflow: hidden;
		.shopIcon {
			width: 36rpx;
			height: 36rpx;
			border-radius: 50%;
			margin-right: 8rpx;
		}
		.contenBox {
			margin-top: 20rpx;
			.checkBox {
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.picBox {
				width: 158rpx;
				height: 158rpx;
				overflow: hidden;
				position: relative;
				margin-right: 20rpx;
				border-radius: 20rpx;

				.pre {
					width: 158rpx;
					height: 158rpx;
					overflow: hidden;
					opacity: 0;
				}
			}
			.msgBox {
				// padding: 16rpx;
				.tags {
					background: red;
					color: #fff;
					padding: 0 8rpx;
					border-radius: 4rpx;
					font-size: 20rpx;
					line-height: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
					margin-top: -8rpx;
				}
				.cm_text {
					line-height: 64rpx;
					justify-content: flex-start;
				}

				.has {
					margin-top: 14rpx;
					padding: 0 16rpx;
					line-height: 36rpx;
					height: 36rpx;
					border-radius: 18rpx;
					font-size: 24rpx;
					background: #f7f7f7;
				}
			}
		}
	}
	.footer {
		position: fixed;
		width: 100%;
		height: 100rpx;
		left: 0;

		// #ifdef H5
		bottom: 100rpx;
		// #endif
		// #ifdef APP-PLUS
		bottom: 0;
		// #endif
		background: #fff;
		z-index: 200;
		padding: 0 30rpx;
		.submit {
			padding: 0 40rpx;
			line-height: 68rpx;
			height: 68rpx;
			border-radius: 34rpx;
			background: #da1a0f;
			color: #fff;
			margin-left: 40rpx;
		}
	}
	.modal {
		width: 100%;
		height: 95vh;
		background: #fff;
	}
}
</style>
