(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/features/createOrder/createOrder"],{"118a":function(e,r,t){"use strict";(function(e){t("1f76");n(t("66fd"));var r=n(t("9e7e"));function n(e){return e&&e.__esModule?e:{default:e}}e(r.default)}).call(this,t("543d")["createPage"])},"11f4":function(e,r,t){"use strict";var n=t("b539"),c=t.n(n);c.a},"54b3":function(e,r,t){"use strict";(function(e){Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var n=o(t("4795")),c=(o(t("152e")),t("2f62"));function o(e){return e&&e.__esModule?e:{default:e}}function s(e,r,t,n,c,o,s){try{var a=e[o](s),i=a.value}catch(u){return void t(u)}a.done?r(i):Promise.resolve(i).then(n,c)}function a(e){return function(){var r=this,t=arguments;return new Promise((function(n,c){var o=e.apply(r,t);function a(e){s(o,n,c,a,i,"next",e)}function i(e){s(o,n,c,a,i,"throw",e)}a(void 0)}))}}function i(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function u(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?i(Object(t),!0).forEach((function(r){d(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function d(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var l=function(){t.e("components/tui-skeleton/tui-skeleton").then(function(){return resolve(t("5649"))}.bind(null,t)).catch(t.oe)},f=function(){t.e("components/list-view/list-view").then(function(){return resolve(t("369d"))}.bind(null,t)).catch(t.oe)},p=function(){t.e("components/list-cell/list-cell").then(function(){return resolve(t("478d"))}.bind(null,t)).catch(t.oe)},_=function(){t.e("components/PayPanel/PayPanel").then(function(){return resolve(t("d1e2"))}.bind(null,t)).catch(t.oe)},h=e.getStorageSync("global_Set_jll"),v={data:function(){return{payWay:0,skeletonShow:!0,loading:!1,currentAddress:"",formParams:{create_order_type:0,cart_code:"",goods_code:"",skus_code:"",goods_num:0,share_order_code:"",user_address_code:"",goods_service_code:[]},payParams:{pay_type:0,pay_source:0,order_num:""},title:"GLLO健康智能马桶",content:"",allEms:0,modal:!1,oderId:""}},onLoad:function(r){this.formParams.create_order_type=r.type,this.formParams.share_order_code=r.shareOrder,console.log(this.formParams);var t=this;e.$on("refresh_sureAuction",(function(e){t.currentAddress=e,t.calcEms()})),e.$on("refresh_addressList",(function(e){t.loadAddress()})),this.loadAddress()},onShow:function(){},components:{tuiListView:f,tuiListCell:p,tuiSkeleton:l,PayPanel:_},computed:u({},(0,c.mapState)(["currentOrder","shareUser","sharePro"]),{allPrize:function(){var e=0;return this.currentOrder.forEach((function(r){1==r.project_parameter_type?e+=Number(r.project_spec.price)*r.project_num:e+=Number(r.project_raise_price)*r.project_num})),e.toFixed(2)},allAccount:function(){var e=Number(this.allPrize);return e.toFixed(2)},shui:function(){return(this.allPrize*h.taxes_ratio).toFixed(2)},servePay:function(){var e=0;return this.currentOrder.forEach((function(r){r.project_service1.service_code&&(e+=r.project_service1.service_price*r.project_num),r.project_service2.service_code&&(e+=r.project_service2.service_price*r.project_num),r.project_service3.service_code&&(e+=r.project_service3.service_price*r.project_num)})),e}}),methods:{calcEms:function(){var e=this;return a(n.default.mark((function r(){var t,c,o,s;return n.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t=e,r.prev=1,c={pjc:[],prc:[],pjn:[]},e.currentOrder.forEach((function(e){c.pjc.push(e.project_code),c.prc.push(e.project_spec.id),c.pjn.push(e.project_num)})),o={goods_code:c.pjc.join(","),user_id:c.prc.join(","),goods_num:c.pjn.join(","),user_address_code:e.currentAddress.address_code},e.$ui.showloading(),r.next=8,e.$api.GetEmsPrice(o);case 8:s=r.sent,e.$ui.hideloading(),s.Success?t.allEms=s.Data:t.$ui.toast(s.Msg),r.next=16;break;case 13:r.prev=13,r.t0=r["catch"](1),console.log("请求结果false : "+r.t0);case 16:case"end":return r.stop()}}),r,null,[[1,13]])})))()},_switchWay:function(e){this.formParams.pay_type=e},handleClick:function(e){var r=e.index;0===r||this._sure(),this.modal=!1},loadAddress:function(e,r){var t=this;return a(n.default.mark((function e(){var c,o,s;return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c=t,e.prev=1,e.next=4,t.$api.GetAddressList({pageIndex:1,pageSize:100});case 4:o=e.sent,o.Success?(s=o.Data.Rows,s.length>0?(c.currentAddress=s[0],c.calcEms()):c.currentAddress="",c.skeletonShow=!1):c.$ui.toast(o.Msg),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),console.log("请求结果false : "+e.t0);case 11:r&&r();case 12:case"end":return e.stop()}}),e,null,[[1,8]])})))()},_switchAddress:function(){e.navigateTo({url:"/pages/features/adress/adress?action=switch"})},submit:function(e){var r=this;return a(n.default.mark((function e(){return n.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r.currentAddress){e.next=3;break}return r.$ui.toast("请选择地址"),e.abrupt("return");case 3:r._sure();case 4:case"end":return e.stop()}}),e)})))()},_sure:function(){var r=this;return a(n.default.mark((function t(){var c,o,s,a;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return c=r,t.prev=1,o={pjc:[],prc:[],pjn:[],cart:[]},r.currentOrder.forEach((function(e){o.pjc.push(e.project_code),o.prc.push(e.project_spec.id),o.pjn.push(e.project_num),o.cart.push(e.cart_code)})),r.formParams.goods_code=o.pjc.join(","),r.formParams.skus_code=o.prc.join(","),r.formParams.goods_num=o.pjn.join(","),r.formParams.user_address_code=r.currentAddress.address_code,1==r.formParams.create_order_type&&(r.formParams.cart_code=o.cart.join(",")),s=[],r.currentOrder.forEach((function(e){var r=[];r.push(e.project_service1.service_code?e.project_service1.service_code:""),r.push(e.project_service2.service_code?e.project_service2.service_code:""),r.push(e.project_service3.service_code?e.project_service3.service_code:""),s.push(r.join(","))})),r.formParams.goods_service_code=s,r.$ui.showloading("订单生成中"),t.next=15,r.$api.CreateOrder(r.formParams);case 15:a=t.sent,r.$ui.hideloading(),a.Success?(c.payParams.order_num=a.Data.order_code,c.$ui.toast("订单创建成功"),setTimeout((function(){c._readyToPay(a.Data.order_code)}),500)):(c.$ui.toast(a.Msg),e.redirectTo({url:"/pages/features/order/orderList/orderList"})),t.next=23;break;case 20:t.prev=20,t.t0=t["catch"](1),console.log("请求结果false : "+t.t0);case 23:case"end":return t.stop()}}),t,null,[[1,20]])})))()},_readyToPay:function(e){this.oderId=e;this.$refs.payPanel._show(e)},success:function(){console.log(this.formParams),e.redirectTo({url:"/pages/activity/activity"})},cancel:function(){e.redirectTo({url:"/pages/features/order/orderDetail/orderDetail?code="+this.oderId})}}};r.default=v}).call(this,t("543d")["default"])},"9e0d":function(e,r,t){"use strict";var n={PayPanel:function(){return t.e("components/PayPanel/PayPanel").then(t.bind(null,"d1e2"))}},c=function(){var e=this,r=e.$createElement;e._self._c},o=[];t.d(r,"b",(function(){return c})),t.d(r,"c",(function(){return o})),t.d(r,"a",(function(){return n}))},"9e7e":function(e,r,t){"use strict";t.r(r);var n=t("9e0d"),c=t("bdf5");for(var o in c)"default"!==o&&function(e){t.d(r,e,(function(){return c[e]}))}(o);t("11f4");var s,a=t("f0c5"),i=Object(a["a"])(c["default"],n["b"],n["c"],!1,null,"1b0ed111",null,!1,n["a"],s);r["default"]=i.exports},b539:function(e,r,t){},bdf5:function(e,r,t){"use strict";t.r(r);var n=t("54b3"),c=t.n(n);for(var o in n)"default"!==o&&function(e){t.d(r,e,(function(){return n[e]}))}(o);r["default"]=c.a}},[["118a","common/runtime","common/vendor"]]]);