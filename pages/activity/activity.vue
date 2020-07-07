<template>
	<view class="pages">
		
		<view class="fixed">
			<tuiNav :isCustom="true" :isFixed="false" backgroundColor="#fff">
				<view class="flex flex_center header">
					<view><text class="lTip" @tap="_showRule">活动规则</text></view>
					<view class="f1 cm_tex_c">活动</view>
					<view><text class="rTip" ></text></view>
				</view>
			</tuiNav>
			<view class="tabsBox flex flex_center">
				<view class="f1 tabs" :class="{ active: tap == 0 }" hover-class="cm_hover" @tap="_switch(0)">进行中</view>
				<view class="f1 tabs" :class="{ active: tap == 1 }" hover-class="cm_hover" @tap="_switch(1)">已完成</view>
			</view>
		</view>
		
		<view class="hot">
			<block v-for="(item, index) in list" :key="index">		
				<view class="inItem" v-if="tap == 0">
					<view class="cm_items flex flex_center">
						<image :src="item.project_list[0].skus_img" mode="aspectFill" class="itemLogo"></image>
						<view class="f1">
							<view class="cm_title cm_ellipsis2">{{item.project_list[0].order_name}}</view>
							<view class="cm_des">{{item.project_list[0].skus_name}}</view>
							<view class="flex flex_center cm_price_box">
								<view class="cm_price">￥{{item.project_list[0].price}}</view>
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
					<view class="text">
						{{item.user_list.schedule_msg}}		
					</view>
					<view class="flex  flex_center flex_between">
						<view class="submenber"><image src="../../components/PayPanel/wx.png" mode="aspectFill" class="avatar"></image></view>
						<view class="submenber"><image src="../../components/PayPanel/wx.png" mode="aspectFill" class="avatar"></image></view>
						<view class="submenber"><image src="../../components/PayPanel/wx.png" mode="aspectFill" class="avatar"></image></view>
					</view>
					<button type="text" class="cm_btn" hover-class="cm_hover_m">邀请好友购买</button>
					<button type="text" class="cm_btn_plain" hover-class="cm_hover_m">自己购买</button>
				</view>
				
				<view class="doneItem" v-else>
					<view class="flex flex_cente header cm_bdb">
						<view class="f1 cm_title">免单成功</view>
						<text class="cm_text">{{item.pay_date}}</text>
					</view>
					<view class="cm_items flex flex_center">
						<image src="../../static/image/logo.png" mode="aspectFill" class="itemLogo"></image>
						<view class="f1">
							<view class="flex flex_center">
								<view class="f1 cm_title cm_ellipsis2">{{item.project_list[0].order_name}}</view>
								<view class="flex flex_center">
									<text class="iconfont icon-guanbi gray"></text>
									<text class="gray">1</text>
								</view>
							</view>
				
							<view class="flex flex_center cm_price_box">
								<view class="cm_price">￥{{item.pay_price}}</view>
								<view class="f1"></view>
								<view class="flex flex_center">
									<image src="../../static/image/logo.png" mode="aspectFill" class="subavatars"></image>
									<image src="../../static/image/logo.png" style="margin-left: -20rpx;" mode="aspectFill" class="subavatars"></image>
									<image src="../../static/image/logo.png" style="margin-left: -20rpx;" mode="aspectFill" class="subavatars"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
		<LoadMore :status="loadStatus" />
		
		
		<rule ref="rule"></rule>
	</view>
</template>

<script>
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
				order_status:0, //0-拼单中 1-已完成
				pageIndex: 1,
				pageSize: 10
			}
		};
	},
	mixins: [baseMixins],
	components: {
		rule
	},
	methods: {
		_showRule(){
			this.$refs.rule.showModal()
		},
		_switch(k) {
			this.tap = k;
			this.formParams.order_status = k;
			this._loadData('refresh')
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding: 20rpx;
	padding-top: 268rpx;
	.fixed {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10;
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
</style>
