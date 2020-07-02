
// 全局设置
export default {
	baseUrl:"http://h5.gllo.com.cn/Data",   //api业务接口域名
	mainUrl:"http://h5.gllo.com.cn/",      //项目域名
	// 测试环境
	// wx_appid: 'wx09daee2f47e178aa',    //微信授权 appid  測試公衆號
	wx_appid: 'wxbb1e69472b847c6e',    //代码力量 测试
	// wx_redirect_url:'http://192.168.1.9:8080',
	wx_redirect_url: 'http://h5.gllo.com.cn',   //微信授权 回调页地址
	
	versionUrl:'/api/AppVersion/VersionCheck'   //app版本检测url   // 1是不更新 2是强制更新 3可选择更新 4//appstore更新
}