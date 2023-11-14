"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var request = require("request");

var _ = require("underscore");

var util = require('util');

var zlib = require('zlib'); // 参考
// https://www.microanswer.cn/blog/64


module.exports = function (_ref) {
  var _ref$isJson = _ref.isJson,
      isJson = _ref$isJson === void 0 ? true : _ref$isJson,
      baseURL = _ref.baseURL,
      url = _ref.url,
      _ref$method = _ref.method,
      method = _ref$method === void 0 ? "get" : _ref$method,
      _ref$params = _ref.params,
      params = _ref$params === void 0 ? {} : _ref$params,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers,
      timeout = _ref.timeout,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      _ref$proxy = _ref.proxy,
      proxy = _ref$proxy === void 0 ? "" : _ref$proxy;

  if (proxy) {
    proxy = util.format("http://%s:%d", proxy.split(":")[0], proxy.split(":")[1]);
  }

  var options_ = _objectSpread({
    url: url,
    baseUrl: baseURL,
    method: method.toLocaleUpperCase(),
    timeout: timeout,
    headers: headers,
    qs: params,
    proxy: proxy,
    encoding: null
  }, options); // 需要注意的是，当 encoding 被设置为 null 时，请求响应体将以原始的 Buffer 类型返回，而不会自动解码。这在处理图片、视频等二进制数据时非常有用。


  if (options_.method !== "GET") {
    if (isJson) {
      _.extend(options_, {
        json: true,
        body: data
      });
    } else {
      _.extend(options_, {
        form: data
      });
    }
  } else {
    _.extend(options_, {
      json: true
    });
  }

  return new Promise(function (resolve, reject) {
    request(options_, function (err, res, data) {
      if (err) {
        if (err.message.includes("timeout")) {
          // 判断请求异常信息中是否含有超时timeout字符串
          // console.log("错误回调", err);
          return reject({
            code: 50001,
            message: "请求超时"
          }); // alert("网络超时");
        }

        if (err.message.includes("ECONNREFUSED")) {
          // 判断请求异常信息中是否含有超时timeout字符串
          // console.log("ECONNREFUSED88888");
          return reject({
            code: 50002,
            message: "拒绝连接"
          }); // alert("网络超时");
        }

        return reject({
          code: 50003,
          message: err.message
        });
      }

      if (res.headers['content-encoding'] && res.headers['content-encoding'].indexOf('gzip') != -1) {
        zlib.gunzip(data, function (err, dezipped) {
          if (err) {
            reject(err);
            return;
          }

          console.log("gzip");
          resolve(JSON.parse(dezipped.toString()));
        });
      } else {
        // 输出返回内容(没有使用gzip压缩)
        console.log("no-gzip");
        resolve(data);
      }
    });
  });
};