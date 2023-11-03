"use strict";

var mongoose = require('mongoose');

var rolesSchema = mongoose.Schema({
  id: Number,
  "state": {
    type: Number,
    "default": 1
  },
  roleName: String,
  // 角色名称
  remark: String,
  // 备注
  // 权限列表
  permissionList: {
    checkedKeys: [],
    halfCheckedKeys: []
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
  createByUser: Number
}, {
  autoCreate: true
});
module.exports = mongoose.model("roles", rolesSchema, "roles");