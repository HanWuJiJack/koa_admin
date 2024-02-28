"use strict";

var lodash = require("lodash");

var moment = require("moment");

var mongoose = require('mongoose');

var Tools = require("./tools");

var ApiAuth = require("./ApiAuth");

var defaultSchemas = require('../model/Model');

var _require = require('./ModelSchemas'),
    modelSchemas = _require.modelSchemas;

var ivm = require('isolated-vm');

var isolate = new ivm.Isolate({
  memoryLimit: 128
}); // (async () => {
//     if (!GetModelSchemas({key:"model100001"})) {
//         SetModelSchemas({key:"model100001",val:mongooseModel('test1', mongooseSchema({
//             "createTime": {
//                 type: Date,
//                 default: Date.now()
//             },
//             "lastLoginTime": {
//                 type: Date,
//                 default: Date.now()
//             },
//             remark: String
//         }, {
//             autoIndex: true,
//             autoCreate: true
//         }), 'test1')})
//     }
// })()

var global = {};
var context = isolate.createContextSync();
context.global.setSync('global', new ivm.Reference(global));
context.global.setSync('log', function () {
  var _console;

  (_console = console).log.apply(_console, arguments);
});
context.global.setSync('mongooseModel', function () {
  mongoose.model.apply(mongoose, arguments);
});
context.global.setSync('mongooseSchema', function () {
  mongoose.Schema.apply(mongoose, arguments);
});
context.global.setSync('SetModelSchemas', function (_ref) {
  var key = _ref.key,
      val = _ref.val;
  modelSchemas[key] = val;
});
context.global.setSync('GetModelSchemas', function (_ref2) {
  var key = _ref2.key;
  return modelSchemas[key];
}); // context.global.setSync('mongoose', mongoose)
// context.global.setSync('_', lodash)
// context.global.setSync('moment', moment)
// context.global.setSync('Tools', Tools)
// context.global.setSync('ApiAuth', ApiAuth)
// context.global.setSync('defaultSchemas', defaultSchemas)
// context.global.setSync('modelSchemas', modelSchemas)

function IsolatedVM(ctx, next, text) {
  var hostile;
  return regeneratorRuntime.async(function IsolatedVM$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // context.global.setSync('ctx', ctx)
          // context.global.setSync('next', next)
          hostile = isolate.compileScriptSync(text);
          _context.next = 3;
          return regeneratorRuntime.awrap(hostile.run(context)["catch"](function (err) {
            return console.error(8888, err);
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = IsolatedVM; // function VM2(ctx, next, text) {
//     const vm = new NodeVM({
//         console: 'inherit',
//         timeout: 1000,
//         wrapper: "commonjs",
//         strict: true,
//         sandbox: {
//             ctx: ctx,
//             _: lodash,
//             next: next,
//             moment: moment,
//             Promise: Promise,
//             console: console,
//             mongoose,
//             modelSchemas,
//             Tools,
//             ApiAuth,
//             defaultSchemas,
//         },
//         require: {
//             external: true,
//             builtin: ['fs', 'path'],
//             root: "./",
//             mock: {
//                 fs: {
//                     readFileSync() { return 'Nice try!'; }
//                 }
//             }
//         }
//     });
//     return vm.run(text)
// }