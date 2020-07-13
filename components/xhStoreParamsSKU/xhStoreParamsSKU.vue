<!-- skulist算法 实现多规格商品 -->
<template>
	<!--底部抽屉-->
	<view class="mask-screen" @tap="hideModal"  v-show="showModalStatus">
		<view class="region-box animated slideInUp"  v-show="showModalStatus" @tap.stop="_none">
			
			<view class="flex flex_center " style="padding-bottom: 20rpx;">
				<image :src="nowPreImg" mode="" class="pre"></image>
				<view class="f1">
					<view class="cm_title">{{ title }}</view>
					<view class="flex flex_center" style="justify-content: flex-start;height: 40rpx;">
						<block v-for="(its, inds) in selectArr" :key="inds">
							<tui-tag shape="circle" size="mini" type="gray" class="stags">{{ its }}</tui-tag>
						</block>
					</view>
					<view class="flex flex_center" style="justify-content: flex-start;">
						<view class="cm_price f1" style="color: #E93F37;" v-if="selectshop.is_activity==1">折扣价￥{{ sum }}</view>	
						<view class="cm_price f1" v-else>￥{{sum }}</view>
						<text class="cm_des cm_t_20" v-show="selectshop">库存:{{nowStock}}</text>
					</view>
					
				</view>
			</view>
			<view class="argueBox">
			<!-- <scroll-view scroll-y="true"  class="argueBox"> -->
					<view v-if="!singlePro">
						<block v-for="(item, index) in localspecifications" :key="index">
							<view class="cm_title cm_t_24" style="margin-top:20rpx ;">{{ item.name }}</view>
							<view class=" flex flex_center" style="justify-content: flex-start;flex-wrap: wrap;">
								<block v-for="(it, ind) in item.item" :key="ind">
									<button 
										size="mini"
										:plain="subIndex[index] == ind ? true:false  "
										:type="subIndex[index] == ind ? 'warn': 'default'"
										class="argus "
										@tap.stop.prevent="skuClick(it, index, $event, ind)"
										:disabled="it.ishow?false : true"
									>
										<image :src="it.pic" mode="" v-if="it.pic" style="width: 20px;height: 20px;float: left;margin-top: 4px;margin-right: 4px;"></image>
										{{ it.name }}
									</button>
								</block>
							</view>
						</block>
					</view>
					<view v-if="service1.length">
						<view class="cm_title cm_t_24" style="margin-top:20rpx ;">特色服务</view>
						<view class=" flex flex_center" style="justify-content: flex-start;flex-wrap: wrap;">
							<block v-for="(it, ind) in service1" :key="ind">
									<button 
										size="mini"
										:plain="formParams.serve1.service_code == it.service_code ? true:false  "
										:type="formParams.serve1.service_code == it.service_code? 'warn': 'default'"
										class="argus "
										@tap.stop.prevent="serve(1,ind)"								
									>{{ it.service_name }}(￥{{it.service_price}})
								</button>
							</block>
						</view>
					</view>
					<view v-if="service2.length">
						<view class="cm_title cm_t_24" style="margin-top:20rpx ;">全面保修</view>
						<view class=" flex flex_center" style="justify-content: flex-start;flex-wrap: wrap;">
							<block v-for="(it, ind) in service2" :key="ind">
									<button 
										size="mini"
										:plain="formParams.serve2.service_code == it.service_code ? true:false  "
										:type="formParams.serve2.service_code == it.service_code? 'warn': 'default'"
										class="argus "
										@tap.stop.prevent="serve(2,ind)"								
									>{{ it.service_name }}(￥{{it.service_price}})
								</button>
							</block>
						</view>
					</view>
					<view v-if="service3.length">
						<view class="cm_title cm_t_24" style="margin-top:20rpx ;">意外保修</view>
						<view class=" flex flex_center" style="justify-content: flex-start;flex-wrap: wrap;">
							<block v-for="(it, ind) in service3" :key="ind">
									<button 
										size="mini"
										:plain="formParams.serve3.service_code == it.service_code ? true:false  "
										:type="formParams.serve3.service_code == it.service_code? 'warn': 'default'"
										class="argus "
										@tap.stop.prevent="serve(3,ind)"								
									>{{ it.service_name }}(￥{{it.service_price}}) 
								</button>
							</block>
						</view>
					</view>
					<view class=" cells flex flex_center">
						<text class="cm_title cm_t_24">数量:</text>
						<view class="f1"></view>
						<tuiNumberbox :min="1" disabled :value="selectNum" @change="change"></tuiNumberbox>
					</view>
				</view>
			<!-- </scroll-view> -->
				
			<view class="btnBox flex flex_center">
				<!-- <button class="btns" @tap.stop.prevent="_addCard">加入购物车</button>
				<view class="btns hot flex flex_y flex_center" v-if="ifActive"  @tap.stop.prevent="_creatOrder">
					<view class="">马上抢</view>
				</view> -->
				<button class="cm_btn" @tap.stop.prevent="_creatOrder" >立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
