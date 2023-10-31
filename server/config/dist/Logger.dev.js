"use strict";

var path = require('path');

var log4js = require('koa-log4');

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      backups: 300,
      //最多保存的文件数量
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m'
      },
      filename: path.join(__dirname, '../logs/', 'access.log')
    },
    console: {
      type: "console",
      category: "console"
    },
    out: {
      type: 'console'
    },
    // 服务器接口
    httplog: {
      type: "dateFile",
      //按日期分割
      filename: path.join(__dirname, '../logs/', 'httplog.log'),
      //存储的日志文件位置
      pattern: "yyyy-MM-dd.log",
      //日志文件的命名
      backups: 300,
      //最多保存的文件数量
      layout: {
        type: "pattern",
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m' //输出的内容样式

      }
    },
    // 订单日志分割
    order: {
      type: "dateFile",
      //按日期分割
      filename: path.join(__dirname, '../logs/', 'order.log'),
      //存储的日志文件位置
      pattern: "yyyy-MM-dd-hh.log",
      //日志文件的命名
      backups: 300,
      //最多保存的文件数量
      layout: {
        type: "pattern",
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m' //输出的内容样式

      }
    }
  },
  categories: {
    "default": {
      appenders: ["console"],
      level: "all" //可输出等级

    },
    httplog: {
      appenders: ["httplog", "console"],
      //只保存到文件里，不输出到控制台
      level: "all" //可输出等级

    },
    order: {
      appenders: ["order", "console"],
      //保存到文件里，并输出到控制台
      level: "all" //可输出等级

    }
  }
});
var logger = {
  _systemLogger: log4js.getLogger('application'),
  _order: log4js.getLogger("order")
};

logger.trace = function () {
  var _log4js$getLogger;

  (_log4js$getLogger = log4js.getLogger("httplog")).trace.apply(_log4js$getLogger, arguments);
};

logger.debug = function () {
  var _log4js$getLogger2;

  (_log4js$getLogger2 = log4js.getLogger("httplog")).debug.apply(_log4js$getLogger2, arguments);
};

logger.info = function () {
  var _log4js$getLogger3;

  (_log4js$getLogger3 = log4js.getLogger("httplog")).info.apply(_log4js$getLogger3, arguments);
};

logger.warn = function () {
  var _log4js$getLogger4;

  (_log4js$getLogger4 = log4js.getLogger("httplog")).warn.apply(_log4js$getLogger4, arguments);
};

logger.error = function () {
  var _log4js$getLogger5;

  (_log4js$getLogger5 = log4js.getLogger("httplog")).error.apply(_log4js$getLogger5, arguments);
};

logger.fatal = function () {
  var _log4js$getLogger6;

  (_log4js$getLogger6 = log4js.getLogger("httplog")).fatal.apply(_log4js$getLogger6, arguments);
};

exports.logger = logger; // logger.trace("测试trace");
// logger.debug("测试debug");
// logger.info("测试info");
// logger.warn("测试warn");
// logger.error("测试error");
// logger.fatal("测试fatal");

exports.accessLogger = function () {
  return log4js.koaLogger(log4js.getLogger("httplog"));
};