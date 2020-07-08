<template>
	<view class="modal  flex flex_center animated fadeIn" @tap="hideModal" v-if="ashow">
		<view class="dialog">
			<view class="cm_title">活动规则</view>
			<scroll-view scroll-y="true" class="contentBox" >
				<view style="width: 100%">
					  <rich-text v-if="text" :nodes="text"></rich-text>
					  <text>{{text}}</text>
				</view>
			</scroll-view>
			<view class="footer flex flex_center">
				<button type="default" class="cm_btn" @tap="hideModal">知道了</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	const global_Set_jll = uni.getStorageSync('global_Set_jll');
	export default {
		data() {
			return {
				ashow:true ,
				text:''
			};
		},
		created(){
			// console.log(111)
			this.text = global_Set_jll.activity_constraint
			// console.log(this.text)
		},
		methods:{
			hideModal() {
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
