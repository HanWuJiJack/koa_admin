"use strict";

var request = require('request');

var fse = require('fs-extra');

var ProgressBar = require('progress');

var path = require("path");

var util = require('util');

var Tools = require("../utils/Tools");
/*
 * url 网络文件地址
 * filename 文件名
 * callback 回调函数
 */
// 代理服务器ip和端口,由快代理提供


var proxy_ip = '180.103.127.9';
var proxy_port = 7890;
var UserAgents = ["Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15"]; // 完整代理服务器url

var proxy = util.format('http://%s:%d', proxy_ip, proxy_port);

function downloadFile(uri, filename) {
  return new Promise(function (resolve, reject) {
    request.get(uri, {
      proxy: proxy,
      headers: {
        "User-Agent": UserAgents[Tools.getRandom(0, UserAgents.length - 1)]
      }
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
    }).pipe(fse.createWriteStream(path.join(process.cwd(), filename))).on('error', function (err) {
      reject(err);
      console.error('Error: ' + err.message);
    }).on('close', function () {
      resolve();
    });
  });
}

(function _callee() {
  var fileUrl, filename;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          fileUrl = 'http://www.baidu.com/';
          filename = 'beauty.html';
          _context.next = 4;
          return regeneratorRuntime.awrap(downloadFile(fileUrl, filename));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
})();