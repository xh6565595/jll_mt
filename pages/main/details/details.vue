<template>
	<view>
		<tui-skeleton v-if="skeletonShow" backgroundColor="#f9f9f9" skeletonBgColor="#efefef" borderRadius="0rpx"></tui-skeleton>
		<view class="pages tui-skeleton">
			<!-- <view class="uni-padding-wrap"> -->
			<tuiNav :isCustom="true" backgroundColor="#fff">
				<view class="flex flex_center" style="height: 88rpx;">
					<view style="height: 88rpx;width: 88rpx;" class="flex flex_center" @tap="_back">
						<view class="cm_back  flex flex_center"><text class="iconfont icon-fanhui2"></text></view>
					</view>

					<view class="f1"></view>
				</view>
			</tuiNav>
			<video 
				v-if="goods.project_video"
				src="http://down.kuxiong999.com/9933.mp4"
				id="proVideo"
				controls 
				:direction ="0"
				class="videoBox"
				@fullscreenchange="_fullscreenchange"
			></video>
			<view class="page-section swiper tui-skeleton-rect">
				<!-- <view class="page-section-spacing"> -->
				<swiper class="swiper" :indicator-dots="true" :autoplay="false">
					<swiper-item v-if="goods.project_video">
						<view class="flex  flex_center" style="width: 100%;height: 100%;">
							<image :src="banners[0]" mode="aspectFill" style="width: 100%;height: 100%;"> </image>
							<view class="flex  flex_center swiperBg" >
								<image src="../../../static/image/bf.png" mode="widthFix" @tap="videoToggle" style="width: 200rpx;height: 200rpx;"></image>
							</view>							
						</view>
					</swiper-item>
					<block v-for="(item, index) in banners" :key="index">
						<swiper-item ><image :src="item" mode="aspectFill" lazy-load="true" class="swiper-item uni-bg-red" style="width: 100%;height: 100%;"></image></swiper-item>
					</block>
				</swiper>
			</view>

			<view class="boxs box1 ">
				<view class="cm_title" style="margin-bottom: 20rpx;">{{ goods.project_name }}</view>
				<view class="flex titleBox tui-skeleton-fillet" v-if="goods.is_activity == 0">
					<text class="cm_prize">￥{{ goods.project_raise_price }}</text>
					<text class="cm_delete" style="margin-left: 20rpx;">原价￥{{ goods.project_price }}</text>
					<view class="f1"></view>
					<text style="color:#009688" @tap="sharePoster">立即分享</text>
				</view>

				<view class="logoBox flex  flex_center tui-skeleton-fillet">
					<image src="../../../static/image/logo.png" mode="widthFix" class="logo"></image>
					<view class=" cm_title   name">洁利来</view>
					<view class="blank"></view>
					<text class="f1">股票代码：832734</text>
				</view>
			</view>

			<view class="boxs box4 ">
				<view class="flex flex_center cells tui-skeleton-fillet">
					<view class=" cm_des " style="width: 20%;">发货</view>
					<text class="f1">{{ business.shipments_address.area }}</text>
				</view>
				<view class="flex flex_center cells tui-skeleton-fillet">
					<view class=" cm_des " style="width: 20%;">服务</view>
					<view class=" flex flex_center" style="margin-right: 20rpx;">
						<image src="../../../static/image/xq_fw.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
						<text class="cm_des" style="margin-left: 8rpx;">上门安装</text>
					</view>
					<view class=" flex flex_center" style="margin-right: 20rpx;">
						<image src="../../../static/image/xq_fw.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
						<text class="cm_des" style="margin-left: 8rpx;">正品保障</text>
					</view>
					<view class=" flex flex_center" style="margin-right: 20rpx;">
						<image src="../../../static/image/xq_fw.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
						<text class="cm_des" style="margin-left: 8rpx;">全国联保</text>
					</view>
					<view class="f1"></view>
				</view>
			</view>
			<view class="boxs box3 tui-skeleton-rect ">
				<!-- <view class="picBox flex  flex_center"> -->
				<navigator url="/pages/main/main" open-type="switchTab" class="picBox flex  flex_center">
					<image :src="business.shop_logo" mode="aspectFill" class="avatar tui-skeleton-rect"></image>
					<view class="f1 tui-skeleton-fillet">
						<view class=" cm_title   name">{{ business.shop_name }}</view>
					</view>
					<text class="cm_des iconfont icon-fanhui3"></text>
				</navigator>
				<!-- </view> -->
			</view>
			<!-- <video :src="goods.project_video" controls class="video" v-if="goods.project_video"></video> -->

			<view class="commonTit flex flex_center tui-skeleton-fillet">
				<view class="blank"></view>
				<view class="cm_title">商品详情</view>
				<view class="blank"></view>
			</view>
			<view>
				<!-- <block v-for="(item, index) in details_img" :key="index">
					<image :src="item" mode="widthFix" style="width: 100%;"></image>
				</block> -->
				<rich-text :nodes="details_img"></rich-text>
			</view>
			<view class="footerBox" :style="{ 'padding-bottom': ifx ? '40rpx' : '' }">
				<view class="shareTip flex flex_center" v-if="shareActive">
					<image
						:src="selfBuy ? userInfo.consumer_head : share_consumer_info.consumer_head"
						mode="scaleToFill"
						style="width: 64rpx;height: 64rpx;border-radius: 50%;margin-right: 20rpx;"
					></image>
					<view class="f1">{{ selfBuy ? userInfo.consumer_nick_name : share_consumer_info.consumer_name }}</view>
				</view>
				<view class="footer flex flex_center" v-if="!skeletonShow"><button class="cm_btn sure" @tap="_next">购买</button></view>
			</view>
		</view>
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :content="content" :maskClosable="false" color="#333" :size="32"></tui-modal>
	<!-- 	<view v-if="videoShow" style="width: 100vw;height:100vh;background: rgba(0,0,0,0.6);left:0;top:0;position:fixed;z-index: 100;">
			<txv-video
				poster="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595225914239&di=0209c0ec09478b31a4ab399bc8141e68&imgtype=0&src=http%3A%2F%2Fm.new35.com%2FUploads%2Fimage%2F20180309%2F5aa22fd9a53b2.jpg"
				poster-for-crawler="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595225914239&di=0209c0ec09478b31a4ab399bc8141e68&imgtype=0&src=http%3A%2F%2Fm.new35.com%2FUploads%2Fimage%2F20180309%2F5aa22fd9a53b2.jpg"
				vid="x0972m45dcx"
				width="100%"
				height="100%"
				:usePoster="true"
				playerid="x0972m45dcx"
				:autoplay="true"
			></txv-video>
		</view> -->
		<xhStoreParamsSKU
			ref="params"
			:preImg="banners[0]"
			:title="goods.project_name"
			:specifications="specifications"
			:difference="skuList"
			:defaultstock="goods.default_stock"
			:defaultprice="goods.default_price"
			:service1="service1"
			:service2="service2"
			:service3="service3"
			:ifActive="goods.is_activity == 1 ? true : false"
			@creatOrder="creatOrder"
			@addCard="addCard"
			:singlePro="goods.parameter_type == 0"
		></xhStoreParamsSKU>

		<!-- <view class="back"> -->
		<image src="../../../static/img/ic_xq_zd.png" mode="aspectFill" class="backBtn animated slideInUp" @tap="_backTop"></image>
		<!-- </view> -->
		<accredit ref="share" :autoClose="true">
			<view slot="content" class="shareBox">
				<view class="flex flexd_center">
					<image :src=" banners[0]" mode="aspectFill" class="itemLogo"></image>
					<view class="f1">
						<view class="cm_title cm_ellipsis2">{{ goods.project_name }}</view>
						<view class="flex flex_center" style="margin: 10rpx 0;">
							<view class="cm_des f1 ">原价：{{ goods.project_price }}</view>
						</view>
						<view class="cm_price" style="margin-bottom: 20rpx;">￥{{ goods.project_raise_price }}</view>
					</view>
				</view>
				<button type="text" class="cm_btn" hover-class="cm_hover_m" open-type="share">立即分享给好友</button>
			</view>
		</accredit>
	</view>
