"use strict";

var tools = require('../utils/Tools');

var ExceptionCode = require('../utils/ExceptionCode');

var Schema = require('../model/Model');

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

var requestIp = require('request-ip');

module.exports = function _callee(ctx, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx.state.userInfo = {};
          ctx.request.ip = requestIp.getClientIp(ctx.request);
          ctx.ip = ctx.request.ip; // console.log("ctx.realIp", ctx.headers["x-forwarded-for"])

          _context.next = 5;
          return regeneratorRuntime.awrap(next());

        case 5:
          if (!ctx.body) {
            ctx.body = ExceptionCode.FILE_ROUTER_ERR;
          } // console.log(ctx.ip, ctx.ips)


          ctx.body.exp = ctx.state.userId && ctx.state.userId.exp;

          logger._request.info("\n    [\u7528\u6237:".concat(ctx.state.userInfo.userName, "]--\n    [id:").concat(ctx.state.userInfo.id, "]--\n    [ip:").concat(ctx.ip, "]--\n    [\u8BBF\u95EE:").concat(ctx.url, "]--\n    [\u65B9\u6CD5: ").concat(ctx.method, "]--\n    [query:").concat(JSON.stringify(ctx.query), "]--\n    [body:").concat(JSON.stringify(ctx.request.body), "]--\n    [\u8FD4\u56DE\u503C:").concat(JSON.stringify(ctx.body), "]\n    "));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};