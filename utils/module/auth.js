// 用户身份相关接口
// 我要积分
import http from '../http/interface'
const Auth = {
	//Openid查询关注
	GetWxOpenid_Attention: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/GetWxOpenid_Attention', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// code查询关注
	GetWxcode_Attention: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/GetWxcode_Attention', 
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// code获取OpenId
	GetOpenId: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/GetOpenId', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 微信自动注册
	WxAutoRegiste: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/WxAutoRegiste', 
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	// 获取验证码
	getVerificateCode: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Msg/SendVerificationCode',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 微信api
	GetWxJsApiConfig:(data) => {
	    return http.request({
	        url: '/api/Authorize/GetJsApiConfig',
	        method: 'POST', 
	        data,
			// handle:true
	    })
	},
	// 登录
	userLogin: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/Token',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 快捷登录
	shortcutToken: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/ShortcutToken',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// OpenId登录
	WxTokenLogin: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/WxToken',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 注册用户 
	userRegiste: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/Registe',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 忘记密码
	findPassword: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/FindPassword',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 获取用户信息
	getConsumer: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Consumer/Get',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	//更新用户信息
	PerfectPayInfo: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Consumer/PerfectPayInfo',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 设置支付密码
	SettingPayPassword: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Consumer/SettingPayPassword',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	// 微信绑定手机号
	BindWxUserMobile: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/BindWxUserMobile',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 支付
	toPayment: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Pay/Payment',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 提现
	SubmitCash: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Cash/SubmitCash',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
// 	=============商家部分\\\



	// 获取商家信息
	GetBusinessInfo: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/GetBusinessInfo',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	// 修改商家信息
	BusinessEditor: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Shop/BusinessEditor',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	
	//=============== 全局=================
	
	// 获取全局配置
	getConfig: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Service/Config',
			method: 'GET',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// app更新
	VersionCheck: (data, ifLoad = false) => {
		return http.request({
			url: '/api/AppVersion/VersionCheck',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
	
	// 手机号登录
	MobileToken: (data, ifLoad = false) => {
		return http.request({
			url: '/api/Authorize/MobileToken',
			method: 'POST',
			data,
			// handle:true
		}, ifLoad)
	},
}
export default Auth
