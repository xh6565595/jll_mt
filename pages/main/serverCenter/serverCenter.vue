<template>
	<view class="pages">
		<view class="mshBar flex flex_center">
			<view class="f1 cm_ellipsis">{{ msg }}</view>
		</view>
		<view class="header">
			<view class=" flex flex_center marchantBox">
				<image :src="userInfo.consumer_head" mode="aspectFill" class="avatar"></image>
				<view class="f1">
					<view style="line-height: 1.5;" class="cm_title cm_tex_l">{{ userInfo.consumer_name }}</view>
					<view style="line-height: 1.4;" class="cm_text cm_tex_l">工号：{{ userInfo.serviceInfo.service_num }}</view>
					<view style="line-height: 1.4;" class="cm_text cm_tex_l">所属服务商：{{ userInfo.serviceInfo.service_name }}</view>
				</view>
			</view>
			
		</view>

		<view class="content">
			<view class="flex flex _center ">
				<navigator url="../serverLunch/serverLunch" class="menus menus1 " hover-class="cm_hover_m">
					<view class="menusHeader flex flex_center">
						<text class="menusTags ">你有3条订单待处理</text>
						<view class="f1"></view>
					</view>
					<view class="menusBody flex flex_center">
						<image src="../../../static/image/m1.png" mode="scaleToFill " style="width: 90rpx;height: 90rpx;margin-right: 40rpx;"></image>				
						<view class="f1">
							<view class="cm_title cm_tex_l">安装订单管理</view>
							<view class="cm_des cm_tex_l" >查看派发安装订单</view>
						</view>
						<text class="iconfont icon-fanhui3"></text>
					</view>
				</navigator>
			</view>
			<view class="flex flex _center " style="margin-top: 20rpx;">
				<navigator url="../serverRepair/serverRepair" class="menus menus2 " hover-class="cm_hover_m">
					<view class="menusHeader flex flex_center">
						<text class="menusTags ">你有3条订单待处理</text>
						<view class="f1"></view>
					</view>
					<view class="menusBody flex flex_center">
						<image src="../../../static/image/m2.png" mode="scaleToFill " style="width: 90rpx;height: 90rpx;margin-right: 40rpx;"></image>
						<view class="f1">
							<view class="cm_title cm_tex_l">维修订单管理</view>
							<view class="cm_des cm_tex_l" >查看派发维修订单</view>
						</view>
						<text class="iconfont icon-fanhui3"></text>
					</view>
					
				</navigator>
			</view>
			<view class="flex flex _center " style="margin-top: 20rpx;">
				<navigator url="/pages/sisMsg/sisMsg" class="menus menus3 "  hover-class="cm_hover_m">
				<!-- 	<view class="menusHeader">
						<text class="itemTags">你有3条订单待处理</text>
					</view> -->
					<view class="menusBody flex flex_center">
						<image src="../../../static/image/m3.png" mode="scaleToFill " style="width: 90rpx;height: 90rpx;margin-right: 40rpx;"></image>	
						<view class="f1">
							<view class="cm_title cm_tex_l">消息中心</view>
							<view class="cm_des cm_tex_l" >查看系统公告及信息</view>
						</view>
						<text class="iconfont icon-fanhui3"></text>
					</view>
				</navigator>
			</view>
		</view>

		<view class="msgTap flex flex_center" hover-class="cm_hover_m"  @tap="_scanCode">
			<!-- <text class="iconfont icon-xiaoxi" style="font-size: 32rpx;color: #fff;"></text> -->
			<image src="../../../static/image/sys.png" mode="scaleToFill" style="width: 100% ;height: 100%;"></image>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import tuiTips from '@/components/extend/tips/tips';
