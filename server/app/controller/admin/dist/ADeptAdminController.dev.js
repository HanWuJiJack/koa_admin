"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// const Controller = require('../../../../core/controller/admin.js');
var BaseController = require('../BaseController.js');

var Schema = require('./../../model/Model.js');

var AutoID = require('./../../utils/AutoID');

var ApiRatelimit = require("./../../middleware/ApiRatelimit");

var ApiAuth = require("./../../middleware/ApiAuth");

var DeptAdminController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(DeptAdminController, _BaseController);

  function DeptAdminController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, DeptAdminController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DeptAdminController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.userInfo = _this.ctx.state.userInfo;
    _this.url = "/admin/dept";
    _this.limit = ["list"];
    _this.middleLists = {
      "Get|list": [ApiAuth(["system:dept:list"]), ApiRatelimit(1, 3)],
      Create: [ApiAuth(["system:dept:post"]), ApiRatelimit(1, 1)],
      Update: [ApiAuth(["system:dept:put"]), ApiRatelimit(1, 1)],
      Remove: [ApiAuth(["system:dept:remove"]), ApiRatelimit(1, 1)],
      "Get|info:id": [ApiAuth(["system:dept:get"]), ApiRatelimit(1, 3)]
    };
    return _this;
  } // "Get|list" Get "Get:id"
  // Update "Update:id"
  // Create
  // Remove "Remove:ids"
  // | 代表拼接后端字符串
  // : 代表拼接后端动态路由


  _createClass(DeptAdminController, [{
    key: "Get|list",
    value: function GetList() {
      var _this$ctx$request$que, deptName, _this$ctx$request$que2, state, params, rootList, deptList;

      return regeneratorRuntime.async(function GetList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$ctx$request$que = this.ctx.request.query, deptName = _this$ctx$request$que.deptName, _this$ctx$request$que2 = _this$ctx$request$que.state, state = _this$ctx$request$que2 === void 0 ? 1 : _this$ctx$request$que2;
              params = {};
              params.state = parseInt(state);
              if (deptName) params.deptName = deptName;
              _context.next = 6;
              return regeneratorRuntime.awrap(Schema.deptSchema.find(params));

            case 6:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 9;
                break;
              }

              _context.t0 = [];

            case 9:
              rootList = _context.t0;
              deptList = _get(_getPrototypeOf(DeptAdminController.prototype), "TreeDept", this).call(this, rootList, null);
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "success", this).call(this, {
                data: deptList
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "Update",
    value: function Update() {
      var _this$ctx$request$bod, id, action, params, res, info;

      return regeneratorRuntime.async(function Update$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, id = _this$ctx$request$bod.id, action = _this$ctx$request$bod.action, params = _objectWithoutProperties(_this$ctx$request$bod, ["id", "action"]);
              _context2.prev = 1;
              params.updateTime = new Date();
              params.updateByUser = this.ctx.state.userId.id;
              _context2.next = 6;
              return regeneratorRuntime.awrap(Schema.deptSchema.findOneAndUpdate({
                id: id
              }, params));

            case 6:
              res = _context2.sent;
              info = '编辑成功';
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 11]]);
    }
  }, {
    key: "Remove",
    value: function Remove() {
      var _this$ctx$request$bod2, id, action, res, info, deptInfo;

      return regeneratorRuntime.async(function Remove$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$ctx$request$bod2 = this.ctx.request.body, id = _this$ctx$request$bod2.id, action = _this$ctx$request$bod2.action;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(Schema.deptSchema.findOne({
                parentId: {
                  $all: [id]
                }
              }));

            case 4:
              deptInfo = _context3.sent;

              if (!deptInfo) {
                _context3.next = 8;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "fail", this).call(this, {
                msg: "请先将子集删除！"
              });
              return _context3.abrupt("return");

            case 8:
              _context3.next = 10;
              return regeneratorRuntime.awrap(Schema.deptSchema.findOneAndUpdate({
                id: id
              }, {
                state: 2
              }));

            case 10:
              res = _context3.sent;
              info = '删除成功';
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context3.next = 18;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "fail", this).call(this, {
                msg: _context3.t0.stack
              });

            case 18:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 15]]);
    }
  }, {
    key: "Get|info:id",
    value: function GetInfoId() {
      var id, params, query;
      return regeneratorRuntime.async(function GetInfoId$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = this.ctx.params.id;
              params = {};
              if (id) params.id = parseInt(id);
              _context4.next = 6;
              return regeneratorRuntime.awrap(Schema.deptSchema.findOne(params));

            case 6:
              query = _context4.sent;
              // 查询所有数据
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "success", this).call(this, {
                data: _objectSpread({}, query._doc)
              });
              _context4.next = 13;
              break;

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "fail", this).call(this, {
                msg: _context4.t0.stack
              });

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 10]]);
    }
  }, {
    key: "Create",
    value: function Create() {
      var _this$ctx$request$bod3, id, action, params, res, info, currentIndex;

      return regeneratorRuntime.async(function Create$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _this$ctx$request$bod3 = this.ctx.request.body, id = _this$ctx$request$bod3.id, action = _this$ctx$request$bod3.action, params = _objectWithoutProperties(_this$ctx$request$bod3, ["id", "action"]);
              _context5.prev = 1;
              _context5.next = 4;
              return regeneratorRuntime.awrap(AutoID({
                code: "deptId"
              }));

            case 4:
              currentIndex = _context5.sent;
              params.id = currentIndex;
              params.createByUser = this.ctx.state.userId.id;
              _context5.next = 9;
              return regeneratorRuntime.awrap(Schema.deptSchema.create(params));

            case 9:
              res = _context5.sent;
              info = '创建成功';
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context5.next = 17;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "fail", this).call(this, {
                msg: _context5.t0.stack
              });

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[1, 14]]);
    }
  }]);

  return DeptAdminController;
}(BaseController);

module.exports = DeptAdminController;