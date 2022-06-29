const Koa = require('koa')
const app = new Koa()
require('dotenv').config()
const views = require('koa-views')
const onerror = require('koa-onerror')
const koalogger = require('koa-logger')
const cors = require('koa2-cors')
const formidable = require('koa2-formidable')
const { generator } = require("./app/utils/tools_rsa")

require('./app/middleware/datebase')

// 生成公钥私钥
generator()

onerror(app)
app.use(koalogger())
app.use(cors({
  origin: '*', // 允许跨域的地址，我的理解类似白名单，*代表全部允许
  maxAge: 5, // 每隔5秒发送预检请求，也就是发送两次请求
  credentials: true, // 允许请求携带cookie
  allowMethods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'], // 请求方式
  allowHeaders: ['Accept', 'Origin', 'Content-type', 'Authorization'],
}))

app.use(formidable({
  uploadDir: __dirname + '/public',
}))

require('./app/middleware')(app)
require('./routes')(app) // api 路由接口组

app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log.error(err)
});


module.exports = app
