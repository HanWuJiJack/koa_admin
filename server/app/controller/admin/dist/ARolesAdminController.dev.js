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

var ApiRatelimit = require("./../../middleware/ApiRatelimit");

var ApiAuth = require("./../../middleware/ApiAuth");

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
    _this.middleLists = {
      "Get|list": [ApiAuth(["system:role:list"]), ApiRatelimit(1, 3)],
      Create: [ApiAuth(["system:role:post"]), ApiRatelimit(1, 1)],
      Update: [ApiAuth(["system:role:put"]), ApiRatelimit(1, 1)],
      Remove: [ApiAuth(["system:role:remove"]), ApiRatelimit(1, 1)],
      "Update|permission": [ApiAuth(["system:role:put"]), ApiRatelimit(1, 1)],
      "Get|list_all": [ApiAuth(["system:role:list"]), ApiRatelimit(1, 3)]
    };
    return _this;
  } // "Get|list" Get "Get:id"
  // Update "Update:id"
  // Create
  // Remove "Remove:ids"
  // | 代表拼接后端字符串
  // : 代表拼接后端动态路由


  _createClass(RolesAdminController, [{
    key: "Get|list",
    value: function GetList() {
      var roleName, _get$call, page, skipIndex, _get$call$state, state, params, query, list, total;

      return regeneratorRuntime.async(function GetList$(_context) {
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
    key: "Create",
    value: function Create() {
      var _this$ctx$request$bod, roleName, remark, repeat, currentIndex, addRoles;

      return regeneratorRuntime.async(function Create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, roleName = _this$ctx$request$bod.roleName, remark = _this$ctx$request$bod.remark;
              _context2.prev = 1;

              if (roleName) {
                _context2.next = 7;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '请填写完整再进行新增提交'
              });
              return _context2.abrupt("return");

            case 7:
              _context2.next = 9;
              return regeneratorRuntime.awrap(Schema.rolesSchema.findOne({
                roleName: roleName
              }, 'id'));

            case 9:
              repeat = _context2.sent;

              if (!repeat) {
                _context2.next = 15;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '您新增的角色:已经存在无需再次添加'
              });
              return _context2.abrupt("return");

            case 15:
              _context2.prev = 15;
              _context2.next = 18;
              return regeneratorRuntime.awrap(AutoID({
                code: "roleId"
              }));

            case 18:
              currentIndex = _context2.sent;
              addRoles = new Schema.rolesSchema({
                id: currentIndex,
                createByUser: this.ctx.state.userId.id,
                roleName: roleName,
                remark: remark ? remark : ''
              });
              _context2.next = 22;
              return regeneratorRuntime.awrap(addRoles.save());

            case 22:
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                msg: '添加角色成功'
              });
              _context2.next = 28;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](15);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: '添加角色失败，请联系管理员' + _context2.t0.stack
              });

            case 28:
              _context2.next = 33;
              break;

            case 30:
              _context2.prev = 30;
              _context2.t1 = _context2["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t1.stack
              });

            case 33:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 30], [15, 25]]);
    }
  }, {
    key: "Update",
    value: function Update() {
      var _this$ctx$request$bod2, id, roleName, remark, action, res;

      return regeneratorRuntime.async(function Update$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$ctx$request$bod2 = this.ctx.request.body, id = _this$ctx$request$bod2.id, roleName = _this$ctx$request$bod2.roleName, remark = _this$ctx$request$bod2.remark, action = _this$ctx$request$bod2.action;
              _context3.prev = 1;
              _context3.next = 4;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                roleName: roleName,
                remark: remark,
                updateTime: new Date(),
                updateByUser: this.ctx.state.userId.id
              }));

            case 4:
              res = _context3.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              _context3.next = 11;
              break;

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context3.t0.stack
              });

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 8]]);
    }
  }, {
    key: "Remove",
    value: function Remove() {
      var id, usersInfo, res;
      return regeneratorRuntime.async(function Remove$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = this.ctx.request.body.id;
              _context4.prev = 1;
              _context4.next = 4;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                roleList: {
                  $all: [id]
                }
              }));

            case 4:
              usersInfo = _context4.sent;

              if (!usersInfo) {
                _context4.next = 8;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: "请先将人员中该角色删除！"
              });
              return _context4.abrupt("return");

            case 8:
              _context4.next = 10;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                state: 2
              }));

            case 10:
              res = _context4.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res,
                msg: "\u5220\u9664\u6210\u529F"
              });
              _context4.next = 17;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context4.t0.stack
              });

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[1, 14]]);
    }
  }, {
    key: "Update|permission",
    value: function UpdatePermission() {
      var _this$ctx$request$bod3, id, permissionList, res;

      return regeneratorRuntime.async(function UpdatePermission$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _this$ctx$request$bod3 = this.ctx.request.body, id = _this$ctx$request$bod3.id, permissionList = _this$ctx$request$bod3.permissionList;
              _context5.next = 4;
              return regeneratorRuntime.awrap(Schema.rolesSchema.updateOne({
                id: id
              }, {
                permissionList: permissionList
              }));

            case 4:
              res = _context5.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              return _context5.abrupt("return");

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context5.t0.stack
              });

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[0, 9]]);
    }
  }, {
    key: "Get|list_all",
    value: function GetList_all() {
      var res;
      return regeneratorRuntime.async(function GetList_all$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return regeneratorRuntime.awrap(Schema.rolesSchema.find({}, 'id roleName'));

            case 3:
              res = _context6.sent;
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "success", this).call(this, {
                data: res
              });
              _context6.next = 10;
              break;

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(RolesAdminController.prototype), "fail", this).call(this, {
                msg: _context6.t0.stack
              });

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }]);

  return RolesAdminController;
}(BaseController);

module.exports = RolesAdminController;