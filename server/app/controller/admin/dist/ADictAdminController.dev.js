"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var BaseController = require('../BaseController');

var Schema = require('./../../model/Model.js');

var AutoID = require('./../../utils/AutoID');

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/Logger")),
    logger = _require.logger;

var ApiRatelimit = require("./../../middleware/ApiRatelimit");

var ApiAuth = require("./../../middleware/ApiAuth");

var DictAdminController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(DictAdminController, _BaseController);

  function DictAdminController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, DictAdminController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DictAdminController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.userInfo = _this.ctx.state.userInfo;
    _this.url = "/admin/dict";
    _this.middleLists = {
      "Get|list": [ApiAuth(["system:dict:list"]), ApiRatelimit(1, 3)],
      Create: [ApiAuth(["system:dict:post"]), ApiRatelimit(1, 1)],
      "Update:id": [ApiAuth(["system:dict:put"]), ApiRatelimit(1, 1)],
      "Remove:ids": [ApiAuth(["system:dict:remove"]), ApiRatelimit(1, 1)],
      "Get|info:id": [ApiAuth(["system:dict:get"]), ApiRatelimit(1, 3)]
    };
    return _this;
  } // "Get|list" Get "Get:id"
  // Update "Update:id"
  // Create
  // Remove "Remove:ids"
  // | 代表拼接后端字符串
  // : 代表拼接后端动态路由


  _createClass(DictAdminController, [{
    key: "Get|list",
    value: function GetList() {
      var _this$ctx$request$que, name, nameCode, _this$ctx$request$que2, state, _get$call, page, skipIndex, params, query, list, total;

      return regeneratorRuntime.async(function GetList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _this$ctx$request$que = this.ctx.request.query, name = _this$ctx$request$que.name, nameCode = _this$ctx$request$que.nameCode, _this$ctx$request$que2 = _this$ctx$request$que.state, state = _this$ctx$request$que2 === void 0 ? 1 : _this$ctx$request$que2;
              _get$call = _get(_getPrototypeOf(DictAdminController.prototype), "pager", this).call(this, this.ctx.request.query), page = _get$call.page, skipIndex = _get$call.skipIndex;
              params = {};
              if (name) params.name = new RegExp("^".concat(name), 'ig');
              if (nameCode) params.nameCode = new RegExp("^".concat(nameCode), 'ig');
              params.state = parseInt(state);
              query = Schema.dictSchema.find(params); // 查询所有数据

              _context.next = 10;
              return regeneratorRuntime.awrap(query.sort({
                id: -1
              }).skip(skipIndex).limit(page.pageSize));

            case 10:
              list = _context.sent;
              _context.next = 13;
              return regeneratorRuntime.awrap(Schema.dictSchema.countDocuments(params));

            case 13:
              total = _context.sent;
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "success", this).call(this, {
                data: {
                  page: _objectSpread({}, page, {
                    total: total
                  }),
                  list: list
                }
              });
              _context.next = 20;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "fail", this).call(this, {
                msg: _context.t0.stack
              });

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 17]]);
    }
  }, {
    key: "Create",
    value: function Create() {
      var _this$ctx$request$bod, name, nameCode, state, remark, check, currentIndex, add;

      return regeneratorRuntime.async(function Create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _this$ctx$request$bod = this.ctx.request.body, name = _this$ctx$request$bod.name, nameCode = _this$ctx$request$bod.nameCode, state = _this$ctx$request$bod.state, remark = _this$ctx$request$bod.remark;

              if (!(!name || !nameCode)) {
                _context2.next = 7;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "fail", this).call(this, {
                msg: '请填写完整再进行新增提交'
              });
              return _context2.abrupt("return");

            case 7:
              _context2.next = 9;
              return regeneratorRuntime.awrap(Schema.dictSchema.findOne({
                nameCode: nameCode
              }));

            case 9:
              check = _context2.sent;

              if (!check) {
                _context2.next = 13;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "fail", this).call(this, {
                msg: '添加失败，请联系管理员:字典类型不可重复！'
              });
              return _context2.abrupt("return");

            case 13:
              _context2.next = 15;
              return regeneratorRuntime.awrap(AutoID({
                code: "dictId"
              }));

            case 15:
              currentIndex = _context2.sent;
              add = new Schema.dictSchema({
                id: currentIndex,
                name: name,
                createByUser: this.ctx.state.userId.id,
                nameCode: nameCode,
                state: state ? state : undefined,
                remark: remark ? remark : ''
              });
              _context2.next = 19;
              return regeneratorRuntime.awrap(add.save());

            case 19:
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "success", this).call(this, {
                msg: '添加成功'
              });

            case 20:
              _context2.next = 25;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 22]]);
    }
  }, {
    key: "Update:id",
    value: function UpdateId() {
      var id, params, res;
      return regeneratorRuntime.async(function UpdateId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = this.ctx.params.id;
              params = _extends({}, this.ctx.request.body);
              params.updateTime = new Date();
              params.updateByUser = this.ctx.state.userId.id;
              _context3.next = 7;
              return regeneratorRuntime.awrap(Schema.dictSchema.findOneAndUpdate({
                id: parseInt(id)
              }, params));

            case 7:
              res = _context3.sent;
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "success", this).call(this, {
                data: res,
                msg: '修改成功！'
              });
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "fail", this).call(this, {
                msg: _context3.t0.stack
              });

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 11]]);
    }
  }, {
    key: "Remove:ids",
    value: function RemoveIds() {
      var ids, arrId, dictTypes, res;
      return regeneratorRuntime.async(function RemoveIds$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              ids = this.ctx.params.ids;
              arrId = ids.split(",").filter(function (item) {
                return item;
              }).map(function (item) {
                return parseInt(item);
              }); // 

              _context4.next = 5;
              return regeneratorRuntime.awrap(Schema.dictTypeSchema.find({
                dictId: {
                  $in: arrId
                },
                state: 1
              }));

            case 5:
              dictTypes = _context4.sent;

              if (dictTypes[0]) {
                _context4.next = 13;
                break;
              }

              _context4.next = 9;
              return regeneratorRuntime.awrap(Schema.dictSchema.updateMany({
                id: {
                  $in: arrId
                }
              }, {
                state: 2
              }));

            case 9:
              res = _context4.sent;
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "success", this).call(this, {
                data: res,
                msg: "\u5220\u9664\u6210\u529F"
              });
              _context4.next = 14;
              break;

            case 13:
              // logger.info(`3dictTypes=>:${dictTypes}`)
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "fail", this).call(this, {
                msg: "请先删除字典类型"
              });

            case 14:
              _context4.next = 19;
              break;

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "fail", this).call(this, {
                msg: _context4.t0.stack
              });

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 16]]);
    }
  }, {
    key: "Get|info:id",
    value: function GetInfoId() {
      var id, params, query;
      return regeneratorRuntime.async(function GetInfoId$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = this.ctx.params.id;
              params = {};
              if (id) params.id = parseInt(id);
              _context5.next = 6;
              return regeneratorRuntime.awrap(Schema.dictSchema.findOne(params));

            case 6:
              query = _context5.sent;
              // 查询所有数据
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "success", this).call(this, {
                data: _objectSpread({}, query._doc)
              });
              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictAdminController.prototype), "fail", this).call(this, {
                msg: _context5.t0.stack
              });

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[0, 10]]);
    }
  }]);

  return DictAdminController;
}(BaseController);

module.exports = DictAdminController;