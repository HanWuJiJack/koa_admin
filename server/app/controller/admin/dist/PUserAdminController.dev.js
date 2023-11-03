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

var AutoID = require('./../../utils/AutoID');

var _require = require('../../utils/Tools.js'),
    hash = _require.hash;

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
    _this.url = "/admin/p/user";
    return _this;
  }

  _createClass(UserAdminController, [{
    key: "list",
    value: function list() {
      var list;
      return regeneratorRuntime.async(function list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return regeneratorRuntime.awrap(Schema.usersSchema.find({}, '', {
                projection: "id userName"
              }));

            case 3:
              list = _context.sent;
              //查询所有数据
              this.ctx.body = list;
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: "\u67E5\u8BE2\u5F02\u5E38:".concat(_context.t0.stack)
              });

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }, {
    key: "create",
    value: function create() {
      var _this$ctx$request$bod, userName, userEmail, repeat, currentIndex, addUser;

      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.log(55555);
              _this$ctx$request$bod = this.ctx.request.body, userName = _this$ctx$request$bod.userName, userEmail = _this$ctx$request$bod.userEmail;
              this.ctx.verifyParams({
                userName: 'string',
                userEmail: 'string'
              }); //先查一下是否数据库里已经存在

              _context2.next = 5;
              return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
                $or: [{
                  userEmail: userEmail
                }]
              }, 'id userName userEmail'));

            case 5:
              repeat = _context2.sent;
              console.log(repeat);

              if (!repeat) {
                _context2.next = 12;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: "\u60A8\u65B0\u589E\u7684\u7528\u6237:\u90AE\u7BB1:".concat(repeat.userEmail, "\u5DF2\u7ECF\u5B58\u5728~")
              });
              return _context2.abrupt("return");

            case 12:
              _context2.prev = 12;
              _context2.next = 15;
              return regeneratorRuntime.awrap(AutoID({
                code: "userId"
              }));

            case 15:
              currentIndex = _context2.sent;
              console.log(currentIndex);
              addUser = new Schema.usersSchema({
                id: currentIndex,
                // createByUser: this.ctx.state.userId.id,
                userName: userName,
                userPwd: hash('123456'),
                userEmail: userEmail,
                role: 0 //1:默认普通用户 0是超级管理员

              });
              _context2.next = 20;
              return regeneratorRuntime.awrap(addUser.save());

            case 20:
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "success", this).call(this, {}, '添加用户成功');
              _context2.next = 27;
              break;

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](12);
              console.log(_context2.t0);
              this.ctx.body = _get(_getPrototypeOf(UserAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[12, 23]]);
    }
  }]);

  return UserAdminController;
}(BaseController);

module.exports = UserAdminController;