<template>
	<view class="page">
		<view class="header flex flex_center" @tap="toSearchPage">
			<cu-custom  :isBack="false" >
				<block slot="content">
					<view class="searchBar f1 flex flex_center">
						<Icon name="search" :size="20" color="#999" > </Icon>
						<div class="f1 cm_des">请输入关键词</div>
					</view>
				</block>
				<block slot="right">
					<view class="btns flex flex_center">搜索</view> 
				</block>
			</cu-custom>
		</view>
		<view class="page-body" :style="'height:' + height + 'px'" >
			
			<scroll-view class="nav-left" scroll-y :style="'height:' + height + 'px'" :scroll-top="scrollLeftTop" scroll-with-animation>
				<view class="nav-left-item" @click="categoryClickMain(index)" :key="index" :class="index == categoryActive ? 'active' : ''" v-for="(item, index) in classifyData">
					<text class="current">{{ item.class_name }}</text> 
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:' + height + 'px'" scroll-with-animation>
				<view v-for="(foods, index) in classifyData" :key="index" class="boxs">
					<view class="cm_title">{{ foods.class_name }}</view>
					<view class="item-box flex flex_center">
						<view :id="i == 0 ? 'first' : ''" class="nav-right-item" v-for="(item, i) in foods.list" :key="i" @click="cart(item.class_code, item.class_name)">
							<!-- <image :src="item.class_logo" /> -->
							<image
								:src="item.class_logo"
								mode="aspectFit"
							/>
							<view class="nav-right-item-text">{{ item.class_name }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	
</template>

<script>
// import classifyData from '../../common/classify.data.js';
export default {
	data() {
		return {
			name: 'wkiwi',
			height: 0,
			categoryActive: 0,
			scrollTop: 0,
			scrollLeftTop: 0,
			// scrollHeight: 0,
			classifyData: [],
			arr: [0, 584, 1168, 1752, 2336, 2805, 3274, 3858, 4442, 4911, 5380, 5734, 6203, 6672, 7017], //初始值，后边计算会根据手机适配覆盖
			leftItemHeight: 51, //49行会计算出新值进行覆盖
			navLeftHeight: 0, //左边scroll-view 内层nav的总高度
			diff: 0, //左边scroll-view 内层nav的总高度与视口之差
			tabBarHeight: 0 //如果此页面为Tab页面，自己改变高度值,,一般tab高度为51
		};
	},
	created() {
		//如果你的分类数据为后台异步获取请	将下方代码放置你的数据回调中

		this._loadData();
	},
	onLoad: function() {
		this.height = uni.getSystemInfoSync().windowHeight - this.tabBarHeight - 44;
	},
	onReady() {
		// this.getHeightList();
	},
	methods: {
		toSearchPage(){
			uni.navigateTo({
				url:'/pages/main/search/search'
			})
		},
		async _loadData() {
			let that = this;
			try {
				let res = await this.$api.GetClassList({});
				// console.log(res.Data.ListInfo);
				if (res.Success) {
					// that.tabbar = res.Data	;
					// that.formParams.class_code = 	that.tabbar[0].class_code
					// that._loadData('refresh')
					this.classifyData = res.Data.ListInfo;
					this.$nextTick(() => {
						this.getHeightList();
					});
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
				if (type == 'refresh') {
					// this.$ui.hideloading();
					uni.stopPullDownRefresh();
				}
			}
		},
		getHeightList() {
			let _this = this;
			let selectorQuery = uni.createSelectorQuery();
			selectorQuery.selectAll('.nav-left-item').boundingClientRect(function(rects) {
				_this.leftItemHeight = rects[0].height;
				_this.navLeftHeight = _this.leftItemHeight * _this.classifyData.length;
				_this.diff = _this.navLeftHeight - _this.height;
			});
			selectorQuery
				.selectAll('.boxs')
				.boundingClientRect(function(rects) {
					let arr = [0];
					let top = 0;
					// console.log(rects)
					rects.forEach(function(rect) {
						top += rect.height;
						arr.push(top);
					});
					console.log(arr);
					_this.arr = arr;
				})
				.exec();
				
			// console.log(_this.arr)
		},
		scroll(e) {
			let _this = this;
			if (this.timeoutId) {
				clearTimeout(this.timeoutId);
			}
			this.timeoutId = setTimeout(function() {
				//节流
				_this.scrollHeight = e.detail.scrollTop + 1 ;
				//+1不要删除，解决最后一项某种情况下翻到底部，左边按钮并不会切换至最后一个
				//若想使切换参考线为屏幕顶部请删除 _this.height/2
				for (let i = 0; i < _this.arr.length; i++) {
					let height1 = _this.arr[i];
					let height2 = _this.arr[i + 1];
					if (!height2 || (_this.scrollHeight >= height1 && _this.scrollHeight < height2)) {
						_this.categoryActive = i;
						_this.diff > 0 && (_this.scrollLeftTop = Math.round((_this.categoryActive * _this.diff) / (_this.classifyData.length - 1)));
						return false;
					}
				}
				_this.categoryActive = 0;
				_this.timeoutId = undefined;
			}, 100);
		},
		categoryClickMain(index) {
			// alert(index)
			this.categoryActive = index;
			this.scrollTop == this.arr[index] ? (this.scrollTop = this.scrollTop + 1) : (this.scrollTop = this.arr[index]); //防止两次相等造成点击不触发滚动时间
		},
		cart(code,text) {
			// uni.showToast({
			// 	title: text,
			// 	icon: 'none'
			// });
			uni.navigateTo({
				url:`./products_s/products_s?code=${code}&title=${text}`
			})
		}
	},
	components: {}
};
</script>

<style scoped lang="less">
.page{
	.header {
		width: 100%;
		line-height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		// position: fixed;
		background:#fff ;
		// z-index: 10;
		// left: 0;
		// top: 0;
		// padding: 0 20rpx;
		.searchBar {
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30rpx;
			background: #F5F5F5;
			padding: 0 40rpx;
			margin: 0 20rpx;
		}
		.btns {
			width: 88rpx;
			height: 88rpx;
			color: #333;
			.iconfont {
				font-size: 40rpx;
			}
		}
	}
}	
	

.page-body {
	display: flex;
	background: #fff;
	overflow: hidden;

}


.nav {
	display: flex;
	width: 100%;
	
}

.nav-left {
	width: 25%;
	background: #fff;
	top: 88rpx;
}

.nav-left-item {
	height: 100rpx;
	border-right: solid 1px #f1f1f1;
	border-bottom: solid 1px #f1f1f1;
	font-size: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.nav-left-item:last-child {
	border-bottom: none;
}
.nav-right {
	width: 75%;
	top: 88rpx;
	padding: 20rpx;
	background-color: #f4f4f4;
}
.boxs {
	display: block;
	overflow: hidden;
	border-bottom: 20rpx solid #f3f3f3;
	padding: 20rpx;
	border-radius: 12rpx;
	background: #fff;
	/* min-height: 100vh; */
	/*若您的子分类过少想使得每个子分类占满屏请放开上边注视 */
}
.item-box{
	flex-wrap: wrap;
	justify-content: flex-start;
}
.box:last-child {
	border: none;
	min-height: 100vh;
}
.nav-right-item {
	width: 33%;
	height: 220rpx;
	float: left;
	text-align: center;
	padding: 11rpx;
	font-size: 28rpx;
	background: #fff;
}
.nav-right-item-text {
	font-size: 20rpx;
	margin-top: 4rpx;
	color: #666;
}
.nav-right-item image {
	width: 150rpx;
	height: 150rpx;
}

.active {
	// color: var(--cl_primary);
	
	border-radius: 20rpx;
	border-right: 0;
	.current{
		color: #fff;
		
		background: #50AB9F;
		height: 56rpx;
		line-height: 56rpx;
		border-radius: 28rpx;
		padding: 0 20rpx;
	}
}
::-webkit-scrollbar {
	/*取消小程序的默认导航条样式*/
	width: 0;
	height: 0;
	color: transparent;
}
</style>
