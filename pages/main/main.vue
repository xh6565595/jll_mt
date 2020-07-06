<template>
	<view class="pages">
	
		<!-- 菜单 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true">
			<block v-for="(item, index) in banners" :key="index">
				<swiper-item @click="_href(item.Url)">
					<image :src="item.Text" mode="aspectFill" lazy-load="true" class="swiper-item uni-bg-red" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="hot">
				<block v-for="(item, index) in list" :key="index">
					<navigator :url="'/pages/main/details/details?code=' + item.project_code" class="hotItem">
							<view class="flex flex_center itemHeader">
								<image
									@load="imageLoad(index)"
									@error="loadError(index)"
									lazy-load="true"
									:src="item.project_img"
									mode="aspectFill"
									class="itemLogo animated"
									:class="item.load ? 'fadeIn' : ''" 
								></image>
								<view class="itemTitle cm_title cm_ellipsis">撒旦法撒旦法商店发送到阿萨商店发送到阿萨</view>
								<text class="cm_des">上市公司·优选品牌</text>
							</view>
							<view class="itemContent">
								<view class="title cm_ellipsis " >撒旦法商店发撒旦法商店发送到阿萨德阿萨德撒旦法商店发送到阿萨德阿萨德撒旦法商店发送到阿萨德阿萨德送到阿萨德阿萨德</view>
								<view class="itemPrice" >￥{{ item.project_raise_price }}</view>
							</view>
							<view class="picBox flex flex_around">
								<image
									@load="imageLoad(index)"
									@error="loadError(index)"
									lazy-load="true"
									:src="item.project_img"
									mode="aspectFill"
									class="left animated"
									:class="item.load ? 'fadeIn' : ''"
								></image>
								<view class="f1">
									<image
										@load="imageLoad(index)"
										@error="loadError(index)"
										lazy-load="true"
										:src="item.project_img"
										mode="aspectFill"
										class="rTop animated"
										:class="item.load ? 'fadeIn' : ''"
									></image>
									<image
										@load="imageLoad(index)"
										@error="loadError(index)"
										lazy-load="true"
										:src="item.project_img"
										mode="aspectFill"
										class="rBot animated"
										:class="item.load ? 'fadeIn' : ''"
									></image>
								</view>
							</view>
					</navigator>
				</block>
		</view>
		<LoadMore :status="loadStatus" />
	</view>
</template>

<script>
import { mapState } from 'vuex';
const global_Set_jll = uni.getStorageSync('global_Set_jll');
import  { baseMixins } from '@/utils/baseMixins.js';
export default {
	data() {
		return {
			banners: [],
			hasRow:true,
			
			formParams: {
				key: '',
				type: 4,
				pageIndex: 1,
				pageSize: 10
			}
		};
	},
	components: {
		
	},
	computed: mapState(['hasLogin']),
	mixins:[baseMixins],
	// // 下拉刷新
	// onPullDownRefresh() {
	// 	this.formParams.pageIndex = 1;
	// 	this.list = [];
	// 	this._loadData('refresh', () => {
	// 		uni.stopPullDownRefresh();
	// 	});
	// },
	// // 上拉加载
	// onReachBottom() {
	// 	if (this.loadStatus == 'noMore') {
	// 		return;
	// 	}
	// 	this.formParams.pageIndex += 1;
	// 	this.loadStatus = 'loading';
	// 	this._loadData('more', () => {
	// 		// this.loadStatus = 'more'
	// 	});
	// },
	onLoad() {
		let that = this;
		this.banners = global_Set_jll.banerList;
		// this.classList = global_Set_jll.classList;
		// this._loadData('refresh');
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
	.swiper {
		border-radius: 8rpx;
		overflow: hidden;
		width: 100%;
		height: 280rpx;
		background-color: #f8f8f8;
		.swiper-item {
			background: #eee; 
		}
	}

	
	.hot {
		width: 100%;
		.hotItem{
			margin-top: 20rpx;
			background: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			.itemHeader{
				margin: 12rpx auto;
				.itemLogo{
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				.itemTitle{
					width: 54%;
					font-weight: 600;
				}
			}
			.itemContent{
				position: relative;
				// background-color: red;
				height: 46rpx;
				line-height: 46rpx;
				margin-bottom: 26rpx;
				.title{
					width: 80%;
					height: 46rpx;
					line-height: 46rpx;
				}
				.itemPrice{
					position: absolute;
					top: 0;
					right: -20rpx;
					height: 46rpx;
					line-height: 46rpx;
					color: #fff;
					background-color: #E93F34;
					border-radius: 23rpx 0 0 23rpx;
					padding: 0 16rpx;
				}
			}
			
		}
		.picBox{
			width: 100%;
			.left{
				width: 442rpx;
				height: 442rpx;
				border-radius: 16rpx;
				margin-right: 16rpx;
			}
			.rTop{
				width: 216rpx;
				height: 216rpx;
				border-radius: 16rpx;
				margin-bottom: 10rpx;
			}
			.rBot{
				width: 216rpx;
				height: 216rpx;
				border-radius: 16rpx;
			}
		}
	}
}
</style>
