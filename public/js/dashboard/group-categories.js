(self["webpackChunk"] = self["webpackChunk"] || []).push([["group-categories"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _ViewContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ViewContainer */ "./resources/js/dashboard/views/ViewContainer.vue");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapGetters)('Categories', ['getCategories'])), {}, {
    showResetSearch: function showResetSearch() {
      return this.searchInput.length > 0;
    }
  }),
  data: function data() {
    return {
      waiting: false,
      categorySelected: false,
      category: {
        name: '',
        vat: '',
        color: ''
      },
      searchInput: ''
    };
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapActions)('Categories', ['searchCategory', 'fetchCategories', 'postCategory', 'patchCategory', 'deleteCategory'])), (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapActions)('Notification', ['openNotification'])), {}, {
    selectCategory: function selectCategory(id) {
      this.category = Object.assign(this.category, lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(this.getCategories, ['id', id]));
      this.categorySelected = true;
    },
    clearSelection: function clearSelection() {
      this.categorySelected = false;
      this.resetForm();
    },
    submit: function submit() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var originalCategory, payload, counter;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.waiting = true;

                _this.$Progress.start();

                if (!_this.categorySelected) {
                  _context.next = 17;
                  break;
                }

                originalCategory = lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(_this.getCategories, ['id', _this.category.id]);
                payload = {
                  vm: _this,
                  category: {
                    id: originalCategory.id
                  }
                };
                counter = 0;
                Object.keys(originalCategory).forEach(function (key) {
                  if (originalCategory[key] !== _this.category[key]) {
                    payload.category[key] = _this.category[key];
                    counter++;
                  }
                });

                if (!(counter > 0)) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return _this.patchCategory(payload);

              case 11:
                _this.openNotification({
                  type: 'ok',
                  show: true,
                  message: 'Category updated'
                });

                _context.next = 15;
                break;

              case 14:
                _this.openNotification({
                  type: 'info',
                  show: true,
                  message: 'Nothing to update'
                });

              case 15:
                _context.next = 21;
                break;

              case 17:
                _context.next = 19;
                return _this.postCategory(_this.category);

              case 19:
                _this.resetForm();

                _this.openNotification({
                  type: 'ok',
                  show: true,
                  message: 'Category added'
                });

              case 21:
                _this.waiting = false;

                _this.$Progress.finish();

                _context.next = 31;
                break;

              case 25:
                _context.prev = 25;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

                _this.$Progress.fail();

                _this.waiting = false;

                if (_context.t0.response.data.errors) {
                  _this.$refs.observer.setErrors(_context.t0.response.data.errors);
                } // notificaiton


              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 25]]);
      }))();
    },
    removeCategory: function removeCategory(id) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                _this2.$Progress.start();

                _context2.next = 4;
                return _this2.deleteCategory(id);

              case 4:
                _this2.$Progress.finish();

                _this2.openNotification({
                  type: 'ok',
                  show: true,
                  message: 'Category deleted'
                });

                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);

                _this2.$Progress.fail();

                console.log(_context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }))();
    },
    refresh: function refresh() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                _this3.$Progress.start();

                _context3.next = 4;
                return _this3.fetchCategories();

              case 4:
                _this3.$Progress.finish();

                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);

                _this3.$Progress.fail();

                console.log(_context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }))();
    },
    search: lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee4() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              this.$Progress.start();

              if (!(this.searchInput.length > 0)) {
                _context4.next = 7;
                break;
              }

              _context4.next = 5;
              return this.searchCategory(this.searchInput);

            case 5:
              _context4.next = 9;
              break;

            case 7:
              _context4.next = 9;
              return this.fetchCategories();

            case 9:
              this.$Progress.finish();
              _context4.next = 16;
              break;

            case 12:
              _context4.prev = 12;
              _context4.t0 = _context4["catch"](0);
              this.$Progress.fail();
              console.log(_context4.t0);

            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 12]]);
    })), 250),
    resetForm: function resetForm() {
      this.$refs.observer.reset();
      this.category = {
        name: '',
        vat: '',
        color: ''
      };
    }
  }),
  components: {
    ViewContainer: _ViewContainer__WEBPACK_IMPORTED_MODULE_1__.default
  }
});

