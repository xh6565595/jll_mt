(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"1f62":function(e,n,t){},"254e":function(e,n,t){"use strict";var o=t("1f62"),r=t.n(o);r.a},"7c02":function(e,n,t){"use strict";t.r(n);var o=t("e43b");for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);t("254e");var a,u,i,c,l=t("f0c5"),s=Object(l["a"])(o["default"],a,u,!1,null,null,null,!1,i,c);n["default"]=s.exports},"80b4":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t("4795")),r=a(t("a4ba"));function a(e){return e&&e.__esModule?e:{default:e}}function u(e,n,t,o,r,a,u){try{var i=e[a](u),c=i.value}catch(l){return void t(l)}i.done?n(c):Promise.resolve(c).then(o,r)}function i(e){return function(){var n=this,t=arguments;return new Promise((function(o,r){var a=e.apply(n,t);function i(e){u(a,o,r,i,c,"next",e)}function c(e){u(a,o,r,i,c,"throw",e)}i(void 0)}))}}var c={onLaunch:function(n){console.log("App Launch"),console.log("app",n),e.showShareMenu({withShareTicket:!0,menus:["shareAppMessage","shareTimeline"]})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},methods:{autoLogin:function(){var n=this;return i(o.default.mark((function t(){var r,a,u,i;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r=n,a=e.getStorageSync("user"),u={},!a){t.next=8;break}u.username=a.username,u.password=a.password,t.next=9;break;case 8:return t.abrupt("return",!1);case 9:return t.prev=9,t.next=12,n.$api.userLogin(u,!1);case 12:i=t.sent,i.Success&&(e.setStorageSync("user",u),r.$store.commit("login"),r.initUser()),t.next=18;break;case 16:t.prev=16,t.t0=t["catch"](9);case 18:case"end":return t.stop()}}),t,null,[[9,16]])})))()},initUser:function(n){var t=this;return i(o.default.mark((function r(){var a,u;return o.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return a=t,o.prev=1,o.next=4,t.$api.getConsumer({},!1);case 4:u=o.sent,u.Success?u.Data&&(a.$store.commit("setAccountInfo",u.Data),a.$store.commit("login"),console.log("login")):(a.$ui.toast(u.Msg),a.$store.commit("logout"),e.removeStorageSync("hepai_token")),n&&n(),o.next=11;break;case 9:o.prev=9,o.t0=o["catch"](1);case 11:case"end":return o.stop()}}),r,null,[[1,9]])})))()},_iniWxJdk:function(){var e=this;return i(o.default.mark((function n(){var t,a;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e,n.prev=1,n.next=4,e.$api.GetWxJsApiConfig({url:url},!0);case 4:t=n.sent,t.Success&&(a=t.Data,jweixin.config({debug:!1,appId:a.appId,timestamp:a.timestamp,nonceStr:a.noncestr,signature:a.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline","onMenuShareQQ","onMenuShareQZone","onMenuShareWeibo","chooseWXPay","chooseImage","uploadImage"]}),jweixin.ready((function(){var e={title:"GLLO洁利来官方商城",link:r.default.mainUrl+"index.html",imgUrl:"http://h5.gllo.com.cn/upload/head/jjl.png",desc:"GLLO洁利来官方商城",success:function(){console.info("分享成功！")},cancel:function(){console.info("取消分享！")}};jweixin.onMenuShareAppMessage(e),jweixin.onMenuShareTimeline(e),jweixin.onMenuShareQQ(e),jweixin.onMenuShareQZone(e),jweixin.onMenuShareWeibo(e)})),jweixin.error((function(e){console.log(JSON.stringify(e))}))),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0);case 11:case"end":return n.stop()}}),n,null,[[1,8]])})))()}}};n.default=c}).call(this,t("543d")["default"])},d0bd:function(e,n,t){"use strict";(function(e,n){var o=f(t("4795"));t("1f76");var r=f(t("66fd")),a=f(t("7c02")),u=f(t("f76a")),i=f(t("a4ba")),c=f(t("d367")),l=f(t("a4ba")),s=f(t("ee99"));function f(e){return e&&e.__esModule?e:{default:e}}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){h(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function h(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function v(e,n,t,o,r,a,u){try{var i=e[a](u),c=i.value}catch(l){return void t(l)}i.done?n(c):Promise.resolve(c).then(o,r)}function m(e){return function(){var n=this,t=arguments;return new Promise((function(o,r){var a=e.apply(n,t);function u(e){v(a,o,r,u,i,"next",e)}function i(e){v(a,o,r,u,i,"throw",e)}u(void 0)}))}}r.default.config.productionTip=!1,r.default.prototype.$api=i.default,r.default.prototype.$store=u.default,r.default.prototype.Domain=c.default.mainUrl,r.default.prototype.baseUrl=c.default.baseUrl;var g=e.getSystemInfoSync();g.platform.toLocaleLowerCase();e.getStorageSync("global_Set_jll")||e.setStorageSync("global_Set_jll",s.default);var b={toast:function(n,t,o){e.showToast({title:n,icon:o?"success":"none",duration:t||2e3})},showloading:function(n){e.showLoading({title:n||""})},hideloading:function(){e.hideLoading()},constNum:function(){var n=e.getSystemInfoSync();return"android"==n.platform.toLocaleLowerCase()?300:0},px:function(n){return e.upx2px(n)+"px"}};function w(){return y.apply(this,arguments)}function y(){return y=m(o.default.mark((function n(){var t;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t=this;try{e.request({url:l.default.baseUrl+"/api/Service/Config",method:"get",data:{},header:{"Content-Type":"application/json"},success:function(n){var t=n.statusCode;if(200==t&&n.data.Success){e.setStorageSync("global_Set_jll",n.data.Data);var o=n.data.Data;S(o)}},fail:function(e){console.log(e)}})}catch(o){t.errorCallback()}case 2:case"end":return n.stop()}}),n,this)}))),y.apply(this,arguments)}function S(e){var n={};Object.keys(e).forEach((function(t){var o=e[t];n[t+"Filter"]=function(e){var n;return o.forEach((function(t,o){t.Value==e&&(n=t.Text)})),n},r.default.filter(t+"Filter",n[t+"Filter"])}))}r.default.prototype.$ui=b,w(),a.default.mpType="app";var x=function(){t.e("components/uni-load-more/uni-load-more").then(function(){return resolve(t("f3b8"))}.bind(null,t)).catch(t.oe)};r.default.component("LoadMore",x);var j=function(){t.e("components/button/button").then(function(){return resolve(t("a9e2"))}.bind(null,t)).catch(t.oe)};r.default.component("tuiButton",j);var O=function(){t.e("components/tui-navigation-bar/tui-navigation-bar").then(function(){return resolve(t("24bd"))}.bind(null,t)).catch(t.oe)};r.default.component("tuiNav",O);var M=function(){t.e("components/icon/icon").then(function(){return resolve(t("0968"))}.bind(null,t)).catch(t.oe)};r.default.component("Icon",M);var k=function(){t.e("components/modal/modal").then(function(){return resolve(t("599e"))}.bind(null,t)).catch(t.oe)};r.default.component("tuiModal",k);var L=function(){t.e("components/tag/tag").then(function(){return resolve(t("7c45"))}.bind(null,t)).catch(t.oe)};r.default.component("tuiTag",L),e.getSystemInfo({success:function(e){r.default.prototype.CustomBar=44}});var P=new r.default(d({store:u.default},a.default));n(P).$mount()}).call(this,t("543d")["default"],t("543d")["createApp"])},e43b:function(e,n,t){"use strict";t.r(n);var o=t("80b4"),r=t.n(o);for(var a in o)"default"!==a&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=r.a}},[["d0bd","common/runtime","common/vendor"]]]);