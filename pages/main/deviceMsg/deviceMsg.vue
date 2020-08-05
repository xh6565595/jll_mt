<template>
	<view class="container">
		<!-- <view class="boxs statusBox  ">
			<view class="status">设备已报修，等待上门维修</view>
			<view class="flex flex_center listItems last">
				<text for="" class="text">服务码</text>
				<view class="f1">sdfds</view>
			</view>		
		</view> -->
		
		<view class="boxs products flex flex_center">
			<image  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3416996724,3150088939&fm=26&gp=0.jpg" mode="aspectFill" class="itemLogo "></image>
			<view class="f1 ">
				<view class=" cm_title   name cm_ellipsis2 tui-skeleton-fillet">三大法三大法师的删掉三大法师的删掉三大法师的删掉三大法师的删掉师的删掉</view>
				<view class="cm_des flex flex_center" style="justify-content: flex-start;" >
					<!-- <tui-tag shape="circle" size="mini" type="gray" class="cm_t_20">{{ item.project_spec.difference }}</tui-tag> -->
					<view class="f1"></view>
				</view>
			</view>
		</view>
		
		<view class="boxs">
			<view class="flex flex_center   " style="padding-top: 20rpx;">
				<text for="" class="cm_title">订单信息</text>
				<view class="f1"></view>
			</view>
			
			
			<view class="flex flex_center listItems">
				<text for="" class="text">订单编号</text>
				<view class="f1"> 发生的时代发多少是电风扇 sd d</view>
			</view>
			<view class="flex flex_center listItems">
				<text for="" class="text">购买人</text>
				<view class="f1">是打发点删掉都是的说法人儿童而</view>
			</view>
			<view class="flex flex_center listItems ">
				<text for="" class="text">购买时间</text>
				<view class="f1">个士大夫删掉额外特然塔尔</view>
			</view>
			<view class="flex flex_center listItems last">
				<text for="" class="text">送货地址</text>
				<view class="f1">是打发点删掉都是的说法人儿童而</view>
			</view>
		
		</view>
		
		<view class="boxs">
			<view class="flex flex_center   " style="padding-top: 20rpx;">
				<text for="" class="cm_title">安装信息</text>
				<view class="f1"></view>
			</view>
			<view class="flex flex_center listItems">
				<text for="" class="text">安装时间</text>
				<view class="f1"> 发生的时代发多少是电风扇 sd d</view>
			</view>
			<view class="flex flex_center listItems">
				<text for="" class="text">安装师傅</text>
				<view class="f1">是打发点删掉都是的说法人儿童而</view>
			</view>
			<view class="flex flex_center listItems ">
				<text for="" class="text">联系电话</text>
				<view class="f1">个士大夫删掉额外特然塔尔</view>
			</view>
			<view class="flex flex_center listItems">
				<text for="" class="text">服务商</text>
				<view class="f1">是打发点删掉都是的说法人儿童而</view>
			</view>
			<view class="flex flex_center listItems last">
				<text for="" class="text">平台热线</text>
				<view class="f1">个士大夫删掉额外特然塔尔</view>
			</view>
		</view>
		
	
		<view class="boxs">
			<view class="flex flex_center   " style="padding-top: 20rpx;">
				<text for="" class="cm_title">报修信息</text>
				<view class="f1"></view>
			</view>
			<view class="flex flex_center listItems">
				<text for="" class="text">机号</text>
				<view class="f1">是打发点删掉都是的说法人儿童而</view>
			</view>
			<view class="flex flex_center listItems">
				<text for="" class="text">报修人</text>
				<view class="f1">是打发点删掉都是的说法人儿童而</view>
			</view>
			<view class="flex flex_center listItems">
				<text for="" class="text">联系电话</text>
				<view class="f1">是打发点删掉都是的说法人儿童而</view>
			</view>
			<view class="flex flex_center listItems last">
				<text for="" class="cm_title">维修地址</text>
				<view class="f1"></view>
			</view>
			<view class=" listItems ">
				<view class="f1">都是单方事故地方师傅大哥发的发的</view>
			</view>
			<view class="flex flex_center listItems last ">
				<text for="" class="cm_title">维修详情</text>
				<view class="f1"></view>
			</view>
			<view class=" listItems last">
				<view class="f1">都是单方事故地方师傅大哥发的发的</view>
			</view>
		</view>

		<button type="success" class="cm_btn" hover-class="cm_hover" @tap="submit">提交</button>
		<view class="cm_des kefu ">联系客服</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formParams: {
				device_num: '',
				mend_user: '',
				mend_mobile: '',
				mend_detail: '',
				task_service_add: ''
			},
			current: 0
		};
	},
	onLoad() {
		let url = window.location.href;
		let s = url.match(/mtId=(.*)mtId/);
		if (s) {
			
			this._loadData({ device_num: s[1] });
			this.formParams.device_num = s[1];
		} else {
			// 不是授权的页面，重定向进行授权
			// Utils.wx_auth();
		}
	},
	onPullDownRefresh(){
		this._loadData({ device_num: this.formParams.device_num  });
	},
	methods: {
		radioChange(e) {
			// console.log(e);
			let v= e.detail.value;
			this.current = v+''
		},
		_loadData(data) {
			let that = this;
			uni.showLoading({ mask: true });
			const requestTask = uni.request({
				url: 'https://gllo.kuxiong999.com/Data/api/Order/GetApplyMend', //仅为示例，并非真实接口地址。
				method: 'get',
				data: data,
				success: function(res) {
					console.log(res.data);
					if (res.Success) {
					}
				},
				complete() {
					uni.hideLoading();
					uni.stopPullDownRefresh()
				}
			});
		},
		submit() {
			if (!this.formParams.device_num) {
				uni.showToast({
					title: '请输入设备机器号',
					icon: 'none'
				});
				return;
			}
			if (!this.formParams.mend_user || !this.formParams.mend_mobile || !this.formParams.task_service_add) {
				uni.showToast({
					title: '请输入报修信息',
					icon: 'none'
				});
				return;
			}
			let that = this;
			uni.showLoading({ mask: true });
			const requestTask = uni.request({
				url: 'https://gllo.kuxiong999.com/Data/api/Order/ApplyMend', //仅为示例，并非真实接口地址。
				method: 'post',
				data: that.formParams,
				success: function(res) {
					// console.log(res.data);
					if (res.Success) {
						uni.showToast({
							title: '报修成功'
						});
					}
				},
				complete() {
					uni.hideLoading();
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	background: #f4f4f4;
	padding: 20rpx;
	
	.boxs {
		padding: 0 30rpx;
		background-color: #fff;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		.listItems {
			min-height: 88rpx;
			line-height: 88rpx;
			border-bottom: 1rpx solid #e5e5e4;

			.text {
				width: 140rpx;
			}
		}
		.last {
			border-bottom: none;
		}
		.textarea {
			padding-bottom: 20rpx;
			width: 100%;
			min-height: 160rpx;
			line-height: 1.4;
		}
		
	}
	.products{
		padding: 20rpx;
		.itemLogo{
			width: 160rpx;
			height: 160rpx;
			border-radius: 16rpx;
			margin-right: 20rpx;
		}
	}
	.box2 {
		background: transparent;
	}
	.cm_btn {
		margin-top: 72rpx;
	}
	.kefu{
		line-height: 88rpx;
		text-align: center;
	}
	.statusBox{
		background: var(--cl_theme);
		color: #fff;
		min-height: 88rpx;
		line-height: 88rpx;
		.text {
			width: 140rpx;
		}
		.status{
			font-size:36rpx;
			line-height: 4;
			text-align: center;
			border-bottom: 1rpx solid #fb987a;
		}
	}
}
</style>
