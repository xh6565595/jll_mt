(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{5247:function(t,e,n){"use strict";n.r(e);var o=n("8ceb"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);e["default"]=i.a},"586a":function(t,e,n){},"8ceb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62"),i=n("8c00"),a=t.getStorageSync("global_Set_jll"),c={data:function(){return{baseKey:"GetGoodsList",banners:[],hasRow:"Rows",formParams:{key:"",type:"1",pageIndex:1,pageSize:10}}},components:{},computed:(0,o.mapState)(["shareUser","sharePro"]),mixins:[i.baseMixins],onLoad:function(){this.banners=a.banerList,this.sharePro&&t.navigateTo({url:"/pages/main/details/details?code="+this.sharePro})},onShow:function(){},methods:{_dy:function(){wx.requestSubscribeMessage({tmplIds:["C1X2iAOlZq-A5ofwquTDuSW82fil3pe5GW5SnhjI_so","pA_K72jyOPZMKqI5zSVWuVFKCSeJFpjqIbfgQTEABZo"],success:function(t){console.log(111)},fail:function(t){console.log(t)}})},_href:function(e){t.navigateTo({url:e})},imageLoad:function(t){this.$set(this.list[t],"load",!0)},loadError:function(t){this.list[t].goods_picture="/static/img/noPic.jpg"},loadDataComplete:function(t){t&&this.list.map((function(t){"string"==typeof t.project_img&&(t.project_img=t.project_img?t.project_img.split(","):[])}))}}};e.default=c}).call(this,n("543d")["default"])},9136:function(t,e,n){"use strict";var o=n("586a"),i=n.n(o);i.a},"987b":function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return o}))},"9bf2":function(t,e,n){"use strict";(function(t){n("1f76");o(n("66fd"));var e=o(n("c7e3"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},c7e3:function(t,e,n){"use strict";n.r(e);var o=n("987b"),i=n("5247");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("9136");var c,s=n("f0c5"),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"24cdd2a6",null,!1,o["a"],c);e["default"]=r.exports}},[["9bf2","common/runtime","common/vendor"]]]);