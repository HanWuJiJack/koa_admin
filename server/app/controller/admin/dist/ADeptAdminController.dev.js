"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    return _this;
  }

  _createClass(DeptAdminController, [{
    key: "list",
    value: function list() {
      var deptName, params, rootList, deptList;
      return regeneratorRuntime.async(function list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              deptName = this.ctx.request.query.deptName;
              params = {};
              if (deptName) params.deptName = deptName;
              _context.next = 5;
              return regeneratorRuntime.awrap(Schema.deptSchema.find(params));

            case 5:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 8;
                break;
              }

              _context.t0 = [];

            case 8:
              rootList = _context.t0;
              deptList = _get(_getPrototypeOf(DeptAdminController.prototype), "TreeDept", this).call(this, rootList, null);
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "success", this).call(this, {
                data: deptList
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "create",
    value: function create() {
      var _this$ctx$request$bod, _id, action, params, res, info;

      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, _id = _this$ctx$request$bod._id, action = _this$ctx$request$bod.action, params = _objectWithoutProperties(_this$ctx$request$bod, ["_id", "action"]);
              _context2.prev = 1;

              if (!(action == 'create')) {
                _context2.next = 9;
                break;
              }

              _context2.next = 5;
              return regeneratorRuntime.awrap(Schema.deptSchema.create(params));

            case 5:
              res = _context2.sent;
              info = '创建成功';
              _context2.next = 23;
              break;

            case 9:
              if (!(action == 'edit')) {
                _context2.next = 17;
                break;
              }

              params.updateTime = new Date();
              _context2.next = 13;
              return regeneratorRuntime.awrap(Schema.deptSchema.findByIdAndUpdate(_id, params));

            case 13:
              res = _context2.sent;
              info = '编辑成功';
              _context2.next = 23;
              break;

            case 17:
              _context2.next = 19;
              return regeneratorRuntime.awrap(Schema.deptSchema.findByIdAndRemove(_id));

            case 19:
              res = _context2.sent;
              _context2.next = 22;
              return regeneratorRuntime.awrap(Schema.deptSchema.deleteMany({
                parentId: {
                  $all: [_id]
                }
              }));

            case 22:
              info = '删除成功';

            case 23:
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context2.next = 29;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(DeptAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 29:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 26]]);
    }
  }]);

  return DeptAdminController;
}(BaseController);

module.exports = DeptAdminController;