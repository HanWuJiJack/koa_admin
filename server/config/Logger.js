const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
  appenders: {
    access: {
      type: 'dateFile',  
      pattern: '-yyyy-MM-dd.log',
      backups: 300, //最多保存的文件数量
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
      type: "dateFile", //按日期分割
      filename: path.join(__dirname, '../logs/', 'all.log'), //存储的日志文件位置
      pattern: "yyyy-MM-dd.log", //日志文件的命名
      backups: 300, //最多保存的文件数量
      layout: {
        type: "pattern",
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m'   //输出的内容样式
      }
    },
    // 订单日志分割
    order: {
      type: "dateFile", //按日期分割
      filename: path.join(__dirname, '../logs/', 'order.log'), //存储的日志文件位置
      pattern: "yyyy-MM-dd-hh.log", //日志文件的命名
      backups: 300, //最多保存的文件数量
      layout: {
        type: "pattern",
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %m'   //输出的内容样式
      }
    }
  },
  categories: {
    default: {
      appenders: ["console"],
      level: "all" //可输出等级
    },
    httplog: {
      appenders: ['out'], //只保存到文件里，不输出到控制台
      level: "all" //可输出等级
    },
    order: {
      appenders: ["order", "console"], //保存到文件里，并输出到控制台
      level: "all" //可输出等级
    }
  }
})
const logger = {
  systemLogger:log4js.getLogger('application'),
  order: log4js.getLogger("order"),
  httplog: log4js.getLogger("httplog"),
}
exports.logger = logger
// logger.httplog.trace("测试trace");
// logger.httplog.debug("测试debug");
// logger.httplog.info("测试info");
// logger.httplog.warn("测试warn");
// logger.httplog.error("测试error");
// logger.httplog.fatal("测试fatal");
exports.accessLogger = () => log4js.koaLogger(log4js.getLogger("httplog"));