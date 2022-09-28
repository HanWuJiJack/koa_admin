'use strict';
const { filter } = require('lodash');
const _ = require('lodash');
const moment = require('moment')
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const axios = require("axios")
var WXBizDataCrypt = require('./WXBizDataCrypt')
const ExceptionCode = require('../exception/code');

function getRandom(min, max) {
    if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ((max + 1) - min))
    } else {
        return null;
    }
}

function formatTime(data = new Date(), format = "YYYY-MM-DD HH:mm:SS") {
    if (!data) return ''
    return moment(data).format(format)
}

function formatDB(arr, page, perPage, isDesc = true) {
    if (isDesc) {
        _.reverse(arr)
    }
    const total = arr.length
    const lastPage = parseInt((total + perPage - 1) / perPage)
    return {
        total,
        lastPage,
        page,
        perPage,
        data: arr.slice((page - 1) * perPage, perPage),
    }
}
const cacheEmailCode = (() => {
    const obj = {}
    // time:间隔多少分钟后将key删除，不传则不删除
    function set(key, val, time = 0) {
        obj[key] = val
        if (time) {
            setTimeout(() => {
                delete obj[key]
                // console.log("delete")
            }, 1000 * 60 * time)
        }
    }
    function get(key) {
        return obj[key]
    }
    return {
        set,
        get
    }
})()

const filterField = (object, arr) => {
    const obj = {}
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            if (arr.includes(key)) {
                obj[key] = object[key];
            }
        }
    }
    return obj
}

/**
 * 哈希加密
 * @param value mixed 需要加密的数据，默认为UTF-8的字符串或Buffer
 * @param type string 哈希类型可以为 md5/sha1/sha256/sha512
 * @return string 十六进制哈希值
 * */
const hash = (value, type = "md5") => {
    const hash = crypto.createHash(type);
    //可多次调用update(),update()方法默认字符串编码格式为UTF-8也可以传入Buffer
    hash.update(value);
    return hash.digest("hex");
};
/**
 * AES对称加密
 * AES是常用的对称加密算法，加密解析都使用同一个密钥。
 * @param value 待加密数据
 * @param secret string 密钥
 * @param type string 对称加密算法类型，支持aes192/aes-128-ebc/aes-256-cbc等
 * */
const aesEncrypt = (value, secret = process.env.APP_KEY, type = "aes192") => {
    const cipher = crypto.createCipher(type, secret);
    let crypted = cipher.update(value, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
};

/**
 * AES对称解密
 * */
const aesDecrypt = (crypted, secret = process.env.APP_KEY) => {
    const decipher = crypto.createDecipher("aes192", secret);
    let decrypted = decipher.update(crypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

// token过期时间
const ttl = 1000 * 60 * 60 * 12
function encode(key) {
    let payload = {
        exp: ttl ? (Date.now() + ttl) : 0,
        id: key
    }
    return jwt.sign(payload, process.env.APP_KEY)
}

function decode(token) {
    let payload = jwt.decode(token, process.env.APP_KEY);
    // console.log("payload", payload)
    if (payload == null) throw ExceptionCode.AUTH_FAILED;
    if ((payload.exp > 0) && (Date.now() >= payload.exp)) throw ExceptionCode.TOKEN_FAILED;
    return {
        id: payload.id,
    }
}

function UserId(token) {
    return decode(token).id;
}

// 获取openid
const code2Session = (code) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.WX_APPID}&secret=${process.env.WX_SECRET}&js_code=${code}&grant_type=authorization_code`)
            .then((res) => {
                resolve(res.data)
            }, (err) => {
                console.log("code2Session",err)
                reject(err)
            })
    })
}
// 微信解密
const decryptWXData = ({ sessionKey, encryptedData, iv }) => {
    // var sessionKey = 'tiihtNczf5v6AKRyjwEUhQ=='
    // var encryptedData =
    //     'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
    //     'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
    //     '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
    //     '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
    //     'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
    //     'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
    //     '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
    //     'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
    //     '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
    //     '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
    //     'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
    //     '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
    //     '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
    //     'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
    //     'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
    //     '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
    //     'Db/XcxxmK01EpqOyuxINew=='
    // var iv = 'r7BXXKkLb8qrSNn05n0qiA=='
    var pc = new WXBizDataCrypt(process.env.WX_APPID, sessionKey)
    return pc.decryptData(encryptedData, iv)
}
const success = ({ data, msg }) => {
    return {
        'status': 'ok',
        'code': 200,
        'data': null,
        'message': msg || 'success',
        data
    }
}

const fail = ({ data, msg }) => {
    return {
        'status': 'error',
        'code': 403,
        'data': null,
        'message': msg || 'fail',
        data
    }
}
/**
 * 分页结构封装
 * @param {number} pageNum 
 * @param {number} pageSize 
 */
const pager = ({ pageNum = 1, pageSize = 10 }) => {
    pageNum *= 1;
    pageSize *= 1;
    const skipIndex = (pageNum - 1) * pageSize;
    return {
        page: {
            pageNum,
            pageSize
        },
        skipIndex
    }
}

// 解码token
const decodeToken = (token) => {
    if (token) {
        return jwt.verify(token, process.env.APP_KEY);
    }
    return ''
}
// 递归生成菜单
const TreeMenu = (rootList, id) => {
    var result = []
    for (var i = 0; i < rootList.length; i++) {
        // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
        // 所以给他来个强制转换成字符串，才能正常对比他是否相等
        if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id)) {
            result.push(rootList[i]._doc)
        }
    }
    // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加
    result.map(item => {
        item.children = this.TreeMenu(rootList, item._id)
        if (item.children.length === 0) {
            delete item.children
        } else if (item.children.length > 0 && item.children[0].menuType === 2) {
            item.btnList = item.children
        }
    })
    return result
}
// 时间格式化
const formateDate = (date, format) => {
    let fmt = format || 'yyyy-MM-dd hh:mm:ss'
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, date.getFullYear())
    }
    const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            const val = o[k] + '';
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
        }
    }
    return fmt;
}

module.exports = {
    getRandom,
    formatDB,
    cacheEmailCode,
    formatTime,
    filterField,
    hash,
    aesEncrypt,
    aesDecrypt,
    encode,
    UserId,
    code2Session,
    decryptWXData,
    success,
    fail,
    pager,
    decodeToken,
    TreeMenu,
    formateDate
}
