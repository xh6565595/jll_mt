<template>
	<view class="pages">
		<!-- <view class="title">{{type==1?'注册':'新用户注册'}}</view> -->
		<view class="input-group">		
			<view class="formBox">
				<InputGrouds :inputsArray="inputsArray" @focusHandle="_focusHandle" :markWord="false" ref="formInputs"></InputGrouds>
				<view class="flex flex_center noteBox" >
					<Icon name="circle-fill" :color="agree?'red':'#666'" :size="16" @tap="_agree"></Icon>
					<navigator class="note f1" url="/pages/main/note/note?type=0">《洁利来商城隐私政策》</navigator>
					<!-- <text class=""></text> -->
				</view>
			</view>
		
			<!-- <button type="text" class="cm_btn" @tap="bindRegiste" hover-class="cm_hover_m">注册</button> -->
			<tui-button type="primary" shape="circle" :disabled="false" :loading="loading" @tap="bindRegiste">注册</tui-button>
			<!-- <view class="flex flex_center" style="margin-top: 32rpx;" v-if="type==1">
				<view class="">
					已有账户,
				</view>
				<view class=" cm_tex_r">
					<navigator open-type="redirect" url="../login/login" class="primary">去登陆</navigator>
				</view>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	import InputGrouds from '@/components/InputGrouds/InputGrouds.vue'
	export default {
		data() {
			return {
				loading:false,
				inputsArray: [
					// 用户手机号码
					{
						type: 'phone',
						id: 'mobile',
						defaultValue: '',
						iconPic: '../../../static/img/inpus/zc_icon_sj.png',
						placeholder:'请输入您的手机号',
						
					},
					// 用户密码
					{
						type: 'password',
						id: 'password',
						markWord:true,
						iconPic:'../../../static/img/inpus/zc_icon_mm.png',
						placeholder:'请输入您的密码'
					},
					{
						type: 'verify',
						id: 'vilidate',
						relevantId: 'mobile',
						iconPic:'../../../static/img/inpus/zc_icon_yzm.png',
						codeType:1,
						placeholder:'请输入短信验证码',
						buttonStyle:'block'
					},
				],
				type:1   ,//1为正常注册于微信无关，2为微信注册并绑定
				agree:true
			};
		},
		onLoad(options){
			// alert('a'+this.type)
			if(options.type==2){
				this.type = 2
				// uni.setNavigationBarTitle({
				// 	title:'绑定手机'
				// })
			}
		
			// alert('b'+this.type)
		},
		components: {
			InputGrouds: InputGrouds
		},
		methods: {
			_focusHandle(){
				this.hide = true
			},
			// 用户注册
			async bindRegiste() {
				if(!this.agree){
					
					this.$ui.toast('请您阅读并同意《洁利来商城隐私政策》有关事项')
					return;
				}
				let re = this.$refs.formInputs.verify();
				let that = this
				const openid =  uni.getStorageSync('JLL_openId');		
				if (re.status) {
					let data = re.data
					data.type = 0
					if(this.type==2 && openid){
						data.openId = openid
					}
					
					// debugger
					try{
						that.loading = true
						let res = await this.$api.userRegiste(data,true)
						that.loading = false
						if(res.Success){
							console.log(res)
							that.$ui.toast('注册成功')
							
							if(this.type==2 && openid){
								that.wxlogin( openid)
							}else{
								that.login( re.data)
							}
							
							
						}else{
							that.$ui.toast(res.Msg)
							that.loading = false
						}
						// console.log( '请求结果success : ' + JSON.stringify(res))
					}catch(err){
						console.log( '请求结果false : ' + err )
						that.loading = false
					}		
				}			
			},
			// 微信登录
			async wxlogin(openid){
				let that = this
				try{
					// this.$ui.showloading()
					that.loading = true
					let res = await this.$api.WxTokenLogin({openId:openid},false)
					// this.$ui.hideloading()
					that.loading = false
					console.log(res)
					if(res.Success){
						that.$ui.toast('登陆成功')
						if(res.Data.hp)uni.setStorageSync('hepai_token',res.Data.hp);
	
						that.$store.commit('login')
						setTimeout(()=>{
							uni.navigateBack({})
						},1000)						
					}else{
						that.$ui.toast(res.Msg)
						that.loading = false
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
					that.loading = false
				}		
			},
			// 普通账户登录
			async login(o){
				// console.log(o)
				let that = this
				let data = {
					username:o.mobile,
					password:o.password,
					vilidate:'000000'
				}
				// data.vilidate = '000000';		
				// debugger
				try{
					// this.$ui.showloading()
					that.loading = true
					let res = await this.$api.userLogin(data,false)
					// this.$ui.hideloading()
					that.loading = false
					console.log(res)
					if(res.Success){
						that.$ui.toast('登陆成功')
						if(res.Data.hp)uni.setStorageSync('hepai_token',res.Data.hp);
						// console.log(data)
						uni.setStorageSync('user',data);
						that.$store.commit('login')
						setTimeout(()=>{
							uni.navigateBack({
								delta:2
							})
						},1000)						
					}else{
						that.$ui.toast(res.Msg)
						that.loading = false
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
					that.loading = false
				}		
			},
			sendMessage() {
		
			}
		},
	}
</script>

<style lang="scss" scoped> 
	.pages{
		padding: 30rpx;
		background: #fff;
		.title{
			font-size: 34rpx;
			color: #333;
			text-align: center;
			font-weight: 600;
			margin: 32rpx auto 40rpx auto;
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
