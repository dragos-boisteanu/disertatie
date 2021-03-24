(self["webpackChunk"] = self["webpackChunk"] || []).push([["group-products"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/PaginationComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/PaginationComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: {
    data: {
      type: Object,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    query: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentPage: function currentPage() {
      return this.data.current_page;
    },
    lastPage: function lastPage() {
      return this.data.last_page;
    },
    canNext: function canNext() {
      return this.currentPage < this.lastPage;
    },
    canPrevious: function canPrevious() {
      return this.currentPage > this.firstPage;
    },
    nextPage: function nextPage() {
      return this.currentPage + 1;
    },
    previousPage: function previousPage() {
      return this.currentPage - 1;
    }
  },
  data: function data() {
    return {
      firstPage: 1
    };
  },
  methods: {
    goTo: function goTo(page) {
      this.$emit('navigate', page);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StatusComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StatusComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  props: ['deletedAt'],
  computed: {
    status: function status() {
      return this.deletedAt === null ? 'Active' : 'Removed';
    },
    statusClass: function statusClass() {
      return {
        'bg-green-500': this.deletedAt === null,
        'bg-red-500': this.deletedAt !== null
      };
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StockComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StockComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
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
  props: {
    quantity: {
      type: Number,
      required: true
    }
  },
  computed: {
    status: function status() {
      if (this.quantity === 0) {
        return 0;
      }

      if (this.quantity > 0 && this.quantity <= 5) {
        return 1;
      }

      if (this.quantity > 5 && this.quantity <= 15) {
        return 2;
      }

      if (this.quantity > 15) {
        return 3;
      }
    },
    notInStock: function notInStock() {
      return this.status === 0;
    },
    statusClass: function statusClass() {
      switch (this.status) {
        case 0:
          return 'bg-red-600';

        case 1:
          return 'bg-orange-400';

        case 2:
          return 'bg-lightBlue-600';

        case 3:
          return 'bg-green-600';
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BackdropComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../BackdropComponent */ "./resources/js/dashboard/components/BackdropComponent.vue");
//
//
//
//
//
//
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
  components: {
    Backdrop: _BackdropComponent__WEBPACK_IMPORTED_MODULE_0__.default
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _FilterComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FilterComponent */ "./resources/js/dashboard/components/filter/FilterComponent.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);


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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapGetters)('Categories', ['getCategories'])),
  data: function data() {
    return {
      filterData: {
        barcode: '',
        id: '',
        name: '',
        status: '',
        category: '',
        priceStart: '',
        priceEnd: '',
        quantityStart: '',
        quantityEnd: ''
      }
    };
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapActions)('Products', ['fetchProducts'])), {}, {
    callFilter: lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var _this = this;

      var query;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              query = {};
              Object.keys(this.filterData).forEach(function (key) {
                if (_this.filterData[key].length > 0) {
                  query[key] = _this.filterData[key];
                }
              }); // this.$router.replace({name:'Products', query: {...query}});

              _context.next = 5;
              return this.fetchProducts(query);

            case 5:
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    })), 750),
    close: function close() {
      this.$emit('closed');
    }
  }),
  components: {
    FilterComponent: _FilterComponent__WEBPACK_IMPORTED_MODULE_1__.default
  }
});

/***/ }),

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
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _ViewContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ViewContainer */ "./resources/js/dashboard/views/ViewContainer.vue");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);


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



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapGetters)('Categories', ['getCategories'])), (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapGetters)('Units', ['getUnits'])),
  data: function data() {
    return {
      checkingBarcode: false,
      locked: false,
      waiting: false,
      product: {
        barcode: '',
        name: '',
        description: '',
        base_price: '',
        weight: '',
        unit_id: '',
        quantity: '',
        category_id: ''
      }
    };
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapActions)('Products', ['addProduct', 'getProductByBarcode'])), {}, {
    submit: function submit() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var payload;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.waiting = true;
                payload = {};

                if (_this.checkingBarcode) {
                  payload.barcode = _this.product.barcode;
                } else {
                  Object.keys(_this.product).forEach(function (key) {
                    payload[key] = _this.product[key];
                  });
                }

                _context.next = 6;
                return _this.addProduct(payload);

              case 6:
                _this.$refs.observer.reset();

                _this.waiting = false;
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

                if (_context.t0.response.data.errors) {
                  _this.$refs.observer.setErrors(_context.t0.response.data.errors);
                }

                _this.waiting = false;

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }))();
    },
    getProduct: lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              this.checkingBarcode = true;

              if (!(this.$refs.observer.errors['barcode'].length === 0)) {
                _context2.next = 10;
                break;
              }

              _context2.next = 5;
              return this.getProductByBarcode(this.product.barcode);

            case 5:
              response = _context2.sent;

              if (response.data.data) {
                this.product = response.data.data;
                this.locked = true;
              } else {
                this.resetProductData();
                this.locked = false;
              }

              this.checkingBarcode = false;
              _context2.next = 13;
              break;

            case 10:
              this.checkingBarcode = false;
              this.locked = false;
              this.resetProductData();

            case 13:
              _context2.next = 18;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 15]]);
    })), 500),
    resetProductData: function resetProductData() {
      var _this2 = this;

      Object.keys(this.product).forEach(function (key) {
        if (key !== 'barcode') {
          _this2.product[key] = '';
        }
      });
    }
  }),
  components: {
    ViewContainer: _ViewContainer__WEBPACK_IMPORTED_MODULE_1__.default
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ViewContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ViewContainer */ "./resources/js/dashboard/views/ViewContainer.vue");
/* harmony import */ var _components_StatusComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/StatusComponent */ "./resources/js/dashboard/components/StatusComponent.vue");
/* harmony import */ var _components_StockComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/StockComponent */ "./resources/js/dashboard/components/StockComponent.vue");
/* harmony import */ var _components_filter_ProductFilterComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/filter/ProductFilterComponent */ "./resources/js/dashboard/components/filter/ProductFilterComponent.vue");
/* harmony import */ var _components_PaginationComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/PaginationComponent */ "./resources/js/dashboard/components/PaginationComponent.vue");
/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store/index */ "./resources/js/dashboard/store/index.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
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







