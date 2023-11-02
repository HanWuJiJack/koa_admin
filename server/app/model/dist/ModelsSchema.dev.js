"use strict";

var mongoose = require('mongoose');

module.exports = mongoose.model('model', mongoose.Schema({
  id: Number,
  "func": String,
  "name": String,
  "state": {
    type: Number,
    "default": 1
  },
  "createTime": {
    type: Date,
    "default": Date.now()
  },
  "lastLoginTime": {
    type: Date,
    "default": Date.now()
  },
  remark: String
}, {
  autoCreate: true
}), 'model');