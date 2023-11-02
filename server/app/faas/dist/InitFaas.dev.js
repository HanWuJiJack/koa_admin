"use strict";

var vm2 = require("../utils/VM");

var _require = require('../utils/ModelSchemas'),
    modelSchemas = _require.modelSchemas;

var path = require("path");

var _require2 = require(path.join(process.cwd(), "./config/logger")),
    logger = _require2.logger;

var mongoose = require('mongoose');

module.exports = function _callee() {
  var models, query, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iterator, key;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(Object.keys(modelSchemas)); // 先全部清理

          Object.keys(modelSchemas).map(function (item) {
            if (item != "modelSchema") {
              var name = item.slice(0, -6);
              mongoose.deleteModel(name);
              delete modelSchemas[item];
            }
          }); // 在进行初始化

          models = [];
          _context.next = 5;
          return regeneratorRuntime.awrap(modelSchemas.modelSchema.find({
            state: 1
          }));

        case 5:
          query = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 9;

          for (_iterator = query[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            iterator = _step.value;
            models.push(iterator.func);
          }

          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](9);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 17:
          _context.prev = 17;
          _context.prev = 18;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 20:
          _context.prev = 20;

          if (!_didIteratorError) {
            _context.next = 23;
            break;
          }

          throw _iteratorError;

        case 23:
          return _context.finish(20);

        case 24:
          return _context.finish(17);

        case 25:
          _context.t1 = regeneratorRuntime.keys(models);

        case 26:
          if ((_context.t2 = _context.t1()).done) {
            _context.next = 33;
            break;
          }

          key = _context.t2.value;

          if (!Object.hasOwnProperty.call(models, key)) {
            _context.next = 31;
            break;
          }

          _context.next = 31;
          return regeneratorRuntime.awrap(vm2({}, {}, models[key])());

        case 31:
          _context.next = 26;
          break;

        case 33:
          console.log(Object.keys(modelSchemas));

        case 34:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[9, 13, 17, 25], [18,, 20, 24]]);
};