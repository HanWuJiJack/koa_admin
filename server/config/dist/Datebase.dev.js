"use strict";

var path = require("path");

var InitFaas = require("./../app/faas/InitFaas");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

var mongoose = require('mongoose');

var url = "".concat(process.env.DB_CONNECTION, "://").concat(process.env.DB_HOST, ":").concat(process.env.DB_PORT);
mongoose.connect(url, {
  dbName: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', function () {
  logger.info('数据库连接失败...', 'e');
});
db.once('open', function () {
  logger.info('数据库连接成功...');
  InitFaas(); // 初始化faas
});