/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./resources/js/dashboard/views/ViewContainer.vue":
/*!********************************************************!*\
  !*** ./resources/js/dashboard/views/ViewContainer.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ViewContainer_vue_vue_type_template_id_3d770bd2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewContainer.vue?vue&type=template&id=3d770bd2& */ "./resources/js/dashboard/views/ViewContainer.vue?vue&type=template&id=3d770bd2&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__.default)(
  script,
  _ViewContainer_vue_vue_type_template_id_3d770bd2___WEBPACK_IMPORTED_MODULE_0__.render,
  _ViewContainer_vue_vue_type_template_id_3d770bd2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/ViewContainer.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/categories/CategoriesView.vue":
/*!********************************************************************!*\
  !*** ./resources/js/dashboard/views/categories/CategoriesView.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CategoriesView_vue_vue_type_template_id_6ea9baea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CategoriesView.vue?vue&type=template&id=6ea9baea& */ "./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=template&id=6ea9baea&");
/* harmony import */ var _CategoriesView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CategoriesView.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _CategoriesView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _CategoriesView_vue_vue_type_template_id_6ea9baea___WEBPACK_IMPORTED_MODULE_0__.render,
  _CategoriesView_vue_vue_type_template_id_6ea9baea___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/categories/CategoriesView.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoriesView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoriesView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoriesView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/views/ViewContainer.vue?vue&type=template&id=3d770bd2&":
/*!***************************************************************************************!*\
  !*** ./resources/js/dashboard/views/ViewContainer.vue?vue&type=template&id=3d770bd2& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewContainer_vue_vue_type_template_id_3d770bd2___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewContainer_vue_vue_type_template_id_3d770bd2___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ViewContainer_vue_vue_type_template_id_3d770bd2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ViewContainer.vue?vue&type=template&id=3d770bd2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ViewContainer.vue?vue&type=template&id=3d770bd2&");


/***/ }),

