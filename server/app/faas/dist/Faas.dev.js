"use strict";

var path = require("path");

var Auth = require('./../middleware/Auth');

var Schema = require('../model/Model');

var vm2 = require("../utils/VM");

var ExceptionCode = require('../utils/ExceptionCode');

var ApiRatelimit = require("../middleware/ApiRatelimit");

var Tools = require("../utils/Tools");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

exports.faas = function _callee(ctx, next, method) {
  var code, faasInfo, time, max, ApiRatelimit_;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
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
            _context.next = 32;
            break;
          }

          if (!(faasInfo._doc.isAuth === "1")) {
            _context.next = 8;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(Auth(ctx, function () {}));

        case 8:
          if (!(faasInfo._doc.isRatelimit === "1")) {
            _context.next = 17;
            break;
          }

          time = faasInfo._doc.time ? parseInt(faasInfo._doc.time) : 1;
          max = faasInfo._doc.max ? parseInt(faasInfo._doc.max) : 10; // const time = 1
          // const max = 3
          // console.log(time, max)

          ApiRatelimit_ = ApiRatelimit(time, max);
          _context.next = 14;
          return regeneratorRuntime.awrap(ApiRatelimit_(ctx, function () {}));

        case 14:
          if (!(ctx.status === 429)) {
            _context.next = 17;
            break;
          }

          ctx.body = Tools.fail({
            msg: "操作过快，请稍后再试！"
          });
          return _context.abrupt("return");

        case 17:
          _context.prev = 17;
          _context.next = 20;
          return regeneratorRuntime.awrap(vm2(ctx, faasInfo._doc.fn)());

        case 20:
          ctx.body = _context.sent;
          _context.next = 30;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](17);
          logger.error('FAAS:', _context.t0);

          if (!_context.t0.code) {
            _context.next = 28;
            break;
          }

          throw _context.t0;

        case 28:
          // err 对象的属性说明：
          // message：错误提示信息
          // fileName：表示出错代码所在文件
          // lineNumber：出错代码所在行数
          // stack： 出错堆栈信息
          // name：异常对象名/类型
          ExceptionCode.FAAS_UNDEFINED.message = _context.t0.message;
          throw ExceptionCode.FAAS_UNDEFINED;

        case 30:
          _context.next = 33;
          break;

        case 32:
          throw ExceptionCode.FILE_ROUTER_ERR;

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[17, 23]]);
};