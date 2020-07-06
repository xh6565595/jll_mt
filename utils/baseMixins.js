import http from '@/utils/http/index.js';
export const baseMixins = {
	data() {
		return {
			baseKey: '/api/Goods/GetCategoryList',
			hasRow: false,
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
		let that = this
		uni.getStorage({
			key: 'access_token',
			success: function(res) {
				// console.log(res.data);
				let value = res.data;
				if (value) {
					that.token = value;
					that._loadData('refresh')
				}
			},
			fail: function(err) {
				// that.initSet();
			}
		});
	},
	// 下拉刷新
	onPullDownRefresh() {
		this.formParams.pageIndex = 1;
		this.list = [];
		this._loadData('refresh', () => {
			uni.stopPullDownRefresh();
		});
	},
	// 上拉加载
	onReachBottom() {
		if (this.loadStatus == 'noMore') {
			return;
		}
		this.formParams.pageIndex += 1;
		this.loadStatus = 'loading';
		this._loadData('add', () => {
			// this.loadStatus = 'more'
		});
	},
	methods: {
		// _onRefresh() {
		// 	this.formParams.pageIndex = 1;
		// 	this._loadData('refresh');
		// },

		// _loadMore(tabItem) {
		// 	// console.log(111)
		// 	if (this.loadStatus == 2) {
		// 		return;
		// 	}
		// 	this.formParams.pageIndex += 1;
		// 	this._loadData('add');
		// },
		_loadData(type) {

			let that = this;
			// console.log(that.formParams)
			if (type == 'add') {
				// 加载更多
				
				that.loadStatus = 'loading';
			} else {
				// 刷新
				that.refreshing = true
			}
			if (this.showLoad) {
				plus.nativeUI.showWaiting()
			}
			return new Promise((resolve, reject) => {
				uni.request({
					url: http.baseUrl + that.baseKey, //仅为示例，并非真实接口地址。
					method: 'POST',
					data: that.formParams,
					header: {
						'Content-Type': 'application/json',
						Authorization: token
					},
					timeout: 3000,
					success: res => {
						let ress = res.data;
						// console.log(res)
						if (ress.result == 1) {
							if (type == 'add') {
								// 加载更多
								if (that.hasRow) {
									that.list = that.list.concat(ress.data.rows);
									if (ress.data.total && ress.data.total <= that.list.length) {
										that.loadStatus = 'noMore';
										// 没有数据了
									} else {
										that.loadStatus = 'more';
									}
								} else {
									that.list = that.list.concat(ress.data);
									if (ress.total && ress.total <= that.list.length) {
										that.loadStatus = 'noMore';
										// 没有数据了
									} else {
										that.loadStatus = 'more';
									}
								}
							} else {
								// 刷新
								if (that.hasRow) {
									that.list = ress.data.rows;
									if (ress.data.total && ress.data.total <= that.list.length) {
										that.loadStatus = 'noMore';
										// 没有数据了
									} else {
										that.loadStatus = 'more';
									}

								} else {
									that.list = ress.data
									if (ress.total && ress.total <= that.list.length) {
										that.loadStatus ='noMore';
										// 没有数据了
									} else {
										that.loadStatus = 'more';
									}
								}

								that.refreshing = false
							}

						} else {
							that.refreshing = false
							uni.showToast({
								title: '请求失败',
								icon: 'none'
							});
						}
					},
					fail: err => {
						console.log(err)
						that.refreshing = false
						that.loadStatus = 0;
					},
					complete(err) {
						if (that.showLoad) {
							plus.nativeUI.closeWaiting()
						}
					}
				});
			})
		}
	}


}
