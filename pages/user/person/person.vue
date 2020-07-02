<template>
	<view class="pages">
		    <view class="main">
				<view class="cu-form-group flex flex_center"  @tap="_chooseAvatar">
					<view class="title f1">头像</view>
					<image class="avatar"  :src="formParams.consumer_head"  mode="aspectFill"></image>
					<!-- <text class="iconfont "></text> -->
					<Icon name="arrowright" :size="16"></Icon>
				</view>
				<view class="cu-form-group flex flex_center">
					<view class="title">微信昵称</view>
					<input placeholder="请输入新昵称" name="input" class="cm_tex_r f1" type="text" v-model="formParams.consumer_nick_name" ></input>
				</view>	
				<view class="cu-form-group flex flex_center" @tap="updatedPhone">
					<view class="title">手机号</view>
					<!-- <input placeholder="请输入手机号" name="input" class="cm_tex_r f1" type="text" v-model="" ></input> -->
					<view class="cm_tex_r f1">{{usrMsg.consumer_mobile}}</view>
					<Icon name="arrowright" :size="16"></Icon>
				</view>	
				<!-- <view class="cu-form-group flex flex_center">
					<view class="title f1">支付密码</view>
						<Icon name="arrowright" size="16"></Icon>
				</view>	 -->
			</view>
					
			<!-- <button type="primary" class="cm_btn" @tap="_sureUpdated" style="margin-top:60rpx">保存修改</button> -->
			<view style="margin-top: 72rpx;padding: 0 20rpx;">
				<tui-button type="primary" shape="circle" :loading="loading" @tap="_updateUserInfo">保存修改</tui-button>
			</view>
			
			<!-- <view style="margin-top: 72rpx;padding: 0 20rpx;">
				<tui-button type="primary" shape="circle" :loading="loading" @tap="_loginOut">退出登录</tui-button>
			</view> -->
	</view>
</template>

<script>
	
	import http from '@/utils/http/index.js'
	export default {
		data() {
			return {
				formParams: {
					"consumer_nick_name": "", 
					"consumer_head": ""
				},
				loading:false
			};
		},
		onLoad(){
			let usrMsg =  this.$store.state.accountInfo;
			// console.log(JSON.stringify(usrMsg))
			this.formParams.consumer_nick_name = usrMsg.consumer_nick_name;
			this.formParams.consumer_head = usrMsg.consumer_head
		},
		computed:{
			usrMsg(){
				return this.$store.state.accountInfo
			} 
		},
		methods:{
			// 更改手机号
			updatedPhone(){
				uni.navigateTo({
					url:'/pages/role/bund/bund'
				})			
			},
			// 头像
			_chooseAvatar(){
				let  that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera '], //从相册选择
					success: function (res) {
						// 上传图片					
						that._uploadAvatar(res.tempFilePaths[0])
						
					}
				});
			},
			async _uploadAvatar(file){
				let that = this;
				// let data = {
				// 	modle:file
				// }
				this.$ui.showloading()
				
				let query = 'userAvatars'
				 uni.uploadFile({
					url: http.baseUrl+'/api/Upload/UploadImg?folder='+query, //仅为示例，非真实的接口地址
					filePath: file,
					name: 'file',
					formData: {},
					success: (uploadFileRes) => {
						this.$ui.hideloading();
						let json = JSON.parse(uploadFileRes.data) 
							// console.log(json.Data);
						let url = json.Data;
						that.formParams.consumer_head = url;
						// that._updateUserInfo()
					},
					fail:()=>{
						this.$ui.hideloading();
					}
				});
			},
			// 更新用户信息
			async _updateUserInfo(){
				// debugger
				let that = this;
				try{
					this.$ui.showloading();
					let res = await this.$api.userInfoUpdate(this.formParams);
					this.$ui.hideloading();
					console.log(res);
					if (res.Success) {		
						// console.log(": " + JSON.stringify(res));
						
						that.$ui.toast('修改成功')
						// that.$store.commit('refresh_user');
						uni.$emit('refresh_user')
						setTimeout(()=>{
							uni.navigateBack()
						},500)
					} else {
					    
						that.$ui.toast(res.Msg)
					}
				}catch(err){
					console.log( '请求结果false : ' + err )
				}
			},
			_sureUpdated(){
				let that = this
				uni.showModal({
					title: '洁利来商城提醒你',
					content: '是否提交修改',
					success: function (res) {
						if (res.confirm) {
							that._updateUserInfo()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			_loginOut(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		.main{
			background: #fff;
			padding:0 20rpx;
			.cu-form-group{
				border-bottom: 1rpx solid #E5E5E5;
				min-height: 88rpx;
				line-height: 88rpx;
				.avatar{
					width: 70rpx;
					height: 70rpx ;
					border-radius: 50%;
				}
				
				
				&:last-child{
					border-bottom: none
				}
			}
			
		}
	}
</style>
