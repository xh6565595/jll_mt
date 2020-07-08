<template>
	<view class="pages">
		<view class="cm_title ">提现收款账户设置</view>
		<view class="cm_text">请务必填入有效的本人支付宝或微信收款账号。</view>
		<view class="box">
			<view class="flex inputBoxs ">
				<text class="label f1">真实姓名</text>
				<input type="text" class="inp " v-model="formParams.consumer_name" placeholder="请输入真实姓名" />
			</view>
			<view class="flex inputBoxs ">
				<text class="label f1">支付宝账户</text>
				<input type="text" class="inp " v-model="formParams.alipay_account" placeholder="请输入支付宝账户" />
			</view>
		<!-- 	<view class="flex inputBoxs ">
				<text class="label f1">微信账户</text>
				<input type="text" class="inp " v-model="formParams.alipay_account" placeholder="请输入微信账户" />
			</view> -->
		</view>
		<button class="cm_btn submitbtn" @tap="_updateUserInfo">{{ text }}</button>
	</view>
</template>

<script>
// import banks from '../../../utils/banks.js';
import Utils from '../../../utils/utils.js';
// const card = uni.requireNativePlugin('DC-CardRecognize');
import { mapState } from 'vuex';
export default {
	data() {
		return {
			// bankList: banks,
			formParams: {
				// "nike_name": "",
				consumer_name:'',
				alipay_account:'',
				weixin_account:''
				// "weixin_account": ""
			},
			loadModal: false,
			myAccount: '',
			seconds: 0,
			text: '提交'
		};
	},
	computed: {
		...mapState(['hasLogin', 'userInfo'])
	},
	onLoad() {
		if (this.userInfo.alipay_account) {
			this.formParams.consumer_name = this.userInfo.consumer_name;
			this.formParams.alipay_account = this.userInfo.alipay_account;
			this.text = '修改';
		}
	},
	methods: {
		async _updateUserInfo() {
			// console.log(this.formParams)
			uni.hideKeyboard();
			if (!this.formParams.consumer_name) {
				uni.showToast({
					icon: 'none',
					title: '请输入真实姓名'
				});
				return;
			}
			if (!this.formParams.alipay_account) {
				uni.showToast({
					icon: 'none',
					title: '请输入正确的支付宝号'
				});
				return;
			}
			let that = this;
			try {
				this.$ui.showloading()
				let res = await this.$api.PerfectPayInfo(this.formParams);
				this.$ui.hideloading()
				if (res.Success) {
					// console.log(": " + JSON.stringify(res));
					uni.showToast({
						title: '修改成功'
					});
					// uni.$emit('refresh_user');
					this.$store.dispatch('refreshUser')

					setTimeout(() => {
						uni.navigateBack();
					}, 500);
				} else {
					uni.showToast({
						icon: 'none',
						title: '修改失败'
					});
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	padding: 20rpx;
	.box {
		box-sizing: border-box;
		padding: 20rpx;
		background: #fff;
		border-radius: 20rpx;
		margin: 30rpx auto;
		.htit {
			margin: 120rpx 0;
			font-size: 44rpx;
			font-weight: 600;
			color: #333;
		}
		.inputBoxs {
			justify-content: center;
			align-items: center;
			line-height: 86rpx;
			height: 86rpx;
			.label {
				width: 30%;
				// background: red
			}
			.inp {
				width: 70%;
				// background: pink;
			}
		}

		.bd {
			border-bottom: 1rpx solid #eee;
		}
	}

	.mark {
		color: red;
	}

	.submitbtn {
		margin: 60rpx auto 100rpx auto;
	}
}
</style>
