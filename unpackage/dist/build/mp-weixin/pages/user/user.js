(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user","components/accredit/accredit"],{"0790":function(t,e,n){"use strict";(function(t){n("6b7d");a(n("66fd"));var e=a(n("8a4d"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"0b8c":function(t,e,n){"use strict";n.r(e);var a=n("435c"),o=n("1600");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("9563");var r,u=n("f0c5"),c=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"153716fe",null,!1,a["a"],r);e["default"]=c.exports},1600:function(t,e,n){"use strict";n.r(e);var a=n("96b4"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"232d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("4795")),o=n("2f62");i(n("c901")),i(n("0b8c"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,a,o,i,r){try{var u=t[i](r),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(a,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(a,o){var i=t.apply(e,n);function u(t){r(i,a,o,u,c,"next",t)}function c(t){r(i,a,o,u,c,"throw",t)}u(void 0)}))}}var c={data:function(){return{kefu:"",modal:!1,logining:!1,content:"请您先登录",action:"login",loginParams:{username:"",password:"",vilidate:"000000"},formParams:{key:"",type:4,pageIndex:1,pageSize:6}}},onLoad:function(){},onShow:function(){this.hasLogin&&this._loadData("refresh")},computed:(0,o.mapState)(["userInfo","hasLogin"]),watch:{},components:{},onPullDownRefresh:function(){this._loadData()},methods:{imageLoad:function(t){this.$set(this.list[t],"load",!0)},loadError:function(t){this.list[t].goods_picture="/static/img/noPic.jpg"},_href:function(e){if(this.hasLogin)switch(e){case"set":t.navigateTo({url:"/pages/user/set/set"});break;default:t.navigateTo({url:"/pages".concat(e)});break}else t.navigateTo({url:"/pages/login/login"})},_loadData:function(e){var n=this;return u(a.default.mark((function e(){return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n.$store.dispatch("refreshUser",(function(){t.stopPullDownRefresh()}));case 1:case"end":return e.stop()}}),e)})))()},handleClick:function(e){var n=e.index;if(0===n);else switch(this.action){case"login":t.navigateTo({url:"/pages/role/login/login"});break;case"authentication":t.navigateTo({url:"/pages/features/authentication/authentication"});break;case"payPass":t.navigateTo({url:"/pages/user/setPayPass/setPayPass"});break;default:break}this.modal=!1},_close:function(){this.$refs.kf.hideModal()},_kefuMenu:function(){this.$refs.kf.showModal()},_kefu:function(){var e=t.getStorageSync("global_Set_jll").service_mobile,n=this;this.$refs.kf.hideModal(),t.showModal({title:"GLLO健康智能马桶提醒你",content:"立即致电官方客服？",success:function(a){n.show=!1,a.confirm?t.makePhoneCall({phoneNumber:e}):a.cancel&&console.log("用户点击取消")}})}}};e.default=c}).call(this,n("543d")["default"])},"3b86":function(t,e,n){"use strict";var a=n("fe9c"),o=n.n(a);o.a},"435c":function(t,e,n){"use strict";var a,o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},"7b02":function(t,e,n){"use strict";n.r(e);var a=n("232d"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"8a4d":function(t,e,n){"use strict";n.r(e);var a=n("fdc8"),o=n("7b02");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("3b86");var r,u=n("f0c5"),c=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"32733071",null,!1,a["a"],r);e["default"]=c.exports},9563:function(t,e,n){"use strict";var a=n("f586"),o=n.n(a);o.a},"96b4":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{ashow:!1}},props:{autoClose:{type:Boolean,default:!1}},methods:{hideModal:function(){this.autoClose&&(this.ashow=!1)},showModal:function(){this.ashow=!0}}};e.default=a},f586:function(t,e,n){},fdc8:function(t,e,n){"use strict";var a={accredit:function(){return Promise.resolve().then(n.bind(null,"0b8c"))}},o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},fe9c:function(t,e,n){}},[["0790","common/runtime","common/vendor"]]]);