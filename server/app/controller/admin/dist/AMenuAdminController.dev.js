"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var path = require("path");

var redis = require(path.join(process.cwd(), "./config/Redis"));

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

var AutoID = require('./../../utils/AutoID');

var ApiRatelimit = require("./../../middleware/ApiRatelimit");

var ApiAuth = require("./../../middleware/ApiAuth");

var MenuAdminController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(MenuAdminController, _BaseController);

  function MenuAdminController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, MenuAdminController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MenuAdminController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.userInfo = _this.ctx.state.userInfo;
    _this.url = "/admin/menu";
    _this.middleLists = {
      "Get|list": [ApiAuth(["system:menu:list"]), ApiRatelimit(1, 3)],
      Create: [ApiAuth(["system:menu:post"]), ApiRatelimit(1, 1)],
      "Update:id": [ApiAuth(["system:menu:put"]), ApiRatelimit(1, 1)],
      "Remove:id": [ApiAuth(["system:menu:remove"]), ApiRatelimit(1, 1)],
      "Get|info:id": [ApiAuth(["system:menu:get"]), ApiRatelimit(1, 3)]
    };
    return _this;
  } // "Get|list" Get "Get:id"
  // Update "Update:id"
  // Create
  // Remove "Remove:ids"
  // | 代表拼接后端字符串
  // : 代表拼接后端动态路由


  _createClass(MenuAdminController, [{
    key: "Get|list",
    value: function GetList() {
      var userInfo, _this$ctx$request$que, menuName, _this$ctx$request$que2, state, params, rootList, roleData, resultPermissonList, permissionList;

      return regeneratorRuntime.async(function GetList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userInfo = this.userInfo;
              _context.prev = 1;
              _this$ctx$request$que = this.ctx.request.query, menuName = _this$ctx$request$que.menuName, _this$ctx$request$que2 = _this$ctx$request$que.state, state = _this$ctx$request$que2 === void 0 ? 1 : _this$ctx$request$que2;
              params = {};
              if (menuName) params.menuName = new RegExp("^".concat(menuName), 'ig');
              params.state = parseInt(state);

              if (!(userInfo.role === 0)) {
                _context.next = 15;
                break;
              }

              _context.next = 9;
              return regeneratorRuntime.awrap(Schema.menusSchema.find(params));

            case 9:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 12;
                break;
              }

              _context.t0 = [];

            case 12:
              rootList = _context.t0;
              _context.next = 27;
              break;

            case 15:
              _context.next = 17;
              return regeneratorRuntime.awrap(Schema.rolesSchema.find({
                id: {
                  $in: userInfo.roleList
                }
              }));

            case 17:
              roleData = _context.sent;
              // 然后根据取出来的角色，取出角色拥有的菜单数据，多角色出现相同的对他进行合并，也就是并集了【去重处理】~
              resultPermissonList = [];
              roleData.forEach(function (item) {
                resultPermissonList = resultPermissonList.concat([].concat(_toConsumableArray(item.permissionList.checkedKeys), _toConsumableArray(item.permissionList.halfCheckedKeys)));
              });
              resultPermissonList = _toConsumableArray(new Set(resultPermissonList)); // 去重相同的菜单id

              _context.next = 23;
              return regeneratorRuntime.awrap(Schema.menusSchema.find(_objectSpread({}, params, {
                id: {
                  $in: resultPermissonList
                }
              })));

            case 23:
              _context.t1 = _context.sent;

              if (_context.t1) {
                _context.next = 26;
                break;
              }

              _context.t1 = [];

            case 26:
              rootList = _context.t1;

            case 27:
              permissionList = _get(_getPrototypeOf(MenuAdminController.prototype), "TreeMenu", this).call(this, rootList, null);
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "success", this).call(this, {
                data: permissionList
              });
              _context.next = 34;
              break;

            case 31:
              _context.prev = 31;
              _context.t2 = _context["catch"](1);
              logger.error(_context.t2);

            case 34:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 31]]);
    }
  }, {
    key: "Create",
    value: function Create() {
      var _this$ctx$request$bod, action, params, res, info, currentIndex;

      return regeneratorRuntime.async(function Create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, action = _this$ctx$request$bod.action, params = _objectWithoutProperties(_this$ctx$request$bod, ["action"]);
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(AutoID({
                code: "menuId"
              }));

            case 4:
              currentIndex = _context2.sent;
              params.id = currentIndex;
              params.createByUser = this.ctx.state.userId.id;
              _context2.next = 9;
              return regeneratorRuntime.awrap(Schema.menusSchema.create(params));

            case 9:
              res = _context2.sent;
              info = '创建成功';
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context2.next = 17;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 14]]);
    }
  }, {
    key: "Update:id",
    value: function UpdateId() {
      var _this$ctx$request$bod2, id, action, params, res, info;

      return regeneratorRuntime.async(function UpdateId$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$ctx$request$bod2 = this.ctx.request.body, id = _this$ctx$request$bod2.id, action = _this$ctx$request$bod2.action, params = _objectWithoutProperties(_this$ctx$request$bod2, ["id", "action"]);
              _context3.prev = 1;
              params.updateTime = new Date();
              params.updateByUser = this.ctx.state.userId.id;
              _context3.next = 6;
              return regeneratorRuntime.awrap(Schema.menusSchema.findOneAndUpdate({
                id: id
              }, params));

            case 6:
              res = _context3.sent;
              info = '编辑成功';
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context3.next = 14;
              break;

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "fail", this).call(this, {
                msg: _context3.t0.stack
              });

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[1, 11]]);
    }
  }, {
    key: "Remove:id",
    value: function RemoveId() {
      var id, res, info, menusInfo, rolesInfo;
      return regeneratorRuntime.async(function RemoveId$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              id = this.ctx.request.body.id;
              _context4.prev = 1;
              _context4.next = 4;
              return regeneratorRuntime.awrap(Schema.menusSchema.findOne({
                parentId: {
                  $all: [id]
                },
                state: 1
              }));

            case 4:
              menusInfo = _context4.sent;

              if (!menusInfo) {
                _context4.next = 8;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "fail", this).call(this, {
                msg: "请先将子集删除！"
              });
              return _context4.abrupt("return");

            case 8:
              _context4.next = 10;
              return regeneratorRuntime.awrap(Schema.rolesSchema.findOne({
                $or: [{
                  "permissionList.checkedKeys": {
                    $all: [id]
                  }
                }, {
                  "permissionList.permissionList": {
                    $all: [id]
                  }
                }]
              }));

            case 10:
              rolesInfo = _context4.sent;

              if (!rolesInfo) {
                _context4.next = 14;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "fail", this).call(this, {
                msg: "请先将绑定的角色删除！"
              });
              return _context4.abrupt("return");

            case 14:
              _context4.next = 16;
              return regeneratorRuntime.awrap(Schema.menusSchema.findOneAndUpdate({
                id: id
              }, {
                state: 2
              }));

            case 16:
              res = _context4.sent;
              info = '删除成功';
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context4.next = 24;
              break;

            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "fail", this).call(this, {
                msg: _context4.t0.stack
              });

            case 24:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[1, 21]]);
    }
  }, {
    key: "Get|info:id",
    value: function GetInfoId() {
      var id, params, query;
      return regeneratorRuntime.async(function GetInfoId$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = this.ctx.params.id;
              params = {};
              if (id) params.id = id;
              _context5.next = 6;
              return regeneratorRuntime.awrap(Schema.menusSchema.findOne(params));

            case 6:
              query = _context5.sent;
              // 查询所有数据
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "success", this).call(this, {
                data: _objectSpread({}, query._doc)
              });
              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "fail", this).call(this, {
                msg: _context5.t0.stack
              });

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[0, 10]]);
    }
  }, {
    key: "Get|list_permisson_menu",
    value: function GetList_permisson_menu() {
      var userInfo, _ref2, btnList, menuList, routeList;

      return regeneratorRuntime.async(function GetList_permisson_menu$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userInfo = this.userInfo;
              _context6.next = 3;
              return regeneratorRuntime.awrap(_get(_getPrototypeOf(MenuAdminController.prototype), "list_menu", this).call(this, userInfo.role, userInfo.roleList));

            case 3:
              _ref2 = _context6.sent;
              btnList = _ref2.btnList;
              menuList = _ref2.menuList;
              routeList = _ref2.routeList;
              _context6.next = 9;
              return regeneratorRuntime.awrap(redis.setHashMap(String(userInfo.id), {
                btnList: btnList
              }));

            case 9:
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "success", this).call(this, {
                data: {
                  menuList: menuList,
                  btnList: btnList,
                  routeList: routeList
                }
              });

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return MenuAdminController;
}(BaseController);

module.exports = MenuAdminController;