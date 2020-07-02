<template>
	<view class="page flex_y flex_center">
		<view v-if="show" style="background: #fff;">
			<!-- <view class="fixed" style="background: #fff;"><Filtrate noScroll @chooseSort="_chooseSort"></Filtrate></view> -->
			<view class="f1 " >
				<view class="mainContent">
					<!-- <view class="productList " > -->
					<view class="hotItemBar ">
						<block v-for="(item, index) in list" :key="index">
							<navigator :url="'/pages/main/details/details?code=' + item.project_code" class="proItemsBox flex flex_around">
								<!-- <view class="proItemsBox"> -->
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
								<view class=" f1 msgBox cm_bdb">				
									<view class=" cm_ellipsis2  " style="line-height: 1.3;">
											<!-- <text class="cm_t_20 tags" v-if="item.is_ems == 0">包邮</text> -->
											{{ item.project_name }}
										</view>
									<!-- </view> -->
									<view class="cm_prize" style="margin-top: 20rpx;">￥{{ item.project_raise_price }}</view>
									<view class="cm_des" style="margin-top: 20rpx;">{{ item.buy_count  }}人购买</view>
								</view>
							</navigator>
						</block>
					</view>
					<LoadMore :status="loadStatus" />
				</view>
			</view>
		</view>
		<view v-else>
			<view class="content">
				<view class="cm_title">最近搜索</view>
				<view class="labelBox flex" style="margin-bottom: 20rpx;" >
					<block v-for="(item, index) in localWordList" :key="index" v-if="index <= 6">
					<!-- 	<view class="cu-tag radius md latest" @tap="_choose(item)" hover-class="cm_hover">{{ item }}</view>
						<view class="tui-tag-small tui-tag-outline tui-gray-outline tui-tag-outline-fillet" @tap="_choose(item)">{{ item }}</view> -->
						<!-- <view class="" @tap="_choose(item)">
							<tuiTag  size="small" :plain="true" type="green" >{{ item }}</tuiTag> 
						</view> -->
						<!-- <tuiTag  size="small" :plain="true" type="green" >{{ item }}</tuiTag> -->
						<view class="tui-tag-small tui-tag-outline tui-gray-outline" style="margin-right: 16rpx;margin-top: 16rpx;" @tap="_choose(item)">{{ item }}</view>
					
					</block>
						<view class="tui-tag-small tui-tag-outline tui-gray-outline" style="margin-right: 16rpx;margin-top: 16rpx;"  @tap="_removeAll()">清除历史</view>
					<!-- <view class="cu-tag radius md latest bg-orange" @tap="_removeAll()" hover-class="cm_hover">清除历史</view> -->
				</view>
				<!-- </view>
			<view class="content"> -->
				<!-- <view class="cm_title">热门搜索</view>
				<view class="labelBox flex">
					<block v-for="(item, index) in hotWordList" :key="index" v-if="index <= 12">
						<view class=" label  md " @tap="_choose(item)" hover-class="cm_hover">{{ item }}</view>
					</block>
				</view> -->
			</view>
		</view>
		<!-- <button @click="test">test</button> -->
	</view>
</template>

