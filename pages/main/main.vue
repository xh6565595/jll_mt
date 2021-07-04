<template>
	<view class="pages">
		<!-- 菜单 -->
	<!-- 	<swiper class="swiper" :indicator-dots="true" :autoplay="false">
			<block v-for="(item, index) in banners" :key="index">
				<swiper-item @click="_href(item)">
					<video :src="item.Url" v-if="item.UrlType == 'video'" :muted="true" :autoplay="true" :poster="item.Text" :show-mute-btn="true" controls class="swiper-item" style="width: 100%;height: 100%;"></video>
					<image :src="item.Text" v-else mode="aspectFill" lazy-load="true" class="swiper-item uni-bg-red" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</block>
		</swiper> -->
		<!-- <view  style="width: 100%;height: 100rpx;background: red;"> -->
			
		<!-- </view> -->
		<view class="flex flex_start" style="background-color: #fff;padding: 20rpx;">
			<image lazy-load="true" src="../../static/image/logo.png" mode="widthFix" class="iLogo"></image>
			<view style="line-height: 60rpx; ">洁利来官方店</view>
			<view class="f1"></view>
			<button type="default" class="inbtn" @tap="_toBuy">我的活动</button>
		</view>
		
	
		
		<view style="border-radius: 8rpx;overflow: hidden; width: 100%;">
			<image src="http://gllo.kuxiong999.com/zly_fm.jpg" mode="widthFix" style="width: 100%;" class="firstLunchTop"></image>
		</view>
		<view style="background-color: #fff;padding: 20rpx;">
			<view class="grayBox">
				GLLO洁利来健康智能马桶的最大益处：能水疗痣疮和水疗便秘，冬天坐圈是热的，便后清洗更加卫生，让您的生活从此自信满满。健康从好的习惯开始！
			</view>
			
			<button type="success" class="cm_btn" style="background-color: #ff8400;" @tap="_gz">查看活动规则</button>
		</view>
		<!-- <view
			style="background:#FAE0BF; color: #BF8758; font-size: 30rpx; line-height: 40rpx; height: 230rpx; padding: 20rpx;">
			2021年是疫情后重建健康世界的契机，GLLO为答谢新老顾客，现推出两款智能健康马桶参与“2021助力健康优惠返佣活动”！帮您重启健康生活，无接触冲水让您减少细茵接触，自动冲洗功能让你预防妇科疾病以及改善便秘问题。
		</view> -->
		<view style="background: #FCF4E7; padding:0 20rpx 20rpx 20rpx;">
			<view class="flex flex_center hottitle">—— 活动商品 ——</view>
		</view>
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
		<tui-modal :show="gzshow" custom>
			<view class="tui-modal-custom">
				<!-- <image src="/static/images/chat/fail.png" class="tui-tips-img"></image> -->
				<scroll-view class="scrollBox" :scroll-y="true">
					<view class="tui-modal-custom-text" style="white-space:pre-wrap;">
				     {{text}}
					</view>
				</scroll-view>
				<view  class="flex flex_center">
				<!-- <tui-button  :size="28" type="danger" shape="circle" @click="handleClick">确定</tui-button> -->
				<button type="success"  class="cm_btn1" @tap="_close">同意</button>
				<button type="success" style="background: #888888;" class="cm_btn1" @tap="_close">再看看</button>
				</view>
			</view>
		</tui-modal>
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
		    text: '',
			formParams: {
				key: '',
				type: '1',
				pageIndex: 1,
				pageSize: 10
			},
				gzshow:false
		};
	},
	components: {
		accredit
	},
	onShareAppMessage(res) {
		return {
			title: '洁利来智能马桶',
			path: `/pages/index/index`,
			imageUrl: 'http://gllo.kuxiong999.com/upload/head/jjl.png'
		};
	},
	computed: mapState(['shareUser','sharePro','hasLogin']),
	mixins: [baseMixins],
	onLoad() {
		let that = this;
		this.banners = global_Set_jll.banerList;
		this.text = global_Set_jll.activity_constraint;
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
					url:'/pages/features/auth/auth'
				})
			}		
			// this.$refs.dy.hideModal()			
			// console.log(1)
		},
		_toBuy() {
			uni.switchTab({
				url: '/pages/activity/activity'
			});
		},
		_close(){
				this.gzshow = false
		},
		_gz(){
			// debugger
			this.gzshow = true
			
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
    .gsStip{
    	height: 60rpx;
    	line-height: 60rpx;
    	text-align: center;
    	background-color: #f1f1f1;
    	border-radius: 8rpx;
    }
    .grayBox{
    	// height: 60rpx;
    	// line-height: 60rpx;
    	// text-align: center;
    	background-color: #f1f1f1;
    	padding: 20rpx;
    	border-radius: 8rpx;
    	margin-bottom: 20rpx;
    	color: #555;
    	line-height: 1.4;
    }
    .gpstatus{
    	background-color: #fff;
    	text-align: center;
    	line-height: 60rpx;
    	color: #d28e47;
    }
    .iLogo {
    	width: 68rpx;
    	height: 68rpx;
    	border-radius: 50%;
    	margin-right: 16rpx;
    }
    
    .inbtn {
    	background: #EB5233;
    	color: #FFFFFF;
    	height: 60rpx;
    	line-height: 60rpx;
    
    }
    
    .nowbtn {
    	background: #EB5233;
    	color: #FFFFFF;
    	height: 60rpx;
    	line-height: 60rpx;
    	margin-top: 20rpx;
    }
    
    .hottitle {
    	font-size: 36rpx;
    	color: #A85D3B;
    	font-weight: 600;
    
    	margin-top: 30rpx;
    }
    
    .hottext {
    	font-size: 30rpx;
    	color: #C4916B;
    	margin-top: 20rpx;
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
				border-radius:6rpx;
				margin-right: 16rpx;
			}
			.rTop {
				width: 216rpx;
				height: 216rpx;
				border-radius:6rpx;
				margin-bottom: 10rpx;
			}
			.rBot {
				width: 216rpx;
				height: 216rpx;
				border-radius:6rpx;
			}
		}
	}
    .scrollBox{
    	height: 50vh;
    	padding: 20rpx 0;
    		.tui-modal-custom-text{
    			line-height: 1.8;
    			color: #333;
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
	.cm_btn1{
		width: 40%;
		height: 80rpx;
		text-align: center;
		line-height: 78rpx;
		margin: 0 auto;
		border-radius: 40rpx;
		background: var(--cl_theme);
		color: #fff;
		font-size: 30rpx;
	}
}
</style>
