<template>
	<view class="pages">
		<!-- <view class="header flex flex_center">
			<text class="cm_title">我的</text>
			<text class="f1"></text>
		</view> -->
		<!-- 头部 -->
		<view class="pageTop flex  flex_center" v-if="hasLogin">
			<image :src="userInfo.consumer_head ? userInfo.consumer_head : '../../static/img/default.jpg'" mode="aspectFill" class="avatar"></image>
			<view class="f1">
				<view class="name cm_title f1">{{ userInfo.consumer_nick_name }}</view>
				<text class="name  f1">余额：{{ userInfo.consumer_blance }}</text>
			</view>
			<navigator class="tx" url="/pages/features/deposit/deposit">提现</navigator>
		</view>
		<!-- <view class="pageTop flex  flex_center"  v-else > -->
		<navigator url="../login/login" class="pageTop flex  flex_center" v-else>
			<image src="../../static/img/default.jpg" mode="aspectFill" class="avatar"></image>
			<view class="f1"><view class="name cm_title f1">暂未登录</view></view>
		</navigator>
		<!-- </view> -->

		<!-- <view class="shareBox "> -->
		<!-- 推广者显示 -->
		<navigator url="./share/share" class="shareBox " v-if="hasLogin && userInfo.consumer_type == 2">
			<!-- <navigator url="./share/share"  class="shareBox " > -->
			<image src="http://gllo.kuxiong999.com/wd_yq.png" mode="scaleToFill" class="bg"></image>
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
					<view class="tips" v-if="hasLogin && userInfo.wait_paying_count">{{ userInfo.wait_paying_count }}</view>
				</view>

				<view class="menus flex flex_center flex_y" @tap="_href('/features/order/order?current=2')">
					<image src="../../static/image/dd_dfh.png" class="menusPic"></image>
					<text class="cm_t_24">待发货</text>
					<view class="tips" v-if="hasLogin && userInfo.wait_sending_count">{{ userInfo.wait_sending_count }}</view>
				</view>

				<view class="menus flex flex_center flex_y" @tap="_href('/features/order/order?current=3')">
					<image src="../../static/image/dd_dsh.png" class="menusPic"></image>
					<text class="cm_t_24">待收货</text>
					<view class="tips" v-if="hasLogin && userInfo.wait_receiving_count">{{ userInfo.wait_receiving_count }}</view>
				</view>

				<view class="menus flex flex_center flex_y" @tap="_href('/features/order/order?current=4')">
					<image src="../../static/image/dd_th.png" class="menusPic"></image>
					<text class="cm_t_24">已签收</text>
					<!-- <view class="tips" v-if="userInfo.returned_goods_count">{{ userInfo.returned_goods_count }}</view> -->
				</view>
			</view>
		</view>

		<!-- 菜单 -->
		<view class="menusBox">
			<view class="boxs">
				<!-- <view class="cm_title">其他工具</view> -->
				<view class="">
					<!-- <view class="menus flex flex_center " @tap="_href('/features/backRecord/backRecord')">
						<image src="../../static/image/wd_mx@2x.png" class="menusPic"></image>
						<text class="cm_t_24 f1">返还记录</text>
						<text class="iconfont icon-fanhui3"></text>
					</view> -->
					<view class="menus flex flex_center " @tap="_href('/features/depositRecord/depositRecord')">
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
					<view class="menus flex flex_center " @tap="_kefuMenu">
						<image src="../../static/image/wd_kf.png" class="menusPic"></image>
						<text class="cm_t_24 f1">客服</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
					<view class="menus flex flex_center " @tap="_clear">
						<image src="../../static/image/wd_sz.png" class="menusPic"></image>
						<text class="cm_t_24 f1">清除缓存</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
					<view class="menus flex flex_center " @tap="_toAttention">
						<image src="../../static/image/wd_hy.png" class="menusPic"></image>
						<text class="cm_t_24 f1">订阅消息</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
					<view class="menus flex flex_center " @tap="_gz">
						<image src="../../static/image/wd_yqm.png" class="menusPic"></image>
						<text class="cm_t_24 f1">活动规则</text>
						<text class="iconfont icon-fanhui3"></text>
					</view>
				</view>
			</view>
		</view>
		<!-- <button type="success" class="btns" open-type="contact" >客服</button> -->
		<tui-modal :show="modal" @click="handleClick" @cancel="hide" :content="content" :maskClosable="false" color="#333" :size="32"></tui-modal>
		<accredit ref="kf" :autoClose="true">
			<view slot="content" class="fkContent">
				<image src="../../static/image/kfbg.jpg" mode="widthFix" class="bg"></image>
				<view style="padding: 50rpx;">
					<view class="gray" style="line-height: 2;">我们将会全心全意为您提供满意周到的咨询服</view>
					<button type="text" class="cm_btn" hover-class="cm_hover_m" open-type="contact">和他聊聊</button>
					<button type="text" class="cm_btn_plain" hover-class="cm_hover_m" @tap="_kefu">拨打客服热线</button>
				</view>
				<image src="../../static/image/close.png" mode="widthFix" class="closeBtn"></image>
			</view>
		</accredit>
		<accredit ref="dy" :autoClose="true">
			<view slot="content" class="dyContent flex flex_y flex-center">
				<view class="cm_title" style="margin-bottom: 20rpx;">开通订阅消息</view>

				<view class="flex  flex_center"><image src="https://gllo.kuxiong999.com/logo.jpg" mode="scaleToFill" style="width: 280rpx;height: 280rpx;"></image></view>

				<view style="margin: 30rpx 0;">
					<view class="cm_text" style="padding-bottom: 20rpx;">请你关注洁利来智能厨卫公众号</view>
					<view class="cm_text">以便我们向您提供及时的推荐消息</view>
					<view class="cm_text">--点击保存图片</view>
					<view class="cm_text">--长按图片识别二维码</view>
					<view class="cm_text">--关注GLLO智能厨卫公众号</view>
				</view>
				<!-- <button type="success" class="cm_btn" @tap="_sureGz" >我已关注，立即开启</button>	 -->
				<button type="success" class="cm_btn" @tap="_save">保存图片到本地</button>
				<!-- <button type="default" class="cm_btn cm_btn_plain" @tap="_cancelGz"   >取消订阅</button>	 -->
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
				<button type="success"  class="cm_btn1" @tap="_close1">同意</button>
				<button type="success" style="background: #888888;"  class="cm_btn1" @tap="_close1">再看看</button>
				</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
