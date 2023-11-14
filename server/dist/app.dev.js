"use strict";

var Koa = require('koa');

var app = new Koa();

require('dotenv').config();

var views = require('koa-views');

var onerror = require('koa-onerror');

var path = require("path"); // 在 Nginx 反向代理配置 proxy_pass 的部分添加这样一行。 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
// 如果 Koa 中没有配置 app.proxy = true，Koa 会忽略 Nginx 在 HTTP 请求头部添加的 X-Forwarded-For 字段，所以要设置app.proxy 为 true。
// app.proxy = true


var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger,
    accessLogger = _require.accessLogger;

var cors = require('koa2-cors');

var _require2 = require("./app/utils/Tools_rsa"),
    generator = _require2.generator;

require('./config/Datebase');

var redis = require("./config/Redis"); // process.env.DB_CONNECTION
// redis.init({ username,
//   password ,
//   host,
//   port ,
//   dbnumber })


redis.init({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
}); // 生成公钥私钥

generator();
onerror(app);
app.use(accessLogger());
app.use(cors({
  origin: '*',
  // 允许跨域的地址，我的理解类似白名单，*代表全部允许
  maxAge: 5,
  // 每隔5秒发送预检请求，也就是发送两次请求
  credentials: true,
  // 允许请求携带cookie
  allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
  // 请求方式
  allowHeaders: ['Accept', 'Origin', 'Content-type', 'Authorization']
}));

require('./app/middleware/Middle')(app);

require('./routes/Route')(app); // api 路由接口组


app.use(require('koa-static')(__dirname + '/public'));
app.use(views(__dirname + '/views', {
  extension: 'pug'
})); // error-handling

app.on('error', function (err, ctx) {
  logger.error(err);
});
module.exports = app;