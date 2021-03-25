(self["webpackChunk"] = self["webpackChunk"] || []).push([["group-users"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/ModalComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/ModalComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BackdropComponent_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackdropComponent.vue */ "./resources/js/dashboard/components/BackdropComponent.vue");
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
    Backdrop: _BackdropComponent_vue__WEBPACK_IMPORTED_MODULE_0__.default
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _FilterComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FilterComponent */ "./resources/js/dashboard/components/filter/FilterComponent.vue");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mounted: function mounted() {
    var _this = this;

    var routerQuery = this.$route.query;
    Object.keys(routerQuery).forEach(function (key) {
      if (routerQuery[key].length > 0) {
        if (key === 'roles') {
          var _this$filterData$key;

          _this.filterData[key] = [];

          (_this$filterData$key = _this.filterData[key]).push.apply(_this$filterData$key, _toConsumableArray(routerQuery[key]));
        } else {
          _this.filterData[key] = routerQuery[key];
        }
      }
    });
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapGetters)('Users', ['getNextPage'])), (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapGetters)('Roles', ['getRoles'])),
  data: function data() {
    return {
      filterData: {
        id: '',
        firstName: '',
        name: '',
        roles: [],
        email: '',
        phoneNumber: '',
        verified: '',
        fromDate: '',
        toDate: ''
      }
    };
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapActions)('Users', ['fetchFilteredUsers', 'fetchUsers', 'reset'])), (0,vuex__WEBPACK_IMPORTED_MODULE_3__.mapActions)('Notification', ['openNotification'])), {}, {
    callFilter: lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var _this2 = this;

      var query;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              query = {};
              Object.keys(this.filterData).forEach(function (key) {
                if (_this2.filterData[key].length > 0) {
                  query[key] = _this2.filterData[key];
                }
              });
              query['page'] = 1;
              this.$router.replace({
                name: 'Users',
                query: _objectSpread({}, query)
              });
              this.reset();
              _context.next = 8;
              return this.fetchUsers(query);

            case 8:
              this.openNotification({
                type: 'ok',
                message: 'Done',
                show: true
              });
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              this.openNotification({
                type: 'err',
                message: _context.t0,
                show: true
              });
              console.log(_context.t0);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 11]]);
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

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ModalComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ModalComponent */ "./resources/js/dashboard/components/ModalComponent.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


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


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  mounted: function mounted() {
    Object.assign(this.localUser, this.user);
  },
  data: function data() {
    return {
      waiting: false,
      localUser: {}
    };
  },
  computed: _objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)('Roles', ['getRoles'])),
  methods: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapActions)('Users', ['updateUser'])), {}, {
    update: function update() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
        var payload, counter;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.waiting = true;
                payload = {
                  vm: _this,
                  user: {
                    id: _this.user.id
                  }
                };
                counter = 0;
                Object.keys(_this.user).forEach(function (key) {
                  if (_this.localUser[key] != _this.user[key]) {
                    payload.user[key] = _this.localUser[key];
                    counter++;
                  }
                });

                if (!(counter > 0)) {
                  _context.next = 13;
                  break;
                }

                _context.next = 8;
                return _this.updateUser(payload);

              case 8:
                _this.$emit('updated', payload.user);

                counter = 0;

                _this.close();

                _context.next = 14;
                break;

              case 13:
                console.log('Change soemthing before updating the user data.');

              case 14:
                _this.waiting = false;
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 17]]);
      }))();
    },
    close: function close() {
      this.$emit('close');
    }
  }),
  components: {
    Modal: _ModalComponent__WEBPACK_IMPORTED_MODULE_1__.default
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    roleId: {
      type: Number,
      required: true
    }
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_0__.mapGetters)('Roles', ['getRoles'])), {}, {
    role: function role() {
      var _this = this;

      return this.getRoles.filter(function (role) {
        return role.id === _this.roleId;
      })[0];
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  computed: _objectSpread(_objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)('Counties', ['getCounties'])), (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapGetters)('Roles', ['getRoles'])), {}, {
    citiesSelectState: function citiesSelectState() {
      return this.address.county_id ? false : true;
    }
  }),
  data: function data() {
    return {
      waiting: false,
      counties: [],
      cities: [],
      addressState: false,
      user: {
        first_name: '',
        name: '',
        email: '',
        phone_number: '',
        birthdate: '',
        role_id: 1
      },
      address: {
        first_name: '',
        name: '',
        phone_number: '',
        county_id: '',
        city_id: '',
        address: ''
      }
    };
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapActions)('Users', ['addUser'])), (0,vuex__WEBPACK_IMPORTED_MODULE_2__.mapActions)('Counties', ['fetchCitites'])), {}, {
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
                payload = {
                  user: _this.user
                };

                if (_this.addressState) {
                  payload.address = _this.address;
                }

                _context.next = 6;
                return _this.addUser(payload);

              case 6:
                _this.restForm();

                _this.waiting = false;
                _context.next = 15;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);

                if (_context.t0.response.data.errors) {
                  _this.$refs.observer.setErrors(_context.t0.response.data.errors);
                }

                console.log(_context.t0);
                _this.waiting = false;

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }))();
    },
    getCitites: function getCitites() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this2.fetchCitites(_this2.address.county_id);

              case 3:
                _this2.cities = _context2.sent;
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
    restForm: function restForm() {
      this.$refs.observer.reset();
      this.cities = [];
      this.user = {
        first_name: '',
        name: '',
        email: '',
        phone_number: '',
        birthdate: '',
        role_id: 1
      };
      this.address = {
        state: false,
        first_name: '',
        name: '',
        phone_number: '',
        county_id: '',
        city_id: '',
        address: ''
      };
    },
    toggleAddressState: function toggleAddressState() {
      if (this.addressState) {
        this.address = {
          first_name: '',
          name: '',
          phone_number: '',
          county_id: '',
          city_id: '',
          address: ''
        };
      }

      this.addressState = !this.addressState;
    }
  }),
  components: {
    ViewContainer: _ViewContainer__WEBPACK_IMPORTED_MODULE_1__.default
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UserView.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UserView.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/index */ "./resources/js/dashboard/store/index.js");
/* harmony import */ var _ViewContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ViewContainer */ "./resources/js/dashboard/views/ViewContainer.vue");
/* harmony import */ var _components_StatusComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/StatusComponent */ "./resources/js/dashboard/components/StatusComponent.vue");
/* harmony import */ var _components_users_RoleComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/users/RoleComponent */ "./resources/js/dashboard/components/users/RoleComponent.vue");
/* harmony import */ var _components_users_EditUserComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/users/EditUserComponent */ "./resources/js/dashboard/components/users/EditUserComponent.vue");


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





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var id, user, _user;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = to.params.id;

              if (!(_store_index__WEBPACK_IMPORTED_MODULE_1__.default.getters["Users/getUsers"].length > 0)) {
                _context.next = 13;
                break;
              }

              _context.next = 5;
              return _store_index__WEBPACK_IMPORTED_MODULE_1__.default.dispatch('Users/getUser', id);

            case 5:
              user = _context.sent;

              if (user) {
                _context.next = 10;
                break;
              }

              _context.next = 9;
              return _store_index__WEBPACK_IMPORTED_MODULE_1__.default.dispatch('Users/fetchUser', id);

            case 9:
              user = _context.sent;

            case 10:
              next(function (vm) {
                return vm.setUser(user);
              });
              _context.next = 17;
              break;

            case 13:
              _context.next = 15;
              return _store_index__WEBPACK_IMPORTED_MODULE_1__.default.dispatch('Users/fetchUser', id);

            case 15:
              _user = _context.sent;
              next(function (vm) {
                return vm.setUser(_user);
              });

            case 17:
              _context.next = 22;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 19]]);
    }))();
  },
  data: function data() {
    return {
      editUserState: false,
      user: null
    };
  },
  methods: {
    updateUser: function updateUser(patchedUser) {
      var _this = this;

      Object.keys(patchedUser).forEach(function (key) {
        _this.user[key] = patchedUser[key];
      });
    },
    toggleEditUserState: function toggleEditUserState() {
      this.editUserState = !this.editUserState;
    },
    setUser: function setUser(user) {
      this.user = user;
    }
  },
  components: {
    ViewContainer: _ViewContainer__WEBPACK_IMPORTED_MODULE_2__.default,
    Status: _components_StatusComponent__WEBPACK_IMPORTED_MODULE_3__.default,
    Role: _components_users_RoleComponent__WEBPACK_IMPORTED_MODULE_4__.default,
    EditUser: _components_users_EditUserComponent__WEBPACK_IMPORTED_MODULE_5__.default
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UsersListView.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UsersListView.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../store/index */ "./resources/js/dashboard/store/index.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _ViewContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ViewContainer */ "./resources/js/dashboard/views/ViewContainer.vue");
/* harmony import */ var _components_StatusComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/StatusComponent */ "./resources/js/dashboard/components/StatusComponent.vue");
/* harmony import */ var _components_users_RoleComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/users/RoleComponent */ "./resources/js/dashboard/components/users/RoleComponent.vue");
/* harmony import */ var _components_filter_UsersFilterComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/filter/UsersFilterComponent */ "./resources/js/dashboard/components/filter/UsersFilterComponent.vue");
/* harmony import */ var _components_cards_CardsListComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/cards/CardsListComponent */ "./resources/js/dashboard/components/cards/CardsListComponent.vue");
/* harmony import */ var _components_cards_CardComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/cards/CardComponent */ "./resources/js/dashboard/components/cards/CardComponent.vue");
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








