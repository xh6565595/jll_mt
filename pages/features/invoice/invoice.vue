<template>
	<view class="container">
		<view style="font-size: 20rpx;line-height: 3;" class="gray">电子发票与纸质普通发票具备同等法律效益，可支持报销入账</view>
		<view class="invoice-box-1">
			<view class="flex flex_center cells">
				<view class="label">抬头类型</view>
				<view class="flex f1">
					<view class="radio-group">
						<view class="radio mr-20" :class="{ checked: formParams.apply_type }" @tap="formParams.apply_type = 1">个人</view>
						<view class="radio" :class="{ checked: !formParams.apply_type }" @tap="formParams.apply_type = 0">公司</view>
					</view>
				</view>
			</view>
			<view class="flex flex_center cells">
				<view class="label">申请类型</view>
				<view class="flex f1">
					<view class="radio-group">
						<view class="radio mr-20" :class="{ checked: !formParams.invoice_type }" @tap="formParams.invoice_type = 0">普通增值税发票</view>
						<view class="radio" :class="{ checked: formParams.invoice_type }" @tap="formParams.invoice_type = 1">电子发票</view>
					</view>
				</view>
			</view>

			<!-- <list-cell :hover="false" line-left line-right>
				<view class="d-flex">
					<view class="label">发票类型</view>
					<view class="flex-fill d-flex flex-column">
						<view>电子普通发票</view>
						
					</view>
				</view>
			</list-cell> -->
			<view class="flex flex_center cells">
				<view class="label">发票抬头</view>
				<input class="f1 flex-fill mr-20" type="text" v-model="formParams.invoice_title" placeholder="请输入发票抬头" placeholder-class="font-size-sm text-color-assist" />
			</view>
			<view class="flex flex_center cells">
				<view class="label">发票金额</view>
				<view class="f1"></view>
				<text>￥{{pay}}</text>
			</view>
		</view>

		<view class="invoice-box-2">
			<view class="flex flex_center cells" v-if="formParams.apply_type == 0">
				<view class="label">公司税号</view>
				<view class="f1 flex-fill d-flex">
					<input
						class="flex-fill mr-20"
						type="text"
						v-model="formParams.invoice_number"
						placeholder="请输入公司税号"
						placeholder-class="font-size-sm text-color-assist"
					/>
				</view>
				<view class="text-color-danger">必填</view>
			</view>
			<view class="flex flex_center cells" v-if="formParams.invoice_type == 1">
				<view class="label">邮箱地址</view>
				<view class="f1 flex-fill d-flex">
					<input class="flex-fill mr-20" type="text" v-model="formParams.mail" placeholder="请输入邮箱地址" placeholder-class="font-size-sm text-color-assist" />
				</view>
				<view class="text-color-danger">必填</view>
			</view>
			<!-- <view class="flex flex_center cells">
				<view class="label">手机号</view>
				<view class=" f1 flex-fill d-flex">
					<input class="flex-fill mr-20" type="text" v-model="formParams.telphone" placeholder="请输入手机号码" placeholder-class="font-size-sm text-color-assist" />				
				</view>
				<view class="text-color-danger">必填</view>
			</view> -->
		</view>
		<view class="invoice-box-2" v-if="formParams.invoice_type == 0">
			<view class="flex flex_center cells">
				<view class="label">邮寄地址信息：</view>
				<view class="f1"></view>
			</view>
			<view class="flex flex_center cells" @tap="showPicker">
				<view class=" flex flex_center">
					<text class="text  ">{{ text[0] ? text[0] : '请选择' }}</text>
					<text class="iconfont icon-fanhui3"></text>
				</view>
				<view class=" flex flex_center">
					<text class="text  ">{{ text[1] ? text[1] : '请选择' }}</text>
					<text class="iconfont icon-fanhui3"></text>
				</view>
				<view class=" flex flex_center">
					<text class="text ">{{ text[2] ? text[2] : '请选择' }}</text>
					<text class="iconfont icon-fanhui3"></text>
				</view>
				<view class="f1 "></view>
			</view>
			<view class="cells"><textarea v-model="addressDetail" placeholder="请输入详细地址" /></view>
		</view>
		<view class="btn-box">
			<view class="item"><button type="primary" class="cm_btn" @tap="submit">提交</button></view>
		</view>
		<view class="tui-mask-screen" :class="[showPickerStatus ? 'tui-mask-show' : '']" @tap="hidePicker"></view>
		<view class="tui-picker-box" :class="[showPickerStatus ? 'tui-pickerbox-show' : '']">
			<view class="picker-header list-item">
				<view class="btn-cancle" hover-class="opcity" :hover-stay-time="150" @tap.stop="hidePicker">取消</view>
				<view class="btn-sure" hover-class="opcity" :hover-stay-time="150" @tap.stop="picker">确定</view>
			</view>
			<picker-view indicator-style="height: 50px;" class="picker-view" :value="value" @change="columnPicker">
				<picker-view-column>
					<view v-for="(item, index) in proviceArr" :key="index" class="item">{{ item }}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item, index) in cityArr" :key="index" class="item">{{ item }}</view>
				</picker-view-column>
				<picker-view-column>
					<view v-for="(item, index) in districtArr" :key="index" class="item">{{ item }}</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script>
