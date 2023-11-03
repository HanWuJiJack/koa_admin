"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var AutoID = require('../../utils/AutoID');

var RolesAdminController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(RolesAdminController, _BaseController);

  function RolesAdminController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, RolesAdminController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RolesAdminController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.userInfo = _this.ctx.state.userInfo;
    _this.url = "/admin/roles";
    return _this;
  }

  _createClass(RolesAdminController, [{
    key: "list",
    value: function list() {
      var roleName, _get$call, page, skipIndex, _get$call$state, state, params, query, list, total;

      return regeneratorRuntime.async(function list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              roleName = this.ctx.request.query.roleName;
              _get$call = _get(_getPrototypeOf(RolesAdminController.prototype), "pager", this).call(this, this.ctx.request.query), page = _get$call.page, skipIndex = _get$call.skipIndex, _get$call$state = _get$call.state, state = _get$call$state === void 0 ? 1 : _get$call$state;
              params = {};
              if (roleName) params.roleName = new RegExp("^".concat(roleName), 'ig');
              params.state = parseInt(state);
              query = Schema.rolesSchema.find(params); // 查询所有数据

              _context.next = 9;
              return regeneratorRuntime.awrap(query.sort({
                id: -1
              }).skip(skipIndex).limit(page.pageSize));

            case 9:
              list = _context.sent;
              _context.next = 12;
              return regeneratorRuntime.awrap(Schema.rolesSchema.countDocuments(params));

            case 12:
              total = _context.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: {
                  page: _objectSpread({}, page, {
                    total: total
                  }),
                  list: list
                }
              });
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context.t0.stack
              });

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 16]]);
    }
  }, {
    key: "create",
    value: function create() {
      var _this$ctx$request$bod, id, roleName, remark, action, repeat, currentIndex, addRoles, res, usersInfo, _res;

      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _this$ctx$request$bod = this.ctx.request.body, id = _this$ctx$request$bod.id, roleName = _this$ctx$request$bod.roleName, remark = _this$ctx$request$bod.remark, action = _this$ctx$request$bod.action;

              if (!(action === 'create')) {
                _context2.next = 31;
                break;
              }

              if (roleName) {
                _context2.next = 8;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '请填写完整再进行新增提交'
              });
              return _context2.abrupt("return");

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(Schema.rolesSchema.findOne({
                roleName: roleName
              }, 'id'));

            case 10:
              repeat = _context2.sent;

              if (!repeat) {
                _context2.next = 16;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '您新增的角色:已经存在无需再次添加'
              });
              return _context2.abrupt("return");

            case 16:
              _context2.prev = 16;
              _context2.next = 19;
              return regeneratorRuntime.awrap(AutoID({
                code: "roleId"
              }));

            case 19:
              currentIndex = _context2.sent;
              addRoles = new Schema.rolesSchema({
                id: currentIndex,
                createByUser: this.ctx.state.userId.id,
                roleName: roleName,
                remark: remark ? remark : ''
              });
              _context2.next = 23;
              return regeneratorRuntime.awrap(addRoles.save());

            case 23:
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                msg: '添加角色成功'
              });
              _context2.next = 29;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](16);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '添加角色失败，请联系管理员' + _context2.t0.stack
              });

            case 29:
              _context2.next = 50;
              break;

            case 31:
              if (!(action === 'edit')) {
                _context2.next = 39;
                break;
              }

              _context2.next = 34;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                roleName: roleName,
                remark: remark,
                updateTime: new Date(),
                updateByUser: this.ctx.state.userId.id
              }));

            case 34:
              res = _context2.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              return _context2.abrupt("return");

            case 39:
              if (!(action === 'delete')) {
                _context2.next = 50;
                break;
              }

              _context2.next = 42;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                roleList: {
                  $all: [id]
                }
              }));

            case 42:
              usersInfo = _context2.sent;

              if (!usersInfo) {
                _context2.next = 46;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: "请先将人员中该角色删除！"
              });
              return _context2.abrupt("return");

            case 46:
              _context2.next = 48;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                state: 2
              }));

            case 48:
              _res = _context2.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: _res,
                msg: "\u5220\u9664\u6210\u529F"
              });

            case 50:
              _context2.next = 55;
              break;

            case 52:
              _context2.prev = 52;
              _context2.t1 = _context2["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t1.stack
              });

            case 55:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 52], [16, 26]]);
    }
  }, {
    key: "create_permission",
    value: function create_permission() {
      var _this$ctx$request$bod2, id, permissionList, res;

      return regeneratorRuntime.async(function create_permission$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _this$ctx$request$bod2 = this.ctx.request.body, id = _this$ctx$request$bod2.id, permissionList = _this$ctx$request$bod2.permissionList;
              _context3.next = 4;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                permissionList: permissionList
              }));

            case 4:
              res = _context3.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              return _context3.abrupt("return");

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context3.t0.stack
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 9]]);
    }
  }, {
    key: "list_all",
    value: function list_all() {
      var res;
      return regeneratorRuntime.async(function list_all$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(Schema.rolesSchema.find({}, 'id roleName'));

            case 3:
              res = _context4.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context4.t0.stack
              });

            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }]);

  return RolesAdminController;
}(BaseController);

module.exports = RolesAdminController;