<template>
	<view class="pages flex flex_center flex_y">
		<image src="../../static/image/logo.png" mode="scaleToFill" class="logo" ></image>
		<text class="name">洁利来商城欢迎您</text>
		<text class="text">您尚未登录</text>
		<text class="text">需要获取您的授权之后完成登录</text>
		<button type="success" class="btns" open-type="getUserInfo" @getuserinfo="getuserinfo">微信登录</button>
		<accredit ref="userBox">
			<view class="formBox" slot="content">
				<view class="cm_title cm_tex_c title" > 账户绑定</view>
				<view class=" inputBoxs ">
					<text class="cm_title label  ">手机号码:</text>
				</view>
					
				<view class=" inputBoxs  flex flex_center cm_bdb">					
					<input class="cm_tex_l f1 inp" type="text"  v-model="formParams.mobile" placeholder="请输入手机号">
					<view class="yzmBtn" size="mini" hover-class="cm_hover" @tap="_getCode">{{seconds>0?seconds+'s':'发送验证码'}}</view>
				</view>
				<view class=" inputBoxs ">
					<text class="cm_title label  ">验证码:</text>
				</view>
				<view class=" ">
					<!-- <input class="f1" type="number" clearable  v-model="formParams.validate" placeholder="请输入验证码"> -->
					 <one-input ref="hi" type="box" @finish="finish" @input="input" :maxlength="6"></one-input>
				</view>
				<button type="success" class="btns"   @tap="submit">立即登录</button>
			</view>		
		</accredit>
	</view>
</template>

