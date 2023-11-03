"use strict";

var vm2 = require("../utils/VM");

var _require = require('../utils/ModelSchemas'),
    modelSchemas = _require.modelSchemas;

var Schema = require('../model/Model');

var path = require("path");

var _require2 = require(path.join(process.cwd(), "./config/logger")),
    logger = _require2.logger;

var mongoose = require('mongoose');

var _ = require("lodash");

module.exports = function _callee() {
  var len, keys, i, item, name, models, query, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iterator, key;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(Object.keys(modelSchemas));
          len = Object.keys(modelSchemas).length;
          keys = _.cloneDeep(Object.keys(modelSchemas)); // 先全部清理

          for (i = 0; i < len; i++) {
            item = keys[i]; // console.log("name", i, item)

            name = item.slice(0, -6);
            mongoose.deleteModel(name);
            delete modelSchemas[item];
          }

          console.log(Object.keys(modelSchemas)); // 在进行初始化

          models = [];
          _context.next = 8;
          return regeneratorRuntime.awrap(Schema.ModelsSchema.find({
            state: 1
          }));

        case 8:
          query = _context.sent;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 12;

          for (_iterator = query[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            iterator = _step.value;
            models.push(iterator.func);
          }

          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](12);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 20:
          _context.prev = 20;
          _context.prev = 21;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 23:
          _context.prev = 23;

          if (!_didIteratorError) {
            _context.next = 26;
            break;
          }

          throw _iteratorError;

        case 26:
          return _context.finish(23);

        case 27:
          return _context.finish(20);

        case 28:
          _context.t1 = regeneratorRuntime.keys(models);

        case 29:
          if ((_context.t2 = _context.t1()).done) {
            _context.next = 36;
            break;
          }

          key = _context.t2.value;

          if (!Object.hasOwnProperty.call(models, key)) {
            _context.next = 34;
            break;
          }

          _context.next = 34;
          return regeneratorRuntime.awrap(vm2({}, models[key])());

        case 34:
          _context.next = 29;
          break;

        case 36:
          console.log(Object.keys(modelSchemas));

        case 37:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[12, 16, 20, 28], [21,, 23, 27]]);
};