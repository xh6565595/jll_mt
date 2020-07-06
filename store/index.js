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
		currentPro:{},
		currentRoleCode:''  //聚友空间当前的账户身份的 code
	},
    mutations: {
        login(state, userName) {
			console.log('login_STORE')
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
			state.userInfo = {...info}
		},
		setAccountInfo(state,info){
			// console.log('储存信息2')
			state.accountInfo = {...info}
		},
	
    },
	getters:{
		
	},
	actions:{
		// 用户登录
		userLogin({ state,commit },token){
			console.log(token)
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
							},
							fail(err) {
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
	}
})

export default store
