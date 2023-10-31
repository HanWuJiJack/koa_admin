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

// const Controller = require('../../../../core/controller/admin.js');
var BaseController = require('../BaseController');

var Schema = require('./../../model/Model.js');

var mongoose = require('mongoose');

var _require = require('./../../utils/ModelSchemas'),
    modelSchemas = _require.modelSchemas;

var _require2 = require("./../../faas/InitFaas"),
    initFaas = _require2.initFaas;

var path = require("path");

var _require3 = require(path.join(process.cwd(), "./config/logger")),
    logger = _require3.logger;

var DictTypeAdminController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(DictTypeAdminController, _BaseController);

  function DictTypeAdminController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, DictTypeAdminController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DictTypeAdminController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.userInfo = _this.ctx.state.userInfo;
    _this.url = "/admin/dict-type";
    return _this;
  }

  _createClass(DictTypeAdminController, [{
    key: "list",
    value: function list() {
      var _this$ctx$request$que, state, dictId, dictLabel, dictValue, _get$call, page, skipIndex, params, query, list, total;

      return regeneratorRuntime.async(function list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _this$ctx$request$que = this.ctx.request.query, state = _this$ctx$request$que.state, dictId = _this$ctx$request$que.dictId, dictLabel = _this$ctx$request$que.dictLabel, dictValue = _this$ctx$request$que.dictValue;
              _get$call = _get(_getPrototypeOf(DictTypeAdminController.prototype), "pager", this).call(this, this.ctx.request.query), page = _get$call.page, skipIndex = _get$call.skipIndex;
              params = {};
              if (dictId) params.dictId = parseInt(dictId);
              if (state && state != '0') params.state = parseInt(state);
              if (dictLabel) params.dictLabel = new RegExp("".concat(dictLabel), 'ig');
              if (dictValue) params.dictValue = new RegExp("".concat(dictValue), 'ig');
              query = Schema.dictTypeSchema.find(params); // 查询所有数据

              _context.next = 11;
              return regeneratorRuntime.awrap(query.skip(skipIndex).limit(page.pageSize));

            case 11:
              list = _context.sent;
              _context.next = 14;
              return regeneratorRuntime.awrap(Schema.dictTypeSchema.countDocuments(params));

            case 14:
              total = _context.sent;
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "success", this).call(this, {
                data: {
                  page: _objectSpread({}, page, {
                    total: total
                  }),
                  list: list
                }
              });
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "fail", this).call(this, {
                msg: _context.t0.stack
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 18]]);
    }
  }, {
    key: "create",
    value: function create() {
      var _this$ctx$request$bod, dictId, dictLabel, dictValue, dictSort, state, remark, countDoc, add, params, query;

      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _this$ctx$request$bod = this.ctx.request.body, dictId = _this$ctx$request$bod.dictId, dictLabel = _this$ctx$request$bod.dictLabel, dictValue = _this$ctx$request$bod.dictValue, dictSort = _this$ctx$request$bod.dictSort, state = _this$ctx$request$bod.state, remark = _this$ctx$request$bod.remark;

              if (!(!dictId || !dictLabel || !dictValue || !state)) {
                _context2.next = 7;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "fail", this).call(this, {
                msg: '请填写完整再进行新增提交'
              });
              return _context2.abrupt("return");

            case 7:
              _context2.next = 9;
              return regeneratorRuntime.awrap(Schema.counterSchema.findOneAndUpdate({
                _id: 'dictTypeId'
              }, {
                $inc: {
                  currentIndex: 1
                }
              }, {
                "new": true
              }));

            case 9:
              countDoc = _context2.sent;
              logger.info("countDoc:".concat(countDoc));
              add = new Schema.dictTypeSchema({
                id: countDoc.currentIndex,
                remark: remark,
                dictId: dictId,
                dictLabel: dictLabel,
                dictValue: dictValue,
                dictSort: dictSort,
                state: state
              });
              _context2.next = 14;
              return regeneratorRuntime.awrap(add.save());

            case 14:
              params = {};
              params.id = parseInt(dictId);
              _context2.next = 18;
              return regeneratorRuntime.awrap(Schema.dictSchema.findOne(params));

            case 18:
              query = _context2.sent;

              if (!(query._doc.nameCode === "Schema_type")) {
                _context2.next = 22;
                break;
              }

              _context2.next = 22;
              return regeneratorRuntime.awrap(initFaas());

            case 22:
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "success", this).call(this, {
                msg: '添加成功'
              });

            case 23:
              _context2.next = 28;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "fail", this).call(this, {
                msg: '添加失败，请联系管理员' + _context2.t0.stack
              });

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 25]]);
    }
  }, {
    key: "update",
    value: function update() {
      var id, params, res, par, query;
      return regeneratorRuntime.async(function update$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = this.ctx.params.id;
              params = _extends({}, this.ctx.request.body);
              params.updateTime = new Date();
              _context3.next = 6;
              return regeneratorRuntime.awrap(Schema.dictTypeSchema.findOneAndUpdate({
                id: parseInt(id)
              }, params, {
                "new": true
              }));

            case 6:
              res = _context3.sent;
              par = {};
              par.id = parseInt(res._doc.dictId);
              _context3.next = 11;
              return regeneratorRuntime.awrap(Schema.dictSchema.findOne(par));

            case 11:
              query = _context3.sent;
              logger.info("res._doc.dictId:".concat(res._doc.dictId));

              if (!(query._doc.nameCode === "Schema_type")) {
                _context3.next = 16;
                break;
              }

              _context3.next = 16;
              return regeneratorRuntime.awrap(initFaas());

            case 16:
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "success", this).call(this, {
                data: res,
                msg: '修改成功！'
              });
              _context3.next = 22;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "fail", this).call(this, {
                msg: _context3.t0.stack
              });

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 19]]);
    }
  }, {
    key: "remove",
    value: function remove() {
      var ids, arrId, dictTypes, res;
      return regeneratorRuntime.async(function remove$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              ids = this.ctx.params.ids;
              arrId = ids.split(",").filter(function (item) {
                return item;
              }).map(function (item) {
                return parseInt(item);
              });
              _context4.next = 5;
              return regeneratorRuntime.awrap(Schema.dictTypeSchema.find({
                id: {
                  $in: arrId
                }
              }));

            case 5:
              dictTypes = _context4.sent;
              logger.info(dictTypes);
              _context4.next = 9;
              return regeneratorRuntime.awrap(Schema.dictTypeSchema.deleteMany({
                id: {
                  $in: arrId
                }
              }));

            case 9:
              res = _context4.sent;
              // 删除model
              dictTypes.forEach(function (item) {
                var arr = item.dictValue.split("-");
                mongoose.deleteModel(arr[1]);
                delete modelSchemas[arr[0]];
              }); // logger.info("modelSchemas", modelSchemas)

              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "success", this).call(this, {
                data: res,
                msg: "\u5220\u9664\u6210\u529F"
              });
              _context4.next = 17;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "fail", this).call(this, {
                msg: _context4.t0.stack
              });

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 14]]);
    }
  }, {
    key: "get_type",
    value: function get_type() {
      var id, dictInfo, query;
      return regeneratorRuntime.async(function get_type$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = this.ctx.params.id;
              _context5.next = 4;
              return regeneratorRuntime.awrap(Schema.dictSchema.findOne({
                nameCode: id
              }));

            case 4:
              dictInfo = _context5.sent;
              _context5.next = 7;
              return regeneratorRuntime.awrap(Schema.dictTypeSchema.find({
                dictId: dictInfo.id
              }));

            case 7:
              query = _context5.sent;
              // 查询所有数据
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "success", this).call(this, {
                data: query,
                msg: "\u5220\u9664\u6210\u529F"
              });
              _context5.next = 14;
              break;

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "fail", this).call(this, {
                msg: _context5.t0.stack
              });

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[0, 11]]);
    }
  }, {
    key: "get_open_type",
    value: function get_open_type() {
      var type, dictInfo, query;
      return regeneratorRuntime.async(function get_open_type$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              type = this.ctx.params.type;
              _context6.next = 4;
              return regeneratorRuntime.awrap(Schema.dictSchema.findOne({
                nameCode: type
              }));

            case 4:
              dictInfo = _context6.sent;
              _context6.next = 7;
              return regeneratorRuntime.awrap(Schema.dictTypeSchema.find({
                dictId: dictInfo.id
              }));

            case 7:
              query = _context6.sent;
              // 查询所有数据
              this.ctx.body = query;
              _context6.next = 14;
              break;

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "fail", this).call(this, {
                msg: _context6.t0.stack
              });

            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[0, 11]]);
    }
  }, {
    key: "get",
    value: function get() {
      var id, params, query;
      return regeneratorRuntime.async(function get$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              id = this.ctx.params.id;
              params = {};
              if (id) params.id = parseInt(id);
              _context7.next = 6;
              return regeneratorRuntime.awrap(Schema.dictTypeSchema.findOne(params));

            case 6:
              query = _context7.sent;
              // 查询所有数据
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "success", this).call(this, {
                data: _objectSpread({}, query._doc)
              });
              _context7.next = 13;
              break;

            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(DictTypeAdminController.prototype), "fail", this).call(this, {
                msg: _context7.t0.stack
              });

            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[0, 10]]);
    }
  }]);

  return DictTypeAdminController;
}(BaseController);

module.exports = DictTypeAdminController;