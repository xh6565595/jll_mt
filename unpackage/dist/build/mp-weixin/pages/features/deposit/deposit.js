(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/features/deposit/deposit"],{"338c":function(e,t,n){"use strict";var o,r=function(){var e=this,t=e.$createElement,n=(e._self._c,e._f("encrypt")(e.myAccount));e.$mp.data=Object.assign({},{$root:{f0:n}})},a=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}))},"5eda":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n("4795")),r=n("2f62");function a(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,o,r,a,c){try{var i=e[a](c),s=i.value}catch(u){return void n(u)}i.done?t(s):Promise.resolve(s).then(o,r)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(o,r){var a=e.apply(t,n);function i(e){c(a,o,r,i,s,"next",e)}function s(e){c(a,o,r,i,s,"throw",e)}i(void 0)}))}}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var f=function(){n.e("components/success").then(function(){return resolve(n("d774"))}.bind(null,n)).catch(n.oe)},d={data:function(){return{bankList:[],formParams:{apply_money:"",cash_type:0,vilidate:""},currentBank:"",maxAccount:0,successmodal:!1,currentBackText:"",myAccount:"",fullname:"",seconds:0,payFlag:!1,paymentPwd:""}},onNavigationBarButtonTap:function(t){e.navigateTo({url:"/pages/user/depositHistory/depositHistory"})},onLoad:function(){},onShow:function(){console.log(this.userInfo),this.maxAccount=this.userInfo.consumer_blance,this.myAccount=this.userInfo.consumer_full_mobile;e.getStorageSync("hasPayPass");if(!this.userInfo.alipay_account)return e.showModal({title:"酷熊提醒您",content:"请先设置支付宝收款账户",success:function(t){t.confirm?e.navigateTo({url:"/pages/user/withdrawal/withdrawal"}):t.cancel&&(console.log("用户点击取消"),e.navigateBack({}))}}),!1},computed:u({},(0,r.mapState)(["hasLogin","userInfo","accountInfo"])),watch:{},components:{Success:f},filters:{encrypt:function(e){var t=e.slice(4,-3),n=e.replace(t,"****");return n}},methods:{_ok:function(){},allIn:function(){this.formParams.apply_money=this.maxAccount},_closeKeyBoard:function(){e.hideKeyboard()},_getCode:function(){var t=this;return i(o.default.mark((function n(){var r,a,c,i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.effective){n.next=2;break}return n.abrupt("return");case 2:return r=t,a={mobile:t.myAccount,type:7},n.prev=4,n.next=7,t.$api.getVerificateCode(a);case 7:c=n.sent,console.log(JSON.stringify(c)),c.Success?(e.showToast({title:"验证码已发送",position:"bottom"}),r.effective=!0,r.seconds=60,i=setInterval((function(){r.seconds-=1,0==r.seconds&&(r.effective=!1,clearInterval(i))}),1e3)):e.showToast({icon:"none",title:c.data}),n.next=15;break;case 12:n.prev=12,n.t0=n["catch"](4),console.log("请求结果false : "+n.t0);case 15:case"end":return n.stop()}}),n,null,[[4,12]])})))()},onInput:function(e){var t=this,n=e.detail.value,o=n.split(".");this.time&&(clearTimeout(this.time),this.time=""),this.time=setTimeout((function(){var e=n;o[1]&&o[1].length>=2&&(e=n.match(/^\d+\.(\d){2}/)[0]),Number(e)>=t.maxAccount&&(e=t.maxAccount),t.formParams.apply_money=e,clearTimeout(t.time),t.time=""}),500)},_submit:function(){var t=this.formParams.apply_money;if(console.log(JSON.stringify(this.formParams)),this.formParams.apply_money)if(this.formParams.vilidate){if(t=Number(t).toFixed(2),console.log(t),t>this.maxAccount)return e.showToast({icon:"",title:"超出最大限额"}),void(this.formParams.apply_money=this.maxAccount);console.log(this.formParams),this.vilidatePass()}else e.showToast({icon:"none",title:"请输入验证码"});else e.showToast({icon:"none",title:"请输入有效金额"})},vilidatePass:function(){var t=this;return i(o.default.mark((function n(){var r,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t,n.prev=1,t.$ui.showloading(),n.next=5,t.$api.SubmitCash(t.formParams);case 5:a=n.sent,t.$ui.hideloading(),a.Success?(r.$store.dispatch("refreshUser"),r.$refs.successModal.show()):e.showToast({icon:"none",title:a.Msg?a.Msg:"操作失败，请联系客服"}),n.next=14;break;case 10:n.prev=10,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0),t.$ui.hideloading();case 14:case"end":return n.stop()}}),n,null,[[1,10]])})))()}}};t.default=d}).call(this,n("543d")["default"])},"7c12":function(e,t,n){},a40c:function(e,t,n){"use strict";var o=n("7c12"),r=n.n(o);r.a},bca0:function(e,t,n){"use strict";(function(e){n("6b7d");o(n("66fd"));var t=o(n("f1e2"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},bfc0:function(e,t,n){"use strict";n.r(t);var o=n("5eda"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},f1e2:function(e,t,n){"use strict";n.r(t);var o=n("338c"),r=n("bfc0");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("a40c");var c,i=n("f0c5"),s=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,"c500c1ce",null,!1,o["a"],c);t["default"]=s.exports}},[["bca0","common/runtime","common/vendor"]]]);