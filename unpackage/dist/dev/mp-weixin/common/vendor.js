(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 5);

/***/ }),
/* 5 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 6);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 6 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 7 */
/*!********************************!*\
  !*** G:/work/马桶福利购/pages.json ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!*****************************************!*\
  !*** G:/work/马桶福利购/utils/http/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _interface = _interopRequireDefault(__webpack_require__(/*! ./interface */ 12));


var _auth = _interopRequireDefault(__webpack_require__(/*! ../module/auth.js */ 16));
var _SET = _interopRequireDefault(__webpack_require__(/*! ../../SET.js */ 15));

var _business = _interopRequireDefault(__webpack_require__(/*! ../module/business.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

// 集合部分升星
// import LevelUp from '../module/levelUp.js'

/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 
 */

// 单独导出(测试接口) import {test} from '@/common/vmeitime-http/'
// export const test = (data) => {
// 	// /* http.config.baseUrl = "http://localhost:8080/api/"
// 	//设置请求前拦截器 若设置会覆盖全局
// 	http.interceptor.request = (config) => {
// 		config.header = {
// 			"token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
// 		}
// 		console.log('个性化request....');
// 		// return config
// 	} 
// 	//设置请求结束后拦截器
// 	http.interceptor.response = (response) => {
// 		console.log('个性化response....')
// 		//判断返回状态 执行相应操作
// 		return response; 
// 	}
//     return http.request({
// 		// baseUrl: 'https://unsdaf.net.cn/',
//         url: 'ajax/echo/text?name=uni-app',
// 		dataType: 'text',
//         data,
//     })
// }
// 


// 默认全部导出  import api from '@/common/vmeitime-http/'
var _default = _objectSpread({},
_auth.default, {},
_business.default, {
  // ...LevelUp,
  baseUrl: _SET.default.baseUrl,
  mainUrl: _SET.default.mainUrl });


// export const baseUrl = 'http://taobao.fjdmll.com'
exports.default = _default;

/***/ }),
/* 12 */
/*!*********************************************!*\
  !*** G:/work/马桶福利购/utils/http/interface.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



var _index = _interopRequireDefault(__webpack_require__(/*! ../../store/index.js */ 13));
var _SET = _interopRequireDefault(__webpack_require__(/*! ../../SET.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                          * 通用uni-app网络请求
                                                                                                                                                          * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
                                                                                                                                                          */var _default = { config: { // baseUrl: "https://hp.fjhjc.net/Data",
    baseUrl: _SET.default.baseUrl,

    // baseUrl: "https://testapi.kuxiong999.com",   //测试连接
    header: {
      'Content-Type': 'application/json;charset=UTF-8'
      // 'Content-Type':'application/x-www-form-urlencoded'
    },
    data: {},
    method: "GET",
    dataType: "json",
    /* 如设为json，会对返回的数据做一次 JSON.parse */
    responseType: "text",
    success: function success() {},
    fail: function fail() {},
    complete: function complete() {

    } },

  interceptor: {
    request: function request(config, ifLoad) {
      var value = uni.getStorageSync('hepai_token');
      // console.log(value)
      if (value) {
        config.header.Authorization = value;
      }
      return config;
    },
    response: function response(_response, ifLoad) {
      var statusCode = _response.statusCode;
      var that = this;
      // console.log(response)
      // 一般在这里做全局的错误事件处理
      if (statusCode === 200) {//成功
        return _response.data;
      } else if (statusCode === 401) {
        // if (true) {	
        if (!_index.default.state.hasLogin) return;
        uni.showModal({
          title: ' 洁利来商城提醒您',
          content: '登陆状态失效,请重新登陆',
          showCancel: false,
          success: function success(res) {
            if (res.confirm) {
              uni.removeStorageSync('hepai_token');
              uni.removeStorageSync('user');
              uni.navigateTo({
                url: '/pages/role/login/login' });

            }
          } });

        return '权限失效';
      } else if (_response.errMsg == "request:fail abort") {






        var ifLock = uni.getStorageSync('errlock');
        console.log(ifLock);
        // uni.setStorageSync('errlock',false)
        if (!ifLock) {
          uni.setStorageSync('errlock', true);
          setTimeout(function () {
            uni.navigateTo({
              url: '/pages/errors/errors' });


          }, 1000);

        }


        return '请检查网络';
      } else {

        return '未知错误';
      }

    } },

  request: function request(options, ifLoad) {var _this = this;
    var that = this;
    if (!options) {
      options = {};
    }
    options.baseUrl = options.baseUrl || this.config.baseUrl;
    options.dataType = options.dataType || this.config.dataType;
    options.url = options.baseUrl + options.url;
    options.data = options.data || {};
    options.method = options.method || this.config.method;
    options.timeout = 10000;
    // console.log('执行')

    return new Promise(function (resolve, reject) {
      var _config = null;

      options.complete = function (response) {
        var statusCode = response.statusCode;
        // console.log(response)
        // response.config = _config
        if (_this.interceptor.response) {
          // reject('没有权限')
          var re = _this.interceptor.response(response, ifLoad);
          // console.log(re)
          if (re === '权限失效') {
            reject('权限失效');
            return;
          } else if (re === '请检查网络') {
            reject('请检查网络');
            return;
          } else if (re === '未知错误') {
            reject('未知错误');
            return;
          } else {
            resolve(re);
          }
        }

      };

      _config = Object.assign({}, _this.config, options);
      _config.requestId = new Date().getTime();
      // console.log(_config)
      if (_this.interceptor.request) {
        var re = _this.interceptor.request(_config, ifLoad);
        _config = re;
      }


      uni.request(_config);
    });
  } };



/**
        * 请求接口日志记录
        */exports.default = _default;
function _reqlog(req) {
  if (true) {
    // console.log("【" + req.requestId + "】 地址：" + req.url)
    if (req.data) {
      // console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
    }
  }
  //TODO 调接口异步写入日志数据库
}

/**
   * 响应接口日志记录
   */
function _reslog(res) {
  var _statusCode = res.statusCode;
  if (true) {
    // console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
    if (res.config.data) {

    } // console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
    // console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
  }
  //TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
  switch (_statusCode) {
    case 200:
      break;
    case 401:
      break;
    case 404:
      break;
    default:
      break;}

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */
/*!************************************!*\
  !*** G:/work/马桶福利购/store/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 14));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    /**
            * 是否需要强制登录
            */
    forcedLogin: false,
    hasLogin: false,
    userInfo: {}, //用户微信获得基本信息
    accountInfo: {}, //账户基本信息
    merchantInfo: {}, //店铺基本信息
    levelAccount: {}, //渠道个人信息
    config: {},
    currentChannel: 0, //1聚友之家  2粉丝空间 3vip空间
    cards: {}, //购物车
    currentOrder: [], //创建订单
    currentPro: {},
    currentRoleCode: '' //聚友空间当前的账户身份的 code
  },
  mutations: {
    login: function login(state, userName) {
      console.log('login_STORE');
      state.hasLogin = true;
    },
    logout: function logout(state) {
      state.hasLogin = false;
      state.accountInfo = {}; //账户基本信息
      state.merchantInfo = {}; //店铺基本信息
      state.levelAccount = {}; //渠道个人信息
    },
    setRoleCode: function setRoleCode(state, info) {
      // console.log('储存信息1')
      state.currentRoleCode = info;
    },
    setUserInfo: function setUserInfo(state, info) {
      // console.log('储存信息1')
      state.userInfo = _objectSpread({}, info);
    },
    setAccountInfo: function setAccountInfo(state, info) {
      // console.log('储存信息2')
      state.accountInfo = _objectSpread({}, info);
    },
    setConfig: function setConfig(state, info) {
      // console.log('储存信息2')
      state.config = _objectSpread({}, info);
    },
    setMerchantInfo: function setMerchantInfo(state, info) {
      // console.log('储存信息2')
      state.merchantInfo = _objectSpread({}, info);
    },
    setCurrentChannel: function setCurrentChannel(state, info) {
      state.currentChannel = info;
    },
    setLevelAccountInfo: function setLevelAccountInfo(state, info) {
      state.levelAccount = info;
    },
    addCard: function addCard(state, item) {

      state.cards = Object.assign(state.cards, item);
      // console.log(state.cards)
    },
    creatOrder: function creatOrder(state, items) {
      state.currentOrder = _toConsumableArray(items);
      // debugger
    },
    completeOrder: function completeOrder(state) {
      state.currentOrder = new Array();
    },
    currenPro: function currenPro(state, items) {
      state.currentPro = _objectSpread({}, items);
    } },

  getters: {
    cardsProduct: function cardsProduct(state) {
      // console.log(state.cards)
      // let arr = Object.values(state.cards)  不能用额
      // let arr = Object.keys(state.cards) 
      // let res = []
      // arr.forEach(item=>{
      // 	res.push(state.cards[item])
      // })
      // console.log(res)
      // return res
      return state.cards;
    } } });var _default =



