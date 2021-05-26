<template>
	<view class="pages">
		<view class="cm_title cm_tex_c">{{item.msg_title}}</view>
		<view class="cm_des cm_tex_c">{{item.msg_time}}</view>
		 <rich-text v-if="item.msg_content" :nodes="item.msg_content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:'',
			};
		},
		onLoad(options){
			this.code = options.code
			// 0仅退款  1退货退款 3编辑状态
			// console.log(this.currentPro) 
			this._loadData()
		},
		methods:{
			// 热门推荐
			async _loadData(){
				let that = this
				try {
					let res = await this.$api.GetCmsDetail({msg_code:this.code});
					if (res.Success) {
						that.item = res.Data
					} else {
						that.$ui.toast(res.Msg);
					}
					
				} catch (err) {
					console.log('请求结果false : ' + err)
					that.loadStatus = 'more'
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.pages{
		padding: 20rpx;
		.cm_title{
			line-height: 4;
		}
		.cm_des{
			margin-bottom: 40rpx;
		}
	}
</style>
