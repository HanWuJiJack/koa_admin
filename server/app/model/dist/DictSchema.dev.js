"use strict";

var mongoose = require('mongoose');

var dictSchema = mongoose.Schema({
  "id": Number,
  "name": String,
  //名称
  "nameCode": {
    type: String,
    unique: true
  },
  //字典类型
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
module.exports = mongoose.model("dict", dictSchema, "dict");