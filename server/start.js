require('dotenv').config()
var app = require('./app.js');
var port = normalizePort(process.env.PORT || '3002');
var ip = require('ip');
const path = require("path")
const {
  logger
} = require(path.join(process.cwd(), "./config/Logger"))

app.listen(port, () => {
  logger.info(`http://${ip.address()}:${port}`)
});

// var debug = require('debug')('server');
// var http = require('http');



// var server = http.createServer(app.callback());
//   server.listen(port);
//   server.on('error', onError);
//   server.on('listening', onListening);

// // 序列化端口
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

// // 错误处理
// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string' ?
//     'Pipe ' + port :
//     'Port ' + port;

//   switch (error.code) {
//     case 'EACCES':
//       logger.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       logger.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// // 开始监听
// function onListening() {
//   logger.info(`http://${ip.address()}:${port}`)
//   var addr = server.address();
//   var bind = typeof addr === 'string' ?
//     'pipe ' + addr :
//     'port ' + addr.port;
//   debug('Listening on ' + bind);
// }