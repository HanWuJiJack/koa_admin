"use strict";

var mongoose = require('mongoose');

var faasSchema = mongoose.Schema({
  id: Number,
  "method": String,
  //函数类型
  "fn": String,
  //函数
  "path": String,
  //函数
  "isAuth": {
    type: String,
    "default": "1"
  },
  // 1:正常  2：停用 , //
  "code": {
    type: String,
    unique: false
  },
  //字典类型
  schemaCode: String,
  "state": {
    type: Number,
    "default": 1
  },
  // 1:正常  2：停用 
  updateTime: {
    type: Date,
    "default": Date.now()
  },
  updateByUser: Number,
  createTime: {
    type: Date,
    "default": Date.now()
  },
  createByUser: Number,
  remark: String
}, {
  autoCreate: true
});
module.exports = mongoose.model("faas", faasSchema, "faas");