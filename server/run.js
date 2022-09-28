const { MongoClient } = require("mongodb");
require('dotenv').config()

const connectionConfig = {
    host: process.env.DB_HOST,
    username: encodeURIComponent(process.env.DB_USER),
    password: encodeURIComponent(process.env.DB_PASSWORD),
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    authMechanism: 'DEFAULT'
};

// 某版本之后规定用户名密码需要URI编码
const username = encodeURIComponent(connectionConfig.username);
const password = encodeURIComponent(connectionConfig.password);

// 实例化db对象
const db = function () {
    this.dbClient = null;
    this.MongoClient = null;
    this.isAuth = true
};

db.prototype.getConnection = function () {
    return new Promise(async (resolve, reject) => {
        if (!this.dbClient) {
            if (this.isAuth) {
                let url = `${process.env.DB_CONNECTION}://${connectionConfig.username}:${connectionConfig.password}@${connectionConfig.host}:${connectionConfig.port}`;
                console.log("url", url)
                try {
                    let mongoClient = new MongoClient(url);
                    this.MongoClient = mongoClient;
                    mongoClient.connect(async (err, result) => {
                        if (err) {
                            console.log("连接失败",)
                        }
                        console.log("连接成功")
                        this.dbClient = this.MongoClient.db(connectionConfig.database);
                       
                        resolve(this.dbClient);
                    });

                } catch (error) {
                    console.log(error)
                    reject(error)
                }
            } else {
                let url = `${process.env.DB_CONNECTION}://${connectionConfig.host}:${connectionConfig.port}/`;
                try {
                    let mongoClient = new MongoClient(url, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    });
                    this.MongoClient = mongoClient;
                    mongoClient.connect();
                    this.dbClient = mongoClient.db(connectionConfig.database);
                    resolve(this.dbClient);
                } catch (error) {
                    console.log(error)
                    reject(error)
                }
            }
        }
        resolve(this.dbClient);
    });
}
const manger = require("../db/manger")
db.prototype.my = async function (collectionName, arr, obj) {
    return new Promise((resolve, reject) => {
        this.getConnection().then(e => {
            try {
               
                setTimeout(()=>{
                    console.log(666, this.dbClient)
                    manger(this.dbClient)
                },1000)
               
            } catch (error) {

            }
            resolve()
        }).catch(error => {
            console.log(error)
            reject(error)
        });
    });
}
// db.prototype.my().then((res) => {
//     console.log("成功", res)
// }, (err) => {
//     console.log("失败")
// })

new db().my().then((res) => {
    console.log("成功", res)
}, (err) => {
    console.log("失败")
});
