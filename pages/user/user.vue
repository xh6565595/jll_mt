<template>
	<view class="pages">
		<!-- <view class="header flex flex_center">
			<text class="cm_title">我的</text>
			<text class="f1"></text>
		</view> -->
		<!-- 头部 -->
		<view class="pageTop flex  flex_center">
			<image :src="accountInfo.consumer_head ? accountInfo.consumer_head : '../../static/img/default.jpg'" mode="aspectFill" class="avatar"></image>
			<view class="f1">
				<view class="name cm_title f1">asdfdsf</view>
				<text class="name  f1">asdf</text>
			</view>
			<navigator class="tx" url="/pages/role/login/login">提现</navigator>
		</view>
		
		
		<!-- <view class="shareBox "> -->
		<navigator url="../h5share/h5share"  class="shareBox ">
			<image src="../../static/image/wd_yq.png" mode="scaleToFill" class="bg"></image>
			<!-- <button class="share">去邀请</button> -->
		</navigator>
		<!-- </view> -->
		<!-- 个人信息 -->
		<view class="accountBox">
				<view class=" flex flex_center">
					<view class="cm_title f1">我的订单</view>
					<view class="flex flex_center cm_des" @tap="_href('/features/order/order?current=0')">
						查看更多
						<text class="iconfont icon-fanhui3"></text>
					</view>
				</view>
				<view class="flex flex_center flex_between">
					<view class="menus flex flex_center flex_y " @tap="_href('/features/order/order?current=1')">
						<image src="../../static/image/dd_df.png" class="menusPic"></image>
						<text class="cm_t_24">待付款</text>
						<view class="tips" v-if="accountInfo.wait_paying_count">{{ accountInfo.wait_paying_count }}</view>
					</view>
			
					<view class="menus flex flex_center flex_y" @tap="_href('/features/order/order?current=2')">
						<image src="../../static/image/dd_dfh.png" class="menusPic"></image>
						<text class="cm_t_24">待发货</text>
						<view class="tips" v-if="accountInfo.wait_sending_count">{{ accountInfo.wait_sending_count }}</view>
					</view>

					<view class="menus flex flex_center flex_y" @tap="_href('/features/order/order?current=3')">
						<image src="../../static/image/dd_dsh.png" class="menusPic"></image>
						<text class="cm_t_24">待收货</text>
						<view class="tips" v-if="accountInfo.wait_receiving_count">{{ accountInfo.wait_receiving_count }}</view>
					</view>

					<view class="menus flex flex_center flex_y" @tap="_href('/features/refundList/refundList')">
						<image src="../../static/image/dd_th.png" class="menusPic"></image>
						<text class="cm_t_24">退货</text>
						<view class="tips" v-if="accountInfo.returned_goods_count">{{ accountInfo.returned_goods_count }}</view>
					</view>
	
				</view>
		</view>

		<!-- 菜单 -->
		<view class="menusBox">
			<view class="boxs">
				<!-- <view class="cm_title">其他工具</view> -->
				<view class="">
					<view class="menus flex flex_center " @tap="_href('/features/adress/adress')">
						<image src="../../static/image/wd_mx@2x.png" class="menusPic"></image>
						<text class="cm_t_24 f1">余额明细</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
					<view class="menus flex flex_center " @tap="_href('/features/adress/adress')">
						<image src="../../static/image/wd_dz.png" class="menusPic"></image>
						<text class="cm_t_24 f1">收货地址</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
					<view class="menus flex flex_center " @tap="_href('/features/comment/comment')">
						<image src="../../static/image/wd_fk.png" class="menusPic"></image>
						<text class="cm_t_24 f1">意见反馈</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
					<view class="menus flex flex_center " @tap="_href('/user/set/set')">
						<image src="../../static/image/wd_sz.png" class="menusPic"></image>
						<text class="cm_t_24 f1">设置</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
					<view class="menus flex flex_center " @tap="_kefu">
						<image src="../../static/image/wd_kf.png" class="menusPic"></image>
						<text class="cm_t_24 f1">客服</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
				</view>
			</view>
		</view>

		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :content="content" :maskClosable="false" color="#333" :size="32"></tui-modal>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import tuiLoadmore from '@/components/loadmore/loadmore';
