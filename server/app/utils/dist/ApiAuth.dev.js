"use strict";

var ExceptionCode = require('./ExceptionCode');

var path = require("path");

var redis = require(path.join(process.cwd(), "./config/Redis"));

module.exports = function _callee(_ref) {
  var _ref$userInfo, userInfo, code, _ref2, btnList, i;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$userInfo = _ref.userInfo, userInfo = _ref$userInfo === void 0 ? {} : _ref$userInfo, code = _ref.code;

          if (userInfo.id) {
            _context.next = 3;
            break;
          }

          throw ExceptionCode.LOGIN_VERIFY_API;

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(redis.getHashMap(String(userInfo.id)));

        case 5:
          _ref2 = _context.sent;
          btnList = _ref2.btnList;
          i = 0;

        case 8:
          if (!(i < code.length)) {
            _context.next = 14;
            break;
          }

          if (!btnList.includes(code[i])) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return");

        case 11:
          i++;
          _context.next = 8;
          break;

        case 14:
          throw ExceptionCode.USER_ROLE_NO_PRIVILEGE;

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
};