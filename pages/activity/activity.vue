<template>
	<view>
		<view class="pages" v-if="hasLogin" :style="{ 'padding-top': topHeight + 'rpx' }">
			<view class="fixed">
				<tuiNav :isCustom="true" :isFixed="false" backgroundColor="#fff">
					<view class="flex flex_center header">
						<view><text class="lTip" @tap="_showRule">活动规则</text></view>
						<view class="f1 cm_tex_c">活动</view>
						<view><text class="rTip"></text></view>
					</view>
				</tuiNav>
				<view class="tabsBox flex flex_center">
					<view class="f1 tabs" :class="{ active: tap == 0 }" hover-class="cm_hover" @tap="_switch(0)">进行中</view>
					<view class="f1 tabs" :class="{ active: tap == 1 }" hover-class="cm_hover" @tap="_switch(1)">已完成</view>
				</view>
			</view>

			<view v-if="list.length || loadStatus != 'noMore'">
				<view class="hot">
					<block v-for="(item, index) in list" :key="index">
						<view class="inItem animated fadeIn" v-if="tap == 0">
							<view class="flex  flex_center cm_bdb " style="padding-bottom: 20rpx;margin-bottom: 20rpx;">
								<view>进行中</view>
								<view class="f1 cm_tex_r">活动时间：{{ item.create_time }}</view>
							</view>
							<view class="cm_items flex flex_center">
								<image :src="item.project_list[0].skus_img" mode="aspectFill" class="itemLogo"></image>
								<view class="f1">
									<view class="cm_title cm_ellipsis2">{{ item.project_list[0].order_name }}</view>
									<view class="cm_des">{{ item.project_list[0].skus_name }}</view>
									<view class="flex flex_center cm_price_box">
										<view class="cm_price">￥{{ item.project_list[0].price }}</view>
										<view class="f1"></view>
										<view class="flex flex_center">
											<image :src="item.project_list[0].order_project_service1" mode="aspectFill" class="subavatars"></image>
											<image :src="item.user_list[0].order_project_service2" mode="aspectFill" class="subavatars"></image>
											<image :src="item.user_list[0].order_project_service3" mode="aspectFill" class="subavatars"></image>
										</view>
									</view>
								</view>
							</view>
							<view class="cm_title title">免单进度</view>
							<view class="text">{{ item.user_list.schedule_msg }}</view>
							<view class="flex  flex_center flex_between">
								<view class="submenber">
									<image
										:src="item.user_list.list[0].consumer_head ? item.user_list.list[0].consumer_head : '/static/image/hd_yq.png'"
										mode="aspectFill"
										class="avatar"
									></image>
								</view>
								<view class="submenber">
									<image
										:src="item.user_list.list[1].consumer_head ? item.user_list.list[1].consumer_head : '/static/image/hd_yq.png'"
										mode="aspectFill"
										class="avatar"
									></image>
								</view>
								<view class="submenber">
									<image
										:src="item.user_list.list[2].consumer_head ? item.user_list.list[2].consumer_head : '/static/image/hd_yq.png'"
										mode="aspectFill"
										class="avatar"
									></image>
								</view>
							</view>
							<button type="text" class="cm_btn" hover-class="cm_hover_m" @tap="_hrefSahre(item)">邀请好友购买</button>

							<button type="text" class="cm_btn_plain" hover-class="cm_hover_m" @tap="_href(item)">自己购买</button>
						</view>

						<view class="doneItem  animated fadeIn" v-else @tap="_detail(item)">
							<view class="flex flex_cente header cm_bdb">
								<view class="f1 cm_title">免单成功</view>
								<text class="cm_text">{{ item.pay_date }}</text>
							</view>
							<view class="cm_items flex flex_center">
								<image :src="item.project_list[0].skus_img" mode="aspectFill" class="itemLogo"></image>
								<view class="f1">
									<view class="flex flex_center">
										<view class="f1 cm_title cm_ellipsis2">{{ item.project_list[0].order_name }}</view>
										<view class="flex flex_center">
											<text class="iconfont icon-guanbi gray"></text>
											<text class="gray">1</text>
										</view>
									</view>

									<view class="flex flex_center cm_price_box">
										<view class="cm_price">￥{{ item.pay_price }}</view>
										<view class="f1"></view>
										<view class="flex flex_center">
											<image
												:src="item.user_list.list[0].consumer_head ? item.user_list.list[0].consumer_head : '/static/image/hd_yq.png'"
												mode="aspectFill"
												class="subavatars"
											></image>
											<image
												:src="item.user_list.list[1].consumer_head ? item.user_list.list[1].consumer_head : '/static/image/hd_yq.png'"
												style="margin-left: -20rpx;"
												mode="aspectFill"
												class="subavatars"
											></image>
											<image
												:src="item.user_list.list[2].consumer_head ? item.user_list.list[2].consumer_head : '/static/image/hd_yq.png'"
												style="margin-left: -20rpx;"
												mode="aspectFill"
												class="subavatars"
											></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
				<LoadMore :status="loadStatus" />
			</view>

			<!-- <view > -->
				<!-- <tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">暂无条目</tui-tips> -->
				<view  v-else  class="firstLunch animated fadeIn" style="width: 100%;min-height: 80vh;">
					<image src="../../static/image/activeTop.jpg" mode="widthFix" class="firstLunchTop"></image>
					<button type="default" class="nowbtn" @tap="_toBuy">立即购买</button>
					<view class="flex flex_center upBox" >
						<view class="subs">1
							<!-- <image src="../../static/image/blank.png" mode="scaleToFill" class="cover"></image> -->
						</view>
						<view class="subs">2
							<!-- <image src="../../static/image/blank.png" mode="scaleToFill" class="cover"></image> -->
						</view>
						<view class="subs">3
							<!-- <image src="../../static/image/blank.png" mode="scaleToFill" class="cover"></image> -->
						</view>
					</view>
					
					<view class="richBox">
						 <rich-text v-if="text" :nodes="text"></rich-text>
					</view>
				</view>
			<!-- </view> -->
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
	</view>
