"use strict";

var path = require("path");

var Auth = require('./../middleware/Auth');

var Schema = require('../model/Model');

var IsolatedVM = require("../utils/VMIsolated");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

exports.faas = function _callee(ctx, next, method) {
  var code, faasInfo;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          code = ctx.params.code;
          _context.next = 3;
          return regeneratorRuntime.awrap(Schema.faasSchema.findOne({
            method: method,
            code: code
          }));

        case 3:
          faasInfo = _context.sent;

          if (!faasInfo) {
            _context.next = 18;
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
          return regeneratorRuntime.awrap(IsolatedVM(ctx, next, faasInfo.fn)());

        case 11:
          ctx.body = _context.sent;
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](8);
          logger.error('Failed to compile script.', _context.t0);
          next(_context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[8, 14]]);
};