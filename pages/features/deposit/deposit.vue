<template>
	<view class="pages">
		<view class="cu-modal show" v-if="successmodal">
			<view class="cu-dialog animated cm_dialog bounceIn" v-if="successmodal">
				<view class="padding-xl">
					<image src="../../../static/image/xq_fw.png" mode="widthFix" class="cm_modal_successPic"></image>
					<view class="cm_modal_title">提现成功</view>
					<view class="cm_modal_des">请留意收款账户</view>
					<view class="cm_btn cm_modal_btn" @tap="_ok">我知道了</view>
				</view>
			</view>
		</view>

		<view class="box">
			<view class="flex flex_center cells">
				<view class="cm_title f1 ">收款账号</view>
				<navigator url="/pages/user/withdrawal/withdrawal" style="color: #FF7047;font-size: 26rpx;">修改信息</navigator>
			</view>
			<view class="flex flex_center picBox " v-if="userInfo.alipay_account">
				<image src="../../../static/image/tx_zfb.png" mode="scaleToFill" class="action" style="margin-right: 20rpx;"></image>
				<view class="f1 ">支付宝（{{userInfo.alipay_account}}）</view>
				<text class="iconfont icon-fanhui3"></text>
			</view>
			<view class="flex flex_center picBox " v-else>
				<text class="f1 ">暂未添加提现账户</text>
			</view>
		</view>
		<view class="box">
			<view class="cm_title cells">提现金额</view>
			<view class="cm_bdb">
				<view class="flex  numBox flex_center ">
					<text style="font-size: 48rpx;margin-right: 10rpx;font-weight: 600;">￥</text>
					<input type="number" class="nums f1" placeholder="请输入提现金额" v-model="formParams.apply_money" @input="onInput" />
					<!-- <text  style="color: #FF7047;font-size: 26rpx;" @tap="allIn">全部提现</text> -->
				</view>
			</view>
			<view class="flex flex_center cells">
				<view class="f1 gray">
					可提现金额：
					<text style="color: red;">{{maxAccount}}</text>
				</view>
				<text @tap="allIn">全部提现</text>
			</view>
		</view>
		<view class="box">
			<view class="flex inputBoxs ">
				<text class="label  ">手机号码</text>
				<input class=" cm_tex_r f1 inp" >{{myAccount | encrypt}}</input>
				<!-- <input class="cm_tex_r f1 inp" type="text" :disabled="true" v-model="myAccount" placeholder="请输入手机号" /> -->
			</view>
			<view class="flex inputBoxs ">
				<text class="label f1">验证码</text>
				<input class="f1" type="number" clearable v-model="formParams.vilidate" placeholder="请输入验证码" />
				<view class="yzmBtn" size="mini" hover-class="cm_hover" @tap="_getCode">{{ seconds > 0 ? seconds + 's' : '发送验证码' }}</view>
			</view>
		</view>

		<button class="cm_btn submitbtn" @tap="_submit">提交</button>
		<Success ref="successModal" title="提现成功" des="请及时确认账户余额" btn="知道了" ></Success>
		<!-- <best-payment-password title="设置输入密码" :show="payFlag" :value="paymentPwd" digits="6" @cancel="cancelPass" @submit="checkPwd" :forget="false"></best-payment-password> -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
