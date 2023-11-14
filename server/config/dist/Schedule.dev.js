"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var schedule = require('node-schedule');

FaasSchedule;
"0  0  0  *  *  ?"; // * * * * * *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// * 表示通配符，匹配该域的任意值，假如在 Minutes 域使用 * 表示每分钟都会触发事件
// ? 只能用在 DayofMonth 和 DayofWeek 两个域，它也匹配域的任意值，但实际不会。因为DayofMonth和DayofWeek会相互影响。例如想在每月的20日触发调度，不管20日到底是星期几，则只能使用如下写法： 13 13 15 20 * ?, 其中最后一位只能用？，而不能使用*，如果使用 * 表示不管星期几都会触发，实际上并不是这样。
// - 表示范围，例如 在 Minutes 域使用 5-20，表示从5分到20分钟每分钟触发一次
// / 表示起始时间开始触发，然后每隔固定时间触发一次，如在 Minutes 域使用 5/20 表示第5分钟触发第一次，其后间隔20分钟开始触发如果25,45等分别触发一次
// ‘,’ 表示枚举值，如在 Minutes 域使用 5, 20，表示在 5和20分每分钟触发一次
// 由于月份中的日期和星期中的日期这两个元素互斥，必须要对其中一个设置 ?
// 启动任务
// 每分钟的第30秒触发： '30 * * * * *'
// 每小时的1分30秒触发 ：'30 1 * * * *'
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
// 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
// 0 0 10,14,16 * * ? 每天上午10点，下午2点，4点

var schedule_ =
/*#__PURE__*/
function () {
  function schedule_() {
    _classCallCheck(this, schedule_);
  }

  _createClass(schedule_, [{
    key: "startSchedule",
    value: function startSchedule(_ref) {
      var name = _ref.name,
          rule = _ref.rule,
          code = _ref.code;
      schedule.scheduleJob(name, rule, function () {
        console.log(Date.now());
      });
    }
  }, {
    key: "cancel",
    value: function cancel(name) {
      schedule.cancelJob("ssss");
    }
  }]);

  return schedule_;
}(); // 定义规则


var rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 20, 30, 40, 50]; // or '*/10 * * * * *' 每隔 10 秒执行一次

schedule.scheduleJob("ssss", "*  *  *  20 * *", function () {
  console.log(Date.now());
});
setInterval(function () {
  console.log("time:", Date.now());
}, 1000); // setImmediate
// setTimeout(() => {
//     schedule.cancelJob("ssss")
// }, 1000 * 60 * 2)