/***/ "./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=template&id=6ea9baea&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=template&id=6ea9baea& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoriesView_vue_vue_type_template_id_6ea9baea___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoriesView_vue_vue_type_template_id_6ea9baea___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CategoriesView_vue_vue_type_template_id_6ea9baea___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CategoriesView.vue?vue&type=template&id=6ea9baea& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=template&id=6ea9baea&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ViewContainer.vue?vue&type=template&id=3d770bd2&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ViewContainer.vue?vue&type=template&id=3d770bd2& ***!
  \******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "flex flex-col items-stretch justify-items-start flex-1 w-full p-4 pt-0 bg-gray-50 lg:p-4 lg:pt-0"
    },
    [
      _c(
        "h2",
        { staticClass: "text-3xl my-5 text-black font-semibold" },
        [_vm._t("header")],
        2
      ),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=template&id=6ea9baea&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/categories/CategoriesView.vue?vue&type=template&id=6ea9baea& ***!
  \******************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "ViewContainer",
    [
      _c("template", { slot: "header" }, [
        _c(
          "div",
          {
            staticClass:
              "flex items-center justify-between md:justify-start gap-x-4"
          },
          [
            _c("span", [_vm._v("\n                Categories\n            ")]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass:
                  "p-1 bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500",
                on: { click: _vm.refresh }
              },
              [
                _c(
                  "svg",
                  {
                    attrs: {
                      xmlns: "http://www.w3.org/2000/svg",
                      height: "24px",
                      viewBox: "0 0 24 24",
                      width: "24px",
                      fill: "#ffffff"
                    }
                  },
                  [
                    _c("path", {
                      attrs: { d: "M0 0h24v24H0V0z", fill: "none" }
                    }),
                    _c("path", {
                      attrs: {
                        d:
                          "M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                      }
                    })
                  ]
                )
              ]
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "w-full md:flex md:gap-x-4 xl:w-3/4 2xl:w-1/2 " },
        [
          _c(
            "div",
            {
              staticClass:
                "flex flex-col bg-white shadow rounded-sm p-5 md:flex-1"
            },
            [
              _c(
                "div",
                {
                  staticClass:
                    "w-full mb-2 pb-2 border-b flex items-center gap-x-2"
                },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "flex items-center w-full px-2 text-sm rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500"
                    },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.searchInput,
                            expression: "searchInput"
                          }
                        ],
                        staticClass: "flex-1 outline-none py-2",
                        attrs: {
                          name: "search",
                          id: "search",
                          placeholder: "Search category by name"
                        },
                        domProps: { value: _vm.searchInput },
                        on: {
                          input: [
                            function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.searchInput = $event.target.value
                            },
                            _vm.search
                          ]
                        }
                      })
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "ul",
                {
                  staticClass:
                    "px-2 mt-2 overflow-y-auto w-full max-h-80 md:flex-1 md:max-h-96 "
                },
                _vm._l(_vm.getCategories, function(category, index) {
                  return _c(
                    "li",
                    {
                      key: category.id,
                      staticClass:
                        "flex items-center justify-between border rounded-sm py-1 px-2 my-3 mr-2"
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "cursor-pointer flex items-center gap-x-2",
                          on: {
                            click: function($event) {
                              return _vm.selectCategory(category.id)
                            }
                          }
                        },
                        [
                          _c("span", [_vm._v(_vm._s(index + 1) + ".")]),
                          _vm._v(" "),
                          _c("span", {
                            staticClass: "rounded w-4 h-4",
                            style: { background: category.color }
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(category.name))]),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(category.vat) + " %")])
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", [
                        _c(
                          "button",
                          {
                            on: {
                              click: function($event) {
                                return _vm.removeCategory(category.id)
                              }
                            }
                          },
                          [_vm._v(" X")]
                        )
                      ])
                    ]
                  )
                }),
                0
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "mt-4 flex flex-col gap-y-3 bg-white shadow rounded-sm p-5 md:mt-0 lg:flex-1"
            },
            [
              _c("ValidationObserver", {
                ref: "observer",
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(ref) {
                      var handleSubmit = ref.handleSubmit
                      return [
                        _c(
                          "form",
                          {
                            staticClass:
                              "flex flex-col items-stretch justify-items-start gap-y-3 md:flex-auto",
                            on: {
                              submit: function($event) {
                                $event.preventDefault()
                                return handleSubmit(_vm.submit)
                              }
                            }
                          },
                          [
                            _c(
                              "h2",
                              { staticClass: "mb-5 text-xl font-semibold" },
                              [
                                _vm._v(
                                  "\n                        Category\n                    "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("ValidationProvider", {
                              staticClass: "flex-grow flex-shrink-0",
                              attrs: {
                                vid: "name",
                                rules: "required|alpha_spaces|max:50"
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      var failed = ref.failed
                                      var passed = ref.passed
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
                                          },
                                          [_vm._v("Nane")]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "text-xs text-red-600 font-semibold mb-1"
                                          },
                                          [_vm._v(" " + _vm._s(errors[0]))]
                                        ),
                                        _vm._v(" "),
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.category.name,
                                              expression: "category.name"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": failed,
                                            "border-green-500": passed
                                          },
                                          attrs: {
                                            id: "name",
                                            name: "name",
                                            type: "text",
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.category.name
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.category,
                                                "name",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        })
                                      ]
                                    }
                                  }
                                ],
                                null,
                                true
                              )
                            }),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "w-full flex-1 flex items-center gap-x-4"
                              },
                              [
                                _c("ValidationProvider", {
                                  staticClass: "w-full",
                                  attrs: {
                                    vid: "vat",
                                    rules: "required|double:2,dot"
                                  },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function(ref) {
                                          var errors = ref.errors
                                          var failed = ref.failed
                                          var passed = ref.passed
                                          return [
                                            _c(
                                              "label",
                                              {
                                                staticClass:
                                                  "text-sm font-semibold",
                                                attrs: { for: "vat" }
                                              },
                                              [_vm._v("VAT")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "text-xs text-red-600 font-semibold mb-1"
                                              },
                                              [_vm._v(" " + _vm._s(errors[0]))]
                                            ),
                                            _vm._v(" "),
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: _vm.category.vat,
                                                  expression: "category.vat"
                                                }
                                              ],
                                              staticClass:
                                                "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                              class: {
                                                "border-red-600": failed,
                                                "border-green-500": passed
                                              },
                                              attrs: {
                                                id: "vat",
                                                name: "vat",
                                                type: "number",
                                                disabled: _vm.waiting
                                              },
                                              domProps: {
                                                value: _vm.category.vat
                                              },
                                              on: {
                                                input: function($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.$set(
                                                    _vm.category,
                                                    "vat",
                                                    $event.target.value
                                                  )
                                                }
                                              }
                                            })
                                          ]
                                        }
                                      }
                                    ],
                                    null,
                                    true
                                  )
                                }),
                                _vm._v(" "),
                                _c("ValidationProvider", {
                                  staticClass: "flex-grow-0 flex-shrink",
                                  attrs: { vid: "color", rules: "required" },
                                  scopedSlots: _vm._u(
                                    [
                                      {
                                        key: "default",
                                        fn: function(ref) {
                                          var errors = ref.errors
                                          var failed = ref.failed
                                          var passed = ref.passed
                                          return [
                                            _c(
                                              "label",
                                              {
                                                staticClass:
                                                  "text-sm font-semibold",
                                                attrs: { for: "vat" }
                                              },
                                              [_vm._v("Color")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "text-xs text-red-600 font-semibold mb-1"
                                              },
                                              [_vm._v(" " + _vm._s(errors[0]))]
                                            ),
                                            _vm._v(" "),
                                            _c("input", {
                                              directives: [
                                                {
                                                  name: "model",
                                                  rawName: "v-model",
                                                  value: _vm.category.color,
                                                  expression: "category.color"
                                                }
                                              ],
                                              staticClass:
                                                "p-1 rounded border order-gray-300 outline-none",
                                              class: {
                                                "border-red-600": failed,
                                                "border-green-500": passed
                                              },
                                              attrs: {
                                                id: "color",
                                                name: "color",
                                                type: "color",
                                                disabled: _vm.waiting
                                              },
                                              domProps: {
                                                value: _vm.category.color
                                              },
                                              on: {
                                                input: function($event) {
                                                  if ($event.target.composing) {
                                                    return
                                                  }
                                                  _vm.$set(
                                                    _vm.category,
                                                    "color",
                                                    $event.target.value
                                                  )
                                                }
                                              }
                                            })
                                          ]
                                        }
                                      }
                                    ],
                                    null,
                                    true
                                  )
                                })
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c("div", [
                              _vm.categorySelected
                                ? _c(
                                    "button",
                                    {
                                      staticClass:
                                        "mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto",
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.clearSelection($event)
                                        }
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "                       \n                            Clear selection\n                        "
                                      )
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none",
                                  attrs: {
                                    type: "submit",
                                    disabled: _vm.waiting
                                  }
                                },
                                [
                                  _vm.waiting
                                    ? _c(
                                        "svg",
                                        {
                                          staticClass:
                                            "animate-spin mr-3 h-5 w-5 text-white",
                                          attrs: {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            fill: "none",
                                            viewBox: "0 0 24 24"
                                          }
                                        },
                                        [
                                          _c("circle", {
                                            staticClass: "opacity-25",
                                            attrs: {
                                              cx: "12",
                                              cy: "12",
                                              r: "10",
                                              stroke: "currentColor",
                                              "stroke-width": "4"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("path", {
                                            staticClass: "opacity-75",
                                            attrs: {
                                              fill: "currentColor",
                                              d:
                                                "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            }
                                          })
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("span", [
                                    _vm._v(
                                      "\n                                Submit\n                            "
                                    )
                                  ])
                                ]
                              )
                            ])
                          ],
                          1
                        )
                      ]
                    }
                  }
                ])
              })
            ],
            1
          )
        ]
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);