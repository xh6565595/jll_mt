(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/features/order/orderDetail/orderDetail"],{"32cf":function(e,t,n){"use strict";n.r(t);var a=n("e6f7"),r=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=r.a},"70b7":function(e,t,n){"use strict";n.r(t);var a=n("ef75"),r=n("32cf");for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n("9d99");var c,s=n("f0c5"),i=Object(s["a"])(r["default"],a["b"],a["c"],!1,null,"1e6acb99",null,!1,a["a"],c);t["default"]=i.exports},"8dc6":function(e,t,n){},"9d99":function(e,t,n){"use strict";var a=n("8dc6"),r=n.n(a);r.a},e6f7:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n("4795"));r(n("152e")),r(n("557d"));function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t,n,a,r,o,c){try{var s=e[o](c),i=s.value}catch(u){return void n(u)}s.done?t(i):Promise.resolve(i).then(a,r)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(a,r){var c=e.apply(t,n);function s(e){o(c,a,r,s,i,"next",e)}function i(e){o(c,a,r,s,i,"throw",e)}s(void 0)}))}}var s=function(){n.e("components/tui-skeleton/tui-skeleton").then(function(){return resolve(n("5649"))}.bind(null,n)).catch(n.oe)},i=function(){n.e("components/list-view/list-view").then(function(){return resolve(n("369d"))}.bind(null,n)).catch(n.oe)},u=function(){n.e("components/list-cell/list-cell").then(function(){return resolve(n("478d"))}.bind(null,n)).catch(n.oe)},l=function(){n.e("components/PayPanel/PayPanel").then(function(){return resolve(n("d1e2"))}.bind(null,n)).catch(n.oe)},d={data:function(){return{item:"",loading1:!1,loading2:!1,formParams:{order_code:"",ems_code:""},oderId:"",payParams:{pay_type:0,pay_source:0,order_num:""},skeletonShow:!0,showPickerStatus:!1,date:""}},onLoad:function(t){this.formParams.order_code=t.code,this.payParams.order_num=t.code;var n=this;e.$on("refresh_orderDetail",(function(){n.loadData()}))},onShow:function(){this.loadData()},computed:{statusText:function(){var e="";switch(parseInt(this.item.order_status)){case 0:e="请你尽快完成订单付款";break;case 1:e="卖家将在48小时内发货";break;case 2:e="商品已经在运送途中,请保持手机畅通";break;case 3:e="您已确认签收货物";break;case 4:e="等待商家退款";break;case 5:e="交易已成功";break;default:e="交易已关闭";break}return e},startDate:function(){return console.log(this.getDate("start")),this.getDate("start")},endDate:function(){return console.log(this.getDate("end")),this.getDate("end")}},components:{tuiListCell:u,tuiSkeleton:s,tuiListView:i,PayPanel:l},methods:{_kefuMenu:function(){this.$refs.kf.showModal()},_kefu:function(){var t=e.getStorageSync("global_Set_jll").service_mobile,n=this;this.$refs.kf.hideModal(),e.showModal({title:"GLLO健康智能马桶提醒你",content:"立即致电官方客服？",success:function(a){n.show=!1,a.confirm?e.makePhoneCall({phoneNumber:t}):a.cancel&&console.log("用户点击取消")}})},getDate:function(e){var t=new Date,n=t.getFullYear(),a=t.getMonth()+1,r=t.getDate();return"start"===e?n=n:"end"===e&&(n+=2),a=a>9?a:"0"+a,r=r>9?r:"0"+r,"".concat(n,"-").concat(a,"-").concat(r)},bindDateChange:function(t){var n=this,a=t.detail.value;e.showModal({title:"GLLO健康智能马桶提醒您",content:"你将延迟该订单的发货时间",success:function(e){e.confirm?(console.log("用户点击确定"),n._beLast(a)):e.cancel&&console.log("用户点击取消")}})},_beLast:function(e){var t=this;return c(a.default.mark((function n(){var r,o,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t,n.prev=1,o={order_code:t.formParams.order_code,delay_ems_time:e},n.next=5,t.$api.Delayed(o,!1);case 5:c=n.sent,c.Success?(r.$ui.toast("延迟发货成功"),setTimeout((function(){r.loadData()}),1e3)):r.$ui.toast(c.Msg),callback&&callback(),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})))()},sure:function(e){var t=this;return c(a.default.mark((function n(){var r,o,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t,n.prev=1,o={order_code:e},n.next=5,t.$api.Receiving(o,!1);case 5:c=n.sent,c.Success?(r.$ui.toast("收货成功"),setTimeout((function(){r.loadData()}),1e3)):r.$ui.toast(c.Msg),callback&&callback(),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})))()},prompt:function(e){var t=this;return c(a.default.mark((function n(){var r,o,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t,n.prev=1,o={order_code:e},t.$ui.showloading(),n.next=6,t.$api.Prompt(o);case 6:c=n.sent,t.$ui.hideloading(),c.Success?(r.$ui.toast("提醒发货成功"),r.refresh()):r.$ui.toast(c.Msg),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0);case 14:case"end":return n.stop()}}),n,null,[[1,11]])})))()},scan:function(t){e.navigateTo({url:"/pages/features/ems/ems?orderCode="+t})},_call:function(){e.makePhoneCall({phoneNumber:this.item.seller_phone})},_copy:function(t){e.setClipboardData({data:t,success:function(){this.$ui.toast("复制成功")}})},_refundDetail:function(t){e.navigateTo({url:"/pages/features/refundDetail/refundDetail?code="+t.refund_code})},_hrefStore:function(t){e.switchTab({url:"/pages/main/main"})},_hrefPro:function(t){e.navigateTo({url:"/pages/main/details/details?code="+t})},_refund:function(t){this.$store.commit("currenPro",t),0!=this.item.order_status&&(1==this.item.order_status?e.navigateTo({url:"/pages/features/refundApply/refundApply?type=0"}):e.navigateTo({url:"/pages/features/refundAction/refundAction"}))},imageLoad:function(e){this.$set(this.item,"load",!0)},loadError:function(e){this.item.project_img="/static/img/noPic.jpg"},loadData:function(e){var t=this;return c(a.default.mark((function n(){var r,o,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t,n.prev=1,o={order_code:t.formParams.order_code,share_user_id:""},n.next=5,t.$api.getOrderDetail(o,!1);case 5:c=n.sent,c.Success?(c.Data&&(r.item=c.Data,r.formParams.ems_code=c.Data.ems_code,r.oderId=c.Data.order_code),r.skeletonShow=!1):r.$ui.toast(c.Msg),e&&e(),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})))()},_readyToPay:function(){var e=this;this.$refs.payPanel._show(e.formParams.order_code)},cancelOrder:function(){var t=this;return c(a.default.mark((function n(){var r,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return r=t,n.prev=1,r.$ui.showloading(),n.next=5,t.$api.CancelOrder({order_code:r.payParams.order_num});case 5:o=n.sent,r.$ui.hideloading(),o.Success?(r.$ui.toast("取消成功"),setTimeout((function(){e.$emit("refresh_order"),e.navigateBack({})}),500)):r.$ui.toast(o.Msg),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](1),console.log("请求结果false : "+n.t0);case 13:case"end":return n.stop()}}),n,null,[[1,10]])})))()},success:function(){this.loadData()},cancel:function(){}}};t.default=d}).call(this,n("543d")["default"])},ef75:function(e,t,n){"use strict";var a={tuiSkeleton:function(){return n.e("components/tui-skeleton/tui-skeleton").then(n.bind(null,"5649"))},PayPanel:function(){return n.e("components/PayPanel/PayPanel").then(n.bind(null,"d1e2"))},accredit:function(){return n.e("components/accredit/accredit").then(n.bind(null,"7380"))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,e._f("orderStatusFilter")(e.item.order_status)),a=e._f("payTypeFilter")(e.item.pay_type);e.$mp.data=Object.assign({},{$root:{f0:n,f1:a}})},o=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}))},f65d:function(e,t,n){"use strict";(function(e){n("1f76");a(n("66fd"));var t=a(n("70b7"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["f65d","common/runtime","common/vendor"]]]);