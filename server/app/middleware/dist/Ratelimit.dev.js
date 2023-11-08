"use strict";

var RateLimit = require("./../../config/RateLimit");

module.exports = RateLimit.middleware({
  interval: 1 * 60 * 1000,
  // 1 minutes
  max: 100,
  // 限制每个ip 1分钟请求100次
  keyGenerator: function keyGenerator(ctx) {
    return regeneratorRuntime.async(function keyGenerator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", "".concat(ctx.request.ip, "-global"));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  message: "服务器正忙，请稍后再试！"
}); // https://www.npmjs.com/package/koa2-ratelimit#use-with-mongoosestore