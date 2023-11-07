"use strict";

var _this = void 0;

var tools = require('../utils/Tools');

var ExceptionCode = require('../utils/ExceptionCode');

var Schema = require('../model/Model');

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

var redis = require(path.join(process.cwd(), "./config/Redis"));

var ApiAuth = function ApiAuth(code, ctx, next) {
  var userInfo, _ref, btnList, sum, i;

  return regeneratorRuntime.async(function ApiAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          userInfo = ctx.state.userInfo;

          if (userInfo.id) {
            _context.next = 4;
            break;
          }

          ctx.body = ExceptionCode.LOGIN_VERIFY_API;
          return _context.abrupt("return");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(redis.getHashMap(String(userInfo.id)));

        case 6:
          _ref = _context.sent;
          btnList = _ref.btnList;
          sum = 0;

          for (i = 0; i < code.length; i++) {
            if (btnList.includes(code[i])) {
              sum++;
            }
          }

          if (!(sum === 0)) {
            _context.next = 15;
            break;
          }

          ctx.body = ExceptionCode.USER_ROLE_NO_PRIVILEGE;
          return _context.abrupt("return");

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(next());

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = function (code) {
  return ApiAuth.bind(_this, code);
};