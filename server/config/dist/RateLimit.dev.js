"use strict";

var RateLimit = require('koa2-ratelimit').RateLimit;

var Stores = require('koa2-ratelimit').Stores;

RateLimit.defaultOptions({
  store: new Stores.Redis({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    // password: 'redis_password',
    database: 1
  })
});
module.exports = RateLimit;