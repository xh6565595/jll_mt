(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0642":function(e,t,n){"use strict";var r=n("f29c"),a=n.n(r);a.a},4463:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n("4795")),a=i(n("4c07"));i(n("c901"));function i(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,r,a,i,o){try{var s=e[i](o),u=s.value}catch(c){return void n(c)}s.done?t(u):Promise.resolve(u).then(r,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var i=e.apply(t,n);function s(e){o(i,r,a,s,u,"next",e)}function u(e){o(i,r,a,s,u,"throw",e)}s(void 0)}))}}var u=function(){n.e("components/myp-one/myp-one").then(function(){return resolve(n("db92"))}.bind(null,n)).catch(n.oe)},c=function(){n.e("components/accredit/accredit").then(function(){return resolve(n("0b8c"))}.bind(null,n)).catch(n.oe)},f={data:function(){return{loadModal:!0,updatedInfo:{},result:"",effective:"",formParams:{openId:"",vilidate:"",mobile:"",invitation:"",nickname:"",headimgurl:"",share_user_id:""},seconds:0,time:null}},components:{accredit:c,oneInput:u},onLoad:function(){var t=this,n=e.getStorageSync("jll_opid");n&&t.autoLogin(n)},computed:{hasLogin:function(){return!!this.$store.state.hasLogin&&this.$store.state.hasLogin},accountInfo:function(){return this.$store.state.accountInfo}},methods:{submit:function(){var e=this;return s(r.default.mark((function t(){var n,a,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(n=e,e.formParams.vilidate&&!(e.formParams.vilidate.length<6)){t.next=4;break}return e.$ui.toast("请输入正确的验证码"),t.abrupt("return");case 4:return t.prev=4,e.$ui.showloading(),t.next=8,e.$api.WxAutoRegiste(e.formParams,!1);case 8:a=t.sent,console.log(a),e.$ui.hideloading(),a.Success?(n.$refs.userBox.hideModal(),i=a.Data.openId,n.autoLogin(i),n.$refs.userBox.hideModal()):(n.$ui.toast(a.Msg?a.Msg:"未知错误"),n.reset()),t.next=18;break;case 14:t.prev=14,t.t0=t["catch"](4),n.$ui.toast(t.t0),n.reset();case 18:case"end":return t.stop()}}),t,null,[[4,14]])})))()},reset:function(){this.$refs.userBox.hideModal(),this.seconds=0,this.effective="",this.formParams.vilidate="",clearInterval(this.time),this.time=null},input:function(e){this.formParams.vilidate=e},finish:function(e){console.log(this.formParams),this.submit()},_getCode:function(){var t=this;return s(r.default.mark((function n(){var i,o,s;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.effective){n.next=2;break}return n.abrupt("return");case 2:if(i=t,t.formParams.mobile&&a.default.phoneCheck(t.formParams.mobile)){n.next=6;break}return t.$ui.toast("请输入正确的手机号码"),n.abrupt("return");case 6:return o={mobile:t.formParams.mobile,type:1},n.prev=7,t.$ui.showloading(),n.next=11,t.$api.getVerificateCode(o);case 11:s=n.sent,t.$ui.hideloading(),s.Success?(e.showToast({title:"验证码已发送",position:"bottom"}),i.effective=!0,i.seconds=60,t.time=setInterval((function(){i.seconds-=1,0==i.seconds&&(i.effective=!1,clearInterval(t.time))}),1e3)):e.showToast({icon:"none",title:s.Msg?s.Msg:"未知错误"}),n.next=19;break;case 16:n.prev=16,n.t0=n["catch"](7),console.log("请求结果false : "+n.t0);case 19:case"end":return n.stop()}}),n,null,[[7,16]])})))()},getopId:function(t){var n=this;return s(r.default.mark((function a(){var i,o,s;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i=n,r.prev=1,n.$ui.showloading(),r.next=5,n.$api.GetOpenId({wx_code:t},!1);case 5:if(o=r.sent,n.$ui.hideloading(),!o.Success){r.next=14;break}return s=o.Msg,e.setStorageSync("jll_opid",s),i.formParams.openId=s,r.abrupt("return",{success:!0,data:s});case 14:return r.abrupt("return",{success:!1});case 15:r.next=20;break;case 17:return r.prev=17,r.t0=r["catch"](1),r.abrupt("return",{success:!1});case 20:case"end":return r.stop()}}),a,null,[[1,17]])})))()},getuserinfo:function(t){var n=this,a=t.detail.userInfo;this.formParams.nickname=a.nickName,this.formParams.headimgurl=a.avatarUrl,e.login({provider:"weixin",success:function(){var e=s(r.default.mark((function e(t){var a,i;return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t.code,e.next=3,n.getopId(a);case 3:i=e.sent,i.success&&n.$refs.userBox.showModal();case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()})},autoLogin:function(t){var n=this;return s(r.default.mark((function a(){var i,o;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return i=n,r.prev=1,n.$ui.showloading(),r.next=5,n.$api.WxTokenLogin({openId:t},!1);case 5:o=r.sent,n.$ui.hideloading(),o.Success?(e.setStorageSync("access_token",o.Data.hp),i.$store.dispatch("userLogin",o.Data.hp),e.redirectTo()({url:"/pages/main/main"})):e.reLaunch({url:"/pages/main/main"}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](1),e.reLaunch({url:"/pages/main/main"});case 13:case"end":return r.stop()}}),a,null,[[1,10]])})))()},initUser:function(e){var t=this;return s(r.default.mark((function n(){var a,i;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t,n.prev=1,n.next=4,t.$api.getConsumer({},!1);case 4:i=n.sent,i.Success?i.Data&&(a.$store.commit("setAccountInfo",i.Data),a.userAccount=i.Data):a.$ui.toast(i.Msg),e&&e(),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0);case 12:case"end":return n.stop()}}),n,null,[[1,9]])})))()}}};t.default=f}).call(this,n("543d")["default"])},"8d15":function(e,t,n){"use strict";n.r(t);var r=n("4463"),a=n.n(r);for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);t["default"]=a.a},a566:function(e,t,n){"use strict";var r={accredit:function(){return n.e("components/accredit/accredit").then(n.bind(null,"0b8c"))}},a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return r}))},f0e1:function(e,t,n){"use strict";n.r(t);var r=n("a566"),a=n("8d15");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("0642");var o,s=n("f0c5"),u=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"c68dbbe0",null,!1,r["a"],o);t["default"]=u.exports},f29c:function(e,t,n){},f3d1:function(e,t,n){"use strict";(function(e){n("6b7d");r(n("66fd"));var t=r(n("f0e1"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["f3d1","common/runtime","common/vendor"]]]);