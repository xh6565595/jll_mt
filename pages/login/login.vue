<template>
	<view class="pages flex flex_center flex_y">
		<image src="../../static/image/logo.png" mode="scaleToFill" class="logo"></image>
		<text class="name">GLLO健康智能马桶</text>
		<text class="text">您尚未登录</text>
		<text class="text">需要获取您的授权之后完成登录</text>
		<button v-if="canIUseGetUserProfile" class="btns" @click="getUserProfile"> 微信一键登录 </button>
		<button type="success" v-else class="btns" open-type="getUserInfo" @getuserinfo="getuserinfo">微信登录</button>

		<accredit ref="userBox">
			<view class="formBox" slot="content">
				<view class="cm_title cm_tex_c title"> 账户绑定</view>
				<view class=" inputBoxs ">
					<text class="cm_title label  ">手机号码:</text>
				</view>

				<view class=" inputBoxs  flex flex_center cm_bdb">
					<input class="cm_tex_l f1 inp" type="number" v-model="formParams.mobile" placeholder="请输入手机号">
					<view class="yzmBtn" size="mini" hover-class="cm_hover" @tap="_getCode">
						{{seconds>0?seconds+'s':'发送验证码'}}</view>
				</view>
				<view class=" inputBoxs ">
					<text class="cm_title label  ">验证码:</text>
				</view>
				<view class=" ">
					<one-input ref="hi" type="box" @finish="finish" @input="input" :maxlength="6"></one-input>
				</view>
				<button type="success" class="btns" @tap="submit">立即登录</button>
			</view>
		</accredit>
	</view>
</template>

