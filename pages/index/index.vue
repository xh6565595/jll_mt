<template>
	<view class="pages flex flex_center flex_y">
		<image src="../../static/img/logo@1.5x.png" mode="scaleToFill" class="logo" ></image>
		<text class="name">洁利来商城欢迎您</text>
		<text class="text">您尚未登录</text>
		<text class="text">需要获取您的授权之后完成登录</text>
		<button type="success" class="btns" open-type="getUserInfo" @getuserinfo="getuserinfo">微信登录</button>
	</view>
</template>

<script>
import http from '@/utils/http/index.js';
export default {
	data() {
		return {
			loadModal: true,
			updatedInfo: {},
			result: '',
			loginParams: {
				username: '',
				password: '',
				vilidate: '000000'
			},
			ifProdVersion: false //是否是正式版本
		};
	},
	onLoad() {
		
		// uni.authorize({
		//     scope: 'scope.userLocation',
		//     success() {
		// 		console.log(111) 
		//     }
		// })
		
		uni.login({
		  provider: 'weixin',
		  success: function (res) {
		    // console.log(res);
			let code =  res.code;
			// 获取code换opid
			
		  }
		});
		uni.switchTab({
			url:'../main/main'
		})
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
		getuserinfo(res){
			console.log(res.detail.userInfo)
			// uni.chooseAddress({
			//   success (res) {
			//     console.log(res)
			//   }
			// })
			uni.switchTab({
				url:'../main/main'
			})
		},
		

		async autoLogin() {
			if (this.hasLogin) {
				return;
			}
			// console.log(666666666666)
			let that = this;
			const user = uni.getStorageSync('user');
			// console.log(user)
			if (user) {
				this.loginParams.username = user.username;
				this.loginParams.password = user.password;
			} else {
				uni.reLaunch({
					url: '/pages/main/main'
				});
				return false;
			}

			try {
				// this.$ui.showloading()
				// that.loading = true
				let res = await this.$api.userLogin(this.loginParams, false);
				// this.$ui.hideloading()
				// that.loading = false
				// console.log(res)
				if (res.Success) {
					if (res.Data.jykj) uni.setStorageSync('jykj_token', res.Data.jykj);
					if (res.Data.fskj) uni.setStorageSync('fskj_token', res.Data.fskj);
					if (res.Data.vipkj) uni.setStorageSync('vipkj_token', res.Data.vipkj);
					if (res.Data.svipkj) uni.setStorageSync('svipkj_token', res.Data.svipkj);
					if (res.Data.hp) uni.setStorageSync('hepai_token', res.Data.hp);
					uni.setStorageSync('user',that.loginParams);
					
					that.$store.commit('login');
					// this.$ui.toast('登陆成功');
					uni.reLaunch({
						url: '/pages/main/main'
					});	
					// console.log(res)
					that.initUser();
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
}
</style>
