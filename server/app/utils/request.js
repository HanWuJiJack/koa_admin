const request = require("request");
const _ = require("underscore");
const util = require('util');
let zlib = require('zlib');
// 参考
// https://www.microanswer.cn/blog/64
module.exports = ({
  isJson = true,
  baseURL,
  url,
  method = "get",
  params = {},
  data = {},
  headers = {},
  timeout,
  options = {},
  proxy = ""
}) => {
  if (proxy) {
    proxy = util.format(`http://%s:%d`, proxy.split(":")[0], proxy.split(":")[1]);
  }
  const options_ = {
    url,
    baseUrl: baseURL,
    method: method.toLocaleUpperCase(),
    timeout,
    headers,
    qs: params,
    proxy,
    encoding: null, // 方便解压缩返回的数据
    ...options
  };
  // 需要注意的是，当 encoding 被设置为 null 时，请求响应体将以原始的 Buffer 类型返回，而不会自动解码。这在处理图片、视频等二进制数据时非常有用。
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
  return new Promise((resolve, reject) => {
    request(options_, (err, res, data) => {
      if (err) {
        if (err.message.includes("timeout")) {
          // 判断请求异常信息中是否含有超时timeout字符串
          // console.log("错误回调", err);
          return reject({
            code: 50001,
            message: "请求超时",
          });
          // alert("网络超时");
        }
        if (err.message.includes("ECONNREFUSED")) {
          // 判断请求异常信息中是否含有超时timeout字符串
          // console.log("ECONNREFUSED88888");
          return reject({
            code: 50002,
            message: "拒绝连接",
          });
          // alert("网络超时");
        }
        return reject({
          code: 50003,
          message: err.message,
        });
      }
      if (res.headers['content-encoding'] && res.headers['content-encoding'].indexOf('gzip') != -1) {
        zlib.gunzip(data, function (err, dezipped) {
          if (err) {
            reject(err)
            return
          }
          console.log("gzip")
          resolve(JSON.parse(dezipped.toString()));
        });
      } else {
        // 输出返回内容(没有使用gzip压缩)
        console.log("no-gzip")
        resolve(data);
      }
    });
  });
}