/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var query;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_store_index__WEBPACK_IMPORTED_MODULE_6__.default.getters["Products/getProducts"].length === 0 && Object.keys(to.query).length === 0)) {
                _context.next = 8;
                break;
              }

              query = {
                page: 1
              };
              console.log("here1");
              _context.next = 5;
              return _store_index__WEBPACK_IMPORTED_MODULE_6__.default.dispatch('Products/fetchProducts', query);

            case 5:
              next();
              _context.next = 17;
              break;

            case 8:
              if (!(Object.keys(to.query).length !== 0)) {
                _context.next = 15;
                break;
              }

              console.log('here2');
              _context.next = 12;
              return _store_index__WEBPACK_IMPORTED_MODULE_6__.default.dispatch('Products/fetchProducts', to.query);

            case 12:
              next();
              _context.next = 17;
              break;

            case 15:
              console.log('here3');
              next();

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_7__.mapGetters)('Categories', ['getCategories'])), (0,vuex__WEBPACK_IMPORTED_MODULE_7__.mapGetters)('Products', ['getProducts', 'getPaginationData'])),
  data: function data() {
    return {
      query: {},
      showFilterState: false,
      orderBy: 1
    };
  },
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_7__.mapActions)('Products', ['fetchProducts', 'sortProductsList'])), {}, {
    refreshProducsList: function refreshProducsList() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this.fetchProducts();

              case 3:
                _this.orderBy = 1;
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }))();
    },
    loadProducts: function loadProducts(page) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        var query;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                query = {
                  page: page
                };
                _context3.next = 4;
                return _this2.fetchProducts(query);

              case 4:
                _context3.next = 9;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 6]]);
      }))();
    },
    toggleFilterState: function toggleFilterState() {
      this.showFilterState = !this.showFilterState;
    },
    order: function order() {
      this.sortProductsList(this.orderBy);
    }
  }),
  components: {
    ViewContainer: _ViewContainer__WEBPACK_IMPORTED_MODULE_1__.default,
    Status: _components_StatusComponent__WEBPACK_IMPORTED_MODULE_2__.default,
    Stock: _components_StockComponent__WEBPACK_IMPORTED_MODULE_3__.default,
    ProductFilter: _components_filter_ProductFilterComponent__WEBPACK_IMPORTED_MODULE_4__.default,
    Pagination: _components_PaginationComponent__WEBPACK_IMPORTED_MODULE_5__.default
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

/***/ "./resources/js/dashboard/components/PaginationComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/dashboard/components/PaginationComponent.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PaginationComponent_vue_vue_type_template_id_33cc70c3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PaginationComponent.vue?vue&type=template&id=33cc70c3& */ "./resources/js/dashboard/components/PaginationComponent.vue?vue&type=template&id=33cc70c3&");
/* harmony import */ var _PaginationComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PaginationComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/PaginationComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _PaginationComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _PaginationComponent_vue_vue_type_template_id_33cc70c3___WEBPACK_IMPORTED_MODULE_0__.render,
  _PaginationComponent_vue_vue_type_template_id_33cc70c3___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/PaginationComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/StatusComponent.vue":
/*!***************************************************************!*\
  !*** ./resources/js/dashboard/components/StatusComponent.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StatusComponent_vue_vue_type_template_id_f9e6092a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StatusComponent.vue?vue&type=template&id=f9e6092a& */ "./resources/js/dashboard/components/StatusComponent.vue?vue&type=template&id=f9e6092a&");
