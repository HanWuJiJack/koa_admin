"use strict";

var request = require('request');

var fse = require('fs-extra');

var ProgressBar = require('progress');

var path = require("path");

var util = require('util');

var Tools = require("./Tools");
/*
 * url 网络文件地址
 * filename 文件名
 */


var UserAgents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15"]; // 完整代理服务器url

function downloadFile(_ref) {
  var uri = _ref.uri,
      filename = _ref.filename,
      _ref$proxy = _ref.proxy,
      proxy = _ref$proxy === void 0 ? "" : _ref$proxy,
      _ref$options = _ref.options,
      options = _ref$options === void 0 ? {} : _ref$options,
      _ref$headers = _ref.headers,
      headers = _ref$headers === void 0 ? {} : _ref$headers;
  return new Promise(function (resolve, reject) {
    if (proxy) {
      proxy = util.format("http://%s:%d", proxy.split(":")[0], proxy.split(":")[1]);
    }

    request.get(uri, {
      proxy: proxy,
      options: options,
      headers: headers
    }).on('error', function (err) {
      reject(err);
      console.error('Error: ' + err.message);
    }).on('response', function (res) {
      var len = parseInt(res.headers['content-length'], 10);
      var bar = new ProgressBar('  downloading [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: len
      });
      res.on('data', function (chunk) {
        bar.tick(chunk.length);
      });
    }).pipe(fse.createWriteStream(filename)).on('close', function () {
      resolve();
    });
  });
}

module.exports = downloadFile; // (async () => {
//     var fileUrl = 'https://www.baidu.com/';
//     var filename = 'beauty.html';
//     await downloadFile({
//         uri: fileUrl,
//         filename: path.join(__dirname, filename),
//         // proxy: '175.24.215.79:80',
//         headers: {
//             "User-Agent": UserAgents[Tools.getRandom(0, UserAgents.length - 1)]
//         }
//     });
// })()