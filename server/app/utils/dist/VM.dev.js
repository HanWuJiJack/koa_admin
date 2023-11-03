"use strict";

var _require = require('vm2'),
    NodeVM = _require.NodeVM,
    VMScript = _require.VMScript;

var lodash = require("lodash");

var moment = require("moment");

var mongoose = require('mongoose');

var Tools = require("./Tools");

var ApiAuth = require("./ApiAuth");

var AutoID = require("./AutoID");

var ExceptionCode = require("./ExceptionCode");

var defaultSchemas = require('../model/Model');

var _require2 = require('./ModelSchemas'),
    modelSchemas = _require2.modelSchemas;

function VM2(ctx, text) {
  var vm = new NodeVM({
    console: 'inherit',
    timeout: 1000,
    wrapper: "commonjs",
    strict: true,
    sandbox: {
      ctx: ctx,
      _: lodash,
      moment: moment,
      Promise: Promise,
      console: console,
      mongoose: mongoose,
      modelSchemas: modelSchemas,
      Tools: Tools,
      ApiAuth: ApiAuth,
      AutoID: AutoID,
      ExceptionCode: ExceptionCode,
      defaultSchemas: defaultSchemas
    },
    require: {
      external: true,
      builtin: ['fs', 'path'],
      root: "./",
      mock: {
        fs: {
          readFileSync: function readFileSync() {
            return 'Nice try!';
          }
        }
      }
    }
  });
  return vm.run(text);
}

module.exports = VM2;