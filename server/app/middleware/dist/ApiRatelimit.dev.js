"use strict";

var RateLimit = require('koa2-ratelimit').RateLimit;

var Stores = require('koa2-ratelimit').Stores;

RateLimit.defaultOptions({
  message: '操作过快，请稍后再试！',
  store: new Stores.Redis({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    // password: 'redis_password',
    database: 1
  })
});
module.exports = RateLimit.middleware({
  interval: 1 * 1000,
  // 3s内
  max: 1,
  keyGenerator: function keyGenerator(ctx) {
    return regeneratorRuntime.async(function keyGenerator$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", "".concat(ctx.url, "|").concat(ctx.request.ip));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }
});