<script>
	import Utils from '@/utils/utils.js';
	import http from '@/utils/http/index.js';
	import oneInput from '@/components/myp-one/myp-one';
	import accredit from '@/components/accredit/accredit';
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				loadModal: true,
				updatedInfo: {},
				result: '',
				effective: '',
				formParams: {
					"openId": "",
					"vilidate": "",
					"mobile": "",
					"invitation": "", //邀请码
					"nickname": "", //微信昵称
					"headimgurl": "", //用户头像
					"share_user_id": "", //userid 分享活动
				},
				seconds: 0,
				time: null,
				canIUseGetUserProfile: false
			};
		},
		components: {
			accredit,
			oneInput
		},
		onLoad(options) {
			const jll_opid = uni.getStorageSync('jll_opid');
			this.formParams.invitation = this.iviCode
			this.formParams.share_user_id = this.shareUser
			this.formParams.openId = jll_opid
			// if( this.iviCode){
			// 	uni.showModal({
			// 		title:'发现邀请码',
			// 		content:this.iviCode,
			// 		showCancel:true
			// 	})
			// }
			if (uni.getUserProfile) {
				
				this.canIUseGetUserProfile =true
				 
			}else{
				
			}
			// debugger
		},
		computed: mapState(['shareUser', 'iviCode', 'sharePro', 'shareOrder', 'userInfo', 'hasLogin']),
		methods: {
			async getopId(code) {
				let that = this
				try {
					this.$ui.showloading()
					let res = await this.$api.GetOpenId({
						wx_code: code
					}, false);
					this.$ui.hideloading()
					if (res.Success) {
						let opid = res.Msg;
						uni.setStorageSync('jll_opid', opid);
						that.autoLogin(opid)

					} else {
						that.$ui.hideloading()

					}
				} catch (err) {
					that.$ui.hideloading()
				}
			},
			// 立即注册
			async submit() {
				let that = this
				console.log(this.formParams);
				if (!this.formParams.vilidate || this.formParams.vilidate.length < 6) {
					this.$ui.toast('请输入正确的验证码')
					return;
				}

				try {
					this.$ui.showloading()
					//console.log(this.formParams)
					let res = await this.$api.WxAutoRegiste(this.formParams, false);
					// console.log(res);
					this.$ui.hideloading()
					if (res.Success) {
						// that.$ui.toast('登陆成功')
						// that.$store.commit('login');
						that.$refs.userBox.hideModal()
						// uni.redirectTo()({
						// 	url: '/pages/main/main'
						// });	
						let opid = res.Data.openId;
						that.autoLogin(opid)
						// that.$refs.userBox.hideModal()

					} else {
						if (res.Msg) {
							this.$ui.toast(res.Msg)
						}

						that.reset()
					}
				} catch (err) {
					that.$ui.toast(err)
					that.reset()
				}
			},
			// 重置表单
			reset() {
				this.$refs.userBox.hideModal();
				this.seconds = 0
				this.effective = ''
				this.formParams.vilidate = ''
				clearInterval(this.time)
				this.time = null
				this.$refs.hi.set('')
			},
			// 实时同步
			input(e) {
				this.formParams.vilidate = e
			},
			// 输完验证码码回调
			finish(e) {
				uni.hideKeyboard()
				this.submit()
				// this.reset()
			},
			// 获取验证码
			async _getCode() {
				if (this.effective) return;
				let self = this;
				if (!this.formParams.mobile || !Utils.phoneCheck(this.formParams.mobile)) {
					this.$ui.toast('请输入正确的手机号码')
					return;
				}
				// console.log(this.formParams)
				let data = {
					mobile: this.formParams.mobile,
					type: 1 //1,注册 2,登录 3,找回 4.银行卡 8-提现
				};
				try {
					this.$ui.showloading()
					let res = await this.$api.getVerificateCode(data);
					this.$ui.hideloading()
					// console.log(JSON.stringify(res))
					if (res.Success) {
						uni.showToast({
							title: '验证码已发送',
							position: 'bottom'
						});

						self.effective = true;
						self.seconds = 60;
						this.time = setInterval(() => {
							self.seconds -= 1;
							if (self.seconds == 0) {
								self.effective = false;
								clearInterval(this.time)
							}
						}, 1000)
					} else {
						uni.showToast({
							icon: 'none',
							title: res.Msg ? res.Msg : '未知错误',
						});
					}
				} catch (err) {
					console.log('请求结果false : ' + err)

				}
			},
			getUserProfile(e) {
				let  that = this
				// debugger
				// 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
				// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
				uni.getUserProfile({
					desc: '获取您的信息头像和昵称', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						// this.setData({
						//   userInfo: res.userInfo,
						//   hasUserInfo: true
						// })
						// console.log(res)
						 
						this.formParams.nickname = res.userInfo.nickName
						this.formParams.headimgurl = res.userInfo.avatarUrl

						const jll_opid = uni.getStorageSync('jll_opid');
						if (jll_opid) {
							that.autoLogin(jll_opid)
						} else {
							uni.login({
								provider: 'weixin',
								success: function(res) {
									let code = res.code;
									// 获取code换opid
									that.getopId(code)
								}
							});
						}
					},
					fail(e){console.log(e)}
				})
			},
			// 获取个人信息
			getuserinfo(res) {
				let that = this
				let userInfo = res.detail.userInfo
				console.log(res)
				if(userInfo){
						this.formParams.nickname = userInfo.nickName
						this.formParams.headimgurl = userInfo.avatarUrl
						return
						const jll_opid = uni.getStorageSync('jll_opid');
						if (jll_opid) {
							that.autoLogin(jll_opid)
						} else {
							uni.login({
								provider: 'weixin',
								success: function(res) {
									let code = res.code;
									// 获取code换opid
									that.getopId(code)
								}
							});
						}
				}
				


			},
			// opid直接登录
			async autoLogin(opid) {
				let that = this;

				try {
					// this.$ui.showloading()
					let res = await this.$api.WxTokenLogin({
						openId: opid
					}, false);
					// this.$ui.hideloading()

					if (res.Success) {
						uni.setStorageSync('access_token', res.Data.hp)
						that.initUser()

					} else {

						if (res.Msg && res.Msg != '用户不存在') {
							this.$ui.toast(res.Msg)
						} else {
							this.$refs.userBox.showModal();
						}
					}
				} catch (err) {
					// console.log('请求结果false : ' + err);
					// uni.redirectTo({
					// 	url: '/pages/main/main'
					// });
					// uni.redirectTo({
					// 	url: '/pages/main/main'
					// });	
				}
			},
			// 加载登录账户信息
			async initUser(callback) {
				let that = this;
				try {
					// this.$ui.showloading();

					let res = await this.$api.getConsumer({}, false);

					if (res.Success) {
						if (res.Data) {
							that.$store.commit('setUserInfo', res.Data);
							that.$store.commit('login');
							setTimeout(() => {
								if (res.Data.consumer_type == 3) {
									// if(true){
									// 安装员
									uni.reLaunch({
										url: '/pages/main/serverCenter/serverCenter'
									});
								} else {
									// 推广者 消费者 3是安装
									// uni.switchTab({
									// 	url: '/pages/main/main'
									// });
									if (that.shareUser && that.sharePro && that.shareOrder) {
										uni.redirectTo({
											url: '/pages/main/details/details?code=' + that.sharePro
										});
									} else {
										uni.switchTab({
											url: '/pages/main/main'
										});
									}
								}
							}, 500)

						}
					} else {
						that.$ui.toast(res.Msg);
					}
					if (callback) callback();
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			}
		}
	};
</script>

<style lang="less" scoped>
	.pages {
		background: #fff;
		justify-content: flex-start;

		.logo {
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			margin: 177rpx auto 28rpx auto;
		}

		.name {
			font-size: 34rpx;
			font-weight: 600;
			color: #333;
			margin-bottom: 70rpx;
		}

		.text {
			color: #999;
			line-height: 1.2;
		}

		.btns {
			margin-top: 36rpx;
			width: 346rpx;
			line-height: 80rpx;
			height: 80rpx;
			border-radius: 40rpx;
			text-align: center;
			color: #fff;
			font-size: 32rpx;
			background-color: #08c163;
			box-shadow: 0 4rpx 4rpx #08c163;
		}

		.formBox {
			width: 100%;
			padding: 48rpx;

			.title {
				color: #08c163;
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
		}
	}
</style>
