"use strict";

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  "id": String,
  //唯一标识
  "currentIndex": Number //当前ID数

}, {
  autoCreate: true
});
module.exports = mongoose.model("counter", userSchema, "counter");