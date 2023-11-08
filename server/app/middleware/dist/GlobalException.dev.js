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
  var key, status, _status;

  return regeneratorRuntime.async(function Exception$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (ctx.request.body && ctx.request.body.isEncrypt) {
            for (key in ctx.request.body) {
              if (Object.hasOwnProperty.call(ctx.request.body, key)) {
                if (key !== "isEncrypt") {
                  ctx.request.body[key] = decrypt(ctx.request.body[key]);
                }
              }
            }
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(next());

        case 4:
          if (!(ctx.body && ctx.body.message === 'Validation Failed')) {
            _context.next = 6;
            break;
          }

          throw _objectSpread({}, ExceptionCode.INVALID_PARAMS, {
            message: ctx.body.errors
          });

        case 6:
          // 处理404
          if (ctx.response.status === 404) {
            ctx.body = ExceptionCode.FILE_ROUTER_ERR;
          }

          return _context.abrupt("return", ctx.body);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log("error", _context.t0);

          if (_context.t0 && _context.t0.code) {
            // console.log("error",error)
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
            if (_context.t0.message === 'Validation Failed') {
              ctx.body = _objectSpread({}, ExceptionCode.INVALID_PARAMS);
            } else if (_context.t0.message === 'Validation error') {
              ctx.body = _objectSpread({}, ExceptionCode.INVALID_PARAMS);
            } else if (_context.t0.message.indexOf("文件大于") > -1) {
              ctx.body = _objectSpread({}, ExceptionCode.FILE_SIZE_ERR, {
                title: _context.t0.message
              });
            } else if (_context.t0.message.indexOf("文件格式只支持") > -1) {
              ctx.body = _objectSpread({}, ExceptionCode.FILE_TYPE_ERR, {
                title: _context.t0.message
              });
            } else {
              ctx.body = {
                code: 999999,
                message: _context.t0.message
              };
            }
          } else {
            ctx.body = {
              code: 999999,
              message: _context.t0.message
            };
          }

          logger._globalErr.error("\n        [\u7528\u6237:".concat(ctx.state.userInfo.userName, "]--\n        [id:").concat(ctx.state.userInfo.id, "]--\n        [\u8BBF\u95EE ").concat(ctx.url, "]--\n        [\u65B9\u6CD5: ").concat(ctx.method, "]--\n        [query:").concat(JSON.stringify(ctx.query), "]--\n        [body:").concat(JSON.stringify(ctx.request.body), "]--\n        [\u8FD4\u56DE\u503C:").concat(JSON.stringify(ctx.body), "]--\n        [\u539F\u59CB\u9519\u8BEF\u4FE1\u606F:").concat(_context.t0.message, "]--\n        [stack:").concat(_context.t0.stack, "]\n        "));

          return _context.abrupt("return", ctx.body);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = Exception;