<template>
	<view class="modal  flex flex_center animated fadeIn" @tap="hideModal" v-if="ashow">
		<view class="dialog">
			<view class="cm_title">活动规则</view>
			<scroll-view scroll-y="true" class="contentBox" >
				<view style="width: 100rpx">sdafsdafds</view>
			</scroll-view>
			<view class="footer flex flex_center">
				<button type="default" class="cm_btn" @tap="hideModal">知道了</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ashow:false 
			};
		},
		methods:{
			hideModal() {
				this.ashow = false;
			},
			showModel(){
				this.ashow = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.modal{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 100;
		width:100vw;
		height: 100vh;
		background: rgba(0,0,0,.6);
		.dialog{
			width: 90vw;
			height: 70vh;
			padding: 30rpx;
			background: #fff;
			border-radius: 30rpx;
			.cm_title{
				line-height: 2;
				// color: var(--cl_primary);
				font-size: 30rpx;
				margin-bottom: 20rpx;
				text-align: center;
			}
			.contentBox{
				width: 100%;
				height: 50vh;
				background-color: #f1f1f1;
				
			}
			.footer{
				// width: 100%;
				// height: 10%;
				.cm_btn{
					margin-top: 4vh;
					color: #fff;
				}
			}
			
		}
	}
	
</style>
