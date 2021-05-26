<template>
	<view class="pages">
		<!-- 背景 -->
		<!-- <cu-custom bgColor="bg-gradual-orange" :isBack="true">
			<block slot="content">
				系统信息
			</block>
		</cu-custom> -->
		<view class="mainBox" v-if="list.length ">
			<!-- 列表数据 -->
			<view class="listBox ">
				<block v-for="(item,index) in list" :key="index">
					<navigator :url="'./msg/msg?code='+ item.msg_code" class="msgItems">
						<!-- <view class="msgItems"> -->
							<view class="cm_title">{{item.msg_title}}</view>
							<view class="cm_text">{{ item.msg_time  }}</view>
						<!-- </view> -->
					</navigator>
				</block>
			</view>
			<LoadMore :status="loadStatus" />
		</view>
		<view class="flex flex_center" style="width: 100%;height: 90vh;" v-else>
			<tui-tips :fixed="false" imgUrl="/static/img/toast/img_nodata.png">暂无明细</tui-tips>
		</view>
	</view>
</template>

<script>
	import tuiTips from '@/components/extend/tips/tips';
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				afterHeaderOpacity: 0, //不透明度
				headerPosition: 'fixed',
				sliderHeight: 64,

				//猜你喜欢列表
				loadStatus: 'more',
				list: [],
				formParams: {
					"pageIndex": 1,
					"pageSize": 20
				},
				pageLoad: false
			};
		},
		computed: {
			sliderHeightrpx() {
				// console.log(this.CustomBar)
				return `${this.sliderHeight}rpx`
			}
		},	
		components: {
			tuiTips
		},
		onPageScroll(e) {

		},
		onPullDownRefresh() {
			this.formParams.pageIndex = 1;
			// this.list = [];
			this._loadData('refresh',() => {
				uni.stopPullDownRefresh();
			});
		},
		// 上拉加载
		onReachBottom() {
			if (this.loadStatus == 'noMore') return;
			this.formParams.pageIndex += 1;
		
			this._loadData('add');
		},
		onLoad() {
			uni.$emit('showPageLoad');
			this.sliderHeight = this.CustomBar;
			this._loadData('refresh',() => {
				setTimeout(() => {
					uni.$emit('closePageLoad');
				}, 500);
			});
		},
		methods: {
			_overTime() {
				this._loadData();
			},
			// 热门推荐
			async _loadData(type,callback){
				let that = this
				this.loadStatus = 'loading'
				// console.log(this.formParams)
				try {
					let res = await this.$api.GetCmsList(this.formParams);
					// console.log( res)
					if (type == 'add') {
						that.loadStatus = 'loading';
					} else {
						uni.stopPullDownRefresh();
					}
					if (res.Success) {
						if (type == 'add') {

								that.list = that.list.concat(res.Data.Rows);
								if (res.Data.Rows.length < that.formParams.pageSize) {
									that.loadStatus = 'noMore';
									// console.log(that.loadStatus )
									// 没有数据了
								} else {
									that.loadStatus = 'more';
								}
					
						} else {
							// 刷新
							that.list = res.Data.Rows;
							if (res.Data.Rows.length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}
							that.refreshing = false
						}
					} else {
						that.$ui.toast(res.Msg);
					}
					
				} catch (err) {
					console.log('请求结果false : ' + err)
					that.loadStatus = 'more'
				}
				
			},
			filter(arr){
				return arr.map(item=>{
					item.info_publish_time = item.info_publish_time.replace('T',' ');
					return item
				})
			}
		}
	};
</script>
<style lang="less" scoped>
	.pages {
		position: relative;
		background: #f5f5f5;
		padding: 20rpx;
		/* 自定义的导航头部 */
		
		
		.mainBox{
			// 列表内容
			.msgItems{
				border-radius: 20rpx;
				background: #fff;
				padding: 20rpx;
				margin-bottom: 20rpx;
				&:first-child{
					margin-top: 0
				}
			}
			
		}
		


	}
</style>
