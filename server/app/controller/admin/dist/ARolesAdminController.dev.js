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

var ApiAuth = require('../../utils/ApiAuth.js');

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
              _context.next = 2;
              return regeneratorRuntime.awrap(ApiAuth({
                userInfo: this.userInfo,
                code: ["system:role:list"]
              }));

            case 2:
              _context.prev = 2;
              roleName = this.ctx.request.query.roleName;
              _get$call = _get(_getPrototypeOf(RolesAdminController.prototype), "pager", this).call(this, this.ctx.request.query), page = _get$call.page, skipIndex = _get$call.skipIndex, _get$call$state = _get$call.state, state = _get$call$state === void 0 ? 1 : _get$call$state;
              params = {};
              if (roleName) params.roleName = new RegExp("^".concat(roleName), 'ig');
              params.state = parseInt(state);
              query = Schema.rolesSchema.find(params); // 查询所有数据

              _context.next = 11;
              return regeneratorRuntime.awrap(query.sort({
                id: -1
              }).skip(skipIndex).limit(page.pageSize));

            case 11:
              list = _context.sent;
              _context.next = 14;
              return regeneratorRuntime.awrap(Schema.rolesSchema.countDocuments(params));

            case 14:
              total = _context.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
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
              _context.t0 = _context["catch"](2);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context.t0.stack
              });

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[2, 18]]);
    }
  }, {
    key: "create",
    value: function create() {
      var _this$ctx$request$bod, id, roleName, remark, action, repeat, currentIndex, addRoles, res, usersInfo, _res;

      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, id = _this$ctx$request$bod.id, roleName = _this$ctx$request$bod.roleName, remark = _this$ctx$request$bod.remark, action = _this$ctx$request$bod.action;

              if (!(action === 'create')) {
                _context2.next = 6;
                break;
              }

              _context2.next = 4;
              return regeneratorRuntime.awrap(ApiAuth({
                userInfo: this.userInfo,
                code: ["system:role:post"]
              }));

            case 4:
              _context2.next = 14;
              break;

            case 6:
              if (!(action === 'edit')) {
                _context2.next = 11;
                break;
              }

              _context2.next = 9;
              return regeneratorRuntime.awrap(ApiAuth({
                userInfo: this.userInfo,
                code: ["system:role:put"]
              }));

            case 9:
              _context2.next = 14;
              break;

            case 11:
              if (!(action === 'delete')) {
                _context2.next = 14;
                break;
              }

              _context2.next = 14;
              return regeneratorRuntime.awrap(ApiAuth({
                userInfo: this.userInfo,
                code: ["system:role:remove"]
              }));

            case 14:
              _context2.prev = 14;

              if (!(action === 'create')) {
                _context2.next = 44;
                break;
              }

              if (roleName) {
                _context2.next = 21;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '请填写完整再进行新增提交'
              });
              return _context2.abrupt("return");

            case 21:
              _context2.next = 23;
              return regeneratorRuntime.awrap(Schema.rolesSchema.findOne({
                roleName: roleName
              }, 'id'));

            case 23:
              repeat = _context2.sent;

              if (!repeat) {
                _context2.next = 29;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '您新增的角色:已经存在无需再次添加'
              });
              return _context2.abrupt("return");

            case 29:
              _context2.prev = 29;
              _context2.next = 32;
              return regeneratorRuntime.awrap(AutoID({
                code: "roleId"
              }));

            case 32:
              currentIndex = _context2.sent;
              addRoles = new Schema.rolesSchema({
                id: currentIndex,
                createByUser: this.ctx.state.userId.id,
                roleName: roleName,
                remark: remark ? remark : ''
              });
              _context2.next = 36;
              return regeneratorRuntime.awrap(addRoles.save());

            case 36:
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                msg: '添加角色成功'
              });
              _context2.next = 42;
              break;

            case 39:
              _context2.prev = 39;
              _context2.t0 = _context2["catch"](29);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '添加角色失败，请联系管理员' + _context2.t0.stack
              });

            case 42:
              _context2.next = 63;
              break;

            case 44:
              if (!(action === 'edit')) {
                _context2.next = 52;
                break;
              }

              _context2.next = 47;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                roleName: roleName,
                remark: remark,
                updateTime: new Date(),
                updateByUser: this.ctx.state.userId.id
              }));

            case 47:
              res = _context2.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              return _context2.abrupt("return");

            case 52:
              if (!(action === 'delete')) {
                _context2.next = 63;
                break;
              }

              _context2.next = 55;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                roleList: {
                  $all: [id]
                }
              }));

            case 55:
              usersInfo = _context2.sent;

              if (!usersInfo) {
                _context2.next = 59;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: "请先将人员中该角色删除！"
              });
              return _context2.abrupt("return");

            case 59:
              _context2.next = 61;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                state: 2
              }));

            case 61:
              _res = _context2.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: _res,
                msg: "\u5220\u9664\u6210\u529F"
              });

            case 63:
              _context2.next = 68;
              break;

            case 65:
              _context2.prev = 65;
              _context2.t1 = _context2["catch"](14);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t1.stack
              });

            case 68:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[14, 65], [29, 39]]);
    }
  }, {
    key: "create_permission",
    value: function create_permission() {
      var _this$ctx$request$bod2, id, permissionList, res;

      return regeneratorRuntime.async(function create_permission$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(ApiAuth({
                userInfo: this.userInfo,
                code: ["system:role:put"]
              }));

            case 2:
              _context3.prev = 2;
              _this$ctx$request$bod2 = this.ctx.request.body, id = _this$ctx$request$bod2.id, permissionList = _this$ctx$request$bod2.permissionList;
              _context3.next = 6;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                permissionList: permissionList
              }));

            case 6:
              res = _context3.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              return _context3.abrupt("return");

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](2);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context3.t0.stack
              });

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[2, 11]]);
    }
  }, {
    key: "list_all",
    value: function list_all() {
      var res;
      return regeneratorRuntime.async(function list_all$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(ApiAuth({
                userInfo: this.userInfo,
                code: ["system:role:list"]
              }));

            case 2:
              _context4.prev = 2;
              _context4.next = 5;
              return regeneratorRuntime.awrap(Schema.rolesSchema.find({}, 'id roleName'));

            case 5:
              res = _context4.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              _context4.next = 12;
              break;

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context4.t0.stack
              });

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[2, 9]]);
    }
  }]);

  return RolesAdminController;
}(BaseController);

module.exports = RolesAdminController;