import tuiNumberbox from '@/components/numberbox/numberbox';
export default {
	data() {
		return {
			lock:false,
			paramsList: [], //
			formParams: {
				serve1:'',
				serve2:'',
				serve3:'',
			}, //表单参数
			num: 1,
			issafariBrowser:false,
			nowprice: 0,
			nowPreImg:'',
			showModalStatus: false, //显示选
			nowStock:0,
			shopItemInfo: {}, //存放要和选中的值进行匹配的数据
			selectArr: [], //存放被选中的值
			subIndex: [], //是否选中 因为不确定是多规格还是但规格，所以这里定义数组来判断
			selectshop: {}, //存放最后选中的商品
			selectNum: 1, //选中数量
			
			localspecifications:[]
		};
	},
	components: {
		tuiNumberbox
	},
	computed: {
		sum() {
			let ps = 0
			if(this.formParams.serve1){ps+=this.formParams.serve1.service_price}
			if(this.formParams.serve2){ps+=this.formParams.serve2.service_price}
			if(this.formParams.serve3){ps+=this.formParams.serve3.service_price}			
			
			// return ( this.selectNum * (this.nowprice +ps )).toFixed(2);
			return ( this.selectNum * this.nowprice ).toFixed(2);
		},
	},
	props: {
		platform:{
			Type: String,
			default: "android"
		},
		// 是或活动价
		ifActive:{
			Type: Boolean,
			default: false
		},
		singlePro:{
			//是否是统一规格
			Type: Boolean,
			default: false
		},
		preImg: {
			//图片
			Type: String,
			default: ''
		},
		title: {
			//标题
			Type: String,
			default: ''
		},
	
		defaultprice:{
			Type: Number,
			default: 0
		},
		defaultstock:{
			Type: Number,
			default: 0
		},
		service1: {
			//参数选项
			Type: Array,
			default:function() {
				return [];
			}
		},
		service2: {
			//参数选项
			Type: Array,
			default:function() {
				return [];
			}
		},
		service3: {
			//参数选项
			Type: Array,
			default:function() {
				return [];
			}
		},
		specifications: {
			//参数选项
			Type: Array,
			default:function() {
				return [
					// {
					// 	name: '尺寸',
					// 	item: [
					// 		{
					// 			name: '100'
					// 		},
					// 		{
					// 			name: '200'
					// 		}
					// 	]
					// },
					// {
					// 	name: '颜色',
					// 	item: [
					// 		{
					// 			name: '白色'
					// 		},
					// 		{
					// 			name: '黑色'
					// 		},
					// 		{
					// 			name: '绿色'
					// 		}
					// 	]
					// },
					// {
					// 	name: '码数',
					// 	item: [
					// 		{
					// 			name: 'X'
					// 		},
					// 		{
					// 			name: 'L'
					// 		},
					// 		{
					// 			name: 'XL'
					// 		}
					// 	]
					// },
					// {
					// 	name: '款式',
					// 	item: [
					// 		{
					// 			name: '豪华'
					// 		},
					// 		{
					// 			name: '大众'
					// 		},
					// 		{
					// 			name: '低调'
					// 		}
					// 	]
					// }
				];
			}
		},
		difference: {
			Type: Array,
			default:function() {
				return [
					// {
					// 	id: '19',
					// 	price: 200,
					// 	stock: 19,
					// 	img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584610581049&di=0feb46ee2a027f4e9405be8c293860b7&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg',
					// 	difference: ['100', '白色', 'X', '豪华']
					// },
					// {
					// 	id: '21',
					// 	price: 300,
					// 	stock: 10,
					// 	img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584610581049&di=0feb46ee2a027f4e9405be8c293860b7&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-ede9473ddcbd84fe7c1e363953ed7410_hd.jpg',
					// 	difference: ['100', '黑色', 'XL', '低调']
					// },
					// {
					// 	id: '23',
					// 	price: 500,
					// 	stock: 48,
					// 	img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2841648446,236398816&fm=26&gp=0.jpg',
					// 	difference: ['100', '绿色', 'X', '豪华']
					// },
					// {
					// 	id: '20',
					// 	price: 300,
					// 	stock: 29,
					// 	img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2841648446,236398816&fm=26&gp=0.jpg' ,
					// 	difference: ['200', '白色', 'XL', '大众']
					// },
					// {
					// 	id: '22',
					// 	price: 300,
					// 	stock: 200,
					// 	img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2841648446,236398816&fm=26&gp=0.jpg',
					// 	difference: ['200', '黑色', 'L', '豪华']
					// }
				];
			}
		}
	},
	created() {
		// this.issafariBrowser = false
		// console.log(issafariBrowser)
		// this.nowprice = this.defaultprice
		// this.nowStock = this.defaultstock
		// this.nowPreImg = this.preImg
		// console.log(this.service1)
		// alert(this.singlePro)
	},
	watch: {
		service1(n, o) {
			if(!n.length)return;
			this.formParams.serve1 = n[0]
		},
		
		difference(n, o) {
			if(!n.length)return;
			this.localspecifications = [...this.specifications]
			// console.log(this.localspecifications)
			this.localspecifications.map(item => {
				this.selectArr.push('');
				this.subIndex.push(-1);
			});
			this.checkItem(); //计算sku里面规格形成路径
			this.checkInpath(-1);
			// if(this.specList.length==1){
			// 	this.selectshop = this.difference[0]
			// }
		},
		preImg(n, o) {
			// console.log(n)
			this.nowPreImg = n;
		},
		defaultstock(n, o) {
			// console.log(n)
			this.nowStock = n;
		},
		defaultprice(n, o) {
			// console.log(n)
			this.nowprice = n;
		},
	},
	methods: {
		// 选择特色服务
		serve(p,index){
			let pro  = `serve${p}`
			let ops = `service${p}`
			// alert(p)
			if(p==1){
				this.formParams[pro]=this[ops][index]	
			}else{
				if(this.formParams[pro]==this[ops][index]){
					this.formParams[pro] = ''
				}else{
					this.formParams[pro]=this[ops][index]
					
				}	
			}
			
			
				
		},
		skuClick(value, index1, event, index2) {
			if(this.lock)return;
			this.lock = true
			if (value.ishow) {
				if (this.selectArr[index1] != value.name) {
					this.$set(this.selectArr, index1, value.name);
					this.$set(this.subIndex, index1, index2);
				} else {
					this.$set(this.selectArr, index1, ''); 
					this.$set(this.subIndex, index1, -1);
				}
				// console.log( this.subIndex)
				this.checkInpath(index1);
				//如果全部选完
				if (this.selectArr.every(item => item != '')) {
					this.selectshop = this.shopItemInfo[this.selectArr];
					console.log(this.selectshop)
					// this.selectNum = 1;
					this.nowprice = this.selectshop.sellprice 
					
					this.nowStock = this.selectshop.stock
	
					// console.log(value)
					if(value.pic){
						this.nowPreImg = value.pic
					}				
					// console.log(this.nowprice)
				}
				
			}
			setTimeout(()=>{
				this.lock = false
			},500)
		},
		checkInpath(clickIndex) {
			// console.time('筛选可选路径需要的时间是');
			//循环所有属性判断哪些属性可选
			//当前选中的兄弟节点和已选中属性不需要循环
			console.log(this.specifications)
			
			for (let i = 0, len = this.localspecifications.length; i < len; i++) {
				if (i == clickIndex) {
					continue;
				}
				let len2 = this.localspecifications[i].item.length;
				for (let j = 0; j < len2; j++) {
					// console.log("b"+ this.subIndex[i],j)
					if (this.subIndex[i] != -1 && j == this.subIndex[i]) {
						continue;
					}
					let choosed_copy = [...this.selectArr];
					// console.log(0,choosed_copy)
					this.$set(choosed_copy, i, this.localspecifications[i].item[j].name);
					// console.log(0,choosed_copy)
					let choosed_copy2 = choosed_copy.filter(item => item !== '' && typeof item !== 'undefined');
					// console.log(0,this.shopItemInfo)
					// console.log(1,choosed_copy2)
					if (this.shopItemInfo.hasOwnProperty(choosed_copy2)) {
						this.$set(this.localspecifications[i].item[j], 'ishow', true);
					} else {
						this.$set(this.localspecifications[i].item[j], 'ishow', false);
					}
				}
			}
			console.log(this.localspecifications)
			// console.timeEnd('筛选可选路径需要的时间是');
		},
		checkItem() {
			// console.time('计算有多小种可选路径需要的时间是');
			//计算有多小种可选路径
			// console.log(this.difference)
			let result = this.difference.reduce(
				(arrs, items) => {
					return arrs.concat(
						items.difference.reduce(
							(arr, item) => {
								return arr.concat(
									arr.map(item2 => {
										//利用对象属性的唯一性实现二维数组去重
										if (!this.shopItemInfo.hasOwnProperty([...item2, item])) {
											this.shopItemInfo[[...item2, item]] = items;
										}
										return [...item2, item];
									})
								);
							},
							[[]]
						)
					);
				},
				[[]]
			);
			
			console.log(this.shopItemInfo)
		},
		// 创建订单
		_creatOrder() {
			uni.showToast({
				title: '创建订单'
			});
			if(this.singlePro){
				this.selectshop.selectNum = this.selectNum
				this.selectshop.goods_service_code = this.formParams
				this.$emit('creatOrder', this.selectshop);
				this.hide();
			
			}else{
				console.log('购买回调数据',  this.selectArr.length);
				if ( this.selectArr.length &&  this.selectArr.every(item => item != '')) {
					
					this.selectshop.selectNum = this.selectNum
					this.selectshop.goods_service_code = this.formParams
					this.$emit('creatOrder', this.selectshop);
					this.hide();
				} else {
					uni.showToast({
						icon: 'none',
						title: '请选择商品规格'
					});
				}
			}
			
		},
		// 购物车
		_addCard() {
			// uni.showToast({
			// 	title: '添加购物车'
			// });
			// console.log(this.selectArr)
			// alert(this.singlePro)
			if(this.singlePro){
				this.selectshop.selectNum = this.selectNum
				this.selectshop.goods_service_code = this.formParams
				this.$emit('addCard', this.selectshop);
				this.hide();		
			}else{
				if (this.selectArr.every(item => item != '')) {
					// console.log('添加购物车回调数据',  this.selectshop);
					this.selectshop.selectNum = this.selectNum
					// let a = []
					// if(this.formParams.serve1){a.push(this.formParams.serve1.service_code)}
					// if(this.formParams.serve2){a.push(this.formParams.serve2.service_code)}
					// if(this.formParams.serve3){a.push(this.formParams.serve3.service_code)}
					
					this.selectshop.goods_service_code = this.formParams
					this.$emit('addCard', this.selectshop);
					this.hide();
				} else {
					uni.showToast({
						icon: 'none',
						title: '请选择商品规格'
					});
				}
			}
			
		},
		_none() {},
		show() {
			this.showModalStatus = true;
		},
		hide() {
			this.showModalStatus = false;
		},
		hideModal() {
			this.showModalStatus = false;
			// alert(1)
			return;
		},
		change(e) {
			let v = e.value;
			// console.log(e, v);
			this.selectNum = v;
		}
	}
};
</script>

