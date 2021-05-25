<template>
	<view class="pages flex flex_center flex_y">
		<image src="../../static/image/logo.png" mode="scaleToFill" class="logo" ></image>
		<text class="name">GLLO健康智能马桶</text>
	<!-- 	<text class="text">您尚未登录</text>
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
					 <one-input ref="hi" type="box" @finish="finish" @input="input" :maxlength="6"></one-input>
				</view>
				<button type="success" class="btns"   @tap="submit">立即登录</button>		
			</view>		
		</accredit> -->
	</view>
</template>

<script>
import Utils from '@/utils/utils.js';
import http from '@/utils/http/index.js';
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
			time:null,
			iviCode:'',
			shareData:''
		};
	},

	onLoad(options) {
		let that = this
	
		let icode = ''
		if(options.q){
			let  url = decodeURIComponent(options.q);
			icode = url.split('icode=')[1]
		}else if(options.icode){
			icode = options.icode
		}
		// console.log(icode);
		this.shareData = {
			proCode:options.pcode?options.pcode:'',  //商品code
			userId:options.ucode?options.ucode:'' ,  //人物code
			odrCode:options.ocode?options.ocode:'' ,  //人物code
			iviCode:icode?icode:'',
		}
		// console.log(this.shareData );
		if(that.shareData.proCode || that.shareData.userId || that.shareData.odrCode || that.shareData.iviCode){
			that.$store.commit('setShare',{proCode:that.shareData.proCode,userId:that.shareData.userId,orderCode:that.shareData.odrCode,iviCode:that.shareData.iviCode})
		}
		
		
		// console.log('shareData',this.shareData)
		const jll_opid =  uni.getStorageSync('jll_opid');  
		if(jll_opid){
			that.autoLogin(jll_opid)
		}else{
			uni.login({
			  provider: 'weixin', 
			  success: function (res) {
				let code =  res.code;
				// 获取code换opid
				// console.log(code)
				// const r = await that.getopId(code)	
				that.getopId(code)	
			  }
			});
		}
		
	},
	computed: {},
	methods: {
		// 换取opndid
		async getopId(code){
			let that = this
			try {
				// this.$ui.showloading()
				let res = await this.$api.GetOpenId({wx_code:code}, false);
				// this.$ui.hideloading()
				// console.log(res)
				if (res.Success) {
					// oNDKY5B658gwmlw5vZnwEUOdG1io
					let opid = res.Msg;
					uni.setStorageSync('jll_opid',opid);  
					that.formParams.openId = opid
					// that.$refs.userBox.showModal()
					// 自动登录一次
					that.autoLogin(opid)

				}else{
					that.$ui.hideloading()
					
				}
			} catch (err) {
				that.$ui.hideloading()
			}
		},
		// opid直接登录
		async autoLogin(opid) {
			let that = this;

			try {
				let res = await this.$api.WxTokenLogin({openId:opid}, false);
				// this.$ui.hideloading()
				// uni.navigateTo({
				// 	url:'/pages/login/login'
				// })	
				// 	return
				if (res.Success) {		
					that.$store.commit('login');
					uni.setStorageSync('access_token',res.Data.hp)
					that.initUser()
				
				} else {
					this.$ui.hideloading()
					if(res.Msg && res.Msg!='用户不存在' ){
						this.$ui.toast(res.Msg)
					}
					if(that.shareData.proCode && that.shareData.userId && that.shareData.odrCode){
						uni.redirectTo({
							url: '/pages/main/details/details?code='+ that.shareData.proCode
						});
					}else{
						uni.redirectTo({
							url:'/pages/loding/loding'
						})	
					}			
				}
			} catch (err) {
				this.$ui.hideloading()
				this.$ui.toast(err)
			}
		},
		// 加载登录账户信息
		async initUser(callback) {
			let that = this;
			try {
				let res = await this.$api.getConsumer({}, false);
				if (res.Success) {
					if (res.Data) {
						that.$store.commit('setUserInfo', res.Data);
						setTimeout(()=>{
							if(res.Data.consumer_type==3){
								// if(false){
								// 安装员
								uni.redirectTo({
									url: '/pages/main/serverCenter/serverCenter'
								});
							}else{
								//  消费者 3是安装 2推广者
								// 记录信息
								if(that.shareData.proCode && that.shareData.userId && that.shareData.odrCode){
									uni.redirectTo({
										url: '/pages/main/details/details?code='+ that.shareData.proCode
									});
								}else{
									uni.redirectTo({
										url: '/pages/loding/loding'
									});
								}						
							}
						},500)						
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
		padding: 48rpx;
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

