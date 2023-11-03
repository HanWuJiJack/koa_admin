"use strict";

var mongoose = require('mongoose');

var dictTypeSchema = mongoose.Schema({
  id: Number,
  "dictId": Number,
  //用户ID，自增长
  "dictLabel": String,
  //字典标签
  "dictValue": String,
  //字典键值
  "dictSort": Number,
  "state": {
    type: Number,
    "default": 1
  },
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
  autoIndex: true,
  autoCreate: true
});
module.exports = mongoose.model("dictType", dictTypeSchema, "dictType");