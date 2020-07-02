<template>
	<view class="tui-header">
		<view class="tui-header-top">
			<view class="tui-top-item" :class="type==0?'active':''" @tap="screen(0)">综合</view>
			<view class="tui-top-item" :class="type==1?'active':''" @tap="screen(1)">人气</view>
			<view class="tui-top-item" :class="type==2||type==3?'active':''" @tap="screen(2)">
				<view>价格</view>
				<view class="tui-price-arrow">
					<view class="tui-icon-box tui-arrow-up" >
						<Icon name="turningup" :size="12" :color="type==2?'#f3ab28':'#444'"></Icon>
					</view>
					<view class="tui-icon-box tui-arrow-down">
						<Icon name="turningdown" :size="12" :color="type==3?'#f3ab28':'#444'"></Icon>
					</view>
				</view>
			</view>
			<!-- <view class="tui-top-item tui-screen" @tap="screen">
				<text class="tui-bold">筛选</text>
				<Icon name="screen" :size="12" color="#039798" :bold="true"></Icon>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:0,
			};
		},
		methods:{
			screen(k) {
				// this.tui.toast('商城模板中功能~');
				switch (k){
					case 2:
						if(this.type==2){
							this.type = 3
						}else{
							this.type =2
						}
						break;
					default:
						this.type = k
						break;
				}
				this.$emit('tabChange',this.type)
			},
		}
	}
</script>

<style  scoped>
	/*header*/
	.tui-header {
		width: 100%;
		padding-top: 24rpx;
		padding-bottom: 24rpx;
		/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
		box-sizing: border-box;
		background: #fff;
		/* position: fixed; */
		z-index: 1000;
	}
	
	.tui-header-top,

	
	.tui-top-item {
		height: 26rpx;
		line-height: 26rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
	}
	.active{
		color: #333;
	}
	.tui-topitem-active {
		position: relative;
		font-weight: bold;
	}
	
	.tui-topitem-active::after {
		content: '';
		position: absolute;
		width: 44rpx;
		height: 6rpx;
		background: #5677fc;
		border-radius: 6rpx;
		bottom: -10rpx;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}
	
	.tui-price-arrow {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 16rpx;
		/* background: red; */
	}
	
	.tui-bottom-item .tui-icon-class,
	.tui-screen .tui-icon-class {
		margin-left: 6rpx;
	}
	
	.tui-icon-box {
		line-height: 10px !important;
		padding: 0 !important;
		display: block !important;
		position: relative;
	}
	
	.tui-arrow-up {
		top: 3px;
	}
	
	.tui-arrow-down {
		top: -5px;
	}
	
	.tui-hover {
		background: rgba(0, 0, 0, 0.2);
	}
	
</style>
