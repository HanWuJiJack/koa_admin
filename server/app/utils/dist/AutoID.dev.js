"use strict";

var Schema = require('./../model/Model');

module.exports = function _callee(_ref) {
  var code, countDoc, add;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          code = _ref.code;
          _context.next = 3;
          return regeneratorRuntime.awrap(Schema.counterSchema.findOneAndUpdate({
            _id: code
          }, {
            $inc: {
              currentIndex: 1
            }
          }, {
            "new": true
          }));

        case 3:
          countDoc = _context.sent;

          if (countDoc) {
            _context.next = 9;
            break;
          }

          add = new Schema.counterSchema({
            "_id": code,
            //唯一标识
            "currentIndex": 1 //当前ID数

          });
          _context.next = 8;
          return regeneratorRuntime.awrap(add.save());

        case 8:
          return _context.abrupt("return", 1);

        case 9:
          return _context.abrupt("return", countDoc.currentIndex);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};