/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      var query;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_store_index__WEBPACK_IMPORTED_MODULE_1__.default.getters["Users/getUsers"].length === 0 || Object.keys(to.query).length === 0)) {
                _context.next = 9;
                break;
              }

              _store_index__WEBPACK_IMPORTED_MODULE_1__.default.dispatch('Users/reset');
              query = to.query;
              query.page = 1;
              _context.next = 6;
              return _store_index__WEBPACK_IMPORTED_MODULE_1__.default.dispatch('Users/fetchUsers', query);

            case 6:
              next();
              _context.next = 10;
              break;

            case 9:
              next();

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  mounted: function mounted() {
    if (this.$route.query.orderBy) {
      this.orderBy = this.$route.query.orderBy;
    } else {
      this.orderBy = 14;
    }

    this.order();
  },
  computed: _objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_8__.mapGetters)('Users', ['getUsers', 'getNextPage'])), {}, {
    showMoreState: function showMoreState() {
      console.log(this.getNextPage);
      return this.getNextPage;
    }
  }),
  data: function data() {
    return {
      showFilterState: false,
      orderBy: 0
    };
  },
  methods: _objectSpread(_objectSpread(_objectSpread({}, (0,vuex__WEBPACK_IMPORTED_MODULE_8__.mapActions)('Users', ['refreshUsers', 'fetchUsers', 'sortUsersList'])), (0,vuex__WEBPACK_IMPORTED_MODULE_8__.mapActions)('Notification', ['openNotification'])), {}, {
    loadMoreUsers: function loadMoreUsers() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var query;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                query = _this.$route.query;
                query.page = _this.getNextPage, query.orderBy = _this.orderBy;
                _context2.next = 5;
                return _this.fetchUsers(query);

              case 5:
                _this.order();

                _this.openNotification({
                  type: 'ok',
                  message: 'Done',
                  show: true
                });

                _context2.next = 12;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }))();
    },
    refreshUsersList: function refreshUsersList() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                if (Object.keys(_this2.$route.query).length > 0) {
                  _this2.$router.replace({
                    name: 'Users',
                    query: {}
                  });
                }

                _context3.next = 4;
                return _this2.refreshUsers();

              case 4:
                _this2.orderBy = 14;

                _this2.openNotification({
                  type: 'ok',
                  message: 'Refresh complete',
                  show: true
                });

                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }))();
    },
    order: function order() {
      this.sortUsersList(this.orderBy);
    },
    toggleFilterState: function toggleFilterState() {
      this.showFilterState = !this.showFilterState;
    }
  }),
  components: {
    ViewContainer: _ViewContainer__WEBPACK_IMPORTED_MODULE_2__.default,
    Status: _components_StatusComponent__WEBPACK_IMPORTED_MODULE_3__.default,
    Role: _components_users_RoleComponent__WEBPACK_IMPORTED_MODULE_4__.default,
    UsersFilter: _components_filter_UsersFilterComponent__WEBPACK_IMPORTED_MODULE_5__.default,
    CardsList: _components_cards_CardsListComponent__WEBPACK_IMPORTED_MODULE_6__.default,
    Card: _components_cards_CardComponent__WEBPACK_IMPORTED_MODULE_7__.default
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

/***/ "./resources/js/dashboard/components/ModalComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/js/dashboard/components/ModalComponent.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ModalComponent_vue_vue_type_template_id_e8733d80___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModalComponent.vue?vue&type=template&id=e8733d80& */ "./resources/js/dashboard/components/ModalComponent.vue?vue&type=template&id=e8733d80&");
/* harmony import */ var _ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModalComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/ModalComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _ModalComponent_vue_vue_type_template_id_e8733d80___WEBPACK_IMPORTED_MODULE_0__.render,
  _ModalComponent_vue_vue_type_template_id_e8733d80___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/ModalComponent.vue"
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

/***/ "./resources/js/dashboard/components/cards/CardComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/dashboard/components/cards/CardComponent.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CardComponent_vue_vue_type_template_id_178fdd61___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardComponent.vue?vue&type=template&id=178fdd61& */ "./resources/js/dashboard/components/cards/CardComponent.vue?vue&type=template&id=178fdd61&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__.default)(
  script,
  _CardComponent_vue_vue_type_template_id_178fdd61___WEBPACK_IMPORTED_MODULE_0__.render,
  _CardComponent_vue_vue_type_template_id_178fdd61___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/cards/CardComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/cards/CardsListComponent.vue":
/*!************************************************************************!*\
  !*** ./resources/js/dashboard/components/cards/CardsListComponent.vue ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CardsListComponent_vue_vue_type_template_id_5075e810___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CardsListComponent.vue?vue&type=template&id=5075e810& */ "./resources/js/dashboard/components/cards/CardsListComponent.vue?vue&type=template&id=5075e810&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");

var script = {}


/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__.default)(
  script,
  _CardsListComponent_vue_vue_type_template_id_5075e810___WEBPACK_IMPORTED_MODULE_0__.render,
  _CardsListComponent_vue_vue_type_template_id_5075e810___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/cards/CardsListComponent.vue"
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

/***/ "./resources/js/dashboard/components/filter/UsersFilterComponent.vue":
/*!***************************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/UsersFilterComponent.vue ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UsersFilterComponent_vue_vue_type_template_id_2c7ff574___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersFilterComponent.vue?vue&type=template&id=2c7ff574& */ "./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=template&id=2c7ff574&");
/* harmony import */ var _UsersFilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersFilterComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _UsersFilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _UsersFilterComponent_vue_vue_type_template_id_2c7ff574___WEBPACK_IMPORTED_MODULE_0__.render,
  _UsersFilterComponent_vue_vue_type_template_id_2c7ff574___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/filter/UsersFilterComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/users/EditUserComponent.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/dashboard/components/users/EditUserComponent.vue ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _EditUserComponent_vue_vue_type_template_id_4526ea81___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditUserComponent.vue?vue&type=template&id=4526ea81& */ "./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=template&id=4526ea81&");