/* harmony import */ var _StatusComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StatusComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/StatusComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _StatusComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _StatusComponent_vue_vue_type_template_id_f9e6092a___WEBPACK_IMPORTED_MODULE_0__.render,
  _StatusComponent_vue_vue_type_template_id_f9e6092a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/StatusComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/StockComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/js/dashboard/components/StockComponent.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StockComponent_vue_vue_type_template_id_3da09777___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StockComponent.vue?vue&type=template&id=3da09777& */ "./resources/js/dashboard/components/StockComponent.vue?vue&type=template&id=3da09777&");
/* harmony import */ var _StockComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StockComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/StockComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _StockComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _StockComponent_vue_vue_type_template_id_3da09777___WEBPACK_IMPORTED_MODULE_0__.render,
  _StockComponent_vue_vue_type_template_id_3da09777___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/StockComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/filter/FilterComponent.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/FilterComponent.vue ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _FilterComponent_vue_vue_type_template_id_19ac00fe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FilterComponent.vue?vue&type=template&id=19ac00fe& */ "./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=template&id=19ac00fe&");
/* harmony import */ var _FilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FilterComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _FilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _FilterComponent_vue_vue_type_template_id_19ac00fe___WEBPACK_IMPORTED_MODULE_0__.render,
  _FilterComponent_vue_vue_type_template_id_19ac00fe___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/filter/FilterComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/filter/ProductFilterComponent.vue":
/*!*****************************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/ProductFilterComponent.vue ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ProductFilterComponent_vue_vue_type_template_id_05624926___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductFilterComponent.vue?vue&type=template&id=05624926& */ "./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=template&id=05624926&");
/* harmony import */ var _ProductFilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductFilterComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ProductFilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ProductFilterComponent_vue_vue_type_template_id_05624926___WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductFilterComponent_vue_vue_type_template_id_05624926___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/filter/ProductFilterComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

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
/* harmony import */ var _ProductsListView_vue_vue_type_template_id_0cb193e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductsListView.vue?vue&type=template&id=0cb193e8& */ "./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=template&id=0cb193e8&");
/* harmony import */ var _ProductsListView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProductsListView.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ProductsListView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ProductsListView_vue_vue_type_template_id_0cb193e8___WEBPACK_IMPORTED_MODULE_0__.render,
  _ProductsListView_vue_vue_type_template_id_0cb193e8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/products/ProductsListView.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/PaginationComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/dashboard/components/PaginationComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaginationComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/PaginationComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/components/StatusComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/dashboard/components/StatusComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./StatusComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StatusComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/components/StockComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/dashboard/components/StockComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./StockComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StockComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StockComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FilterComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductFilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductFilterComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductFilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsListView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductsListView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsListView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/components/PaginationComponent.vue?vue&type=template&id=33cc70c3&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/PaginationComponent.vue?vue&type=template&id=33cc70c3& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationComponent_vue_vue_type_template_id_33cc70c3___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationComponent_vue_vue_type_template_id_33cc70c3___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PaginationComponent_vue_vue_type_template_id_33cc70c3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./PaginationComponent.vue?vue&type=template&id=33cc70c3& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/PaginationComponent.vue?vue&type=template&id=33cc70c3&");


