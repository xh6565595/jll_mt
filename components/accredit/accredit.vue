<template>
	<view class="modal  flex flex_center animated fadeIn" @tap="hideModal" v-if="ashow">
		<view class="dialog">
			<slot name="content"></slot>
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
			width: 70vw;
			padding: 48rpx;
			background: #fff;
			border-radius: 30rpx;
		}
	}
	
</style>
