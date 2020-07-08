<template>
	<view class="cu-modal flex flex_y flex_center" v-if="successmodal">
		<view class="cu-dialog animated flex flex_y flex_center" :class="successmodal?'bounceIn':''">
			<view class="padding-xl">
				<image src="/static/image/xq_fw.png" mode="widthFix" class="cm_modal_successPic"></image>
				<view class="cm_modal_title">{{title}}</view>
				<view class="cm_modal_des">{{des}}</view>
				<view class="cm_btn cm_modal_btn" @tap="_ok">{{btn}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '转账成功'
			},
			des: {
				type: String,
				default: '请通知好友确认收款'
			},
			btn: {
				type: String,
				default: '知道了'
			},
			ifBack: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				successmodal: false
			};
		},
		methods: {

			show() {
				this.successmodal = true
			},
			_ok() {
				let that = this
				uni.showLoading({
					title: '处理中...'
				})
				setTimeout(function() {
					uni.hideLoading()
					that.successmodal = false
					if (that.ifBack) {
						uni.navigateBack()
					}
					// that.$emit('closeHandle')
				}, 2000);
			}
		}
	}
</script>

<style lang="less" scoped>
	.cu-modal{
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0,0,0,.6);
		z-index: 100;
		.cu-dialog {
			width: 80vw;
			padding: 40rpx;
			background-color: #fff;
			text-align: center;
			border-radius: 30rpx;
			// height: 514rpx;
			// padding: 50rpx;
			// background: green;
			.cm_modal_successPic {
				width: 148rpx;
				height: 148rpx;
				margin-bottom: 40rpx;
				margin-top: 50rpx;
				// background: yellow
			}
		
			.cm_modal_title {
				font-size: 36rpx;
				color: var(--cl_primary);
				line-height: 36rpx;
				height: 36rpx;
				margin-top: 0;
				text-align: center;
				margin-bottom: 20rpx;
				width: 100%;
				// background: pink
			}
		
			.cm_modal_des {
				font-size: 28rpx;
				color: var(--cl_text);
				line-height: 28rpx;
				text-align: center;
				margin-bottom: 66rpx;
				// background: blue
			}
		
			.cm_modal_btn {
				width: 300rpx;
				height: 80rpx;
				line-height: 80rpx;
		
				margin-top: 0
			}
		
		}
	}
	
</style>