store;exports.default = _default;

/***/ }),
/* 14 */
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),
/* 15 */
/*!****************************!*\
  !*** G:/work/马桶福利购/SET.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
// 全局设置
var _default = {
  baseUrl: "http://h5.gllo.com.cn/Data", //api业务接口域名
  mainUrl: "http://h5.gllo.com.cn/", //项目域名
  // 测试环境
  // wx_appid: 'wx09daee2f47e178aa',    //微信授权 appid  測試公衆號
  wx_appid: 'wxbb1e69472b847c6e', //代码力量 测试
  // wx_redirect_url:'http://192.168.1.9:8080',
  wx_redirect_url: 'http://h5.gllo.com.cn', //微信授权 回调页地址

  versionUrl: '/api/AppVersion/VersionCheck' //app版本检测url   // 1是不更新 2是强制更新 3可选择更新 4//appstore更新
};exports.default = _default;

/***/ }),
/* 16 */
/*!******************************************!*\
  !*** G:/work/马桶福利购/utils/module/auth.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _interface = _interopRequireDefault(__webpack_require__(/*! ../http/interface */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 用户身份相关接口
// 我要积分
var Auth = { // 获取验证码
  getVerificateCode: function getVerificateCode(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Msg/SendVerificationCode',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 微信api
  GetWxJsApiConfig: function GetWxJsApiConfig(data) {
    return _interface.default.request({
      url: '/api/Authorize/GetJsApiConfig',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 登录
  userLogin: function userLogin(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/Token',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 快捷登录
  shortcutToken: function shortcutToken(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/ShortcutToken',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // OpenId登录
  WxTokenLogin: function WxTokenLogin(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/WxToken',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 注册用户 
  userRegiste: function userRegiste(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/Registe',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 忘记密码
  findPassword: function findPassword(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/FindPassword',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取用户信息
  getConsumer: function getConsumer(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Consumer/Get',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  //更新用户信息
  userInfoUpdate: function userInfoUpdate(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Consumer/PerfectInfo',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 设置支付密码
  SettingPayPassword: function SettingPayPassword(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Consumer/SettingPayPassword',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 微信绑定手机号
  BindWxUserMobile: function BindWxUserMobile(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/BindWxUserMobile',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 支付
  toPayment: function toPayment(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Pay/Payment',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 	=============商家部分\\\



  // 获取商家信息
  GetBusinessInfo: function GetBusinessInfo(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Shop/GetBusinessInfo',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 修改商家信息
  BusinessEditor: function BusinessEditor(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Shop/BusinessEditor',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  //=============== 全局=================

  // 获取全局配置
  getConfig: function getConfig(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Service/Config',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // app更新
  VersionCheck: function VersionCheck(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/AppVersion/VersionCheck',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 手机号登录
  MobileToken: function MobileToken(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/MobileToken',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  } };var _default =

Auth;exports.default = _default;

/***/ }),
/* 17 */
/*!**********************************************!*\
  !*** G:/work/马桶福利购/utils/module/business.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _interface = _interopRequireDefault(__webpack_require__(/*! ../http/interface */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 用户身份相关接口
var Set = {
  // 最后一个子订单是否退邮费
  ifLastSubOrder: function ifLastSubOrder(data) {
    return _interface.default.request({
      url: '/api/Order/GetChildIsSucceed',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 热门推荐
  GetGoodsList: function GetGoodsList(data) {
    return _interface.default.request({
      url: '/api/Project/GetGoodsList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 获取详情
  GetGoodsInfo: function GetGoodsInfo(data) {
    return _interface.default.request({
      url: '/api/Project/GetGoodsInfo',
      method: 'GET',
      data: data
      // handle:true
    });
  },
  // 优店
  GetMerchantList: function GetMerchantList(data) {
    return _interface.default.request({
      url: '/api/Shop/GetMerchantList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 获取店铺详情 及商品
  GetBusinessProjectList: function GetBusinessProjectList(data) {
    return _interface.default.request({
      url: '/api/Shop/GetBusinessProjectList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 获取分类列表
  GetClassList: function GetClassList(data) {
    return _interface.default.request({
      url: '/api/Project/GetClass',
      method: 'GET',
      data: data
      // handle:true
    });
  },
  // 根据分类获取 商品
  GetGoodsByClassList: function GetGoodsByClassList(data) {
    return _interface.default.request({
      url: '/api/Project/GetGoodsByClassList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 获取收货地址
  GetAddressList: function GetAddressList(data) {
    return _interface.default.request({
      url: '/api/Address/GetAddressList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 删除地址
  addressDel: function addressDel(data) {
    return _interface.default.request({
      url: '/api/Address/Del',
      method: 'GET',
      data: data
      // handle:true
    });
  },
  // 设置默认地址
  DefaultAddress: function DefaultAddress(data) {
    return _interface.default.request({
      url: '/api/Address/DefaultAddress',
      method: 'GET',
      data: data
      // handle:true
    });
  },
  // 获取拍品信息
  GetAuctionProject: function GetAuctionProject(data) {
    return _interface.default.request({
      url: '/api/Project/Get',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 获取充值列表
  RechargeList: function RechargeList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Recharge/RechargeList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 生成充值订单
  Recharge: function Recharge(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Recharge/Recharge',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 新建地址
  addAddress: function addAddress(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Address/Add',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 确认拍品
  verifyAuction: function verifyAuction(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/Verify',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 不要改拍品
  NoVerifyAuction: function NoVerifyAuction(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/NoVerify',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 客户获取订单
  GetOrderList: function GetOrderList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetOrderList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 购买加价

  doAuction: function doAuction(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Auction/Auction',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 竞价记录

  GetAuctionList: function GetAuctionList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Auction/GetAuctionList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 发起退货申请

  ApplyRefund: function ApplyRefund(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Refund/Apply',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 确认拍品
  Receiving: function Receiving(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '	/api/Order/Receiving',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取银行卡列表

  GetBankList: function GetBankList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Bank/GetBankList',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 添加新卡
  BuilderBank: function BuilderBank(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Bank/BuilderBank',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 默认银行卡
  DefaultBank: function DefaultBank(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Bank/DefaultBank',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 解绑银行卡
  RelieveBank: function RelieveBank(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Bank/RelieveBank',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 申请提现
  SubmitCash: function SubmitCash(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Cash/SubmitCash',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 实名认证
  SubmitProve: function SubmitProve(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Consumer/Prove',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 问题反馈
  SubmitComment: function SubmitComment(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Feedback/Submit',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 余额明细
  AccountList: function AccountList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/AccountDetail/GetList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 关注列表
  GetAttentionList: function GetAttentionList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Shop/GetAttentionList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 关注店铺
  Attention: function Attention(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Shop/Attention',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 合家慈登陆账户
  GetHJCConsumer: function GetHJCConsumer(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Recharge/GetHJCConsumer',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 合家慈积分转化
  HJCIntegralRecharge: function HJCIntegralRecharge(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Recharge/HJCIntegralRecharge',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 提醒发货
  Prompt: function Prompt(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/Prompt',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },



  // 插卡内流信息
  GetEMS: function GetEMS(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetEMS',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取文档
  getGuide: function getGuide(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Service/Guide',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 加入购物车
  cardAdd: function cardAdd(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Catr/Add',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取购物车列表
  cardList: function cardList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Catr/GetList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 刪除購物車
  cardDelete: function cardDelete(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Catr/Delect',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 提交订单
  CreateOrder: function CreateOrder(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/CreateOrder',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 删除订单

  CancelOrder: function CancelOrder(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/CancelOrder',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 计算邮费

  GetEmsPrice: function GetEmsPrice(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetEmsPrice',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 获取退款列表

  GetRefundOrderList: function GetRefundOrderList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetRefundOrderList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // 获取退款详情
  GetRefundOrderInfo: function GetRefundOrderInfo(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Order/GetRefundInfo',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 取消退款申请
  CancelRefund: function CancelRefund(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Refund/Cancel',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 删除退款申请
  DelectRefund: function DelectRefund(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Refund/Delect',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 物流确认
  RefundEms: function RefundEms(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Refund/RefundEms',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },
  // 获取着陆页分类商品
  GetClassHotList: function GetClassHotList(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Project/GetClassHotList',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },

  // code获取OpenId
  GetOpenId: function GetOpenId(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Authorize/GetOpenId',
      method: 'POST',
      data: data
      // handle:true
    }, ifLoad);
  },


  // 模拟下单
  mockPay: function mockPay(data) {var ifLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return _interface.default.request({
      url: '/api/Pay/getNotify',
      method: 'GET',
      data: data
      // handle:true
    }, ifLoad);
  },




  // 	=============商家部分\\\


  // 商家 发布拍品/重新发布
  shopSubmit: function shopSubmit(data) {
    return _interface.default.request({
      url: '/api/shop/Submit',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 商家获取商家订单
  GetBusinessList: function GetBusinessList(data) {
    return _interface.default.request({
      url: '/api/Order/GetBusinessList',
      method: 'POST',
      data: data
      // handle:true
    });
  },


  // 商家同意退款
  agreeRefund: function agreeRefund(data) {
    return _interface.default.request({
      url: '/api/Order/Refund',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 商家获取订单详情
  getOrderDetail: function getOrderDetail(data) {
    return _interface.default.request({
      url: '/api/Order/Get',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 商家发货
  merchantDispatch: function merchantDispatch(data) {
    return _interface.default.request({
      url: '/api/Order/Dispatch',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 商家成交纪录列表
  GetAccomplishList: function GetAccomplishList(data) {
    return _interface.default.request({
      url: '/api/Project/GetAccomplishList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 我的拍品
  GetConsumerList: function GetConsumerList(data) {
    return _interface.default.request({
      url: '/api/Project/GetConsumerList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 商品管理
  GetMerchantProduct: function GetMerchantProduct(data) {
    return _interface.default.request({
      url: '/api/Shop/GetList',
      method: 'POST',
      data: data
      // handle:true
    });
  },
  // 商家获取拍品信息
  merchantProductInfo: function merchantProductInfo(data) {
    return _interface.default.request({
      url: '/api/Shop/Get',
      method: 'GET',
      data: data
      // handle:true
    });
  },

  // 商家下架商品
  SoldOut: function SoldOut(data) {
    return _interface.default.request({
      url: '/api/Project/SoldOut',
      method: 'POST',
      data: data
      // handle:true
    });
  },

  // 商家下架商品
  GetBusinessAddress: function GetBusinessAddress(data) {
    return _interface.default.request({
      url: '/api/Address/GetBusiness',
      method: 'GET',
      data: data
      // handle:true
    });
  },

  // 商家营业执照
  BusinessProve: function BusinessProve(data) {
    return _interface.default.request({
      url: '/api/Shop/BusinessProve',
      method: 'POST',
      data: data
      // handle:true
    });
  },


  // 商家限时购列表
  LimitActivityGoods: function LimitActivityGoods(data) {
    return _interface.default.request({
      url: '/api/LimitActivityGoods/GetGoodsList',
      method: 'POST',
      data: data
      // handle:true
    });
  } };var _default =


Set;exports.default = _default;

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 21 */
/*!******************************************!*\
  !*** G:/work/马桶福利购/static/defaultSet.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var set = {
  "service_mobile": "059183612095",
  "rechargeStatus": [{
    "Value": "0",
    "Text": "待支付" },

  {
    "Value": "1",
    "Text": "已支付" }],


  "projectStatus": [{
    "Value": "0",
    "Text": "待审核" },

  {
    "Value": "1",
    "Text": "已上架" },

  {
    "Value": "2",
    "Text": "未通过" },

  {
    "Value": "9",
    "Text": "已下架" }],


  "payType": [{
    "Value": "0",
    "Text": "微信" },
  {
    "Value": "1",
    "Text": "支付宝" },
  {
    "Value": "2",
    "Text": "购物券" }],

  "detailType": [{
    "Value": "0",
    "Text": "余额收入明细" },
  {
    "Value": "1",
    "Text": "余额支出明细" },
  {
    "Value": "2",
    "Text": "购物券券收入明细" },
  {
    "Value": "3",
    "Text": "购物券券支出明细" }],

  "orderStatus": [{
    "Value": "0",
    "Text": "待付款" },
  {
    "Value": "1",
    "Text": "待发货" },
  {
    "Value": "2",
    "Text": "待收货" },
  {
    "Value": "3",
    "Text": "待评价" },
  {
    "Value": "4",
    "Text": "待退款" },
  {
    "Value": "5",
    "Text": "交易成功" },
  {
    "Value": "9",
    "Text": "交易关闭" }],

  "orderRefund": [],
  "auditStatus": [{
    "Value": "0",
    "Text": "待商家审核" },
  {
    "Value": "1",
    "Text": "待商家收货" },
  {
    "Value": "2",
    "Text": "商家拒绝" },
  {
    "Value": "3",
    "Text": "商家通过审核" },
  {
    "Value": "4",
    "Text": "用户取消退款" },
  {
    "Value": "5",
    "Text": "商家退款成功" }],

  "refundType": [{
    "Value": "0",
    "Text": "退款 " },
  {
    "Value": "1",
    "Text": "退货退款" }],

  "refundPayStatus": [{
    "Value": "0",
    "Text": "待支付" },
  {
    "Value": "1",
    "Text": "支付成功" },
  {
    "Value": "2",
    "Text": "支付失败" }],

  "refundPayType": [{
    "Value": "1",
    "Text": "原路返回" },
  {
    "Value": "2",
    "Text": "线下支付" },
  {
    "Value": "3",
    "Text": "退到预付款" }],

  "classList": [{
    "class_code": "174a73b64ed840e3889029b3cb917357",
    "class_name": "感应洁具",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/4F2A13B32488DF889250C2F0A77724AD.png",
    "class_descript": "感应洁具" },
  {
    "class_code": "40df750b4e2149c08698d2a2292275f3",
    "class_name": "水龙头",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/545B0CA76C593F1A2D2288D85C72677.png",
    "class_descript": "水龙头" },
  {
    "class_code": "58bacbcdc23245e48e3f54edfd70e8b4",
    "class_name": "马桶",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/9D2F051FAEFD0B26B5CDF8A3D45D1AF.png",
    "class_descript": "马桶" },
  {
    "class_code": "6a5be108765441fea4c3f3342e956d1e",
    "class_name": "花洒系列",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/D55C1CC49E92B48618E1E870C4814C8F.png",
    "class_descript": "花洒系列" }],

  "fatherClassList": [{
    "class_code": "174a73b64ed840e3889029b3cb917357",
    "class_name": "感应洁具",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/4F2A13B32488DF889250C2F0A77724AD.png",
    "class_descript": "感应洁具" },
  {
    "class_code": "40df750b4e2149c08698d2a2292275f3",
    "class_name": "水龙头",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/545B0CA76C593F1A2D2288D85C72677.png",
    "class_descript": "水龙头" },
  {
    "class_code": "58bacbcdc23245e48e3f54edfd70e8b4",
    "class_name": "马桶",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/9D2F051FAEFD0B26B5CDF8A3D45D1AF.png",
    "class_descript": "马桶" },
  {
    "class_code": "6a5be108765441fea4c3f3342e956d1e",
    "class_name": "花洒系列",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/D55C1CC49E92B48618E1E870C4814C8F.png",
    "class_descript": "花洒系列" },
  {
    "class_code": "257eebee16c2456597ca8534ad4d283b",
    "class_name": "配件/挂件",
    "class_logo": "http://h5.gllo.com.cn/upload/shopclasslogo/2C1C7F5EF8FE405A40ADC8C9266D84BF.png",
    "class_descript": "配件" },
  {
    "class_code": "4a24ebc16e6d4ded86081ff77ba9acbe",
    "class_name": "其他",
    "class_logo": "",
    "class_descript": "" }],

  "banerList": [{
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/879686C29035716E179D52E99ECE9FAB.jpg",
    "Url": "/pages/classify/products/products?type=1",
    "Value": "龙头专区" },
  {
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/1FBCF99869ABE49D1EDE857C88FECB8.jpg",
    "Url": "/pages/classify/products/products?type=3",
    "Value": "花洒专区" },
  {
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/16062E891B0BE58D24DAE4CFCD75937.jpg",
    "Url": "/pages/classify/products/products?type=2",
    "Value": "智能马桶专区" }],

  "iconList": [{
    "Value": "4",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/4E6F28FC8DED157F5BEC9AA8D61CEA6.png" },
  {
    "Value": "3",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/81C9925C9E4D12E6E481973631E3C6C.png" },
  {
    "Value": "2",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/D1FD9EBE70E47F7499107E7471915150.png" },
  {
    "Value": "1",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/38241656FDA8C4F844B265653BAC373.png" }],

  "indexGoodsList": [{
    "Value": "4cb5889c315540b4aa4e7ec16d166de0",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/23419D3FCFF41D17E540747DF9FF6.jpg" },
  {
    "Value": "722f992f104e4e1f91505ff255b61e00",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/36BA0B571D368C3394C4437D6C6222.jpg" },
  {
    "Value": "bc1f6cefb75d4897ac3df86da02e2be5",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/77BC59FF848379C3BE525A4D35B79A9D.jpg" },
  {
    "Value": "6e13bf0a62c441b596a8df4ae272c457",
    "Text": "http://h5.gllo.com.cn/upload/cmslinkimage/26BDD6D99914250722CDE99210A9CCB.jpg" }],

  "project_service1": [{
    "Value": "d4863b21098648a1b5637f402c1af139",
    "Text": "送货入户",
    "price": 0.0 },
  {
    "Value": "4e858f482ef34c1d92cc7cd6d6207bc9",
    "Text": "上门安装",
    "price": 53.35 },
  {
    "Value": "5c7f30cfdb7d43af84e63745266901fb",
    "Text": "送货入户并安装",
    "price": 76.0 }],

  "project_service2": [{
    "Value": "c8c2a6efbc5d479c907a6c2e1ecee7e0",
    "Text": "全面保修二年",
    "price": 260.0 },
  {
    "Value": "b630b784555c49a4a33cb3996a0b5e50",
    "Text": "全面保修三年",
    "price": 288.0 }],

  "project_service3": [{
    "Value": "d9580f1dc11342ce9d3db79dd8ff6208",
    "Text": "意外保修三年",
    "price": 212.0 },
  {
    "Value": "fcfadfddb8e741d2bc52dfe6eeca878f",
    "Text": "意外保修二年",
    "price": 231.0 }],

  "pay_route": [{
    "Value": "CCB",
    "Text": "建设银行" },
  {
    "Value": "test",
    "Text": "测试" }],

  "is_refund": [{
    "Value": "0",
    "Text": "未退款" },
  {
    "Value": "1",
    "Text": "退款中" },
  {
    "Value": "2",
    "Text": "退款失败" },
  {
    "Value": "3",
    "Text": "退款成功" },
  {
    "Value": "4",
    "Text": "取消退款" }] };var _default =



set;exports.default = _default;

/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/*!******************************************!*\
  !*** G:/work/马桶福利购/static/img/dd_df.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 59 */
/*!*******************************************!*\
  !*** G:/work/马桶福利购/static/img/dd_dfh.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAFmlJREFUeAHtXU2sZMdV7u4ZJ2OcYR9rFCFCULZIEWIBSCwISqx45FgEjB2LZMHKAwoLdiRKEBJGQgjGK4QyyHLAdrAtBzkh40UQsCCENSCFIBRZwyKrMEOcOO91c77vnK9u3br3vu5bfd9j4arRu+fcU+f3O1XVt/v1zKxWbTQEGgINgYZAQ6Ah0BBoCDQEGgINgYZAQ6Ah0BBoCDQEGgINgYZAQ6Ah0BBoCDQEGgINgYZAQ6Ah0BBoCDQEGgINgYbAUgisl3KU+7nxxteurd/64fXdevXQard6r809uFrt3pXrLMnvdqvV2ioBxRAPOjZ2pri2SVAM8aA1o87f+p7FurNar75lYV/bXb7v1ZvXfuGNmvhn2dRVNOHxd759+8E3T1afNag/YdhdmnK+s66v7Q/o+IAl5uRB/Li+fIFi7PO/vH4/3/4dU+pdRvNbr07N7tb9lzef+cP3fPBOz+CIG0fkCAcy/a3/vP3wdrt9zlpwVbJJWiJQ9g87Cbsr7ahCobgdxCnt5Wtixw4A3+vfIkoHwcWDHjLOqN+m7m42myf+5Mc/+KVDXO3TQaijx43/+Opvrta7Pzb8Noc4K/AemAz7c/aROvTXR7w8gkv9Mt4goYUFZfzS/Waz2q5260/d/Ilf+tNybu790Q1+6ptfedhOxlcs6dTc/Udgfwn37/YfsX50q4nl3dB+fz77YBtm2EUd2u6P1/fXv/P8N+v11l7bH3nmfR86aifDd/V4yl5zdz/Y/rsdp1fTk82Yt3KLlEu4qHAwbfZ6kKH7QkGt1glZuBvLqC/bZzAIYAbKAZ7Eg46N+vrvbq5cev8zR7wmp103ltc+2foH28+yuVDMitPTKSh/thk1nupBc1O4wA/xDkp+u3WZ0Z39uL1T8NDBAM1t5Q9z4DXEgpK3iyiYHXILSh56Wb7J2USABeu/SoyVeAUVNrNNb3zzy9dOd6v/MiAuDYyBFpGOGfERbf8RNvBYCAqHbI9kUBUfAblqjFeXi+nj8ynSW7J+e7q2tyM/dvN9H656C1W9g7fbzXV7FLhEbAEoiiKwxgNAXEDxkxdsvL24UAaa89STH1Fz4H1xSt4uoqlproTAXSMhk1zUNXpX5mCSlE/wSYm52B3o2A+KpE4UDAJZ3HIOfNjmNee85mkof7v1JWINlxWjvsG77UOpVhydFhzHp/9YA8iDMtNEkSPrD8q6DXzRdKybTDyaxGMPTcIPhijYLAZ42omGHu1pONSnu/BBlQghwD02QoZvxAQPip9zrn9rWDOvisvlChuarO0TKuFAQe9Gy9Vb6eD6g9J4PM25vjfP+NRE8dP+PIa8Qw8JSR9ynQTgM9e8ochNOGe28WDHGYTHAnB3SY8hwrTH+3K1GcX3XPo5yhD07PrtJQSfBlaN6gZbtAeVsD8k4r2q5wC5ZJBAjPWe4+My1y8RK/XtPbargMIXsDZe/Zcv+S/9ObyddOA/dcf9pyBkhpdBfeZQMmiLB8Uo45X5dJmN65sD+6i3blQ32F470mfLvrptFeqYw+rniu8gPys9B8CBgN4AAPmSf+g4Fu7WVxO67vfltXBon5EzCCl0fcUkp6MfjIQa1DHy+Kr1vOq3l4CEtUc//FrdYBTT+3A+B1x8UH+1sqbHTiE4BnICSXz0pzD3HWDKMW3VgYOWS3yn6JjrZuQHT8l4mAHF4A4zvtthzufz8K35Mt9yAbhTXv2iwEGXqD/zPoutbnBeCQDIj0yHGBpeobcjb1CacjfF1dug9rkuN2cGmHzCVLzsCnemYIawjSM+8eFPeXYUHtKku+vd6sbpRdTvScy/HtXgnT5rMGTJC2Gv2IQBQByhOx2hJiev+Tgzd92ZaZV421JJwhQC88PdFf7Ea8cN5uOInzpCB/YpaDBlPNStmqEi/jzrj1TmkvoGZ4DruBaAwN1lkU40Ug13ROAgIRK8nEJ+xrzUglLTLhKvsYDgUXHZAUpMqtxskcRr+iBf5tXpu2MURXO/ZPzF1J/FnsFWNzjtlghW3p+VA3QJamoAtDPEEj8my3V9Xr5AOWtil/l95zv0TcwcYhppcEn5NGY1E3Q/Of/69+cwplHdYO7GhKi51qYz1ovNHlL60wa+PfSUD2lj2U3J2BHsKG8EX92Nz1/lY8o9lPrR/fSSYVpqKQ0K/UEaWj3/X/UPEpoW1DcYPhOKAhtdHg5JRbV7plY99AB40g9eTcDTrvtwDfHJn4zDgP3ggvLcXB/pu0IZj5E5N5GB6hZFpj19j6OrvIiW8aUnCj2VAFmUoelZtLrBqTaGUwpBmaHxqSJTUtaRnixwO9gQMDX9PEau76+wKNylruvHPvxBmoeTrSgU9F5Y+jl1D31JJ4O8HPIclMGNB8WAOE8oRJjCUK2gGKhbMpfUX6sbnLJgQgC3O5LLHcb0onbwXMGZPqr33eQVineKYmPHomo6sEsGmN7j8oP7mOKDM5VxMeVshzF+ijniP9kFUyKOPCQzFfrL6jmP+suUDr2vb3ACDfB5waQqOAOwTIa9MYBAMRxwp7gvASobAp3YvGSpb4IUP/i0w21xcRNliyy39+bDpytQNwtR5uN60WTTY1zW4xWN5stM/VJTf2Y+i61uMIrohviOOqd7lmTqAUDc5m97+0emrGWPBnU83eDW3XGBgM9zyvXtl5JUdoqs7UQIGe5KfwwVOWJavkQhg7Qb4jvqnO7lzBNWrXPq72I1riHQEGgINAQaAg2BhkBDoCHQEDhfBPy5vSLGJ77+sn2UG4/9eA+YvdEv3Wku6ZuC3jhAV/xUMnizIR3o832oPmzAnPGf/+lHpsxpMvfyyX/GX9aIAa6Ix/e6kNkQn79NC0uSJeq/VVlf9ftgFaZCesUVHSFQdiGlAd5Rdi2TXJSK3TS7S7RTC43JBPq1n3JZgrIeJYS42UdjqlUU8XK+zJ9u7CJ34ObWX1vTUQ1Wxp4uPjzwEsY/+SEKWZ5duZnQWTVXDYWqZNSQrVPdDfwcI1BM+VAuuNdcBL6Q+pXHTFrdYG4gXhBRzQ0U2Ay75KBkiWG169jKxBlrhtkOTXyKl6kaq6O/Lz3ujjtSK0fHcxzJw3wuov66euobnP36rTt8HBH1IafCCGmC998HTyQtYEWhlvOFWe94LOaOuVX+3lDk4Emwlouuv7KQ6gYznkDHTgUfOxY49BqKacho1PEJwJCLdPvBA3SvWH7PlwALyA/54VuGS1LkO1FPCqjAF1B/bWlHNTjtHBUqasjwwScQoh5k6qj4mC/woV55hOv1HYWWH9Zr4dSCMGbHXA+tR3qiqI8PZZ7ZEvWP5XiIrLrBSDrtIPBqmkXlDrRiQX1YoWxuFMzjLUCAQn/aVc22Ww+mGzHoT75CAVguP5CrO/ZaUYLflw+Ryq2b99yXrL+2vuoG+1eNVbAX7+3zXhKeBLwY0Q4sJB64JSrbzh/+fjCanH1PN/t1n/RqQRizU7Mwx3yC4n74kuH1KA/UQ5tUrhjR+fUjbs2obrB/i8JDKu0pyuYYLNrxQ8TMEsd1dFrfmU5firNpHcuMWCCeN6MGhEmbyCe+Bs0lBV2Elwz3U3VLvkT9iFMzqhvcD9ZHnEfTev2WfS/501fu3zz7Zx949L/7+ofd/ca/vPTu77+5fnK3Ov2cnRjv0E4npETPIUwL5zC3B2n5d50PUjWlkfq5nD2/csen1REHEtc2X7YinlZG0K7uQ/Pp9OobbFGxJ30UGfnMp5/9uV9+ugs1n4uF8fST//BF29y7P0h7Rds5vhKBTM5jdMCqVo/jdUuGyIo/RbHkMed46bACxcAJlD/DhNQJr/KbiQ5kq/8CeKoJgYQEKPn16spu8+yBOexVwykgvwQpYlCWYu51M1sBwPP4Z1m4mAv8YIiSj5uUi3VOOaKp4mOeT9jGg5I3HdHR+tJGYuRZl/odjBrj8bU8YiB/60fsX/BYanzP8Ux/d8w8Y/ETN8SInbBUOPhhYyccoj7VDBXxaUfum0f+6jtjmIBo8eJRU3Gmm4l98vBr9Q7O4iegIZN8+/3Vxw9P42zN7+1OngQAeIrWk7QoLY8AYDKyCjEFsXl9ksFe/OR8BEGaSlWUU7qRQkF7tYavQ0n1DtbrhidoGeVL0nhb5b//8b/74vryZnfr1s9/7DuHJpTrPfH3L717xeauP8d4muT2tRvtXCGs+UWojs1wpiYgLOqzmKAciF/Uz67HvO/4M/yZE7hP5QSvkJIz1sxLdYPzI4X1maDDmfx9q/X26bdOV08//rUXZqWFgljc6QntzJsfyfKiQKKSL0h7R7TQF+LIjrwLxurP55FWz1+Rp9yKqn41VvLC7KDb+gYz6S5GD2veWHoSanVPrfjUPi8J/2YP3vqAYkCav+90CeZcHwtg8WEu5ZfvY60WvR1TWaKInfN+s2z9tfVVvwbnAbU6QXNeOjiiMECd13GFBuFHzQIVkE4dXGjhWOyA7ANqZksPC4CY+IMhOhYmrznnpbtE/fI1l1bvYBbifWOPWIRjYV2IpsX7VDZQMstwAAL7i+5F+v45qPkNAae6ee4sycxEYecWf5Y+I/dWUaaNySiRUuPPu/4s+iz2qAanVU00LG7QrR2omAPV0HGHe8zhPtlDKB85PyaDauwuLZRzabHFznNGWhrMP3KgTHkGPZf6FXwmrW4wGzK1dVBob4VjiZtQT5XBdw3qZ10+pbKhZiv9sfm+h/G7x//pyz+KmS/8zIf/Z1yjkyomJOIVP9V2gfV3mc3jjnoNxrcy8IPCRQWCKNOJ12B+cS3nU65CClSNdCo/ojARDyo+uZpgHnv9hUe3d7/7b/gBP6GWxFiDuf88DmrFuMj6U2IzmeodjIL1PlC8QNh3BFM/NVKbHUe2Dz++DeA4t0t/5QEBzanx5Osvvudkt31muzv9iF4S7JcXf/1rt5//m8vrzVPP/uLHvj1my1zCrefjLyvQHTtBJOM8arM/ikf/WYo19dNHxeWIHdztMDYADY8/eQHgy598l+a89HJZzqf58GmOsc2sbC2NDoEXdy9eeuz287/9w93Jv1oGH+mtAZiZDHPQgW5n6ZxigeY55Lx0Lqb+MsPD7qsbzKdG1A6wCLRTFZ1TpEId5UTQKMSE/YgHzXk6N0HInBtc9TZEE796+68+8PJXT79hH/H9kbl/oDxSoecvKasHoPPK66ffgI3sSyr/oKpb9MLqL5M68L76iKZ/NGNk8GiyOVKbRw99lUsZhth17iDfAdRwsaZNy08HUB+y9Z2r/fvJf3z16pv3/vf3DPwbprfROoJNzic34c7+ud6f2qzWX3/sb//y5v3veuB3P/+z1+9iQSp/xlRoOqMk5Rd3idDO9GW/RP3J+UxG2Mw0W61+5StfyEs+2774JKvfHoBvYGZPyWc7s9nCH7q32Vx+ZLc9uWlJXRvYj+gnH4Wy5fbGenP5xnZ78gp1MM8O2QxozSji19T/woceh9nsUb2DUeqhEX03eCOVYQlV7wiX0hQV0EHhCw2RzxLA1BjpmyIfg8Igx99E17anJ69Qpid+OAQfBQ/8T+UZ8sXr3xMvn65usH/Y5AjxiI1jFM7HjlQ/Xh0h8d2Rm6cEvg9h/+4Q/+4v+mc34OQFc/6AqI4V6wUKaU2AH36w1n/JuIj6kUfNqG4wmxMIqlGiSCTnE7be3xG8bQIoY9tw9BvCBoRKKJztX0qifXfeV8mgo9jqdL6lMR0LJNVktjt1Pc1LDw77/CL1u9vZ1/oG25Gl98H7ouKJs3fkATAA7Bc3F7gSZwC6bdZ/t0jXwRGo5jGG2ykHui/yUW6gnLdcwKaXDS4ACjjP54ULrp+BKy7VDWasABArW8fUeA79I9G3EDSFaPDhjz4yXr0X9YXBFlAVfrTLXGDG2S83Ep9++WFaZ/rvTSeXEaybDB8XVX+KP4OpbzAwFEqGNVe7+mVz3BUBgPjeDrEb7RC1KszpVTLUIl7zyXk45A4e+PNdCHv//bJT+jNdfq877MsjGmkrJvXt4k3EXVf3Rdbvkedf6xucxfLjzxpmxxYHwAYfAKqRogQvjkHojwPqII/Omy1ttKUZ1i6kRqI72rBqFij92X+D48ds9sVkkynfUh82sqWD4nIR9RchD76tbrBjG4jiiKQgYKDYeE0X6UR7bLpT6DiYOcTag/v0AX8/PrwhvnuVb9EafS8m6mPenqOXVsaHFPF9trzuq2e8/tLLYfdHNNjSyHYod4R21J7YMENDwrzDToAIO1Ab+kRI1G0FKtsVkIcDD2AT7mCgz/hp2oNkV5QhFy5WYk5V60XXn6V4MFvdYETwXQOAo2ERFjBQFvcl0f/vkP4uGRSEIZXthvchBMkdokF8CaCyb1TIQt0m3UABrFv438lSw8O2e0kxdXbV/TGU+QLFKMOrblHX13kz1Hcv3bVMjzPKXTe8D2FvrvNzCFffYAs6dcQCGh1DSAJ8/pRNHjs4QVikqoJEzT69sNIhIQ1Z2CZd3Ks1QTlnfK6T8dzhZqOGMUS4dXJ2PXP1q+rv5XP4TXWDCcrUEciWepuRCo8yNHRKHzvsiPl95SIsN6j6bc2VTPnl8bESfPH5KvA5+PD7fUd0txw6fSRwTP37apyar24wHKrgIW+SABVzRDenmOsdsR2Q1KeJy2g2cqTm9rJJFKZoZrggsUvcUi16FbzPpHpwm33Qwlri1IeB9ERzmfN2Xbp+OK4Y1Q3OixOWoBjcLUFxX674hHQgPnqEp12Extjqt/c8fuwDe+dBMUbtsWPYZZu3BcIcsFAwioR5ZCJG6FMnVMGjVurkq4JKfincnUv9WbhZbHWDDY9u6LwDtYH/BQ0oOg2AbCpfFFTMLmoeRQPE6M4cuIF0RcsFxIZYLnm8nB+4RwOz/Ep/jCujLOfEXkT9Kdg85ogGG9rRUB2XpIyv7gcF2DxmgdLIgFoGIBtnMjUQW4KetIMKQMfiu2oX37eVx1cuKd8iPy0G0Zr4XmUXXzFHqveFu6f+UbsDhPUNXq3vGerxv2KiG1mGqVsBKHaI/RFg0vRZZGkcOzKl77bpCCVusPEK0X4d2+7N9CGDX4yBvkVEyj6beB48VI98kwaE0u5spU9P51j/ZrW5F6nOJvUNXq/u2Kr8SUQsjzQ0UjJmxP4ZQMIbWFHGWbsIPFFIOp52YQOLgX966PRlKwqbcuRz4kWhm/Nj8T1/j6laQWm7cP27zeoOHVdcqr90Zwh8S/G0M0FzXvOpV8BDfRBNStNM7jPnpy0WnlGuE/nnOeV8ymKPfdKbYna7hPWUypS8vsGr1WtTTpt8cQSqsa5u8Hp9+VV7jTtdvJTmsIcAMAbWPeGMm+oGv/zoE29YnFszYjXVOgRuBdZV1tUNRrR3vuOdn7GHjbtVkZvRfgQMW2K8X3NS46gGP3/9sTub9foJe3bEB3ltLIgAMAW2wPgYt0c1GIFffvTXv2TviT7VmnxMG/q2xNIwJbb9qdl35muZ8dGX/uJh+57Tc/Y26OoyHt+mXuxYxs5dorlA8OgdrDYgoSv3XXm/PfX9eXu6FiqHUz4tG3bAcKnmIvpiOzgv5aMvPXdttzu5brKH7Oe9tqsftI9A4mPNXPPty1tD7xn6eH3Fhxiv4a3QMU/Lb18kW+UNgYZAQ6Ah0BBoCDQEGgINgYZAQ6Ah0BBoCDQEGgINgYZAQ6Ah0BBoCDQEGgL1CPwfPp7A90B4j8cAAAAASUVORK5CYII="

/***/ }),
/* 60 */
/*!*******************************************!*\
  !*** G:/work/马桶福利购/static/img/dd_dsh.png ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 61 */
/*!******************************************!*\
  !*** G:/work/马桶福利购/static/img/dd_th.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 62 */
/*!******************************************!*\
  !*** G:/work/马桶福利购/static/img/ic_dz.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 63 */
/*!******************************************!*\
  !*** G:/work/马桶福利购/static/img/ic_bz.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABD1JREFUaAXtmE1oXFUUgDOZxDRtgiFWBtNFycJqNwpOfkwyYkp/pmbAjQ1Z1BQnFSyI2kKhLlNoFlUwoLbQQpMSumhLCy1WWgcrEZo2ZJJVF62KBISYIlQ0iZKZTGb8TvpOuAnMZOa9zKuL9+Dl3HPe/fnuuefeczMlJd7jecDzgOcBzwMOPOB30NZR05aWlspAIFAzPT39r5OOSp00ttu2ubn5lWQy+avP53vU0NDQ39nZaduRPrsQdtu1trZuTSQSd2lfZ/QRq66u7hoeHv7LsOVVdHUCTU1Nzy0uLt6B7OXVdKzGz9jeHh8f/2n1t1y6ayEUDAY3An8DGIVPAH1B4TKZzDbeUSYZVls+0pUJtLe3lwFzmfd1CyoN/Lt4u7u0tDSKLWnZa9Lp9Lfsi4OWvqZwZQJzc3NnIIkoDfAfA39F9Hg8ft7v9+/C9qforIJs6K/klBJ9rafoE8CbfUD1KAigfcCfUl0kXk9Qp0JtlCfD4XBC9VyyqJsY+A+B+VoBgB8AfkV4cKS+mEqlRqjzvNSjziPCqnVsbGxS2+WSRVsB4PcB/6Ux+I2qqqoPDL0E+AAb+xY2hZ+l3JEvvPRVlBVobGx8k7D4jv41LEYp75yYmFjOum1tbdXz8/PD2F/jlSeJ5zvYE7efqPn9tZ0Bs3UvWRavxvi+yarzUDYpoTOjbThSy6lzHT1k2TKETjd1vtE6+cp1DSHJssTzTQZ/1gL4vaKiYi8h8ViBCCtZ9UHkbrXh+SPAX1S9ELluISRZlrAZAewlC+Bv5BuEzX0TCO9/jn5UbXj+M+CPqV6oXJcJSJZlYIldTVQJvBomnn80gdjYh5lgv9qAH6LOe8iM2gqVjkMoS5bdvxqejd0F/BcKCPQtTqWDTuClL8cTIMuepZ/lLIvnPyIkriqoSFZoB+E1RHFpxYGO19bW7uP2mTLr2Sk7mgBgx/FqVAcG/gSeP626SPbGqwBfo/iMZf+lsrIyEovF/rF0R8L2HpC7ysLCwgwTkIuaZNBzeP59k8a6+9/D9oJVp6Asa/aVrWx7BfB2mQE/X19fvyLLyqnEf12SzBR+hkm+VUiWzQZt2m2vAPA+TpVFOpM+MnjfD+DSaWKtzm3qtFiDJUlmAv+DOfh6lG2vgAWrcewLhUJVAsSptIHQumTAZ1itA8WAl/Fsr4A0ZhNPIeqkzPOAVy5lm0Uxnk9IZualzvjkvLi0Ae12wyrM4mltvl0LKvH8SU6losHLOLZDSBoDL7fMFQ+TkrP9N2Qf8J+u+FgExdEK8FPIIRKZ3CAX2KRTJKupSCTyR29vb7oIrF6X/0sP5DyFBgcHazgS90Cu/1m5PYlEeXl5LBqNZv3FLuceAP57NmrQbWpzPBgm0BtMm1nOeQoBv8Ws/DTKazHkXAGOwneA7uHVm6Tbc5Bf7AbcHtQbz/OA5wHPA54HPA+45oH/AGO2hfhPWNrHAAAAAElFTkSuQmCC"

/***/ }),
/* 64 */
/*!******************************************!*\
  !*** G:/work/马桶福利购/static/img/ic_sz.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABVJJREFUaAXtmE1oXFUUxzP5UmiCRMyiptJoBambKPmalIpBJJtAs9GNWAsmUXAppqgLG6xYjVqQ4kKTCH4h2G4s2SgiEYuZfFFCwSL4UdHShZJNCKQhyfj7P+8Z7kzfm7w3Q0HwXbhz7z33nP/533M/39TUpCmNQBqBNAJpBP7PEchUM/jOzs4D2D9OvoucCCuTyezk8/k/a2trv1hcXPy1Uh6JnPpOID8AiS8hcasvT1oHYwOMoeXl5a+T2kq/ogH09PR07ezsfF8teSOsQTATDy0sLCyZLG5ZH1fR9CCd6erqOkM7iDzOL1L/EPm26cQpsatD72nsHlQgtre3z1AeQp6PY286iWegu7v7SaL/iQO4XldXd5DI/WaASUpm8m6IX8bmFtkxC0fZD58mwahNojwwMLAH8m94NqcrJS8MZ3va8IQtH9aOUyYawOrq6kuAtjnga83Nza/HcVJOx2Fcczptzkc5k6K+2Esom822b21tXdZ6FQJr9djS0tLHRWgVNthTT4H7kcPdqK+vP5jL5a7EgYs9A5B/yyO/wFq1fRDHT1kdYRGQBSnJh3yVNfA6Y80AG/dh1uess8sToUPz8/M5D6dQnZ6ebmZjvoDgCGTuVQfkfqY4z4Z/e3h4eE2y0tTb25uF+A/IA05s6H4G9l2pXml71xkYHx+vhfy7ZgiZz6LIT05OPgL5SxB/hfwANk3KqkumPukYll8KU9gmk0/5tnZUuavCzMzMKMYdDmC9oaHhxTAwEYPkN+T9Yf2SqU86UYNw2OvOvsP5joIL5GUHwHPhNhyeNAQidGpubu6qta3UskFPl1kw/ejpjfME/Xcqqy6Z9KUjXdmo7Sdhy4fJ0DspDtYOK8vexICdAKTVGV5pamp6JwxEax69IPKOfMfIyMiqp/v51NTUVyyLFfT2SdftkxOeTlCVj7W1tREa7eRWcaB8nhyaImeAkd+Bo+fMCqCx2dnZDWv7JXpD1kbveAn5oEsy9Zke5RGvXqjKh3yZQBzExdqlZeQAUDxMDq54ABc588+VGnvtA1b3TisTFUq/D2LBCVXo9CryJZ9OJA7iEprKDSDU4L8mLDeAC5C9LsJEq5tp1IdLaCJaOueDpPP739qNv36fb1OqKV/y6eTiIC6hKXIAfGD8jZP3PKuJ/v7+4Bnhyax63io4nmDD3m5tKyVTn7UpCzaerMb5KOiJg7j4On693m+U1nH4KrKj5FZyO6eDbtjXyEVJNyynyjH095P36bThrD9ua16Rpz6hPhlC6nfZFIG4hvPR7pp/YSMOkSk4tyN76eAZ8QzO33c6642NjfeF3QXeRVYWE/J58qOjo6Pflvrt6+tr29zc/Al58KRm4M/ynPigVM9vRy4hUxocHJyivuLae3DwpvX5pQiJmKLry/26+qQTRl56Dtu+B1acbx/ihnrZaJl2JY85pl53Q3C8Qlqb/KY85mINQAPhzX4WUo+pDiE9p7OUebWrTeBmCFKOskdY4J7jLog89Xx/uy4hU+YJPQZwcBPLkT5CrK/a0n3QGHl90IzFxYw9AH0hMQD/5DjFkdcU11GUnsMoPODkI+7XmDBjD0DKLS0t+qC31+hejryXJa8mOYy9DuOq8xEbMvYeMETWatHfKhx197MfKvprEKx7OKJ/BDt4c4GV+G+VxAPQhmPN6tMvq0Ex5RcpqvpjSzikHBv35v+xJU98v3Zy815gMFFPC6nFTjocuJkP81m5HNvIKSbaAwYuR5AfkmOTVVoKQ1iVkJfPxEvIJ8qrUReVzuvEf69jozvkD/JZHmu/UKYpjUAagTQCaQTSCCSOwD8i3XsnQnS1iQAAAABJRU5ErkJggg=="

/***/ }),
/* 65 */
/*!******************************************!*\
  !*** G:/work/马桶福利购/static/img/ic_kf.png ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map