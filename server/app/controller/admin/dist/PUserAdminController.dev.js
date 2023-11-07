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
  } // "Get|list" Get "Get:id"
  // Update "Update:id"
  // Create
  // Remove "Remove:ids"
  // | 代表拼接后端字符串
  // : 代表拼接后端动态路由


  _createClass(UserAdminController, [{
    key: "Get|list",
    value: function GetList() {
      var list;
      return regeneratorRuntime.async(function GetList$(_context) {
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
    } // async Create() {
    //     const {
    //         userName,
    //         userEmail,
    //     } = this.ctx.request.body;
    //     this.ctx.verifyParams({
    //         userName: 'string',
    //         userEmail: 'string',
    //     })
    //     //先查一下是否数据库里已经存在
    //     const repeat = await Schema.usersSchema.findOne({
    //         $or: [{
    //             userEmail
    //         }]
    //     }, 'id userName userEmail');
    //     // console.log(repeat)
    //     if (repeat) {
    //         this.ctx.body = super.fail({
    //             msg: `您新增的用户:邮箱:${repeat.userEmail}已经存在~`
    //         })
    //         return;
    //     } else {
    //         try {
    //             const currentIndex = await AutoID({
    //                 code: "userId"
    //             })
    //             // console.log(currentIndex)
    //             const addUser = new Schema.usersSchema({
    //                 id: currentIndex,
    //                 // createByUser: this.ctx.state.userId.id,
    //                 userName,
    //                 userPwd: hash('123456'),
    //                 userEmail,
    //                 role: 0, //1:默认普通用户 0是超级管理员
    //             });
    //             await addUser.save();
    //             this.ctx.body = super.success({}, '添加用户成功')
    //         } catch (error) {
    //             // console.log(error)
    //             this.ctx.body = super.fail({
    //                 msg: error.stack
    //             })
    //         }
    //     }
    // }

  }]);

  return UserAdminController;
}(BaseController);

module.exports = UserAdminController;