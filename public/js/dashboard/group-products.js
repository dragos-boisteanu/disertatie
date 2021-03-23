(self["webpackChunk"] = self["webpackChunk"] || []).push([["group-products"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/AddProductView.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/AddProductView.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _ViewContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ViewContainer */ "./resources/js/dashboard/views/ViewContainer.vue");


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
  data: function data() {
    return {
      waiting: false,
      product: {
        barcode: '',
        name: '',
        description: '',
        unit_price: '',
        vat: '',
        weight: '',
        unit_id: '',
        quantity: ''
      }
    };
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapActions)('Products', ['addProduct', 'getProductByBarcode'])), {}, {
    submit: function submit() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.waiting = true;
                _context.next = 4;
                return _this.addProduct(_this.product);

              case 4:
                _this.waiting = false;
                _context.next = 12;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);

                if (_context.t0.response.data.errors) {
                  _this.$refs.observer.setErrors(_context.t0.response.data.errors);
                }

                _this.waiting = false;
                console.log(_context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }))();
    },
    getProduct: function getProduct() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this2.getProductByBarcode(_this2.product.barcode);

              case 3:
                response = _context2.sent;
                _this2.product = response.data.data;
                console.log(response.data.data);
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }))();
    }
  }),
  components: {
    ViewContainer: _ViewContainer__WEBPACK_IMPORTED_MODULE_1__.default
  }
});

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

/***/ "./resources/js/dashboard/views/products/AddProductView.vue":
/*!******************************************************************!*\
  !*** ./resources/js/dashboard/views/products/AddProductView.vue ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _AddProductView_vue_vue_type_template_id_55e60f14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AddProductView.vue?vue&type=template&id=55e60f14& */ "./resources/js/dashboard/views/products/AddProductView.vue?vue&type=template&id=55e60f14&");
/* harmony import */ var _AddProductView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddProductView.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/products/AddProductView.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _AddProductView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _AddProductView_vue_vue_type_template_id_55e60f14___WEBPACK_IMPORTED_MODULE_0__.render,
  _AddProductView_vue_vue_type_template_id_55e60f14___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/products/AddProductView.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/products/ProductsListView.vue":
