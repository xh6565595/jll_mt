import http from '@/utils/http/index.js';
export const baseMixins = {
	data() {
		return {
			baseKey: 'GetGoodsList',
			hasRow: '',
			list: [],
			loadStatus: 'more', // 上拉的状态：more-loading前；loading-loading中；noMore-没有更多了
			// refreshing: false,
			pageLoad: false,
			load: false,
			token: '',
			showLoad: false
		}
	},
	onLoad() {
		
	},
	
	// 下拉刷新
	onPullDownRefresh() {
		this.formParams.pageIndex = 1;
		this.list = [];
		this._loadData('refresh');
	},
	// 上拉加载
	onReachBottom() {
		console.log(this.loadStatus)
		if (this.loadStatus == 'noMore') {
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading';
		this._loadData('add');
	},
	methods: {
		loadDataComplete(){
			
		},
		async _loadData(type) {
			let that = this;
			try {
				let res = await http[this.baseKey](that.formParams)
				// console.log(res);
				if (type == 'add') {
					that.loadStatus = 'loading';
				} else {
					uni.stopPullDownRefresh();
				}
				if (res.Success) {
					if (type == 'add') {
						// 加载更多
						if (that.hasRow) {
							that.list = that.list.concat(res.Data[that.hasRow]);
							if (res.Data[that.hasRow].length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// console.log(that.loadStatus )
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}
						} else {
							that.list = that.list.concat(res.Data);
							if (res.Data.length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}
						}
					} else {
						// 刷新
						if (that.hasRow) {
							that.list = res.Data[that.hasRow];
							if (res.Data[that.hasRow].length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}

						} else {
							that.list = res.Data
							if (res.Data.length < that.formParams.pageSize) {
								that.loadStatus = 'noMore';
								// 没有数据了
							} else {
								that.loadStatus = 'more';
							}
						}
						that.refreshing = false
					}
					that.loadDataComplete(true)
				} else {
					that.$ui.toast(res.Msg);
					that.loadDataComplete(false)
				}
			} catch (err) {
				console.log('请求结果false : ' + err);
				that.loadStatus = 'more';
				that.loadDataComplete(false)
			}
		}
	}


}
