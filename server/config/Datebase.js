const path = require("path")
const InitFaas = require("../app/faas/FaasInit")

const {
    logger
} = require(path.join(process.cwd(), "./config/Logger"))

const mongoose = require('mongoose');
let url = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}`;

mongoose.connect(url, {
    dbName: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', () => {
    logger.info('数据库连接失败...', 'e');
});
db.once('open', function () {
    logger.info('数据库连接成功...');
    InitFaas() // 初始化faas
});