/* harmony import */ var _EditUserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditUserComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _EditUserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _EditUserComponent_vue_vue_type_template_id_4526ea81___WEBPACK_IMPORTED_MODULE_0__.render,
  _EditUserComponent_vue_vue_type_template_id_4526ea81___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/users/EditUserComponent.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/users/RoleComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/dashboard/components/users/RoleComponent.vue ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RoleComponent_vue_vue_type_template_id_bb9f15c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RoleComponent.vue?vue&type=template&id=bb9f15c0& */ "./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=template&id=bb9f15c0&");
/* harmony import */ var _RoleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoleComponent.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _RoleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _RoleComponent_vue_vue_type_template_id_bb9f15c0___WEBPACK_IMPORTED_MODULE_0__.render,
  _RoleComponent_vue_vue_type_template_id_bb9f15c0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/components/users/RoleComponent.vue"
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

/***/ "./resources/js/dashboard/views/users/CreateUserView.vue":
/*!***************************************************************!*\
  !*** ./resources/js/dashboard/views/users/CreateUserView.vue ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreateUserView_vue_vue_type_template_id_0a0b308d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateUserView.vue?vue&type=template&id=0a0b308d& */ "./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=template&id=0a0b308d&");
/* harmony import */ var _CreateUserView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateUserView.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _CreateUserView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _CreateUserView_vue_vue_type_template_id_0a0b308d___WEBPACK_IMPORTED_MODULE_0__.render,
  _CreateUserView_vue_vue_type_template_id_0a0b308d___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/users/CreateUserView.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/users/UserView.vue":
/*!*********************************************************!*\
  !*** ./resources/js/dashboard/views/users/UserView.vue ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UserView_vue_vue_type_template_id_13c42031___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UserView.vue?vue&type=template&id=13c42031& */ "./resources/js/dashboard/views/users/UserView.vue?vue&type=template&id=13c42031&");
/* harmony import */ var _UserView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserView.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/users/UserView.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _UserView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _UserView_vue_vue_type_template_id_13c42031___WEBPACK_IMPORTED_MODULE_0__.render,
  _UserView_vue_vue_type_template_id_13c42031___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/users/UserView.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/views/users/UsersListView.vue":
/*!**************************************************************!*\
  !*** ./resources/js/dashboard/views/users/UsersListView.vue ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _UsersListView_vue_vue_type_template_id_57fbf4ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersListView.vue?vue&type=template&id=57fbf4ba& */ "./resources/js/dashboard/views/users/UsersListView.vue?vue&type=template&id=57fbf4ba&");
/* harmony import */ var _UsersListView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersListView.vue?vue&type=script&lang=js& */ "./resources/js/dashboard/views/users/UsersListView.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(
  _UsersListView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,
  _UsersListView_vue_vue_type_template_id_57fbf4ba___WEBPACK_IMPORTED_MODULE_0__.render,
  _UsersListView_vue_vue_type_template_id_57fbf4ba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/dashboard/views/users/UsersListView.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/dashboard/components/ModalComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/dashboard/components/ModalComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModalComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/ModalComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

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

/***/ "./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersFilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UsersFilterComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersFilterComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditUserComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RoleComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateUserView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CreateUserView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateUserView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/views/users/UserView.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/dashboard/views/users/UserView.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UserView.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/views/users/UsersListView.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/dashboard/views/users/UsersListView.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersListView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UsersListView.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UsersListView.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersListView_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default); 

/***/ }),

/***/ "./resources/js/dashboard/components/ModalComponent.vue?vue&type=template&id=e8733d80&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/dashboard/components/ModalComponent.vue?vue&type=template&id=e8733d80& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_e8733d80___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_e8733d80___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalComponent_vue_vue_type_template_id_e8733d80___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./ModalComponent.vue?vue&type=template&id=e8733d80& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/ModalComponent.vue?vue&type=template&id=e8733d80&");


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

/***/ "./resources/js/dashboard/components/cards/CardComponent.vue?vue&type=template&id=178fdd61&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/cards/CardComponent.vue?vue&type=template&id=178fdd61& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComponent_vue_vue_type_template_id_178fdd61___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComponent_vue_vue_type_template_id_178fdd61___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CardComponent_vue_vue_type_template_id_178fdd61___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardComponent.vue?vue&type=template&id=178fdd61& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/cards/CardComponent.vue?vue&type=template&id=178fdd61&");


/***/ }),

/***/ "./resources/js/dashboard/components/cards/CardsListComponent.vue?vue&type=template&id=5075e810&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/cards/CardsListComponent.vue?vue&type=template&id=5075e810& ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CardsListComponent_vue_vue_type_template_id_5075e810___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CardsListComponent_vue_vue_type_template_id_5075e810___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CardsListComponent_vue_vue_type_template_id_5075e810___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CardsListComponent.vue?vue&type=template&id=5075e810& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/cards/CardsListComponent.vue?vue&type=template&id=5075e810&");


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

/***/ "./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=template&id=2c7ff574&":
/*!**********************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=template&id=2c7ff574& ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersFilterComponent_vue_vue_type_template_id_2c7ff574___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersFilterComponent_vue_vue_type_template_id_2c7ff574___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersFilterComponent_vue_vue_type_template_id_2c7ff574___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UsersFilterComponent.vue?vue&type=template&id=2c7ff574& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=template&id=2c7ff574&");


/***/ }),

/***/ "./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=template&id=4526ea81&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=template&id=4526ea81& ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_template_id_4526ea81___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_template_id_4526ea81___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_EditUserComponent_vue_vue_type_template_id_4526ea81___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./EditUserComponent.vue?vue&type=template&id=4526ea81& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=template&id=4526ea81&");


/***/ }),

/***/ "./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=template&id=bb9f15c0&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=template&id=bb9f15c0& ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_template_id_bb9f15c0___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_template_id_bb9f15c0___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RoleComponent_vue_vue_type_template_id_bb9f15c0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./RoleComponent.vue?vue&type=template&id=bb9f15c0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=template&id=bb9f15c0&");


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

/***/ "./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=template&id=0a0b308d&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=template&id=0a0b308d& ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateUserView_vue_vue_type_template_id_0a0b308d___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateUserView_vue_vue_type_template_id_0a0b308d___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_CreateUserView_vue_vue_type_template_id_0a0b308d___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./CreateUserView.vue?vue&type=template&id=0a0b308d& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=template&id=0a0b308d&");


/***/ }),

/***/ "./resources/js/dashboard/views/users/UserView.vue?vue&type=template&id=13c42031&":
/*!****************************************************************************************!*\
  !*** ./resources/js/dashboard/views/users/UserView.vue?vue&type=template&id=13c42031& ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserView_vue_vue_type_template_id_13c42031___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserView_vue_vue_type_template_id_13c42031___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UserView_vue_vue_type_template_id_13c42031___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UserView.vue?vue&type=template&id=13c42031& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UserView.vue?vue&type=template&id=13c42031&");


/***/ }),

