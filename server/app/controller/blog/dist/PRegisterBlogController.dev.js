"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Schema = require('../../model/Model.js');

var path = require("path");

var ExceptionCode = require("../../utils/ExceptionCode");

var redis = require(path.join(process.cwd(), "./config/Redis"));

var AutoID = require('./../../utils/AutoID');

var _require = require('../../utils/Tools.js'),
    encode = _require.encode,
    hash = _require.hash,
    getRandom = _require.getRandom;

var sendEmail = require('../../utils/Nodemailer');

var _require2 = require(path.join(process.cwd(), "./config/logger")),
    logger = _require2.logger;

var ApiAuth = require('../../utils/ApiAuth.js');

var ApiRatelimit = require("../../middleware/ApiRatelimit");

var LoginAdminController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(LoginAdminController, _BaseController);

  function LoginAdminController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, LoginAdminController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginAdminController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.url = "/blog";
    _this.middleLists = {
      "Create|register": [ApiRatelimit(1, 1)] // "Get|code": [ApiRatelimit(60, 1, "注意：60s内只能获取一次code!")],

    };
    return _this;
  } // "Get|list" Get "Get:id"
  // Update "Update:id"
  // Create
  // Remove "Remove:ids"
  // | 代表拼接后端字符串
  // : 代表拼接后端动态路由


  _createClass(LoginAdminController, [{
    key: "Create|register",
    value: function CreateRegister() {
      var _this$ctx$request$bod, userEmail, userPwd, code, redisCode, repeat, currentIndex, addUser;

      return regeneratorRuntime.async(function CreateRegister$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, userEmail = _this$ctx$request$bod.userEmail, userPwd = _this$ctx$request$bod.userPwd, code = _this$ctx$request$bod.code;
              this.ctx.verifyParams({
                userEmail: 'email',
                userPwd: 'string',
                code: 'string'
              });
              _context.next = 4;
              return regeneratorRuntime.awrap(redis.getString(userEmail));

            case 4:
              redisCode = _context.sent;

              if (!(!redisCode || redisCode != code)) {
                _context.next = 7;
                break;
              }

              throw ExceptionCode.FILE_EMAIL_CODE_ERR;

            case 7:
              _context.next = 9;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                $or: [{
                  userEmail: userEmail
                }]
              }, 'id userName userEmail'));

            case 9:
              repeat = _context.sent;

              if (!repeat) {
                _context.next = 15;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "fail", this).call(this, {
                msg: "\u60A8\u65B0\u589E\u7684\u7528\u6237:\u90AE\u7BB1:".concat(repeat.userEmail, "\u5DF2\u7ECF\u5B58\u5728~")
              });
              return _context.abrupt("return");

            case 15:
              _context.prev = 15;
              _context.next = 18;
              return regeneratorRuntime.awrap(AutoID({
                code: "userId"
              }));

            case 18:
              currentIndex = _context.sent;
              addUser = new Schema.usersSchema({
                id: currentIndex,
                userPwd: hash(userPwd),
                userEmail: userEmail,
                role: 1,
                state: 1,
                deptId: [29]
              });
              _context.next = 22;
              return regeneratorRuntime.awrap(addUser.save());

            case 22:
              this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "success", this).call(this, {}, '注册成功');
              _context.next = 28;
              break;

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](15);
              this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "fail", this).call(this, {
                msg: _context.t0.stack
              });

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[15, 25]]);
    }
  }, {
    key: "Get|code",
    value: function GetCode() {
      var userEmail, isSend, code;
      return regeneratorRuntime.async(function GetCode$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userEmail = this.ctx.request.query.userEmail;
              this.ctx.verifyParams({
                userEmail: 'email'
              });
              _context2.prev = 2;
              _context2.next = 5;
              return regeneratorRuntime.awrap(redis.getString(userEmail));

            case 5:
              isSend = _context2.sent;

              if (!isSend) {
                _context2.next = 9;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "fail", this).call(this, {
                msg: "注意：60s内只能获取一次code!"
              });
              return _context2.abrupt("return");

            case 9:
              code = getRandom(100000, 999999).toString();
              _context2.next = 12;
              return regeneratorRuntime.awrap(sendEmail(userEmail, code));

            case 12:
              _context2.next = 14;
              return regeneratorRuntime.awrap(redis.setString(userEmail, code, 120));

            case 14:
              this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "success", this).call(this, {
                msg: "发送成功"
              });
              _context2.next = 23;
              break;

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](2);

              if (!(_context2.t0.stack.indexOf("Message failed: 550 The recipient may contain a non-existent account") > 0)) {
                _context2.next = 22;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "fail", this).call(this, {
                msg: "不存在该邮箱！"
              });
              return _context2.abrupt("return");

            case 22:
              this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[2, 17]]);
    }
  }]);

  return LoginAdminController;
}(BaseController);

module.exports = LoginAdminController;