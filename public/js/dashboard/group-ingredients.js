(self["webpackChunk"] = self["webpackChunk"] || []).push([["group-ingredients"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store */ "./resources/js/dashboard/store/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_store__WEBPACK_IMPORTED_MODULE_3__.default.getters["Ingredients/getIngredients"].lenght > 0)) {
                _context.next = 4;
                break;
              }

              next();
              _context.next = 7;
              break;

            case 4:
              _context.next = 6;
              return _store__WEBPACK_IMPORTED_MODULE_3__.default.dispatch('Ingredients/downloadIngredients');

            case 6:
              next();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapGetters)('Ingredients', ['getIngredients'])), (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapGetters)('Units', ['getUnits'])),
  data: function data() {
    return {
      waiting: false,
      ingredientSelected: false,
      ingredient: {
        id: '',
        name: '',
        quantity: '',
        addQuantity: '',
        unit: {
          id: '',
          name: ''
        }
      }
    };
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_4__.mapActions)('Ingredients', ['postIngredient', 'patchIngredient', 'deleteIngredient'])), {}, {
    selectIngredient: function selectIngredient(id) {
      this.ingredientSelected = true;
      this.ingredient = Object.assign(this.ingredient, lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(this.getIngredients, ['id', id]));
    },
    clearSelection: function clearSelection() {
      this.ingredientSelected = false;
      this.resetForm();
    },
    resetForm: function resetForm() {
      this.$refs.observer.reset();
      this.ingredient = {
        id: '',
        name: '',
        quantity: '',
        unit: {
          id: '',
          name: ''
        }
      };
    },
    submit: function submit() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var originalIngredient, payload, counter;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                _this.$Progress.start();

                if (!_this.ingredientSelected) {
                  _context2.next = 15;
                  break;
                }

                originalIngredient = lodash_find__WEBPACK_IMPORTED_MODULE_2___default()(_this.getIngredients, ['id', _this.ingredient.id]);
                payload = {
                  vm: _this,
                  ingredient: {
                    id: _this.ingredient.id
                  }
                };
                counter = 0;
                Object.keys(originalIngredient).forEach(function (key) {
                  if (originalIngredient[key] !== _this.ingredient[key]) {
                    payload.ingredient[key] = _this.ingredient[key];
                    counter++;
                  }
                });

                if (!(counter > 0)) {
                  _context2.next = 12;
                  break;
                }

                _context2.next = 10;
                return _this.patchIngredient(payload);

              case 10:
                _context2.next = 13;
                break;

              case 12:
                console.log('nothing to update');

              case 13:
                _context2.next = 18;
                break;

              case 15:
                _context2.next = 17;
                return _this.postIngredient(_this.ingredient);

              case 17:
                _this.resetForm();

              case 18:
                _this.waiting = false;

                _this.$Progress.finish();

                _context2.next = 28;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](0);

                _this.$Progress.fail();

                _this.waiting = false;
                console.log(_context2.t0);

                if (_context2.t0.response.data.errors) {
                  _this.$refs.observer.setErrors(_context2.t0.response.data.errors);
                }

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 22]]);
      }))();
    },
    removeIngredient: function removeIngredient(id) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                _this2.$Progress.start();

                _context3.next = 4;
                return _this2.deleteIngredient(id);

              case 4:
                _this2.$Progress.finish();

                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);

                _this2.$Progress.fail();

                console.log(_context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
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

/***/ "./resources/js/dashboard/views/ingredients/IngredientsView.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/dashboard/views/ingredients/IngredientsView.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _IngredientsView_vue_vue_type_template_id_5e6367a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IngredientsView.vue?vue&type=template&id=5e6367a0& */ "./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=template&id=5e6367a0&");
/* harmony import */ var _IngredientsView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IngredientsView.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _IngredientsView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _IngredientsView_vue_vue_type_template_id_5e6367a0___WEBPACK_IMPORTED_MODULE_0__.render,
  _IngredientsView_vue_vue_type_template_id_5e6367a0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/ingredients/IngredientsView.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IngredientsView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IngredientsView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IngredientsView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=template&id=5e6367a0&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=template&id=5e6367a0& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IngredientsView_vue_vue_type_template_id_5e6367a0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IngredientsView_vue_vue_type_template_id_5e6367a0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_IngredientsView_vue_vue_type_template_id_5e6367a0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./IngredientsView.vue?vue&type=template&id=5e6367a0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=template&id=5e6367a0&");


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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=template&id=5e6367a0&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/ingredients/IngredientsView.vue?vue&type=template&id=5e6367a0& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
        _vm._v("\n        Ingredients\n    ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "w-full md:flex xl:w-3/4 2xl:w-1/2 " }, [
        _c(
          "ul",
          {
            staticClass:
              "px-2 overflow-y-scroll w-full max-h-80 md:flex-1 md:max-h-96 "
          },
          _vm._l(_vm.getIngredients, function(ingredient, index) {
            return _c(
              "li",
              {
                key: ingredient.id,
                staticClass:
                  "flex items-center justify-between border rounded-sm py-1 px-2 my-3"
              },
              [
                _c(
                  "div",
                  {
                    staticClass: "cursor-pointer flex items-center gap-x-2",
                    on: {
                      click: function($event) {
                        return _vm.selectIngredient(ingredient.id)
                      }
                    }
                  },
                  [
                    _c("span", [_vm._v(_vm._s(index + 1) + ".")]),
                    _vm._v(" "),
                    _c("span", [_vm._v(_vm._s(ingredient.name))]),
                    _vm._v(" "),
                    _c("span", [
                      _vm._v(
                        _vm._s(ingredient.quantity) +
                          " " +
                          _vm._s(ingredient.unit.name)
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("div", [
                  _c(
                    "button",
                    {
                      on: {
                        click: function($event) {
                          return _vm.removeIngredient(ingredient.id)
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
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "mt-5 md:flex-1 md:mt-0" },
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
                          staticClass: "flex flex-col w-full",
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
                            {
                              staticClass:
                                "flex flex-col items-stretch justify-items-start gap-y-3 pt-5 border-t border-gray-200 md:border-l md:pl-5 md:border-t-0 md:pt-0 md:flex-auto"
                            },
                            [
                              _c(
                                "h2",
                                { staticClass: "mb-5 text-xl font-semibold" },
                                [
                                  _vm._v(
                                    "\n                            Ingredient\n                        "
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
                                                value: _vm.ingredient.name,
                                                expression: "ingredient.name"
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
                                              value: _vm.ingredient.name
                                            },
                                            on: {
                                              input: function($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.$set(
                                                  _vm.ingredient,
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
                                    staticClass: "flex-1",
                                    attrs: {
                                      vid: "vat",
                                      rules: "required|integer"
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
                                                [_vm._v("Current cuantity")]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "text-xs text-red-600 font-semibold mb-1"
                                                },
                                                [
                                                  _vm._v(
                                                    " " + _vm._s(errors[0])
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c("input", {
                                                directives: [
                                                  {
                                                    name: "model",
                                                    rawName: "v-model",
                                                    value:
                                                      _vm.ingredient.quantity,
                                                    expression:
                                                      "ingredient.quantity"
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
                                                  disabled:
                                                    _vm.waiting ||
                                                    _vm.ingredientSelected
                                                },
                                                domProps: {
                                                  value: _vm.ingredient.quantity
                                                },
                                                on: {
                                                  input: function($event) {
                                                    if (
                                                      $event.target.composing
                                                    ) {
                                                      return
                                                    }
                                                    _vm.$set(
                                                      _vm.ingredient,
                                                      "quantity",
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
                                  _vm.ingredientSelected
                                    ? _c("ValidationProvider", {
                                        staticClass: "flex-1",
                                        attrs: {
                                          vid: "vat",
                                          rules: "required|integer"
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
                                                    [_vm._v("Add quantity")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "text-xs text-red-600 font-semibold mb-1"
                                                    },
                                                    [
                                                      _vm._v(
                                                        " " + _vm._s(errors[0])
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c("input", {
                                                    directives: [
                                                      {
                                                        name: "model",
                                                        rawName: "v-model",
                                                        value:
                                                          _vm.ingredient
                                                            .addQuantity,
                                                        expression:
                                                          "ingredient.addQuantity"
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
                                                      value:
                                                        _vm.ingredient
                                                          .addQuantity
                                                    },
                                                    on: {
                                                      input: function($event) {
                                                        if (
                                                          $event.target
                                                            .composing
                                                        ) {
                                                          return
                                                        }
                                                        _vm.$set(
                                                          _vm.ingredient,
                                                          "addQuantity",
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
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c("ValidationProvider", {
                                    staticClass: "flex-1",
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
                                                [_vm._v("Unit")]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "text-xs text-red-600 font-semibold mb-1"
                                                },
                                                [
                                                  _vm._v(
                                                    " " + _vm._s(errors[0])
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "select",
                                                {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value:
                                                        _vm.ingredient.unit,
                                                      expression:
                                                        "ingredient.unit"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                                  class: {
                                                    "border-red-600": failed,
                                                    "border-green-500": passed
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
                                                        _vm.ingredient,
                                                        "unit",
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
                                                  _vm._l(_vm.getUnits, function(
                                                    unit
                                                  ) {
                                                    return _c(
                                                      "option",
                                                      {
                                                        key: unit.id,
                                                        domProps: {
                                                          value: unit
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(unit.name) +
                                                            " (" +
                                                            _vm._s(
                                                              unit.description
                                                            ) +
                                                            ")"
                                                        )
                                                      ]
                                                    )
                                                  })
                                                ],
                                                2
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
                              _c("div", [
                                _vm.ingredientSelected
                                  ? _c(
                                      "button",
                                      {
                                        staticClass:
                                          " mb-3 inline-flex items-center justify-center px-2 py-1 w-full text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-auto",
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault()
                                            return _vm.clearSelection($event)
                                          }
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "                       \n                                Clear selection\n                            "
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
                                              xmlns:
                                                "http://www.w3.org/2000/svg",
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
                                        "\n                                    Submit\n                                "
                                      )
                                    ])
                                  ]
                                )
                              ])
                            ],
                            1
                          )
                        ]
                      )
                    ]
                  }
                }
              ])
            })
          ],
          1
        )
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);