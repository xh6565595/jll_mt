<template>
	<view>
		<view class="pages" v-if="hasLogin" style="background: #F4B34B;" >
			<!-- <view class="fixed">
				<tuiNav :isCustom="true" :isFixed="false" backgroundColor="#fff">
					<view class="flex flex_center header"> 
						<view class="f1 cm_tex_c">免单活动</view>
						<view><text class="rTip"></text></view>
					</view>
				</tuiNav>
			</view> -->
			<!-- 苏打粉 -->
			<view v-if="noneItem" class="firstLunch animated fadeIn" style="width: 100%;min-height: 90vh;">
				<image src="http://gllo.kuxiong999.com/hd_fm.jpg" mode="widthFix" class="firstLunchTop" width='100%'></image>

				<button type="default" class="nowbtn" @tap="_toBuy">立即购买</button>


				<view class="f1" style="padding: 20rpx;">
				
				</view>
			</view>
			<view v-else>
			    <view class=" flex-center" style="height: 54rpx;
			    line-height: 54rpx;
			    position: absolute;
			    padding: 0 25rpx;
			    background-color: #6b3a04;
			    color: #fff;
			    border-radius: 27rpx 0 0 27rpx;
			    left: 78%;
			    top: 19rpx; right: 0rpx; " ><text @tap="_gz" >活动规则</text></view>
				<image src="http://gllo.kuxiong999.com/hd_fm.jpg" mode="widthFix" class="firstLunchTop" width="100%"></image>
				
				<view class="hot">
					<block v-for="(item, index) in list" :key="index">
						<view v-if="item.user_list.share_count<11">
							<view class="inItem animated fadeIn" style="background: #ffffff;">
								<view style="display:flex;  justify-content:center;">
									<text style="display:flex; flex-direction: column; margin-top: 20rpx; width: 240rpx; height: 60rpx; line-height: 60rpx; align-items: center; background: #EC7538; color: #FFFDEF; border-radius:27rpx;">
									免单产品</text>
								</view>
								<view class="cm_items flex flex_center" style="margin-top: 20rpx;" @tap="_href(item)">
									<image :src="item.project_list[0].skus_img" mode="aspectFill" class="itemLogo">
									</image>
									<view class="f1">
										<view class="cm_title cm_ellipsis2" style="font-size: 30rpx;">
											{{ item.project_list[0].order_name }}
										</view>
										<view class="cm_des" style="font-size: 30rpx;">
											{{ item.project_list[0].skus_name }}
										</view>
										<view class="flex flex_center cm_price_box">
											<view class="cm_price" style="font-size: 30rpx;">
												￥{{ item.project_list[0].price }}</view>
											<view class="f1"></view>
										</view>
									</view>
								</view>
							</view>
							<view class="inItem animated fadeIn" style="background: #ffffff;">
								<view style="display:flex;  justify-content:center;">
									<text style="display:flex; flex-direction: column; margin-top: 20rpx; width: 240rpx; height: 60rpx; line-height: 60rpx; align-items: center; background: #EC7538; color: #FFFDEF; border-radius:27rpx;">
									免单进度</text>
								</view>
								<view v-if="item.user_list.share_count<2" class="text">{{ item.user_list.schedule_date_msg }}</view>
								<view v-else  class="fixbox2">{{ item.user_list.schedule_success_msg }}<navigator class="fixBtn2" :url="`/pages/features/backRecord/backRecord?code=${item.order_code}`">返还记录</navigator></view>
								<view style="display:flex;  justify-content:center;">
									<view class="submenber">
										<image
											:src="item.consumer_head ? item.consumer_head : '/static/image/hd_yq.png'"
											mode="aspectFill" class="submenber_img">
										</image>
										  <text
											style="display:flex; flex-direction: column; height: 40rpx; line-height: 40rpx; width: 120rpx; align-items: center; background: #EC7538; color: #FFFDEF; border-radius:27rpx;">
											发起人</text>
									</view>
								</view>
								<view class="text" style="margin-top: 20rpx;">{{ item.user_list.schedule_msg }}</view>
								<view class="flex  flex_start flex_wrap">
									<block v-for="(item_img, index) in item.user_list.list" :key="index">
										<view class="submenber" style="margin-top: 20rpx;">
											<image
												:src="item_img.consumer_head ? item_img.consumer_head : '/static/image/hd_yq.png'"
												mode="aspectFill" class="submenber_img"></image>
											<text class="submenber_text" style="margin-top: 10rpx;">
												{{item_img.pay_date}}</text>
										</view>

									</block>
									<view v-if="item.user_list.share_count<10" class=" submenber1" @tap="_hrefSahre(item)">
										<image :src="'/static/image/hd_yq.png'" mode="aspectFill" class="avatar">
										</image>
									</view>

								</view>
								<button type="text" class="cm_btn" hover-class="cm_hover_m"
									@tap="_hrefSahre(item)">邀请好友购买</button>

								<button type="text" class="cm_btn_plain" hover-class="cm_hover_m"
									@tap="_href(item)">自己购买</button>
							</view>
						</view>
					</block>
				</view>
				<LoadMore :status="loadStatus" />
			</view>
		</view>
		<view class="flex  flex_y flex_center" style="width: 100vw;height: 100vh;background-color: #fff;" v-else>
			<text>暂未登录</text>
			<navigator url="../login/login" class="cm_btn" style="width:256rpx;margin-top: 40rpx;">立即登录</navigator>
		</view>
		<rule ref="rule"></rule>
		<accredit ref="share" :autoClose="true">
			<view slot="content" class="shareBox">
				<view class="flex flexd_center">
					<image :src="goods.image" mode="aspectFill" class="itemLogo"></image>
					<view class="f1">
						<view class="cm_title cm_ellipsis2">{{ goods.title }}</view>
						<view class="flex flex_center" style="margin: 10rpx 0;">
							<view class="cm_des f1">{{ goods.sub_title }}</view>
						</view>
						<view class="cm_price" style="margin-bottom: 20rpx;">￥{{ goods.price }}</view>
					</view>
				</view>
				<button type="text" class="cm_btn" hover-class="cm_hover_m" open-type="share">立即分享给好友</button>
			</view>
		</accredit>
		<tui-modal :show="gzshow" custom>
			<view class="tui-modal-custom">
				<scroll-view class="scrollBox" :scroll-y="true">
					<view class="tui-modal-custom-text">
						健康马桶免费拿活动规则：</br>
						1、凡成功购买一台健康马桶的用户即获得本次活动的参与资格。</br>
						2、获得本次活动参与资格的用户，在成功推荐两台健康马桶付款成交后，即可享受从次月三号起每月返还100元本金，返还累计与所购健康马桶价款等额为止。</br>
						3、本次活动不限于只可推荐两台健康马桶，如成功推荐四台健康马桶付款成交，则次月三号起可获得每月300元的本金返还，推荐六台健康马桶成交可获得每月500元本金返还，推荐八台健康马桶成交可获得每月700元本金返还，推荐十台健康马桶成交可获得每月1000元的本金返还，但返还奖励的总额都只累计至与用户所购健康马桶价款等额为止。</br>
						4、活动期间产品运输费用及安装费用由本公司承担。</br>
						五、如购买健康马桶用户的产品使用空间位置未预留220V电源插座，需用户付费安装。</br>
						六、本次活动产品一律享有，两年免费保修，终身售后的服务。</br>
						七、本活动无参与次数限制。取得活动参与资格的用户返还奖励终止后，可再次购买健康马桶重新获取活动参与资格，并享有同等权益。</br>
				 
					</view>
				</scroll-view>
				<!-- <tui-button  :size="28" type="danger" shape="circle" @click="handleClick">确定</tui-button> -->
				<button type="success" class="cm_btn" @tap="_close">关闭</button>
			</view>
		</tui-modal>
		<!-- <qrcodePoster ref="poster" 
				:title="goods.title" 
		        :subTitle="goods.sub_title" 
		        :headerImg="goods.image"
		        :price="goods.price"></qrcodePoster> -->
	</view>
