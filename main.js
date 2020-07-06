import Vue from 'vue'
import App from './App'

import store from './store'
import api from './utils/http'
import SET from '@/SET.js'  //全局设置
import http from '@/utils/http/index.js';
Vue.config.productionTip = false

Vue.prototype.$api = api
// Vue.prototype.$levelApi = levelApi

Vue.prototype.$store = store

Vue.prototype.Domain = SET.mainUrl
Vue.prototype.baseUrl = SET.baseUrl
// import * as filters from './filters'
const pt = uni.getSystemInfoSync();
let platform = pt.platform.toLocaleLowerCase();

import set from './static/defaultSet.js'

if(!uni.getStorageSync('global_Set_jll')){
	uni.setStorageSync('global_Set_jll', set);
}



const UI = {
	toast: function(text, duration, success) {

		// #ifndef APP-PLUS
		uni.showToast({
			title: text,
			icon: success ? 'success' : 'none',
			duration: duration || 2000
		})
		// #endif
		// #ifdef APP-PLUS

		if (platform == "android") {
			plus.nativeUI.toast(text, {
				style: 'inline',
				icon: '/static/img/logo.png',
				iconWidth: '20px',
				iconHeight: '20px',
				
			})
		} else {
			plus.nativeUI.toast(text)
		}

		// #endif
	},
	showloading: function(text) {
		// #ifndef APP-PLUS
		uni.showLoading({
			title: text
		})
		// #endif
		// #ifdef APP-PLUS
		plus.nativeUI.showWaiting(text = '请稍后...', {
			loading: {
				display: 'inline',
				// type:'snow'
			}
		})
		// #endif
	},
	hideloading: function() {
		// #ifndef APP-PLUS
		uni.hideLoading()
		// #endif
		// #ifdef APP-PLUS
		plus.nativeUI.closeWaiting()
		// #endif
	},
	constNum: function() {
		const res = uni.getSystemInfoSync();
		return res.platform.toLocaleLowerCase() == "android" ? 300 : 0;
	},
	px: function(num) {
		return uni.upx2px(num) + 'px';
	}
}

Vue.prototype.$ui = UI


initGlobalSet()

// 全局配置
async function initGlobalSet() {
	let that = this
	try {
		uni.request({
			url: http.baseUrl + '/api/Service/Config', //仅为示例，并非真实接口地址。
			method: 'get',
			data: {},
			header: {
				'Content-Type': 'application/json'
				// Authorization: value
			},
			success: res => {
				
				let statusCode = res.statusCode;
				if (statusCode == 200 && res.data.Success) {
					// console.log(res.data.Data);
					uni.setStorageSync('global_Set_jll', res.data.Data);
					let global_Set = res.data.Data
					createdFilter(global_Set)
				}
			},
			fail(err) {
				console.log(err);
			}
		});
	} catch (e) {
		that.errorCallback();
	}
}
// 创建全局的过滤器
function createdFilter(set) {
	let filters = {}
	Object.keys(set).forEach(key => {
		// console.log(key,set[key])
		let filter = set[key]
		filters[key + 'Filter'] = val => {
			let r
			filter.forEach((k, t) => {
				// console.log(k,t)
				if (k.Value == val) {
					r = k.Text
				}
			})
			return r
		}
		Vue.filter(key + 'Filter', filters[key + 'Filter'])
	})


	// Vue.filter.orderStatusFilter()
}



App.mpType = 'app'


// 全局组件
import LoadMore from '@/components/uni-load-more/uni-load-more.vue'
Vue.component('LoadMore', LoadMore)

import tuiButton from '@/components/button/button.vue'
Vue.component('tuiButton', tuiButton)

import tuiNav from "@/components/tui-navigation-bar/tui-navigation-bar"
Vue.component('tuiNav', tuiNav)

import Icon from "@/components/icon/icon"
Vue.component('Icon', Icon)

import tuiModal from "@/components/modal/modal"
Vue.component('tuiModal', tuiModal)

import tuiTag from '@/components/tag/tag'
Vue.component('tuiTag', tuiTag)



uni.getSystemInfo({
	success: function(e) {
		// #ifdef APP-PLUS
		Vue.prototype.StatusBar = e.statusBarHeight;
		Vue.prototype.Platform = e.platform;
		Vue.prototype.WindowHeight = e.windowHeight;

		plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
			Vue.prototype.Version = wgtinfo.version;
		})
		if (e.platform == 'android') {
			Vue.prototype.CustomBar = e.statusBarHeight + 40;
		} else {
			Vue.prototype.CustomBar = e.statusBarHeight + 45;
		};
		// #endif
		// #ifdef H5
			Vue.prototype.CustomBar = 44;
		// #endif
	}
})

// uni.onNetworkStatusChange(function(res) {
// 	if (!res.isConnected) {
// 		plus.nativeUI.toast('网络崩溃啦!')
// 		plus.nativeUI.closeWaiting()
// 		// uni.navigateTo({
// 		// 	url:'/pages/errors/errors',
// 		// })
// 	} else {
// 		plus.nativeUI.toast('有信号啦,请及时刷新或者重启app')
// 	}
// });


const app = new Vue({
	store,
	...App
})
app.$mount()