<style lang="less" scoped>
/*底部抽屉样式 start*/
.mask-screen {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.5);
	// opacity: 0.5;
	overflow: hidden;
	z-index: 10;
	
	.region-box {
		width: 100%;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 20;
		background: #fff;
		padding:40rpx 30rpx;
		box-sizing: border-box;
		border-radius: 20rpx 20rpx 0 0 ; 
		.stags {
			margin: 16rpx 10rpx 6rpx 0;
			padding: 0 20rpx;
			font-size: 20rpx;
		}
		.cm_price {
			margin-right: 20rpx;
			margin-top: 20rpx
		}
		.cm_des{
			margin-right: 20rpx;
			margin-top: 20rpx
		}
		.argueBox {
			width: 100%;
			max-height: 60vh;
			overflow-y: auto;

			.cells {
				margin-bottom: 16rpx;
				line-height: 80rpx;
				height: 80rpx;
			}
			.argus {
				// transform: scale(.8);
				margin: 20rpx 10rpx;
				min-width: 100rpx;
				overflow: hidden;
				border-radius: 60rpx;
				font-size: 24rpx;;
				
				// border: none;
				.icons {
					width: 40rpx;
					height: 40rpx;
					margin-right: 10rpx;
				}
			}
			uni-button[type=default] {
			    color: #333333;
			    background-color: #F6F6F6;
				border: 1rpx solid #eee;
				&:after{
					border: none
				}
			}
			uni-button[disabled=true] {
			    color: #d3d3d3;
			    background-color: #F6F6F6;
				border: none;
				&:after{
					border: none
				}
			}
		}
		.pre {
			width: 188rpx;
			height: 188rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
		.btnBox {
			width: 100%;
			height: 80rpx;
			border-radius: 40rpx;
			line-height: 80rpx;
			overflow: hidden;
			background: #d1a320;
			color: #fff;
			box-shadow: none;
			margin-top: 10rpx;
			.btns {
				width: 50%;
				height: 80rpx;
				line-height: 80rpx;
				background: #DDB152;
				color: #fff;
				border-radius: 0 !important;
			}
		}
		.btns.hot{
			background-color: #E93F37;
		}
	}
}
</style>
