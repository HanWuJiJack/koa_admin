"use strict";

var path = require("path");

var Schema = require('../model/Model');

var vm2 = require("../utils/VM");

var ExceptionCode = require('../utils/ExceptionCode');

var _require = require(path.join(process.cwd(), "./config/Logger")),
    logger = _require.logger;

exports.FaasSchedule = function _callee(code, method) {
  var faasInfo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Schema.faasSchema.findOne({
            method: method,
            code: code,
            state: 1
          }));

        case 2:
          faasInfo = _context.sent;

          if (!faasInfo) {
            _context.next = 19;
            break;
          }

          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(vm2(ctx, faasInfo._doc.fn)());

        case 7:
          ctx.body = _context.sent;
          _context.next = 17;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](4);
          logger.error('FAAS:', _context.t0);

          if (!_context.t0.code) {
            _context.next = 15;
            break;
          }

          throw _context.t0;

        case 15:
          ExceptionCode.FAAS_UNDEFINED.message = _context.t0.message;
          throw ExceptionCode.FAAS_UNDEFINED;

        case 17:
          _context.next = 20;
          break;

        case 19:
          throw ExceptionCode.FILE_ROUTER_ERR;

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 10]]);
};