<script>
import Utils from '@/utils/utils.js';
import http from '@/utils/http/index.js';
import oneInput from '@/components/myp-one/myp-one';
import accredit from '@/components/accredit/accredit';
export default {
	data() {
		return {
			loadModal: true,
			updatedInfo: {},
			result: '',
			effective:'',
			formParams:{
				"openId": "",
				"vilidate":"",
				"mobile": "",
				"invitation":"",   //邀请码
				"nickname":"",   //微信昵称
				"headimgurl":"",    //用户头像
				"share_user_id":"", //userid 分享活动
			},
			seconds:0,
			time:null
		};
	},
	components:{
		accredit,
		oneInput
	},
	onLoad() {
		let that = this
		const opid= uni.getStorageSync('jll_opid')
		if(opid){
			// 已存在账户
			that.autoLogin(opid);
		}
		
		// uni.switchTab({
		// 	url:'../main/main'
		// }) 
		// uni.redirectTo({
		// 	url:'../main/serverCenter/serverCenter'
		// })
		// that.$refs.userBox.showModal()
	},
	computed: {
		hasLogin() {
			return this.$store.state.hasLogin ? this.$store.state.hasLogin : false;
		},
		accountInfo() {
			return this.$store.state.accountInfo;
		}
	},
	methods: {
		// 立即注册
		async submit(){
			let that = this
			// console.log(this.formParams); 
			if(!this.formParams.vilidate || this.formParams.vilidate.length<6){
				this.$ui.toast('请输入正确的验证码')
				return;
			}
			
			try {
				this.$ui.showloading()
				let res = await this.$api.WxAutoRegiste(this.formParams, false);
				console.log(res);
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
					that.$refs.userBox.hideModal()
					
				}else{
					that.$ui.toast(res.Msg?res.Msg:'未知错误')
					
					that.reset() 
				}
			} catch (err) {
				that.$ui.toast(err)
				that.reset()
			}
		},
		// 重置表单
		reset(){
			this.$refs.userBox.hideModal();
			this.seconds = 0
			this.effective = ''
			this.formParams.vilidate = ''
			clearInterval(this.time)
			this.time = null
		},
		// 实时同步
		input(e){
			this.formParams.vilidate = e
		},
		// 输完验证码码回调
		finish(e){
			console.log(this.formParams);
			this.submit()
			// this.reset()
		},
		// 获取验证码
		async _getCode() {
			if (this.effective) return;
			let self = this;
			if(!this.formParams.mobile || !Utils.phoneCheck(this.formParams.mobile)){
				this.$ui.toast('请输入正确的手机号码')
				return;
			}
			// console.log(this.formParams)
			let data = {
				mobile:this.formParams.mobile  ,
				type: 1  //1,注册 2,登录 3,找回 4.银行卡 8-提现
			};				
			try{
				this.$ui.showloading()
				let res = await this.$api.getVerificateCode(data);
				this.$ui.hideloading()
				// console.log(JSON.stringify(res))
				if (res.Success) {
					uni.showToast({
					    title: '验证码已发送',
						position:'bottom'
					});
					
					self.effective = true;
					self.seconds = 60;
					this.time = setInterval(()=>{
						self.seconds-=1;
						if(self.seconds==0){
							self.effective = false;
							clearInterval(this.time)
						}
					},1000)
				} else {
				    uni.showToast({
				        icon: 'none',
				        title: res.Msg? res.Msg:'未知错误',
				    });
				}
			}catch(err){
				console.log( '请求结果false : ' + err )
				
			}
		},
		// 换取opndid
		async getopId(code){
			let that = this
			try {
				this.$ui.showloading()
				let res = await this.$api.GetOpenId({wx_code:code}, false);
				this.$ui.hideloading()
				if (res.Success) {
					// oNDKY5B658gwmlw5vZnwEUOdG1io
					let opid = res.Msg;
					uni.setStorageSync('jll_opid',opid);
					that.formParams.openId = opid
					// that.$refs.userBox.showModal()
					return {
						success:true,
						data:opid
					}
				}else{
					return {
						success:false
					}
				}
			} catch (err) {
				// console.log('请求结果false : ' + err);
				return {
					success:false
				}
			}
		},
		// 获取个人信息
		getuserinfo(res){
			let that = this
			let userInfo = res.detail.userInfo
			// console.log(userInfo)
			this.formParams.nickname = userInfo.nickName
			this.formParams.headimgurl =  userInfo.avatarUrl
			uni.login({
			  provider: 'weixin', 
			  success:async function (res) {
				let code =  res.code;
				// 获取code换opid
				const r = await that.getopId(code)	
				
				if(r.success){
					that.$refs.userBox.showModal()
					// that.register(r.data)
				}
			  }
			});
		},
		// opid直接登录
		async autoLogin(opid) {
			let that = this;

			try {
				this.$ui.showloading()
				let res = await this.$api.WxTokenLogin({openId:opid}, false);
				this.$ui.hideloading()
		
				if (res.Success) {		
					// that.$store.commit('login');
					uni.setStorageSync('access_token',res.Data.hp)
					that.$store.dispatch('userLogin',res.Data.hp);
					uni.redirectTo()({
						url: '/pages/main/main'
					});	
				
				} else {
					uni.reLaunch({
						url: '/pages/main/main'
					});
				}
			} catch (err) {
				// console.log('请求结果false : ' + err);
				uni.reLaunch({
					url: '/pages/main/main'
				});
			}
		},
		// 加载登录账户信息
		async initUser(callback) {
			let that = this;
			try {
				// this.$ui.showloading();

				let res = await this.$api.getConsumer({}, false);
				// this.$ui.hideloading();

				// console.log(res)
				if (res.Success) {
					if (res.Data) {
						that.$store.commit('setAccountInfo', res.Data);
						that.userAccount = res.Data;
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
	.name{
		font-size: 34rpx;
		font-weight: 600;
		color: #333;
		margin-bottom: 70rpx;
	}
	.text{
		color: #999;
		line-height: 1.2;
	}
	.btns{
		margin-top: 36rpx;
		width: 346rpx;
		line-height: 80rpx;
		height: 80rpx;
		border-radius:40rpx ;
		text-align: center;
		color: #fff;
		font-size: 32rpx;
		background-color: #08c163;
		box-shadow:  0 4rpx 4rpx #08c163;
	}
	.formBox{
		width: 100%;
		.title{
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

