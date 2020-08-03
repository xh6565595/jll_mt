<template>
	<view class="pages">
		<!-- 菜单 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="false">
			<block v-for="(item, index) in banners" :key="index">
				<swiper-item @click="_href(item)">
					<video :src="item.Url" v-if="item.UrlType == 'video'" :muted="true" :autoplay="true" :poster="item.Text" :show-mute-btn="true" controls class="swiper-item" style="width: 100%;height: 100%;"></video>
					<image :src="item.Text" v-else mode="aspectFill" lazy-load="true" class="swiper-item uni-bg-red" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- <view  style="width: 100%;height: 100rpx;background: red;"> -->
			
		<!-- </view> -->
		
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
		<accredit ref="dy" :autoClose="true">
			<view slot='content' class="dyContent flex flex_y flex-center">
				<view class="cm_title" style="margin-bottom: 20rpx;">开通订阅消息</view>
				<view style="width: 100%;height: 100rpx;">
					<official-account></official-account>
				</view>
			
				<view style="margin: 30rpx 0;">
					<view class="cm_text" style="padding-bottom: 20rpx;">
						请你关注洁利来智能厨卫公众号
					</view>
					<view class="cm_text">
						--以便我们向您提供及时的推荐消息
					</view>
					<view class="cm_text">
						--以便我们向您提供及时的业务通知
					</view>
					<view class="cm_text">
						--以便我们向您推送及时的信息反馈
					</view>
				</view>		
				<button type="success" class="cm_btn" @tap="_sureGz" >我已关注，立即开启</button>	
				<button type="default" class="cm_btn cm_btn_plain" @tap="_cancelGz"   >取消订阅</button>	
			</view>
		</accredit>
	</view>
</template>

<script>
import { mapState } from 'vuex';
const global_Set_jll = uni.getStorageSync('global_Set_jll');
import { baseMixins } from '@/utils/baseMixins.js';
import accredit from "@/components/accredit/accredit"
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
	components: {
		accredit
	},
	computed: mapState(['shareUser','sharePro','hasLogin']),
	mixins: [baseMixins],
	onLoad() {
		let that = this;
		this.banners = global_Set_jll.banerList;
		uni.$on('gzhAuth',(bool)=>{			
			that.$refs.dy.hideModal()
		});
		this._loadData('refresh')
		
		// this.$refs.dy.showModal()
	},
	onShow() {
		// if(!this.hasLogin){
		// 	uni.navigateTo({
		// 		url:'/pages/login/login'
		// 	})
		// }
		
	},
	methods: {
		// 关注检验
		_sureGz(){
			const authId = uni.getStorageSync('authId')
			if(authId){
				this._oidIfAttention(authId)	
			}else{
				uni.navigateTo({
					url:'/pages/auth/auth'
				})
			}		
			// this.$refs.dy.hideModal()			
			// console.log(1)
		},
		// opendi校验是否关注
		async _oidIfAttention(opendId){
			let that = this;
			try {
				let data = {
					openId: opendId
				};
				uni.showLoading({});
				let res = await this.$api.GetWxOpenid_Attention(data, false);
				this.$ui.hideloading();
				if (res.Success) {
					if(res.Data.subscribe==1){
						that.$ui.toast('订阅功能已开启');
					}else{
						that.$ui.toast('订阅功能未开启');
					}
				} else {
					that.$ui.toast(res.Msg);
					
				}
				that.$refs.dy.hideModal()	
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		_cancelGz(){
			this.$refs.dy.hideModal()
		},
		_href(item) {
			// console.log(item)
			let type = item.UrlType
			let url = item.Url
			// this.$store.commit('setWebviewUrl','http://www.baidu.com')
			// uni.navigateTo({
			// 	url:'/pages/webview/webview'
			// })
			if(!type || !url)return;
			switch (type){
				case 'href':
					// debugger
					uni.navigateTo({
						url: url
					});
					break;
				case 'inWeb':
					this.$store.commit('setWebviewUrl',url)
					uni.navigateTo({
						url:'/pages/webview/webview'
					})
					break;
				case 'mini':
					uni.navigateToMiniProgram({
					  appId: url,
					  path: 'pages/index/index',
					  extraData: {
					    'data1': 'test'
					  },
					  success(res) {
					    // 打开成功
					  }
					})
					break;
				default:
					break;
			}
			
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
		// height: 280rpx;
		height:400rpx;
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


	.dyContent{
		width: 90vw;
		padding: 40rpx;
		line-height: 2;
		.cm_title{
			line-height: 2;
			font-size: 36rpx;
		}
		.cm_text{
			line-height: 1.5;
		}
		.cm_btn{
			margin-bottom: 20rpx;
		}
	}
}
</style>
