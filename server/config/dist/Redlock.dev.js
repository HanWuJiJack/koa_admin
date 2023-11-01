"use strict";

var Client = require("ioredis");

var Redlock = require("redlock")["default"];

var redis = new Client({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});
exports.redlock = new Redlock([redis], {
  driftFactor: 0.01,
  // 允许的漂移因子
  retryCount: -1,
  // 重试次数 retryCount=-1在获得锁定之前，将无限次重试。
  retryDelay: 200,
  // 重试间隔（毫秒）
  retryJitter: 200,
  // 重试抖动（毫秒）
  automaticExtensionThreshold: 500 // 在自动扩展之前锁定的最短剩余时间（毫秒）

}); // 用法示例
// async function exec() {
//     let number = undefined
//     // Time为锁释放的时间。
//     let lock = await redlock.acquire(["a"], 10000);
//     try {
//       lock = await lock.extend(10000);
//       let res = fs.readFileSync(path.resolve(__dirname, "./x.txt"))
//       let num = parseInt(res.toString())
//       num++;
//       number = num
//       fs.writeFileSync(path.resolve(__dirname, "./x.txt"), num.toString())
//     } finally {
//       await lock.release();
//     }
//     return number
//   };