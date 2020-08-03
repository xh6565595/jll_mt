<template>
	<view>
		
	</view>
</template>

<template>
	<view class="pages">
		<web-view :src="url" class="cover" @message="message"></web-view>
	</view>
</template>
<script>
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				url:'https://gllo.kuxiong999.com//authorized.html'
			};
		},
		computed: mapState(['webviewUrl']),
		onLoad(){
				
		},
		methods:{
			message(e){
				// e.detail = { data }
				// console.log(e.detail)
				let code = e.detail.data[0]
				const mini_opendId = uni.getStorageSync('jll_opid');
					
				
				this.authod({wx_code:code,weapp_open_id:mini_opendId})
			},
			async authod(data){
				let that = this;
				// debugger
				try {
					this.$ui.showloading();
					let res = await this.$api.GetWxcode_Attention(data, false);
					this.$ui.hideloading();
					if (res.Success) {
						if(res.Data.subscribe==1){
							that.$ui.toast('订阅功能已开启');
							
						}else{
							that.$ui.toast('订阅功能未开启');
						}
						uni.setStorageSync('authId',res.Data.openid);
						uni.$emit('gzhAuth',res.Data.subscribe==1?true:false)
						uni.navigateBack({})
					} else {
						that.$ui.toast(res.Msg);
					}
					
				} catch (err) {
					console.log('请求结果false : ' + err);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		.cover{
			width: 100vw;
			height: 100vh;
		}
	}
</style>