</template>





<script>
	import tuiTips from '@/components/extend/tips/tips';
	import {
		mapState
	} from 'vuex';
	import rule from '@/components/rule/rule.vue';
	const global_Set_jll = uni.getStorageSync('global_Set_jll');
	import {
		baseMixins
	} from '@/utils/baseMixins.js';
	// import qrcodePoster from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'


	export default {
		data() {
			return {
				tap: 0,
				baseKey: 'GetShareOrderList',
				banners: [],
				hasRow: 'ListInfo',
				formParams: {
					order_status: 0, //0-拼单中 1-已完成
					pageIndex: 1,
					pageSize: 10
				},
				gzshow:false,
				shareMsg: '',
				goods: {
					title: '',
					sub_title: '',
					image: '',
					price: ''
				},
				modal: false,
				text: '',
				topHeight: 144,
				noneItem: false,
				is_show_model: false
			};
		},
		mixins: [baseMixins],
		computed: mapState(['userInfo', 'hasLogin']),
		components: {
			rule,
			tuiTips,
			// qrcodePoster
		},
		onLoad() {
			this.shareMsg = {
				title: `分享好友，马桶免费拿`,
				path: `/pages/index/index`,
				imageUrl: '/static/share.jpg'
			};
			this.text = global_Set_jll.activity_constraint;
			uni.getSystemInfo({
				success: res => {
					this.topHeight = 2 * (res.statusBarHeight + 44);
				}
			});
		},
		onShow() {
			if (this.hasLogin) {
				// this.noneItem = false
				this._loadData('refresh');

			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
				return {
					title: this.goods.title,
					path: `/pages/index/index?pcode=${this.goods.code}&ucode=${this.goods.user}&ocode=${this.goods.order}`,
					// path: `/pages/main/details/details?code=${this.goods.code}&ucode=${this.goods.user}&ocode=${this.goods.order}`,
					imageUrl: this.goods.image
				};
			} else {
				return this.shareMsg;
			}
		},
		methods: {
			sharePoster() {
				//获取带参数二维码
				this.is_show_model = false
				// this.$refs.poster.showCanvas('https://oss.zhangyubk.com/cmqrcode.jpg') 
				this.$refs.share.showModal()
			},
			_toBuy() {
				uni.switchTab({
					url: '/pages/main/main'
				});
			},
			_close(){
					this.gzshow = false
			},
			_gz(){
				
				this.gzshow = true
				
			},
			_detail(item) {
				let code = item.order_code;
				uni.navigateTo({
					url: `./activityDetail/activityDetail?code=` + code
				});
			},
			handleClick() {},
			_hrefSahre(obj) {
				let item = obj.project_list[0];
				let code = item.project_code;
				let usercode = this.userInfo.consumer_code;

				this.goods = {
					title: item.order_name,
					sub_title: item.skus_name,
					image: item.skus_img,
					price: item.price,
					code: code,
					user: usercode,
					order: obj.order_code
				};

				this.sharePoster()
			},
			_href(obj) {
				let item = obj.project_list[0];
				let code = item.project_code;

				uni.navigateTo({
					url: `/pages/main/details/details?type=self&order=${obj.order_code}&code=` + code
				});
			},
			_hrefShow(obj) {
				console.log(1)
			},
			_showRule() {
				this.$refs.rule.showModal();
			},
			_switch(k) {
				this.noneItem = false
				this.tap = k;
				this.formParams.order_status = k;
				this.list = [];
				this._loadData('refresh');
			},
			loadDataComplete() {

				if (this.list.length == 0) {
					this.noneItem = true

				} else {

					this.noneItem = false
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pages {
		.fixbox2
		{
			line-height: 80rpx;
			padding:0rpx 0rpx 0rpx 20rpx; 
			height: 80rpx; 
			margin-top: 30rpx;
			margin-bottom: 50rpx; 
			border-radius: 27rpx; 
			background: #FAE0BF; 
			color: #BE8E62; 
			display:flex;
			
		}
		.fixBtn{
			    line-height: 50rpx;
			    padding: 0 20rpx;
			    border-radius: 34rpx;
			    border: 1rpx solid #fff;
			    font-size: 24rpx;
			    color: #ffffff;
			    width: 160rpx;
			    background: #BB6E3D;
			    margin: 20rpx auto 0 auto;
		}
		.fixBtn2
		{
			margin-top: 18rpx;
			
			margin-left: 25%;
			line-height: 50rpx;
			height: 50rpx;
			padding: 0 20rpx;
			border-radius: 34rpx;
			font-size: 24rpx;
			color: #ffffff;
			width: 150rpx;
			text-align:center;
			background: #BB6E3D;
		}
		// padding: 20rpx;
		// padding-top: 260rpx;
		.fixed {
			width: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 10;
			background-color: #fff;
		}

		.header {
			width: 100%;
			height: 88rpx;
			line-height: 88rpx;
			position: relative;
			background-color: #fff;

			.lTip {
				height: 54rpx;
				line-height: 54rpx;
				position: absolute;
				padding: 0 16rpx;
				background-color: #6b3a04;
				color: #fff;
				border-radius: 0 27rpx 27rpx 0;
				left: 0;
				top: 17rpx;
			}

			.rTip {
				height: 54rpx;
				line-height: 54rpx;
				position: absolute;
				// padding: 0 16rpx;
				// background-color: #6B3A04;
				// color: #fff;
				// border-radius:0 27rpx  27rpx 0;
				right: 0;
				top: 17rpx;
			}

		}

		.tabsBox {
			height: 80rpx;
			line-height: 80rpx;
			background-color: #fff;

			.tabs {
				text-align: center;
				line-height: 80rpx;
				position: relative;
			}

			.active {
				&::after {
					content: '';
					position: absolute;
					width: 28rpx;
					height: 6rpx;
					border-radius: 3rpx;
					background-color: var(--cl_primary);
					left: 50%;
					margin-left: -14rpx;
					bottom: 12rpx;
				}
			}
		}

		.inItem {
			background-color: #fff;
			padding: 20rpx;
			margin-bottom: 20rpx;
			padding-top: 0;
			border-radius: 10rpx;
			.title {
				margin-top: 70rpx;
				text-align: center;
			}

			.text {
				margin-top: 40rpx;
				margin-bottom: 40rpx;
				text-align: center;
			}

			.cred {
				color: red;
			}

			.submenber1 {
				width: 100rpx;
				height: 100rpx;
				border-radius: 60rpx;
				overflow: hidden;
				margin-left: 15rpx;
				margin-top: 20rpx;

				.avatar {
					width: 100%;
					height: 100%;
					background-color: #f2f2f2;
				}

			}

			.submenber {

				display: flex;
				flex-direction: column;
				width: 20%;
				align-items: center;


				.submenber_img {
					display: flex;
					width: 100rpx;
					height: 100rpx;
					border: 2rpx solid #fff;
					border-radius: 60rpx;
					margin-left: 16rpx;
				}

				.submenber_text {
					display: flex;
					font-size: 20rpx;
					flex-direction: column;
					width: 120rpx;
					align-items: center;
					color: #9A6440;
					border-radius: 27rpx;
				}

			}

			.cm_btn {
				margin-top: 72rpx;
			}

			.cm_btn_plain {
				margin-top: 20rpx;
				background-color: #fff;
				border: none;
			}
		}

		.doneItem {
			background-color: #fff;
			padding: 20rpx;
			margin-bottom: 20rpx;
			// .header {
			// 	padding-top: 6rpx;
			// 	padding-bottom: 6rpx;

			// 	.cm_title {
			// 		line-height: 1;
			// 	}
			// }
			.cm_items {
				margin-top: 20rpx;
				// padding-top: 0;
			}
		}
	}

	.hot {
		padding: 20rpx;

		.hot_left_img {
			width: 60rpx;
			margin-top: 10rpx;
			margin-right: 20rpx;
		}

		.hot_right_img {
			width: 60rpx;
			margin-top: 10rpx;
			margin-left: 20rpx;
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
	.firstLunchTop {
		width: 100%;
	}
	.firstLunch {
		width: 100vw;
		min-height: 100%;
		background-color: #fd8e3e;
		z-index: 100;
		padding-bottom: 50rpx;

		

		.upBox {
			justify-content: space-between;
			padding: 72rpx 80rpx;

			.subs {
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
				border: 4rpx dashed #fff;
				text-align: center;
				line-height: 116rpx;
				color: #fff;
				font-size: 50rpx;
				font-weight: 600;
			}
		}

		.hottext {
			font-size: 30rpx;
			color: #FEE7B9;
			margin-top: 20rpx;
			line-height: 1.8;
		}

		.nowbtn {
			width: 650rpx;
			height: 86rpx;
			line-height: 86rpx;
			border-radius: 43px;
			background: linear-gradient(0deg, #fef7be, #e9b249);
			color: #4f2006;
			text-align: center;
			margin-top: 40rpx;
			font-size: 30rpx;

		}

		.richBox {
			margin-top: 80rpx;
			padding: 0 40rpx;
		}

		.block {
			width: 100vw;
			height: 176rpx;
			background: #3bbff7;
		}
	}
</style>
