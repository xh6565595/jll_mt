(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"20ca":function(e,t,n){"use strict";n.r(t);var r=n("276a"),a=n("de6b");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("86d7");var o,s=n("f0c5"),u=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"b1d45ab0",null,!1,r["a"],o);t["default"]=u.exports},"276a":function(e,t,n){"use strict";var r={accredit:function(){return n.e("components/accredit/accredit").then(n.bind(null,"7380"))}},a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}))},"64b9":function(e,t,n){},"72f6":function(e,t,n){"use strict";(function(e){n("1f76");r(n("66fd"));var t=r(n("20ca"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},7781:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("4795")),a=o(n("152e")),i=(o(n("a4ba")),n("2f62"));function o(e){return e&&e.__esModule?e:{default:e}}function s(e,t,n,r,a,i,o){try{var s=e[i](o),u=s.value}catch(c){return void n(c)}s.done?t(u):Promise.resolve(u).then(r,a)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function o(e){s(i,r,a,o,u,"next",e)}function u(e){s(i,r,a,o,u,"throw",e)}o(void 0)}))}}var c=function(){n.e("components/myp-one/myp-one").then(function(){return resolve(n("8197"))}.bind(null,n)).catch(n.oe)},f=function(){n.e("components/accredit/accredit").then(function(){return resolve(n("7380"))}.bind(null,n)).catch(n.oe)},l={data:function(){return{loadModal:!0,updatedInfo:{},result:"",effective:"",formParams:{openId:"",vilidate:"",mobile:"",invitation:"",nickname:"",headimgurl:"",share_user_id:""},seconds:0,time:null}},components:{accredit:f,oneInput:c},onLoad:function(t){var n=e.getStorageSync("jll_opid");this.formParams.invitation=this.iviCode,this.formParams.share_user_id=this.shareUser,this.formParams.openId=n},computed:(0,i.mapState)(["shareUser","iviCode"]),methods:{submit:function(){var e=this;return u(r.default.mark((function t(){var n,a,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e,console.log(e.formParams),e.formParams.vilidate&&!(e.formParams.vilidate.length<6)){t.next=5;break}return e.$ui.toast("请输入正确的验证码"),t.abrupt("return");case 5:return t.prev=5,e.$ui.showloading(),t.next=9,e.$api.WxAutoRegiste(e.formParams,!1);case 9:a=t.sent,e.$ui.hideloading(),a.Success?(n.$refs.userBox.hideModal(),i=a.Data.openId,n.autoLogin(i)):(a.Msg&&e.$ui.toast(a.Msg),n.reset()),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](5),n.$ui.toast(t.t0),n.reset();case 18:case"end":return t.stop()}}),t,null,[[5,14]])})))()},reset:function(){this.$refs.userBox.hideModal(),this.seconds=0,this.effective="",this.formParams.vilidate="",clearInterval(this.time),this.time=null,this.$refs.hi.set("")},input:function(e){this.formParams.vilidate=e},finish:function(e){console.log(this.formParams),this.submit()},_getCode:function(){var t=this;return u(r.default.mark((function n(){var i,o,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.effective){n.next=2;break}return n.abrupt("return");case 2:if(i=t,t.formParams.mobile&&a.default.phoneCheck(t.formParams.mobile)){n.next=6;break}return t.$ui.toast("请输入正确的手机号码"),n.abrupt("return");case 6:return o={mobile:t.formParams.mobile,type:1},n.prev=7,t.$ui.showloading(),n.next=11,t.$api.getVerificateCode(o);case 11:s=n.sent,t.$ui.hideloading(),s.Success?(e.showToast({title:"验证码已发送",position:"bottom"}),i.effective=!0,i.seconds=60,t.time=setInterval((function(){i.seconds-=1,0==i.seconds&&(i.effective=!1,clearInterval(t.time))}),1e3)):e.showToast({icon:"none",title:s.Msg?s.Msg:"未知错误"}),n.next=19;break;case 16:n.prev=16,n.t0=n["catch"](7),console.log("请求结果false : "+n.t0);case 19:case"end":return n.stop()}}),n,null,[[7,16]])})))()},getuserinfo:function(e){var t=e.detail.userInfo;this.formParams.nickname=t.nickName,this.formParams.headimgurl=t.avatarUrl,this.$refs.userBox.showModal()},autoLogin:function(t){var n=this;return u(r.default.mark((function a(){var i,o;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i=n,r.prev=1,n.$ui.showloading(),r.next=5,n.$api.WxTokenLogin({openId:t},!1);case 5:o=r.sent,n.$ui.hideloading(),o.Success?(e.setStorageSync("access_token",o.Data.hp),i.initUser()):o.Msg&&"用户不存在"!=o.Msg&&n.$ui.toast(o.Msg),r.next=12;break;case 10:r.prev=10,r.t0=r["catch"](1);case 12:case"end":return r.stop()}}),a,null,[[1,10]])})))()},initUser:function(t){var n=this;return u(r.default.mark((function a(){var i,o;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i=n,r.prev=1,r.next=4,n.$api.getConsumer({},!1);case 4:o=r.sent,o.Success?o.Data&&(i.$store.commit("setUserInfo",o.Data),i.$store.commit("login"),setTimeout((function(){3==o.Data.consumer_type?e.reLaunch({url:"/pages/main/serverCenter/serverCenter"}):e.switchTab({url:"/pages/main/main"})}),500)):i.$ui.toast(o.Msg),t&&t(),r.next=12;break;case 9:r.prev=9,r.t0=r["catch"](1),console.log("请求结果false : "+r.t0);case 12:case"end":return r.stop()}}),a,null,[[1,9]])})))()}}};t.default=l}).call(this,n("543d")["default"])},"86d7":function(e,t,n){"use strict";var r=n("64b9"),a=n.n(r);a.a},de6b:function(e,t,n){"use strict";n.r(t);var r=n("7781"),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a}},[["72f6","common/runtime","common/vendor"]]]);