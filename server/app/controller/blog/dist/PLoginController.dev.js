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

var _require = require('../../utils/Tools.js'),
    encode = _require.encode,
    hash = _require.hash;

var path = require("path");

var _require2 = require(path.join(process.cwd(), "./config/Logger")),
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
    _this.url = "/admin/p/login";
    _this.middleLists = {
      Create: [ApiRatelimit(1, 1)]
    };
    return _this;
  } // "Get|list" Get "Get:id"
  // Update "Update:id"
  // Create
  // Remove "Remove:ids"
  // | 代表拼接后端字符串
  // : 代表拼接后端动态路由


  _createClass(LoginAdminController, [{
    key: "Create",
    value: function Create() {
      var _this$ctx$request$bod, userEmail, userPwd, res, token, data;

      return regeneratorRuntime.async(function Create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.ctx.verifyParams({
                userEmail: 'string',
                userPwd: 'string'
              });
              _context.prev = 1;
              _this$ctx$request$bod = this.ctx.request.body, userEmail = _this$ctx$request$bod.userEmail, userPwd = _this$ctx$request$bod.userPwd;
              _context.next = 5;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                userEmail: userEmail,
                userPwd: hash(userPwd),
                state: 1
              }));

            case 5:
              res = _context.sent;

              if (res) {
                token = encode(res._doc.id);
                data = res._doc;
                data.token = token;
                this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "success", this).call(this, {
                  data: data,
                  msg: '登陆成功！'
                });
              } else {
                this.ctx.body = _get(_getPrototypeOf(LoginAdminController.prototype), "fail", this).call(this, {
                  data: {},
                  msg: '账号被禁用、账号或密码错误！'
                });
              }

              _context.next = 12;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              logger.error(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 9]]);
    }
  }]);

  return LoginAdminController;
}(BaseController);

module.exports = LoginAdminController;