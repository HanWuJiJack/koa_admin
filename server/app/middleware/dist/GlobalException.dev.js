"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExceptionCode = require('../utils/ExceptionCode');

var _require = require("../utils/Tools_rsa"),
    decrypt = _require.decrypt;

var path = require("path");

var _require2 = require(path.join(process.cwd(), "./config/logger")),
    logger = _require2.logger;

var Exception = function Exception(ctx, next) {
  var start, key, status, _status;

  return regeneratorRuntime.async(function Exception$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          start = new Date();
          _context.prev = 1;

          if (ctx.request.body && ctx.request.body.isEncrypt) {
            for (key in ctx.request.body) {
              if (Object.hasOwnProperty.call(ctx.request.body, key)) {
                if (key !== "isEncrypt") {
                  ctx.request.body[key] = decrypt(ctx.request.body[key]);
                }
              }
            }
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(next());

        case 5:
          if (!(ctx.body && ctx.body.message === 'Validation Failed')) {
            _context.next = 7;
            break;
          }

          throw _objectSpread({}, ExceptionCode.INVALID_PARAMS, {
            message: ctx.body.errors
          });

        case 7:
          // 处理404
          if (ctx.response.status === 404) {
            ctx.body = ExceptionCode.FILE_ROUTER_ERR;
          }

          logger.info("'SUCCESS'|  ".concat(ctx.method, " |  ").concat(ctx.url, " |  ").concat(new Date() - start, "ms"));
          return _context.abrupt("return", ctx.body);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          logger.info("GlobalError=>", _context.t0);

          if (_context.t0 && _context.t0.code) {
            // 错误类code :1000 - 2000
            if (_context.t0.code >= 1000 && _context.t0.code < 2000) {
              status = _context.t0.code === 1003 ? 401 : 403;
              ctx.response.status = status;
              ctx.body = _context.t0;
            } // 通知类code:2000 - 6000


            if (_context.t0.code >= 2000 && _context.t0.code < 6000) {
              _status = 200;
              ctx.response.status = _status;
              ctx.body = _context.t0;
            }
          } else if (ctx.response.status && ctx.response.status >= 500) {
            ctx.body = {
              code: 999999,
              message: "请将接口保存并联系后端！"
            };
          } else if (_context.t0 || ctx.response.status) {
            // ctx.body = ExceptionCode.UNDEFINED
            if (_context.t0.message === 'Validation Failed') {
              ctx.body = _objectSpread({}, ExceptionCode.INVALID_PARAMS);
            }

            if (_context.t0.message === 'Validation error') {
              ctx.body = _objectSpread({}, ExceptionCode.INVALID_PARAMS);
            }

            if (_context.t0.message.indexOf("文件大于") > -1) {
              ctx.body = _objectSpread({}, ExceptionCode.FILE_SIZE_ERR, {
                title: _context.t0.message
              });
            }

            if (_context.t0.message.indexOf("文件格式只支持") > -1) {
              ctx.body = _objectSpread({}, ExceptionCode.FILE_TYPE_ERR, {
                title: _context.t0.message
              });
            }
          }

          logger.info("'ERROR'|  ".concat(ctx.method, " |  ").concat(ctx.url, " |  ").concat(new Date() - start, "ms "));
          return _context.abrupt("return", ctx.body);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

module.exports = Exception;