"use strict";

var tools = require('../utils/Tools');

var ExceptionCode = require('../utils/ExceptionCode');

var Schema = require('../model/Model');

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

module.exports = function _callee(ctx, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx.state.userInfo = {};
          _context.next = 3;
          return regeneratorRuntime.awrap(next());

        case 3:
          // console.log("ctx.state.userId.exp", ctx.state.userId && ctx.state.userId.exp)
          if (!ctx.body) {
            ctx.body = ExceptionCode.FILE_ROUTER_ERR;
          }

          ctx.body.exp = ctx.state.userId && ctx.state.userId.exp;

          logger._request.info("\n    [\u7528\u6237:".concat(ctx.state.userInfo.userName, "]--\n    [id:").concat(ctx.state.userInfo.id, "]--\n    [\u8BBF\u95EE ").concat(ctx.url, "]--[query:").concat(JSON.stringify(ctx.query), "]--\n    [body:").concat(JSON.stringify(ctx.request.body), "]--\n    [\u8FD4\u56DE\u503C:").concat(JSON.stringify(ctx.body), "]\n    "));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};