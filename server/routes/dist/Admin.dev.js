"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Auth = require("./../app/middleware/Auth");

var Admin = require("../app/controller/admin/Admin");

var Blog = require("../app/controller/blog/Blog");

var WX = require("../app/controller/wx/WX");

var Route = require('./BaseRoute'); // "Get|list" Get "Get:id"
// Update "Update:id"
// Create
// Remove "Remove:ids"
// | 代表拼接后端字符串
// : 代表拼接后端动态路由


var methods = ["Get", "Update", "Create", "Remove"];

var getMethod = function getMethod(key) {
  if (key.indexOf('Get') > -1) {
    return 'get';
  }

  if (key.indexOf('Create') > -1) {
    return 'post';
  }

  if (key.indexOf('Update') > -1) {
    return 'put';
  }

  if (key.indexOf('Remove') > -1) {
    return 'delete';
  }
};

var getRoutes = function getRoutes(arr) {
  return arr.flatMap(function (controllerItem) {
    var controller = new controllerItem({});
    var list = [];
    var keys = Object.getOwnPropertyNames(controllerItem.prototype);

    var _loop = function _loop(i) {
      // 过滤函数
      var sum = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (keys[i].indexOf(item) > -1) {
            sum++;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (sum == 0) {
        return "continue";
      }

      var Fn = controller[keys[i]];

      if (Object.prototype.toString.call(Fn) === "[object Function]" || Object.prototype.toString.call(Fn) === "[object AsyncFunction]") {
        var api = controller.url;

        if (keys[i].indexOf("|") > -1 && keys[i].indexOf(":") > -1) {
          api = api + "/" + keys[i].split("|").slice(1).join("/");
          api = api.replaceAll(":", "/:");
        } else {
          if (keys[i].indexOf("|") > -1) {
            api = api + "/" + keys[i].split("|").slice(1).join("/");
          }

          if (keys[i].indexOf(":") > -1) {
            api = api + "/:" + keys[i].split(":").pop();
          }
        }

        var fn = function fn(ctx, next) {
          return new controllerItem({
            ctx: ctx,
            next: next
          })[keys[i]]();
        };

        var method = getMethod(keys[i]);

        if (!controller.middleLists) {
          controller.middleLists = {};
        }

        if (!controller.middleLists[keys[i]]) {
          controller.middleLists[keys[i]] = [];
        }

        if (method) {
          list.push({
            api: api,
            fn: fn,
            method: method,
            middlewareList: _toConsumableArray(controller.middleLists[keys[i]])
          });
        }
      }
    };

    for (var i in keys) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return list;
  });
}; // 权限列表


var AuthList = getRoutes([].concat(_toConsumableArray(Admin.auth), _toConsumableArray(WX.auth), _toConsumableArray(Blog.auth))); // 开放列表

var openList = getRoutes([].concat(_toConsumableArray(Admin["public"]), _toConsumableArray(WX["public"]), _toConsumableArray(Blog["public"])));
/**
 * 后端api接口组
 */

module.exports = function (app) {
  Route.group({
    routers: openList,
    prefix: '/open',
    app: app
  });
  Route.group({
    routers: AuthList,
    middleware: [Auth],
    prefix: '/auth',
    app: app
  });
  return app;
};