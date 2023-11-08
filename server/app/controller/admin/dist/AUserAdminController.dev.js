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

var _require = require('../../utils/Tools.js'),
    hash = _require.hash;

var path = require("path");

var _require2 = require(path.join(process.cwd(), "./config/logger")),
    logger = _require2.logger;

var AutoID = require('./../../utils/AutoID');

var ApiRatelimit = require("./../../middleware/ApiRatelimit");

var ApiAuth = require("./../../middleware/ApiAuth");

var UserAdminController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(UserAdminController, _BaseController);

  function UserAdminController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, UserAdminController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UserAdminController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.userInfo = _this.ctx.state.userInfo;
    _this.url = "/admin/user";
    _this.middleLists = {
      "Get|list": [ApiAuth(["system:user:list"]), ApiRatelimit(1, 3)],
      Create: [ApiAuth(["system:user:post"]), ApiRatelimit(1, 1)],
      "Update|info:id": [ApiAuth(["system:user:put"]), ApiRatelimit(1, 1)],
      "Update|pwd": [ApiAuth(["system:user:put"]), ApiRatelimit(1, 1)],
      Remove: [ApiAuth(["system:user:remove"]), ApiRatelimit(1, 1)],
      "Remove|force": [ApiAuth(["system:user:remove"]), ApiRatelimit(1, 1)],
      "Get|list_all": [ApiAuth(["system:user:list"]), ApiRatelimit(1, 3)],
      "Get|info": [ApiAuth(["system:user:mySelf"]), ApiRatelimit(1, 3)]
    };
    return _this;
  } // "Get|list" Get "Get:id"
  // Update "Update:id"
  // Create
  // Remove "Remove:ids"
  // | 代表拼接后端字符串
  // : 代表拼接后端动态路由


  _createClass(UserAdminController, [{
    key: "Get|list",
    value: function GetList() {
      var _this$ctx$request$que, userId, userName, _this$ctx$request$que2, state, _get$call, page, skipIndex, params, query, list, total;

      return regeneratorRuntime.async(function GetList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _this$ctx$request$que = this.ctx.request.query, userId = _this$ctx$request$que.userId, userName = _this$ctx$request$que.userName, _this$ctx$request$que2 = _this$ctx$request$que.state, state = _this$ctx$request$que2 === void 0 ? 1 : _this$ctx$request$que2;
              _get$call = _get(_getPrototypeOf(UserAdminController.prototype), "pager", this).call(this, this.ctx.request.query), page = _get$call.page, skipIndex = _get$call.skipIndex;
              params = {};
              if (userId) params.userId = userId;
              if (userName) params.userName = userName;
              if (state != 0) params.state = parseInt(state); // 根据条件查询所有用户列表

              query = Schema.usersSchema.find(params); //查询所有数据

              _context.next = 10;
              return regeneratorRuntime.awrap(query.sort({
                id: -1
              }).skip(skipIndex).limit(page.pageSize));

            case 10:
              list = _context.sent;
              _context.next = 13;
              return regeneratorRuntime.awrap(Schema.usersSchema.countDocuments(params));

            case 13:
              total = _context.sent;
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
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
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                data: {},
                msg: "\u67E5\u8BE2\u5F02\u5E38:".concat(_context.t0.stack)
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
      var _this$ctx$request$bod, id, userName, userEmail, mobile, job, state, roleList, deptId, action, brand, company, companyAddress, InvoiceTitle, dutyParagraph, expressAddress, expressName, expressPhone, repeat, currentIndex, addUser;

      return regeneratorRuntime.async(function Create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, id = _this$ctx$request$bod.id, userName = _this$ctx$request$bod.userName, userEmail = _this$ctx$request$bod.userEmail, mobile = _this$ctx$request$bod.mobile, job = _this$ctx$request$bod.job, state = _this$ctx$request$bod.state, roleList = _this$ctx$request$bod.roleList, deptId = _this$ctx$request$bod.deptId, action = _this$ctx$request$bod.action, brand = _this$ctx$request$bod.brand, company = _this$ctx$request$bod.company, companyAddress = _this$ctx$request$bod.companyAddress, InvoiceTitle = _this$ctx$request$bod.InvoiceTitle, dutyParagraph = _this$ctx$request$bod.dutyParagraph, expressAddress = _this$ctx$request$bod.expressAddress, expressName = _this$ctx$request$bod.expressName, expressPhone = _this$ctx$request$bod.expressPhone;
              this.ctx.verifyParams({
                userName: 'string',
                userEmail: 'string',
                deptId: "array"
              }); //先查一下是否数据库里已经存在

              _context2.next = 4;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                $or: [{
                  userEmail: userEmail
                }]
              }, 'id userName userEmail'));

            case 4:
              repeat = _context2.sent;

              if (!repeat) {
                _context2.next = 10;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: "\u60A8\u65B0\u589E\u7684\u7528\u6237:\u90AE\u7BB1:".concat(repeat.userEmail, "\u5DF2\u7ECF\u5B58\u5728~")
              });
              return _context2.abrupt("return");

            case 10:
              _context2.prev = 10;
              _context2.next = 13;
              return regeneratorRuntime.awrap(AutoID({
                code: "userId"
              }));

            case 13:
              currentIndex = _context2.sent;
              addUser = new Schema.usersSchema({
                id: currentIndex,
                createByUser: this.ctx.state.userId.id,
                userName: userName,
                userPwd: hash('123456'),
                userEmail: userEmail,
                role: 1,
                //1:默认普通用户 0是超级管理员
                roleList: roleList,
                job: job,
                state: state,
                deptId: deptId,
                mobile: mobile,
                brand: brand,
                company: company,
                companyAddress: companyAddress,
                InvoiceTitle: InvoiceTitle,
                dutyParagraph: dutyParagraph,
                expressAddress: expressAddress,
                expressName: expressName,
                expressPhone: expressPhone
              });
              _context2.next = 17;
              return regeneratorRuntime.awrap(addUser.save());

            case 17:
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {}, '添加用户成功');
              _context2.next = 23;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](10);
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[10, 20]]);
    }
  }, {
    key: "Update|info:id",
    value: function UpdateInfoId() {
      var id, params, res;
      return regeneratorRuntime.async(function UpdateInfoId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = this.ctx.params.id;
              params = _extends({}, this.ctx.request.body);

              if (params.userPwd) {
                delete params.userPwd;
              }

              params.updateTime = new Date();
              params.updateByUser = this.ctx.state.userId.id;
              _context3.next = 8;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOneAndUpdate({
                id: parseInt(id)
              }, params));

            case 8:
              res = _context3.sent;
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                data: res,
                msg: '修改成功！'
              });
              _context3.next = 15;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: _context3.t0.stack
              });

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 12]]);
    }
  }, {
    key: "Update|pwd",
    value: function UpdatePwd() {
      var _this$ctx$request$bod2, userPwd, id;

      return regeneratorRuntime.async(function UpdatePwd$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this$ctx$request$bod2 = this.ctx.request.body, userPwd = _this$ctx$request$bod2.userPwd, id = _this$ctx$request$bod2.id;
              _context4.prev = 1;
              _context4.next = 4;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOneAndUpdate({
                id: id
              }, {
                updateTime: new Date(),
                updateByUser: this.ctx.state.userId.id,
                userPwd: hash(userPwd)
              }, {
                "new": true
              }));

            case 4:
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                msg: '更新用户数据成功'
              });
              _context4.next = 11;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](1);
              logger.error(_context4.t0);
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: '更新用户数据失败'
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[1, 7]]);
    } // 支持单个删除

  }, {
    key: "Remove",
    value: function Remove() {
      var userIds, res;
      return regeneratorRuntime.async(function Remove$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userIds = this.ctx.request.body.userIds;
              _context5.next = 3;
              return regeneratorRuntime.awrap(Schema.usersSchema.updateMany({
                id: {
                  $in: userIds
                }
              }, {
                state: 2
              }));

            case 3:
              res = _context5.sent;

              if (!res.nModified) {
                _context5.next = 7;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                data: res,
                msg: "\u5171\u5220\u9664\u6210\u529F".concat(res.nModified, "\u6761")
              });
              return _context5.abrupt("return");

            case 7:
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: '删除失败'
              });

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    } // 永久删除

  }, {
    key: "Remove|force",
    value: function RemoveForce() {
      var userIds, res;
      return regeneratorRuntime.async(function RemoveForce$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              userIds = this.ctx.request.body.userIds;
              _context6.next = 4;
              return regeneratorRuntime.awrap(Schema.usersSchema.deleteMany({
                userId: {
                  $in: userIds
                }
              }));

            case 4:
              res = _context6.sent;
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                data: res,
                msg: "\u5220\u9664\u6210\u529F"
              });
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: _context6.t0.stack
              });

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this, [[0, 8]]);
    }
  }, {
    key: "Get|list_all",
    value: function GetList_all() {
      var list;
      return regeneratorRuntime.async(function GetList_all$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return regeneratorRuntime.awrap(Schema.usersSchema.find({}));

            case 3:
              list = _context7.sent;
              //查询所有数据
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                data: list
              });
              _context7.next = 10;
              break;

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: "\u67E5\u8BE2\u5F02\u5E38:".concat(_context7.t0.stack)
              });

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }, {
    key: "Get|info",
    value: function GetInfo() {
      return regeneratorRuntime.async(function GetInfo$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                data: this.userInfo
              });

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }]);

  return UserAdminController;
}(BaseController);

module.exports = UserAdminController;