const global_Set_jll = uni.getStorageSync('global_Set_jll');
import http from '@/utils/http/index.js';
import accredit from '@/components/accredit/accredit';
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
			text: '',
			gzshow:false,
		};
	},
	onLoad() {
		let that = this;
        this.text = global_Set_jll.activity_constraint;
		uni.$on('gzhAuth', bool => {
			that.$refs.dy.hideModal();
			that._loadData('refresh');
		});
	},
	onShow() {
		if (this.hasLogin) {
			this._loadData('refresh');
		}
	},
	computed: mapState(['userInfo', 'hasLogin']),
	watch: {
		// refreshUser(){
		// }
	},
	onShareAppMessage(res) {
		return {
			title: '洁利来智能马桶',
			path: `/pages/index/index`,
			imageUrl: 'http://gllo.kuxiong999.com/upload/head/jjl.png'
		};
	},
	components: {
		accredit
	},
	// 下拉刷新
	onPullDownRefresh() {
		this._loadData();
	},
	methods: {
		_save() {
			let that = this
			this.$ui.showloading()
			uni.saveImageToPhotosAlbum({
				filePath: '/static/image/ewm.jpg',
				success: function() {
					that.$ui.toast('以保存至本地');
				},
				fail: function(err) {
					console.log(err);
				},
				complete: function() {
					that.$ui.hideloading()
					// console.log(10);
				}
			});
		},
		_preview(img) {
			uni.previewImage({
				urls: [img]
			});
		},
		_toAttention() {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
				return;
			}
			this.$refs.dy.showModal();
		},
		_close1(){
			this.gzshow = false
		},
		_gz(){
			this.gzshow = true
		},
		// 关注检验
		_sureGz() {
			const authId = uni.getStorageSync('authId');
			if (authId) {
				this._oidIfAttention(authId);
			} else {
				uni.navigateTo({
					url: '/pages/features/auth/auth'
				});
			}
			// this.$refs.dy.hideModal()
			// console.log(1)
		},
		// opendi校验是否关注
		async _oidIfAttention(opendId) {
			let that = this;
			try {
				let data = {
					openId: opendId
				};
				uni.showLoading({});
				let res = await this.$api.GetWxOpenid_Attention(data, false);
				this.$ui.hideloading();
				if (res.Success) {
					if (res.Data.subscribe == 1) {
						that.$ui.toast('订阅功能已开启');
					} else {
						that.$ui.toast('订阅功能未开启');
					}
				} else {
					that.$ui.toast(res.Msg);
				}
				// that._loadData('refresh')
				that.$refs.dy.hideModal();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		_cancelGz() {
			this.$refs.dy.hideModal();
		},
		_clear() {
			let that = this
			uni.showModal({
				title:'洁利来提醒您',
				content:'改操作需要重新认证账户信息',
				success(res) {
					if(res.confirm){
						uni.removeStorageSync('access_token');
						uni.removeStorageSync('jll_opid');				
						that.$ui.toast('清除');
						that.$store.commit('logout')
					}
				}
			})
			
		},
		imageLoad(index) {
			this.$set(this.list[index], 'load', true);
		},
		loadError(index) {
			// console.log('图片未找到');
			this.list[index].goods_picture = '/static/img/noPic.jpg';
		},

		_href(val) {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
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
		async _loadData(callback) {
			this.$store.dispatch('refreshUser', () => {
				uni.stopPullDownRefresh();
			});
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
		_close() {
			this.$refs.kf.hideModal();
		},
		// 显示客服弹窗
		_kefuMenu() {
			this.$refs.kf.showModal();
		},
		// 客服
		_kefu() {
			// let phone = this.waiter.link_value;
			const phone = uni.getStorageSync('global_Set_jll').service_mobile;
			let that = this;
			this.$refs.kf.hideModal();
			uni.showModal({
				title: 'GLLO健康智能马桶提醒你',
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
	.pageTop {
		height: 180rpx;
		.avatar {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 24rpx;
			border: 4rpx solid #d9d9d9;
		}
		.tx {
			height: 54rpx;
			line-height: 50rpx;
			border-radius: 27rpx;
			border: 2rpx solid #333;
			padding: 0 32rpx;
		}
	}
	.shareBox {
		height: 88rpx;
		line-height: 88rpx;
		position: relative;
		margin-bottom: 20rpx;
		.bg {
			width: 100%;
			height: 100%;
		}
		.share {
			color: #333333;
			font-size: 24rpx;
			padding: 0 24rpx;
			position: absolute;
			right: 24rpx;
			top: 20rpx;
			height: 48rpx;
			line-height: 48rpx;
			border-radius: 24rpx;
			background: linear-gradient(45deg, #fae0c7, #f4c7a4);
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
	.scrollBox{
		height: 50vh;
		padding: 20rpx 0;
			.tui-modal-custom-text{
				line-height: 1.8;
				color: #333;
			}
	}
	.fkContent {
		position: relative;
		width: 80vw;
		.bg {
			border-radius: 30rpx 30rpx 0 0;
			width: 100%;
			height: 252rpx;
		}
		.cm_btn {
			margin-top: 50rpx;
			background: #43b6b2;
		}
		.cm_btn_plain {
			margin-top: 10rpx;
			color: #333;
			border: none;
		}
		.closeBtn {
			width: 48rpx;
			position: absolute;
			left: 50%;
			margin-left: -24rpx;
			bottom: -86rpx;
			z-index: 100;
		}
	}
	.dyContent {
		width: 90vw;
		padding: 40rpx;
		line-height: 2;
		.cm_title {
			line-height: 2;
			font-size: 36rpx;
		}
		.cm_text {
			line-height: 1.5;
		}
		.cm_btn {
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