</template>

<script>
import tuiTips from '@/components/extend/tips/tips';
import { mapState } from 'vuex';
import rule from '@/components/rule/rule.vue';
const global_Set_jll = uni.getStorageSync('global_Set_jll');
import { baseMixins } from '@/utils/baseMixins.js';
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
			shareMsg: '',
			goods: {
				title: '',
				sub_title: '',
				image: '',
				price: ''
			},
			modal: false,
			text:'',
			topHeight: 144
		};
	},
	mixins: [baseMixins],
	computed: mapState(['userInfo', 'hasLogin']),
	components: {
		rule,
		tuiTips
	},

	onLoad() {
		this.shareMsg = {
			title: `分享好友，马桶免费拿`,
			path: `/pages/index/index`,
			imageUrl: '/static/share.jpg'
		};
		this.text = global_Set_jll.activity_constraint
		uni.getSystemInfo({
			success: res => {
				this.topHeight = 2 * (res.statusBarHeight + 44) + 80;
			}
		});
	},
	onShow() {
		if (this.hasLogin) {
			this._loadData('refresh');
		}
	},
	onShareAppMessage(res) {
		if (res.from === 'button') {
			// 来自页面内分享按钮
			return {
				title: this.goods.title,
				path: `/pages/index/index?pcode=${this.goods.code}&ucode=${this.goods.user}&ocode=${this.goods.order}`,
				imageUrl: this.goods.image
			};
		} else {
			return this.shareMsg;
		}
	},
	methods: {
		_toBuy(){
			uni.switchTab({
				url:'/pages/main/main'
			})
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
			// console.log(this.goods)
			this.$refs.share.showModal();
		},
		_href(obj) {
			let item = obj.project_list[0];
			let code = item.project_code;

			uni.navigateTo({
				url: `/pages/main/details/details?type=self&order=${obj.order_code}&code=` + code
			});
		},
		_showRule() {
			this.$refs.rule.showModal();
		},
		_switch(k) {
			this.tap = k;
			this.formParams.order_status = k;
			this.list = [];
			this._loadData('refresh');
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
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
		.submenber {
			width: 120rpx;
			height: 120rpx;
			border-radius: 60rpx;
			overflow: hidden;
			.avatar {
				width: 100%;
				height: 100%;
				background-color: #f2f2f2;
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
		.header {
			padding-top: 12rpx;
			padding-bottom: 24rpx;
			line-height: 1;
			.cm_title {
				line-height: 1;
			}
		}
		.cm_items {
			margin-top: 20rpx;
		}
	}
}
.hot {
	padding: 20rpx;
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
.firstLunch {
	width: 100vw;
	min-height: 100%;
	background-color: #fd8e3e;
	z-index: 100;
	padding-bottom: 50rpx;
	.firstLunchTop {
		width: 100%;
	}
	.upBox{
		justify-content: space-between;
		padding: 72rpx 80rpx;
		.subs{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			border: 4rpx dashed #fff;
			text-align: center;
			line-height: 120rpx;
			color: #fff;
			font-size: 40rpx;
		}
	}
	.nowbtn{
		width: 650rpx;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 43px;
		background: linear-gradient(0deg, #FEF7BE, #E9B249);
		color: #4F2006;
		text-align: center;
		font-size: 30rpx;
		
	}
	.richBox{
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
