"use strict";

var RateLimit = require("./../../config/RateLimit");

module.exports = function (time, max, msg) {
  return RateLimit.middleware({
    interval: time * 1000,
    // 1s内
    max: max,
    keyGenerator: function keyGenerator(ctx) {
      return regeneratorRuntime.async(function keyGenerator$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", "".concat(ctx.url, "|").concat(ctx.method, "|").concat(ctx.ip, "-API"));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    message: msg || "操作过快，请稍后再试！"
  });
};