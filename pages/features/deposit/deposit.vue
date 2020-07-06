<template>
	<view class="pages">
		<!-- <cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">提现操作</block>
		</cu-custom> -->
		<view class="cu-modal" :class="successmodal?'show':'close'">
			<view class="cu-dialog animated cm_dialog" :class="successmodal?'bounceIn':'bounceOut'">
				<view class="padding-xl">
					<!-- <image src="../../../static/img/user/zz_icon_zzcg.png" mode="widthFix" class="cm_modal_successPic"></image> -->
					<view class="cm_modal_title">提现成功</view>
					<view class="cm_modal_des">请留意收款支付宝账户</view>
					<view class="cm_btn cm_modal_btn" @tap="_ok">我知道了</view>
				</view>
			</view>
		</view>
		<!-- <view class="bg "><image src="../../../static/img/user/txbg.png" mode="scaleToFill" class="bgPic"></image></view> -->
		
		<view class="ktxye cm_tex_c">{{maxAccount}}</view>
		<view class="ktxyetext cm_tex_c" >可提现金额(元)</view>
		<view class="cm_pd10">
			<view class="cm_text">请按照提示信息填入信息</view>
			<view class="box">
				<view class="flex flex_center picBox bd">
					<!-- <image src="../../../static/img/logo.jpg" mode="scaleToFill" class="icons"></image> -->
					<view class="f1 flex flex_y flex_center">						
						<!-- <image src="../../../static/img/user/toright.png" mode="scaleToFill" class="action"></image> -->
						<text class="cm_text">提现至</text>
					</view>
					<!-- <image src="../../../static/img/user/zfbsq.png" mode="scaleToFill"  class="icons"></image> -->
				</view>
				<view class="flex flex_center inputBoxs">
					<view class="cm_title">账号信息</view>
					<view class="f1"></view>
					<navigator url="/pages/user/withdrawal/withdrawal" style="color: #FF7047;font-size: 26rpx;">修改信息</navigator>
				</view>
				<view class="flex inputBoxs  ">
					<text class="label ">真实姓名</text>
					<input type="text" class=" cm_tex_r f1" disabled="true"  placeholder="请输入真实姓名" :value="userInfo.user_name"  >
				</view>
				<view class="flex inputBoxs " @tap="_closeKeyBoard">
					<text class="label">支付宝账户</text>
					<input type="text" class=" cm_tex_r f1" disabled="true"  placeholder="请输入支付宝账户" :value="userInfo.alipay_account"  >
				</view>
			</view>
		</view>
		<view class="cm_pd10">		
			<view class="box">
				<view class="flex flex_center inputBoxs">
					<view class="cm_title">提现金额</view>
					<view class="f1"></view>
					<!-- <navigator url="/pages/user/withdrawal/withdrawal">修改信息</navigator> -->
				</view>
				<!-- <view class="flex inputBoxs ">
					<text class="label f1">可提现金额</text>
					<view class="inp f1 cm_tex_r">{{maxAccount}}</view>
				</view> -->
				<view class="flex inputBoxs  bd">
					<input type="number" class=" cm_tex_l f1"  placeholder="请输入提现金额" v-model="formParams.apply_money" @input="onInput"  >
					<text  style="color: #FF7047;font-size: 26rpx;" @tap="allIn">全部提现</text>
				</view>
				<!-- <view class="flex inputBoxs " @tap="_closeKeyBoard">
					<text class="label">支付宝账户</text>
					<view class="inp f1 cm_tex_r">{{userInfo.alipay_account}}</view>
				</view> -->
			<!-- 	<view class="flex inputBoxs ">
					<text class="label f1">提现卡号</text>
					<view class="inp f1 cm_tex_r">{{currentBackText | encrypt}}</view>
				</view> -->
			</view>
			
			<view class="box">
				<view class="flex inputBoxs ">
					<text class="label  ">手机号码</text>
					<!-- <input class=" cm_tex_r f1 inp" >{{myAccount}}</input> -->
					<input class="cm_tex_r f1 inp" type="text" :disabled="true"  v-model="myAccount" placeholder="请输入手机号">
				</view>
				<view class="flex inputBoxs ">
					<text class="label f1">验证码</text>
					<input class="f1" type="number" clearable  v-model="formParams.validate" placeholder="请输入验证码">
					<view class="yzmBtn" size="mini" hover-class="cm_hover" @tap="_getCode">{{seconds>0?seconds+'s':'发送验证码'}}</view>
				</view>
			</view>
			
			<button class="cm_btn_block submitbtn" @tap="_submit">
				提交
			</button>

			<!-- <view class="cm_title  mark cm_tex_c">酷熊提醒您</view>
			<view class="cm_text cm_tex_c">
				请确认收款人银行卡账户为本人所有！
			</view> -->
		</view>
		<!-- <Success ref="successModal" title="提现成功" des="请及时确认账户余额" btn="知道了" ></Success> -->
		<!-- <best-payment-password title="设置输入密码" :show="payFlag" :value="paymentPwd" digits="6" @cancel="cancelPass" @submit="checkPwd" :forget="false"></best-payment-password> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	// import bestPaymentPassword from '@/components/best-payment-password/best-payment-password.vue';
	export default {
		data() {
			return {
				bankList: [],
				formParams:{
					apply_money:'',
					// cash_card:'',
					validate:'',
					pay_password:'',
					alipay_account: "",
				},
				currentBank:'',
				maxAccount:0,
				successmodal:false,
				currentBackText:'',
				myAccount:'',
				fullname:'',
				seconds:0,
				payFlag:false,
				paymentPwd:'' //支付密码
			};
		},
		onNavigationBarButtonTap(e) {
				uni.navigateTo({
					url: '/pages/user/depositHistory/depositHistory'
				});
		},
		onLoad(){
			// 加载名下银行卡
			// console.log(this.userInfo)
			
			
			// this._loadBanks()
		},
		onShow(){
			console.log(this.userInfo)
			this.maxAccount = this.accountInfo.agent_blance;  //储存最大可使用金额
			this.myAccount =  this.userInfo.mobile;
			
			this.formParams.alipay_account =  this.userInfo.alipay_account;
			let hasPayPass = uni.getStorageSync('hasPayPass');
			// if (!hasPayPass ) {
			// 	uni.showModal({
			// 		title: '酷熊提醒您',
			// 		content: '请先前往设置支付密码',
			// 		// showCancel:false,
			// 		success: function(res) {
			// 			if (res.confirm) {
			// 				uni.redirectTo({
			// 					url: '/pages/user/setPayPass/setPayPass'
			// 				});
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 				uni.navigateBack({
								
			// 				})
			// 			}
			// 		}
			// 	});
			// 	return false;
			// }
			// // 必须设置支付宝号
			// if (!this.userInfo.alipay_account ) {
			// 	uni.showModal({
			// 		title: '酷熊提醒您',
			// 		content: '请先设置支付宝收款账户',
			// 		// showCancel:false,
			// 		success: function(res) {
			// 			if (res.confirm) {
			// 				uni.navigateTo({
			// 					url:'/pages/user/withdrawal/withdrawal'
			// 				})
			// 			} else if (res.cancel) {
			// 				console.log('用户点击取消');
			// 				uni.navigateBack({
								
			// 				})
			// 			}
			// 		}
			// 	});
			// 	return false;
			// }
		},
		computed:{
			...mapState(['hasLogin', 'userInfo','accountInfo']),
		},
		watch: {
			bankRefreshHandle(newValue, oldValue) {
				this._getList()
			}
		},
		components: {
			// bestPaymentPassword
		},
		filters:{
			encrypt(val){
				let s  = val.slice(4,-3)
				let str = val.replace(s,'**** **** ****');
				return str
			}
		},
		methods:{
			_ok(){},
			// 全部取出
			allIn(){
				this.formParams.apply_money = this.maxAccount
			},
			// 取消支付
			cancelPass(){
				uni.showToast({
					icon: 'none',
					title: '取消兑换'
				});
				
				this.payFlag =  false
			},
			// 确认密码
			checkPwd(e){
				if (!e) {
					uni.showToast({
						icon: 'none',
						title: '取消兑换'
					});
					return;
				}
				this.formParams.pay_password = e
				this.validatePass(e);
			
				this.payFlag =  false
			},
			_closeKeyBoard(){
				// 关闭软键盘
				// if(that.Plaform == 'ios'){
				// 	
				// }
				// console.log(111)
				uni.hideKeyboard()
			},
			// 获取验证码
			async _getCode() {
				if (this.effective) return;	
				let self = this;
				let data = {
					mobile:this.myAccount  ,
					type: 8  //1,注册 2,登录 3,找回 4.银行卡 8-提现
				};				
				try{
					let res = await this.$api.getValidCode(data);
					console.log(JSON.stringify(res))
					if (res.result == 1) {
						uni.showToast({
						    title: '验证码已发送',
							position:'bottom'
						});
						
						self.effective = true;
						self.seconds = 60;
						let time = setInterval(()=>{
							self.seconds-=1;
							if(self.seconds==0){
								self.effective = false;
								clearInterval(time)
							}
						},1000)
					} else {
					    uni.showToast({
					        icon: 'none',
					        title: res.data,
					    });
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
				}
			
			},
			onInput(e){
				let value = e.detail.value;
				// console.log(1,value)
				let arr = value.split('.');
				if (this.time) {
					clearTimeout(this.time);					
					this.time = ''
				} 	
				// 防抖判断
				this.time = setTimeout(() => {
					let str = value
					if (arr[1] && arr[1].length >= 2) {
						// 小数大2位
						str = value.match(/^\d+\.(\d){2}/)[0];
						// console.log('超过4位')						
					}
					// 是否超过最大值
					if(Number(str)>=this.maxAccount ){		
						// console.log('超过最大值')
						str = this.maxAccount
					}				
					// console.log('nomal',str)
					// this.realvalue = str;
					this.formParams.apply_money = str
					clearTimeout(this.time);
					this.time = '';
				}, 500)
			},
			_valide(){
				
			},
			// 加载名下银行卡
			// async _loadBanks() {
			// 	let that = this
			// 	try{
			// 		plus.nativeUI.showWaiting('请稍后...')
			// 		let res = await this.$api.userGetBankList();
			// 		plus.nativeUI.closeWaiting()
			// 		// console.log(JSON.stringify(res))
			// 		if (res.result == 1) {				
						
			// 			if(res.data.rows.length==0){
			// 				// 没有银行卡 前往添加
			// 				uni.showModal({
			// 					title: '提示',
			// 					content: '当前没有银行卡，立即前往添加？',
			// 					showCancel:false,
			// 					success: function (res) {
			// 						if (res.confirm) {
			// 							// console.log('用户点击确定');
			// 							uni.redirectTo({
			// 								url:'/pages/user/newBankCard/newBankCard'
			// 							})
			// 						} else if (res.cancel) {
			// 							console.log('用户点击取消');
			// 							uni.navigateBack({})
			// 						}
			// 					}
			// 				});
			// 				that.bankList = [];
			// 			}else{
			// 				that.bankList = res.data.rows;
			// 				that.currentBank = this.bankList[0].card_bank
			// 				that.currentBackText = this.bankList[0].card_num
			// 				that.formParams.cash_card = this.bankList[0].card_code
			// 			}
						
			// 		} else {
			// 		    uni.showToast({
			// 		        icon: 'none',
			// 		        title: res.msg?res.msg:'银行卡获取失败',
			// 		    });
			// 		}
			// 	}catch(err){
			// 		console.log( '请求结果false : ' + err )
			// 	}
				
			// },
			// 时间选择
			PickerChange(e) {
				// console.log(JSON.stringify(e.detail))
				let k = e.detail.value
				this.currentBank = this.bankList[k].card_bank
				this.currentBackText = this.bankList[k].card_num
				this.formParams.cash_card = this.bankList[k].card_code
			},
			// 提交
			 _submit(){
				let money = this.formParams.apply_money
				console.log(JSON.stringify(this.formParams))
				if(!this.formParams.apply_money){
					uni.showToast({
						icon:'none',
						title:'请输入有效金额'
					})
					return 
				}
				if(!this.formParams.validate){
					uni.showToast({
						icon:'none',
						title:'请输入验证码'
					})
					return 
				}
				// 去除前置0  转化为字符
				// money =  (money+'').replace(/\b(0+)/gi,'')  ;
				money = Number(money).toFixed(2)
				
				console.log(money)
				if(money>this.maxAccount){
					uni.showToast({
						icon:'',
						title:'超出最大限额'
					})
					this.formParams.apply_money = this.maxAccount;
					return 
				}
				// this.show = false
				this.payFlag = true		
				
				// console.log(JSON.stringify(this.formParams))
				
			},
			async validatePass(pass){
				let that = this
				try{
					plus.nativeUI.showWaiting('处理中,请稍后...')
					let res = await this.$api.userSubmitCash(this.formParams);
					plus.nativeUI.closeWaiting()
					if (res.result == 1) {				
						uni.$emit('refresh_user')
						that.$refs.successModal.show()
					} else {
					    // uni.showToast({
					    //     icon: 'none',
					    //     title: res.msg?res.msg:'操作失败，请联系客服',
					    // });
						
						uni.showModal({
						    title:'密码错误',
						    content:'立即否重置密码？',
							confirmText:'立即重置',
						    success: function (res) {
						        if (res.confirm) {
						           uni.navigateTo({
						           	  url:'/pages/role/updatedPayPass/updatedPayPass'
						           })
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						})
					}
				}catch(err){
					console.log( '请求结果false : ' + err );
					plus.nativeUI.closeWaiting()
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.pages {
		position: relative;
		
		padding-top: 172rpx;
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
		.ktxye{
			z-index: 10;
			color: #fff;
			font-size: 64rpx;
			font-weight: 600;
			position: relative;
			margin-bottom: 26rpx;
		}
		.ktxyetext{
			position: relative;
			z-index: 10;
			color: #fff;
		}
		.box {
			box-sizing: border-box;
			padding: 0 20rpx;
			background: #fff;
			border-radius: 20rpx;
			margin-top: 20rpx;
			position: relative;
			z-index: 10;
			.picBox{
				padding: 32rpx 70rpx;
			}
			.cm_text{
				margin-top: 16rpx;
				font-size: 26rpx;
				color: #333;
			}
			.inputBoxs {
				// justify-content: center;
				align-items: center;
				line-height: 86rpx;
				height: 86rpx;

				.inp {
					width: 80%
				}
			}
			.icons{
				width: 120rpx;
				height: 120rpx;
				border-radius: 12rpx;
			}
			.action{
				width: 150rpx;
				height: 20rpx;
			}
			.bd {
				border-bottom: 1rpx solid #eee
			}
		}

		.mark {
			// color: red;

		}

		.submitbtn {
			margin: 60rpx auto 100rpx auto
		}
		.yzmBtn{
			padding: 0 20rpx;
			line-height: 58rpx;
			height: 58rpx;
			background: #FF7047;
			color: #fff;
			border-radius: 29rpx;
		}
	}
</style>
