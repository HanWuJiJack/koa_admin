'use strict';

var _this = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('lodash'),
    filter = _require.filter;

var _ = require('lodash');

var moment = require('moment');

var crypto = require("crypto");

var jwt = require("jsonwebtoken");

var axios = require("axios");

var WXBizDataCrypt = require('./WXBizDataCrypt');

var ExceptionCode = require('./ExceptionCode');

var path = require("path");

var _require2 = require(path.join(process.cwd(), "./config/logger")),
    logger = _require2.logger;

function getRandom(min, max) {
  if (arguments.length === 2) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  } else {
    return null;
  }
}

function formatTime() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "YYYY-MM-DD HH:mm:SS";
  if (!data) return '';
  return moment(data).format(format);
}

function formatDB(arr, page, perPage) {
  var isDesc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  if (isDesc) {
    _.reverse(arr);
  }

  var total = arr.length;
  var lastPage = parseInt((total + perPage - 1) / perPage);
  return {
    total: total,
    lastPage: lastPage,
    page: page,
    perPage: perPage,
    data: arr.slice((page - 1) * perPage, perPage)
  };
}

var cacheEmailCode = function () {
  var obj = {}; // time:间隔多少分钟后将key删除，不传则不删除

  function set(key, val) {
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    obj[key] = val;

    if (time) {
      setTimeout(function () {
        delete obj[key];
      }, 1000 * 60 * time);
    }
  }

  function get(key) {
    return obj[key];
  }

  return {
    set: set,
    get: get
  };
}();

var filterField = function filterField(object, arr) {
  var obj = {};

  for (var key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (arr.includes(key)) {
        obj[key] = object[key];
      }
    }
  }

  return obj;
};
/**
 * 哈希加密
 * @param value mixed 需要加密的数据，默认为UTF-8的字符串或Buffer
 * @param type string 哈希类型可以为 md5/sha1/sha256/sha512
 * @return string 十六进制哈希值
 * */


var hash = function hash(value) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "md5";
  var hash = crypto.createHash(type); //可多次调用update(),update()方法默认字符串编码格式为UTF-8也可以传入Buffer

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


var aesEncrypt = function aesEncrypt(value) {
  var secret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.env.APP_KEY;
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "aes192";
  var cipher = crypto.createCipher(type, secret);
  var crypted = cipher.update(value, "utf8", "hex");
  crypted += cipher["final"]("hex");
  return crypted;
};
/**
 * AES对称解密
 * */


var aesDecrypt = function aesDecrypt(crypted) {
  var secret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : process.env.APP_KEY;
  var decipher = crypto.createDecipher("aes192", secret);
  var decrypted = decipher.update(crypted, "hex", "utf8");
  decrypted += decipher["final"]("utf8");
  return decrypted;
}; // token过期时间


var ttl = 1000 * 60 * 60 * 12;

function encode(key) {
  var payload = {
    exp: ttl ? Date.now() + ttl : 0,
    id: key
  };
  return jwt.sign(payload, process.env.APP_KEY);
}

function decode(token) {
  var payload = jwt.decode(token, process.env.APP_KEY);
  if (payload == null) throw ExceptionCode.AUTH_FAILED;
  if (payload.exp > 0 && Date.now() >= payload.exp) throw ExceptionCode.TOKEN_FAILED;
  return {
    id: payload.id
  };
}

function UserId(token) {
  return decode(token).id;
} // 获取openid


var code2Session = function code2Session(code) {
  return new Promise(function (resolve, reject) {
    axios.get("https://api.weixin.qq.com/sns/jscode2session?appid=".concat(process.env.WX_APPID, "&secret=").concat(process.env.WX_SECRET, "&js_code=").concat(code, "&grant_type=authorization_code")).then(function (res) {
      resolve(res.data);
    }, function (err) {
      logger.error("code2Session", err);
      reject(err);
    });
  });
}; // 微信解密


var decryptWXData = function decryptWXData(_ref) {
  var sessionKey = _ref.sessionKey,
      encryptedData = _ref.encryptedData,
      iv = _ref.iv;
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
  var pc = new WXBizDataCrypt(process.env.WX_APPID, sessionKey);
  return pc.decryptData(encryptedData, iv);
};

var success = function success(_ref2) {
  var data = _ref2.data,
      msg = _ref2.msg;
  return _defineProperty({
    'status': 'ok',
    'code': 200,
    'data': null,
    'message': msg || 'success'
  }, "data", data);
};

var fail = function fail(_ref4) {
  var data = _ref4.data,
      msg = _ref4.msg;
  return _defineProperty({
    'status': 'error',
    'code': 403,
    'data': null,
    'message': msg || 'fail'
  }, "data", data);
};
/**
 * 分页结构封装
 * @param {number} pageNum 
 * @param {number} pageSize 
 */


var pager = function pager(_ref6) {
  var _ref6$pageNum = _ref6.pageNum,
      pageNum = _ref6$pageNum === void 0 ? 1 : _ref6$pageNum,
      _ref6$pageSize = _ref6.pageSize,
      pageSize = _ref6$pageSize === void 0 ? 10 : _ref6$pageSize;
  pageNum *= 1;
  pageSize *= 1;
  var skipIndex = (pageNum - 1) * pageSize;
  return {
    page: {
      pageNum: pageNum,
      pageSize: pageSize
    },
    skipIndex: skipIndex
  };
}; // 解码token


var decodeToken = function decodeToken(token) {
  if (token) {
    return jwt.verify(token, process.env.APP_KEY);
  }

  return '';
}; // 递归生成菜单


var TreeMenu = function TreeMenu(rootList, id) {
  var result = [];

  for (var i = 0; i < rootList.length; i++) {
    // 取出parentID数组你最后一项，如果是null 那就证明它是第一级菜单-这里String强制转换是因为 断点调试发现取出来的其实是一个数据对象类型，不是一个基本类型的
    // 所以给他来个强制转换成字符串，才能正常对比他是否相等
    if (String(rootList[i]._doc.parentId[rootList[i]._doc.parentId.length - 1]) == String(id)) {
      result.push(rootList[i]._doc);
    }
  } // 把遍历出来的一级菜单 加children字段，然后把属于其的菜单往children里加


  result.map(function (item) {
    item.children = _this.TreeMenu(rootList, item._id);

    if (item.children.length === 0) {
      delete item.children;
    } else if (item.children.length > 0 && item.children[0].menuType === 2) {
      item.btnList = item.children;
    }
  });
  return result;
}; // 时间格式化


var formateDate = function formateDate(date, format) {
  var fmt = format || 'yyyy-MM-dd hh:mm:ss';

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear());
  }

  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (var k in o) {
    if (new RegExp("(".concat(k, ")")).test(fmt)) {
      var val = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? val : ('00' + val).substr(val.length));
    }
  }

  return fmt;
};

module.exports = {
  getRandom: getRandom,
  formatDB: formatDB,
  cacheEmailCode: cacheEmailCode,
  formatTime: formatTime,
  filterField: filterField,
  hash: hash,
  aesEncrypt: aesEncrypt,
  aesDecrypt: aesDecrypt,
  encode: encode,
  UserId: UserId,
  code2Session: code2Session,
  decryptWXData: decryptWXData,
  success: success,
  fail: fail,
  pager: pager,
  decodeToken: decodeToken,
  TreeMenu: TreeMenu,
  formateDate: formateDate
};