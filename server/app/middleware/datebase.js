var mongoose = require('mongoose');
const log4js = require('./../log4js/log');
let url = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}`;
mongoose.connect(url, {
    dbName: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// /${process.env.DB_DATABASE}
var db = mongoose.connection;
db.on('error', () => {
    log4js.log('数据库连接失败...', 'e');
});
db.once('open', function () {
    log4js.log('数据库连接成功...');
});
