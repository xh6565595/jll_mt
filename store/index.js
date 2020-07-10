import Vue from 'vue'
import Vuex from 'vuex'
import SET from '@/SET.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
		userInfo:'', //用户微信获得基本信息
		accountInfo:{}, //账户基本信息
		merchantInfo:{}, //店铺基本信息
		levelAccount:{},  //渠道个人信息
		config:{},
		currentChannel:0,   //1聚友之家  2粉丝空间 3vip空间
		cards:{} , //购物车
		currentOrder:[]   ,//创建订单
		sharePro:'',  //是否需要立即跳转制定商品
		shareUser:'',  //是否需要立即跳转制定商品
		shareOrder:'',
		currentRoleCode:''  //聚友空间当前的账户身份的 code
	},
    mutations: {
        login(state, userName) {
			// console.log('login_STORE')
			uni.showToast({
				title:'登陆成功'
			})
            state.hasLogin = true;
        },
        logout(state) {
            state.hasLogin = false;
			state.accountInfo = {};//账户基本信息
			state.merchantInfo = {}; //店铺基本信息
			state.levelAccount = {}  //渠道个人信息
        },
		setUserInfo(state,info){
			// console.log(info)
			state.userInfo = {...info}
		},
		setAccountInfo(state,info){
			// console.log('储存信息2')
			state.accountInfo = {...info}
		},
		creatOrder(state,items){
			state.currentOrder = [...items]
			// debugger
		},
		completeOrder(state){
			state.currentOrder = new Array()
		},
		setShare(state,info){
			state.sharePro = info.proCode
			state.shareUser = info.userId
			state.shareOrder = info.orderCode
		},
		removeShare(state,info){
			state.sharePro = ''
			state.shareUser = ''
			state.shareOrder = ''			
		}
    },
	getters:{
		
	},
	actions:{
		// 用户登录
		userLogin({ state,commit },token,callback){
			// console.log(token)
			try {
				// uni.setStorageSync('access_token', token);
				// 本地和状态管理器都需要储存登录状态
				commit('login')
				let that = this;
				try {
					if (token && !state.userInfo) {
						// console.log(111)
						uni.request({
							url: SET.baseUrl + '/api/Consumer/Get', //仅为示例，并非真实接口地址。
							method: 'get',
							data: {},
							header: {
								'Content-Type': 'application/json',
								Authorization: token
							},
							success: res => {
								// console.log(res)
								let statusCode = res.statusCode;
								if (statusCode == 200 && res.data.Success) {
									commit('setUserInfo', res.data.Data);
								} 
								if(callback)callback(true,res)
							},
							fail(err) {
								if(callback)callback(false,res)
								uni.switchTab({
									url: '/pages/user/user'
								});
							}
						});
					}
				} catch (e) {
					
				}
			
			} catch (e) { 
				// error
			}		
		},
		//刷新用户数据
		refreshUser({ state,commit },callback){
			const value = uni.getStorageSync('access_token');
			uni.request({
				url: SET.baseUrl + '/api/Consumer/Get', //仅为示例，并非真实接口地址。
				method: 'get',
				data: {},
				header: {
					'Content-Type': 'application/json',
					Authorization: value
				},
				success: res => {
					let statusCode = res.statusCode;
					if (statusCode == 200 && res.data.Success) {
						commit('setUserInfo', res.data.Data);
					} else{
						uni.switchTab({
							url: '/pages/user/user'
						});
					}
				},
				fail(err) {
					uni.switchTab({
						url: '/pages/user/user'
					});
				},
				complete(){
					if(callback)callback()
				}
			});
		},
	}
})

export default store
