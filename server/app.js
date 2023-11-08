const Koa = require('koa')
const app = new Koa()
require('dotenv').config()
const views = require('koa-views')
const onerror = require('koa-onerror')
const path = require("path")
const {
  logger,
  accessLogger
} = require(path.join(process.cwd(), "./config/logger"))
const cors = require('koa2-cors')
const {
  generator
} = require("./app/utils/Tools_rsa")
require('./config/Datebase')

const redis = require("./config/Redis")
// process.env.DB_CONNECTION
// redis.init({ username,
//   password ,
//   host,
//   port ,
//   dbnumber })

redis.init({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})

// 生成公钥私钥
generator()

onerror(app)
app.use(accessLogger())
app.use(cors({
  origin: '*', // 允许跨域的地址，我的理解类似白名单，*代表全部允许
  maxAge: 5, // 每隔5秒发送预检请求，也就是发送两次请求
  credentials: true, // 允许请求携带cookie
  allowMethods: ['GET', 'PUT', 'POST', 'DELETE'], // 请求方式
  allowHeaders: ['Accept', 'Origin', 'Content-type', 'Authorization'],
}))

require('./app/middleware/Middle')(app)
require('./routes/Route')(app) // api 路由接口组

app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// error-handling
app.on('error', (err, ctx) => {
  logger.error(err)
});

module.exports = app