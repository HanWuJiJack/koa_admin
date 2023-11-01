"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var jwt = require('jsonwebtoken');

var Schema = require('./../model/Model');

var BaseController =
/*#__PURE__*/
function () {
  function BaseController() {
    _classCallCheck(this, BaseController);
  }

  _createClass(BaseController, [{
    key: "success",
    value: function success(_ref) {
      var data = _ref.data,
          msg = _ref.msg;
      return _defineProperty({
        'status': 'ok',
        'code': 200,
        'data': null,
        'message': msg || 'success'
      }, "data", data);
    }
  }, {
    key: "fail",
    value: function fail(_ref3) {
      var data = _ref3.data,
          msg = _ref3.msg;
      return _defineProperty({
        'status': 'error',
        'code': 403,
        'data': null,
        'message': msg || 'fail'
      }, "data", data);
    }
    /**
     * 分页结构封装
     * @param {number} pageNum 
     * @param {number} pageSize 
     */

  }, {
    key: "pager",
    value: function pager(_ref5) {
      var _ref5$pageNum = _ref5.pageNum,
          pageNum = _ref5$pageNum === void 0 ? 1 : _ref5$pageNum,
          _ref5$pageSize = _ref5.pageSize,
          pageSize = _ref5$pageSize === void 0 ? 10 : _ref5$pageSize;
      pageNum *= 1;
      pageSize *= 1;
      var skipIndex = (pageNum - 1) * pageSize;
      return {
        page: {
          pageNum: pageNum,
          pageSize: pageSize
        },
        skipIndex: skipIndex
      };
    } // 解码token

  }, {
    key: "decodeToken",
    value: function decodeToken(token) {
      if (token) {
        return jwt.verify(token, process.env.APP_KEY);
      }

      return '';
    } // 递归生成菜单

  }, {
    key: "TreeMenu",
    value: function TreeMenu(rootList, id) {
      var _this = this;

      var result = [];

      for (var i = 0; i < rootList.length; i++) {
        // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
        // 所以给他来个强制转换成字符串，才能正常对比他是否相等
        if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id)) {
          result.push(_objectSpread({}, rootList[i]._doc));
        }
      } // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加


      result.map(function (item) {
        item.children = _this.TreeMenu(rootList, item._id);

        if (item.children.length === 0) {
          delete item.children;
        }
      });
      return result;
    } // 递归生成菜单

  }, {
    key: "TreeMenuShow",
    value: function TreeMenuShow(rootList, id) {
      var _this2 = this;

      var result = [];

      for (var i = 0; i < rootList.length; i++) {
        // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
        // 所以给他来个强制转换成字符串，才能正常对比他是否相等
        // 过滤条件 isShow = 1  menuType != 3
        if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id) && rootList[i]._doc.isShow == 1 && rootList[i]._doc.menuType != 3) {
          result.push(_objectSpread({}, rootList[i]._doc));
        }
      } // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加


      result.map(function (item) {
        item.children = _this2.TreeMenuShow(rootList, item._id);

        if (item.children.length === 0) {
          delete item.children;
        }
      });
      return result;
    } // 时间格式化

  }, {
    key: "formateDate",
    value: function formateDate(date, format) {
      var fmt = format || 'yyyy-MM-dd hh:mm:ss';

      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear());
      }

      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };

      for (var k in o) {
        if (new RegExp("(".concat(k, ")")).test(fmt)) {
          var val = o[k] + '';
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
        }
      }

      return fmt;
    }
  }, {
    key: "list_menu",
    value: function list_menu(role, roleList) {
      var rootList, roleData, resultPermissonList, btnList, codeList, routeList, menuList;
      return regeneratorRuntime.async(function list_menu$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(role === 0)) {
                _context.next = 9;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(Schema.menusSchema.find({
                menuState: 1 //状态值：正常 | 停用

              }));

            case 3:
              _context.t0 = _context.sent;

              if (_context.t0) {
                _context.next = 6;
                break;
              }

              _context.t0 = [];

            case 6:
              rootList = _context.t0;
              _context.next = 21;
              break;

            case 9:
              _context.next = 11;
              return regeneratorRuntime.awrap(Schema.rolesSchema.find({
                _id: {
                  $in: roleList
                }
              }));

            case 11:
              roleData = _context.sent;
              // 然后根据取出来的角色，取出角色拥有的菜单数据，多角色出现相同的对他进行合并，也就是并集了【去重处理】~
              resultPermissonList = [];
              roleData.forEach(function (item) {
                resultPermissonList = resultPermissonList.concat([].concat(_toConsumableArray(item.permissionList.checkedKeys), _toConsumableArray(item.permissionList.halfCheckedKeys)));
              });
              resultPermissonList = _toConsumableArray(new Set(resultPermissonList)); // 去重相同的菜单id

              _context.next = 17;
              return regeneratorRuntime.awrap(Schema.menusSchema.find({
                _id: {
                  $in: resultPermissonList
                },
                menuState: 1 //状态值：正常 | 停用

              }));

            case 17:
              _context.t1 = _context.sent;

              if (_context.t1) {
                _context.next = 20;
                break;
              }

              _context.t1 = [];

            case 20:
              rootList = _context.t1;

            case 21:
              btnList = rootList.map(function (item) {
                return item.menuCode;
              }).filter(function (item) {
                return item;
              });
              codeList = rootList.map(function (item) {
                return item.code;
              }).filter(function (item) {
                return item;
              });
              routeList = rootList.filter(function (item) {
                return item.menuType == 2;
              }); // isShow 显示|隐藏 过滤掉隐藏

              menuList = this.TreeMenuShow(rootList, null);
              return _context.abrupt("return", {
                btnList: btnList,
                routeList: routeList,
                menuList: menuList,
                codeList: codeList
              });

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    } // 根据生成的权限菜单过滤出对应的按钮列表

  }, {
    key: "getBtnPermissonList",
    value: function getBtnPermissonList(list) {
      var result = [];

      for (var i = 0; i < list.length; i++) {
        if (list[i].btnList) {
          // 如果btnList存在 那就证明他是最后一个层级的父节点了
          list[i].btnList.forEach(function (item) {
            result.push(item.menuCode);
          });
        } else if (list[i].children && !list[i].btnList) {
          result = result.concat(this.getBtnPermissonList(list[i].children));
        }
      }

      return result;
    }
  }, {
    key: "TreeDept",
    value: function TreeDept(rootList, id) {
      var _this3 = this;

      var result = [];

      for (var i = 0; i < rootList.length; i++) {
        // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
        // 所以给他来个强制转换成字符串，才能正常对比他是否相等
        if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id)) {
          result.push(rootList[i]._doc);
        }
      } // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加


      result.map(function (item) {
        item.children = _this3.TreeDept(rootList, item._id);

        if (item.children.length === 0) {
          delete item.children;
        }
      });
      return result;
    } // async list(){}
    // async list_all(){}
    // async get(){}
    // async create(){}
    // async update(){}
    // async remove(){}

  }]);

  return BaseController;
}();

module.exports = BaseController;