const NodeRSA = require('node-rsa')
const path = require("path")
const fs = require('fs-extra')
const {
    logger
} = require(path.join(process.cwd(), "./config/logger"))


//512bit支持的最长明文长度是：512/8 - 11 = 53
// 使用Rsa算法解密时，需要注意明文的长度，超过限制时，可以增加公钥的位数和分段解密解决
// 目前512bit的加密已经不安全，推荐使用1024bit以上的公钥，但也不宜过大，2048bit已经足够安全，否则会给解密带来更大的压力
exports.generator = function generator() {
    if (!fs.existsSync(path.resolve(__dirname, './private.pem'))) {
        var key = new NodeRSA({ b:2048 })
        key.setOptions({ encryptionScheme: 'pkcs1' })
        var privatePem = key.exportKey('pkcs8-private-pem')
        var publicPem = key.exportKey('pkcs8-public-pem')
        fs.writeFile(path.resolve(__dirname, './public.pem'), publicPem, (err) => {
            if (err) throw err
            logger.systemLogger.info('公钥已保存！')
        })
        fs.writeFile(path.resolve(__dirname, './private.pem'), privatePem, (err) => {
            if (err) throw err
            logger.systemLogger.info('私钥已保存！')
        })
    }
}


// 解密
exports.decrypt = function decrypt(txt) {
    const _priKey = fs.readFileSync(path.resolve(__dirname, './private.pem'));
    const privateKey = new NodeRSA(_priKey);
    privateKey.setOptions({ encryptionScheme: 'pkcs1' }); // 因为jsencrypt自身使用的是pkcs1加密方案, nodejs需要修改成pkcs1。
    return privateKey.decrypt(txt, "utf8");
}

// 获取公钥
exports.getPublicKey = function getPublicKey() {
    return fs.readFileSync(path.resolve(__dirname, './public.pem'));
}
