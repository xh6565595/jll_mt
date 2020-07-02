<template>
	<view class="pages">
		<image :src="src" class="contain" mode="widthFix" @load="imageLoad()"></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formParams:{
				type:0
			},
			src:''
		};
	},
	onLoad(options) {
		let type =  parseInt(options.type) ;
		this.formParams.type=type
		this._loadData('refresh');

	},
	methods: {
		imageLoad(){},
		async _loadData(type, callback) {
			let that = this
			try {
				this.$ui.showloading();
				let res = await this.$api.getGuide(this.formParams);
				// console.log(res)
				this.$ui.hideloading()
				if (res.Success) {
					that.src = res.Data.Value
					// let img =new Image();
					// img.src = res.Data.Value
					// img.onLoad = function(e){
					// 	console.log(JSON.stringify(e))
					// }
					
					
					uni.setNavigationBarTitle({
						title:res.Data.Text
					})
				} else {
					that.$ui.toast(res.Msg,)
				}
			} catch (err) {
				console.log('请求结果false : ' + err)
			}
			if (callback) callback()
		},
	}
};
</script>

<style lang="scss" scoped>
	.pages{
		.contain{
			width: 100%;
			height: auto;
		}
	}
	
</style>
