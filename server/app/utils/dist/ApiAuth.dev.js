"use strict";

var ExceptionCode = require('./ExceptionCode');

var path = require("path");

var redis = require(path.join(process.cwd(), "./config/Redis"));

module.exports = function _callee(_ref) {
  var ctx, code, _ref2, btnList, i;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx = _ref.ctx, code = _ref.code;
          userInfo = ctx.state.userInfo;

          if (userInfo) {
            _context.next = 4;
            break;
          }

          throw ExceptionCode.LOGIN_FAILED;

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(redis.getHashMap(String(userInfo._id)));

        case 6:
          _ref2 = _context.sent;
          btnList = _ref2.btnList;
          i = 0;

        case 9:
          if (!(i < code.length)) {
            _context.next = 15;
            break;
          }

          if (!btnList.includes(code[i])) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return");

        case 12:
          i++;
          _context.next = 9;
          break;

        case 15:
          throw ExceptionCode.USER_ROLE_NO_PRIVILEGE;

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};