import http from '@/utils/http/index.js';

export default {
	data() {
		return {
			// accountInfo: '',
			kefu: '',
			modal: false,
			logining: false,
			content: '请您先登录',
			action: 'login',
			loginParams: {
				username: '',
				password: '',
				vilidate: '000000'
			},
			formParams: {
				key: '',
				type: 4,
				pageIndex: 1,
				pageSize: 6
			},
			list: [],

			set: {
				appid: 'wx09daee2f47e178aa', //测试环境
				// appid: 'wx450d3b4e0f18461f', //正式环境
				redirect_uri: 'http://192.168.1.8:8081/pages/user/user'
				// redirect_uri: http.mainUrl + 'index.html'
			}
		};
	},
	onLoad() {
		let that = this;

		// this.autoLogin()
		// this.GetKefu();

		// 注册刷新事件
		uni.$on('refresh_user', function() {
			// console.log(1213541)
			that.loadData();
		});
		that._loadData();
	},
	onShow() {
		// this.loadData()
	},
	computed: {
		hasLogin() {
			return this.$store.state.hasLogin ? this.$store.state.hasLogin : false;
		},
		accountInfo() {
			return this.$store.state.accountInfo;
		}
	},
	watch: {
		hasLogin(newValue, oldValue) {
			// console.log(oldValue)
			// console.log(newValue)
			this.loadData();
			// this.loadData();
		}
		// accountInfo(o,n){
		// 	console.log(o)
		// 	console.log(n)
		// },
	},
	components: {
		tuiLoadmore
	},
	// 下拉刷新
	onPullDownRefresh() {
		if (!this.hasLogin) {
			uni.stopPullDownRefresh();
			return;
		}
		this.loadData(() => {
			uni.stopPullDownRefresh();
		});
	},
	methods: {
		_toAuth() {
			window.location.href =
				'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
				this.set.appid +
				'&redirect_uri=' +
				this.set.redirect_uri +
				'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect';
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
		},
		_href(val) {
			if (!this.hasLogin) {
				this.content = '请您先登录';
				this.action = 'login'; ///features/authentication/authentication'
				this.modal = true;
				return;
			}
			switch (val) {
				case 'set':
					uni.navigateTo({
						url: '/pages/user/set/set'
					});
					break;
				default:
					uni.navigateTo({
						url: `/pages${val}`
					});
					break;
			}
		},
		// 加载个人信息
		async loadData(callback) {
			// alert(1)
			let that = this;
			try {
				// this.$ui.showloading();

				let res = await this.$api.getConsumer({}, false);
				// this.$ui.hideloading();
				// "wait_paying_count": 0,     //订单支付订单数
				//         "wait_sending_count": 0,    //等待发货订单数
				//         "wait_receiving_count": 0,  //等待收货订单数
				//         "returned_goods_count": 0,  //等待收货订单数
				// console.log(res)
				if (res.Success) {
					if (res.Data) {
						that.$store.commit('setAccountInfo', res.Data);
						// that.accountInfo = res.Data;
					}
				} else {
					that.$ui.toast(res.Msg);
				}
				if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		handleClick(e) {
			let index = e.index;
			if (index === 0) {
				// this.tui.toast("你点击了取消按钮")
			} else {
				// this.tui.toast("你点击了确定按钮")

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
		},
		// 客服
		_kefu() {
			// let phone = this.waiter.link_value;
			const phone = uni.getStorageSync('global_Set_jll').service_mobile;
			let that = this;
			// console.log(phone)
			uni.showModal({
				title: '洁利来商城提醒你',
				content: '立即致电官方客服？',
				success: function(res) {
					that.show = false;
					if (res.confirm) {
						uni.makePhoneCall({
							phoneNumber: phone //仅为示例
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.pages {
	min-height: 100vh;
	padding: 20rpx;
	// padding-top: 88rpx;
	background-color: #f8f8f8;
	.header {
		width: 100%;
		line-height: 88rpx;
		height: 88rpx;
		font-size: 32rpx;
		color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		background: #f8f8f8;
		padding: 0 30rpx;
		z-index: 100;
		.btns {
			width: 88rpx;
			height: 88rpx;
			.iconfont {
				font-size: 44rpx;
			}
		}
	}
	.pageTop{
		height: 180rpx;
		.avatar{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 24rpx;
			border: 4rpx solid #d9d9d9;
		}
		.tx{
			height: 54rpx;
			line-height: 50rpx;
			border-radius: 27rpx;
			border: 2rpx solid #333;
			padding: 0 32rpx;
			
		}
	}
	.shareBox{
		height: 88rpx;
		line-height: 88rpx;
		position: relative;
		margin-bottom: 20rpx;
		.bg{
			width: 100%;
			height: 100%;
		}
		.share{
			color: #333333;
			font-size: 24rpx;
			padding: 0 24rpx;
			position: absolute;
			right: 24rpx;
			top: 20rpx;
			height: 48rpx;
			line-height: 48rpx;
			border-radius: 24rpx;
			background: linear-gradient(45deg, #FAE0C7, #F4C7A4);
		}
	}
	.accountBox {
		width: 100%;
		height: 226rpx;
		position: relative;
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		.content {
			height: 160rpx;
		}
		.menus {
			width: 100%;
		
			position: relative;
			.menusPic {
				width: 60rpx;
				height: 60rpx;
				margin-bottom: 20rpx;
				margin-top: 32rpx;
			}
			.tips {
				width: 30rpx;
				height: 30rpx;
				color: #fff;
				background: red;
				border-radius: 50%;
				position: absolute;
				right: 20rpx;
				top: 20rpx;
				font-size: 20rpx;
				text-align: center;
				line-height: 30rpx;
			}
		}
	}
	.menusBox {
		// padding: 20rpx;
		margin-top: 16rpx;
		.boxs {
			padding: 0rpx 20rpx;
			border-radius: 12rpx;
			background: #fff;
			margin-bottom: 20rpx;
			.cm_title {
				// margin-top: 12rpx;
			}
			.menus {
				width: 100%;
				height: 92rpx;
				.menusPic {
					width: 48rpx;
					height: 48rpx;
					margin-right: 12rpx;
				}
			}
			.menuTextNum {
				font-size: 48rpx;
				color: #5bc1ab;
				margin-bottom: 20rpx;
				margin-top: 36rpx;
			}
		}
	}
	.shadowLeft {
		// box-shadow:  -4rpx 0 16rpx #eee ;
		position: relative;
		&::before {
			content: '';
			width: 30rpx;
			height: 80rpx;
			// background: red;
			position: absolute;
			left: -30rpx;
			top: 48rpx;
			overflow: hidden;
			// border: 1rpx solid red;
			// background: radial-gradient(0 0,  #333,#fff );
			background: -webkit-radial-gradient(center, #dedede 30%, #fff 70%);
			// background-size: 90% 60%;
			background-position: 20rpx 0;
			background-repeat: no-repeat;
		}
	}
	.hot {
		width: 100%;
		padding: 0 20rpx;
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

			.proItemsBox {
				width: calc((100% - 56rpx) / 2);
				height: 560rpx;
				background: #fff;
				border-radius: 14rpx;
				margin-top: 16rpx;
				overflow: hidden;

				.picBox {
					width: 100%;
					height: 356rpx;
					position: relative;

					.pre {
						width: 100%;
						height: 347rpx;
						opacity: 0;
					}

					.timeBox {
						position: absolute;
						left: 0;
						bottom: -4rpx;
						width: 100%;
						height: 52rpx;
						line-height: 52rpx;
						background: $uni-color-error;
						color: #fff;
						text-align: center;
					}
				}

				.msgBox {
					padding: 16rpx;
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
	}
}
</style>
