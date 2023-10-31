"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

module.exports = {
  group: function group(_ref) {
    var _ref$routers = _ref.routers,
        routers = _ref$routers === void 0 ? [] : _ref$routers,
        app = _ref.app,
        _ref$middleware = _ref.middleware,
        middleware = _ref$middleware === void 0 ? [] : _ref$middleware,
        _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === void 0 ? undefined : _ref$prefix;

    for (var key in routers) {
      if (Object.hasOwnProperty.call(routers, key)) {
        if (prefix) {
          routers[key].api = prefix + routers[key].api;
        }

        var _routers$key = routers[key],
            api = _routers$key.api,
            fn = _routers$key.fn,
            _routers$key$name = _routers$key.name,
            name = _routers$key$name === void 0 ? undefined : _routers$key$name,
            method = _routers$key.method; // 路径前缀
        // logger.info("接口列表:", routers[key])
        // 路由是否需要name

        if (name) {
          app[method].apply(app, [name, api].concat(_toConsumableArray(middleware), [fn]));
        } else {
          app[method].apply(app, [api].concat(_toConsumableArray(middleware), [fn]));
        }
      }
    }
  }
};