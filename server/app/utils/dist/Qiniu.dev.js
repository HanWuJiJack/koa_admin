"use strict";

var qiniu = require("qiniu");

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/logger")),
    logger = _require.logger;

var mac = new qiniu.auth.digest.Mac(process.env.QINIU_CONFIG_ACCESS_KEY, process.env.QINIU_CONFIG_SECRET_KEY); //构造上传函数

function uploadFile(uptoken, key, localFile) {
  return regeneratorRuntime.async(function uploadFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            var config = new qiniu.conf.Config();
            config.zone = qiniu.zone.Zone_z2;
            var formUploader = new qiniu.form_up.FormUploader(config);
            var putExtra = new qiniu.form_up.PutExtra();
            formUploader.putFile(uptoken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
              if (respErr) {
                reject(respErr);
              }

              if (respInfo.statusCode == 200) {
                resolve(respBody);
              } else {
                logger.info(respInfo);
                reject(new Error("上传服务器失败，错误代码：" + respInfo.statusCode));
              }
            });
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

var getUploadToken = function getUploadToken(key) {
  var options = {
    scope: process.env.QINIU_CONFIG_BUCKET + ":" + key,
    // persistentOps:"imageView2/1/w/64/h/48",
    "persistentOps": "vframe/jpg/offset/0/w/480",
    // persistentNotifyUrl:"http://s0.c-cmp.net:9066/faas/sys/persistentNotify",
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(fname)"}',
    deadline: (Date.now() / 1000).toFixed() + 60 * 5
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  return uploadToken;
};

function upload(storePath, localFilePath) {
  var uploadToken = getUploadToken(storePath);
  return uploadFile(uploadToken, storePath, localFilePath);
}

function deleteFile(bucket, key) {
  var config = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(mac, config);
  bucketManager["delete"](bucket, key, function (err, respBody, respInfo) {
    if (err) {
      logger.error(err);
    } else {
      logger.info(respInfo.statusCode);
    }
  });
}

module.exports = {
  QNupload: upload,
  deleteFile: deleteFile
};