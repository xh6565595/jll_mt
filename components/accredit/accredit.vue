<template>
	<view class="modal  flex flex_center animated fadeIn" @tap.stop="hideModal" v-if="ashow" @touchmove.stop="_none">
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
		props:{
			autoClose:{
				type:Boolean,
				default:false
			},
			
		},
		methods:{
			_none(){
				// console.log(1)
			},
			hideModal() {
				if(!this.autoClose)return;
				this.ashow = false;
			},
			showModal(){
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
			// width: 80vw;
			// padding: 48rpx;
			background: #fff;
			border-radius: 30rpx;
		}
	}
	
</style>