/*!********************************************************************!*\
  !*** ./resources/js/dashboard/views/products/ProductsListView.vue ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
var render, staticRenderFns
var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_0__.default)(
  script,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "resources/js/dashboard/views/products/ProductsListView.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/products/AddProductView.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/AddProductView.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddProductView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/AddProductView.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./resources/js/dashboard/views/products/AddProductView.vue?vue&type=template&id=55e60f14&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/AddProductView.vue?vue&type=template&id=55e60f14& ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductView_vue_vue_type_template_id_55e60f14___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductView_vue_vue_type_template_id_55e60f14___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AddProductView_vue_vue_type_template_id_55e60f14___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./AddProductView.vue?vue&type=template&id=55e60f14& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/AddProductView.vue?vue&type=template&id=55e60f14&");


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
    { staticClass: "flex-1 w-full p-4 pt-0 bg-gray-50 lg:p-4 lg:pt-0" },
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/AddProductView.vue?vue&type=template&id=55e60f14&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/AddProductView.vue?vue&type=template&id=55e60f14& ***!
  \****************************************************************************************************************************************************************************************************************************************/
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
        _vm._v("\n        Add new product\n    ")
      ]),
      _vm._v(" "),
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
                    staticClass: "flex flex-col",
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return handleSubmit(_vm.submit)
                      }
                    }
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "flex flex-col lg:gap-x-6 lg:w-1/4" },
                      [
                        _c(
                          "div",
                          { staticClass: "w-full" },
                          [
                            _c("ValidationProvider", {
                              attrs: {
                                vid: "barcode",
                                rules: "required|integer"
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
                                          },
                                          [_vm._v("Barcode")]
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
                                              value: _vm.product.getProduct,
                                              expression: "product.getProduct"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": errors[0]
                                          },
                                          attrs: {
                                            id: "barcode",
                                            name: "barcode",
                                            type: "text",
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.product.getProduct
                                          },
                                          on: {
                                            blur: _vm.findProduct,
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.product,
                                                "getProduct",
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
                        _c(
                          "div",
                          { staticClass: "w-full mt-2" },
                          [
                            _c("ValidationProvider", {
                              attrs: {
                                vid: "name",
                                rules: "required|alpha_spaces|max:255"
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
                                          },
                                          [_vm._v("Name")]
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
                                              value: _vm.product.name,
                                              expression: "product.name"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": errors[0]
                                          },
                                          attrs: {
                                            id: "firstName",
                                            name: "first name",
                                            type: "text",
                                            disabled: _vm.waiting
                                          },
                                          domProps: { value: _vm.product.name },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.product,
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
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "w-full mt-2" },
                          [
                            _c("ValidationProvider", {
                              attrs: {
                                vid: "description",
                                rules: "required|alpha_spaces|max:255"
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
                                          },
                                          [_vm._v("Description")]
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
                                              value: _vm.product.description,
                                              expression: "product.description"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": errors[0]
                                          },
                                          attrs: {
                                            id: "description",
                                            name: "description",
                                            type: "text",
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.product.description
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.product,
                                                "description",
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
                        _c(
                          "div",
                          { staticClass: "w-full mt-2" },
                          [
                            _c("ValidationProvider", {
                              attrs: {
                                vid: "category_id",
                                rules: "required|integer"
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
                                          },
                                          [_vm._v("Category")]
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
                                        _c(
                                          "select",
                                          {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.product.category_id,
                                                expression:
                                                  "product.category_id"
                                              }
                                            ],
                                            staticClass:
                                              "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                            class: {
                                              "border-red-600": errors[0]
                                            },
                                            attrs: {
                                              id: "unit_id",
                                              name: "category",
                                              type: "text",
                                              disabled: _vm.waiting
                                            },
                                            on: {
                                              change: function($event) {
                                                var $$selectedVal = Array.prototype.filter
                                                  .call(
                                                    $event.target.options,
                                                    function(o) {
                                                      return o.selected
                                                    }
                                                  )
                                                  .map(function(o) {
                                                    var val =
                                                      "_value" in o
                                                        ? o._value
                                                        : o.value
                                                    return val
                                                  })
                                                _vm.$set(
                                                  _vm.product,
                                                  "category_id",
                                                  $event.target.multiple
                                                    ? $$selectedVal
                                                    : $$selectedVal[0]
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "option",
                                              {
                                                attrs: {
                                                  value: "",
                                                  disabled: ""
                                                }
                                              },
                                              [_vm._v("Select category")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "option",
                                              { attrs: { value: "1" } },
                                              [_vm._v("cat1")]
                                            )
                                          ]
                                        )
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
                        _c(
                          "div",
                          { staticClass: "w-full mt-2" },
                          [
                            _c("ValidationProvider", {
                              attrs: { vid: "price", rules: "required" },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
                                          },
                                          [_vm._v("Price")]
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
                                              value: _vm.product.unit_price,
                                              expression: "product.unit_price"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": errors[0]
                                          },
                                          attrs: {
                                            id: "unitPrice",
                                            name: "price",
                                            type: "number",
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.product.unit_price
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.product,
                                                "unit_price",
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
                        _c(
                          "div",
                          { staticClass: "w-full mt-2" },
                          [
                            _c("ValidationProvider", {
                              attrs: {
                                vid: "data.product.vat",
                                rules: "required|digits:2"
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
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
                                              value: _vm.product.vat,
                                              expression: "product.vat"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": errors[0]
                                          },
                                          attrs: {
                                            id: "vat",
                                            name: "vat",
                                            type: "number",
                                            disabled: _vm.waiting
                                          },
                                          domProps: { value: _vm.product.vat },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.product,
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
                            })
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "w-full mt-2" },
                          [
                            _c("ValidationProvider", {
                              attrs: {
                                vid: "data.product.weight",
                                rules: "integer"
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
                                          },
                                          [_vm._v("Weight")]
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
                                              value: _vm.product.weight,
                                              expression: "product.weight"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": errors[0]
                                          },
                                          attrs: {
                                            id: "weight",
                                            name: "weight",
                                            type: "number",
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.product.weight
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.product,
                                                "weight",
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
                        _c(
                          "div",
                          { staticClass: "w-full mt-2" },
                          [
                            _c("ValidationProvider", {
                              attrs: {
                                vid: "unit_id",
                                rules: "required|integer"
                              },
                              scopedSlots: _vm._u(
                                [
                                  {
                                    key: "default",
                                    fn: function(ref) {
                                      var errors = ref.errors
                                      return [
                                        _c(
                                          "label",
                                          {
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "name" }
                                          },
                                          [_vm._v("Weight units")]
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
                                        _c(
                                          "select",
                                          {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.product.unit_id,
                                                expression: "product.unit_id"
                                              }
                                            ],
                                            staticClass:
                                              "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                            class: {
                                              "border-red-600": errors[0]
                                            },
                                            attrs: {
                                              id: "unit_id",
                                              name: "weight units",
                                              type: "text",
                                              disabled: _vm.waiting
                                            },
                                            on: {
                                              change: function($event) {
                                                var $$selectedVal = Array.prototype.filter
                                                  .call(
                                                    $event.target.options,
                                                    function(o) {
                                                      return o.selected
                                                    }
                                                  )
                                                  .map(function(o) {
                                                    var val =
                                                      "_value" in o
                                                        ? o._value
                                                        : o.value
                                                    return val
                                                  })
                                                _vm.$set(
                                                  _vm.product,
                                                  "unit_id",
                                                  $event.target.multiple
                                                    ? $$selectedVal
                                                    : $$selectedVal[0]
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _c(
                                              "option",
                                              {
                                                attrs: {
                                                  value: "",
                                                  disabled: ""
                                                }
                                              },
                                              [_vm._v("Select unit")]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "option",
                                              { attrs: { value: "1" } },
                                              [_vm._v("grams")]
                                            )
                                          ]
                                        )
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
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "mt-3 flex md:justify-start" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-auto disabled:bg-gray-500 disabled:pointer-events-none",
                          attrs: { type: "submit", disabled: _vm.waiting }
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
                              "\n                        Submit\n                    "
                            )
                          ])
                        ]
                      )
                    ])
                  ]
                )
              ]
            }
          }
        ])
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);