/***/ "./resources/js/dashboard/views/users/UsersListView.vue?vue&type=template&id=57fbf4ba&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/dashboard/views/users/UsersListView.vue?vue&type=template&id=57fbf4ba& ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersListView_vue_vue_type_template_id_57fbf4ba___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersListView_vue_vue_type_template_id_57fbf4ba___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersListView_vue_vue_type_template_id_57fbf4ba___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./UsersListView.vue?vue&type=template&id=57fbf4ba& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UsersListView.vue?vue&type=template&id=57fbf4ba&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/ModalComponent.vue?vue&type=template&id=e8733d80&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/ModalComponent.vue?vue&type=template&id=e8733d80& ***!
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
  return _c("Backdrop", { staticClass: "flex justify-center items-center" }, [
    _c(
      "div",
      { staticClass: "bg-white p-4 rounded-md w-11/12 shadow-md" },
      [_vm._t("default")],
      2
    )
  ])
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/cards/CardComponent.vue?vue&type=template&id=178fdd61&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/cards/CardComponent.vue?vue&type=template&id=178fdd61& ***!
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
    "li",
    {
      staticClass:
        "w-full p-2 mt-4 rounded text-sm shadow-sm hover:shadow-md bg-white md:w-49 lg:w-350px xl:w-375px 2xl:w-400px"
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/cards/CardsListComponent.vue?vue&type=template&id=5075e810&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/cards/CardsListComponent.vue?vue&type=template&id=5075e810& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "h-full" }, [
    _c(
      "ul",
      {
        staticClass:
          "h-full w-full mt-3 border-t border-gray-200 md:h-auto md:flex md:flex-wrap md:items-start md:gap-x-2 lg:gap-x-4"
      },
      [_vm._t("default")],
      2
    )
  ])
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
          "relative h-full w-3/4 shadow-md bg-coolGray-100 md:w-2/4 lg:w-1/4 xl:1/5"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=template&id=2c7ff574&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/filter/UsersFilterComponent.vue?vue&type=template&id=2c7ff574& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
        _vm._v("\n        Users Filter\n    ")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "mt-5 px-3" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.filterData.id,
              expression: "filterData.id"
            }
          ],
          staticClass:
            "w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none",
          attrs: { id: "id", name: "id", type: "text", placeholder: "ID" },
          domProps: { value: _vm.filterData.id },
          on: {
            keyup: _vm.callFilter,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.filterData, "id", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.filterData.firstName,
              expression: "filterData.firstName"
            }
          ],
          staticClass:
            "mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none",
          attrs: {
            id: "name",
            name: "id",
            type: "text",
            placeholder: "First name"
          },
          domProps: { value: _vm.filterData.firstName },
          on: {
            keyup: _vm.callFilter,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.filterData, "firstName", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.filterData.name,
              expression: "filterData.name"
            }
          ],
          staticClass:
            "mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none",
          attrs: { id: "id", name: "name", type: "text", placeholder: "Name" },
          domProps: { value: _vm.filterData.name },
          on: {
            keyup: _vm.callFilter,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.filterData, "name", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.filterData.email,
              expression: "filterData.email"
            }
          ],
          staticClass:
            "mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none",
          attrs: {
            id: "email",
            name: "email",
            type: "text",
            placeholder: "Email"
          },
          domProps: { value: _vm.filterData.email },
          on: {
            keyup: _vm.callFilter,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.filterData, "email", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.filterData.phoneNumber,
              expression: "filterData.phoneNumber"
            }
          ],
          staticClass:
            "mt-3 w-full border-b-2 border-lightBlue-600 p-2 text-sm rounded-sm outline-none",
          attrs: {
            id: "phoneNumber",
            name: "phoneNumber",
            type: "text",
            placeholder: "Phone number"
          },
          domProps: { value: _vm.filterData.phoneNumber },
          on: {
            keyup: _vm.callFilter,
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.filterData, "phoneNumber", $event.target.value)
            }
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "mt-3 pb-2 border-b-2 border-lightBlue-600" },
          [
            _c("div", { staticClass: "mb-2 text-base font-semibold" }, [
              _vm._v("\n                Roles\n            ")
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "flex items-center flex-wrap gap-2" },
              _vm._l(_vm.getRoles, function(role) {
                return _c(
                  "div",
                  {
                    key: role.id,
                    staticClass: "flex justify-between items-center"
                  },
                  [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.filterData.roles,
                          expression: "filterData.roles"
                        }
                      ],
                      staticClass: "mr-1 outline-none",
                      attrs: {
                        id: role.name,
                        name: role.name,
                        type: "checkbox"
                      },
                      domProps: {
                        value: role.id,
                        checked: Array.isArray(_vm.filterData.roles)
                          ? _vm._i(_vm.filterData.roles, role.id) > -1
                          : _vm.filterData.roles
                      },
                      on: {
                        click: _vm.callFilter,
                        change: function($event) {
                          var $$a = _vm.filterData.roles,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = role.id,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 &&
                                _vm.$set(
                                  _vm.filterData,
                                  "roles",
                                  $$a.concat([$$v])
                                )
                            } else {
                              $$i > -1 &&
                                _vm.$set(
                                  _vm.filterData,
                                  "roles",
                                  $$a.slice(0, $$i).concat($$a.slice($$i + 1))
                                )
                            }
                          } else {
                            _vm.$set(_vm.filterData, "roles", $$c)
                          }
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "label",
                      {
                        staticClass: "text-sm capitalize",
                        attrs: { for: role.name }
                      },
                      [_vm._v(_vm._s(role.name))]
                    )
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
          { staticClass: "mt-3 pb-2 border-b-2 border-lightBlue-600" },
          [
            _c("div", { staticClass: "mb-2 text-base font-semibold" }, [
              _vm._v("\n                Has email verified\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "flex items-center flex-wrap gap-2" }, [
              _c("div", { staticClass: "flex justify-between items-center" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.filterData.verified,
                      expression: "filterData.verified"
                    }
                  ],
                  staticClass: "mr-1 outline-none",
                  attrs: {
                    id: "isVerified",
                    name: "verified",
                    type: "radio",
                    value: "1"
                  },
                  domProps: { checked: _vm._q(_vm.filterData.verified, "1") },
                  on: {
                    click: _vm.callFilter,
                    change: function($event) {
                      return _vm.$set(_vm.filterData, "verified", "1")
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "label",
                  {
                    staticClass: "text-sm capitalize",
                    attrs: { for: "isVerified" }
                  },
                  [_vm._v("Verified")]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "flex justify-between items-center" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.filterData.verified,
                      expression: "filterData.verified"
                    }
                  ],
                  staticClass: "mr-1 outline-none",
                  attrs: {
                    id: "isNotVerified",
                    name: "verified",
                    type: "radio",
                    value: "2"
                  },
                  domProps: { checked: _vm._q(_vm.filterData.verified, "2") },
                  on: {
                    click: _vm.callFilter,
                    change: function($event) {
                      return _vm.$set(_vm.filterData, "verified", "2")
                    }
                  }
                }),
                _vm._v(" "),
                _c(
                  "label",
                  {
                    staticClass: "text-sm capitalize",
                    attrs: { for: "isNotVerified" }
                  },
                  [_vm._v("Not verified")]
                )
              ])
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "mt-3 pb-2 border-b-2 border-lightBlue-600" },
          [
            _c("div", { staticClass: "mb-2 text-base font-semibold" }, [
              _vm._v("\n                Joined date\n            ")
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "flex flex-col items-start gap-3 md:flex-row" },
              [
                _c("div", { staticClass: "flex items-center" }, [
                  _c(
                    "label",
                    {
                      staticClass: "text-sm font-semibold mr-3",
                      attrs: { for: "fromDate" }
                    },
                    [_vm._v("From:")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.filterData.fromDate,
                        expression: "filterData.fromDate"
                      }
                    ],
                    staticClass: "py-1 px-2 text-sm text-center rounded-sm",
                    attrs: { type: "date", id: "fromDate", name: "from_date" },
                    domProps: { value: _vm.filterData.fromDate },
                    on: {
                      change: _vm.callFilter,
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.filterData,
                          "fromDate",
                          $event.target.value
                        )
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "flex items-center" }, [
                  _c(
                    "label",
                    {
                      staticClass: "text-sm font-semibold mr-3",
                      attrs: { for: "toDate" }
                    },
                    [_vm._v("To:")]
                  ),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.filterData.toDate,
                        expression: "filterData.toDate"
                      }
                    ],
                    staticClass: "py-1 px-2 text-sm text-center rounded-sm",
                    attrs: { type: "date", id: "toDate", name: "to_date" },
                    domProps: { value: _vm.filterData.toDate },
                    on: {
                      change: _vm.callFilter,
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.filterData, "toDate", $event.target.value)
                      }
                    }
                  })
                ])
              ]
            )
          ]
        )
      ])
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=template&id=4526ea81&":
/*!*********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/EditUserComponent.vue?vue&type=template&id=4526ea81& ***!
  \*********************************************************************************************************************************************************************************************************************************************/
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
  return _c("Modal", [
    _c("h1", { staticClass: "text-3xl my-4" }, [
      _vm._v("\n        Edit user\n    ")
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "p-1" },
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
                      staticClass: "flex flex-col gap-3",
                      on: {
                        submit: function($event) {
                          $event.preventDefault()
                          return handleSubmit(_vm.submit)
                        }
                      }
                    },
                    [
                      _c("ValidationProvider", {
                        attrs: {
                          vid: "",
                          rules: "required|alpha_spaces|max:255"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var errors = ref.errors
                                return [
                                  _c("div", [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "text-sm font-semibold",
                                        attrs: { for: "firstName" }
                                      },
                                      [_vm._v("First name")]
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
                                          value: _vm.localUser.first_name,
                                          expression: "localUser.first_name"
                                        }
                                      ],
                                      staticClass:
                                        "w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                      class: { "border-red-600": errors[0] },
                                      attrs: {
                                        id: "firstName",
                                        name: "first name",
                                        type: "text",
                                        disabled: _vm.waiting
                                      },
                                      domProps: {
                                        value: _vm.localUser.first_name
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.localUser,
                                            "first_name",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  ])
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
                        attrs: {
                          vid: "",
                          rules: "required|alpha_spaces|max:255"
                        },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var errors = ref.errors
                                return [
                                  _c("div", [
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
                                          value: _vm.localUser.name,
                                          expression: "localUser.name"
                                        }
                                      ],
                                      staticClass:
                                        "w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                      class: { "border-red-600": errors[0] },
                                      attrs: {
                                        id: "name",
                                        name: "name",
                                        type: "text",
                                        disabled: _vm.waiting
                                      },
                                      domProps: { value: _vm.localUser.name },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.localUser,
                                            "name",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  ])
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
                        attrs: { vid: "", rules: "required" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var errors = ref.errors
                                return [
                                  _c("div", [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "text-sm font-semibold",
                                        attrs: { for: "birthdate" }
                                      },
                                      [_vm._v("Birthdate")]
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
                                          value: _vm.localUser.birthdate,
                                          expression: "localUser.birthdate"
                                        }
                                      ],
                                      staticClass:
                                        "w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                      class: { "border-red-600": errors[0] },
                                      attrs: {
                                        id: "birthdate",
                                        name: "birthdate",
                                        type: "date",
                                        disabled: _vm.waiting
                                      },
                                      domProps: {
                                        value: _vm.localUser.birthdate
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.localUser,
                                            "birthdate",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  ])
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
                        attrs: { vid: "", rules: "required|email|max:255" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var errors = ref.errors
                                return [
                                  _c("div", [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "text-sm font-semibold",
                                        attrs: { for: "email" }
                                      },
                                      [_vm._v("Email")]
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
                                          value: _vm.localUser.email,
                                          expression: "localUser.email"
                                        }
                                      ],
                                      staticClass:
                                        "w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                      class: { "border-red-600": errors[0] },
                                      attrs: {
                                        id: "email",
                                        name: "email",
                                        type: "email"
                                      },
                                      domProps: { value: _vm.localUser.email },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.localUser,
                                            "email",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  ])
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
                        attrs: { vid: "", rules: "required|max:255" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var errors = ref.errors
                                return [
                                  _c("div", [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "text-sm font-semibold",
                                        attrs: { for: "phone" }
                                      },
                                      [_vm._v("Phone number")]
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
                                          value: _vm.localUser.phone_number,
                                          expression: "localUser.phone_number"
                                        }
                                      ],
                                      staticClass:
                                        "w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                      class: { "border-red-600": errors[0] },
                                      attrs: {
                                        id: "phone",
                                        name: "phone number",
                                        type: "text",
                                        disabled: _vm.waiting
                                      },
                                      domProps: {
                                        value: _vm.localUser.phone_number
                                      },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.$set(
                                            _vm.localUser,
                                            "phone_number",
                                            $event.target.value
                                          )
                                        }
                                      }
                                    })
                                  ])
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
                        attrs: { vid: "", rules: "required|integer" },
                        scopedSlots: _vm._u(
                          [
                            {
                              key: "default",
                              fn: function(ref) {
                                var errors = ref.errors
                                return [
                                  _c("div", [
                                    _c(
                                      "label",
                                      {
                                        staticClass: "text-sm font-semibold",
                                        attrs: { for: "role" }
                                      },
                                      [_vm._v("Role")]
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
                                            value: _vm.localUser.role_id,
                                            expression: "localUser.role_id"
                                          }
                                        ],
                                        staticClass:
                                          "w-full text-sm p-1 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                        class: { "border-red-600": errors[0] },
                                        attrs: {
                                          id: "role",
                                          name: "role",
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
                                              _vm.localUser,
                                              "role_id",
                                              $event.target.multiple
                                                ? $$selectedVal
                                                : $$selectedVal[0]
                                            )
                                          }
                                        }
                                      },
                                      _vm._l(_vm.getRoles, function(role) {
                                        return _c(
                                          "option",
                                          {
                                            key: role.id,
                                            domProps: { value: role.id }
                                          },
                                          [_vm._v(_vm._s(role.name))]
                                        )
                                      }),
                                      0
                                    )
                                  ])
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
              }
            }
          ])
        }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "w-full flex justify-end items-center mt-4" },
          [
            _c(
              "button",
              {
                staticClass:
                  "flex items-center bg-lightBlue-700 rounded-sm text-xs py-1 px-4 mr-2 text-white mt-2 hover:bg-lightBlue-600 active:bg-lightBlue-500 active:shadow-inner  disabled:bg-gray-500 disabled:pointer-events-none",
                attrs: { type: "submit", disabled: _vm.waiting },
                on: { click: _vm.update }
              },
              [
                _vm.waiting
                  ? _c(
                      "svg",
                      {
                        staticClass: "animate-spin mr-3 h-5 w-5 text-white",
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
                _vm._v("\n                Save\n            ")
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass:
                  "bg-transparent rounded-sm text-xs py-1 px-4 text-black text-bold mt-2 hover:text-gray-600",
                on: { click: _vm.close }
              },
              [_vm._v("\n                Cancel\n            ")]
            )
          ]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=template&id=bb9f15c0&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/components/users/RoleComponent.vue?vue&type=template&id=bb9f15c0& ***!
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
    {
      staticClass:
        "py-1 px-2 ml-2 text-xs text-white rounded-sm bg-lightBlue-600"
    },
    [_vm._v("\n    " + _vm._s(_vm.role.name) + "\n")]
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
    {
      staticClass:
        "flex flex-col flex-1 w-full p-4 pt-0 bg-gray-50 lg:p-4 lg:pt-0"
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=template&id=0a0b308d&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/CreateUserView.vue?vue&type=template&id=0a0b308d& ***!
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
    "ViewContainer",
    [
      _c("template", { slot: "header" }, [
        _vm._v("\n        Create user account\n    ")
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
                      {
                        staticClass:
                          "flex flex-col lg:flex-row lg:gap-x-6 lg:w-3/5"
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass:
                              "pb-5 border-b border-gray-200 lg:border-r lg:pr-5 lg:border-b-0 lg:pb-0 lg:flex-auto"
                          },
                          [
                            _c(
                              "h2",
                              { staticClass: "mb-5 text-xl font-semibold" },
                              [
                                _vm._v(
                                  "\n                        Account details\n                    "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", [
                              _vm._v(
                                "\n                        IMAGE UPLOAD\n                    "
                              )
                            ]),
                            _vm._v(" "),
                            _c("ValidationProvider", {
                              attrs: {
                                vid: "data.user.first_name",
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
                                            staticClass:
                                              "text-sm font-semibold",
                                            attrs: { for: "firstName" }
                                          },
                                          [_vm._v("First name")]
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
                                              value: _vm.user.first_name,
                                              expression: "user.first_name"
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
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.user.first_name
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.user,
                                                "first_name",
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
                              staticClass: "mt-2",
                              attrs: {
                                vid: "data.user.name",
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
                                              value: _vm.user.name,
                                              expression: "user.name"
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
                                            type: "text",
                                            name: "name",
                                            disabled: _vm.waiting
                                          },
                                          domProps: { value: _vm.user.name },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.user,
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
                              staticClass: "mt-2",
                              attrs: {
                                vid: "data.user.birthdate",
                                rules: "required"
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
                                            attrs: { for: "birthdate" }
                                          },
                                          [_vm._v("Birthdate")]
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
                                              value: _vm.user.birthdate,
                                              expression: "user.birthdate"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": failed,
                                            "border-green-500": passed
                                          },
                                          attrs: {
                                            id: "birthdate",
                                            type: "date",
                                            name: "birthdate",
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.user.birthdate
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.user,
                                                "birthdate",
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
                              staticClass: "mt-2",
                              attrs: {
                                vid: "data.user.email",
                                rules: "required|email|max:255"
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
                                            attrs: { for: "email" }
                                          },
                                          [_vm._v("Email")]
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
                                              value: _vm.user.email,
                                              expression: "user.email"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": failed,
                                            "border-green-500": passed
                                          },
                                          attrs: {
                                            id: "email",
                                            type: "email",
                                            name: "email",
                                            disabled: _vm.waiting
                                          },
                                          domProps: { value: _vm.user.email },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.user,
                                                "email",
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
                              staticClass: "mt-2",
                              attrs: {
                                vid: "data.user.phone_number",
                                rules: "required"
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
                                            attrs: { for: "phone_number" }
                                          },
                                          [_vm._v("Phone number")]
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
                                              value: _vm.user.phone_number,
                                              expression: "user.phone_number"
                                            }
                                          ],
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          class: {
                                            "border-red-600": failed,
                                            "border-green-500": passed
                                          },
                                          attrs: {
                                            id: "phoneNumber",
                                            type: "text",
                                            name: "phone number",
                                            disabled: _vm.waiting
                                          },
                                          domProps: {
                                            value: _vm.user.phone_number
                                          },
                                          on: {
                                            input: function($event) {
                                              if ($event.target.composing) {
                                                return
                                              }
                                              _vm.$set(
                                                _vm.user,
                                                "phone_number",
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
                              staticClass: "mt-2",
                              attrs: {
                                vid: "data.user.role",
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
                                            attrs: { for: "role" }
                                          },
                                          [_vm._v("Role")]
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
                                                value: _vm.user.role_id,
                                                expression: "user.role_id"
                                              }
                                            ],
                                            staticClass:
                                              "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500 capitalize",
                                            class: {
                                              "border-red-600": failed,
                                              "border-green-500": passed
                                            },
                                            attrs: {
                                              id: "role",
                                              name: "role",
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
                                                  _vm.user,
                                                  "role_id",
                                                  $event.target.multiple
                                                    ? $$selectedVal
                                                    : $$selectedVal[0]
                                                )
                                              }
                                            }
                                          },
                                          _vm._l(_vm.getRoles, function(role) {
                                            return _c(
                                              "option",
                                              {
                                                key: role.id,
                                                domProps: { value: role.id }
                                              },
                                              [_vm._v(_vm._s(role.name))]
                                            )
                                          }),
                                          0
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
                          { staticClass: "mt-5 pb-5 lg:flex-auto lg:mt-0" },
                          [
                            _c(
                              "h2",
                              { staticClass: "mb-5 text-xl font-semibold" },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.addressState,
                                      expression: "addressState"
                                    }
                                  ],
                                  attrs: {
                                    id: "addressToggle",
                                    type: "checkbox"
                                  },
                                  domProps: {
                                    checked: Array.isArray(_vm.addressState)
                                      ? _vm._i(_vm.addressState, null) > -1
                                      : _vm.addressState
                                  },
                                  on: {
                                    click: _vm.toggleAddressState,
                                    change: function($event) {
                                      var $$a = _vm.addressState,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            (_vm.addressState = $$a.concat([
                                              $$v
                                            ]))
                                        } else {
                                          $$i > -1 &&
                                            (_vm.addressState = $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1)))
                                        }
                                      } else {
                                        _vm.addressState = $$c
                                      }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "label",
                                  { attrs: { for: "addressToggle" } },
                                  [_vm._v("Address (optional)")]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "mt-2" },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass: "text-sm font-semibold",
                                    attrs: { for: "addressFirstName" }
                                  },
                                  [_vm._v("First name")]
                                ),
                                _vm._v(" "),
                                _vm.addressState
                                  ? _c("ValidationProvider", {
                                      attrs: {
                                        vid: "data.address.first_name",
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
                                                        _vm.address.first_name,
                                                      expression:
                                                        "address.first_name"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                                  class: {
                                                    "border-red-600": failed,
                                                    "border-green-500": passed
                                                  },
                                                  attrs: {
                                                    id: "addressFirstName",
                                                    name: "first name",
                                                    type: "text",
                                                    disabled:
                                                      _vm.waiting ||
                                                      !_vm.addressState
                                                  },
                                                  domProps: {
                                                    value:
                                                      _vm.address.first_name
                                                  },
                                                  on: {
                                                    input: function($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.address,
                                                        "first_name",
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
                                  : _c("div", [
                                      _c("div", {
                                        staticClass:
                                          "text-xs text-red-600 font-semibold mb-1"
                                      }),
                                      _vm._v(" "),
                                      _c("input", {
                                        staticClass:
                                          "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                        attrs: {
                                          id: "addressFirstName",
                                          name: "first name",
                                          type: "text",
                                          disabled:
                                            _vm.waiting || !_vm.addressState
                                        }
                                      })
                                    ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "mt-2" },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass: "text-sm font-semibold",
                                    attrs: { for: "addressName" }
                                  },
                                  [_vm._v("Name")]
                                ),
                                _vm._v(" "),
                                _vm.addressState
                                  ? _c("ValidationProvider", {
                                      attrs: {
                                        vid: "data.address.name",
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
                                                      value: _vm.address.name,
                                                      expression: "address.name"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                                  class: {
                                                    "border-red-600": failed,
                                                    "border-green-500": passed
                                                  },
                                                  attrs: {
                                                    id: "addressName",
                                                    type: "text",
                                                    name: "name",
                                                    disabled:
                                                      _vm.waiting ||
                                                      !_vm.addressState
                                                  },
                                                  domProps: {
                                                    value: _vm.address.name
                                                  },
                                                  on: {
                                                    input: function($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.address,
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
                                  : _c("div", [
                                      _c("div", {
                                        staticClass:
                                          "text-xs text-red-600 font-semibold mb-1"
                                      }),
                                      _vm._v(" "),
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value: _vm.address.name,
                                            expression: "address.name"
                                          }
                                        ],
                                        staticClass:
                                          "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                        attrs: {
                                          id: "addressName",
                                          type: "text",
                                          name: "name",
                                          disabled:
                                            _vm.waiting || !_vm.addressState
                                        },
                                        domProps: { value: _vm.address.name },
                                        on: {
                                          input: function($event) {
                                            if ($event.target.composing) {
                                              return
                                            }
                                            _vm.$set(
                                              _vm.address,
                                              "name",
                                              $event.target.value
                                            )
                                          }
                                        }
                                      })
                                    ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "mt-2" },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass: "text-sm font-semibold",
                                    attrs: { for: "addressPhoneNumber" }
                                  },
                                  [_vm._v("Phone number")]
                                ),
                                _vm._v(" "),
                                _vm.addressState
                                  ? _c("ValidationProvider", {
                                      attrs: {
                                        vid: "data.address.phone_number",
                                        rules: "required|max:255"
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
                                                        _vm.address
                                                          .phone_number,
                                                      expression:
                                                        "address.phone_number"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                                  class: {
                                                    "border-red-600": failed,
                                                    "border-green-500": passed
                                                  },
                                                  attrs: {
                                                    id: "addressPhoneNumber",
                                                    type: "text",
                                                    name: "phone number",
                                                    disabled:
                                                      _vm.waiting ||
                                                      !_vm.addressState
                                                  },
                                                  domProps: {
                                                    value:
                                                      _vm.address.phone_number
                                                  },
                                                  on: {
                                                    input: function($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.address,
                                                        "phone_number",
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
                                  : _c("div", [
                                      _c("div", {
                                        staticClass:
                                          "text-xs text-red-600 font-semibold mb-1"
                                      }),
                                      _vm._v(" "),
                                      _c("input", {
                                        staticClass:
                                          "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                        attrs: {
                                          id: "addressPhoneNumber",
                                          type: "text",
                                          name: "phone number",
                                          disabled:
                                            _vm.waiting || !_vm.addressState
                                        }
                                      })
                                    ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "mt-2" },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass: "text-sm font-semibold",
                                    attrs: { for: "addressCounty" }
                                  },
                                  [_vm._v("County")]
                                ),
                                _vm._v(" "),
                                _vm.addressState
                                  ? _c("ValidationProvider", {
                                      attrs: {
                                        vid: "data.address.county_id",
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
                                                          _vm.address.county_id,
                                                        expression:
                                                          "address.county_id"
                                                      }
                                                    ],
                                                    staticClass:
                                                      "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                                    class: {
                                                      "border-red-600": failed,
                                                      "border-green-500": passed
                                                    },
                                                    attrs: {
                                                      id: "addressCounty",
                                                      name: "country",
                                                      disabled:
                                                        _vm.waiting ||
                                                        !_vm.addressState
                                                    },
                                                    on: {
                                                      change: [
                                                        function($event) {
                                                          var $$selectedVal = Array.prototype.filter
                                                            .call(
                                                              $event.target
                                                                .options,
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
                                                            _vm.address,
                                                            "county_id",
                                                            $event.target
                                                              .multiple
                                                              ? $$selectedVal
                                                              : $$selectedVal[0]
                                                          )
                                                        },
                                                        _vm.getCitites
                                                      ]
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
                                                      [
                                                        _vm._v(
                                                          "Select user country"
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _vm._l(
                                                      _vm.getCounties,
                                                      function(county) {
                                                        return _c(
                                                          "option",
                                                          {
                                                            key: county.id,
                                                            domProps: {
                                                              value: county.id
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              " " +
                                                                _vm._s(
                                                                  county.name
                                                                ) +
                                                                " "
                                                            )
                                                          ]
                                                        )
                                                      }
                                                    )
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
                                  : _c("div", [
                                      _c("div", {
                                        staticClass:
                                          "text-xs text-red-600 font-semibold mb-1"
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "select",
                                        {
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          attrs: {
                                            id: "addressCounty",
                                            name: "country",
                                            disabled:
                                              _vm.waiting || !_vm.addressState
                                          }
                                        },
                                        [
                                          _c(
                                            "option",
                                            {
                                              attrs: {
                                                value: "",
                                                disabled: "",
                                                selected: ""
                                              }
                                            },
                                            [_vm._v("Select user country")]
                                          )
                                        ]
                                      )
                                    ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "mt-2" },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass: "text-sm font-semibold",
                                    attrs: { for: "addressCity" }
                                  },
                                  [_vm._v("City")]
                                ),
                                _vm._v(" "),
                                _vm.addressState
                                  ? _c("ValidationProvider", {
                                      attrs: {
                                        vid: "data.address.city_id",
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
                                                          _vm.address.city_id,
                                                        expression:
                                                          "address.city_id"
                                                      }
                                                    ],
                                                    staticClass:
                                                      "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                                    class: {
                                                      "border-red-600": failed,
                                                      "border-green-500": passed
                                                    },
                                                    attrs: {
                                                      id: "addressCity",
                                                      name: "city",
                                                      disabled:
                                                        _vm.citiesSelectState ||
                                                        _vm.waiting ||
                                                        !_vm.addressState
                                                    },
                                                    on: {
                                                      change: function($event) {
                                                        var $$selectedVal = Array.prototype.filter
                                                          .call(
                                                            $event.target
                                                              .options,
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
                                                          _vm.address,
                                                          "city_id",
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
                                                      [
                                                        _vm._v(
                                                          "Select user city"
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _vm._l(_vm.cities, function(
                                                      city
                                                    ) {
                                                      return _c(
                                                        "option",
                                                        {
                                                          key: city.id,
                                                          domProps: {
                                                            value: city.id
                                                          }
                                                        },
                                                        [
                                                          _vm._v(
                                                            _vm._s(city.name)
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
                                  : _c("div", [
                                      _c("div", {
                                        staticClass:
                                          "text-xs text-red-600 font-semibold mb-1"
                                      }),
                                      _vm._v(" "),
                                      _c(
                                        "select",
                                        {
                                          staticClass:
                                            "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                          attrs: {
                                            id: "addressCity",
                                            name: "city",
                                            disabled:
                                              _vm.citiesSelectState ||
                                              _vm.waiting ||
                                              !_vm.addressState
                                          }
                                        },
                                        [
                                          _c(
                                            "option",
                                            {
                                              attrs: {
                                                disabled: "",
                                                selected: ""
                                              }
                                            },
                                            [_vm._v("Select user city")]
                                          )
                                        ]
                                      )
                                    ])
                              ],
                              1
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "mt-2" },
                              [
                                _c(
                                  "label",
                                  {
                                    staticClass: "text-sm font-semibold",
                                    attrs: { for: "addressAddress" }
                                  },
                                  [_vm._v("Address")]
                                ),
                                _vm._v(" "),
                                _vm.addressState
                                  ? _c("ValidationProvider", {
                                      attrs: {
                                        vid: "data.address.address",
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
                                                        _vm.address.address,
                                                      expression:
                                                        "address.address"
                                                    }
                                                  ],
                                                  staticClass:
                                                    "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                                  class: {
                                                    "border-red-600": failed,
                                                    "border-green-500": passed
                                                  },
                                                  attrs: {
                                                    id: "addressAddress",
                                                    name: "address",
                                                    type: "text",
                                                    disabled:
                                                      _vm.waiting ||
                                                      !_vm.addressState
                                                  },
                                                  domProps: {
                                                    value: _vm.address.address
                                                  },
                                                  on: {
                                                    input: function($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.address,
                                                        "address",
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
                                  : _c("div", [
                                      _c("div", {
                                        staticClass:
                                          "text-xs text-red-600 font-semibold mb-1"
                                      }),
                                      _vm._v(" "),
                                      _c("input", {
                                        staticClass:
                                          "w-full text-sm p-2 rounded border order-gray-300 outline-none focus:ring-1 focus:ring-lightBlue-500",
                                        attrs: {
                                          id: "addressAddress",
                                          name: "address",
                                          type: "text",
                                          disabled:
                                            _vm.waiting || !_vm.addressState
                                        }
                                      })
                                    ])
                              ],
                              1
                            )
                          ]
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



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UserView.vue?vue&type=template&id=13c42031&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UserView.vue?vue&type=template&id=13c42031& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
  return _vm.user
    ? _c(
        "ViewContainer",
        [
          _vm.editUserState
            ? _c("EditUser", {
                attrs: { user: _vm.user },
                on: { close: _vm.toggleEditUserState, updated: _vm.updateUser }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("template", { slot: "header" }, [
            _vm._v("\n       User #" + _vm._s(_vm.user.id) + "\n    ")
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "w-full pb-2 mb-2 flex flex-col justify-center items-center border-b border-gray-100 md:flex-row md:justify-start"
            },
            [
              _c(
                "div",
                { staticClass: "w-32 h-32 bg-gray-500 rounded-md md:mr-4" },
                [
                  _c(
                    "svg",
                    {
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        fill: "white",
                        width: "128px",
                        height: "128px"
                      }
                    },
                    [
                      _c("path", {
                        attrs: { d: "M0 0h24v24H0z", fill: "none" }
                      }),
                      _c("path", {
                        attrs: {
                          d:
                            "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                        }
                      })
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "flex flex-col items-center justify-center md:items-start"
                },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "flex justify-center w-full mt-2 md:justify-start"
                    },
                    [
                      _c("Status", {
                        attrs: { "deleted-at": _vm.user.deleted_at }
                      }),
                      _vm._v(" "),
                      _c("Role", { attrs: { roleId: _vm.user.role_id } })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "font-semibold text-2xl mt-2" }, [
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.user.first_name) +
                        " " +
                        _vm._s(_vm.user.name) +
                        "\n                "
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "text-sm mt-2" }, [
                    _c("a", { attrs: { href: "mailto:" + _vm.user.email } }, [
                      _vm._v(_vm._s(_vm.user.email))
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "mx-2" }, [_vm._v("|")]),
                    _vm._v(" "),
                    _c(
                      "a",
                      { attrs: { href: "tel:" + _vm.user.phone_number } },
                      [_vm._v(_vm._s(_vm.user.phone_number))]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "flex items-baseline mt-2" }, [
                    _c("span", { staticClass: "font-semibold text-sm mr-2" }, [
                      _vm._v(
                        "\n                    Joined on:\n                "
                      )
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "text-xs" }, [
                      _vm._v(
                        "\n                    " +
                          _vm._s(_vm._f("formatDate")(_vm.user.created_at)) +
                          "\n                "
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass:
                        "bg-amber-700 rounded-sm text-xs py-1 px-4 text-white mt-2 hover:bg-amber-600 active:bg-amber-400 active:shadow-inner",
                      on: { click: _vm.toggleEditUserState }
                    },
                    [_vm._v("\n                Edit\n            ")]
                  )
                ]
              )
            ]
          ),
          _vm._v(" "),
          _c("div", [_vm._v("\n        Shifts\n    ")]),
          _vm._v(" "),
          _c("div", [_vm._v("\n        Orders (20)\n    ")]),
          _vm._v(" "),
          _c("div", [_vm._v("\n        Reservations\n    ")])
        ],
        2
      )
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UsersListView.vue?vue&type=template&id=57fbf4ba&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/dashboard/views/users/UsersListView.vue?vue&type=template&id=57fbf4ba& ***!
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
    "ViewContainer",
    [
      _vm.showFilterState
        ? _c("UsersFilter", { on: { closed: _vm.toggleFilterState } })
        : _vm._e(),
      _vm._v(" "),
      _c("template", { slot: "header" }, [
        _vm._v("\n        Users List\n     ")
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
                [_vm._v("\n                 Filter\n             ")]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass:
                    "w-full py-1 mt-2  text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-20 md:mt-0",
                  on: { click: _vm.refreshUsersList }
                },
                [_vm._v("\n                 Refresh\n             ")]
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
              _c("option", { domProps: { value: 3 } }, [
                _vm._v("First Name asc")
              ]),
              _vm._v(" "),
              _c("option", { domProps: { value: 4 } }, [
                _vm._v("First Name desc")
              ]),
              _vm._v(" "),
              _c("option", { domProps: { value: 5 } }, [_vm._v("Email asc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 6 } }, [_vm._v("Email desc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 7 } }, [_vm._v("Role asc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 8 } }, [_vm._v("Role desc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 9 } }, [_vm._v("Orders asc")]),
              _vm._v(" "),
              _c("option", { domProps: { value: 10 } }, [
                _vm._v("Orders desc")
              ]),
              _vm._v(" "),
              _c("option", { domProps: { value: 11 } }, [
                _vm._v("Reservations asc")
              ]),
              _vm._v(" "),
              _c("option", { domProps: { value: 12 } }, [
                _vm._v("Reservations desc")
              ]),
              _vm._v(" "),
              _c("option", { domProps: { value: 13 } }, [
                _vm._v("Joined at asc")
              ]),
              _vm._v(" "),
              _c("option", { domProps: { value: 14 } }, [
                _vm._v("Joined at desc")
              ])
            ]
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "CardsList",
        _vm._l(_vm.getUsers, function(user) {
          return _c(
            "Card",
            { key: user.id },
            [
              _c(
                "router-link",
                { attrs: { to: { name: "User", params: { id: user.id } } } },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "w-full flex justify-start items-center pb-1 border-b border-gray-100"
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "w-12 h-12 mr-4 bg-gray-500 rounded-md"
                        },
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
                                    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                                }
                              })
                            ]
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "flex-1" }, [
                        _c("div", { staticClass: "capitalize font-semibold" }, [
                          _c("span", [_vm._v(_vm._s(user.first_name))]),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(user.name))])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "font-light" }, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(user.email) +
                              "\n                         "
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "mt-1 text-xs" }, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(user.phone_number) +
                              "\n                         "
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", [
                        _c("div", { staticClass: "text-xs font-semibold" }, [
                          _vm._v(
                            "\n                             #" +
                              _vm._s(user.id) +
                              "\n                         "
                          )
                        ]),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "mt-2" },
                          [
                            _c("Status", {
                              attrs: { "deleted-at": user.deleted_at }
                            })
                          ],
                          1
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "mt-1" }, [
                    _c(
                      "div",
                      { staticClass: "flex justify-between items-center" },
                      [
                        _c("div", [
                          _c("span", [
                            _vm._v(
                              "\n                                 20\n                             "
                            )
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "font-semibold" }, [
                            _vm._v(
                              "\n                                 orders\n                             "
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", [
                          _c("span", [
                            _vm._v(
                              "\n                                 12\n                             "
                            )
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "font-semibold" }, [
                            _vm._v(
                              "\n                                 reservation\n                             "
                            )
                          ])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "mt-2 flex justify-between items-center" },
                      [
                        _c("div", [
                          _c("span", { staticClass: "font-semibold" }, [
                            _vm._v(
                              "\n                                 Joined on:\n                             "
                            )
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "text-xs" }, [
                            _vm._v(
                              "\n                                 " +
                                _vm._s(_vm._f("formatDate")(user.created_at)) +
                                "\n                             "
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("Role", { attrs: { roleId: user.role_id } })
                      ],
                      1
                    )
                  ])
                ]
              )
            ],
            1
          )
        }),
        1
      ),
      _vm._v(" "),
      _vm.showMoreState
        ? _c("div", { staticClass: "mt-5 text-center md:text-right" }, [
            _c(
              "button",
              {
                staticClass:
                  "w-full py-1 mt-2 text-base text-white bg-lightBlue-600 rounded-sm active:shadow-inner active:bg-lightBlue-500 md:w-28",
                on: { click: _vm.loadMoreUsers }
              },
              [_vm._v("\n             Load more\n         ")]
            )
          ])
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);