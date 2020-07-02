
<!-- 账号登录 -->
<template>
	<view class="pages">
		<view class="flex flex_y flex_center" >
			<image src="../../../static/img/logo@1.5x.png" mode="scaleToFill" class="logo"></image>
			<view class="title">洁利来商城</view>
		</view>
		<view class="input-group">		
			<view class="formBox">
				<InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds>
				<view class="flex flex_center noteBox" >
					<Icon name="circle-fill" :color="agree?'red':'#666'" :size="16" @tap="_agree"></Icon>
					<navigator class="note f1" url="/pages/main/note/note?type=1">《洁利来商城隐私政策》</navigator>
					<!-- <text class=""></text> -->
				</view>
			</view>
			
			<!-- <button type="text" class="cm_btn" @tap="bindLogin" hover-class="cm_hover_m">登录</button> -->
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="bindLogin">登录</tui-button>
			
			<view class="flex" style="margin-top: 32rpx;">
				<view class="f1">
					<navigator url="../reg/reg">注册账户</navigator>
				</view>
				<view class="f1 cm_tex_r">
					<navigator url="../pwd/pwd">忘记密码?</navigator>
				</view>
			</view>
		</view>
		<!-- <view class="footer  ">
			<view class="flex flex_center">
				<view class="line"></view>
				<view style="margin:  0 16rpx;">快捷登录</view>
				<view class="line"></view>
			</view>
			<view class="wxLogin" hover-class="cm_hover_m" @click="wxAuth">
				<image src="../../static/img/wx.png" mode="scaleToFill"  class="wxLoginIcon"></image>
			</view>
				
		</view> -->
	</view>
</template>

<script>
	import InputGrouds from '@/components/InputGrouds/InputGrouds.vue'
	
	export default {
		data() {
			return {
				inputsArray: [
					// 用户手机号码
					{
						type: 'phone',
						id: 'username',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
						
					},
					// 用户密码
					{
						type: 'password',
						id: 'password',
						markWord:true,
						defaultValue: '',
						iconPic:'../../../static/img/inpus/zc_icon_mm.png',
						placeholder:'请输入您的密码'
					}
				],
				set:{
					// appid: 'wx09daee2f47e178aa',//测试环境
					appid: 'wxbb1e69472b847c6e',//正式环境
					redirect_uri: 'http://jf.fjdmll.com/index.html'
				},
				loading:false,
				agree:true
			};
		},
		components: {
			InputGrouds: InputGrouds
		},
		onLoad(){
			const user = uni.getStorageSync('user');
			if(user){
				this.inputsArray[0].defaultValue = user.username
				this.inputsArray[1].defaultValue = user.password
			}
			
		},
		methods: {
			_agree(){
				this.agree = !this.agree
			},
			_focusHandle(){
				
			},
			// 登录
			async bindLogin() {
				if(!this.agree){
					
					this.$ui.toast('请您阅读并同意《洁利来商城隐私协议》有关事项')
					return;
				}
				
				
				let res = this.$refs.formInputs.verify();
				let that = this
						
				if (res.status) {
					let data = res.data
					data.vilidate = '000000';		
					// debugger
					try{
						// this.$ui.showloading()
						that.loading = true
						let res = await this.$api.userLogin(data,false)
						// this.$ui.hideloading()
						that.loading = false
						// console.log(res)
						if(res.Success){
							that.$ui.toast('登陆成功')
							if(res.Data.hp)uni.setStorageSync('hepai_token',res.Data.hp);
							// console.log(data)
							uni.setStorageSync('user',data);
							
							// if(res.Data){
							// 	that.$store.commit('setAccountInfo',res.Data)
							// }	
							that.$store.commit('login')
							setTimeout(()=>{
								uni.reLaunch({
									url: '/pages/land/land'
								})
								// uni.navigateBack({
								// 	delta:2
								// })
							},1000)						
						}else{
							that.$ui.toast(res.Msg)
							that.loading = false
						}
					}catch(err){
						console.log( '请求结果false : ' + err )
						that.loading = false
					}		
				}		
			}
		},
	}
</script>

<style lang="scss" scoped> 
	.pages{
		padding: 30rpx;
		// height: calc(100vh - 176rpx);
		// min-height: 700rpx;
		background: #fff;
		.logo{
			width:146rpx;
			height:146rpx;
			border-radius: 16rpx;
			margin-top: 56rpx; 
		}
		.title{
			font-size: 34rpx;
			color: #333;
			text-align: center;
			font-weight: 600;
			margin: 24rpx auto 54rpx auto;
			
		}
		.formBox{
			margin-bottom: 80rpx;
			.noteBox{
				height: 60rpx;
				padding: 0 20rpx;
			}
		}
		.footer{
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			.line{
				width: 50rpx;
				height: 2rpx;
				color: #333333;
				background: #333333;
			}
			.wxLogin{
				margin: 40rpx auto 50rpx auto;
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				.wxLoginIcon{
					width: 90rpx;
					height: 90rpx
				}
			}
		}
	}
</style>
