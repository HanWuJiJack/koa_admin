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
    return _this;
  }

  _createClass(MenuAdminController, [{
    key: "list",
    value: function list() {
      var userInfo, _this$ctx$request$que, menuName, _this$ctx$request$que2, state, params, rootList, roleData, resultPermissonList, permissionList;

      return regeneratorRuntime.async(function list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userInfo = this.userInfo;
              _context.prev = 1;
              _this$ctx$request$que = this.ctx.request.query, menuName = _this$ctx$request$que.menuName, _this$ctx$request$que2 = _this$ctx$request$que.state, state = _this$ctx$request$que2 === void 0 ? 1 : _this$ctx$request$que2;
              params = {};
              if (menuName) params.menuName = menuName;
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
    key: "create",
    value: function create() {
      var _this$ctx$request$bod, id, action, params, res, info, currentIndex, menusInfo;

      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, id = _this$ctx$request$bod.id, action = _this$ctx$request$bod.action, params = _objectWithoutProperties(_this$ctx$request$bod, ["id", "action"]);
              _context2.prev = 1;

              if (!(action == 'create')) {
                _context2.next = 14;
                break;
              }

              _context2.next = 5;
              return regeneratorRuntime.awrap(AutoID({
                code: "menuId"
              }));

            case 5:
              currentIndex = _context2.sent;
              params.id = currentIndex;
              params.createByUser = this.ctx.state.userId.id;
              _context2.next = 10;
              return regeneratorRuntime.awrap(Schema.menusSchema.create(params));

            case 10:
              res = _context2.sent;
              info = '创建成功';
              _context2.next = 33;
              break;

            case 14:
              if (!(action == 'edit')) {
                _context2.next = 23;
                break;
              }

              params.updateTime = new Date();
              params.updateByUser = this.ctx.state.userId.id; // res = await Schema.menusSchema.findByIdAndUpdate(id, params);

              _context2.next = 19;
              return regeneratorRuntime.awrap(Schema.menusSchema.findOneAndUpdate({
                id: id
              }, params));

            case 19:
              res = _context2.sent;
              info = '编辑成功';
              _context2.next = 33;
              break;

            case 23:
              _context2.next = 25;
              return regeneratorRuntime.awrap(Schema.menusSchema.findOne({
                parentId: {
                  $all: [id]
                }
              }));

            case 25:
              menusInfo = _context2.sent;

              if (!menusInfo) {
                _context2.next = 29;
                break;
              }

              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "fail", this).call(this, {
                msg: "请先将子集删除！"
              });
              return _context2.abrupt("return");

            case 29:
              _context2.next = 31;
              return regeneratorRuntime.awrap(Schema.menusSchema.findOneAndUpdate({
                id: id
              }, {
                state: 2
              }));

            case 31:
              res = _context2.sent;
              info = '删除成功';

            case 33:
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context2.next = 39;
              break;

            case 36:
              _context2.prev = 36;
              _context2.t0 = _context2["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(MenuAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 39:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 36]]);
    }
  }, {
    key: "list_permisson_menu",
    value: function list_permisson_menu() {
      var userInfo, _ref2, btnList, menuList, routeList;

      return regeneratorRuntime.async(function list_permisson_menu$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              userInfo = this.userInfo;
              _context3.next = 3;
              return regeneratorRuntime.awrap(_get(_getPrototypeOf(MenuAdminController.prototype), "list_menu", this).call(this, userInfo.role, userInfo.roleList));

            case 3:
              _ref2 = _context3.sent;
              btnList = _ref2.btnList;
              menuList = _ref2.menuList;
              routeList = _ref2.routeList;
              _context3.next = 9;
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
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return MenuAdminController;
}(BaseController);

module.exports = MenuAdminController;