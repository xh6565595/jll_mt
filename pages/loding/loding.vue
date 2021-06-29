<template>
	<view class="pages">

		<view class="flex flex_start" style="background-color: #fff;padding: 20rpx;">
			<image lazy-load="true" src="../../static/image/logo.png" mode="widthFix" class="iLogo"></image>
			<view style="line-height: 60rpx; ">洁利来官方店</view>
			<view class="f1"></view>
			<button type="default" class="inbtn" @tap="_toBuy">查看活动</button>
		</view>

		<view class="" style="background-color: #fff;padding: 20rpx;" >
			<view class="gsStip">上市公司产品质量有保证</view>
		</view>
		<view class="gpstatus">洁利来股份|股票代码832734</view>
		<view style="border-radius: 8rpx;overflow: hidden;width: 100%;">
			<image src="http://gllo.kuxiong999.com/zly_fm.jpg" mode="widthFix" class="firstLunchTop"></image>
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
			<!-- <view class="flex flex_center"
				style="color: #FFFFFF; background: #BC845F; width: 100%; height: 70rpx; border-radius:35rpx; font-size: 24rpx; margin-top: 50rpx;">
				活动时间：即日起购买1年内，分享满2人即获返单资格</view>
			<view class="flex flex_center hottitle">—— 活动规则 ——</view>
			<view class="hottext">
				1、自购一台智能马桶，
			</view>
			<view class="hottext">
				2、推荐二台智能马桶成功
			</view>
			<view class="hottext" style="height: 75rpx; line-height: 45rpx; ">
				3、从推荐成功的次月1号起每月返还100元直到全返本为止，免单成功后每邀请2人，每月返还增加100元
			</view>
			<view class="hottext">
				4、产品运费和安装费用由公司负责
			</view>
			<view class="hottext">
				5、如果卫浴间没有播座，安装插座的工本费由用户负责
			</view>
			<view class="hottext">
				6、产品免费保修二年，长期售后服务
			</view> -->
			<view class="flex flex_center hottitle">—— 活动商品 ——</view>
		</view>

		<view class="hot">
			<block v-for="(item, index) in list" :key="index">
				<navigator :url="'/pages/activity/activity'" class="hotItem">


					<view class="picBox flex flex_around">
						<image v-if="item.project_img[0]" lazy-load="true" :src="item.project_img[0]" mode="aspectFill"
							class="left animated fadeIn"></image>
						<view class="f1">
							<image v-if="item.project_img[1]" lazy-load="true" :src="item.project_img[1]"
								mode="aspectFill" class="rTop animated fadeIn"></image>
							<image v-if="item.project_img[2]" lazy-load="true" :src="item.project_img[2]"
								mode="aspectFill" class="rBot animated fadeIn"></image>
						</view>
					</view>


					<view class="picBox flex flex_around">
						<view class="f1">
							<view class="title cm_ellipsis" style=" margin-top: 20rpx; font-size: 30rpx;">
								{{item.project_name}}</view>
							<view class="cm_price" style="margin-top:20rpx;">￥{{ item.project_raise_price }}</view>
						</view>
						<view style="height: 60rpx; width: 30%; ">
							<button type="default" class="nowbtn" @tap="_toActivity">立即参加</button>
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
				<button type="success" class="cm_btn" @tap="_sureGz">我已关注，立即开启</button>
				<button type="default" class="cm_btn cm_btn_plain" @tap="_cancelGz">取消订阅</button>
			</view>
		</accredit>
		<tui-modal :show="gzshow" custom>
			<view class="tui-modal-custom">
				<!-- <image src="/static/images/chat/fail.png" class="tui-tips-img"></image> -->
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
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex';
	const global_Set_jll = uni.getStorageSync('global_Set_jll');
	import {
		baseMixins
	} from '@/utils/baseMixins.js';
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
		computed: mapState(['shareUser', 'sharePro', 'hasLogin']),
		mixins: [baseMixins],
		onLoad() {
			let that = this;
			this.banners = global_Set_jll.banerList;
			uni.$on('gzhAuth', (bool) => {
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
			_close(){		
					this.gzshow = false
			},
			_gz(){
				// debugger
				this.gzshow = true
				
			},
			// 关注检验
			_sureGz() {
				const authId = uni.getStorageSync('authId')
				if (authId) {
					this._oidIfAttention(authId)
				} else {
					uni.navigateTo({
						url: '/pages/auth/auth'
					})
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
					that.$refs.dy.hideModal()
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			},
			_cancelGz() {
				this.$refs.dy.hideModal()
			},
			_toActivity() {
				uni.switchTab({
					url: '/pages/activity/activity'
				});
			},
			_toBuy() {
				uni.switchTab({
					url: '/pages/user/user'
				});
			},
			_href(item) {
				// console.log(item)
				let type = item.UrlType
				let url = item.Url
				// this.$store.commit('setWebviewUrl','http://www.baidu.com')
				// uni.navigateTo({
				// 	url:'/pages/webview/webview'
				// })
				if (!type || !url) return;
				switch (type) {
					case 'href':
						// debugger
						uni.navigateTo({
							url: url
						});
						break;
					case 'inWeb':
						this.$store.commit('setWebviewUrl', url)
						uni.navigateTo({
							url: '/pages/webview/webview'
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
			loadDataComplete(bool) {
				if (bool) {
					// 成功
					this.list.map(item => {
						// console.log(typeof(item.project_img))
						if (typeof(item.project_img) == 'string') {
							item.project_img = item.project_img ? item.project_img.split(',') : []
						}

					})

				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.pages {
		background: #FCF4E7;
		.firstLunchTop{
			width: 100%;
		}
		// padding: 20rpx;
		.swiper {
			border-radius: 8rpx;
			overflow: hidden;
			width: 100%;
			// height: 280rpx;
			height: 400rpx;
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
			padding: 20rpx;

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
					border-radius: 6rpx;
					margin-right: 16rpx;
				}

				.rTop {
					width: 216rpx;
					height: 216rpx;
					border-radius: 6rpx;
					margin-bottom: 10rpx;
				}

				.rBot {
					width: 216rpx;
					height: 216rpx;
					border-radius: 6rpx;
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
	}
</style>
