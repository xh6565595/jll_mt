(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tui-upload/tui-upload"],{"150c":function(t,e,n){"use strict";var r=n("51ea"),i=n.n(r);i.a},5016:function(t,e,n){"use strict";n.r(e);var r=n("a713"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"51ea":function(t,e,n){},"6bed":function(t,e,n){"use strict";n.r(e);var r=n("fee7"),i=n("5016");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("150c");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=u.exports},a713:function(t,e,n){"use strict";(function(t){function n(t){if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(t=a(t))){var e=0,n=function(){};return{s:n,n:function(){return e>=t.length?{done:!0}:{done:!1,value:t[e++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,i,o=!0,s=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return o=t.done,t},e:function(t){s=!0,i=t},f:function(){try{o||null==r.return||r.return()}finally{if(s)throw i}}}}function r(t){return s(t)||o(t)||a(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function a(t,e){if(t){if("string"===typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}function o(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function s(t){if(Array.isArray(t))return u(t)}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c={name:"tuiUpload",props:{value:{type:Array,default:function(){return[]}},forbidDel:{type:Boolean,default:!1},forbidAdd:{type:Boolean,default:!1},serverUrl:{type:String,default:""},limit:{type:Number,default:3},fileKeyName:{type:String,default:"file"}},data:function(){return{imageList:[],statusArr:[]}},created:function(){this.imageList=r(this.value);var t,e=n(this.imageList);try{for(e.s();!(t=e.n()).done;){t.value;this.statusArr.push("1")}}catch(i){e.e(i)}finally{e.f()}},computed:{isShowAdd:function(){var t=!0;return(this.forbidAdd||this.limit&&this.imageList.length>=this.limit)&&(t=!1),t}},watch:{value:function(t,e){this.imageList=r(t);var i,a=n(this.imageList);try{for(a.s();!(i=a.n()).done;){i.value;this.statusArr.push("1")}}catch(o){a.e(o)}finally{a.f()}}},methods:{reUpLoad:function(t){var e=this;this.$set(this.statusArr,t,"2"),this.change(),this.uploadImage(t,this.imageList[t]).then((function(){e.change()})).catch((function(){e.change()}))},change:function(){var t=~this.statusArr.indexOf("2")?2:1;2!=t&&~this.statusArr.indexOf("3")&&(t=3),this.$emit("complete",{status:t,imgArr:this.imageList})},chooseImage:function(){var e=this;t.chooseImage({count:e.limit-e.imageList.length,success:function(n){for(var r=[],i=0;i<n.tempFilePaths.length;i++){var a=e.imageList.length;if(a>=e.limit){t.showToast({title:"最多可上传".concat(e.limit,"张图片"),icon:"none"});break}var o=n.tempFilePaths[i];r.push(o),e.imageList.push(o),e.statusArr.push("2")}e.change();for(var s=e.imageList.length-r.length,u=0;u<r.length;u++){var c=s+u;e.serverUrl?e.uploadImage(c,r[u]).then((function(){e.change()})).catch((function(){e.change()})):(e.$set(e.statusArr,c,"1"),e.change())}}})},uploadImage:function(e,n){var r=this,i=this;return new Promise((function(a,o){t.showLoading({mask:!0}),t.uploadFile({url:r.serverUrl,name:r.fileKeyName,header:{},formData:{},filePath:n,success:function(n){if(200==n.statusCode){var r=JSON.parse(n.data);r.Success?(r.Data&&(i.imageList[e]=r.Data),i.$set(i.statusArr,e,r.Data?"1":"3")):i.$set(i.statusArr,e,"3"),a(e)}else i.$set(i.statusArr,e,"3"),o(e);t.hideLoading()},fail:function(n){i.$set(i.statusArr,e,"3"),o(e),t.hideLoading()}})}))},delImage:function(t){this.imageList.splice(t,1),this.statusArr.splice(t,1),this.$emit("remove",{index:t}),this.change()},previewImage:function(e){this.imageList.length&&t.previewImage({current:this.imageList[e],loop:!0,urls:this.imageList})}}};e.default=c}).call(this,n("543d")["default"])},fee7:function(t,e,n){"use strict";var r,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tui-upload/tui-upload-create-component',
    {
        'components/tui-upload/tui-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6bed"))
        })
    },
    [['components/tui-upload/tui-upload-create-component']]
]);