import Success from '@/components/success.vue'
export default {
	data() {
		return {
			bankList: [],
			formParams: {
				// apply_money: '',
				// // cash_card:'',
				// vilidate: '',
				// pay_password: '',
				// alipay_account: '',
				apply_money:'',
				cash_type:0 ,//提现类型  0-支付宝 1-微信
				vilidate:''
			},
			currentBank: '',
			maxAccount: 0,
			successmodal: false,
			currentBackText: '',
			myAccount: '',
			fullname: '',
			seconds: 0,
			payFlag: false,
			paymentPwd: '' //支付密码
		};
	},
	onNavigationBarButtonTap(e) {
		uni.navigateTo({
			url: '/pages/user/depositHistory/depositHistory'
		});
	},
	onLoad() {
		// 加载名下银行卡
		// console.log(this.userInfo)
		// this._loadBanks()
	},
	onShow() {
		console.log(this.userInfo);
		// this.maxAccount = this.accountInfo.agent_blance; //储存最大可使用金额
		this.maxAccount = this.userInfo.consumer_blance
		this.myAccount = this.userInfo.consumer_full_mobile;
		// this.formParams.alipay_account = this.userInfo.alipay_account;
		// this.alipay_account = this.userInfo.alipay_account;
		let hasPayPass = uni.getStorageSync('hasPayPass');
	
		// // 必须设置支付宝号
		if (!this.userInfo.alipay_account ) {
			uni.showModal({
				title: '酷熊提醒您',
				content: '请先设置支付宝收款账户',
				// showCancel:false,
				success: function(res) {
					if (res.confirm) {
						uni.navigateTo({
							url:'/pages/user/withdrawal/withdrawal'
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
						uni.navigateBack({

						})
					}
				}
			});
			return false;
		}
	},
	computed: {
		...mapState(['hasLogin', 'userInfo', 'accountInfo'])
	},
	watch: {
	},
	components: {
		Success
	},
	filters: {
		encrypt(val) {
			let s = val.slice(4, -3);
			let str = val.replace(s, '****');
			return str;
		}
	},
	methods: {
		_ok() {},
		// 全部取出
		allIn() {
			this.formParams.apply_money = this.maxAccount;
		},

		_closeKeyBoard() {
			// 关闭软键盘
			// if(that.Plaform == 'ios'){
			//
			// }
			// console.log(111)
			uni.hideKeyboard();
		},
		// 获取验证码
		async _getCode() {
			if (this.effective) return;
			let self = this;
			let data = {
				mobile: this.myAccount,
				type: 7//
			};
			try {
				let res = await this.$api.getVerificateCode(data);
				console.log(JSON.stringify(res));
				if (res.Success) {
					uni.showToast({
						title: '验证码已发送',
						position: 'bottom'
					});

					self.effective = true;
					self.seconds = 60;
					let time = setInterval(() => {
						self.seconds -= 1;
						if (self.seconds == 0) {
							self.effective = false;
							clearInterval(time);
						}
					}, 1000);
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data
					});
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		onInput(e) {
			let value = e.detail.value;
			// console.log(1,value)
			let arr = value.split('.');
			if (this.time) {
				clearTimeout(this.time);
				this.time = '';
			}
			// 防抖判断
			this.time = setTimeout(() => {
				let str = value;
				if (arr[1] && arr[1].length >= 2) {
					// 小数大2位
					str = value.match(/^\d+\.(\d){2}/)[0];
					// console.log('超过4位')
				}
				// 是否超过最大值
				if (Number(str) >= this.maxAccount) {
					// console.log('超过最大值')
					str = this.maxAccount;
				}
				// console.log('nomal',str)
				// this.realvalue = str;
				this.formParams.apply_money = str;
				clearTimeout(this.time);
				this.time = '';
			}, 500);
		},
	
		// 提交
		_submit() {
			let money = this.formParams.apply_money;
			console.log(JSON.stringify(this.formParams));
			if (!this.formParams.apply_money) {
				uni.showToast({
					icon: 'none',
					title: '请输入有效金额'
				});
				return;
			}
			if (!this.formParams.vilidate) {
				uni.showToast({
					icon: 'none',
					title: '请输入验证码'
				});
				return;
			}
			// 去除前置0  转化为字符
			// money =  (money+'').replace(/\b(0+)/gi,'')  ;
			money = Number(money).toFixed(2);

			console.log(money);
			if (money > this.maxAccount) {
				uni.showToast({
					icon: '',
					title: '超出最大限额'
				});
				this.formParams.apply_money = this.maxAccount;
				return;
			}
			// this.show = false
			// this.payFlag = true;
			
			console.log(this.formParams);
			this.vilidatePass()
		},
		async vilidatePass() {
			let that = this;
			try {
				this.$ui.showloading()
				let res = await this.$api.SubmitCash(this.formParams);
				this.$ui.hideloading()
				if (res.Success) {
					// uni.$emit('refresh_user');
					that.$store.dispatch('refreshUser')
					that.$refs.successModal.show();
				} else {
					uni.showToast({
					    icon: 'none',
					    title: res.Msg?res.Msg:'操作失败，请联系客服',
					});

					// uni.showModal({
					// 	title: '密码错误',
					// 	content: '立即否重置密码？',
					// 	confirmText: '立即重置',
					// 	success: function(res) {
					// 		if (res.confirm) {
					// 			uni.navigateTo({
					// 				url: '/pages/role/updatedPayPass/updatedPayPass'
					// 			});
					// 		} else if (res.cancel) {
					// 			console.log('用户点击取消');
					// 		}
					// 	}
					// });
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
				this.$ui.hideloading()
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.pages {
	position: relative;
	padding: 20rpx;
	// padding-top: 172rpx;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
		width: 100vw;
		height: 540rpx;
		overflow: hidden;
		.bgPic {
			width: 100vw;
			height: 100%;
		}
	}

	.box {
		box-sizing: border-box;
		padding: 0 20rpx;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		position: relative;
		z-index: 10;
		.picBox {
			line-height: 120rpx;
			height: 120rpx;
		}
		.cm_text {
			margin-top: 16rpx;
			font-size: 26rpx;
			color: #333;
		}
		.cells {
			height: 88rpx;
			line-height: 88rpx;
		}
		.inputBoxs {
			// justify-content: center;
			align-items: center;
			line-height: 88rpx;
			height: 88rpx;

			.inp {
				width: 80%;
			}
		}
		.numBox{
			line-height: 150rpx;
			height: 150rpx;
			// font-size: 42rpx;
			.nums{
				font-size: 42rpx;
			}
		}
		.icons {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			margin-right: 8rpx;
		}
		.action {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
		}
		.bd {
			border-bottom: 1rpx solid #eee;
		}
	}

	.mark {
		// color: red;
	}

	.submitbtn {
		margin: 60rpx auto 100rpx auto;
	}
	.yzmBtn {
		padding: 0 20rpx;
		line-height: 58rpx;
		height: 58rpx;
		background: #ff7047;
		color: #fff;
		border-radius: 29rpx;
	}
}
</style>
