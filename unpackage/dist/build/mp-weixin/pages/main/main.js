(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/main/main"],{"393f":function(t,e,n){},5247:function(t,e,n){"use strict";n.r(e);var o=n("8ceb"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},"8ceb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("2f62"),a=n("8c00"),i=t.getStorageSync("global_Set_jll"),r={data:function(){return{baseKey:"GetGoodsList",banners:[],hasRow:"Rows",formParams:{key:"",type:"1",pageIndex:1,pageSize:10}}},components:{},computed:(0,o.mapState)(["shareUser","sharePro"]),mixins:[a.baseMixins],onLoad:function(){this.banners=i.banerList,this.sharePro&&t.navigateTo({url:"/pages/main/details/details?code="+this.sharePro})},onShow:function(){},methods:{_href:function(e){t.navigateTo({url:e})},imageLoad:function(t){this.$set(this.list[t],"load",!0)},loadError:function(t){this.list[t].goods_picture="/static/img/noPic.jpg"},loadDataComplete:function(t){t&&this.list.map((function(t){"string"==typeof t.project_img&&(t.project_img=t.project_img?t.project_img.split(","):[])}))}}};e.default=r}).call(this,n("543d")["default"])},"9bf2":function(t,e,n){"use strict";(function(t){n("1f76");o(n("66fd"));var e=o(n("c7e3"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},be82:function(t,e,n){"use strict";var o=n("393f"),a=n.n(o);a.a},c7e3:function(t,e,n){"use strict";n.r(e);var o=n("fbb5"),a=n("5247");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("be82");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],o["b"],o["c"],!1,null,"1cde1392",null,!1,o["a"],r);e["default"]=s.exports},fbb5:function(t,e,n){"use strict";var o,a=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}))}},[["9bf2","common/runtime","common/vendor"]]]);