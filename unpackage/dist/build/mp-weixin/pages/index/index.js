(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{4463:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(a("4795"));r(a("4c07")),r(a("c901"));function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,a,n,r,o,i){try{var s=e[o](i),u=s.value}catch(c){return void a(c)}s.done?t(u):Promise.resolve(u).then(n,r)}function i(e){return function(){var t=this,a=arguments;return new Promise((function(n,r){var i=e.apply(t,a);function s(e){o(i,n,r,s,u,"next",e)}function u(e){o(i,n,r,s,u,"throw",e)}s(void 0)}))}}var s={data:function(){return{loadModal:!0,updatedInfo:{},result:"",effective:"",formParams:{openId:"",vilidate:"",mobile:"",invitation:"",nickname:"",headimgurl:"",share_user_id:""},seconds:0,time:null,iviCode:"",shareData:""}},onLoad:function(t){var a=this;this.shareData={proCode:t.pcode,userId:t.ucode,odrCode:t.ocode,iviCode:t.icode},a.shareData.proCode&&a.shareData.userId&&a.shareData.odrCode&&a.$store.commit("setShare",{proCode:a.shareData.proCode,userId:a.shareData.userId,orderCode:a.shareData.odrCode,iviCode:a.shareData.icode}),e.login({provider:"weixin",success:function(){var e=i(n.default.mark((function e(t){var r;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.code,e.next=3,a.getopId(r);case 3:e.sent;case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()})},computed:{},methods:{getopId:function(t){var a=this;return i(n.default.mark((function r(){var o,i,s;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=a,n.prev=1,a.$ui.showloading(),n.next=5,a.$api.GetOpenId({wx_code:t},!1);case 5:i=n.sent,i.Success?(s=i.Msg,e.setStorageSync("jll_opid",s),o.formParams.openId=s,o.autoLogin(s)):o.$ui.hideloading(),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](1),o.$ui.hideloading();case 12:case"end":return n.stop()}}),r,null,[[1,9]])})))()},autoLogin:function(t){var a=this;return i(n.default.mark((function r(){var o,i;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=a,n.prev=1,n.next=4,a.$api.WxTokenLogin({openId:t},!1);case 4:i=n.sent,a.$ui.hideloading(),i.Success?(o.$store.commit("login"),e.setStorageSync("access_token",i.Data.hp),o.initUser()):(a.$ui.hideloading(),i.Msg&&"用户不存在"!=i.Msg&&a.$ui.toast(i.Msg),o.shareData.proCode&&o.shareData.userId&&o.shareData.odrCode?e.navigateTo({url:"/pages/main/details/details?code="+o.shareData.proCode}):e.switchTab({url:"/pages/main/main"})),n.next=13;break;case 9:n.prev=9,n.t0=n["catch"](1),a.$ui.hideloading(),a.$ui.toast(n.t0);case 13:case"end":return n.stop()}}),r,null,[[1,9]])})))()},initUser:function(t){var a=this;return i(n.default.mark((function r(){var o,i;return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=a,n.prev=1,n.next=4,a.$api.getConsumer({},!1);case 4:i=n.sent,i.Success?i.Data&&(o.$store.commit("setUserInfo",i.Data),setTimeout((function(){3==i.Data.consumer_type?e.redirectTo({url:"/pages/main/serverCenter/serverCenter"}):o.shareData.proCode&&o.shareData.userId&&o.shareData.odrCode?e.navigateTo({url:"/pages/main/details/details?code="+o.shareData.proCode}):e.switchTab({url:"/pages/main/main"})}),500)):o.$ui.toast(i.Msg),t&&t(),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0);case 12:case"end":return n.stop()}}),r,null,[[1,9]])})))()}}};t.default=s}).call(this,a("543d")["default"])},"5af8":function(e,t,a){"use strict";var n,r=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}))},"8d15":function(e,t,a){"use strict";a.r(t);var n=a("4463"),r=a.n(n);for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=r.a},"8dac":function(e,t,a){"use strict";var n=a("e18d"),r=a.n(n);r.a},e18d:function(e,t,a){},f0e1:function(e,t,a){"use strict";a.r(t);var n=a("5af8"),r=a("8d15");for(var o in r)"default"!==o&&function(e){a.d(t,e,(function(){return r[e]}))}(o);a("8dac");var i,s=a("f0c5"),u=Object(s["a"])(r["default"],n["b"],n["c"],!1,null,"6490bcca",null,!1,n["a"],i);t["default"]=u.exports},f3d1:function(e,t,a){"use strict";(function(e){a("6b7d");n(a("66fd"));var t=n(a("f0e1"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])}},[["f3d1","common/runtime","common/vendor"]]]);