import sunTab from '@/components/sun-tab/sun-tab.vue';
import tuiFab from '@/components/tui-fab/tui-fab';
export default {
	data() {
		return {
			baseKey: 'GetUserTaskList',
			hasRow: 'Rows',
			list: [],
			formParams: {
				task_status: '0', // 0-待安装 1-已安装
				pageIndex: 1,
				pageSize: 10
			},
			tabObjectList: [
				//对象数组赋值
				{
					name: '待派单',
					value: 0
				},
				{
					name: '已完成',
					value: 1
				}
			],
			detailType1: 0,
			detailType2: 1,
			current: 0,
			type: 1,
			modal: false,
			msg: '',
			currentCode: '' //当前操作的条目code
		};
	},
	computed: mapState(['userInfo', 'hasLogin']),
	onPullDownRefresh() {
		this.formParams.pageIndex = 1;
		this.list = [];
		this._loadData('refresh');
	},
	// 上拉加载
	onReachBottom() {
		console.log(this.loadStatus);
		if (this.loadStatus == 'noMore') {
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading';
		this._loadData('add');
	},
	components: {
		sunTab,
		tuiTips,
		tuiFab
	},
	onLoad(options) {
		// alert(options.type)
		let that = this;
		this._loadData('refresh');
		uni.$on('refreshCenter', () => {
			that._loadData('refresh');
		});
	},
	onShow() {
		if (this.hasLogin) {
			this._loadData('refresh');
		}
	},
	methods: {
		_msg() {
			uni.navigateTo({
				url: '/pages/sisMsg/sisMsg'
			});
		},
		objectChange(e) {
			this.current = parseInt(e.tab.value);
			this.formParams.task_status = parseInt(e.tab.value);
			this._loadData('refresh');
		},

		async _loadData(type) {
			let that = this;
			try {
				let res = await this.$api.GetUserTaskList(this.formParams, false);
				// console.log(res);
				if (type == 'add') {
					that.loadStatus = 'loading';
				} else {
					uni.stopPullDownRefresh();
				}
				if (res.Success) {
					if (type == 'add') {
						that.list = that.list.concat(res.Data.list.Rows);
						if (res.Data.list.Rows.length < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
							// 没有数据了
						} else {
							that.loadStatus = 'more';
						}
					} else {
						// 刷新
						that.list = res.Data.list.Rows;
						if (res.Data.list.Rows.length < that.formParams.pageSize) {
							that.loadStatus = 'noMore';
							// 没有数据了
						} else {
							that.loadStatus = 'more';
						}
						that.refreshing = false;
						that.msg = res.Data.info;
						that.tabObjectList = [
							{
								name: `待派单(${res.Data.count.await_count})`,
								value: 0
							},
							{
								name: `已完成(${res.Data.count.accomplish_count})`,
								value: 1
							}
						];
					}
				} else {
					that.$ui.toast(res.Msg);
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
				that.loadStatus = 'more';
			}
		},
		// 扫码跳转维修历史
		_scanCode(){
			let  that = this
			this.$ui.showloading()
			uni.scanCode({
				onlyFromCamera: true,
				scanType: ['qrCode'],
				success: function(res) {
					let result = res.result;
					let s = result.match(/mtId=(.*)mtId/);
					if (result && s && s[1]) {
						uni.navigateTo({
							url:`/pages/main/deviceMsg/deviceMsg?mtId=${s[1]}`
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '无效的机号信息'
						});
					}
				},
				fail: function() {
					// plus.nativeUI.alert('请将二维码放在扫描框内')
					uni.showToast({
						icon: 'none',
						title: '请将二维码放在扫描框内'
					});
				},
				complete() {
					that.$ui.hideloading()
				}
			});
		},
	}
};
</script>

<style lang="scss" scoped>
.pages {
	.mshBar {
		height: 74rpx;
		line-height: 74rpx;
		background: #fdf4f4;
		color: #ec3333;
		padding: 0 30rpx;
	}
	.header {
		width: 100vw;
		height: 400rpx;
		// padding-bottom: 40rpx;
		// background-color:#fff ;
		background: linear-gradient(to bottom, #EA4C33, 80%,#f4f4f4);
		// background-color: var(--cl_primary);
		// color: #fff;
		
		.marchantBox {
			height: 264rpx;
			padding: 0 20rpx;
			width: 100%;
			text-align: center;
			.avatar {
				width: 124rpx;
				height: 124rpx;
				border-radius: 50%;
				margin-right: 26rpx;
				border: 8rpx solid #eee;
			}
			.cm_title {
				font-size: 36rpx;
			}
			.cm_tex_l {
				color: #fff;
				// color: #ec6d43;
			}
			
		}
	}

	// .tabBar {
	// 	line-height: 72rpx;
	// 	height: 72rpx;
	// 	background: #fff;
	// 	overflow: hidden;
	// 	width: 100vw;
	// }
	.content {
		padding: 20rpx;
		margin-top: -140rpx;
		.blank {
			width: 20rpx;
			height: 200rpx;
		}
		.menus {
			width: 100%;
			min-height: 154rpx;
			color: #333;
			border-radius: 10rpx;
			padding: 0 40rpx;
			text-align: center;
			// line-height: 200rpx;
			font-size: 32rpx;
			// box-shadow: 0 0 4rpx #eee;
			background-color: #fff;
			.menusHeader{
				height: 82rpx;
				border-bottom: 1rpx solid #e5e5e5;
				.menusTags{
					height: 42rpx;
					line-height: 42rpx;
					border-radius: 21rpx;
					background: #fdf4f4;
					color: #ec3333;
					font-size: 24rpx;
					padding: 0 20rpx;
				}
			}
			.menusBody{
				padding: 32rpx 0;
				// background: red;
			}
			.iconfont{
				color: #999;
				font-size: 36rpx;
			}
		}

	}

	.msgTap {
		width: 100rpx;
		height: 100rpx;
		background-color: #fff;
		border-radius: 50%;
		position: fixed;
		bottom: 60rpx;
		right: 60rpx;
		box-shadow: 0 0 8rpx #eee;
	}
}
</style>