<script>
// import Filtrate from '@/components/filtrate.vue';
import tuiCountdown from "@/components/countdown/countdown"
export default {
	data() {
		return {
			StatusBar: this.StatusBar,
			CustomBar: this.CustomBar,
			sliderHeight: 64,
			// hotWordList: [],
			localWordList: [],
			list: [],
			show: false,

			// 筛选表单数据
			formParams: {
				key: '',
				type: '',
				pageIndex: 1,
				pageSize: 10
			},
			loadStatus: 'more'
		};
	},
	components: {
		tuiCountdown
	},
	filters: {
		parse: function(value) {
			return parseInt(value);
		}
	},

	computed: {
		sliderHeightPX() {
			// console.log(this.CustomBar)
			return `${this.sliderHeight}px`;
		}
	},
	onLoad(options) {
		this.sliderHeight = this.CustomBar;
		let that = this;
		let keyWord = options.keyword;
		// 初始化本地数据
		// this._initLocal();
		
		// console.log(6666+options.keyword)
		if (keyWord) {
			that.formParams.key = keyWord;
			// #ifdef APP-PLUS
			let webView = that.$mp.page.$getAppWebview();
			
			// 设置 searchInput的 text
			webView.setTitleNViewSearchInputText(keyWord);
			// #endif
			that._toSearch();
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
	onNavigationBarSearchInputConfirmed(e) {
		let v = e.text;
		this.formParams.key = v;

		this._toSearch();
	},
	// 点击搜索框
	onNavigationBarSearchInputChanged(e) {
		// console.log("e: " + JSON.stringify(e));
		let v = e.text;
		this.formParams.key = v;

		if (!v) {
			this.show = false;
		}
	},
	onNavigationBarButtonTap(e) {
		// console.log(e.index);
		if (e.index === 0) {
			// 点击搜素
			// let webView = this.$mp.page.$getAppWebview();
			// // 设置 searchInput的 text
			// webView.setTitleNViewSearchInputText('');
			// this.formParams.key = '';
			// this.show = false;
			this._toSearch();
		} else {
			
			// 点击搜素
			this._toSearch();
		}
	},
	// 上拉加载
	onReachBottom() {
		this.formParams.pageIndex += 1;
		if (this.loadStatus == 'noMore') return;

		this._loadData('more');
	},
	methods: {
		imageLoad(index) {
			if (this.list[index]) {
				this.$set(this.list[index], 'load', true);
			}
		},
		loadError(index) {
			// console.log('图片未找到');
			this.list[index].goods_picture = '/static/img/noPic.jpg';
		},
		// 初始化本记录
		_initLocal() {
			let wordslist = uni.getStorageSync('localWords');
				// console.log(11+JSON.stringify(wordslist))
			wordslist = wordslist ? wordslist : [];
		
			this.localWordList = wordslist;
		},
		_removeAll() {
			uni.removeStorageSync('localWords');
			this.localWordList = [];
		},
		// 选择热刺
		_choose(text) {
			console.log(text)
			// #ifdef APP-PLUS
			let webView = this.$mp.page.$getAppWebview();
			// 设置 searchInput的 text
			webView.setTitleNViewSearchInputText(text);
			this.formParams.key = text;
			this._toSearch();
			// #endif
		},
		_toSearch() {
			// alert(1)
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
			if (!this.formParams.key) {
				
				this.$ui.toast( '请输入关键字')
				return;
			}
			this.show = true;
			this.list = [];
			this.formParams.pageIndex = 1;
			this._loadData(() => {
				if (this.list.length == 0) {
					
					this.$ui.toast( '没有相关数据')
				}
			});
			// 记录本地
			let list = uni.getStorageSync('localWords');
			let value = this.formParams.key;
			if (!list) {
				list = [];
			}

			if (list.indexOf(value) < 0) {
				list.unshift(this.formParams.key);
				this.localWordList = list;
				// console.log(list)
				uni.setStorageSync('localWords', list);
			}
		},
		// 热门推荐
		async _loadData(type, callback) {
			let that = this;
			try {
				if (type == 'refresh') {
					// this.$ui.showloading()
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
					that.$ui.toast(res.Msg)
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
			// this.loadModal = false;
			// this.$ui.hideloading();
			if (callback) callback();
		}
		// 排序
		// _chooseSort(t) {
		// 	this.list = [];
		// 	this.formParams.pageIndex = 1;
		// 	this.formParams.sort = t + '';
		// 	this._loadData();
		// },

		// // 特殊条跳转
		// _toDetail(item) {
		// 	// console.log(JSON.stringify(item))

		// 	uni.setStorageSync('currentCoupon', JSON.stringify(item));
		// 	uni.navigateTo({
		// 		url: '/pages/superSearch/currentCouponDetail/currentCouponDetail'
		// 	});
		// }
	}
};
</script>

<style lang="scss" scoped>
.page {
	.fixed {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 100;

		.search {
			padding: 10rpx 0;

			.search-form {
				height: 68rpx;
				border-radius: 34rpx;
			}
		}
	}

	.content {
		box-sizing: border-box;
		padding: 40rpx 20rpx;
		background: #fff !important;
		// height: 550rpx;
		margin-bottom: 40rpx;
		.cm_title {
			line-height: 1;
			margin-bottom: 40rpx;
		}
		.labelBox {
			flex-wrap: wrap;

			.label {
				background: #fff;
				padding: 18rpx 38rpx;
				font-size: 24rpx;

				margin-right: 30rpx;
			}
			.active {
				background: #f4f4f4;
			}
			.latest {
				margin-bottom: 20rpx;
				padding: 0 18rpx;
				max-width: 120rpx;
				width: 120rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden; 
			}
		}
	}

	.hotItemBar {
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
		.proItemsBox {
			width: 100%;
			// height: 532rpx;
			background: #fff;
			padding: 0 20rpx;
			// margin-top: 16rpx;
			overflow: hidden;
			.picBox {
				padding: 34rpx 0;
				width: 160rpx;
				height: 160rpx;
				position: relative;
				border-radius: 14rpx;
				margin-right: 10rpx;
				.pre {
					width: 160rpx;
					height: 160rpx;
					opacity: 0;
				}
			}
			.msgBox {
				padding: 34rpx 0;
				// border-bottom: 1rpx solid #e5e5e5;
				width: 60%;

				.protitle {
					height: 84rpx;
					overflow: hidden;
					// background: red;
					line-height: 1.4;
					margin-bottom: 12rpx;
				}
				.cm_ellipsis {
					margin-top: 8rpx;
				}
				.cm_text {
					line-height: 64rpx;
					justify-content: flex-start;
				}
				.has {
					margin-top: 14rpx;
					// padding:0 16rpx ;
					line-height: 1;
					font-size: 24rpx;
				}
				.timeBox {
					line-height: 36rpx;
					height: 36rpx;
					border-radius: 18rpx;
					background: #e82324;
					color: #fff;
					padding: 0 16rpx;
				}
			}
		}
	}
}
</style>