/***/ }),

/***/ "./resources/js/dashboard/components/StatusComponent.vue?vue&type=template&id=f9e6092a&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/dashboard/components/StatusComponent.vue?vue&type=template&id=f9e6092a& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusComponent_vue_vue_type_template_id_f9e6092a___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusComponent_vue_vue_type_template_id_f9e6092a___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StatusComponent_vue_vue_type_template_id_f9e6092a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./StatusComponent.vue?vue&type=template&id=f9e6092a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StatusComponent.vue?vue&type=template&id=f9e6092a&");


/***/ }),

/***/ "./resources/js/dashboard/components/StockComponent.vue?vue&type=template&id=3da09777&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/dashboard/components/StockComponent.vue?vue&type=template&id=3da09777& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockComponent_vue_vue_type_template_id_3da09777___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockComponent_vue_vue_type_template_id_3da09777___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StockComponent_vue_vue_type_template_id_3da09777___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./StockComponent.vue?vue&type=template&id=3da09777& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StockComponent.vue?vue&type=template&id=3da09777&");


/***/ }),

/***/ "./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=template&id=19ac00fe&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=template&id=19ac00fe& ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterComponent_vue_vue_type_template_id_19ac00fe___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterComponent_vue_vue_type_template_id_19ac00fe___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_FilterComponent_vue_vue_type_template_id_19ac00fe___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./FilterComponent.vue?vue&type=template&id=19ac00fe& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=template&id=19ac00fe&");


/***/ }),

