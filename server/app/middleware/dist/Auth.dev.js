"use strict";

var tools = require('../utils/Tools');

var ExceptionCode = require('../utils/ExceptionCode');

var Schema = require('../model/Model');

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

function checkAuth(ctx) {
  if (!ctx.header.authorization) {
    throw ExceptionCode.AUTH_FAILED;
  }

  var id = tools.UserId(ctx.header.authorization.split(" ")[1]);
  logger.info("\u7528\u6237".concat(id, " \u8BBF\u95EE ").concat(ctx.url));
  /* 在这里注入 user 参数 */

  ctx.state.userId = {
    id: id
  };
}

module.exports = function _callee(ctx, next) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          checkAuth(ctx); // 在这里实现权限控制与参数注入

          _context.next = 4;
          return regeneratorRuntime.awrap(Schema.usersSchema.findOne({
            userId: ctx.state.userId.id
          }));

        case 4:
          user = _context.sent;
          ctx.state.userInfo = user._doc;

          if (!(ctx.state.userInfo.state === 2)) {
            _context.next = 8;
            break;
          }

          throw ExceptionCode.DISABLE_LOGIN;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(next());

        case 10:
          _context.next = 17;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);

          if (!(_context.t0.message === 'token has expired')) {
            _context.next = 16;
            break;
          }

          throw ExceptionCode.AUTH_FAILED;

        case 16:
          throw _context.t0;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 12]]);
};