"use strict";

var path = require("path");

var Auth = require('./../middleware/Auth');

var Schema = require('../model/Model');

var vm2 = require("../utils/VM");

var ExceptionCode = require('../utils/ExceptionCode');

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

exports.faas = function _callee(ctx, next, method) {
  var code, faasInfo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // console.log(9999)
          code = ctx.params.code;
          _context.next = 3;
          return regeneratorRuntime.awrap(Schema.faasSchema.findOne({
            method: method,
            code: code,
            state: 1
          }));

        case 3:
          faasInfo = _context.sent;

          if (!faasInfo) {
            _context.next = 23;
            break;
          }

          if (!(faasInfo._doc.isAuth === "1")) {
            _context.next = 8;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(Auth(ctx, next));

        case 8:
          _context.prev = 8;
          _context.next = 11;
          return regeneratorRuntime.awrap(vm2(ctx, next, faasInfo.fn)());

        case 11:
          ctx.body = _context.sent;
          _context.next = 21;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](8);
          logger.error('FAAS:', _context.t0);

          if (!_context.t0.code) {
            _context.next = 19;
            break;
          }

          throw _context.t0;

        case 19:
          // err 对象的属性说明：
          // message：错误提示信息
          // fileName：表示出错代码所在文件
          // lineNumber：出错代码所在行数
          // stack： 出错堆栈信息
          // name：异常对象名/类型
          ExceptionCode.FAAS_UNDEFINED.message = _context.t0.message;
          throw ExceptionCode.FAAS_UNDEFINED;

        case 21:
          _context.next = 24;
          break;

        case 23:
          throw ExceptionCode.FILE_ROUTER_ERR;

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 14]]);
};