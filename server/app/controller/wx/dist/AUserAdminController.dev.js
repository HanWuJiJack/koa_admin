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

var Schema = require('./../../model/Model.js');

var _require = require('../../utils/Tools.js'),
    encode = _require.encode,
    code2Session = _require.code2Session,
    hash = _require.hash;

var path = require("path");

var _require2 = require(path.join(process.cwd(), "./config/logger")),
    logger = _require2.logger;

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
    _this.url = "/wx/user";
    return _this;
  } // 更新


  _createClass(UserAdminController, [{
    key: "update",
    value: function update() {
      var _this$ctx$request$bod, userId, userName, userEmail, mobile, job, state, roleList, deptId, action, brand, company, companyAddress, InvoiceTitle, dutyParagraph, expressAddress, expressName, expressPhone;

      return regeneratorRuntime.async(function update$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, userId = _this$ctx$request$bod.userId, userName = _this$ctx$request$bod.userName, userEmail = _this$ctx$request$bod.userEmail, mobile = _this$ctx$request$bod.mobile, job = _this$ctx$request$bod.job, state = _this$ctx$request$bod.state, roleList = _this$ctx$request$bod.roleList, deptId = _this$ctx$request$bod.deptId, action = _this$ctx$request$bod.action, brand = _this$ctx$request$bod.brand, company = _this$ctx$request$bod.company, companyAddress = _this$ctx$request$bod.companyAddress, InvoiceTitle = _this$ctx$request$bod.InvoiceTitle, dutyParagraph = _this$ctx$request$bod.dutyParagraph, expressAddress = _this$ctx$request$bod.expressAddress, expressName = _this$ctx$request$bod.expressName, expressPhone = _this$ctx$request$bod.expressPhone; //检测有没有选择部门

              if (deptId) {
                _context.next = 4;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: '部门不能为空'
              });
              return _context.abrupt("return");

            case 4:
              _context.prev = 4;
              _context.next = 7;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOneAndUpdate({
                userId: userId
              }, {
                mobile: mobile,
                job: job,
                state: state,
                roleList: roleList,
                deptId: deptId,
                userName: userName,
                // userPwd: hash(userPwd),
                brand: brand,
                company: company,
                companyAddress: companyAddress,
                InvoiceTitle: InvoiceTitle,
                dutyParagraph: dutyParagraph,
                expressAddress: expressAddress,
                expressName: expressName,
                expressPhone: expressPhone
              }, {
                "new": true
              }));

            case 7:
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                msg: '更新用户数据成功'
              });
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);
              logger.error(_context.t0);
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: '更新用户数据失败'
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[4, 10]]);
    }
  }, {
    key: "create_login",
    value: function create_login() {
      var _this$ctx$request$bod2, userEmail, userPwd, code, res, _ref2, session_key, openid, token, data;

      return regeneratorRuntime.async(function create_login$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.ctx.verifyParams({
                userEmail: 'string',
                userPwd: 'string',
                code: 'string'
              });
              _context2.prev = 1;
              _this$ctx$request$bod2 = this.ctx.request.body, userEmail = _this$ctx$request$bod2.userEmail, userPwd = _this$ctx$request$bod2.userPwd, code = _this$ctx$request$bod2.code;
              _context2.next = 5;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                userEmail: userEmail,
                userPwd: hash(userPwd),
                state: 1
              }));

            case 5:
              res = _context2.sent;

              if (!res) {
                _context2.next = 23;
                break;
              }

              _context2.next = 9;
              return regeneratorRuntime.awrap(code2Session(code));

            case 9:
              _ref2 = _context2.sent;
              session_key = _ref2.session_key;
              openid = _ref2.openid;

              if (!res._doc.openid) {
                _context2.next = 15;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                data: {},
                msg: '账号已经被绑定！'
              });
              return _context2.abrupt("return");

            case 15:
              _context2.next = 17;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOneAndUpdate({
                userEmail: userEmail,
                userPwd: hash(userPwd)
              }, {
                openid: openid,
                session_key: session_key
              }, {
                "new": true
              }));

            case 17:
              token = encode(res._doc.userId);
              data = res._doc;
              data.token = token;
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                data: data,
                msg: '登陆成功！'
              });
              _context2.next = 24;
              break;

            case 23:
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                data: {},
                msg: '账号被禁用、账号或密码错误！'
              });

            case 24:
              _context2.next = 29;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](1);
              logger.error(_context2.t0);

            case 29:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 26]]);
    }
  }, {
    key: "create_code_login",
    value: function create_code_login() {
      var code, _ref3, session_key, openid, res, token, data;

      return regeneratorRuntime.async(function create_code_login$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              this.ctx.verifyParams({
                code: 'string'
              });
              code = this.ctx.request.body.code;
              _context3.next = 5;
              return regeneratorRuntime.awrap(code2Session(code));

            case 5:
              _ref3 = _context3.sent;
              session_key = _ref3.session_key;
              openid = _ref3.openid;
              _context3.next = 10;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                openid: openid,
                state: 1
              }));

            case 10:
              res = _context3.sent;

              if (!res) {
                _context3.next = 20;
                break;
              }

              _context3.next = 14;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOneAndUpdate({
                openid: openid
              }, {
                session_key: session_key
              }, {
                "new": true
              }));

            case 14:
              token = encode(res._doc.userId);
              data = res._doc;
              data.token = token;
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {
                data: data,
                msg: '登陆成功！'
              });
              _context3.next = 21;
              break;

            case 20:
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                data: {},
                msg: '账号被禁用、未绑定账号！'
              });

            case 21:
              _context3.next = 26;
              break;

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3["catch"](0);
              logger.error(_context3.t0);

            case 26:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 23]]);
    }
  }]);

  return UserAdminController;
}(BaseController);

module.exports = UserAdminController;