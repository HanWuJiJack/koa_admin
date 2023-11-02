"use strict";

var _require = require('../app/faas/Faas'),
    faas = _require.faas;

var Route = require('./BaseRoute');
/**
 * 后端api接口组
 */


module.exports = function (app) {
  Route.group({
    routers: [{
      api: '/faas/list/:code',
      fn: function fn(ctx, next) {
        return faas(ctx, next, "list");
      },
      method: 'get'
    }, {
      api: '/faas/post/:code',
      fn: function fn(ctx, next) {
        return faas(ctx, next, "post");
      },
      method: 'post'
    }, {
      api: '/faas/put/:code',
      fn: function fn(ctx, next) {
        return faas(ctx, next, "put");
      },
      method: 'put'
    }, {
      api: '/faas/remove/:code',
      fn: function fn(ctx, next) {
        return faas(ctx, next, "remove");
      },
      method: 'delete'
    }, {
      api: '/faas/get/:code',
      fn: function fn(ctx, next) {
        return faas(ctx, next, "get");
      },
      method: 'get'
    }],
    prefix: '/custom',
    app: app
  });
  return app;
};