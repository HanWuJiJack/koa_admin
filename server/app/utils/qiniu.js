const qiniu = require("qiniu");

let mac = new qiniu.auth.digest.Mac(process.env.QINIU_CONFIG_ACCESS_KEY, process.env.QINIU_CONFIG_SECRET_KEY);

//构造上传函数
async function uploadFile(uptoken, key, localFile) {
    return new Promise((resolve, reject) => {
        var config = new qiniu.conf.Config();
        config.zone = qiniu.zone.Zone_z2;
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        formUploader.putFile(uptoken, key, localFile, putExtra, function (respErr,
            respBody, respInfo) {
            if (respErr) {
                reject(respErr);
            }
            if (respInfo.statusCode == 200) {
                resolve(respBody);
            } else {
                console.log(respInfo)
                reject(new Error("上传服务器失败，错误代码：" + respInfo.statusCode));
            }
        });
    });
}


let getUploadToken = function (key) {
    var options = {
        scope: process.env.QINIU_CONFIG_BUCKET + ":" + key,
        // persistentOps:"imageView2/1/w/64/h/48",
        "persistentOps": "vframe/jpg/offset/0/w/480",
        // persistentNotifyUrl:"http://s0.c-cmp.net:9066/faas/sys/persistentNotify",
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(fname)"}',
        deadline: (Date.now() / 1000).toFixed() + 60 * 5
    }
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
}

function upload(storePath, localFilePath) {
    let uploadToken = getUploadToken(storePath);
    return uploadFile(uploadToken, storePath, localFilePath);
}

function deleteFile(bucket, key) {
    let config = new qiniu.conf.Config();
    let bucketManager = new qiniu.rs.BucketManager(mac, config);
    bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
        if (err) {
            console.log(err);
        } else {
            console.log(respInfo.statusCode);
        }
    });
}

module.exports = {
    QNupload: upload,
    deleteFile
}