/***/ "./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=template&id=05624926&":
/*!************************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=template&id=05624926& ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductFilterComponent_vue_vue_type_template_id_05624926___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductFilterComponent_vue_vue_type_template_id_05624926___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductFilterComponent_vue_vue_type_template_id_05624926___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductFilterComponent.vue?vue&type=template&id=05624926& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=template&id=05624926&");


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

/***/ "./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=template&id=0cb193e8&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=template&id=0cb193e8& ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsListView_vue_vue_type_template_id_0cb193e8___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsListView_vue_vue_type_template_id_0cb193e8___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProductsListView_vue_vue_type_template_id_0cb193e8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ProductsListView.vue?vue&type=template&id=0cb193e8& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=template&id=0cb193e8&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/PaginationComponent.vue?vue&type=template&id=33cc70c3&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/PaginationComponent.vue?vue&type=template&id=33cc70c3& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "mt-4 flex items-center justify-between text-xs" },
    [
      _c(
        "div",
        [
          _c(
            "router-link",
            {
              staticClass:
                "px-2 py-1 border border-gray-400 hover:border-lightBlue-500",
              class: {
                "pointer-events-none": !_vm.canPrevious,
                "border-gray-100": !_vm.canPrevious
              },
              attrs: {
                to: {
                  name: _vm.route,
                  query: Object.assign(
                    {},
                    { page: _vm.previousPage },
                    _vm.query
                  )
                }
              },
              nativeOn: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.goTo(_vm.previousPage)
                }
              }
            },
            [_vm._v("Previous")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "ul",
        { staticClass: "flex items-center gap-x-1" },
        _vm._l(_vm.lastPage, function(page, index) {
          return _c(
            "li",
            { key: index },
            [
              _c(
                "router-link",
                {
                  staticClass:
                    "px-2 py-1 border border-gray-400 hover:border-lightBlue-500 rounded-sm",
                  class: { "border-lightBlue-500": page === _vm.currentPage },
                  attrs: {
                    to: {
                      name: _vm.route,
                      query: Object.assign({}, { page: page }, _vm.query)
                    }
                  },
                  nativeOn: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.goTo(page)
                    }
                  }
                },
                [
                  _vm._v(
                    "\n                    " +
                      _vm._s(page) +
                      "\n                "
                  )
                ]
              )
            ],
            1
          )
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "div",
        [
          _c(
            "router-link",
            {
              staticClass:
                "px-2 py-1 border border-gray-400 hover:border-lightBlue-500",
              class: {
                "pointer-events-none": !_vm.canNext,
                "border-gray-100": !_vm.canNext
              },
              attrs: {
                to: {
                  name: _vm.route,
                  query: Object.assign({}, { page: _vm.nextPage }, _vm.query)
                }
              },
              nativeOn: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.goTo(_vm.nextPage)
                }
              }
            },
            [_vm._v("\n                Next\n            ")]
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StatusComponent.vue?vue&type=template&id=f9e6092a&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StatusComponent.vue?vue&type=template&id=f9e6092a& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "py-1 px-2 text-xs text-white rounded-sm",
      class: _vm.statusClass
    },
    [_vm._v("\n   " + _vm._s(_vm.status) + "                              \n")]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StockComponent.vue?vue&type=template&id=3da09777&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/StockComponent.vue?vue&type=template&id=3da09777& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
      staticClass: "py-1 px-2 text-xs text-white rounded-sm",
      class: _vm.statusClass
    },
    [
      _vm.notInStock
        ? _c("div", [_vm._v("\n        out of stock\n    ")])
        : _c("div", [
            _vm._v("\n        " + _vm._s(_vm.quantity) + " in stock \n    ")
          ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=template&id=19ac00fe&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/FilterComponent.vue?vue&type=template&id=19ac00fe& ***!
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
  return _c("Backdrop", [
    _c(
      "div",
      {
        staticClass:
          "relative h-full w-3/4 shadow-md bg-coolGray-100 md:w-2/4 lg:w-1/4"
      },
      [
        _c(
          "div",
          { staticClass: "absolute top-2 right-2 z-10 cursor-pointer" },
          [_vm._t("close")],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass:
              "w-full py-5 px-5 text-center text-xl border-b border-gray-400"
          },
          [_vm._t("header")],
          2
        ),
        _vm._v(" "),
        _vm._t("default")
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=template&id=05624926&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/ProductFilterComponent.vue?vue&type=template&id=05624926& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
    "FilterComponent",
    [
      _c("template", { slot: "close" }, [
        _c(
          "svg",
          {
            attrs: {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "black",
              width: "24px",
              height: "24px"
            },
            on: { click: _vm.close }
          },
          [
            _c("path", { attrs: { d: "M0 0h24v24H0z", fill: "none" } }),
            _vm._v(" "),
            _c("path", {
              attrs: {
                d:
                  "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              }
            })
          ]
        )
      ]),
      _vm._v(" "),
      _c("template", { slot: "header" }, [
        _vm._v("\n        Products Filter\n    ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "mt-5 px-3" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.filterData.barcode,
              expression: "filterData.barcode"
            }
          ],
          staticClass:
            "w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none",
          attrs: {
            id: "barcode",
            name: "barcode",
            type: "text",
            placeholder: "Barcode"
          },
          domProps: { value: _vm.filterData.barcode },
          on: {
            keyup: _vm.callFilter,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.filterData, "barcode", $event.target.value)
            }
          }
        })
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



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
                        _c("ValidationProvider", {
                          staticClass: "w-full",
                          attrs: { vid: "barcode", rules: "required|barcode" },
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
                                        staticClass: "text-sm font-semibold",
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
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "flex gap-x-1 items-center relative"
                                      },
                                      [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.product.barcode,
                                              expression: "product.barcode"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": failed,
                                            "border-green-500": passed
                                          },
                                          attrs: {
                                            id: "barcode",
                                            name: "barcode",
                                            type: "text",
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.product.barcode
                                          },
                                          on: {
                                            blur: _vm.getProduct,
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.product,
                                                "barcode",
                                                $event.target.value
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "svg",
                                          {
                                            directives: [
                                              {
                                                name: "show",
                                                rawName: "v-show",
                                                value: _vm.checkingBarcode,
                                                expression: "checkingBarcode"
                                              }
                                            ],
                                            staticClass:
                                              "absolute -right-10 top-1/4 animate-spin mr-3 h-5 w-5 text-lightBlue-600",
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
                                      ]
                                    )
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
                          staticClass: "w-full mt-2",
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
                                  var failed = ref.failed
                                  var passed = ref.passed
                                  return [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "text-sm font-semibold",
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
                                        "border-red-600": failed,
                                        "border-green-500": passed
                                      },
                                      attrs: {
                                        id: "firstName",
                                        name: "first name",
                                        type: "text",
                                        disabled: _vm.waiting || _vm.locked
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
                        }),
                        _vm._v(" "),
                        _c("ValidationProvider", {
                          staticClass: "w-full mt-2",
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
                                  var failed = ref.failed
                                  var passed = ref.passed
                                  return [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "text-sm font-semibold",
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
                                        "border-red-600": failed,
                                        "border-green-500": passed
                                      },
                                      attrs: {
                                        id: "description",
                                        name: "description",
                                        type: "text",
                                        disabled: _vm.waiting || _vm.locked
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
                        }),
                        _vm._v(" "),
                        _c("ValidationProvider", {
                          staticClass: "w-full mt-2",
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
                                  var failed = ref.failed
                                  var passed = ref.passed
                                  return [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "text-sm font-semibold",
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
                                            expression: "product.category_id"
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
                                          name: "category",
                                          type: "text",
                                          disabled: _vm.waiting || _vm.locked
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
                                            attrs: { value: "", disabled: "" }
                                          },
                                          [_vm._v("Select category")]
                                        ),
                                        _vm._v(" "),
                                        _vm._l(_vm.getCategories, function(
                                          category
                                        ) {
                                          return _c(
                                            "option",
                                            {
                                              key: category.id,
                                              domProps: { value: category.id }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(category.name) +
                                                  " (" +
                                                  _vm._s(category.vat) +
                                                  "% VAT)"
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
                        }),
                        _vm._v(" "),
                        _c("ValidationProvider", {
                          staticClass: "w-full mt-2",
                          attrs: {
                            vid: "base_price",
                            rules: "required|double:2,comma"
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
                                        staticClass: "text-sm font-semibold",
                                        attrs: { for: "name" }
                                      },
                                      [_vm._v("Base price")]
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
                                          value: _vm.product.base_price,
                                          expression: "product.base_price"
                                        }
                                      ],
                                      staticClass:
                                        "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                      class: {
                                        "border-red-600": failed,
                                        "border-green-500": passed
                                      },
                                      attrs: {
                                        id: "basePrice",
                                        name: "base_price",
                                        type: "text",
                                        disabled: _vm.waiting || _vm.locked
                                      },
                                      domProps: {
                                        value: _vm.product.base_price
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.product,
                                            "base_price",
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
                          staticClass: "w-full mt-2",
                          attrs: { vid: "weight", rules: "required|integer" },
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
                                        staticClass: "text-sm font-semibold",
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
                                        "border-red-600": failed,
                                        "border-green-500": passed
                                      },
                                      attrs: {
                                        id: "weight",
                                        name: "weight",
                                        type: "number",
                                        disabled: _vm.waiting || _vm.locked
                                      },
                                      domProps: { value: _vm.product.weight },
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
                        }),
                        _vm._v(" "),
                        _c("ValidationProvider", {
                          staticClass: "w-full mt-2",
                          attrs: { vid: "unit_id", rules: "required|integer" },
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
                                        staticClass: "text-sm font-semibold",
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
                                          "border-red-600": failed,
                                          "border-green-500": passed
                                        },
                                        attrs: {
                                          id: "unit_id",
                                          name: "weight units",
                                          type: "text",
                                          disabled: _vm.waiting || _vm.locked
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
                                            attrs: { value: "", disabled: "" }
                                          },
                                          [_vm._v("Select unit")]
                                        ),
                                        _vm._v(" "),
                                        _vm._l(_vm.getUnits, function(unit) {
                                          return _c(
                                            "option",
                                            {
                                              key: unit.id,
                                              domProps: { value: unit.id }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(unit.name) +
                                                  " (" +
                                                  _vm._s(unit.description) +
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



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=template&id=0cb193e8&":
/*!******************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/products/ProductsListView.vue?vue&type=template&id=0cb193e8& ***!
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
      _vm.showFilterState
        ? _c("ProductFilter", { on: { closed: _vm.toggleFilterState } })
        : _vm._e(),
      _vm._v(" "),
      _c("template", { slot: "header" }, [
        _vm._v("\n       Products List\n    ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "flex flex-col md:flex-row md:justify-between items-end"
        },
        [
          _c(
            "div",
            {
              staticClass: "w-full md:flex md:flex-row md:gap-3 md:items-center"
            },
            [
              _c(
                "button",
                {
                  staticClass:
                    "w-full py-1 text-base text-white bg-green-600 rounded-sm active:shadow-inner active:bg-green-500 md:w-20",
                  on: { click: _vm.toggleFilterState }
                },
                [_vm._v("\n                Filter\n            ")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass:
                    "w-full py-1 mt-2  text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-20 md:mt-0",
                  on: { click: _vm.refreshProducsList }
                },
                [_vm._v("\n                Refresh\n            ")]
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
                  value: _vm.orderBy,
                  expression: "orderBy"
                }
              ],
              staticClass:
                "w-full p-1 mt-2 text-base border-gray-300 border rounded-sm md:w-auto",
              on: {
                change: [
                  function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.orderBy = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  },
                  _vm.order
                ]
              }
            },
            [
              _c("option", { domProps: { value: 1 } }, [_vm._v("Name asc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 2 } }, [_vm._v("Name desc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 3 } }, [_vm._v("Price asc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 4 } }, [_vm._v("Price desc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 5 } }, [
                _vm._v("Quantity asc")
              ]),
              _vm._v(" "),
              _c("option", { domProps: { value: 6 } }, [
                _vm._v("Quantity desc")
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "ul",
        {
          staticClass:
            "w-full mt-3 border-t border-gray-200 md:flex md:flex-wrap md:justify-between lg:justify-start lg:gap-x-4"
        },
        _vm._l(_vm.getProducts, function(product) {
          return _c(
            "li",
            {
              key: product.id,
              staticClass:
                "w-full p-2 mt-4 rounded text-sm shadow-sm  hover:shadow-md bg-white md:w-49 lg:w-350px xl:w-375px 2xl:w-400px"
            },
            [
              _c("a", [
                _c(
                  "div",
                  {
                    staticClass:
                      "w-full flex justify-start items-center pb-2 border-b border-gray-100"
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "w-12 h-12 mr-4 bg-gray-500 rounded-md" },
                      [
                        _c(
                          "svg",
                          {
                            attrs: {
                              xmlns: "http://www.w3.org/2000/svg",
                              viewBox: "0 0 24 24",
                              fill: "white",
                              width: "48px",
                              height: "48px"
                            }
                          },
                          [
                            _c("path", {
                              attrs: { d: "M0 0h24v24H0z", fill: "none" }
                            }),
                            _c("path", {
                              attrs: {
                                d:
                                  "M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                              }
                            })
                          ]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "flex-1" }, [
                      _c(
                        "div",
                        { staticClass: "capitalize font-semibold text-base" },
                        [
                          _c(
                            "span",
                            { staticClass: "pr-1 border-r border-gray-200" },
                            [_vm._v(_vm._s(product.name))]
                          ),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(
                              _vm._s(product.weight) + _vm._s(product.unit)
                            )
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "text-sm" }, [
                        _vm._v(
                          "\n                           " +
                            _vm._s(product.base_price) +
                            " RON / " +
                            _vm._s(product.vat) +
                            "% VAT\n                        "
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", [
                      _c("div", { staticClass: "text-xs font-semibold" }, [
                        _vm._v(
                          "\n                            #" +
                            _vm._s(product.id) +
                            "\n                        "
                        )
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "mt-2" },
                        [
                          _c("Status", {
                            attrs: { "deleted-at": product.deleted_at }
                          })
                        ],
                        1
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "mt-2" }, [
                  _c(
                    "div",
                    { staticClass: "flex justify-between items-center" },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "py-1 px-2 text-xs text-white rounded-sm bg-amber-600"
                        },
                        [
                          _vm._v(
                            " \n                            " +
                              _vm._s(product.category) +
                              " \n                        "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("Stock", { attrs: { quantity: product.quantity } })
                    ],
                    1
                  )
                ])
              ])
            ]
          )
        }),
        0
      ),
      _vm._v(" "),
      _c("Pagination", {
        attrs: {
          data: _vm.getPaginationData,
          route: "Products",
          query: _vm.query
        },
        on: { navigate: _vm.loadProducts }
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);