</template>

<script>
import tuiSkeleton from '@/components/tui-skeleton/tui-skeleton';
// import tuiCountdown from '@/components/countdown/countdown';
import tuiNumberbox from '@/components/numberbox/numberbox';
// import CountCalc from '@/components/uni-countdown.vue'
const global_Set_jll = uni.getStorageSync('global_Set_jll');
import xhStoreParamsSKU from '@/components/xhStoreParamsSKU/xhStoreParamsSKU';
import { mapState, mapMutations } from 'vuex';
// import bestPaymentPassword from '@/components/best-payment-password/best-payment-password.vue';
export default {
	data() {
		return {
			list: [],
			index: 1,
			business: {
				shipments_address: ''
			},
			goods: '',
			banners: [],
			auction: '',
			skeletonShow: true,
			formParams: {
				project_code: '',
				share_user_id: ''
			},
			phoneNum: global_Set_jll.service_mobile,
			showAll: false,
			modal: false,
			payFlag: false,
			time: null,
			content: '请您先登录',
			action: 'login',
			animationData: '',
			details_img: '',
			paymentPwd: '', //支付密码
			skuList: [],
			specifications: [],
			showModalStatus: false,
			service1: '',
			service2: '',
			service3: '',
			endTime: '',
			platform: 'android',
			share_consumer_info: '',
			activityInfo: '', //限时购信息
			shareActive: false,
			selfBuy: false,
			selfOrder: '',
			videoShow:false,
			videoContext:''
		};
	},
	watch: {
		hasLogin(newValue, oldValue) {
			// console.log(oldValue)
			// console.log(newValue)
			// this._loadData();
			// this.loadData();
		}
	},
	components: {
		tuiSkeleton,
		// tuiCountdown,
		// bestPaymentPassword,
		// CountCalc,
		tuiNumberbox,
		xhStoreParamsSKU
	},
	onLoad(options) {
		let that = this

		
		this.formParams.project_code = options.code;
		this.formParams.share_user_id = that.shareUser;
		this.selfOrder = options.order;
		if (options.code == that.sharePro) {
			this.shareActive = true; //是分享活动商品
		}
		if (options.type == 'self' && options.order) {
			this.shareActive = true;
			this.selfBuy = true;
			
			this.formParams.share_user_id = that.shareUser;

			// debugger
		}
		this._loadData('refresh');
	 
		
	},
	onUnload() {
		// alert(2)
		clearInterval(this.time);
		this.time = null;
	},
	computed: {
		...mapState(['shareUser', 'sharePro', 'shareOrder', 'userInfo', 'hasLogin', 'ifx']),
		restTimeValied() {
			let t = this.endTime;
			console.log(t);
			if (!t) {
				return false;
			}
			let s = new Date(t).getTime();

			let n = new Date().getTime();
			console.log(s);
			let date = s - n;

			let days = date / 1000 / 60 / 60 / 24;
			let daysRound = Math.floor(days);
			let hours = date / 1000 / 60 / 60 - 24 * daysRound;
			let hoursRound = Math.floor(hours);
			let minutes = date / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound;
			let minutesRound = Math.floor(minutes);
			let seconds = date / 1000 - 24 * 60 * 60 * daysRound - 60 * 60 * hoursRound - 60 * minutesRound;
			let secondsRound = Math.floor(seconds);
			let time = '倒计时' + (daysRound + '天' + hoursRound + '时' + minutesRound + '分' + secondsRound + '秒');

			let obj = {
				d: parseInt(daysRound),
				h: parseInt(hoursRound),
				m: parseInt(minutesRound),
				s: parseInt(secondsRound)
			};
			// console.log(obj);
			return obj;
		}
	},
	onShareAppMessage(res) {
		return {
			title: this.goods.project_name,
			path: `/pages/main/details/details?code=${this.formParams.project_code}`,
			imageUrl: this.banners[0]
		};
	},
	methods: {
		sharePoster(){
		        //获取带参数二维码
		        this.is_show_model = false 
		        // this.$refs.poster.showCanvas('https://oss.zhangyubk.com/cmqrcode.jpg') 
				this.$refs.share.showModal() 
		},
		_fullscreenchange(event){
			console.log(event.detail )
			let iffull = event.detail.fullScreen
			if(iffull){
				this.videoContext.play()
			}else{
				this.videoContext.pause()
			}
		},
		videoToggle(){
			// this.videoShow = true
			this.videoContext.requestFullScreen()
		},
		_back() {
			uni.switchTab({
				url: '/pages/main/main'
			});
		},
		cart() {
			uni.switchTab({
				url: '/pages/cart/cart'
			});
		},
		home() {
			uni.switchTab({
				url: '/pages/main/main'
			});
		},
		_phone() {
			// 客服热线
			uni.showModal({
				title: '提示',
				content: '是否确定拨打商家电话',
				success: function(res) {
					if (res.confirm) {
						uni.makePhoneCall({
							phoneNumber: global_Set_jll.service_mobile //仅为示例
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		_backTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 100
			});
		},
		_none() {},
		_toggleModal() {
			this.showModalStatus = !this.showModalStatus;
		},
		addCard(data) {
			this._addCard(data);
		},
		creatOrder(data) {
			this._buy(data);
		},
		// 显示参数框
		_next() {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}
			this.$refs.params.show();
		},
		// 关闭
		hideModal() {
			this.showModalStatus = false;
		},
		// 加载
		async _loadData(type, callback) {
			let that = this;
			try {
				let res = await this.$api.GetGoodsInfo(this.formParams);
				// console.log(res)
				if (res.Success) {
					that.business = res.Data.business;
					that.goods = res.Data.goods;
					if(that.goods.project_video){
						that.videoContext = uni.createVideoContext('proVideo')
					}
					
					
					that.auction = res.Data.auction;
					that.banners = res.Data.goods.project_img.split(',');
					that.details_img = res.Data.goods.project_details;
					that.service1 = res.Data.projectService1;
					that.service2 = res.Data.projectService2;
					that.service3 = res.Data.projectService3;
					that.share_consumer_info = res.Data.share_consumer_info;
					that.skuList = res.Data.skuList;
					that.specifications = res.Data.specList;
					if (that.goods.is_activity == 1) {
						that.activityInfo = res.Data.activityInfo;
						that.endTime = res.Data.activityInfo.end_date;
					}
					// setTimeout(() => {
					if (that.skeletonShow) {
						that.skeletonShow = false;
					}

					// }, 1000);
				} else {
					that.skeletonShow = false;
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				that.skeletonShow = false;
				console.log('请求结果false : ' + err);
			}
			if (callback) callback();
		},
		// 购买
		_buy(data) {
			let d = {
				id: data.id ? data.id : '',
				difference: data.difference ? data.difference.join(',') : '',
				price: data.sellprice ? data.sellprice : '',
				origin: data.origin ? data.origin : '',
				stock: data.stock ? data.stock : ''
			};
			let cardData = {
				shop_name: this.business.shop_name,
				shop_logo: this.business.shop_logo,
				project_code: this.formParams.project_code,
				project_name: this.goods.project_name,
				project_img: this.banners[0],
				is_ems: this.goods.is_ems,
				project_parameter_type: this.goods.parameter_type,
				project_spec: d,
				project_price: this.goods.project_price,
				project_raise_price: this.goods.project_raise_price,
				project_num: data.selectNum,
				project_service1: data.goods_service_code.serve1,
				project_service2: data.goods_service_code.serve2,
				project_service3: data.goods_service_code.serve3
			};
			this.$store.commit('creatOrder', [cardData]);
			let url = '/pages/features/createOrder/createOrder?type=0';
			if (this.shareActive) {
				if (this.selfBuy) {
					url += `&shareOrder=${this.selfOrder}`;
				} else {
					url += `&shareOrder=${this.shareOrder}`;
				}
			}
			// debugger
			uni.navigateTo({
				url: url
			});
		},

		// 取消支付
		cancelPass() {
			this.payFlag = false;
		},
		// 确认密码
		checkPwd(e) {
			if (!e) {
				that.$ui.toast('取消购买');
				return;
			}
			// alert(e)
			// this._addPrize(e);
			// this.payFlag = false;
		},
		handleClick(e) {
			let index = e.index;
			if (index === 0) {
				// this.tui.toast("你点击了取消按钮")
			} else {
				switch (this.action) {
					case 'login':
						uni.navigateTo({
							url: '/pages/role/login/login'
						});
						break;
					case 'authentication':
						uni.navigateTo({
							url: '/pages/features/authentication/authentication'
						});
						break;
					case 'payPass':
						uni.navigateTo({
							url: '/pages/user/setPayPass/setPayPass'
						});
						break;
					default:
						break;
				}
			}
			this.modal = false;
		}

	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding-bottom: 200rpx;
	.videoBox{
		width: 100%;
		height:774rpx;
		position: absolute;
		left:-999;
		top: -999;
		z-index: -1;
	}
	.swiper {
		height: 774rpx;
		position: relative;
		.swiperBg{
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
			background-color: rgba(0,0,0,0.2);
		}
		.bar {
			position: absolute;
			width: 100%;
			height: 120rpx;
			// line-height: 120rpx;
			background: #dd3a30;
			color: #fff;
			left: 0;
			bottom: 0;
			z-index: 10;
			padding: 0 20rpx;
			box-sizing: border-box;
			border: none;
			.acountTit {
				width: 100%;
			}
			.acountConten {
				width: 100%;
				.price {
					font-size: 36rpx;
					position: relative;
					text-indent: 20rpx;
					margin-right: 20rpx;
					&::after {
						content: '￥';
						position: absolute;
						left: -26rpx;
						font-size: 20rpx;
						bottom: 0;
						color: #fff;
					}
				}
				.delete {
					margin-top: 4rpx;
					font-size: 24rpx;
					text-decoration: line-through;
				}
			}
			.aside {
				position: absolute;
				right: 0;
				top: 0;
				height: 120rpx;
				padding: 0 40rpx 0 60rpx;
				// background: url(../../../static/img/right.png) left top/cover no-repeat;
				color: #ed754b;
			}
		}
	}
	.timeBox {
		line-height: 70rpx;
		height: 70rpx;
		text-align: center;
		color: #fff;
		background: #d12020;
		font-size: 26rpx;
		.statusBox {
			width: 300rpx;
			height: 100%;
			// background: url(../../../static/img/bg.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
		}
	}
	.boxs {
		background: #fff;

		margin-bottom: 16rpx;
	}
	.box1 {
		padding: 36rpx 20rpx;
		.titleBox {
			margin-top: 12rpx;
			margin-bottom: 16rpx;
			.cm_prize {
				margin-top: -10rpx;
				font-size: 40rpx;
				color: #e02e24;
				font-weight: 600;
			}
		}
		.cm_title {
			line-height: 1.2;
			font-size: 30rpx;
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
		.msgBar {
			margin-top: 24rpx;
			margin-bottom: 4rpx;
			// justify-content: flex-start;
			width: 100%;
			height: 80rpx;
			background: #f8f8f8;
			border-radius: 16rpx;
			.testTags {
				font-size: 24rpx;
				color: #666;
			}
			.blank {
				width: 4rpx;
				height: 26rpx;
				background: #666;
				margin: 0 24rpx;
			}
		}
		.logoBox {
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 6rpx;
			background: #f2e5da;
			color: #642704;
			padding: 0 20rpx;
			margin-top: 20rpx;
			.logo {
				width: 56rpx;
				height: 56rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.name {
				color: #642704;
			}
			.blank {
				width: 4rpx;
				height: 24rpx;
				background: #642704;
				margin: 0 20rpx;
			}
		}
	}
	.box2 {
		padding: 0 20rpx;
		.titleBar {
			line-height: 66rpx;
			height: 66rpx;
		}
		.cells {
			height: 72rpx;
			line-height: 72rpx;
		}
		.prizeBox {
			.prizeItems {
				background: #f8f8f8;
				border-radius: 10rpx;
				margin-top: 16rpx;
				height: 122rpx;
				overflow: hidden;
				.avatar {
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					margin-right: 16rpx;
					margin-left: 16rpx;
				}
				.name {
					line-height: 1.5;
					font-size: 28rpx;
					color: #333;
					font-weight: 600;
				}
				.mark {
					height: 122rpx;
					width: 122rpx;
					text-align: center;
					line-height: 122rpx;
					background: #dedede;
					color: #999;
					font-size: 30rpx;
					margin-left: 32rpx;
				}
			}
			.active {
				.mark {
					background: var(--cl_primary);
					color: #333;
				}
			}
		}
	}
	.box4 {
		padding: 20rpx;
		.cells {
			height: 72rpx;
			line-height: 72rpx;
		}
	}
	.box3 {
		margin-bottom: 0;
		padding: 30rpx 20rpx;
		.picBox {
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			// margin-bottom: 20rpx;
			.avatar {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				margin-right: 20rpx;
				overflow: hidden;
				img {
					width: 90rpx;
					height: 90rpx;
				}
			}
			.name {
				// margin-bottom: 16rpx;
			}
			.jd {
				width: 152rpx;
				line-height: 58rpx;
				height: 58rpx;
				border: none;
				background: var(--cl_primary);
				color: #fff;
				text-align: center;
				padding: 0;
				font-size: 26rpx;
				border-radius: 29rpx;
			}
		}
		.scoreBox {
			padding: 24rpx 0 8rpx 0;
			border-top: 1rpx solid #e5e5e5;
			.score {
				margin-left: 10rpx;
				color: #d12020;
			}
		}
	}
	.video {
		width: 100vw;
	}
	.commonTit {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		.blank {
			width: 40rpx;
			height: 4rpx;
			background: #333;
			margin: 0 12rpx;
		}
	}
	.footerBox {
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
		// z-index: 100;
		width: 100vw;
		.footer {
			width: 100%;
			height: 100rpx;
			background: #fff;

			padding: 0 24rpx;
			.mes {
				width: 100rpx;
			}
			.cm_des {
				font-size: 20rpx;
			}
			.sure {
				margin-top: 0;
				width: 100%;
				color: #fff;
			}
		}
		.shareTip {
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			background: #ffede2;
			padding: 0 24rpx;
		}
	}
}
.mask-screen {
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	// opacity: 0.5;
	overflow: hidden;
	z-index: 10;

	.region-box {
		width: 100%;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 20;
		background: #fff;
		padding: 8rpx 50rpx;
		box-sizing: border-box;
		border-radius: 20rpx 20rpx 0 0;
		.cm_title {
			margin-top: 24rpx;
		}
		.cm_des {
			line-height: 2;
			padding: 26rpx 0;
		}
		.btns {
			height: 80rpx;
			line-height: 80rpx;
			background: #ddb152;
			color: #fff;
			border-radius: 40rpx;
		}
	}
}
.shareBox {
	width: 80vw;
	background-color: #fff;
	border-radius: 30rpx;
	padding: 40rpx;
	.itemLogo {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
}
.btnBox {
	width: 100%;
	height: 80rpx;
	border-radius: 40rpx;
	line-height: 80rpx;
	overflow: hidden;
	background: #d1a320;
	color: #fff;
	box-shadow: none;
	margin-top: 10rpx;
	.btns {
		width: 50%;
		height: 80rpx;
		line-height: 80rpx;
		background: #ddb152;
		color: #fff;
		border-radius: 0 !important;
	}
}
.backBtn {
	position: fixed;
	right: 40rpx;
	bottom: 158rpx;
	width: 90rpx;
	height: 90rpx;
	border-radius: 50%;
}
.asideBar {
	width: 90rpx;
	height: 90rpx;
	border-radius: 50%;
	background: var(--cl_primary);
	position: fixed;
	right: 40rpx;
	bottom: 238rpx;
	// z-index: 50;
}
.asideBar2 {
	width: 90rpx;
	height: 90rpx;
	border-radius: 50%;
	background: #fff;
	border: 4rpx solid var(--cl_primary);
	color: var(--cl_primary);
	position: fixed;
	right: 40rpx;
	bottom: 338rpx;
}

/*底部抽屉样式 start*/
</style>
