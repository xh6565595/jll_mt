<template>
	<view class="pages">
		<!-- #ifdef H5 -->
		<view class="header flex flex_center" @tap="toSearchPage">
			<cu-custom :isBack="false">
				<!-- <block slot="backText"></block> -->
				<block slot="content">
					<view class="searchBar f1 flex flex_center">
						<Icon name="search" :size="20" color="#CBCBCB"></Icon>
						<div class="f1 cm_des">请输入关键词</div>
					</view>
				</block>
				<block slot="right"><view class="btns flex flex_center">搜索</view></block>
			</cu-custom>
		</view>
		<!-- #endif -->
		<!-- 菜单 -->
		<view class="uni-padding-wrap" style="margin-top: 20rpx;">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="true" :autoplay="true">
						<block v-for="(item, index) in banners" :key="index">
							<swiper-item @click="_href(item.Url)">
								<image :src="item.Text" mode="aspectFill" lazy-load="true" class="swiper-item uni-bg-red" style="width: 100%;height: 100%;"></image>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
		</view>
		<view class="flex menus" style="margin-top: 20rpx;">
			<block v-for="(item, index) in classList" :key="index">
				<navigator :url="'/pages/classify/products/products?type=' + index" class="f1 flex flex_center flex_y">
					<image :src="item.class_logo ? item.class_logo : '../../static/none1_1.jpg'" @error="imageError2(item)" mode="scaleToFill" class="menusIcons"></image>
					<text class="text">{{ item.class_name }}</text>
				</navigator>
			</block>
		</view>
		
		<!-- <view class="flashSale"> -->
		<navigator url="/pages/features/flashSale/flashSale" class="flashSale" v-if="ifActivity">
			<image src="/static/img/flashSale.png" mode="widthFix" class="cover"></image>
		</navigator>
		<!-- </view> -->
		
		<!-- <view class="box flex flex_center flex_between">
				<navigator url="/pages/main/choiceness/choiceness" class=" flex flex_center floors">
					<image src="../../static/img/jx@1.5x.png" mode="scaleToFill" class="floorsPic"></image>
				</navigator>
				<navigator url="/pages/main/youDian/youDian" class=" flex flex_center floors">
					<image src="../../static/img/yd@1.5x.png" mode="scaleToFill" class="floorsPic"></image>
				</navigator>
		</view> -->
		<!-- 热门推荐 -->
		<view class="hot">
			<view class="cm_title title">热拍商品</view>
			<view class="hotItemBar flex flex_around">
				<block v-for="(item, index) in list" :key="index">
					<navigator :url="'/pages/main/details/details?code=' + item.project_code" class="proItemsBoxBlock">
						<view class="picBox">
							<image
								@load="imageLoad(index)"
								@error="loadError(index)"
								lazy-load="true"
								:src="item.project_img"
								mode="aspectFill"
								class="pre animated"
								:class="item.load ? 'fadeIn' : ''"
							></image>
						</view>

						<view class="msgBox">
							<!-- <view class="flex flex_center" style="padding: 6px 0;"> -->

							<view class=" cm_ellipsis2  " style="line-height: 1.3;">
								<text class="tags" v-if="item.is_activity == 1">限时抢购</text>
								{{ item.project_name }}
							</view>
							<!-- </view> -->
							<view class="cm_prize" style="margin-top: 20rpx;">￥{{ item.project_raise_price }}</view>
							<view class="cm_des" style="margin-top: 20rpx;">{{ item.buy_count }}人购买</view>
						</view>
					</navigator>
				</block>
			</view>
		</view>
		<LoadMore :status="loadStatus" />
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiCountdown from '@/components/countdown/countdown';
const global_Set_jll = uni.getStorageSync('global_Set_jll');
// console.log(global_Set_jll.banerList)
export default {
	data() {
		return {
			banners: [],
			list: [],
			loadStatus: 'more',
			formParams: {
				key: '',
				type: 4,
				pageIndex: 1,
				pageSize: 10
			},
			loginParams: {
				username: '',
				password: '',
				vilidate: '000000'
			},
			classList: '',
			ifActivity:global_Set_jll.isLimitActivity
		};
	},
	components: {
		tuiCountdown
	},
	computed: mapState(['hasLogin']),
	// 点击搜索框
	onNavigationBarSearchInputClicked() {
		// alert(1)
		uni.hideKeyboard();
		uni.navigateTo({
			url: '/pages/main/search/search'
		});
	},
	onNavigationBarSearchInputConfirmed(e) {
		uni.hideKeyboard();
		// if (this.searchword && this.searchword != 'undefined') {
		// 	uni.navigateTo({
		// 		url: '/pages/main/search/search?keyword=' + this.searchword
		// 	});
		// } else {
		// 	uni.navigateTo({
		// 		url: '/pages/main/search/search'
		// 	});
		// }
		uni.navigateTo({
			url: '/pages/main/search/search'
		});
	},
	// 点击搜索框
	onNavigationBarSearchInputChanged(e) {
		// console.log("e: " + JSON.stringify(e));
		// let v = e.text;
		// // console.log(v)

		// if (v) {
		// 	this.searchword = v;
		// }
		uni.navigateTo({
			url: '/pages/main/search/search'
		});
	},
	onNavigationBarButtonTap(e) {
		// console.log(e.index);
		if (e.index === 0) {
			// 点击搜素
			// this.scanSQR();
			this.$ui.toast('开发中');
		} else {
			// 点击搜素
			// if (this.searchword && this.searchword != 'undefined') {
			// 	uni.navigateTo({
			// 		url: '/pages/main/search/search?keyword=' + this.searchword
			// 	});
			// } else {

			// 	this.$ui.toast('请输入关键字')
			// }
			uni.navigateTo({
				url: '/pages/main/search/search'
			});
		}
	},

	// 下拉刷新
	onPullDownRefresh() {
		this.formParams.pageIndex = 1;
		this.list = [];
		this._loadData('refresh', () => {
			uni.stopPullDownRefresh();
		});
	},
	// 上拉加载
	onReachBottom() {
		if (this.loadStatus == 'noMore') {
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading';
		this._loadData('more', () => {
			// this.loadStatus = 'more'
		});
	},
	onLoad() {
		let that = this;
		// const global_Set_jll = uni.getStorageSyglobal_Set_jll_Set_jll');
		this.banners = global_Set_jll.banerList;
		// console.log(this.banners)
		this.classList = global_Set_jll.classList;
		this._loadData('refresh');
	},
	onShow() {
		// this.formParams.pageIndex = 1;
		// this.list = [];
		// this._loadData('refresh');
	},
	methods: {
		toSearchPage() {
			uni.navigateTo({
				url: '/pages/main/search/search'
			});
		},
		_href(url) {
			uni.navigateTo({
				url: url
			});
		},
		imageError1(item) {
			item.Text = '../../static/none3_1.jpg';
		},
		imageError2(item) {
			item.class_logo = '../../static/none1_1.jpg';
		},
		// 扫描二维码  引导商家注册
		scanSQR() {
			let that = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					// console.log('条码类型：' + res.scanType);
					// console.log('条码内容：' + JSON.stringify(res));
					let result = res.result;
					let arr = result.split('_HePai_');
					if (arr.length <= 1) {
						that.$ui.toast('无效码');
						return;
					}
					let channal = arr[0];
					let pId = arr[1];

					uni.navigateTo({
						url: '/pages/levelup/regNewChannel/regNewChannel?channel=' + channal + '&pId=' + pId
					});
				}
			});
		},
		imageLoad(index) {
			this.$set(this.list[index], 'load', true);
		},
		loadError(index) {
			// console.log('图片未找到');
			this.list[index].goods_picture = '/static/img/noPic.jpg';
		},
		// 热门推荐
		async _loadData(type, callback) {
			let that = this;
			try {
				if (type == 'refresh') {
					that.loadStatus = 'loading';
				} else {
					that.loadStatus = 'loading';
				}

				let res = await this.$api.GetGoodsList(this.formParams);

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
				// console.log('请求结果false : ' + err);
				that.loadStatus = 'more';
				if (callback) callback();
			}
			// this.loadModal = false;
			// this.$ui.hideloading();
			if (callback) callback();
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	background: #f4f4f4;
	padding: 20rpx;
	padding-top: 88rpx;
	.uni-padding-wrap {
		background-color: #f4f4f4;
		.swiper {
			border-radius: 12rpx;
			overflow: hidden;
			width: 100%;
			.swiper-item {
				background: #eee; 
			}
		}
	}

	.header {
		width: 100%;
		line-height: 88rpx;
		height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		position: fixed;
		background: #ededed;
		z-index: 10;
		left: 0;
		top: 0;
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
	.menus {
		background: #fff;
		height: 172rpx;
		border-radius: 12rpx;
		.menusIcons {
			width: 90rpx;
			height: 90rpx;
		}
		.text {
			margin-top: 14rpx;
			font-size: 24rpx;
		}
	}
	.flashSale{
		width: 100%;
		height: 160rpx;
		margin-top: 20rpx;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.box {
		padding: 0 20rpx 20rpx 20rpx;
		background: #fff;
		.floors {
			width: calc(50vw - 28rpx);
			height: 130rpx;
			.floorsPic {
				width: 100%;
				height: 130rpx;
			}
		}
	}
	.hot {
		width: 100%;
		// padding: 0 20rpx;
		.title {
			line-height: 1;
			margin-bottom: 8rpx;
			margin-top: 32rpx;
			font-weight: bolder;
		}
		.hotItemBar {
			width: 100%;
			flex-wrap: wrap;
			justify-content: space-between;
			// padding: 0 20rpx;
		}
		.tags {
			background: linear-gradient(to right, #ee7e33, #ea3333);
			color: #fff;
			padding: 0 8rpx;
			border-radius: 4rpx;
			font-size: 20rpx;
			line-height: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
		}
	}
}
</style>
