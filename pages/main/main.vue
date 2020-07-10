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
		<!-- <button class="btns" type="success" @tap="_dy">订阅消息</button> -->
		<view class="hot">
			<block v-for="(item, index) in list" :key="index">
				<navigator :url="'/pages/main/details/details?code=' + item.project_code" class="hotItem">
					<view class="flex flex_center itemHeader">
						<image
							lazy-load="true"
							src="../../static/image/logo.png"
							mode="aspectFill"
							class="itemLogo animated fadeIn"
						></image>
						<view class="itemTitle cm_title cm_ellipsis">洁利来官方店</view>
						<text class="cm_des">上市公司·优选品牌</text>
					</view>
					<view class="itemContent">
						<view class="title cm_ellipsis ">{{item.project_name}}</view>
						<view class="itemPrice">￥{{ item.project_raise_price }}</view>
					</view>
					<view class="picBox flex flex_around">
						<image
							v-if="item.project_img[0]"
							lazy-load="true"
							:src="item.project_img[0]"
							mode="aspectFill"
							class="left animated fadeIn"
						></image>
						<view class="f1">
							<image
								v-if="item.project_img[1]"
								lazy-load="true"
								:src="item.project_img[1]"
								mode="aspectFill"
								class="rTop animated fadeIn"
							></image>
							<image
								v-if="item.project_img[2]"
								lazy-load="true"
								:src="item.project_img[2]"
								mode="aspectFill"
								class="rBot animated fadeIn"
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
import { baseMixins } from '@/utils/baseMixins.js';
export default {
	data() {
		return {
			baseKey: 'GetGoodsList',
			banners: [],
			hasRow: 'Rows',
			
			formParams: {
				key: '',
				type: '1',
				pageIndex: 1,
				pageSize: 10
			}
		};
	},
	components: {},
	computed: mapState(['shareUser','sharePro']),
	mixins: [baseMixins],
	onLoad() {
		let that = this;
		this.banners = global_Set_jll.banerList;
		// this.classList = global_Set_jll.classList;
		// this._loadData('refresh');
		if(this.sharePro ){
			uni.navigateTo({
				url:'/pages/main/details/details?code=' + this.sharePro
			})
		}
		
	},
	onShow() {
		// this.formParams.pageIndex = 1;
		// this.list = [];
		// this._loadData('refresh');
	},
	methods: {
		_dy(){
			wx.requestSubscribeMessage({
			  tmplIds: ['C1X2iAOlZq-A5ofwquTDuSW82fil3pe5GW5SnhjI_so','pA_K72jyOPZMKqI5zSVWuVFKCSeJFpjqIbfgQTEABZo'],
			  success (res) { 
				  console.log(111)
			  },
			  fail(err){
				  console.log(err) 
			  }
			})
		},
		_href(url) {
			uni.navigateTo({
				url: url
			});
		},

		imageLoad(index) {
			this.$set(this.list[index], 'load', true);
		},
		loadError(index) {
			// console.log('图片未找到');
			this.list[index].goods_picture = '/static/img/noPic.jpg';
		},
		loadDataComplete(bool){
			if(bool){
				// 成功
				this.list.map(item=>{
					// console.log(typeof(item.project_img))
					if(typeof(item.project_img)=='string'){
						item.project_img = item.project_img?item.project_img.split(','):[]
					}
					
				})
				
			}
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
		.hotItem {
			margin-top: 20rpx;
			background: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			.itemHeader {
				margin: 12rpx auto;
				.itemLogo {
					width: 68rpx;
					height: 68rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				.itemTitle {
					width: 54%;
					font-weight: 600;
				}
			}
			.itemContent {
				position: relative;
				// background-color: red;
				height: 46rpx;
				line-height: 46rpx;
				margin-bottom: 26rpx;
				.title {
					width: 80%;
					height: 46rpx;
					line-height: 46rpx;
				}
				.itemPrice {
					position: absolute;
					top: 0;
					right: -20rpx;
					height: 46rpx;
					line-height: 46rpx;
					color: #fff;
					background-color: #e93f34;
					border-radius: 23rpx 0 0 23rpx;
					padding: 0 16rpx;
				}
			}
		}
		.picBox {
			width: 100%;
			.left {
				width: 442rpx;
				height: 442rpx;
				border-radius: 16rpx;
				margin-right: 16rpx;
			}
			.rTop {
				width: 216rpx;
				height: 216rpx;
				border-radius: 16rpx;
				margin-bottom: 10rpx;
			}
			.rBot {
				width: 216rpx;
				height: 216rpx;
				border-radius: 16rpx;
			}
		}
	}
}
</style>
