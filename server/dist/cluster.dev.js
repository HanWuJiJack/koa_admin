"use strict";

var cluster = require('cluster');

require('dotenv').config();

var app = require('./app.js');

var debug = require('debug')('server');

var http = require('http');

var numCPUs = require('os').cpus().length;

var port = normalizePort(process.env.PORT || '3002');

var ip = require('ip');

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/Logger")),
    logger = _require.logger; // 如果是主进程


if (cluster.isMaster) {
  // 创建子进程
  var createWorker = function createWorker() {
    // 创建子进程并进行心跳监控
    var worker = cluster.fork(); // 没有回应的ping次数

    var missed = 0; // 有心跳的子进程，没反应就杀死他

    var timer = setInterval(function () {
      // 三次没回应，杀之
      if (missed == 3) {
        clearInterval(timer);
        logger.error(worker.process.pid + '：此线程已经挂了');
        process.kill(worker.process.pid);
        return;
      } // 开始心跳


      missed++; // 给子进程发送消息

      worker.send('ping#' + worker.process.pid);
    }, 10000);
    worker.on('message', function (msg) {
      // 确认心跳回应。
      if (msg == 'pong#' + worker.process.pid) {
        missed--;
      }
    }); // 挂了就没必要再进行心跳了

    worker.on('exit', function () {
      clearInterval(timer);
    });
  };

  // CPU 核数的一半为子进程总数
  // for (let i = 0; i < numCPUs / 2; i++) {
  //   createWorker();
  // }
  for (var i = 0; i < 2; i++) {
    createWorker();
  } // 如果有子进程退出，5s之后重新创建一个子进程


  cluster.on('exit', function () {
    setTimeout(function () {
      createWorker();
    }, 5000);
  });
  cluster.on('listening', function (worker) {
    logger.info("\u521B\u5EFA\u6210\u529Fworker".concat(worker.id, "=>pid:").concat(worker.process.pid));
  });
} else {
  // 如果是子进程
  // 当进程出现会崩溃的错误
  process.on('uncaughtException', function (err) {
    // 这里可以做写日志的操作
    logger.error(err); // 退出进程

    process.exit(1);
  }); // 子进程回应心跳信息

  process.on('message', function (msg) {
    if (msg == 'ping#' + process.pid) {
      process.send('pong#' + process.pid);
    }
  }); // 内存使用过多，自杀

  if (process.memoryUsage().rss > 734003200) {
    process.exit(1);
  } // 子进程都创建一个 server


  var server = http.createServer(app.callback());
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
} // 序列化端口


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
} // 错误处理


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
} // 开始监听


function onListening() {
  logger.info("http://".concat(ip.address(), ":").concat(port));
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}