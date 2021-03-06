module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export freeze */
/* harmony export (immutable) */ __webpack_exports__["c"] = extend;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return create; });
/* harmony export (immutable) */ __webpack_exports__["g"] = bind;
/* unused harmony export lastId */
/* harmony export (immutable) */ __webpack_exports__["f"] = stamp;
/* unused harmony export throttle */
/* harmony export (immutable) */ __webpack_exports__["d"] = wrapNum;
/* harmony export (immutable) */ __webpack_exports__["m"] = falseFn;
/* harmony export (immutable) */ __webpack_exports__["a"] = formatNum;
/* harmony export (immutable) */ __webpack_exports__["l"] = trim;
/* harmony export (immutable) */ __webpack_exports__["k"] = splitWords;
/* harmony export (immutable) */ __webpack_exports__["e"] = setOptions;
/* unused harmony export getParamString */
/* unused harmony export template */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return isArray; });
/* harmony export (immutable) */ __webpack_exports__["j"] = indexOf;
/* unused harmony export emptyImageUrl */
/* unused harmony export requestFn */
/* unused harmony export cancelFn */
/* harmony export (immutable) */ __webpack_exports__["h"] = requestAnimFrame;
/* harmony export (immutable) */ __webpack_exports__["i"] = cancelAnimFrame;
/*
 * @namespace Util
 *
 * Various utility functions, used by Leaflet internally.
 */

var freeze = Object.freeze;
Object.freeze = function (obj) { return obj; };

// @function extend(dest: Object, src?: Object): Object
// Merges the properties of the `src` object (or multiple objects) into `dest` object and returns the latter. Has an `L.extend` shortcut.
function extend(dest) {
	var i, j, len, src;

	for (j = 1, len = arguments.length; j < len; j++) {
		src = arguments[j];
		for (i in src) {
			dest[i] = src[i];
		}
	}
	return dest;
}

// @function create(proto: Object, properties?: Object): Object
// Compatibility polyfill for [Object.create](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
var create = Object.create || (function () {
	function F() {}
	return function (proto) {
		F.prototype = proto;
		return new F();
	};
})();

// @function bind(fn: Function, …): Function
// Returns a new function bound to the arguments passed, like [Function.prototype.bind](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
// Has a `L.bind()` shortcut.
function bind(fn, obj) {
	var slice = Array.prototype.slice;

	if (fn.bind) {
		return fn.bind.apply(fn, slice.call(arguments, 1));
	}

	var args = slice.call(arguments, 2);

	return function () {
		return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
	};
}

// @property lastId: Number
// Last unique ID used by [`stamp()`](#util-stamp)
var lastId = 0;

// @function stamp(obj: Object): Number
// Returns the unique ID of an object, assigning it one if it doesn't have it.
function stamp(obj) {
	/*eslint-disable */
	obj._leaflet_id = obj._leaflet_id || ++lastId;
	return obj._leaflet_id;
	/* eslint-enable */
}

// @function throttle(fn: Function, time: Number, context: Object): Function
// Returns a function which executes function `fn` with the given scope `context`
// (so that the `this` keyword refers to `context` inside `fn`'s code). The function
// `fn` will be called no more than one time per given amount of `time`. The arguments
// received by the bound function will be any arguments passed when binding the
// function, followed by any arguments passed when invoking the bound function.
// Has an `L.throttle` shortcut.
function throttle(fn, time, context) {
	var lock, args, wrapperFn, later;

	later = function () {
		// reset lock and call if queued
		lock = false;
		if (args) {
			wrapperFn.apply(context, args);
			args = false;
		}
	};

	wrapperFn = function () {
		if (lock) {
			// called too soon, queue to call later
			args = arguments;

		} else {
			// call and lock until later
			fn.apply(context, arguments);
			setTimeout(later, time);
			lock = true;
		}
	};

	return wrapperFn;
}

// @function wrapNum(num: Number, range: Number[], includeMax?: Boolean): Number
// Returns the number `num` modulo `range` in such a way so it lies within
// `range[0]` and `range[1]`. The returned value will be always smaller than
// `range[1]` unless `includeMax` is set to `true`.
function wrapNum(x, range, includeMax) {
	var max = range[1],
	    min = range[0],
	    d = max - min;
	return x === max && includeMax ? x : ((x - min) % d + d) % d + min;
}

// @function falseFn(): Function
// Returns a function which always returns `false`.
function falseFn() { return false; }

// @function formatNum(num: Number, digits?: Number): Number
// Returns the number `num` rounded to `digits` decimals, or to 6 decimals by default.
function formatNum(num, digits) {
	var pow = Math.pow(10, (digits === undefined ? 6 : digits));
	return Math.round(num * pow) / pow;
}

// @function trim(str: String): String
// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
function trim(str) {
	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

// @function splitWords(str: String): String[]
// Trims and splits the string on whitespace and returns the array of parts.
function splitWords(str) {
	return trim(str).split(/\s+/);
}

// @function setOptions(obj: Object, options: Object): Object
// Merges the given properties to the `options` of the `obj` object, returning the resulting options. See `Class options`. Has an `L.setOptions` shortcut.
function setOptions(obj, options) {
	if (!obj.hasOwnProperty('options')) {
		obj.options = obj.options ? create(obj.options) : {};
	}
	for (var i in options) {
		obj.options[i] = options[i];
	}
	return obj.options;
}

// @function getParamString(obj: Object, existingUrl?: String, uppercase?: Boolean): String
// Converts an object into a parameter URL string, e.g. `{a: "foo", b: "bar"}`
// translates to `'?a=foo&b=bar'`. If `existingUrl` is set, the parameters will
// be appended at the end. If `uppercase` is `true`, the parameter names will
// be uppercased (e.g. `'?A=foo&B=bar'`)
function getParamString(obj, existingUrl, uppercase) {
	var params = [];
	for (var i in obj) {
		params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
	}
	return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
}

var templateRe = /\{ *([\w_-]+) *\}/g;

// @function template(str: String, data: Object): String
// Simple templating facility, accepts a template string of the form `'Hello {a}, {b}'`
// and a data object like `{a: 'foo', b: 'bar'}`, returns evaluated string
// `('Hello foo, bar')`. You can also specify functions instead of strings for
// data values — they will be evaluated passing `data` as an argument.
function template(str, data) {
	return str.replace(templateRe, function (str, key) {
		var value = data[key];

		if (value === undefined) {
			throw new Error('No value provided for variable ' + str);

		} else if (typeof value === 'function') {
			value = value(data);
		}
		return value;
	});
}

// @function isArray(obj): Boolean
// Compatibility polyfill for [Array.isArray](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
var isArray = Array.isArray || function (obj) {
	return (Object.prototype.toString.call(obj) === '[object Array]');
};

// @function indexOf(array: Array, el: Object): Number
// Compatibility polyfill for [Array.prototype.indexOf](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
function indexOf(array, el) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === el) { return i; }
	}
	return -1;
}

// @property emptyImageUrl: String
// Data URI string containing a base64-encoded empty GIF image.
// Used as a hack to free memory from unused images on WebKit-powered
// mobile devices (by setting image `src` to this string).
var emptyImageUrl = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

function getPrefixed(name) {
	return window['webkit' + name] || window['moz' + name] || window['ms' + name];
}

var lastTime = 0;

// fallback for IE 7-8
function timeoutDefer(fn) {
	var time = +new Date(),
	    timeToCall = Math.max(0, 16 - (time - lastTime));

	lastTime = time + timeToCall;
	return window.setTimeout(fn, timeToCall);
}

var requestFn = window.requestAnimationFrame || getPrefixed('RequestAnimationFrame') || timeoutDefer;
var cancelFn = window.cancelAnimationFrame || getPrefixed('CancelAnimationFrame') ||
		getPrefixed('CancelRequestAnimationFrame') || function (id) { window.clearTimeout(id); };

// @function requestAnimFrame(fn: Function, context?: Object, immediate?: Boolean): Number
// Schedules `fn` to be executed when the browser repaints. `fn` is bound to
// `context` if given. When `immediate` is set, `fn` is called immediately if
// the browser doesn't have native support for
// [`window.requestAnimationFrame`](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame),
// otherwise it's delayed. Returns a request ID that can be used to cancel the request.
function requestAnimFrame(fn, context, immediate) {
	if (immediate && requestFn === timeoutDefer) {
		fn.call(context);
	} else {
		return requestFn.call(window, bind(fn, context));
	}
}

// @function cancelAnimFrame(id: Number): undefined
// Cancels a previous `requestAnimFrame`. See also [window.cancelAnimationFrame](https://developer.mozilla.org/docs/Web/API/window/cancelAnimationFrame).
function cancelAnimFrame(id) {
	if (id) {
		cancelFn.call(window, id);
	}
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return root; });
/* harmony export (immutable) */ __webpack_exports__["b"] = Selection;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectAll__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__filter__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__enter__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exit__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__merge__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__order__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sort__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__call__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nodes__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__size__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__empty__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__each__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__attr__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__style__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__property__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__classed__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__text__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__html__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__raise__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__lower__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__append__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__insert__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__remove__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__datum__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__on__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__dispatch__ = __webpack_require__(103);






























var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: __WEBPACK_IMPORTED_MODULE_0__select__["a" /* default */],
  selectAll: __WEBPACK_IMPORTED_MODULE_1__selectAll__["a" /* default */],
  filter: __WEBPACK_IMPORTED_MODULE_2__filter__["a" /* default */],
  data: __WEBPACK_IMPORTED_MODULE_3__data__["a" /* default */],
  enter: __WEBPACK_IMPORTED_MODULE_4__enter__["a" /* default */],
  exit: __WEBPACK_IMPORTED_MODULE_5__exit__["a" /* default */],
  merge: __WEBPACK_IMPORTED_MODULE_6__merge__["a" /* default */],
  order: __WEBPACK_IMPORTED_MODULE_7__order__["a" /* default */],
  sort: __WEBPACK_IMPORTED_MODULE_8__sort__["a" /* default */],
  call: __WEBPACK_IMPORTED_MODULE_9__call__["a" /* default */],
  nodes: __WEBPACK_IMPORTED_MODULE_10__nodes__["a" /* default */],
  node: __WEBPACK_IMPORTED_MODULE_11__node__["a" /* default */],
  size: __WEBPACK_IMPORTED_MODULE_12__size__["a" /* default */],
  empty: __WEBPACK_IMPORTED_MODULE_13__empty__["a" /* default */],
  each: __WEBPACK_IMPORTED_MODULE_14__each__["a" /* default */],
  attr: __WEBPACK_IMPORTED_MODULE_15__attr__["a" /* default */],
  style: __WEBPACK_IMPORTED_MODULE_16__style__["b" /* default */],
  property: __WEBPACK_IMPORTED_MODULE_17__property__["a" /* default */],
  classed: __WEBPACK_IMPORTED_MODULE_18__classed__["a" /* default */],
  text: __WEBPACK_IMPORTED_MODULE_19__text__["a" /* default */],
  html: __WEBPACK_IMPORTED_MODULE_20__html__["a" /* default */],
  raise: __WEBPACK_IMPORTED_MODULE_21__raise__["a" /* default */],
  lower: __WEBPACK_IMPORTED_MODULE_22__lower__["a" /* default */],
  append: __WEBPACK_IMPORTED_MODULE_23__append__["a" /* default */],
  insert: __WEBPACK_IMPORTED_MODULE_24__insert__["a" /* default */],
  remove: __WEBPACK_IMPORTED_MODULE_25__remove__["a" /* default */],
  datum: __WEBPACK_IMPORTED_MODULE_26__datum__["a" /* default */],
  on: __WEBPACK_IMPORTED_MODULE_27__on__["c" /* default */],
  dispatch: __WEBPACK_IMPORTED_MODULE_28__dispatch__["a" /* default */]
};

/* harmony default export */ __webpack_exports__["a"] = (selection);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(181)() ? Symbol : __webpack_require__(183);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assign        = __webpack_require__(38)
  , normalizeOpts = __webpack_require__(68)
  , isCallable    = __webpack_require__(165)
  , contains      = __webpack_require__(39)

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function constant() {
    return x;
  };
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ie */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ielt9; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return edge; });
/* unused harmony export webkit */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return android; });
/* unused harmony export android23 */
/* unused harmony export androidStock */
/* unused harmony export opera */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return chrome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return gecko; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return safari; });
/* unused harmony export phantom */
/* unused harmony export opera12 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return win; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ie3d; });
/* unused harmony export webkit3d */
/* unused harmony export gecko3d */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return any3d; });
/* unused harmony export mobile */
/* unused harmony export mobileWebkit */
/* unused harmony export mobileWebkit3d */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return msPointer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return pointer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return touch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mobileOpera; });
/* unused harmony export mobileGecko */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return retina; });
/* unused harmony export canvas */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return svg; });
/* unused harmony export vml */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layer_vector_SVG_Util__ = __webpack_require__(199);


/*
 * @namespace Browser
 * @aka L.Browser
 *
 * A namespace with static properties for browser/feature detection used by Leaflet internally.
 *
 * @example
 *
 * ```js
 * if (L.Browser.ielt9) {
 *   alert('Upgrade your browser, dude!');
 * }
 * ```
 */

var style = document.documentElement.style;

// @property ie: Boolean; `true` for all Internet Explorer versions (not Edge).
var ie = 'ActiveXObject' in window;

// @property ielt9: Boolean; `true` for Internet Explorer versions less than 9.
var ielt9 = ie && !document.addEventListener;

// @property edge: Boolean; `true` for the Edge web browser.
var edge = 'msLaunchUri' in navigator && !('documentMode' in document);

// @property webkit: Boolean;
// `true` for webkit-based browsers like Chrome and Safari (including mobile versions).
var webkit = userAgentContains('webkit');

// @property android: Boolean
// `true` for any browser running on an Android platform.
var android = userAgentContains('android');

// @property android23: Boolean; `true` for browsers running on Android 2 or Android 3.
var android23 = userAgentContains('android 2') || userAgentContains('android 3');

/* See https://stackoverflow.com/a/17961266 for details on detecting stock Android */
var webkitVer = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10); // also matches AppleWebKit
// @property androidStock: Boolean; `true` for the Android stock browser (i.e. not Chrome)
var androidStock = android && userAgentContains('Google') && webkitVer < 537 && !('AudioNode' in window);

// @property opera: Boolean; `true` for the Opera browser
var opera = !!window.opera;

// @property chrome: Boolean; `true` for the Chrome browser.
var chrome = userAgentContains('chrome');

// @property gecko: Boolean; `true` for gecko-based browsers like Firefox.
var gecko = userAgentContains('gecko') && !webkit && !opera && !ie;

// @property safari: Boolean; `true` for the Safari browser.
var safari = !chrome && userAgentContains('safari');

var phantom = userAgentContains('phantom');

// @property opera12: Boolean
// `true` for the Opera browser supporting CSS transforms (version 12 or later).
var opera12 = 'OTransition' in style;

// @property win: Boolean; `true` when the browser is running in a Windows platform
var win = navigator.platform.indexOf('Win') === 0;

// @property ie3d: Boolean; `true` for all Internet Explorer versions supporting CSS transforms.
var ie3d = ie && ('transition' in style);

// @property webkit3d: Boolean; `true` for webkit-based browsers supporting CSS transforms.
var webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23;

// @property gecko3d: Boolean; `true` for gecko-based browsers supporting CSS transforms.
var gecko3d = 'MozPerspective' in style;

// @property any3d: Boolean
// `true` for all browsers supporting CSS transforms.
var any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d) && !opera12 && !phantom;

// @property mobile: Boolean; `true` for all browsers running in a mobile device.
var mobile = typeof orientation !== 'undefined' || userAgentContains('mobile');

// @property mobileWebkit: Boolean; `true` for all webkit-based browsers in a mobile device.
var mobileWebkit = mobile && webkit;

// @property mobileWebkit3d: Boolean
// `true` for all webkit-based browsers in a mobile device supporting CSS transforms.
var mobileWebkit3d = mobile && webkit3d;

// @property msPointer: Boolean
// `true` for browsers implementing the Microsoft touch events model (notably IE10).
var msPointer = !window.PointerEvent && window.MSPointerEvent;

// @property pointer: Boolean
// `true` for all browsers supporting [pointer events](https://msdn.microsoft.com/en-us/library/dn433244%28v=vs.85%29.aspx).
var pointer = !!(window.PointerEvent || msPointer);

// @property touch: Boolean
// `true` for all browsers supporting [touch events](https://developer.mozilla.org/docs/Web/API/Touch_events).
// This does not necessarily mean that the browser is running in a computer with
// a touchscreen, it only means that the browser is capable of understanding
// touch events.
var touch = !window.L_NO_TOUCH && (pointer || 'ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch));

// @property mobileOpera: Boolean; `true` for the Opera browser in a mobile device.
var mobileOpera = mobile && opera;

// @property mobileGecko: Boolean
// `true` for gecko-based browsers running in a mobile device.
var mobileGecko = mobile && gecko;

// @property retina: Boolean
// `true` for browsers on a high-resolution "retina" screen.
var retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;


// @property canvas: Boolean
// `true` when the browser supports [`<canvas>`](https://developer.mozilla.org/docs/Web/API/Canvas_API).
var canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

// @property svg: Boolean
// `true` when the browser supports [SVG](https://developer.mozilla.org/docs/Web/SVG).
var svg = !!(document.createElementNS && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__layer_vector_SVG_Util__["a" /* svgCreate */])('svg').createSVGRect);

// @property vml: Boolean
// `true` if the browser supports [VML](https://en.wikipedia.org/wiki/Vector_Markup_Language).
var vml = !svg && (function () {
	try {
		var div = document.createElement('div');
		div.innerHTML = '<v:shape adj="1"/>';

		var shape = div.firstChild;
		shape.style.behavior = 'url(#default#VML)';

		return shape && (typeof shape.adj === 'object');

	} catch (e) {
		return false;
	}
}());


function userAgentContains(str) {
	return navigator.userAgent.toLowerCase().indexOf(str) >= 0;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = Point;
/* harmony export (immutable) */ __webpack_exports__["a"] = toPoint;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Util__ = __webpack_require__(0);


/*
 * @class Point
 * @aka L.Point
 *
 * Represents a point with `x` and `y` coordinates in pixels.
 *
 * @example
 *
 * ```js
 * var point = L.point(200, 300);
 * ```
 *
 * All Leaflet methods and options that accept `Point` objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:
 *
 * ```js
 * map.panBy([200, 300]);
 * map.panBy(L.point(200, 300));
 * ```
 *
 * Note that `Point` does not inherit from Leafet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

function Point(x, y, round) {
	// @property x: Number; The `x` coordinate of the point
	this.x = (round ? Math.round(x) : x);
	// @property y: Number; The `y` coordinate of the point
	this.y = (round ? Math.round(y) : y);
}

var trunc = Math.trunc || function (v) {
	return v > 0 ? Math.floor(v) : Math.ceil(v);
};

Point.prototype = {

	// @method clone(): Point
	// Returns a copy of the current point.
	clone: function () {
		return new Point(this.x, this.y);
	},

	// @method add(otherPoint: Point): Point
	// Returns the result of addition of the current and the given points.
	add: function (point) {
		// non-destructive, returns a new point
		return this.clone()._add(toPoint(point));
	},

	_add: function (point) {
		// destructive, used directly for performance in situations where it's safe to modify existing point
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	// @method subtract(otherPoint: Point): Point
	// Returns the result of subtraction of the given point from the current.
	subtract: function (point) {
		return this.clone()._subtract(toPoint(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	// @method divideBy(num: Number): Point
	// Returns the result of division of the current point by the given number.
	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	// @method multiplyBy(num: Number): Point
	// Returns the result of multiplication of the current point by the given number.
	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	// @method scaleBy(scale: Point): Point
	// Multiply each coordinate of the current point by each coordinate of
	// `scale`. In linear algebra terms, multiply the point by the
	// [scaling matrix](https://en.wikipedia.org/wiki/Scaling_%28geometry%29#Matrix_representation)
	// defined by `scale`.
	scaleBy: function (point) {
		return new Point(this.x * point.x, this.y * point.y);
	},

	// @method unscaleBy(scale: Point): Point
	// Inverse of `scaleBy`. Divide each coordinate of the current point by
	// each coordinate of `scale`.
	unscaleBy: function (point) {
		return new Point(this.x / point.x, this.y / point.y);
	},

	// @method round(): Point
	// Returns a copy of the current point with rounded coordinates.
	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	// @method floor(): Point
	// Returns a copy of the current point with floored coordinates (rounded down).
	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	// @method ceil(): Point
	// Returns a copy of the current point with ceiled coordinates (rounded up).
	ceil: function () {
		return this.clone()._ceil();
	},

	_ceil: function () {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	},

	// @method trunc(): Point
	// Returns a copy of the current point with truncated coordinates (rounded towards zero).
	trunc: function () {
		return this.clone()._trunc();
	},

	_trunc: function () {
		this.x = trunc(this.x);
		this.y = trunc(this.y);
		return this;
	},

	// @method distanceTo(otherPoint: Point): Number
	// Returns the cartesian distance between the current and the given points.
	distanceTo: function (point) {
		point = toPoint(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	// @method equals(otherPoint: Point): Boolean
	// Returns `true` if the given point has the same coordinates.
	equals: function (point) {
		point = toPoint(point);

		return point.x === this.x &&
		       point.y === this.y;
	},

	// @method contains(otherPoint: Point): Boolean
	// Returns `true` if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).
	contains: function (point) {
		point = toPoint(point);

		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	},

	// @method toString(): String
	// Returns a string representation of the point for debugging purposes.
	toString: function () {
		return 'Point(' +
		        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_Util__["a" /* formatNum */])(this.x) + ', ' +
		        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_Util__["a" /* formatNum */])(this.y) + ')';
	}
};

// @factory L.point(x: Number, y: Number, round?: Boolean)
// Creates a Point object with the given `x` and `y` coordinates. If optional `round` is set to true, rounds the `x` and `y` values.

// @alternative
// @factory L.point(coords: Number[])
// Expects an array of the form `[x, y]` instead.

// @alternative
// @factory L.point(coords: Object)
// Expects a plain object of the form `{x: Number, y: Number}` instead.
function toPoint(x, y, round) {
	if (x instanceof Point) {
		return x;
	}
	if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__core_Util__["b" /* isArray */])(x)) {
		return new Point(x[0], x[1]);
	}
	if (x === undefined || x === null) {
		return x;
	}
	if (typeof x === 'object' && 'x' in x && 'y' in x) {
		return new Point(x.x, x.y);
	}
	return new Point(x, y, round);
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ALL = exports.NONE = exports.EDIT_APPEND = exports.APPEND = exports.DELETE = exports.EDIT = exports.CREATE = exports.freeDraw = exports.edgesKey = exports.notifyDeferredKey = exports.modesKey = exports.instanceKey = exports.defaultOptions = exports.polygons = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Flags = __webpack_require__(15);

Object.defineProperty(exports, 'CREATE', {
    enumerable: true,
    get: function get() {
        return _Flags.CREATE;
    }
});
Object.defineProperty(exports, 'EDIT', {
    enumerable: true,
    get: function get() {
        return _Flags.EDIT;
    }
});
Object.defineProperty(exports, 'DELETE', {
    enumerable: true,
    get: function get() {
        return _Flags.DELETE;
    }
});
Object.defineProperty(exports, 'APPEND', {
    enumerable: true,
    get: function get() {
        return _Flags.APPEND;
    }
});
Object.defineProperty(exports, 'EDIT_APPEND', {
    enumerable: true,
    get: function get() {
        return _Flags.EDIT_APPEND;
    }
});
Object.defineProperty(exports, 'NONE', {
    enumerable: true,
    get: function get() {
        return _Flags.NONE;
    }
});
Object.defineProperty(exports, 'ALL', {
    enumerable: true,
    get: function get() {
        return _Flags.ALL;
    }
});

var _FeatureGroup2 = __webpack_require__(85);

var _d3Selection = __webpack_require__(81);

var _d3Shape = __webpack_require__(82);

var _es6Set = __webpack_require__(83);

var _es6Set2 = _interopRequireDefault(_es6Set);

var _es6WeakMap = __webpack_require__(84);

var _es6WeakMap2 = _interopRequireDefault(_es6WeakMap);

var _es6Symbol = __webpack_require__(4);

var _es6Symbol2 = _interopRequireDefault(_es6Symbol);

var _Layer = __webpack_require__(16);

var _Polygon = __webpack_require__(26);

var _Simplify = __webpack_require__(44);

var _Simplify2 = _interopRequireDefault(_Simplify);

var _GoogleConfig = __webpack_require__(79);

var _LeafletConfig = __webpack_require__(80);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @constant polygons
 * @type {WeakMap}
 */
var polygons = exports.polygons = new _es6WeakMap2.default();

/**
 * @constant defaultOptions
 * @type {Object}
 */
var defaultOptions = exports.defaultOptions = {
    mode: _Flags.ALL,
    smoothFactor: 0.3,
    elbowDistance: 10,
    simplifyFactor: 1.1,
    mergePolygons: true,
    concavePolygon: true,
    maximumPolygons: Infinity,
    notifyAfterEditExit: false,
    leaveModeAfterCreate: false,
    strokeWidth: 2
};

/**
 * @constant instanceKey
 * @type {Symbol}
 */
var instanceKey = exports.instanceKey = (0, _es6Symbol2.default)('freedraw/instance');

/**
 * @constant modesKey
 * @type {Symbol}
 */
var modesKey = exports.modesKey = (0, _es6Symbol2.default)('freedraw/modes');

/**
 * @constant notifyDeferredKey
 * @type {Symbol}
 */
var notifyDeferredKey = exports.notifyDeferredKey = (0, _es6Symbol2.default)('freedraw/notify-deferred');

/**
 * @constant edgesKey
 * @type {Symbol}
 */
var edgesKey = exports.edgesKey = (0, _es6Symbol2.default)('freedraw/edges');

/**
 * @constant cancelKey
 * @type {Symbol}
 */
var cancelKey = (0, _es6Symbol2.default)('freedraw/cancel');

var FreeDraw = function (_FeatureGroup) {
    _inherits(FreeDraw, _FeatureGroup);

    /**
     * @constructor
     * @param {Object} [options = {}]
     * @return {void}
     */
    function FreeDraw() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;

        _classCallCheck(this, FreeDraw);

        var _this = _possibleConstructorReturn(this, (FreeDraw.__proto__ || Object.getPrototypeOf(FreeDraw)).call(this));

        _this.options = _extends({}, defaultOptions, options);

        if (_this.options.flavor === 'google') {
            _this.config = _GoogleConfig.GoogleFreeDrawConfig;
        } else {
            _this.config = _LeafletConfig.LeafletFreeDrawConfig;
        }
        return _this;
    }

    /**
     * @method onAdd
     * @param {Object} map
     * @return {void}
     */


    _createClass(FreeDraw, [{
        key: 'onAdd',
        value: function onAdd(map) {

            // Memorise the map instance.
            this.map = map;

            // Attach the cancel function and the instance to the map.
            map[cancelKey] = function () {};
            map[instanceKey] = this;
            map[notifyDeferredKey] = function () {};

            // Setup the dependency injection for simplifying the polygon.
            map.simplifyPolygon = _Simplify2.default;

            // Add the item to the map.
            polygons.set(map, new _es6Set2.default());

            if (this.config && this.config.onMapInit) {
                this.config.onMapInit(map, this.options);
            }

            // Set the initial mode.
            (0, _Flags.modeFor)(map, this.options.mode, this.options);

            // Instantiate the SVG layer that sits on top of the map.
            var svg = this.svg = (0, _d3Selection.select)(map._container).append('svg').classed('free-draw', true).attr('width', '100%').attr('height', '100%').style('pointer-events', 'none').style('z-index', '1001').style('position', 'relative');

            // Set the mouse events.
            this.listenForEvents(map, svg, this.options);
        }

        /**
         * @method onRemove
         * @param {Object} map
         * @return {void}
         */

    }, {
        key: 'onRemove',
        value: function onRemove(map) {

            // Remove the item from the map.
            polygons.delete(map);

            // Remove the SVG layer.
            this.svg.remove();

            // Remove the appendages from the map container.
            delete map[cancelKey];
            delete map[instanceKey];
            delete map.simplifyPolygon;
        }

        /**
         * @method create
         * @param {LatLng[]} latLngs
         * @param {Object} [options = { concavePolygon: false }]
         * @return {Object}
         */

    }, {
        key: 'create',
        value: function create(latLngs) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { concavePolygon: false };

            var created = (0, _Polygon.createFor)(this.map, latLngs, _extends({}, this.options, options));
            (0, _Layer.updateFor)(this.map, 'create');
            return created;
        }

        /**
         * @method remove
         * @param {Object} polygon
         * @return {void}
         */

    }, {
        key: 'remove',
        value: function remove(polygon) {
            polygon ? (0, _Polygon.removeFor)(this.map, polygon) : _get(FreeDraw.prototype.__proto__ || Object.getPrototypeOf(FreeDraw.prototype), 'remove', this).call(this);
            (0, _Layer.updateFor)(this.map, 'remove');
        }

        /**
         * @method clear
         * @return {void}
         */

    }, {
        key: 'clear',
        value: function clear() {
            (0, _Polygon.clearFor)(this.map);
            (0, _Layer.updateFor)(this.map, 'clear');
        }

        /**
         * @method setMode
         * @param {Number} [mode = null]
         * @return {Number}
         */

    }, {
        key: 'mode',
        value: function mode() {
            var _mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            // Set mode when passed `mode` is numeric, and then yield the current mode.
            typeof _mode === 'number' && (0, _Flags.modeFor)(this.map, _mode, this.options);
            return this.map[modesKey];
        }

        /**
         * @method size
         * @return {Number}
         */

    }, {
        key: 'size',
        value: function size() {
            return polygons.get(this.map).size;
        }

        /**
         * @method all
         * @return {Array}
         */

    }, {
        key: 'all',
        value: function all() {
            return Array.from(polygons.get(this.map));
        }

        /**
         * @method cancel
         * @return {void}
         */

    }, {
        key: 'cancel',
        value: function cancel() {
            this.map[cancelKey]();
        }

        /**
         * @method listenForEvents
         * @param {Object} map
         * @param {Object} svg
         * @param {Object} options
         * @return {void}
         */

    }, {
        key: 'listenForEvents',
        value: function listenForEvents(map, svg, options) {
            var _this2 = this;

            /**
             * @method mouseDown
             * @param {Object} event
             * @return {void}
             */
            var mouseDown = function mouseDown(event) {
                if (!(map[modesKey] & _Flags.CREATE)) {

                    // Polygons can only be created when the mode includes create.
                    return;
                }

                /**
                 * @constant latLngs
                 * @type {Set}
                 */
                var latLngs = new _es6Set2.default();

                // Create the line iterator and move it to its first `yield` point, passing in the start point
                // from the mouse down event.
                var lineIterator = _this2.createPath(map, svg, map.latLngToContainerPoint(event.latlng || event.latLng), options.strokeWidth);
                lineIterator.next();

                /**
                 * @method mouseMove
                 * @param {Object} event
                 * @return {void}
                 */
                var mouseMove = function mouseMove(event) {

                    // Resolve the pixel point to the latitudinal and longitudinal equivalent.
                    var point = map.mouseEventToContainerPoint(event.originalEvent || event);

                    // Push each lat/lng value into the points set.
                    latLngs.add(map.containerPointToLatLng(point));

                    // Invoke the generator by passing in the starting point for the path.
                    lineIterator.next(new map.Point(point.x, point.y));
                };

                // Create the path when the user moves their cursor.
                map.on('mousemove touchmove', mouseMove);

                /**
                 * @method mouseUp
                 * @param {Object} event
                 * @param {Boolean} [create = true]
                 * @return {Function}
                 */
                var mouseUp = function mouseUp(event) {
                    var create = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;


                    // Remove the ability to invoke `cancel`.
                    map[cancelKey] = function () {};

                    // Stop listening to the events.
                    map.off('mouseup', mouseUp);
                    map.off('mousemove', mouseMove);
                    'body' in document && document.body.removeEventListener('mouseleave', mouseUp);

                    // Clear the SVG canvas.
                    svg.selectAll('*').remove();

                    // Stop the iterator.
                    lineIterator.return();

                    if (create) {

                        // ...And finally if we have any lat/lngs in our set then we can attempt to
                        // create the polygon.
                        latLngs.size && (0, _Polygon.createFor)(map, Array.from(latLngs), options);

                        // Finally invoke the callback for the polygon regions.
                        (0, _Layer.updateFor)(map, 'create');

                        // Exit the `CREATE` mode if the options permit it.
                        options.leaveModeAfterCreate && _this2.mode(_this2.mode() ^ _Flags.CREATE);
                    }
                };

                // Clear up the events when the user releases the mouse.
                map.on('mouseup touchend', mouseUp);
                'body' in document && document.body.addEventListener('mouseleave', mouseUp);

                // Setup the function to invoke when `cancel` has been invoked.
                map[cancelKey] = function () {
                    return mouseUp({}, false);
                };
            };

            map.on('mousedown touchstart', mouseDown);
        }

        /**
         * @method createPath
         * @param {Object} map
         * @param {Object} svg
         * @param {Point} fromPoint
         * @param {Number} strokeWidth
         * @return {void}
         */

    }, {
        key: 'createPath',
        value: regeneratorRuntime.mark(function createPath(map, svg, fromPoint, strokeWidth) {
            var lineFunction, toPoint, lineData;
            return regeneratorRuntime.wrap(function createPath$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:

                            // Define the line function to be used for the hand-drawn lines.
                            lineFunction = (0, _d3Shape.line)().curve(_d3Shape.curveMonotoneX).x(function (d) {
                                return d.x;
                            }).y(function (d) {
                                return d.y;
                            });

                            // Wait for the iterator to be invoked by passing in the next point.

                            _context.next = 3;
                            return fromPoint;

                        case 3:
                            toPoint = _context.sent;


                            // Line data that is fed into the D3 line function we defined earlier.
                            lineData = [fromPoint, toPoint];

                            // Draw SVG line based on the last movement of the mouse's position.

                            svg.append('path').classed('leaflet-line', true).attr('d', lineFunction(lineData)).attr('fill', 'none').attr('stroke', 'black').attr('stroke-width', strokeWidth);

                            // Recursively invoke the generator function, passing in the current to point as the from point.
                            return _context.delegateYield(this.createPath(map, svg, toPoint, strokeWidth), 't0', 7);

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, createPath, this);
        })
    }]);

    return FreeDraw;
}(_FeatureGroup2.FeatureGroup);

/**
 * @method freeDraw
 * @return {Object}
 */


exports.default = FreeDraw;
var freeDraw = exports.freeDraw = function freeDraw(options) {
    return new FreeDraw(options);
};

if (typeof window !== 'undefined') {

    // Attach to the `window` as `FreeDraw` if it exists, as this would prevent `new FreeDraw.default` when
    // using the web version.
    window.FreeDraw = FreeDraw;
    FreeDraw.CREATE = _Flags.CREATE;
    FreeDraw.EDIT = _Flags.EDIT;
    FreeDraw.DELETE = _Flags.DELETE;
    FreeDraw.APPEND = _Flags.APPEND;
    FreeDraw.EDIT_APPEND = _Flags.EDIT_APPEND;
    FreeDraw.NONE = _Flags.NONE;
    FreeDraw.ALL = _Flags.ALL;
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_path__ = __webpack_require__(91);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_path__["a"]; });



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return atan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return max; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return min; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return epsilon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return halfPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return tau; });
/* harmony export (immutable) */ __webpack_exports__["l"] = acos;
/* harmony export (immutable) */ __webpack_exports__["k"] = asin;
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(69)()
	? Object.setPrototypeOf
	: __webpack_require__(70);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modeFor = exports.ALL = exports.EDIT_APPEND = exports.APPEND = exports.DELETE = exports.EDIT = exports.CREATE = exports.NONE = undefined;

var _FreeDraw = __webpack_require__(9);

var _Layer = __webpack_require__(16);

/**
 * @constant NONE
 * @type {Number}
 */
var NONE = exports.NONE = 0;

/**
 * @constant CREATE
 * @type {Number}
 */
var CREATE = exports.CREATE = 1;

/**
 * @constant EDIT
 * @type {Number}
 */
var EDIT = exports.EDIT = 2;

/**
 * @constant DELETE
 * @type {Number}
 */
var DELETE = exports.DELETE = 4;

/**
 * @constant APPEND
 * @type {Number}
 */
var APPEND = exports.APPEND = 8;

/**
 * @constant EDIT_APPEND
 * @type {Number}
 */
var EDIT_APPEND = exports.EDIT_APPEND = EDIT | APPEND;

/**
 * @constant ALL
 * @type {number}
 */
var ALL = exports.ALL = CREATE | EDIT | DELETE | APPEND;

/**
 * @method modeFor
 * @param {Object} map
 * @param {Number} mode
 * @param {Object} options
 * @return {Number}
 */
var modeFor = exports.modeFor = function modeFor(map, mode, options) {

  // Update the mode.
  map[_FreeDraw.modesKey] = mode;

  // Fire the updated mode.
  map[_FreeDraw.instanceKey].fire('mode', { mode: mode });

  // Disable the map if the `CREATE` mode is a default flag.
  mode & CREATE ? map.dragging.disable() : map.dragging.enable();

  Array.from(_FreeDraw.polygons.get(map)).forEach(function (polygon) {
    polygon.toggle(mode & EDIT, mode & APPEND);

    polygon[_FreeDraw.edgesKey].forEach(function (edge) {
      // Modify the edge class names based on whether edit mode is enabled.
      edge.toggle(mode & EDIT);
    });
  });

  // Apply the conditional class names to the map container.
  (0, _Layer.classesFor)(map, mode);

  // Fire the event for having manipulated the polygons if the `hasManipulated` is `true` and the
  // `notifyAfterEditExit` option is equal to `true`, and then reset the `notifyDeferredKey`.
  options.notifyAfterEditExit && map[_FreeDraw.notifyDeferredKey]();
  map[_FreeDraw.notifyDeferredKey] = function () {};

  return mode;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.classesFor = exports.updateFor = undefined;

var _DomUtil = __webpack_require__(87);

var DomUtil = _interopRequireWildcard(_DomUtil);

var _FreeDraw = __webpack_require__(9);

var _Flags = __webpack_require__(15);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @method updateFor
 * @param {Object} map
 * @param {String} eventType
 * @return {void}
 */
var updateFor = exports.updateFor = function updateFor(map, eventType) {
    var _polygons = _FreeDraw.polygons.get(map) || [];
    var latLngs = Array.from(_polygons).map(function (polygon) {

        // Ensure the polygon has been closed.
        var latLngs = polygon.getLatLngs();
        var isLatFn = typeof latLngs[0][0].lat === 'function';
        var cleanPoints = latLngs[0].map(function (latLng) {
            return {
                lat: isLatFn ? latLng.lat() : latLng.lat,
                lng: isLatFn ? latLng.lng() : latLng.lng
            };
        });

        return [].concat(_toConsumableArray(cleanPoints), [cleanPoints[0]]);
    });

    // Fire the current set of lat lngs.
    map[_FreeDraw.instanceKey] && map[_FreeDraw.instanceKey].fire('markers', { latLngs: latLngs, eventType: eventType });
};

/**
 * @method classesFor
 * @param {Object} map
 * @param {Number} mode
 * @return {void}
 */
var classesFor = exports.classesFor = function classesFor(map, mode) {
    var _modeMap;

    /**
     * @constant modeMap
     * @type {Object}
     */
    var modeMap = (_modeMap = {}, _defineProperty(_modeMap, _Flags.NONE, 'mode-none'), _defineProperty(_modeMap, _Flags.CREATE, 'mode-create'), _defineProperty(_modeMap, _Flags.EDIT, 'mode-edit'), _defineProperty(_modeMap, _Flags.DELETE, 'mode-delete'), _defineProperty(_modeMap, _Flags.APPEND, 'mode-append'), _modeMap);

    Object.keys(modeMap).forEach(function (key) {

        var className = modeMap[key];
        var isModeActive = mode & key;

        // Remove the class name if it's set already on the map container.
        DomUtil.removeClass(map._container, className);

        // Apply the class names to the node container depending on whether the mode is active.
        isModeActive && DomUtil.addClass(map._container, className);
        mode === 0 && DomUtil.addClass(map._container, modeMap[_Flags.NONE]);
    });
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(node, event) {
  var svg = node.ownerSVGElement || node;

  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    point.x = event.clientX, point.y = event.clientY;
    point = point.matrixTransform(node.getScreenCTM().inverse());
    return [point.x, point.y];
  }

  var rect = node.getBoundingClientRect();
  return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
});


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = point;
/* harmony export (immutable) */ __webpack_exports__["b"] = Basis;
function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Basis(context);
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = point;
/* harmony export (immutable) */ __webpack_exports__["b"] = Cardinal;
function point(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Linear(context);
});


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {});


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call((function () { return arguments; }()));

module.exports = function (x) { return (toString.call(x) === id); };


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString.call(x) === id))) || false;
};


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = LatLng;
/* harmony export (immutable) */ __webpack_exports__["b"] = toLatLng;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__crs_CRS_Earth__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LatLngBounds__ = __webpack_require__(25);




/* @class LatLng
 * @aka L.LatLng
 *
 * Represents a geographical point with a certain latitude and longitude.
 *
 * @example
 *
 * ```
 * var latlng = L.latLng(50.5, 30.5);
 * ```
 *
 * All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:
 *
 * ```
 * map.panTo([50, 30]);
 * map.panTo({lon: 30, lat: 50});
 * map.panTo({lat: 50, lng: 30});
 * map.panTo(L.latLng(50, 30));
 * ```
 *
 * Note that `LatLng` does not inherit from Leafet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

function LatLng(lat, lng, alt) {
	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	}

	// @property lat: Number
	// Latitude in degrees
	this.lat = +lat;

	// @property lng: Number
	// Longitude in degrees
	this.lng = +lng;

	// @property alt: Number
	// Altitude in meters (optional)
	if (alt !== undefined) {
		this.alt = +alt;
	}
}

LatLng.prototype = {
	// @method equals(otherLatLng: LatLng, maxMargin?: Number): Boolean
	// Returns `true` if the given `LatLng` point is at the same position (within a small margin of error). The margin of error can be overridden by setting `maxMargin` to a small number.
	equals: function (obj, maxMargin) {
		if (!obj) { return false; }

		obj = toLatLng(obj);

		var margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= (maxMargin === undefined ? 1.0E-9 : maxMargin);
	},

	// @method toString(): String
	// Returns a string representation of the point (for debugging purposes).
	toString: function (precision) {
		return 'LatLng(' +
		        __WEBPACK_IMPORTED_MODULE_0__core_Util__["a" /* formatNum */](this.lat, precision) + ', ' +
		        __WEBPACK_IMPORTED_MODULE_0__core_Util__["a" /* formatNum */](this.lng, precision) + ')';
	},

	// @method distanceTo(otherLatLng: LatLng): Number
	// Returns the distance (in meters) to the given `LatLng` calculated using the [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines).
	distanceTo: function (other) {
		return __WEBPACK_IMPORTED_MODULE_1__crs_CRS_Earth__["a" /* Earth */].distance(this, toLatLng(other));
	},

	// @method wrap(): LatLng
	// Returns a new `LatLng` object with the longitude wrapped so it's always between -180 and +180 degrees.
	wrap: function () {
		return __WEBPACK_IMPORTED_MODULE_1__crs_CRS_Earth__["a" /* Earth */].wrapLatLng(this);
	},

	// @method toBounds(sizeInMeters: Number): LatLngBounds
	// Returns a new `LatLngBounds` object in which each boundary is `sizeInMeters/2` meters apart from the `LatLng`.
	toBounds: function (sizeInMeters) {
		var latAccuracy = 180 * sizeInMeters / 40075017,
		    lngAccuracy = latAccuracy / Math.cos((Math.PI / 180) * this.lat);

		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__LatLngBounds__["b" /* toLatLngBounds */])(
		        [this.lat - latAccuracy, this.lng - lngAccuracy],
		        [this.lat + latAccuracy, this.lng + lngAccuracy]);
	},

	clone: function () {
		return new LatLng(this.lat, this.lng, this.alt);
	}
};



// @factory L.latLng(latitude: Number, longitude: Number, altitude?: Number): LatLng
// Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude).

// @alternative
// @factory L.latLng(coords: Array): LatLng
// Expects an array of the form `[Number, Number]` or `[Number, Number, Number]` instead.

// @alternative
// @factory L.latLng(coords: Object): LatLng
// Expects an plain object of the form `{lat: Number, lng: Number}` or `{lat: Number, lng: Number, alt: Number}` instead.

function toLatLng(a, b, c) {
	if (a instanceof LatLng) {
		return a;
	}
	if (__WEBPACK_IMPORTED_MODULE_0__core_Util__["b" /* isArray */](a) && typeof a[0] !== 'object') {
		if (a.length === 3) {
			return new LatLng(a[0], a[1], a[2]);
		}
		if (a.length === 2) {
			return new LatLng(a[0], a[1]);
		}
		return null;
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'lat' in a) {
		return new LatLng(a.lat, 'lng' in a ? a.lng : a.lon, a.alt);
	}
	if (b === undefined) {
		return null;
	}
	return new LatLng(a, b, c);
}


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = LatLngBounds;
/* harmony export (immutable) */ __webpack_exports__["b"] = toLatLngBounds;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LatLng__ = __webpack_require__(24);


/*
 * @class LatLngBounds
 * @aka L.LatLngBounds
 *
 * Represents a rectangular geographical area on a map.
 *
 * @example
 *
 * ```js
 * var corner1 = L.latLng(40.712, -74.227),
 * corner2 = L.latLng(40.774, -74.125),
 * bounds = L.latLngBounds(corner1, corner2);
 * ```
 *
 * All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * map.fitBounds([
 * 	[40.712, -74.227],
 * 	[40.774, -74.125]
 * ]);
 * ```
 *
 * Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners _outside_ the [-180, 180] degrees longitude range.
 *
 * Note that `LatLngBounds` does not inherit from Leafet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

function LatLngBounds(corner1, corner2) { // (LatLng, LatLng) or (LatLng[])
	if (!corner1) { return; }

	var latlngs = corner2 ? [corner1, corner2] : corner1;

	for (var i = 0, len = latlngs.length; i < len; i++) {
		this.extend(latlngs[i]);
	}
}

LatLngBounds.prototype = {

	// @method extend(latlng: LatLng): this
	// Extend the bounds to contain the given point

	// @alternative
	// @method extend(otherBounds: LatLngBounds): this
	// Extend the bounds to contain the given bounds
	extend: function (obj) {
		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */]) {
			sw2 = obj;
			ne2 = obj;

		} else if (obj instanceof LatLngBounds) {
			sw2 = obj._southWest;
			ne2 = obj._northEast;

			if (!sw2 || !ne2) { return this; }

		} else {
			return obj ? this.extend(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__LatLng__["b" /* toLatLng */])(obj) || toLatLngBounds(obj)) : this;
		}

		if (!sw && !ne) {
			this._southWest = new __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */](sw2.lat, sw2.lng);
			this._northEast = new __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */](ne2.lat, ne2.lng);
		} else {
			sw.lat = Math.min(sw2.lat, sw.lat);
			sw.lng = Math.min(sw2.lng, sw.lng);
			ne.lat = Math.max(ne2.lat, ne.lat);
			ne.lng = Math.max(ne2.lng, ne.lng);
		}

		return this;
	},

	// @method pad(bufferRatio: Number): LatLngBounds
	// Returns bounds created by extending or retracting the current bounds by a given ratio in each direction.
	// For example, a ratio of 0.5 extends the bounds by 50% in each direction.
	// Negative values will retract the bounds.
	pad: function (bufferRatio) {
		var sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new LatLngBounds(
		        new __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */](sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */](ne.lat + heightBuffer, ne.lng + widthBuffer));
	},

	// @method getCenter(): LatLng
	// Returns the center point of the bounds.
	getCenter: function () {
		return new __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */](
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	},

	// @method getSouthWest(): LatLng
	// Returns the south-west point of the bounds.
	getSouthWest: function () {
		return this._southWest;
	},

	// @method getNorthEast(): LatLng
	// Returns the north-east point of the bounds.
	getNorthEast: function () {
		return this._northEast;
	},

	// @method getNorthWest(): LatLng
	// Returns the north-west point of the bounds.
	getNorthWest: function () {
		return new __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */](this.getNorth(), this.getWest());
	},

	// @method getSouthEast(): LatLng
	// Returns the south-east point of the bounds.
	getSouthEast: function () {
		return new __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */](this.getSouth(), this.getEast());
	},

	// @method getWest(): Number
	// Returns the west longitude of the bounds
	getWest: function () {
		return this._southWest.lng;
	},

	// @method getSouth(): Number
	// Returns the south latitude of the bounds
	getSouth: function () {
		return this._southWest.lat;
	},

	// @method getEast(): Number
	// Returns the east longitude of the bounds
	getEast: function () {
		return this._northEast.lng;
	},

	// @method getNorth(): Number
	// Returns the north latitude of the bounds
	getNorth: function () {
		return this._northEast.lat;
	},

	// @method contains(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle contains the given one.

	// @alternative
	// @method contains (latlng: LatLng): Boolean
	// Returns `true` if the rectangle contains the given point.
	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */] || 'lat' in obj) {
			obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__LatLng__["b" /* toLatLng */])(obj);
		} else {
			obj = toLatLngBounds(obj);
		}

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	// @method intersects(otherBounds: LatLngBounds): Boolean
	// Returns `true` if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.
	intersects: function (bounds) {
		bounds = toLatLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	// @method overlaps(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.
	overlaps: function (bounds) {
		bounds = toLatLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latOverlaps = (ne2.lat > sw.lat) && (sw2.lat < ne.lat),
		    lngOverlaps = (ne2.lng > sw.lng) && (sw2.lng < ne.lng);

		return latOverlaps && lngOverlaps;
	},

	// @method toBBoxString(): String
	// Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.
	toBBoxString: function () {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	},

	// @method equals(otherBounds: LatLngBounds, maxMargin?: Number): Boolean
	// Returns `true` if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting `maxMargin` to a small number.
	equals: function (bounds, maxMargin) {
		if (!bounds) { return false; }

		bounds = toLatLngBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest(), maxMargin) &&
		       this._northEast.equals(bounds.getNorthEast(), maxMargin);
	},

	// @method isValid(): Boolean
	// Returns `true` if the bounds are properly initialized.
	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
};

// TODO International date line?

// @factory L.latLngBounds(corner1: LatLng, corner2: LatLng)
// Creates a `LatLngBounds` object by defining two diagonally opposite corners of the rectangle.

// @alternative
// @factory L.latLngBounds(latlngs: LatLng[])
// Creates a `LatLngBounds` object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with [`fitBounds`](#map-fitbounds).
function toLatLngBounds(a, b) {
	if (a instanceof LatLngBounds) {
		return a;
	}
	return new LatLngBounds(a, b);
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clearFor = exports.removeFor = exports.createFor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _leaflet = __webpack_require__(78);

var _FreeDraw = __webpack_require__(9);

var _Layer = __webpack_require__(16);

var _Edges = __webpack_require__(88);

var _Edges2 = _interopRequireDefault(_Edges);

var _Flags = __webpack_require__(15);

var _Polygon = __webpack_require__(26);

var _Polygon2 = _interopRequireDefault(_Polygon);

var _Concave = __webpack_require__(86);

var _Concave2 = _interopRequireDefault(_Concave);

var _Merge = __webpack_require__(45);

var _Merge2 = _interopRequireDefault(_Merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @method appendEdgeFor
 * @param {Object} map
 * @param {Object} polygon
 * @param {Object} options
 * @param {Array} parts
 * @param {Object} newPoint
 * @param {Object} startPoint
 * @param {Object} endPoint
 * @return {void}
 */
var appendEdgeFor = function appendEdgeFor(map, polygon, options, _ref) {
    var parts = _ref.parts,
        newPoint = _ref.newPoint,
        startPoint = _ref.startPoint,
        endPoint = _ref.endPoint;


    var latLngs = parts.reduce(function (accumulator, point, index) {

        var nextPoint = parts[index + 1] || parts[0];

        if (point === startPoint && nextPoint === endPoint) {

            return [].concat(_toConsumableArray(accumulator), [map.containerPointToLatLng(point), map.containerPointToLatLng(newPoint)]);
        }

        return [].concat(_toConsumableArray(accumulator), [map.containerPointToLatLng(point)]);
    }, []);

    // Update the lat/lngs with the newly inserted edge.
    polygon.setLatLngs(latLngs);

    // Remove the current set of edges for the polygon, and then recreate them, assigning the
    // new set of edges back into the polygon.
    polygon[_FreeDraw.edgesKey].map(function (edge) {
        return map.removeLayer(edge);
    });
    polygon[_FreeDraw.edgesKey] = (0, _Edges2.default)(map, polygon, options);
};

/**
 * @method createFor
 * @param {Object} map
 * @param {Array} latLngs
 * @param {Object} [options = defaultOptions]
 * @param {Boolean} [preventMutations = false]
 * @return {Array|Boolean}
 */
var createFor = exports.createFor = function createFor(map, _latLngs) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _FreeDraw.defaultOptions;
    var preventMutations = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var latLngs = _latLngs.map(map.makeLatLng);

    // Determine whether we've reached the maximum polygons.
    var limitReached = _FreeDraw.polygons.get(map).size === options.maximumPolygons;

    // Apply the concave hull algorithm to the created polygon if the options allow.
    var concavedLatLngs = !preventMutations && options.concavePolygon ? (0, _Concave2.default)(map, latLngs) : latLngs;

    // Simplify the polygon before adding it to the map.
    var addedPolygons = limitReached ? [] : map.simplifyPolygon(map, concavedLatLngs, options).map(function (latLngs) {
        var polygon = map.createPolygon(latLngs, _extends({}, _FreeDraw.defaultOptions, options, {
            className: 'leaflet-polygon'
        }));

        // Attach the edges to the polygon.
        polygon[_FreeDraw.edgesKey] = (0, _Edges2.default)(map, polygon, options);

        // Disable the propagation when you click on the marker.
        polygon.disableClickPropagation();

        // Yield the click handler to the `handlePolygonClick` function.
        polygon.off('click');
        polygon.on('click', (0, _Polygon2.default)(map, polygon, options));

        return polygon;
    });

    // Append the current polygon to the master set.
    addedPolygons.forEach(function (polygon) {
        return _FreeDraw.polygons.get(map).add(polygon);
    });

    if (!limitReached && !preventMutations && _FreeDraw.polygons.get(map).size > 1 && options.mergePolygons) {

        // Attempt a merge of all the polygons if the options allow, and the polygon count is above one.
        var addedMergedPolygons = (0, _Merge2.default)(map, Array.from(_FreeDraw.polygons.get(map)), options);

        // Clear the set, and added all of the merged polygons into the master set.
        addedMergedPolygons.forEach(function (polygon) {
            return _FreeDraw.polygons.get(map).add(polygon);
        });

        return addedMergedPolygons;
    }

    return addedPolygons;
};

/**
 * @method removeFor
 * @param {Object} map
 * @param {Object} polygon
 * @return {void}
 */
var removeFor = exports.removeFor = function removeFor(map, polygon) {

    // Remove polygon and all of its associated edges.
    map.removeLayer(polygon);
    _FreeDraw.edgesKey in polygon && polygon[_FreeDraw.edgesKey].map(function (edge) {
        return map.removeLayer(edge);
    });

    // Remove polygon from the master set.
    _FreeDraw.polygons.get(map).delete(polygon);
};

/**
 * @method clearFor
 * @param {Object} map
 * @return {void}
 */
var clearFor = exports.clearFor = function clearFor(map) {
    Array.from(_FreeDraw.polygons.get(map).values()).forEach(function (polygon) {
        return removeFor(map, polygon);
    });
};

/**
 * @param {Object} map
 * @param {Object} polygon
 * @param {Object} options
 * @return {Function}
 */

exports.default = function (map, polygon, options) {

    return function (event) {

        // Gather all of the points from the lat/lngs of the current polygon.
        var newPoint = map.mouseEventToContainerPoint('originalEvent' in event ? event.originalEvent : event);
        var parts = polygon.getLatLngs()[0].map(function (latLng) {
            return map.latLngToContainerPoint(latLng);
        });

        var _parts$reduce = parts.reduce(function (accumulator, point, index) {

            var startPoint = point;
            var endPoint = parts[index + 1] || parts[0];
            var distance = _leaflet.LineUtil.pointToSegmentDistance(newPoint, startPoint, endPoint);

            if (distance < accumulator.lowestDistance) {

                // If the distance is less than the previous then we'll update the accumulator.
                return { lowestDistance: distance, startPoint: startPoint, endPoint: endPoint };
            }

            // Otherwise we'll simply yield the previous accumulator.
            return accumulator;
        }, { lowestDistance: Infinity, startPoint: new map.Point(), endPoint: new map.Point() }),
            startPoint = _parts$reduce.startPoint,
            endPoint = _parts$reduce.endPoint,
            lowestDistance = _parts$reduce.lowestDistance;

        // Setup the conditions for the switch statement to make the cases clearer.


        var mode = map[_FreeDraw.modesKey];
        var isDelete = Boolean(mode & _Flags.DELETE);
        var isAppend = Boolean(mode & _Flags.APPEND);
        var isDeleteAndAppend = Boolean(mode & _Flags.DELETE && mode & _Flags.APPEND);

        // Partially apply the remove and append functions.
        var removePolygon = function removePolygon() {
            return removeFor(map, polygon);
        };
        var appendEdge = function appendEdge() {
            return appendEdgeFor(map, polygon, options, { parts: parts, newPoint: newPoint, startPoint: startPoint, endPoint: endPoint });
        };

        switch (true) {

            // If both modes DELETE and APPEND are active then we need to do a little work to determine
            // which action to take based on where the user clicked on the polygon.
            case isDeleteAndAppend:
                lowestDistance > options.elbowDistance ? removePolygon() : appendEdge();
                break;

            case isDelete:
                removePolygon();
                break;

            case isAppend:
                appendEdge();
                break;

        }

        // Trigger the event for having deleted a polygon or appended an edge.
        (isDelete || isAppend) && (0, _Layer.updateFor)(map, isDelete ? 'remove' : 'append');
    };
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespace__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__namespaces__ = __webpack_require__(29);



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === __WEBPACK_IMPORTED_MODULE_1__namespaces__["b" /* xhtml */] && document.documentElement.namespaceURI === __WEBPACK_IMPORTED_MODULE_1__namespaces__["b" /* xhtml */]
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__namespace__["a" /* default */])(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespaces__ = __webpack_require__(29);


/* harmony default export */ __webpack_exports__["a"] = (function(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return __WEBPACK_IMPORTED_MODULE_0__namespaces__["a" /* default */].hasOwnProperty(prefix) ? {space: __WEBPACK_IMPORTED_MODULE_0__namespaces__["a" /* default */][prefix], local: name} : name;
});


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return xhtml; });
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ __webpack_exports__["a"] = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return event; });
/* harmony export (immutable) */ __webpack_exports__["b"] = customEvent;
var filterEvents = {};

var event = null;

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!("onmouseenter" in element)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = event; // Events can be reentrant (e.g., focus).
    event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      event = event0;
    }
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ __webpack_exports__["c"] = (function(typename, value, capture) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
});

function customEvent(event1, listener, that, args) {
  var event0 = event;
  event1.sourceEvent = event;
  event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    event = event0;
  }
}


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function none() {}

/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
});


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_on__ = __webpack_require__(30);


/* harmony default export */ __webpack_exports__["a"] = (function() {
  var current = __WEBPACK_IMPORTED_MODULE_0__selection_on__["a" /* event */], source;
  while (source = current.sourceEvent) current = source;
  return current;
});


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
});


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = point;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cardinal__ = __webpack_require__(19);



function point(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > __WEBPACK_IMPORTED_MODULE_0__math__["a" /* epsilon */]) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > __WEBPACK_IMPORTED_MODULE_0__math__["a" /* epsilon */]) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new __WEBPACK_IMPORTED_MODULE_1__cardinal__["b" /* Cardinal */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__curve_linear__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(37);





/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x = __WEBPACK_IMPORTED_MODULE_3__point__["a" /* x */],
      y = __WEBPACK_IMPORTED_MODULE_3__point__["b" /* y */],
      defined = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(true),
      context = null,
      curve = __WEBPACK_IMPORTED_MODULE_2__curve_linear__["a" /* default */],
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
});


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = sum;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(13);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var sums = series.map(sum);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).sort(function(a, b) { return sums[a] - sums[b]; });
});

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = x;
/* harmony export (immutable) */ __webpack_exports__["b"] = y;
function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(160)()
	? Object.assign
	: __webpack_require__(161);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(171)()
	? String.prototype.contains
	: __webpack_require__(172);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear    = __webpack_require__(65)
  , assign   = __webpack_require__(38)
  , callable = __webpack_require__(3)
  , value    = __webpack_require__(2)
  , d        = __webpack_require__(5)
  , autoBind = __webpack_require__(90)
  , Symbol   = __webpack_require__(4)

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Events */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Evented; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Class__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Util__ = __webpack_require__(0);



/*
 * @class Evented
 * @aka L.Evented
 * @inherits Class
 *
 * A set of methods shared between event-powered classes (like `Map` and `Marker`). Generally, events allow you to execute some function when something happens with an object (e.g. the user clicks on the map, causing the map to fire `'click'` event).
 *
 * @example
 *
 * ```js
 * map.on('click', function(e) {
 * 	alert(e.latlng);
 * } );
 * ```
 *
 * Leaflet deals with event listeners by reference, so if you want to add a listener and then remove it, define it as a function:
 *
 * ```js
 * function onClick(e) { ... }
 *
 * map.on('click', onClick);
 * map.off('click', onClick);
 * ```
 */

var Events = {
	/* @method on(type: String, fn: Function, context?: Object): this
	 * Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g. `'click dblclick'`).
	 *
	 * @alternative
	 * @method on(eventMap: Object): this
	 * Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
	 */
	on: function (types, fn, context) {

		// types can be a map of types/handlers
		if (typeof types === 'object') {
			for (var type in types) {
				// we don't process space-separated events here for performance;
				// it's a hot path since Layer uses the on(obj) syntax
				this._on(type, types[type], fn);
			}

		} else {
			// types can be a string of space-separated words
			types = __WEBPACK_IMPORTED_MODULE_1__Util__["k" /* splitWords */](types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._on(types[i], fn, context);
			}
		}

		return this;
	},

	/* @method off(type: String, fn?: Function, context?: Object): this
	 * Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to `on`, you must pass the same context to `off` in order to remove the listener.
	 *
	 * @alternative
	 * @method off(eventMap: Object): this
	 * Removes a set of type/listener pairs.
	 *
	 * @alternative
	 * @method off: this
	 * Removes all listeners to all events on the object.
	 */
	off: function (types, fn, context) {

		if (!types) {
			// clear all listeners if called without arguments
			delete this._events;

		} else if (typeof types === 'object') {
			for (var type in types) {
				this._off(type, types[type], fn);
			}

		} else {
			types = __WEBPACK_IMPORTED_MODULE_1__Util__["k" /* splitWords */](types);

			for (var i = 0, len = types.length; i < len; i++) {
				this._off(types[i], fn, context);
			}
		}

		return this;
	},

	// attach listener (without syntactic sugar now)
	_on: function (type, fn, context) {
		this._events = this._events || {};

		/* get/init listeners for type */
		var typeListeners = this._events[type];
		if (!typeListeners) {
			typeListeners = [];
			this._events[type] = typeListeners;
		}

		if (context === this) {
			// Less memory footprint.
			context = undefined;
		}
		var newListener = {fn: fn, ctx: context},
		    listeners = typeListeners;

		// check if fn already there
		for (var i = 0, len = listeners.length; i < len; i++) {
			if (listeners[i].fn === fn && listeners[i].ctx === context) {
				return;
			}
		}

		listeners.push(newListener);
	},

	_off: function (type, fn, context) {
		var listeners,
		    i,
		    len;

		if (!this._events) { return; }

		listeners = this._events[type];

		if (!listeners) {
			return;
		}

		if (!fn) {
			// Set all removed listeners to noop so they are not called if remove happens in fire
			for (i = 0, len = listeners.length; i < len; i++) {
				listeners[i].fn = __WEBPACK_IMPORTED_MODULE_1__Util__["m" /* falseFn */];
			}
			// clear all listeners for a type if function isn't specified
			delete this._events[type];
			return;
		}

		if (context === this) {
			context = undefined;
		}

		if (listeners) {

			// find fn and remove it
			for (i = 0, len = listeners.length; i < len; i++) {
				var l = listeners[i];
				if (l.ctx !== context) { continue; }
				if (l.fn === fn) {

					// set the removed listener to noop so that's not called if remove happens in fire
					l.fn = __WEBPACK_IMPORTED_MODULE_1__Util__["m" /* falseFn */];

					if (this._firingCount) {
						/* copy array in case events are being fired */
						this._events[type] = listeners = listeners.slice();
					}
					listeners.splice(i, 1);

					return;
				}
			}
		}
	},

	// @method fire(type: String, data?: Object, propagate?: Boolean): this
	// Fires an event of the specified type. You can optionally provide an data
	// object — the first argument of the listener function will contain its
	// properties. The event can optionally be propagated to event parents.
	fire: function (type, data, propagate) {
		if (!this.listens(type, propagate)) { return this; }

		var event = __WEBPACK_IMPORTED_MODULE_1__Util__["c" /* extend */]({}, data, {
			type: type,
			target: this,
			sourceTarget: data && data.sourceTarget || this
		});

		if (this._events) {
			var listeners = this._events[type];

			if (listeners) {
				this._firingCount = (this._firingCount + 1) || 1;
				for (var i = 0, len = listeners.length; i < len; i++) {
					var l = listeners[i];
					l.fn.call(l.ctx || this, event);
				}

				this._firingCount--;
			}
		}

		if (propagate) {
			// propagate the event to parents (set with addEventParent)
			this._propagateEvent(event);
		}

		return this;
	},

	// @method listens(type: String): Boolean
	// Returns `true` if a particular event type has any listeners attached to it.
	listens: function (type, propagate) {
		var listeners = this._events && this._events[type];
		if (listeners && listeners.length) { return true; }

		if (propagate) {
			// also check parents for listeners if event propagates
			for (var id in this._eventParents) {
				if (this._eventParents[id].listens(type, propagate)) { return true; }
			}
		}
		return false;
	},

	// @method once(…): this
	// Behaves as [`on(…)`](#evented-on), except the listener will only get fired once and then removed.
	once: function (types, fn, context) {

		if (typeof types === 'object') {
			for (var type in types) {
				this.once(type, types[type], fn);
			}
			return this;
		}

		var handler = __WEBPACK_IMPORTED_MODULE_1__Util__["g" /* bind */](function () {
			this
			    .off(types, fn, context)
			    .off(types, handler, context);
		}, this);

		// add a listener that's executed once and removed after that
		return this
		    .on(types, fn, context)
		    .on(types, handler, context);
	},

	// @method addEventParent(obj: Evented): this
	// Adds an event parent - an `Evented` that will receive propagated events
	addEventParent: function (obj) {
		this._eventParents = this._eventParents || {};
		this._eventParents[__WEBPACK_IMPORTED_MODULE_1__Util__["f" /* stamp */](obj)] = obj;
		return this;
	},

	// @method removeEventParent(obj: Evented): this
	// Removes an event parent, so it will stop receiving propagated events
	removeEventParent: function (obj) {
		if (this._eventParents) {
			delete this._eventParents[__WEBPACK_IMPORTED_MODULE_1__Util__["f" /* stamp */](obj)];
		}
		return this;
	},

	_propagateEvent: function (e) {
		for (var id in this._eventParents) {
			this._eventParents[id].fire(e.type, __WEBPACK_IMPORTED_MODULE_1__Util__["c" /* extend */]({
				layer: e.target,
				propagatedFrom: e.target
			}, e), true);
		}
	}
};

// aliases; we should ditch those eventually

// @method addEventListener(…): this
// Alias to [`on(…)`](#evented-on)
Events.addEventListener = Events.on;

// @method removeEventListener(…): this
// Alias to [`off(…)`](#evented-off)

// @method clearAllEventListeners(…): this
// Alias to [`off()`](#evented-off)
Events.removeEventListener = Events.clearAllEventListeners = Events.off;

// @method addOneTimeEventListener(…): this
// Alias to [`once(…)`](#evented-once)
Events.addOneTimeEventListener = Events.once;

// @method fireEvent(…): this
// Alias to [`fire(…)`](#evented-fire)
Events.fireEvent = Events.fire;

// @method hasEventListeners(…): Boolean
// Alias to [`listens(…)`](#evented-listens)
Events.hasEventListeners = Events.listens;

var Evented = __WEBPACK_IMPORTED_MODULE_0__Class__["a" /* Class */].extend(Events);


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = on;
/* harmony export (immutable) */ __webpack_exports__["c"] = off;
/* unused harmony export stopPropagation */
/* unused harmony export disableScrollPropagation */
/* unused harmony export disableClickPropagation */
/* harmony export (immutable) */ __webpack_exports__["f"] = preventDefault;
/* unused harmony export stop */
/* harmony export (immutable) */ __webpack_exports__["b"] = getMousePosition;
/* unused harmony export getWheelDelta */
/* unused harmony export fakeStop */
/* harmony export (immutable) */ __webpack_exports__["e"] = skipped;
/* harmony export (immutable) */ __webpack_exports__["d"] = isExternalTarget;
/* unused harmony export addListener */
/* unused harmony export removeListener */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometry_Point__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DomEvent_Pointer__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DomEvent_DoubleTap__ = __webpack_require__(191);






/*
 * @namespace DomEvent
 * Utility functions to work with the [DOM events](https://developer.mozilla.org/docs/Web/API/Event), used by Leaflet internally.
 */

// Inspired by John Resig, Dean Edwards and YUI addEvent implementations.

// @function on(el: HTMLElement, types: String, fn: Function, context?: Object): this
// Adds a listener function (`fn`) to a particular DOM event type of the
// element `el`. You can optionally specify the context of the listener
// (object the `this` keyword will point to). You can also pass several
// space-separated types (e.g. `'click dblclick'`).

// @alternative
// @function on(el: HTMLElement, eventMap: Object, context?: Object): this
// Adds a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
function on(obj, types, fn, context) {

	if (typeof types === 'object') {
		for (var type in types) {
			addOne(obj, type, types[type], fn);
		}
	} else {
		types = __WEBPACK_IMPORTED_MODULE_1__core_Util__["k" /* splitWords */](types);

		for (var i = 0, len = types.length; i < len; i++) {
			addOne(obj, types[i], fn, context);
		}
	}

	return this;
}

var eventsKey = '_leaflet_events';

// @function off(el: HTMLElement, types: String, fn: Function, context?: Object): this
// Removes a previously added listener function.
// Note that if you passed a custom context to on, you must pass the same
// context to `off` in order to remove the listener.

// @alternative
// @function off(el: HTMLElement, eventMap: Object, context?: Object): this
// Removes a set of type/listener pairs, e.g. `{click: onClick, mousemove: onMouseMove}`
function off(obj, types, fn, context) {

	if (typeof types === 'object') {
		for (var type in types) {
			removeOne(obj, type, types[type], fn);
		}
	} else if (types) {
		types = __WEBPACK_IMPORTED_MODULE_1__core_Util__["k" /* splitWords */](types);

		for (var i = 0, len = types.length; i < len; i++) {
			removeOne(obj, types[i], fn, context);
		}
	} else {
		for (var j in obj[eventsKey]) {
			removeOne(obj, j, obj[eventsKey][j]);
		}
		delete obj[eventsKey];
	}

	return this;
}

function addOne(obj, type, fn, context) {
	var id = type + __WEBPACK_IMPORTED_MODULE_1__core_Util__["f" /* stamp */](fn) + (context ? '_' + __WEBPACK_IMPORTED_MODULE_1__core_Util__["f" /* stamp */](context) : '');

	if (obj[eventsKey] && obj[eventsKey][id]) { return this; }

	var handler = function (e) {
		return fn.call(context || obj, e || window.event);
	};

	var originalHandler = handler;

	if (__WEBPACK_IMPORTED_MODULE_2__core_Browser__["i" /* pointer */] && type.indexOf('touch') === 0) {
		// Needs DomEvent.Pointer.js
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__DomEvent_Pointer__["a" /* addPointerListener */])(obj, type, handler, id);

	} else if (__WEBPACK_IMPORTED_MODULE_2__core_Browser__["c" /* touch */] && (type === 'dblclick') && __WEBPACK_IMPORTED_MODULE_4__DomEvent_DoubleTap__["a" /* addDoubleTapListener */] &&
	           !(__WEBPACK_IMPORTED_MODULE_2__core_Browser__["i" /* pointer */] && __WEBPACK_IMPORTED_MODULE_2__core_Browser__["j" /* chrome */])) {
		// Chrome >55 does not need the synthetic dblclicks from addDoubleTapListener
		// See #5180
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__DomEvent_DoubleTap__["a" /* addDoubleTapListener */])(obj, handler, id);

	} else if ('addEventListener' in obj) {

		if (type === 'mousewheel') {
			obj.addEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, false);

		} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
			handler = function (e) {
				e = e || window.event;
				if (isExternalTarget(obj, e)) {
					originalHandler(e);
				}
			};
			obj.addEventListener(type === 'mouseenter' ? 'mouseover' : 'mouseout', handler, false);

		} else {
			if (type === 'click' && __WEBPACK_IMPORTED_MODULE_2__core_Browser__["k" /* android */]) {
				handler = function (e) {
					filterClick(e, originalHandler);
				};
			}
			obj.addEventListener(type, handler, false);
		}

	} else if ('attachEvent' in obj) {
		obj.attachEvent('on' + type, handler);
	}

	obj[eventsKey] = obj[eventsKey] || {};
	obj[eventsKey][id] = handler;
}

function removeOne(obj, type, fn, context) {

	var id = type + __WEBPACK_IMPORTED_MODULE_1__core_Util__["f" /* stamp */](fn) + (context ? '_' + __WEBPACK_IMPORTED_MODULE_1__core_Util__["f" /* stamp */](context) : ''),
	    handler = obj[eventsKey] && obj[eventsKey][id];

	if (!handler) { return this; }

	if (__WEBPACK_IMPORTED_MODULE_2__core_Browser__["i" /* pointer */] && type.indexOf('touch') === 0) {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__DomEvent_Pointer__["b" /* removePointerListener */])(obj, type, id);

	} else if (__WEBPACK_IMPORTED_MODULE_2__core_Browser__["c" /* touch */] && (type === 'dblclick') && __WEBPACK_IMPORTED_MODULE_4__DomEvent_DoubleTap__["b" /* removeDoubleTapListener */] &&
	           !(__WEBPACK_IMPORTED_MODULE_2__core_Browser__["i" /* pointer */] && __WEBPACK_IMPORTED_MODULE_2__core_Browser__["j" /* chrome */])) {
		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__DomEvent_DoubleTap__["b" /* removeDoubleTapListener */])(obj, id);

	} else if ('removeEventListener' in obj) {

		if (type === 'mousewheel') {
			obj.removeEventListener('onwheel' in obj ? 'wheel' : 'mousewheel', handler, false);

		} else {
			obj.removeEventListener(
				type === 'mouseenter' ? 'mouseover' :
				type === 'mouseleave' ? 'mouseout' : type, handler, false);
		}

	} else if ('detachEvent' in obj) {
		obj.detachEvent('on' + type, handler);
	}

	obj[eventsKey][id] = null;
}

// @function stopPropagation(ev: DOMEvent): this
// Stop the given event from propagation to parent elements. Used inside the listener functions:
// ```js
// L.DomEvent.on(div, 'click', function (ev) {
// 	L.DomEvent.stopPropagation(ev);
// });
// ```
function stopPropagation(e) {

	if (e.stopPropagation) {
		e.stopPropagation();
	} else if (e.originalEvent) {  // In case of Leaflet event.
		e.originalEvent._stopped = true;
	} else {
		e.cancelBubble = true;
	}
	skipped(e);

	return this;
}

// @function disableScrollPropagation(el: HTMLElement): this
// Adds `stopPropagation` to the element's `'mousewheel'` events (plus browser variants).
function disableScrollPropagation(el) {
	addOne(el, 'mousewheel', stopPropagation);
	return this;
}

// @function disableClickPropagation(el: HTMLElement): this
// Adds `stopPropagation` to the element's `'click'`, `'doubleclick'`,
// `'mousedown'` and `'touchstart'` events (plus browser variants).
function disableClickPropagation(el) {
	on(el, 'mousedown touchstart dblclick', stopPropagation);
	addOne(el, 'click', fakeStop);
	return this;
}

// @function preventDefault(ev: DOMEvent): this
// Prevents the default action of the DOM Event `ev` from happening (such as
// following a link in the href of the a element, or doing a POST request
// with page reload when a `<form>` is submitted).
// Use it inside listener functions.
function preventDefault(e) {
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
	return this;
}

// @function stop(ev: DOMEvent): this
// Does `stopPropagation` and `preventDefault` at the same time.
function stop(e) {
	preventDefault(e);
	stopPropagation(e);
	return this;
}

// @function getMousePosition(ev: DOMEvent, container?: HTMLElement): Point
// Gets normalized mouse position from a DOM event relative to the
// `container` or to the whole page if not specified.
function getMousePosition(e, container) {
	if (!container) {
		return new __WEBPACK_IMPORTED_MODULE_0__geometry_Point__["b" /* Point */](e.clientX, e.clientY);
	}

	var rect = container.getBoundingClientRect();

	var scaleX = rect.width / container.offsetWidth || 1;
	var scaleY = rect.height / container.offsetHeight || 1;
	return new __WEBPACK_IMPORTED_MODULE_0__geometry_Point__["b" /* Point */](
		e.clientX / scaleX - rect.left - container.clientLeft,
		e.clientY / scaleY - rect.top - container.clientTop);
}

// Chrome on Win scrolls double the pixels as in other platforms (see #4538),
// and Firefox scrolls device pixels, not CSS pixels
var wheelPxFactor =
	(__WEBPACK_IMPORTED_MODULE_2__core_Browser__["l" /* win */] && __WEBPACK_IMPORTED_MODULE_2__core_Browser__["j" /* chrome */]) ? 2 * window.devicePixelRatio :
	__WEBPACK_IMPORTED_MODULE_2__core_Browser__["m" /* gecko */] ? window.devicePixelRatio : 1;

// @function getWheelDelta(ev: DOMEvent): Number
// Gets normalized wheel delta from a mousewheel DOM event, in vertical
// pixels scrolled (negative if scrolling down).
// Events from pointing devices without precise scrolling are mapped to
// a best guess of 60 pixels.
function getWheelDelta(e) {
	return (__WEBPACK_IMPORTED_MODULE_2__core_Browser__["n" /* edge */]) ? e.wheelDeltaY / 2 : // Don't trust window-geometry-based delta
	       (e.deltaY && e.deltaMode === 0) ? -e.deltaY / wheelPxFactor : // Pixels
	       (e.deltaY && e.deltaMode === 1) ? -e.deltaY * 20 : // Lines
	       (e.deltaY && e.deltaMode === 2) ? -e.deltaY * 60 : // Pages
	       (e.deltaX || e.deltaZ) ? 0 :	// Skip horizontal/depth wheel events
	       e.wheelDelta ? (e.wheelDeltaY || e.wheelDelta) / 2 : // Legacy IE pixels
	       (e.detail && Math.abs(e.detail) < 32765) ? -e.detail * 20 : // Legacy Moz lines
	       e.detail ? e.detail / -32765 * 60 : // Legacy Moz pages
	       0;
}

var skipEvents = {};

function fakeStop(e) {
	// fakes stopPropagation by setting a special event flag, checked/reset with skipped(e)
	skipEvents[e.type] = true;
}

function skipped(e) {
	var events = skipEvents[e.type];
	// reset when checking, as it's only used in map container and propagates outside of the map
	skipEvents[e.type] = false;
	return events;
}

// check if element really left/entered the event target (for mouseenter/mouseleave)
function isExternalTarget(el, e) {

	var related = e.relatedTarget;

	if (!related) { return true; }

	try {
		while (related && (related !== el)) {
			related = related.parentNode;
		}
	} catch (err) {
		return false;
	}
	return (related !== el);
}

var lastClick;

// this is a horrible workaround for a bug in Android where a single touch triggers two click events
function filterClick(e, handler) {
	var timeStamp = (e.timeStamp || (e.originalEvent && e.originalEvent.timeStamp)),
	    elapsed = lastClick && (timeStamp - lastClick);

	// are they closer together than 500ms yet more than 100ms?
	// Android typically triggers them ~300ms apart while multiple listeners
	// on the same event should be triggered far faster;
	// or check if click is simulated on the element, and if it is, reject any non-simulated events

	if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
		stop(e);
		return;
	}
	lastClick = timeStamp;

	handler(e);
}

// @function addListener(…): this
// Alias to [`L.DomEvent.on`](#domevent-on)


// @function removeListener(…): this
// Alias to [`L.DomEvent.off`](#domevent-off)



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Bounds;
/* harmony export (immutable) */ __webpack_exports__["b"] = toBounds;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Point__ = __webpack_require__(8);


/*
 * @class Bounds
 * @aka L.Bounds
 *
 * Represents a rectangular area in pixel coordinates.
 *
 * @example
 *
 * ```js
 * var p1 = L.point(10, 10),
 * p2 = L.point(40, 60),
 * bounds = L.bounds(p1, p2);
 * ```
 *
 * All Leaflet methods that accept `Bounds` objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:
 *
 * ```js
 * otherBounds.intersects([[10, 10], [40, 60]]);
 * ```
 *
 * Note that `Bounds` does not inherit from Leafet's `Class` object,
 * which means new classes can't inherit from it, and new methods
 * can't be added to it with the `include` function.
 */

function Bounds(a, b) {
	if (!a) { return; }

	var points = b ? [a, b] : a;

	for (var i = 0, len = points.length; i < len; i++) {
		this.extend(points[i]);
	}
}

Bounds.prototype = {
	// @method extend(point: Point): this
	// Extends the bounds to contain the given point.
	extend: function (point) { // (Point)
		point = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Point__["a" /* toPoint */])(point);

		// @property min: Point
		// The top left corner of the rectangle.
		// @property max: Point
		// The bottom right corner of the rectangle.
		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	// @method getCenter(round?: Boolean): Point
	// Returns the center point of the bounds.
	getCenter: function (round) {
		return new __WEBPACK_IMPORTED_MODULE_0__Point__["b" /* Point */](
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	// @method getBottomLeft(): Point
	// Returns the bottom-left point of the bounds.
	getBottomLeft: function () {
		return new __WEBPACK_IMPORTED_MODULE_0__Point__["b" /* Point */](this.min.x, this.max.y);
	},

	// @method getTopRight(): Point
	// Returns the top-right point of the bounds.
	getTopRight: function () { // -> Point
		return new __WEBPACK_IMPORTED_MODULE_0__Point__["b" /* Point */](this.max.x, this.min.y);
	},

	// @method getTopLeft(): Point
	// Returns the top-left point of the bounds (i.e. [`this.min`](#bounds-min)).
	getTopLeft: function () {
		return this.min; // left, top
	},

	// @method getBottomRight(): Point
	// Returns the bottom-right point of the bounds (i.e. [`this.max`](#bounds-max)).
	getBottomRight: function () {
		return this.max; // right, bottom
	},

	// @method getSize(): Point
	// Returns the size of the given bounds
	getSize: function () {
		return this.max.subtract(this.min);
	},

	// @method contains(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle contains the given one.
	// @alternative
	// @method contains(point: Point): Boolean
	// Returns `true` if the rectangle contains the given point.
	contains: function (obj) {
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof __WEBPACK_IMPORTED_MODULE_0__Point__["b" /* Point */]) {
			obj = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Point__["a" /* toPoint */])(obj);
		} else {
			obj = toBounds(obj);
		}

		if (obj instanceof Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	// @method intersects(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle intersects the given bounds. Two bounds
	// intersect if they have at least one point in common.
	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = toBounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	// @method overlaps(otherBounds: Bounds): Boolean
	// Returns `true` if the rectangle overlaps the given bounds. Two bounds
	// overlap if their intersection is an area.
	overlaps: function (bounds) { // (Bounds) -> Boolean
		bounds = toBounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xOverlaps = (max2.x > min.x) && (min2.x < max.x),
		    yOverlaps = (max2.y > min.y) && (min2.y < max.y);

		return xOverlaps && yOverlaps;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
};


// @factory L.bounds(corner1: Point, corner2: Point)
// Creates a Bounds object from two corners coordinate pairs.
// @alternative
// @factory L.bounds(points: Point[])
// Creates a Bounds object from the given array of points.
function toBounds(a, b) {
	if (!a || a instanceof Bounds) {
		return a;
	}
	return new Bounds(a, b);
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.latLngsToClipperPoints = undefined;

var _clipperLib = __webpack_require__(77);

/**
 * @method latLngsToClipperPoints
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @return {Array}
 */
var latLngsToClipperPoints = exports.latLngsToClipperPoints = function latLngsToClipperPoints(map, latLngs) {

    return latLngs.map(function (latLng) {
        var point = map.latLngToLayerPoint(latLng);
        return { X: point.x, Y: point.y };
    });
};

/**
 * @method clipperPolygonsToLatLngs
 * @param {Object} map
 * @param {Array} polygons
 * @return {Array}
 */
var clipperPolygonsToLatLngs = function clipperPolygonsToLatLngs(map, polygons) {

    return polygons.map(function (polygon) {

        return polygon.map(function (point) {
            var updatedPoint = new map.Point(point.X, point.Y);
            return map.layerPointToLatLng(updatedPoint);
        });
    });
};

/**
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @param {Object} options
 * @return {LatLng[]}
 */

exports.default = function (map, latLngs, options) {

    var points = _clipperLib.Clipper.CleanPolygon(latLngsToClipperPoints(map, latLngs), options.simplifyFactor);
    var polygons = _clipperLib.Clipper.SimplifyPolygon(points, _clipperLib.PolyFillType.pftNonZero);

    return clipperPolygonsToLatLngs(map, polygons);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fillPolygon = fillPolygon;

var _ramda = __webpack_require__(203);

var _clipperLib = __webpack_require__(77);

var _turfPolygon = __webpack_require__(202);

var _turfPolygon2 = _interopRequireDefault(_turfPolygon);

var _turfIntersect = __webpack_require__(201);

var _turfIntersect2 = _interopRequireDefault(_turfIntersect);

var _Polygon = __webpack_require__(26);

var _Simplify = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @method fillPolygon
 * @param {Object} map
 * @param {Array} polygons
 * @param {Object} options
 * @return {Array}
 */
function fillPolygon(map, polygon, options) {

    // Simplify the polygon which prevents voids in its shape.
    var points = (0, _Simplify.latLngsToClipperPoints)(map, polygon.getLatLngs()[0]);
    _clipperLib.Clipper.SimplifyPolygon(points, _clipperLib.PolyFillType.pftNonZero);
    (0, _Polygon.removeFor)(map, polygon);

    // Convert the Clipper points back into lat/lng pairs.
    var latLngs = points.map(function (model) {
        return map.layerPointToLatLng(new map.Point(model.X, model.Y));
    });

    (0, _Polygon.createFor)(map, latLngs, options, true);
}

/**
 * @method latLngsToTuple
 * @param {Array} latLngs
 * @return {Array}
 */
function latLngsToTuple(latLngs) {
    return latLngs.map(function (model) {
        return [model.lat, model.lng];
    });
}

function cleanGoogleLatLngs(point) {
    return typeof point.lat === 'function' ? { lat: point.lat(), lng: point.lng() } : point;
}

/**
 * @param {Object} map
 * @param {Array} polygons
 * @param {Object} options
 * @return {Array}
 */

exports.default = function (map, polygons, options) {

    // Transform a L.LatLng object into a GeoJSON polygon that TurfJS expects to receive.
    var toTurfPolygon = (0, _ramda.compose)(_turfPolygon2.default, function (x) {
        return [x];
    }, function (x) {
        return [].concat(_toConsumableArray(x), [(0, _ramda.head)(x)]);
    }, latLngsToTuple);

    var analysis = polygons.reduce(function (accum, polygon) {
        var _extends2;

        var latLngs = polygon.getLatLngs()[0].map(cleanGoogleLatLngs);
        var points = (0, _Simplify.latLngsToClipperPoints)(map, latLngs);
        var turfPolygon = toTurfPolygon(latLngs);

        // Determine if the current polygon intersects any of the other polygons currently on the map.
        var intersects = polygons.filter((0, _ramda.complement)((0, _ramda.identical)(polygon))).some(function (polygon) {
            return Boolean((0, _turfIntersect2.default)(turfPolygon, toTurfPolygon(polygon.getLatLngs()[0].map(cleanGoogleLatLngs))));
        });

        var key = intersects ? 'intersecting' : 'rest';

        return _extends({}, accum, (_extends2 = {}, _defineProperty(_extends2, key, [].concat(_toConsumableArray(accum[key]), [intersects ? points : latLngs])), _defineProperty(_extends2, 'intersectingPolygons', intersects ? [].concat(_toConsumableArray(accum.intersectingPolygons), [polygon]) : accum.intersectingPolygons), _extends2));
    }, { intersecting: [], rest: [], intersectingPolygons: [] });

    // Merge all of the polygons.
    var mergePolygons = _clipperLib.Clipper.SimplifyPolygons(analysis.intersecting, _clipperLib.PolyFillType.pftNonZero);

    // Remove all of the existing polygons that are intersecting another polygon.
    analysis.intersectingPolygons.forEach(function (polygon) {
        return (0, _Polygon.removeFor)(map, polygon);
    });

    return (0, _ramda.flatten)(mergePolygons.map(function (polygon) {

        // Determine if it's an intersecting polygon or not.
        var latLngs = polygon.map(function (model) {
            return map.layerPointToLatLng(new map.Point(model.X, model.Y));
        });

        // Create the polygon, but this time prevent any merging, otherwise we'll find ourselves
        // in an infinite loop.
        return (0, _Polygon.createFor)(map, latLngs, options, true);
    }));
};

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var matcher = function(selector) {
  return function() {
    return this.matches(selector);
  };
};

if (typeof document !== "undefined") {
  var element = document.documentElement;
  if (!element.matches) {
    var vendorMatches = element.webkitMatchesSelector
        || element.msMatchesSelector
        || element.mozMatchesSelector
        || element.oMatchesSelector;
    matcher = function(selector) {
      return function() {
        return vendorMatches.call(this, selector);
      };
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (matcher);


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = EnterNode;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sparse__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = (function() {
  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Selection */](this._enter || this._groups.map(__WEBPACK_IMPORTED_MODULE_0__sparse__["a" /* default */]), this._parents);
});

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(update) {
  return new Array(update.length);
});


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = styleValue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(33);


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ __webpack_exports__["b"] = (function(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
});

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__window__["a" /* default */])(node).getComputedStyle(node, null).getPropertyValue(name);
}


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function empty() {
  return [];
}

/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
});


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__curve_linear__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__line__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__point__ = __webpack_require__(37);






/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x0 = __WEBPACK_IMPORTED_MODULE_4__point__["a" /* x */],
      x1 = null,
      y0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(0),
      y1 = __WEBPACK_IMPORTED_MODULE_4__point__["b" /* y */],
      defined = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(true),
      context = null,
      curve = __WEBPACK_IMPORTED_MODULE_2__curve_linear__["a" /* default */],
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__line__["a" /* default */])().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
});


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return slice; });
var slice = Array.prototype.slice;


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = CardinalClosed;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cardinal__ = __webpack_require__(19);



function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__cardinal__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = CardinalOpen;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinal__ = __webpack_require__(19);


function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__cardinal__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(tension) {

  function cardinal(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0));


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return curveRadialLinear; });
/* harmony export (immutable) */ __webpack_exports__["a"] = curveRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__linear__ = __webpack_require__(20);


var curveRadialLinear = curveRadial(__WEBPACK_IMPORTED_MODULE_0__linear__["a" /* default */]);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = lineRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__curve_radial__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__line__ = __webpack_require__(35);



function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["a" /* default */])(_)) : c()._curve;
  };

  return l;
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return lineRadial(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__line__["a" /* default */])().curve(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["b" /* curveRadialLinear */]));
});


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
});


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(11);


/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / __WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */]);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, __WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */]);
  }
});


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
});


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
});


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
});


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math__ = __webpack_require__(11);


var ka = 0.89081309152928522810,
    kr = Math.sin(__WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */] / 10) / Math.sin(7 * __WEBPACK_IMPORTED_MODULE_0__math__["b" /* pi */] / 10),
    kx = Math.sin(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] / 10) * kr,
    ky = -Math.cos(__WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] / 10) * kr;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = __WEBPACK_IMPORTED_MODULE_0__math__["c" /* tau */] * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
});


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var sqrt3 = Math.sqrt(3);

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
});


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var c = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;

/* harmony default export */ __webpack_exports__["a"] = ({
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
});


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear



var value = __webpack_require__(2);

module.exports = function () {
	value(this).length = 0;
	return this;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(158)

  , max = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = { 'function': true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554



var isObject      = __webpack_require__(67)
  , value         = __webpack_require__(2)

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if ((prototype === null) || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}())));

__webpack_require__(163);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments = __webpack_require__(22)
  , callable    = __webpack_require__(3)
  , isString    = __webpack_require__(23)
  , get         = __webpack_require__(72)

  , isArray = Array.isArray, call = Function.prototype.call
  , some = Array.prototype.some;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(22)
  , isString       = __webpack_require__(23)
  , ArrayIterator  = __webpack_require__(174)
  , StringIterator = __webpack_require__(176)
  , iterable       = __webpack_require__(73)
  , iteratorSymbol = __webpack_require__(4).iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isIterable = __webpack_require__(175);

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _pointersCount; });
/* harmony export (immutable) */ __webpack_exports__["a"] = addPointerListener;
/* harmony export (immutable) */ __webpack_exports__["b"] = removePointerListener;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DomEvent__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Browser__ = __webpack_require__(7);




/*
 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
 */


var POINTER_DOWN =   __WEBPACK_IMPORTED_MODULE_2__core_Browser__["o" /* msPointer */] ? 'MSPointerDown'   : 'pointerdown';
var POINTER_MOVE =   __WEBPACK_IMPORTED_MODULE_2__core_Browser__["o" /* msPointer */] ? 'MSPointerMove'   : 'pointermove';
var POINTER_UP =     __WEBPACK_IMPORTED_MODULE_2__core_Browser__["o" /* msPointer */] ? 'MSPointerUp'     : 'pointerup';
var POINTER_CANCEL = __WEBPACK_IMPORTED_MODULE_2__core_Browser__["o" /* msPointer */] ? 'MSPointerCancel' : 'pointercancel';
var TAG_WHITE_LIST = ['INPUT', 'SELECT', 'OPTION'];

var _pointers = {};
var _pointerDocListener = false;

// DomEvent.DoubleTap needs to know about this
var _pointersCount = 0;

// Provides a touch events wrapper for (ms)pointer events.
// ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

function addPointerListener(obj, type, handler, id) {
	if (type === 'touchstart') {
		_addPointerStart(obj, handler, id);

	} else if (type === 'touchmove') {
		_addPointerMove(obj, handler, id);

	} else if (type === 'touchend') {
		_addPointerEnd(obj, handler, id);
	}

	return this;
}

function removePointerListener(obj, type, id) {
	var handler = obj['_leaflet_' + type + id];

	if (type === 'touchstart') {
		obj.removeEventListener(POINTER_DOWN, handler, false);

	} else if (type === 'touchmove') {
		obj.removeEventListener(POINTER_MOVE, handler, false);

	} else if (type === 'touchend') {
		obj.removeEventListener(POINTER_UP, handler, false);
		obj.removeEventListener(POINTER_CANCEL, handler, false);
	}

	return this;
}

function _addPointerStart(obj, handler, id) {
	var onDown = __WEBPACK_IMPORTED_MODULE_1__core_Util__["g" /* bind */](function (e) {
		if (e.pointerType !== 'mouse' && e.MSPOINTER_TYPE_MOUSE && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
			// In IE11, some touch events needs to fire for form controls, or
			// the controls will stop working. We keep a whitelist of tag names that
			// need these events. For other target tags, we prevent default on the event.
			if (TAG_WHITE_LIST.indexOf(e.target.tagName) < 0) {
				__WEBPACK_IMPORTED_MODULE_0__DomEvent__["f" /* preventDefault */](e);
			} else {
				return;
			}
		}

		_handlePointer(e, handler);
	});

	obj['_leaflet_touchstart' + id] = onDown;
	obj.addEventListener(POINTER_DOWN, onDown, false);

	// need to keep track of what pointers and how many are active to provide e.touches emulation
	if (!_pointerDocListener) {
		// we listen documentElement as any drags that end by moving the touch off the screen get fired there
		document.documentElement.addEventListener(POINTER_DOWN, _globalPointerDown, true);
		document.documentElement.addEventListener(POINTER_MOVE, _globalPointerMove, true);
		document.documentElement.addEventListener(POINTER_UP, _globalPointerUp, true);
		document.documentElement.addEventListener(POINTER_CANCEL, _globalPointerUp, true);

		_pointerDocListener = true;
	}
}

function _globalPointerDown(e) {
	_pointers[e.pointerId] = e;
	_pointersCount++;
}

function _globalPointerMove(e) {
	if (_pointers[e.pointerId]) {
		_pointers[e.pointerId] = e;
	}
}

function _globalPointerUp(e) {
	delete _pointers[e.pointerId];
	_pointersCount--;
}

function _handlePointer(e, handler) {
	e.touches = [];
	for (var i in _pointers) {
		e.touches.push(_pointers[i]);
	}
	e.changedTouches = [e];

	handler(e);
}

function _addPointerMove(obj, handler, id) {
	var onMove = function (e) {
		// don't fire touch moves when mouse isn't down
		if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }

		_handlePointer(e, handler);
	};

	obj['_leaflet_touchmove' + id] = onMove;
	obj.addEventListener(POINTER_MOVE, onMove, false);
}

function _addPointerEnd(obj, handler, id) {
	var onUp = function (e) {
		_handlePointer(e, handler);
	};

	obj['_leaflet_touchend' + id] = onUp;
	obj.addEventListener(POINTER_UP, onUp, false);
	obj.addEventListener(POINTER_CANCEL, onUp, false);
}



/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return TRANSFORM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TRANSITION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TRANSITION_END; });
/* harmony export (immutable) */ __webpack_exports__["f"] = get;
/* harmony export (immutable) */ __webpack_exports__["g"] = getStyle;
/* harmony export (immutable) */ __webpack_exports__["e"] = create;
/* harmony export (immutable) */ __webpack_exports__["d"] = remove;
/* unused harmony export empty */
/* unused harmony export toFront */
/* unused harmony export toBack */
/* unused harmony export hasClass */
/* harmony export (immutable) */ __webpack_exports__["c"] = addClass;
/* harmony export (immutable) */ __webpack_exports__["k"] = removeClass;
/* unused harmony export setClass */
/* unused harmony export getClass */
/* unused harmony export setOpacity */
/* unused harmony export testProp */
/* harmony export (immutable) */ __webpack_exports__["m"] = setTransform;
/* harmony export (immutable) */ __webpack_exports__["h"] = setPosition;
/* harmony export (immutable) */ __webpack_exports__["j"] = getPosition;
/* unused harmony export disableTextSelection */
/* unused harmony export enableTextSelection */
/* unused harmony export disableImageDrag */
/* unused harmony export enableImageDrag */
/* harmony export (immutable) */ __webpack_exports__["i"] = preventOutline;
/* unused harmony export restoreOutline */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DomEvent__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geometry_Point__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_Browser__ = __webpack_require__(7);





/*
 * @namespace DomUtil
 *
 * Utility functions to work with the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)
 * tree, used by Leaflet internally.
 *
 * Most functions expecting or returning a `HTMLElement` also work for
 * SVG elements. The only difference is that classes refer to CSS classes
 * in HTML and SVG classes in SVG.
 */


// @property TRANSFORM: String
// Vendor-prefixed transform style name (e.g. `'webkitTransform'` for WebKit).
var TRANSFORM = testProp(
	['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

// webkitTransition comes first because some browser versions that drop vendor prefix don't do
// the same for the transitionend event, in particular the Android 4.1 stock browser

// @property TRANSITION: String
// Vendor-prefixed transition style name.
var TRANSITION = testProp(
	['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

// @property TRANSITION_END: String
// Vendor-prefixed transitionend event name.
var TRANSITION_END =
	TRANSITION === 'webkitTransition' || TRANSITION === 'OTransition' ? TRANSITION + 'End' : 'transitionend';


// @function get(id: String|HTMLElement): HTMLElement
// Returns an element given its DOM id, or returns the element itself
// if it was passed directly.
function get(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
}

// @function getStyle(el: HTMLElement, styleAttrib: String): String
// Returns the value for a certain style attribute on an element,
// including computed values or values set through CSS.
function getStyle(el, style) {
	var value = el.style[style] || (el.currentStyle && el.currentStyle[style]);

	if ((!value || value === 'auto') && document.defaultView) {
		var css = document.defaultView.getComputedStyle(el, null);
		value = css ? css[style] : null;
	}
	return value === 'auto' ? null : value;
}

// @function create(tagName: String, className?: String, container?: HTMLElement): HTMLElement
// Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
function create(tagName, className, container) {
	var el = document.createElement(tagName);
	el.className = className || '';

	if (container) {
		container.appendChild(el);
	}
	return el;
}

// @function remove(el: HTMLElement)
// Removes `el` from its parent element
function remove(el) {
	var parent = el.parentNode;
	if (parent) {
		parent.removeChild(el);
	}
}

// @function empty(el: HTMLElement)
// Removes all of `el`'s children elements from `el`
function empty(el) {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}

// @function toFront(el: HTMLElement)
// Makes `el` the last child of its parent, so it renders in front of the other children.
function toFront(el) {
	var parent = el.parentNode;
	if (parent.lastChild !== el) {
		parent.appendChild(el);
	}
}

// @function toBack(el: HTMLElement)
// Makes `el` the first child of its parent, so it renders behind the other children.
function toBack(el) {
	var parent = el.parentNode;
	if (parent.firstChild !== el) {
		parent.insertBefore(el, parent.firstChild);
	}
}

// @function hasClass(el: HTMLElement, name: String): Boolean
// Returns `true` if the element's class attribute contains `name`.
function hasClass(el, name) {
	if (el.classList !== undefined) {
		return el.classList.contains(name);
	}
	var className = getClass(el);
	return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
}

// @function addClass(el: HTMLElement, name: String)
// Adds `name` to the element's class attribute.
function addClass(el, name) {
	if (el.classList !== undefined) {
		var classes = __WEBPACK_IMPORTED_MODULE_1__core_Util__["k" /* splitWords */](name);
		for (var i = 0, len = classes.length; i < len; i++) {
			el.classList.add(classes[i]);
		}
	} else if (!hasClass(el, name)) {
		var className = getClass(el);
		setClass(el, (className ? className + ' ' : '') + name);
	}
}

// @function removeClass(el: HTMLElement, name: String)
// Removes `name` from the element's class attribute.
function removeClass(el, name) {
	if (el.classList !== undefined) {
		el.classList.remove(name);
	} else {
		setClass(el, __WEBPACK_IMPORTED_MODULE_1__core_Util__["l" /* trim */]((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
	}
}

// @function setClass(el: HTMLElement, name: String)
// Sets the element's class.
function setClass(el, name) {
	if (el.className.baseVal === undefined) {
		el.className = name;
	} else {
		// in case of SVG element
		el.className.baseVal = name;
	}
}

// @function getClass(el: HTMLElement): String
// Returns the element's class.
function getClass(el) {
	return el.className.baseVal === undefined ? el.className : el.className.baseVal;
}

// @function setOpacity(el: HTMLElement, opacity: Number)
// Set the opacity of an element (including old IE support).
// `opacity` must be a number from `0` to `1`.
function setOpacity(el, value) {
	if ('opacity' in el.style) {
		el.style.opacity = value;
	} else if ('filter' in el.style) {
		_setOpacityIE(el, value);
	}
}

function _setOpacityIE(el, value) {
	var filter = false,
	    filterName = 'DXImageTransform.Microsoft.Alpha';

	// filters collection throws an error if we try to retrieve a filter that doesn't exist
	try {
		filter = el.filters.item(filterName);
	} catch (e) {
		// don't set opacity to 1 if we haven't already set an opacity,
		// it isn't needed and breaks transparent pngs.
		if (value === 1) { return; }
	}

	value = Math.round(value * 100);

	if (filter) {
		filter.Enabled = (value !== 100);
		filter.Opacity = value;
	} else {
		el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
	}
}

// @function testProp(props: String[]): String|false
// Goes through the array of style names and returns the first name
// that is a valid style name for an element. If no such name is found,
// it returns false. Useful for vendor-prefixed styles like `transform`.
function testProp(props) {
	var style = document.documentElement.style;

	for (var i = 0; i < props.length; i++) {
		if (props[i] in style) {
			return props[i];
		}
	}
	return false;
}

// @function setTransform(el: HTMLElement, offset: Point, scale?: Number)
// Resets the 3D CSS transform of `el` so it is translated by `offset` pixels
// and optionally scaled by `scale`. Does not have an effect if the
// browser doesn't support 3D CSS transforms.
function setTransform(el, offset, scale) {
	var pos = offset || new __WEBPACK_IMPORTED_MODULE_2__geometry_Point__["b" /* Point */](0, 0);

	el.style[TRANSFORM] =
		(__WEBPACK_IMPORTED_MODULE_3__core_Browser__["g" /* ie3d */] ?
			'translate(' + pos.x + 'px,' + pos.y + 'px)' :
			'translate3d(' + pos.x + 'px,' + pos.y + 'px,0)') +
		(scale ? ' scale(' + scale + ')' : '');
}

// @function setPosition(el: HTMLElement, position: Point)
// Sets the position of `el` to coordinates specified by `position`,
// using CSS translate or top/left positioning depending on the browser
// (used by Leaflet internally to position its layers).
function setPosition(el, point) {

	/*eslint-disable */
	el._leaflet_pos = point;
	/* eslint-enable */

	if (__WEBPACK_IMPORTED_MODULE_3__core_Browser__["a" /* any3d */]) {
		setTransform(el, point);
	} else {
		el.style.left = point.x + 'px';
		el.style.top = point.y + 'px';
	}
}

// @function getPosition(el: HTMLElement): Point
// Returns the coordinates of an element previously positioned with setPosition.
function getPosition(el) {
	// this method is only used for elements previously positioned using setPosition,
	// so it's safe to cache the position for performance

	return el._leaflet_pos || new __WEBPACK_IMPORTED_MODULE_2__geometry_Point__["b" /* Point */](0, 0);
}

// @function disableTextSelection()
// Prevents the user from generating `selectstart` DOM events, usually generated
// when the user drags the mouse through a page with text. Used internally
// by Leaflet to override the behaviour of any click-and-drag interaction on
// the map. Affects drag interactions on the whole document.

// @function enableTextSelection()
// Cancels the effects of a previous [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection).
var disableTextSelection;
var enableTextSelection;
var _userSelect;
if ('onselectstart' in document) {
	disableTextSelection = function () {
		__WEBPACK_IMPORTED_MODULE_0__DomEvent__["a" /* on */](window, 'selectstart', __WEBPACK_IMPORTED_MODULE_0__DomEvent__["f" /* preventDefault */]);
	};
	enableTextSelection = function () {
		__WEBPACK_IMPORTED_MODULE_0__DomEvent__["c" /* off */](window, 'selectstart', __WEBPACK_IMPORTED_MODULE_0__DomEvent__["f" /* preventDefault */]);
	};
} else {
	var userSelectProperty = testProp(
		['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

	disableTextSelection = function () {
		if (userSelectProperty) {
			var style = document.documentElement.style;
			_userSelect = style[userSelectProperty];
			style[userSelectProperty] = 'none';
		}
	};
	enableTextSelection = function () {
		if (userSelectProperty) {
			document.documentElement.style[userSelectProperty] = _userSelect;
			_userSelect = undefined;
		}
	};
}

// @function disableImageDrag()
// As [`L.DomUtil.disableTextSelection`](#domutil-disabletextselection), but
// for `dragstart` DOM events, usually generated when the user drags an image.
function disableImageDrag() {
	__WEBPACK_IMPORTED_MODULE_0__DomEvent__["a" /* on */](window, 'dragstart', __WEBPACK_IMPORTED_MODULE_0__DomEvent__["f" /* preventDefault */]);
}

// @function enableImageDrag()
// Cancels the effects of a previous [`L.DomUtil.disableImageDrag`](#domutil-disabletextselection).
function enableImageDrag() {
	__WEBPACK_IMPORTED_MODULE_0__DomEvent__["c" /* off */](window, 'dragstart', __WEBPACK_IMPORTED_MODULE_0__DomEvent__["f" /* preventDefault */]);
}

var _outlineElement, _outlineStyle;
// @function preventOutline(el: HTMLElement)
// Makes the [outline](https://developer.mozilla.org/docs/Web/CSS/outline)
// of the element `el` invisible. Used internally by Leaflet to prevent
// focusable elements from displaying an outline when the user performs a
// drag interaction on them.
function preventOutline(element) {
	while (element.tabIndex === -1) {
		element = element.parentNode;
	}
	if (!element.style) { return; }
	restoreOutline();
	_outlineElement = element;
	_outlineStyle = element.style.outline;
	element.style.outline = 'none';
	__WEBPACK_IMPORTED_MODULE_0__DomEvent__["a" /* on */](window, 'keydown', restoreOutline);
}

// @function restoreOutline()
// Cancels the effects of a previous [`L.DomUtil.preventOutline`]().
function restoreOutline() {
	if (!_outlineElement) { return; }
	_outlineElement.style.outline = _outlineStyle;
	_outlineElement = undefined;
	_outlineStyle = undefined;
	__WEBPACK_IMPORTED_MODULE_0__DomEvent__["c" /* off */](window, 'keydown', restoreOutline);
}


/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Earth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CRS__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Util__ = __webpack_require__(0);



/*
 * @namespace CRS
 * @crs L.CRS.Earth
 *
 * Serves as the base for CRS that are global such that they cover the earth.
 * Can only be used as the base for other CRS and cannot be used directly,
 * since it does not have a `code`, `projection` or `transformation`. `distance()` returns
 * meters.
 */

var Earth = __WEBPACK_IMPORTED_MODULE_1__core_Util__["c" /* extend */]({}, __WEBPACK_IMPORTED_MODULE_0__CRS__["a" /* CRS */], {
	wrapLng: [-180, 180],

	// Mean Earth Radius, as recommended for use by
	// the International Union of Geodesy and Geophysics,
	// see http://rosettacode.org/wiki/Haversine_formula
	R: 6371000,

	// distance between two geographical points using spherical law of cosines approximation
	distance: function (latlng1, latlng2) {
		var rad = Math.PI / 180,
		    lat1 = latlng1.lat * rad,
		    lat2 = latlng2.lat * rad,
		    sinDLat = Math.sin((latlng2.lat - latlng1.lat) * rad / 2),
		    sinDLon = Math.sin((latlng2.lng - latlng1.lng) * rad / 2),
		    a = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon,
		    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return this.R * c;
	}
});


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("clipper-lib");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("leaflet");

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function latLngToContainerPoint(_latLng, map) {
	var latLng = typeof _latLng.lat === 'function' ? _latLng : new map.LatLng(_latLng);
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = Math.pow(2, map.getZoom());
	var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
	return new map.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

function containerPointToLatLng(pixel, map) {
	var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
	var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
	var scale = 1 << map.getZoom();
	var worldPoint = new map.Point(pixel.x / scale + bottomLeft.x, pixel.y / scale + topRight.y);
	var t = map.getProjection().fromPointToLatLng(worldPoint);

	return t;
}

var NOOP = function NOOP() {};

function createGoogleMarker(map, latLng, icon, options, fdOptions) {
	var marker = new google.maps.Marker({
		position: latLng,
		icon: {
			path: 'M-6,0a6,6 0 1,0 12,0a6,6 0 1,0 -12,0',
			scale: fdOptions.hideDisabledEdges && !options.isEnabled ? 0 : 1.25,
			strokeWeight: 2,
			fillColor: options.isEnabled ? '#95bc59' : '#adadad',
			strokeColor: '#fff',
			fillOpacity: 1
		},
		cursor: 'move'
	});
	marker.setMap(map);

	marker.on = function (event, handler) {
		google.maps.event.addListener(marker, event, handler);
	};

	marker.getLatLng = marker.getPosition;
	marker.setLatLng = marker.setPosition;

	marker.disableClickPropagation = function () {};
	marker.toggle = function (enabled) {
		marker.setCursor(enabled ? 'move' : 'pointer');
		marker.setIcon(_extends({}, marker.icon, {
			fillColor: enabled ? '#95bc59' : '#adadad',
			scale: fdOptions.hideDisabledEdges && !enabled ? 0 : 1.25
		}));
	};

	return marker;
}

function createGooglePolygon(map, latLngs, options) {
	var polygon = new google.maps.Polygon(_extends({}, options, {
		strokeColor: '#50622b',
		strokeOpacity: 0.75,
		strokeWeight: 0,
		paths: [latLngs],
		clickable: false
	}));

	var polyline = new google.maps.Polyline({
		path: latLngs.concat(latLngs[0]),
		clickable: true,
		strokeColor: '#50622b',
		strokeOpacity: 0.75,
		strokeWeight: 2
	});

	polygon._setMap = polygon._setMap || polygon.setMap;
	polygon.setMap = function (map) {
		polygon._setMap(map);
		polyline.setMap(map);
	};

	polyline.setMap(map);

	polygon.getLatLngs = function () {
		return polygon.getPaths().getArray().map(function (a) {
			return a.getArray();
		});
	};

	polygon.setLatLngs = function (latLngs) {
		polygon.setPaths(latLngs);
		polyline.setPath(latLngs.concat(latLngs[0]));
	};

	polygon.setMap(map);

	polygon.redraw = NOOP;
	polygon.disableClickPropagation = NOOP;
	polygon.on = function (event, handler) {
		google.maps.event.addListener(polyline, event, function (event) {
			handler.call(polygon, event);
		});
	};
	polygon.off = NOOP;
	polygon.toggle = function (editEnabled, appendEnabled) {
		polyline.setOptions({
			clickable: appendEnabled
		});
	};

	return polygon;
}

var GoogleFreeDrawConfig = exports.GoogleFreeDrawConfig = {
	onMapInit: function onMapInit(map, fdOptions) {
		map.eventMap = {};

		map._container = map.getDiv();

		map.removeLayer = function (element) {
			element && element.setMap && element.setMap(null);
		};

		map.on = function (event, handler) {
			var events = event.split(' ');
			events.forEach(function (eventName) {
				map.eventMap[eventName] = map.eventMap[eventName] || {};

				if (map.eventMap[eventName][handler]) {
					return;
				}

				map.eventMap[eventName][handler] = google.maps.event.addListener(map, eventName, handler);
			});
		};

		map.off = function (event, handler) {
			var events = event.split(' ');
			events.forEach(function (eventName) {
				var eventId = map.eventMap[eventName] && map.eventMap[eventName][handler];

				if (eventId) {
					google.maps.event.removeListener(eventId);
					delete map.eventMap[eventName][handler];
				}
			});
		};
		map.fire = function (event, eventArgs) {
			return google.maps.event.trigger(map, event, eventArgs);
		};

		map.latLngToContainerPoint = function (latLng) {
			return latLngToContainerPoint(latLng, map);
		};
		map.mouseEventToContainerPoint = function (event) {
			return event.pixel || latLngToContainerPoint(event.latLng, map);
		};
		map.containerPointToLatLng = function (point) {
			return containerPointToLatLng(point, map);
		};
		map.latLngToLayerPoint = map.latLngToContainerPoint;
		map.layerPointToLatLng = map.containerPointToLatLng;

		map.Point = google.maps.Point;
		map.LatLng = google.maps.LatLng;

		map.dragging = map.dragging || {
			enable: function enable() {
				return map.setOptions({ draggable: true, draggableCursor: '' });
			},
			disable: function disable() {
				return map.setOptions({ draggable: false, draggableCursor: 'crosshair' });
			}
		};

		map.createMarker = function (latLng, icon, options) {
			return createGoogleMarker(map, latLng, icon, options, fdOptions);
		};
		map.createPolygon = function (latLngs, options) {
			return createGooglePolygon(map, latLngs, options);
		};
		map.makeLatLng = function (latLng) {
			if (latLng instanceof map.LatLng) {
				return latLng;
			}

			if (latLng.lat && latLng.lng) {
				return new map.LatLng(latLng);
			}

			if (latLng[0] && latLng[1]) {
				return new map.LatLng(latLng[0], latLng[1]);
			}

			return latLng;
		};
	}
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.LeafletFreeDrawConfig = undefined;

var _leaflet = __webpack_require__(78);

var NOOP = function NOOP() {};

function createLeafletMarker(map, latLng, iconSettings, options, fdOptions) {
	var icon = new _leaflet.DivIcon(iconSettings);
	var marker = new _leaflet.Marker(latLng, { icon: icon }).addTo(map);

	marker.disableClickPropagation = function () {
		return _leaflet.DomEvent.disableClickPropagation(marker);
	};
	marker.toggle = function (enabled) {
		if (enabled) {
			_leaflet.DomUtil.removeClass(marker._icon, 'disabled');
			if (fdOptions.hideDisabledEdges) {
				marker._icon.style.display = '';
			}
		} else {
			_leaflet.DomUtil.addClass(marker._icon, 'disabled');
			if (fdOptions.hideDisabledEdges) {
				marker._icon.style.display = 'none';
			}
		}
	};
	return marker;
}

function createLeafletPolygon(map, latLngs, options) {
	var polygon = new _leaflet.Polygon(latLngs, options).addTo(map);
	polygon.disableClickPropagation = function () {
		return _leaflet.DomEvent.disableClickPropagation(polygon);
	};
	polygon.toggle = NOOP;

	return polygon;
}

var LeafletFreeDrawConfig = exports.LeafletFreeDrawConfig = {
	onMapInit: function onMapInit(map, fdOptions) {
		map.createMarker = function (latLng, icon, options) {
			return createLeafletMarker(map, latLng, icon, options, fdOptions);
		};
		map.Point = _leaflet.Point;
		map.LatLng = _leaflet.LatLng;
		map.createPolygon = function (latLngs, options) {
			return createLeafletPolygon(map, latLngs, options, fdOptions);
		};
		map.makeLatLng = function (l) {
			if (l instanceof map.LatLng || l.lat && l.lng) {
				return l;
			}
			return l;
		};
	}
};

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_creator__ = __webpack_require__(27);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "creator", function() { return __WEBPACK_IMPORTED_MODULE_0__src_creator__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_local__ = __webpack_require__(93);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "local", function() { return __WEBPACK_IMPORTED_MODULE_1__src_local__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_matcher__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "matcher", function() { return __WEBPACK_IMPORTED_MODULE_2__src_matcher__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mouse__ = __webpack_require__(94);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "mouse", function() { return __WEBPACK_IMPORTED_MODULE_3__src_mouse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_namespace__ = __webpack_require__(28);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "namespace", function() { return __WEBPACK_IMPORTED_MODULE_4__src_namespace__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_namespaces__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "namespaces", function() { return __WEBPACK_IMPORTED_MODULE_5__src_namespaces__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_point__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "clientPoint", function() { return __WEBPACK_IMPORTED_MODULE_6__src_point__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_select__ = __webpack_require__(95);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return __WEBPACK_IMPORTED_MODULE_7__src_select__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_selectAll__ = __webpack_require__(96);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selectAll", function() { return __WEBPACK_IMPORTED_MODULE_8__src_selectAll__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_selection_index__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selection", function() { return __WEBPACK_IMPORTED_MODULE_9__src_selection_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_selector__ = __webpack_require__(31);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selector", function() { return __WEBPACK_IMPORTED_MODULE_10__src_selector__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_selectorAll__ = __webpack_require__(50);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "selectorAll", function() { return __WEBPACK_IMPORTED_MODULE_11__src_selectorAll__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_selection_style__ = __webpack_require__(49);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "style", function() { return __WEBPACK_IMPORTED_MODULE_12__src_selection_style__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_touch__ = __webpack_require__(123);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "touch", function() { return __WEBPACK_IMPORTED_MODULE_13__src_touch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_touches__ = __webpack_require__(124);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "touches", function() { return __WEBPACK_IMPORTED_MODULE_14__src_touches__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_window__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "window", function() { return __WEBPACK_IMPORTED_MODULE_15__src_window__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_selection_on__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "event", function() { return __WEBPACK_IMPORTED_MODULE_16__src_selection_on__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "customEvent", function() { return __WEBPACK_IMPORTED_MODULE_16__src_selection_on__["b"]; });



















/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_arc__ = __webpack_require__(125);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "arc", function() { return __WEBPACK_IMPORTED_MODULE_0__src_arc__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_area__ = __webpack_require__(51);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "area", function() { return __WEBPACK_IMPORTED_MODULE_1__src_area__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_line__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return __WEBPACK_IMPORTED_MODULE_2__src_line__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_pie__ = __webpack_require__(146);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pie", function() { return __WEBPACK_IMPORTED_MODULE_3__src_pie__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__ = __webpack_require__(126);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "areaRadial", function() { return __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "radialArea", function() { return __WEBPACK_IMPORTED_MODULE_4__src_areaRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "lineRadial", function() { return __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "radialLine", function() { return __WEBPACK_IMPORTED_MODULE_5__src_lineRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_pointRadial__ = __webpack_require__(57);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pointRadial", function() { return __WEBPACK_IMPORTED_MODULE_6__src_pointRadial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_link_index__ = __webpack_require__(138);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkHorizontal", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkVertical", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "linkRadial", function() { return __WEBPACK_IMPORTED_MODULE_7__src_link_index__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_symbol__ = __webpack_require__(148);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbol", function() { return __WEBPACK_IMPORTED_MODULE_8__src_symbol__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbols", function() { return __WEBPACK_IMPORTED_MODULE_8__src_symbol__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_symbol_circle__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolCircle", function() { return __WEBPACK_IMPORTED_MODULE_9__src_symbol_circle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_symbol_cross__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolCross", function() { return __WEBPACK_IMPORTED_MODULE_10__src_symbol_cross__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_symbol_diamond__ = __webpack_require__(60);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolDiamond", function() { return __WEBPACK_IMPORTED_MODULE_11__src_symbol_diamond__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_symbol_square__ = __webpack_require__(61);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolSquare", function() { return __WEBPACK_IMPORTED_MODULE_12__src_symbol_square__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__src_symbol_star__ = __webpack_require__(62);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolStar", function() { return __WEBPACK_IMPORTED_MODULE_13__src_symbol_star__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__src_symbol_triangle__ = __webpack_require__(63);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolTriangle", function() { return __WEBPACK_IMPORTED_MODULE_14__src_symbol_triangle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__src_symbol_wye__ = __webpack_require__(64);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "symbolWye", function() { return __WEBPACK_IMPORTED_MODULE_15__src_symbol_wye__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__src_curve_basisClosed__ = __webpack_require__(127);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasisClosed", function() { return __WEBPACK_IMPORTED_MODULE_16__src_curve_basisClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__src_curve_basisOpen__ = __webpack_require__(128);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasisOpen", function() { return __WEBPACK_IMPORTED_MODULE_17__src_curve_basisOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__src_curve_basis__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBasis", function() { return __WEBPACK_IMPORTED_MODULE_18__src_curve_basis__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__src_curve_bundle__ = __webpack_require__(129);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveBundle", function() { return __WEBPACK_IMPORTED_MODULE_19__src_curve_bundle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__src_curve_cardinalClosed__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinalClosed", function() { return __WEBPACK_IMPORTED_MODULE_20__src_curve_cardinalClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__src_curve_cardinalOpen__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinalOpen", function() { return __WEBPACK_IMPORTED_MODULE_21__src_curve_cardinalOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__src_curve_cardinal__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCardinal", function() { return __WEBPACK_IMPORTED_MODULE_22__src_curve_cardinal__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__src_curve_catmullRomClosed__ = __webpack_require__(130);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRomClosed", function() { return __WEBPACK_IMPORTED_MODULE_23__src_curve_catmullRomClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__src_curve_catmullRomOpen__ = __webpack_require__(131);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRomOpen", function() { return __WEBPACK_IMPORTED_MODULE_24__src_curve_catmullRomOpen__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__src_curve_catmullRom__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveCatmullRom", function() { return __WEBPACK_IMPORTED_MODULE_25__src_curve_catmullRom__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__src_curve_linearClosed__ = __webpack_require__(132);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveLinearClosed", function() { return __WEBPACK_IMPORTED_MODULE_26__src_curve_linearClosed__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__src_curve_linear__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveLinear", function() { return __WEBPACK_IMPORTED_MODULE_27__src_curve_linear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__ = __webpack_require__(133);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneX", function() { return __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneY", function() { return __WEBPACK_IMPORTED_MODULE_28__src_curve_monotone__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__src_curve_natural__ = __webpack_require__(134);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveNatural", function() { return __WEBPACK_IMPORTED_MODULE_29__src_curve_natural__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__src_curve_step__ = __webpack_require__(135);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStep", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStepAfter", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveStepBefore", function() { return __WEBPACK_IMPORTED_MODULE_30__src_curve_step__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__src_stack__ = __webpack_require__(147);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stack", function() { return __WEBPACK_IMPORTED_MODULE_31__src_stack__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__src_offset_expand__ = __webpack_require__(140);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetExpand", function() { return __WEBPACK_IMPORTED_MODULE_32__src_offset_expand__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__src_offset_diverging__ = __webpack_require__(139);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetDiverging", function() { return __WEBPACK_IMPORTED_MODULE_33__src_offset_diverging__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__src_offset_none__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetNone", function() { return __WEBPACK_IMPORTED_MODULE_34__src_offset_none__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__src_offset_silhouette__ = __webpack_require__(141);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetSilhouette", function() { return __WEBPACK_IMPORTED_MODULE_35__src_offset_silhouette__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__src_offset_wiggle__ = __webpack_require__(142);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOffsetWiggle", function() { return __WEBPACK_IMPORTED_MODULE_36__src_offset_wiggle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__src_order_ascending__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderAscending", function() { return __WEBPACK_IMPORTED_MODULE_37__src_order_ascending__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__src_order_descending__ = __webpack_require__(143);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderDescending", function() { return __WEBPACK_IMPORTED_MODULE_38__src_order_descending__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__src_order_insideOut__ = __webpack_require__(144);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderInsideOut", function() { return __WEBPACK_IMPORTED_MODULE_39__src_order_insideOut__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__src_order_none__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderNone", function() { return __WEBPACK_IMPORTED_MODULE_40__src_order_none__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__src_order_reverse__ = __webpack_require__(145);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "stackOrderReverse", function() { return __WEBPACK_IMPORTED_MODULE_41__src_order_reverse__["a"]; });




 // Note: radialArea is deprecated!
 // Note: radialLine is deprecated!









































/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(177)() ? Set : __webpack_require__(180);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(185)() ? WeakMap : __webpack_require__(187);


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeatureGroup", function() { return FeatureGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "featureGroup", function() { return featureGroup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LayerGroup__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geo_LatLngBounds__ = __webpack_require__(25);



/*
 * @class FeatureGroup
 * @aka L.FeatureGroup
 * @inherits LayerGroup
 *
 * Extended `LayerGroup` that makes it easier to do the same thing to all its member layers:
 *  * [`bindPopup`](#layer-bindpopup) binds a popup to all of the layers at once (likewise with [`bindTooltip`](#layer-bindtooltip))
 *  * Events are propagated to the `FeatureGroup`, so if the group has an event
 * handler, it will handle events from any of the layers. This includes mouse events
 * and custom events.
 *  * Has `layeradd` and `layerremove` events
 *
 * @example
 *
 * ```js
 * L.featureGroup([marker1, marker2, polyline])
 * 	.bindPopup('Hello world!')
 * 	.on('click', function() { alert('Clicked on a member of the group!'); })
 * 	.addTo(map);
 * ```
 */

var FeatureGroup = __WEBPACK_IMPORTED_MODULE_0__LayerGroup__["a" /* LayerGroup */].extend({

	addLayer: function (layer) {
		if (this.hasLayer(layer)) {
			return this;
		}

		layer.addEventParent(this);

		__WEBPACK_IMPORTED_MODULE_0__LayerGroup__["a" /* LayerGroup */].prototype.addLayer.call(this, layer);

		// @event layeradd: LayerEvent
		// Fired when a layer is added to this `FeatureGroup`
		return this.fire('layeradd', {layer: layer});
	},

	removeLayer: function (layer) {
		if (!this.hasLayer(layer)) {
			return this;
		}
		if (layer in this._layers) {
			layer = this._layers[layer];
		}

		layer.removeEventParent(this);

		__WEBPACK_IMPORTED_MODULE_0__LayerGroup__["a" /* LayerGroup */].prototype.removeLayer.call(this, layer);

		// @event layerremove: LayerEvent
		// Fired when a layer is removed from this `FeatureGroup`
		return this.fire('layerremove', {layer: layer});
	},

	// @method setStyle(style: Path options): this
	// Sets the given path options to each layer of the group that has a `setStyle` method.
	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	// @method bringToFront(): this
	// Brings the layer group to the top of all other layers
	bringToFront: function () {
		return this.invoke('bringToFront');
	},

	// @method bringToBack(): this
	// Brings the layer group to the back of all other layers
	bringToBack: function () {
		return this.invoke('bringToBack');
	},

	// @method getBounds(): LatLngBounds
	// Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
	getBounds: function () {
		var bounds = new __WEBPACK_IMPORTED_MODULE_1__geo_LatLngBounds__["a" /* LatLngBounds */]();

		for (var id in this._layers) {
			var layer = this._layers[id];
			bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
		}
		return bounds;
	}
});

// @factory L.featureGroup(layers: Layer[])
// Create a feature group, optionally given an initial set of layers.
var featureGroup = function (layers) {
	return new FeatureGroup(layers);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concavehull = __webpack_require__(89);

var _concavehull2 = _interopRequireDefault(_concavehull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @param {Object} map
 * @param {LatLng[]} latLngs
 * @return {LatLng[]}
 */
exports.default = function (map, latLngs) {
  return new _concavehull2.default([].concat(_toConsumableArray(latLngs), [latLngs[0]])).getLatLngs();
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.setClass = setClass;
exports.getClass = getClass;
exports.trim = trim;
exports.splitWords = splitWords;
// @function hasClass(el: HTMLElement, name: String): Boolean
// Returns `true` if the element's class attribute contains `name`.
function hasClass(el, name) {
	if (el.classList !== undefined) {
		return el.classList.contains(name);
	}
	var className = getClass(el);
	return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
}

// @function addClass(el: HTMLElement, name: String)
// Adds `name` to the element's class attribute.
function addClass(el, name) {
	if (el.classList !== undefined) {
		var classes = splitWords(name);
		for (var i = 0, len = classes.length; i < len; i++) {
			el.classList.add(classes[i]);
		}
	} else if (!hasClass(el, name)) {
		var className = getClass(el);
		setClass(el, (className ? className + ' ' : '') + name);
	}
}

// @function removeClass(el: HTMLElement, name: String)
// Removes `name` from the element's class attribute.
function removeClass(el, name) {
	if (el.classList !== undefined) {
		el.classList.remove(name);
	} else {
		setClass(el, trim((' ' + getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
	}
}

// @function setClass(el: HTMLElement, name: String)
// Sets the element's class.
function setClass(el, name) {
	if (el.className.baseVal === undefined) {
		el.className = name;
	} else {
		// in case of SVG element
		el.className.baseVal = name;
	}
}

// @function getClass(el: HTMLElement): String
// Returns the element's class.
function getClass(el) {
	return el.className.baseVal === undefined ? el.className : el.className.baseVal;
}

// @function trim(str: String): String
// Compatibility polyfill for [String.prototype.trim](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)
function trim(str) {
	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

// @function splitWords(str: String): String[]
// Trims and splits the string on whitespace and returns the array of parts.
function splitWords(str) {
	return trim(str).split(/\s+/);
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createEdges;

var _FreeDraw = __webpack_require__(9);

var _Layer = __webpack_require__(16);

var _Flags = __webpack_require__(15);

var _Merge = __webpack_require__(45);

var _Merge2 = _interopRequireDefault(_Merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method createEdges
 * @param {Object} map
 * @param {L.Polygon} polygon
 * @param {Object} options
 * @return {Array}
 */
function createEdges(map, polygon, options) {

    /**
     * @method fetchLayerPoints
     * @param polygon {Object}
     * @return {Array}
     */
    var fetchLayerPoints = function fetchLayerPoints(polygon) {

        return polygon.getLatLngs()[0].map(function (latLng) {
            return map.latLngToLayerPoint(latLng);
        });
    };

    var markers = fetchLayerPoints(polygon).map(function (point) {
        var mode = map[_FreeDraw.modesKey];
        var isEnabled = mode & _Flags.EDIT;
        var latLng = map.layerPointToLatLng(point);
        var marker = map.createMarker(latLng, { className: ('leaflet-edge ' + (isEnabled ? '' : 'disabled')).trim() }, _extends({}, options, { isEnabled: isEnabled }));

        marker.disableClickPropagation();

        marker.on('mousedown', function mouseDown() {

            if (!(map[_FreeDraw.modesKey] & _Flags.EDIT)) {

                // Polygons can only be created when the mode includes edit.
                map.off('mousedown', mouseDown);
                return;
            }

            // Disable the map dragging as otherwise it's difficult to reposition the edge.
            map.dragging.disable();

            /**
             * @method mouseMove
             * @param {Object} event
             * @return {void}
             */
            var mouseMove = function mouseMove(event) {

                // Determine where to move the marker to from the mouse move event.
                var containerPoint = map.latLngToContainerPoint(event.latlng || event.latLng);
                var latLng = map.containerPointToLatLng(containerPoint);

                // Update the marker with the new lat/lng.
                marker.setLatLng(latLng);

                // ...And finally update the polygon to match the current markers.
                var latLngs = markers.map(function (marker) {
                    return marker.getLatLng();
                });

                polygon.setLatLngs(latLngs);
                polygon.redraw();
            };

            // Listen for the mouse move events to determine where to move the marker to.
            map.on('mousemove', mouseMove);

            /**
             * @method mouseUp
             * @return {void}
             */
            function mouseUp() {

                if (!(map[_FreeDraw.modesKey] & _Flags.CREATE)) {

                    // Re-enable the dragging of the map only if created mode is not enabled.
                    map.dragging.enable();
                }

                // Stop listening to the events.
                map.off('mouseup', mouseUp);
                map.off('mousedown', mouseDown);
                map.off('mousemove', mouseMove);

                // Attempt to simplify the polygon to prevent voids in the polygon.
                (0, _Merge.fillPolygon)(map, polygon, options);

                // Merge the polygons if the options allow using a two-pass approach as this yields the better results.
                var merge = function merge() {
                    return (0, _Merge2.default)(map, Array.from(_FreeDraw.polygons.get(map)), options);
                };
                options.mergePolygons && merge() && merge();

                // Trigger the event for having modified the edges of a polygon, unless the `notifyAfterEditExit`
                // option is equal to `true`, in which case we'll defer the notification.
                options.notifyAfterEditExit ? function () {

                    // Deferred function that will be invoked by `modeFor` when the `EDIT` mode is exited.
                    map[_FreeDraw.notifyDeferredKey] = function () {
                        return (0, _Layer.updateFor)(map, 'edit');
                    };
                }() : (0, _Layer.updateFor)(map, 'edit');
            }

            // Cleanup the mouse events when the user releases the mouse button.
            // We need to listen on both map and marker, because if the user moves the edge too quickly then
            // the mouse up will occur on the map layer.
            map.on('mouseup', mouseUp);
            marker.on('mouseup', mouseUp);
        });

        return marker;
    });

    return markers;
}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! concavehull by Adam Timberlake <adam.timberlake@gmail.com> created on 2015-01-23 */
!function(a){"use strict";var b=function(a,b){var c=this.convertLatLngs(a);this.points=c.points,this.maxDistance=isFinite(b)?b:c.maxDistance+1};b.prototype={points:[],maxDistance:0,convertLatLngs:function(a){var b=0,c=a.map(function(c,d){if(c.x=c.lng,c.y=this.lat2y(c),a[d-1]){var e=this.distanceTo(c,a[d-1]);e>b&&(b=e)}return c}.bind(this));return{points:c,maxDistance:b}},distanceTo:function(b,c){var d=6378137,e=a.PI/180,f=(c.lat-b.lat)*e,g=(c.lng-b.lng)*e,h=b.lat*e,i=c.lat*e,j=a.sin(f/2),k=a.sin(g/2),l=j*j+k*k*a.cos(h)*a.cos(i);return 2*d*a.atan2(a.sqrt(l),a.sqrt(1-l))},getLatLngs:function(){if(this.length<=3)return this.points;var a=this.points.slice().sort(function(a,b){return a.y-b.y}),b=[],c=a[0],d=c,e={x:d.x,y:d.y-1};b.push(c);for(var f,g=0,h=function(a,b){return this.getAngle(d,e,b)-this.getAngle(d,e,a)}.bind(this);;){g++;for(var i=this.points.slice().sort(h),j=0,k=i.length;k>j;j++)if(this.distanceTo(d,i[j])<this.maxDistance&&!this.isIntersecting(b,i[j])){f=i[j];break}if(!f)return this.points;if(f===d)return this.points;if(b.push(f),f===c)return b;if(e=d,d=f,f=void 0,g>1e3)return this.points}},isIntersecting:function(a,b){for(var c=1,d=a.length-1;d>c;c++)if(this.intersect(a[c-1],a[c],a[d],b))return!0;return!1},intersect:function(a,b,c,d){return a.x===c.x&&a.y===c.y||b.x===d.x&&b.y===d.y||a.x===d.x&&a.y===d.y||b.x===c.x&&b.y===c.y?!1:this.ccw(a,b,c)*this.ccw(a,b,d)<=0&&this.ccw(c,d,a)*this.ccw(c,d,b)<=0},lat2y:function(b){return 180/a.PI*a.log(a.tan(a.PI/4+b.lat*(a.PI/180)/2))},ccw:function(a,b,c){var d=1e-13,e=b.x-a.x,f=b.y-a.y,g=c.x-a.x,h=c.y-a.y,i=e*h-f*g;return i>d?1:-d>i?-1:-d>e*g||-d>f*h?-1:g*g+h*h+d>e*e+f*f?1:0},getAngle:function(b,c,d){if(d.x===b.x&&d.y===b.y)return-9e3;if(d.x===c.x&&d.y===c.y)return-360;var e,f={x:b.x-c.x,y:b.y-c.y},g={x:d.x-b.x,y:d.y-b.y},h=f.x*g.y-g.x*f.y,i=f.x*g.x+f.y*g.y;return 0===i?(h>0&&(e=90),0>h&&(e=-90)):(e=180*a.atan(h/i)/a.PI,0>i&&(h>=0&&(e+=180),0>h&&(e-=180))),360===e&&(e=0),180-e}},function(){return"undefined"!=typeof module&&module.exports?void(module.exports=b): true?void !(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return b}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):void(window.ConcaveHull=b)}()}(Math);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var copy             = __webpack_require__(162)
  , normalizeOptions = __webpack_require__(68)
  , ensureCallable   = __webpack_require__(3)
  , map              = __webpack_require__(169)
  , callable         = __webpack_require__(3)
  , validValue       = __webpack_require__(2)

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (options.resolveContext != null) ensureCallable(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};


/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (path);


/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),
/* 93 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = local;
var nextId = 0;

function local() {
  return new Local;
}

function Local() {
  this._ = "@" + (++nextId).toString(36);
}

Local.prototype = local.prototype = {
  constructor: Local,
  get: function(node) {
    var id = this._;
    while (!(id in node)) if (!(node = node.parentNode)) return;
    return node[id];
  },
  set: function(node, value) {
    return node[this._] = value;
  },
  remove: function(node) {
    return this._ in node && delete node[this._];
  },
  toString: function() {
    return this._;
  }
};


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(17);



/* harmony default export */ __webpack_exports__["a"] = (function(node) {
  var event = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])();
  if (event.changedTouches) event = event.changedTouches[0];
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, event);
});


/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_index__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return typeof selector === "string"
      ? new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([[document.querySelector(selector)]], [document.documentElement])
      : new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([[selector]], __WEBPACK_IMPORTED_MODULE_0__selection_index__["c" /* root */]);
});


/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selection_index__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (function(selector) {
  return typeof selector === "string"
      ? new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([document.querySelectorAll(selector)], [document.documentElement])
      : new __WEBPACK_IMPORTED_MODULE_0__selection_index__["b" /* Selection */]([selector == null ? [] : selector], __WEBPACK_IMPORTED_MODULE_0__selection_index__["c" /* root */]);
});


/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__creator__ = __webpack_require__(27);


/* harmony default export */ __webpack_exports__["a"] = (function(name) {
  var create = typeof name === "function" ? name : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__creator__["a" /* default */])(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
});


/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__namespace__ = __webpack_require__(28);


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, value) {
  var fullname = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__namespace__["a" /* default */])(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
});


/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
});


/***/ }),
/* 100 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
});


/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enter__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(92);




var keyPrefix = "$"; // Protect against keys like “__proto__”.

function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new __WEBPACK_IMPORTED_MODULE_1__enter__["b" /* EnterNode */](parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new __WEBPACK_IMPORTED_MODULE_1__enter__["b" /* EnterNode */](parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (function(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
});


/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
});


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__window__ = __webpack_require__(33);


function dispatchEvent(node, type, params) {
  var window = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__window__["a" /* default */])(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
});


/***/ }),
/* 104 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
});


/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  return !this.node();
});


/***/ }),
/* 106 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sparse__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = (function() {
  return new __WEBPACK_IMPORTED_MODULE_1__index__["b" /* Selection */](this._exit || this._groups.map(__WEBPACK_IMPORTED_MODULE_0__sparse__["a" /* default */]), this._parents);
});


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__matcher__ = __webpack_require__(46);



/* harmony default export */ __webpack_exports__["a"] = (function(match) {
  if (typeof match !== "function") match = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__matcher__["a" /* default */])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, this._parents);
});


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
});


/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__creator__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(31);



function constantNull() {
  return null;
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, before) {
  var create = typeof name === "function" ? name : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__creator__["a" /* default */])(name),
      select = before == null ? constantNull : typeof before === "function" ? before : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */])(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
});


/***/ }),
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return this.each(lower);
});


/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (function(selection) {

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](merges, this._parents);
});


/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
});


/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
});


/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
});


/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
});


/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return this.each(raise);
});


/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  return this.each(remove);
});


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selector__ = __webpack_require__(31);



/* harmony default export */ __webpack_exports__["a"] = (function(select) {
  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selector__["a" /* default */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, this._parents);
});


/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__selectorAll__ = __webpack_require__(50);



/* harmony default export */ __webpack_exports__["a"] = (function(select) {
  if (typeof select !== "function") select = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__selectorAll__["a" /* default */])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](subgroups, parents);
});


/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function() {
  var size = 0;
  this.each(function() { ++size; });
  return size;
});


/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = (function(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new __WEBPACK_IMPORTED_MODULE_0__index__["b" /* Selection */](sortgroups, this._parents).order();
});

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
});


/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(17);



/* harmony default export */ __webpack_exports__["a"] = (function(node, touches, identifier) {
  if (arguments.length < 3) identifier = touches, touches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])().changedTouches;

  for (var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i) {
    if ((touch = touches[i]).identifier === identifier) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, touch);
    }
  }

  return null;
});


/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceEvent__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__point__ = __webpack_require__(17);



/* harmony default export */ __webpack_exports__["a"] = (function(node, touches) {
  if (touches == null) touches = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__sourceEvent__["a" /* default */])().touches;

  for (var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i) {
    points[i] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__point__["a" /* default */])(node, touches[i]);
  }

  return points;
});


/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math__ = __webpack_require__(11);




function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / (y32 * x10 - x32 * y10);
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["e" /* max */])(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - __WEBPACK_IMPORTED_MODULE_2__math__["f" /* halfPi */],
        a1 = endAngle.apply(this, arguments) - __WEBPACK_IMPORTED_MODULE_2__math__["f" /* halfPi */],
        da = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* abs */])(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > __WEBPACK_IMPORTED_MODULE_2__math__["c" /* tau */] - __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
      context.moveTo(r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a0), r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        context.moveTo(r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a1), r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) && (padRadius ? +padRadius.apply(this, arguments) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(r0 * r0 + r1 * r1)),
          rc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["g" /* abs */])(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        var p0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["k" /* asin */])(rp / r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(ap)),
            p1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["k" /* asin */])(rp / r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(ap));
        if ((da0 -= p0 * 2) > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a01),
          y01 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a01),
          x10 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a10),
          y10 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a10);

      // Apply rounded corners?
      if (rc > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        var x11 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a11),
            y11 = r1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a11),
            x00 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a00),
            y00 = r0 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a00);

        // Restrict the corner radius according to the sector angle.
        if (da < __WEBPACK_IMPORTED_MODULE_2__math__["b" /* pi */]) {
          var oc = da0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */] ? intersect(x01, y01, x00, y00, x11, y11, x10, y10) : [x10, y10],
              ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["l" /* acos */])((ax * bx + ay * by) / (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(ax * ax + ay * ay) * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(bx * bx + by * by))) / 2),
              lc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["d" /* sqrt */])(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(rc, (r0 - lc) / (kc - 1));
          rc1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["j" /* min */])(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.cy + t0.y11, t0.cx + t0.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y11, t1.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) || !(da0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */])) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > __WEBPACK_IMPORTED_MODULE_2__math__["a" /* epsilon */]) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y01, t0.x01), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t0.cy + t0.y11, t0.cx + t0.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y11, t1.x11), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["m" /* atan2 */])(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - __WEBPACK_IMPORTED_MODULE_2__math__["b" /* pi */] / 2;
    return [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["h" /* cos */])(a) * r, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__math__["i" /* sin */])(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
});


/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__curve_radial__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__area__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lineRadial__ = __webpack_require__(56);




/* harmony default export */ __webpack_exports__["a"] = (function() {
  var a = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__area__["a" /* default */])().curve(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["b" /* curveRadialLinear */]),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__lineRadial__["b" /* lineRadial */])(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__curve_radial__["a" /* default */])(_)) : c()._curve;
  };

  return a;
});


/***/ }),
/* 127 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basis__ = __webpack_require__(18);



function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__basis__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new BasisClosed(context);
});


/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basis__ = __webpack_require__(18);


function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__basis__["c" /* point */])(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new BasisOpen(context);
});


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__basis__ = __webpack_require__(18);


function Bundle(context, beta) {
  this._basis = new __WEBPACK_IMPORTED_MODULE_0__basis__["b" /* Basis */](context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new __WEBPACK_IMPORTED_MODULE_0__basis__["b" /* Basis */](context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85));


/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinalClosed__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__noop__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__catmullRom__ = __webpack_require__(34);




function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_1__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_1__noop__["a" /* default */],
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__catmullRom__["b" /* point */])(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new __WEBPACK_IMPORTED_MODULE_0__cardinalClosed__["b" /* CardinalClosed */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cardinalOpen__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__catmullRom__ = __webpack_require__(34);



function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__catmullRom__["b" /* point */])(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = ((function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new __WEBPACK_IMPORTED_MODULE_0__cardinalOpen__["b" /* CardinalOpen */](context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5));


/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__noop__ = __webpack_require__(21);


function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  areaEnd: __WEBPACK_IMPORTED_MODULE_0__noop__["a" /* default */],
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new LinearClosed(context);
});


/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = monotoneX;
/* harmony export (immutable) */ __webpack_exports__["b"] = monotoneY;
function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
}

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}


/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Natural(context);
});


/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = stepBefore;
/* harmony export (immutable) */ __webpack_exports__["b"] = stepAfter;
function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Step(context, 0.5);
});

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}


/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
});


/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(d) {
  return d;
});


/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = linkHorizontal;
/* harmony export (immutable) */ __webpack_exports__["b"] = linkVertical;
/* harmony export (immutable) */ __webpack_exports__["c"] = linkRadial;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pointRadial__ = __webpack_require__(57);






function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x = __WEBPACK_IMPORTED_MODULE_3__point__["a" /* x */],
      y = __WEBPACK_IMPORTED_MODULE_3__point__["b" /* y */],
      context = null;

  function link() {
    var buffer, argv = __WEBPACK_IMPORTED_MODULE_1__array__["a" /* slice */].call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();
    curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(+_), link) : x;
  };

  link.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__constant__["a" /* default */])(+_), link) : y;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x0, y0),
      p1 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x0, y0 = (y0 + y1) / 2),
      p2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x1, y0),
      p3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__pointRadial__["a" /* default */])(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}


/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
});


/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(12);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(12);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(12);


/* harmony default export */ __webpack_exports__["a"] = (function(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series, order);
});


/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ascending__ = __webpack_require__(36);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__ascending__["a" /* default */])(series).reverse();
});


/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ascending__ = __webpack_require__(36);



/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(__WEBPACK_IMPORTED_MODULE_1__ascending__["b" /* sum */]),
      order = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).sort(function(a, b) { return sums[b] - sums[a]; }),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
});


/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__none__ = __webpack_require__(13);


/* harmony default export */ __webpack_exports__["a"] = (function(series) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__none__["a" /* default */])(series).reverse();
});


/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__descending__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__identity__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__math__ = __webpack_require__(11);





/* harmony default export */ __webpack_exports__["a"] = (function() {
  var value = __WEBPACK_IMPORTED_MODULE_2__identity__["a" /* default */],
      sortValues = __WEBPACK_IMPORTED_MODULE_1__descending__["a" /* default */],
      sort = null,
      startAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(0),
      endAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */]),
      padAngle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */], Math.max(-__WEBPACK_IMPORTED_MODULE_3__math__["c" /* tau */], endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__constant__["a" /* default */])(+_), pie) : padAngle;
  };

  return pie;
});


/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__offset_none__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_none__ = __webpack_require__(13);





function stackValue(d, key) {
  return d[key];
}

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var keys = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])([]),
      order = __WEBPACK_IMPORTED_MODULE_3__order_none__["a" /* default */],
      offset = __WEBPACK_IMPORTED_MODULE_2__offset_none__["a" /* default */],
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__array__["a" /* slice */].call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? __WEBPACK_IMPORTED_MODULE_3__order_none__["a" /* default */] : typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__array__["a" /* slice */].call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? __WEBPACK_IMPORTED_MODULE_2__offset_none__["a" /* default */] : _, stack) : offset;
  };

  return stack;
});


/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return symbols; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__symbol_circle__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__symbol_cross__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__symbol_diamond__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__symbol_star__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__symbol_square__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__symbol_triangle__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__symbol_wye__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__constant__ = __webpack_require__(6);










var symbols = [
  __WEBPACK_IMPORTED_MODULE_1__symbol_circle__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_2__symbol_cross__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_3__symbol_diamond__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_5__symbol_square__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_4__symbol_star__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_6__symbol_triangle__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_7__symbol_wye__["a" /* default */]
];

/* harmony default export */ __webpack_exports__["a"] = (function() {
  var type = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_1__symbol_circle__["a" /* default */]),
      size = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__constant__["a" /* default */])(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
});


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPosInt = __webpack_require__(66)
  , value    = __webpack_require__(2)

  , indexOf = Array.prototype.indexOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , abs = Math.abs, floor = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, l, fromIndex, val;
	if (searchElement === searchElement) { //jslint: ignore
		return indexOf.apply(this, arguments);
	}

	l = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < l; ++i) {
		if (hasOwnProperty.call(this, i)) {
			val = this[i];
			if (val !== val) return i; //jslint: ignore
		}
	}
	return -1;
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(151)()
	? Array.from
	: __webpack_require__(152);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== 'function') return false;
	arr = ['raz', 'dwa'];
	result = from(arr);
	return Boolean(result && (result !== arr) && (result[1] === 'dwa'));
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var iteratorSymbol = __webpack_require__(4).iterator
  , isArguments    = __webpack_require__(22)
  , isFunction     = __webpack_require__(153)
  , toPosInt       = __webpack_require__(66)
  , callable       = __webpack_require__(3)
  , validValue     = __webpack_require__(2)
  , isString       = __webpack_require__(23)

  , isArray = Array.isArray, call = Function.prototype.call
  , desc = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

module.exports = function (arrayLike/*, mapFn, thisArg*/) {
	var mapFn = arguments[1], thisArg = arguments[2], Constructor, i, j, arr, l, code, iterator
	  , result, getIterator, value;

	arrayLike = Object(validValue(arrayLike));

	if (mapFn != null) callable(mapFn);
	if (!this || (this === Array) || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				l = arrayLike.length;
				if (l !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array(l = arrayLike.length);
				for (i = 0; i < l; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Constructor = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Constructor) arr = new Constructor();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (!Constructor) {
					arr[i] = value;
				} else {
					desc.value = value;
					defineProperty(arr, i, desc);
				}
				result = iterator.next();
				++i;
			}
			l = i;
		} else if (isString(arrayLike)) {
			// Source: String
			l = arrayLike.length;
			if (Constructor) arr = new Constructor();
			for (i = 0, j = 0; i < l; ++i) {
				value = arrayLike[i];
				if ((i + 1) < l) {
					code = value.charCodeAt(0);
					if ((code >= 0xD800) && (code <= 0xDBFF)) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (!Constructor) {
					arr[j] = value;
				} else {
					desc.value = value;
					defineProperty(arr, j, desc);
				}
				++j;
			}
			l = j;
		}
	}
	if (l === undefined) {
		// Source: array or array-like
		l = toPosInt(arrayLike.length);
		if (Constructor) arr = new Constructor(l);
		for (i = 0; i < l; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (!Constructor) {
				arr[i] = value;
			} else {
				desc.value = value;
				defineProperty(arr, i, desc);
			}
		}
	}
	if (Constructor) {
		desc.value = null;
		arr.length = l;
	}
	return arr;
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString

  , id = toString.call(__webpack_require__(154));

module.exports = function (f) {
	return (typeof f === "function") && (toString.call(f) === id);
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(156)()
	? Math.sign
	: __webpack_require__(157);


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== 'function') return false;
	return ((sign(10) === 1) && (sign(-20) === -1));
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return (value > 0) ? 1 : -1;
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sign = __webpack_require__(155)

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order



var callable = __webpack_require__(3)
  , value    = __webpack_require__(2)

  , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== 'function') method = list[method];
		return call.call(method, list, function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys  = __webpack_require__(166)
  , value = __webpack_require__(2)

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFrom  = __webpack_require__(150)
  , assign = __webpack_require__(38)
  , value  = __webpack_require__(2);

module.exports = function (obj/*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804



var create = Object.create, shim;

if (!__webpack_require__(69)()) {
	shim = __webpack_require__(70);
}

module.exports = (function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create((prototype === null) ? nullObject : prototype, props);
	};
}());


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(159)('forEach');


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Deprecated



module.exports = function (obj) { return typeof obj === 'function'; };


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(167)()
	? Object.keys
	: __webpack_require__(168);


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var callable = __webpack_require__(3)
  , forEach  = __webpack_require__(164)

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(67);

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var generated = Object.create(null)

  , random = Math.random;

module.exports = function () {
	var str;
	do { str = random().toString(36).slice(2); } while (generated[str]);
	return str;
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf = __webpack_require__(14)
  , contains       = __webpack_require__(39)
  , d              = __webpack_require__(5)
  , Iterator       = __webpack_require__(40)

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArguments    = __webpack_require__(22)
  , isString       = __webpack_require__(23)
  , iteratorSymbol = __webpack_require__(4).iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols



var setPrototypeOf = __webpack_require__(14)
  , d              = __webpack_require__(5)
  , Iterator       = __webpack_require__(40)

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var set, iterator, result;
	if (typeof Set !== 'function') return false;
	set = new Set(['raz', 'dwa', 'trzy']);
	if (String(set) !== '[object Set]') return false;
	if (set.size !== 3) return false;
	if (typeof set.add !== 'function') return false;
	if (typeof set.clear !== 'function') return false;
	if (typeof set.delete !== 'function') return false;
	if (typeof set.entries !== 'function') return false;
	if (typeof set.forEach !== 'function') return false;
	if (typeof set.has !== 'function') return false;
	if (typeof set.keys !== 'function') return false;
	if (typeof set.values !== 'function') return false;

	iterator = set.values();
	result = iterator.next();
	if (result.done !== false) return false;
	if (result.value !== 'raz') return false;

	return true;
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `Set` implementation,
// whatever that is.



module.exports = (function () {
	if (typeof Set === 'undefined') return false;
	return (Object.prototype.toString.call(Set.prototype) === '[object Set]');
}());


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf    = __webpack_require__(14)
  , contains          = __webpack_require__(39)
  , d                 = __webpack_require__(5)
  , Iterator          = __webpack_require__(40)
  , toStringTagSymbol = __webpack_require__(4).toStringTag

  , defineProperty = Object.defineProperty
  , SetIterator;

SetIterator = module.exports = function (set, kind) {
	if (!(this instanceof SetIterator)) return new SetIterator(set, kind);
	Iterator.call(this, set.__setData__, set);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(SetIterator, Iterator);

SetIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(SetIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		return [this.__list__[i], this.__list__[i]];
	}),
	toString: d(function () { return '[object Set Iterator]'; })
});
defineProperty(SetIterator.prototype, toStringTagSymbol, d('c', 'Set Iterator'));


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clear          = __webpack_require__(65)
  , eIndexOf       = __webpack_require__(149)
  , setPrototypeOf = __webpack_require__(14)
  , callable       = __webpack_require__(3)
  , d              = __webpack_require__(5)
  , ee             = __webpack_require__(188)
  , Symbol         = __webpack_require__(4)
  , iterator       = __webpack_require__(73)
  , forOf          = __webpack_require__(71)
  , Iterator       = __webpack_require__(179)
  , isNative       = __webpack_require__(178)

  , call = Function.prototype.call
  , defineProperty = Object.defineProperty, getPrototypeOf = Object.getPrototypeOf
  , SetPoly, getValues, NativeSet;

if (isNative) NativeSet = Set;

module.exports = SetPoly = function Set(/*iterable*/) {
	var iterable = arguments[0], self;
	if (!(this instanceof SetPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf) self = setPrototypeOf(new NativeSet(), getPrototypeOf(this));
	else self = this;
	if (iterable != null) iterator(iterable);
	defineProperty(self, '__setData__', d('c', []));
	if (!iterable) return self;
	forOf(iterable, function (value) {
		if (eIndexOf.call(this, value) !== -1) return;
		this.push(value);
	}, self.__setData__);
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(SetPoly, NativeSet);
	SetPoly.prototype = Object.create(NativeSet.prototype, { constructor: d(SetPoly) });
}

ee(Object.defineProperties(SetPoly.prototype, {
	add: d(function (value) {
		if (this.has(value)) return this;
		this.emit('_add', this.__setData__.push(value) - 1, value);
		return this;
	}),
	clear: d(function () {
		if (!this.__setData__.length) return;
		clear.call(this.__setData__);
		this.emit('_clear');
	}),
	delete: d(function (value) {
		var index = eIndexOf.call(this.__setData__, value);
		if (index === -1) return false;
		this.__setData__.splice(index, 1);
		this.emit('_delete', index, value);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result, value;
		callable(cb);
		iterator = this.values();
		result = iterator._next();
		while (result !== undefined) {
			value = iterator._resolve(result);
			call.call(cb, thisArg, value, value, this);
			result = iterator._next();
		}
	}),
	has: d(function (value) {
		return (eIndexOf.call(this.__setData__, value) !== -1);
	}),
	keys: d(getValues = function () { return this.values(); }),
	size: d.gs(function () { return this.__setData__.length; }),
	values: d(function () { return new Iterator(this); }),
	toString: d(function () { return '[object Set]'; })
}));
defineProperty(SetPoly.prototype, Symbol.iterator, d(getValues));
defineProperty(SetPoly.prototype, Symbol.toStringTag, d('c', 'Set'));


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// ES2015 Symbol polyfill for environments that do not (or partially) support it



var d              = __webpack_require__(5)
  , validateSymbol = __webpack_require__(184)

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isSymbol = __webpack_require__(182);

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
	var weakMap, x;
	if (typeof WeakMap !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		weakMap = new WeakMap([[x = {}, 'one'], [{}, 'two'], [{}, 'three']]);
	} catch (e) {
		return false;
	}
	if (String(weakMap) !== '[object WeakMap]') return false;
	if (typeof weakMap.set !== 'function') return false;
	if (weakMap.set({}, 1) !== weakMap) return false;
	if (typeof weakMap.delete !== 'function') return false;
	if (typeof weakMap.has !== 'function') return false;
	if (weakMap.get(x) !== 'one') return false;

	return true;
};


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Exports true if environment provides native `WeakMap` implementation, whatever that is.



module.exports = (function () {
	if (typeof WeakMap !== 'function') return false;
	return (Object.prototype.toString.call(new WeakMap()) === '[object WeakMap]');
}());


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setPrototypeOf    = __webpack_require__(14)
  , object            = __webpack_require__(170)
  , value             = __webpack_require__(2)
  , randomUniq        = __webpack_require__(173)
  , d                 = __webpack_require__(5)
  , getIterator       = __webpack_require__(72)
  , forOf             = __webpack_require__(71)
  , toStringTagSymbol = __webpack_require__(4).toStringTag
  , isNative          = __webpack_require__(186)

  , isArray = Array.isArray, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf
  , WeakMapPoly;

module.exports = WeakMapPoly = function (/*iterable*/) {
	var iterable = arguments[0], self;
	if (!(this instanceof WeakMapPoly)) throw new TypeError('Constructor requires \'new\'');
	if (isNative && setPrototypeOf && (WeakMap !== WeakMapPoly)) {
		self = setPrototypeOf(new WeakMap(), getPrototypeOf(this));
	} else {
		self = this;
	}
	if (iterable != null) {
		if (!isArray(iterable)) iterable = getIterator(iterable);
	}
	defineProperty(self, '__weakMapData__', d('c', '$weakMap$' + randomUniq()));
	if (!iterable) return self;
	forOf(iterable, function (val) {
		value(val);
		self.set(val[0], val[1]);
	});
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
	WeakMapPoly.prototype = Object.create(WeakMap.prototype, {
		constructor: d(WeakMapPoly)
	});
}

Object.defineProperties(WeakMapPoly.prototype, {
	delete: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			delete key[this.__weakMapData__];
			return true;
		}
		return false;
	}),
	get: d(function (key) {
		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
			return key[this.__weakMapData__];
		}
	}),
	has: d(function (key) {
		return hasOwnProperty.call(object(key), this.__weakMapData__);
	}),
	set: d(function (key, value) {
		defineProperty(object(key), this.__weakMapData__, d('c', value));
		return this;
	}),
	toString: d(function () { return '[object WeakMap]'; })
});
defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d('c', 'WeakMap'));


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var d        = __webpack_require__(5)
  , callable = __webpack_require__(3)

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// JSTS. See https://github.com/bjornharrtell/jsts
// Licenses:
// https://github.com/bjornharrtell/jsts/blob/master/LICENSE_EDLv1.txt
// https://github.com/bjornharrtell/jsts/blob/master/LICENSE_EPLv1.txt
// https://github.com/bjornharrtell/jsts/blob/master/LICENSE_LICENSE_ES6_COLLECTIONS.txt
!function(t,e){ true?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.jsts=t.jsts||{})}(this,function(t){"use strict";function e(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}function n(){}function i(){}function r(){}function s(){}function o(){}function a(){}function u(){}function l(t){this.message=t}function h(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t}function c(){if(0===arguments.length)l.call(this);else if(1===arguments.length){var t=arguments[0];l.call(this,t)}}function f(){}function g(){if(this.x=null,this.y=null,this.z=null,0===arguments.length)g.call(this,0,0);else if(1===arguments.length){var t=arguments[0];g.call(this,t.x,t.y,t.z)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];g.call(this,e,n,g.NULL_ORDINATE)}else if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];this.x=i,this.y=r,this.z=s}}function d(){if(this.dimensionsToTest=2,0===arguments.length)d.call(this,2);else if(1===arguments.length){var t=arguments[0];if(2!==t&&3!==t)throw new i("only 2 or 3 dimensions may be specified");this.dimensionsToTest=t}}function p(){}function v(){}function m(t){this.message=t||""}function y(){}function x(t){this.message=t||""}function E(t){this.message=t||""}function I(){this.array_=[],arguments[0]instanceof v&&this.addAll(arguments[0])}function N(){if(I.apply(this),0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.ensureCapacity(t.length),this.add(t,!0)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.ensureCapacity(e.length),this.add(e,n)}}function C(){if(this.minx=null,this.maxx=null,this.miny=null,this.maxy=null,0===arguments.length)this.init();else if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];this.init(t.x,t.x,t.y,t.y)}else if(arguments[0]instanceof C){var e=arguments[0];this.init(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.init(n.x,i.x,n.y,i.y)}else if(4===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3];this.init(r,s,o,a)}}function S(){}function w(){S.call(this,"Projective point not representable on the Cartesian plane.")}function L(){}function R(t,e){return t.interfaces_&&t.interfaces_().indexOf(e)>-1}function T(){}function P(t){this.str=t}function b(t){this.value=t}function O(){}function _(){if(this.hi=0,this.lo=0,0===arguments.length)this.init(0);else if(1===arguments.length){if("number"==typeof arguments[0]){var t=arguments[0];this.init(t)}else if(arguments[0]instanceof _){var e=arguments[0];this.init(e)}else if("string"==typeof arguments[0]){var n=arguments[0];_.call(this,_.parse(n))}}else if(2===arguments.length){var i=arguments[0],r=arguments[1];this.init(i,r)}}function M(){}function D(){}function A(){}function F(){if(this.x=null,this.y=null,this.w=null,0===arguments.length)this.x=0,this.y=0,this.w=1;else if(1===arguments.length){var t=arguments[0];this.x=t.x,this.y=t.y,this.w=1}else if(2===arguments.length){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var e=arguments[0],n=arguments[1];this.x=e,this.y=n,this.w=1}else if(arguments[0]instanceof F&&arguments[1]instanceof F){var i=arguments[0],r=arguments[1];this.x=i.y*r.w-r.y*i.w,this.y=r.x*i.w-i.x*r.w,this.w=i.x*r.y-r.x*i.y}else if(arguments[0]instanceof g&&arguments[1]instanceof g){var s=arguments[0],o=arguments[1];this.x=s.y-o.y,this.y=o.x-s.x,this.w=s.x*o.y-o.x*s.y}}else if(3===arguments.length){var a=arguments[0],u=arguments[1],l=arguments[2];this.x=a,this.y=u,this.w=l}else if(4===arguments.length){var h=arguments[0],c=arguments[1],f=arguments[2],d=arguments[3],p=h.y-c.y,v=c.x-h.x,m=h.x*c.y-c.x*h.y,y=f.y-d.y,x=d.x-f.x,E=f.x*d.y-d.x*f.y;this.x=v*E-x*m,this.y=y*m-p*E,this.w=p*x-y*v}}function G(){}function q(){}function B(){this.envelope=null,this.factory=null,this.SRID=null,this.userData=null;var t=arguments[0];this.factory=t,this.SRID=t.getSRID()}function z(){}function V(){}function k(){}function Y(){}function U(){}function X(){}function H(){}function W(){}function j(){}function K(){}function Z(){}function Q(){}function J(){this.array_=[],arguments[0]instanceof v&&this.addAll(arguments[0])}function $(t){return null==t?$s:t.color}function tt(t){return null==t?null:t.parent}function et(t,e){null!==t&&(t.color=e)}function nt(t){return null==t?null:t.left}function it(t){return null==t?null:t.right}function rt(){this.root_=null,this.size_=0}function st(){}function ot(){}function at(){this.array_=[],arguments[0]instanceof v&&this.addAll(arguments[0])}function ut(){}function lt(){}function ht(){}function ct(){}function ft(){this.geometries=null;var t=arguments[0],e=arguments[1];if(B.call(this,e),null===t&&(t=[]),B.hasNullElements(t))throw new i("geometries must not contain null elements");this.geometries=t}function gt(){var t=arguments[0],e=arguments[1];ft.call(this,t,e)}function dt(){if(this.geom=null,this.geomFact=null,this.bnRule=null,this.endpointMap=null,1===arguments.length){var t=arguments[0];dt.call(this,t,V.MOD2_BOUNDARY_RULE)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.geom=e,this.geomFact=e.getFactory(),this.bnRule=n}}function pt(){this.count=null}function vt(){}function mt(){}function yt(){}function xt(){}function Et(){}function It(){}function Nt(){}function Ct(){}function St(){this.points=null;var t=arguments[0],e=arguments[1];B.call(this,e),this.init(t)}function wt(){}function Lt(){this.coordinates=null;var t=arguments[0],e=arguments[1];B.call(this,e),this.init(t)}function Rt(){}function Tt(){this.shell=null,this.holes=null;var t=arguments[0],e=arguments[1],n=arguments[2];if(B.call(this,n),null===t&&(t=this.getFactory().createLinearRing()),null===e&&(e=[]),B.hasNullElements(e))throw new i("holes must not contain null elements");if(t.isEmpty()&&B.hasNonEmptyElements(e))throw new i("shell is empty but holes are not");this.shell=t,this.holes=e}function Pt(){var t=arguments[0],e=arguments[1];ft.call(this,t,e)}function bt(){if(arguments[0]instanceof g&&arguments[1]instanceof ie){var t=arguments[0],e=arguments[1];bt.call(this,e.getCoordinateSequenceFactory().create(t),e)}else if(R(arguments[0],D)&&arguments[1]instanceof ie){var n=arguments[0],i=arguments[1];St.call(this,n,i),this.validateConstruction()}}function Ot(){var t=arguments[0],e=arguments[1];ft.call(this,t,e)}function _t(){if(this.factory=null,this.isUserDataCopied=!1,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.factory=t}}function Mt(){}function Dt(){}function At(){}function Ft(){}function Gt(){if(this.dimension=3,this.coordinates=null,1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];Gt.call(this,t,3)}else if(Number.isInteger(arguments[0])){var e=arguments[0];this.coordinates=new Array(e).fill(null);for(var n=0;e>n;n++)this.coordinates[n]=new g}else if(R(arguments[0],D)){var i=arguments[0];if(null===i)return this.coordinates=new Array(0).fill(null),null;this.dimension=i.getDimension(),this.coordinates=new Array(i.size()).fill(null);for(var n=0;n<this.coordinates.length;n++)this.coordinates[n]=i.getCoordinateCopy(n)}}else if(2===arguments.length)if(arguments[0]instanceof Array&&Number.isInteger(arguments[1])){var r=arguments[0],s=arguments[1];this.coordinates=r,this.dimension=s,null===r&&(this.coordinates=new Array(0).fill(null))}else if(Number.isInteger(arguments[0])&&Number.isInteger(arguments[1])){var o=arguments[0],a=arguments[1];this.coordinates=new Array(o).fill(null),this.dimension=a;for(var n=0;o>n;n++)this.coordinates[n]=new g}}function qt(){}function Bt(t,e){return t===e||t!==t&&e!==e}function zt(t,e){function n(t){return this&&this.constructor===n?(this._keys=[],this._values=[],this._itp=[],this.objectOnly=e,void(t&&Vt.call(this,t))):new n(t)}return e||io(t,"size",{get:Jt}),t.constructor=n,n.prototype=t,n}function Vt(t){this.add?t.forEach(this.add,this):t.forEach(function(t){this.set(t[0],t[1])},this)}function kt(t){return this.has(t)&&(this._keys.splice(no,1),this._values.splice(no,1),this._itp.forEach(function(t){no<t[0]&&t[0]--})),no>-1}function Yt(t){return this.has(t)?this._values[no]:void 0}function Ut(t,e){if(this.objectOnly&&e!==Object(e))throw new TypeError("Invalid value used as weak collection key");if(e!==e||0===e)for(no=t.length;no--&&!Bt(t[no],e););else no=t.indexOf(e);return no>-1}function Xt(t){return Ut.call(this,this._keys,t)}function Ht(t,e){return this.has(t)?this._values[no]=e:this._values[this._keys.push(t)-1]=e,this}function Wt(){(this._keys||0).length=this._values.length=0}function jt(){return Qt(this._itp,this._keys)}function Kt(){return Qt(this._itp,this._values)}function Zt(){return Qt(this._itp,this._keys,this._values)}function Qt(t,e,n){var i=[0],r=!1;return t.push(i),{next:function(){var s,o=i[0];return!r&&o<e.length?(s=n?[e[o],n[o]]:e[o],i[0]++):(r=!0,t.splice(t.indexOf(i),1)),{done:r,value:s}}}}function Jt(){return this._values.length}function $t(t,e){for(var n=this.entries();;){var i=n.next();if(i.done)break;t.call(e,i.value[1],i.value[0],this)}}function te(){this.map_=new so}function ee(){if(this.modelType=null,this.scale=null,0===arguments.length)this.modelType=ee.FLOATING;else if(1===arguments.length)if(arguments[0]instanceof ne){var t=arguments[0];this.modelType=t,t===ee.FIXED&&this.setScale(1)}else if("number"==typeof arguments[0]){var e=arguments[0];this.modelType=ee.FIXED,this.setScale(e)}else if(arguments[0]instanceof ee){var n=arguments[0];this.modelType=n.modelType,this.scale=n.scale}}function ne(){this.name=null;var t=arguments[0];this.name=t,ne.nameToTypeMap.put(t,this)}function ie(){if(this.precisionModel=null,this.coordinateSequenceFactory=null,this.SRID=null,0===arguments.length)ie.call(this,new ee,0);else if(1===arguments.length){if(R(arguments[0],G)){var t=arguments[0];ie.call(this,new ee,0,t)}else if(arguments[0]instanceof ee){var e=arguments[0];ie.call(this,e,0,ie.getDefaultCoordinateSequenceFactory())}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];ie.call(this,n,i,ie.getDefaultCoordinateSequenceFactory())}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.precisionModel=r,this.coordinateSequenceFactory=o,this.SRID=s}}function re(t){this.geometryFactory=t||new ie}function se(t){this.parser=new re(t)}function oe(){this.result=null,this.inputLines=Array(2).fill().map(function(){return Array(2)}),this.intPt=new Array(2).fill(null),this.intLineIndex=null,this._isProper=null,this.pa=null,this.pb=null,this.precisionModel=null,this.intPt[0]=new g,this.intPt[1]=new g,this.pa=this.intPt[0],this.pb=this.intPt[1],this.result=0}function ae(){oe.apply(this)}function ue(){}function le(){this.p=null,this.crossingCount=0,this.isPointOnSegment=!1;var t=arguments[0];this.p=t}function he(){}function ce(){if(this.p0=null,this.p1=null,0===arguments.length)ce.call(this,new g,new g);else if(1===arguments.length){var t=arguments[0];ce.call(this,t.p0,t.p1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.p0=e,this.p1=n}else if(4===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2],o=arguments[3];ce.call(this,new g(i,r),new g(s,o))}}function fe(){if(this.matrix=null,0===arguments.length)this.matrix=Array(3).fill().map(function(){return Array(3)}),this.setAll(lt.FALSE);else if(1===arguments.length)if("string"==typeof arguments[0]){var t=arguments[0];fe.call(this),this.set(t)}else if(arguments[0]instanceof fe){var e=arguments[0];fe.call(this),this.matrix[L.INTERIOR][L.INTERIOR]=e.matrix[L.INTERIOR][L.INTERIOR],this.matrix[L.INTERIOR][L.BOUNDARY]=e.matrix[L.INTERIOR][L.BOUNDARY],this.matrix[L.INTERIOR][L.EXTERIOR]=e.matrix[L.INTERIOR][L.EXTERIOR],this.matrix[L.BOUNDARY][L.INTERIOR]=e.matrix[L.BOUNDARY][L.INTERIOR],this.matrix[L.BOUNDARY][L.BOUNDARY]=e.matrix[L.BOUNDARY][L.BOUNDARY],this.matrix[L.BOUNDARY][L.EXTERIOR]=e.matrix[L.BOUNDARY][L.EXTERIOR],this.matrix[L.EXTERIOR][L.INTERIOR]=e.matrix[L.EXTERIOR][L.INTERIOR],this.matrix[L.EXTERIOR][L.BOUNDARY]=e.matrix[L.EXTERIOR][L.BOUNDARY],this.matrix[L.EXTERIOR][L.EXTERIOR]=e.matrix[L.EXTERIOR][L.EXTERIOR]}}function ge(){this.areaBasePt=null,this.triangleCent3=new g,this.areasum2=0,this.cg3=new g,this.lineCentSum=new g,this.totalLength=0,this.ptCount=0,this.ptCentSum=new g;var t=arguments[0];this.areaBasePt=null,this.add(t)}function de(t){this.message=t||""}function pe(){this.array_=[]}function ve(){this.treeSet=new at,this.list=new I}function me(){if(this.geomFactory=null,this.inputPts=null,1===arguments.length){var t=arguments[0];me.call(this,me.extractCoordinates(t),t.getFactory())}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.inputPts=ve.filterCoordinates(e),this.geomFactory=n}}function ye(){this.origin=null;var t=arguments[0];this.origin=t}function xe(){this.inputGeom=null,this.factory=null,this.pruneEmptyGeometry=!0,this.preserveGeometryCollectionType=!0,this.preserveCollections=!1,this.preserveType=!1}function Ee(){if(this.snapTolerance=0,this.srcPts=null,this.seg=new ce,this.allowSnappingToSourceVertices=!1,this._isClosed=!1,arguments[0]instanceof St&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1];Ee.call(this,t.getCoordinates(),e)}else if(arguments[0]instanceof Array&&"number"==typeof arguments[1]){var n=arguments[0],i=arguments[1];this.srcPts=n,this._isClosed=Ee.isClosed(n),this.snapTolerance=i}}function Ie(){this.srcGeom=null;var t=arguments[0];this.srcGeom=t}function Ne(){if(xe.apply(this),this.snapTolerance=null,this.snapPts=null,this.isSelfSnap=!1,2===arguments.length){var t=arguments[0],e=arguments[1];this.snapTolerance=t,this.snapPts=e}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.snapTolerance=n,this.snapPts=i,this.isSelfSnap=r}}function Ce(){this.isFirst=!0,this.commonMantissaBitsCount=53,this.commonBits=0,this.commonSignExp=null}function Se(){this.commonCoord=null,this.ccFilter=new we}function we(){this.commonBitsX=new Ce,this.commonBitsY=new Ce}function Le(){this.trans=null;var t=arguments[0];this.trans=t}function Re(){this.parent=null,this.atStart=null,this.max=null,this.index=null,this.subcollectionIterator=null;var t=arguments[0];this.parent=t,this.atStart=!0,this.index=0,this.max=t.getNumGeometries()}function Te(){if(this.boundaryRule=V.OGC_SFS_BOUNDARY_RULE,this.isIn=null,this.numBoundaries=null,0===arguments.length);else if(1===arguments.length){var t=arguments[0];if(null===t)throw new i("Rule must be non-null");this.boundaryRule=t}}function Pe(){}function be(){}function Oe(){this.pts=null,this.data=null;var t=arguments[0],e=arguments[1];this.pts=t,this.data=e}function _e(){}function Me(){this.bounds=null,this.item=null;var t=arguments[0],e=arguments[1];this.bounds=t,this.item=e}function De(){this._size=null,this.items=null,this._size=0,this.items=new I,this.items.add(null)}function Ae(){}function Fe(){}function Ge(){if(this.childBoundables=new I,this.bounds=null,this.level=null,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.level=t}}function qe(){this.boundable1=null,this.boundable2=null,this._distance=null,this.itemDistance=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.boundable1=t,this.boundable2=e,this.itemDistance=n,this._distance=this.distance()}function Be(){if(this.root=null,this.built=!1,this.itemBoundables=new I,this.nodeCapacity=null,0===arguments.length)Be.call(this,Be.DEFAULT_NODE_CAPACITY);else if(1===arguments.length){var t=arguments[0];f.isTrue(t>1,"Node capacity must be greater than 1"),this.nodeCapacity=t}}function ze(){}function Ve(){}function ke(){if(0===arguments.length)ke.call(this,ke.DEFAULT_NODE_CAPACITY);else if(1===arguments.length){var t=arguments[0];Be.call(this,t)}}function Ye(){var t=arguments[0];Ge.call(this,t)}function Ue(){}function Xe(){this.segString=null,this.coord=null,this.segmentIndex=null,this.segmentOctant=null,this._isInterior=null;var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];this.segString=t,this.coord=new g(e),this.segmentIndex=n,this.segmentOctant=i,this._isInterior=!e.equals2D(t.getCoordinate(n))}function He(){this.nodeMap=new rt,this.edge=null;var t=arguments[0];this.edge=t}function We(){this.nodeList=null,this.edge=null,this.nodeIt=null,this.currNode=null,this.nextNode=null,this.currSegIndex=0;var t=arguments[0];this.nodeList=t,this.edge=t.getEdge(),this.nodeIt=t.iterator(),this.readNextNode()}function je(){}function Ke(){this.nodeList=new He(this),this.pts=null,this.data=null;var t=arguments[0],e=arguments[1];this.pts=t,this.data=e}function Ze(){this.tempEnv1=new C,this.tempEnv2=new C,this.overlapSeg1=new ce,this.overlapSeg2=new ce}function Qe(){this.pts=null,this.start=null,this.end=null,this.env=null,this.context=null,this.id=null;var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];this.pts=t,this.start=e,this.end=n,this.context=i}function Je(){}function $e(){}function tn(){}function en(){if(this.segInt=null,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.setSegmentIntersector(t)}}function nn(){if(this.monoChains=new I,this.index=new ke,this.idCounter=0,this.nodedSegStrings=null,this.nOverlaps=0,0===arguments.length);else if(1===arguments.length){var t=arguments[0];en.call(this,t)}}function rn(){Ze.apply(this),this.si=null;var t=arguments[0];this.si=t}function sn(){if(this.pt=null,1===arguments.length){var t=arguments[0];l.call(this,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];l.call(this,sn.msgWithCoord(e,n)),this.pt=new g(n)}}function on(){}function an(){this.findAllIntersections=!1,this.isCheckEndSegmentsOnly=!1,this.li=null,this.interiorIntersection=null,this.intSegments=null,this.intersections=new I,this.intersectionCount=0,this.keepIntersections=!0;var t=arguments[0];this.li=t,this.interiorIntersection=null}function un(){this.li=new ae,this.segStrings=null,this.findAllIntersections=!1,this.segInt=null,this._isValid=!0;var t=arguments[0];this.segStrings=t}function ln(){this.nv=null;var t=arguments[0];this.nv=new un(ln.toSegmentStrings(t))}function hn(){this.mapOp=null;var t=arguments[0];this.mapOp=t}function cn(){}function fn(){if(this.location=null,1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];this.init(t.length)}else if(Number.isInteger(arguments[0])){var e=arguments[0];this.init(1),this.location[cn.ON]=e}else if(arguments[0]instanceof fn){var n=arguments[0];if(this.init(n.location.length),null!==n)for(var i=0;i<this.location.length;i++)this.location[i]=n.location[i]}}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.init(3),this.location[cn.ON]=r,this.location[cn.LEFT]=s,this.location[cn.RIGHT]=o}}function gn(){if(this.elt=new Array(2).fill(null),1===arguments.length){if(Number.isInteger(arguments[0])){var t=arguments[0];this.elt[0]=new fn(t),this.elt[1]=new fn(t)}else if(arguments[0]instanceof gn){var e=arguments[0];this.elt[0]=new fn(e.elt[0]),this.elt[1]=new fn(e.elt[1])}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.elt[0]=new fn(L.NONE),this.elt[1]=new fn(L.NONE),this.elt[n].setLocation(i)}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.elt[0]=new fn(r,s,o),this.elt[1]=new fn(r,s,o)}else if(4===arguments.length){var a=arguments[0],u=arguments[1],l=arguments[2],h=arguments[3];this.elt[0]=new fn(L.NONE,L.NONE,L.NONE),this.elt[1]=new fn(L.NONE,L.NONE,L.NONE),this.elt[a].setLocations(u,l,h)}}function dn(){this.startDe=null,this.maxNodeDegree=-1,this.edges=new I,this.pts=new I,this.label=new gn(L.NONE),this.ring=null,this._isHole=null,this.shell=null,this.holes=new I,this.geometryFactory=null;var t=arguments[0],e=arguments[1];this.geometryFactory=e,this.computePoints(t),this.computeRing()}function pn(){var t=arguments[0],e=arguments[1];dn.call(this,t,e)}function vn(){var t=arguments[0],e=arguments[1];dn.call(this,t,e)}function mn(){if(this.label=null,this._isInResult=!1,this._isCovered=!1,this._isCoveredSet=!1,this._isVisited=!1,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.label=t}}function yn(){mn.apply(this),this.coord=null,this.edges=null;var t=arguments[0],e=arguments[1];this.coord=t,this.edges=e,this.label=new gn(0,L.NONE)}function xn(){this.nodeMap=new rt,this.nodeFact=null;var t=arguments[0];this.nodeFact=t}function En(){if(this.edge=null,this.label=null,this.node=null,this.p0=null,this.p1=null,this.dx=null,this.dy=null,this.quadrant=null,1===arguments.length){var t=arguments[0];this.edge=t}else if(3===arguments.length){var e=arguments[0],n=arguments[1],i=arguments[2];En.call(this,e,n,i,null)}else if(4===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3];En.call(this,r),this.init(s,o),this.label=a}}function In(){this._isForward=null,this._isInResult=!1,this._isVisited=!1,this.sym=null,this.next=null,this.nextMin=null,this.edgeRing=null,this.minEdgeRing=null,this.depth=[0,-999,-999];var t=arguments[0],e=arguments[1];if(En.call(this,t),this._isForward=e,e)this.init(t.getCoordinate(0),t.getCoordinate(1));else{var n=t.getNumPoints()-1;this.init(t.getCoordinate(n),t.getCoordinate(n-1))}this.computeDirectedLabel()}function Nn(){}function Cn(){if(this.edges=new I,this.nodes=null,this.edgeEndList=new I,0===arguments.length)this.nodes=new xn(new Nn);else if(1===arguments.length){var t=arguments[0];this.nodes=new xn(t)}}function Sn(){this.geometryFactory=null,this.shellList=new I;var t=arguments[0];this.geometryFactory=t}function wn(){this.op=null,this.geometryFactory=null,this.ptLocator=null,this.lineEdgesList=new I,this.resultLineList=new I;var t=arguments[0],e=arguments[1],n=arguments[2];this.op=t,this.geometryFactory=e,this.ptLocator=n}function Ln(){this.op=null,this.geometryFactory=null,this.resultPointList=new I;var t=arguments[0],e=arguments[1];arguments[2];this.op=t,this.geometryFactory=e}function Rn(){}function Tn(){this.geom=null;var t=arguments[0];this.geom=t}function Pn(){this.edgeMap=new rt,this.edgeList=null,this.ptInAreaLocation=[L.NONE,L.NONE]}function bn(){Pn.apply(this),this.resultAreaEdgeList=null,this.label=null,this.SCANNING_FOR_INCOMING=1,this.LINKING_TO_OUTGOING=2}function On(){Nn.apply(this)}function _n(){this.mce=null,this.chainIndex=null;var t=arguments[0],e=arguments[1];this.mce=t,this.chainIndex=e}function Mn(){if(this.label=null,this.xValue=null,this.eventType=null,this.insertEvent=null,this.deleteEventIndex=null,this.obj=null,2===arguments.length){var t=arguments[0],e=arguments[1];this.eventType=Mn.DELETE,this.xValue=t,this.insertEvent=e}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.eventType=Mn.INSERT,this.label=n,this.xValue=i,this.obj=r}}function Dn(){}function An(){this._hasIntersection=!1,this.hasProper=!1,this.hasProperInterior=!1,this.properIntersectionPoint=null,this.li=null,this.includeProper=null,this.recordIsolated=null,this.isSelfIntersection=null,this.numIntersections=0,this.numTests=0,this.bdyNodes=null,this._isDone=!1,this.isDoneWhenProperInt=!1;var t=arguments[0],e=arguments[1],n=arguments[2];this.li=t,this.includeProper=e,this.recordIsolated=n}function Fn(){Dn.apply(this),this.events=new I,this.nOverlaps=null}function Gn(){this.min=r.POSITIVE_INFINITY,this.max=r.NEGATIVE_INFINITY}function qn(){}function Bn(){Gn.apply(this),this.item=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.min=t,this.max=e,this.item=n}function zn(){Gn.apply(this),this.node1=null,this.node2=null;var t=arguments[0],e=arguments[1];this.node1=t,this.node2=e,this.buildExtent(this.node1,this.node2)}function Vn(){this.leaves=new I,this.root=null,this.level=0}function kn(){if(this.lines=null,this.isForcedToLineString=!1,1===arguments.length){var t=arguments[0];this.lines=t}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.lines=e,this.isForcedToLineString=n}}function Yn(){this.items=new I}function Un(){this.index=null;var t=arguments[0];if(!R(t,Rt))throw new i("Argument must be Polygonal");this.index=new Hn(t)}function Xn(){this.counter=null;var t=arguments[0];this.counter=t}function Hn(){this.index=new Vn;var t=arguments[0];this.init(t)}function Wn(){this.coord=null,this.segmentIndex=null,this.dist=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.coord=new g(t),this.segmentIndex=e,this.dist=n}function jn(){this.nodeMap=new rt,this.edge=null;var t=arguments[0];this.edge=t}function Kn(){}function Zn(){this.e=null,this.pts=null,this.startIndex=null,this.env1=new C,this.env2=new C;var t=arguments[0];this.e=t,this.pts=t.getCoordinates();var e=new Kn;this.startIndex=e.getChainStartIndices(this.pts)}function Qn(){this.depth=Array(2).fill().map(function(){return Array(3)});for(var t=0;2>t;t++)for(var e=0;3>e;e++)this.depth[t][e]=Qn.NULL_VALUE}function Jn(){if(mn.apply(this),this.pts=null,this.env=null,this.eiList=new jn(this),this.name=null,this.mce=null,this._isIsolated=!0,this.depth=new Qn,this.depthDelta=0,1===arguments.length){var t=arguments[0];Jn.call(this,t,null)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.pts=e,this.label=n}}function $n(){if(Cn.apply(this),this.parentGeom=null,this.lineEdgeMap=new te,this.boundaryNodeRule=null,this.useBoundaryDeterminationRule=!0,this.argIndex=null,this.boundaryNodes=null,this._hasTooFewPoints=!1,this.invalidPoint=null,this.areaPtLocator=null,this.ptLocator=new Te,2===arguments.length){var t=arguments[0],e=arguments[1];$n.call(this,t,e,V.OGC_SFS_BOUNDARY_RULE)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.argIndex=n,this.parentGeom=i,this.boundaryNodeRule=r,null!==i&&this.add(i)}}function ti(){if(this.li=new ae,this.resultPrecisionModel=null,this.arg=null,1===arguments.length){var t=arguments[0];this.setComputationPrecision(t.getPrecisionModel()),this.arg=new Array(1).fill(null),this.arg[0]=new $n(0,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];ti.call(this,e,n,V.OGC_SFS_BOUNDARY_RULE)}else if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];i.getPrecisionModel().compareTo(r.getPrecisionModel())>=0?this.setComputationPrecision(i.getPrecisionModel()):this.setComputationPrecision(r.getPrecisionModel()),this.arg=new Array(2).fill(null),this.arg[0]=new $n(0,i,s),this.arg[1]=new $n(1,r,s)}}function ei(){this.pts=null,this._orientation=null;var t=arguments[0];this.pts=t,this._orientation=ei.orientation(t)}function ni(){this.edges=new I,this.ocaMap=new rt}function ii(){this.ptLocator=new Te,this.geomFact=null,this.resultGeom=null,this.graph=null,this.edgeList=new ni,this.resultPolyList=new I,this.resultLineList=new I,this.resultPointList=new I;var t=arguments[0],e=arguments[1];ti.call(this,t,e),this.graph=new Cn(new On),this.geomFact=t.getFactory()}function ri(){this.geom=new Array(2).fill(null),this.snapTolerance=null,this.cbr=null;var t=arguments[0],e=arguments[1];this.geom[0]=t,this.geom[1]=e,this.computeSnapTolerance()}function si(){this.geom=new Array(2).fill(null);var t=arguments[0],e=arguments[1];this.geom[0]=t,this.geom[1]=e}function oi(){this.factory=null,this.interiorPoint=null,this.maxWidth=0;var t=arguments[0];this.factory=t.getFactory(),this.add(t)}function ai(){this.poly=null,this.centreY=null,this.hiY=r.MAX_VALUE,this.loY=-r.MAX_VALUE;var t=arguments[0];this.poly=t,this.hiY=t.getEnvelopeInternal().getMaxY(),this.loY=t.getEnvelopeInternal().getMinY(),this.centreY=oi.avg(this.loY,this.hiY)}function ui(){this.centroid=null,this.minDistance=r.MAX_VALUE,this.interiorPoint=null;var t=arguments[0];this.centroid=t.getCentroid().getCoordinate(),this.addInterior(t),null===this.interiorPoint&&this.addEndpoints(t)}function li(){this.centroid=null,this.minDistance=r.MAX_VALUE,this.interiorPoint=null;var t=arguments[0];this.centroid=t.getCentroid().getCoordinate(),this.add(t)}function hi(){}function ci(){this.p0=null,this.p1=null,this.p2=null;var t=arguments[0],e=arguments[1],n=arguments[2];this.p0=t,this.p1=e,this.p2=n}function fi(){this.input=null,this.extremalPts=null,this.centre=null,this.radius=0;var t=arguments[0];this.input=t}function gi(){if(this.inputGeom=null,this.isConvex=null,this.convexHullPts=null,this.minBaseSeg=new ce,this.minWidthPt=null,this.minPtIndex=null,this.minWidth=0,1===arguments.length){var t=arguments[0];gi.call(this,t,!1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.inputGeom=e,this.isConvex=n}}function di(){this.inputGeom=null,this.distanceTolerance=null;var t=arguments[0];this.inputGeom=t}function pi(){xe.apply(this),this.distanceTolerance=null;var t=arguments[0];this.distanceTolerance=t}function vi(){this._orig=null,this._sym=null,this._next=null;var t=arguments[0];this._orig=t}function mi(){this._isMarked=!1;var t=arguments[0];vi.call(this,t)}function yi(){this.vertexMap=new te}function xi(){this._isStart=!1;var t=arguments[0];mi.call(this,t)}function Ei(){yi.apply(this)}function Ii(){this.result=null,this.factory=null,this.graph=null,this.lines=new I,this.nodeEdgeStack=new pe,this.ringStartEdge=null,this.graph=new Ei}function Ni(){this.items=new I,this.subnode=new Array(4).fill(null)}function Ci(){}function Si(t,e){var n,i,r,s,o={32:{d:127,c:128,b:0,a:0},64:{d:32752,c:0,b:0,a:0}},a={32:8,64:11}[t];if(s||(n=0>e||0>1/e,isFinite(e)||(s=o[t],n&&(s.d+=1<<t/4-1),i=Math.pow(2,a)-1,r=0)),!s){for(i={32:127,64:1023}[t],r=Math.abs(e);r>=2;)i++,r/=2;for(;1>r&&i>0;)i--,r*=2;0>=i&&(r/=2),32===t&&i>254&&(s={d:n?255:127,c:128,b:0,a:0},i=Math.pow(2,a)-1,r=0)}return i}function wi(){this.pt=new g,this.level=0,this.env=null;var t=arguments[0];this.computeKey(t)}function Li(){Ni.apply(this),this.env=null,this.centrex=null,this.centrey=null,this.level=null;var t=arguments[0],e=arguments[1];this.env=t,this.level=e,this.centrex=(t.getMinX()+t.getMaxX())/2,this.centrey=(t.getMinY()+t.getMaxY())/2}function Ri(){}function Ti(){Ni.apply(this)}function Pi(){this.root=null,this.minExtent=1,this.root=new Ti}function bi(t){this.geometryFactory=t||new ie}function Oi(t){this.geometryFactory=t||new ie,this.precisionModel=this.geometryFactory.getPrecisionModel(),this.parser=new bi(this.geometryFactory)}function _i(){this.parser=new bi(this.geometryFactory)}function Mi(t){this.geometryFactory=t||new ie,this.precisionModel=this.geometryFactory.getPrecisionModel(),this.parser=new re(this.geometryFactory)}function Di(t){return[t.x,t.y]}function Ai(t){this.geometryFactory=t||new ie}function Fi(){if(this.noder=null,this.scaleFactor=null,this.offsetX=null,this.offsetY=null,this.isScaled=!1,2===arguments.length){var t=arguments[0],e=arguments[1];Fi.call(this,t,e,0,0)}else if(4===arguments.length){var n=arguments[0],i=arguments[1];arguments[2],arguments[3];this.noder=n,this.scaleFactor=i,this.isScaled=!this.isIntegerPrecision()}}function Gi(){if(this.inputGeom=null,this.isClosedEndpointsInInterior=!0,this.nonSimpleLocation=null,1===arguments.length){var t=arguments[0];this.inputGeom=t}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.inputGeom=e,this.isClosedEndpointsInInterior=!n.isInBoundary(2)}}function qi(){this.pt=null,this.isClosed=null,this.degree=null;var t=arguments[0];this.pt=t,this.isClosed=!1,this.degree=0}function Bi(){if(this.quadrantSegments=Bi.DEFAULT_QUADRANT_SEGMENTS,this.endCapStyle=Bi.CAP_ROUND,this.joinStyle=Bi.JOIN_ROUND,this.mitreLimit=Bi.DEFAULT_MITRE_LIMIT,this._isSingleSided=!1,this.simplifyFactor=Bi.DEFAULT_SIMPLIFY_FACTOR,0===arguments.length);else if(1===arguments.length){var t=arguments[0];this.setQuadrantSegments(t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.setQuadrantSegments(e),this.setEndCapStyle(n)}else if(4===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2],o=arguments[3];this.setQuadrantSegments(i),this.setEndCapStyle(r),this.setJoinStyle(s),this.setMitreLimit(o)}}function zi(){this.minIndex=-1,this.minCoord=null,this.minDe=null,this.orientedDe=null}function Vi(){this.array_=[]}function ki(){this.finder=null,this.dirEdgeList=new I,this.nodes=new I,this.rightMostCoord=null,this.env=null,this.finder=new zi}function Yi(){this.inputLine=null,
this.distanceTol=null,this.isDeleted=null,this.angleOrientation=he.COUNTERCLOCKWISE;var t=arguments[0];this.inputLine=t}function Ui(){this.ptList=null,this.precisionModel=null,this.minimimVertexDistance=0,this.ptList=new I}function Xi(){this.maxCurveSegmentError=0,this.filletAngleQuantum=null,this.closingSegLengthFactor=1,this.segList=null,this.distance=0,this.precisionModel=null,this.bufParams=null,this.li=null,this.s0=null,this.s1=null,this.s2=null,this.seg0=new ce,this.seg1=new ce,this.offset0=new ce,this.offset1=new ce,this.side=0,this._hasNarrowConcaveAngle=!1;var t=arguments[0],e=arguments[1],n=arguments[2];this.precisionModel=t,this.bufParams=e,this.li=new ae,this.filletAngleQuantum=Math.PI/2/e.getQuadrantSegments(),e.getQuadrantSegments()>=8&&e.getJoinStyle()===Bi.JOIN_ROUND&&(this.closingSegLengthFactor=Xi.MAX_CLOSING_SEG_LEN_FACTOR),this.init(n)}function Hi(){this.distance=0,this.precisionModel=null,this.bufParams=null;var t=arguments[0],e=arguments[1];this.precisionModel=t,this.bufParams=e}function Wi(){this.subgraphs=null,this.seg=new ce,this.cga=new he;var t=arguments[0];this.subgraphs=t}function ji(){this.upwardSeg=null,this.leftDepth=null;var t=arguments[0],e=arguments[1];this.upwardSeg=new ce(t),this.leftDepth=e}function Ki(){this.inputGeom=null,this.distance=null,this.curveBuilder=null,this.curveList=new I;var t=arguments[0],e=arguments[1],n=arguments[2];this.inputGeom=t,this.distance=e,this.curveBuilder=n}function Zi(){this._hasIntersection=!1,this.hasProper=!1,this.hasProperInterior=!1,this.hasInterior=!1,this.properIntersectionPoint=null,this.li=null,this.isSelfIntersection=null,this.numIntersections=0,this.numInteriorIntersections=0,this.numProperIntersections=0,this.numTests=0;var t=arguments[0];this.li=t}function Qi(){this.bufParams=null,this.workingPrecisionModel=null,this.workingNoder=null,this.geomFact=null,this.graph=null,this.edgeList=new ni;var t=arguments[0];this.bufParams=t}function Ji(){this.li=new ae,this.segStrings=null;var t=arguments[0];this.segStrings=t}function $i(){this.li=null,this.pt=null,this.originalPt=null,this.ptScaled=null,this.p0Scaled=null,this.p1Scaled=null,this.scaleFactor=null,this.minx=null,this.maxx=null,this.miny=null,this.maxy=null,this.corner=new Array(4).fill(null),this.safeEnv=null;var t=arguments[0],e=arguments[1],n=arguments[2];if(this.originalPt=t,this.pt=t,this.scaleFactor=e,this.li=n,0>=e)throw new i("Scale factor must be non-zero");1!==e&&(this.pt=new g(this.scale(t.x),this.scale(t.y)),this.p0Scaled=new g,this.p1Scaled=new g),this.initCorners(this.pt)}function tr(){this.tempEnv1=new C,this.selectedSegment=new ce}function er(){this.index=null;var t=arguments[0];this.index=t}function nr(){tr.apply(this),this.hotPixel=null,this.parentEdge=null,this.hotPixelVertexIndex=null,this._isNodeAdded=!1;var t=arguments[0],e=arguments[1],n=arguments[2];this.hotPixel=t,this.parentEdge=e,this.hotPixelVertexIndex=n}function ir(){this.li=null,this.interiorIntersections=null;var t=arguments[0];this.li=t,this.interiorIntersections=new I}function rr(){this.pm=null,this.li=null,this.scaleFactor=null,this.noder=null,this.pointSnapper=null,this.nodedSegStrings=null;var t=arguments[0];this.pm=t,this.li=new ae,this.li.setPrecisionModel(t),this.scaleFactor=t.getScale()}function sr(){if(this.argGeom=null,this.distance=null,this.bufParams=new Bi,this.resultGeometry=null,this.saveException=null,1===arguments.length){var t=arguments[0];this.argGeom=t}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.argGeom=e,this.bufParams=n}}function or(){this.comps=null;var t=arguments[0];this.comps=t}function ar(){if(this.component=null,this.segIndex=null,this.pt=null,2===arguments.length){var t=arguments[0],e=arguments[1];ar.call(this,t,ar.INSIDE_AREA,e)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.component=n,this.segIndex=i,this.pt=r}}function ur(){this.pts=null;var t=arguments[0];this.pts=t}function lr(){this.locations=null;var t=arguments[0];this.locations=t}function hr(){if(this.geom=null,this.terminateDistance=0,this.ptLocator=new Te,this.minDistanceLocation=null,this.minDistance=r.MAX_VALUE,2===arguments.length){var t=arguments[0],e=arguments[1];hr.call(this,t,e,0)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],s=arguments[2];this.geom=new Array(2).fill(null),this.geom[0]=n,this.geom[1]=i,this.terminateDistance=s}}function cr(){this.factory=null,this.directedEdges=new I,this.coordinates=null;var t=arguments[0];this.factory=t}function fr(){this._isMarked=!1,this._isVisited=!1,this.data=null}function gr(){fr.apply(this),this.parentEdge=null,this.from=null,this.to=null,this.p0=null,this.p1=null,this.sym=null,this.edgeDirection=null,this.quadrant=null,this.angle=null;var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];this.from=t,this.to=e,this.edgeDirection=i,this.p0=t.getCoordinate(),this.p1=n;var r=this.p1.x-this.p0.x,s=this.p1.y-this.p0.y;this.quadrant=Je.quadrant(r,s),this.angle=Math.atan2(s,r)}function dr(){var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];gr.call(this,t,e,n,i)}function pr(){if(fr.apply(this),this.dirEdge=null,0===arguments.length);else if(2===arguments.length){var t=arguments[0],e=arguments[1];this.setDirectedEdges(t,e)}}function vr(){this.outEdges=new I,this.sorted=!1}function mr(){if(fr.apply(this),this.pt=null,this.deStar=null,1===arguments.length){var t=arguments[0];mr.call(this,t,new vr)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.pt=e,this.deStar=n}}function yr(){pr.apply(this),this.line=null;var t=arguments[0];this.line=t}function xr(){this.nodeMap=new rt}function Er(){this.edges=new J,this.dirEdges=new J,this.nodeMap=new xr}function Ir(){Er.apply(this)}function Nr(){this.graph=new Ir,this.mergedLineStrings=null,this.factory=null,this.edgeStrings=null}function Cr(){this.edgeRing=null,this.next=null,this.label=-1;var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];gr.call(this,t,e,n,i)}function Sr(){pr.apply(this),this.line=null;var t=arguments[0];this.line=t}function wr(){this.factory=null,this.deList=new I,this.lowestEdge=null,this.ring=null,this.ringPts=null,this.holes=null,this.shell=null,this._isHole=null,this._isProcessed=!1,this._isIncludedSet=!1,this._isIncluded=!1;var t=arguments[0];this.factory=t}function Lr(){}function Rr(){Er.apply(this),this.factory=null;var t=arguments[0];this.factory=t}function Tr(){if(this.lineStringAdder=new Pr(this),this.graph=null,this.dangles=new I,this.cutEdges=new I,this.invalidRingLines=new I,this.holeList=null,this.shellList=null,this.polyList=null,this.isCheckingRingsValid=!0,this.extractOnlyPolygonal=null,this.geomFactory=null,0===arguments.length)Tr.call(this,!1);else if(1===arguments.length){var t=arguments[0];this.extractOnlyPolygonal=t}}function Pr(){this.p=null;var t=arguments[0];this.p=t}function br(){}function Or(){if(this.edgeEnds=new I,1===arguments.length){var t=arguments[0];Or.call(this,null,t)}else if(2===arguments.length){var e=(arguments[0],arguments[1]);En.call(this,e.getEdge(),e.getCoordinate(),e.getDirectedCoordinate(),new gn(e.getLabel())),this.insert(e)}}function _r(){Pn.apply(this)}function Mr(){var t=arguments[0],e=arguments[1];yn.call(this,t,e)}function Dr(){Nn.apply(this)}function Ar(){this.li=new ae,this.ptLocator=new Te,this.arg=null,this.nodes=new xn(new Dr),this.im=null,this.isolatedEdges=new I,this.invalidPoint=null;var t=arguments[0];this.arg=t}function Fr(){this.rectEnv=null;var t=arguments[0];this.rectEnv=t.getEnvelopeInternal()}function Gr(){this.li=new ae,this.rectEnv=null,this.diagUp0=null,this.diagUp1=null,this.diagDown0=null,this.diagDown1=null;var t=arguments[0];this.rectEnv=t,this.diagUp0=new g(t.getMinX(),t.getMinY()),this.diagUp1=new g(t.getMaxX(),t.getMaxY()),this.diagDown0=new g(t.getMinX(),t.getMaxY()),this.diagDown1=new g(t.getMaxX(),t.getMinY())}function qr(){this._isDone=!1}function Br(){this.rectangle=null,this.rectEnv=null;var t=arguments[0];this.rectangle=t,this.rectEnv=t.getEnvelopeInternal()}function zr(){qr.apply(this),this.rectEnv=null,this._intersects=!1;var t=arguments[0];this.rectEnv=t}function Vr(){qr.apply(this),this.rectSeq=null,this.rectEnv=null,this._containsPoint=!1;var t=arguments[0];this.rectSeq=t.getExteriorRing().getCoordinateSequence(),this.rectEnv=t.getEnvelopeInternal()}function kr(){qr.apply(this),this.rectEnv=null,this.rectIntersector=null,this.hasIntersection=!1,this.p0=new g,this.p1=new g;var t=arguments[0];this.rectEnv=t.getEnvelopeInternal(),this.rectIntersector=new Gr(this.rectEnv)}function Yr(){if(this._relate=null,2===arguments.length){var t=arguments[0],e=arguments[1];ti.call(this,t,e),this._relate=new Ar(this.arg)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];ti.call(this,n,i,r),this._relate=new Ar(this.arg)}}function Ur(){this.geomFactory=null,this.skipEmpty=!1,this.inputGeoms=null;var t=arguments[0];this.geomFactory=Ur.extractFactory(t),this.inputGeoms=t}function Xr(){this.pointGeom=null,this.otherGeom=null,this.geomFact=null;var t=arguments[0],e=arguments[1];this.pointGeom=t,this.otherGeom=e,this.geomFact=e.getFactory()}function Hr(){this.sortIndex=-1,this.comps=null;var t=arguments[0],e=arguments[1];this.sortIndex=t,this.comps=e}function Wr(){this.inputPolys=null,this.geomFactory=null;var t=arguments[0];this.inputPolys=t,null===this.inputPolys&&(this.inputPolys=new I)}function jr(){if(this.polygons=new I,this.lines=new I,this.points=new I,this.geomFact=null,1===arguments.length){if(R(arguments[0],v)){var t=arguments[0];this.extract(t)}else if(arguments[0]instanceof B){var e=arguments[0];this.extract(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.geomFact=i,this.extract(n)}}function Kr(){this.geometryFactory=new ie,this.geomGraph=null,this.disconnectedRingcoord=null;var t=arguments[0];this.geomGraph=t}function Zr(){this.items=new I,this.subnode=[null,null]}function Qr(){if(this.min=null,this.max=null,0===arguments.length)this.min=0,this.max=0;else if(1===arguments.length){var t=arguments[0];this.init(t.min,t.max)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.init(e,n)}}function Jr(){this.pt=0,this.level=0,this.interval=null;var t=arguments[0];this.computeKey(t)}function $r(){Zr.apply(this),this.interval=null,this.centre=null,this.level=null;var t=arguments[0],e=arguments[1];this.interval=t,this.level=e,this.centre=(t.getMin()+t.getMax())/2}function ts(){Zr.apply(this)}function es(){this.root=null,this.minExtent=1,this.root=new ts}function ns(){}function is(){this.ring=null,this.tree=null,this.crossings=0,this.interval=new Qr;var t=arguments[0];this.ring=t,this.buildIndex()}function rs(){tr.apply(this),this.mcp=null,this.p=null;var t=arguments[0],e=arguments[1];this.mcp=t,this.p=e}function ss(){this.nodes=new xn(new Dr)}function os(){this.li=new ae,this.geomGraph=null,this.nodeGraph=new ss,this.invalidPoint=null;var t=arguments[0];this.geomGraph=t}function as(){this.graph=null,this.rings=new I,this.totalEnv=new C,this.index=null,this.nestedPt=null;var t=arguments[0];this.graph=t}function us(){if(this.errorType=null,this.pt=null,1===arguments.length){var t=arguments[0];us.call(this,t,null)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.errorType=e,null!==n&&(this.pt=n.copy())}}function ls(){this.parentGeometry=null,this.isSelfTouchingRingFormingHoleValid=!1,this.validErr=null;var t=arguments[0];this.parentGeometry=t}function hs(){_t.CoordinateOperation.apply(this),this.targetPM=null,this.removeCollapsed=!0;var t=arguments[0],e=arguments[1];this.targetPM=t,this.removeCollapsed=e}function cs(){this.targetPM=null,this.removeCollapsed=!0,this.changePrecisionModel=!1,this.isPointwise=!1;var t=arguments[0];this.targetPM=t}function fs(){this.pts=null,this.usePt=null,this.distanceTolerance=null,this.seg=new ce;var t=arguments[0];this.pts=t}function gs(){this.inputGeom=null,this.distanceTolerance=null,this.isEnsureValidTopology=!0;var t=arguments[0];this.inputGeom=t}function ds(){xe.apply(this),this.isEnsureValidTopology=!0,this.distanceTolerance=null;var t=arguments[0],e=arguments[1];this.isEnsureValidTopology=t,this.distanceTolerance=e}function ps(){if(this.parent=null,this.index=null,2===arguments.length){var t=arguments[0],e=arguments[1];ps.call(this,t,e,null,-1)}else if(4===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2],s=arguments[3];ce.call(this,n,i),this.parent=r,this.index=s}}function vs(){if(this.parentLine=null,this.segs=null,this.resultSegs=new I,this.minimumSize=null,1===arguments.length){var t=arguments[0];vs.call(this,t,2)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.parentLine=e,this.minimumSize=n,this.init()}}function ms(){this.index=new Pi}function ys(){this.querySeg=null,this.items=new I;var t=arguments[0];this.querySeg=t}function xs(){this.li=new ae,this.inputIndex=new ms,this.outputIndex=new ms,this.line=null,this.linePts=null,this.distanceTolerance=0;var t=arguments[0],e=arguments[1];this.inputIndex=t,this.outputIndex=e}function Es(){this.inputIndex=new ms,this.outputIndex=new ms,this.distanceTolerance=0}function Is(){this.inputGeom=null,this.lineSimplifier=new Es,this.linestringMap=null;var t=arguments[0];this.inputGeom=t}function Ns(){xe.apply(this),this.linestringMap=null;var t=arguments[0];this.linestringMap=t}function Cs(){this.tps=null;var t=arguments[0];this.tps=t}function Ss(){this.seg=null,this.segLen=null,this.splitPt=null,this.minimumLen=0;var t=arguments[0];this.seg=t,this.segLen=t.getLength()}function ws(){}function Ls(){}function Rs(){}function Ts(){if(this.p=null,1===arguments.length){var t=arguments[0];this.p=new g(t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.p=new g(e,n)}else if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];this.p=new g(i,r,s)}}function Ps(){this._isOnConstraint=null,this.constraint=null;var t=arguments[0];Ts.call(this,t)}function bs(){this._rot=null,this.vertex=null,this.next=null,this.data=null}function Os(){this.subdiv=null,this.isUsingTolerance=!1;var t=arguments[0];this.subdiv=t,this.isUsingTolerance=t.getTolerance()>0}function _s(){}function Ms(){this.subdiv=null,this.lastEdge=null;var t=arguments[0];this.subdiv=t,this.init()}function Ds(){if(this.seg=null,1===arguments.length){if("string"==typeof arguments[0]){var t=arguments[0];l.call(this,t)}else if(arguments[0]instanceof ce){var e=arguments[0];l.call(this,"Locate failed to converge (at edge: "+e+").  Possible causes include invalid Subdivision topology or very close sites"),this.seg=new ce(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];l.call(this,Ds.msgWithSpatial(n,i)),this.seg=new ce(i)}}function As(){}function Fs(){this.visitedKey=0,this.quadEdges=new I,this.startingEdge=null,this.tolerance=null,this.edgeCoincidenceTolerance=null,this.frameVertex=new Array(3).fill(null),this.frameEnv=null,this.locator=null,this.seg=new ce,this.triEdges=new Array(3).fill(null);var t=arguments[0],e=arguments[1];this.tolerance=e,this.edgeCoincidenceTolerance=e/Fs.EDGE_COINCIDENCE_TOL_FACTOR,this.createFrame(t),this.startingEdge=this.initSubdiv(),this.locator=new Ms(this)}function Gs(){}function qs(){this.triList=new I}function Bs(){this.triList=new I}function zs(){this.coordList=new N,this.triCoords=new I}function Vs(){if(this.ls=null,this.data=null,2===arguments.length){var t=arguments[0],e=arguments[1];this.ls=new ce(t,e)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.ls=new ce(n,i),this.data=r}else if(6===arguments.length){var s=arguments[0],o=arguments[1],a=arguments[2],u=arguments[3],l=arguments[4],h=arguments[5];Vs.call(this,new g(s,o,a),new g(u,l,h))}else if(7===arguments.length){var c=arguments[0],f=arguments[1],d=arguments[2],p=arguments[3],v=arguments[4],m=arguments[5],y=arguments[6];Vs.call(this,new g(c,f,d),new g(p,v,m),y)}}function ks(){}function Ys(){if(this.p=null,this.data=null,this.left=null,this.right=null,this.count=null,2===arguments.length){var t=arguments[0],e=arguments[1];this.p=new g(t),this.left=null,this.right=null,this.count=1,this.data=e}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.p=new g(n,i),this.left=null,this.right=null,this.count=1,this.data=r}}function Us(){if(this.root=null,this.numberOfNodes=null,this.tolerance=null,0===arguments.length)Us.call(this,0);else if(1===arguments.length){var t=arguments[0];this.tolerance=t}}function Xs(){this.tolerance=null,this.matchNode=null,this.matchDist=0,this.p=null;var t=arguments[0],e=arguments[1];this.p=t,this.tolerance=e}function Hs(){this.initialVertices=null,this.segVertices=null,this.segments=new I,this.subdiv=null,this.incDel=null,this.convexHull=null,this.splitFinder=new Ls,this.kdt=null,this.vertexFactory=null,this.computeAreaEnv=null,this.splitPt=null,this.tolerance=null;var t=arguments[0],e=arguments[1];this.initialVertices=new I(t),this.tolerance=e,this.kdt=new Us(e)}function Ws(){this.siteCoords=null,this.tolerance=0,this.subdiv=null}function js(){this.siteCoords=null,this.constraintLines=null,this.tolerance=0,this.subdiv=null,this.constraintVertexMap=new rt}function Ks(){this.siteCoords=null,this.tolerance=0,this.subdiv=null,this.clipEnv=null,this.diagramEnv=null}function Zs(){}Array.prototype.fill||(Array.prototype.fill=function(t){for(var e=Object(this),n=parseInt(e.length,10),i=arguments[1],r=parseInt(i,10)||0,s=0>r?Math.max(n+r,0):Math.min(r,n),o=arguments[2],a=void 0===o?n:parseInt(o,10)||0,u=0>a?Math.max(n+a,0):Math.min(a,n);u>s;s++)e[s]=t;return e}),Number.isFinite=Number.isFinite||function(t){return"number"==typeof t&&isFinite(t)},Number.isInteger=Number.isInteger||function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t},Number.parseFloat=Number.parseFloat||parseFloat,Number.isNaN=Number.isNaN||function(t){return t!==t},Math.trunc=Math.trunc||function(t){return 0>t?Math.ceil(t):Math.floor(t)},e(n.prototype,{interfaces_:function(){return[]},getClass:function(){return n}}),n.equalsWithTolerance=function(t,e,n){return Math.abs(t-e)<=n},r.isNaN=function(t){return Number.isNaN(t)},r.doubleToLongBits=function(t){return t},r.longBitsToDouble=function(t){return t},r.isInfinite=function(t){return!Number.isFinite(t)},r.MAX_VALUE=Number.MAX_VALUE,h(c,l),e(c.prototype,{interfaces_:function(){return[]},getClass:function(){return c}}),e(f.prototype,{interfaces_:function(){return[]},getClass:function(){return f}}),f.shouldNeverReachHere=function(){if(0===arguments.length)f.shouldNeverReachHere(null);else if(1===arguments.length){var t=arguments[0];throw new c("Should never reach here"+(null!==t?": "+t:""))}},f.isTrue=function(){if(1===arguments.length){var t=arguments[0];f.isTrue(t,null)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];if(!e)throw null===n?new c:new c(n)}},f.equals=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];f.equals(t,e,null)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];if(!i.equals(n))throw new c("Expected "+n+" but encountered "+i+(null!==r?": "+r:""))}},e(g.prototype,{setOrdinate:function(t,e){switch(t){case g.X:this.x=e;break;case g.Y:this.y=e;break;case g.Z:this.z=e;break;default:throw new i("Invalid ordinate index: "+t)}},equals2D:function(){if(1===arguments.length){var t=arguments[0];return this.x!==t.x?!1:this.y===t.y}if(2===arguments.length){var e=arguments[0],i=arguments[1];return n.equalsWithTolerance(this.x,e.x,i)?!!n.equalsWithTolerance(this.y,e.y,i):!1}},getOrdinate:function(t){switch(t){case g.X:return this.x;case g.Y:return this.y;case g.Z:return this.z}throw new i("Invalid ordinate index: "+t)},equals3D:function(t){return this.x===t.x&&this.y===t.y&&(this.z===t.z||r.isNaN(this.z)&&r.isNaN(t.z))},equals:function(t){return t instanceof g?this.equals2D(t):!1},equalInZ:function(t,e){return n.equalsWithTolerance(this.z,t.z,e)},compareTo:function(t){var e=t;return this.x<e.x?-1:this.x>e.x?1:this.y<e.y?-1:this.y>e.y?1:0},clone:function(){try{var t=null;return t}catch(t){if(t instanceof CloneNotSupportedException)return f.shouldNeverReachHere("this shouldn't happen because this class is Cloneable"),null;throw t}finally{}},copy:function(){return new g(this)},toString:function(){return"("+this.x+", "+this.y+", "+this.z+")"},distance3D:function(t){var e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return Math.sqrt(e*e+n*n+i*i)},distance:function(t){var e=this.x-t.x,n=this.y-t.y;return Math.sqrt(e*e+n*n)},hashCode:function(){var t=17;return t=37*t+g.hashCode(this.x),t=37*t+g.hashCode(this.y)},setCoordinate:function(t){this.x=t.x,this.y=t.y,this.z=t.z},interfaces_:function(){return[s,o,u]},getClass:function(){return g}}),g.hashCode=function(){if(1===arguments.length){var t=arguments[0],e=r.doubleToLongBits(t);return Math.trunc(e^e>>>32)}},e(d.prototype,{compare:function(t,e){var n=t,i=e,r=d.compare(n.x,i.x);if(0!==r)return r;var s=d.compare(n.y,i.y);if(0!==s)return s;if(this.dimensionsToTest<=2)return 0;var o=d.compare(n.z,i.z);return o},interfaces_:function(){return[a]},getClass:function(){return d}}),d.compare=function(t,e){return e>t?-1:t>e?1:r.isNaN(t)?r.isNaN(e)?0:-1:r.isNaN(e)?1:0},g.DimensionalComparator=d,g.serialVersionUID=0x5cbf2c235c7e5800,g.NULL_ORDINATE=r.NaN,g.X=0,g.Y=1,g.Z=2,p.prototype.hasNext=function(){},p.prototype.next=function(){},p.prototype.remove=function(){},v.prototype.add=function(){},v.prototype.addAll=function(){},v.prototype.isEmpty=function(){},v.prototype.iterator=function(){},v.prototype.size=function(){},v.prototype.toArray=function(){},v.prototype.remove=function(){},m.prototype=new Error,m.prototype.name="IndexOutOfBoundsException",y.prototype=Object.create(v.prototype),y.prototype.constructor=y,y.prototype.get=function(){},y.prototype.set=function(){},y.prototype.isEmpty=function(){},x.prototype=new Error,x.prototype.name="NoSuchElementException",E.prototype=new Error,E.prototype.name="OperationNotSupported",I.prototype=Object.create(y.prototype),I.prototype.constructor=I,I.prototype.ensureCapacity=function(){},I.prototype.interfaces_=function(){return[y,v]},I.prototype.add=function(t){return this.array_.push(t),!0},I.prototype.clear=function(){this.array_=[]},I.prototype.addAll=function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next());return!0},I.prototype.set=function(t,e){var n=this.array_[t];return this.array_[t]=e,n},I.prototype.iterator=function(){return new Qs(this)},I.prototype.get=function(t){if(0>t||t>=this.size())throw new m;return this.array_[t]},I.prototype.isEmpty=function(){return 0===this.array_.length},I.prototype.size=function(){return this.array_.length},I.prototype.toArray=function(){for(var t=[],e=0,n=this.array_.length;n>e;e++)t.push(this.array_[e]);return t},I.prototype.remove=function(t){for(var e=!1,n=0,i=this.array_.length;i>n;n++)if(this.array_[n]===t){this.array_.splice(n,1),e=!0;break}return e};var Qs=function(t){this.arrayList_=t,this.position_=0};Qs.prototype.next=function(){if(this.position_===this.arrayList_.size())throw new x;return this.arrayList_.get(this.position_++)},Qs.prototype.hasNext=function(){return this.position_<this.arrayList_.size()},Qs.prototype.set=function(t){return this.arrayList_.set(this.position_-1,t)},Qs.prototype.remove=function(){throw new E},h(N,I),e(N.prototype,{getCoordinate:function(t){return this.get(t)},addAll:function(){if(2===arguments.length){for(var t=arguments[0],e=arguments[1],n=!1,i=t.iterator();i.hasNext();)this.add(i.next(),e),n=!0;return n}return I.prototype.addAll.apply(this,arguments)},clone:function t(){for(var t=I.prototype.clone.call(this),e=0;e<this.size();e++)t.add(e,this.get(e).copy());return t},toCoordinateArray:function(){return this.toArray(N.coordArrayType)},add:function(){if(1===arguments.length){var t=arguments[0];I.prototype.add.call(this,t)}else if(2===arguments.length){if(arguments[0]instanceof Array&&"boolean"==typeof arguments[1]){var e=arguments[0],n=arguments[1];return this.add(e,n,!0),!0}if(arguments[0]instanceof g&&"boolean"==typeof arguments[1]){var i=arguments[0],r=arguments[1];if(!r&&this.size()>=1){var s=this.get(this.size()-1);if(s.equals2D(i))return null}I.prototype.add.call(this,i)}else if(arguments[0]instanceof Object&&"boolean"==typeof arguments[1]){var o=arguments[0],a=arguments[1];return this.add(o,a),!0}}else if(3===arguments.length){if("boolean"==typeof arguments[2]&&arguments[0]instanceof Array&&"boolean"==typeof arguments[1]){var u=arguments[0],l=arguments[1],h=arguments[2];if(h)for(var c=0;c<u.length;c++)this.add(u[c],l);else for(var c=u.length-1;c>=0;c--)this.add(u[c],l);return!0}if("boolean"==typeof arguments[2]&&Number.isInteger(arguments[0])&&arguments[1]instanceof g){var f=arguments[0],d=arguments[1],p=arguments[2];if(!p){var v=this.size();if(v>0){if(f>0){var m=this.get(f-1);if(m.equals2D(d))return null}if(v>f){var y=this.get(f);if(y.equals2D(d))return null}}}I.prototype.add.call(this,f,d)}}else if(4===arguments.length){var x=arguments[0],E=arguments[1],N=arguments[2],C=arguments[3],S=1;N>C&&(S=-1);for(var c=N;c!==C;c+=S)this.add(x[c],E);return!0}},closeRing:function(){this.size()>0&&this.add(new g(this.get(0)),!1)},interfaces_:function(){return[]},getClass:function(){return N}}),N.coordArrayType=new Array(0).fill(null),e(C.prototype,{getArea:function(){return this.getWidth()*this.getHeight()},equals:function(t){if(!(t instanceof C))return!1;var e=t;return this.isNull()?e.isNull():this.maxx===e.getMaxX()&&this.maxy===e.getMaxY()&&this.minx===e.getMinX()&&this.miny===e.getMinY()},intersection:function(t){if(this.isNull()||t.isNull()||!this.intersects(t))return new C;var e=this.minx>t.minx?this.minx:t.minx,n=this.miny>t.miny?this.miny:t.miny,i=this.maxx<t.maxx?this.maxx:t.maxx,r=this.maxy<t.maxy?this.maxy:t.maxy;return new C(e,i,n,r)},isNull:function(){return this.maxx<this.minx},getMaxX:function(){return this.maxx},covers:function(){if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];return this.covers(t.x,t.y)}if(arguments[0]instanceof C){var e=arguments[0];return this.isNull()||e.isNull()?!1:e.getMinX()>=this.minx&&e.getMaxX()<=this.maxx&&e.getMinY()>=this.miny&&e.getMaxY()<=this.maxy}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return this.isNull()?!1:n>=this.minx&&n<=this.maxx&&i>=this.miny&&i<=this.maxy}},intersects:function(){if(1===arguments.length){if(arguments[0]instanceof C){var t=arguments[0];return this.isNull()||t.isNull()?!1:!(t.minx>this.maxx||t.maxx<this.minx||t.miny>this.maxy||t.maxy<this.miny)}if(arguments[0]instanceof g){var e=arguments[0];return this.intersects(e.x,e.y)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return this.isNull()?!1:!(n>this.maxx||n<this.minx||i>this.maxy||i<this.miny)}},getMinY:function(){return this.miny},getMinX:function(){return this.minx},expandToInclude:function(){if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];this.expandToInclude(t.x,t.y)}else if(arguments[0]instanceof C){var e=arguments[0];if(e.isNull())return null;this.isNull()?(this.minx=e.getMinX(),this.maxx=e.getMaxX(),this.miny=e.getMinY(),this.maxy=e.getMaxY()):(e.minx<this.minx&&(this.minx=e.minx),e.maxx>this.maxx&&(this.maxx=e.maxx),e.miny<this.miny&&(this.miny=e.miny),e.maxy>this.maxy&&(this.maxy=e.maxy))}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.isNull()?(this.minx=n,this.maxx=n,this.miny=i,this.maxy=i):(n<this.minx&&(this.minx=n),n>this.maxx&&(this.maxx=n),i<this.miny&&(this.miny=i),i>this.maxy&&(this.maxy=i))}},minExtent:function(){if(this.isNull())return 0;var t=this.getWidth(),e=this.getHeight();return e>t?t:e},getWidth:function(){return this.isNull()?0:this.maxx-this.minx},compareTo:function(t){var e=t;return this.isNull()?e.isNull()?0:-1:e.isNull()?1:this.minx<e.minx?-1:this.minx>e.minx?1:this.miny<e.miny?-1:this.miny>e.miny?1:this.maxx<e.maxx?-1:this.maxx>e.maxx?1:this.maxy<e.maxy?-1:this.maxy>e.maxy?1:0},translate:function(t,e){return this.isNull()?null:void this.init(this.getMinX()+t,this.getMaxX()+t,this.getMinY()+e,this.getMaxY()+e)},toString:function(){return"Env["+this.minx+" : "+this.maxx+", "+this.miny+" : "+this.maxy+"]"},setToNull:function(){this.minx=0,this.maxx=-1,this.miny=0,this.maxy=-1},getHeight:function(){return this.isNull()?0:this.maxy-this.miny},maxExtent:function(){if(this.isNull())return 0;var t=this.getWidth(),e=this.getHeight();return t>e?t:e},expandBy:function(){if(1===arguments.length){var t=arguments[0];this.expandBy(t,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];if(this.isNull())return null;this.minx-=e,this.maxx+=e,this.miny-=n,this.maxy+=n,(this.minx>this.maxx||this.miny>this.maxy)&&this.setToNull()}},contains:function(){if(1===arguments.length){if(arguments[0]instanceof C){var t=arguments[0];return this.covers(t)}if(arguments[0]instanceof g){var e=arguments[0];return this.covers(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return this.covers(n,i)}},centre:function(){return this.isNull()?null:new g((this.getMinX()+this.getMaxX())/2,(this.getMinY()+this.getMaxY())/2)},init:function(){if(0===arguments.length)this.setToNull();else if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];this.init(t.x,t.x,t.y,t.y)}else if(arguments[0]instanceof C){var e=arguments[0];this.minx=e.minx,this.maxx=e.maxx,this.miny=e.miny,this.maxy=e.maxy}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.init(n.x,i.x,n.y,i.y)}else if(4===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3];s>r?(this.minx=r,this.maxx=s):(this.minx=s,this.maxx=r),a>o?(this.miny=o,this.maxy=a):(this.miny=a,this.maxy=o)}},getMaxY:function(){return this.maxy},distance:function(t){if(this.intersects(t))return 0;var e=0;this.maxx<t.minx?e=t.minx-this.maxx:this.minx>t.maxx&&(e=this.minx-t.maxx);var n=0;return this.maxy<t.miny?n=t.miny-this.maxy:this.miny>t.maxy&&(n=this.miny-t.maxy),0===e?n:0===n?e:Math.sqrt(e*e+n*n)},hashCode:function(){var t=17;return t=37*t+g.hashCode(this.minx),t=37*t+g.hashCode(this.maxx),t=37*t+g.hashCode(this.miny),t=37*t+g.hashCode(this.maxy)},interfaces_:function(){return[s,u]},getClass:function(){return C}}),C.intersects=function(){if(3===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2];return n.x>=(t.x<e.x?t.x:e.x)&&n.x<=(t.x>e.x?t.x:e.x)&&n.y>=(t.y<e.y?t.y:e.y)&&n.y<=(t.y>e.y?t.y:e.y)}if(4===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2],o=arguments[3],a=Math.min(s.x,o.x),u=Math.max(s.x,o.x),l=Math.min(i.x,r.x),h=Math.max(i.x,r.x);return l>u?!1:a>h?!1:(a=Math.min(s.y,o.y),u=Math.max(s.y,o.y),l=Math.min(i.y,r.y),h=Math.max(i.y,r.y),l>u?!1:!(a>h))}},C.serialVersionUID=0x51845cd552189800,h(w,S),e(w.prototype,{interfaces_:function(){return[]},getClass:function(){return w}}),e(L.prototype,{interfaces_:function(){return[]},getClass:function(){return L}}),L.toLocationSymbol=function(t){switch(t){case L.EXTERIOR:return"e";case L.BOUNDARY:return"b";case L.INTERIOR:return"i";case L.NONE:return"-"}throw new i("Unknown location value: "+t)},L.INTERIOR=0,L.BOUNDARY=1,L.EXTERIOR=2,L.NONE=-1,e(T.prototype,{interfaces_:function(){return[]},getClass:function(){return T}}),T.log10=function(t){var e=Math.log(t);return r.isInfinite(e)?e:r.isNaN(e)?e:e/T.LOG_10},T.min=function(t,e,n,i){var r=t;return r>e&&(r=e),r>n&&(r=n),r>i&&(r=i),r},T.clamp=function(){if("number"==typeof arguments[2]&&"number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1],n=arguments[2];return e>t?e:t>n?n:t}if(Number.isInteger(arguments[2])&&Number.isInteger(arguments[0])&&Number.isInteger(arguments[1])){var i=arguments[0],r=arguments[1],s=arguments[2];return r>i?r:i>s?s:i}},T.wrap=function(t,e){return 0>t?e- -t%e:t%e},T.max=function(){if(3===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],i=t;return e>i&&(i=e),n>i&&(i=n),i}if(4===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3],i=r;return s>i&&(i=s),o>i&&(i=o),a>i&&(i=a),i}},T.average=function(t,e){
return(t+e)/2},T.LOG_10=Math.log(10),P.prototype.append=function(t){this.str+=t},P.prototype.setCharAt=function(t,e){return this.str.substr(0,t)+e+this.str.substr(t+1)},P.prototype.toString=function(t){return this.str},b.prototype.intValue=function(){return this.value},b.prototype.compareTo=function(t){return this.value<t?-1:this.value>t?1:0},b.isNaN=function(t){return Number.isNaN(t)},O.isWhitespace=function(t){return 32>=t&&t>=0||127==t},O.toUpperCase=function(t){return t.toUpperCase()},e(_.prototype,{le:function(t){return this.hi<t.hi||this.hi===t.hi&&this.lo<=t.lo},extractSignificantDigits:function(t,e){var n=this.abs(),i=_.magnitude(n.hi),r=_.TEN.pow(i);n=n.divide(r),n.gt(_.TEN)?(n=n.divide(_.TEN),i+=1):n.lt(_.ONE)&&(n=n.multiply(_.TEN),i-=1);for(var s=i+1,o=new P,a=_.MAX_PRINT_DIGITS-1,u=0;a>=u;u++){t&&u===s&&o.append(".");var l=Math.trunc(n.hi);if(0>l)break;var h=!1,c=0;l>9?(h=!0,c="9"):c="0"+l,o.append(c),n=n.subtract(_.valueOf(l)).multiply(_.TEN),h&&n.selfAdd(_.TEN);var f=!0,g=_.magnitude(n.hi);if(0>g&&Math.abs(g)>=a-u&&(f=!1),!f)break}return e[0]=i,o.toString()},sqr:function(){return this.multiply(this)},doubleValue:function(){return this.hi+this.lo},subtract:function(){if(arguments[0]instanceof _){var t=arguments[0];return this.add(t.negate())}if("number"==typeof arguments[0]){var e=arguments[0];return this.add(-e)}},equals:function(){if(1===arguments.length){var t=arguments[0];return this.hi===t.hi&&this.lo===t.lo}},isZero:function(){return 0===this.hi&&0===this.lo},selfSubtract:function(){if(arguments[0]instanceof _){var t=arguments[0];return this.isNaN()?this:this.selfAdd(-t.hi,-t.lo)}if("number"==typeof arguments[0]){var e=arguments[0];return this.isNaN()?this:this.selfAdd(-e,0)}},getSpecialNumberString:function(){return this.isZero()?"0.0":this.isNaN()?"NaN ":null},min:function(t){return this.le(t)?this:t},selfDivide:function(){if(1===arguments.length){if(arguments[0]instanceof _){var t=arguments[0];return this.selfDivide(t.hi,t.lo)}if("number"==typeof arguments[0]){var e=arguments[0];return this.selfDivide(e,0)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1],r=null,s=null,o=null,a=null,u=null,l=null,h=null,c=null;return u=this.hi/n,l=_.SPLIT*u,r=l-u,c=_.SPLIT*n,r=l-r,s=u-r,o=c-n,h=u*n,o=c-o,a=n-o,c=r*o-h+r*a+s*o+s*a,l=(this.hi-h-c+this.lo-u*i)/n,c=u+l,this.hi=c,this.lo=u-c+l,this}},dump:function(){return"DD<"+this.hi+", "+this.lo+">"},divide:function(){if(arguments[0]instanceof _){var t=arguments[0],e=null,n=null,i=null,s=null,o=null,a=null,u=null,l=null;o=this.hi/t.hi,a=_.SPLIT*o,e=a-o,l=_.SPLIT*t.hi,e=a-e,n=o-e,i=l-t.hi,u=o*t.hi,i=l-i,s=t.hi-i,l=e*i-u+e*s+n*i+n*s,a=(this.hi-u-l+this.lo-o*t.lo)/t.hi,l=o+a;var h=l,c=o-l+a;return new _(h,c)}if("number"==typeof arguments[0]){var f=arguments[0];return r.isNaN(f)?_.createNaN():_.copy(this).selfDivide(f,0)}},ge:function(t){return this.hi>t.hi||this.hi===t.hi&&this.lo>=t.lo},pow:function(t){if(0===t)return _.valueOf(1);var e=new _(this),n=_.valueOf(1),i=Math.abs(t);if(i>1)for(;i>0;)i%2===1&&n.selfMultiply(e),i/=2,i>0&&(e=e.sqr());else n=e;return 0>t?n.reciprocal():n},ceil:function(){if(this.isNaN())return _.NaN;var t=Math.ceil(this.hi),e=0;return t===this.hi&&(e=Math.ceil(this.lo)),new _(t,e)},compareTo:function(t){var e=t;return this.hi<e.hi?-1:this.hi>e.hi?1:this.lo<e.lo?-1:this.lo>e.lo?1:0},rint:function(){if(this.isNaN())return this;var t=this.add(.5);return t.floor()},setValue:function(){if(arguments[0]instanceof _){var t=arguments[0];return this.init(t),this}if("number"==typeof arguments[0]){var e=arguments[0];return this.init(e),this}},max:function(t){return this.ge(t)?this:t},sqrt:function(){if(this.isZero())return _.valueOf(0);if(this.isNegative())return _.NaN;var t=1/Math.sqrt(this.hi),e=this.hi*t,n=_.valueOf(e),i=this.subtract(n.sqr()),r=i.hi*(.5*t);return n.add(r)},selfAdd:function(){if(1===arguments.length){if(arguments[0]instanceof _){var t=arguments[0];return this.selfAdd(t.hi,t.lo)}if("number"==typeof arguments[0]){var e=arguments[0],n=null,i=null,r=null,s=null,o=null,a=null;return r=this.hi+e,o=r-this.hi,s=r-o,s=e-o+(this.hi-s),a=s+this.lo,n=r+a,i=a+(r-n),this.hi=n+i,this.lo=i+(n-this.hi),this}}else if(2===arguments.length){var u=arguments[0],l=arguments[1],n=null,i=null,h=null,c=null,r=null,s=null,o=null,a=null;r=this.hi+u,h=this.lo+l,o=r-this.hi,a=h-this.lo,s=r-o,c=h-a,s=u-o+(this.hi-s),c=l-a+(this.lo-c),o=s+h,n=r+o,i=o+(r-n),o=c+i;var f=n+o,g=o+(n-f);return this.hi=f,this.lo=g,this}},selfMultiply:function(){if(1===arguments.length){if(arguments[0]instanceof _){var t=arguments[0];return this.selfMultiply(t.hi,t.lo)}if("number"==typeof arguments[0]){var e=arguments[0];return this.selfMultiply(e,0)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1],r=null,s=null,o=null,a=null,u=null,l=null;u=_.SPLIT*this.hi,r=u-this.hi,l=_.SPLIT*n,r=u-r,s=this.hi-r,o=l-n,u=this.hi*n,o=l-o,a=n-o,l=r*o-u+r*a+s*o+s*a+(this.hi*i+this.lo*n);var h=u+l;r=u-h;var c=l+r;return this.hi=h,this.lo=c,this}},selfSqr:function(){return this.selfMultiply(this)},floor:function(){if(this.isNaN())return _.NaN;var t=Math.floor(this.hi),e=0;return t===this.hi&&(e=Math.floor(this.lo)),new _(t,e)},negate:function(){return this.isNaN()?this:new _(-this.hi,-this.lo)},clone:function(){try{return null}catch(t){if(t instanceof CloneNotSupportedException)return null;throw t}finally{}},multiply:function(){if(arguments[0]instanceof _){var t=arguments[0];return t.isNaN()?_.createNaN():_.copy(this).selfMultiply(t)}if("number"==typeof arguments[0]){var e=arguments[0];return r.isNaN(e)?_.createNaN():_.copy(this).selfMultiply(e,0)}},isNaN:function(){return r.isNaN(this.hi)},intValue:function(){return Math.trunc(this.hi)},toString:function(){var t=_.magnitude(this.hi);return t>=-3&&20>=t?this.toStandardNotation():this.toSciNotation()},toStandardNotation:function(){var t=this.getSpecialNumberString();if(null!==t)return t;var e=new Array(1).fill(null),n=this.extractSignificantDigits(!0,e),i=e[0]+1,r=n;if("."===n.charAt(0))r="0"+n;else if(0>i)r="0."+_.stringOfChar("0",-i)+n;else if(-1===n.indexOf(".")){var s=i-n.length,o=_.stringOfChar("0",s);r=n+o+".0"}return this.isNegative()?"-"+r:r},reciprocal:function(){var t=null,e=null,n=null,i=null,r=null,s=null,o=null,a=null;r=1/this.hi,s=_.SPLIT*r,t=s-r,a=_.SPLIT*this.hi,t=s-t,e=r-t,n=a-this.hi,o=r*this.hi,n=a-n,i=this.hi-n,a=t*n-o+t*i+e*n+e*i,s=(1-o-a-r*this.lo)/this.hi;var u=r+s,l=r-u+s;return new _(u,l)},toSciNotation:function(){if(this.isZero())return _.SCI_NOT_ZERO;var t=this.getSpecialNumberString();if(null!==t)return t;var e=new Array(1).fill(null),n=this.extractSignificantDigits(!1,e),i=_.SCI_NOT_EXPONENT_CHAR+e[0];if("0"===n.charAt(0))throw new IllegalStateException("Found leading zero: "+n);var r="";n.length>1&&(r=n.substring(1));var s=n.charAt(0)+"."+r;return this.isNegative()?"-"+s+i:s+i},abs:function(){return this.isNaN()?_.NaN:this.isNegative()?this.negate():new _(this)},isPositive:function(){return this.hi>0||0===this.hi&&this.lo>0},lt:function(t){return this.hi<t.hi||this.hi===t.hi&&this.lo<t.lo},add:function(){if(arguments[0]instanceof _){var t=arguments[0];return _.copy(this).selfAdd(t)}if("number"==typeof arguments[0]){var e=arguments[0];return _.copy(this).selfAdd(e)}},init:function(){if(1===arguments.length){if("number"==typeof arguments[0]){var t=arguments[0];this.hi=t,this.lo=0}else if(arguments[0]instanceof _){var e=arguments[0];this.hi=e.hi,this.lo=e.lo}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];this.hi=n,this.lo=i}},gt:function(t){return this.hi>t.hi||this.hi===t.hi&&this.lo>t.lo},isNegative:function(){return this.hi<0||0===this.hi&&this.lo<0},trunc:function(){return this.isNaN()?_.NaN:this.isPositive()?this.floor():this.ceil()},signum:function(){return this.hi>0?1:this.hi<0?-1:this.lo>0?1:this.lo<0?-1:0},interfaces_:function(){return[u,s,o]},getClass:function(){return _}}),_.sqr=function(t){return _.valueOf(t).selfMultiply(t)},_.valueOf=function(){if("string"==typeof arguments[0]){var t=arguments[0];return _.parse(t)}if("number"==typeof arguments[0]){var e=arguments[0];return new _(e)}},_.sqrt=function(t){return _.valueOf(t).sqrt()},_.parse=function(t){for(var e=0,n=t.length;O.isWhitespace(t.charAt(e));)e++;var i=!1;if(n>e){var r=t.charAt(e);"-"!==r&&"+"!==r||(e++,"-"===r&&(i=!0))}for(var s=new _,o=0,a=0,u=0;;){if(e>=n)break;var l=t.charAt(e);if(e++,O.isDigit(l)){var h=l-"0";s.selfMultiply(_.TEN),s.selfAdd(h),o++}else{if("."!==l){if("e"===l||"E"===l){var c=t.substring(e);try{u=b.parseInt(c)}catch(e){throw e instanceof NumberFormatException?new NumberFormatException("Invalid exponent "+c+" in string "+t):e}finally{}break}throw new NumberFormatException("Unexpected character '"+l+"' at position "+e+" in string "+t)}a=o}}var f=s,g=o-a-u;if(0===g)f=s;else if(g>0){var d=_.TEN.pow(g);f=s.divide(d)}else if(0>g){var d=_.TEN.pow(-g);f=s.multiply(d)}return i?f.negate():f},_.createNaN=function(){return new _(r.NaN,r.NaN)},_.copy=function(t){return new _(t)},_.magnitude=function(t){var e=Math.abs(t),n=Math.log(e)/Math.log(10),i=Math.trunc(Math.floor(n)),r=Math.pow(10,i);return e>=10*r&&(i+=1),i},_.stringOfChar=function(t,e){for(var n=new P,i=0;e>i;i++)n.append(t);return n.toString()},_.PI=new _(3.141592653589793,1.2246467991473532e-16),_.TWO_PI=new _(6.283185307179586,2.4492935982947064e-16),_.PI_2=new _(1.5707963267948966,6.123233995736766e-17),_.E=new _(2.718281828459045,1.4456468917292502e-16),_.NaN=new _(r.NaN,r.NaN),_.EPS=1.23259516440783e-32,_.SPLIT=134217729,_.MAX_PRINT_DIGITS=32,_.TEN=_.valueOf(10),_.ONE=_.valueOf(1),_.SCI_NOT_EXPONENT_CHAR="E",_.SCI_NOT_ZERO="0.0E0",e(M.prototype,{interfaces_:function(){return[]},getClass:function(){return M}}),M.orientationIndex=function(t,e,n){var i=M.orientationIndexFilter(t,e,n);if(1>=i)return i;var r=_.valueOf(e.x).selfAdd(-t.x),s=_.valueOf(e.y).selfAdd(-t.y),o=_.valueOf(n.x).selfAdd(-e.x),a=_.valueOf(n.y).selfAdd(-e.y);return r.selfMultiply(a).selfSubtract(s.selfMultiply(o)).signum()},M.signOfDet2x2=function(t,e,n,i){var r=t.multiply(i).selfSubtract(e.multiply(n));return r.signum()},M.intersection=function(t,e,n,i){var r=_.valueOf(i.y).selfSubtract(n.y).selfMultiply(_.valueOf(e.x).selfSubtract(t.x)),s=_.valueOf(i.x).selfSubtract(n.x).selfMultiply(_.valueOf(e.y).selfSubtract(t.y)),o=r.subtract(s),a=_.valueOf(i.x).selfSubtract(n.x).selfMultiply(_.valueOf(t.y).selfSubtract(n.y)),u=_.valueOf(i.y).selfSubtract(n.y).selfMultiply(_.valueOf(t.x).selfSubtract(n.x)),l=a.subtract(u),h=l.selfDivide(o).doubleValue(),c=_.valueOf(t.x).selfAdd(_.valueOf(e.x).selfSubtract(t.x).selfMultiply(h)).doubleValue(),f=_.valueOf(e.x).selfSubtract(t.x).selfMultiply(_.valueOf(t.y).selfSubtract(n.y)),d=_.valueOf(e.y).selfSubtract(t.y).selfMultiply(_.valueOf(t.x).selfSubtract(n.x)),p=f.subtract(d),v=p.selfDivide(o).doubleValue(),m=_.valueOf(n.y).selfAdd(_.valueOf(i.y).selfSubtract(n.y).selfMultiply(v)).doubleValue();return new g(c,m)},M.orientationIndexFilter=function(t,e,n){var i=null,r=(t.x-n.x)*(e.y-n.y),s=(t.y-n.y)*(e.x-n.x),o=r-s;if(r>0){if(0>=s)return M.signum(o);i=r+s}else{if(!(0>r))return M.signum(o);if(s>=0)return M.signum(o);i=-r-s}var a=M.DP_SAFE_EPSILON*i;return o>=a||-o>=a?M.signum(o):2},M.signum=function(t){return t>0?1:0>t?-1:0},M.DP_SAFE_EPSILON=1e-15,e(D.prototype,{setOrdinate:function(t,e,n){},size:function(){},getOrdinate:function(t,e){},getCoordinate:function(){if(1===arguments.length){arguments[0]}else if(2===arguments.length){arguments[0],arguments[1]}},getCoordinateCopy:function(t){},getDimension:function(){},getX:function(t){},clone:function(){},expandEnvelope:function(t){},copy:function(){},getY:function(t){},toCoordinateArray:function(){},interfaces_:function(){return[o]},getClass:function(){return D}}),D.X=0,D.Y=1,D.Z=2,D.M=3,A.arraycopy=function(t,e,n,i,r){for(var s=0,o=e;e+r>o;o++)n[i+s]=t[o],s++},A.getProperty=function(t){return{"line.separator":"\n"}[t]},e(F.prototype,{getY:function(){var t=this.y/this.w;if(r.isNaN(t)||r.isInfinite(t))throw new w;return t},getX:function(){var t=this.x/this.w;if(r.isNaN(t)||r.isInfinite(t))throw new w;return t},getCoordinate:function(){var t=new g;return t.x=this.getX(),t.y=this.getY(),t},interfaces_:function(){return[]},getClass:function(){return F}}),F.intersection=function(t,e,n,i){var s=t.y-e.y,o=e.x-t.x,a=t.x*e.y-e.x*t.y,u=n.y-i.y,l=i.x-n.x,h=n.x*i.y-i.x*n.y,c=o*h-l*a,f=u*a-s*h,d=s*l-u*o,p=c/d,v=f/d;if(r.isNaN(p)||r.isInfinite(p)||r.isNaN(v)||r.isInfinite(v))throw new w;return new g(p,v)},e(G.prototype,{create:function(){if(1===arguments.length){if(arguments[0]instanceof Array){arguments[0]}else if(R(arguments[0],D)){arguments[0]}}else if(2===arguments.length){arguments[0],arguments[1]}},interfaces_:function(){return[]},getClass:function(){return G}}),e(q.prototype,{filter:function(t){},interfaces_:function(){return[]},getClass:function(){return q}}),e(B.prototype,{isGeometryCollection:function(){return this.getSortIndex()===B.SORTINDEX_GEOMETRYCOLLECTION},getFactory:function(){return this.factory},getGeometryN:function(t){return this},getArea:function(){return 0},isRectangle:function(){return!1},equals:function(){if(1===arguments.length){if(arguments[0]instanceof B){var t=arguments[0];return null===t?!1:this.equalsTopo(t)}if(arguments[0]instanceof Object){var e=arguments[0];if(!(e instanceof B))return!1;var n=e;return this.equalsExact(n)}}},equalsExact:function(t){return this===t||this.equalsExact(t,0)},geometryChanged:function(){this.apply(B.geometryChangedFilter)},geometryChangedAction:function(){this.envelope=null},equalsNorm:function(t){return null===t?!1:this.norm().equalsExact(t.norm())},getLength:function(){return 0},getNumGeometries:function(){return 1},compareTo:function(){if(1===arguments.length){var t=arguments[0],e=t;return this.getSortIndex()!==e.getSortIndex()?this.getSortIndex()-e.getSortIndex():this.isEmpty()&&e.isEmpty()?0:this.isEmpty()?-1:e.isEmpty()?1:this.compareToSameClass(t)}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=n;return this.getSortIndex()!==e.getSortIndex()?this.getSortIndex()-e.getSortIndex():this.isEmpty()&&e.isEmpty()?0:this.isEmpty()?-1:e.isEmpty()?1:this.compareToSameClass(n,i)}},getUserData:function(){return this.userData},getSRID:function(){return this.SRID},getEnvelope:function(){return this.getFactory().toGeometry(this.getEnvelopeInternal())},checkNotGeometryCollection:function(t){if(t.getSortIndex()===B.SORTINDEX_GEOMETRYCOLLECTION)throw new i("This method does not support GeometryCollection arguments")},equal:function(t,e,n){return 0===n?t.equals(e):t.distance(e)<=n},norm:function(){var t=this.copy();return t.normalize(),t},getPrecisionModel:function(){return this.factory.getPrecisionModel()},getEnvelopeInternal:function(){return null===this.envelope&&(this.envelope=this.computeEnvelopeInternal()),new C(this.envelope)},setSRID:function(t){this.SRID=t},setUserData:function(t){this.userData=t},compare:function(t,e){for(var n=t.iterator(),i=e.iterator();n.hasNext()&&i.hasNext();){var r=n.next(),s=i.next(),o=r.compareTo(s);if(0!==o)return o}return n.hasNext()?1:i.hasNext()?-1:0},hashCode:function(){return this.getEnvelopeInternal().hashCode()},isGeometryCollectionOrDerived:function(){return this.getSortIndex()===B.SORTINDEX_GEOMETRYCOLLECTION||this.getSortIndex()===B.SORTINDEX_MULTIPOINT||this.getSortIndex()===B.SORTINDEX_MULTILINESTRING||this.getSortIndex()===B.SORTINDEX_MULTIPOLYGON},interfaces_:function(){return[o,s,u]},getClass:function(){return B}}),B.hasNonEmptyElements=function(t){for(var e=0;e<t.length;e++)if(!t[e].isEmpty())return!0;return!1},B.hasNullElements=function(t){for(var e=0;e<t.length;e++)if(null===t[e])return!0;return!1},B.serialVersionUID=0x799ea46522854c00,B.SORTINDEX_POINT=0,B.SORTINDEX_MULTIPOINT=1,B.SORTINDEX_LINESTRING=2,B.SORTINDEX_LINEARRING=3,B.SORTINDEX_MULTILINESTRING=4,B.SORTINDEX_POLYGON=5,B.SORTINDEX_MULTIPOLYGON=6,B.SORTINDEX_GEOMETRYCOLLECTION=7,B.geometryChangedFilter={interfaces_:function(){return[q]},filter:function(t){t.geometryChangedAction()}},e(z.prototype,{filter:function(t){},interfaces_:function(){return[]},getClass:function(){return z}}),e(V.prototype,{isInBoundary:function(t){},interfaces_:function(){return[]},getClass:function(){return V}}),e(k.prototype,{isInBoundary:function(t){return t%2===1},interfaces_:function(){return[V]},getClass:function(){return k}}),e(Y.prototype,{isInBoundary:function(t){return t>0},interfaces_:function(){return[V]},getClass:function(){return Y}}),e(U.prototype,{isInBoundary:function(t){return t>1},interfaces_:function(){return[V]},getClass:function(){return U}}),e(X.prototype,{isInBoundary:function(t){return 1===t},interfaces_:function(){return[V]},getClass:function(){return X}}),V.Mod2BoundaryNodeRule=k,V.EndPointBoundaryNodeRule=Y,V.MultiValentEndPointBoundaryNodeRule=U,V.MonoValentEndPointBoundaryNodeRule=X,V.MOD2_BOUNDARY_RULE=new k,V.ENDPOINT_BOUNDARY_RULE=new Y,V.MULTIVALENT_ENDPOINT_BOUNDARY_RULE=new U,V.MONOVALENT_ENDPOINT_BOUNDARY_RULE=new X,V.OGC_SFS_BOUNDARY_RULE=V.MOD2_BOUNDARY_RULE,e(H.prototype,{interfaces_:function(){return[]},getClass:function(){return H}}),H.isRing=function(t){return t.length<4?!1:!!t[0].equals2D(t[t.length-1])},H.ptNotInList=function(t,e){for(var n=0;n<t.length;n++){var i=t[n];if(H.indexOf(i,e)<0)return i}return null},H.scroll=function(t,e){var n=H.indexOf(e,t);if(0>n)return null;var i=new Array(t.length).fill(null);A.arraycopy(t,n,i,0,t.length-n),A.arraycopy(t,0,i,t.length-n,n),A.arraycopy(i,0,t,0,t.length)},H.equals=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(t===e)return!0;if(null===t||null===e)return!1;if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++)if(!t[n].equals(e[n]))return!1;return!0}if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];if(i===r)return!0;if(null===i||null===r)return!1;if(i.length!==r.length)return!1;for(var n=0;n<i.length;n++)if(0!==s.compare(i[n],r[n]))return!1;return!0}},H.intersection=function(t,e){for(var n=new N,i=0;i<t.length;i++)e.intersects(t[i])&&n.add(t[i],!0);return n.toCoordinateArray()},H.hasRepeatedPoints=function(t){for(var e=1;e<t.length;e++)if(t[e-1].equals(t[e]))return!0;return!1},H.removeRepeatedPoints=function(t){if(!H.hasRepeatedPoints(t))return t;var e=new N(t,!1);return e.toCoordinateArray()},H.reverse=function(t){for(var e=t.length-1,n=Math.trunc(e/2),i=0;n>=i;i++){var r=t[i];t[i]=t[e-i],t[e-i]=r}},H.removeNull=function(t){for(var e=0,n=0;n<t.length;n++)null!==t[n]&&e++;var i=new Array(e).fill(null);if(0===e)return i;for(var r=0,n=0;n<t.length;n++)null!==t[n]&&(i[r++]=t[n]);return i},H.copyDeep=function(){if(1===arguments.length){for(var t=arguments[0],e=new Array(t.length).fill(null),n=0;n<t.length;n++)e[n]=new g(t[n]);return e}if(5===arguments.length)for(var i=arguments[0],r=arguments[1],s=arguments[2],o=arguments[3],a=arguments[4],n=0;a>n;n++)s[o+n]=new g(i[r+n])},H.isEqualReversed=function(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=e[t.length-n-1];if(0!==i.compareTo(r))return!1}return!0},H.envelope=function(t){for(var e=new C,n=0;n<t.length;n++)e.expandToInclude(t[n]);return e},H.toCoordinateArray=function(t){return t.toArray(H.coordArrayType)},H.atLeastNCoordinatesOrNothing=function(t,e){return e.length>=t?e:[]},H.indexOf=function(t,e){for(var n=0;n<e.length;n++)if(t.equals(e[n]))return n;return-1},H.increasingDirection=function(t){for(var e=0;e<Math.trunc(t.length/2);e++){var n=t.length-1-e,i=t[e].compareTo(t[n]);if(0!==i)return i}return 1},H.compare=function(t,e){for(var n=0;n<t.length&&n<e.length;){var i=t[n].compareTo(e[n]);if(0!==i)return i;n++}return n<e.length?-1:n<t.length?1:0},H.minCoordinate=function(t){for(var e=null,n=0;n<t.length;n++)(null===e||e.compareTo(t[n])>0)&&(e=t[n]);return e},H.extract=function(t,e,n){e=T.clamp(e,0,t.length),n=T.clamp(n,-1,t.length);var i=n-e+1;0>n&&(i=0),e>=t.length&&(i=0),e>n&&(i=0);var r=new Array(i).fill(null);if(0===i)return r;for(var s=0,o=e;n>=o;o++)r[s++]=t[o];return r},e(W.prototype,{compare:function(t,e){var n=t,i=e;return H.compare(n,i)},interfaces_:function(){return[a]},getClass:function(){return W}}),e(j.prototype,{compare:function(t,e){var n=t,i=e;if(n.length<i.length)return-1;if(n.length>i.length)return 1;if(0===n.length)return 0;var r=H.compare(n,i),s=H.isEqualReversed(n,i);return s?0:r},OLDcompare:function(t,e){var n=t,i=e;if(n.length<i.length)return-1;if(n.length>i.length)return 1;if(0===n.length)return 0;for(var r=H.increasingDirection(n),s=H.increasingDirection(i),o=r>0?0:n.length-1,a=s>0?0:n.length-1,u=0;u<n.length;u++){var l=n[o].compareTo(i[a]);if(0!==l)return l;o+=r,a+=s}return 0},interfaces_:function(){return[a]},getClass:function(){return j}}),H.ForwardComparator=W,H.BidirectionalComparator=j,H.coordArrayType=new Array(0).fill(null),K.prototype.get=function(){},K.prototype.put=function(){},K.prototype.size=function(){},K.prototype.values=function(){},K.prototype.entrySet=function(){},Z.prototype=new K,Q.prototype=new v,Q.prototype.contains=function(){},J.prototype=new Q,J.prototype.contains=function(t){for(var e=0,n=this.array_.length;n>e;e++){var i=this.array_[e];if(i===t)return!0}return!1},J.prototype.add=function(t){return this.contains(t)?!1:(this.array_.push(t),!0)},J.prototype.addAll=function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next());return!0},J.prototype.remove=function(t){throw new javascript.util.OperationNotSupported},J.prototype.size=function(){return this.array_.length},J.prototype.isEmpty=function(){return 0===this.array_.length},J.prototype.toArray=function(){for(var t=[],e=0,n=this.array_.length;n>e;e++)t.push(this.array_[e]);return t},J.prototype.iterator=function(){return new Js(this)};var Js=function(t){this.hashSet_=t,this.position_=0};Js.prototype.next=function(){if(this.position_===this.hashSet_.size())throw new x;return this.hashSet_.array_[this.position_++]},Js.prototype.hasNext=function(){return this.position_<this.hashSet_.size()},Js.prototype.remove=function(){throw new E};var $s=0,to=1;rt.prototype=new Z,rt.prototype.get=function(t){for(var e=this.root_;null!==e;){var n=t.compareTo(e.key);if(0>n)e=e.left;else{if(!(n>0))return e.value;e=e.right}}return null},rt.prototype.put=function(t,e){if(null===this.root_)return this.root_={key:t,value:e,left:null,right:null,parent:null,color:$s,getValue:function(){return this.value},getKey:function(){return this.key}},this.size_=1,null;var n,i,r=this.root_;do if(n=r,i=t.compareTo(r.key),0>i)r=r.left;else{if(!(i>0)){var s=r.value;return r.value=e,s}r=r.right}while(null!==r);var o={key:t,left:null,right:null,value:e,parent:n,color:$s,getValue:function(){return this.value},getKey:function(){return this.key}};return 0>i?n.left=o:n.right=o,this.fixAfterInsertion(o),this.size_++,null},rt.prototype.fixAfterInsertion=function(t){for(t.color=to;null!=t&&t!=this.root_&&t.parent.color==to;)if(tt(t)==nt(tt(tt(t)))){var e=it(tt(tt(t)));$(e)==to?(et(tt(t),$s),et(e,$s),et(tt(tt(t)),to),t=tt(tt(t))):(t==it(tt(t))&&(t=tt(t),this.rotateLeft(t)),et(tt(t),$s),et(tt(tt(t)),to),this.rotateRight(tt(tt(t))))}else{var e=nt(tt(tt(t)));$(e)==to?(et(tt(t),$s),et(e,$s),et(tt(tt(t)),to),t=tt(tt(t))):(t==nt(tt(t))&&(t=tt(t),this.rotateRight(t)),et(tt(t),$s),et(tt(tt(t)),to),this.rotateLeft(tt(tt(t))))}this.root_.color=$s},rt.prototype.values=function(){var t=new I,e=this.getFirstEntry();if(null!==e)for(t.add(e.value);null!==(e=rt.successor(e));)t.add(e.value);return t},rt.prototype.entrySet=function(){var t=new J,e=this.getFirstEntry();if(null!==e)for(t.add(e);null!==(e=rt.successor(e));)t.add(e);return t},rt.prototype.rotateLeft=function(t){if(null!=t){var e=t.right;t.right=e.left,null!=e.left&&(e.left.parent=t),e.parent=t.parent,null==t.parent?this.root_=e:t.parent.left==t?t.parent.left=e:t.parent.right=e,e.left=t,t.parent=e}},rt.prototype.rotateRight=function(t){if(null!=t){var e=t.left;t.left=e.right,null!=e.right&&(e.right.parent=t),e.parent=t.parent,null==t.parent?this.root_=e:t.parent.right==t?t.parent.right=e:t.parent.left=e,e.right=t,t.parent=e}},rt.prototype.getFirstEntry=function(){var t=this.root_;if(null!=t)for(;null!=t.left;)t=t.left;return t},rt.successor=function(t){if(null===t)return null;if(null!==t.right){for(var e=t.right;null!==e.left;)e=e.left;return e}for(var e=t.parent,n=t;null!==e&&n===e.right;)n=e,e=e.parent;return e},rt.prototype.size=function(){return this.size_},e(st.prototype,{interfaces_:function(){return[]},getClass:function(){return st}}),ot.prototype=new Q,at.prototype=new ot,at.prototype.contains=function(t){for(var e=0,n=this.array_.length;n>e;e++){var i=this.array_[e];if(0===i.compareTo(t))return!0}return!1},at.prototype.add=function(t){if(this.contains(t))return!1;for(var e=0,n=this.array_.length;n>e;e++){var i=this.array_[e];if(1===i.compareTo(t))return this.array_.splice(e,0,t),!0}return this.array_.push(t),!0},at.prototype.addAll=function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next());return!0},at.prototype.remove=function(t){throw new E},at.prototype.size=function(){return this.array_.length},at.prototype.isEmpty=function(){return 0===this.array_.length},at.prototype.toArray=function(){for(var t=[],e=0,n=this.array_.length;n>e;e++)t.push(this.array_[e]);return t},at.prototype.iterator=function(){return new eo(this)};var eo=function(t){this.treeSet_=t,this.position_=0};eo.prototype.next=function(){if(this.position_===this.treeSet_.size())throw new x;return this.treeSet_.array_[this.position_++]},eo.prototype.hasNext=function(){return this.position_<this.treeSet_.size()},eo.prototype.remove=function(){throw new E},ut.sort=function(){var t,e,n,i,r=arguments[0];if(1===arguments.length)return i=function(t,e){return t.compareTo(e)},void r.sort(i);if(2===arguments.length)n=arguments[1],i=function(t,e){return n.compare(t,e)},r.sort(i);else{if(3===arguments.length){e=r.slice(arguments[1],arguments[2]),e.sort();var s=r.slice(0,arguments[1]).concat(e,r.slice(arguments[2],r.length));for(r.splice(0,r.length),t=0;t<s.length;t++)r.push(s[t]);return}if(4===arguments.length){for(e=r.slice(arguments[1],arguments[2]),n=arguments[3],i=function(t,e){return n.compare(t,e)},e.sort(i),s=r.slice(0,arguments[1]).concat(e,r.slice(arguments[2],r.length)),r.splice(0,r.length),t=0;t<s.length;t++)r.push(s[t]);return}}},ut.asList=function(t){for(var e=new I,n=0,i=t.length;i>n;n++)e.add(t[n]);return e},e(lt.prototype,{interfaces_:function(){return[]},getClass:function(){return lt}}),lt.toDimensionSymbol=function(t){switch(t){case lt.FALSE:return lt.SYM_FALSE;case lt.TRUE:return lt.SYM_TRUE;case lt.DONTCARE:return lt.SYM_DONTCARE;case lt.P:return lt.SYM_P;case lt.L:return lt.SYM_L;case lt.A:return lt.SYM_A}throw new i("Unknown dimension value: "+t)},lt.toDimensionValue=function(t){switch(O.toUpperCase(t)){case lt.SYM_FALSE:return lt.FALSE;case lt.SYM_TRUE:return lt.TRUE;case lt.SYM_DONTCARE:return lt.DONTCARE;case lt.SYM_P:return lt.P;case lt.SYM_L:return lt.L;case lt.SYM_A:return lt.A}throw new i("Unknown dimension symbol: "+t)},lt.P=0,lt.L=1,lt.A=2,lt.FALSE=-1,lt.TRUE=-2,lt.DONTCARE=-3,lt.SYM_FALSE="F",lt.SYM_TRUE="T",lt.SYM_DONTCARE="*",lt.SYM_P="0",lt.SYM_L="1",lt.SYM_A="2",e(ht.prototype,{filter:function(t){},interfaces_:function(){return[]},getClass:function(){return ht}}),e(ct.prototype,{filter:function(t,e){},isDone:function(){},isGeometryChanged:function(){},interfaces_:function(){return[]},getClass:function(){return ct}}),h(ft,B),e(ft.prototype,{computeEnvelopeInternal:function(){for(var t=new C,e=0;e<this.geometries.length;e++)t.expandToInclude(this.geometries[e].getEnvelopeInternal());return t},getGeometryN:function(t){return this.geometries[t]},getSortIndex:function(){return B.SORTINDEX_GEOMETRYCOLLECTION},getCoordinates:function(){for(var t=new Array(this.getNumPoints()).fill(null),e=-1,n=0;n<this.geometries.length;n++)for(var i=this.geometries[n].getCoordinates(),r=0;r<i.length;r++)e++,t[e]=i[r];return t},getArea:function(){for(var t=0,e=0;e<this.geometries.length;e++)t+=this.geometries[e].getArea();return t},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t;if(this.geometries.length!==n.geometries.length)return!1;for(var i=0;i<this.geometries.length;i++)if(!this.geometries[i].equalsExact(n.geometries[i],e))return!1;return!0}return B.prototype.equalsExact.apply(this,arguments)},normalize:function(){for(var t=0;t<this.geometries.length;t++)this.geometries[t].normalize();ut.sort(this.geometries)},getCoordinate:function(){return this.isEmpty()?null:this.geometries[0].getCoordinate()},getBoundaryDimension:function(){for(var t=lt.FALSE,e=0;e<this.geometries.length;e++)t=Math.max(t,this.geometries[e].getBoundaryDimension());return t},getDimension:function(){for(var t=lt.FALSE,e=0;e<this.geometries.length;e++)t=Math.max(t,this.geometries[e].getDimension());return t},getLength:function(){for(var t=0,e=0;e<this.geometries.length;e++)t+=this.geometries[e].getLength();return t},getNumPoints:function(){for(var t=0,e=0;e<this.geometries.length;e++)t+=this.geometries[e].getNumPoints();return t},getNumGeometries:function(){return this.geometries.length},reverse:function(){for(var t=this.geometries.length,e=new Array(t).fill(null),n=0;n<this.geometries.length;n++)e[n]=this.geometries[n].reverse();return this.getFactory().createGeometryCollection(e)},compareToSameClass:function(){if(1===arguments.length){var t=arguments[0],e=new at(ut.asList(this.geometries)),n=new at(ut.asList(t.geometries));return this.compare(e,n)}if(2===arguments.length){for(var i=arguments[0],r=arguments[1],s=i,o=this.getNumGeometries(),a=s.getNumGeometries(),u=0;o>u&&a>u;){var l=this.getGeometryN(u),h=s.getGeometryN(u),c=l.compareToSameClass(h,r);if(0!==c)return c;u++}return o>u?1:a>u?-1:0}},apply:function(){if(R(arguments[0],z))for(var t=arguments[0],e=0;e<this.geometries.length;e++)this.geometries[e].apply(t);else if(R(arguments[0],ct)){var n=arguments[0];if(0===this.geometries.length)return null;for(var e=0;e<this.geometries.length&&(this.geometries[e].apply(n),!n.isDone());e++);n.isGeometryChanged()&&this.geometryChanged()}else if(R(arguments[0],ht)){var i=arguments[0];i.filter(this);for(var e=0;e<this.geometries.length;e++)this.geometries[e].apply(i)}else if(R(arguments[0],q)){var r=arguments[0];r.filter(this);for(var e=0;e<this.geometries.length;e++)this.geometries[e].apply(r)}},getBoundary:function(){return this.checkNotGeometryCollection(this),f.shouldNeverReachHere(),null},clone:function(){var t=B.prototype.clone.call(this);t.geometries=new Array(this.geometries.length).fill(null);for(var e=0;e<this.geometries.length;e++)t.geometries[e]=this.geometries[e].clone();return t},getGeometryType:function(){return"GeometryCollection"},copy:function(){for(var t=new Array(this.geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this.geometries[e].copy();return new ft(t,this.factory)},isEmpty:function(){for(var t=0;t<this.geometries.length;t++)if(!this.geometries[t].isEmpty())return!1;return!0},interfaces_:function(){return[]},getClass:function(){return ft}}),ft.serialVersionUID=-0x4f07bcb1f857d800,h(gt,ft),e(gt.prototype,{getSortIndex:function(){return B.SORTINDEX_MULTILINESTRING},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.isEquivalentClass(t)?ft.prototype.equalsExact.call(this,t,e):!1}return ft.prototype.equalsExact.apply(this,arguments)},getBoundaryDimension:function(){return this.isClosed()?lt.FALSE:0},isClosed:function(){if(this.isEmpty())return!1;for(var t=0;t<this.geometries.length;t++)if(!this.geometries[t].isClosed())return!1;return!0},getDimension:function(){return 1},reverse:function(){for(var t=this.geometries.length,e=new Array(t).fill(null),n=0;n<this.geometries.length;n++)e[t-1-n]=this.geometries[n].reverse();return this.getFactory().createMultiLineString(e)},getBoundary:function(){return new dt(this).getBoundary()},getGeometryType:function(){return"MultiLineString"},copy:function(){for(var t=new Array(this.geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this.geometries[e].copy();return new gt(t,this.factory)},interfaces_:function(){
return[st]},getClass:function(){return gt}}),gt.serialVersionUID=0x7155d2ab4afa8000,e(dt.prototype,{boundaryMultiLineString:function(t){if(this.geom.isEmpty())return this.getEmptyMultiPoint();var e=this.computeBoundaryCoordinates(t);return 1===e.length?this.geomFact.createPoint(e[0]):this.geomFact.createMultiPointFromCoords(e)},getBoundary:function(){return this.geom instanceof St?this.boundaryLineString(this.geom):this.geom instanceof gt?this.boundaryMultiLineString(this.geom):this.geom.getBoundary()},boundaryLineString:function(t){if(this.geom.isEmpty())return this.getEmptyMultiPoint();if(t.isClosed()){var e=this.bnRule.isInBoundary(2);return e?t.getStartPoint():this.geomFact.createMultiPoint()}return this.geomFact.createMultiPoint([t.getStartPoint(),t.getEndPoint()])},getEmptyMultiPoint:function(){return this.geomFact.createMultiPoint()},computeBoundaryCoordinates:function(t){var e=new I;this.endpointMap=new rt;for(var n=0;n<t.getNumGeometries();n++){var i=t.getGeometryN(n);0!==i.getNumPoints()&&(this.addEndpoint(i.getCoordinateN(0)),this.addEndpoint(i.getCoordinateN(i.getNumPoints()-1)))}for(var r=this.endpointMap.entrySet().iterator();r.hasNext();){var s=r.next(),o=s.getValue(),a=o.count;this.bnRule.isInBoundary(a)&&e.add(s.getKey())}return H.toCoordinateArray(e)},addEndpoint:function(t){var e=this.endpointMap.get(t);null===e&&(e=new pt,this.endpointMap.put(t,e)),e.count++},interfaces_:function(){return[]},getClass:function(){return dt}}),dt.getBoundary=function(){if(1===arguments.length){var t=arguments[0],e=new dt(t);return e.getBoundary()}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=new dt(n,i);return e.getBoundary()}},e(pt.prototype,{interfaces_:function(){return[]},getClass:function(){return pt}}),e(Nt.prototype,{interfaces_:function(){return[]},getClass:function(){return Nt}}),Nt.chars=function(t,e){for(var n=new Array(e).fill(null),i=0;e>i;i++)n[i]=t;return new String(n)},Nt.getStackTrace=function(){if(1===arguments.length){var t=arguments[0],e=new xt,n=new vt(e);return t.printStackTrace(n),e.toString()}if(2===arguments.length){for(var i=arguments[0],r=arguments[1],s="",o=new mt(Nt.getStackTrace(i)),a=new It(o),u=0;r>u;u++)try{s+=a.readLine()+Nt.NEWLINE}catch(t){if(!(t instanceof Et))throw t;f.shouldNeverReachHere()}finally{}return s}},Nt.split=function(t,e){for(var n=e.length,i=new I,r=""+t,s=r.indexOf(e);s>=0;){var o=r.substring(0,s);i.add(o),r=r.substring(s+n),s=r.indexOf(e)}r.length>0&&i.add(r);for(var a=new Array(i.size()).fill(null),u=0;u<a.length;u++)a[u]=i.get(u);return a},Nt.toString=function(){if(1===arguments.length){var t=arguments[0];return Nt.SIMPLE_ORDINATE_FORMAT.format(t)}},Nt.spaces=function(t){return Nt.chars(" ",t)},Nt.NEWLINE=A.getProperty("line.separator"),Nt.SIMPLE_ORDINATE_FORMAT=new yt("0.#"),e(Ct.prototype,{interfaces_:function(){return[]},getClass:function(){return Ct}}),Ct.copyCoord=function(t,e,n,i){for(var r=Math.min(t.getDimension(),n.getDimension()),s=0;r>s;s++)n.setOrdinate(i,s,t.getOrdinate(e,s))},Ct.isRing=function(t){var e=t.size();return 0===e?!0:3>=e?!1:t.getOrdinate(0,D.X)===t.getOrdinate(e-1,D.X)&&t.getOrdinate(0,D.Y)===t.getOrdinate(e-1,D.Y)},Ct.isEqual=function(t,e){var n=t.size(),i=e.size();if(n!==i)return!1;for(var s=Math.min(t.getDimension(),e.getDimension()),o=0;n>o;o++)for(var a=0;s>a;a++){var u=t.getOrdinate(o,a),l=e.getOrdinate(o,a);if(!(t.getOrdinate(o,a)===e.getOrdinate(o,a)||r.isNaN(u)&&r.isNaN(l)))return!1}return!0},Ct.extend=function(t,e,n){var i=t.create(n,e.getDimension()),r=e.size();if(Ct.copy(e,0,i,0,r),r>0)for(var s=r;n>s;s++)Ct.copy(e,r-1,i,s,1);return i},Ct.reverse=function(t){for(var e=t.size()-1,n=Math.trunc(e/2),i=0;n>=i;i++)Ct.swap(t,i,e-i)},Ct.swap=function(t,e,n){if(e===n)return null;for(var i=0;i<t.getDimension();i++){var r=t.getOrdinate(e,i);t.setOrdinate(e,i,t.getOrdinate(n,i)),t.setOrdinate(n,i,r)}},Ct.copy=function(t,e,n,i,r){for(var s=0;r>s;s++)Ct.copyCoord(t,e+s,n,i+s)},Ct.toString=function(){if(1===arguments.length){var t=arguments[0],e=t.size();if(0===e)return"()";var n=t.getDimension(),i=new P;i.append("(");for(var r=0;e>r;r++){r>0&&i.append(" ");for(var s=0;n>s;s++)s>0&&i.append(","),i.append(Nt.toString(t.getOrdinate(r,s)))}return i.append(")"),i.toString()}},Ct.ensureValidRing=function(t,e){var n=e.size();if(0===n)return e;if(3>=n)return Ct.createClosedRing(t,e,4);var i=e.getOrdinate(0,D.X)===e.getOrdinate(n-1,D.X)&&e.getOrdinate(0,D.Y)===e.getOrdinate(n-1,D.Y);return i?e:Ct.createClosedRing(t,e,n+1)},Ct.createClosedRing=function(t,e,n){var i=t.create(n,e.getDimension()),r=e.size();Ct.copy(e,0,i,0,r);for(var s=r;n>s;s++)Ct.copy(e,0,i,s,1);return i},h(St,B),e(St.prototype,{computeEnvelopeInternal:function(){return this.isEmpty()?new C:this.points.expandEnvelope(new C)},isRing:function(){return this.isClosed()&&this.isSimple()},getSortIndex:function(){return B.SORTINDEX_LINESTRING},getCoordinates:function(){return this.points.toCoordinateArray()},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t;if(this.points.size()!==n.points.size())return!1;for(var i=0;i<this.points.size();i++)if(!this.equal(this.points.getCoordinate(i),n.points.getCoordinate(i),e))return!1;return!0}return B.prototype.equalsExact.apply(this,arguments)},normalize:function(){for(var t=0;t<Math.trunc(this.points.size()/2);t++){var e=this.points.size()-1-t;if(!this.points.getCoordinate(t).equals(this.points.getCoordinate(e)))return this.points.getCoordinate(t).compareTo(this.points.getCoordinate(e))>0&&Ct.reverse(this.points),null}},getCoordinate:function(){return this.isEmpty()?null:this.points.getCoordinate(0)},getBoundaryDimension:function(){return this.isClosed()?lt.FALSE:0},isClosed:function(){return this.isEmpty()?!1:this.getCoordinateN(0).equals2D(this.getCoordinateN(this.getNumPoints()-1))},getEndPoint:function(){return this.isEmpty()?null:this.getPointN(this.getNumPoints()-1)},getDimension:function(){return 1},getLength:function(){return he.computeLength(this.points)},getNumPoints:function(){return this.points.size()},reverse:function(){var t=this.points.copy();Ct.reverse(t);var e=this.getFactory().createLineString(t);return e},compareToSameClass:function(){if(1===arguments.length){for(var t=arguments[0],e=t,n=0,i=0;n<this.points.size()&&i<e.points.size();){var r=this.points.getCoordinate(n).compareTo(e.points.getCoordinate(i));if(0!==r)return r;n++,i++}return n<this.points.size()?1:i<e.points.size()?-1:0}if(2===arguments.length){var s=arguments[0],o=arguments[1],e=s;return o.compare(this.points,e.points)}},apply:function(){if(R(arguments[0],z))for(var t=arguments[0],e=0;e<this.points.size();e++)t.filter(this.points.getCoordinate(e));else if(R(arguments[0],ct)){var n=arguments[0];if(0===this.points.size())return null;for(var e=0;e<this.points.size()&&(n.filter(this.points,e),!n.isDone());e++);n.isGeometryChanged()&&this.geometryChanged()}else if(R(arguments[0],ht)){var i=arguments[0];i.filter(this)}else if(R(arguments[0],q)){var r=arguments[0];r.filter(this)}},getBoundary:function(){return new dt(this).getBoundary()},isEquivalentClass:function(t){return t instanceof St},clone:function(){var t=B.prototype.clone.call(this);return t.points=this.points.clone(),t},getCoordinateN:function(t){return this.points.getCoordinate(t)},getGeometryType:function(){return"LineString"},copy:function(){return new St(this.points.copy(),this.factory)},getCoordinateSequence:function(){return this.points},isEmpty:function(){return 0===this.points.size()},init:function(t){if(null===t&&(t=this.getFactory().getCoordinateSequenceFactory().create([])),1===t.size())throw new i("Invalid number of points in LineString (found "+t.size()+" - must be 0 or >= 2)");this.points=t},isCoordinate:function(t){for(var e=0;e<this.points.size();e++)if(this.points.getCoordinate(e).equals(t))return!0;return!1},getStartPoint:function(){return this.isEmpty()?null:this.getPointN(0)},getPointN:function(t){return this.getFactory().createPoint(this.points.getCoordinate(t))},interfaces_:function(){return[st]},getClass:function(){return St}}),St.serialVersionUID=0x2b2b51ba435c8e00,e(wt.prototype,{interfaces_:function(){return[]},getClass:function(){return wt}}),h(Lt,B),e(Lt.prototype,{computeEnvelopeInternal:function(){if(this.isEmpty())return new C;var t=new C;return t.expandToInclude(this.coordinates.getX(0),this.coordinates.getY(0)),t},getSortIndex:function(){return B.SORTINDEX_POINT},getCoordinates:function(){return this.isEmpty()?[]:[this.getCoordinate()]},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.isEquivalentClass(t)?this.isEmpty()&&t.isEmpty()?!0:this.isEmpty()!==t.isEmpty()?!1:this.equal(t.getCoordinate(),this.getCoordinate(),e):!1}return B.prototype.equalsExact.apply(this,arguments)},normalize:function(){},getCoordinate:function(){return 0!==this.coordinates.size()?this.coordinates.getCoordinate(0):null},getBoundaryDimension:function(){return lt.FALSE},getDimension:function(){return 0},getNumPoints:function(){return this.isEmpty()?0:1},reverse:function(){return this.copy()},getX:function(){if(null===this.getCoordinate())throw new IllegalStateException("getX called on empty Point");return this.getCoordinate().x},compareToSameClass:function(){if(1===arguments.length){var t=arguments[0],e=t;return this.getCoordinate().compareTo(e.getCoordinate())}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=n;return i.compare(this.coordinates,e.coordinates)}},apply:function(){if(R(arguments[0],z)){var t=arguments[0];if(this.isEmpty())return null;t.filter(this.getCoordinate())}else if(R(arguments[0],ct)){var e=arguments[0];if(this.isEmpty())return null;e.filter(this.coordinates,0),e.isGeometryChanged()&&this.geometryChanged()}else if(R(arguments[0],ht)){var n=arguments[0];n.filter(this)}else if(R(arguments[0],q)){var i=arguments[0];i.filter(this)}},getBoundary:function(){return this.getFactory().createGeometryCollection(null)},clone:function(){var t=B.prototype.clone.call(this);return t.coordinates=this.coordinates.clone(),t},getGeometryType:function(){return"Point"},copy:function(){return new Lt(this.coordinates.copy(),this.factory)},getCoordinateSequence:function(){return this.coordinates},getY:function(){if(null===this.getCoordinate())throw new IllegalStateException("getY called on empty Point");return this.getCoordinate().y},isEmpty:function(){return 0===this.coordinates.size()},init:function(t){null===t&&(t=this.getFactory().getCoordinateSequenceFactory().create([])),f.isTrue(t.size()<=1),this.coordinates=t},isSimple:function(){return!0},interfaces_:function(){return[wt]},getClass:function(){return Lt}}),Lt.serialVersionUID=0x44077bad161cbc00,e(Rt.prototype,{interfaces_:function(){return[]},getClass:function(){return Rt}}),h(Tt,B),e(Tt.prototype,{computeEnvelopeInternal:function(){return this.shell.getEnvelopeInternal()},getSortIndex:function(){return B.SORTINDEX_POLYGON},getCoordinates:function(){if(this.isEmpty())return[];for(var t=new Array(this.getNumPoints()).fill(null),e=-1,n=this.shell.getCoordinates(),i=0;i<n.length;i++)e++,t[e]=n[i];for(var r=0;r<this.holes.length;r++)for(var s=this.holes[r].getCoordinates(),o=0;o<s.length;o++)e++,t[e]=s[o];return t},getArea:function(){var t=0;t+=Math.abs(he.signedArea(this.shell.getCoordinateSequence()));for(var e=0;e<this.holes.length;e++)t-=Math.abs(he.signedArea(this.holes[e].getCoordinateSequence()));return t},isRectangle:function(){if(0!==this.getNumInteriorRing())return!1;if(null===this.shell)return!1;if(5!==this.shell.getNumPoints())return!1;for(var t=this.shell.getCoordinateSequence(),e=this.getEnvelopeInternal(),n=0;5>n;n++){var i=t.getX(n);if(i!==e.getMinX()&&i!==e.getMaxX())return!1;var r=t.getY(n);if(r!==e.getMinY()&&r!==e.getMaxY())return!1}for(var s=t.getX(0),o=t.getY(0),n=1;4>=n;n++){var i=t.getX(n),r=t.getY(n),a=i!==s,u=r!==o;if(a===u)return!1;s=i,o=r}return!0},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(!this.isEquivalentClass(t))return!1;var n=t,i=this.shell,r=n.shell;if(!i.equalsExact(r,e))return!1;if(this.holes.length!==n.holes.length)return!1;for(var s=0;s<this.holes.length;s++)if(!this.holes[s].equalsExact(n.holes[s],e))return!1;return!0}return B.prototype.equalsExact.apply(this,arguments)},normalize:function(){if(0===arguments.length){this.normalize(this.shell,!0);for(var t=0;t<this.holes.length;t++)this.normalize(this.holes[t],!1);ut.sort(this.holes)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];if(e.isEmpty())return null;var i=new Array(e.getCoordinates().length-1).fill(null);A.arraycopy(e.getCoordinates(),0,i,0,i.length);var r=H.minCoordinate(e.getCoordinates());H.scroll(i,r),A.arraycopy(i,0,e.getCoordinates(),0,i.length),e.getCoordinates()[i.length]=i[0],he.isCCW(e.getCoordinates())===n&&H.reverse(e.getCoordinates())}},getCoordinate:function(){return this.shell.getCoordinate()},getNumInteriorRing:function(){return this.holes.length},getBoundaryDimension:function(){return 1},getDimension:function(){return 2},getLength:function(){var t=0;t+=this.shell.getLength();for(var e=0;e<this.holes.length;e++)t+=this.holes[e].getLength();return t},getNumPoints:function(){for(var t=this.shell.getNumPoints(),e=0;e<this.holes.length;e++)t+=this.holes[e].getNumPoints();return t},reverse:function(){var t=this.copy();t.shell=this.shell.copy().reverse(),t.holes=new Array(this.holes.length).fill(null);for(var e=0;e<this.holes.length;e++)t.holes[e]=this.holes[e].copy().reverse();return t},convexHull:function(){return this.getExteriorRing().convexHull()},compareToSameClass:function(){if(1===arguments.length){var t=arguments[0],e=this.shell,n=t.shell;return e.compareToSameClass(n)}if(2===arguments.length){var i=arguments[0],r=arguments[1],s=i,e=this.shell,n=s.shell,o=e.compareToSameClass(n,r);if(0!==o)return o;for(var a=this.getNumInteriorRing(),u=s.getNumInteriorRing(),l=0;a>l&&u>l;){var h=this.getInteriorRingN(l),c=s.getInteriorRingN(l),f=h.compareToSameClass(c,r);if(0!==f)return f;l++}return a>l?1:u>l?-1:0}},apply:function(){if(R(arguments[0],z)){var t=arguments[0];this.shell.apply(t);for(var e=0;e<this.holes.length;e++)this.holes[e].apply(t)}else if(R(arguments[0],ct)){var n=arguments[0];if(this.shell.apply(n),!n.isDone())for(var e=0;e<this.holes.length&&(this.holes[e].apply(n),!n.isDone());e++);n.isGeometryChanged()&&this.geometryChanged()}else if(R(arguments[0],ht)){var i=arguments[0];i.filter(this)}else if(R(arguments[0],q)){var r=arguments[0];r.filter(this),this.shell.apply(r);for(var e=0;e<this.holes.length;e++)this.holes[e].apply(r)}},getBoundary:function(){if(this.isEmpty())return this.getFactory().createMultiLineString();var t=new Array(this.holes.length+1).fill(null);t[0]=this.shell;for(var e=0;e<this.holes.length;e++)t[e+1]=this.holes[e];return t.length<=1?this.getFactory().createLinearRing(t[0].getCoordinateSequence()):this.getFactory().createMultiLineString(t)},clone:function(){var t=B.prototype.clone.call(this);t.shell=this.shell.clone(),t.holes=new Array(this.holes.length).fill(null);for(var e=0;e<this.holes.length;e++)t.holes[e]=this.holes[e].clone();return t},getGeometryType:function(){return"Polygon"},copy:function(){for(var t=this.shell.copy(),e=new Array(this.holes.length).fill(null),n=0;n<e.length;n++)e[n]=this.holes[n].copy();return new Tt(t,e,this.factory)},getExteriorRing:function(){return this.shell},isEmpty:function(){return this.shell.isEmpty()},getInteriorRingN:function(t){return this.holes[t]},interfaces_:function(){return[Rt]},getClass:function(){return Tt}}),Tt.serialVersionUID=-0x307ffefd8dc97200,h(Pt,ft),e(Pt.prototype,{getSortIndex:function(){return B.SORTINDEX_MULTIPOINT},isValid:function(){return!0},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.isEquivalentClass(t)?ft.prototype.equalsExact.call(this,t,e):!1}return ft.prototype.equalsExact.apply(this,arguments)},getCoordinate:function(){if(1===arguments.length){var t=arguments[0];return this.geometries[t].getCoordinate()}return ft.prototype.getCoordinate.apply(this,arguments)},getBoundaryDimension:function(){return lt.FALSE},getDimension:function(){return 0},getBoundary:function(){return this.getFactory().createGeometryCollection(null)},getGeometryType:function(){return"MultiPoint"},copy:function(){for(var t=new Array(this.geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this.geometries[e].copy();return new Pt(t,this.factory)},interfaces_:function(){return[wt]},getClass:function(){return Pt}}),Pt.serialVersionUID=-0x6fb1ed4162e0fc00,h(bt,St),e(bt.prototype,{getSortIndex:function(){return B.SORTINDEX_LINEARRING},getBoundaryDimension:function(){return lt.FALSE},isClosed:function(){return this.isEmpty()?!0:St.prototype.isClosed.call(this)},reverse:function(){var t=this.points.copy();Ct.reverse(t);var e=this.getFactory().createLinearRing(t);return e},validateConstruction:function(){if(!this.isEmpty()&&!St.prototype.isClosed.call(this))throw new i("Points of LinearRing do not form a closed linestring");if(this.getCoordinateSequence().size()>=1&&this.getCoordinateSequence().size()<bt.MINIMUM_VALID_SIZE)throw new i("Invalid number of points in LinearRing (found "+this.getCoordinateSequence().size()+" - must be 0 or >= 4)")},getGeometryType:function(){return"LinearRing"},copy:function(){return new bt(this.points.copy(),this.factory)},interfaces_:function(){return[]},getClass:function(){return bt}}),bt.MINIMUM_VALID_SIZE=4,bt.serialVersionUID=-0x3b229e262367a600,h(Ot,ft),e(Ot.prototype,{getSortIndex:function(){return B.SORTINDEX_MULTIPOLYGON},equalsExact:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.isEquivalentClass(t)?ft.prototype.equalsExact.call(this,t,e):!1}return ft.prototype.equalsExact.apply(this,arguments)},getBoundaryDimension:function(){return 1},getDimension:function(){return 2},reverse:function(){for(var t=this.geometries.length,e=new Array(t).fill(null),n=0;n<this.geometries.length;n++)e[n]=this.geometries[n].reverse();return this.getFactory().createMultiPolygon(e)},getBoundary:function(){if(this.isEmpty())return this.getFactory().createMultiLineString();for(var t=new I,e=0;e<this.geometries.length;e++)for(var n=this.geometries[e],i=n.getBoundary(),r=0;r<i.getNumGeometries();r++)t.add(i.getGeometryN(r));var s=new Array(t.size()).fill(null);return this.getFactory().createMultiLineString(t.toArray(s))},getGeometryType:function(){return"MultiPolygon"},copy:function(){for(var t=new Array(this.geometries.length).fill(null),e=0;e<t.length;e++)t[e]=this.geometries[e].copy();return new Ot(t,this.factory)},interfaces_:function(){return[Rt]},getClass:function(){return Ot}}),Ot.serialVersionUID=-0x7a5aa1369171980,e(_t.prototype,{setCopyUserData:function(t){this.isUserDataCopied=t},edit:function(t,e){if(null===t)return null;var n=this.editInternal(t,e);return this.isUserDataCopied&&n.setUserData(t.getUserData()),n},editInternal:function(t,e){return null===this.factory&&(this.factory=t.getFactory()),t instanceof ft?this.editGeometryCollection(t,e):t instanceof Tt?this.editPolygon(t,e):t instanceof Lt?e.edit(t,this.factory):t instanceof St?e.edit(t,this.factory):(f.shouldNeverReachHere("Unsupported Geometry class: "+t.getClass().getName()),null)},editGeometryCollection:function(t,e){for(var n=e.edit(t,this.factory),i=new I,r=0;r<n.getNumGeometries();r++){var s=this.edit(n.getGeometryN(r),e);null===s||s.isEmpty()||i.add(s)}return n.getClass()===Pt?this.factory.createMultiPoint(i.toArray([])):n.getClass()===gt?this.factory.createMultiLineString(i.toArray([])):n.getClass()===Ot?this.factory.createMultiPolygon(i.toArray([])):this.factory.createGeometryCollection(i.toArray([]))},editPolygon:function(t,e){var n=e.edit(t,this.factory);if(null===n&&(n=this.factory.createPolygon(null)),n.isEmpty())return n;var i=this.edit(n.getExteriorRing(),e);if(null===i||i.isEmpty())return this.factory.createPolygon();for(var r=new I,s=0;s<n.getNumInteriorRing();s++){var o=this.edit(n.getInteriorRingN(s),e);null===o||o.isEmpty()||r.add(o)}return this.factory.createPolygon(i,r.toArray([]))},interfaces_:function(){return[]},getClass:function(){return _t}}),_t.GeometryEditorOperation=Mt,e(Dt.prototype,{edit:function(t,e){return t},interfaces_:function(){return[Mt]},getClass:function(){return Dt}}),e(At.prototype,{edit:function(t,e){if(t instanceof bt)return e.createLinearRing(this.editCoordinates(t.getCoordinates(),t));if(t instanceof St)return e.createLineString(this.editCoordinates(t.getCoordinates(),t));if(t instanceof Lt){var n=this.editCoordinates(t.getCoordinates(),t);return n.length>0?e.createPoint(n[0]):e.createPoint()}return t},interfaces_:function(){return[Mt]},getClass:function(){return At}}),e(Ft.prototype,{edit:function(t,e){return t instanceof bt?e.createLinearRing(this.edit(t.getCoordinateSequence(),t)):t instanceof St?e.createLineString(this.edit(t.getCoordinateSequence(),t)):t instanceof Lt?e.createPoint(this.edit(t.getCoordinateSequence(),t)):t},interfaces_:function(){return[Mt]},getClass:function(){return Ft}}),_t.NoOpGeometryOperation=Dt,_t.CoordinateOperation=At,_t.CoordinateSequenceOperation=Ft,e(Gt.prototype,{setOrdinate:function(t,e,n){switch(e){case D.X:this.coordinates[t].x=n;break;case D.Y:this.coordinates[t].y=n;break;case D.Z:this.coordinates[t].z=n;break;default:throw new i("invalid ordinateIndex")}},size:function(){return this.coordinates.length},getOrdinate:function(t,e){switch(e){case D.X:return this.coordinates[t].x;case D.Y:return this.coordinates[t].y;case D.Z:return this.coordinates[t].z}return r.NaN},getCoordinate:function(){if(1===arguments.length){var t=arguments[0];return this.coordinates[t]}if(2===arguments.length){var e=arguments[0],n=arguments[1];n.x=this.coordinates[e].x,n.y=this.coordinates[e].y,n.z=this.coordinates[e].z}},getCoordinateCopy:function(t){return new g(this.coordinates[t])},getDimension:function(){return this.dimension},getX:function(t){return this.coordinates[t].x},clone:function(){for(var t=new Array(this.size()).fill(null),e=0;e<this.coordinates.length;e++)t[e]=this.coordinates[e].clone();return new Gt(t,this.dimension)},expandEnvelope:function(t){for(var e=0;e<this.coordinates.length;e++)t.expandToInclude(this.coordinates[e]);return t},copy:function(){for(var t=new Array(this.size()).fill(null),e=0;e<this.coordinates.length;e++)t[e]=this.coordinates[e].copy();return new Gt(t,this.dimension)},toString:function(){if(this.coordinates.length>0){var t=new P(17*this.coordinates.length);t.append("("),t.append(this.coordinates[0]);for(var e=1;e<this.coordinates.length;e++)t.append(", "),t.append(this.coordinates[e]);return t.append(")"),t.toString()}return"()"},getY:function(t){return this.coordinates[t].y},toCoordinateArray:function(){return this.coordinates},interfaces_:function(){return[D,u]},getClass:function(){return Gt}}),Gt.serialVersionUID=-0xcb44a778db18e00,e(qt.prototype,{readResolve:function(){return qt.instance()},create:function(){if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return new Gt(t)}if(R(arguments[0],D)){var e=arguments[0];return new Gt(e)}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return i>3&&(i=3),2>i?new Gt(n):new Gt(n,i)}},interfaces_:function(){return[G,u]},getClass:function(){return qt}}),qt.instance=function(){return qt.instanceObject},qt.serialVersionUID=-0x38e49fa6cf6f2e00,qt.instanceObject=new qt;var no,io=Object.defineProperty,ro=zt({delete:kt,has:Xt,get:Yt,set:Ht,keys:jt,values:Kt,entries:Zt,forEach:$t,clear:Wt}),so="undefined"!=typeof Map&&Map.prototype.values?Map:ro;te.prototype=new K,te.prototype.get=function(t){return this.map_.get(t)||null},te.prototype.put=function(t,e){return this.map_.set(t,e),e},te.prototype.values=function(){for(var t=new I,e=this.map_.values(),n=e.next();!n.done;)t.add(n.value),n=e.next();return t},te.prototype.entrySet=function(){var t=new J;return this.map_.entries().forEach(function(e){return t.add(e)}),t},te.prototype.size=function(){return this.map_.size()},e(ee.prototype,{equals:function(t){if(!(t instanceof ee))return!1;var e=t;return this.modelType===e.modelType&&this.scale===e.scale},compareTo:function(t){var e=t,n=this.getMaximumSignificantDigits(),i=e.getMaximumSignificantDigits();return new b(n).compareTo(new b(i))},getScale:function(){return this.scale},isFloating:function(){return this.modelType===ee.FLOATING||this.modelType===ee.FLOATING_SINGLE},getType:function(){return this.modelType},toString:function(){var t="UNKNOWN";return this.modelType===ee.FLOATING?t="Floating":this.modelType===ee.FLOATING_SINGLE?t="Floating-Single":this.modelType===ee.FIXED&&(t="Fixed (Scale="+this.getScale()+")"),t},makePrecise:function(){if("number"==typeof arguments[0]){var t=arguments[0];if(r.isNaN(t))return t;if(this.modelType===ee.FLOATING_SINGLE){var e=t;return e}return this.modelType===ee.FIXED?Math.round(t*this.scale)/this.scale:t}if(arguments[0]instanceof g){var n=arguments[0];if(this.modelType===ee.FLOATING)return null;n.x=this.makePrecise(n.x),n.y=this.makePrecise(n.y)}},getMaximumSignificantDigits:function(){var t=16;return this.modelType===ee.FLOATING?t=16:this.modelType===ee.FLOATING_SINGLE?t=6:this.modelType===ee.FIXED&&(t=1+Math.trunc(Math.ceil(Math.log(this.getScale())/Math.log(10)))),t},setScale:function(t){this.scale=Math.abs(t)},interfaces_:function(){return[u,s]},getClass:function(){return ee}}),ee.mostPrecise=function(t,e){return t.compareTo(e)>=0?t:e},e(ne.prototype,{readResolve:function(){return ne.nameToTypeMap.get(this.name)},toString:function(){return this.name},interfaces_:function(){return[u]},getClass:function(){return ne}}),ne.serialVersionUID=-552860263173159e4,ne.nameToTypeMap=new te,ee.Type=ne,ee.serialVersionUID=0x6bee6404e9a25c00,ee.FIXED=new ne("FIXED"),ee.FLOATING=new ne("FLOATING"),ee.FLOATING_SINGLE=new ne("FLOATING SINGLE"),ee.maximumPreciseValue=9007199254740992,e(ie.prototype,{toGeometry:function(t){return t.isNull()?this.createPoint(null):t.getMinX()===t.getMaxX()&&t.getMinY()===t.getMaxY()?this.createPoint(new g(t.getMinX(),t.getMinY())):t.getMinX()===t.getMaxX()||t.getMinY()===t.getMaxY()?this.createLineString([new g(t.getMinX(),t.getMinY()),new g(t.getMaxX(),t.getMaxY())]):this.createPolygon(this.createLinearRing([new g(t.getMinX(),t.getMinY()),new g(t.getMinX(),t.getMaxY()),new g(t.getMaxX(),t.getMaxY()),new g(t.getMaxX(),t.getMinY()),new g(t.getMinX(),t.getMinY())]),null)},createLineString:function(){if(0===arguments.length)return this.createLineString(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return this.createLineString(null!==t?this.getCoordinateSequenceFactory().create(t):null)}if(R(arguments[0],D)){var e=arguments[0];return new St(e,this)}}},createMultiLineString:function(){if(0===arguments.length)return new gt(null,this);if(1===arguments.length){var t=arguments[0];return new gt(t,this)}},buildGeometry:function(t){for(var e=null,n=!1,i=!1,r=t.iterator();r.hasNext();){var s=r.next(),o=s.getClass();null===e&&(e=o),o!==e&&(n=!0),s.isGeometryCollectionOrDerived()&&(i=!0)}if(null===e)return this.createGeometryCollection();if(n||i)return this.createGeometryCollection(ie.toGeometryArray(t));var a=t.iterator().next(),u=t.size()>1;if(u){if(a instanceof Tt)return this.createMultiPolygon(ie.toPolygonArray(t));if(a instanceof St)return this.createMultiLineString(ie.toLineStringArray(t));if(a instanceof Lt)return this.createMultiPoint(ie.toPointArray(t));f.shouldNeverReachHere("Unhandled class: "+a.getClass().getName())}return a},createMultiPointFromCoords:function(t){return this.createMultiPoint(null!==t?this.getCoordinateSequenceFactory().create(t):null)},createPoint:function(){if(0===arguments.length)return this.createPoint(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof g){var t=arguments[0];return this.createPoint(null!==t?this.getCoordinateSequenceFactory().create([t]):null)}if(R(arguments[0],D)){var e=arguments[0];return new Lt(e,this)}}},getCoordinateSequenceFactory:function(){return this.coordinateSequenceFactory},createPolygon:function(){if(0===arguments.length)return new Tt(null,null,this);if(1===arguments.length){if(R(arguments[0],D)){var t=arguments[0];return this.createPolygon(this.createLinearRing(t))}if(arguments[0]instanceof Array){var e=arguments[0];return this.createPolygon(this.createLinearRing(e))}if(arguments[0]instanceof bt){var n=arguments[0];return this.createPolygon(n,null)}}else if(2===arguments.length){var i=arguments[0],r=arguments[1];return new Tt(i,r,this)}},getSRID:function(){return this.SRID},createGeometryCollection:function(){if(0===arguments.length)return new ft(null,this);if(1===arguments.length){var t=arguments[0];return new ft(t,this)}},createGeometry:function(t){var e=new _t(this);return e.edit(t,{edit:function(){if(2===arguments.length){var t=arguments[0];arguments[1];return this.coordinateSequenceFactory.create(t)}}})},getPrecisionModel:function(){return this.precisionModel},createLinearRing:function(){if(0===arguments.length)return this.createLinearRing(this.getCoordinateSequenceFactory().create([]));if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return this.createLinearRing(null!==t?this.getCoordinateSequenceFactory().create(t):null)}if(R(arguments[0],D)){var e=arguments[0];return new bt(e,this)}}},createMultiPolygon:function(){if(0===arguments.length)return new Ot(null,this);if(1===arguments.length){var t=arguments[0];return new Ot(t,this)}},createMultiPoint:function(){if(0===arguments.length)return new Pt(null,this);if(1===arguments.length){if(arguments[0]instanceof Array){var t=arguments[0];return new Pt(t,this)}if(arguments[0]instanceof Array){var e=arguments[0];return this.createMultiPoint(null!==e?this.getCoordinateSequenceFactory().create(e):null)}if(R(arguments[0],D)){var n=arguments[0];if(null===n)return this.createMultiPoint(new Array(0).fill(null));for(var i=new Array(n.size()).fill(null),r=0;r<n.size();r++){var s=this.getCoordinateSequenceFactory().create(1,n.getDimension());Ct.copy(n,r,s,0,1),i[r]=this.createPoint(s)}return this.createMultiPoint(i)}}},interfaces_:function(){return[u]},getClass:function(){return ie}}),ie.toMultiPolygonArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toGeometryArray=function(t){if(null===t)return null;var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.getDefaultCoordinateSequenceFactory=function(){return qt.instance()},ie.toMultiLineStringArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toLineStringArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toMultiPointArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toLinearRingArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toPointArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.toPolygonArray=function(t){var e=new Array(t.size()).fill(null);return t.toArray(e)},ie.createPointFromInternalCoord=function(t,e){return e.getPrecisionModel().makePrecise(t),e.getFactory().createPoint(t)},ie.serialVersionUID=-0x5ea75f2051eeb400;var oo={typeStr:/^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,emptyTypeStr:/^\s*(\w+)\s*EMPTY\s*$/,spaces:/\s+/,parenComma:/\)\s*,\s*\(/,doubleParenComma:/\)\s*\)\s*,\s*\(\s*\(/,trimParens:/^\s*\(?(.*?)\)?\s*$/};e(re.prototype,{read:function(t){var e,n,i;t=t.replace(/[\n\r]/g," ");var r=oo.typeStr.exec(t);if(-1!==t.search("EMPTY")&&(r=oo.emptyTypeStr.exec(t),r[2]=void 0),r&&(n=r[1].toLowerCase(),i=r[2],uo[n]&&(e=uo[n].apply(this,[i]))),void 0===e)throw new Error("Could not parse WKT "+t);return e},write:function(t){return this.extractGeometry(t)},extractGeometry:function(t){var e=t.getGeometryType().toLowerCase();if(!ao[e])return null;var n,i=e.toUpperCase();return n=t.isEmpty()?i+" EMPTY":i+"("+ao[e].apply(this,[t])+")"}});var ao={coordinate:function(t){return t.x+" "+t.y},point:function(t){
return ao.coordinate.call(this,t.coordinates.coordinates[0])},multipoint:function(t){for(var e=[],n=0,i=t.geometries.length;i>n;++n)e.push("("+ao.point.apply(this,[t.geometries[n]])+")");return e.join(",")},linestring:function(t){for(var e=[],n=0,i=t.points.coordinates.length;i>n;++n)e.push(ao.coordinate.apply(this,[t.points.coordinates[n]]));return e.join(",")},linearring:function(t){for(var e=[],n=0,i=t.points.coordinates.length;i>n;++n)e.push(ao.coordinate.apply(this,[t.points.coordinates[n]]));return e.join(",")},multilinestring:function(t){for(var e=[],n=0,i=t.geometries.length;i>n;++n)e.push("("+ao.linestring.apply(this,[t.geometries[n]])+")");return e.join(",")},polygon:function(t){var e=[];e.push("("+ao.linestring.apply(this,[t.shell])+")");for(var n=0,i=t.holes.length;i>n;++n)e.push("("+ao.linestring.apply(this,[t.holes[n]])+")");return e.join(",")},multipolygon:function(t){for(var e=[],n=0,i=t.geometries.length;i>n;++n)e.push("("+ao.polygon.apply(this,[t.geometries[n]])+")");return e.join(",")},geometrycollection:function(t){for(var e=[],n=0,i=t.geometries.length;i>n;++n)e.push(this.extractGeometry(t.geometries[n]));return e.join(",")}},uo={point:function(t){if(void 0===t)return this.geometryFactory.createPoint();var e=t.trim().split(oo.spaces);return this.geometryFactory.createPoint(new g(Number.parseFloat(e[0]),Number.parseFloat(e[1])))},multipoint:function(t){if(void 0===t)return this.geometryFactory.createMultiPoint();for(var e,n=t.trim().split(","),i=[],r=0,s=n.length;s>r;++r)e=n[r].replace(oo.trimParens,"$1"),i.push(uo.point.apply(this,[e]));return this.geometryFactory.createMultiPoint(i)},linestring:function(t){if(void 0===t)return this.geometryFactory.createLineString();for(var e,n=t.trim().split(","),i=[],r=0,s=n.length;s>r;++r)e=n[r].trim().split(oo.spaces),i.push(new g(Number.parseFloat(e[0]),Number.parseFloat(e[1])));return this.geometryFactory.createLineString(i)},linearring:function(t){if(void 0===t)return this.geometryFactory.createLinearRing();for(var e,n=t.trim().split(","),i=[],r=0,s=n.length;s>r;++r)e=n[r].trim().split(oo.spaces),i.push(new g(Number.parseFloat(e[0]),Number.parseFloat(e[1])));return this.geometryFactory.createLinearRing(i)},multilinestring:function(t){if(void 0===t)return this.geometryFactory.createMultiLineString();for(var e,n=t.trim().split(oo.parenComma),i=[],r=0,s=n.length;s>r;++r)e=n[r].replace(oo.trimParens,"$1"),i.push(uo.linestring.apply(this,[e]));return this.geometryFactory.createMultiLineString(i)},polygon:function(t){if(void 0===t)return this.geometryFactory.createPolygon();for(var e,n,i,r,s=t.trim().split(oo.parenComma),o=[],a=0,u=s.length;u>a;++a)e=s[a].replace(oo.trimParens,"$1"),n=uo.linestring.apply(this,[e]),i=this.geometryFactory.createLinearRing(n.points),0===a?r=i:o.push(i);return this.geometryFactory.createPolygon(r,o)},multipolygon:function(t){if(void 0===t)return this.geometryFactory.createMultiPolygon();for(var e,n=t.trim().split(oo.doubleParenComma),i=[],r=0,s=n.length;s>r;++r)e=n[r].replace(oo.trimParens,"$1"),i.push(uo.polygon.apply(this,[e]));return this.geometryFactory.createMultiPolygon(i)},geometrycollection:function(t){if(void 0===t)return this.geometryFactory.createGeometryCollection();t=t.replace(/,\s*([A-Za-z])/g,"|$1");for(var e=t.trim().split("|"),n=[],i=0,r=e.length;r>i;++i)n.push(this.read(e[i]));return this.geometryFactory.createGeometryCollection(n)}};e(se.prototype,{write:function(t){return this.parser.write(t)}}),e(se,{toLineString:function(t,e){if(2!==arguments.length)throw new Error("Not implemented");return"LINESTRING ( "+t.x+" "+t.y+", "+e.x+" "+e.y+" )"}}),e(oe.prototype,{getIndexAlongSegment:function(t,e){return this.computeIntLineIndex(),this.intLineIndex[t][e]},getTopologySummary:function(){var t=new P;return this.isEndPoint()&&t.append(" endpoint"),this._isProper&&t.append(" proper"),this.isCollinear()&&t.append(" collinear"),t.toString()},computeIntersection:function(t,e,n,i){this.inputLines[0][0]=t,this.inputLines[0][1]=e,this.inputLines[1][0]=n,this.inputLines[1][1]=i,this.result=this.computeIntersect(t,e,n,i)},getIntersectionNum:function(){return this.result},computeIntLineIndex:function(){if(0===arguments.length)null===this.intLineIndex&&(this.intLineIndex=Array(2).fill().map(function(){return Array(2)}),this.computeIntLineIndex(0),this.computeIntLineIndex(1));else if(1===arguments.length){var t=arguments[0],e=this.getEdgeDistance(t,0),n=this.getEdgeDistance(t,1);e>n?(this.intLineIndex[t][0]=0,this.intLineIndex[t][1]=1):(this.intLineIndex[t][0]=1,this.intLineIndex[t][1]=0)}},isProper:function(){return this.hasIntersection()&&this._isProper},setPrecisionModel:function(t){this.precisionModel=t},isInteriorIntersection:function(){if(0===arguments.length)return this.isInteriorIntersection(0)?!0:!!this.isInteriorIntersection(1);if(1===arguments.length){for(var t=arguments[0],e=0;e<this.result;e++)if(!this.intPt[e].equals2D(this.inputLines[t][0])&&!this.intPt[e].equals2D(this.inputLines[t][1]))return!0;return!1}},getIntersection:function(t){return this.intPt[t]},isEndPoint:function(){return this.hasIntersection()&&!this._isProper},hasIntersection:function(){return this.result!==oe.NO_INTERSECTION},getEdgeDistance:function(t,e){var n=oe.computeEdgeDistance(this.intPt[e],this.inputLines[t][0],this.inputLines[t][1]);return n},isCollinear:function(){return this.result===oe.COLLINEAR_INTERSECTION},toString:function(){return se.toLineString(this.inputLines[0][0],this.inputLines[0][1])+" - "+se.toLineString(this.inputLines[1][0],this.inputLines[1][1])+this.getTopologySummary()},getEndpoint:function(t,e){return this.inputLines[t][e]},isIntersection:function(t){for(var e=0;e<this.result;e++)if(this.intPt[e].equals2D(t))return!0;return!1},getIntersectionAlongSegment:function(t,e){return this.computeIntLineIndex(),this.intPt[this.intLineIndex[t][e]]},interfaces_:function(){return[]},getClass:function(){return oe}}),oe.computeEdgeDistance=function(t,e,n){var i=Math.abs(n.x-e.x),r=Math.abs(n.y-e.y),s=-1;if(t.equals(e))s=0;else if(t.equals(n))s=i>r?i:r;else{var o=Math.abs(t.x-e.x),a=Math.abs(t.y-e.y);s=i>r?o:a,0!==s||t.equals(e)||(s=Math.max(o,a))}return f.isTrue(!(0===s&&!t.equals(e)),"Bad distance calculation"),s},oe.nonRobustComputeEdgeDistance=function(t,e,n){var i=t.x-e.x,r=t.y-e.y,s=Math.sqrt(i*i+r*r);return f.isTrue(!(0===s&&!t.equals(e)),"Invalid distance calculation"),s},oe.DONT_INTERSECT=0,oe.DO_INTERSECT=1,oe.COLLINEAR=2,oe.NO_INTERSECTION=0,oe.POINT_INTERSECTION=1,oe.COLLINEAR_INTERSECTION=2,h(ae,oe),e(ae.prototype,{isInSegmentEnvelopes:function(t){var e=new C(this.inputLines[0][0],this.inputLines[0][1]),n=new C(this.inputLines[1][0],this.inputLines[1][1]);return e.contains(t)&&n.contains(t)},computeIntersection:function(){if(3!==arguments.length)return oe.prototype.computeIntersection.apply(this,arguments);var t=arguments[0],e=arguments[1],n=arguments[2];return this._isProper=!1,C.intersects(e,n,t)&&0===he.orientationIndex(e,n,t)&&0===he.orientationIndex(n,e,t)?(this._isProper=!0,(t.equals(e)||t.equals(n))&&(this._isProper=!1),this.result=oe.POINT_INTERSECTION,null):void(this.result=oe.NO_INTERSECTION)},normalizeToMinimum:function(t,e,n,i,r){r.x=this.smallestInAbsValue(t.x,e.x,n.x,i.x),r.y=this.smallestInAbsValue(t.y,e.y,n.y,i.y),t.x-=r.x,t.y-=r.y,e.x-=r.x,e.y-=r.y,n.x-=r.x,n.y-=r.y,i.x-=r.x,i.y-=r.y},safeHCoordinateIntersection:function(t,e,n,i){var r=null;try{r=F.intersection(t,e,n,i)}catch(s){if(!(s instanceof w))throw s;r=ae.nearestEndpoint(t,e,n,i)}finally{}return r},intersection:function(t,e,n,i){var r=this.intersectionWithNormalization(t,e,n,i);return this.isInSegmentEnvelopes(r)||(r=new g(ae.nearestEndpoint(t,e,n,i))),null!==this.precisionModel&&this.precisionModel.makePrecise(r),r},smallestInAbsValue:function(t,e,n,i){var r=t,s=Math.abs(r);return Math.abs(e)<s&&(r=e,s=Math.abs(e)),Math.abs(n)<s&&(r=n,s=Math.abs(n)),Math.abs(i)<s&&(r=i),r},checkDD:function(t,e,n,i,r){var s=M.intersection(t,e,n,i),o=this.isInSegmentEnvelopes(s);A.out.println("DD in env = "+o+"  --------------------- "+s),r.distance(s)>1e-4&&A.out.println("Distance = "+r.distance(s))},intersectionWithNormalization:function(t,e,n,i){var r=new g(t),s=new g(e),o=new g(n),a=new g(i),u=new g;this.normalizeToEnvCentre(r,s,o,a,u);var l=this.safeHCoordinateIntersection(r,s,o,a);return l.x+=u.x,l.y+=u.y,l},computeCollinearIntersection:function(t,e,n,i){var r=C.intersects(t,e,n),s=C.intersects(t,e,i),o=C.intersects(n,i,t),a=C.intersects(n,i,e);return r&&s?(this.intPt[0]=n,this.intPt[1]=i,oe.COLLINEAR_INTERSECTION):o&&a?(this.intPt[0]=t,this.intPt[1]=e,oe.COLLINEAR_INTERSECTION):r&&o?(this.intPt[0]=n,this.intPt[1]=t,!n.equals(t)||s||a?oe.COLLINEAR_INTERSECTION:oe.POINT_INTERSECTION):r&&a?(this.intPt[0]=n,this.intPt[1]=e,!n.equals(e)||s||o?oe.COLLINEAR_INTERSECTION:oe.POINT_INTERSECTION):s&&o?(this.intPt[0]=i,this.intPt[1]=t,!i.equals(t)||r||a?oe.COLLINEAR_INTERSECTION:oe.POINT_INTERSECTION):s&&a?(this.intPt[0]=i,this.intPt[1]=e,!i.equals(e)||r||o?oe.COLLINEAR_INTERSECTION:oe.POINT_INTERSECTION):oe.NO_INTERSECTION},normalizeToEnvCentre:function(t,e,n,i,r){var s=t.x<e.x?t.x:e.x,o=t.y<e.y?t.y:e.y,a=t.x>e.x?t.x:e.x,u=t.y>e.y?t.y:e.y,l=n.x<i.x?n.x:i.x,h=n.y<i.y?n.y:i.y,c=n.x>i.x?n.x:i.x,f=n.y>i.y?n.y:i.y,g=s>l?s:l,d=c>a?a:c,p=o>h?o:h,v=f>u?u:f,m=(g+d)/2,y=(p+v)/2;r.x=m,r.y=y,t.x-=r.x,t.y-=r.y,e.x-=r.x,e.y-=r.y,n.x-=r.x,n.y-=r.y,i.x-=r.x,i.y-=r.y},computeIntersect:function(t,e,n,i){if(this._isProper=!1,!C.intersects(t,e,n,i))return oe.NO_INTERSECTION;var r=he.orientationIndex(t,e,n),s=he.orientationIndex(t,e,i);if(r>0&&s>0||0>r&&0>s)return oe.NO_INTERSECTION;var o=he.orientationIndex(n,i,t),a=he.orientationIndex(n,i,e);if(o>0&&a>0||0>o&&0>a)return oe.NO_INTERSECTION;var u=0===r&&0===s&&0===o&&0===a;return u?this.computeCollinearIntersection(t,e,n,i):(0===r||0===s||0===o||0===a?(this._isProper=!1,t.equals2D(n)||t.equals2D(i)?this.intPt[0]=t:e.equals2D(n)||e.equals2D(i)?this.intPt[0]=e:0===r?this.intPt[0]=new g(n):0===s?this.intPt[0]=new g(i):0===o?this.intPt[0]=new g(t):0===a&&(this.intPt[0]=new g(e))):(this._isProper=!0,this.intPt[0]=this.intersection(t,e,n,i)),oe.POINT_INTERSECTION)},interfaces_:function(){return[]},getClass:function(){return ae}}),ae.nearestEndpoint=function(t,e,n,i){var r=t,s=he.distancePointLine(t,n,i),o=he.distancePointLine(e,n,i);return s>o&&(s=o,r=e),o=he.distancePointLine(n,t,e),s>o&&(s=o,r=n),o=he.distancePointLine(i,t,e),s>o&&(s=o,r=i),r},e(ue.prototype,{interfaces_:function(){return[]},getClass:function(){return ue}}),ue.orientationIndex=function(t,e,n){var i=e.x-t.x,r=e.y-t.y,s=n.x-e.x,o=n.y-e.y;return ue.signOfDet2x2(i,r,s,o)},ue.signOfDet2x2=function(t,e,n,i){var r=null,s=null,o=null,a=0;if(r=1,0===t||0===i)return 0===e||0===n?0:e>0?n>0?-r:r:n>0?r:-r;if(0===e||0===n)return i>0?t>0?r:-r:t>0?-r:r;if(e>0?i>0?i>=e||(r=-r,s=t,t=n,n=s,s=e,e=i,i=s):-i>=e?(r=-r,n=-n,i=-i):(s=t,t=-n,n=s,s=e,e=-i,i=s):i>0?i>=-e?(r=-r,t=-t,e=-e):(s=-t,t=n,n=s,s=-e,e=i,i=s):e>=i?(t=-t,e=-e,n=-n,i=-i):(r=-r,s=-t,t=-n,n=s,s=-e,e=-i,i=s),t>0){if(!(n>0))return r;if(!(n>=t))return r}else{if(n>0)return-r;if(!(t>=n))return-r;r=-r,t=-t,n=-n}for(;;){if(a+=1,o=Math.floor(n/t),n-=o*t,i-=o*e,0>i)return-r;if(i>e)return r;if(t>n+n){if(i+i>e)return r}else{if(e>i+i)return-r;n=t-n,i=e-i,r=-r}if(0===i)return 0===n?0:-r;if(0===n)return r;if(o=Math.floor(t/n),t-=o*n,e-=o*i,0>e)return r;if(e>i)return-r;if(n>t+t){if(e+e>i)return-r}else{if(i>e+e)return r;t=n-t,e=i-e,r=-r}if(0===e)return 0===t?0:r;if(0===t)return-r}},e(le.prototype,{countSegment:function(t,e){if(t.x<this.p.x&&e.x<this.p.x)return null;if(this.p.x===e.x&&this.p.y===e.y)return this.isPointOnSegment=!0,null;if(t.y===this.p.y&&e.y===this.p.y){var n=t.x,i=e.x;return n>i&&(n=e.x,i=t.x),this.p.x>=n&&this.p.x<=i&&(this.isPointOnSegment=!0),null}if(t.y>this.p.y&&e.y<=this.p.y||e.y>this.p.y&&t.y<=this.p.y){var r=t.x-this.p.x,s=t.y-this.p.y,o=e.x-this.p.x,a=e.y-this.p.y,u=ue.signOfDet2x2(r,s,o,a);if(0===u)return this.isPointOnSegment=!0,null;s>a&&(u=-u),u>0&&this.crossingCount++}},isPointInPolygon:function(){return this.getLocation()!==L.EXTERIOR},getLocation:function(){return this.isPointOnSegment?L.BOUNDARY:this.crossingCount%2===1?L.INTERIOR:L.EXTERIOR},isOnSegment:function(){return this.isPointOnSegment},interfaces_:function(){return[]},getClass:function(){return le}}),le.locatePointInRing=function(){if(arguments[0]instanceof g&&R(arguments[1],D)){for(var t=arguments[0],e=arguments[1],n=new le(t),i=new g,r=new g,s=1;s<e.size();s++)if(e.getCoordinate(s,i),e.getCoordinate(s-1,r),n.countSegment(i,r),n.isOnSegment())return n.getLocation();return n.getLocation()}if(arguments[0]instanceof g&&arguments[1]instanceof Array){for(var o=arguments[0],a=arguments[1],n=new le(o),s=1;s<a.length;s++){var i=a[s],r=a[s-1];if(n.countSegment(i,r),n.isOnSegment())return n.getLocation()}return n.getLocation()}},e(he.prototype,{interfaces_:function(){return[]},getClass:function(){return he}}),he.orientationIndex=function(t,e,n){return M.orientationIndex(t,e,n)},he.signedArea=function(){if(arguments[0]instanceof Array){var t=arguments[0];if(t.length<3)return 0;for(var e=0,n=t[0].x,i=1;i<t.length-1;i++){var r=t[i].x-n,s=t[i+1].y,o=t[i-1].y;e+=r*(o-s)}return e/2}if(R(arguments[0],D)){var a=arguments[0],u=a.size();if(3>u)return 0;var l=new g,h=new g,c=new g;a.getCoordinate(0,h),a.getCoordinate(1,c);var n=h.x;c.x-=n;for(var e=0,i=1;u-1>i;i++)l.y=h.y,h.x=c.x,h.y=c.y,a.getCoordinate(i+1,c),c.x-=n,e+=h.x*(l.y-c.y);return e/2}},he.distanceLineLine=function(t,e,n,i){if(t.equals(e))return he.distancePointLine(t,n,i);if(n.equals(i))return he.distancePointLine(i,t,e);var r=!1;if(C.intersects(t,e,n,i)){var s=(e.x-t.x)*(i.y-n.y)-(e.y-t.y)*(i.x-n.x);if(0===s)r=!0;else{var o=(t.y-n.y)*(i.x-n.x)-(t.x-n.x)*(i.y-n.y),a=(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y),u=a/s,l=o/s;(0>l||l>1||0>u||u>1)&&(r=!0)}}else r=!0;return r?T.min(he.distancePointLine(t,n,i),he.distancePointLine(e,n,i),he.distancePointLine(n,t,e),he.distancePointLine(i,t,e)):0},he.isPointInRing=function(t,e){return he.locatePointInRing(t,e)!==L.EXTERIOR},he.computeLength=function(t){var e=t.size();if(1>=e)return 0;var n=0,i=new g;t.getCoordinate(0,i);for(var r=i.x,s=i.y,o=1;e>o;o++){t.getCoordinate(o,i);var a=i.x,u=i.y,l=a-r,h=u-s;n+=Math.sqrt(l*l+h*h),r=a,s=u}return n},he.isCCW=function(t){var e=t.length-1;if(3>e)throw new i("Ring has fewer than 4 points, so orientation cannot be determined");for(var n=t[0],r=0,s=1;e>=s;s++){var o=t[s];o.y>n.y&&(n=o,r=s)}var a=r;do a-=1,0>a&&(a=e);while(t[a].equals2D(n)&&a!==r);var u=r;do u=(u+1)%e;while(t[u].equals2D(n)&&u!==r);var l=t[a],h=t[u];if(l.equals2D(n)||h.equals2D(n)||l.equals2D(h))return!1;var c=he.computeOrientation(l,n,h),f=!1;return f=0===c?l.x>h.x:c>0},he.locatePointInRing=function(t,e){return le.locatePointInRing(t,e)},he.distancePointLinePerpendicular=function(t,e,n){var i=(n.x-e.x)*(n.x-e.x)+(n.y-e.y)*(n.y-e.y),r=((e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y))/i;return Math.abs(r)*Math.sqrt(i)},he.computeOrientation=function(t,e,n){return he.orientationIndex(t,e,n)},he.distancePointLine=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];if(0===e.length)throw new i("Line array must contain at least one vertex");for(var n=t.distance(e[0]),r=0;r<e.length-1;r++){var s=he.distancePointLine(t,e[r],e[r+1]);n>s&&(n=s)}return n}if(3===arguments.length){var o=arguments[0],a=arguments[1],u=arguments[2];if(a.x===u.x&&a.y===u.y)return o.distance(a);var l=(u.x-a.x)*(u.x-a.x)+(u.y-a.y)*(u.y-a.y),h=((o.x-a.x)*(u.x-a.x)+(o.y-a.y)*(u.y-a.y))/l;if(0>=h)return o.distance(a);if(h>=1)return o.distance(u);var c=((a.y-o.y)*(u.x-a.x)-(a.x-o.x)*(u.y-a.y))/l;return Math.abs(c)*Math.sqrt(l)}},he.isOnLine=function(t,e){for(var n=new ae,i=1;i<e.length;i++){var r=e[i-1],s=e[i];if(n.computeIntersection(t,r,s),n.hasIntersection())return!0}return!1},he.CLOCKWISE=-1,he.RIGHT=he.CLOCKWISE,he.COUNTERCLOCKWISE=1,he.LEFT=he.COUNTERCLOCKWISE,he.COLLINEAR=0,he.STRAIGHT=he.COLLINEAR,e(ce.prototype,{minX:function(){return Math.min(this.p0.x,this.p1.x)},orientationIndex:function(){if(arguments[0]instanceof ce){var t=arguments[0],e=he.orientationIndex(this.p0,this.p1,t.p0),n=he.orientationIndex(this.p0,this.p1,t.p1);return e>=0&&n>=0?Math.max(e,n):0>=e&&0>=n?Math.max(e,n):0}if(arguments[0]instanceof g){var i=arguments[0];return he.orientationIndex(this.p0,this.p1,i)}},toGeometry:function(t){return t.createLineString([this.p0,this.p1])},isVertical:function(){return this.p0.x===this.p1.x},equals:function(t){if(!(t instanceof ce))return!1;var e=t;return this.p0.equals(e.p0)&&this.p1.equals(e.p1)},intersection:function(t){var e=new ae;return e.computeIntersection(this.p0,this.p1,t.p0,t.p1),e.hasIntersection()?e.getIntersection(0):null},project:function(){if(arguments[0]instanceof g){var t=arguments[0];if(t.equals(this.p0)||t.equals(this.p1))return new g(t);var e=this.projectionFactor(t),n=new g;return n.x=this.p0.x+e*(this.p1.x-this.p0.x),n.y=this.p0.y+e*(this.p1.y-this.p0.y),n}if(arguments[0]instanceof ce){var i=arguments[0],r=this.projectionFactor(i.p0),s=this.projectionFactor(i.p1);if(r>=1&&s>=1)return null;if(0>=r&&0>=s)return null;var o=this.project(i.p0);0>r&&(o=this.p0),r>1&&(o=this.p1);var a=this.project(i.p1);return 0>s&&(a=this.p0),s>1&&(a=this.p1),new ce(o,a)}},normalize:function(){this.p1.compareTo(this.p0)<0&&this.reverse()},angle:function(){return Math.atan2(this.p1.y-this.p0.y,this.p1.x-this.p0.x)},getCoordinate:function(t){return 0===t?this.p0:this.p1},distancePerpendicular:function(t){return he.distancePointLinePerpendicular(t,this.p0,this.p1)},minY:function(){return Math.min(this.p0.y,this.p1.y)},midPoint:function(){return ce.midPoint(this.p0,this.p1)},projectionFactor:function(t){if(t.equals(this.p0))return 0;if(t.equals(this.p1))return 1;var e=this.p1.x-this.p0.x,n=this.p1.y-this.p0.y,i=e*e+n*n;if(0>=i)return r.NaN;var s=((t.x-this.p0.x)*e+(t.y-this.p0.y)*n)/i;return s},closestPoints:function(t){var e=this.intersection(t);if(null!==e)return[e,e];var n=new Array(2).fill(null),i=r.MAX_VALUE,s=null,o=this.closestPoint(t.p0);i=o.distance(t.p0),n[0]=o,n[1]=t.p0;var a=this.closestPoint(t.p1);s=a.distance(t.p1),i>s&&(i=s,n[0]=a,n[1]=t.p1);var u=t.closestPoint(this.p0);s=u.distance(this.p0),i>s&&(i=s,n[0]=this.p0,n[1]=u);var l=t.closestPoint(this.p1);return s=l.distance(this.p1),i>s&&(i=s,n[0]=this.p1,n[1]=l),n},closestPoint:function(t){var e=this.projectionFactor(t);if(e>0&&1>e)return this.project(t);var n=this.p0.distance(t),i=this.p1.distance(t);return i>n?this.p0:this.p1},maxX:function(){return Math.max(this.p0.x,this.p1.x)},getLength:function(){return this.p0.distance(this.p1)},compareTo:function(t){var e=t,n=this.p0.compareTo(e.p0);return 0!==n?n:this.p1.compareTo(e.p1)},reverse:function(){var t=this.p0;this.p0=this.p1,this.p1=t},equalsTopo:function(t){return this.p0.equals(t.p0)&&this.p1.equals(t.p1)||this.p0.equals(t.p1)&&this.p1.equals(t.p0)},lineIntersection:function(t){try{var e=F.intersection(this.p0,this.p1,t.p0,t.p1);return e}catch(t){if(!(t instanceof w))throw t}finally{}return null},maxY:function(){return Math.max(this.p0.y,this.p1.y)},pointAlongOffset:function(t,e){var n=this.p0.x+t*(this.p1.x-this.p0.x),i=this.p0.y+t*(this.p1.y-this.p0.y),r=this.p1.x-this.p0.x,s=this.p1.y-this.p0.y,o=Math.sqrt(r*r+s*s),a=0,u=0;if(0!==e){if(0>=o)throw new IllegalStateException("Cannot compute offset from zero-length line segment");a=e*r/o,u=e*s/o}var l=n-u,h=i+a,c=new g(l,h);return c},setCoordinates:function(){if(1===arguments.length){var t=arguments[0];this.setCoordinates(t.p0,t.p1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.p0.x=e.x,this.p0.y=e.y,this.p1.x=n.x,this.p1.y=n.y}},segmentFraction:function(t){var e=this.projectionFactor(t);return 0>e?e=0:(e>1||r.isNaN(e))&&(e=1),e},toString:function(){return"LINESTRING( "+this.p0.x+" "+this.p0.y+", "+this.p1.x+" "+this.p1.y+")"},isHorizontal:function(){return this.p0.y===this.p1.y},distance:function(){if(arguments[0]instanceof ce){var t=arguments[0];return he.distanceLineLine(this.p0,this.p1,t.p0,t.p1)}if(arguments[0]instanceof g){var e=arguments[0];return he.distancePointLine(e,this.p0,this.p1)}},pointAlong:function(t){var e=new g;return e.x=this.p0.x+t*(this.p1.x-this.p0.x),e.y=this.p0.y+t*(this.p1.y-this.p0.y),e},hashCode:function(){var t=java.lang.Double.doubleToLongBits(this.p0.x);t^=31*java.lang.Double.doubleToLongBits(this.p0.y);var e=Math.trunc(t)^Math.trunc(t>>32),n=java.lang.Double.doubleToLongBits(this.p1.x);n^=31*java.lang.Double.doubleToLongBits(this.p1.y);var i=Math.trunc(n)^Math.trunc(n>>32);return e^i},interfaces_:function(){return[s,u]},getClass:function(){return ce}}),ce.midPoint=function(t,e){return new g((t.x+e.x)/2,(t.y+e.y)/2)},ce.serialVersionUID=0x2d2172135f411c00,e(fe.prototype,{isIntersects:function(){return!this.isDisjoint()},isCovers:function(){var t=fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])||fe.isTrue(this.matrix[L.INTERIOR][L.BOUNDARY])||fe.isTrue(this.matrix[L.BOUNDARY][L.INTERIOR])||fe.isTrue(this.matrix[L.BOUNDARY][L.BOUNDARY]);return t&&this.matrix[L.EXTERIOR][L.INTERIOR]===lt.FALSE&&this.matrix[L.EXTERIOR][L.BOUNDARY]===lt.FALSE},isCoveredBy:function(){var t=fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])||fe.isTrue(this.matrix[L.INTERIOR][L.BOUNDARY])||fe.isTrue(this.matrix[L.BOUNDARY][L.INTERIOR])||fe.isTrue(this.matrix[L.BOUNDARY][L.BOUNDARY]);return t&&this.matrix[L.INTERIOR][L.EXTERIOR]===lt.FALSE&&this.matrix[L.BOUNDARY][L.EXTERIOR]===lt.FALSE},set:function(){if(1===arguments.length)for(var t=arguments[0],e=0;e<t.length;e++){var n=Math.trunc(e/3),i=e%3;this.matrix[n][i]=lt.toDimensionValue(t.charAt(e))}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.matrix[r][s]=o}},isContains:function(){return fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&this.matrix[L.EXTERIOR][L.INTERIOR]===lt.FALSE&&this.matrix[L.EXTERIOR][L.BOUNDARY]===lt.FALSE},setAtLeast:function(){if(1===arguments.length)for(var t=arguments[0],e=0;e<t.length;e++){var n=Math.trunc(e/3),i=e%3;this.setAtLeast(n,i,lt.toDimensionValue(t.charAt(e)))}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];this.matrix[r][s]<o&&(this.matrix[r][s]=o)}},setAtLeastIfValid:function(t,e,n){t>=0&&e>=0&&this.setAtLeast(t,e,n)},isWithin:function(){return fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&this.matrix[L.INTERIOR][L.EXTERIOR]===lt.FALSE&&this.matrix[L.BOUNDARY][L.EXTERIOR]===lt.FALSE},isTouches:function(t,e){return t>e?this.isTouches(e,t):t===lt.A&&e===lt.A||t===lt.L&&e===lt.L||t===lt.L&&e===lt.A||t===lt.P&&e===lt.A||t===lt.P&&e===lt.L?this.matrix[L.INTERIOR][L.INTERIOR]===lt.FALSE&&(fe.isTrue(this.matrix[L.INTERIOR][L.BOUNDARY])||fe.isTrue(this.matrix[L.BOUNDARY][L.INTERIOR])||fe.isTrue(this.matrix[L.BOUNDARY][L.BOUNDARY])):!1},isOverlaps:function(t,e){return t===lt.P&&e===lt.P||t===lt.A&&e===lt.A?fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&fe.isTrue(this.matrix[L.INTERIOR][L.EXTERIOR])&&fe.isTrue(this.matrix[L.EXTERIOR][L.INTERIOR]):t===lt.L&&e===lt.L?1===this.matrix[L.INTERIOR][L.INTERIOR]&&fe.isTrue(this.matrix[L.INTERIOR][L.EXTERIOR])&&fe.isTrue(this.matrix[L.EXTERIOR][L.INTERIOR]):!1},isEquals:function(t,e){return t!==e?!1:fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&this.matrix[L.INTERIOR][L.EXTERIOR]===lt.FALSE&&this.matrix[L.BOUNDARY][L.EXTERIOR]===lt.FALSE&&this.matrix[L.EXTERIOR][L.INTERIOR]===lt.FALSE&&this.matrix[L.EXTERIOR][L.BOUNDARY]===lt.FALSE},toString:function(){for(var t=new P("123456789"),e=0;3>e;e++)for(var n=0;3>n;n++)t.setCharAt(3*e+n,lt.toDimensionSymbol(this.matrix[e][n]));return t.toString()},setAll:function(t){for(var e=0;3>e;e++)for(var n=0;3>n;n++)this.matrix[e][n]=t},get:function(t,e){return this.matrix[t][e]},transpose:function(){var t=this.matrix[1][0];return this.matrix[1][0]=this.matrix[0][1],this.matrix[0][1]=t,t=this.matrix[2][0],this.matrix[2][0]=this.matrix[0][2],this.matrix[0][2]=t,t=this.matrix[2][1],this.matrix[2][1]=this.matrix[1][2],this.matrix[1][2]=t,this},matches:function(t){if(9!==t.length)throw new i("Should be length 9: "+t);for(var e=0;3>e;e++)for(var n=0;3>n;n++)if(!fe.matches(this.matrix[e][n],t.charAt(3*e+n)))return!1;return!0},add:function(t){for(var e=0;3>e;e++)for(var n=0;3>n;n++)this.setAtLeast(e,n,t.get(e,n))},isDisjoint:function(){return this.matrix[L.INTERIOR][L.INTERIOR]===lt.FALSE&&this.matrix[L.INTERIOR][L.BOUNDARY]===lt.FALSE&&this.matrix[L.BOUNDARY][L.INTERIOR]===lt.FALSE&&this.matrix[L.BOUNDARY][L.BOUNDARY]===lt.FALSE},isCrosses:function(t,e){return t===lt.P&&e===lt.L||t===lt.P&&e===lt.A||t===lt.L&&e===lt.A?fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&fe.isTrue(this.matrix[L.INTERIOR][L.EXTERIOR]):t===lt.L&&e===lt.P||t===lt.A&&e===lt.P||t===lt.A&&e===lt.L?fe.isTrue(this.matrix[L.INTERIOR][L.INTERIOR])&&fe.isTrue(this.matrix[L.EXTERIOR][L.INTERIOR]):t===lt.L&&e===lt.L?0===this.matrix[L.INTERIOR][L.INTERIOR]:!1},interfaces_:function(){return[o]},getClass:function(){return fe}}),fe.matches=function(){if(Number.isInteger(arguments[0])&&"string"==typeof arguments[1]){var t=arguments[0],e=arguments[1];return e===lt.SYM_DONTCARE?!0:e===lt.SYM_TRUE&&(t>=0||t===lt.TRUE)?!0:e===lt.SYM_FALSE&&t===lt.FALSE?!0:e===lt.SYM_P&&t===lt.P?!0:e===lt.SYM_L&&t===lt.L?!0:e===lt.SYM_A&&t===lt.A}if("string"==typeof arguments[0]&&"string"==typeof arguments[1]){var n=arguments[0],i=arguments[1],r=new fe(n);return r.matches(i)}},fe.isTrue=function(t){return t>=0||t===lt.TRUE};var lo=Object.freeze({Coordinate:g,CoordinateList:N,Envelope:C,LineSegment:ce,GeometryFactory:ie,Geometry:B,Point:Lt,LineString:St,LinearRing:bt,Polygon:Tt,GeometryCollection:ft,MultiPoint:Pt,MultiLineString:gt,MultiPolygon:Ot,Dimension:lt,IntersectionMatrix:fe});e(ge.prototype,{addPoint:function(t){this.ptCount+=1,this.ptCentSum.x+=t.x,this.ptCentSum.y+=t.y},setBasePoint:function(t){null===this.areaBasePt&&(this.areaBasePt=t)},addLineSegments:function(t){for(var e=0,n=0;n<t.length-1;n++){var i=t[n].distance(t[n+1]);if(0!==i){e+=i;var r=(t[n].x+t[n+1].x)/2;this.lineCentSum.x+=i*r;var s=(t[n].y+t[n+1].y)/2;this.lineCentSum.y+=i*s}}this.totalLength+=e,0===e&&t.length>0&&this.addPoint(t[0])},addHole:function(t){for(var e=he.isCCW(t),n=0;n<t.length-1;n++)this.addTriangle(this.areaBasePt,t[n],t[n+1],e);this.addLineSegments(t)},getCentroid:function(){var t=new g;if(Math.abs(this.areasum2)>0)t.x=this.cg3.x/3/this.areasum2,t.y=this.cg3.y/3/this.areasum2;else if(this.totalLength>0)t.x=this.lineCentSum.x/this.totalLength,t.y=this.lineCentSum.y/this.totalLength;else{if(!(this.ptCount>0))return null;t.x=this.ptCentSum.x/this.ptCount,t.y=this.ptCentSum.y/this.ptCount}return t},addShell:function(t){t.length>0&&this.setBasePoint(t[0]);for(var e=!he.isCCW(t),n=0;n<t.length-1;n++)this.addTriangle(this.areaBasePt,t[n],t[n+1],e);this.addLineSegments(t)},addTriangle:function(t,e,n,i){var r=i?1:-1;ge.centroid3(t,e,n,this.triangleCent3);var s=ge.area2(t,e,n);this.cg3.x+=r*s*this.triangleCent3.x,this.cg3.y+=r*s*this.triangleCent3.y,this.areasum2+=r*s},add:function(){if(arguments[0]instanceof Tt){var t=arguments[0];this.addShell(t.getExteriorRing().getCoordinates());for(var e=0;e<t.getNumInteriorRing();e++)this.addHole(t.getInteriorRingN(e).getCoordinates())}else if(arguments[0]instanceof B){var n=arguments[0];if(n.isEmpty())return null;if(n instanceof Lt)this.addPoint(n.getCoordinate());else if(n instanceof St)this.addLineSegments(n.getCoordinates());else if(n instanceof Tt){var i=n;this.add(i)}else if(n instanceof ft)for(var r=n,e=0;e<r.getNumGeometries();e++)this.add(r.getGeometryN(e))}},interfaces_:function(){return[]},getClass:function(){return ge}}),ge.area2=function(t,e,n){return(e.x-t.x)*(n.y-t.y)-(n.x-t.x)*(e.y-t.y)},ge.centroid3=function(t,e,n,i){return i.x=t.x+e.x+n.x,i.y=t.y+e.y+n.y,null},ge.getCentroid=function(t){var e=new ge(t);return e.getCentroid()},de.prototype=new Error,de.prototype.name="EmptyStackException",pe.prototype=new y,pe.prototype.add=function(t){return this.array_.push(t),!0},pe.prototype.get=function(t){if(0>t||t>=this.size())throw new IndexOutOfBoundsException;return this.array_[t]},pe.prototype.push=function(t){return this.array_.push(t),t},pe.prototype.pop=function(t){if(0===this.array_.length)throw new de;return this.array_.pop()},pe.prototype.peek=function(){if(0===this.array_.length)throw new de;return this.array_[this.array_.length-1]},pe.prototype.empty=function(){return 0===this.array_.length},pe.prototype.isEmpty=function(){return this.empty()},pe.prototype.search=function(t){return this.array_.indexOf(t)},pe.prototype.size=function(){return this.array_.length},pe.prototype.toArray=function(){for(var t=[],e=0,n=this.array_.length;n>e;e++)t.push(this.array_[e]);return t},e(ve.prototype,{filter:function(t){this.treeSet.contains(t)||(this.list.add(t),this.treeSet.add(t))},getCoordinates:function(){var t=new Array(this.list.size()).fill(null);return this.list.toArray(t)},interfaces_:function(){return[z]},getClass:function(){return ve}}),ve.filterCoordinates=function(t){for(var e=new ve,n=0;n<t.length;n++)e.filter(t[n]);return e.getCoordinates()},e(me.prototype,{preSort:function(t){for(var e=null,n=1;n<t.length;n++)(t[n].y<t[0].y||t[n].y===t[0].y&&t[n].x<t[0].x)&&(e=t[0],t[0]=t[n],t[n]=e);return ut.sort(t,1,t.length,new ye(t[0])),t},computeOctRing:function(t){var e=this.computeOctPts(t),n=new N;return n.add(e,!1),n.size()<3?null:(n.closeRing(),n.toCoordinateArray())},lineOrPolygon:function(t){if(t=this.cleanRing(t),3===t.length)return this.geomFactory.createLineString([t[0],t[1]]);var e=this.geomFactory.createLinearRing(t);return this.geomFactory.createPolygon(e,null)},cleanRing:function(t){f.equals(t[0],t[t.length-1]);for(var e=new I,n=null,i=0;i<=t.length-2;i++){var r=t[i],s=t[i+1];r.equals(s)||null!==n&&this.isBetween(n,r,s)||(e.add(r),n=r)}e.add(t[t.length-1]);var o=new Array(e.size()).fill(null);return e.toArray(o)},isBetween:function(t,e,n){if(0!==he.computeOrientation(t,e,n))return!1;if(t.x!==n.x){if(t.x<=e.x&&e.x<=n.x)return!0;if(n.x<=e.x&&e.x<=t.x)return!0}if(t.y!==n.y){if(t.y<=e.y&&e.y<=n.y)return!0;if(n.y<=e.y&&e.y<=t.y)return!0}return!1},reduce:function(t){var e=this.computeOctRing(t);if(null===e)return t;for(var n=new at,i=0;i<e.length;i++)n.add(e[i]);for(var i=0;i<t.length;i++)he.isPointInRing(t[i],e)||n.add(t[i]);var r=H.toCoordinateArray(n);return r.length<3?this.padArray3(r):r},getConvexHull:function(){if(0===this.inputPts.length)return this.geomFactory.createGeometryCollection(null);if(1===this.inputPts.length)return this.geomFactory.createPoint(this.inputPts[0]);if(2===this.inputPts.length)return this.geomFactory.createLineString(this.inputPts);var t=this.inputPts;this.inputPts.length>50&&(t=this.reduce(this.inputPts));var e=this.preSort(t),n=this.grahamScan(e),i=this.toCoordinateArray(n);return this.lineOrPolygon(i)},padArray3:function(t){for(var e=new Array(3).fill(null),n=0;n<e.length;n++)n<t.length?e[n]=t[n]:e[n]=t[0];return e},computeOctPts:function(t){for(var e=new Array(8).fill(null),n=0;n<e.length;n++)e[n]=t[0];for(var i=1;i<t.length;i++)t[i].x<e[0].x&&(e[0]=t[i]),t[i].x-t[i].y<e[1].x-e[1].y&&(e[1]=t[i]),t[i].y>e[2].y&&(e[2]=t[i]),t[i].x+t[i].y>e[3].x+e[3].y&&(e[3]=t[i]),t[i].x>e[4].x&&(e[4]=t[i]),t[i].x-t[i].y>e[5].x-e[5].y&&(e[5]=t[i]),t[i].y<e[6].y&&(e[6]=t[i]),t[i].x+t[i].y<e[7].x+e[7].y&&(e[7]=t[i]);return e},toCoordinateArray:function(t){for(var e=new Array(t.size()).fill(null),n=0;n<t.size();n++){var i=t.get(n);e[n]=i}return e},grahamScan:function(t){var e=null,n=new pe;e=n.push(t[0]),e=n.push(t[1]),e=n.push(t[2]);for(var i=3;i<t.length;i++){for(e=n.pop();!n.empty()&&he.computeOrientation(n.peek(),e,t[i])>0;)e=n.pop();e=n.push(e),e=n.push(t[i])}return e=n.push(t[0]),n},interfaces_:function(){return[]},getClass:function(){return me}}),me.extractCoordinates=function(t){var e=new ve;return t.apply(e),e.getCoordinates()},e(ye.prototype,{compare:function(t,e){var n=t,i=e;return ye.polarCompare(this.origin,n,i)},interfaces_:function(){return[a]},getClass:function(){return ye}}),ye.polarCompare=function(t,e,n){var i=e.x-t.x,r=e.y-t.y,s=n.x-t.x,o=n.y-t.y,a=he.computeOrientation(t,e,n);
if(a===he.COUNTERCLOCKWISE)return 1;if(a===he.CLOCKWISE)return-1;var u=i*i+r*r,l=s*s+o*o;return l>u?-1:u>l?1:0},me.RadialComparator=ye,e(xe.prototype,{transformPoint:function(t,e){return this.factory.createPoint(this.transformCoordinates(t.getCoordinateSequence(),t))},transformPolygon:function(t,e){var n=!0,i=this.transformLinearRing(t.getExteriorRing(),t);null!==i&&i instanceof bt&&!i.isEmpty()||(n=!1);for(var r=new I,s=0;s<t.getNumInteriorRing();s++){var o=this.transformLinearRing(t.getInteriorRingN(s),t);null===o||o.isEmpty()||(o instanceof bt||(n=!1),r.add(o))}if(n)return this.factory.createPolygon(i,r.toArray([]));var a=new I;return null!==i&&a.add(i),a.addAll(r),this.factory.buildGeometry(a)},createCoordinateSequence:function(t){return this.factory.getCoordinateSequenceFactory().create(t)},getInputGeometry:function(){return this.inputGeom},transformMultiLineString:function(t,e){for(var n=new I,i=0;i<t.getNumGeometries();i++){var r=this.transformLineString(t.getGeometryN(i),t);null!==r&&(r.isEmpty()||n.add(r))}return this.factory.buildGeometry(n)},transformCoordinates:function(t,e){return this.copy(t)},transformLineString:function(t,e){return this.factory.createLineString(this.transformCoordinates(t.getCoordinateSequence(),t))},transformMultiPoint:function(t,e){for(var n=new I,i=0;i<t.getNumGeometries();i++){var r=this.transformPoint(t.getGeometryN(i),t);null!==r&&(r.isEmpty()||n.add(r))}return this.factory.buildGeometry(n)},transformMultiPolygon:function(t,e){for(var n=new I,i=0;i<t.getNumGeometries();i++){var r=this.transformPolygon(t.getGeometryN(i),t);null!==r&&(r.isEmpty()||n.add(r))}return this.factory.buildGeometry(n)},copy:function(t){return t.copy()},transformGeometryCollection:function(t,e){for(var n=new I,i=0;i<t.getNumGeometries();i++){var r=this.transform(t.getGeometryN(i));null!==r&&(this.pruneEmptyGeometry&&r.isEmpty()||n.add(r))}return this.preserveGeometryCollectionType?this.factory.createGeometryCollection(ie.toGeometryArray(n)):this.factory.buildGeometry(n)},transform:function(t){if(this.inputGeom=t,this.factory=t.getFactory(),t instanceof Lt)return this.transformPoint(t,null);if(t instanceof Pt)return this.transformMultiPoint(t,null);if(t instanceof bt)return this.transformLinearRing(t,null);if(t instanceof St)return this.transformLineString(t,null);if(t instanceof gt)return this.transformMultiLineString(t,null);if(t instanceof Tt)return this.transformPolygon(t,null);if(t instanceof Ot)return this.transformMultiPolygon(t,null);if(t instanceof ft)return this.transformGeometryCollection(t,null);throw new i("Unknown Geometry subtype: "+t.getClass().getName())},transformLinearRing:function(t,e){var n=this.transformCoordinates(t.getCoordinateSequence(),t);if(null===n)return this.factory.createLinearRing(null);var i=n.size();return i>0&&4>i&&!this.preserveType?this.factory.createLineString(n):this.factory.createLinearRing(n)},interfaces_:function(){return[]},getClass:function(){return xe}}),e(Ee.prototype,{snapVertices:function(t,e){for(var n=this._isClosed?t.size()-1:t.size(),i=0;n>i;i++){var r=t.get(i),s=this.findSnapForVertex(r,e);null!==s&&(t.set(i,new g(s)),0===i&&this._isClosed&&t.set(t.size()-1,new g(s)))}},findSnapForVertex:function(t,e){for(var n=0;n<e.length;n++){if(t.equals2D(e[n]))return null;if(t.distance(e[n])<this.snapTolerance)return e[n]}return null},snapTo:function(t){var e=new N(this.srcPts);this.snapVertices(e,t),this.snapSegments(e,t);var n=e.toCoordinateArray();return n},snapSegments:function(t,e){if(0===e.length)return null;var n=e.length;e[0].equals2D(e[e.length-1])&&(n=e.length-1);for(var i=0;n>i;i++){var r=e[i],s=this.findSegmentIndexToSnap(r,t);s>=0&&t.add(s+1,new g(r),!1)}},findSegmentIndexToSnap:function(t,e){for(var n=r.MAX_VALUE,i=-1,s=0;s<e.size()-1;s++){if(this.seg.p0=e.get(s),this.seg.p1=e.get(s+1),this.seg.p0.equals2D(t)||this.seg.p1.equals2D(t)){if(this.allowSnappingToSourceVertices)continue;return-1}var o=this.seg.distance(t);o<this.snapTolerance&&n>o&&(n=o,i=s)}return i},setAllowSnappingToSourceVertices:function(t){this.allowSnappingToSourceVertices=t},interfaces_:function(){return[]},getClass:function(){return Ee}}),Ee.isClosed=function(t){return t.length<=1?!1:t[0].equals2D(t[t.length-1])},e(Ie.prototype,{snapTo:function(t,e){var n=this.extractTargetCoordinates(t),i=new Ne(e,n);return i.transform(this.srcGeom)},snapToSelf:function(t,e){var n=this.extractTargetCoordinates(this.srcGeom),i=new Ne(t,n,!0),r=i.transform(this.srcGeom),s=r;return e&&R(s,Rt)&&(s=r.buffer(0)),s},computeSnapTolerance:function(t){var e=this.computeMinimumSegmentLength(t),n=e/10;return n},extractTargetCoordinates:function(t){for(var e=new at,n=t.getCoordinates(),i=0;i<n.length;i++)e.add(n[i]);return e.toArray(new Array(0).fill(null))},computeMinimumSegmentLength:function(t){for(var e=r.MAX_VALUE,n=0;n<t.length-1;n++){var i=t[n].distance(t[n+1]);e>i&&(e=i)}return e},interfaces_:function(){return[]},getClass:function(){return Ie}}),Ie.snap=function(t,e,n){var i=new Array(2).fill(null),r=new Ie(t);i[0]=r.snapTo(e,n);var s=new Ie(e);return i[1]=s.snapTo(i[0],n),i},Ie.computeOverlaySnapTolerance=function(){if(1===arguments.length){var t=arguments[0],e=Ie.computeSizeBasedSnapTolerance(t),n=t.getPrecisionModel();if(n.getType()===ee.FIXED){var i=1/n.getScale()*2/1.415;i>e&&(e=i)}return e}if(2===arguments.length){var r=arguments[0],s=arguments[1];return Math.min(Ie.computeOverlaySnapTolerance(r),Ie.computeOverlaySnapTolerance(s))}},Ie.computeSizeBasedSnapTolerance=function(t){var e=t.getEnvelopeInternal(),n=Math.min(e.getHeight(),e.getWidth()),i=n*Ie.SNAP_PRECISION_FACTOR;return i},Ie.snapToSelf=function(t,e,n){var i=new Ie(t);return i.snapToSelf(e,n)},Ie.SNAP_PRECISION_FACTOR=1e-9,h(Ne,xe),e(Ne.prototype,{snapLine:function(t,e){var n=new Ee(t,this.snapTolerance);return n.setAllowSnappingToSourceVertices(this.isSelfSnap),n.snapTo(e)},transformCoordinates:function(t,e){var n=t.toCoordinateArray(),i=this.snapLine(n,this.snapPts);return this.factory.getCoordinateSequenceFactory().create(i)},interfaces_:function(){return[]},getClass:function(){return Ne}}),e(Ce.prototype,{getCommon:function(){return r.longBitsToDouble(this.commonBits)},add:function(t){var e=r.doubleToLongBits(t);if(this.isFirst)return this.commonBits=e,this.commonSignExp=Ce.signExpBits(this.commonBits),this.isFirst=!1,null;var n=Ce.signExpBits(e);return n!==this.commonSignExp?(this.commonBits=0,null):(this.commonMantissaBitsCount=Ce.numCommonMostSigMantissaBits(this.commonBits,e),void(this.commonBits=Ce.zeroLowerBits(this.commonBits,64-(12+this.commonMantissaBitsCount))))},toString:function(){if(1===arguments.length){var t=arguments[0],e=r.longBitsToDouble(t),n=Long.toBinaryString(t),i="0000000000000000000000000000000000000000000000000000000000000000"+n,s=i.substring(i.length-64),o=s.substring(0,1)+"  "+s.substring(1,12)+"(exp) "+s.substring(12)+" [ "+e+" ]";return o}},interfaces_:function(){return[]},getClass:function(){return Ce}}),Ce.getBit=function(t,e){var n=1<<e;return 0!==(t&n)?1:0},Ce.signExpBits=function(t){return t>>52},Ce.zeroLowerBits=function(t,e){var n=(1<<e)-1,i=~n,r=t&i;return r},Ce.numCommonMostSigMantissaBits=function(t,e){for(var n=0,i=52;i>=0;i--){if(Ce.getBit(t,i)!==Ce.getBit(e,i))return n;n++}return 52},e(Se.prototype,{addCommonBits:function(t){var e=new Le(this.commonCoord);t.apply(e),t.geometryChanged()},removeCommonBits:function(t){if(0===this.commonCoord.x&&0===this.commonCoord.y)return t;var e=new g(this.commonCoord);e.x=-e.x,e.y=-e.y;var n=new Le(e);return t.apply(n),t.geometryChanged(),t},getCommonCoordinate:function(){return this.commonCoord},add:function(t){t.apply(this.ccFilter),this.commonCoord=this.ccFilter.getCommonCoordinate()},interfaces_:function(){return[]},getClass:function(){return Se}}),e(we.prototype,{filter:function(t){this.commonBitsX.add(t.x),this.commonBitsY.add(t.y)},getCommonCoordinate:function(){return new g(this.commonBitsX.getCommon(),this.commonBitsY.getCommon())},interfaces_:function(){return[z]},getClass:function(){return we}}),e(Le.prototype,{filter:function(t,e){var n=t.getOrdinate(e,0)+this.trans.x,i=t.getOrdinate(e,1)+this.trans.y;t.setOrdinate(e,0,n),t.setOrdinate(e,1,i)},isDone:function(){return!1},isGeometryChanged:function(){return!0},interfaces_:function(){return[ct]},getClass:function(){return Le}}),Se.CommonCoordinateFilter=we,Se.Translater=Le,e(Re.prototype,{next:function(){if(this.atStart)return this.atStart=!1,Re.isAtomic(this.parent)&&this.index++,this.parent;if(null!==this.subcollectionIterator){if(this.subcollectionIterator.hasNext())return this.subcollectionIterator.next();this.subcollectionIterator=null}if(this.index>=this.max)throw new x;var t=this.parent.getGeometryN(this.index++);return t instanceof ft?(this.subcollectionIterator=new Re(t),this.subcollectionIterator.next()):t},remove:function(){throw new UnsupportedOperationException(this.getClass().getName())},hasNext:function(){if(this.atStart)return!0;if(null!==this.subcollectionIterator){if(this.subcollectionIterator.hasNext())return!0;this.subcollectionIterator=null}return!(this.index>=this.max)},interfaces_:function(){return[p]},getClass:function(){return Re}}),Re.isAtomic=function(t){return!(t instanceof ft)},e(Te.prototype,{locateInternal:function(){if(arguments[0]instanceof g&&arguments[1]instanceof Tt){var t=arguments[0],e=arguments[1];if(e.isEmpty())return L.EXTERIOR;var n=e.getExteriorRing(),i=this.locateInPolygonRing(t,n);if(i===L.EXTERIOR)return L.EXTERIOR;if(i===L.BOUNDARY)return L.BOUNDARY;for(var r=0;r<e.getNumInteriorRing();r++){var s=e.getInteriorRingN(r),o=this.locateInPolygonRing(t,s);if(o===L.INTERIOR)return L.EXTERIOR;if(o===L.BOUNDARY)return L.BOUNDARY}return L.INTERIOR}if(arguments[0]instanceof g&&arguments[1]instanceof St){var a=arguments[0],u=arguments[1];if(!u.getEnvelopeInternal().intersects(a))return L.EXTERIOR;var l=u.getCoordinates();return u.isClosed()||!a.equals(l[0])&&!a.equals(l[l.length-1])?he.isOnLine(a,l)?L.INTERIOR:L.EXTERIOR:L.BOUNDARY}if(arguments[0]instanceof g&&arguments[1]instanceof Lt){var h=arguments[0],c=arguments[1],f=c.getCoordinate();return f.equals2D(h)?L.INTERIOR:L.EXTERIOR}},locateInPolygonRing:function(t,e){return e.getEnvelopeInternal().intersects(t)?he.locatePointInRing(t,e.getCoordinates()):L.EXTERIOR},intersects:function(t,e){return this.locate(t,e)!==L.EXTERIOR},updateLocationInfo:function(t){t===L.INTERIOR&&(this.isIn=!0),t===L.BOUNDARY&&this.numBoundaries++},computeLocation:function(t,e){if(e instanceof Lt&&this.updateLocationInfo(this.locateInternal(t,e)),e instanceof St)this.updateLocationInfo(this.locateInternal(t,e));else if(e instanceof Tt)this.updateLocationInfo(this.locateInternal(t,e));else if(e instanceof gt)for(var n=e,i=0;i<n.getNumGeometries();i++){var r=n.getGeometryN(i);this.updateLocationInfo(this.locateInternal(t,r))}else if(e instanceof Ot)for(var s=e,i=0;i<s.getNumGeometries();i++){var o=s.getGeometryN(i);this.updateLocationInfo(this.locateInternal(t,o))}else if(e instanceof ft)for(var a=new Re(e);a.hasNext();){var u=a.next();u!==e&&this.computeLocation(t,u)}},locate:function(t,e){return e.isEmpty()?L.EXTERIOR:e instanceof St?this.locateInternal(t,e):e instanceof Tt?this.locateInternal(t,e):(this.isIn=!1,this.numBoundaries=0,this.computeLocation(t,e),this.boundaryRule.isInBoundary(this.numBoundaries)?L.BOUNDARY:this.numBoundaries>0||this.isIn?L.INTERIOR:L.EXTERIOR)},interfaces_:function(){return[]},getClass:function(){return Te}}),e(Pe.prototype,{interfaces_:function(){return[]},getClass:function(){return Pe}}),Pe.octant=function(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1];if(0===t&&0===e)throw new i("Cannot compute the octant for point ( "+t+", "+e+" )");var n=Math.abs(t),r=Math.abs(e);return t>=0?e>=0?n>=r?0:1:n>=r?7:6:e>=0?n>=r?3:2:n>=r?4:5}if(arguments[0]instanceof g&&arguments[1]instanceof g){var s=arguments[0],o=arguments[1],a=o.x-s.x,u=o.y-s.y;if(0===a&&0===u)throw new i("Cannot compute the octant for two identical points "+s);return Pe.octant(a,u)}},e(be.prototype,{getCoordinates:function(){},size:function(){},getCoordinate:function(t){},isClosed:function(){},setData:function(t){},getData:function(){},interfaces_:function(){return[]},getClass:function(){return be}}),e(Oe.prototype,{getCoordinates:function(){return this.pts},size:function(){return this.pts.length},getCoordinate:function(t){return this.pts[t]},isClosed:function(){return this.pts[0].equals(this.pts[this.pts.length-1])},getSegmentOctant:function(t){return t===this.pts.length-1?-1:Pe.octant(this.getCoordinate(t),this.getCoordinate(t+1))},setData:function(t){this.data=t},getData:function(){return this.data},toString:function(){return se.toLineString(new Gt(this.pts))},interfaces_:function(){return[be]},getClass:function(){return Oe}}),e(_e.prototype,{getBounds:function(){},interfaces_:function(){return[]},getClass:function(){return _e}}),e(Me.prototype,{getItem:function(){return this.item},getBounds:function(){return this.bounds},interfaces_:function(){return[_e,u]},getClass:function(){return Me}}),e(De.prototype,{poll:function(){if(this.isEmpty())return null;var t=this.items.get(1);return this.items.set(1,this.items.get(this._size)),this._size-=1,this.reorder(1),t},size:function(){return this._size},reorder:function(t){for(var e=null,n=this.items.get(t);2*t<=this._size&&(e=2*t,e!==this._size&&this.items.get(e+1).compareTo(this.items.get(e))<0&&e++,this.items.get(e).compareTo(n)<0);t=e)this.items.set(t,this.items.get(e));this.items.set(t,n)},clear:function(){this._size=0,this.items.clear()},isEmpty:function(){return 0===this._size},add:function(t){this.items.add(null),this._size+=1;var e=this._size;for(this.items.set(0,t);t.compareTo(this.items.get(Math.trunc(e/2)))<0;e/=2)this.items.set(e,this.items.get(Math.trunc(e/2)));this.items.set(e,t)},interfaces_:function(){return[]},getClass:function(){return De}}),e(Ae.prototype,{visitItem:function(t){},interfaces_:function(){return[]},getClass:function(){return Ae}}),e(Fe.prototype,{insert:function(t,e){},remove:function(t,e){},query:function(){if(1===arguments.length){arguments[0]}else if(2===arguments.length){arguments[0],arguments[1]}},interfaces_:function(){return[]},getClass:function(){return Fe}}),e(Ge.prototype,{getLevel:function(){return this.level},size:function(){return this.childBoundables.size()},getChildBoundables:function(){return this.childBoundables},addChildBoundable:function(t){f.isTrue(null===this.bounds),this.childBoundables.add(t)},isEmpty:function(){return this.childBoundables.isEmpty()},getBounds:function(){return null===this.bounds&&(this.bounds=this.computeBounds()),this.bounds},interfaces_:function(){return[_e,u]},getClass:function(){return Ge}}),Ge.serialVersionUID=0x5a1e55ec41369800;var ho={reverseOrder:function(){return{compare:function(t,e){return e.compareTo(t)}}},min:function(t){return ho.sort(t),t.get(0)},sort:function(t,e){var n=t.toArray();e?ut.sort(n,e):ut.sort(n);for(var i=t.iterator(),r=0,s=n.length;s>r;r++)i.next(),i.set(n[r])},singletonList:function(t){var e=new I;return e.add(t),e}};e(qe.prototype,{expandToQueue:function(t,e){var n=qe.isComposite(this.boundable1),r=qe.isComposite(this.boundable2);if(n&&r)return qe.area(this.boundable1)>qe.area(this.boundable2)?(this.expand(this.boundable1,this.boundable2,t,e),null):(this.expand(this.boundable2,this.boundable1,t,e),null);if(n)return this.expand(this.boundable1,this.boundable2,t,e),null;if(r)return this.expand(this.boundable2,this.boundable1,t,e),null;throw new i("neither boundable is composite")},isLeaves:function(){return!(qe.isComposite(this.boundable1)||qe.isComposite(this.boundable2))},compareTo:function(t){var e=t;return this._distance<e._distance?-1:this._distance>e._distance?1:0},expand:function(t,e,n,i){for(var r=t.getChildBoundables(),s=r.iterator();s.hasNext();){var o=s.next(),a=new qe(o,e,this.itemDistance);a.getDistance()<i&&n.add(a)}},getBoundable:function(t){return 0===t?this.boundable1:this.boundable2},getDistance:function(){return this._distance},distance:function(){return this.isLeaves()?this.itemDistance.distance(this.boundable1,this.boundable2):this.boundable1.getBounds().distance(this.boundable2.getBounds())},interfaces_:function(){return[s]},getClass:function(){return qe}}),qe.area=function(t){return t.getBounds().getArea()},qe.isComposite=function(t){return t instanceof Ge},e(Be.prototype,{getNodeCapacity:function(){return this.nodeCapacity},lastNode:function(t){return t.get(t.size()-1)},size:function t(){if(0===arguments.length)return this.isEmpty()?0:(this.build(),this.size(this.root));if(1===arguments.length){for(var e=arguments[0],t=0,n=e.getChildBoundables().iterator();n.hasNext();){var i=n.next();i instanceof Ge?t+=this.size(i):i instanceof Me&&(t+=1)}return t}},removeItem:function(t,e){for(var n=null,i=t.getChildBoundables().iterator();i.hasNext();){var r=i.next();r instanceof Me&&r.getItem()===e&&(n=r)}return null!==n?(t.getChildBoundables().remove(n),!0):!1},itemsTree:function(){if(0===arguments.length){this.build();var t=this.itemsTree(this.root);return null===t?new I:t}if(1===arguments.length){for(var e=arguments[0],n=new I,i=e.getChildBoundables().iterator();i.hasNext();){var r=i.next();if(r instanceof Ge){var s=this.itemsTree(r);null!==s&&n.add(s)}else r instanceof Me?n.add(r.getItem()):f.shouldNeverReachHere()}return n.size()<=0?null:n}},insert:function(t,e){f.isTrue(!this.built,"Cannot insert items into an STR packed R-tree after it has been built."),this.itemBoundables.add(new Me(t,e))},boundablesAtLevel:function(){if(1===arguments.length){var t=arguments[0],e=new I;return this.boundablesAtLevel(t,this.root,e),e}if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];if(f.isTrue(n>-2),i.getLevel()===n)return r.add(i),null;for(var s=i.getChildBoundables().iterator();s.hasNext();){var o=s.next();o instanceof Ge?this.boundablesAtLevel(n,o,r):(f.isTrue(o instanceof Me),-1===n&&r.add(o))}return null}},query:function(){if(1===arguments.length){var t=arguments[0];this.build();var e=new I;return this.isEmpty()?e:(this.getIntersectsOp().intersects(this.root.getBounds(),t)&&this.query(t,this.root,e),e)}if(2===arguments.length){var n=arguments[0],i=arguments[1];if(this.build(),this.isEmpty())return null;this.getIntersectsOp().intersects(this.root.getBounds(),n)&&this.query(n,this.root,i)}else if(3===arguments.length)if(R(arguments[2],Ae)&&arguments[0]instanceof Object&&arguments[1]instanceof Ge)for(var r=arguments[0],s=arguments[1],o=arguments[2],a=s.getChildBoundables(),u=0;u<a.size();u++){var l=a.get(u);this.getIntersectsOp().intersects(l.getBounds(),r)&&(l instanceof Ge?this.query(r,l,o):l instanceof Me?o.visitItem(l.getItem()):f.shouldNeverReachHere())}else if(R(arguments[2],y)&&arguments[0]instanceof Object&&arguments[1]instanceof Ge)for(var h=arguments[0],c=arguments[1],g=arguments[2],a=c.getChildBoundables(),u=0;u<a.size();u++){var l=a.get(u);this.getIntersectsOp().intersects(l.getBounds(),h)&&(l instanceof Ge?this.query(h,l,g):l instanceof Me?g.add(l.getItem()):f.shouldNeverReachHere())}},build:function(){return this.built?null:(this.root=this.itemBoundables.isEmpty()?this.createNode(0):this.createHigherLevels(this.itemBoundables,-1),this.itemBoundables=null,void(this.built=!0))},getRoot:function(){return this.build(),this.root},remove:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.build(),this.getIntersectsOp().intersects(this.root.getBounds(),t)?this.remove(t,this.root,e):!1}if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2],s=this.removeItem(i,r);if(s)return!0;for(var o=null,a=i.getChildBoundables().iterator();a.hasNext();){var u=a.next();if(this.getIntersectsOp().intersects(u.getBounds(),n)&&u instanceof Ge&&(s=this.remove(n,u,r))){o=u;break}}return null!==o&&o.getChildBoundables().isEmpty()&&i.getChildBoundables().remove(o),s}},createHigherLevels:function(t,e){f.isTrue(!t.isEmpty());var n=this.createParentBoundables(t,e+1);return 1===n.size()?n.get(0):this.createHigherLevels(n,e+1)},depth:function(){if(0===arguments.length)return this.isEmpty()?0:(this.build(),this.depth(this.root));if(1===arguments.length){for(var t=arguments[0],e=0,n=t.getChildBoundables().iterator();n.hasNext();){var i=n.next();if(i instanceof Ge){var r=this.depth(i);r>e&&(e=r)}}return e+1}},createParentBoundables:function(t,e){f.isTrue(!t.isEmpty());var n=new I;n.add(this.createNode(e));var i=new I(t);ho.sort(i,this.getComparator());for(var r=i.iterator();r.hasNext();){var s=r.next();this.lastNode(n).getChildBoundables().size()===this.getNodeCapacity()&&n.add(this.createNode(e)),this.lastNode(n).addChildBoundable(s)}return n},isEmpty:function(){return this.built?this.root.isEmpty():this.itemBoundables.isEmpty()},interfaces_:function(){return[u]},getClass:function(){return Be}}),Be.compareDoubles=function(t,e){return t>e?1:e>t?-1:0},Be.IntersectsOp=ze,Be.serialVersionUID=-0x35ef64c82d4c5400,Be.DEFAULT_NODE_CAPACITY=10,e(Ve.prototype,{distance:function(t,e){},interfaces_:function(){return[]},getClass:function(){return Ve}}),h(ke,Be),e(ke.prototype,{createParentBoundablesFromVerticalSlices:function(t,e){f.isTrue(t.length>0);for(var n=new I,i=0;i<t.length;i++)n.addAll(this.createParentBoundablesFromVerticalSlice(t[i],e));return n},createNode:function(t){return new Ye(t)},size:function(){return 0===arguments.length?Be.prototype.size.call(this):Be.prototype.size.apply(this,arguments)},insert:function(){if(2!==arguments.length)return Be.prototype.insert.apply(this,arguments);var t=arguments[0],e=arguments[1];return t.isNull()?null:void Be.prototype.insert.call(this,t,e)},getIntersectsOp:function(){return ke.intersectsOp},verticalSlices:function(t,e){for(var n=Math.trunc(Math.ceil(t.size()/e)),i=new Array(e).fill(null),r=t.iterator(),s=0;e>s;s++){i[s]=new I;for(var o=0;r.hasNext()&&n>o;){var a=r.next();i[s].add(a),o++}}return i},query:function(){if(1===arguments.length){var t=arguments[0];return Be.prototype.query.call(this,t)}if(2===arguments.length){var e=arguments[0],n=arguments[1];Be.prototype.query.call(this,e,n)}else if(3===arguments.length)if(R(arguments[2],Ae)&&arguments[0]instanceof Object&&arguments[1]instanceof Ge){var i=arguments[0],r=arguments[1],s=arguments[2];Be.prototype.query.call(this,i,r,s)}else if(R(arguments[2],y)&&arguments[0]instanceof Object&&arguments[1]instanceof Ge){var o=arguments[0],a=arguments[1],u=arguments[2];Be.prototype.query.call(this,o,a,u)}},getComparator:function(){return ke.yComparator},createParentBoundablesFromVerticalSlice:function(t,e){return Be.prototype.createParentBoundables.call(this,t,e)},remove:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return Be.prototype.remove.call(this,t,e)}return Be.prototype.remove.apply(this,arguments)},depth:function(){return 0===arguments.length?Be.prototype.depth.call(this):Be.prototype.depth.apply(this,arguments)},createParentBoundables:function(t,e){f.isTrue(!t.isEmpty());var n=Math.trunc(Math.ceil(t.size()/this.getNodeCapacity())),i=new I(t);ho.sort(i,ke.xComparator);var r=this.verticalSlices(i,Math.trunc(Math.ceil(Math.sqrt(n))));return this.createParentBoundablesFromVerticalSlices(r,e)},nearestNeighbour:function(){if(1===arguments.length){if(R(arguments[0],Ve)){var t=arguments[0],e=new qe(this.getRoot(),this.getRoot(),t);return this.nearestNeighbour(e)}if(arguments[0]instanceof qe){var n=arguments[0];return this.nearestNeighbour(n,r.POSITIVE_INFINITY)}}else if(2===arguments.length){if(arguments[0]instanceof ke&&R(arguments[1],Ve)){var i=arguments[0],s=arguments[1],e=new qe(this.getRoot(),i.getRoot(),s);return this.nearestNeighbour(e)}if(arguments[0]instanceof qe&&"number"==typeof arguments[1]){var o=arguments[0],a=arguments[1],u=a,l=null,h=new De;for(h.add(o);!h.isEmpty()&&u>0;){var c=h.poll(),f=c.getDistance();if(f>=u)break;c.isLeaves()?(u=f,l=c):c.expandToQueue(h,u)}return[l.getBoundable(0).getItem(),l.getBoundable(1).getItem()]}}else if(3===arguments.length){var g=arguments[0],d=arguments[1],p=arguments[2],v=new Me(g,d),e=new qe(this.getRoot(),v,p);return this.nearestNeighbour(e)[0]}},interfaces_:function(){return[Fe,u]},getClass:function(){return ke}}),ke.centreX=function(t){return ke.avg(t.getMinX(),t.getMaxX())},ke.avg=function(t,e){return(t+e)/2},ke.centreY=function(t){return ke.avg(t.getMinY(),t.getMaxY())},h(Ye,Ge),e(Ye.prototype,{computeBounds:function(){for(var t=null,e=this.getChildBoundables().iterator();e.hasNext();){var n=e.next();null===t?t=new C(n.getBounds()):t.expandToInclude(n.getBounds())}return t},interfaces_:function(){return[]},getClass:function(){return Ye}}),ke.STRtreeNode=Ye,ke.serialVersionUID=0x39920f7d5f261e0,ke.xComparator={interfaces_:function(){return[a]},compare:function(t,e){return Be.compareDoubles(ke.centreX(t.getBounds()),ke.centreX(e.getBounds()))}},ke.yComparator={interfaces_:function(){return[a]},compare:function(t,e){return Be.compareDoubles(ke.centreY(t.getBounds()),ke.centreY(e.getBounds()))}},ke.intersectsOp={interfaces_:function(){return[IntersectsOp]},intersects:function(t,e){return t.intersects(e)}},ke.DEFAULT_NODE_CAPACITY=10,e(Ue.prototype,{interfaces_:function(){return[]},getClass:function(){return Ue}}),Ue.relativeSign=function(t,e){return e>t?-1:t>e?1:0},Ue.compare=function(t,e,n){if(e.equals2D(n))return 0;var i=Ue.relativeSign(e.x,n.x),r=Ue.relativeSign(e.y,n.y);switch(t){case 0:return Ue.compareValue(i,r);case 1:return Ue.compareValue(r,i);case 2:return Ue.compareValue(r,-i);case 3:return Ue.compareValue(-i,r);case 4:return Ue.compareValue(-i,-r);case 5:return Ue.compareValue(-r,-i);case 6:return Ue.compareValue(-r,i);case 7:return Ue.compareValue(i,-r)}return f.shouldNeverReachHere("invalid octant value"),0},Ue.compareValue=function(t,e){return 0>t?-1:t>0?1:0>e?-1:e>0?1:0},e(Xe.prototype,{getCoordinate:function(){return this.coord},print:function(t){t.print(this.coord),t.print(" seg # = "+this.segmentIndex)},compareTo:function(t){var e=t;return this.segmentIndex<e.segmentIndex?-1:this.segmentIndex>e.segmentIndex?1:this.coord.equals2D(e.coord)?0:Ue.compare(this.segmentOctant,this.coord,e.coord)},isEndPoint:function(t){return 0!==this.segmentIndex||this._isInterior?this.segmentIndex===t:!0},isInterior:function(){return this._isInterior},interfaces_:function(){return[s]},getClass:function(){return Xe}}),e(He.prototype,{getSplitCoordinates:function(){var t=new N;this.addEndpoints();for(var e=this.iterator(),n=e.next();e.hasNext();){var i=e.next();this.addEdgeCoordinates(n,i,t),n=i}return t.toCoordinateArray()},addCollapsedNodes:function(){var t=new I;this.findCollapsesFromInsertedNodes(t),this.findCollapsesFromExistingVertices(t);for(var e=t.iterator();e.hasNext();){var n=e.next().intValue();this.add(this.edge.getCoordinate(n),n)}},print:function(t){t.println("Intersections:");for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t)}},findCollapsesFromExistingVertices:function(t){for(var e=0;e<this.edge.size()-2;e++){var n=this.edge.getCoordinate(e),i=(this.edge.getCoordinate(e+1),this.edge.getCoordinate(e+2));n.equals2D(i)&&t.add(new b(e+1))}},addEdgeCoordinates:function(t,e,n){var i=e.segmentIndex-t.segmentIndex+2,r=this.edge.getCoordinate(e.segmentIndex),s=e.isInterior()||!e.coord.equals2D(r);s||i--;n.add(new g(t.coord),!1);for(var o=t.segmentIndex+1;o<=e.segmentIndex;o++)n.add(this.edge.getCoordinate(o));s&&n.add(new g(e.coord))},iterator:function(){return this.nodeMap.values().iterator()},addSplitEdges:function(t){this.addEndpoints(),this.addCollapsedNodes();for(var e=this.iterator(),n=e.next();e.hasNext();){var i=e.next(),r=this.createSplitEdge(n,i);t.add(r),n=i}},findCollapseIndex:function(t,e,n){if(!t.coord.equals2D(e.coord))return!1;var i=e.segmentIndex-t.segmentIndex;return e.isInterior()||i--,1===i?(n[0]=t.segmentIndex+1,!0):!1},findCollapsesFromInsertedNodes:function(t){for(var e=new Array(1).fill(null),n=this.iterator(),i=n.next();n.hasNext();){var r=n.next(),s=this.findCollapseIndex(i,r,e);s&&t.add(new b(e[0])),i=r}},getEdge:function(){return this.edge},addEndpoints:function(){var t=this.edge.size()-1;this.add(this.edge.getCoordinate(0),0),this.add(this.edge.getCoordinate(t),t)},createSplitEdge:function(t,e){var n=e.segmentIndex-t.segmentIndex+2,i=this.edge.getCoordinate(e.segmentIndex),r=e.isInterior()||!e.coord.equals2D(i);r||n--;var s=new Array(n).fill(null),o=0;s[o++]=new g(t.coord);for(var a=t.segmentIndex+1;a<=e.segmentIndex;a++)s[o++]=this.edge.getCoordinate(a);return r&&(s[o]=new g(e.coord)),new Ke(s,this.edge.getData())},add:function(t,e){var n=new Xe(this.edge,t,e,this.edge.getSegmentOctant(e)),i=this.nodeMap.get(n);return null!==i?(f.isTrue(i.coord.equals2D(t),"Found equal nodes with different coordinates"),i):(this.nodeMap.put(n,n),n)},checkSplitEdgesCorrectness:function(t){var e=this.edge.getCoordinates(),n=t.get(0),i=n.getCoordinate(0);if(!i.equals2D(e[0]))throw new l("bad split edge start point at "+i);var r=t.get(t.size()-1),s=r.getCoordinates(),o=s[s.length-1];if(!o.equals2D(e[e.length-1]))throw new l("bad split edge end point at "+o)},interfaces_:function(){return[]},getClass:function(){return He}}),e(We.prototype,{next:function(){return null===this.currNode?(this.currNode=this.nextNode,this.currSegIndex=this.currNode.segmentIndex,this.readNextNode(),this.currNode):null===this.nextNode?null:this.nextNode.segmentIndex===this.currNode.segmentIndex?(this.currNode=this.nextNode,this.currSegIndex=this.currNode.segmentIndex,this.readNextNode(),this.currNode):(this.nextNode.segmentIndex>this.currNode.segmentIndex,null)},remove:function(){throw new UnsupportedOperationException(this.getClass().getName())},hasNext:function(){return null!==this.nextNode},readNextNode:function(){this.nodeIt.hasNext()?this.nextNode=this.nodeIt.next():this.nextNode=null},interfaces_:function(){return[p]},getClass:function(){return We}}),e(je.prototype,{addIntersection:function(t,e){},interfaces_:function(){return[be]},getClass:function(){return je}}),e(Ke.prototype,{getCoordinates:function(){return this.pts},size:function(){return this.pts.length},getCoordinate:function(t){return this.pts[t]},isClosed:function(){return this.pts[0].equals(this.pts[this.pts.length-1])},getSegmentOctant:function(t){return t===this.pts.length-1?-1:this.safeOctant(this.getCoordinate(t),this.getCoordinate(t+1))},setData:function(t){this.data=t},safeOctant:function(t,e){return t.equals2D(e)?0:Pe.octant(t,e)},getData:function(){return this.data},addIntersection:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];this.addIntersectionNode(t,e)}else if(4===arguments.length){var n=arguments[0],i=arguments[1],r=(arguments[2],arguments[3]),s=new g(n.getIntersection(r));this.addIntersection(s,i)}},toString:function(){return se.toLineString(new Gt(this.pts))},getNodeList:function(){return this.nodeList},addIntersectionNode:function(t,e){var n=e,i=n+1;if(i<this.pts.length){var r=this.pts[i];t.equals2D(r)&&(n=i)}var s=this.nodeList.add(t,n);return s},addIntersections:function(t,e,n){for(var i=0;i<t.getIntersectionNum();i++)this.addIntersection(t,e,n,i)},interfaces_:function(){return[je]},getClass:function(){return Ke}}),Ke.getNodedSubstrings=function(){if(1===arguments.length){var t=arguments[0],e=new I;return Ke.getNodedSubstrings(t,e),e}if(2===arguments.length)for(var n=arguments[0],i=arguments[1],r=n.iterator();r.hasNext();){var s=r.next();s.getNodeList().addSplitEdges(i)}},e(Ze.prototype,{overlap:function(){if(2===arguments.length){arguments[0],arguments[1]}else if(4===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];t.getLineSegment(e,this.overlapSeg1),n.getLineSegment(i,this.overlapSeg2),this.overlap(this.overlapSeg1,this.overlapSeg2)}},interfaces_:function(){return[]},getClass:function(){return Ze}}),e(Qe.prototype,{getLineSegment:function(t,e){e.p0=this.pts[t],e.p1=this.pts[t+1]},computeSelect:function(t,e,n,i){var r=this.pts[e],s=this.pts[n];if(i.tempEnv1.init(r,s),n-e===1)return i.select(this,e),null;if(!t.intersects(i.tempEnv1))return null;var o=Math.trunc((e+n)/2);
o>e&&this.computeSelect(t,e,o,i),n>o&&this.computeSelect(t,o,n,i)},getCoordinates:function(){for(var t=new Array(this.end-this.start+1).fill(null),e=0,n=this.start;n<=this.end;n++)t[e++]=this.pts[n];return t},computeOverlaps:function(t,e){this.computeOverlapsInternal(this.start,this.end,t,t.start,t.end,e)},setId:function(t){this.id=t},select:function(t,e){this.computeSelect(t,this.start,this.end,e)},getEnvelope:function(){if(null===this.env){var t=this.pts[this.start],e=this.pts[this.end];this.env=new C(t,e)}return this.env},getEndIndex:function(){return this.end},getStartIndex:function(){return this.start},getContext:function(){return this.context},getId:function(){return this.id},computeOverlapsInternal:function(t,e,n,i,r,s){var o=this.pts[t],a=this.pts[e],u=n.pts[i],l=n.pts[r];if(e-t===1&&r-i===1)return s.overlap(this,t,n,i),null;if(s.tempEnv1.init(o,a),s.tempEnv2.init(u,l),!s.tempEnv1.intersects(s.tempEnv2))return null;var h=Math.trunc((t+e)/2),c=Math.trunc((i+r)/2);h>t&&(c>i&&this.computeOverlapsInternal(t,h,n,i,c,s),r>c&&this.computeOverlapsInternal(t,h,n,c,r,s)),e>h&&(c>i&&this.computeOverlapsInternal(h,e,n,i,c,s),r>c&&this.computeOverlapsInternal(h,e,n,c,r,s))},interfaces_:function(){return[]},getClass:function(){return Qe}}),e(Je.prototype,{interfaces_:function(){return[]},getClass:function(){return Je}}),Je.isNorthern=function(t){return t===Je.NE||t===Je.NW},Je.isOpposite=function(t,e){if(t===e)return!1;var n=(t-e+4)%4;return 2===n},Je.commonHalfPlane=function(t,e){if(t===e)return t;var n=(t-e+4)%4;if(2===n)return-1;var i=e>t?t:e,r=t>e?t:e;return 0===i&&3===r?3:i},Je.isInHalfPlane=function(t,e){return e===Je.SE?t===Je.SE||t===Je.SW:t===e||t===e+1},Je.quadrant=function(){if("number"==typeof arguments[0]&&"number"==typeof arguments[1]){var t=arguments[0],e=arguments[1];if(0===t&&0===e)throw new i("Cannot compute the quadrant for point ( "+t+", "+e+" )");return t>=0?e>=0?Je.NE:Je.SE:e>=0?Je.NW:Je.SW}if(arguments[0]instanceof g&&arguments[1]instanceof g){var n=arguments[0],r=arguments[1];if(r.x===n.x&&r.y===n.y)throw new i("Cannot compute the quadrant for two identical points "+n);return r.x>=n.x?r.y>=n.y?Je.NE:Je.SE:r.y>=n.y?Je.NW:Je.SW}},Je.NE=0,Je.NW=1,Je.SW=2,Je.SE=3,e($e.prototype,{interfaces_:function(){return[]},getClass:function(){return $e}}),$e.getChainStartIndices=function(t){var e=0,n=new I;n.add(new b(e));do{var i=$e.findChainEnd(t,e);n.add(new b(i)),e=i}while(e<t.length-1);var r=$e.toIntArray(n);return r},$e.findChainEnd=function(t,e){for(var n=e;n<t.length-1&&t[n].equals2D(t[n+1]);)n++;if(n>=t.length-1)return t.length-1;for(var i=Je.quadrant(t[n],t[n+1]),r=e+1;r<t.length;){if(!t[r-1].equals2D(t[r])){var s=Je.quadrant(t[r-1],t[r]);if(s!==i)break}r++}return r-1},$e.getChains=function(){if(1===arguments.length){var t=arguments[0];return $e.getChains(t,null)}if(2===arguments.length){for(var e=arguments[0],n=arguments[1],i=new I,r=$e.getChainStartIndices(e),s=0;s<r.length-1;s++){var o=new Qe(e,r[s],r[s+1],n);i.add(o)}return i}},$e.toIntArray=function(t){for(var e=new Array(t.size()).fill(null),n=0;n<e.length;n++)e[n]=t.get(n).intValue();return e},e(tn.prototype,{computeNodes:function(t){},getNodedSubstrings:function(){},interfaces_:function(){return[]},getClass:function(){return tn}}),e(en.prototype,{setSegmentIntersector:function(t){this.segInt=t},interfaces_:function(){return[tn]},getClass:function(){return en}}),h(nn,en),e(nn.prototype,{getMonotoneChains:function(){return this.monoChains},getNodedSubstrings:function(){return Ke.getNodedSubstrings(this.nodedSegStrings)},getIndex:function(){return this.index},add:function(t){for(var e=$e.getChains(t.getCoordinates(),t),n=e.iterator();n.hasNext();){var i=n.next();i.setId(this.idCounter++),this.index.insert(i.getEnvelope(),i),this.monoChains.add(i)}},computeNodes:function(t){this.nodedSegStrings=t;for(var e=t.iterator();e.hasNext();)this.add(e.next());this.intersectChains()},intersectChains:function(){for(var t=new rn(this.segInt),e=this.monoChains.iterator();e.hasNext();)for(var n=e.next(),i=this.index.query(n.getEnvelope()),r=i.iterator();r.hasNext();){var s=r.next();if(s.getId()>n.getId()&&(n.computeOverlaps(s,t),this.nOverlaps++),this.segInt.isDone())return null}},interfaces_:function(){return[]},getClass:function(){return nn}}),h(rn,Ze),e(rn.prototype,{overlap:function(){if(4!==arguments.length)return Ze.prototype.overlap.apply(this,arguments);var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3],r=t.getContext(),s=n.getContext();this.si.processIntersections(r,e,s,i)},interfaces_:function(){return[]},getClass:function(){return rn}}),nn.SegmentOverlapAction=rn,h(sn,l),e(sn.prototype,{getCoordinate:function(){return this.pt},interfaces_:function(){return[]},getClass:function(){return sn}}),sn.msgWithCoord=function(t,e){return null!==e?t+" [ "+e+" ]":t},e(on.prototype,{processIntersections:function(t,e,n,i){},isDone:function(){},interfaces_:function(){return[]},getClass:function(){return on}}),e(an.prototype,{getInteriorIntersection:function(){return this.interiorIntersection},setCheckEndSegmentsOnly:function(t){this.isCheckEndSegmentsOnly=t},getIntersectionSegments:function(){return this.intSegments},count:function(){return this.intersectionCount},getIntersections:function(){return this.intersections},setFindAllIntersections:function(t){this.findAllIntersections=t},setKeepIntersections:function(t){this.keepIntersections=t},processIntersections:function(t,e,n,i){if(!this.findAllIntersections&&this.hasIntersection())return null;if(t===n&&e===i)return null;if(this.isCheckEndSegmentsOnly){var r=this.isEndSegment(t,e)||this.isEndSegment(n,i);if(!r)return null}var s=t.getCoordinates()[e],o=t.getCoordinates()[e+1],a=n.getCoordinates()[i],u=n.getCoordinates()[i+1];this.li.computeIntersection(s,o,a,u),this.li.hasIntersection()&&this.li.isInteriorIntersection()&&(this.intSegments=new Array(4).fill(null),this.intSegments[0]=s,this.intSegments[1]=o,this.intSegments[2]=a,this.intSegments[3]=u,this.interiorIntersection=this.li.getIntersection(0),this.keepIntersections&&this.intersections.add(this.interiorIntersection),this.intersectionCount++)},isEndSegment:function(t,e){return 0===e?!0:e>=t.size()-2},hasIntersection:function(){return null!==this.interiorIntersection},isDone:function(){return this.findAllIntersections?!1:null!==this.interiorIntersection},interfaces_:function(){return[on]},getClass:function(){return an}}),an.createAllIntersectionsFinder=function(t){var e=new an(t);return e.setFindAllIntersections(!0),e},an.createAnyIntersectionFinder=function(t){return new an(t)},an.createIntersectionCounter=function(t){var e=new an(t);return e.setFindAllIntersections(!0),e.setKeepIntersections(!1),e},e(un.prototype,{execute:function(){return null!==this.segInt?null:void this.checkInteriorIntersections()},getIntersections:function(){return this.segInt.getIntersections()},isValid:function(){return this.execute(),this._isValid},setFindAllIntersections:function(t){this.findAllIntersections=t},checkInteriorIntersections:function(){this._isValid=!0,this.segInt=new an(this.li),this.segInt.setFindAllIntersections(this.findAllIntersections);var t=new nn;return t.setSegmentIntersector(this.segInt),t.computeNodes(this.segStrings),this.segInt.hasIntersection()?(this._isValid=!1,null):void 0},checkValid:function(){if(this.execute(),!this._isValid)throw new sn(this.getErrorMessage(),this.segInt.getInteriorIntersection())},getErrorMessage:function(){if(this._isValid)return"no intersections found";var t=this.segInt.getIntersectionSegments();return"found non-noded intersection between "+se.toLineString(t[0],t[1])+" and "+se.toLineString(t[2],t[3])},interfaces_:function(){return[]},getClass:function(){return un}}),un.computeIntersections=function(t){var e=new un(t);return e.setFindAllIntersections(!0),e.isValid(),e.getIntersections()},e(ln.prototype,{checkValid:function(){this.nv.checkValid()},interfaces_:function(){return[]},getClass:function(){return ln}}),ln.toSegmentStrings=function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();e.add(new Oe(i.getCoordinates(),i))}return e},ln.checkValid=function(t){var e=new ln(t);e.checkValid()},e(hn.prototype,{map:function(t){for(var e=new I,n=0;n<t.getNumGeometries();n++){var i=this.mapOp.map(t.getGeometryN(n));i.isEmpty()||e.add(i)}return t.getFactory().createGeometryCollection(ie.toGeometryArray(e))},interfaces_:function(){return[]},getClass:function(){return hn}}),hn.map=function(t,e){var n=new hn(e);return n.map(t)},e(cn.prototype,{interfaces_:function(){return[]},getClass:function(){return cn}}),cn.opposite=function(t){return t===cn.LEFT?cn.RIGHT:t===cn.RIGHT?cn.LEFT:t},cn.ON=0,cn.LEFT=1,cn.RIGHT=2,e(fn.prototype,{setAllLocations:function(t){for(var e=0;e<this.location.length;e++)this.location[e]=t},isNull:function(){for(var t=0;t<this.location.length;t++)if(this.location[t]!==L.NONE)return!1;return!0},setAllLocationsIfNull:function(t){for(var e=0;e<this.location.length;e++)this.location[e]===L.NONE&&(this.location[e]=t)},isLine:function(){return 1===this.location.length},merge:function(t){if(t.location.length>this.location.length){var e=new Array(3).fill(null);e[cn.ON]=this.location[cn.ON],e[cn.LEFT]=L.NONE,e[cn.RIGHT]=L.NONE,this.location=e}for(var n=0;n<this.location.length;n++)this.location[n]===L.NONE&&n<t.location.length&&(this.location[n]=t.location[n])},getLocations:function(){return this.location},flip:function(){if(this.location.length<=1)return null;var t=this.location[cn.LEFT];this.location[cn.LEFT]=this.location[cn.RIGHT],this.location[cn.RIGHT]=t},toString:function(){var t=new P;return this.location.length>1&&t.append(L.toLocationSymbol(this.location[cn.LEFT])),t.append(L.toLocationSymbol(this.location[cn.ON])),this.location.length>1&&t.append(L.toLocationSymbol(this.location[cn.RIGHT])),t.toString()},setLocations:function(t,e,n){this.location[cn.ON]=t,this.location[cn.LEFT]=e,this.location[cn.RIGHT]=n},get:function(t){return t<this.location.length?this.location[t]:L.NONE},isArea:function(){return this.location.length>1},isAnyNull:function(){for(var t=0;t<this.location.length;t++)if(this.location[t]===L.NONE)return!0;return!1},setLocation:function(){if(1===arguments.length){var t=arguments[0];this.setLocation(cn.ON,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.location[e]=n}},init:function(t){this.location=new Array(t).fill(null),this.setAllLocations(L.NONE)},isEqualOnSide:function(t,e){return this.location[e]===t.location[e]},allPositionsEqual:function(t){for(var e=0;e<this.location.length;e++)if(this.location[e]!==t)return!1;return!0},interfaces_:function(){return[]},getClass:function(){return fn}}),e(gn.prototype,{getGeometryCount:function(){var t=0;return this.elt[0].isNull()||t++,this.elt[1].isNull()||t++,t},setAllLocations:function(t,e){this.elt[t].setAllLocations(e)},isNull:function(t){return this.elt[t].isNull()},setAllLocationsIfNull:function(){if(1===arguments.length){var t=arguments[0];this.setAllLocationsIfNull(0,t),this.setAllLocationsIfNull(1,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1];this.elt[e].setAllLocationsIfNull(n)}},isLine:function(t){return this.elt[t].isLine()},merge:function(t){for(var e=0;2>e;e++)null===this.elt[e]&&null!==t.elt[e]?this.elt[e]=new fn(t.elt[e]):this.elt[e].merge(t.elt[e])},flip:function(){this.elt[0].flip(),this.elt[1].flip()},getLocation:function(){if(1===arguments.length){var t=arguments[0];return this.elt[t].get(cn.ON)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return this.elt[e].get(n)}},toString:function(){var t=new P;return null!==this.elt[0]&&(t.append("A:"),t.append(this.elt[0].toString())),null!==this.elt[1]&&(t.append(" B:"),t.append(this.elt[1].toString())),t.toString()},isArea:function(){if(0===arguments.length)return this.elt[0].isArea()||this.elt[1].isArea();if(1===arguments.length){var t=arguments[0];return this.elt[t].isArea()}},isAnyNull:function(t){return this.elt[t].isAnyNull()},setLocation:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];this.elt[t].setLocation(cn.ON,e)}else if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];this.elt[n].setLocation(i,r)}},isEqualOnSide:function(t,e){return this.elt[0].isEqualOnSide(t.elt[0],e)&&this.elt[1].isEqualOnSide(t.elt[1],e)},allPositionsEqual:function(t,e){return this.elt[t].allPositionsEqual(e)},toLine:function(t){this.elt[t].isArea()&&(this.elt[t]=new fn(this.elt[t].location[0]))},interfaces_:function(){return[]},getClass:function(){return gn}}),gn.toLineLabel=function(t){for(var e=new gn(L.NONE),n=0;2>n;n++)e.setLocation(n,t.getLocation(n));return e},e(dn.prototype,{computeRing:function(){if(null!==this.ring)return null;for(var t=new Array(this.pts.size()).fill(null),e=0;e<this.pts.size();e++)t[e]=this.pts.get(e);this.ring=this.geometryFactory.createLinearRing(t),this._isHole=he.isCCW(this.ring.getCoordinates())},isIsolated:function(){return 1===this.label.getGeometryCount()},computePoints:function(t){this.startDe=t;var e=t,n=!0;do{if(null===e)throw new sn("Found null DirectedEdge");if(e.getEdgeRing()===this)throw new sn("Directed Edge visited twice during ring-building at "+e.getCoordinate());this.edges.add(e);var i=e.getLabel();f.isTrue(i.isArea()),this.mergeLabel(i),this.addPoints(e.getEdge(),e.isForward(),n),n=!1,this.setEdgeRing(e,this),e=this.getNext(e)}while(e!==this.startDe)},getLinearRing:function(){return this.ring},getCoordinate:function(t){return this.pts.get(t)},computeMaxNodeDegree:function(){this.maxNodeDegree=0;var t=this.startDe;do{var e=t.getNode(),n=e.getEdges().getOutgoingDegree(this);n>this.maxNodeDegree&&(this.maxNodeDegree=n),t=this.getNext(t)}while(t!==this.startDe);this.maxNodeDegree*=2},addPoints:function(t,e,n){var i=t.getCoordinates();if(e){var r=1;n&&(r=0);for(var s=r;s<i.length;s++)this.pts.add(i[s])}else{var r=i.length-2;n&&(r=i.length-1);for(var s=r;s>=0;s--)this.pts.add(i[s])}},isHole:function(){return this._isHole},setInResult:function(){var t=this.startDe;do t.getEdge().setInResult(!0),t=t.getNext();while(t!==this.startDe)},containsPoint:function(t){var e=this.getLinearRing(),n=e.getEnvelopeInternal();if(!n.contains(t))return!1;if(!he.isPointInRing(t,e.getCoordinates()))return!1;for(var i=this.holes.iterator();i.hasNext();){var r=i.next();if(r.containsPoint(t))return!1}return!0},addHole:function(t){this.holes.add(t)},isShell:function(){return null===this.shell},getLabel:function(){return this.label},getEdges:function(){return this.edges},getMaxNodeDegree:function(){return this.maxNodeDegree<0&&this.computeMaxNodeDegree(),this.maxNodeDegree},getShell:function(){return this.shell},mergeLabel:function(){if(1===arguments.length){var t=arguments[0];this.mergeLabel(t,0),this.mergeLabel(t,1)}else if(2===arguments.length){var e=arguments[0],n=arguments[1],i=e.getLocation(n,cn.RIGHT);if(i===L.NONE)return null;if(this.label.getLocation(n)===L.NONE)return this.label.setLocation(n,i),null}},setShell:function(t){this.shell=t,null!==t&&t.addHole(this)},toPolygon:function(t){for(var e=new Array(this.holes.size()).fill(null),n=0;n<this.holes.size();n++)e[n]=this.holes.get(n).getLinearRing();var i=t.createPolygon(this.getLinearRing(),e);return i},interfaces_:function(){return[]},getClass:function(){return dn}}),h(pn,dn),e(pn.prototype,{setEdgeRing:function(t,e){t.setMinEdgeRing(e)},getNext:function(t){return t.getNextMin()},interfaces_:function(){return[]},getClass:function(){return pn}}),h(vn,dn),e(vn.prototype,{buildMinimalRings:function(){var t=new I,e=this.startDe;do{if(null===e.getMinEdgeRing()){var n=new pn(e,this.geometryFactory);t.add(n)}e=e.getNext()}while(e!==this.startDe);return t},setEdgeRing:function(t,e){t.setEdgeRing(e)},linkDirectedEdgesForMinimalEdgeRings:function(){var t=this.startDe;do{var e=t.getNode();e.getEdges().linkMinimalDirectedEdges(this),t=t.getNext()}while(t!==this.startDe)},getNext:function(t){return t.getNext()},interfaces_:function(){return[]},getClass:function(){return vn}}),e(mn.prototype,{setVisited:function(t){this._isVisited=t},setInResult:function(t){this._isInResult=t},isCovered:function(){return this._isCovered},isCoveredSet:function(){return this._isCoveredSet},setLabel:function(t){this.label=t},getLabel:function(){return this.label},setCovered:function(t){this._isCovered=t,this._isCoveredSet=!0},updateIM:function(t){f.isTrue(this.label.getGeometryCount()>=2,"found partial label"),this.computeIM(t)},isInResult:function(){return this._isInResult},isVisited:function(){return this._isVisited},interfaces_:function(){return[]},getClass:function(){return mn}}),h(yn,mn),e(yn.prototype,{isIncidentEdgeInResult:function(){for(var t=this.getEdges().getEdges().iterator();t.hasNext();){var e=t.next();if(e.getEdge().isInResult())return!0}return!1},isIsolated:function(){return 1===this.label.getGeometryCount()},getCoordinate:function(){return this.coord},print:function(t){t.println("node "+this.coord+" lbl: "+this.label)},computeIM:function(t){},computeMergedLocation:function(t,e){var n=L.NONE;if(n=this.label.getLocation(e),!t.isNull(e)){var i=t.getLocation(e);n!==L.BOUNDARY&&(n=i)}return n},setLabel:function(){if(2!==arguments.length)return mn.prototype.setLabel.apply(this,arguments);var t=arguments[0],e=arguments[1];null===this.label?this.label=new gn(t,e):this.label.setLocation(t,e)},getEdges:function(){return this.edges},mergeLabel:function(){if(arguments[0]instanceof yn){var t=arguments[0];this.mergeLabel(t.label)}else if(arguments[0]instanceof gn)for(var e=arguments[0],n=0;2>n;n++){var i=this.computeMergedLocation(e,n),r=this.label.getLocation(n);r===L.NONE&&this.label.setLocation(n,i)}},add:function(t){this.edges.insert(t),t.setNode(this)},setLabelBoundary:function(t){if(null===this.label)return null;var e=L.NONE;null!==this.label&&(e=this.label.getLocation(t));var n=null;switch(e){case L.BOUNDARY:n=L.INTERIOR;break;case L.INTERIOR:n=L.BOUNDARY;break;default:n=L.BOUNDARY}this.label.setLocation(t,n)},interfaces_:function(){return[]},getClass:function(){return yn}}),e(xn.prototype,{find:function(t){return this.nodeMap.get(t)},addNode:function(){if(arguments[0]instanceof g){var t=arguments[0],e=this.nodeMap.get(t);return null===e&&(e=this.nodeFact.createNode(t),this.nodeMap.put(t,e)),e}if(arguments[0]instanceof yn){var n=arguments[0],e=this.nodeMap.get(n.getCoordinate());return null===e?(this.nodeMap.put(n.getCoordinate(),n),n):(e.mergeLabel(n),e)}},print:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t)}},iterator:function(){return this.nodeMap.values().iterator()},values:function(){return this.nodeMap.values()},getBoundaryNodes:function(t){for(var e=new I,n=this.iterator();n.hasNext();){var i=n.next();i.getLabel().getLocation(t)===L.BOUNDARY&&e.add(i)}return e},add:function(t){var e=t.getCoordinate(),n=this.addNode(e);n.add(t)},interfaces_:function(){return[]},getClass:function(){return xn}}),e(En.prototype,{compareDirection:function(t){return this.dx===t.dx&&this.dy===t.dy?0:this.quadrant>t.quadrant?1:this.quadrant<t.quadrant?-1:he.computeOrientation(t.p0,t.p1,this.p1)},getDy:function(){return this.dy},getCoordinate:function(){return this.p0},setNode:function(t){this.node=t},print:function(t){var e=Math.atan2(this.dy,this.dx),n=this.getClass().getName(),i=n.lastIndexOf("."),r=n.substring(i+1);t.print("  "+r+": "+this.p0+" - "+this.p1+" "+this.quadrant+":"+e+"   "+this.label)},compareTo:function(t){var e=t;return this.compareDirection(e)},getDirectedCoordinate:function(){return this.p1},getDx:function(){return this.dx},getLabel:function(){return this.label},getEdge:function(){return this.edge},getQuadrant:function(){return this.quadrant},getNode:function(){return this.node},toString:function(){var t=Math.atan2(this.dy,this.dx),e=this.getClass().getName(),n=e.lastIndexOf("."),i=e.substring(n+1);return"  "+i+": "+this.p0+" - "+this.p1+" "+this.quadrant+":"+t+"   "+this.label},computeLabel:function(t){},init:function(t,e){this.p0=t,this.p1=e,this.dx=e.x-t.x,this.dy=e.y-t.y,this.quadrant=Je.quadrant(this.dx,this.dy),f.isTrue(!(0===this.dx&&0===this.dy),"EdgeEnd with identical endpoints found")},interfaces_:function(){return[s]},getClass:function(){return En}}),h(In,En),e(In.prototype,{getNextMin:function(){return this.nextMin},getDepth:function(t){return this.depth[t]},setVisited:function(t){this._isVisited=t},computeDirectedLabel:function(){this.label=new gn(this.edge.getLabel()),this._isForward||this.label.flip()},getNext:function(){return this.next},setDepth:function(t,e){if(-999!==this.depth[t]&&this.depth[t]!==e)throw new sn("assigned depths do not match",this.getCoordinate());this.depth[t]=e},isInteriorAreaEdge:function t(){for(var t=!0,e=0;2>e;e++)this.label.isArea(e)&&this.label.getLocation(e,cn.LEFT)===L.INTERIOR&&this.label.getLocation(e,cn.RIGHT)===L.INTERIOR||(t=!1);return t},setNextMin:function(t){this.nextMin=t},print:function(t){En.prototype.print.call(this,t),t.print(" "+this.depth[cn.LEFT]+"/"+this.depth[cn.RIGHT]),t.print(" ("+this.getDepthDelta()+")"),this._isInResult&&t.print(" inResult")},setMinEdgeRing:function(t){this.minEdgeRing=t},isLineEdge:function(){var t=this.label.isLine(0)||this.label.isLine(1),e=!this.label.isArea(0)||this.label.allPositionsEqual(0,L.EXTERIOR),n=!this.label.isArea(1)||this.label.allPositionsEqual(1,L.EXTERIOR);return t&&e&&n},setEdgeRing:function(t){this.edgeRing=t},getMinEdgeRing:function(){return this.minEdgeRing},getDepthDelta:function(){var t=this.edge.getDepthDelta();return this._isForward||(t=-t),t},setInResult:function(t){this._isInResult=t},getSym:function(){return this.sym},isForward:function(){return this._isForward},getEdge:function(){return this.edge},printEdge:function(t){this.print(t),t.print(" "),this._isForward?this.edge.print(t):this.edge.printReverse(t)},setSym:function(t){this.sym=t},setVisitedEdge:function(t){this.setVisited(t),this.sym.setVisited(t)},setEdgeDepths:function(t,e){var n=this.getEdge().getDepthDelta();this._isForward||(n=-n);var i=1;t===cn.LEFT&&(i=-1);var r=cn.opposite(t),s=n*i,o=e+s;this.setDepth(t,e),this.setDepth(r,o)},getEdgeRing:function(){return this.edgeRing},isInResult:function(){return this._isInResult},setNext:function(t){this.next=t},isVisited:function(){return this._isVisited},interfaces_:function(){return[]},getClass:function(){return In}}),In.depthFactor=function(t,e){return t===L.EXTERIOR&&e===L.INTERIOR?1:t===L.INTERIOR&&e===L.EXTERIOR?-1:0},e(Nn.prototype,{createNode:function(t){return new yn(t,null)},interfaces_:function(){return[]},getClass:function(){return Nn}}),e(Cn.prototype,{printEdges:function(t){t.println("Edges:");for(var e=0;e<this.edges.size();e++){t.println("edge "+e+":");var n=this.edges.get(e);n.print(t),n.eiList.print(t)}},find:function(t){return this.nodes.find(t)},addNode:function(){if(arguments[0]instanceof yn){var t=arguments[0];return this.nodes.addNode(t)}if(arguments[0]instanceof g){var e=arguments[0];return this.nodes.addNode(e)}},getNodeIterator:function(){return this.nodes.iterator()},linkResultDirectedEdges:function(){for(var t=this.nodes.iterator();t.hasNext();){var e=t.next();e.getEdges().linkResultDirectedEdges()}},debugPrintln:function(t){A.out.println(t)},isBoundaryNode:function(t,e){var n=this.nodes.find(e);if(null===n)return!1;var i=n.getLabel();return null!==i&&i.getLocation(t)===L.BOUNDARY},linkAllDirectedEdges:function(){for(var t=this.nodes.iterator();t.hasNext();){var e=t.next();e.getEdges().linkAllDirectedEdges()}},matchInSameDirection:function(t,e,n,i){return t.equals(n)?he.computeOrientation(t,e,i)===he.COLLINEAR&&Je.quadrant(t,e)===Je.quadrant(n,i):!1},getEdgeEnds:function(){return this.edgeEndList},debugPrint:function(t){A.out.print(t)},getEdgeIterator:function(){return this.edges.iterator()},findEdgeInSameDirection:function(t,e){for(var n=0;n<this.edges.size();n++){var i=this.edges.get(n),r=i.getCoordinates();if(this.matchInSameDirection(t,e,r[0],r[1]))return i;if(this.matchInSameDirection(t,e,r[r.length-1],r[r.length-2]))return i}return null},insertEdge:function(t){this.edges.add(t)},findEdgeEnd:function(t){for(var e=this.getEdgeEnds().iterator();e.hasNext();){var n=e.next();if(n.getEdge()===t)return n}return null},addEdges:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.edges.add(n);var i=new In(n,!0),r=new In(n,!1);i.setSym(r),r.setSym(i),this.add(i),this.add(r)}},add:function(t){this.nodes.add(t),this.edgeEndList.add(t)},getNodes:function(){return this.nodes.values()},findEdge:function(t,e){for(var n=0;n<this.edges.size();n++){var i=this.edges.get(n),r=i.getCoordinates();if(t.equals(r[0])&&e.equals(r[1]))return i}return null},interfaces_:function(){return[]},getClass:function(){return Cn}}),Cn.linkResultDirectedEdges=function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();n.getEdges().linkResultDirectedEdges()}},e(Sn.prototype,{sortShellsAndHoles:function(t,e,n){for(var i=t.iterator();i.hasNext();){var r=i.next();r.isHole()?n.add(r):e.add(r)}},computePolygons:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next(),r=i.toPolygon(this.geometryFactory);e.add(r)}return e},placeFreeHoles:function(t,e){for(var n=e.iterator();n.hasNext();){var i=n.next();if(null===i.getShell()){var r=this.findEdgeRingContaining(i,t);if(null===r)throw new sn("unable to assign hole to a shell",i.getCoordinate(0));i.setShell(r)}}},buildMinimalEdgeRings:function(t,e,n){for(var i=new I,r=t.iterator();r.hasNext();){var s=r.next();if(s.getMaxNodeDegree()>2){s.linkDirectedEdgesForMinimalEdgeRings();var o=s.buildMinimalRings(),a=this.findShell(o);null!==a?(this.placePolygonHoles(a,o),e.add(a)):n.addAll(o)}else i.add(s)}return i},containsPoint:function(t){for(var e=this.shellList.iterator();e.hasNext();){var n=e.next();if(n.containsPoint(t))return!0}return!1},buildMaximalEdgeRings:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();if(i.isInResult()&&i.getLabel().isArea()&&null===i.getEdgeRing()){var r=new vn(i,this.geometryFactory);e.add(r),r.setInResult()}}return e},placePolygonHoles:function(t,e){for(var n=e.iterator();n.hasNext();){var i=n.next();i.isHole()&&i.setShell(t)}},getPolygons:function(){var t=this.computePolygons(this.shellList);return t},findEdgeRingContaining:function(t,e){for(var n=t.getLinearRing(),i=n.getEnvelopeInternal(),r=n.getCoordinateN(0),s=null,o=null,a=e.iterator();a.hasNext();){var u=a.next(),l=u.getLinearRing(),h=l.getEnvelopeInternal();null!==s&&(o=s.getLinearRing().getEnvelopeInternal());var c=!1;h.contains(i)&&he.isPointInRing(r,l.getCoordinates())&&(c=!0),c&&(null===s||o.contains(h))&&(s=u)}return s},findShell:function(t){for(var e=0,n=null,i=t.iterator();i.hasNext();){var r=i.next();r.isHole()||(n=r,e++)}return f.isTrue(1>=e,"found two shells in MinimalEdgeRing list"),n},add:function(){if(1===arguments.length){var t=arguments[0];this.add(t.getEdgeEnds(),t.getNodes())}else if(2===arguments.length){var e=arguments[0],n=arguments[1];Cn.linkResultDirectedEdges(n);var i=this.buildMaximalEdgeRings(e),r=new I,s=this.buildMinimalEdgeRings(i,this.shellList,r);this.sortShellsAndHoles(s,this.shellList,r),this.placeFreeHoles(this.shellList,r)}},interfaces_:function(){return[]},getClass:function(){return Sn}}),e(wn.prototype,{collectLines:function(t){for(var e=this.op.getGraph().getEdgeEnds().iterator();e.hasNext();){var n=e.next();this.collectLineEdge(n,t,this.lineEdgesList),this.collectBoundaryTouchEdge(n,t,this.lineEdgesList)}},labelIsolatedLine:function(t,e){var n=this.ptLocator.locate(t.getCoordinate(),this.op.getArgGeometry(e));t.getLabel().setLocation(e,n)},build:function(t){return this.findCoveredLineEdges(),this.collectLines(t),this.buildLines(t),this.resultLineList},collectLineEdge:function(t,e,n){var i=t.getLabel(),r=t.getEdge();t.isLineEdge()&&(t.isVisited()||!ii.isResultOfOp(i,e)||r.isCovered()||(n.add(r),t.setVisitedEdge(!0)))},findCoveredLineEdges:function(){for(var t=this.op.getGraph().getNodes().iterator();t.hasNext();){var e=t.next();e.getEdges().findCoveredLineEdges()}for(var n=this.op.getGraph().getEdgeEnds().iterator();n.hasNext();){var i=n.next(),r=i.getEdge();if(i.isLineEdge()&&!r.isCoveredSet()){var s=this.op.isCoveredByA(i.getCoordinate());r.setCovered(s)}}},labelIsolatedLines:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),i=n.getLabel();n.isIsolated()&&(i.isNull(0)?this.labelIsolatedLine(n,0):this.labelIsolatedLine(n,1))}},buildLines:function(t){for(var e=this.lineEdgesList.iterator();e.hasNext();){var n=e.next(),i=(n.getLabel(),this.geometryFactory.createLineString(n.getCoordinates()));this.resultLineList.add(i),n.setInResult(!0)}},collectBoundaryTouchEdge:function(t,e,n){var i=t.getLabel();return t.isLineEdge()?null:t.isVisited()?null:t.isInteriorAreaEdge()?null:t.getEdge().isInResult()?null:(f.isTrue(!(t.isInResult()||t.getSym().isInResult())||!t.getEdge().isInResult()),void(ii.isResultOfOp(i,e)&&e===ii.INTERSECTION&&(n.add(t.getEdge()),t.setVisitedEdge(!0))))},interfaces_:function(){return[]},getClass:function(){return wn}}),e(Ln.prototype,{filterCoveredNodeToPoint:function(t){var e=t.getCoordinate();if(!this.op.isCoveredByLA(e)){var n=this.geometryFactory.createPoint(e);this.resultPointList.add(n)}},extractNonCoveredResultNodes:function(t){for(var e=this.op.getGraph().getNodes().iterator();e.hasNext();){var n=e.next();if(!(n.isInResult()||n.isIncidentEdgeInResult()||0!==n.getEdges().getDegree()&&t!==ii.INTERSECTION)){var i=n.getLabel();ii.isResultOfOp(i,t)&&this.filterCoveredNodeToPoint(n)}}},build:function(t){return this.extractNonCoveredResultNodes(t),this.resultPointList},interfaces_:function(){return[]},getClass:function(){return Ln}}),e(Rn.prototype,{locate:function(t){},interfaces_:function(){return[]},getClass:function(){return Rn}}),e(Tn.prototype,{locate:function(t){return Tn.locate(t,this.geom)},interfaces_:function(){return[Rn]},getClass:function(){return Tn}}),Tn.isPointInRing=function(t,e){return e.getEnvelopeInternal().intersects(t)?he.isPointInRing(t,e.getCoordinates()):!1},Tn.containsPointInPolygon=function(t,e){if(e.isEmpty())return!1;var n=e.getExteriorRing();if(!Tn.isPointInRing(t,n))return!1;for(var i=0;i<e.getNumInteriorRing();i++){var r=e.getInteriorRingN(i);if(Tn.isPointInRing(t,r))return!1}return!0},Tn.containsPoint=function(t,e){if(e instanceof Tt)return Tn.containsPointInPolygon(t,e);if(e instanceof ft)for(var n=new Re(e);n.hasNext();){var i=n.next();if(i!==e&&Tn.containsPoint(t,i))return!0}return!1},Tn.locate=function(t,e){return e.isEmpty()?L.EXTERIOR:Tn.containsPoint(t,e)?L.INTERIOR:L.EXTERIOR},e(Pn.prototype,{getNextCW:function(t){this.getEdges();var e=this.edgeList.indexOf(t),n=e-1;return 0===e&&(n=this.edgeList.size()-1),this.edgeList.get(n)},propagateSideLabels:function(t){for(var e=L.NONE,n=this.iterator();n.hasNext();){var i=n.next(),r=i.getLabel();r.isArea(t)&&r.getLocation(t,cn.LEFT)!==L.NONE&&(e=r.getLocation(t,cn.LEFT))}if(e===L.NONE)return null;for(var s=e,n=this.iterator();n.hasNext();){var i=n.next(),r=i.getLabel();if(r.getLocation(t,cn.ON)===L.NONE&&r.setLocation(t,cn.ON,s),r.isArea(t)){var o=r.getLocation(t,cn.LEFT),a=r.getLocation(t,cn.RIGHT);if(a!==L.NONE){if(a!==s)throw new sn("side location conflict",i.getCoordinate());o===L.NONE&&f.shouldNeverReachHere("found single null side (at "+i.getCoordinate()+")"),s=o}else f.isTrue(r.getLocation(t,cn.LEFT)===L.NONE,"found single null side"),r.setLocation(t,cn.RIGHT,s),r.setLocation(t,cn.LEFT,s)}}},getCoordinate:function(){var t=this.iterator();if(!t.hasNext())return null;var e=t.next();return e.getCoordinate()},print:function(t){A.out.println("EdgeEndStar:   "+this.getCoordinate());for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t)}},isAreaLabelsConsistent:function(t){return this.computeEdgeEndLabels(t.getBoundaryNodeRule()),this.checkAreaLabelsConsistent(0)},checkAreaLabelsConsistent:function(t){var e=this.getEdges();if(e.size()<=0)return!0;var n=e.size()-1,i=e.get(n).getLabel(),r=i.getLocation(t,cn.LEFT);f.isTrue(r!==L.NONE,"Found unlabelled area edge");for(var s=r,o=this.iterator();o.hasNext();){var a=o.next(),u=a.getLabel();
f.isTrue(u.isArea(t),"Found non-area edge");var l=u.getLocation(t,cn.LEFT),h=u.getLocation(t,cn.RIGHT);if(l===h)return!1;if(h!==s)return!1;s=l}return!0},findIndex:function(t){this.iterator();for(var e=0;e<this.edgeList.size();e++){var n=this.edgeList.get(e);if(n===t)return e}return-1},iterator:function(){return this.getEdges().iterator()},getEdges:function(){return null===this.edgeList&&(this.edgeList=new I(this.edgeMap.values())),this.edgeList},getLocation:function(t,e,n){return this.ptInAreaLocation[t]===L.NONE&&(this.ptInAreaLocation[t]=Tn.locate(e,n[t].getGeometry())),this.ptInAreaLocation[t]},toString:function(){var t=new P;t.append("EdgeEndStar:   "+this.getCoordinate()),t.append("\n");for(var e=this.iterator();e.hasNext();){var n=e.next();t.append(n),t.append("\n")}return t.toString()},computeEdgeEndLabels:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next();n.computeLabel(t)}},computeLabelling:function(t){this.computeEdgeEndLabels(t[0].getBoundaryNodeRule()),this.propagateSideLabels(0),this.propagateSideLabels(1);for(var e=[!1,!1],n=this.iterator();n.hasNext();)for(var i=n.next(),r=i.getLabel(),s=0;2>s;s++)r.isLine(s)&&r.getLocation(s)===L.BOUNDARY&&(e[s]=!0);for(var n=this.iterator();n.hasNext();)for(var i=n.next(),r=i.getLabel(),s=0;2>s;s++)if(r.isAnyNull(s)){var o=L.NONE;if(e[s])o=L.EXTERIOR;else{var a=i.getCoordinate();o=this.getLocation(s,a,t)}r.setAllLocationsIfNull(s,o)}},getDegree:function(){return this.edgeMap.size()},insertEdgeEnd:function(t,e){this.edgeMap.put(t,e),this.edgeList=null},interfaces_:function(){return[]},getClass:function(){return Pn}}),h(bn,Pn),e(bn.prototype,{linkResultDirectedEdges:function(){this.getResultAreaEdges();for(var t=null,e=null,n=this.SCANNING_FOR_INCOMING,i=0;i<this.resultAreaEdgeList.size();i++){var r=this.resultAreaEdgeList.get(i),s=r.getSym();if(r.getLabel().isArea())switch(null===t&&r.isInResult()&&(t=r),n){case this.SCANNING_FOR_INCOMING:if(!s.isInResult())continue;e=s,n=this.LINKING_TO_OUTGOING;break;case this.LINKING_TO_OUTGOING:if(!r.isInResult())continue;e.setNext(r),n=this.SCANNING_FOR_INCOMING}}if(n===this.LINKING_TO_OUTGOING){if(null===t)throw new sn("no outgoing dirEdge found",this.getCoordinate());f.isTrue(t.isInResult(),"unable to link last incoming dirEdge"),e.setNext(t)}},insert:function(t){var e=t;this.insertEdgeEnd(e,e)},getRightmostEdge:function(){var t=this.getEdges(),e=t.size();if(1>e)return null;var n=t.get(0);if(1===e)return n;var i=t.get(e-1),r=n.getQuadrant(),s=i.getQuadrant();if(Je.isNorthern(r)&&Je.isNorthern(s))return n;if(!Je.isNorthern(r)&&!Je.isNorthern(s))return i;return 0!==n.getDy()?n:0!==i.getDy()?i:(f.shouldNeverReachHere("found two horizontal edges incident on node"),null)},print:function(t){A.out.println("DirectedEdgeStar: "+this.getCoordinate());for(var e=this.iterator();e.hasNext();){var n=e.next();t.print("out "),n.print(t),t.println(),t.print("in "),n.getSym().print(t),t.println()}},getResultAreaEdges:function(){if(null!==this.resultAreaEdgeList)return this.resultAreaEdgeList;this.resultAreaEdgeList=new I;for(var t=this.iterator();t.hasNext();){var e=t.next();(e.isInResult()||e.getSym().isInResult())&&this.resultAreaEdgeList.add(e)}return this.resultAreaEdgeList},updateLabelling:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next(),i=n.getLabel();i.setAllLocationsIfNull(0,t.getLocation(0)),i.setAllLocationsIfNull(1,t.getLocation(1))}},linkAllDirectedEdges:function(){this.getEdges();for(var t=null,e=null,n=this.edgeList.size()-1;n>=0;n--){var i=this.edgeList.get(n),r=i.getSym();null===e&&(e=r),null!==t&&r.setNext(t),t=i}e.setNext(t)},computeDepths:function(){if(1===arguments.length){var t=arguments[0],e=this.findIndex(t),n=(t.getLabel(),t.getDepth(cn.LEFT)),i=t.getDepth(cn.RIGHT),r=this.computeDepths(e+1,this.edgeList.size(),n),s=this.computeDepths(0,e,r);if(s!==i)throw new sn("depth mismatch at "+t.getCoordinate())}else if(3===arguments.length){for(var o=arguments[0],a=arguments[1],u=arguments[2],l=u,h=o;a>h;h++){var c=this.edgeList.get(h);c.getLabel();c.setEdgeDepths(cn.RIGHT,l),l=c.getDepth(cn.LEFT)}return l}},mergeSymLabels:function(){for(var t=this.iterator();t.hasNext();){var e=t.next(),n=e.getLabel();n.merge(e.getSym().getLabel())}},linkMinimalDirectedEdges:function(t){for(var e=null,n=null,i=this.SCANNING_FOR_INCOMING,r=this.resultAreaEdgeList.size()-1;r>=0;r--){var s=this.resultAreaEdgeList.get(r),o=s.getSym();switch(null===e&&s.getEdgeRing()===t&&(e=s),i){case this.SCANNING_FOR_INCOMING:if(o.getEdgeRing()!==t)continue;n=o,i=this.LINKING_TO_OUTGOING;break;case this.LINKING_TO_OUTGOING:if(s.getEdgeRing()!==t)continue;n.setNextMin(s),i=this.SCANNING_FOR_INCOMING}}i===this.LINKING_TO_OUTGOING&&(f.isTrue(null!==e,"found null for first outgoing dirEdge"),f.isTrue(e.getEdgeRing()===t,"unable to link last incoming dirEdge"),n.setNextMin(e))},getOutgoingDegree:function(){if(0===arguments.length){for(var t=0,e=this.iterator();e.hasNext();){var n=e.next();n.isInResult()&&t++}return t}if(1===arguments.length){for(var i=arguments[0],t=0,e=this.iterator();e.hasNext();){var n=e.next();n.getEdgeRing()===i&&t++}return t}},getLabel:function(){return this.label},findCoveredLineEdges:function(){for(var t=L.NONE,e=this.iterator();e.hasNext();){var n=e.next(),i=n.getSym();if(!n.isLineEdge()){if(n.isInResult()){t=L.INTERIOR;break}if(i.isInResult()){t=L.EXTERIOR;break}}}if(t===L.NONE)return null;for(var r=t,e=this.iterator();e.hasNext();){var n=e.next(),i=n.getSym();n.isLineEdge()?n.getEdge().setCovered(r===L.INTERIOR):(n.isInResult()&&(r=L.EXTERIOR),i.isInResult()&&(r=L.INTERIOR))}},computeLabelling:function(t){Pn.prototype.computeLabelling.call(this,t),this.label=new gn(L.NONE);for(var e=this.iterator();e.hasNext();)for(var n=e.next(),i=n.getEdge(),r=i.getLabel(),s=0;2>s;s++){var o=r.getLocation(s);o!==L.INTERIOR&&o!==L.BOUNDARY||this.label.setLocation(s,L.INTERIOR)}},interfaces_:function(){return[]},getClass:function(){return bn}}),h(On,Nn),e(On.prototype,{createNode:function(t){return new yn(t,new bn)},interfaces_:function(){return[]},getClass:function(){return On}}),e(_n.prototype,{computeIntersections:function(t,e){this.mce.computeIntersectsForChain(this.chainIndex,t.mce,t.chainIndex,e)},interfaces_:function(){return[]},getClass:function(){return _n}}),e(Mn.prototype,{isDelete:function(){return this.eventType===Mn.DELETE},setDeleteEventIndex:function(t){this.deleteEventIndex=t},getObject:function(){return this.obj},compareTo:function(t){var e=t;return this.xValue<e.xValue?-1:this.xValue>e.xValue?1:this.eventType<e.eventType?-1:this.eventType>e.eventType?1:0},getInsertEvent:function(){return this.insertEvent},isInsert:function(){return this.eventType===Mn.INSERT},isSameLabel:function(t){return null===this.label?!1:this.label===t.label},getDeleteEventIndex:function(){return this.deleteEventIndex},interfaces_:function(){return[s]},getClass:function(){return Mn}}),Mn.INSERT=1,Mn.DELETE=2,e(Dn.prototype,{interfaces_:function(){return[]},getClass:function(){return Dn}}),e(An.prototype,{isTrivialIntersection:function(t,e,n,i){if(t===n&&1===this.li.getIntersectionNum()){if(An.isAdjacentSegments(e,i))return!0;if(t.isClosed()){var r=t.getNumPoints()-1;if(0===e&&i===r||0===i&&e===r)return!0}}return!1},getProperIntersectionPoint:function(){return this.properIntersectionPoint},setIsDoneIfProperInt:function(t){this.isDoneWhenProperInt=t},hasProperInteriorIntersection:function(){return this.hasProperInterior},isBoundaryPointInternal:function(t,e){for(var n=e.iterator();n.hasNext();){var i=n.next(),r=i.getCoordinate();if(t.isIntersection(r))return!0}return!1},hasProperIntersection:function(){return this.hasProper},hasIntersection:function(){return this._hasIntersection},isDone:function(){return this._isDone},isBoundaryPoint:function(t,e){return null===e?!1:this.isBoundaryPointInternal(t,e[0])?!0:!!this.isBoundaryPointInternal(t,e[1])},setBoundaryNodes:function(t,e){this.bdyNodes=new Array(2).fill(null),this.bdyNodes[0]=t,this.bdyNodes[1]=e},addIntersections:function(t,e,n,i){if(t===n&&e===i)return null;this.numTests++;var r=t.getCoordinates()[e],s=t.getCoordinates()[e+1],o=n.getCoordinates()[i],a=n.getCoordinates()[i+1];this.li.computeIntersection(r,s,o,a),this.li.hasIntersection()&&(this.recordIsolated&&(t.setIsolated(!1),n.setIsolated(!1)),this.numIntersections++,this.isTrivialIntersection(t,e,n,i)||(this._hasIntersection=!0,!this.includeProper&&this.li.isProper()||(t.addIntersections(this.li,e,0),n.addIntersections(this.li,i,1)),this.li.isProper()&&(this.properIntersectionPoint=this.li.getIntersection(0).copy(),this.hasProper=!0,this.isDoneWhenProperInt&&(this._isDone=!0),this.isBoundaryPoint(this.li,this.bdyNodes)||(this.hasProperInterior=!0))))},interfaces_:function(){return[]},getClass:function(){return An}}),An.isAdjacentSegments=function(t,e){return 1===Math.abs(t-e)},h(Fn,Dn),e(Fn.prototype,{prepareEvents:function(){ho.sort(this.events);for(var t=0;t<this.events.size();t++){var e=this.events.get(t);e.isDelete()&&e.getInsertEvent().setDeleteEventIndex(t)}},computeIntersections:function(){if(1===arguments.length){var t=arguments[0];this.nOverlaps=0,this.prepareEvents();for(var e=0;e<this.events.size();e++){var n=this.events.get(e);if(n.isInsert()&&this.processOverlaps(e,n.getDeleteEventIndex(),n,t),t.isDone())break}}else if(3===arguments.length)if(arguments[2]instanceof An&&R(arguments[0],y)&&R(arguments[1],y)){var i=arguments[0],r=arguments[1],s=arguments[2];this.addEdges(i,i),this.addEdges(r,r),this.computeIntersections(s)}else if("boolean"==typeof arguments[2]&&R(arguments[0],y)&&arguments[1]instanceof An){var o=arguments[0],a=arguments[1],u=arguments[2];u?this.addEdges(o,null):this.addEdges(o),this.computeIntersections(a)}},addEdge:function(t,e){for(var n=t.getMonotoneChainEdge(),i=n.getStartIndexes(),r=0;r<i.length-1;r++){var s=new _n(n,r),o=new Mn(e,n.getMinX(r),s);this.events.add(o),this.events.add(new Mn(n.getMaxX(r),o))}},processOverlaps:function(t,e,n,i){for(var r=n.getObject(),s=t;e>s;s++){var o=this.events.get(s);if(o.isInsert()){var a=o.getObject();n.isSameLabel(o)||(r.computeIntersections(a,i),this.nOverlaps++)}}},addEdges:function(){if(1===arguments.length)for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.addEdge(n,n)}else if(2===arguments.length)for(var i=arguments[0],r=arguments[1],e=i.iterator();e.hasNext();){var n=e.next();this.addEdge(n,r)}},interfaces_:function(){return[]},getClass:function(){return Fn}}),e(Gn.prototype,{getMin:function(){return this.min},intersects:function(t,e){return!(this.min>e||this.max<t)},getMax:function(){return this.max},toString:function(){return se.toLineString(new g(this.min,0),new g(this.max,0))},interfaces_:function(){return[]},getClass:function(){return Gn}}),e(qn.prototype,{compare:function(t,e){var n=t,i=e,r=(n.min+n.max)/2,s=(i.min+i.max)/2;return s>r?-1:r>s?1:0},interfaces_:function(){return[a]},getClass:function(){return qn}}),Gn.NodeComparator=qn,h(Bn,Gn),e(Bn.prototype,{query:function(t,e,n){return this.intersects(t,e)?void n.visitItem(this.item):null},interfaces_:function(){return[]},getClass:function(){return Bn}}),h(zn,Gn),e(zn.prototype,{buildExtent:function(t,e){this.min=Math.min(t.min,e.min),this.max=Math.max(t.max,e.max)},query:function(t,e,n){return this.intersects(t,e)?(null!==this.node1&&this.node1.query(t,e,n),void(null!==this.node2&&this.node2.query(t,e,n))):null},interfaces_:function(){return[]},getClass:function(){return zn}}),e(Vn.prototype,{buildTree:function(){ho.sort(this.leaves,new IntervalRTreeNode.NodeComparator);for(var t=this.leaves,e=null,n=new I;;){if(this.buildLevel(t,n),1===n.size())return n.get(0);e=t,t=n,n=e}},insert:function(t,e,n){if(null!==this.root)throw new IllegalStateException("Index cannot be added to once it has been queried");this.leaves.add(new Bn(t,e,n))},query:function(t,e,n){this.init(),this.root.query(t,e,n)},buildRoot:function(){return null!==this.root?null:void(this.root=this.buildTree())},printNode:function(t){A.out.println(se.toLineString(new g(t.min,this.level),new g(t.max,this.level)))},init:function(){return null!==this.root?null:void this.buildRoot()},buildLevel:function(t,e){this.level++,e.clear();for(var n=0;n<t.size();n+=2){var i=t.get(n),r=n+1<t.size()?t.get(n):null;if(null===r)e.add(i);else{var s=new zn(t.get(n),t.get(n+1));e.add(s)}}},interfaces_:function(){return[]},getClass:function(){return Vn}}),e(kn.prototype,{filter:function(t){if(this.isForcedToLineString&&t instanceof bt){var e=t.getFactory().createLineString(t.getCoordinateSequence());return this.lines.add(e),null}t instanceof St&&this.lines.add(t)},setForceToLineString:function(t){this.isForcedToLineString=t},interfaces_:function(){return[q]},getClass:function(){return kn}}),kn.getGeometry=function(){if(1===arguments.length){var t=arguments[0];return t.getFactory().buildGeometry(kn.getLines(t))}if(2===arguments.length){var e=arguments[0],n=arguments[1];return e.getFactory().buildGeometry(kn.getLines(e,n))}},kn.getLines=function(){if(1===arguments.length){var t=arguments[0];return kn.getLines(t,!1)}if(2===arguments.length){if(R(arguments[0],v)&&R(arguments[1],v)){for(var e=arguments[0],n=arguments[1],i=e.iterator();i.hasNext();){var r=i.next();kn.getLines(r,n)}return n}if(arguments[0]instanceof B&&"boolean"==typeof arguments[1]){var s=arguments[0],o=arguments[1],a=new I;return s.apply(new kn(a,o)),a}if(arguments[0]instanceof B&&R(arguments[1],v)){var u=arguments[0],l=arguments[1];return u instanceof St?l.add(u):u.apply(new kn(l)),l}}else if(3===arguments.length){if("boolean"==typeof arguments[2]&&R(arguments[0],v)&&R(arguments[1],v)){for(var h=arguments[0],c=arguments[1],f=arguments[2],i=h.iterator();i.hasNext();){var r=i.next();kn.getLines(r,c,f)}return c}if("boolean"==typeof arguments[2]&&arguments[0]instanceof B&&R(arguments[1],v)){var g=arguments[0],d=arguments[1],p=arguments[2];return g.apply(new kn(d,p)),d}}},e(Yn.prototype,{visitItem:function(t){this.items.add(t)},getItems:function(){return this.items},interfaces_:function(){return[Ae]},getClass:function(){return Yn}}),e(Un.prototype,{locate:function(t){var e=new le(t),n=new Xn(e);return this.index.query(t.y,t.y,n),e.getLocation()},interfaces_:function(){return[Rn]},getClass:function(){return Un}}),e(Xn.prototype,{visitItem:function(t){var e=t;this.counter.countSegment(e.getCoordinate(0),e.getCoordinate(1))},interfaces_:function(){return[Ae]},getClass:function(){return Xn}}),e(Hn.prototype,{init:function(t){for(var e=kn.getLines(t),n=e.iterator();n.hasNext();){var i=n.next(),r=i.getCoordinates();this.addLine(r)}},addLine:function(t){for(var e=1;e<t.length;e++){var n=new ce(t[e-1],t[e]),i=Math.min(n.p0.y,n.p1.y),r=Math.max(n.p0.y,n.p1.y);this.index.insert(i,r,n)}},query:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=new Yn;return this.index.query(t,e,n),n.getItems()}if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];this.index.query(i,r,s)}},interfaces_:function(){return[]},getClass:function(){return Hn}}),Un.SegmentVisitor=Xn,Un.IntervalIndexedGeometry=Hn,e(Wn.prototype,{getSegmentIndex:function(){return this.segmentIndex},getCoordinate:function(){return this.coord},print:function(t){t.print(this.coord),t.print(" seg # = "+this.segmentIndex),t.println(" dist = "+this.dist)},compareTo:function(t){var e=t;return this.compare(e.segmentIndex,e.dist)},isEndPoint:function(t){return 0===this.segmentIndex&&0===this.dist?!0:this.segmentIndex===t},toString:function(){return this.coord+" seg # = "+this.segmentIndex+" dist = "+this.dist},getDistance:function(){return this.dist},compare:function(t,e){return this.segmentIndex<t?-1:this.segmentIndex>t?1:this.dist<e?-1:this.dist>e?1:0},interfaces_:function(){return[s]},getClass:function(){return Wn}}),e(jn.prototype,{print:function(t){t.println("Intersections:");for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t)}},iterator:function(){return this.nodeMap.values().iterator()},addSplitEdges:function(t){this.addEndpoints();for(var e=this.iterator(),n=e.next();e.hasNext();){var i=e.next(),r=this.createSplitEdge(n,i);t.add(r),n=i}},addEndpoints:function(){var t=this.edge.pts.length-1;this.add(this.edge.pts[0],0,0),this.add(this.edge.pts[t],t,0)},createSplitEdge:function(t,e){var n=e.segmentIndex-t.segmentIndex+2,i=this.edge.pts[e.segmentIndex],r=e.dist>0||!e.coord.equals2D(i);r||n--;var s=new Array(n).fill(null),o=0;s[o++]=new g(t.coord);for(var a=t.segmentIndex+1;a<=e.segmentIndex;a++)s[o++]=this.edge.pts[a];return r&&(s[o]=e.coord),new Jn(s,new gn(this.edge.label))},add:function(t,e,n){var i=new Wn(t,e,n),r=this.nodeMap.get(i);return null!==r?r:(this.nodeMap.put(i,i),i)},isIntersection:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next();if(n.coord.equals(t))return!0}return!1},interfaces_:function(){return[]},getClass:function(){return jn}}),e(Kn.prototype,{getChainStartIndices:function(t){var e=0,n=new I;n.add(new b(e));do{var i=this.findChainEnd(t,e);n.add(new b(i)),e=i}while(e<t.length-1);var r=Kn.toIntArray(n);return r},findChainEnd:function(t,e){for(var n=Je.quadrant(t[e],t[e+1]),i=e+1;i<t.length;){var r=Je.quadrant(t[i-1],t[i]);if(r!==n)break;i++}return i-1},interfaces_:function(){return[]},getClass:function(){return Kn}}),Kn.toIntArray=function(t){for(var e=new Array(t.size()).fill(null),n=0;n<e.length;n++)e[n]=t.get(n).intValue();return e},e(Zn.prototype,{getCoordinates:function(){return this.pts},getMaxX:function(t){var e=this.pts[this.startIndex[t]].x,n=this.pts[this.startIndex[t+1]].x;return e>n?e:n},getMinX:function(t){var e=this.pts[this.startIndex[t]].x,n=this.pts[this.startIndex[t+1]].x;return n>e?e:n},computeIntersectsForChain:function(){if(4===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],i=arguments[3];this.computeIntersectsForChain(this.startIndex[t],this.startIndex[t+1],e,e.startIndex[n],e.startIndex[n+1],i)}else if(6===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],a=arguments[3],u=arguments[4],l=arguments[5],h=this.pts[r],c=this.pts[s],f=o.pts[a],g=o.pts[u];if(s-r===1&&u-a===1)return l.addIntersections(this.e,r,o.e,a),null;if(this.env1.init(h,c),this.env2.init(f,g),!this.env1.intersects(this.env2))return null;var d=Math.trunc((r+s)/2),p=Math.trunc((a+u)/2);d>r&&(p>a&&this.computeIntersectsForChain(r,d,o,a,p,l),u>p&&this.computeIntersectsForChain(r,d,o,p,u,l)),s>d&&(p>a&&this.computeIntersectsForChain(d,s,o,a,p,l),u>p&&this.computeIntersectsForChain(d,s,o,p,u,l))}},getStartIndexes:function(){return this.startIndex},computeIntersects:function(t,e){for(var n=0;n<this.startIndex.length-1;n++)for(var i=0;i<t.startIndex.length-1;i++)this.computeIntersectsForChain(n,t,i,e)},interfaces_:function(){return[]},getClass:function(){return Zn}}),e(Qn.prototype,{getDepth:function(t,e){return this.depth[t][e]},setDepth:function(t,e,n){this.depth[t][e]=n},isNull:function(){if(0===arguments.length){for(var t=0;2>t;t++)for(var e=0;3>e;e++)if(this.depth[t][e]!==Qn.NULL_VALUE)return!1;return!0}if(1===arguments.length){var n=arguments[0];return this.depth[n][1]===Qn.NULL_VALUE}if(2===arguments.length){var i=arguments[0],r=arguments[1];return this.depth[i][r]===Qn.NULL_VALUE}},normalize:function(){for(var t=0;2>t;t++)if(!this.isNull(t)){var e=this.depth[t][1];this.depth[t][2]<e&&(e=this.depth[t][2]),0>e&&(e=0);for(var n=1;3>n;n++){var i=0;this.depth[t][n]>e&&(i=1),this.depth[t][n]=i}}},getDelta:function(t){return this.depth[t][cn.RIGHT]-this.depth[t][cn.LEFT]},getLocation:function(t,e){return this.depth[t][e]<=0?L.EXTERIOR:L.INTERIOR},toString:function(){return"A: "+this.depth[0][1]+","+this.depth[0][2]+" B: "+this.depth[1][1]+","+this.depth[1][2]},add:function(){if(1===arguments.length)for(var t=arguments[0],e=0;2>e;e++)for(var n=1;3>n;n++){var i=t.getLocation(e,n);i!==L.EXTERIOR&&i!==L.INTERIOR||(this.isNull(e,n)?this.depth[e][n]=Qn.depthAtLocation(i):this.depth[e][n]+=Qn.depthAtLocation(i))}else if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];o===L.INTERIOR&&this.depth[r][s]++}},interfaces_:function(){return[]},getClass:function(){return Qn}}),Qn.depthAtLocation=function(t){return t===L.EXTERIOR?0:t===L.INTERIOR?1:Qn.NULL_VALUE},Qn.NULL_VALUE=-1,h(Jn,mn),e(Jn.prototype,{getDepth:function(){return this.depth},getCollapsedEdge:function(){var t=new Array(2).fill(null);t[0]=this.pts[0],t[1]=this.pts[1];var e=new Jn(t,gn.toLineLabel(this.label));return e},isIsolated:function(){return this._isIsolated},getCoordinates:function(){return this.pts},setIsolated:function(t){this._isIsolated=t},setName:function(t){this.name=t},equals:function(t){if(!(t instanceof Jn))return!1;var e=t;if(this.pts.length!==e.pts.length)return!1;for(var n=!0,i=!0,r=this.pts.length,s=0;s<this.pts.length;s++)if(this.pts[s].equals2D(e.pts[s])||(n=!1),this.pts[s].equals2D(e.pts[--r])||(i=!1),!n&&!i)return!1;return!0},getCoordinate:function(){if(0===arguments.length)return this.pts.length>0?this.pts[0]:null;if(1===arguments.length){var t=arguments[0];return this.pts[t]}},print:function(t){t.print("edge "+this.name+": "),t.print("LINESTRING (");for(var e=0;e<this.pts.length;e++)e>0&&t.print(","),t.print(this.pts[e].x+" "+this.pts[e].y);t.print(")  "+this.label+" "+this.depthDelta)},computeIM:function(t){Jn.updateIM(this.label,t)},isCollapsed:function(){return this.label.isArea()?3!==this.pts.length?!1:!!this.pts[0].equals(this.pts[2]):!1},isClosed:function(){return this.pts[0].equals(this.pts[this.pts.length-1])},getMaximumSegmentIndex:function(){return this.pts.length-1},getDepthDelta:function(){return this.depthDelta},getNumPoints:function(){return this.pts.length},printReverse:function(t){t.print("edge "+this.name+": ");for(var e=this.pts.length-1;e>=0;e--)t.print(this.pts[e]+" ");t.println("")},getMonotoneChainEdge:function(){return null===this.mce&&(this.mce=new Zn(this)),this.mce},getEnvelope:function(){if(null===this.env){this.env=new C;for(var t=0;t<this.pts.length;t++)this.env.expandToInclude(this.pts[t])}return this.env},addIntersection:function(t,e,n,i){var r=new g(t.getIntersection(i)),s=e,o=t.getEdgeDistance(n,i),a=s+1;if(a<this.pts.length){var u=this.pts[a];r.equals2D(u)&&(s=a,o=0)}this.eiList.add(r,s,o)},toString:function(){var t=new P;t.append("edge "+this.name+": "),t.append("LINESTRING (");for(var e=0;e<this.pts.length;e++)e>0&&t.append(","),t.append(this.pts[e].x+" "+this.pts[e].y);return t.append(")  "+this.label+" "+this.depthDelta),t.toString()},isPointwiseEqual:function(t){if(this.pts.length!==t.pts.length)return!1;for(var e=0;e<this.pts.length;e++)if(!this.pts[e].equals2D(t.pts[e]))return!1;return!0},setDepthDelta:function(t){this.depthDelta=t},getEdgeIntersectionList:function(){return this.eiList},addIntersections:function(t,e,n){for(var i=0;i<t.getIntersectionNum();i++)this.addIntersection(t,e,n,i)},interfaces_:function(){return[]},getClass:function(){return Jn}}),Jn.updateIM=function(){if(2!==arguments.length)return mn.prototype.updateIM.apply(this,arguments);var t=arguments[0],e=arguments[1];e.setAtLeastIfValid(t.getLocation(0,cn.ON),t.getLocation(1,cn.ON),1),t.isArea()&&(e.setAtLeastIfValid(t.getLocation(0,cn.LEFT),t.getLocation(1,cn.LEFT),2),e.setAtLeastIfValid(t.getLocation(0,cn.RIGHT),t.getLocation(1,cn.RIGHT),2))},h($n,Cn),e($n.prototype,{insertBoundaryPoint:function(t,e){var n=this.nodes.addNode(e),i=n.getLabel(),r=1,s=L.NONE;s=i.getLocation(t,cn.ON),s===L.BOUNDARY&&r++;var o=$n.determineBoundary(this.boundaryNodeRule,r);i.setLocation(t,o)},computeSelfNodes:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this.computeSelfNodes(t,e,!1)}if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2],s=new An(n,!0,!1);s.setIsDoneIfProperInt(r);var o=this.createEdgeSetIntersector(),a=this.parentGeom instanceof bt||this.parentGeom instanceof Tt||this.parentGeom instanceof Ot,u=i||!a;return o.computeIntersections(this.edges,s,u),this.addSelfIntersectionNodes(this.argIndex),s}},computeSplitEdges:function(t){for(var e=this.edges.iterator();e.hasNext();){var n=e.next();n.eiList.addSplitEdges(t)}},computeEdgeIntersections:function(t,e,n){var i=new An(e,n,!0);i.setBoundaryNodes(this.getBoundaryNodes(),t.getBoundaryNodes());var r=this.createEdgeSetIntersector();return r.computeIntersections(this.edges,t.edges,i),i},getGeometry:function(){return this.parentGeom},getBoundaryNodeRule:function(){return this.boundaryNodeRule},hasTooFewPoints:function(){return this._hasTooFewPoints},addPoint:function(){if(arguments[0]instanceof Lt){var t=arguments[0],e=t.getCoordinate();this.insertPoint(this.argIndex,e,L.INTERIOR)}else if(arguments[0]instanceof g){var n=arguments[0];this.insertPoint(this.argIndex,n,L.INTERIOR)}},addPolygon:function(t){this.addPolygonRing(t.getExteriorRing(),L.EXTERIOR,L.INTERIOR);for(var e=0;e<t.getNumInteriorRing();e++){var n=t.getInteriorRingN(e);this.addPolygonRing(n,L.INTERIOR,L.EXTERIOR)}},addEdge:function(t){this.insertEdge(t);var e=t.getCoordinates();this.insertPoint(this.argIndex,e[0],L.BOUNDARY),this.insertPoint(this.argIndex,e[e.length-1],L.BOUNDARY)},addLineString:function(t){var e=H.removeRepeatedPoints(t.getCoordinates());if(e.length<2)return this._hasTooFewPoints=!0,this.invalidPoint=e[0],null;var n=new Jn(e,new gn(this.argIndex,L.INTERIOR));this.lineEdgeMap.put(t,n),this.insertEdge(n),f.isTrue(e.length>=2,"found LineString with single point"),this.insertBoundaryPoint(this.argIndex,e[0]),this.insertBoundaryPoint(this.argIndex,e[e.length-1])},getInvalidPoint:function(){return this.invalidPoint},getBoundaryPoints:function(){for(var t=this.getBoundaryNodes(),e=new Array(t.size()).fill(null),n=0,i=t.iterator();i.hasNext();){var r=i.next();e[n++]=r.getCoordinate().copy()}return e},getBoundaryNodes:function(){return null===this.boundaryNodes&&(this.boundaryNodes=this.nodes.getBoundaryNodes(this.argIndex)),this.boundaryNodes},addSelfIntersectionNode:function(t,e,n){return this.isBoundaryNode(t,e)?null:void(n===L.BOUNDARY&&this.useBoundaryDeterminationRule?this.insertBoundaryPoint(t,e):this.insertPoint(t,e,n))},addPolygonRing:function(t,e,n){if(t.isEmpty())return null;var i=H.removeRepeatedPoints(t.getCoordinates());if(i.length<4)return this._hasTooFewPoints=!0,this.invalidPoint=i[0],null;var r=e,s=n;he.isCCW(i)&&(r=n,s=e);var o=new Jn(i,new gn(this.argIndex,L.BOUNDARY,r,s));this.lineEdgeMap.put(t,o),this.insertEdge(o),this.insertPoint(this.argIndex,i[0],L.BOUNDARY)},insertPoint:function(t,e,n){var i=this.nodes.addNode(e),r=i.getLabel();null===r?i.label=new gn(t,n):r.setLocation(t,n)},createEdgeSetIntersector:function(){return new Fn},addSelfIntersectionNodes:function(t){for(var e=this.edges.iterator();e.hasNext();)for(var n=e.next(),i=n.getLabel().getLocation(t),r=n.eiList.iterator();r.hasNext();){var s=r.next();this.addSelfIntersectionNode(t,s.coord,i)}},add:function(){if(1!==arguments.length)return Cn.prototype.add.apply(this,arguments);var t=arguments[0];if(t.isEmpty())return null;if(t instanceof Ot&&(this.useBoundaryDeterminationRule=!1),t instanceof Tt)this.addPolygon(t);else if(t instanceof St)this.addLineString(t);else if(t instanceof Lt)this.addPoint(t);else if(t instanceof Pt)this.addCollection(t);else if(t instanceof gt)this.addCollection(t);else if(t instanceof Ot)this.addCollection(t);else{if(!(t instanceof ft))throw new UnsupportedOperationException(t.getClass().getName());this.addCollection(t)}},addCollection:function(t){for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);this.add(n)}},locate:function(t){return R(this.parentGeom,Rt)&&this.parentGeom.getNumGeometries()>50?(null===this.areaPtLocator&&(this.areaPtLocator=new Un(this.parentGeom)),this.areaPtLocator.locate(t)):this.ptLocator.locate(t,this.parentGeom)},findEdge:function(){if(1===arguments.length){var t=arguments[0];return this.lineEdgeMap.get(t)}return Cn.prototype.findEdge.apply(this,arguments)},interfaces_:function(){return[]},getClass:function(){return $n}}),$n.determineBoundary=function(t,e){return t.isInBoundary(e)?L.BOUNDARY:L.INTERIOR},e(ti.prototype,{getArgGeometry:function(t){return this.arg[t].getGeometry()},setComputationPrecision:function(t){this.resultPrecisionModel=t,this.li.setPrecisionModel(this.resultPrecisionModel)},interfaces_:function(){return[]},getClass:function(){return ti}}),e(ei.prototype,{compareTo:function(t){var e=t,n=ei.compareOriented(this.pts,this._orientation,e.pts,e._orientation);return n},interfaces_:function(){return[s]},getClass:function(){return ei}}),ei.orientation=function(t){return 1===H.increasingDirection(t)},ei.compareOriented=function(t,e,n,i){for(var r=e?1:-1,s=i?1:-1,o=e?t.length:-1,a=i?n.length:-1,u=e?0:t.length-1,l=i?0:n.length-1;;){var h=t[u].compareTo(n[l]);if(0!==h)return h;u+=r,l+=s;var c=u===o,f=l===a;if(c&&!f)return-1;if(!c&&f)return 1;if(c&&f)return 0}},e(ni.prototype,{print:function(t){t.print("MULTILINESTRING ( ");for(var e=0;e<this.edges.size();e++){var n=this.edges.get(e);e>0&&t.print(","),t.print("(");for(var i=n.getCoordinates(),r=0;r<i.length;r++)r>0&&t.print(","),t.print(i[r].x+" "+i[r].y);t.println(")")}t.print(")  ")},addAll:function(t){for(var e=t.iterator();e.hasNext();)this.add(e.next())},findEdgeIndex:function(t){for(var e=0;e<this.edges.size();e++)if(this.edges.get(e).equals(t))return e;return-1},iterator:function(){return this.edges.iterator()},getEdges:function(){return this.edges},get:function(t){return this.edges.get(t)},findEqualEdge:function(t){var e=new ei(t.getCoordinates()),n=this.ocaMap.get(e);return n},add:function(t){this.edges.add(t);var e=new ei(t.getCoordinates());this.ocaMap.put(e,t)},interfaces_:function(){return[]},getClass:function(){return ni}}),h(ii,ti),e(ii.prototype,{insertUniqueEdge:function(t){var e=this.edgeList.findEqualEdge(t);if(null!==e){var n=e.getLabel(),i=t.getLabel();e.isPointwiseEqual(t)||(i=new gn(t.getLabel()),i.flip());var r=e.getDepth();r.isNull()&&r.add(n),r.add(i),n.merge(i)}else this.edgeList.add(t)},getGraph:function(){return this.graph},cancelDuplicateResultEdges:function(){for(var t=this.graph.getEdgeEnds().iterator();t.hasNext();){var e=t.next(),n=e.getSym();e.isInResult()&&n.isInResult()&&(e.setInResult(!1),n.setInResult(!1))}},isCoveredByLA:function(t){return this.isCovered(t,this.resultLineList)?!0:!!this.isCovered(t,this.resultPolyList)},computeGeometry:function(t,e,n,i){var r=new I;return r.addAll(t),r.addAll(e),r.addAll(n),r.isEmpty()?ii.createEmptyResult(i,this.arg[0].getGeometry(),this.arg[1].getGeometry(),this.geomFact):this.geomFact.buildGeometry(r)},mergeSymLabels:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next();e.getEdges().mergeSymLabels()}},isCovered:function(t,e){for(var n=e.iterator();n.hasNext();){var i=n.next(),r=this.ptLocator.locate(t,i);if(r!==L.EXTERIOR)return!0}return!1},replaceCollapsedEdges:function(){for(var t=new I,e=this.edgeList.iterator();e.hasNext();){var n=e.next();n.isCollapsed()&&(e.remove(),t.add(n.getCollapsedEdge()))}this.edgeList.addAll(t)},updateNodeLabelling:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next(),n=e.getEdges().getLabel();e.getLabel().merge(n)}},getResultGeometry:function(t){return this.computeOverlay(t),this.resultGeom},insertUniqueEdges:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.insertUniqueEdge(n)}},computeOverlay:function(t){this.copyPoints(0),this.copyPoints(1),this.arg[0].computeSelfNodes(this.li,!1),this.arg[1].computeSelfNodes(this.li,!1),this.arg[0].computeEdgeIntersections(this.arg[1],this.li,!0);var e=new I;this.arg[0].computeSplitEdges(e),this.arg[1].computeSplitEdges(e);this.insertUniqueEdges(e),this.computeLabelsFromDepths(),this.replaceCollapsedEdges(),ln.checkValid(this.edgeList.getEdges()),this.graph.addEdges(this.edgeList.getEdges()),this.computeLabelling(),this.labelIncompleteNodes(),this.findResultAreaEdges(t),this.cancelDuplicateResultEdges();var n=new Sn(this.geomFact);n.add(this.graph),this.resultPolyList=n.getPolygons();var i=new wn(this,this.geomFact,this.ptLocator);this.resultLineList=i.build(t);var r=new Ln(this,this.geomFact,this.ptLocator);this.resultPointList=r.build(t),
this.resultGeom=this.computeGeometry(this.resultPointList,this.resultLineList,this.resultPolyList,t)},labelIncompleteNode:function(t,e){var n=this.ptLocator.locate(t.getCoordinate(),this.arg[e].getGeometry());t.getLabel().setLocation(e,n)},copyPoints:function(t){for(var e=this.arg[t].getNodeIterator();e.hasNext();){var n=e.next(),i=this.graph.addNode(n.getCoordinate());i.setLabel(t,n.getLabel().getLocation(t))}},findResultAreaEdges:function(t){for(var e=this.graph.getEdgeEnds().iterator();e.hasNext();){var n=e.next(),i=n.getLabel();i.isArea()&&!n.isInteriorAreaEdge()&&ii.isResultOfOp(i.getLocation(0,cn.RIGHT),i.getLocation(1,cn.RIGHT),t)&&n.setInResult(!0)}},computeLabelsFromDepths:function(){for(var t=this.edgeList.iterator();t.hasNext();){var e=t.next(),n=e.getLabel(),i=e.getDepth();if(!i.isNull()){i.normalize();for(var r=0;2>r;r++)n.isNull(r)||!n.isArea()||i.isNull(r)||(0===i.getDelta(r)?n.toLine(r):(f.isTrue(!i.isNull(r,cn.LEFT),"depth of LEFT side has not been initialized"),n.setLocation(r,cn.LEFT,i.getLocation(r,cn.LEFT)),f.isTrue(!i.isNull(r,cn.RIGHT),"depth of RIGHT side has not been initialized"),n.setLocation(r,cn.RIGHT,i.getLocation(r,cn.RIGHT))))}}},computeLabelling:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next();e.getEdges().computeLabelling(this.arg)}this.mergeSymLabels(),this.updateNodeLabelling()},labelIncompleteNodes:function(){for(var t=0,e=this.graph.getNodes().iterator();e.hasNext();){var n=e.next(),i=n.getLabel();n.isIsolated()&&(t++,i.isNull(0)?this.labelIncompleteNode(n,0):this.labelIncompleteNode(n,1)),n.getEdges().updateLabelling(i)}},isCoveredByA:function(t){return!!this.isCovered(t,this.resultPolyList)},interfaces_:function(){return[]},getClass:function(){return ii}}),ii.overlayOp=function(t,e,n){var i=new ii(t,e),r=i.getResultGeometry(n);return r},ii.intersection=function(t,e){if(t.isEmpty()||e.isEmpty())return ii.createEmptyResult(ii.INTERSECTION,t,e,t.getFactory());if(t.isGeometryCollection()){var n=e;return hn.map(t,{interfaces_:function(){return[MapOp]},map:function(t){return t.intersection(n)}})}return t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),si.overlayOp(t,e,ii.INTERSECTION)},ii.symDifference=function(t,e){if(t.isEmpty()||e.isEmpty()){if(t.isEmpty()&&e.isEmpty())return ii.createEmptyResult(ii.SYMDIFFERENCE,t,e,t.getFactory());if(t.isEmpty())return e.copy();if(e.isEmpty())return t.copy()}return t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),si.overlayOp(t,e,ii.SYMDIFFERENCE)},ii.resultDimension=function(t,e,n){var i=e.getDimension(),r=n.getDimension(),s=-1;switch(t){case ii.INTERSECTION:s=Math.min(i,r);break;case ii.UNION:s=Math.max(i,r);break;case ii.DIFFERENCE:s=i;break;case ii.SYMDIFFERENCE:s=Math.max(i,r)}return s},ii.createEmptyResult=function(t,e,n,i){var r=null;switch(ii.resultDimension(t,e,n)){case-1:r=i.createGeometryCollection(new Array(0).fill(null));break;case 0:r=i.createPoint();break;case 1:r=i.createLineString();break;case 2:r=i.createPolygon()}return r},ii.difference=function(t,e){return t.isEmpty()?ii.createEmptyResult(ii.DIFFERENCE,t,e,t.getFactory()):e.isEmpty()?t.copy():(t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),si.overlayOp(t,e,ii.DIFFERENCE))},ii.isResultOfOp=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=t.getLocation(0),i=t.getLocation(1);return ii.isResultOfOp(n,i,e)}if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2];switch(r===L.BOUNDARY&&(r=L.INTERIOR),s===L.BOUNDARY&&(s=L.INTERIOR),o){case ii.INTERSECTION:return r===L.INTERIOR&&s===L.INTERIOR;case ii.UNION:return r===L.INTERIOR||s===L.INTERIOR;case ii.DIFFERENCE:return r===L.INTERIOR&&s!==L.INTERIOR;case ii.SYMDIFFERENCE:return r===L.INTERIOR&&s!==L.INTERIOR||r!==L.INTERIOR&&s===L.INTERIOR}return!1}},ii.INTERSECTION=1,ii.UNION=2,ii.DIFFERENCE=3,ii.SYMDIFFERENCE=4,e(ri.prototype,{selfSnap:function(t){var e=new Ie(t),n=e.snapTo(t,this.snapTolerance);return n},removeCommonBits:function(t){this.cbr=new Se,this.cbr.add(t[0]),this.cbr.add(t[1]);var e=new Array(2).fill(null);return e[0]=this.cbr.removeCommonBits(t[0].copy()),e[1]=this.cbr.removeCommonBits(t[1].copy()),e},prepareResult:function(t){return this.cbr.addCommonBits(t),t},getResultGeometry:function(t){var e=this.snap(this.geom),n=ii.overlayOp(e[0],e[1],t);return this.prepareResult(n)},checkValid:function(t){t.isValid()||A.out.println("Snapped geometry is invalid")},computeSnapTolerance:function(){this.snapTolerance=Ie.computeOverlaySnapTolerance(this.geom[0],this.geom[1])},snap:function(t){var e=this.removeCommonBits(t),n=Ie.snap(e[0],e[1],this.snapTolerance);return n},interfaces_:function(){return[]},getClass:function(){return ri}}),ri.overlayOp=function(t,e,n){var i=new ri(t,e);return i.getResultGeometry(n)},ri.union=function(t,e){return ri.overlayOp(t,e,ii.UNION)},ri.intersection=function(t,e){return ri.overlayOp(t,e,ii.INTERSECTION)},ri.symDifference=function(t,e){return ri.overlayOp(t,e,ii.SYMDIFFERENCE)},ri.difference=function(t,e){return ri.overlayOp(t,e,ii.DIFFERENCE)},e(si.prototype,{getResultGeometry:function(t){var e=null,n=!1,i=null;try{e=ii.overlayOp(this.geom[0],this.geom[1],t);var r=!0;r&&(n=!0)}catch(t){if(!(t instanceof l))throw t;i=t}finally{}if(!n)try{e=ri.overlayOp(this.geom[0],this.geom[1],t)}catch(t){throw t instanceof l?i:t}finally{}return e},interfaces_:function(){return[]},getClass:function(){return si}}),si.overlayOp=function(t,e,n){var i=new si(t,e);return i.getResultGeometry(n)},si.union=function(t,e){return si.overlayOp(t,e,ii.UNION)},si.intersection=function(t,e){return si.overlayOp(t,e,ii.INTERSECTION)},si.symDifference=function(t,e){return si.overlayOp(t,e,ii.SYMDIFFERENCE)},si.difference=function(t,e){return si.overlayOp(t,e,ii.DIFFERENCE)},e(oi.prototype,{addPolygon:function(t){if(t.isEmpty())return null;var e=null,n=0,i=this.horizontalBisector(t);if(0===i.getLength())n=0,e=i.getCoordinate();else{var r=si.overlayOp(i,t,ii.INTERSECTION),s=this.widestGeometry(r);n=s.getEnvelopeInternal().getWidth(),e=oi.centre(s.getEnvelopeInternal())}(null===this.interiorPoint||n>this.maxWidth)&&(this.interiorPoint=e,this.maxWidth=n)},getInteriorPoint:function(){return this.interiorPoint},widestGeometry:function t(){if(arguments[0]instanceof ft){var e=arguments[0];if(e.isEmpty())return e;for(var t=e.getGeometryN(0),n=1;n<e.getNumGeometries();n++)e.getGeometryN(n).getEnvelopeInternal().getWidth()>t.getEnvelopeInternal().getWidth()&&(t=e.getGeometryN(n));return t}if(arguments[0]instanceof B){var i=arguments[0];return i instanceof ft?this.widestGeometry(i):i}},horizontalBisector:function(t){var e=t.getEnvelopeInternal(),n=ai.getBisectorY(t);return this.factory.createLineString([new g(e.getMinX(),n),new g(e.getMaxX(),n)])},add:function(t){if(t instanceof Tt)this.addPolygon(t);else if(t instanceof ft)for(var e=t,n=0;n<e.getNumGeometries();n++)this.add(e.getGeometryN(n))},interfaces_:function(){return[]},getClass:function(){return oi}}),oi.centre=function(t){return new g(oi.avg(t.getMinX(),t.getMaxX()),oi.avg(t.getMinY(),t.getMaxY()))},oi.avg=function(t,e){return(t+e)/2},e(ai.prototype,{updateInterval:function(t){t<=this.centreY?t>this.loY&&(this.loY=t):t>this.centreY&&t<this.hiY&&(this.hiY=t)},getBisectorY:function(){this.process(this.poly.getExteriorRing());for(var t=0;t<this.poly.getNumInteriorRing();t++)this.process(this.poly.getInteriorRingN(t));var e=oi.avg(this.hiY,this.loY);return e},process:function(t){for(var e=t.getCoordinateSequence(),n=0;n<e.size();n++){var i=e.getY(n);this.updateInterval(i)}},interfaces_:function(){return[]},getClass:function(){return ai}}),ai.getBisectorY=function(t){var e=new ai(t);return e.getBisectorY()},oi.SafeBisectorFinder=ai,e(ui.prototype,{addEndpoints:function(){if(arguments[0]instanceof B){var t=arguments[0];if(t instanceof St)this.addEndpoints(t.getCoordinates());else if(t instanceof ft)for(var e=t,n=0;n<e.getNumGeometries();n++)this.addEndpoints(e.getGeometryN(n))}else if(arguments[0]instanceof Array){var i=arguments[0];this.add(i[0]),this.add(i[i.length-1])}},getInteriorPoint:function(){return this.interiorPoint},addInterior:function(){if(arguments[0]instanceof B){var t=arguments[0];if(t instanceof St)this.addInterior(t.getCoordinates());else if(t instanceof ft)for(var e=t,n=0;n<e.getNumGeometries();n++)this.addInterior(e.getGeometryN(n))}else if(arguments[0]instanceof Array)for(var i=arguments[0],n=1;n<i.length-1;n++)this.add(i[n])},add:function(t){var e=t.distance(this.centroid);e<this.minDistance&&(this.interiorPoint=new g(t),this.minDistance=e)},interfaces_:function(){return[]},getClass:function(){return ui}}),e(li.prototype,{getInteriorPoint:function(){return this.interiorPoint},add:function(){if(arguments[0]instanceof B){var t=arguments[0];if(t instanceof Lt)this.add(t.getCoordinate());else if(t instanceof ft)for(var e=t,n=0;n<e.getNumGeometries();n++)this.add(e.getGeometryN(n))}else if(arguments[0]instanceof g){var i=arguments[0],r=i.distance(this.centroid);r<this.minDistance&&(this.interiorPoint=new g(i),this.minDistance=r)}},interfaces_:function(){return[]},getClass:function(){return li}}),e(hi.prototype,{interfaces_:function(){return[]},getClass:function(){return hi}}),hi.toDegrees=function(t){return 180*t/Math.PI},hi.normalize=function(t){for(;t>Math.PI;)t-=hi.PI_TIMES_2;for(;t<=-Math.PI;)t+=hi.PI_TIMES_2;return t},hi.angle=function(){if(1===arguments.length){var t=arguments[0];return Math.atan2(t.y,t.x)}if(2===arguments.length){var e=arguments[0],n=arguments[1],i=n.x-e.x,r=n.y-e.y;return Math.atan2(r,i)}},hi.isAcute=function(t,e,n){var i=t.x-e.x,r=t.y-e.y,s=n.x-e.x,o=n.y-e.y,a=i*s+r*o;return a>0},hi.isObtuse=function(t,e,n){var i=t.x-e.x,r=t.y-e.y,s=n.x-e.x,o=n.y-e.y,a=i*s+r*o;return 0>a},hi.interiorAngle=function(t,e,n){var i=hi.angle(e,t),r=hi.angle(e,n);return Math.abs(r-i)},hi.normalizePositive=function(t){if(0>t){for(;0>t;)t+=hi.PI_TIMES_2;t>=hi.PI_TIMES_2&&(t=0)}else{for(;t>=hi.PI_TIMES_2;)t-=hi.PI_TIMES_2;0>t&&(t=0)}return t},hi.angleBetween=function(t,e,n){var i=hi.angle(e,t),r=hi.angle(e,n);return hi.diff(i,r)},hi.diff=function(t,e){var n=null;return n=e>t?e-t:t-e,n>Math.PI&&(n=2*Math.PI-n),n},hi.toRadians=function(t){return t*Math.PI/180},hi.getTurn=function(t,e){var n=Math.sin(e-t);return n>0?hi.COUNTERCLOCKWISE:0>n?hi.CLOCKWISE:hi.NONE},hi.angleBetweenOriented=function(t,e,n){var i=hi.angle(e,t),r=hi.angle(e,n),s=r-i;return s<=-Math.PI?s+hi.PI_TIMES_2:s>Math.PI?s-hi.PI_TIMES_2:s},hi.PI_TIMES_2=2*Math.PI,hi.PI_OVER_2=Math.PI/2,hi.PI_OVER_4=Math.PI/4,hi.COUNTERCLOCKWISE=he.COUNTERCLOCKWISE,hi.CLOCKWISE=he.CLOCKWISE,hi.NONE=he.COLLINEAR,e(ci.prototype,{area:function(){return ci.area(this.p0,this.p1,this.p2)},signedArea:function(){return ci.signedArea(this.p0,this.p1,this.p2)},interpolateZ:function(t){if(null===t)throw new i("Supplied point is null.");return ci.interpolateZ(t,this.p0,this.p1,this.p2)},longestSideLength:function(){return ci.longestSideLength(this.p0,this.p1,this.p2)},isAcute:function(){return ci.isAcute(this.p0,this.p1,this.p2)},circumcentre:function(){return ci.circumcentre(this.p0,this.p1,this.p2)},area3D:function(){return ci.area3D(this.p0,this.p1,this.p2)},centroid:function(){return ci.centroid(this.p0,this.p1,this.p2)},inCentre:function(){return ci.inCentre(this.p0,this.p1,this.p2)},interfaces_:function(){return[]},getClass:function(){return ci}}),ci.area=function(t,e,n){return Math.abs(((n.x-t.x)*(e.y-t.y)-(e.x-t.x)*(n.y-t.y))/2)},ci.signedArea=function(t,e,n){return((n.x-t.x)*(e.y-t.y)-(e.x-t.x)*(n.y-t.y))/2},ci.det=function(t,e,n,i){return t*i-e*n},ci.interpolateZ=function(t,e,n,i){var r=e.x,s=e.y,o=n.x-r,a=i.x-r,u=n.y-s,l=i.y-s,h=o*l-a*u,c=t.x-r,f=t.y-s,g=(l*c-a*f)/h,d=(-u*c+o*f)/h,p=e.z+g*(n.z-e.z)+d*(i.z-e.z);return p},ci.longestSideLength=function(t,e,n){var i=t.distance(e),r=e.distance(n),s=n.distance(t),o=i;return r>o&&(o=r),s>o&&(o=s),o},ci.isAcute=function(t,e,n){return hi.isAcute(t,e,n)&&hi.isAcute(e,n,t)?!!hi.isAcute(n,t,e):!1},ci.circumcentre=function(t,e,n){var i=n.x,r=n.y,s=t.x-i,o=t.y-r,a=e.x-i,u=e.y-r,l=2*ci.det(s,o,a,u),h=ci.det(o,s*s+o*o,u,a*a+u*u),c=ci.det(s,s*s+o*o,a,a*a+u*u),f=i-h/l,d=r+c/l;return new g(f,d)},ci.perpendicularBisector=function(t,e){var n=e.x-t.x,i=e.y-t.y,r=new F(t.x+n/2,t.y+i/2,1),s=new F(t.x-i+n/2,t.y+n+i/2,1);return new F(r,s)},ci.angleBisector=function(t,e,n){var i=e.distance(t),r=e.distance(n),s=i/(i+r),o=n.x-t.x,a=n.y-t.y,u=new g(t.x+s*o,t.y+s*a);return u},ci.area3D=function(t,e,n){var i=e.x-t.x,r=e.y-t.y,s=e.z-t.z,o=n.x-t.x,a=n.y-t.y,u=n.z-t.z,l=r*u-s*a,h=s*o-i*u,c=i*a-r*o,f=l*l+h*h+c*c,g=Math.sqrt(f)/2;return g},ci.centroid=function(t,e,n){var i=(t.x+e.x+n.x)/3,r=(t.y+e.y+n.y)/3;return new g(i,r)},ci.inCentre=function(t,e,n){var i=e.distance(n),r=t.distance(n),s=t.distance(e),o=i+r+s,a=(i*t.x+r*e.x+s*n.x)/o,u=(i*t.y+r*e.y+s*n.y)/o;return new g(a,u)},e(fi.prototype,{getRadius:function(){return this.compute(),this.radius},getDiameter:function(){switch(this.compute(),this.extremalPts.length){case 0:return this.input.getFactory().createLineString();case 1:return this.input.getFactory().createPoint(this.centre)}var t=this.extremalPts[0],e=this.extremalPts[1];return this.input.getFactory().createLineString([t,e])},getExtremalPoints:function(){return this.compute(),this.extremalPts},computeCirclePoints:function(){if(this.input.isEmpty())return this.extremalPts=new Array(0).fill(null),null;if(1===this.input.getNumPoints()){var t=this.input.getCoordinates();return this.extremalPts=[new g(t[0])],null}var e=this.input.convexHull(),n=e.getCoordinates(),t=n;if(n[0].equals2D(n[n.length-1])&&(t=new Array(n.length-1).fill(null),H.copyDeep(n,0,t,0,n.length-1)),t.length<=2)return this.extremalPts=H.copyDeep(t),null;for(var i=fi.lowestPoint(t),r=fi.pointWitMinAngleWithX(t,i),s=0;s<t.length;s++){var o=fi.pointWithMinAngleWithSegment(t,i,r);if(hi.isObtuse(i,o,r))return this.extremalPts=[new g(i),new g(r)],null;if(hi.isObtuse(o,i,r))i=o;else{if(!hi.isObtuse(o,r,i))return this.extremalPts=[new g(i),new g(r),new g(o)],null;r=o}}f.shouldNeverReachHere("Logic failure in Minimum Bounding Circle algorithm!")},compute:function(){return null!==this.extremalPts?null:(this.computeCirclePoints(),this.computeCentre(),void(null!==this.centre&&(this.radius=this.centre.distance(this.extremalPts[0]))))},getFarthestPoints:function(){switch(this.compute(),this.extremalPts.length){case 0:return this.input.getFactory().createLineString();case 1:return this.input.getFactory().createPoint(this.centre)}var t=this.extremalPts[0],e=this.extremalPts[this.extremalPts.length-1];return this.input.getFactory().createLineString([t,e])},getCircle:function(){if(this.compute(),null===this.centre)return this.input.getFactory().createPolygon();var t=this.input.getFactory().createPoint(this.centre);return 0===this.radius?t:t.buffer(this.radius)},getCentre:function(){return this.compute(),this.centre},computeCentre:function(){switch(this.extremalPts.length){case 0:this.centre=null;break;case 1:this.centre=this.extremalPts[0];break;case 2:this.centre=new g((this.extremalPts[0].x+this.extremalPts[1].x)/2,(this.extremalPts[0].y+this.extremalPts[1].y)/2);break;case 3:this.centre=ci.circumcentre(this.extremalPts[0],this.extremalPts[1],this.extremalPts[2])}},interfaces_:function(){return[]},getClass:function(){return fi}}),fi.pointWitMinAngleWithX=function(t,e){for(var n=r.MAX_VALUE,i=null,s=0;s<t.length;s++){var o=t[s];if(o!==e){var a=o.x-e.x,u=o.y-e.y;0>u&&(u=-u);var l=Math.sqrt(a*a+u*u),h=u/l;n>h&&(n=h,i=o)}}return i},fi.lowestPoint=function(t){for(var e=t[0],n=1;n<t.length;n++)t[n].y<e.y&&(e=t[n]);return e},fi.pointWithMinAngleWithSegment=function(t,e,n){for(var i=r.MAX_VALUE,s=null,o=0;o<t.length;o++){var a=t[o];if(a!==e&&a!==n){var u=hi.angleBetween(e,a,n);i>u&&(i=u,s=a)}}return s},e(gi.prototype,{getWidthCoordinate:function(){return this.computeMinimumDiameter(),this.minWidthPt},getSupportingSegment:function(){return this.computeMinimumDiameter(),this.inputGeom.getFactory().createLineString([this.minBaseSeg.p0,this.minBaseSeg.p1])},getDiameter:function(){if(this.computeMinimumDiameter(),null===this.minWidthPt)return this.inputGeom.getFactory().createLineString(null);var t=this.minBaseSeg.project(this.minWidthPt);return this.inputGeom.getFactory().createLineString([t,this.minWidthPt])},computeWidthConvex:function(t){t instanceof Tt?this.convexHullPts=t.getExteriorRing().getCoordinates():this.convexHullPts=t.getCoordinates(),0===this.convexHullPts.length?(this.minWidth=0,this.minWidthPt=null,this.minBaseSeg=null):1===this.convexHullPts.length?(this.minWidth=0,this.minWidthPt=this.convexHullPts[0],this.minBaseSeg.p0=this.convexHullPts[0],this.minBaseSeg.p1=this.convexHullPts[0]):2===this.convexHullPts.length||3===this.convexHullPts.length?(this.minWidth=0,this.minWidthPt=this.convexHullPts[0],this.minBaseSeg.p0=this.convexHullPts[0],this.minBaseSeg.p1=this.convexHullPts[1]):this.computeConvexRingMinDiameter(this.convexHullPts)},computeConvexRingMinDiameter:function(t){this.minWidth=r.MAX_VALUE;for(var e=1,n=new ce,i=0;i<t.length-1;i++)n.p0=t[i],n.p1=t[i+1],e=this.findMaxPerpDistance(t,n,e)},computeMinimumDiameter:function(){if(null!==this.minWidthPt)return null;if(this.isConvex)this.computeWidthConvex(this.inputGeom);else{var t=new me(this.inputGeom).getConvexHull();this.computeWidthConvex(t)}},getLength:function(){return this.computeMinimumDiameter(),this.minWidth},findMaxPerpDistance:function(t,e,n){for(var i=e.distancePerpendicular(t[n]),r=i,s=n,o=s;r>=i;)i=r,s=o,o=gi.nextIndex(t,s),r=e.distancePerpendicular(t[o]);return i<this.minWidth&&(this.minPtIndex=s,this.minWidth=i,this.minWidthPt=t[this.minPtIndex],this.minBaseSeg=new ce(e)),s},getMinimumRectangle:function(){if(this.computeMinimumDiameter(),0===this.minWidth)return this.minBaseSeg.p0.equals2D(this.minBaseSeg.p1)?this.inputGeom.getFactory().createPoint(this.minBaseSeg.p0):this.minBaseSeg.toGeometry(this.inputGeom.getFactory());for(var t=this.minBaseSeg.p1.x-this.minBaseSeg.p0.x,e=this.minBaseSeg.p1.y-this.minBaseSeg.p0.y,n=r.MAX_VALUE,i=-r.MAX_VALUE,s=r.MAX_VALUE,o=-r.MAX_VALUE,a=0;a<this.convexHullPts.length;a++){var u=gi.computeC(t,e,this.convexHullPts[a]);u>i&&(i=u),n>u&&(n=u);var l=gi.computeC(-e,t,this.convexHullPts[a]);l>o&&(o=l),s>l&&(s=l)}var h=gi.computeSegmentForLine(-t,-e,o),c=gi.computeSegmentForLine(-t,-e,s),f=gi.computeSegmentForLine(-e,t,i),g=gi.computeSegmentForLine(-e,t,n),d=f.lineIntersection(h),p=g.lineIntersection(h),v=g.lineIntersection(c),m=f.lineIntersection(c),y=this.inputGeom.getFactory().createLinearRing([d,p,v,m,d]);return this.inputGeom.getFactory().createPolygon(y,null)},interfaces_:function(){return[]},getClass:function(){return gi}}),gi.nextIndex=function(t,e){return e++,e>=t.length&&(e=0),e},gi.computeC=function(t,e,n){return t*n.y-e*n.x},gi.getMinimumDiameter=function(t){return new gi(t).getDiameter()},gi.getMinimumRectangle=function(t){return new gi(t).getMinimumRectangle()},gi.computeSegmentForLine=function(t,e,n){var i=null,r=null;return Math.abs(e)>Math.abs(t)?(i=new g(0,n/e),r=new g(1,n/e-t/e)):(i=new g(n/t,0),r=new g(n/t-e/t,1)),new ce(i,r)};var co=Object.freeze({Centroid:ge,CGAlgorithms:he,ConvexHull:me,InteriorPointArea:oi,InteriorPointLine:ui,InteriorPointPoint:li,RobustLineIntersector:ae,MinimumBoundingCircle:fi,MinimumDiameter:gi});e(di.prototype,{getResultGeometry:function(){return new pi(this.distanceTolerance).transform(this.inputGeom)},setDistanceTolerance:function(t){if(0>=t)throw new i("Tolerance must be positive");this.distanceTolerance=t},interfaces_:function(){return[]},getClass:function(){return di}}),di.densifyPoints=function(t,e,n){for(var i=new ce,r=new N,s=0;s<t.length-1;s++){i.p0=t[s],i.p1=t[s+1],r.add(i.p0,!1);var o=i.getLength(),a=Math.trunc(o/e)+1;if(a>1)for(var u=o/a,l=1;a>l;l++){var h=l*u/o,c=i.pointAlong(h);n.makePrecise(c),r.add(c,!1)}}return r.add(t[t.length-1],!1),r.toCoordinateArray()},di.densify=function(t,e){var n=new di(t);return n.setDistanceTolerance(e),n.getResultGeometry()},h(pi,xe),e(pi.prototype,{transformMultiPolygon:function(t,e){var n=xe.prototype.transformMultiPolygon.call(this,t,e);return this.createValidArea(n)},transformPolygon:function(t,e){var n=xe.prototype.transformPolygon.call(this,t,e);return e instanceof Ot?n:this.createValidArea(n)},transformCoordinates:function(t,e){var n=t.toCoordinateArray(),i=di.densifyPoints(n,this.distanceTolerance,e.getPrecisionModel());return e instanceof St&&1===i.length&&(i=new Array(0).fill(null)),this.factory.getCoordinateSequenceFactory().create(i)},createValidArea:function(t){return t.buffer(0)},interfaces_:function(){return[]},getClass:function(){return pi}}),di.DensifyTransformer=pi;var fo=Object.freeze({Densifier:di});e(vi.prototype,{find:function(t){var e=this;do{if(null===e)return null;if(e.dest().equals2D(t))return e;e=e.oNext()}while(e!==this);return null},dest:function(){return this._sym._orig},oNext:function(){return this._sym._next},insert:function(t){if(this.oNext()===this)return this.insertAfter(t),null;var e=this.compareTo(t),n=this;do{var i=n.oNext(),r=i.compareTo(t);if(r!==e||i===this)return n.insertAfter(t),null;n=i}while(n!==this);f.shouldNeverReachHere()},insertAfter:function(t){f.equals(this._orig,t.orig());var e=this.oNext();this._sym.setNext(t),t.sym().setNext(e)},degree:function t(){var t=0,e=this;do t++,e=e.oNext();while(e!==this);return t},equals:function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return this._orig.equals2D(t)&&this._sym._orig.equals(e)}},deltaY:function(){return this._sym._orig.y-this._orig.y},sym:function(){return this._sym},prev:function(){return this._sym.next()._sym},compareAngularDirection:function(t){var e=this.deltaX(),n=this.deltaY(),i=t.deltaX(),r=t.deltaY();if(e===i&&n===r)return 0;var s=Je.quadrant(e,n),o=Je.quadrant(i,r);return s>o?1:o>s?-1:he.computeOrientation(t._orig,t.dest(),this.dest())},prevNode:function(){for(var t=this;2===t.degree();)if(t=t.prev(),t===this)return null;return t},compareTo:function(t){var e=t,n=this.compareAngularDirection(e);return n},next:function(){return this._next},setSym:function(t){this._sym=t},orig:function(){return this._orig},toString:function(){return"HE("+this._orig.x+" "+this._orig.y+", "+this._sym._orig.x+" "+this._sym._orig.y+")"},setNext:function(t){this._next=t},init:function(t){this.setSym(t),t.setSym(this),this.setNext(t),t.setNext(this)},deltaX:function(){return this._sym._orig.x-this._orig.x},interfaces_:function(){return[]},getClass:function(){return vi}}),vi.init=function(t,e){if(null!==t._sym||null!==e._sym||null!==t._next||null!==e._next)throw new IllegalStateException("Edges are already initialized");return t.init(e),t},vi.create=function(t,e){var n=new vi(t),i=new vi(e);return n.init(i),n},h(mi,vi),e(mi.prototype,{mark:function(){this._isMarked=!0},setMark:function(t){this._isMarked=t},isMarked:function(){return this._isMarked},interfaces_:function(){return[]},getClass:function(){return mi}}),mi.setMarkBoth=function(t,e){t.setMark(e),t.sym().setMark(e)},mi.isMarked=function(t){return t.isMarked()},mi.setMark=function(t,e){t.setMark(e)},mi.markBoth=function(t){t.mark(),t.sym().mark()},mi.mark=function(t){t.mark()},e(yi.prototype,{insert:function(t,e,n){var i=this.create(t,e);null!==n?n.insert(i):this.vertexMap.put(t,i);var r=this.vertexMap.get(e);return null!==r?r.insert(i.sym()):this.vertexMap.put(e,i.sym()),i},create:function(t,e){var n=this.createEdge(t),i=this.createEdge(e);return vi.init(n,i),n},createEdge:function(t){return new vi(t)},addEdge:function(t,e){if(!yi.isValidEdge(t,e))return null;var n=this.vertexMap.get(t),i=null;if(null!==n&&(i=n.find(e)),null!==i)return i;var r=this.insert(t,e,n);return r},getVertexEdges:function(){return this.vertexMap.values()},findEdge:function(t,e){var n=this.vertexMap.get(t);return null===n?null:n.find(e)},interfaces_:function(){return[]},getClass:function(){return yi}}),yi.isValidEdge=function(t,e){var n=e.compareTo(t);return 0!==n},h(xi,mi),e(xi.prototype,{setStart:function(){this._isStart=!0},isStart:function(){return this._isStart},interfaces_:function(){return[]},getClass:function(){return xi}}),h(Ei,yi),e(Ei.prototype,{createEdge:function(t){return new xi(t)},interfaces_:function(){return[]},getClass:function(){return Ei}}),e(Ii.prototype,{addLine:function(t){this.lines.add(this.factory.createLineString(t.toCoordinateArray()))},updateRingStartEdge:function(t){return t.isStart()||(t=t.sym(),t.isStart())?null===this.ringStartEdge?(this.ringStartEdge=t,null):void(t.orig().compareTo(this.ringStartEdge.orig())<0&&(this.ringStartEdge=t)):null},getResult:function(){return null===this.result&&this.computeResult(),this.result},process:function(t){var e=t.prevNode();null===e&&(e=t),this.stackEdges(e),this.buildLines()},buildRing:function(t){var e=new N,n=t;for(e.add(n.orig().copy(),!1);2===n.sym().degree();){var i=n.next();if(i===t)break;e.add(i.orig().copy(),!1),n=i}e.add(n.dest().copy(),!1),this.addLine(e)},buildLine:function(t){var e=new N,n=t;for(this.ringStartEdge=null,mi.markBoth(n),e.add(n.orig().copy(),!1);2===n.sym().degree();){this.updateRingStartEdge(n);var i=n.next();if(i===t)return this.buildRing(this.ringStartEdge),null;e.add(i.orig().copy(),!1),n=i,mi.markBoth(n)}e.add(n.dest().copy(),!1),this.stackEdges(n.sym()),this.addLine(e)},stackEdges:function(t){var e=t;do mi.isMarked(e)||this.nodeEdgeStack.add(e),e=e.oNext();while(e!==t)},computeResult:function(){for(var t=this.graph.getVertexEdges(),e=t.iterator();e.hasNext();){var n=e.next();mi.isMarked(n)||this.process(n)}this.result=this.factory.buildGeometry(this.lines)},buildLines:function(){for(;!this.nodeEdgeStack.empty();){var t=this.nodeEdgeStack.pop();mi.isMarked(t)||this.buildLine(t)}},add:function(){if(arguments[0]instanceof B){var t=arguments[0];t.apply({interfaces_:function(){return[q]},filter:function(t){t instanceof St&&this.add(t)}})}else if(R(arguments[0],v))for(var e=arguments[0],n=e.iterator();n.hasNext();){var i=n.next();this.add(i)}else if(arguments[0]instanceof St){var r=arguments[0];null===this.factory&&(this.factory=r.getFactory());for(var s=r.getCoordinateSequence(),o=!1,n=1;n<s.size();n++){var a=this.graph.addEdge(s.getCoordinate(n-1),s.getCoordinate(n));null!==a&&(o||(a.setStart(),o=!0))}}},interfaces_:function(){return[]},getClass:function(){return Ii}}),Ii.dissolve=function(t){var e=new Ii;return e.add(t),e.getResult()};var go=Object.freeze({LineDissolver:Ii});e(Ni.prototype,{hasChildren:function(){for(var t=0;4>t;t++)if(null!==this.subnode[t])return!0;return!1},isPrunable:function(){return!(this.hasChildren()||this.hasItems())},addAllItems:function(t){t.addAll(this.items);for(var e=0;4>e;e++)null!==this.subnode[e]&&this.subnode[e].addAllItems(t);return t},getNodeCount:function(){for(var t=0,e=0;4>e;e++)null!==this.subnode[e]&&(t+=this.subnode[e].size());return t+1},size:function(){for(var t=0,e=0;4>e;e++)null!==this.subnode[e]&&(t+=this.subnode[e].size());return t+this.items.size()},addAllItemsFromOverlapping:function(t,e){if(!this.isSearchMatch(t))return null;e.addAll(this.items);for(var n=0;4>n;n++)null!==this.subnode[n]&&this.subnode[n].addAllItemsFromOverlapping(t,e)},visitItems:function(t,e){for(var n=this.items.iterator();n.hasNext();)e.visitItem(n.next())},hasItems:function(){return!this.items.isEmpty()},remove:function(t,e){if(!this.isSearchMatch(t))return!1;for(var n=!1,i=0;4>i;i++)if(null!==this.subnode[i]&&(n=this.subnode[i].remove(t,e))){this.subnode[i].isPrunable()&&(this.subnode[i]=null);break}return n?n:n=this.items.remove(e)},visit:function(t,e){if(!this.isSearchMatch(t))return null;this.visitItems(t,e);for(var n=0;4>n;n++)null!==this.subnode[n]&&this.subnode[n].visit(t,e)},getItems:function(){return this.items},depth:function(){for(var t=0,e=0;4>e;e++)if(null!==this.subnode[e]){var n=this.subnode[e].depth();n>t&&(t=n)}return t+1},isEmpty:function t(){var t=!0;this.items.isEmpty()||(t=!1);for(var e=0;4>e;e++)null!==this.subnode[e]&&(this.subnode[e].isEmpty()||(t=!1));return t},add:function(t){this.items.add(t)},interfaces_:function(){return[u]},getClass:function(){return Ni}}),Ni.getSubnodeIndex=function(t,e,n){var i=-1;return t.getMinX()>=e&&(t.getMinY()>=n&&(i=3),t.getMaxY()<=n&&(i=1)),t.getMaxX()<=e&&(t.getMinY()>=n&&(i=2),t.getMaxY()<=n&&(i=0)),i},Ci.exponent=function(t){return Si(64,t)-1023},Ci.powerOf2=function(t){return Math.pow(2,t)},e(wi.prototype,{getLevel:function(){return this.level},computeKey:function(){if(1===arguments.length){var t=arguments[0];for(this.level=wi.computeQuadLevel(t),this.env=new C,this.computeKey(this.level,t);!this.env.contains(t);)this.level+=1,this.computeKey(this.level,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1],i=Ci.powerOf2(e);this.pt.x=Math.floor(n.getMinX()/i)*i,this.pt.y=Math.floor(n.getMinY()/i)*i,this.env.init(this.pt.x,this.pt.x+i,this.pt.y,this.pt.y+i)}},getEnvelope:function(){return this.env},getCentre:function(){return new g((this.env.getMinX()+this.env.getMaxX())/2,(this.env.getMinY()+this.env.getMaxY())/2)},getPoint:function(){return this.pt},interfaces_:function(){return[]},getClass:function(){return wi}}),wi.computeQuadLevel=function(t){var e=t.getWidth(),n=t.getHeight(),i=e>n?e:n,r=Ci.exponent(i)+1;return r},h(Li,Ni),e(Li.prototype,{find:function(t){var e=Ni.getSubnodeIndex(t,this.centrex,this.centrey);if(-1===e)return this;if(null!==this.subnode[e]){var n=this.subnode[e];return n.find(t)}return this},isSearchMatch:function(t){return this.env.intersects(t)},getSubnode:function(t){return null===this.subnode[t]&&(this.subnode[t]=this.createSubnode(t)),this.subnode[t]},getEnvelope:function(){return this.env},getNode:function(t){var e=Ni.getSubnodeIndex(t,this.centrex,this.centrey);if(-1!==e){var n=this.getSubnode(e);return n.getNode(t)}return this},createSubnode:function(t){var e=0,n=0,i=0,r=0;switch(t){case 0:e=this.env.getMinX(),n=this.centrex,i=this.env.getMinY(),r=this.centrey;break;case 1:e=this.centrex,n=this.env.getMaxX(),i=this.env.getMinY(),r=this.centrey;break;case 2:e=this.env.getMinX(),n=this.centrex,i=this.centrey,r=this.env.getMaxY();break;case 3:e=this.centrex,n=this.env.getMaxX(),i=this.centrey,r=this.env.getMaxY()}var s=new C(e,n,i,r),o=new Li(s,this.level-1);return o},insertNode:function(t){f.isTrue(null===this.env||this.env.contains(t.env));var e=Ni.getSubnodeIndex(t.env,this.centrex,this.centrey);if(t.level===this.level-1)this.subnode[e]=t;else{var n=this.createSubnode(e);n.insertNode(t),this.subnode[e]=n}},interfaces_:function(){return[]},getClass:function(){return Li}}),Li.createNode=function(t){var e=new wi(t),n=new Li(e.getEnvelope(),e.getLevel());return n},Li.createExpanded=function(t,e){var n=new C(e);null!==t&&n.expandToInclude(t.env);var i=Li.createNode(n);return null!==t&&i.insertNode(t),i},e(Ri.prototype,{interfaces_:function(){return[]},getClass:function(){return Ri}}),Ri.isZeroWidth=function(t,e){var n=e-t;if(0===n)return!0;var i=Math.max(Math.abs(t),Math.abs(e)),r=n/i,s=Ci.exponent(r);return s<=Ri.MIN_BINARY_EXPONENT},Ri.MIN_BINARY_EXPONENT=-50,h(Ti,Ni),e(Ti.prototype,{insert:function(t,e){var n=Ni.getSubnodeIndex(t,Ti.origin.x,Ti.origin.y);if(-1===n)return this.add(e),null;var i=this.subnode[n];if(null===i||!i.getEnvelope().contains(t)){var r=Li.createExpanded(i,t);this.subnode[n]=r}this.insertContained(this.subnode[n],t,e)},isSearchMatch:function(t){return!0},insertContained:function(t,e,n){f.isTrue(t.getEnvelope().contains(e));var i=Ri.isZeroWidth(e.getMinX(),e.getMaxX()),r=Ri.isZeroWidth(e.getMinY(),e.getMaxY()),s=null;s=i||r?t.find(e):t.getNode(e),s.add(n)},interfaces_:function(){return[]},getClass:function(){return Ti}}),Ti.origin=new g(0,0),e(Pi.prototype,{size:function(){return null!==this.root?this.root.size():0},insert:function(t,e){this.collectStats(t);var n=Pi.ensureExtent(t,this.minExtent);this.root.insert(n,e)},query:function(){if(1===arguments.length){var t=arguments[0],e=new Yn;return this.query(t,e),e.getItems()}if(2===arguments.length){var n=arguments[0],i=arguments[1];this.root.visit(n,i)}},queryAll:function(){var t=new I;return this.root.addAllItems(t),
t},remove:function(t,e){var n=Pi.ensureExtent(t,this.minExtent);return this.root.remove(n,e)},collectStats:function(t){var e=t.getWidth();e<this.minExtent&&e>0&&(this.minExtent=e);var n=t.getHeight();n<this.minExtent&&n>0&&(this.minExtent=n)},depth:function(){return null!==this.root?this.root.depth():0},isEmpty:function(){return null===this.root},interfaces_:function(){return[Fe,u]},getClass:function(){return Pi}}),Pi.ensureExtent=function(t,e){var n=t.getMinX(),i=t.getMaxX(),r=t.getMinY(),s=t.getMaxY();return n!==i&&r!==s?t:(n===i&&(n-=e/2,i=n+e/2),r===s&&(r-=e/2,s=r+e/2),new C(n,i,r,s))},Pi.serialVersionUID=-0x678b60c967a25400;var po=Object.freeze({Quadtree:Pi}),vo=Object.freeze({STRtree:ke}),mo=Object.freeze({quadtree:po,strtree:vo}),yo=["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"];e(bi.prototype,{read:function(t){var e=void 0;e="string"==typeof t?JSON.parse(t):t;var n=e.type;if(!xo[n])throw new Error("Unknown GeoJSON type: "+e.type);return-1!==yo.indexOf(n)?xo[n].apply(this,[e.coordinates]):"GeometryCollection"===n?xo[n].apply(this,[e.geometries]):xo[n].apply(this,[e])},write:function(t){var e=t.getGeometryType();if(!Eo[e])throw new Error("Geometry is not supported");return Eo[e].apply(this,[t])}});var xo={Feature:function(t){var e={};for(var n in t)e[n]=t[n];if(t.geometry){var i=t.geometry.type;if(!xo[i])throw new Error("Unknown GeoJSON type: "+t.type);e.geometry=this.read(t.geometry)}return t.bbox&&(e.bbox=xo.bbox.apply(this,[t.bbox])),e},FeatureCollection:function(t){var e={};if(t.features){e.features=[];for(var n=0;n<t.features.length;++n)e.features.push(this.read(t.features[n]))}return t.bbox&&(e.bbox=this.parse.bbox.apply(this,[t.bbox])),e},coordinates:function t(e){for(var t=[],n=0;n<e.length;++n){var i=e[n];t.push(new g(i[0],i[1]))}return t},bbox:function(t){return this.geometryFactory.createLinearRing([new g(t[0],t[1]),new g(t[2],t[1]),new g(t[2],t[3]),new g(t[0],t[3]),new g(t[0],t[1])])},Point:function(t){var e=new g(t[0],t[1]);return this.geometryFactory.createPoint(e)},MultiPoint:function(t){for(var e=[],n=0;n<t.length;++n)e.push(xo.Point.apply(this,[t[n]]));return this.geometryFactory.createMultiPoint(e)},LineString:function(t){var e=xo.coordinates.apply(this,[t]);return this.geometryFactory.createLineString(e)},MultiLineString:function(t){for(var e=[],n=0;n<t.length;++n)e.push(xo.LineString.apply(this,[t[n]]));return this.geometryFactory.createMultiLineString(e)},Polygon:function(t){for(var e=xo.coordinates.apply(this,[t[0]]),n=this.geometryFactory.createLinearRing(e),i=[],r=1;r<t.length;++r){var s=t[r],o=xo.coordinates.apply(this,[s]),a=this.geometryFactory.createLinearRing(o);i.push(a)}return this.geometryFactory.createPolygon(n,i)},MultiPolygon:function(t){for(var e=[],n=0;n<t.length;++n){var i=t[n];e.push(xo.Polygon.apply(this,[i]))}return this.geometryFactory.createMultiPolygon(e)},GeometryCollection:function(t){for(var e=[],n=0;n<t.length;++n){var i=t[n];e.push(this.read(i))}return this.geometryFactory.createGeometryCollection(e)}},Eo={coordinate:function(t){return[t.x,t.y]},Point:function(t){var e=Eo.coordinate.apply(this,[t.getCoordinate()]);return{type:"Point",coordinates:e}},MultiPoint:function(t){for(var e=[],n=0;n<t.geometries.length;++n){var i=t.geometries[n],r=Eo.Point.apply(this,[i]);e.push(r.coordinates)}return{type:"MultiPoint",coordinates:e}},LineString:function(t){for(var e=[],n=t.getCoordinates(),i=0;i<n.length;++i){var r=n[i];e.push(Eo.coordinate.apply(this,[r]))}return{type:"LineString",coordinates:e}},MultiLineString:function(t){for(var e=[],n=0;n<t.geometries.length;++n){var i=t.geometries[n],r=Eo.LineString.apply(this,[i]);e.push(r.coordinates)}return{type:"MultiLineString",coordinates:e}},Polygon:function(t){var e=[],n=Eo.LineString.apply(this,[t.shell]);e.push(n.coordinates);for(var i=0;i<t.holes.length;++i){var r=t.holes[i],s=Eo.LineString.apply(this,[r]);e.push(s.coordinates)}return{type:"Polygon",coordinates:e}},MultiPolygon:function(t){for(var e=[],n=0;n<t.geometries.length;++n){var i=t.geometries[n],r=Eo.Polygon.apply(this,[i]);e.push(r.coordinates)}return{type:"MultiPolygon",coordinates:e}},GeometryCollection:function(t){for(var e=[],n=0;n<t.geometries.length;++n){var i=t.geometries[n],r=i.getGeometryType();e.push(Eo[r].apply(this,[i]))}return{type:"GeometryCollection",geometries:e}}};e(Oi.prototype,{read:function(t){var e=this.parser.read(t);return this.precisionModel.getType()===ee.FIXED&&this.reducePrecision(e),e},reducePrecision:function(t){var e,n;if(t.coordinate)this.precisionModel.makePrecise(t.coordinate);else if(t.points)for(e=0,n=t.points.length;n>e;e++)this.precisionModel.makePrecise(t.points[e]);else if(t.geometries)for(e=0,n=t.geometries.length;n>e;e++)this.reducePrecision(t.geometries[e])}}),e(_i.prototype,{write:function(t){return this.parser.write(t)}}),e(Mi.prototype,{read:function(t){var e=this.parser.read(t);return this.precisionModel.getType()===ee.FIXED&&this.reducePrecision(e),e},reducePrecision:function(t){if(t.coordinate)this.precisionModel.makePrecise(t.coordinate);else if(t.points)for(var e=0,n=t.points.coordinates.length;n>e;e++)this.precisionModel.makePrecise(t.points.coordinates[e]);else if(t.geometries)for(var i=0,r=t.geometries.length;r>i;i++)this.reducePrecision(t.geometries[i])}}),e(Ai.prototype,{read:function(t){return t instanceof ol.geom.Point?this.convertFromPoint(t):t instanceof ol.geom.LineString?this.convertFromLineString(t):t instanceof ol.geom.LinearRing?this.convertFromLinearRing(t):t instanceof ol.geom.Polygon?this.convertFromPolygon(t):t instanceof ol.geom.MultiPoint?this.convertFromMultiPoint(t):t instanceof ol.geom.MultiLineString?this.convertFromMultiLineString(t):t instanceof ol.geom.MultiPolygon?this.convertFromMultiPolygon(t):t instanceof ol.geom.GeometryCollection?this.convertFromCollection(t):void 0},convertFromPoint:function(t){var e=t.getCoordinates();return this.geometryFactory.createPoint(new g(e[0],e[1]))},convertFromLineString:function(t){return this.geometryFactory.createLineString(t.getCoordinates().map(function(t){return new g(t[0],t[1])}))},convertFromLinearRing:function(t){return this.geometryFactory.createLinearRing(t.getCoordinates().map(function(t){return new g(t[0],t[1])}))},convertFromPolygon:function(t){for(var e=t.getLinearRings(),n=null,i=[],r=0;r<e.length;r++){var s=this.convertFromLinearRing(e[r]);0===r?n=s:i.push(s)}return this.geometryFactory.createPolygon(n,i)},convertFromMultiPoint:function(t){var e=t.getPoints().map(function(t){return this.convertFromPoint(t)},this);return this.geometryFactory.createMultiPoint(e)},convertFromMultiLineString:function(t){var e=t.getLineStrings().map(function(t){return this.convertFromLineString(t)},this);return this.geometryFactory.createMultiLineString(e)},convertFromMultiPolygon:function(t){var e=t.getPolygons().map(function(t){return this.convertFromPolygon(t)},this);return this.geometryFactory.createMultiPolygon(e)},convertFromCollection:function(t){var e=t.getGeometries().map(function(t){return this.read(t)},this);return this.geometryFactory.createGeometryCollection(e)},write:function(t){return"Point"===t.getGeometryType()?this.convertToPoint(t.getCoordinate()):"LineString"===t.getGeometryType()?this.convertToLineString(t):"LinearRing"===t.getGeometryType()?this.convertToLinearRing(t):"Polygon"===t.getGeometryType()?this.convertToPolygon(t):"MultiPoint"===t.getGeometryType()?this.convertToMultiPoint(t):"MultiLineString"===t.getGeometryType()?this.convertToMultiLineString(t):"MultiPolygon"===t.getGeometryType()?this.convertToMultiPolygon(t):"GeometryCollection"===t.getGeometryType()?this.convertToCollection(t):void 0},convertToPoint:function(t){return new ol.geom.Point([t.x,t.y])},convertToLineString:function(t){var e=t.points.coordinates.map(Di);return new ol.geom.LineString(e)},convertToLinearRing:function(t){var e=t.points.coordinates.map(Di);return new ol.geom.LinearRing(e)},convertToPolygon:function(t){for(var e=[t.shell.points.coordinates.map(Di)],n=0;n<t.holes.length;n++)e.push(t.holes[n].points.coordinates.map(Di));return new ol.geom.Polygon(e)},convertToMultiPoint:function(t){return new ol.geom.MultiPoint(t.getCoordinates().map(Di))},convertToMultiLineString:function(t){for(var e=[],n=0;n<t.geometries.length;n++)e.push(this.convertToLineString(t.geometries[n]).getCoordinates());return new ol.geom.MultiLineString(e)},convertToMultiPolygon:function(t){for(var e=[],n=0;n<t.geometries.length;n++)e.push(this.convertToPolygon(t.geometries[n]).getCoordinates());return new ol.geom.MultiPolygon(e)},convertToCollection:function(t){for(var e=[],n=0;n<t.geometries.length;n++){var i=t.geometries[n];e.push(this.write(i))}return new ol.geom.GeometryCollection(e)}});var Io=Object.freeze({GeoJSONReader:Oi,GeoJSONWriter:_i,OL3Parser:Ai,WKTReader:Mi,WKTWriter:se});e(Fi.prototype,{rescale:function(){if(R(arguments[0],v))for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.rescale(n.getCoordinates())}else if(arguments[0]instanceof Array){var i=arguments[0],r=null,s=null;2===i.length&&(r=new g(i[0]),s=new g(i[1]));for(var e=0;e<i.length;e++)i[e].x=i[e].x/this.scaleFactor+this.offsetX,i[e].y=i[e].y/this.scaleFactor+this.offsetY;2===i.length&&i[0].equals2D(i[1])&&A.out.println(i)}},scale:function(){if(R(arguments[0],v)){for(var t=arguments[0],e=new I,n=t.iterator();n.hasNext();){var i=n.next();e.add(new Ke(this.scale(i.getCoordinates()),i.getData()))}return e}if(arguments[0]instanceof Array){for(var r=arguments[0],s=new Array(r.length).fill(null),n=0;n<r.length;n++)s[n]=new g(Math.round((r[n].x-this.offsetX)*this.scaleFactor),Math.round((r[n].y-this.offsetY)*this.scaleFactor),r[n].z);var o=H.removeRepeatedPoints(s);return o}},isIntegerPrecision:function(){return 1===this.scaleFactor},getNodedSubstrings:function(){var t=this.noder.getNodedSubstrings();return this.isScaled&&this.rescale(t),t},computeNodes:function(t){var e=t;this.isScaled&&(e=this.scale(t)),this.noder.computeNodes(e)},interfaces_:function(){return[tn]},getClass:function(){return Fi}});var No=Object.freeze({MCIndexNoder:nn,ScaledNoder:Fi,SegmentString:be});e(Gi.prototype,{isSimpleMultiPoint:function(t){if(t.isEmpty())return!0;for(var e=new at,n=0;n<t.getNumGeometries();n++){var i=t.getGeometryN(n),r=i.getCoordinate();if(e.contains(r))return this.nonSimpleLocation=r,!1;e.add(r)}return!0},isSimplePolygonal:function(t){for(var e=kn.getLines(t),n=e.iterator();n.hasNext();){var i=n.next();if(!this.isSimpleLinearGeometry(i))return!1}return!0},hasClosedEndpointIntersection:function(t){for(var e=new rt,n=t.getEdgeIterator();n.hasNext();){var i=n.next(),r=(i.getMaximumSegmentIndex(),i.isClosed()),s=i.getCoordinate(0);this.addEndpoint(e,s,r);var o=i.getCoordinate(i.getNumPoints()-1);this.addEndpoint(e,o,r)}for(var n=e.values().iterator();n.hasNext();){var a=n.next();if(a.isClosed&&2!==a.degree)return this.nonSimpleLocation=a.getCoordinate(),!0}return!1},getNonSimpleLocation:function(){return this.nonSimpleLocation},isSimpleLinearGeometry:function(t){if(t.isEmpty())return!0;var e=new $n(0,t),n=new ae,i=e.computeSelfNodes(n,!0);return i.hasIntersection()?i.hasProperIntersection()?(this.nonSimpleLocation=i.getProperIntersectionPoint(),!1):this.hasNonEndpointIntersection(e)?!1:!this.isClosedEndpointsInInterior||!this.hasClosedEndpointIntersection(e):!0},hasNonEndpointIntersection:function(t){for(var e=t.getEdgeIterator();e.hasNext();)for(var n=e.next(),i=n.getMaximumSegmentIndex(),r=n.getEdgeIntersectionList().iterator();r.hasNext();){var s=r.next();if(!s.isEndPoint(i))return this.nonSimpleLocation=s.getCoordinate(),!0}return!1},addEndpoint:function(t,e,n){var i=t.get(e);null===i&&(i=new qi(e),t.put(e,i)),i.addEndpoint(n)},computeSimple:function(t){return this.nonSimpleLocation=null,t.isEmpty()?!0:t instanceof St?this.isSimpleLinearGeometry(t):t instanceof gt?this.isSimpleLinearGeometry(t):t instanceof Pt?this.isSimpleMultiPoint(t):R(t,Rt)?this.isSimplePolygonal(t):t instanceof ft?this.isSimpleGeometryCollection(t):!0},isSimple:function(){return this.nonSimpleLocation=null,this.computeSimple(this.inputGeom)},isSimpleGeometryCollection:function(t){for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);if(!this.computeSimple(n))return!1}return!0},interfaces_:function(){return[]},getClass:function(){return Gi}}),e(qi.prototype,{addEndpoint:function(t){this.degree++,this.isClosed|=t},getCoordinate:function(){return this.pt},interfaces_:function(){return[]},getClass:function(){return qi}}),Gi.EndpointInfo=qi,e(Bi.prototype,{getEndCapStyle:function(){return this.endCapStyle},isSingleSided:function(){return this._isSingleSided},setQuadrantSegments:function(t){this.quadrantSegments=t,0===this.quadrantSegments&&(this.joinStyle=Bi.JOIN_BEVEL),this.quadrantSegments<0&&(this.joinStyle=Bi.JOIN_MITRE,this.mitreLimit=Math.abs(this.quadrantSegments)),0>=t&&(this.quadrantSegments=1),this.joinStyle!==Bi.JOIN_ROUND&&(this.quadrantSegments=Bi.DEFAULT_QUADRANT_SEGMENTS)},getJoinStyle:function(){return this.joinStyle},setJoinStyle:function(t){this.joinStyle=t},setSimplifyFactor:function(t){this.simplifyFactor=0>t?0:t},getSimplifyFactor:function(){return this.simplifyFactor},getQuadrantSegments:function(){return this.quadrantSegments},setEndCapStyle:function(t){this.endCapStyle=t},getMitreLimit:function(){return this.mitreLimit},setMitreLimit:function(t){this.mitreLimit=t},setSingleSided:function(t){this._isSingleSided=t},interfaces_:function(){return[]},getClass:function(){return Bi}}),Bi.bufferDistanceError=function(t){var e=Math.PI/2/t;return 1-Math.cos(e/2)},Bi.CAP_ROUND=1,Bi.CAP_FLAT=2,Bi.CAP_SQUARE=3,Bi.JOIN_ROUND=1,Bi.JOIN_MITRE=2,Bi.JOIN_BEVEL=3,Bi.DEFAULT_QUADRANT_SEGMENTS=8,Bi.DEFAULT_MITRE_LIMIT=5,Bi.DEFAULT_SIMPLIFY_FACTOR=.01,e(zi.prototype,{getCoordinate:function(){return this.minCoord},getRightmostSide:function(t,e){var n=this.getRightmostSideOfSegment(t,e);return 0>n&&(n=this.getRightmostSideOfSegment(t,e-1)),0>n&&(this.minCoord=null,this.checkForRightmostCoordinate(t)),n},findRightmostEdgeAtVertex:function(){var t=this.minDe.getEdge().getCoordinates();f.isTrue(this.minIndex>0&&this.minIndex<t.length,"rightmost point expected to be interior vertex of edge");var e=t[this.minIndex-1],n=t[this.minIndex+1],i=he.computeOrientation(this.minCoord,n,e),r=!1;e.y<this.minCoord.y&&n.y<this.minCoord.y&&i===he.COUNTERCLOCKWISE?r=!0:e.y>this.minCoord.y&&n.y>this.minCoord.y&&i===he.CLOCKWISE&&(r=!0),r&&(this.minIndex=this.minIndex-1)},getRightmostSideOfSegment:function(t,e){var n=t.getEdge(),i=n.getCoordinates();if(0>e||e+1>=i.length)return-1;if(i[e].y===i[e+1].y)return-1;var r=cn.LEFT;return i[e].y<i[e+1].y&&(r=cn.RIGHT),r},getEdge:function(){return this.orientedDe},checkForRightmostCoordinate:function(t){for(var e=t.getEdge().getCoordinates(),n=0;n<e.length-1;n++)(null===this.minCoord||e[n].x>this.minCoord.x)&&(this.minDe=t,this.minIndex=n,this.minCoord=e[n])},findRightmostEdgeAtNode:function(){var t=this.minDe.getNode(),e=t.getEdges();this.minDe=e.getRightmostEdge(),this.minDe.isForward()||(this.minDe=this.minDe.getSym(),this.minIndex=this.minDe.getEdge().getCoordinates().length-1)},findEdge:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();n.isForward()&&this.checkForRightmostCoordinate(n)}f.isTrue(0!==this.minIndex||this.minCoord.equals(this.minDe.getCoordinate()),"inconsistency in rightmost processing"),0===this.minIndex?this.findRightmostEdgeAtNode():this.findRightmostEdgeAtVertex(),this.orientedDe=this.minDe;var i=this.getRightmostSide(this.minDe,this.minIndex);i===cn.LEFT&&(this.orientedDe=this.minDe.getSym())},interfaces_:function(){return[]},getClass:function(){return zi}}),Vi.prototype.addLast=function(t){this.array_.push(t)},Vi.prototype.removeFirst=function(){return this.array_.shift()},Vi.prototype.isEmpty=function(){return 0===this.array_.length},e(ki.prototype,{clearVisitedEdges:function(){for(var t=this.dirEdgeList.iterator();t.hasNext();){var e=t.next();e.setVisited(!1)}},getRightmostCoordinate:function(){return this.rightMostCoord},computeNodeDepth:function(t){for(var e=null,n=t.getEdges().iterator();n.hasNext();){var i=n.next();if(i.isVisited()||i.getSym().isVisited()){e=i;break}}if(null===e)throw new sn("unable to find edge to compute depths at "+t.getCoordinate());t.getEdges().computeDepths(e);for(var n=t.getEdges().iterator();n.hasNext();){var i=n.next();i.setVisited(!0),this.copySymDepths(i)}},computeDepth:function(t){this.clearVisitedEdges();var e=this.finder.getEdge();e.getNode(),e.getLabel();e.setEdgeDepths(cn.RIGHT,t),this.copySymDepths(e),this.computeDepths(e)},create:function(t){this.addReachable(t),this.finder.findEdge(this.dirEdgeList),this.rightMostCoord=this.finder.getCoordinate()},findResultEdges:function(){for(var t=this.dirEdgeList.iterator();t.hasNext();){var e=t.next();e.getDepth(cn.RIGHT)>=1&&e.getDepth(cn.LEFT)<=0&&!e.isInteriorAreaEdge()&&e.setInResult(!0)}},computeDepths:function(t){var e=new J,n=new Vi,i=t.getNode();for(n.addLast(i),e.add(i),t.setVisited(!0);!n.isEmpty();){var r=n.removeFirst();e.add(r),this.computeNodeDepth(r);for(var s=r.getEdges().iterator();s.hasNext();){var o=s.next(),a=o.getSym();if(!a.isVisited()){var u=a.getNode();e.contains(u)||(n.addLast(u),e.add(u))}}}},compareTo:function(t){var e=t;return this.rightMostCoord.x<e.rightMostCoord.x?-1:this.rightMostCoord.x>e.rightMostCoord.x?1:0},getEnvelope:function(){if(null===this.env){for(var t=new C,e=this.dirEdgeList.iterator();e.hasNext();)for(var n=e.next(),i=n.getEdge().getCoordinates(),r=0;r<i.length-1;r++)t.expandToInclude(i[r]);this.env=t}return this.env},addReachable:function(t){var e=new pe;for(e.add(t);!e.empty();){var n=e.pop();this.add(n,e)}},copySymDepths:function(t){var e=t.getSym();e.setDepth(cn.LEFT,t.getDepth(cn.RIGHT)),e.setDepth(cn.RIGHT,t.getDepth(cn.LEFT))},add:function(t,e){t.setVisited(!0),this.nodes.add(t);for(var n=t.getEdges().iterator();n.hasNext();){var i=n.next();this.dirEdgeList.add(i);var r=i.getSym(),s=r.getNode();s.isVisited()||e.push(s)}},getNodes:function(){return this.nodes},getDirectedEdges:function(){return this.dirEdgeList},interfaces_:function(){return[s]},getClass:function(){return ki}}),e(Yi.prototype,{isDeletable:function(t,e,n,i){var r=this.inputLine[t],s=this.inputLine[e],o=this.inputLine[n];return this.isConcave(r,s,o)&&this.isShallow(r,s,o,i)?this.isShallowSampled(r,s,t,n,i):!1},deleteShallowConcavities:function(){for(var t=1,e=(this.inputLine.length-1,this.findNextNonDeletedIndex(t)),n=this.findNextNonDeletedIndex(e),i=!1;n<this.inputLine.length;){var r=!1;this.isDeletable(t,e,n,this.distanceTol)&&(this.isDeleted[e]=Yi.DELETE,r=!0,i=!0),t=r?n:e,e=this.findNextNonDeletedIndex(t),n=this.findNextNonDeletedIndex(e)}return i},isShallowConcavity:function(t,e,n,i){var r=he.computeOrientation(t,e,n),s=r===this.angleOrientation;if(!s)return!1;var o=he.distancePointLine(e,t,n);return i>o},isShallowSampled:function(t,e,n,i,r){var s=Math.trunc((i-n)/Yi.NUM_PTS_TO_CHECK);0>=s&&(s=1);for(var o=n;i>o;o+=s)if(!this.isShallow(t,e,this.inputLine[o],r))return!1;return!0},isConcave:function t(e,n,i){var r=he.computeOrientation(e,n,i),t=r===this.angleOrientation;return t},simplify:function(t){this.distanceTol=Math.abs(t),0>t&&(this.angleOrientation=he.CLOCKWISE),this.isDeleted=new Array(this.inputLine.length).fill(null);var e=!1;do e=this.deleteShallowConcavities();while(e);return this.collapseLine()},findNextNonDeletedIndex:function(t){for(var e=t+1;e<this.inputLine.length&&this.isDeleted[e]===Yi.DELETE;)e++;return e},isShallow:function(t,e,n,i){var r=he.distancePointLine(e,t,n);return i>r},collapseLine:function(){for(var t=new N,e=0;e<this.inputLine.length;e++)this.isDeleted[e]!==Yi.DELETE&&t.add(this.inputLine[e]);return t.toCoordinateArray()},interfaces_:function(){return[]},getClass:function(){return Yi}}),Yi.simplify=function(t,e){var n=new Yi(t);return n.simplify(e)},Yi.INIT=0,Yi.DELETE=1,Yi.KEEP=1,Yi.NUM_PTS_TO_CHECK=10,e(Ui.prototype,{getCoordinates:function(){var t=this.ptList.toArray(Ui.COORDINATE_ARRAY_TYPE);return t},setPrecisionModel:function(t){this.precisionModel=t},addPt:function(t){var e=new g(t);return this.precisionModel.makePrecise(e),this.isRedundant(e)?null:void this.ptList.add(e)},reverse:function(){},addPts:function(t,e){if(e)for(var n=0;n<t.length;n++)this.addPt(t[n]);else for(var n=t.length-1;n>=0;n--)this.addPt(t[n])},isRedundant:function(t){if(this.ptList.size()<1)return!1;var e=this.ptList.get(this.ptList.size()-1),n=t.distance(e);return n<this.minimimVertexDistance},toString:function(){var t=new ie,e=t.createLineString(this.getCoordinates());return e.toString()},closeRing:function(){if(this.ptList.size()<1)return null;var t=new g(this.ptList.get(0)),e=this.ptList.get(this.ptList.size()-1),n=null;return this.ptList.size()>=2&&(n=this.ptList.get(this.ptList.size()-2)),t.equals(e)?null:void this.ptList.add(t)},setMinimumVertexDistance:function(t){this.minimimVertexDistance=t},interfaces_:function(){return[]},getClass:function(){return Ui}}),Ui.COORDINATE_ARRAY_TYPE=new Array(0).fill(null),e(Xi.prototype,{addNextSegment:function(t,e){if(this.s0=this.s1,this.s1=this.s2,this.s2=t,this.seg0.setCoordinates(this.s0,this.s1),this.computeOffsetSegment(this.seg0,this.side,this.distance,this.offset0),this.seg1.setCoordinates(this.s1,this.s2),this.computeOffsetSegment(this.seg1,this.side,this.distance,this.offset1),this.s1.equals(this.s2))return null;var n=he.computeOrientation(this.s0,this.s1,this.s2),i=n===he.CLOCKWISE&&this.side===cn.LEFT||n===he.COUNTERCLOCKWISE&&this.side===cn.RIGHT;0===n?this.addCollinear(e):i?this.addOutsideTurn(n,e):this.addInsideTurn(n,e)},addLineEndCap:function(t,e){var n=new ce(t,e),i=new ce;this.computeOffsetSegment(n,cn.LEFT,this.distance,i);var r=new ce;this.computeOffsetSegment(n,cn.RIGHT,this.distance,r);var s=e.x-t.x,o=e.y-t.y,a=Math.atan2(o,s);switch(this.bufParams.getEndCapStyle()){case Bi.CAP_ROUND:this.segList.addPt(i.p1),this.addFilletArc(e,a+Math.PI/2,a-Math.PI/2,he.CLOCKWISE,this.distance),this.segList.addPt(r.p1);break;case Bi.CAP_FLAT:this.segList.addPt(i.p1),this.segList.addPt(r.p1);break;case Bi.CAP_SQUARE:var u=new g;u.x=Math.abs(this.distance)*Math.cos(a),u.y=Math.abs(this.distance)*Math.sin(a);var l=new g(i.p1.x+u.x,i.p1.y+u.y),h=new g(r.p1.x+u.x,r.p1.y+u.y);this.segList.addPt(l),this.segList.addPt(h)}},getCoordinates:function(){var t=this.segList.getCoordinates();return t},addMitreJoin:function(t,e,n,i){var r=!0,s=null;try{s=F.intersection(e.p0,e.p1,n.p0,n.p1);var o=0>=i?1:s.distance(t)/Math.abs(i);o>this.bufParams.getMitreLimit()&&(r=!1)}catch(t){if(!(t instanceof w))throw t;s=new g(0,0),r=!1}finally{}r?this.segList.addPt(s):this.addLimitedMitreJoin(e,n,i,this.bufParams.getMitreLimit())},addFilletCorner:function(t,e,n,i,r){var s=e.x-t.x,o=e.y-t.y,a=Math.atan2(o,s),u=n.x-t.x,l=n.y-t.y,h=Math.atan2(l,u);i===he.CLOCKWISE?h>=a&&(a+=2*Math.PI):a>=h&&(a-=2*Math.PI),this.segList.addPt(e),this.addFilletArc(t,a,h,i,r),this.segList.addPt(n)},addOutsideTurn:function(t,e){return this.offset0.p1.distance(this.offset1.p0)<this.distance*Xi.OFFSET_SEGMENT_SEPARATION_FACTOR?(this.segList.addPt(this.offset0.p1),null):void(this.bufParams.getJoinStyle()===Bi.JOIN_MITRE?this.addMitreJoin(this.s1,this.offset0,this.offset1,this.distance):this.bufParams.getJoinStyle()===Bi.JOIN_BEVEL?this.addBevelJoin(this.offset0,this.offset1):(e&&this.segList.addPt(this.offset0.p1),this.addFilletCorner(this.s1,this.offset0.p1,this.offset1.p0,t,this.distance),this.segList.addPt(this.offset1.p0)))},createSquare:function(t){this.segList.addPt(new g(t.x+this.distance,t.y+this.distance)),this.segList.addPt(new g(t.x+this.distance,t.y-this.distance)),this.segList.addPt(new g(t.x-this.distance,t.y-this.distance)),this.segList.addPt(new g(t.x-this.distance,t.y+this.distance)),this.segList.closeRing()},addSegments:function(t,e){this.segList.addPts(t,e)},addFirstSegment:function(){this.segList.addPt(this.offset1.p0)},addLastSegment:function(){this.segList.addPt(this.offset1.p1)},initSideSegments:function(t,e,n){this.s1=t,this.s2=e,this.side=n,this.seg1.setCoordinates(t,e),this.computeOffsetSegment(this.seg1,n,this.distance,this.offset1)},addLimitedMitreJoin:function(t,e,n,i){var r=this.seg0.p1,s=hi.angle(r,this.seg0.p0),o=(hi.angle(r,this.seg1.p1),hi.angleBetweenOriented(this.seg0.p0,r,this.seg1.p1)),a=o/2,u=hi.normalize(s+a),l=hi.normalize(u+Math.PI),h=i*n,c=h*Math.abs(Math.sin(a)),f=n-c,d=r.x+h*Math.cos(l),p=r.y+h*Math.sin(l),v=new g(d,p),m=new ce(r,v),y=m.pointAlongOffset(1,f),x=m.pointAlongOffset(1,-f);this.side===cn.LEFT?(this.segList.addPt(y),this.segList.addPt(x)):(this.segList.addPt(x),this.segList.addPt(y))},computeOffsetSegment:function(t,e,n,i){var r=e===cn.LEFT?1:-1,s=t.p1.x-t.p0.x,o=t.p1.y-t.p0.y,a=Math.sqrt(s*s+o*o),u=r*n*s/a,l=r*n*o/a;i.p0.x=t.p0.x-l,i.p0.y=t.p0.y+u,i.p1.x=t.p1.x-l,i.p1.y=t.p1.y+u},addFilletArc:function(t,e,n,i,r){var s=i===he.CLOCKWISE?-1:1,o=Math.abs(e-n),a=Math.trunc(o/this.filletAngleQuantum+.5);if(1>a)return null;var u=null,l=null;u=0,l=o/a;for(var h=u,c=new g;o>h;){var f=e+s*h;c.x=t.x+r*Math.cos(f),c.y=t.y+r*Math.sin(f),this.segList.addPt(c),h+=l}},addInsideTurn:function(t,e){if(this.li.computeIntersection(this.offset0.p0,this.offset0.p1,this.offset1.p0,this.offset1.p1),this.li.hasIntersection())this.segList.addPt(this.li.getIntersection(0));else if(this._hasNarrowConcaveAngle=!0,this.offset0.p1.distance(this.offset1.p0)<this.distance*Xi.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR)this.segList.addPt(this.offset0.p1);else{if(this.segList.addPt(this.offset0.p1),this.closingSegLengthFactor>0){var n=new g((this.closingSegLengthFactor*this.offset0.p1.x+this.s1.x)/(this.closingSegLengthFactor+1),(this.closingSegLengthFactor*this.offset0.p1.y+this.s1.y)/(this.closingSegLengthFactor+1));this.segList.addPt(n);var i=new g((this.closingSegLengthFactor*this.offset1.p0.x+this.s1.x)/(this.closingSegLengthFactor+1),(this.closingSegLengthFactor*this.offset1.p0.y+this.s1.y)/(this.closingSegLengthFactor+1));this.segList.addPt(i)}else this.segList.addPt(this.s1);this.segList.addPt(this.offset1.p0)}},createCircle:function(t){var e=new g(t.x+this.distance,t.y);this.segList.addPt(e),this.addFilletArc(t,0,2*Math.PI,-1,this.distance),this.segList.closeRing()},addBevelJoin:function(t,e){this.segList.addPt(t.p1),this.segList.addPt(e.p0)},init:function(t){this.distance=t,this.maxCurveSegmentError=t*(1-Math.cos(this.filletAngleQuantum/2)),this.segList=new Ui,this.segList.setPrecisionModel(this.precisionModel),this.segList.setMinimumVertexDistance(t*Xi.CURVE_VERTEX_SNAP_DISTANCE_FACTOR)},addCollinear:function(t){this.li.computeIntersection(this.s0,this.s1,this.s1,this.s2);var e=this.li.getIntersectionNum();e>=2&&(this.bufParams.getJoinStyle()===Bi.JOIN_BEVEL||this.bufParams.getJoinStyle()===Bi.JOIN_MITRE?(t&&this.segList.addPt(this.offset0.p1),this.segList.addPt(this.offset1.p0)):this.addFilletCorner(this.s1,this.offset0.p1,this.offset1.p0,he.CLOCKWISE,this.distance))},closeRing:function(){this.segList.closeRing()},hasNarrowConcaveAngle:function(){return this._hasNarrowConcaveAngle},interfaces_:function(){return[]},getClass:function(){return Xi}}),Xi.OFFSET_SEGMENT_SEPARATION_FACTOR=.001,Xi.INSIDE_TURN_VERTEX_SNAP_DISTANCE_FACTOR=.001,Xi.CURVE_VERTEX_SNAP_DISTANCE_FACTOR=1e-6,Xi.MAX_CLOSING_SEG_LEN_FACTOR=80,e(Hi.prototype,{getOffsetCurve:function(t,e){if(this.distance=e,0===e)return null;var n=0>e,i=Math.abs(e),r=this.getSegGen(i);t.length<=1?this.computePointCurve(t[0],r):this.computeOffsetCurve(t,n,r);var s=r.getCoordinates();return n&&H.reverse(s),s},computeSingleSidedBufferCurve:function(t,e,n){var i=this.simplifyTolerance(this.distance);if(e){n.addSegments(t,!0);var r=Yi.simplify(t,-i),s=r.length-1;n.initSideSegments(r[s],r[s-1],cn.LEFT),n.addFirstSegment();for(var o=s-2;o>=0;o--)n.addNextSegment(r[o],!0)}else{n.addSegments(t,!1);var a=Yi.simplify(t,i),u=a.length-1;n.initSideSegments(a[0],a[1],cn.LEFT),n.addFirstSegment();for(var o=2;u>=o;o++)n.addNextSegment(a[o],!0)}n.addLastSegment(),n.closeRing()},computeRingBufferCurve:function(t,e,n){var i=this.simplifyTolerance(this.distance);e===cn.RIGHT&&(i=-i);var r=Yi.simplify(t,i),s=r.length-1;n.initSideSegments(r[s-1],r[0],e);for(var o=1;s>=o;o++){var a=1!==o;n.addNextSegment(r[o],a)}n.closeRing()},computeLineBufferCurve:function(t,e){var n=this.simplifyTolerance(this.distance),i=Yi.simplify(t,n),r=i.length-1;e.initSideSegments(i[0],i[1],cn.LEFT);for(var s=2;r>=s;s++)e.addNextSegment(i[s],!0);e.addLastSegment(),e.addLineEndCap(i[r-1],i[r]);var o=Yi.simplify(t,-n),a=o.length-1;e.initSideSegments(o[a],o[a-1],cn.LEFT);for(var s=a-2;s>=0;s--)e.addNextSegment(o[s],!0);e.addLastSegment(),e.addLineEndCap(o[1],o[0]),e.closeRing()},computePointCurve:function(t,e){switch(this.bufParams.getEndCapStyle()){case Bi.CAP_ROUND:e.createCircle(t);break;case Bi.CAP_SQUARE:e.createSquare(t)}},getLineCurve:function(t,e){if(this.distance=e,0>e&&!this.bufParams.isSingleSided())return null;if(0===e)return null;var n=Math.abs(e),i=this.getSegGen(n);if(t.length<=1)this.computePointCurve(t[0],i);else if(this.bufParams.isSingleSided()){var r=0>e;this.computeSingleSidedBufferCurve(t,r,i)}else this.computeLineBufferCurve(t,i);var s=i.getCoordinates();return s},getBufferParameters:function(){return this.bufParams},simplifyTolerance:function(t){return t*this.bufParams.getSimplifyFactor()},getRingCurve:function(t,e,n){if(this.distance=n,t.length<=2)return this.getLineCurve(t,n);if(0===n)return Hi.copyCoordinates(t);var i=this.getSegGen(n);return this.computeRingBufferCurve(t,e,i),i.getCoordinates()},computeOffsetCurve:function(t,e,n){var i=this.simplifyTolerance(this.distance);if(e){var r=Yi.simplify(t,-i),s=r.length-1;n.initSideSegments(r[s],r[s-1],cn.LEFT),n.addFirstSegment();for(var o=s-2;o>=0;o--)n.addNextSegment(r[o],!0)}else{var a=Yi.simplify(t,i),u=a.length-1;n.initSideSegments(a[0],a[1],cn.LEFT),n.addFirstSegment();for(var o=2;u>=o;o++)n.addNextSegment(a[o],!0)}n.addLastSegment()},getSegGen:function(t){return new Xi(this.precisionModel,this.bufParams,t)},interfaces_:function(){return[]},getClass:function(){return Hi}}),Hi.copyCoordinates=function(t){for(var e=new Array(t.length).fill(null),n=0;n<e.length;n++)e[n]=new g(t[n]);return e},e(Wi.prototype,{findStabbedSegments:function(){if(1===arguments.length){for(var t=arguments[0],e=new I,n=this.subgraphs.iterator();n.hasNext();){var i=n.next(),r=i.getEnvelope();t.y<r.getMinY()||t.y>r.getMaxY()||this.findStabbedSegments(t,i.getDirectedEdges(),e)}return e}if(3===arguments.length)if(R(arguments[2],y)&&arguments[0]instanceof g&&arguments[1]instanceof In)for(var s=arguments[0],o=arguments[1],a=arguments[2],u=o.getEdge().getCoordinates(),n=0;n<u.length-1;n++){this.seg.p0=u[n],this.seg.p1=u[n+1],this.seg.p0.y>this.seg.p1.y&&this.seg.reverse();var l=Math.max(this.seg.p0.x,this.seg.p1.x);if(!(l<s.x||this.seg.isHorizontal()||s.y<this.seg.p0.y||s.y>this.seg.p1.y||he.computeOrientation(this.seg.p0,this.seg.p1,s)===he.RIGHT)){var h=o.getDepth(cn.LEFT);this.seg.p0.equals(u[n])||(h=o.getDepth(cn.RIGHT));var c=new ji(this.seg,h);a.add(c)}}else if(R(arguments[2],y)&&arguments[0]instanceof g&&R(arguments[1],y))for(var f=arguments[0],d=arguments[1],p=arguments[2],n=d.iterator();n.hasNext();){var v=n.next();v.isForward()&&this.findStabbedSegments(f,v,p)}},getDepth:function(t){var e=this.findStabbedSegments(t);if(0===e.size())return 0;var n=ho.min(e);return n.leftDepth},interfaces_:function(){return[]},getClass:function(){return Wi}}),e(ji.prototype,{compareTo:function(t){var e=t;if(this.upwardSeg.minX()>=e.upwardSeg.maxX())return 1;if(this.upwardSeg.maxX()<=e.upwardSeg.minX())return-1;var n=this.upwardSeg.orientationIndex(e.upwardSeg);return 0!==n?n:(n=-1*e.upwardSeg.orientationIndex(this.upwardSeg),0!==n?n:this.upwardSeg.compareTo(e.upwardSeg))},compareX:function(t,e){var n=t.p0.compareTo(e.p0);return 0!==n?n:t.p1.compareTo(e.p1)},toString:function(){return this.upwardSeg.toString()},interfaces_:function(){return[s]},getClass:function(){return ji}}),Wi.DepthSegment=ji,e(Ki.prototype,{addPoint:function(t){if(this.distance<=0)return null;
var e=t.getCoordinates(),n=this.curveBuilder.getLineCurve(e,this.distance);this.addCurve(n,L.EXTERIOR,L.INTERIOR)},addPolygon:function(t){var e=this.distance,n=cn.LEFT;this.distance<0&&(e=-this.distance,n=cn.RIGHT);var i=t.getExteriorRing(),r=H.removeRepeatedPoints(i.getCoordinates());if(this.distance<0&&this.isErodedCompletely(i,this.distance))return null;if(this.distance<=0&&r.length<3)return null;this.addPolygonRing(r,e,n,L.EXTERIOR,L.INTERIOR);for(var s=0;s<t.getNumInteriorRing();s++){var o=t.getInteriorRingN(s),a=H.removeRepeatedPoints(o.getCoordinates());this.distance>0&&this.isErodedCompletely(o,-this.distance)||this.addPolygonRing(a,e,cn.opposite(n),L.INTERIOR,L.EXTERIOR)}},isTriangleErodedCompletely:function(t,e){var n=new ci(t[0],t[1],t[2]),i=n.inCentre(),r=he.distancePointLine(i,n.p0,n.p1);return r<Math.abs(e)},addLineString:function(t){if(this.distance<=0&&!this.curveBuilder.getBufferParameters().isSingleSided())return null;var e=H.removeRepeatedPoints(t.getCoordinates()),n=this.curveBuilder.getLineCurve(e,this.distance);this.addCurve(n,L.EXTERIOR,L.INTERIOR)},addCurve:function(t,e,n){if(null===t||t.length<2)return null;var i=new Ke(t,new gn(0,L.BOUNDARY,e,n));this.curveList.add(i)},getCurves:function(){return this.add(this.inputGeom),this.curveList},addPolygonRing:function(t,e,n,i,r){if(0===e&&t.length<bt.MINIMUM_VALID_SIZE)return null;var s=i,o=r;t.length>=bt.MINIMUM_VALID_SIZE&&he.isCCW(t)&&(s=r,o=i,n=cn.opposite(n));var a=this.curveBuilder.getRingCurve(t,n,e);this.addCurve(a,s,o)},add:function(t){if(t.isEmpty())return null;if(t instanceof Tt)this.addPolygon(t);else if(t instanceof St)this.addLineString(t);else if(t instanceof Lt)this.addPoint(t);else if(t instanceof Pt)this.addCollection(t);else if(t instanceof gt)this.addCollection(t);else if(t instanceof Ot)this.addCollection(t);else{if(!(t instanceof ft))throw new UnsupportedOperationException(t.getClass().getName());this.addCollection(t)}},isErodedCompletely:function(t,e){var n=t.getCoordinates();if(n.length<4)return 0>e;if(4===n.length)return this.isTriangleErodedCompletely(n,e);var i=t.getEnvelopeInternal(),r=Math.min(i.getHeight(),i.getWidth());return 0>e&&2*Math.abs(e)>r},addCollection:function(t){for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);this.add(n)}},interfaces_:function(){return[]},getClass:function(){return Ki}}),e(Zi.prototype,{isTrivialIntersection:function(t,e,n,i){if(t===n&&1===this.li.getIntersectionNum()){if(Zi.isAdjacentSegments(e,i))return!0;if(t.isClosed()){var r=t.size()-1;if(0===e&&i===r||0===i&&e===r)return!0}}return!1},getProperIntersectionPoint:function(){return this.properIntersectionPoint},hasProperInteriorIntersection:function(){return this.hasProperInterior},getLineIntersector:function(){return this.li},hasProperIntersection:function(){return this.hasProper},processIntersections:function(t,e,n,i){if(t===n&&e===i)return null;this.numTests++;var r=t.getCoordinates()[e],s=t.getCoordinates()[e+1],o=n.getCoordinates()[i],a=n.getCoordinates()[i+1];this.li.computeIntersection(r,s,o,a),this.li.hasIntersection()&&(this.numIntersections++,this.li.isInteriorIntersection()&&(this.numInteriorIntersections++,this.hasInterior=!0),this.isTrivialIntersection(t,e,n,i)||(this._hasIntersection=!0,t.addIntersections(this.li,e,0),n.addIntersections(this.li,i,1),this.li.isProper()&&(this.numProperIntersections++,this.hasProper=!0,this.hasProperInterior=!0)))},hasIntersection:function(){return this._hasIntersection},isDone:function(){return!1},hasInteriorIntersection:function(){return this.hasInterior},interfaces_:function(){return[on]},getClass:function(){return Zi}}),Zi.isAdjacentSegments=function(t,e){return 1===Math.abs(t-e)},e(Qi.prototype,{setWorkingPrecisionModel:function(t){this.workingPrecisionModel=t},insertUniqueEdge:function(t){var e=this.edgeList.findEqualEdge(t);if(null!==e){var n=e.getLabel(),i=t.getLabel();e.isPointwiseEqual(t)||(i=new gn(t.getLabel()),i.flip()),n.merge(i);var r=Qi.depthDelta(i),s=e.getDepthDelta(),o=s+r;e.setDepthDelta(o)}else this.edgeList.add(t),t.setDepthDelta(Qi.depthDelta(t.getLabel()))},buildSubgraphs:function(t,e){for(var n=new I,i=t.iterator();i.hasNext();){var r=i.next(),s=r.getRightmostCoordinate(),o=new Wi(n),a=o.getDepth(s);r.computeDepth(a),r.findResultEdges(),n.add(r),e.add(r.getDirectedEdges(),r.getNodes())}},createSubgraphs:function(t){for(var e=new I,n=t.getNodes().iterator();n.hasNext();){var i=n.next();if(!i.isVisited()){var r=new ki;r.create(i),e.add(r)}}return ho.sort(e,ho.reverseOrder()),e},createEmptyResultGeometry:function(){var t=this.geomFact.createPolygon();return t},getNoder:function(t){if(null!==this.workingNoder)return this.workingNoder;var e=new nn,n=new ae;return n.setPrecisionModel(t),e.setSegmentIntersector(new Zi(n)),e},buffer:function(t,e){var n=this.workingPrecisionModel;null===n&&(n=t.getPrecisionModel()),this.geomFact=t.getFactory();var i=new Hi(n,this.bufParams),r=new Ki(t,e,i),s=r.getCurves();if(s.size()<=0)return this.createEmptyResultGeometry();this.computeNodedEdges(s,n),this.graph=new Cn(new On),this.graph.addEdges(this.edgeList.getEdges());var o=this.createSubgraphs(this.graph),a=new Sn(this.geomFact);this.buildSubgraphs(o,a);var u=a.getPolygons();if(u.size()<=0)return this.createEmptyResultGeometry();var l=this.geomFact.buildGeometry(u);return l},computeNodedEdges:function(t,e){var n=this.getNoder(e);n.computeNodes(t);for(var i=n.getNodedSubstrings(),r=i.iterator();r.hasNext();){var s=r.next(),o=s.getCoordinates();if(2!==o.length||!o[0].equals2D(o[1])){var a=s.getData(),u=new Jn(s.getCoordinates(),new gn(a));this.insertUniqueEdge(u)}}},setNoder:function(t){this.workingNoder=t},interfaces_:function(){return[]},getClass:function(){return Qi}}),Qi.depthDelta=function(t){var e=t.getLocation(0,cn.LEFT),n=t.getLocation(0,cn.RIGHT);return e===L.INTERIOR&&n===L.EXTERIOR?1:e===L.EXTERIOR&&n===L.INTERIOR?-1:0},Qi.convertSegStrings=function(t){for(var e=new ie,n=new I;t.hasNext();){var i=t.next(),r=e.createLineString(i.getCoordinates());n.add(r)}return e.buildGeometry(n)},e(Ji.prototype,{checkEndPtVertexIntersections:function(){if(0===arguments.length)for(var t=this.segStrings.iterator();t.hasNext();){var e=t.next(),n=e.getCoordinates();this.checkEndPtVertexIntersections(n[0],this.segStrings),this.checkEndPtVertexIntersections(n[n.length-1],this.segStrings)}else if(2===arguments.length)for(var i=arguments[0],r=arguments[1],t=r.iterator();t.hasNext();)for(var e=t.next(),n=e.getCoordinates(),s=1;s<n.length-1;s++)if(n[s].equals(i))throw new l("found endpt/interior pt intersection at index "+s+" :pt "+i)},checkInteriorIntersections:function(){if(0===arguments.length)for(var t=this.segStrings.iterator();t.hasNext();)for(var e=t.next(),n=this.segStrings.iterator();n.hasNext();){var i=n.next();this.checkInteriorIntersections(e,i)}else if(2===arguments.length)for(var r=arguments[0],s=arguments[1],o=r.getCoordinates(),a=s.getCoordinates(),u=0;u<o.length-1;u++)for(var h=0;h<a.length-1;h++)this.checkInteriorIntersections(r,u,s,h);else if(4===arguments.length){var c=arguments[0],f=arguments[1],g=arguments[2],d=arguments[3];if(c===g&&f===d)return null;var p=c.getCoordinates()[f],v=c.getCoordinates()[f+1],m=g.getCoordinates()[d],y=g.getCoordinates()[d+1];if(this.li.computeIntersection(p,v,m,y),this.li.hasIntersection()&&(this.li.isProper()||this.hasInteriorIntersection(this.li,p,v)||this.hasInteriorIntersection(this.li,m,y)))throw new l("found non-noded intersection at "+p+"-"+v+" and "+m+"-"+y)}},checkValid:function(){this.checkEndPtVertexIntersections(),this.checkInteriorIntersections(),this.checkCollapses()},checkCollapses:function(){if(0===arguments.length)for(var t=this.segStrings.iterator();t.hasNext();){var e=t.next();this.checkCollapses(e)}else if(1===arguments.length)for(var n=arguments[0],i=n.getCoordinates(),t=0;t<i.length-2;t++)this.checkCollapse(i[t],i[t+1],i[t+2])},hasInteriorIntersection:function(t,e,n){for(var i=0;i<t.getIntersectionNum();i++){var r=t.getIntersection(i);if(!r.equals(e)&&!r.equals(n))return!0}return!1},checkCollapse:function(t,e,n){if(t.equals(n))throw new l("found non-noded collapse at "+Ji.fact.createLineString([t,e,n]))},interfaces_:function(){return[]},getClass:function(){return Ji}}),Ji.fact=new ie,e($i.prototype,{intersectsScaled:function(t,e){var n=Math.min(t.x,e.x),i=Math.max(t.x,e.x),r=Math.min(t.y,e.y),s=Math.max(t.y,e.y),o=this.maxx<n||this.minx>i||this.maxy<r||this.miny>s;if(o)return!1;var a=this.intersectsToleranceSquare(t,e);return f.isTrue(!(o&&a),"Found bad envelope test"),a},initCorners:function(t){var e=.5;this.minx=t.x-e,this.maxx=t.x+e,this.miny=t.y-e,this.maxy=t.y+e,this.corner[0]=new g(this.maxx,this.maxy),this.corner[1]=new g(this.minx,this.maxy),this.corner[2]=new g(this.minx,this.miny),this.corner[3]=new g(this.maxx,this.miny)},intersects:function(t,e){return 1===this.scaleFactor?this.intersectsScaled(t,e):(this.copyScaled(t,this.p0Scaled),this.copyScaled(e,this.p1Scaled),this.intersectsScaled(this.p0Scaled,this.p1Scaled))},scale:function(t){return Math.round(t*this.scaleFactor)},getCoordinate:function(){return this.originalPt},copyScaled:function(t,e){e.x=this.scale(t.x),e.y=this.scale(t.y)},getSafeEnvelope:function(){if(null===this.safeEnv){var t=$i.SAFE_ENV_EXPANSION_FACTOR/this.scaleFactor;this.safeEnv=new C(this.originalPt.x-t,this.originalPt.x+t,this.originalPt.y-t,this.originalPt.y+t)}return this.safeEnv},intersectsPixelClosure:function(t,e){return this.li.computeIntersection(t,e,this.corner[0],this.corner[1]),this.li.hasIntersection()?!0:(this.li.computeIntersection(t,e,this.corner[1],this.corner[2]),this.li.hasIntersection()?!0:(this.li.computeIntersection(t,e,this.corner[2],this.corner[3]),this.li.hasIntersection()?!0:(this.li.computeIntersection(t,e,this.corner[3],this.corner[0]),!!this.li.hasIntersection())))},intersectsToleranceSquare:function(t,e){var n=!1,i=!1;return this.li.computeIntersection(t,e,this.corner[0],this.corner[1]),this.li.isProper()?!0:(this.li.computeIntersection(t,e,this.corner[1],this.corner[2]),this.li.isProper()?!0:(this.li.hasIntersection()&&(n=!0),this.li.computeIntersection(t,e,this.corner[2],this.corner[3]),this.li.isProper()?!0:(this.li.hasIntersection()&&(i=!0),this.li.computeIntersection(t,e,this.corner[3],this.corner[0]),this.li.isProper()?!0:n&&i?!0:t.equals(this.pt)?!0:!!e.equals(this.pt))))},addSnappedNode:function(t,e){var n=t.getCoordinate(e),i=t.getCoordinate(e+1);return this.intersects(n,i)?(t.addIntersection(this.getCoordinate(),e),!0):!1},interfaces_:function(){return[]},getClass:function(){return $i}}),$i.SAFE_ENV_EXPANSION_FACTOR=.75,e(tr.prototype,{select:function(){if(1===arguments.length){arguments[0]}else if(2===arguments.length){var t=arguments[0],e=arguments[1];t.getLineSegment(e,this.selectedSegment),this.select(this.selectedSegment)}},interfaces_:function(){return[]},getClass:function(){return tr}}),e(er.prototype,{snap:function(){if(1===arguments.length){var t=arguments[0];return this.snap(t,null,-1)}if(3===arguments.length){var e=arguments[0],n=arguments[1],i=arguments[2],r=e.getSafeEnvelope(),s=new nr(e,n,i);return this.index.query(r,{interfaces_:function(){return[Ae]},visitItem:function(t){var e=t;e.select(r,s)}}),s.isNodeAdded()}},interfaces_:function(){return[]},getClass:function(){return er}}),h(nr,tr),e(nr.prototype,{isNodeAdded:function(){return this._isNodeAdded},select:function(){if(2!==arguments.length)return tr.prototype.select.apply(this,arguments);var t=arguments[0],e=arguments[1],n=t.getContext();return null!==this.parentEdge&&n===this.parentEdge&&e===this.hotPixelVertexIndex?null:void(this._isNodeAdded=this.hotPixel.addSnappedNode(n,e))},interfaces_:function(){return[]},getClass:function(){return nr}}),er.HotPixelSnapAction=nr,e(ir.prototype,{processIntersections:function(t,e,n,i){if(t===n&&e===i)return null;var r=t.getCoordinates()[e],s=t.getCoordinates()[e+1],o=n.getCoordinates()[i],a=n.getCoordinates()[i+1];if(this.li.computeIntersection(r,s,o,a),this.li.hasIntersection()&&this.li.isInteriorIntersection()){for(var u=0;u<this.li.getIntersectionNum();u++)this.interiorIntersections.add(this.li.getIntersection(u));t.addIntersections(this.li,e,0),n.addIntersections(this.li,i,1)}},isDone:function(){return!1},getInteriorIntersections:function(){return this.interiorIntersections},interfaces_:function(){return[on]},getClass:function(){return ir}}),e(rr.prototype,{checkCorrectness:function(t){var e=Ke.getNodedSubstrings(t),n=new Ji(e);try{n.checkValid()}catch(t){if(!(t instanceof S))throw t;t.printStackTrace()}finally{}},getNodedSubstrings:function(){return Ke.getNodedSubstrings(this.nodedSegStrings)},snapRound:function(t,e){var n=this.findInteriorIntersections(t,e);this.computeIntersectionSnaps(n),this.computeVertexSnaps(t)},findInteriorIntersections:function(t,e){var n=new ir(e);return this.noder.setSegmentIntersector(n),this.noder.computeNodes(t),n.getInteriorIntersections()},computeVertexSnaps:function(){if(R(arguments[0],v))for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.computeVertexSnaps(n)}else if(arguments[0]instanceof Ke)for(var i=arguments[0],r=i.getCoordinates(),s=0;s<r.length;s++){var o=new $i(r[s],this.scaleFactor,this.li),a=this.pointSnapper.snap(o,i,s);a&&i.addIntersection(r[s],s)}},computeNodes:function(t){this.nodedSegStrings=t,this.noder=new nn,this.pointSnapper=new er(this.noder.getIndex()),this.snapRound(t,this.li)},computeIntersectionSnaps:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),i=new $i(n,this.scaleFactor,this.li);this.pointSnapper.snap(i)}},interfaces_:function(){return[tn]},getClass:function(){return rr}}),e(sr.prototype,{bufferFixedPrecision:function(t){var e=new Fi(new rr(new ee(1)),t.getScale()),n=new Qi(this.bufParams);n.setWorkingPrecisionModel(t),n.setNoder(e),this.resultGeometry=n.buffer(this.argGeom,this.distance)},bufferReducedPrecision:function(){if(0===arguments.length){for(var t=sr.MAX_PRECISION_DIGITS;t>=0;t--){try{this.bufferReducedPrecision(t)}catch(t){if(!(t instanceof sn))throw t;this.saveException=t}finally{}if(null!==this.resultGeometry)return null}throw this.saveException}if(1===arguments.length){var e=arguments[0],n=sr.precisionScaleFactor(this.argGeom,this.distance,e),i=new ee(n);this.bufferFixedPrecision(i)}},computeGeometry:function(){if(this.bufferOriginalPrecision(),null!==this.resultGeometry)return null;var t=this.argGeom.getFactory().getPrecisionModel();t.getType()===ee.FIXED?this.bufferFixedPrecision(t):this.bufferReducedPrecision()},setQuadrantSegments:function(t){this.bufParams.setQuadrantSegments(t)},bufferOriginalPrecision:function(){try{var t=new Qi(this.bufParams);this.resultGeometry=t.buffer(this.argGeom,this.distance)}catch(t){if(!(t instanceof l))throw t;this.saveException=t}finally{}},getResultGeometry:function(t){return this.distance=t,this.computeGeometry(),this.resultGeometry},setEndCapStyle:function(t){this.bufParams.setEndCapStyle(t)},interfaces_:function(){return[]},getClass:function(){return sr}}),sr.bufferOp=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=new sr(t),i=n.getResultGeometry(e);return i}if(3===arguments.length){if(Number.isInteger(arguments[2])&&arguments[0]instanceof B&&"number"==typeof arguments[1]){var r=arguments[0],s=arguments[1],o=arguments[2],a=new sr(r);a.setQuadrantSegments(o);var i=a.getResultGeometry(s);return i}if(arguments[2]instanceof Bi&&arguments[0]instanceof B&&"number"==typeof arguments[1]){var u=arguments[0],l=arguments[1],h=arguments[2],a=new sr(u,h),i=a.getResultGeometry(l);return i}}else if(4===arguments.length){var c=arguments[0],f=arguments[1],g=arguments[2],d=arguments[3],a=new sr(c);a.setQuadrantSegments(g),a.setEndCapStyle(d);var i=a.getResultGeometry(f);return i}},sr.precisionScaleFactor=function(t,e,n){var i=t.getEnvelopeInternal(),r=T.max(Math.abs(i.getMaxX()),Math.abs(i.getMaxY()),Math.abs(i.getMinX()),Math.abs(i.getMinY())),s=e>0?e:0,o=r+2*s,a=Math.trunc(Math.log(o)/Math.log(10)+1),u=n-a,l=Math.pow(10,u);return l},sr.CAP_ROUND=Bi.CAP_ROUND,sr.CAP_BUTT=Bi.CAP_FLAT,sr.CAP_FLAT=Bi.CAP_FLAT,sr.CAP_SQUARE=Bi.CAP_SQUARE,sr.MAX_PRECISION_DIGITS=12;var Co=Object.freeze({BufferOp:sr,BufferParameters:Bi});e(or.prototype,{filter:function(t){t instanceof Tt&&this.comps.add(t)},interfaces_:function(){return[ht]},getClass:function(){return or}}),or.getPolygons=function(){if(1===arguments.length){var t=arguments[0];return or.getPolygons(t,new I)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return e instanceof Tt?n.add(e):e instanceof ft&&e.apply(new or(n)),n}},e(ar.prototype,{isInsideArea:function(){return this.segIndex===ar.INSIDE_AREA},getCoordinate:function(){return this.pt},getGeometryComponent:function(){return this.component},getSegmentIndex:function(){return this.segIndex},interfaces_:function(){return[]},getClass:function(){return ar}}),ar.INSIDE_AREA=-1,e(ur.prototype,{filter:function(t){t instanceof Lt&&this.pts.add(t)},interfaces_:function(){return[ht]},getClass:function(){return ur}}),ur.getPoints=function(){if(1===arguments.length){var t=arguments[0];return t instanceof Lt?ho.singletonList(t):ur.getPoints(t,new I)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return e instanceof Lt?n.add(e):e instanceof ft&&e.apply(new ur(n)),n}},e(lr.prototype,{filter:function(t){(t instanceof Lt||t instanceof St||t instanceof Tt)&&this.locations.add(new ar(t,0,t.getCoordinate()))},interfaces_:function(){return[ht]},getClass:function(){return lr}}),lr.getLocations=function(t){var e=new I;return t.apply(new lr(e)),e},e(hr.prototype,{computeContainmentDistance:function(){if(0===arguments.length){var t=new Array(2).fill(null);if(this.computeContainmentDistance(0,t),this.minDistance<=this.terminateDistance)return null;this.computeContainmentDistance(1,t)}else if(2===arguments.length){var e=arguments[0],n=arguments[1],i=1-e,r=or.getPolygons(this.geom[e]);if(r.size()>0){var s=lr.getLocations(this.geom[i]);if(this.computeContainmentDistance(s,r,n),this.minDistance<=this.terminateDistance)return this.minDistanceLocation[i]=n[0],this.minDistanceLocation[e]=n[1],null}}else if(3===arguments.length)if(arguments[2]instanceof Array&&R(arguments[0],y)&&R(arguments[1],y)){for(var o=arguments[0],a=arguments[1],u=arguments[2],l=0;l<o.size();l++)for(var h=o.get(l),c=0;c<a.size();c++)if(this.computeContainmentDistance(h,a.get(c),u),this.minDistance<=this.terminateDistance)return null}else if(arguments[2]instanceof Array&&arguments[0]instanceof ar&&arguments[1]instanceof Tt){var f=arguments[0],g=arguments[1],d=arguments[2],p=f.getCoordinate();if(L.EXTERIOR!==this.ptLocator.locate(p,g))return this.minDistance=0,d[0]=f,d[1]=new ar(g,p),null}},computeMinDistanceLinesPoints:function(t,e,n){for(var i=0;i<t.size();i++)for(var r=t.get(i),s=0;s<e.size();s++){var o=e.get(s);if(this.computeMinDistance(r,o,n),this.minDistance<=this.terminateDistance)return null}},computeFacetDistance:function(){var t=new Array(2).fill(null),e=kn.getLines(this.geom[0]),n=kn.getLines(this.geom[1]),i=ur.getPoints(this.geom[0]),r=ur.getPoints(this.geom[1]);return this.computeMinDistanceLines(e,n,t),this.updateMinDistance(t,!1),this.minDistance<=this.terminateDistance?null:(t[0]=null,t[1]=null,this.computeMinDistanceLinesPoints(e,r,t),this.updateMinDistance(t,!1),this.minDistance<=this.terminateDistance?null:(t[0]=null,t[1]=null,this.computeMinDistanceLinesPoints(n,i,t),this.updateMinDistance(t,!0),this.minDistance<=this.terminateDistance?null:(t[0]=null,t[1]=null,this.computeMinDistancePoints(i,r,t),void this.updateMinDistance(t,!1))))},nearestLocations:function(){return this.computeMinDistance(),this.minDistanceLocation},updateMinDistance:function(t,e){return null===t[0]?null:void(e?(this.minDistanceLocation[0]=t[1],this.minDistanceLocation[1]=t[0]):(this.minDistanceLocation[0]=t[0],this.minDistanceLocation[1]=t[1]))},nearestPoints:function(){this.computeMinDistance();var t=[this.minDistanceLocation[0].getCoordinate(),this.minDistanceLocation[1].getCoordinate()];return t},computeMinDistance:function(){if(0===arguments.length){if(null!==this.minDistanceLocation)return null;if(this.minDistanceLocation=new Array(2).fill(null),this.computeContainmentDistance(),this.minDistance<=this.terminateDistance)return null;this.computeFacetDistance()}else if(3===arguments.length)if(arguments[2]instanceof Array&&arguments[0]instanceof St&&arguments[1]instanceof Lt){var t=arguments[0],e=arguments[1],n=arguments[2];if(t.getEnvelopeInternal().distance(e.getEnvelopeInternal())>this.minDistance)return null;for(var i=t.getCoordinates(),r=e.getCoordinate(),s=0;s<i.length-1;s++){var o=he.distancePointLine(r,i[s],i[s+1]);if(o<this.minDistance){this.minDistance=o;var a=new ce(i[s],i[s+1]),u=a.closestPoint(r);n[0]=new ar(t,s,u),n[1]=new ar(e,0,r)}if(this.minDistance<=this.terminateDistance)return null}}else if(arguments[2]instanceof Array&&arguments[0]instanceof St&&arguments[1]instanceof St){var l=arguments[0],h=arguments[1],c=arguments[2];if(l.getEnvelopeInternal().distance(h.getEnvelopeInternal())>this.minDistance)return null;for(var i=l.getCoordinates(),f=h.getCoordinates(),s=0;s<i.length-1;s++)for(var g=0;g<f.length-1;g++){var o=he.distanceLineLine(i[s],i[s+1],f[g],f[g+1]);if(o<this.minDistance){this.minDistance=o;var d=new ce(i[s],i[s+1]),p=new ce(f[g],f[g+1]),v=d.closestPoints(p);c[0]=new ar(l,s,v[0]),c[1]=new ar(h,g,v[1])}if(this.minDistance<=this.terminateDistance)return null}}},computeMinDistancePoints:function(t,e,n){for(var i=0;i<t.size();i++)for(var r=t.get(i),s=0;s<e.size();s++){var o=e.get(s),a=r.getCoordinate().distance(o.getCoordinate());if(a<this.minDistance&&(this.minDistance=a,n[0]=new ar(r,0,r.getCoordinate()),n[1]=new ar(o,0,o.getCoordinate())),this.minDistance<=this.terminateDistance)return null}},distance:function(){if(null===this.geom[0]||null===this.geom[1])throw new i("null geometries are not supported");return this.geom[0].isEmpty()||this.geom[1].isEmpty()?0:(this.computeMinDistance(),this.minDistance)},computeMinDistanceLines:function(t,e,n){for(var i=0;i<t.size();i++)for(var r=t.get(i),s=0;s<e.size();s++){var o=e.get(s);if(this.computeMinDistance(r,o,n),this.minDistance<=this.terminateDistance)return null}},interfaces_:function(){return[]},getClass:function(){return hr}}),hr.distance=function(t,e){var n=new hr(t,e);return n.distance()},hr.isWithinDistance=function(t,e,n){var i=new hr(t,e,n);return i.distance()<=n},hr.nearestPoints=function(t,e){var n=new hr(t,e);return n.nearestPoints()};var So=Object.freeze({DistanceOp:hr});e(cr.prototype,{getCoordinates:function(){if(null===this.coordinates){for(var t=0,e=0,n=new N,i=this.directedEdges.iterator();i.hasNext();){var r=i.next();r.getEdgeDirection()?t++:e++,n.add(r.getEdge().getLine().getCoordinates(),!1,r.getEdgeDirection())}this.coordinates=n.toCoordinateArray(),e>t&&H.reverse(this.coordinates)}return this.coordinates},toLineString:function(){return this.factory.createLineString(this.getCoordinates())},add:function(t){this.directedEdges.add(t)},interfaces_:function(){return[]},getClass:function(){return cr}}),e(fr.prototype,{setVisited:function(t){this._isVisited=t},isMarked:function(){return this._isMarked},setData:function(t){this.data=t},getData:function(){return this.data},setMarked:function(t){this._isMarked=t},getContext:function(){return this.data},isVisited:function(){return this._isVisited},setContext:function(t){this.data=t},interfaces_:function(){return[]},getClass:function(){return fr}}),fr.getComponentWithVisitedState=function(t,e){for(;t.hasNext();){var n=t.next();if(n.isVisited()===e)return n}return null},fr.setVisited=function(t,e){for(;t.hasNext();){var n=t.next();n.setVisited(e)}},fr.setMarked=function(t,e){for(;t.hasNext();){var n=t.next();n.setMarked(e)}},h(gr,fr),e(gr.prototype,{isRemoved:function(){return null===this.parentEdge},compareDirection:function(t){return this.quadrant>t.quadrant?1:this.quadrant<t.quadrant?-1:he.computeOrientation(t.p0,t.p1,this.p1)},getCoordinate:function(){return this.from.getCoordinate()},print:function(t){var e=this.getClass().getName(),n=e.lastIndexOf("."),i=e.substring(n+1);t.print("  "+i+": "+this.p0+" - "+this.p1+" "+this.quadrant+":"+this.angle)},getDirectionPt:function(){return this.p1},getAngle:function(){return this.angle},compareTo:function(t){var e=t;return this.compareDirection(e)},getFromNode:function(){return this.from},getSym:function(){return this.sym},setEdge:function(t){this.parentEdge=t},remove:function(){this.sym=null,this.parentEdge=null},getEdge:function(){return this.parentEdge},getQuadrant:function(){return this.quadrant},setSym:function(t){this.sym=t},getToNode:function(){return this.to},getEdgeDirection:function(){return this.edgeDirection},interfaces_:function(){return[s]},getClass:function(){return gr}}),gr.toEdges=function(t){for(var e=new I,n=t.iterator();n.hasNext();)e.add(n.next().parentEdge);return e},h(dr,gr),e(dr.prototype,{getNext:function(){return 2!==this.getToNode().getDegree()?null:this.getToNode().getOutEdges().getEdges().get(0)===this.getSym()?this.getToNode().getOutEdges().getEdges().get(1):(f.isTrue(this.getToNode().getOutEdges().getEdges().get(1)===this.getSym()),this.getToNode().getOutEdges().getEdges().get(0))},interfaces_:function(){return[]},getClass:function(){return dr}}),h(pr,fr),e(pr.prototype,{isRemoved:function(){return null===this.dirEdge},setDirectedEdges:function(t,e){this.dirEdge=[t,e],t.setEdge(this),e.setEdge(this),t.setSym(e),e.setSym(t),t.getFromNode().addOutEdge(t),e.getFromNode().addOutEdge(e)},getDirEdge:function(){if(Number.isInteger(arguments[0])){var t=arguments[0];return this.dirEdge[t]}if(arguments[0]instanceof mr){var e=arguments[0];return this.dirEdge[0].getFromNode()===e?this.dirEdge[0]:this.dirEdge[1].getFromNode()===e?this.dirEdge[1]:null}},remove:function(){this.dirEdge=null},getOppositeNode:function(t){return this.dirEdge[0].getFromNode()===t?this.dirEdge[0].getToNode():this.dirEdge[1].getFromNode()===t?this.dirEdge[1].getToNode():null},interfaces_:function(){return[]},getClass:function(){return pr}}),e(vr.prototype,{getNextEdge:function(t){var e=this.getIndex(t);return this.outEdges.get(this.getIndex(e+1))},getCoordinate:function(){var t=this.iterator();if(!t.hasNext())return null;var e=t.next();return e.getCoordinate()},iterator:function(){return this.sortEdges(),this.outEdges.iterator()},sortEdges:function(){this.sorted||(ho.sort(this.outEdges),this.sorted=!0)},remove:function(t){this.outEdges.remove(t)},getEdges:function(){return this.sortEdges(),this.outEdges},getNextCWEdge:function(t){var e=this.getIndex(t);return this.outEdges.get(this.getIndex(e-1))},getIndex:function(){if(arguments[0]instanceof pr){var t=arguments[0];this.sortEdges();for(var e=0;e<this.outEdges.size();e++){var n=this.outEdges.get(e);if(n.getEdge()===t)return e}return-1}if(arguments[0]instanceof gr){var i=arguments[0];this.sortEdges();for(var e=0;e<this.outEdges.size();e++){var n=this.outEdges.get(e);if(n===i)return e}return-1}if(Number.isInteger(arguments[0])){var r=arguments[0],s=r%this.outEdges.size();return 0>s&&(s+=this.outEdges.size()),s}},add:function(t){this.outEdges.add(t),this.sorted=!1},getDegree:function(){return this.outEdges.size()},interfaces_:function(){return[]},getClass:function(){return vr}}),h(mr,fr),e(mr.prototype,{isRemoved:function(){return null===this.pt},addOutEdge:function(t){this.deStar.add(t)},getCoordinate:function(){return this.pt},getOutEdges:function(){return this.deStar},remove:function(){if(0===arguments.length)this.pt=null;else if(1===arguments.length){var t=arguments[0];this.deStar.remove(t)}},getIndex:function(t){return this.deStar.getIndex(t)},getDegree:function(){return this.deStar.getDegree()},interfaces_:function(){return[]},getClass:function(){return mr}}),mr.getEdgesBetween=function(t,e){var n=gr.toEdges(t.getOutEdges().getEdges()),i=new J(n),r=gr.toEdges(e.getOutEdges().getEdges());return i.retainAll(r),i},h(yr,pr),e(yr.prototype,{getLine:function(){return this.line},interfaces_:function(){return[]},getClass:function(){return yr}}),e(xr.prototype,{find:function(t){return this.nodeMap.get(t)},iterator:function(){return this.nodeMap.values().iterator()},remove:function(t){return this.nodeMap.remove(t)},values:function(){return this.nodeMap.values()},add:function(t){return this.nodeMap.put(t.getCoordinate(),t),t},interfaces_:function(){return[]},getClass:function(){return xr}}),e(Er.prototype,{findNodesOfDegree:function(t){for(var e=new I,n=this.nodeIterator();n.hasNext();){var i=n.next();i.getDegree()===t&&e.add(i)}return e},dirEdgeIterator:function(){return this.dirEdges.iterator()},edgeIterator:function(){return this.edges.iterator()},remove:function(){if(arguments[0]instanceof pr){var t=arguments[0];this.remove(t.getDirEdge(0)),this.remove(t.getDirEdge(1)),this.edges.remove(t),t.remove()}else if(arguments[0]instanceof gr){var e=arguments[0],n=e.getSym();null!==n&&n.setSym(null),e.getFromNode().remove(e),e.remove(),this.dirEdges.remove(e)}else if(arguments[0]instanceof mr){for(var i=arguments[0],r=i.getOutEdges().getEdges(),s=r.iterator();s.hasNext();){var o=s.next(),n=o.getSym();null!==n&&this.remove(n),this.dirEdges.remove(o);var a=o.getEdge();null!==a&&this.edges.remove(a)}this.nodeMap.remove(i.getCoordinate()),i.remove()}},findNode:function(t){return this.nodeMap.find(t)},getEdges:function(){return this.edges},nodeIterator:function(){return this.nodeMap.iterator()},contains:function(){if(arguments[0]instanceof pr){var t=arguments[0];return this.edges.contains(t)}if(arguments[0]instanceof gr){var e=arguments[0];return this.dirEdges.contains(e)}},add:function(){if(arguments[0]instanceof mr){var t=arguments[0];this.nodeMap.add(t)}else if(arguments[0]instanceof pr){var e=arguments[0];this.edges.add(e),this.add(e.getDirEdge(0)),this.add(e.getDirEdge(1))}else if(arguments[0]instanceof gr){var n=arguments[0];this.dirEdges.add(n)}},getNodes:function(){return this.nodeMap.values()},interfaces_:function(){return[]},getClass:function(){return Er}}),h(Ir,Er),e(Ir.prototype,{addEdge:function(t){if(t.isEmpty())return null;var e=H.removeRepeatedPoints(t.getCoordinates());if(e.length<=1)return null;var n=e[0],i=e[e.length-1],r=this.getNode(n),s=this.getNode(i),o=new dr(r,s,e[1],!0),a=new dr(s,r,e[e.length-2],!1),u=new yr(t);u.setDirectedEdges(o,a),this.add(u)},getNode:function(t){var e=this.findNode(t);return null===e&&(e=new mr(t),this.add(e)),e},interfaces_:function(){return[]},getClass:function(){return Ir}}),e(Nr.prototype,{buildEdgeStringsForUnprocessedNodes:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next();e.isMarked()||(f.isTrue(2===e.getDegree()),this.buildEdgeStringsStartingAt(e),e.setMarked(!0))}},buildEdgeStringsForNonDegree2Nodes:function(){for(var t=this.graph.getNodes().iterator();t.hasNext();){var e=t.next();2!==e.getDegree()&&(this.buildEdgeStringsStartingAt(e),e.setMarked(!0))}},buildEdgeStringsForObviousStartNodes:function(){this.buildEdgeStringsForNonDegree2Nodes()},getMergedLineStrings:function(){return this.merge(),this.mergedLineStrings},buildEdgeStringsStartingAt:function(t){for(var e=t.getOutEdges().iterator();e.hasNext();){var n=e.next();n.getEdge().isMarked()||this.edgeStrings.add(this.buildEdgeStringStartingWith(n))}},merge:function(){if(null!==this.mergedLineStrings)return null;fr.setMarked(this.graph.nodeIterator(),!1),fr.setMarked(this.graph.edgeIterator(),!1),this.edgeStrings=new I,this.buildEdgeStringsForObviousStartNodes(),this.buildEdgeStringsForIsolatedLoops(),this.mergedLineStrings=new I;for(var t=this.edgeStrings.iterator();t.hasNext();){var e=t.next();this.mergedLineStrings.add(e.toLineString())}},buildEdgeStringStartingWith:function(t){var e=new cr(this.factory),n=t;do e.add(n),n.getEdge().setMarked(!0),n=n.getNext();while(null!==n&&n!==t);return e},add:function(){if(arguments[0]instanceof B){var t=arguments[0];t.apply({interfaces_:function(){return[q]},filter:function(t){t instanceof St&&this.add(t)}})}else if(R(arguments[0],v)){var e=arguments[0];this.mergedLineStrings=null;for(var n=e.iterator();n.hasNext();){
var i=n.next();this.add(i)}}else if(arguments[0]instanceof St){var r=arguments[0];null===this.factory&&(this.factory=r.getFactory()),this.graph.addEdge(r)}},buildEdgeStringsForIsolatedLoops:function(){this.buildEdgeStringsForUnprocessedNodes()},interfaces_:function(){return[]},getClass:function(){return Nr}});var wo=Object.freeze({LineMerger:Nr}),Lo=Object.freeze({OverlayOp:ii});h(Cr,gr),e(Cr.prototype,{getNext:function(){return this.next},isInRing:function(){return null!==this.edgeRing},setRing:function(t){this.edgeRing=t},setLabel:function(t){this.label=t},getLabel:function(){return this.label},setNext:function(t){this.next=t},getRing:function(){return this.edgeRing},interfaces_:function(){return[]},getClass:function(){return Cr}}),h(Sr,pr),e(Sr.prototype,{getLine:function(){return this.line},interfaces_:function(){return[]},getClass:function(){return Sr}}),e(wr.prototype,{isIncluded:function(){return this._isIncluded},getCoordinates:function(){if(null===this.ringPts){for(var t=new N,e=this.deList.iterator();e.hasNext();){var n=e.next(),i=n.getEdge();wr.addEdge(i.getLine().getCoordinates(),n.getEdgeDirection(),t)}this.ringPts=t.toCoordinateArray()}return this.ringPts},isIncludedSet:function(){return this._isIncludedSet},isValid:function(){return this.getCoordinates(),this.ringPts.length<=3?!1:(this.getRing(),this.ring.isValid())},build:function(t){var e=t;do this.add(e),e.setRing(this),e=e.getNext(),f.isTrue(null!==e,"found null DE in ring"),f.isTrue(e===t||!e.isInRing(),"found DE already in ring");while(e!==t)},isOuterHole:function(){return this._isHole?!this.hasShell():!1},getPolygon:function(){var t=null;if(null!==this.holes){t=new Array(this.holes.size()).fill(null);for(var e=0;e<this.holes.size();e++)t[e]=this.holes.get(e)}var n=this.factory.createPolygon(this.ring,t);return n},isHole:function(){return this._isHole},isProcessed:function(){return this._isProcessed},addHole:function(){if(arguments[0]instanceof bt){var t=arguments[0];null===this.holes&&(this.holes=new I),this.holes.add(t)}else if(arguments[0]instanceof wr){var e=arguments[0];e.setShell(this);var n=e.getRing();null===this.holes&&(this.holes=new I),this.holes.add(n)}},setIncluded:function(t){this._isIncluded=t,this._isIncludedSet=!0},getOuterHole:function(){if(this.isHole())return null;for(var t=0;t<this.deList.size();t++){var e=this.deList.get(t),n=e.getSym().getRing();if(n.isOuterHole())return n}return null},computeHole:function(){var t=this.getRing();this._isHole=he.isCCW(t.getCoordinates())},hasShell:function(){return null!==this.shell},isOuterShell:function(){return null!==this.getOuterHole()},getLineString:function(){return this.getCoordinates(),this.factory.createLineString(this.ringPts)},toString:function(){return se.toLineString(new Gt(this.getCoordinates()))},getShell:function(){return this.isHole()?this.shell:this},add:function(t){this.deList.add(t)},getRing:function(){if(null!==this.ring)return this.ring;this.getCoordinates(),this.ringPts.length<3&&A.out.println(this.ringPts);try{this.ring=this.factory.createLinearRing(this.ringPts)}catch(t){if(!(t instanceof S))throw t;A.out.println(this.ringPts)}finally{}return this.ring},updateIncluded:function(){if(this.isHole())return null;for(var t=0;t<this.deList.size();t++){var e=this.deList.get(t),n=e.getSym().getRing().getShell();if(null!==n&&n.isIncludedSet())return this.setIncluded(!n.isIncluded()),null}},setShell:function(t){this.shell=t},setProcessed:function(t){this._isProcessed=t},interfaces_:function(){return[]},getClass:function(){return wr}}),wr.findDirEdgesInRing=function(t){var e=t,n=new I;do n.add(e),e=e.getNext(),f.isTrue(null!==e,"found null DE in ring"),f.isTrue(e===t||!e.isInRing(),"found DE already in ring");while(e!==t);return n},wr.addEdge=function(t,e,n){if(e)for(var i=0;i<t.length;i++)n.add(t[i],!1);else for(var i=t.length-1;i>=0;i--)n.add(t[i],!1)},wr.findEdgeRingContaining=function(t,e){for(var n=t.getRing(),i=n.getEnvelopeInternal(),r=n.getCoordinateN(0),s=null,o=null,a=e.iterator();a.hasNext();){var u=a.next(),l=u.getRing(),h=l.getEnvelopeInternal();if(!h.equals(i)&&h.contains(i)){r=H.ptNotInList(n.getCoordinates(),l.getCoordinates());var c=!1;he.isPointInRing(r,l.getCoordinates())&&(c=!0),c&&(null===s||o.contains(h))&&(s=u,o=s.getRing().getEnvelopeInternal())}}return s},e(Lr.prototype,{compare:function(t,e){var n=t,i=e;return n.getRing().getEnvelope().compareTo(i.getRing().getEnvelope())},interfaces_:function(){return[a]},getClass:function(){return Lr}}),wr.EnvelopeComparator=Lr,h(Rr,Er),e(Rr.prototype,{findEdgeRing:function(t){var e=new wr(this.factory);return e.build(t),e},computeDepthParity:function(){if(0===arguments.length)for(;;){var t=null;if(null===t)return null;this.computeDepthParity(t)}else if(1===arguments.length){arguments[0]}},computeNextCWEdges:function(){for(var t=this.nodeIterator();t.hasNext();){var e=t.next();Rr.computeNextCWEdges(e)}},addEdge:function(t){if(t.isEmpty())return null;var e=H.removeRepeatedPoints(t.getCoordinates());if(e.length<2)return null;var n=e[0],i=e[e.length-1],r=this.getNode(n),s=this.getNode(i),o=new Cr(r,s,e[1],!0),a=new Cr(s,r,e[e.length-2],!1),u=new Sr(t);u.setDirectedEdges(o,a),this.add(u)},deleteCutEdges:function(){this.computeNextCWEdges(),Rr.findLabeledEdgeRings(this.dirEdges);for(var t=new I,e=this.dirEdges.iterator();e.hasNext();){var n=e.next();if(!n.isMarked()){var i=n.getSym();if(n.getLabel()===i.getLabel()){n.setMarked(!0),i.setMarked(!0);var r=n.getEdge();t.add(r.getLine())}}}return t},getEdgeRings:function(){this.computeNextCWEdges(),Rr.label(this.dirEdges,-1);var t=Rr.findLabeledEdgeRings(this.dirEdges);this.convertMaximalToMinimalEdgeRings(t);for(var e=new I,n=this.dirEdges.iterator();n.hasNext();){var i=n.next();if(!i.isMarked()&&!i.isInRing()){var r=this.findEdgeRing(i);e.add(r)}}return e},getNode:function(t){var e=this.findNode(t);return null===e&&(e=new mr(t),this.add(e)),e},convertMaximalToMinimalEdgeRings:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),i=n.getLabel(),r=Rr.findIntersectionNodes(n,i);if(null!==r)for(var s=r.iterator();s.hasNext();){var o=s.next();Rr.computeNextCCWEdges(o,i)}}},deleteDangles:function(){for(var t=this.findNodesOfDegree(1),e=new J,n=new pe,i=t.iterator();i.hasNext();)n.push(i.next());for(;!n.isEmpty();){var r=n.pop();Rr.deleteAllEdges(r);for(var s=r.getOutEdges().getEdges(),i=s.iterator();i.hasNext();){var o=i.next();o.setMarked(!0);var a=o.getSym();null!==a&&a.setMarked(!0);var u=o.getEdge();e.add(u.getLine());var l=o.getToNode();1===Rr.getDegreeNonDeleted(l)&&n.push(l)}}return e},interfaces_:function(){return[]},getClass:function(){return Rr}}),Rr.findLabeledEdgeRings=function(t){for(var e=new I,n=1,i=t.iterator();i.hasNext();){var r=i.next();if(!(r.isMarked()||r.getLabel()>=0)){e.add(r);var s=wr.findDirEdgesInRing(r);Rr.label(s,n),n++}}return e},Rr.getDegreeNonDeleted=function(t){for(var e=t.getOutEdges().getEdges(),n=0,i=e.iterator();i.hasNext();){var r=i.next();r.isMarked()||n++}return n},Rr.deleteAllEdges=function(t){for(var e=t.getOutEdges().getEdges(),n=e.iterator();n.hasNext();){var i=n.next();i.setMarked(!0);var r=i.getSym();null!==r&&r.setMarked(!0)}},Rr.label=function(t,e){for(var n=t.iterator();n.hasNext();){var i=n.next();i.setLabel(e)}},Rr.computeNextCWEdges=function(t){for(var e=t.getOutEdges(),n=null,i=null,r=e.getEdges().iterator();r.hasNext();){var s=r.next();if(!s.isMarked()){if(null===n&&(n=s),null!==i){var o=i.getSym();o.setNext(s)}i=s}}if(null!==i){var o=i.getSym();o.setNext(n)}},Rr.computeNextCCWEdges=function(t,e){for(var n=t.getOutEdges(),i=null,r=null,s=n.getEdges(),o=s.size()-1;o>=0;o--){var a=s.get(o),u=a.getSym(),l=null;a.getLabel()===e&&(l=a);var h=null;u.getLabel()===e&&(h=u),null===l&&null===h||(null!==h&&(r=h),null!==l&&(null!==r&&(r.setNext(l),r=null),null===i&&(i=l)))}null!==r&&(f.isTrue(null!==i),r.setNext(i))},Rr.getDegree=function(t,e){for(var n=t.getOutEdges().getEdges(),i=0,r=n.iterator();r.hasNext();){var s=r.next();s.getLabel()===e&&i++}return i},Rr.findIntersectionNodes=function(t,e){var n=t,i=null;do{var r=n.getFromNode();Rr.getDegree(r,e)>1&&(null===i&&(i=new I),i.add(r)),n=n.getNext(),f.isTrue(null!==n,"found null DE in ring"),f.isTrue(n===t||!n.isInRing(),"found DE already in ring")}while(n!==t);return i},e(Tr.prototype,{getGeometry:function(){return null===this.geomFactory&&(this.geomFactory=new ie),this.polygonize(),this.extractOnlyPolygonal?this.geomFactory.buildGeometry(this.polyList):this.geomFactory.createGeometryCollection(ie.toGeometryArray(this.polyList))},getInvalidRingLines:function(){return this.polygonize(),this.invalidRingLines},findValidRings:function(t,e,n){for(var i=t.iterator();i.hasNext();){var r=i.next();r.isValid()?e.add(r):n.add(r.getLineString())}},polygonize:function(){if(null!==this.polyList)return null;if(this.polyList=new I,null===this.graph)return null;this.dangles=this.graph.deleteDangles(),this.cutEdges=this.graph.deleteCutEdges();var t=this.graph.getEdgeRings(),e=new I;this.invalidRingLines=new I,this.isCheckingRingsValid?this.findValidRings(t,e,this.invalidRingLines):e=t,this.findShellsAndHoles(e),Tr.assignHolesToShells(this.holeList,this.shellList),ho.sort(this.shellList,new wr.EnvelopeComparator);var n=!0;this.extractOnlyPolygonal&&(Tr.findDisjointShells(this.shellList),n=!1),this.polyList=Tr.extractPolygons(this.shellList,n)},getDangles:function(){return this.polygonize(),this.dangles},getCutEdges:function(){return this.polygonize(),this.cutEdges},getPolygons:function(){return this.polygonize(),this.polyList},add:function(){if(R(arguments[0],v))for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.add(n)}else if(arguments[0]instanceof St){var i=arguments[0];this.geomFactory=i.getFactory(),null===this.graph&&(this.graph=new Rr(this.geomFactory)),this.graph.addEdge(i)}else if(arguments[0]instanceof B){var r=arguments[0];r.apply(this.lineStringAdder)}},setCheckRingsValid:function(t){this.isCheckingRingsValid=t},findShellsAndHoles:function(t){this.holeList=new I,this.shellList=new I;for(var e=t.iterator();e.hasNext();){var n=e.next();n.computeHole(),n.isHole()?this.holeList.add(n):this.shellList.add(n)}},interfaces_:function(){return[]},getClass:function(){return Tr}}),Tr.findOuterShells=function(t){for(var e=t.iterator();e.hasNext();){var n=e.next(),i=n.getOuterHole();null===i||i.isProcessed()||(n.setIncluded(!0),i.setProcessed(!0))}},Tr.extractPolygons=function(t,e){for(var n=new I,i=t.iterator();i.hasNext();){var r=i.next();(e||r.isIncluded())&&n.add(r.getPolygon())}return n},Tr.assignHolesToShells=function(t,e){for(var n=t.iterator();n.hasNext();){var i=n.next();Tr.assignHoleToShell(i,e)}},Tr.assignHoleToShell=function(t,e){var n=wr.findEdgeRingContaining(t,e);null!==n&&n.addHole(t)},Tr.findDisjointShells=function(t){Tr.findOuterShells(t);var e=null;do{e=!1;for(var n=t.iterator();n.hasNext();){var i=n.next();i.isIncludedSet()||(i.updateIncluded(),i.isIncludedSet()||(e=!0))}}while(e)},e(Pr.prototype,{filter:function(t){t instanceof St&&this.p.add(t)},interfaces_:function(){return[q]},getClass:function(){return Pr}}),Tr.LineStringAdder=Pr;var Ro=Object.freeze({Polygonizer:Tr});e(br.prototype,{createEdgeEndForNext:function(t,e,n,i){var r=n.segmentIndex+1;if(r>=t.getNumPoints()&&null===i)return null;var s=t.getCoordinate(r);null!==i&&i.segmentIndex===n.segmentIndex&&(s=i.coord);var o=new En(t,n.coord,s,new gn(t.getLabel()));e.add(o)},createEdgeEndForPrev:function(t,e,n,i){var r=n.segmentIndex;if(0===n.dist){if(0===r)return null;r--}var s=t.getCoordinate(r);null!==i&&i.segmentIndex>=r&&(s=i.coord);var o=new gn(t.getLabel());o.flip();var a=new En(t,n.coord,s,o);e.add(a)},computeEdgeEnds:function(){if(1===arguments.length){for(var t=arguments[0],e=new I,n=t;n.hasNext();){var i=n.next();this.computeEdgeEnds(i,e)}return e}if(2===arguments.length){var r=arguments[0],s=arguments[1],o=r.getEdgeIntersectionList();o.addEndpoints();var a=o.iterator(),u=null,l=null;if(!a.hasNext())return null;var h=a.next();do u=l,l=h,h=null,a.hasNext()&&(h=a.next()),null!==l&&(this.createEdgeEndForPrev(r,s,l,u),this.createEdgeEndForNext(r,s,l,h));while(null!==l)}},interfaces_:function(){return[]},getClass:function(){return br}}),h(Or,En),e(Or.prototype,{insert:function(t){this.edgeEnds.add(t)},print:function(t){t.println("EdgeEndBundle--> Label: "+this.label);for(var e=this.iterator();e.hasNext();){var n=e.next();n.print(t),t.println()}},iterator:function(){return this.edgeEnds.iterator()},getEdgeEnds:function(){return this.edgeEnds},computeLabelOn:function(t,e){for(var n=0,i=!1,r=this.iterator();r.hasNext();){var s=r.next(),o=s.getLabel().getLocation(t);o===L.BOUNDARY&&n++,o===L.INTERIOR&&(i=!0)}var o=L.NONE;i&&(o=L.INTERIOR),n>0&&(o=$n.determineBoundary(e,n)),this.label.setLocation(t,o)},computeLabelSide:function(t,e){for(var n=this.iterator();n.hasNext();){var i=n.next();if(i.getLabel().isArea()){var r=i.getLabel().getLocation(t,e);if(r===L.INTERIOR)return this.label.setLocation(t,e,L.INTERIOR),null;r===L.EXTERIOR&&this.label.setLocation(t,e,L.EXTERIOR)}}},getLabel:function(){return this.label},computeLabelSides:function(t){this.computeLabelSide(t,cn.LEFT),this.computeLabelSide(t,cn.RIGHT)},updateIM:function(t){Jn.updateIM(this.label,t)},computeLabel:function(t){for(var e=!1,n=this.iterator();n.hasNext();){var i=n.next();i.getLabel().isArea()&&(e=!0)}e?this.label=new gn(L.NONE,L.NONE,L.NONE):this.label=new gn(L.NONE);for(var r=0;2>r;r++)this.computeLabelOn(r,t),e&&this.computeLabelSides(r)},interfaces_:function(){return[]},getClass:function(){return Or}}),h(_r,Pn),e(_r.prototype,{updateIM:function(t){for(var e=this.iterator();e.hasNext();){var n=e.next();n.updateIM(t)}},insert:function(t){var e=this.edgeMap.get(t);null===e?(e=new Or(t),this.insertEdgeEnd(t,e)):e.insert(t)},interfaces_:function(){return[]},getClass:function(){return _r}}),h(Mr,yn),e(Mr.prototype,{updateIMFromEdges:function(t){this.edges.updateIM(t)},computeIM:function(t){t.setAtLeastIfValid(this.label.getLocation(0),this.label.getLocation(1),0)},interfaces_:function(){return[]},getClass:function(){return Mr}}),h(Dr,Nn),e(Dr.prototype,{createNode:function(t){return new Mr(t,new _r)},interfaces_:function(){return[]},getClass:function(){return Dr}}),e(Ar.prototype,{insertEdgeEnds:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.nodes.add(n)}},computeProperIntersectionIM:function(t,e){var n=this.arg[0].getGeometry().getDimension(),i=this.arg[1].getGeometry().getDimension(),r=t.hasProperIntersection(),s=t.hasProperInteriorIntersection();2===n&&2===i?r&&e.setAtLeast("212101212"):2===n&&1===i?(r&&e.setAtLeast("FFF0FFFF2"),s&&e.setAtLeast("1FFFFF1FF")):1===n&&2===i?(r&&e.setAtLeast("F0FFFFFF2"),s&&e.setAtLeast("1F1FFFFFF")):1===n&&1===i&&s&&e.setAtLeast("0FFFFFFFF")},labelIsolatedEdges:function(t,e){for(var n=this.arg[t].getEdgeIterator();n.hasNext();){var i=n.next();i.isIsolated()&&(this.labelIsolatedEdge(i,e,this.arg[e].getGeometry()),this.isolatedEdges.add(i))}},labelIsolatedEdge:function(t,e,n){if(n.getDimension()>0){var i=this.ptLocator.locate(t.getCoordinate(),n);t.getLabel().setAllLocations(e,i)}else t.getLabel().setAllLocations(e,L.EXTERIOR)},computeIM:function(){var t=new fe;if(t.set(L.EXTERIOR,L.EXTERIOR,2),!this.arg[0].getGeometry().getEnvelopeInternal().intersects(this.arg[1].getGeometry().getEnvelopeInternal()))return this.computeDisjointIM(t),t;this.arg[0].computeSelfNodes(this.li,!1),this.arg[1].computeSelfNodes(this.li,!1);var e=this.arg[0].computeEdgeIntersections(this.arg[1],this.li,!1);this.computeIntersectionNodes(0),this.computeIntersectionNodes(1),this.copyNodesAndLabels(0),this.copyNodesAndLabels(1),this.labelIsolatedNodes(),this.computeProperIntersectionIM(e,t);var n=new br,i=n.computeEdgeEnds(this.arg[0].getEdgeIterator());this.insertEdgeEnds(i);var r=n.computeEdgeEnds(this.arg[1].getEdgeIterator());return this.insertEdgeEnds(r),this.labelNodeEdges(),this.labelIsolatedEdges(0,1),this.labelIsolatedEdges(1,0),this.updateIM(t),t},labelNodeEdges:function(){for(var t=this.nodes.iterator();t.hasNext();){var e=t.next();e.getEdges().computeLabelling(this.arg)}},copyNodesAndLabels:function(t){for(var e=this.arg[t].getNodeIterator();e.hasNext();){var n=e.next(),i=this.nodes.addNode(n.getCoordinate());i.setLabel(t,n.getLabel().getLocation(t))}},labelIntersectionNodes:function(t){for(var e=this.arg[t].getEdgeIterator();e.hasNext();)for(var n=e.next(),i=n.getLabel().getLocation(t),r=n.getEdgeIntersectionList().iterator();r.hasNext();){var s=r.next(),o=this.nodes.find(s.coord);o.getLabel().isNull(t)&&(i===L.BOUNDARY?o.setLabelBoundary(t):o.setLabel(t,L.INTERIOR))}},labelIsolatedNode:function(t,e){var n=this.ptLocator.locate(t.getCoordinate(),this.arg[e].getGeometry());t.getLabel().setAllLocations(e,n)},computeIntersectionNodes:function(t){for(var e=this.arg[t].getEdgeIterator();e.hasNext();)for(var n=e.next(),i=n.getLabel().getLocation(t),r=n.getEdgeIntersectionList().iterator();r.hasNext();){var s=r.next(),o=this.nodes.addNode(s.coord);i===L.BOUNDARY?o.setLabelBoundary(t):o.getLabel().isNull(t)&&o.setLabel(t,L.INTERIOR)}},labelIsolatedNodes:function(){for(var t=this.nodes.iterator();t.hasNext();){var e=t.next(),n=e.getLabel();f.isTrue(n.getGeometryCount()>0,"node with empty label found"),e.isIsolated()&&(n.isNull(0)?this.labelIsolatedNode(e,0):this.labelIsolatedNode(e,1))}},updateIM:function(t){for(var e=this.isolatedEdges.iterator();e.hasNext();){var n=e.next();n.updateIM(t)}for(var i=this.nodes.iterator();i.hasNext();){var r=i.next();r.updateIM(t),r.updateIMFromEdges(t)}},computeDisjointIM:function(t){var e=this.arg[0].getGeometry();e.isEmpty()||(t.set(L.INTERIOR,L.EXTERIOR,e.getDimension()),t.set(L.BOUNDARY,L.EXTERIOR,e.getBoundaryDimension()));var n=this.arg[1].getGeometry();n.isEmpty()||(t.set(L.EXTERIOR,L.INTERIOR,n.getDimension()),t.set(L.EXTERIOR,L.BOUNDARY,n.getBoundaryDimension()))},interfaces_:function(){return[]},getClass:function(){return Ar}}),e(Fr.prototype,{isContainedInBoundary:function(t){if(t instanceof Tt)return!1;if(t instanceof Lt)return this.isPointContainedInBoundary(t);if(t instanceof St)return this.isLineStringContainedInBoundary(t);for(var e=0;e<t.getNumGeometries();e++){var n=t.getGeometryN(e);if(!this.isContainedInBoundary(n))return!1}return!0},isLineSegmentContainedInBoundary:function(t,e){if(t.equals(e))return this.isPointContainedInBoundary(t);if(t.x===e.x){if(t.x===this.rectEnv.getMinX()||t.x===this.rectEnv.getMaxX())return!0}else if(t.y===e.y&&(t.y===this.rectEnv.getMinY()||t.y===this.rectEnv.getMaxY()))return!0;return!1},isLineStringContainedInBoundary:function(t){for(var e=t.getCoordinateSequence(),n=new g,i=new g,r=0;r<e.size()-1;r++)if(e.getCoordinate(r,n),e.getCoordinate(r+1,i),!this.isLineSegmentContainedInBoundary(n,i))return!1;return!0},isPointContainedInBoundary:function(){if(arguments[0]instanceof Lt){var t=arguments[0];return this.isPointContainedInBoundary(t.getCoordinate())}if(arguments[0]instanceof g){var e=arguments[0];return e.x===this.rectEnv.getMinX()||e.x===this.rectEnv.getMaxX()||e.y===this.rectEnv.getMinY()||e.y===this.rectEnv.getMaxY()}},contains:function(t){return this.rectEnv.contains(t.getEnvelopeInternal())?!this.isContainedInBoundary(t):!1},interfaces_:function(){return[]},getClass:function(){return Fr}}),Fr.contains=function(t,e){var n=new Fr(t);return n.contains(e)},e(Gr.prototype,{intersects:function(t,e){var n=new C(t,e);if(!this.rectEnv.intersects(n))return!1;if(this.rectEnv.intersects(t))return!0;if(this.rectEnv.intersects(e))return!0;if(t.compareTo(e)>0){var i=t;t=e,e=i}var r=!1;return e.y>t.y&&(r=!0),r?this.li.computeIntersection(t,e,this.diagDown0,this.diagDown1):this.li.computeIntersection(t,e,this.diagUp0,this.diagUp1),!!this.li.hasIntersection()},interfaces_:function(){return[]},getClass:function(){return Gr}}),e(qr.prototype,{applyTo:function(t){for(var e=0;e<t.getNumGeometries()&&!this._isDone;e++){var n=t.getGeometryN(e);if(n instanceof ft)this.applyTo(n);else if(this.visit(n),this.isDone())return this._isDone=!0,null}},interfaces_:function(){return[]},getClass:function(){return qr}}),e(Br.prototype,{intersects:function(t){if(!this.rectEnv.intersects(t.getEnvelopeInternal()))return!1;var e=new zr(this.rectEnv);if(e.applyTo(t),e.intersects())return!0;var n=new Vr(this.rectangle);if(n.applyTo(t),n.containsPoint())return!0;var i=new kr(this.rectangle);return i.applyTo(t),!!i.intersects()},interfaces_:function(){return[]},getClass:function(){return Br}}),Br.intersects=function(t,e){var n=new Br(t);return n.intersects(e)},h(zr,qr),e(zr.prototype,{isDone:function(){return this._intersects===!0},visit:function(t){var e=t.getEnvelopeInternal();return this.rectEnv.intersects(e)?this.rectEnv.contains(e)?(this._intersects=!0,null):e.getMinX()>=this.rectEnv.getMinX()&&e.getMaxX()<=this.rectEnv.getMaxX()?(this._intersects=!0,null):e.getMinY()>=this.rectEnv.getMinY()&&e.getMaxY()<=this.rectEnv.getMaxY()?(this._intersects=!0,null):void 0:null},intersects:function(){return this._intersects},interfaces_:function(){return[]},getClass:function(){return zr}}),h(Vr,qr),e(Vr.prototype,{isDone:function(){return this._containsPoint===!0},visit:function(t){if(!(t instanceof Tt))return null;var e=t.getEnvelopeInternal();if(!this.rectEnv.intersects(e))return null;for(var n=new g,i=0;4>i;i++)if(this.rectSeq.getCoordinate(i,n),e.contains(n)&&Tn.containsPointInPolygon(n,t))return this._containsPoint=!0,null},containsPoint:function(){return this._containsPoint},interfaces_:function(){return[]},getClass:function(){return Vr}}),h(kr,qr),e(kr.prototype,{intersects:function(){return this.hasIntersection},isDone:function(){return this.hasIntersection===!0},visit:function(t){var e=t.getEnvelopeInternal();if(!this.rectEnv.intersects(e))return null;var n=kn.getLines(t);this.checkIntersectionWithLineStrings(n)},checkIntersectionWithLineStrings:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();if(this.checkIntersectionWithSegments(n),this.hasIntersection)return null}},checkIntersectionWithSegments:function(t){for(var e=t.getCoordinateSequence(),n=1;n<e.size();n++)if(e.getCoordinate(n-1,this.p0),e.getCoordinate(n,this.p1),this.rectIntersector.intersects(this.p0,this.p1))return this.hasIntersection=!0,null},interfaces_:function(){return[]},getClass:function(){return kr}}),h(Yr,ti),e(Yr.prototype,{getIntersectionMatrix:function(){return this._relate.computeIM()},interfaces_:function(){return[]},getClass:function(){return Yr}}),Yr.covers=function(t,e){return t.getEnvelopeInternal().covers(e.getEnvelopeInternal())?t.isRectangle()?!0:Yr.relate(t,e).isCovers():!1},Yr.intersects=function(t,e){return t.getEnvelopeInternal().intersects(e.getEnvelopeInternal())?t.isRectangle()?Br.intersects(t,e):e.isRectangle()?Br.intersects(e,t):Yr.relate(t,e).isIntersects():!1},Yr.touches=function(t,e){return t.getEnvelopeInternal().intersects(e.getEnvelopeInternal())?Yr.relate(t,e).isTouches(t.getDimension(),e.getDimension()):!1},Yr.within=function(t,e){return e.contains(t)},Yr.coveredBy=function(t,e){return Yr.covers(e,t)},Yr.relate=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=new Yr(t,e),i=n.getIntersectionMatrix();return i}if(3===arguments.length){if("string"==typeof arguments[2]&&arguments[0]instanceof B&&arguments[1]instanceof B){var r=arguments[0],s=arguments[1],o=arguments[2];return Yr.relateWithCheck(r,s).matches(o)}if(R(arguments[2],V)&&arguments[0]instanceof B&&arguments[1]instanceof B){var a=arguments[0],u=arguments[1],l=arguments[2],n=new Yr(a,u,l),i=n.getIntersectionMatrix();return i}}},Yr.overlaps=function(t,e){return t.getEnvelopeInternal().intersects(e.getEnvelopeInternal())?Yr.relate(t,e).isOverlaps(t.getDimension(),e.getDimension()):!1},Yr.disjoint=function(t,e){return!t.intersects(e)},Yr.relateWithCheck=function(t,e){return t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),Yr.relate(t,e)},Yr.crosses=function(t,e){return t.getEnvelopeInternal().intersects(e.getEnvelopeInternal())?Yr.relate(t,e).isCrosses(t.getDimension(),e.getDimension()):!1},Yr.contains=function(t,e){return t.getEnvelopeInternal().contains(e.getEnvelopeInternal())?t.isRectangle()?Fr.contains(t,e):Yr.relate(t,e).isContains():!1};var To=Object.freeze({RelateOp:Yr});e(Ur.prototype,{extractElements:function(t,e){if(null===t)return null;for(var n=0;n<t.getNumGeometries();n++){var i=t.getGeometryN(n);this.skipEmpty&&i.isEmpty()||e.add(i)}},combine:function(){for(var t=new I,e=this.inputGeoms.iterator();e.hasNext();){var n=e.next();this.extractElements(n,t)}return 0===t.size()?null!==this.geomFactory?this.geomFactory.createGeometryCollection(null):null:this.geomFactory.buildGeometry(t)},interfaces_:function(){return[]},getClass:function(){return Ur}}),Ur.combine=function(){if(1===arguments.length){var t=arguments[0],e=new Ur(t);return e.combine()}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=new Ur(Ur.createList(n,i));return e.combine()}if(3===arguments.length){var r=arguments[0],s=arguments[1],o=arguments[2],e=new Ur(Ur.createList(r,s,o));return e.combine()}},Ur.extractFactory=function(t){return t.isEmpty()?null:t.iterator().next().getFactory()},Ur.createList=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1],n=new I;return n.add(t),n.add(e),n}if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2],n=new I;return n.add(i),n.add(r),n.add(s),n}},e(Xr.prototype,{union:function(){for(var t=new Te,e=new at,n=0;n<this.pointGeom.getNumGeometries();n++){var i=this.pointGeom.getGeometryN(n),r=i.getCoordinate(),s=t.locate(r,this.otherGeom);s===L.EXTERIOR&&e.add(r)}if(0===e.size())return this.otherGeom;var o=null,a=H.toCoordinateArray(e);return o=1===a.length?this.geomFact.createPoint(a[0]):this.geomFact.createMultiPointFromCoords(a),Ur.combine(o,this.otherGeom)},interfaces_:function(){return[]},getClass:function(){return Xr}}),Xr.union=function(t,e){var n=new Xr(t,e);return n.union()},e(Hr.prototype,{filter:function(t){-1!==this.sortIndex&&t.getSortIndex()!==this.sortIndex||this.comps.add(t)},interfaces_:function(){return[ht]},getClass:function(){return Hr}}),Hr.extract=function(){if(2===arguments.length){var t=arguments[0],e=arguments[1];return Hr.extract(t,e,new I)}if(3===arguments.length){var n=arguments[0],i=arguments[1],r=arguments[2];return n.getSortIndex()===i?r.add(n):n instanceof ft&&n.apply(new Hr(i,r)),r}},e(Wr.prototype,{reduceToGeometries:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next(),r=null;R(i,y)?r=this.unionTree(i):i instanceof B&&(r=i),e.add(r)}return e},extractByEnvelope:function(t,e,n){for(var i=new I,r=0;r<e.getNumGeometries();r++){var s=e.getGeometryN(r);s.getEnvelopeInternal().intersects(t)?i.add(s):n.add(s)}return this.geomFactory.buildGeometry(i)},unionOptimized:function(t,e){var n=t.getEnvelopeInternal(),i=e.getEnvelopeInternal();if(!n.intersects(i)){var r=Ur.combine(t,e);return r}if(t.getNumGeometries()<=1&&e.getNumGeometries()<=1)return this.unionActual(t,e);var s=n.intersection(i);return this.unionUsingEnvelopeIntersection(t,e,s)},union:function(){if(null===this.inputPolys)throw new IllegalStateException("union() method cannot be called twice");if(this.inputPolys.isEmpty())return null;this.geomFactory=this.inputPolys.iterator().next().getFactory();for(var t=new ke(Wr.STRTREE_NODE_CAPACITY),e=this.inputPolys.iterator();e.hasNext();){var n=e.next();t.insert(n.getEnvelopeInternal(),n)}this.inputPolys=null;var i=t.itemsTree(),r=this.unionTree(i);return r},binaryUnion:function(){if(1===arguments.length){var t=arguments[0];return this.binaryUnion(t,0,t.size())}if(3===arguments.length){var e=arguments[0],n=arguments[1],i=arguments[2];if(1>=i-n){var r=Wr.getGeometry(e,n);return this.unionSafe(r,null)}if(i-n===2)return this.unionSafe(Wr.getGeometry(e,n),Wr.getGeometry(e,n+1));var s=Math.trunc((i+n)/2),r=this.binaryUnion(e,n,s),o=this.binaryUnion(e,s,i);return this.unionSafe(r,o)}},repeatedUnion:function(t){for(var e=null,n=t.iterator();n.hasNext();){var i=n.next();e=null===e?i.copy():e.union(i)}return e},unionSafe:function(t,e){return null===t&&null===e?null:null===t?e.copy():null===e?t.copy():this.unionOptimized(t,e)},unionActual:function(t,e){return Wr.restrictToPolygons(t.union(e))},unionTree:function(t){var e=this.reduceToGeometries(t),n=this.binaryUnion(e);return n},unionUsingEnvelopeIntersection:function(t,e,n){var i=new I,r=this.extractByEnvelope(n,t,i),s=this.extractByEnvelope(n,e,i),o=this.unionActual(r,s);i.add(o);var a=Ur.combine(i);return a},bufferUnion:function(){if(1===arguments.length){var t=arguments[0],e=t.get(0).getFactory(),n=e.buildGeometry(t),i=n.buffer(0);return i}if(2===arguments.length){var r=arguments[0],s=arguments[1],e=r.getFactory(),n=e.createGeometryCollection([r,s]),i=n.buffer(0);return i}},interfaces_:function(){return[]},getClass:function(){return Wr}}),Wr.restrictToPolygons=function(t){if(R(t,Rt))return t;var e=or.getPolygons(t);return 1===e.size()?e.get(0):t.getFactory().createMultiPolygon(ie.toPolygonArray(e))},Wr.getGeometry=function(t,e){return e>=t.size()?null:t.get(e)},Wr.union=function(t){var e=new Wr(t);return e.union()},Wr.STRTREE_NODE_CAPACITY=4,e(jr.prototype,{unionNoOpt:function(t){var e=this.geomFact.createPoint();return si.overlayOp(t,e,ii.UNION)},unionWithNull:function(t,e){return null===t&&null===e?null:null===e?t:null===t?e:t.union(e)},extract:function(){if(R(arguments[0],v))for(var t=arguments[0],e=t.iterator();e.hasNext();){var n=e.next();this.extract(n)}else if(arguments[0]instanceof B){var i=arguments[0];null===this.geomFact&&(this.geomFact=i.getFactory()),Hr.extract(i,B.SORTINDEX_POLYGON,this.polygons),Hr.extract(i,B.SORTINDEX_LINESTRING,this.lines),Hr.extract(i,B.SORTINDEX_POINT,this.points)}},union:function t(){if(null===this.geomFact)return null;var e=null;if(this.points.size()>0){var n=this.geomFact.buildGeometry(this.points);e=this.unionNoOpt(n)}var i=null;if(this.lines.size()>0){var r=this.geomFact.buildGeometry(this.lines);i=this.unionNoOpt(r)}var s=null;this.polygons.size()>0&&(s=Wr.union(this.polygons));var o=this.unionWithNull(i,s),t=null;return t=null===e?o:null===o?e:Xr.union(e,o),null===t?this.geomFact.createGeometryCollection():t},interfaces_:function(){return[]},getClass:function(){return jr}}),jr.union=function(){if(1===arguments.length){if(R(arguments[0],v)){var t=arguments[0],e=new jr(t);return e.union()}if(arguments[0]instanceof B){var n=arguments[0],e=new jr(n);return e.union()}}else if(2===arguments.length){var i=arguments[0],r=arguments[1],e=new jr(i,r);return e.union()}};var Po=Object.freeze({UnaryUnionOp:jr});e(Kr.prototype,{visitInteriorRing:function(t,e){var n=t.getCoordinates(),i=n[0],r=Kr.findDifferentPoint(n,i),s=e.findEdgeInSameDirection(i,r),o=e.findEdgeEnd(s),a=null;o.getLabel().getLocation(0,cn.RIGHT)===L.INTERIOR?a=o:o.getSym().getLabel().getLocation(0,cn.RIGHT)===L.INTERIOR&&(a=o.getSym()),f.isTrue(null!==a,"unable to find dirEdge with Interior on RHS"),this.visitLinkedDirectedEdges(a)},visitShellInteriors:function(t,e){if(t instanceof Tt){var n=t;this.visitInteriorRing(n.getExteriorRing(),e)}if(t instanceof Ot)for(var i=t,r=0;r<i.getNumGeometries();r++){var n=i.getGeometryN(r);this.visitInteriorRing(n.getExteriorRing(),e)}},getCoordinate:function(){return this.disconnectedRingcoord},setInteriorEdgesInResult:function(t){for(var e=t.getEdgeEnds().iterator();e.hasNext();){var n=e.next();n.getLabel().getLocation(0,cn.RIGHT)===L.INTERIOR&&n.setInResult(!0)}},visitLinkedDirectedEdges:function(t){var e=t,n=t;do f.isTrue(null!==n,"found null Directed Edge"),n.setVisited(!0),n=n.getNext();while(n!==e)},buildEdgeRings:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();if(i.isInResult()&&null===i.getEdgeRing()){var r=new vn(i,this.geometryFactory);r.linkDirectedEdgesForMinimalEdgeRings();var s=r.buildMinimalRings();e.addAll(s)}}return e},hasUnvisitedShellEdge:function(t){for(var e=0;e<t.size();e++){var n=t.get(e);if(!n.isHole()){var i=n.getEdges(),r=i.get(0);if(r.getLabel().getLocation(0,cn.RIGHT)===L.INTERIOR)for(var s=0;s<i.size();s++)if(r=i.get(s),
!r.isVisited())return this.disconnectedRingcoord=r.getCoordinate(),!0}}return!1},isInteriorsConnected:function(){var t=new I;this.geomGraph.computeSplitEdges(t);var e=new Cn(new On);e.addEdges(t),this.setInteriorEdgesInResult(e),e.linkResultDirectedEdges();var n=this.buildEdgeRings(e.getEdgeEnds());return this.visitShellInteriors(this.geomGraph.getGeometry(),e),!this.hasUnvisitedShellEdge(n)},interfaces_:function(){return[]},getClass:function(){return Kr}}),Kr.findDifferentPoint=function(t,e){for(var n=0;n<t.length;n++)if(!t[n].equals(e))return t[n];return null},e(Zr.prototype,{hasChildren:function(){for(var t=0;2>t;t++)if(null!==this.subnode[t])return!0;return!1},isPrunable:function(){return!(this.hasChildren()||this.hasItems())},addAllItems:function(t){t.addAll(this.items);for(var e=0;2>e;e++)null!==this.subnode[e]&&this.subnode[e].addAllItems(t);return t},size:function(){for(var t=0,e=0;2>e;e++)null!==this.subnode[e]&&(t+=this.subnode[e].size());return t+this.items.size()},addAllItemsFromOverlapping:function(t,e){return null===t||this.isSearchMatch(t)?(e.addAll(this.items),null!==this.subnode[0]&&this.subnode[0].addAllItemsFromOverlapping(t,e),void(null!==this.subnode[1]&&this.subnode[1].addAllItemsFromOverlapping(t,e))):null},hasItems:function(){return!this.items.isEmpty()},remove:function(t,e){if(!this.isSearchMatch(t))return!1;for(var n=!1,i=0;2>i;i++)if(null!==this.subnode[i]&&(n=this.subnode[i].remove(t,e))){this.subnode[i].isPrunable()&&(this.subnode[i]=null);break}return n?n:n=this.items.remove(e)},getItems:function(){return this.items},depth:function(){for(var t=0,e=0;2>e;e++)if(null!==this.subnode[e]){var n=this.subnode[e].depth();n>t&&(t=n)}return t+1},nodeSize:function(){for(var t=0,e=0;2>e;e++)null!==this.subnode[e]&&(t+=this.subnode[e].nodeSize());return t+1},add:function(t){this.items.add(t)},interfaces_:function(){return[]},getClass:function(){return Zr}}),Zr.getSubnodeIndex=function(t,e){var n=-1;return t.min>=e&&(n=1),t.max<=e&&(n=0),n},e(Qr.prototype,{expandToInclude:function(t){t.max>this.max&&(this.max=t.max),t.min<this.min&&(this.min=t.min)},getWidth:function(){return this.max-this.min},overlaps:function(){if(1===arguments.length){var t=arguments[0];return this.overlaps(t.min,t.max)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return!(this.min>n||this.max<e)}},getMin:function(){return this.min},toString:function(){return"["+this.min+", "+this.max+"]"},contains:function(){if(1===arguments.length){if(arguments[0]instanceof Qr){var t=arguments[0];return this.contains(t.min,t.max)}if("number"==typeof arguments[0]){var e=arguments[0];return e>=this.min&&e<=this.max}}else if(2===arguments.length){var n=arguments[0],i=arguments[1];return n>=this.min&&i<=this.max}},init:function(t,e){this.min=t,this.max=e,t>e&&(this.min=e,this.max=t)},getMax:function(){return this.max},interfaces_:function(){return[]},getClass:function(){return Qr}}),e(Jr.prototype,{getInterval:function(){return this.interval},getLevel:function(){return this.level},computeKey:function(t){for(this.level=Jr.computeLevel(t),this.interval=new Qr,this.computeInterval(this.level,t);!this.interval.contains(t);)this.level+=1,this.computeInterval(this.level,t)},computeInterval:function(t,e){var n=Ci.powerOf2(t);this.pt=Math.floor(e.getMin()/n)*n,this.interval.init(this.pt,this.pt+n)},getPoint:function(){return this.pt},interfaces_:function(){return[]},getClass:function(){return Jr}}),Jr.computeLevel=function(t){var e=t.getWidth(),n=Ci.exponent(e)+1;return n},h($r,Zr),e($r.prototype,{getInterval:function(){return this.interval},find:function(t){var e=Zr.getSubnodeIndex(t,this.centre);if(-1===e)return this;if(null!==this.subnode[e]){var n=this.subnode[e];return n.find(t)}return this},insert:function(t){f.isTrue(null===this.interval||this.interval.contains(t.interval));var e=Zr.getSubnodeIndex(t.interval,this.centre);if(t.level===this.level-1)this.subnode[e]=t;else{var n=this.createSubnode(e);n.insert(t),this.subnode[e]=n}},isSearchMatch:function(t){return t.overlaps(this.interval)},getSubnode:function(t){return null===this.subnode[t]&&(this.subnode[t]=this.createSubnode(t)),this.subnode[t]},getNode:function(t){var e=Zr.getSubnodeIndex(t,this.centre);if(-1!==e){var n=this.getSubnode(e);return n.getNode(t)}return this},createSubnode:function(t){var e=0,n=0;switch(t){case 0:e=this.interval.getMin(),n=this.centre;break;case 1:e=this.centre,n=this.interval.getMax()}var i=new Qr(e,n),r=new $r(i,this.level-1);return r},interfaces_:function(){return[]},getClass:function(){return $r}}),$r.createNode=function(t){var e=new Jr(t),n=new $r(e.getInterval(),e.getLevel());return n},$r.createExpanded=function(t,e){var n=new Qr(e);null!==t&&n.expandToInclude(t.interval);var i=$r.createNode(n);return null!==t&&i.insert(t),i},h(ts,Zr),e(ts.prototype,{insert:function(t,e){var n=Zr.getSubnodeIndex(t,ts.origin);if(-1===n)return this.add(e),null;var i=this.subnode[n];if(null===i||!i.getInterval().contains(t)){var r=$r.createExpanded(i,t);this.subnode[n]=r}this.insertContained(this.subnode[n],t,e)},isSearchMatch:function(t){return!0},insertContained:function(t,e,n){f.isTrue(t.getInterval().contains(e));var i=Ri.isZeroWidth(e.getMin(),e.getMax()),r=null;r=i?t.find(e):t.getNode(e),r.add(n)},interfaces_:function(){return[]},getClass:function(){return ts}}),ts.origin=0,e(es.prototype,{size:function(){return null!==this.root?this.root.size():0},insert:function(t,e){this.collectStats(t);var n=es.ensureExtent(t,this.minExtent);this.root.insert(n,e)},query:function(){if(1===arguments.length){if("number"==typeof arguments[0]){var t=arguments[0];return this.query(new Qr(t,t))}if(arguments[0]instanceof Qr){var e=arguments[0],n=new I;return this.query(e,n),n}}else if(2===arguments.length){var i=arguments[0],r=arguments[1];this.root.addAllItemsFromOverlapping(i,r)}},iterator:function(){var t=new I;return this.root.addAllItems(t),t.iterator()},remove:function(t,e){var n=es.ensureExtent(t,this.minExtent);return this.root.remove(n,e)},collectStats:function(t){var e=t.getWidth();e<this.minExtent&&e>0&&(this.minExtent=e)},depth:function(){return null!==this.root?this.root.depth():0},nodeSize:function(){return null!==this.root?this.root.nodeSize():0},interfaces_:function(){return[]},getClass:function(){return es}}),es.ensureExtent=function(t,e){var n=t.getMin(),i=t.getMax();return n!==i?t:(n===i&&(n-=e/2,i=n+e/2),new Qr(n,i))},e(ns.prototype,{isInside:function(t){},interfaces_:function(){return[]},getClass:function(){return ns}}),e(is.prototype,{testLineSegment:function(t,e){var n=null,i=null,r=null,s=null,o=null,a=e.p0,u=e.p1;i=a.x-t.x,r=a.y-t.y,s=u.x-t.x,o=u.y-t.y,(r>0&&0>=o||o>0&&0>=r)&&(n=ue.signOfDet2x2(i,r,s,o)/(o-r),n>0&&this.crossings++)},buildIndex:function(){this.tree=new es;for(var t=H.removeRepeatedPoints(this.ring.getCoordinates()),e=$e.getChains(t),n=0;n<e.size();n++){var i=e.get(n),r=i.getEnvelope();this.interval.min=r.getMinY(),this.interval.max=r.getMaxY(),this.tree.insert(this.interval,i)}},testMonotoneChain:function(t,e,n){n.select(t,e)},isInside:function(t){this.crossings=0;var e=new C(r.NEGATIVE_INFINITY,r.POSITIVE_INFINITY,t.y,t.y);this.interval.min=t.y,this.interval.max=t.y;for(var n=this.tree.query(this.interval),i=new rs(this,t),s=n.iterator();s.hasNext();){var o=s.next();this.testMonotoneChain(e,i,o)}return this.crossings%2===1},interfaces_:function(){return[ns]},getClass:function(){return is}}),h(rs,tr),e(rs.prototype,{select:function(){if(1!==arguments.length)return tr.prototype.select.apply(this,arguments);var t=arguments[0];this.mcp.testLineSegment(this.p,t)},interfaces_:function(){return[]},getClass:function(){return rs}}),is.MCSelecter=rs,e(ss.prototype,{insertEdgeEnds:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.nodes.add(n)}},getNodeIterator:function(){return this.nodes.iterator()},copyNodesAndLabels:function(t,e){for(var n=t.getNodeIterator();n.hasNext();){var i=n.next(),r=this.nodes.addNode(i.getCoordinate());r.setLabel(e,i.getLabel().getLocation(e))}},build:function(t){this.computeIntersectionNodes(t,0),this.copyNodesAndLabels(t,0);var e=new br,n=e.computeEdgeEnds(t.getEdgeIterator());this.insertEdgeEnds(n)},computeIntersectionNodes:function(t,e){for(var n=t.getEdgeIterator();n.hasNext();)for(var i=n.next(),r=i.getLabel().getLocation(e),s=i.getEdgeIntersectionList().iterator();s.hasNext();){var o=s.next(),a=this.nodes.addNode(o.coord);r===L.BOUNDARY?a.setLabelBoundary(e):a.getLabel().isNull(e)&&a.setLabel(e,L.INTERIOR)}},interfaces_:function(){return[]},getClass:function(){return ss}}),e(os.prototype,{isNodeEdgeAreaLabelsConsistent:function(){for(var t=this.nodeGraph.getNodeIterator();t.hasNext();){var e=t.next();if(!e.getEdges().isAreaLabelsConsistent(this.geomGraph))return this.invalidPoint=e.getCoordinate().copy(),!1}return!0},getInvalidPoint:function(){return this.invalidPoint},hasDuplicateRings:function(){for(var t=this.nodeGraph.getNodeIterator();t.hasNext();)for(var e=t.next(),n=e.getEdges().iterator();n.hasNext();){var i=n.next();if(i.getEdgeEnds().size()>1)return this.invalidPoint=i.getEdge().getCoordinate(0),!0}return!1},isNodeConsistentArea:function(){var t=this.geomGraph.computeSelfNodes(this.li,!0,!0);return t.hasProperIntersection()?(this.invalidPoint=t.getProperIntersectionPoint(),!1):(this.nodeGraph.build(this.geomGraph),this.isNodeEdgeAreaLabelsConsistent())},interfaces_:function(){return[]},getClass:function(){return os}}),e(as.prototype,{buildIndex:function(){this.index=new ke;for(var t=0;t<this.rings.size();t++){var e=this.rings.get(t),n=e.getEnvelopeInternal();this.index.insert(n,e)}},getNestedPoint:function(){return this.nestedPt},isNonNested:function(){this.buildIndex();for(var t=0;t<this.rings.size();t++)for(var e=this.rings.get(t),n=e.getCoordinates(),i=this.index.query(e.getEnvelopeInternal()),r=0;r<i.size();r++){var s=i.get(r),o=s.getCoordinates();if(e!==s&&e.getEnvelopeInternal().intersects(s.getEnvelopeInternal())){var a=ls.findPtNotNode(n,s,this.graph);if(null!==a){var u=he.isPointInRing(a,o);if(u)return this.nestedPt=a,!1}}}return!0},add:function(t){this.rings.add(t),this.totalEnv.expandToInclude(t.getEnvelopeInternal())},interfaces_:function(){return[]},getClass:function(){return as}}),e(us.prototype,{getErrorType:function(){return this.errorType},getMessage:function(){return us.errMsg[this.errorType]},getCoordinate:function(){return this.pt},toString:function(){var t="";return null!==this.pt&&(t=" at or near point "+this.pt),this.getMessage()+t},interfaces_:function(){return[]},getClass:function(){return us}}),us.ERROR=0,us.REPEATED_POINT=1,us.HOLE_OUTSIDE_SHELL=2,us.NESTED_HOLES=3,us.DISCONNECTED_INTERIOR=4,us.SELF_INTERSECTION=5,us.RING_SELF_INTERSECTION=6,us.NESTED_SHELLS=7,us.DUPLICATE_RINGS=8,us.TOO_FEW_POINTS=9,us.INVALID_COORDINATE=10,us.RING_NOT_CLOSED=11,us.errMsg=["Topology Validation Error","Repeated Point","Hole lies outside shell","Holes are nested","Interior is disconnected","Self-intersection","Ring Self-intersection","Nested shells","Duplicate Rings","Too few distinct points in geometry component","Invalid Coordinate","Ring is not closed"],e(ls.prototype,{checkInvalidCoordinates:function(){if(arguments[0]instanceof Array){for(var t=arguments[0],e=0;e<t.length;e++)if(!ls.isValid(t[e]))return this.validErr=new us(us.INVALID_COORDINATE,t[e]),null}else if(arguments[0]instanceof Tt){var n=arguments[0];if(this.checkInvalidCoordinates(n.getExteriorRing().getCoordinates()),null!==this.validErr)return null;for(var e=0;e<n.getNumInteriorRing();e++)if(this.checkInvalidCoordinates(n.getInteriorRingN(e).getCoordinates()),null!==this.validErr)return null}},checkHolesNotNested:function(t,e){for(var n=new as(e),i=0;i<t.getNumInteriorRing();i++){var r=t.getInteriorRingN(i);n.add(r)}var s=n.isNonNested();s||(this.validErr=new us(us.NESTED_HOLES,n.getNestedPoint()))},checkConsistentArea:function(t){var e=new os(t),n=e.isNodeConsistentArea();return n?void(e.hasDuplicateRings()&&(this.validErr=new us(us.DUPLICATE_RINGS,e.getInvalidPoint()))):(this.validErr=new us(us.SELF_INTERSECTION,e.getInvalidPoint()),null)},isValid:function(){return this.checkValid(this.parentGeometry),null===this.validErr},checkShellInsideHole:function(t,e,n){var i=t.getCoordinates(),r=e.getCoordinates(),s=ls.findPtNotNode(i,e,n);if(null!==s){var o=he.isPointInRing(s,r);if(!o)return s}var a=ls.findPtNotNode(r,t,n);if(null!==a){var u=he.isPointInRing(a,i);return u?a:null}return f.shouldNeverReachHere("points in shell and hole appear to be equal"),null},checkNoSelfIntersectingRings:function(t){for(var e=t.getEdgeIterator();e.hasNext();){var n=e.next();if(this.checkNoSelfIntersectingRing(n.getEdgeIntersectionList()),null!==this.validErr)return null}},checkConnectedInteriors:function(t){var e=new Kr(t);e.isInteriorsConnected()||(this.validErr=new us(us.DISCONNECTED_INTERIOR,e.getCoordinate()))},checkNoSelfIntersectingRing:function(t){for(var e=new at,n=!0,i=t.iterator();i.hasNext();){var r=i.next();if(n)n=!1;else{if(e.contains(r.coord))return this.validErr=new us(us.RING_SELF_INTERSECTION,r.coord),null;e.add(r.coord)}}},checkHolesInShell:function(t,e){for(var n=t.getExteriorRing(),i=new is(n),r=0;r<t.getNumInteriorRing();r++){var s=t.getInteriorRingN(r),o=ls.findPtNotNode(s.getCoordinates(),n,e);if(null===o)return null;var a=!i.isInside(o);if(a)return this.validErr=new us(us.HOLE_OUTSIDE_SHELL,o),null}},checkTooFewPoints:function(t){return t.hasTooFewPoints()?(this.validErr=new us(us.TOO_FEW_POINTS,t.getInvalidPoint()),null):void 0},getValidationError:function(){return this.checkValid(this.parentGeometry),this.validErr},checkValid:function(){if(arguments[0]instanceof Lt){var t=arguments[0];this.checkInvalidCoordinates(t.getCoordinates())}else if(arguments[0]instanceof Pt){var e=arguments[0];this.checkInvalidCoordinates(e.getCoordinates())}else if(arguments[0]instanceof bt){var n=arguments[0];if(this.checkInvalidCoordinates(n.getCoordinates()),null!==this.validErr)return null;if(this.checkClosedRing(n),null!==this.validErr)return null;var i=new $n(0,n);if(this.checkTooFewPoints(i),null!==this.validErr)return null;var r=new ae;i.computeSelfNodes(r,!0,!0),this.checkNoSelfIntersectingRings(i)}else if(arguments[0]instanceof St){var s=arguments[0];if(this.checkInvalidCoordinates(s.getCoordinates()),null!==this.validErr)return null;var i=new $n(0,s);this.checkTooFewPoints(i)}else if(arguments[0]instanceof Tt){var o=arguments[0];if(this.checkInvalidCoordinates(o),null!==this.validErr)return null;if(this.checkClosedRings(o),null!==this.validErr)return null;var i=new $n(0,o);if(this.checkTooFewPoints(i),null!==this.validErr)return null;if(this.checkConsistentArea(i),null!==this.validErr)return null;if(!this.isSelfTouchingRingFormingHoleValid&&(this.checkNoSelfIntersectingRings(i),null!==this.validErr))return null;if(this.checkHolesInShell(o,i),null!==this.validErr)return null;if(this.checkHolesNotNested(o,i),null!==this.validErr)return null;this.checkConnectedInteriors(i)}else if(arguments[0]instanceof Ot){for(var a=arguments[0],u=0;u<a.getNumGeometries();u++){var l=a.getGeometryN(u);if(this.checkInvalidCoordinates(l),null!==this.validErr)return null;if(this.checkClosedRings(l),null!==this.validErr)return null}var i=new $n(0,a);if(this.checkTooFewPoints(i),null!==this.validErr)return null;if(this.checkConsistentArea(i),null!==this.validErr)return null;if(!this.isSelfTouchingRingFormingHoleValid&&(this.checkNoSelfIntersectingRings(i),null!==this.validErr))return null;for(var u=0;u<a.getNumGeometries();u++){var l=a.getGeometryN(u);if(this.checkHolesInShell(l,i),null!==this.validErr)return null}for(var u=0;u<a.getNumGeometries();u++){var l=a.getGeometryN(u);if(this.checkHolesNotNested(l,i),null!==this.validErr)return null}if(this.checkShellsNotNested(a,i),null!==this.validErr)return null;this.checkConnectedInteriors(i)}else if(arguments[0]instanceof ft)for(var h=arguments[0],u=0;u<h.getNumGeometries();u++){var c=h.getGeometryN(u);if(this.checkValid(c),null!==this.validErr)return null}else if(arguments[0]instanceof B){var f=arguments[0];if(this.validErr=null,f.isEmpty())return null;if(f instanceof Lt)this.checkValid(f);else if(f instanceof Pt)this.checkValid(f);else if(f instanceof bt)this.checkValid(f);else if(f instanceof St)this.checkValid(f);else if(f instanceof Tt)this.checkValid(f);else if(f instanceof Ot)this.checkValid(f);else{if(!(f instanceof ft))throw new UnsupportedOperationException(f.getClass().getName());this.checkValid(f)}}},setSelfTouchingRingFormingHoleValid:function(t){this.isSelfTouchingRingFormingHoleValid=t},checkShellNotNested:function(t,e,n){var i=t.getCoordinates(),r=e.getExteriorRing(),s=r.getCoordinates(),o=ls.findPtNotNode(i,r,n);if(null===o)return null;var a=he.isPointInRing(o,s);if(!a)return null;if(e.getNumInteriorRing()<=0)return this.validErr=new us(us.NESTED_SHELLS,o),null;for(var u=null,l=0;l<e.getNumInteriorRing();l++){var h=e.getInteriorRingN(l);if(u=this.checkShellInsideHole(t,h,n),null===u)return null}this.validErr=new us(us.NESTED_SHELLS,u)},checkClosedRings:function(t){if(this.checkClosedRing(t.getExteriorRing()),null!==this.validErr)return null;for(var e=0;e<t.getNumInteriorRing();e++)if(this.checkClosedRing(t.getInteriorRingN(e)),null!==this.validErr)return null},checkClosedRing:function(t){if(!t.isClosed()){var e=null;t.getNumPoints()>=1&&(e=t.getCoordinateN(0)),this.validErr=new us(us.RING_NOT_CLOSED,e)}},checkShellsNotNested:function(t,e){for(var n=0;n<t.getNumGeometries();n++)for(var i=t.getGeometryN(n),r=i.getExteriorRing(),s=0;s<t.getNumGeometries();s++)if(n!==s){var o=t.getGeometryN(s);if(this.checkShellNotNested(r,o,e),null!==this.validErr)return null}},interfaces_:function(){return[]},getClass:function(){return ls}}),ls.findPtNotNode=function(t,e,n){for(var i=n.findEdge(e),r=i.getEdgeIntersectionList(),s=0;s<t.length;s++){var o=t[s];if(!r.isIntersection(o))return o}return null},ls.isValid=function(){if(arguments[0]instanceof B){var t=arguments[0],e=new ls(t);return e.isValid()}if(arguments[0]instanceof g){var n=arguments[0];return r.isNaN(n.x)?!1:r.isInfinite(n.x)?!1:r.isNaN(n.y)?!1:!r.isInfinite(n.y)}};var bo=Object.freeze({IsValidOp:ls}),Oo=Object.freeze({BoundaryOp:dt,IsSimpleOp:Gi,buffer:Co,distance:So,linemerge:wo,overlay:Lo,polygonize:Ro,relate:To,union:Po,valid:bo});h(hs,_t.CoordinateOperation),e(hs.prototype,{editCoordinates:function(t,e){if(0===t.length)return null;for(var n=new Array(t.length).fill(null),i=0;i<t.length;i++){var r=new g(t[i]);this.targetPM.makePrecise(r),n[i]=r}var s=new N(n,!1),o=s.toCoordinateArray(),a=0;e instanceof St&&(a=2),e instanceof bt&&(a=4);var u=n;return this.removeCollapsed&&(u=null),o.length<a?u:o},interfaces_:function(){return[]},getClass:function(){return hs}}),e(cs.prototype,{fixPolygonalTopology:function(t){var e=t;this.changePrecisionModel||(e=this.changePM(t,this.targetPM));var n=e.buffer(0),i=n;return this.changePrecisionModel||(i=t.getFactory().createGeometry(n)),i},reducePointwise:function(t){var e=null;if(this.changePrecisionModel){var n=this.createFactory(t.getFactory(),this.targetPM);e=new _t(n)}else e=new _t;var i=this.removeCollapsed;t.getDimension()>=2&&(i=!0);var r=e.edit(t,new hs(this.targetPM,i));return r},changePM:function(t,e){var n=this.createEditor(t.getFactory(),e);return n.edit(t,new _t.NoOpGeometryOperation)},setRemoveCollapsedComponents:function(t){this.removeCollapsed=t},createFactory:function(t,e){var n=new ie(e,t.getSRID(),t.getCoordinateSequenceFactory());return n},setChangePrecisionModel:function(t){this.changePrecisionModel=t},reduce:function(t){var e=this.reducePointwise(t);return this.isPointwise?e:R(e,Rt)?e.isValid()?e:this.fixPolygonalTopology(e):e},setPointwise:function(t){this.isPointwise=t},createEditor:function(t,e){if(t.getPrecisionModel()===e)return new _t;var n=this.createFactory(t,e),i=new _t(n);return i},interfaces_:function(){return[]},getClass:function(){return cs}}),cs.reduce=function(t,e){var n=new cs(e);return n.reduce(t)},cs.reducePointwise=function(t,e){var n=new cs(e);return n.setPointwise(!0),n.reduce(t)};var _o=Object.freeze({GeometryPrecisionReducer:cs});e(fs.prototype,{simplifySection:function(t,e){if(t+1===e)return null;this.seg.p0=this.pts[t],this.seg.p1=this.pts[e];for(var n=-1,i=t,r=t+1;e>r;r++){var s=this.seg.distance(this.pts[r]);s>n&&(n=s,i=r)}if(n<=this.distanceTolerance)for(var r=t+1;e>r;r++)this.usePt[r]=!1;else this.simplifySection(t,i),this.simplifySection(i,e)},setDistanceTolerance:function(t){this.distanceTolerance=t},simplify:function(){this.usePt=new Array(this.pts.length).fill(null);for(var t=0;t<this.pts.length;t++)this.usePt[t]=!0;this.simplifySection(0,this.pts.length-1);for(var e=new N,t=0;t<this.pts.length;t++)this.usePt[t]&&e.add(new g(this.pts[t]));return e.toCoordinateArray()},interfaces_:function(){return[]},getClass:function(){return fs}}),fs.simplify=function(t,e){var n=new fs(t);return n.setDistanceTolerance(e),n.simplify()},e(gs.prototype,{setEnsureValid:function(t){this.isEnsureValidTopology=t},getResultGeometry:function(){return this.inputGeom.isEmpty()?this.inputGeom.copy():new ds(this.isEnsureValidTopology,this.distanceTolerance).transform(this.inputGeom)},setDistanceTolerance:function(t){if(0>t)throw new i("Tolerance must be non-negative");this.distanceTolerance=t},interfaces_:function(){return[]},getClass:function(){return gs}}),gs.simplify=function(t,e){var n=new gs(t);return n.setDistanceTolerance(e),n.getResultGeometry()},h(ds,xe),e(ds.prototype,{transformPolygon:function(t,e){if(t.isEmpty())return null;var n=xe.prototype.transformPolygon.call(this,t,e);return e instanceof Ot?n:this.createValidArea(n)},createValidArea:function(t){return this.isEnsureValidTopology?t.buffer(0):t},transformCoordinates:function(t,e){var n=t.toCoordinateArray(),i=null;return i=0===n.length?new Array(0).fill(null):fs.simplify(n,this.distanceTolerance),this.factory.getCoordinateSequenceFactory().create(i)},transformMultiPolygon:function(t,e){var n=xe.prototype.transformMultiPolygon.call(this,t,e);return this.createValidArea(n)},transformLinearRing:function(t,e){var n=e instanceof Tt,i=xe.prototype.transformLinearRing.call(this,t,e);return!n||i instanceof bt?i:null},interfaces_:function(){return[]},getClass:function(){return ds}}),gs.DPTransformer=ds,h(ps,ce),e(ps.prototype,{getIndex:function(){return this.index},getParent:function(){return this.parent},interfaces_:function(){return[]},getClass:function(){return ps}}),e(vs.prototype,{addToResult:function(t){this.resultSegs.add(t)},asLineString:function(){return this.parentLine.getFactory().createLineString(vs.extractCoordinates(this.resultSegs))},getResultSize:function(){var t=this.resultSegs.size();return 0===t?0:t+1},getParent:function(){return this.parentLine},getSegment:function(t){return this.segs[t]},getParentCoordinates:function(){return this.parentLine.getCoordinates()},getMinimumSize:function(){return this.minimumSize},asLinearRing:function(){return this.parentLine.getFactory().createLinearRing(vs.extractCoordinates(this.resultSegs))},getSegments:function(){return this.segs},init:function(){var t=this.parentLine.getCoordinates();this.segs=new Array(t.length-1).fill(null);for(var e=0;e<t.length-1;e++){var n=new ps(t[e],t[e+1],this.parentLine,e);this.segs[e]=n}},getResultCoordinates:function(){return vs.extractCoordinates(this.resultSegs)},interfaces_:function(){return[]},getClass:function(){return vs}}),vs.extractCoordinates=function(t){for(var e=new Array(t.size()+1).fill(null),n=null,i=0;i<t.size();i++)n=t.get(i),e[i]=n.p0;return e[e.length-1]=n.p1,e},e(ms.prototype,{remove:function(t){this.index.remove(new C(t.p0,t.p1),t)},add:function(){if(arguments[0]instanceof vs)for(var t=arguments[0],e=t.getSegments(),n=0;n<e.length;n++){var i=e[n];this.add(i)}else if(arguments[0]instanceof ce){var r=arguments[0];this.index.insert(new C(r.p0,r.p1),r)}},query:function(t){var e=new C(t.p0,t.p1),n=new ys(t);this.index.query(e,n);var i=n.getItems();return i},interfaces_:function(){return[]},getClass:function(){return ms}}),e(ys.prototype,{visitItem:function(t){var e=t;C.intersects(e.p0,e.p1,this.querySeg.p0,this.querySeg.p1)&&this.items.add(t)},getItems:function(){return this.items},interfaces_:function(){return[Ae]},getClass:function(){return ys}}),e(xs.prototype,{flatten:function(t,e){var n=this.linePts[t],i=this.linePts[e],r=new ce(n,i);return this.remove(this.line,t,e),this.outputIndex.add(r),r},hasBadIntersection:function(t,e,n){return this.hasBadOutputIntersection(n)?!0:!!this.hasBadInputIntersection(t,e,n)},setDistanceTolerance:function(t){this.distanceTolerance=t},simplifySection:function(t,e,n){n+=1;var i=new Array(2).fill(null);if(t+1===e){var r=this.line.getSegment(t);return this.line.addToResult(r),null}var s=!0;if(this.line.getResultSize()<this.line.getMinimumSize()){var o=n+1;o<this.line.getMinimumSize()&&(s=!1)}var a=new Array(1).fill(null),u=this.findFurthestPoint(this.linePts,t,e,a);a[0]>this.distanceTolerance&&(s=!1);var l=new ce;if(l.p0=this.linePts[t],l.p1=this.linePts[e],i[0]=t,i[1]=e,this.hasBadIntersection(this.line,i,l)&&(s=!1),s){var r=this.flatten(t,e);return this.line.addToResult(r),null}this.simplifySection(t,u,n),this.simplifySection(u,e,n)},hasBadOutputIntersection:function(t){for(var e=this.outputIndex.query(t),n=e.iterator();n.hasNext();){var i=n.next();if(this.hasInteriorIntersection(i,t))return!0}return!1},findFurthestPoint:function(t,e,n,i){var r=new ce;r.p0=t[e],r.p1=t[n];for(var s=-1,o=e,a=e+1;n>a;a++){var u=t[a],l=r.distance(u);l>s&&(s=l,o=a)}return i[0]=s,o},simplify:function(t){this.line=t,this.linePts=t.getParentCoordinates(),this.simplifySection(0,this.linePts.length-1,0)},remove:function(t,e,n){for(var i=e;n>i;i++){var r=t.getSegment(i);this.inputIndex.remove(r)}},hasInteriorIntersection:function(t,e){return this.li.computeIntersection(t.p0,t.p1,e.p0,e.p1),this.li.isInteriorIntersection()},hasBadInputIntersection:function(t,e,n){for(var i=this.inputIndex.query(n),r=i.iterator();r.hasNext();){var s=r.next();if(this.hasInteriorIntersection(s,n)){if(xs.isInLineSection(t,e,s))continue;return!0}}return!1},interfaces_:function(){return[]},getClass:function(){return xs}}),xs.isInLineSection=function(t,e,n){if(n.getParent()!==t.getParent())return!1;var i=n.getIndex();return i>=e[0]&&i<e[1]},e(Es.prototype,{setDistanceTolerance:function(t){this.distanceTolerance=t},simplify:function(t){for(var e=t.iterator();e.hasNext();)this.inputIndex.add(e.next());for(var e=t.iterator();e.hasNext();){var n=new xs(this.inputIndex,this.outputIndex);n.setDistanceTolerance(this.distanceTolerance),n.simplify(e.next())}},interfaces_:function(){return[]},getClass:function(){return Es}}),e(Is.prototype,{getResultGeometry:function(){if(this.inputGeom.isEmpty())return this.inputGeom.copy();this.linestringMap=new te,this.inputGeom.apply(new Cs(this)),this.lineSimplifier.simplify(this.linestringMap.values());var t=new Ns(this.linestringMap).transform(this.inputGeom);return t},setDistanceTolerance:function(t){if(0>t)throw new i("Tolerance must be non-negative");this.lineSimplifier.setDistanceTolerance(t)},interfaces_:function(){return[]},getClass:function(){return Is}}),Is.simplify=function(t,e){var n=new Is(t);return n.setDistanceTolerance(e),n.getResultGeometry()},h(Ns,xe),e(Ns.prototype,{transformCoordinates:function(t,e){if(0===t.size())return null;if(e instanceof St){var n=this.linestringMap.get(e);return this.createCoordinateSequence(n.getResultCoordinates())}return xe.prototype.transformCoordinates.call(this,t,e)},interfaces_:function(){return[]},getClass:function(){return Ns}}),e(Cs.prototype,{filter:function(t){if(t instanceof St){var e=t;if(e.isEmpty())return null;var n=e.isClosed()?4:2,i=new vs(e,n);this.tps.linestringMap.put(e,i)}},interfaces_:function(){return[q]},getClass:function(){return Cs}}),Is.LineStringTransformer=Ns,Is.LineStringMapBuilderFilter=Cs;var Mo=Object.freeze({DouglasPeuckerSimplifier:gs,TopologyPreservingSimplifier:Is});e(Ss.prototype,{splitAt:function(){if(1===arguments.length){var t=arguments[0],e=this.minimumLen/this.segLen;if(t.distance(this.seg.p0)<this.minimumLen)return this.splitPt=this.seg.pointAlong(e),null;if(t.distance(this.seg.p1)<this.minimumLen)return this.splitPt=Ss.pointAlongReverse(this.seg,e),null;this.splitPt=t}else if(2===arguments.length){var n=arguments[0],i=arguments[1],r=this.getConstrainedLength(n),s=r/this.segLen;i.equals2D(this.seg.p0)?this.splitPt=this.seg.pointAlong(s):this.splitPt=Ss.pointAlongReverse(this.seg,s)}},setMinimumLength:function(t){this.minimumLen=t},getConstrainedLength:function(t){return t<this.minimumLen?this.minimumLen:t},getSplitPoint:function(){return this.splitPt},interfaces_:function(){return[]},getClass:function(){return Ss}}),Ss.pointAlongReverse=function(t,e){var n=new g;return n.x=t.p1.x-e*(t.p1.x-t.p0.x),n.y=t.p1.y-e*(t.p1.y-t.p0.y),n},e(ws.prototype,{findSplitPoint:function(t,e){},interfaces_:function(){return[]},getClass:function(){return ws}}),e(Ls.prototype,{findSplitPoint:function(t,e){var n=t.getLineSegment(),i=n.getLength(),r=i/2,s=new Ss(n),o=Ls.projectedSplitPoint(t,e),a=2*o.distance(e)*.8,u=a;return u>r&&(u=r),s.setMinimumLength(u),s.splitAt(o),s.getSplitPoint()},interfaces_:function(){return[ws]},getClass:function(){return Ls}}),Ls.projectedSplitPoint=function(t,e){var n=t.getLineSegment(),i=n.project(e);return i},e(Rs.prototype,{interfaces_:function(){return[]},getClass:function(){return Rs}}),Rs.triArea=function(t,e,n){return(e.x-t.x)*(n.y-t.y)-(e.y-t.y)*(n.x-t.x)},Rs.isInCircleDDNormalized=function(t,e,n,i){var r=_.valueOf(t.x).selfSubtract(i.x),s=_.valueOf(t.y).selfSubtract(i.y),o=_.valueOf(e.x).selfSubtract(i.x),a=_.valueOf(e.y).selfSubtract(i.y),u=_.valueOf(n.x).selfSubtract(i.x),l=_.valueOf(n.y).selfSubtract(i.y),h=r.multiply(a).selfSubtract(o.multiply(s)),c=o.multiply(l).selfSubtract(u.multiply(a)),f=u.multiply(s).selfSubtract(r.multiply(l)),g=r.multiply(r).selfAdd(s.multiply(s)),d=o.multiply(o).selfAdd(a.multiply(a)),p=u.multiply(u).selfAdd(l.multiply(l)),v=g.selfMultiply(c).selfAdd(d.selfMultiply(f)).selfAdd(p.selfMultiply(h)),m=v.doubleValue()>0;return m},Rs.checkRobustInCircle=function(t,e,n,i){var r=Rs.isInCircleNonRobust(t,e,n,i),s=Rs.isInCircleDDSlow(t,e,n,i),o=Rs.isInCircleCC(t,e,n,i),a=ci.circumcentre(t,e,n);A.out.println("p radius diff a = "+Math.abs(i.distance(a)-t.distance(a))/t.distance(a)),r===s&&r===o||(A.out.println("inCircle robustness failure (double result = "+r+", DD result = "+s+", CC result = "+o+")"),A.out.println(se.toLineString(new Gt([t,e,n,i]))),A.out.println("Circumcentre = "+se.toPoint(a)+" radius = "+t.distance(a)),A.out.println("p radius diff a = "+Math.abs(i.distance(a)/t.distance(a)-1)),A.out.println("p radius diff b = "+Math.abs(i.distance(a)/e.distance(a)-1)),A.out.println("p radius diff c = "+Math.abs(i.distance(a)/n.distance(a)-1)),A.out.println())},Rs.isInCircleDDFast=function(t,e,n,i){var r=_.sqr(t.x).selfAdd(_.sqr(t.y)).selfMultiply(Rs.triAreaDDFast(e,n,i)),s=_.sqr(e.x).selfAdd(_.sqr(e.y)).selfMultiply(Rs.triAreaDDFast(t,n,i)),o=_.sqr(n.x).selfAdd(_.sqr(n.y)).selfMultiply(Rs.triAreaDDFast(t,e,i)),a=_.sqr(i.x).selfAdd(_.sqr(i.y)).selfMultiply(Rs.triAreaDDFast(t,e,n)),u=r.selfSubtract(s).selfAdd(o).selfSubtract(a),l=u.doubleValue()>0;return l},Rs.isInCircleCC=function(t,e,n,i){var r=ci.circumcentre(t,e,n),s=t.distance(r),o=i.distance(r)-s;return 0>=o},Rs.isInCircleNormalized=function(t,e,n,i){var r=t.x-i.x,s=t.y-i.y,o=e.x-i.x,a=e.y-i.y,u=n.x-i.x,l=n.y-i.y,h=r*a-o*s,c=o*l-u*a,f=u*s-r*l,g=r*r+s*s,d=o*o+a*a,p=u*u+l*l,v=g*c+d*f+p*h;return v>0},Rs.isInCircleDDSlow=function(t,e,n,i){var r=_.valueOf(i.x),s=_.valueOf(i.y),o=_.valueOf(t.x),a=_.valueOf(t.y),u=_.valueOf(e.x),l=_.valueOf(e.y),h=_.valueOf(n.x),c=_.valueOf(n.y),f=o.multiply(o).add(a.multiply(a)).multiply(Rs.triAreaDDSlow(u,l,h,c,r,s)),g=u.multiply(u).add(l.multiply(l)).multiply(Rs.triAreaDDSlow(o,a,h,c,r,s)),d=h.multiply(h).add(c.multiply(c)).multiply(Rs.triAreaDDSlow(o,a,u,l,r,s)),p=r.multiply(r).add(s.multiply(s)).multiply(Rs.triAreaDDSlow(o,a,u,l,h,c)),v=f.subtract(g).add(d).subtract(p),m=v.doubleValue()>0;
return m},Rs.isInCircleNonRobust=function(t,e,n,i){var r=(t.x*t.x+t.y*t.y)*Rs.triArea(e,n,i)-(e.x*e.x+e.y*e.y)*Rs.triArea(t,n,i)+(n.x*n.x+n.y*n.y)*Rs.triArea(t,e,i)-(i.x*i.x+i.y*i.y)*Rs.triArea(t,e,n)>0;return r},Rs.isInCircleRobust=function(t,e,n,i){return Rs.isInCircleNormalized(t,e,n,i)},Rs.triAreaDDSlow=function(t,e,n,i,r,s){return n.subtract(t).multiply(s.subtract(e)).subtract(i.subtract(e).multiply(r.subtract(t)))},Rs.triAreaDDFast=function(t,e,n){var i=_.valueOf(e.x).selfSubtract(t.x).selfMultiply(_.valueOf(n.y).selfSubtract(t.y)),r=_.valueOf(e.y).selfSubtract(t.y).selfMultiply(_.valueOf(n.x).selfSubtract(t.x));return i.selfSubtract(r)},e(Ts.prototype,{circleCenter:function(t,e){var n=new Ts(this.getX(),this.getY()),i=this.bisector(n,t),r=this.bisector(t,e),s=new F(i,r),o=null;try{o=new Ts(s.getX(),s.getY())}catch(i){if(!(i instanceof w))throw i;A.err.println("a: "+n+"  b: "+t+"  c: "+e),A.err.println(i)}finally{}return o},dot:function(t){return this.p.x*t.getX()+this.p.y*t.getY()},magn:function(){return Math.sqrt(this.p.x*this.p.x+this.p.y*this.p.y)},getZ:function(){return this.p.z},bisector:function(t,e){var n=e.getX()-t.getX(),i=e.getY()-t.getY(),r=new F(t.getX()+n/2,t.getY()+i/2,1),s=new F(t.getX()-i+n/2,t.getY()+n+i/2,1);return new F(r,s)},equals:function(){if(1===arguments.length){var t=arguments[0];return this.p.x===t.getX()&&this.p.y===t.getY()}if(2===arguments.length){var e=arguments[0],n=arguments[1];return this.p.distance(e.getCoordinate())<n}},getCoordinate:function(){return this.p},isInCircle:function(t,e,n){return Rs.isInCircleRobust(t.p,e.p,n.p,this.p)},interpolateZValue:function(t,e,n){var i=t.getX(),r=t.getY(),s=e.getX()-i,o=n.getX()-i,a=e.getY()-r,u=n.getY()-r,l=s*u-o*a,h=this.getX()-i,c=this.getY()-r,f=(u*h-o*c)/l,g=(-a*h+s*c)/l,d=t.getZ()+f*(e.getZ()-t.getZ())+g*(n.getZ()-t.getZ());return d},midPoint:function(t){var e=(this.p.x+t.getX())/2,n=(this.p.y+t.getY())/2,i=(this.p.z+t.getZ())/2;return new Ts(e,n,i)},rightOf:function(t){return this.isCCW(t.dest(),t.orig())},isCCW:function(t,e){return(t.p.x-this.p.x)*(e.p.y-this.p.y)-(t.p.y-this.p.y)*(e.p.x-this.p.x)>0},getX:function(){return this.p.x},crossProduct:function(t){return this.p.x*t.getY()-this.p.y*t.getX()},setZ:function(t){this.p.z=t},times:function(t){return new Ts(t*this.p.x,t*this.p.y)},cross:function(){return new Ts(this.p.y,-this.p.x)},leftOf:function(t){return this.isCCW(t.orig(),t.dest())},toString:function(){return"POINT ("+this.p.x+" "+this.p.y+")"},sub:function(t){return new Ts(this.p.x-t.getX(),this.p.y-t.getY())},getY:function(){return this.p.y},classify:function(t,e){var n=this,i=e.sub(t),r=n.sub(t),s=i.crossProduct(r);return s>0?Ts.LEFT:0>s?Ts.RIGHT:i.getX()*r.getX()<0||i.getY()*r.getY()<0?Ts.BEHIND:i.magn()<r.magn()?Ts.BEYOND:t.equals(n)?Ts.ORIGIN:e.equals(n)?Ts.DESTINATION:Ts.BETWEEN},sum:function(t){return new Ts(this.p.x+t.getX(),this.p.y+t.getY())},distance:function(t,e){return Math.sqrt(Math.pow(e.getX()-t.getX(),2)+Math.pow(e.getY()-t.getY(),2))},circumRadiusRatio:function(t,e){var n=this.circleCenter(t,e),i=this.distance(n,t),r=this.distance(this,t),s=this.distance(t,e);return r>s&&(r=s),s=this.distance(e,this),r>s&&(r=s),i/r},interfaces_:function(){return[]},getClass:function(){return Ts}}),Ts.interpolateZ=function(){if(3===arguments.length){var t=arguments[0],e=arguments[1],n=arguments[2],i=e.distance(n),r=t.distance(e),s=n.z-e.z,o=e.z+s*(r/i);return o}if(4===arguments.length){var a=arguments[0],u=arguments[1],l=arguments[2],h=arguments[3],c=u.x,f=u.y,g=l.x-c,d=h.x-c,p=l.y-f,v=h.y-f,m=g*v-d*p,y=a.x-c,x=a.y-f,E=(v*y-d*x)/m,I=(-p*y+g*x)/m,N=u.z+E*(l.z-u.z)+I*(h.z-u.z);return N}},Ts.LEFT=0,Ts.RIGHT=1,Ts.BEYOND=2,Ts.BEHIND=3,Ts.BETWEEN=4,Ts.ORIGIN=5,Ts.DESTINATION=6,h(Ps,Ts),e(Ps.prototype,{getConstraint:function(){return this.constraint},setOnConstraint:function(t){this._isOnConstraint=t},merge:function(t){t._isOnConstraint&&(this._isOnConstraint=!0,this.constraint=t.constraint)},isOnConstraint:function(){return this._isOnConstraint},setConstraint:function(t){this._isOnConstraint=!0,this.constraint=t},interfaces_:function(){return[]},getClass:function(){return Ps}}),e(bs.prototype,{equalsNonOriented:function(t){return this.equalsOriented(t)?!0:!!this.equalsOriented(t.sym())},toLineSegment:function(){return new ce(this.vertex.getCoordinate(),this.dest().getCoordinate())},dest:function(){return this.sym().orig()},oNext:function(){return this.next},equalsOriented:function(t){return!(!this.orig().getCoordinate().equals2D(t.orig().getCoordinate())||!this.dest().getCoordinate().equals2D(t.dest().getCoordinate()))},dNext:function(){return this.sym().oNext().sym()},lPrev:function(){return this.next.sym()},rPrev:function(){return this.sym().oNext()},rot:function(){return this._rot},oPrev:function(){return this._rot.next._rot},sym:function(){return this._rot._rot},setOrig:function(t){this.vertex=t},lNext:function(){return this.invRot().oNext().rot()},getLength:function(){return this.orig().getCoordinate().distance(this.dest().getCoordinate())},invRot:function(){return this._rot.sym()},setDest:function(t){this.sym().setOrig(t)},setData:function(t){this.data=t},getData:function(){return this.data},delete:function(){this._rot=null},orig:function(){return this.vertex},rNext:function(){return this._rot.next.invRot()},toString:function(){var t=this.vertex.getCoordinate(),e=this.dest().getCoordinate();return se.toLineString(t,e)},isLive:function(){return null!==this._rot},getPrimary:function(){return this.orig().getCoordinate().compareTo(this.dest().getCoordinate())<=0?this:this.sym()},dPrev:function(){return this.invRot().oNext().invRot()},setNext:function(t){this.next=t},interfaces_:function(){return[]},getClass:function(){return bs}}),bs.makeEdge=function(t,e){var n=new bs,i=new bs,r=new bs,s=new bs;n._rot=i,i._rot=r,r._rot=s,s._rot=n,n.setNext(n),i.setNext(s),r.setNext(r),s.setNext(i);var o=n;return o.setOrig(t),o.setDest(e),o},bs.swap=function(t){var e=t.oPrev(),n=t.sym().oPrev();bs.splice(t,e),bs.splice(t.sym(),n),bs.splice(t,e.lNext()),bs.splice(t.sym(),n.lNext()),t.setOrig(e.dest()),t.setDest(n.dest())},bs.splice=function(t,e){var n=t.oNext().rot(),i=e.oNext().rot(),r=e.oNext(),s=t.oNext(),o=i.oNext(),a=n.oNext();t.setNext(r),e.setNext(s),n.setNext(o),i.setNext(a)},bs.connect=function(t,e){var n=bs.makeEdge(t.dest(),e.orig());return bs.splice(n,t.lNext()),bs.splice(n.sym(),e),n},e(Os.prototype,{insertSite:function(t){var e=this.subdiv.locate(t);if(this.subdiv.isVertexOfEdge(e,t))return e;this.subdiv.isOnEdge(e,t.getCoordinate())&&(e=e.oPrev(),this.subdiv.delete(e.oNext()));var n=this.subdiv.makeEdge(e.orig(),t);bs.splice(n,e);var i=n;do n=this.subdiv.connect(e,n.sym()),e=n.oPrev();while(e.lNext()!==i);for(;;){var r=e.oPrev();if(r.dest().rightOf(e)&&t.isInCircle(e.orig(),r.dest(),e.dest()))bs.swap(e),e=e.oPrev();else{if(e.oNext()===i)return n;e=e.oNext().lPrev()}}},insertSites:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.insertSite(n)}},interfaces_:function(){return[]},getClass:function(){return Os}}),e(_s.prototype,{locate:function(t){},interfaces_:function(){return[]},getClass:function(){return _s}}),e(Ms.prototype,{init:function(){this.lastEdge=this.findEdge()},locate:function(t){this.lastEdge.isLive()||this.init();var e=this.subdiv.locateFromEdge(t,this.lastEdge);return this.lastEdge=e,e},findEdge:function(){var t=this.subdiv.getEdges();return t.iterator().next()},interfaces_:function(){return[_s]},getClass:function(){return Ms}}),h(Ds,l),e(Ds.prototype,{getSegment:function(){return this.seg},interfaces_:function(){return[]},getClass:function(){return Ds}}),Ds.msgWithSpatial=function(t,e){return null!==e?t+" [ "+e+" ]":t},e(As.prototype,{visit:function(t){},interfaces_:function(){return[]},getClass:function(){return As}}),e(Fs.prototype,{getTriangleVertices:function(t){var e=new Bs;return this.visitTriangles(e,t),e.getTriangleVertices()},isFrameVertex:function(t){return t.equals(this.frameVertex[0])?!0:t.equals(this.frameVertex[1])?!0:!!t.equals(this.frameVertex[2])},isVertexOfEdge:function(t,e){return!(!e.equals(t.orig(),this.tolerance)&&!e.equals(t.dest(),this.tolerance))},connect:function(t,e){var n=bs.connect(t,e);return this.quadEdges.add(n),n},getVoronoiCellPolygon:function(t,e){var n=new I,i=t;do{var r=t.rot().orig().getCoordinate();n.add(r),t=t.oPrev()}while(t!==i);var s=new N;s.addAll(n,!1),s.closeRing(),s.size()<4&&(A.out.println(s),s.add(s.get(s.size()-1),!0));var o=s.toCoordinateArray(),a=e.createPolygon(e.createLinearRing(o),null),u=i.orig();return a.setUserData(u.getCoordinate()),a},setLocator:function(t){this.locator=t},initSubdiv:function(){var t=this.makeEdge(this.frameVertex[0],this.frameVertex[1]),e=this.makeEdge(this.frameVertex[1],this.frameVertex[2]);bs.splice(t.sym(),e);var n=this.makeEdge(this.frameVertex[2],this.frameVertex[0]);return bs.splice(e.sym(),n),bs.splice(n.sym(),t),t},isFrameBorderEdge:function(t){var e=new Array(3).fill(null);Fs.getTriangleEdges(t,e);var n=new Array(3).fill(null);Fs.getTriangleEdges(t.sym(),n);var i=t.lNext().dest();if(this.isFrameVertex(i))return!0;var r=t.sym().lNext().dest();return!!this.isFrameVertex(r)},makeEdge:function(t,e){var n=bs.makeEdge(t,e);return this.quadEdges.add(n),n},visitTriangles:function(t,e){this.visitedKey++;var n=new pe;n.push(this.startingEdge);for(var i=new J;!n.empty();){var r=n.pop();if(!i.contains(r)){var s=this.fetchTriangleToVisit(r,n,e,i);null!==s&&t.visit(s)}}},isFrameEdge:function(t){return!(!this.isFrameVertex(t.orig())&&!this.isFrameVertex(t.dest()))},isOnEdge:function(t,e){this.seg.setCoordinates(t.orig().getCoordinate(),t.dest().getCoordinate());var n=this.seg.distance(e);return n<this.edgeCoincidenceTolerance},getEnvelope:function(){return new C(this.frameEnv)},createFrame:function(t){var e=t.getWidth(),n=t.getHeight(),i=0;i=e>n?10*e:10*n,this.frameVertex[0]=new Ts((t.getMaxX()+t.getMinX())/2,t.getMaxY()+i),this.frameVertex[1]=new Ts(t.getMinX()-i,t.getMinY()-i),this.frameVertex[2]=new Ts(t.getMaxX()+i,t.getMinY()-i),this.frameEnv=new C(this.frameVertex[0].getCoordinate(),this.frameVertex[1].getCoordinate()),this.frameEnv.expandToInclude(this.frameVertex[2].getCoordinate())},getTriangleCoordinates:function(t){var e=new zs;return this.visitTriangles(e,t),e.getTriangles()},getVertices:function(t){for(var e=new J,n=this.quadEdges.iterator();n.hasNext();){var i=n.next(),r=i.orig();!t&&this.isFrameVertex(r)||e.add(r);var s=i.dest();!t&&this.isFrameVertex(s)||e.add(s)}return e},fetchTriangleToVisit:function(t,e,n,i){var r=t,s=0,o=!1;do{this.triEdges[s]=r,this.isFrameEdge(r)&&(o=!0);var a=r.sym();i.contains(a)||e.push(a),i.add(r),s++,r=r.lNext()}while(r!==t);return o&&!n?null:this.triEdges},getEdges:function(){if(0===arguments.length)return this.quadEdges;if(1===arguments.length){for(var t=arguments[0],e=this.getPrimaryEdges(!1),n=new Array(e.size()).fill(null),i=0,r=e.iterator();r.hasNext();){var s=r.next();n[i++]=t.createLineString([s.orig().getCoordinate(),s.dest().getCoordinate()])}return t.createMultiLineString(n)}},getVertexUniqueEdges:function(t){for(var e=new I,n=new J,i=this.quadEdges.iterator();i.hasNext();){var r=i.next(),s=r.orig();n.contains(s)||(n.add(s),!t&&this.isFrameVertex(s)||e.add(r));var o=r.sym(),a=o.orig();n.contains(a)||(n.add(a),!t&&this.isFrameVertex(a)||e.add(o))}return e},getTriangleEdges:function(t){var e=new qs;return this.visitTriangles(e,t),e.getTriangleEdges()},getPrimaryEdges:function(t){this.visitedKey++;var e=new I,n=new pe;n.push(this.startingEdge);for(var i=new J;!n.empty();){var r=n.pop();if(!i.contains(r)){var s=r.getPrimary();!t&&this.isFrameEdge(s)||e.add(s),n.push(r.oNext()),n.push(r.sym().oNext()),i.add(r),i.add(r.sym())}}return e},delete:function(t){bs.splice(t,t.oPrev()),bs.splice(t.sym(),t.sym().oPrev());var e=t.sym(),n=t.rot(),i=t.rot().sym();this.quadEdges.remove(t),this.quadEdges.remove(e),this.quadEdges.remove(n),this.quadEdges.remove(i),t.delete(),e.delete(),n.delete(),i.delete()},locateFromEdge:function(t,e){for(var n=0,i=this.quadEdges.size(),r=e;;){if(n++,n>i)throw new Ds(r.toLineSegment());if(t.equals(r.orig())||t.equals(r.dest()))break;if(t.rightOf(r))r=r.sym();else if(t.rightOf(r.oNext())){if(t.rightOf(r.dPrev()))break;r=r.dPrev()}else r=r.oNext()}return r},getTolerance:function(){return this.tolerance},getVoronoiCellPolygons:function(t){this.visitTriangles(new Gs,!0);for(var e=new I,n=this.getVertexUniqueEdges(!1),i=n.iterator();i.hasNext();){var r=i.next();e.add(this.getVoronoiCellPolygon(r,t))}return e},getVoronoiDiagram:function(t){var e=this.getVoronoiCellPolygons(t);return t.createGeometryCollection(ie.toGeometryArray(e))},getTriangles:function(t){for(var e=this.getTriangleCoordinates(!1),n=new Array(e.size()).fill(null),i=0,r=e.iterator();r.hasNext();){var s=r.next();n[i++]=t.createPolygon(t.createLinearRing(s),null)}return t.createGeometryCollection(n)},insertSite:function(t){var e=this.locate(t);if(t.equals(e.orig(),this.tolerance)||t.equals(e.dest(),this.tolerance))return e;var n=this.makeEdge(e.orig(),t);bs.splice(n,e);var i=n;do n=this.connect(e,n.sym()),e=n.oPrev();while(e.lNext()!==i);return i},locate:function(){if(1===arguments.length){if(arguments[0]instanceof Ts){var t=arguments[0];return this.locator.locate(t)}if(arguments[0]instanceof g){var e=arguments[0];return this.locator.locate(new Ts(e))}}else if(2===arguments.length){var n=arguments[0],i=arguments[1],r=this.locator.locate(new Ts(n));if(null===r)return null;var s=r;r.dest().getCoordinate().equals2D(n)&&(s=r.sym());var o=s;do{if(o.dest().getCoordinate().equals2D(i))return o;o=o.oNext()}while(o!==s);return null}},interfaces_:function(){return[]},getClass:function(){return Fs}}),Fs.getTriangleEdges=function(t,e){if(e[0]=t,e[1]=e[0].lNext(),e[2]=e[1].lNext(),e[2].lNext()!==e[0])throw new i("Edges do not form a triangle")},e(Gs.prototype,{visit:function(t){for(var e=t[0].orig().getCoordinate(),n=t[1].orig().getCoordinate(),i=t[2].orig().getCoordinate(),r=ci.circumcentre(e,n,i),s=new Ts(r),o=0;3>o;o++)t[o].rot().setOrig(s)},interfaces_:function(){return[As]},getClass:function(){return Gs}}),e(qs.prototype,{getTriangleEdges:function(){return this.triList},visit:function(t){this.triList.add(t.clone())},interfaces_:function(){return[As]},getClass:function(){return qs}}),e(Bs.prototype,{visit:function(t){this.triList.add([t[0].orig(),t[1].orig(),t[2].orig()])},getTriangleVertices:function(){return this.triList},interfaces_:function(){return[As]},getClass:function(){return Bs}}),e(zs.prototype,{checkTriangleSize:function(t){var e="";t.length>=2?e=se.toLineString(t[0],t[1]):t.length>=1&&(e=se.toPoint(t[0]))},visit:function(t){this.coordList.clear();for(var e=0;3>e;e++){var n=t[e].orig();this.coordList.add(n.getCoordinate())}if(this.coordList.size()>0){this.coordList.closeRing();var i=this.coordList.toCoordinateArray();if(4!==i.length)return null;this.triCoords.add(i)}},getTriangles:function(){return this.triCoords},interfaces_:function(){return[As]},getClass:function(){return zs}}),Fs.TriangleCircumcentreVisitor=Gs,Fs.TriangleEdgesListVisitor=qs,Fs.TriangleVertexListVisitor=Bs,Fs.TriangleCoordinatesVisitor=zs,Fs.EDGE_COINCIDENCE_TOL_FACTOR=1e3,e(Vs.prototype,{getLineSegment:function(){return this.ls},getEndZ:function(){var t=this.ls.getCoordinate(1);return t.z},getStartZ:function(){var t=this.ls.getCoordinate(0);return t.z},intersection:function(t){return this.ls.intersection(t.getLineSegment())},getStart:function(){return this.ls.getCoordinate(0)},getEnd:function(){return this.ls.getCoordinate(1)},getEndY:function(){var t=this.ls.getCoordinate(1);return t.y},getStartX:function(){var t=this.ls.getCoordinate(0);return t.x},equalsTopo:function(t){return this.ls.equalsTopo(t.getLineSegment())},getStartY:function(){var t=this.ls.getCoordinate(0);return t.y},setData:function(t){this.data=t},getData:function(){return this.data},getEndX:function(){var t=this.ls.getCoordinate(1);return t.x},toString:function(){return this.ls.toString()},interfaces_:function(){return[]},getClass:function(){return Vs}}),e(ks.prototype,{visit:function(t){},interfaces_:function(){return[]},getClass:function(){return ks}}),e(Ys.prototype,{isRepeated:function(){return this.count>1},getRight:function(){return this.right},getCoordinate:function(){return this.p},setLeft:function(t){this.left=t},getX:function(){return this.p.x},getData:function(){return this.data},getCount:function(){return this.count},getLeft:function(){return this.left},getY:function(){return this.p.y},increment:function(){this.count=this.count+1},setRight:function(t){this.right=t},interfaces_:function(){return[]},getClass:function(){return Ys}}),e(Us.prototype,{insert:function(){if(1===arguments.length){var t=arguments[0];return this.insert(t,null)}if(2===arguments.length){var e=arguments[0],n=arguments[1];if(null===this.root)return this.root=new Ys(e,n),this.root;if(this.tolerance>0){var i=this.findBestMatchNode(e);if(null!==i)return i.increment(),i}return this.insertExact(e,n)}},query:function(){var t=arguments,e=this;if(1===arguments.length){var n=arguments[0],i=new I;return this.query(n,i),i}if(2===arguments.length)if(arguments[0]instanceof C&&R(arguments[1],y))!function(){var n=t[0],i=t[1];e.queryNode(e.root,n,!0,{interfaces_:function(){return[ks]},visit:function(t){i.add(t)}})}();else if(arguments[0]instanceof C&&R(arguments[1],ks)){var r=arguments[0],s=arguments[1];this.queryNode(this.root,r,!0,s)}},queryNode:function(t,e,n,i){if(null===t)return null;var r=null,s=null,o=null;n?(r=e.getMinX(),s=e.getMaxX(),o=t.getX()):(r=e.getMinY(),s=e.getMaxY(),o=t.getY());var a=o>r,u=s>=o;a&&this.queryNode(t.getLeft(),e,!n,i),e.contains(t.getCoordinate())&&i.visit(t),u&&this.queryNode(t.getRight(),e,!n,i)},findBestMatchNode:function(t){var e=new Xs(t,this.tolerance);return this.query(e.queryEnvelope(),e),e.getNode()},isEmpty:function(){return null===this.root},insertExact:function(t,e){for(var n=this.root,i=this.root,r=!0,s=!0;null!==n;){if(null!==n){var o=t.distance(n.getCoordinate())<=this.tolerance;if(o)return n.increment(),n}s=r?t.x<n.getX():t.y<n.getY(),i=n,n=s?n.getLeft():n.getRight(),r=!r}this.numberOfNodes=this.numberOfNodes+1;var a=new Ys(t,e);return s?i.setLeft(a):i.setRight(a),a},interfaces_:function(){return[]},getClass:function(){return Us}}),Us.toCoordinates=function(){if(1===arguments.length){var t=arguments[0];return Us.toCoordinates(t,!1)}if(2===arguments.length){for(var e=arguments[0],n=arguments[1],i=new N,r=e.iterator();r.hasNext();)for(var s=r.next(),o=n?s.getCount():1,a=0;o>a;a++)i.add(s.getCoordinate(),!0);return i.toCoordinateArray()}},e(Xs.prototype,{visit:function(t){var e=this.p.distance(t.getCoordinate()),n=e<=this.tolerance;if(!n)return null;var i=!1;(null===this.matchNode||e<this.matchDist||null!==this.matchNode&&e===this.matchDist&&t.getCoordinate().compareTo(this.matchNode.getCoordinate())<1)&&(i=!0),i&&(this.matchNode=t,this.matchDist=e)},queryEnvelope:function(){var t=new C(this.p);return t.expandBy(this.tolerance),t},getNode:function(){return this.matchNode},interfaces_:function(){return[ks]},getClass:function(){return Xs}}),Us.BestMatchVisitor=Xs,e(Hs.prototype,{getInitialVertices:function(){return this.initialVertices},getKDT:function(){return this.kdt},enforceConstraints:function(){this.addConstraintVertices();var t=0,e=0;do e=this.enforceGabriel(this.segments),t++;while(e>0&&t<Hs.MAX_SPLIT_ITER)},insertSites:function(t){for(var e=t.iterator();e.hasNext();){var n=e.next();this.insertSite(n)}},getVertexFactory:function(){return this.vertexFactory},getPointArray:function(){for(var t=new Array(this.initialVertices.size()+this.segVertices.size()).fill(null),e=0,n=this.initialVertices.iterator();n.hasNext();){var i=n.next();t[e++]=i.getCoordinate()}for(var r=this.segVertices.iterator();r.hasNext();){var i=r.next();t[e++]=i.getCoordinate()}return t},setConstraints:function(t,e){this.segments=t,this.segVertices=e},computeConvexHull:function(){var t=new ie,e=this.getPointArray(),n=new me(e,t);this.convexHull=n.getConvexHull()},addConstraintVertices:function(){this.computeConvexHull(),this.insertSites(this.segVertices)},findNonGabrielPoint:function(t){var e=t.getStart(),n=t.getEnd(),i=new g((e.x+n.x)/2,(e.y+n.y)/2),s=e.distance(i),o=new C(i);o.expandBy(s);for(var a=this.kdt.query(o),u=null,l=r.MAX_VALUE,h=a.iterator();h.hasNext();){var c=h.next(),f=c.getCoordinate();if(!f.equals2D(e)&&!f.equals2D(n)){var d=i.distance(f);if(s>d){var p=d;(null===u||l>p)&&(u=f,l=p)}}}return u},getConstraintSegments:function(){return this.segments},setSplitPointFinder:function(t){this.splitFinder=t},getConvexHull:function(){return this.convexHull},getTolerance:function(){return this.tolerance},enforceGabriel:function(t){for(var e=new I,n=0,i=new I,r=t.iterator();r.hasNext();){var s=r.next(),o=this.findNonGabrielPoint(s);if(null!==o){this.splitPt=this.splitFinder.findSplitPoint(s,o);var a=this.createVertex(this.splitPt,s),u=(this.insertSite(a),new Vs(s.getStartX(),s.getStartY(),s.getStartZ(),a.getX(),a.getY(),a.getZ(),s.getData())),l=new Vs(a.getX(),a.getY(),a.getZ(),s.getEndX(),s.getEndY(),s.getEndZ(),s.getData());e.add(u),e.add(l),i.add(s),n+=1}}return t.removeAll(i),t.addAll(e),n},createVertex:function(){if(1===arguments.length){var t=arguments[0],e=null;return e=null!==this.vertexFactory?this.vertexFactory.createVertex(t,null):new Ps(t)}if(2===arguments.length){var n=arguments[0],i=arguments[1],e=null;return e=null!==this.vertexFactory?this.vertexFactory.createVertex(n,i):new Ps(n),e.setOnConstraint(!0),e}},getSubdivision:function(){return this.subdiv},computeBoundingBox:function(){var t=Hs.computeVertexEnvelope(this.initialVertices),e=Hs.computeVertexEnvelope(this.segVertices),n=new C(t);n.expandToInclude(e);var i=.2*n.getWidth(),r=.2*n.getHeight(),s=Math.max(i,r);this.computeAreaEnv=new C(n),this.computeAreaEnv.expandBy(s)},setVertexFactory:function(t){this.vertexFactory=t},formInitialDelaunay:function(){this.computeBoundingBox(),this.subdiv=new Fs(this.computeAreaEnv,this.tolerance),this.subdiv.setLocator(new Ms(this.subdiv)),this.incDel=new Os(this.subdiv),this.insertSites(this.initialVertices)},insertSite:function(){if(arguments[0]instanceof Ps){var t=arguments[0],e=this.kdt.insert(t.getCoordinate(),t);if(e.isRepeated()){var n=e.getData();return n.merge(t),n}return this.incDel.insertSite(t),t}if(arguments[0]instanceof g){var i=arguments[0];this.insertSite(this.createVertex(i))}},interfaces_:function(){return[]},getClass:function(){return Hs}}),Hs.computeVertexEnvelope=function(t){for(var e=new C,n=t.iterator();n.hasNext();){var i=n.next();e.expandToInclude(i.getCoordinate())}return e},Hs.MAX_SPLIT_ITER=99,e(Ws.prototype,{create:function(){if(null!==this.subdiv)return null;var t=Ws.envelope(this.siteCoords),e=Ws.toVertices(this.siteCoords);this.subdiv=new Fs(t,this.tolerance);var n=new Os(this.subdiv);n.insertSites(e)},setTolerance:function(t){this.tolerance=t},setSites:function(){if(arguments[0]instanceof B){var t=arguments[0];this.siteCoords=Ws.extractUniqueCoordinates(t)}else if(R(arguments[0],v)){var e=arguments[0];this.siteCoords=Ws.unique(H.toCoordinateArray(e))}},getEdges:function(t){return this.create(),this.subdiv.getEdges(t)},getSubdivision:function(){return this.create(),this.subdiv},getTriangles:function(t){return this.create(),this.subdiv.getTriangles(t)},interfaces_:function(){return[]},getClass:function(){return Ws}}),Ws.extractUniqueCoordinates=function(t){if(null===t)return new N;var e=t.getCoordinates();return Ws.unique(e)},Ws.envelope=function(t){for(var e=new C,n=t.iterator();n.hasNext();){var i=n.next();e.expandToInclude(i)}return e},Ws.unique=function(t){var e=H.copyDeep(t);ut.sort(e);var n=new N(e,!1);return n},Ws.toVertices=function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();e.add(new Ts(i))}return e},e(js.prototype,{createSiteVertices:function(t){for(var e=new I,n=t.iterator();n.hasNext();){var i=n.next();this.constraintVertexMap.containsKey(i)||e.add(new Ps(i))}return e},create:function(){if(null!==this.subdiv)return null;var t=Ws.envelope(this.siteCoords),e=new I;null!==this.constraintLines&&(t.expandToInclude(this.constraintLines.getEnvelopeInternal()),this.createVertices(this.constraintLines),e=js.createConstraintSegments(this.constraintLines));var n=this.createSiteVertices(this.siteCoords),i=new Hs(n,this.tolerance);i.setConstraints(e,new I(this.constraintVertexMap.values())),i.formInitialDelaunay(),i.enforceConstraints(),this.subdiv=i.getSubdivision()},setTolerance:function(t){this.tolerance=t},setConstraints:function(t){this.constraintLines=t},setSites:function(t){this.siteCoords=Ws.extractUniqueCoordinates(t)},getEdges:function(t){return this.create(),this.subdiv.getEdges(t)},getSubdivision:function(){return this.create(),this.subdiv},getTriangles:function(t){return this.create(),this.subdiv.getTriangles(t)},createVertices:function(t){for(var e=t.getCoordinates(),n=0;n<e.length;n++){var i=new Ps(e[n]);this.constraintVertexMap.put(e[n],i)}},interfaces_:function(){return[]},getClass:function(){return js}}),js.createConstraintSegments=function(){if(1===arguments.length){for(var t=arguments[0],e=kn.getLines(t),n=new I,i=e.iterator();i.hasNext();){var r=i.next();js.createConstraintSegments(r,n)}return n}if(2===arguments.length)for(var s=arguments[0],o=arguments[1],a=s.getCoordinates(),i=1;i<a.length;i++)o.add(new Vs(a[i-1],a[i]))},e(Ks.prototype,{create:function(){if(null!==this.subdiv)return null;var t=Ws.envelope(this.siteCoords);this.diagramEnv=t;var e=Math.max(this.diagramEnv.getWidth(),this.diagramEnv.getHeight());this.diagramEnv.expandBy(e),null!==this.clipEnv&&this.diagramEnv.expandToInclude(this.clipEnv);var n=Ws.toVertices(this.siteCoords);this.subdiv=new Fs(t,this.tolerance);var i=new Os(this.subdiv);i.insertSites(n)},getDiagram:function(t){this.create();var e=this.subdiv.getVoronoiDiagram(t);return Ks.clipGeometryCollection(e,this.diagramEnv)},setTolerance:function(t){this.tolerance=t},setSites:function(){if(arguments[0]instanceof B){var t=arguments[0];this.siteCoords=Ws.extractUniqueCoordinates(t)}else if(R(arguments[0],v)){var e=arguments[0];this.siteCoords=Ws.unique(H.toCoordinateArray(e))}},setClipEnvelope:function(t){this.clipEnv=t},getSubdivision:function(){return this.create(),this.subdiv},interfaces_:function(){return[]},getClass:function(){return Ks}}),Ks.clipGeometryCollection=function(t,e){for(var n=t.getFactory().toGeometry(e),i=new I,r=0;r<t.getNumGeometries();r++){var s=t.getGeometryN(r),o=null;e.contains(s.getEnvelopeInternal())?o=s:e.intersects(s.getEnvelopeInternal())&&(o=n.intersection(s),o.setUserData(s.getUserData())),null===o||o.isEmpty()||i.add(o)}return t.getFactory().createGeometryCollection(ie.toGeometryArray(i))};var Do=Object.freeze({ConformingDelaunayTriangulationBuilder:js,DelaunayTriangulationBuilder:Ws,VoronoiDiagramBuilder:Ks});e(Zs.prototype,{interfaces_:function(){return[]},getClass:function(){return Zs}}),Zs.union=function(t,e){if(t.isEmpty()||e.isEmpty()){if(t.isEmpty()&&e.isEmpty())return ii.createEmptyResult(ii.UNION,t,e,t.getFactory());if(t.isEmpty())return e.copy();if(e.isEmpty())return t.copy()}return t.checkNotGeometryCollection(t),t.checkNotGeometryCollection(e),si.overlayOp(t,e,ii.UNION)},e(B.prototype,{equalsTopo:function(t){return this.getEnvelopeInternal().equals(t.getEnvelopeInternal())?Yr.relate(this,t).isEquals(this.getDimension(),t.getDimension()):!1},union:function(){if(0===arguments.length)return jr.union(this);if(1===arguments.length){var t=arguments[0];return Zs.union(this,t)}},isValid:function(){return ls.isValid(this)},intersection:function(t){if(this.isEmpty()||t.isEmpty())return ii.createEmptyResult(ii.INTERSECTION,this,t,this.factory);if(this.isGeometryCollection()){var e=t;return hn.map(this,{interfaces_:function(){return[MapOp]},map:function(t){return t.intersection(e)}})}return this.checkNotGeometryCollection(this),this.checkNotGeometryCollection(t),si.overlayOp(this,t,ii.INTERSECTION)},covers:function(t){return Yr.covers(this,t)},coveredBy:function(t){return Yr.coveredBy(this,t)},touches:function(t){return Yr.touches(this,t)},intersects:function(t){return Yr.intersects(this,t)},within:function(t){return Yr.within(this,t)},overlaps:function(t){return Yr.overlaps(this,t)},disjoint:function(t){return Yr.disjoint(this,t)},crosses:function(t){return Yr.crosses(this,t)},buffer:function(){if(1===arguments.length){var t=arguments[0];return sr.bufferOp(this,t)}if(2===arguments.length){var e=arguments[0],n=arguments[1];return sr.bufferOp(this,e,n)}if(3===arguments.length){var i=arguments[0],r=arguments[1],s=arguments[2];return sr.bufferOp(this,i,r,s)}},convexHull:function(){return new me(this).getConvexHull()},relate:function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];return Yr.relate.apply(Yr,[this].concat(e))},getCentroid:function(){if(this.isEmpty())return this.factory.createPoint();var t=ge.getCentroid(this);return this.createPointFromInternalCoord(t,this)},getInteriorPoint:function(){if(this.isEmpty())return this.factory.createPoint();var t=null,e=this.getDimension();if(0===e){var n=new li(this);t=n.getInteriorPoint()}else if(1===e){var n=new ui(this);t=n.getInteriorPoint()}else{var n=new oi(this);t=n.getInteriorPoint()}return this.createPointFromInternalCoord(t,this)},symDifference:function(t){if(this.isEmpty()||t.isEmpty()){if(this.isEmpty()&&t.isEmpty())return ii.createEmptyResult(ii.SYMDIFFERENCE,this,t,this.factory);if(this.isEmpty())return t.copy();if(t.isEmpty())return this.copy()}return this.checkNotGeometryCollection(this),this.checkNotGeometryCollection(t),si.overlayOp(this,t,ii.SYMDIFFERENCE)},createPointFromInternalCoord:function(t,e){return e.getPrecisionModel().makePrecise(t),e.getFactory().createPoint(t)},toText:function(){var t=new se;return t.write(this)},toString:function(){this.toText()},contains:function(t){return Yr.contains(this,t)},difference:function(t){return this.isEmpty()?ii.createEmptyResult(ii.DIFFERENCE,this,t,this.factory):t.isEmpty()?this.copy():(this.checkNotGeometryCollection(this),this.checkNotGeometryCollection(t),si.overlayOp(this,t,ii.DIFFERENCE))},isSimple:function(){var t=new Gi(this);return t.isSimple()},isWithinDistance:function(t,e){var n=this.getEnvelopeInternal().distance(t.getEnvelopeInternal());return n>e?!1:hr.isWithinDistance(this,t,e)},distance:function(t){return hr.distance(this,t)},isEquivalentClass:function(t){return this.getClass()===t.getClass()}});var Ao="1.1.2 (248dab8)";t.version=Ao,t.algorithm=co,t.densify=fo,t.dissolve=go,t.geom=lo,t.index=mo,t.io=Io,t.noding=No,t.operation=Oo,t.precision=_o,t.simplify=Mo,t.triangulate=Do});


/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Class;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Util__ = __webpack_require__(0);


// @class Class
// @aka L.Class

// @section
// @uninheritable

// Thanks to John Resig and Dean Edwards for inspiration!

function Class() {}

Class.extend = function (props) {

	// @function extend(props: Object): Function
	// [Extends the current class](#class-inheritance) given the properties to be included.
	// Returns a Javascript function that is a class constructor (to be called with `new`).
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		this.callInitHooks();
	};

	var parentProto = NewClass.__super__ = this.prototype;

	var proto = __WEBPACK_IMPORTED_MODULE_0__Util__["n" /* create */](parentProto);
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	// inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype' && i !== '__super__') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		__WEBPACK_IMPORTED_MODULE_0__Util__["c" /* extend */](NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		checkDeprecatedMixinEvents(props.includes);
		__WEBPACK_IMPORTED_MODULE_0__Util__["c" /* extend */].apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (proto.options) {
		props.options = __WEBPACK_IMPORTED_MODULE_0__Util__["c" /* extend */](__WEBPACK_IMPORTED_MODULE_0__Util__["n" /* create */](proto.options), props.options);
	}

	// mix given properties into the prototype
	__WEBPACK_IMPORTED_MODULE_0__Util__["c" /* extend */](proto, props);

	proto._initHooks = [];

	// add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parentProto.callInitHooks) {
			parentProto.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
};


// @function include(properties: Object): this
// [Includes a mixin](#class-includes) into the current class.
Class.include = function (props) {
	__WEBPACK_IMPORTED_MODULE_0__Util__["c" /* extend */](this.prototype, props);
	return this;
};

// @function mergeOptions(options: Object): this
// [Merges `options`](#class-options) into the defaults of the class.
Class.mergeOptions = function (options) {
	__WEBPACK_IMPORTED_MODULE_0__Util__["c" /* extend */](this.prototype.options, options);
	return this;
};

// @function addInitHook(fn: Function): this
// Adds a [constructor hook](#class-constructor-hooks) to the class.
Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
	return this;
};

function checkDeprecatedMixinEvents(includes) {
	if (typeof L === 'undefined' || !L || !L.Mixin) { return; }

	includes = __WEBPACK_IMPORTED_MODULE_0__Util__["b" /* isArray */](includes) ? includes : [includes];

	for (var i = 0; i < includes.length; i++) {
		if (includes[i] === L.Mixin.Events) {
			console.warn('Deprecated include of L.Mixin.Events: ' +
				'this property will be removed in future releases, ' +
				'please inherit from L.Evented instead.', new Error().stack);
		}
	}
}


/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addDoubleTapListener;
/* harmony export (immutable) */ __webpack_exports__["b"] = removeDoubleTapListener;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DomEvent_Pointer__ = __webpack_require__(74);



/*
 * Extends the event handling code with double tap support for mobile browsers.
 */

var _touchstart = __WEBPACK_IMPORTED_MODULE_0__core_Browser__["o" /* msPointer */] ? 'MSPointerDown' : __WEBPACK_IMPORTED_MODULE_0__core_Browser__["i" /* pointer */] ? 'pointerdown' : 'touchstart';
var _touchend = __WEBPACK_IMPORTED_MODULE_0__core_Browser__["o" /* msPointer */] ? 'MSPointerUp' : __WEBPACK_IMPORTED_MODULE_0__core_Browser__["i" /* pointer */] ? 'pointerup' : 'touchend';
var _pre = '_leaflet_';

// inspired by Zepto touch code by Thomas Fuchs
function addDoubleTapListener(obj, handler, id) {
	var last, touch,
	    doubleTap = false,
	    delay = 250;

	function onTouchStart(e) {
		var count;

		if (__WEBPACK_IMPORTED_MODULE_0__core_Browser__["i" /* pointer */]) {
			if ((!__WEBPACK_IMPORTED_MODULE_0__core_Browser__["n" /* edge */]) || e.pointerType === 'mouse') { return; }
			count = __WEBPACK_IMPORTED_MODULE_1__DomEvent_Pointer__["c" /* _pointersCount */];
		} else {
			count = e.touches.length;
		}

		if (count > 1) { return; }

		var now = Date.now(),
		    delta = now - (last || now);

		touch = e.touches ? e.touches[0] : e;
		doubleTap = (delta > 0 && delta <= delay);
		last = now;
	}

	function onTouchEnd(e) {
		if (doubleTap && !touch.cancelBubble) {
			if (__WEBPACK_IMPORTED_MODULE_0__core_Browser__["i" /* pointer */]) {
				if ((!__WEBPACK_IMPORTED_MODULE_0__core_Browser__["n" /* edge */]) || e.pointerType === 'mouse') { return; }
				// work around .type being readonly with MSPointer* events
				var newTouch = {},
				    prop, i;

				for (i in touch) {
					prop = touch[i];
					newTouch[i] = prop && prop.bind ? prop.bind(touch) : prop;
				}
				touch = newTouch;
			}
			touch.type = 'dblclick';
			handler(touch);
			last = null;
		}
	}

	obj[_pre + _touchstart + id] = onTouchStart;
	obj[_pre + _touchend + id] = onTouchEnd;
	obj[_pre + 'dblclick' + id] = handler;

	obj.addEventListener(_touchstart, onTouchStart, false);
	obj.addEventListener(_touchend, onTouchEnd, false);

	// On some platforms (notably, chrome<55 on win10 + touchscreen + mouse),
	// the browser doesn't fire touchend/pointerup events but does fire
	// native dblclicks. See #4127.
	// Edge 14 also fires native dblclicks, but only for pointerType mouse, see #5180.
	obj.addEventListener('dblclick', handler, false);

	return this;
}

function removeDoubleTapListener(obj, id) {
	var touchstart = obj[_pre + _touchstart + id],
	    touchend = obj[_pre + _touchend + id],
	    dblclick = obj[_pre + 'dblclick' + id];

	obj.removeEventListener(_touchstart, touchstart, false);
	obj.removeEventListener(_touchend, touchend, false);
	if (!__WEBPACK_IMPORTED_MODULE_0__core_Browser__["n" /* edge */]) {
		obj.removeEventListener('dblclick', dblclick, false);
	}

	return this;
}


/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PosAnimation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Events__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_DomUtil__ = __webpack_require__(75);





/*
 * @class PosAnimation
 * @aka L.PosAnimation
 * @inherits Evented
 * Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.
 *
 * @example
 * ```js
 * var fx = new L.PosAnimation();
 * fx.run(el, [300, 500], 0.5);
 * ```
 *
 * @constructor L.PosAnimation()
 * Creates a `PosAnimation` object.
 *
 */

var PosAnimation = __WEBPACK_IMPORTED_MODULE_1__core_Events__["a" /* Evented */].extend({

	// @method run(el: HTMLElement, newPos: Point, duration?: Number, easeLinearity?: Number)
	// Run an animation of a given element to a new position, optionally setting
	// duration in seconds (`0.25` by default) and easing linearity factor (3rd
	// argument of the [cubic bezier curve](http://cubic-bezier.com/#0,0,.5,1),
	// `0.5` by default).
	run: function (el, newPos, duration, easeLinearity) {
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = __WEBPACK_IMPORTED_MODULE_2__dom_DomUtil__["j" /* getPosition */](el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		// @event start: Event
		// Fired when the animation starts
		this.fire('start');

		this._animate();
	},

	// @method stop()
	// Stops the animation (if currently running).
	stop: function () {
		if (!this._inProgress) { return; }

		this._step(true);
		this._complete();
	},

	_animate: function () {
		// animation loop
		this._animId = __WEBPACK_IMPORTED_MODULE_0__core_Util__["h" /* requestAnimFrame */](this._animate, this);
		this._step();
	},

	_step: function (round) {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration), round);
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (progress, round) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		if (round) {
			pos._round();
		}
		__WEBPACK_IMPORTED_MODULE_2__dom_DomUtil__["h" /* setPosition */](this._el, pos);

		// @event step: Event
		// Fired continuously during the animation.
		this.fire('step');
	},

	_complete: function () {
		__WEBPACK_IMPORTED_MODULE_0__core_Util__["i" /* cancelAnimFrame */](this._animId);

		this._inProgress = false;
		// @event end: Event
		// Fired when the animation ends.
		this.fire('end');
	},

	_easeOut: function (t) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
});


/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EPSG3857; });
/* unused harmony export EPSG900913 */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CRS_Earth__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__projection_Projection_SphericalMercator__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geometry_Transformation__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_Util__ = __webpack_require__(0);





/*
 * @namespace CRS
 * @crs L.CRS.EPSG3857
 *
 * The most common CRS for online maps, used by almost all free and commercial
 * tile providers. Uses Spherical Mercator projection. Set in by default in
 * Map's `crs` option.
 */

var EPSG3857 = __WEBPACK_IMPORTED_MODULE_3__core_Util__["c" /* extend */]({}, __WEBPACK_IMPORTED_MODULE_0__CRS_Earth__["a" /* Earth */], {
	code: 'EPSG:3857',
	projection: __WEBPACK_IMPORTED_MODULE_1__projection_Projection_SphericalMercator__["a" /* SphericalMercator */],

	transformation: (function () {
		var scale = 0.5 / (Math.PI * __WEBPACK_IMPORTED_MODULE_1__projection_Projection_SphericalMercator__["a" /* SphericalMercator */].R);
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__geometry_Transformation__["a" /* toTransformation */])(scale, 0.5, -scale, 0.5);
	}())
});

var EPSG900913 = __WEBPACK_IMPORTED_MODULE_3__core_Util__["c" /* extend */]({}, EPSG3857, {
	code: 'EPSG:900913'
});


/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CRS; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometry_Bounds__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LatLng__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LatLngBounds__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_Util__ = __webpack_require__(0);






/*
 * @namespace CRS
 * @crs L.CRS.Base
 * Object that defines coordinate reference systems for projecting
 * geographical points into pixel (screen) coordinates and back (and to
 * coordinates in other units for [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services). See
 * [spatial reference system](http://en.wikipedia.org/wiki/Coordinate_reference_system).
 *
 * Leaflet defines the most usual CRSs by default. If you want to use a
 * CRS not defined by default, take a look at the
 * [Proj4Leaflet](https://github.com/kartena/Proj4Leaflet) plugin.
 *
 * Note that the CRS instances do not inherit from Leafet's `Class` object,
 * and can't be instantiated. Also, new classes can't inherit from them,
 * and methods can't be added to them with the `include` function.
 */

var CRS = {
	// @method latLngToPoint(latlng: LatLng, zoom: Number): Point
	// Projects geographical coordinates into pixel coordinates for a given zoom.
	latLngToPoint: function (latlng, zoom) {
		var projectedPoint = this.projection.project(latlng),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	// @method pointToLatLng(point: Point, zoom: Number): LatLng
	// The inverse of `latLngToPoint`. Projects pixel coordinates on a given
	// zoom into geographical coordinates.
	pointToLatLng: function (point, zoom) {
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	// @method project(latlng: LatLng): Point
	// Projects geographical coordinates into coordinates in units accepted for
	// this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).
	project: function (latlng) {
		return this.projection.project(latlng);
	},

	// @method unproject(point: Point): LatLng
	// Given a projected coordinate returns the corresponding LatLng.
	// The inverse of `project`.
	unproject: function (point) {
		return this.projection.unproject(point);
	},

	// @method scale(zoom: Number): Number
	// Returns the scale used when transforming projected coordinates into
	// pixel coordinates for a particular zoom. For example, it returns
	// `256 * 2^zoom` for Mercator-based CRS.
	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	},

	// @method zoom(scale: Number): Number
	// Inverse of `scale()`, returns the zoom level corresponding to a scale
	// factor of `scale`.
	zoom: function (scale) {
		return Math.log(scale / 256) / Math.LN2;
	},

	// @method getProjectedBounds(zoom: Number): Bounds
	// Returns the projection's bounds scaled and transformed for the provided `zoom`.
	getProjectedBounds: function (zoom) {
		if (this.infinite) { return null; }

		var b = this.projection.bounds,
		    s = this.scale(zoom),
		    min = this.transformation.transform(b.min, s),
		    max = this.transformation.transform(b.max, s);

		return new __WEBPACK_IMPORTED_MODULE_0__geometry_Bounds__["a" /* Bounds */](min, max);
	},

	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	// Returns the distance between two geographical coordinates.

	// @property code: String
	// Standard code name of the CRS passed into WMS services (e.g. `'EPSG:3857'`)
	//
	// @property wrapLng: Number[]
	// An array of two numbers defining whether the longitude (horizontal) coordinate
	// axis wraps around a given range and how. Defaults to `[-180, 180]` in most
	// geographical CRSs. If `undefined`, the longitude axis does not wrap around.
	//
	// @property wrapLat: Number[]
	// Like `wrapLng`, but for the latitude (vertical) axis.

	// wrapLng: [min, max],
	// wrapLat: [min, max],

	// @property infinite: Boolean
	// If true, the coordinate space will be unbounded (infinite in both axes)
	infinite: false,

	// @method wrapLatLng(latlng: LatLng): LatLng
	// Returns a `LatLng` where lat and lng has been wrapped according to the
	// CRS's `wrapLat` and `wrapLng` properties, if they are outside the CRS's bounds.
	wrapLatLng: function (latlng) {
		var lng = this.wrapLng ? __WEBPACK_IMPORTED_MODULE_3__core_Util__["d" /* wrapNum */](latlng.lng, this.wrapLng, true) : latlng.lng,
		    lat = this.wrapLat ? __WEBPACK_IMPORTED_MODULE_3__core_Util__["d" /* wrapNum */](latlng.lat, this.wrapLat, true) : latlng.lat,
		    alt = latlng.alt;

		return new __WEBPACK_IMPORTED_MODULE_1__LatLng__["a" /* LatLng */](lat, lng, alt);
	},

	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	// Returns a `LatLngBounds` with the same size as the given one, ensuring
	// that its center is within the CRS's bounds.
	// Only accepts actual `L.LatLngBounds` instances, not arrays.
	wrapLatLngBounds: function (bounds) {
		var center = bounds.getCenter(),
		    newCenter = this.wrapLatLng(center),
		    latShift = center.lat - newCenter.lat,
		    lngShift = center.lng - newCenter.lng;

		if (latShift === 0 && lngShift === 0) {
			return bounds;
		}

		var sw = bounds.getSouthWest(),
		    ne = bounds.getNorthEast(),
		    newSw = new __WEBPACK_IMPORTED_MODULE_1__LatLng__["a" /* LatLng */](sw.lat - latShift, sw.lng - lngShift),
		    newNe = new __WEBPACK_IMPORTED_MODULE_1__LatLng__["a" /* LatLng */](ne.lat - latShift, ne.lng - lngShift);

		return new __WEBPACK_IMPORTED_MODULE_2__LatLngBounds__["a" /* LatLngBounds */](newSw, newNe);
	}
};


/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SphericalMercator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__LatLng__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geometry_Bounds__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geometry_Point__ = __webpack_require__(8);




/*
 * @namespace Projection
 * @projection L.Projection.SphericalMercator
 *
 * Spherical Mercator projection — the most common projection for online maps,
 * used by almost all free and commercial tile providers. Assumes that Earth is
 * a sphere. Used by the `EPSG:3857` CRS.
 */

var SphericalMercator = {

	R: 6378137,
	MAX_LATITUDE: 85.0511287798,

	project: function (latlng) {
		var d = Math.PI / 180,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    sin = Math.sin(lat * d);

		return new __WEBPACK_IMPORTED_MODULE_2__geometry_Point__["b" /* Point */](
			this.R * latlng.lng * d,
			this.R * Math.log((1 + sin) / (1 - sin)) / 2);
	},

	unproject: function (point) {
		var d = 180 / Math.PI;

		return new __WEBPACK_IMPORTED_MODULE_0__LatLng__["a" /* LatLng */](
			(2 * Math.atan(Math.exp(point.y / this.R)) - (Math.PI / 2)) * d,
			point.x * d / this.R);
	},

	bounds: (function () {
		var d = 6378137 * Math.PI;
		return new __WEBPACK_IMPORTED_MODULE_1__geometry_Bounds__["a" /* Bounds */]([-d, -d], [d, d]);
	})()
};


/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Transformation */
/* harmony export (immutable) */ __webpack_exports__["a"] = toTransformation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Point__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Util__ = __webpack_require__(0);



/*
 * @class Transformation
 * @aka L.Transformation
 *
 * Represents an affine transformation: a set of coefficients `a`, `b`, `c`, `d`
 * for transforming a point of a form `(x, y)` into `(a*x + b, c*y + d)` and doing
 * the reverse. Used by Leaflet in its projections code.
 *
 * @example
 *
 * ```js
 * var transformation = L.transformation(2, 5, -1, 10),
 * 	p = L.point(1, 2),
 * 	p2 = transformation.transform(p), //  L.point(7, 8)
 * 	p3 = transformation.untransform(p2); //  L.point(1, 2)
 * ```
 */


// factory new L.Transformation(a: Number, b: Number, c: Number, d: Number)
// Creates a `Transformation` object with the given coefficients.
function Transformation(a, b, c, d) {
	if (__WEBPACK_IMPORTED_MODULE_1__core_Util__["b" /* isArray */](a)) {
		// use array properties
		this._a = a[0];
		this._b = a[1];
		this._c = a[2];
		this._d = a[3];
		return;
	}
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
}

Transformation.prototype = {
	// @method transform(point: Point, scale?: Number): Point
	// Returns a transformed point, optionally multiplied by the given scale.
	// Only accepts actual `L.Point` instances, not arrays.
	transform: function (point, scale) { // (Point, Number) -> Point
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (point, scale) {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	// @method untransform(point: Point, scale?: Number): Point
	// Returns the reverse transformation of the given point, optionally divided
	// by the given scale. Only accepts actual `L.Point` instances, not arrays.
	untransform: function (point, scale) {
		scale = scale || 1;
		return new __WEBPACK_IMPORTED_MODULE_0__Point__["b" /* Point */](
		        (point.x / scale - this._b) / this._a,
		        (point.y / scale - this._d) / this._c);
	}
};

// factory L.transformation(a: Number, b: Number, c: Number, d: Number)

// @factory L.transformation(a: Number, b: Number, c: Number, d: Number)
// Instantiates a Transformation object with the given coefficients.

// @alternative
// @factory L.transformation(coefficients: Array): Transformation
// Expects an coefficients array of the form
// `[a: Number, b: Number, c: Number, d: Number]`.

function toTransformation(a, b, c, d) {
	return new Transformation(a, b, c, d);
}


/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Layer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Events__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__map_Map__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_Util__ = __webpack_require__(0);




/*
 * @class Layer
 * @inherits Evented
 * @aka L.Layer
 * @aka ILayer
 *
 * A set of methods from the Layer base class that all Leaflet layers use.
 * Inherits all methods, options and events from `L.Evented`.
 *
 * @example
 *
 * ```js
 * var layer = L.Marker(latlng).addTo(map);
 * layer.addTo(map);
 * layer.remove();
 * ```
 *
 * @event add: Event
 * Fired after the layer is added to a map
 *
 * @event remove: Event
 * Fired after the layer is removed from a map
 */


var Layer = __WEBPACK_IMPORTED_MODULE_0__core_Events__["a" /* Evented */].extend({

	// Classes extending `L.Layer` will inherit the following options:
	options: {
		// @option pane: String = 'overlayPane'
		// By default the layer will be added to the map's [overlay pane](#map-overlaypane). Overriding this option will cause the layer to be placed on another pane by default.
		pane: 'overlayPane',

		// @option attribution: String = null
		// String to be shown in the attribution control, describes the layer data, e.g. "© Mapbox".
		attribution: null,

		bubblingMouseEvents: true
	},

	/* @section
	 * Classes extending `L.Layer` will inherit the following methods:
	 *
	 * @method addTo(map: Map|LayerGroup): this
	 * Adds the layer to the given map or layer group.
	 */
	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	// @method remove: this
	// Removes the layer from the map it is currently active on.
	remove: function () {
		return this.removeFrom(this._map || this._mapToAdd);
	},

	// @method removeFrom(map: Map): this
	// Removes the layer from the given map
	removeFrom: function (obj) {
		if (obj) {
			obj.removeLayer(this);
		}
		return this;
	},

	// @method getPane(name? : String): HTMLElement
	// Returns the `HTMLElement` representing the named pane on the map. If `name` is omitted, returns the pane for this layer.
	getPane: function (name) {
		return this._map.getPane(name ? (this.options[name] || name) : this.options.pane);
	},

	addInteractiveTarget: function (targetEl) {
		this._map._targets[__WEBPACK_IMPORTED_MODULE_2__core_Util__["f" /* stamp */](targetEl)] = this;
		return this;
	},

	removeInteractiveTarget: function (targetEl) {
		delete this._map._targets[__WEBPACK_IMPORTED_MODULE_2__core_Util__["f" /* stamp */](targetEl)];
		return this;
	},

	// @method getAttribution: String
	// Used by the `attribution control`, returns the [attribution option](#gridlayer-attribution).
	getAttribution: function () {
		return this.options.attribution;
	},

	_layerAdd: function (e) {
		var map = e.target;

		// check in case layer gets added and then removed before the map is ready
		if (!map.hasLayer(this)) { return; }

		this._map = map;
		this._zoomAnimated = map._zoomAnimated;

		if (this.getEvents) {
			var events = this.getEvents();
			map.on(events, this);
			this.once('remove', function () {
				map.off(events, this);
			}, this);
		}

		this.onAdd(map);

		if (this.getAttribution && map.attributionControl) {
			map.attributionControl.addAttribution(this.getAttribution());
		}

		this.fire('add');
		map.fire('layeradd', {layer: this});
	}
});

/* @section Extension methods
 * @uninheritable
 *
 * Every layer should extend from `L.Layer` and (re-)implement the following methods.
 *
 * @method onAdd(map: Map): this
 * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
 *
 * @method onRemove(map: Map): this
 * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
 *
 * @method getEvents(): Object
 * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
 *
 * @method getAttribution(): String
 * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
 *
 * @method beforeAdd(map: Map): this
 * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
 */


/* @namespace Map
 * @section Layer events
 *
 * @event layeradd: LayerEvent
 * Fired when a new layer is added to the map.
 *
 * @event layerremove: LayerEvent
 * Fired when some layer is removed from the map
 *
 * @section Methods for Layers and Controls
 */
__WEBPACK_IMPORTED_MODULE_1__map_Map__["a" /* Map */].include({
	// @method addLayer(layer: Layer): this
	// Adds the given layer to the map
	addLayer: function (layer) {
		if (!layer._layerAdd) {
			throw new Error('The provided object is not a Layer.');
		}

		var id = __WEBPACK_IMPORTED_MODULE_2__core_Util__["f" /* stamp */](layer);
		if (this._layers[id]) { return this; }
		this._layers[id] = layer;

		layer._mapToAdd = this;

		if (layer.beforeAdd) {
			layer.beforeAdd(this);
		}

		this.whenReady(layer._layerAdd, layer);

		return this;
	},

	// @method removeLayer(layer: Layer): this
	// Removes the given layer from the map.
	removeLayer: function (layer) {
		var id = __WEBPACK_IMPORTED_MODULE_2__core_Util__["f" /* stamp */](layer);

		if (!this._layers[id]) { return this; }

		if (this._loaded) {
			layer.onRemove(this);
		}

		if (layer.getAttribution && this.attributionControl) {
			this.attributionControl.removeAttribution(layer.getAttribution());
		}

		delete this._layers[id];

		if (this._loaded) {
			this.fire('layerremove', {layer: layer});
			layer.fire('remove');
		}

		layer._map = layer._mapToAdd = null;

		return this;
	},

	// @method hasLayer(layer: Layer): Boolean
	// Returns `true` if the given layer is currently added to the map
	hasLayer: function (layer) {
		return !!layer && (__WEBPACK_IMPORTED_MODULE_2__core_Util__["f" /* stamp */](layer) in this._layers);
	},

	/* @method eachLayer(fn: Function, context?: Object): this
	 * Iterates over the layers of the map, optionally specifying context of the iterator function.
	 * ```
	 * map.eachLayer(function(layer){
	 *     layer.bindPopup('Hello');
	 * });
	 * ```
	 */
	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	_addLayers: function (layers) {
		layers = layers ? (__WEBPACK_IMPORTED_MODULE_2__core_Util__["b" /* isArray */](layers) ? layers : [layers]) : [];

		for (var i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},

	_addZoomLimit: function (layer) {
		if (isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom)) {
			this._zoomBoundLayers[__WEBPACK_IMPORTED_MODULE_2__core_Util__["f" /* stamp */](layer)] = layer;
			this._updateZoomLevels();
		}
	},

	_removeZoomLimit: function (layer) {
		var id = __WEBPACK_IMPORTED_MODULE_2__core_Util__["f" /* stamp */](layer);

		if (this._zoomBoundLayers[id]) {
			delete this._zoomBoundLayers[id];
			this._updateZoomLevels();
		}
	},

	_updateZoomLevels: function () {
		var minZoom = Infinity,
		    maxZoom = -Infinity,
		    oldZoomSpan = this._getZoomSpan();

		for (var i in this._zoomBoundLayers) {
			var options = this._zoomBoundLayers[i].options;

			minZoom = options.minZoom === undefined ? minZoom : Math.min(minZoom, options.minZoom);
			maxZoom = options.maxZoom === undefined ? maxZoom : Math.max(maxZoom, options.maxZoom);
		}

		this._layersMaxZoom = maxZoom === -Infinity ? undefined : maxZoom;
		this._layersMinZoom = minZoom === Infinity ? undefined : minZoom;

		// @section Map state change events
		// @event zoomlevelschange: Event
		// Fired when the number of zoomlevels on the map is changed due
		// to adding or removing a layer.
		if (oldZoomSpan !== this._getZoomSpan()) {
			this.fire('zoomlevelschange');
		}

		if (this.options.maxZoom === undefined && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom) {
			this.setZoom(this._layersMaxZoom);
		}
		if (this.options.minZoom === undefined && this._layersMinZoom && this.getZoom() < this._layersMinZoom) {
			this.setZoom(this._layersMinZoom);
		}
	}
});


/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LayerGroup; });
/* unused harmony export layerGroup */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Layer__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Util__ = __webpack_require__(0);




/*
 * @class LayerGroup
 * @aka L.LayerGroup
 * @inherits Layer
 *
 * Used to group several layers and handle them as one. If you add it to the map,
 * any layers added or removed from the group will be added/removed on the map as
 * well. Extends `Layer`.
 *
 * @example
 *
 * ```js
 * L.layerGroup([marker1, marker2])
 * 	.addLayer(polyline)
 * 	.addTo(map);
 * ```
 */

var LayerGroup = __WEBPACK_IMPORTED_MODULE_0__Layer__["a" /* Layer */].extend({

	initialize: function (layers, options) {
		__WEBPACK_IMPORTED_MODULE_1__core_Util__["e" /* setOptions */](this, options);

		this._layers = {};

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	// @method addLayer(layer: Layer): this
	// Adds the given layer to the group.
	addLayer: function (layer) {
		var id = this.getLayerId(layer);

		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}

		return this;
	},

	// @method removeLayer(layer: Layer): this
	// Removes the given layer from the group.
	// @alternative
	// @method removeLayer(id: Number): this
	// Removes the layer with the given internal ID from the group.
	removeLayer: function (layer) {
		var id = layer in this._layers ? layer : this.getLayerId(layer);

		if (this._map && this._layers[id]) {
			this._map.removeLayer(this._layers[id]);
		}

		delete this._layers[id];

		return this;
	},

	// @method hasLayer(layer: Layer): Boolean
	// Returns `true` if the given layer is currently added to the group.
	// @alternative
	// @method hasLayer(id: Number): Boolean
	// Returns `true` if the given internal ID is currently added to the group.
	hasLayer: function (layer) {
		return !!layer && (layer in this._layers || this.getLayerId(layer) in this._layers);
	},

	// @method clearLayers(): this
	// Removes all the layers from the group.
	clearLayers: function () {
		return this.eachLayer(this.removeLayer, this);
	},

	// @method invoke(methodName: String, …): this
	// Calls `methodName` on every layer contained in this group, passing any
	// additional parameters. Has no effect if the layers contained do not
	// implement `methodName`.
	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
		    i, layer;

		for (i in this._layers) {
			layer = this._layers[i];

			if (layer[methodName]) {
				layer[methodName].apply(layer, args);
			}
		}

		return this;
	},

	onAdd: function (map) {
		this.eachLayer(map.addLayer, map);
	},

	onRemove: function (map) {
		this.eachLayer(map.removeLayer, map);
	},

	// @method eachLayer(fn: Function, context?: Object): this
	// Iterates over the layers of the group, optionally specifying context of the iterator function.
	// ```js
	// group.eachLayer(function (layer) {
	// 	layer.bindPopup('Hello');
	// });
	// ```
	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	// @method getLayer(id: Number): Layer
	// Returns the layer with the given internal ID.
	getLayer: function (id) {
		return this._layers[id];
	},

	// @method getLayers(): Layer[]
	// Returns an array of all the layers added to the group.
	getLayers: function () {
		var layers = [];
		this.eachLayer(layers.push, layers);
		return layers;
	},

	// @method setZIndex(zIndex: Number): this
	// Calls `setZIndex` on every layer contained in this group, passing the z-index.
	setZIndex: function (zIndex) {
		return this.invoke('setZIndex', zIndex);
	},

	// @method getLayerId(layer: Layer): Number
	// Returns the internal ID for a layer
	getLayerId: function (layer) {
		return __WEBPACK_IMPORTED_MODULE_1__core_Util__["f" /* stamp */](layer);
	}
});


// @factory L.layerGroup(layers?: Layer[], options?: Object)
// Create a layer group, optionally given an initial set of layers and an `options` object.
var layerGroup = function (layers, options) {
	return new LayerGroup(layers, options);
};


/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = svgCreate;
/* unused harmony export pointsToPath */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Browser__ = __webpack_require__(7);


// @namespace SVG; @section
// There are several static functions which can be called without instantiating L.SVG:

// @function create(name: String): SVGElement
// Returns a instance of [SVGElement](https://developer.mozilla.org/docs/Web/API/SVGElement),
// corresponding to the class name passed. For example, using 'line' will return
// an instance of [SVGLineElement](https://developer.mozilla.org/docs/Web/API/SVGLineElement).
function svgCreate(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

// @function pointsToPath(rings: Point[], closed: Boolean): String
// Generates a SVG path string for multiple rings, with each ring turning
// into "M..L..L.." instructions
function pointsToPath(rings, closed) {
	var str = '',
	i, j, len, len2, points, p;

	for (i = 0, len = rings.length; i < len; i++) {
		points = rings[i];

		for (j = 0, len2 = points.length; j < len2; j++) {
			p = points[j];
			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
		}

		// closes the ring for polygons; "x" is VML syntax
		str += closed ? (__WEBPACK_IMPORTED_MODULE_0__core_Browser__["h" /* svg */] ? 'z' : 'x') : '';
	}

	// SVG complains about empty path strings
	return str || 'M0 0';
}






/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Map; });
/* unused harmony export createMap */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_Util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_Events__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geo_crs_CRS_EPSG3857__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geometry_Point__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__geometry_Bounds__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__geo_LatLng__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__geo_LatLngBounds__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_Browser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dom_PosAnimation__ = __webpack_require__(192);












/*
 * @class Map
 * @aka L.Map
 * @inherits Evented
 *
 * The central class of the API — it is used to create a map on a page and manipulate it.
 *
 * @example
 *
 * ```js
 * // initialize the map on the "map" div with a given center and zoom
 * var map = L.map('map', {
 * 	center: [51.505, -0.09],
 * 	zoom: 13
 * });
 * ```
 *
 */

var Map = __WEBPACK_IMPORTED_MODULE_1__core_Events__["a" /* Evented */].extend({

	options: {
		// @section Map State Options
		// @option crs: CRS = L.CRS.EPSG3857
		// The [Coordinate Reference System](#crs) to use. Don't change this if you're not
		// sure what it means.
		crs: __WEBPACK_IMPORTED_MODULE_2__geo_crs_CRS_EPSG3857__["a" /* EPSG3857 */],

		// @option center: LatLng = undefined
		// Initial geographic center of the map
		center: undefined,

		// @option zoom: Number = undefined
		// Initial map zoom level
		zoom: undefined,

		// @option minZoom: Number = *
		// Minimum zoom level of the map.
		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
		// the lowest of their `minZoom` options will be used instead.
		minZoom: undefined,

		// @option maxZoom: Number = *
		// Maximum zoom level of the map.
		// If not specified and at least one `GridLayer` or `TileLayer` is in the map,
		// the highest of their `maxZoom` options will be used instead.
		maxZoom: undefined,

		// @option layers: Layer[] = []
		// Array of layers that will be added to the map initially
		layers: [],

		// @option maxBounds: LatLngBounds = null
		// When this option is set, the map restricts the view to the given
		// geographical bounds, bouncing the user back if the user tries to pan
		// outside the view. To set the restriction dynamically, use
		// [`setMaxBounds`](#map-setmaxbounds) method.
		maxBounds: undefined,

		// @option renderer: Renderer = *
		// The default method for drawing vector layers on the map. `L.SVG`
		// or `L.Canvas` by default depending on browser support.
		renderer: undefined,


		// @section Animation Options
		// @option zoomAnimation: Boolean = true
		// Whether the map zoom animation is enabled. By default it's enabled
		// in all browsers that support CSS3 Transitions except Android.
		zoomAnimation: true,

		// @option zoomAnimationThreshold: Number = 4
		// Won't animate zoom if the zoom difference exceeds this value.
		zoomAnimationThreshold: 4,

		// @option fadeAnimation: Boolean = true
		// Whether the tile fade animation is enabled. By default it's enabled
		// in all browsers that support CSS3 Transitions except Android.
		fadeAnimation: true,

		// @option markerZoomAnimation: Boolean = true
		// Whether markers animate their zoom with the zoom animation, if disabled
		// they will disappear for the length of the animation. By default it's
		// enabled in all browsers that support CSS3 Transitions except Android.
		markerZoomAnimation: true,

		// @option transform3DLimit: Number = 2^23
		// Defines the maximum size of a CSS translation transform. The default
		// value should not be changed unless a web browser positions layers in
		// the wrong place after doing a large `panBy`.
		transform3DLimit: 8388608, // Precision limit of a 32-bit float

		// @section Interaction Options
		// @option zoomSnap: Number = 1
		// Forces the map's zoom level to always be a multiple of this, particularly
		// right after a [`fitBounds()`](#map-fitbounds) or a pinch-zoom.
		// By default, the zoom level snaps to the nearest integer; lower values
		// (e.g. `0.5` or `0.1`) allow for greater granularity. A value of `0`
		// means the zoom level will not be snapped after `fitBounds` or a pinch-zoom.
		zoomSnap: 1,

		// @option zoomDelta: Number = 1
		// Controls how much the map's zoom level will change after a
		// [`zoomIn()`](#map-zoomin), [`zoomOut()`](#map-zoomout), pressing `+`
		// or `-` on the keyboard, or using the [zoom controls](#control-zoom).
		// Values smaller than `1` (e.g. `0.5`) allow for greater granularity.
		zoomDelta: 1,

		// @option trackResize: Boolean = true
		// Whether the map automatically handles browser window resize to update itself.
		trackResize: true
	},

	initialize: function (id, options) { // (HTMLElement or String, Object)
		options = __WEBPACK_IMPORTED_MODULE_0__core_Util__["e" /* setOptions */](this, options);

		this._initContainer(id);
		this._initLayout();

		// hack for https://github.com/Leaflet/Leaflet/issues/1980
		this._onResize = __WEBPACK_IMPORTED_MODULE_0__core_Util__["g" /* bind */](this._onResize, this);

		this._initEvents();

		if (options.maxBounds) {
			this.setMaxBounds(options.maxBounds);
		}

		if (options.zoom !== undefined) {
			this._zoom = this._limitZoom(options.zoom);
		}

		if (options.center && options.zoom !== undefined) {
			this.setView(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(options.center), options.zoom, {reset: true});
		}

		this._handlers = [];
		this._layers = {};
		this._zoomBoundLayers = {};
		this._sizeChanged = true;

		this.callInitHooks();

		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
		this._zoomAnimated = __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["a" /* TRANSITION */] && __WEBPACK_IMPORTED_MODULE_7__core_Browser__["a" /* any3d */] && !__WEBPACK_IMPORTED_MODULE_7__core_Browser__["b" /* mobileOpera */] &&
				this.options.zoomAnimation;

		// zoom transitions run with the same duration for all layers, so if one of transitionend events
		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
		if (this._zoomAnimated) {
			this._createAnimProxy();
			__WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["a" /* on */](this._proxy, __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["b" /* TRANSITION_END */], this._catchTransitionEnd, this);
		}

		this._addLayers(this.options.layers);
	},


	// @section Methods for modifying map state

	// @method setView(center: LatLng, zoom: Number, options?: Zoom/pan options): this
	// Sets the view of the map (geographical center and zoom) with the given
	// animation options.
	setView: function (center, zoom, options) {

		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
		center = this._limitCenter(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(center), zoom, this.options.maxBounds);
		options = options || {};

		this._stop();

		if (this._loaded && !options.reset && options !== true) {

			if (options.animate !== undefined) {
				options.zoom = __WEBPACK_IMPORTED_MODULE_0__core_Util__["c" /* extend */]({animate: options.animate}, options.zoom);
				options.pan = __WEBPACK_IMPORTED_MODULE_0__core_Util__["c" /* extend */]({animate: options.animate, duration: options.duration}, options.pan);
			}

			// try animating pan or zoom
			var moved = (this._zoom !== zoom) ?
				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
				this._tryAnimatedPan(center, options.pan);

			if (moved) {
				// prevent resize handler call, the view will refresh after animation anyway
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// animation didn't start, just reset the map view
		this._resetView(center, zoom);

		return this;
	},

	// @method setZoom(zoom: Number, options?: Zoom/pan options): this
	// Sets the zoom of the map.
	setZoom: function (zoom, options) {
		if (!this._loaded) {
			this._zoom = zoom;
			return this;
		}
		return this.setView(this.getCenter(), zoom, {zoom: options});
	},

	// @method zoomIn(delta?: Number, options?: Zoom options): this
	// Increases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
	zoomIn: function (delta, options) {
		delta = delta || (__WEBPACK_IMPORTED_MODULE_7__core_Browser__["a" /* any3d */] ? this.options.zoomDelta : 1);
		return this.setZoom(this._zoom + delta, options);
	},

	// @method zoomOut(delta?: Number, options?: Zoom options): this
	// Decreases the zoom of the map by `delta` ([`zoomDelta`](#map-zoomdelta) by default).
	zoomOut: function (delta, options) {
		delta = delta || (__WEBPACK_IMPORTED_MODULE_7__core_Browser__["a" /* any3d */] ? this.options.zoomDelta : 1);
		return this.setZoom(this._zoom - delta, options);
	},

	// @method setZoomAround(latlng: LatLng, zoom: Number, options: Zoom options): this
	// Zooms the map while keeping a specified geographical point on the map
	// stationary (e.g. used internally for scroll zoom and double-click zoom).
	// @alternative
	// @method setZoomAround(offset: Point, zoom: Number, options: Zoom options): this
	// Zooms the map while keeping a specified pixel on the map (relative to the top-left corner) stationary.
	setZoomAround: function (latlng, zoom, options) {
		var scale = this.getZoomScale(zoom),
		    viewHalf = this.getSize().divideBy(2),
		    containerPoint = latlng instanceof __WEBPACK_IMPORTED_MODULE_3__geometry_Point__["b" /* Point */] ? latlng : this.latLngToContainerPoint(latlng),

		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

		return this.setView(newCenter, zoom, {zoom: options});
	},

	_getBoundsCenterZoom: function (bounds, options) {

		options = options || {};
		bounds = bounds.getBounds ? bounds.getBounds() : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__geo_LatLngBounds__["b" /* toLatLngBounds */])(bounds);

		var paddingTL = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(options.paddingTopLeft || options.padding || [0, 0]),
		    paddingBR = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(options.paddingBottomRight || options.padding || [0, 0]),

		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

		zoom = (typeof options.maxZoom === 'number') ? Math.min(options.maxZoom, zoom) : zoom;

		if (zoom === Infinity) {
			return {
				center: bounds.getCenter(),
				zoom: zoom
			};
		}

		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

		    swPoint = this.project(bounds.getSouthWest(), zoom),
		    nePoint = this.project(bounds.getNorthEast(), zoom),
		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

		return {
			center: center,
			zoom: zoom
		};
	},

	// @method fitBounds(bounds: LatLngBounds, options?: fitBounds options): this
	// Sets a map view that contains the given geographical bounds with the
	// maximum zoom level possible.
	fitBounds: function (bounds, options) {

		bounds = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__geo_LatLngBounds__["b" /* toLatLngBounds */])(bounds);

		if (!bounds.isValid()) {
			throw new Error('Bounds are not valid.');
		}

		var target = this._getBoundsCenterZoom(bounds, options);
		return this.setView(target.center, target.zoom, options);
	},

	// @method fitWorld(options?: fitBounds options): this
	// Sets a map view that mostly contains the whole world with the maximum
	// zoom level possible.
	fitWorld: function (options) {
		return this.fitBounds([[-90, -180], [90, 180]], options);
	},

	// @method panTo(latlng: LatLng, options?: Pan options): this
	// Pans the map to a given center.
	panTo: function (center, options) { // (LatLng)
		return this.setView(center, this._zoom, {pan: options});
	},

	// @method panBy(offset: Point, options?: Pan options): this
	// Pans the map by a given number of pixels (animated).
	panBy: function (offset, options) {
		offset = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(offset).round();
		options = options || {};

		if (!offset.x && !offset.y) {
			return this.fire('moveend');
		}
		// If we pan too far, Chrome gets issues with tiles
		// and makes them disappear or appear in the wrong place (slightly offset) #2602
		if (options.animate !== true && !this.getSize().contains(offset)) {
			this._resetView(this.unproject(this.project(this.getCenter()).add(offset)), this.getZoom());
			return this;
		}

		if (!this._panAnim) {
			this._panAnim = new __WEBPACK_IMPORTED_MODULE_10__dom_PosAnimation__["a" /* PosAnimation */]();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		// don't fire movestart if animating inertia
		if (!options.noMoveStart) {
			this.fire('movestart');
		}

		// animate pan unless animate: false specified
		if (options.animate !== false) {
			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["c" /* addClass */](this._mapPane, 'leaflet-pan-anim');

			var newPos = this._getMapPanePos().subtract(offset).round();
			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
		} else {
			this._rawPanBy(offset);
			this.fire('move').fire('moveend');
		}

		return this;
	},

	// @method flyTo(latlng: LatLng, zoom?: Number, options?: Zoom/pan options): this
	// Sets the view of the map (geographical center and zoom) performing a smooth
	// pan-zoom animation.
	flyTo: function (targetCenter, targetZoom, options) {

		options = options || {};
		if (options.animate === false || !__WEBPACK_IMPORTED_MODULE_7__core_Browser__["a" /* any3d */]) {
			return this.setView(targetCenter, targetZoom, options);
		}

		this._stop();

		var from = this.project(this.getCenter()),
		    to = this.project(targetCenter),
		    size = this.getSize(),
		    startZoom = this._zoom;

		targetCenter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(targetCenter);
		targetZoom = targetZoom === undefined ? startZoom : targetZoom;

		var w0 = Math.max(size.x, size.y),
		    w1 = w0 * this.getZoomScale(startZoom, targetZoom),
		    u1 = (to.distanceTo(from)) || 1,
		    rho = 1.42,
		    rho2 = rho * rho;

		function r(i) {
			var s1 = i ? -1 : 1,
			    s2 = i ? w1 : w0,
			    t1 = w1 * w1 - w0 * w0 + s1 * rho2 * rho2 * u1 * u1,
			    b1 = 2 * s2 * rho2 * u1,
			    b = t1 / b1,
			    sq = Math.sqrt(b * b + 1) - b;

			    // workaround for floating point precision bug when sq = 0, log = -Infinite,
			    // thus triggering an infinite loop in flyTo
			    var log = sq < 0.000000001 ? -18 : Math.log(sq);

			return log;
		}

		function sinh(n) { return (Math.exp(n) - Math.exp(-n)) / 2; }
		function cosh(n) { return (Math.exp(n) + Math.exp(-n)) / 2; }
		function tanh(n) { return sinh(n) / cosh(n); }

		var r0 = r(0);

		function w(s) { return w0 * (cosh(r0) / cosh(r0 + rho * s)); }
		function u(s) { return w0 * (cosh(r0) * tanh(r0 + rho * s) - sinh(r0)) / rho2; }

		function easeOut(t) { return 1 - Math.pow(1 - t, 1.5); }

		var start = Date.now(),
		    S = (r(1) - r0) / rho,
		    duration = options.duration ? 1000 * options.duration : 1000 * S * 0.8;

		function frame() {
			var t = (Date.now() - start) / duration,
			    s = easeOut(t) * S;

			if (t <= 1) {
				this._flyToFrame = __WEBPACK_IMPORTED_MODULE_0__core_Util__["h" /* requestAnimFrame */](frame, this);

				this._move(
					this.unproject(from.add(to.subtract(from).multiplyBy(u(s) / u1)), startZoom),
					this.getScaleZoom(w0 / w(s), startZoom),
					{flyTo: true});

			} else {
				this
					._move(targetCenter, targetZoom)
					._moveEnd(true);
			}
		}

		this._moveStart(true, options.noMoveStart);

		frame.call(this);
		return this;
	},

	// @method flyToBounds(bounds: LatLngBounds, options?: fitBounds options): this
	// Sets the view of the map with a smooth animation like [`flyTo`](#map-flyto),
	// but takes a bounds parameter like [`fitBounds`](#map-fitbounds).
	flyToBounds: function (bounds, options) {
		var target = this._getBoundsCenterZoom(bounds, options);
		return this.flyTo(target.center, target.zoom, options);
	},

	// @method setMaxBounds(bounds: Bounds): this
	// Restricts the map view to the given bounds (see the [maxBounds](#map-maxbounds) option).
	setMaxBounds: function (bounds) {
		bounds = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__geo_LatLngBounds__["b" /* toLatLngBounds */])(bounds);

		if (!bounds.isValid()) {
			this.options.maxBounds = null;
			return this.off('moveend', this._panInsideMaxBounds);
		} else if (this.options.maxBounds) {
			this.off('moveend', this._panInsideMaxBounds);
		}

		this.options.maxBounds = bounds;

		if (this._loaded) {
			this._panInsideMaxBounds();
		}

		return this.on('moveend', this._panInsideMaxBounds);
	},

	// @method setMinZoom(zoom: Number): this
	// Sets the lower limit for the available zoom levels (see the [minZoom](#map-minzoom) option).
	setMinZoom: function (zoom) {
		var oldZoom = this.options.minZoom;
		this.options.minZoom = zoom;

		if (this._loaded && oldZoom !== zoom) {
			this.fire('zoomlevelschange');

			if (this.getZoom() < this.options.minZoom) {
				return this.setZoom(zoom);
			}
		}

		return this;
	},

	// @method setMaxZoom(zoom: Number): this
	// Sets the upper limit for the available zoom levels (see the [maxZoom](#map-maxzoom) option).
	setMaxZoom: function (zoom) {
		var oldZoom = this.options.maxZoom;
		this.options.maxZoom = zoom;

		if (this._loaded && oldZoom !== zoom) {
			this.fire('zoomlevelschange');

			if (this.getZoom() > this.options.maxZoom) {
				return this.setZoom(zoom);
			}
		}

		return this;
	},

	// @method panInsideBounds(bounds: LatLngBounds, options?: Pan options): this
	// Pans the map to the closest view that would lie inside the given bounds (if it's not already), controlling the animation using the options specific, if any.
	panInsideBounds: function (bounds, options) {
		this._enforcingBounds = true;
		var center = this.getCenter(),
		    newCenter = this._limitCenter(center, this._zoom, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__geo_LatLngBounds__["b" /* toLatLngBounds */])(bounds));

		if (!center.equals(newCenter)) {
			this.panTo(newCenter, options);
		}

		this._enforcingBounds = false;
		return this;
	},

	// @method invalidateSize(options: Zoom/pan options): this
	// Checks if the map container size changed and updates the map if so —
	// call it after you've changed the map size dynamically, also animating
	// pan by default. If `options.pan` is `false`, panning will not occur.
	// If `options.debounceMoveend` is `true`, it will delay `moveend` event so
	// that it doesn't happen often even if the method is called many
	// times in a row.

	// @alternative
	// @method invalidateSize(animate: Boolean): this
	// Checks if the map container size changed and updates the map if so —
	// call it after you've changed the map size dynamically, also animating
	// pan by default.
	invalidateSize: function (options) {
		if (!this._loaded) { return this; }

		options = __WEBPACK_IMPORTED_MODULE_0__core_Util__["c" /* extend */]({
			animate: false,
			pan: true
		}, options === true ? {animate: true} : options);

		var oldSize = this.getSize();
		this._sizeChanged = true;
		this._lastCenter = null;

		var newSize = this.getSize(),
		    oldCenter = oldSize.divideBy(2).round(),
		    newCenter = newSize.divideBy(2).round(),
		    offset = oldCenter.subtract(newCenter);

		if (!offset.x && !offset.y) { return this; }

		if (options.animate && options.pan) {
			this.panBy(offset);

		} else {
			if (options.pan) {
				this._rawPanBy(offset);
			}

			this.fire('move');

			if (options.debounceMoveend) {
				clearTimeout(this._sizeTimer);
				this._sizeTimer = setTimeout(__WEBPACK_IMPORTED_MODULE_0__core_Util__["g" /* bind */](this.fire, this, 'moveend'), 200);
			} else {
				this.fire('moveend');
			}
		}

		// @section Map state change events
		// @event resize: ResizeEvent
		// Fired when the map is resized.
		return this.fire('resize', {
			oldSize: oldSize,
			newSize: newSize
		});
	},

	// @section Methods for modifying map state
	// @method stop(): this
	// Stops the currently running `panTo` or `flyTo` animation, if any.
	stop: function () {
		this.setZoom(this._limitZoom(this._zoom));
		if (!this.options.zoomSnap) {
			this.fire('viewreset');
		}
		return this._stop();
	},

	// @section Geolocation methods
	// @method locate(options?: Locate options): this
	// Tries to locate the user using the Geolocation API, firing a [`locationfound`](#map-locationfound)
	// event with location data on success or a [`locationerror`](#map-locationerror) event on failure,
	// and optionally sets the map view to the user's location with respect to
	// detection accuracy (or to the world view if geolocation failed).
	// Note that, if your page doesn't use HTTPS, this method will fail in
	// modern browsers ([Chrome 50 and newer](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins))
	// See `Locate options` for more details.
	locate: function (options) {

		options = this._locateOptions = __WEBPACK_IMPORTED_MODULE_0__core_Util__["c" /* extend */]({
			timeout: 10000,
			watch: false
			// setView: false
			// maxZoom: <Number>
			// maximumAge: 0
			// enableHighAccuracy: false
		}, options);

		if (!('geolocation' in navigator)) {
			this._handleGeolocationError({
				code: 0,
				message: 'Geolocation not supported.'
			});
			return this;
		}

		var onResponse = __WEBPACK_IMPORTED_MODULE_0__core_Util__["g" /* bind */](this._handleGeolocationResponse, this),
		    onError = __WEBPACK_IMPORTED_MODULE_0__core_Util__["g" /* bind */](this._handleGeolocationError, this);

		if (options.watch) {
			this._locationWatchId =
			        navigator.geolocation.watchPosition(onResponse, onError, options);
		} else {
			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
		}
		return this;
	},

	// @method stopLocate(): this
	// Stops watching location previously initiated by `map.locate({watch: true})`
	// and aborts resetting the map view if map.locate was called with
	// `{setView: true}`.
	stopLocate: function () {
		if (navigator.geolocation && navigator.geolocation.clearWatch) {
			navigator.geolocation.clearWatch(this._locationWatchId);
		}
		if (this._locateOptions) {
			this._locateOptions.setView = false;
		}
		return this;
	},

	_handleGeolocationError: function (error) {
		var c = error.code,
		    message = error.message ||
		            (c === 1 ? 'permission denied' :
		            (c === 2 ? 'position unavailable' : 'timeout'));

		if (this._locateOptions.setView && !this._loaded) {
			this.fitWorld();
		}

		// @section Location events
		// @event locationerror: ErrorEvent
		// Fired when geolocation (using the [`locate`](#map-locate) method) failed.
		this.fire('locationerror', {
			code: c,
			message: 'Geolocation error: ' + message + '.'
		});
	},

	_handleGeolocationResponse: function (pos) {
		var lat = pos.coords.latitude,
		    lng = pos.coords.longitude,
		    latlng = new __WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["a" /* LatLng */](lat, lng),
		    bounds = latlng.toBounds(pos.coords.accuracy),
		    options = this._locateOptions;

		if (options.setView) {
			var zoom = this.getBoundsZoom(bounds);
			this.setView(latlng, options.maxZoom ? Math.min(zoom, options.maxZoom) : zoom);
		}

		var data = {
			latlng: latlng,
			bounds: bounds,
			timestamp: pos.timestamp
		};

		for (var i in pos.coords) {
			if (typeof pos.coords[i] === 'number') {
				data[i] = pos.coords[i];
			}
		}

		// @event locationfound: LocationEvent
		// Fired when geolocation (using the [`locate`](#map-locate) method)
		// went successfully.
		this.fire('locationfound', data);
	},

	// TODO Appropriate docs section?
	// @section Other Methods
	// @method addHandler(name: String, HandlerClass: Function): this
	// Adds a new `Handler` to the map, given its name and constructor function.
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) { return this; }

		var handler = this[name] = new HandlerClass(this);

		this._handlers.push(handler);

		if (this.options[name]) {
			handler.enable();
		}

		return this;
	},

	// @method remove(): this
	// Destroys the map and clears all related event listeners.
	remove: function () {

		this._initEvents(true);

		if (this._containerId !== this._container._leaflet_id) {
			throw new Error('Map container is being reused by another instance');
		}

		try {
			// throws error in IE6-8
			delete this._container._leaflet_id;
			delete this._containerId;
		} catch (e) {
			/*eslint-disable */
			this._container._leaflet_id = undefined;
			/* eslint-enable */
			this._containerId = undefined;
		}

		if (this._locationWatchId !== undefined) {
			this.stopLocate();
		}

		this._stop();

		__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["d" /* remove */](this._mapPane);

		if (this._clearControlPos) {
			this._clearControlPos();
		}

		this._clearHandlers();

		if (this._loaded) {
			// @section Map state change events
			// @event unload: Event
			// Fired when the map is destroyed with [remove](#map-remove) method.
			this.fire('unload');
		}

		var i;
		for (i in this._layers) {
			this._layers[i].remove();
		}
		for (i in this._panes) {
			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["d" /* remove */](this._panes[i]);
		}

		this._layers = [];
		this._panes = [];
		delete this._mapPane;
		delete this._renderer;

		return this;
	},

	// @section Other Methods
	// @method createPane(name: String, container?: HTMLElement): HTMLElement
	// Creates a new [map pane](#map-pane) with the given name if it doesn't exist already,
	// then returns it. The pane is created as a child of `container`, or
	// as a child of the main map pane if not set.
	createPane: function (name, container) {
		var className = 'leaflet-pane' + (name ? ' leaflet-' + name.replace('Pane', '') + '-pane' : ''),
		    pane = __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["e" /* create */]('div', className, container || this._mapPane);

		if (name) {
			this._panes[name] = pane;
		}
		return pane;
	},

	// @section Methods for Getting Map State

	// @method getCenter(): LatLng
	// Returns the geographical center of the map view
	getCenter: function () {
		this._checkIfLoaded();

		if (this._lastCenter && !this._moved()) {
			return this._lastCenter;
		}
		return this.layerPointToLatLng(this._getCenterLayerPoint());
	},

	// @method getZoom(): Number
	// Returns the current zoom level of the map view
	getZoom: function () {
		return this._zoom;
	},

	// @method getBounds(): LatLngBounds
	// Returns the geographical bounds visible in the current map view
	getBounds: function () {
		var bounds = this.getPixelBounds(),
		    sw = this.unproject(bounds.getBottomLeft()),
		    ne = this.unproject(bounds.getTopRight());

		return new __WEBPACK_IMPORTED_MODULE_6__geo_LatLngBounds__["a" /* LatLngBounds */](sw, ne);
	},

	// @method getMinZoom(): Number
	// Returns the minimum zoom level of the map (if set in the `minZoom` option of the map or of any layers), or `0` by default.
	getMinZoom: function () {
		return this.options.minZoom === undefined ? this._layersMinZoom || 0 : this.options.minZoom;
	},

	// @method getMaxZoom(): Number
	// Returns the maximum zoom level of the map (if set in the `maxZoom` option of the map or of any layers).
	getMaxZoom: function () {
		return this.options.maxZoom === undefined ?
			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
			this.options.maxZoom;
	},

	// @method getBoundsZoom(bounds: LatLngBounds, inside?: Boolean): Number
	// Returns the maximum zoom level on which the given bounds fit to the map
	// view in its entirety. If `inside` (optional) is set to `true`, the method
	// instead returns the minimum zoom level on which the map view fits into
	// the given bounds in its entirety.
	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
		bounds = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__geo_LatLngBounds__["b" /* toLatLngBounds */])(bounds);
		padding = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(padding || [0, 0]);

		var zoom = this.getZoom() || 0,
		    min = this.getMinZoom(),
		    max = this.getMaxZoom(),
		    nw = bounds.getNorthWest(),
		    se = bounds.getSouthEast(),
		    size = this.getSize().subtract(padding),
		    boundsSize = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__geometry_Bounds__["b" /* toBounds */])(this.project(se, zoom), this.project(nw, zoom)).getSize(),
		    snap = __WEBPACK_IMPORTED_MODULE_7__core_Browser__["a" /* any3d */] ? this.options.zoomSnap : 1,
		    scalex = size.x / boundsSize.x,
		    scaley = size.y / boundsSize.y,
		    scale = inside ? Math.max(scalex, scaley) : Math.min(scalex, scaley);

		zoom = this.getScaleZoom(scale, zoom);

		if (snap) {
			zoom = Math.round(zoom / (snap / 100)) * (snap / 100); // don't jump if within 1% of a snap level
			zoom = inside ? Math.ceil(zoom / snap) * snap : Math.floor(zoom / snap) * snap;
		}

		return Math.max(min, Math.min(max, zoom));
	},

	// @method getSize(): Point
	// Returns the current size of the map container (in pixels).
	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new __WEBPACK_IMPORTED_MODULE_3__geometry_Point__["b" /* Point */](
				this._container.clientWidth || 0,
				this._container.clientHeight || 0);

			this._sizeChanged = false;
		}
		return this._size.clone();
	},

	// @method getPixelBounds(): Bounds
	// Returns the bounds of the current map view in projected pixel
	// coordinates (sometimes useful in layer and overlay implementations).
	getPixelBounds: function (center, zoom) {
		var topLeftPoint = this._getTopLeftPoint(center, zoom);
		return new __WEBPACK_IMPORTED_MODULE_4__geometry_Bounds__["a" /* Bounds */](topLeftPoint, topLeftPoint.add(this.getSize()));
	},

	// TODO: Check semantics - isn't the pixel origin the 0,0 coord relative to
	// the map pane? "left point of the map layer" can be confusing, specially
	// since there can be negative offsets.
	// @method getPixelOrigin(): Point
	// Returns the projected pixel coordinates of the top left point of
	// the map layer (useful in custom layer and overlay implementations).
	getPixelOrigin: function () {
		this._checkIfLoaded();
		return this._pixelOrigin;
	},

	// @method getPixelWorldBounds(zoom?: Number): Bounds
	// Returns the world's bounds in pixel coordinates for zoom level `zoom`.
	// If `zoom` is omitted, the map's current zoom level is used.
	getPixelWorldBounds: function (zoom) {
		return this.options.crs.getProjectedBounds(zoom === undefined ? this.getZoom() : zoom);
	},

	// @section Other Methods

	// @method getPane(pane: String|HTMLElement): HTMLElement
	// Returns a [map pane](#map-pane), given its name or its HTML element (its identity).
	getPane: function (pane) {
		return typeof pane === 'string' ? this._panes[pane] : pane;
	},

	// @method getPanes(): Object
	// Returns a plain object containing the names of all [panes](#map-pane) as keys and
	// the panes as values.
	getPanes: function () {
		return this._panes;
	},

	// @method getContainer: HTMLElement
	// Returns the HTML element that contains the map.
	getContainer: function () {
		return this._container;
	},


	// @section Conversion Methods

	// @method getZoomScale(toZoom: Number, fromZoom: Number): Number
	// Returns the scale factor to be applied to a map transition from zoom level
	// `fromZoom` to `toZoom`. Used internally to help with zoom animations.
	getZoomScale: function (toZoom, fromZoom) {
		// TODO replace with universal implementation after refactoring projections
		var crs = this.options.crs;
		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
		return crs.scale(toZoom) / crs.scale(fromZoom);
	},

	// @method getScaleZoom(scale: Number, fromZoom: Number): Number
	// Returns the zoom level that the map would end up at, if it is at `fromZoom`
	// level and everything is scaled by a factor of `scale`. Inverse of
	// [`getZoomScale`](#map-getZoomScale).
	getScaleZoom: function (scale, fromZoom) {
		var crs = this.options.crs;
		fromZoom = fromZoom === undefined ? this._zoom : fromZoom;
		var zoom = crs.zoom(scale * crs.scale(fromZoom));
		return isNaN(zoom) ? Infinity : zoom;
	},

	// @method project(latlng: LatLng, zoom: Number): Point
	// Projects a geographical coordinate `LatLng` according to the projection
	// of the map's CRS, then scales it according to `zoom` and the CRS's
	// `Transformation`. The result is pixel coordinate relative to
	// the CRS origin.
	project: function (latlng, zoom) {
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.latLngToPoint(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(latlng), zoom);
	},

	// @method unproject(point: Point, zoom: Number): LatLng
	// Inverse of [`project`](#map-project).
	unproject: function (point, zoom) {
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.pointToLatLng(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(point), zoom);
	},

	// @method layerPointToLatLng(point: Point): LatLng
	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
	// returns the corresponding geographical coordinate (for the current zoom level).
	layerPointToLatLng: function (point) {
		var projectedPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(point).add(this.getPixelOrigin());
		return this.unproject(projectedPoint);
	},

	// @method latLngToLayerPoint(latlng: LatLng): Point
	// Given a geographical coordinate, returns the corresponding pixel coordinate
	// relative to the [origin pixel](#map-getpixelorigin).
	latLngToLayerPoint: function (latlng) {
		var projectedPoint = this.project(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(latlng))._round();
		return projectedPoint._subtract(this.getPixelOrigin());
	},

	// @method wrapLatLng(latlng: LatLng): LatLng
	// Returns a `LatLng` where `lat` and `lng` has been wrapped according to the
	// map's CRS's `wrapLat` and `wrapLng` properties, if they are outside the
	// CRS's bounds.
	// By default this means longitude is wrapped around the dateline so its
	// value is between -180 and +180 degrees.
	wrapLatLng: function (latlng) {
		return this.options.crs.wrapLatLng(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(latlng));
	},

	// @method wrapLatLngBounds(bounds: LatLngBounds): LatLngBounds
	// Returns a `LatLngBounds` with the same size as the given one, ensuring that
	// its center is within the CRS's bounds.
	// By default this means the center longitude is wrapped around the dateline so its
	// value is between -180 and +180 degrees, and the majority of the bounds
	// overlaps the CRS's bounds.
	wrapLatLngBounds: function (latlng) {
		return this.options.crs.wrapLatLngBounds(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__geo_LatLngBounds__["b" /* toLatLngBounds */])(latlng));
	},

	// @method distance(latlng1: LatLng, latlng2: LatLng): Number
	// Returns the distance between two geographical coordinates according to
	// the map's CRS. By default this measures distance in meters.
	distance: function (latlng1, latlng2) {
		return this.options.crs.distance(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(latlng1), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(latlng2));
	},

	// @method containerPointToLayerPoint(point: Point): Point
	// Given a pixel coordinate relative to the map container, returns the corresponding
	// pixel coordinate relative to the [origin pixel](#map-getpixelorigin).
	containerPointToLayerPoint: function (point) { // (Point)
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(point).subtract(this._getMapPanePos());
	},

	// @method layerPointToContainerPoint(point: Point): Point
	// Given a pixel coordinate relative to the [origin pixel](#map-getpixelorigin),
	// returns the corresponding pixel coordinate relative to the map container.
	layerPointToContainerPoint: function (point) { // (Point)
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(point).add(this._getMapPanePos());
	},

	// @method containerPointToLatLng(point: Point): LatLng
	// Given a pixel coordinate relative to the map container, returns
	// the corresponding geographical coordinate (for the current zoom level).
	containerPointToLatLng: function (point) {
		var layerPoint = this.containerPointToLayerPoint(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__geometry_Point__["a" /* toPoint */])(point));
		return this.layerPointToLatLng(layerPoint);
	},

	// @method latLngToContainerPoint(latlng: LatLng): Point
	// Given a geographical coordinate, returns the corresponding pixel coordinate
	// relative to the map container.
	latLngToContainerPoint: function (latlng) {
		return this.layerPointToContainerPoint(this.latLngToLayerPoint(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__geo_LatLng__["b" /* toLatLng */])(latlng)));
	},

	// @method mouseEventToContainerPoint(ev: MouseEvent): Point
	// Given a MouseEvent object, returns the pixel coordinate relative to the
	// map container where the event took place.
	mouseEventToContainerPoint: function (e) {
		return __WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["b" /* getMousePosition */](e, this._container);
	},

	// @method mouseEventToLayerPoint(ev: MouseEvent): Point
	// Given a MouseEvent object, returns the pixel coordinate relative to
	// the [origin pixel](#map-getpixelorigin) where the event took place.
	mouseEventToLayerPoint: function (e) {
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	// @method mouseEventToLatLng(ev: MouseEvent): LatLng
	// Given a MouseEvent object, returns geographical coordinate where the
	// event took place.
	mouseEventToLatLng: function (e) { // (MouseEvent)
		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	},


	// map initialization methods

	_initContainer: function (id) {
		var container = this._container = __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["f" /* get */](id);

		if (!container) {
			throw new Error('Map container not found.');
		} else if (container._leaflet_id) {
			throw new Error('Map container is already initialized.');
		}

		__WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["a" /* on */](container, 'scroll', this._onScroll, this);
		this._containerId = __WEBPACK_IMPORTED_MODULE_0__core_Util__["f" /* stamp */](container);
	},

	_initLayout: function () {
		var container = this._container;

		this._fadeAnimated = this.options.fadeAnimation && __WEBPACK_IMPORTED_MODULE_7__core_Browser__["a" /* any3d */];

		__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["c" /* addClass */](container, 'leaflet-container' +
			(__WEBPACK_IMPORTED_MODULE_7__core_Browser__["c" /* touch */] ? ' leaflet-touch' : '') +
			(__WEBPACK_IMPORTED_MODULE_7__core_Browser__["d" /* retina */] ? ' leaflet-retina' : '') +
			(__WEBPACK_IMPORTED_MODULE_7__core_Browser__["e" /* ielt9 */] ? ' leaflet-oldie' : '') +
			(__WEBPACK_IMPORTED_MODULE_7__core_Browser__["f" /* safari */] ? ' leaflet-safari' : '') +
			(this._fadeAnimated ? ' leaflet-fade-anim' : ''));

		var position = __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["g" /* getStyle */](container, 'position');

		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	_initPanes: function () {
		var panes = this._panes = {};
		this._paneRenderers = {};

		// @section
		//
		// Panes are DOM elements used to control the ordering of layers on the map. You
		// can access panes with [`map.getPane`](#map-getpane) or
		// [`map.getPanes`](#map-getpanes) methods. New panes can be created with the
		// [`map.createPane`](#map-createpane) method.
		//
		// Every map has the following default panes that differ only in zIndex.
		//
		// @pane mapPane: HTMLElement = 'auto'
		// Pane that contains all other map panes

		this._mapPane = this.createPane('mapPane', this._container);
		__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["h" /* setPosition */](this._mapPane, new __WEBPACK_IMPORTED_MODULE_3__geometry_Point__["b" /* Point */](0, 0));

		// @pane tilePane: HTMLElement = 200
		// Pane for `GridLayer`s and `TileLayer`s
		this.createPane('tilePane');
		// @pane overlayPane: HTMLElement = 400
		// Pane for vectors (`Path`s, like `Polyline`s and `Polygon`s), `ImageOverlay`s and `VideoOverlay`s
		this.createPane('shadowPane');
		// @pane shadowPane: HTMLElement = 500
		// Pane for overlay shadows (e.g. `Marker` shadows)
		this.createPane('overlayPane');
		// @pane markerPane: HTMLElement = 600
		// Pane for `Icon`s of `Marker`s
		this.createPane('markerPane');
		// @pane tooltipPane: HTMLElement = 650
		// Pane for `Tooltip`s.
		this.createPane('tooltipPane');
		// @pane popupPane: HTMLElement = 700
		// Pane for `Popup`s.
		this.createPane('popupPane');

		if (!this.options.markerZoomAnimation) {
			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["c" /* addClass */](panes.markerPane, 'leaflet-zoom-hide');
			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["c" /* addClass */](panes.shadowPane, 'leaflet-zoom-hide');
		}
	},


	// private methods that modify map state

	// @section Map state change events
	_resetView: function (center, zoom) {
		__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["h" /* setPosition */](this._mapPane, new __WEBPACK_IMPORTED_MODULE_3__geometry_Point__["b" /* Point */](0, 0));

		var loading = !this._loaded;
		this._loaded = true;
		zoom = this._limitZoom(zoom);

		this.fire('viewprereset');

		var zoomChanged = this._zoom !== zoom;
		this
			._moveStart(zoomChanged, false)
			._move(center, zoom)
			._moveEnd(zoomChanged);

		// @event viewreset: Event
		// Fired when the map needs to redraw its content (this usually happens
		// on map zoom or load). Very useful for creating custom overlays.
		this.fire('viewreset');

		// @event load: Event
		// Fired when the map is initialized (when its center and zoom are set
		// for the first time).
		if (loading) {
			this.fire('load');
		}
	},

	_moveStart: function (zoomChanged, noMoveStart) {
		// @event zoomstart: Event
		// Fired when the map zoom is about to change (e.g. before zoom animation).
		// @event movestart: Event
		// Fired when the view of the map starts changing (e.g. user starts dragging the map).
		if (zoomChanged) {
			this.fire('zoomstart');
		}
		if (!noMoveStart) {
			this.fire('movestart');
		}
		return this;
	},

	_move: function (center, zoom, data) {
		if (zoom === undefined) {
			zoom = this._zoom;
		}
		var zoomChanged = this._zoom !== zoom;

		this._zoom = zoom;
		this._lastCenter = center;
		this._pixelOrigin = this._getNewPixelOrigin(center);

		// @event zoom: Event
		// Fired repeatedly during any change in zoom level, including zoom
		// and fly animations.
		if (zoomChanged || (data && data.pinch)) {	// Always fire 'zoom' if pinching because #3530
			this.fire('zoom', data);
		}

		// @event move: Event
		// Fired repeatedly during any movement of the map, including pan and
		// fly animations.
		return this.fire('move', data);
	},

	_moveEnd: function (zoomChanged) {
		// @event zoomend: Event
		// Fired when the map has changed, after any animations.
		if (zoomChanged) {
			this.fire('zoomend');
		}

		// @event moveend: Event
		// Fired when the center of the map stops changing (e.g. user stopped
		// dragging the map).
		return this.fire('moveend');
	},

	_stop: function () {
		__WEBPACK_IMPORTED_MODULE_0__core_Util__["i" /* cancelAnimFrame */](this._flyToFrame);
		if (this._panAnim) {
			this._panAnim.stop();
		}
		return this;
	},

	_rawPanBy: function (offset) {
		__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["h" /* setPosition */](this._mapPane, this._getMapPanePos().subtract(offset));
	},

	_getZoomSpan: function () {
		return this.getMaxZoom() - this.getMinZoom();
	},

	_panInsideMaxBounds: function () {
		if (!this._enforcingBounds) {
			this.panInsideBounds(this.options.maxBounds);
		}
	},

	_checkIfLoaded: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}
	},

	// DOM event handling

	// @section Interaction events
	_initEvents: function (remove) {
		this._targets = {};
		this._targets[__WEBPACK_IMPORTED_MODULE_0__core_Util__["f" /* stamp */](this._container)] = this;

		var onOff = remove ? __WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["c" /* off */] : __WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["a" /* on */];

		// @event click: MouseEvent
		// Fired when the user clicks (or taps) the map.
		// @event dblclick: MouseEvent
		// Fired when the user double-clicks (or double-taps) the map.
		// @event mousedown: MouseEvent
		// Fired when the user pushes the mouse button on the map.
		// @event mouseup: MouseEvent
		// Fired when the user releases the mouse button on the map.
		// @event mouseover: MouseEvent
		// Fired when the mouse enters the map.
		// @event mouseout: MouseEvent
		// Fired when the mouse leaves the map.
		// @event mousemove: MouseEvent
		// Fired while the mouse moves over the map.
		// @event contextmenu: MouseEvent
		// Fired when the user pushes the right mouse button on the map, prevents
		// default browser context menu from showing if there are listeners on
		// this event. Also fired on mobile when the user holds a single touch
		// for a second (also called long press).
		// @event keypress: KeyboardEvent
		// Fired when the user presses a key from the keyboard while the map is focused.
		onOff(this._container, 'click dblclick mousedown mouseup ' +
			'mouseover mouseout mousemove contextmenu keypress', this._handleDOMEvent, this);

		if (this.options.trackResize) {
			onOff(window, 'resize', this._onResize, this);
		}

		if (__WEBPACK_IMPORTED_MODULE_7__core_Browser__["a" /* any3d */] && this.options.transform3DLimit) {
			(remove ? this.off : this.on).call(this, 'moveend', this._onMoveEnd);
		}
	},

	_onResize: function () {
		__WEBPACK_IMPORTED_MODULE_0__core_Util__["i" /* cancelAnimFrame */](this._resizeRequest);
		this._resizeRequest = __WEBPACK_IMPORTED_MODULE_0__core_Util__["h" /* requestAnimFrame */](
		        function () { this.invalidateSize({debounceMoveend: true}); }, this);
	},

	_onScroll: function () {
		this._container.scrollTop  = 0;
		this._container.scrollLeft = 0;
	},

	_onMoveEnd: function () {
		var pos = this._getMapPanePos();
		if (Math.max(Math.abs(pos.x), Math.abs(pos.y)) >= this.options.transform3DLimit) {
			// https://bugzilla.mozilla.org/show_bug.cgi?id=1203873 but Webkit also have
			// a pixel offset on very high values, see: http://jsfiddle.net/dg6r5hhb/
			this._resetView(this.getCenter(), this.getZoom());
		}
	},

	_findEventTargets: function (e, type) {
		var targets = [],
		    target,
		    isHover = type === 'mouseout' || type === 'mouseover',
		    src = e.target || e.srcElement,
		    dragging = false;

		while (src) {
			target = this._targets[__WEBPACK_IMPORTED_MODULE_0__core_Util__["f" /* stamp */](src)];
			if (target && (type === 'click' || type === 'preclick') && !e._simulated && this._draggableMoved(target)) {
				// Prevent firing click after you just dragged an object.
				dragging = true;
				break;
			}
			if (target && target.listens(type, true)) {
				if (isHover && !__WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["d" /* isExternalTarget */](src, e)) { break; }
				targets.push(target);
				if (isHover) { break; }
			}
			if (src === this._container) { break; }
			src = src.parentNode;
		}
		if (!targets.length && !dragging && !isHover && __WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["d" /* isExternalTarget */](src, e)) {
			targets = [this];
		}
		return targets;
	},

	_handleDOMEvent: function (e) {
		if (!this._loaded || __WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["e" /* skipped */](e)) { return; }

		var type = e.type;

		if (type === 'mousedown' || type === 'keypress') {
			// prevents outline when clicking on keyboard-focusable element
			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["i" /* preventOutline */](e.target || e.srcElement);
		}

		this._fireDOMEvent(e, type);
	},

	_mouseEvents: ['click', 'dblclick', 'mouseover', 'mouseout', 'contextmenu'],

	_fireDOMEvent: function (e, type, targets) {

		if (e.type === 'click') {
			// Fire a synthetic 'preclick' event which propagates up (mainly for closing popups).
			// @event preclick: MouseEvent
			// Fired before mouse click on the map (sometimes useful when you
			// want something to happen on click before any existing click
			// handlers start running).
			var synth = __WEBPACK_IMPORTED_MODULE_0__core_Util__["c" /* extend */]({}, e);
			synth.type = 'preclick';
			this._fireDOMEvent(synth, synth.type, targets);
		}

		if (e._stopped) { return; }

		// Find the layer the event is propagating from and its parents.
		targets = (targets || []).concat(this._findEventTargets(e, type));

		if (!targets.length) { return; }

		var target = targets[0];
		if (type === 'contextmenu' && target.listens(type, true)) {
			__WEBPACK_IMPORTED_MODULE_8__dom_DomEvent__["f" /* preventDefault */](e);
		}

		var data = {
			originalEvent: e
		};

		if (e.type !== 'keypress') {
			var isMarker = target.getLatLng && (!target._radius || target._radius <= 10);
			data.containerPoint = isMarker ?
				this.latLngToContainerPoint(target.getLatLng()) : this.mouseEventToContainerPoint(e);
			data.layerPoint = this.containerPointToLayerPoint(data.containerPoint);
			data.latlng = isMarker ? target.getLatLng() : this.layerPointToLatLng(data.layerPoint);
		}

		for (var i = 0; i < targets.length; i++) {
			targets[i].fire(type, data, true);
			if (data.originalEvent._stopped ||
				(targets[i].options.bubblingMouseEvents === false && __WEBPACK_IMPORTED_MODULE_0__core_Util__["j" /* indexOf */](this._mouseEvents, type) !== -1)) { return; }
		}
	},

	_draggableMoved: function (obj) {
		obj = obj.dragging && obj.dragging.enabled() ? obj : this;
		return (obj.dragging && obj.dragging.moved()) || (this.boxZoom && this.boxZoom.moved());
	},

	_clearHandlers: function () {
		for (var i = 0, len = this._handlers.length; i < len; i++) {
			this._handlers[i].disable();
		}
	},

	// @section Other Methods

	// @method whenReady(fn: Function, context?: Object): this
	// Runs the given function `fn` when the map gets initialized with
	// a view (center and zoom) and at least one layer, or immediately
	// if it's already initialized, optionally passing a function context.
	whenReady: function (callback, context) {
		if (this._loaded) {
			callback.call(context || this, {target: this});
		} else {
			this.on('load', callback, context);
		}
		return this;
	},


	// private methods for getting map state

	_getMapPanePos: function () {
		return __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["j" /* getPosition */](this._mapPane) || new __WEBPACK_IMPORTED_MODULE_3__geometry_Point__["b" /* Point */](0, 0);
	},

	_moved: function () {
		var pos = this._getMapPanePos();
		return pos && !pos.equals([0, 0]);
	},

	_getTopLeftPoint: function (center, zoom) {
		var pixelOrigin = center && zoom !== undefined ?
			this._getNewPixelOrigin(center, zoom) :
			this.getPixelOrigin();
		return pixelOrigin.subtract(this._getMapPanePos());
	},

	_getNewPixelOrigin: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		return this.project(center, zoom)._subtract(viewHalf)._add(this._getMapPanePos())._round();
	},

	_latLngToNewLayerPoint: function (latlng, zoom, center) {
		var topLeft = this._getNewPixelOrigin(center, zoom);
		return this.project(latlng, zoom)._subtract(topLeft);
	},

	_latLngBoundsToNewLayerBounds: function (latLngBounds, zoom, center) {
		var topLeft = this._getNewPixelOrigin(center, zoom);
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__geometry_Bounds__["b" /* toBounds */])([
			this.project(latLngBounds.getSouthWest(), zoom)._subtract(topLeft),
			this.project(latLngBounds.getNorthWest(), zoom)._subtract(topLeft),
			this.project(latLngBounds.getSouthEast(), zoom)._subtract(topLeft),
			this.project(latLngBounds.getNorthEast(), zoom)._subtract(topLeft)
		]);
	},

	// layer point of the current center
	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	// offset of the specified place to the current center in pixels
	_getCenterOffset: function (latlng) {
		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
	},

	// adjust center for view to get inside bounds
	_limitCenter: function (center, zoom, bounds) {

		if (!bounds) { return center; }

		var centerPoint = this.project(center, zoom),
		    viewHalf = this.getSize().divideBy(2),
		    viewBounds = new __WEBPACK_IMPORTED_MODULE_4__geometry_Bounds__["a" /* Bounds */](centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

		// If offset is less than a pixel, ignore.
		// This prevents unstable projections from getting into
		// an infinite loop of tiny offsets.
		if (offset.round().equals([0, 0])) {
			return center;
		}

		return this.unproject(centerPoint.add(offset), zoom);
	},

	// adjust offset for view to get inside bounds
	_limitOffset: function (offset, bounds) {
		if (!bounds) { return offset; }

		var viewBounds = this.getPixelBounds(),
		    newBounds = new __WEBPACK_IMPORTED_MODULE_4__geometry_Bounds__["a" /* Bounds */](viewBounds.min.add(offset), viewBounds.max.add(offset));

		return offset.add(this._getBoundsOffset(newBounds, bounds));
	},

	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
		var projectedMaxBounds = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__geometry_Bounds__["b" /* toBounds */])(
		        this.project(maxBounds.getNorthEast(), zoom),
		        this.project(maxBounds.getSouthWest(), zoom)
		    ),
		    minOffset = projectedMaxBounds.min.subtract(pxBounds.min),
		    maxOffset = projectedMaxBounds.max.subtract(pxBounds.max),

		    dx = this._rebound(minOffset.x, -maxOffset.x),
		    dy = this._rebound(minOffset.y, -maxOffset.y);

		return new __WEBPACK_IMPORTED_MODULE_3__geometry_Point__["b" /* Point */](dx, dy);
	},

	_rebound: function (left, right) {
		return left + right > 0 ?
			Math.round(left - right) / 2 :
			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
		    max = this.getMaxZoom(),
		    snap = __WEBPACK_IMPORTED_MODULE_7__core_Browser__["a" /* any3d */] ? this.options.zoomSnap : 1;
		if (snap) {
			zoom = Math.round(zoom / snap) * snap;
		}
		return Math.max(min, Math.min(max, zoom));
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["k" /* removeClass */](this._mapPane, 'leaflet-pan-anim');
		this.fire('moveend');
	},

	_tryAnimatedPan: function (center, options) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._trunc();

		// don't animate too far unless animate: true specified in options
		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

		this.panBy(offset, options);

		return true;
	},

	_createAnimProxy: function () {

		var proxy = this._proxy = __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["e" /* create */]('div', 'leaflet-proxy leaflet-zoom-animated');
		this._panes.mapPane.appendChild(proxy);

		this.on('zoomanim', function (e) {
			var prop = __WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["l" /* TRANSFORM */],
			    transform = this._proxy.style[prop];

			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["m" /* setTransform */](this._proxy, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1));

			// workaround for case when transform is the same and so transitionend event is not fired
			if (transform === this._proxy.style[prop] && this._animatingZoom) {
				this._onZoomTransitionEnd();
			}
		}, this);

		this.on('load moveend', function () {
			var c = this.getCenter(),
			    z = this.getZoom();
			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["m" /* setTransform */](this._proxy, this.project(c, z), this.getZoomScale(z, 1));
		}, this);

		this._on('unload', this._destroyAnimProxy, this);
	},

	_destroyAnimProxy: function () {
		__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["d" /* remove */](this._proxy);
		delete this._proxy;
	},

	_catchTransitionEnd: function (e) {
		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
			this._onZoomTransitionEnd();
		}
	},

	_nothingToAnimate: function () {
		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
	},

	_tryAnimatedZoom: function (center, zoom, options) {

		if (this._animatingZoom) { return true; }

		options = options || {};

		// don't animate if disabled, not supported or zoom difference is too large
		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

		// offset is the pixel coords of the zoom origin relative to the current center
		var scale = this.getZoomScale(zoom),
		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale);

		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

		__WEBPACK_IMPORTED_MODULE_0__core_Util__["h" /* requestAnimFrame */](function () {
			this
			    ._moveStart(true, false)
			    ._animateZoom(center, zoom, true);
		}, this);

		return true;
	},

	_animateZoom: function (center, zoom, startAnim, noUpdate) {
		if (!this._mapPane) { return; }

		if (startAnim) {
			this._animatingZoom = true;

			// remember what center/zoom to set after animation
			this._animateToCenter = center;
			this._animateToZoom = zoom;

			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["c" /* addClass */](this._mapPane, 'leaflet-zoom-anim');
		}

		// @event zoomanim: ZoomAnimEvent
		// Fired on every frame of a zoom animation
		this.fire('zoomanim', {
			center: center,
			zoom: zoom,
			noUpdate: noUpdate
		});

		// Work around webkit not firing 'transitionend', see https://github.com/Leaflet/Leaflet/issues/3689, 2693
		setTimeout(__WEBPACK_IMPORTED_MODULE_0__core_Util__["g" /* bind */](this._onZoomTransitionEnd, this), 250);
	},

	_onZoomTransitionEnd: function () {
		if (!this._animatingZoom) { return; }

		if (this._mapPane) {
			__WEBPACK_IMPORTED_MODULE_9__dom_DomUtil__["k" /* removeClass */](this._mapPane, 'leaflet-zoom-anim');
		}

		this._animatingZoom = false;

		this._move(this._animateToCenter, this._animateToZoom);

		// This anim frame should prevent an obscure iOS webkit tile loading race condition.
		__WEBPACK_IMPORTED_MODULE_0__core_Util__["h" /* requestAnimFrame */](function () {
			this._moveEnd(true);
		}, this);
	}
});

// @section

// @factory L.map(id: String, options?: Map options)
// Instantiates a map object given the DOM ID of a `<div>` element
// and optionally an object literal with `Map options`.
//
// @alternative
// @factory L.map(el: HTMLElement, options?: Map options)
// Instantiates a map object given an instance of a `<div>` HTML element
// and optionally an object literal with `Map options`.
function createMap(id, options) {
	return new Map(id, options);
}


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

// depend on jsts for now https://github.com/bjornharrtell/jsts/blob/master/examples/overlay.html
var jsts = __webpack_require__(189);

/**
 * Takes two {@link Polygon|polygons} and finds their intersection. If they share a border, returns the border; if they don't intersect, returns undefined.
 *
 * @name intersect
 * @param {Feature<Polygon>} poly1 the first polygon
 * @param {Feature<Polygon>} poly2 the second polygon
 * @return {(Feature<Polygon>|undefined|Feature<MultiLineString>)} if `poly1` and `poly2` overlap, returns a Polygon feature representing the area they overlap; if `poly1` and `poly2` do not overlap, returns `undefined`; if `poly1` and `poly2` share a border, a MultiLineString of the locations where their borders are shared
 * @example
 * var poly1 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#0f0"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-122.801742, 45.48565],
 *       [-122.801742, 45.60491],
 *       [-122.584762, 45.60491],
 *       [-122.584762, 45.48565],
 *       [-122.801742, 45.48565]
 *     ]]
 *   }
 * }
 * var poly2 = {
 *   "type": "Feature",
 *   "properties": {
 *     "fill": "#00f"
 *   },
 *   "geometry": {
 *     "type": "Polygon",
 *     "coordinates": [[
 *       [-122.520217, 45.535693],
 *       [-122.64038, 45.553967],
 *       [-122.720031, 45.526554],
 *       [-122.669906, 45.507309],
 *       [-122.723464, 45.446643],
 *       [-122.532577, 45.408574],
 *       [-122.487258, 45.477466],
 *       [-122.520217, 45.535693]
 *     ]]
 *   }
 * }
 *
 * var polygons = {
 *   "type": "FeatureCollection",
 *   "features": [poly1, poly2]
 * };
 *
 * var intersection = turf.intersect(poly1, poly2);
 *
 * //=polygons
 *
 * //=intersection
 */
module.exports = function intersect(poly1, poly2) {
    var geom1, geom2;
    if (poly1.type === 'Feature') geom1 = poly1.geometry;
    else geom1 = poly1;
    if (poly2.type === 'Feature') geom2 = poly2.geometry;
    else geom2 = poly2;
    var reader = new jsts.io.GeoJSONReader();
    var a = reader.read(JSON.stringify(geom1));
    var b = reader.read(JSON.stringify(geom2));
    var intersection = a.intersection(b);

    if (intersection.isEmpty()) {
        return undefined;
    }

    var writer = new jsts.io.GeoJSONWriter();

    var geojsonGeometry = writer.write(intersection);
    return {
        type: 'Feature',
        properties: {},
        geometry: geojsonGeometry
    };
};


/***/ }),
/* 202 */
/***/ (function(module, exports) {

/**
 * Takes an array of LinearRings and optionally an {@link Object} with properties and returns a GeoJSON {@link Polygon} feature.
 *
 * @module turf/polygon
 * @category helper
 * @param {Array<Array<Number>>} rings an array of LinearRings
 * @param {Object} properties an optional properties object
 * @return {Polygon} a Polygon feature
 * @throws {Error} throw an error if a LinearRing of the polygon has too few positions
 * or if a LinearRing of the Polygon does not have matching Positions at the
 * beginning & end.
 * @example
 * var polygon = turf.polygon([[
 *  [-2.275543, 53.464547],
 *  [-2.275543, 53.489271],
 *  [-2.215118, 53.489271],
 *  [-2.215118, 53.464547],
 *  [-2.275543, 53.464547]
 * ]], { name: 'poly1', population: 400});
 *
 * //=polygon
 */
module.exports = function(coordinates, properties){

  if (coordinates === null) throw new Error('No coordinates passed');

  for (var i = 0; i < coordinates.length; i++) {
    var ring = coordinates[i];
    for (var j = 0; j < ring[ring.length - 1].length; j++) {
      if (ring.length < 4) {
        throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
      }
      if (ring[ring.length - 1][j] !== ring[0][j]) {
        throw new Error('First and last Position are not equivalent.');
      }
    }
  }

  var polygon = {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": coordinates
    },
    "properties": properties
  };

  if (!polygon.properties) {
    polygon.properties = {};
  }

  return polygon;
};


/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ })
/******/ ]);