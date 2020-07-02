import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
		userInfo:{}, //用户微信获得基本信息
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
            state.hasLogin = true;
        },
        logout(state) {
            state.hasLogin = false;
			state.accountInfo = {};//账户基本信息
			state.merchantInfo = {}; //店铺基本信息
			state.levelAccount = {}  //渠道个人信息
        },
		setRoleCode(state,info){
			// console.log('储存信息1')
			state.currentRoleCode = info
		},
		setUserInfo(state,info){
			// console.log('储存信息1')
			state.userInfo = {...info}
		},
		setAccountInfo(state,info){
			// console.log('储存信息2')
			state.accountInfo = {...info}
		},
		setConfig(state,info){
			// console.log('储存信息2')
			state.config = {...info}
		},
		setMerchantInfo(state,info){
			// console.log('储存信息2')
			state.merchantInfo = {...info}
		},
		setCurrentChannel(state,info){
			state.currentChannel = info
		},
		setLevelAccountInfo(state,info){
			state.levelAccount = info
		},
		addCard(state,item){
			
			state.cards =  Object.assign(state.cards,item)
			// console.log(state.cards)
		},
		creatOrder(state,items){
			state.currentOrder = [...items]
			// debugger
		},
		completeOrder(state){
			state.currentOrder = new Array()
		},
		currenPro(state,items){
			state.currentPro = {...items}
		}
    },
	getters:{
		cardsProduct(state){
			// console.log(state.cards)
			// let arr = Object.values(state.cards)  不能用额
			// let arr = Object.keys(state.cards) 
			// let res = []
			// arr.forEach(item=>{
			// 	res.push(state.cards[item])
			// })
			// console.log(res)
			// return res
			return state.cards
		}
	}
})

export default store