import listCell from '@/components/list-cell/list-cell';
import cityData from '@/utils/picker.city.js';
import Utils from '@/utils/utils.js'
export default {
	components: {
		listCell
	},
	data() {
		return {
			formParams: {
				order_code:'',
				invoice_type: 0, // 发票类型(0-增值税普通发票 1-电子发票)
				apply_type: 0, // 申请类型(0-公司 1-个人)
				invoice_title: '', // 企业抬头
				invoice_number: '', // 公司税号
				mail: '', // 电子邮箱地址
				area: '', // 所属地区
				detailed_address: '福建省福州市鼓楼区' // 详细地址
			},
			text: ['福建省', '福州市', '鼓楼区'],
			proviceArr: [],
			cityArr: [],
			districtArr: [],
			value: [0, 0, 0],
			showPickerStatus: false,
			pay:0,
			addressDetail: '' //详细地址
		};
	},
	onLoad(options) {
		this.proviceArr = this.toArr(cityData);
		this.cityArr = this.toArr(cityData[0].children);
		this.districtArr = this.toArr(cityData[0].children[0].children);
		this.formParams.area = '350102'
		this.addressDetail = this.text.join(',');
		
		this.formParams.order_code = options.order
		this.pay = options.account
	},
	methods: {
		async submit(){
			if(!this.formParams.invoice_title){
				this.$ui.toast('请输入开票抬头')
				return
			}
			if(this.formParams.invoice_type==0){
				// 普通
				if(!this.formParams.area || !this.formParams.detailed_address){
					this.$ui.toast('请输入邮寄地址')
					return
				}
			}else{
				// 电子
				if(!this.formParams.mail || !Utils.emailCheck(this.formParams.mail)){
					this.$ui.toast('请输入正确的电子邮箱')
					return
				}
			}
			if(this.formParams.apply_type==0){
				// 企业
				if(!this.formParams.invoice_number){
					this.$ui.toast('请输入企业税号')
					return
				}
			}
			console.log(this.formParams)
			// return
			let  that = this;
			try {
				this.$ui.showloading()
				let res = await this.$api.ApplyInvoice(this.formParams, false); 
				this.$ui.hideloading()
				if (res.Success) {				
					that.$ui.toast('申请开票成功')
					setTimeout(()=>{
						uni.navigateBack({})
					},1000)
				} else {
					that.$ui.toast(res.Msg)
				}
				// if (callback) callback();
			} catch (err) {
				console.log('请求结果false : ' + err);
			}
		},
		toArr(object) {
			let arr = [];
			for (let i in object) {
				arr.push(object[i].name);
			}
			return arr;
		},
		//picker change切换事件
		columnPicker: function(e) {
			let value = e.detail.value;

			//如果两者下标不一致，表示滚动过
			if (this.value[0] !== value[0]) {
				this.proviceArr = this.proviceArr;
				this.cityArr = this.toArr(cityData[value[0]].children);
				this.districtArr = this.toArr(cityData[value[0]].children[0].children);
				this.value = [value[0], 0, 0];
			} else if (this.value[1] !== value[1]) {
				this.proviceArr = this.proviceArr;
				this.cityArr = this.cityArr;
				this.districtArr = this.toArr(cityData[value[0]].children[value[1]].children);
				this.value = [value[0], value[1], 0];
			} else {
				this.value = value;
			}
		},
		//确定按钮
		picker: function(e) {
			let value = this.value;
			if (cityData.length > 0) {
				let provice = cityData[value[0]].name;
				let city = cityData[value[0]].children[value[1]].name;
				let district = cityData[value[0]].children[value[1]].children[value[2]].name;
				this.text = [provice, city, district];
				// console.log(cityData[value[0]].children[value[1]].children[value[2]])
				let area = cityData[value[0]].children[value[1]].children[value[2]].id;
				console.log(area);

				this.formParams.area = area;
				this.addressDetail = provice + ',' + city + ',' + district;
				this.showPickerStatus = false;
			}
			// console.log(111,value)
		},
		// 显示picker-view
		showPicker: function() {
			this.showPickerStatus = true;
		},
		// 隐藏picker-view
		hidePicker: function() {
			this.showPickerStatus = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 10rpx 20rpx;
	.cells {
		min-height: 88rpx;
		height: 88rpx;
		.label {
			width: 30%;
		}
	}
}

.invoice-box-1,
.invoice-box-2 {
	background-color: #ffffff;
	font-size: 24rpx;
	border-radius: 12rpx;
	padding: 0 20rpx;
	margin-bottom: 20rpx;
}

.invoice-box-1 {
	margin-bottom: 20rpx;
}

.radio-group {
	display: flex;
	justify-content: flex-start;

	.radio {
		padding: 10rpx 30rpx;
		border-radius: 6rpx;
		border: 2rpx solid var(--cl_primary);
		color: var(--cl_primary);
		font-size: 28rpx;

		&.checked {
			background-color: var(--cl_primary);
			color: #fff;
			border: 2rpx solid var(--cl_primary);
		}
	}
}

// .label {
// 	width: 150rpx;
// 	color: var(--cl_primary);
// }
.text-color-danger {
	color: red;
}
.btn-box {
	background-color: #ffffff;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 120rpx;
	box-shadow: 0 0 20rpx rgba($color: #000000, $alpha: 0.1);
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	z-index: 11;

	.item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20rpx 10rpx;
		flex: 1;
		flex-shrink: 0;
		button {
			width: 100%;
			border-radius: 50rem !important;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
		}
	}
}

.tui-mask-screen {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 99996;
	transition: all 0.3s ease-in-out;
	opacity: 0;
	visibility: hidden;
}

.tui-mask-show {
	opacity: 1;
	visibility: visible;
}

.tui-picker-box {
	width: 100%;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 99999;
	visibility: hidden;
	transform: translate3d(0, 100%, 0);
	transform-origin: center;
	transition: all 0.3s ease-in-out;
	min-height: 20rpx;
	background: #fff;
}

.tui-pickerbox-show {
	transform: translate3d(0, 0, 0);
	visibility: visible;
}

.picker-header {
	width: 100%;
	height: 90rpx;
	padding: 0 46rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	font-size: 32rpx;
	background: #fff;
}

.list-item::after {
	left: 0;
}

.btn-cancle {
	padding: 20rpx;
	color: #888;
}

.btn-sure {
	padding: 20rpx;
	color: #5677fc;
}

.picker-view {
	width: 100%;
	height: 260px;
}

.item {
	line-height: 50px;
	text-align: center;
}
</style>
