(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tui-fab/tui-fab"],{"41ca":function(t,e,i){"use strict";var n=i("d5c2"),u=i.n(n);u.a},"444b":function(t,e,i){"use strict";i.r(e);var n=i("af3e"),u=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=u.a},8088:function(t,e,i){"use strict";i.r(e);var n=i("ab10"),u=i("444b");for(var r in u)"default"!==r&&function(t){i.d(e,t,(function(){return u[t]}))}(r);i("41ca");var a,f=i("f0c5"),s=Object(f["a"])(u["default"],n["b"],n["c"],!1,null,"19c4210e",null,!1,n["a"],a);e["default"]=s.exports},ab10:function(t,e,i){"use strict";var n,u=function(){var t=this,e=t.$createElement,i=(t._self._c,t.getLeft()),n=t.getRight();t.$mp.data=Object.assign({},{$root:{m0:i,m1:n}})},r=[];i.d(e,"b",(function(){return u})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}))},af3e:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={name:"tuiFab",props:{left:{type:Number,default:0},right:{type:Number,default:80},bottom:{type:Number,default:100},width:{type:Number,default:108},height:{type:Number,default:108},radius:{type:String,default:"50%"},bgColor:{type:String,default:"#5677fc"},color:{type:String,default:"#fff"},btnList:{type:Array,default:function(){return[]}},maskClosable:{type:Boolean,default:!1}},data:function(){return{isOpen:!1,hidden:!0,timer:null}},methods:{getLeft:function(){var t="auto";return this.left&&!this.right&&(t=this.left+"rpx"),t},getRight:function(){var t=this.right+"rpx";return this.left&&!this.right&&(t="auto"),t},handleClick:function(t){var e=this;this.hidden=!1,clearTimeout(this.timer),-1==t&&this.btnList.length?this.isOpen=!this.isOpen:(this.$emit("click",{index:t}),this.isOpen=!1),this.isOpen||(this.timer=setTimeout((function(){e.hidden=!0}),200))},handleClickCancel:function(){this.maskClosable&&(this.isOpen=!1)}},beforeDestroy:function(){clearTimeout(this.timer),this.timer=null}};e.default=n},d5c2:function(t,e,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tui-fab/tui-fab-create-component',
    {
        'components/tui-fab/tui-fab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8088"))
        })
    },
    [['components/tui-fab/tui-fab-create-component']]
]);
