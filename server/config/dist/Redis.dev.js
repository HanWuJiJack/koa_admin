"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var redis = require('redis'); // exprires:单位秒


var Redis =
/*#__PURE__*/
function () {
  function Redis() {
    _classCallCheck(this, Redis);
  }

  _createClass(Redis, [{
    key: "init",
    value: function init(data) {
      var _arguments = arguments;

      var _data, _data$username, username, _data$password, password, _data$host, host, _data$port, port, _data$dbnumber, dbnumber;

      return regeneratorRuntime.async(function init$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!data) {
                data = {};
              }

              _data = data, _data$username = _data.username, username = _data$username === void 0 ? null : _data$username, _data$password = _data.password, password = _data$password === void 0 ? null : _data$password, _data$host = _data.host, host = _data$host === void 0 ? "127.0.0.1" : _data$host, _data$port = _data.port, port = _data$port === void 0 ? '6379' : _data$port, _data$dbnumber = _data.dbnumber, dbnumber = _data$dbnumber === void 0 ? 0 : _data$dbnumber;
              this.username = username;
              this.password = password;
              this.host = host;
              this.port = port;
              this.dbnumber = dbnumber;
              _context.next = 9;
              return regeneratorRuntime.awrap(redis.createClient({
                // `redis[s]://[[username][:password]@][host][:port][/db-number]`
                url: this.username ? "redis://".concat(this.username, ":").concat(this.password, "@").concat(this.host, ":").concat(this.port, "/").concat(this.dbnumber) : "redis://".concat(this.host, ":").concat(this.port, "/").concat(this.dbnumber)
              }).on('ready', function () {
                console.log('Redis Client: ready');
              }).on('connect', function () {
                console.log(new Date(), 'redis is now connected!');
              }).on('reconnecting', function () {
                console.log(new Date(), 'redis reconnecting', _arguments);
              }).on('end', function () {
                console.log('Redis Closed!');
              }).on('warning', function () {
                console.log('Redis client: warning', _arguments);
              }).on('error', function (err) {
                console.log('Redis Error ' + err);
              }));

            case 9:
              this.redisClient = _context.sent;

              if (!this.redisClient.isOpen) {
                _context.next = 14;
                break;
              }

              console.log('rredis is now connected!');
              _context.next = 16;
              break;

            case 14:
              _context.next = 16;
              return regeneratorRuntime.awrap(this.redisClient.connect());

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "contect",
    value: function contect() {
      return regeneratorRuntime.async(function contect$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.connect());

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "quit",
    value: function quit() {
      return regeneratorRuntime.async(function quit$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.quit());

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    } // 判断是否有值 1|0

  }, {
    key: "exists",
    value: function exists(key) {
      return regeneratorRuntime.async(function exists$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.exists(key));

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    } // 给key添加过期时间

  }, {
    key: "expire",
    value: function expire(key, exprires) {
      return regeneratorRuntime.async(function expire$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.expire(key, exprires));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "setString",
    value: function setString(key, value, exprires) {
      return regeneratorRuntime.async(function setString$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(typeof value !== 'string')) {
                _context6.next = 2;
                break;
              }

              throw new Error("value类型为：string");

            case 2:
              if (!exprires) {
                _context6.next = 8;
                break;
              }

              _context6.next = 5;
              return regeneratorRuntime.awrap(this.redisClient.set(key, value, {
                EX: exprires
              }));

            case 5:
              return _context6.abrupt("return", _context6.sent);

            case 8:
              _context6.next = 10;
              return regeneratorRuntime.awrap(this.redisClient.set(key, value));

            case 10:
              return _context6.abrupt("return", _context6.sent);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getString",
    value: function getString(key) {
      return regeneratorRuntime.async(function getString$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.get(key));

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "setHashMap",
    value: function setHashMap(key, value, exprires) {
      return regeneratorRuntime.async(function setHashMap$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!(Object.prototype.toString.call(value) !== '[object Object]')) {
                _context8.next = 2;
                break;
              }

              throw new Error("value类型为：object");

            case 2:
              this.setString(key, JSON.stringify(value), exprires);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getHashMap",
    value: function getHashMap(key) {
      var result;
      return regeneratorRuntime.async(function getHashMap$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.getString(key));

            case 2:
              result = _context9.sent;
              return _context9.abrupt("return", JSON.parse(result));

            case 4:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "setList",
    value: function setList(key, value, exprires) {
      return regeneratorRuntime.async(function setList$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!(Object.prototype.toString.call(value) !== '[object Array]')) {
                _context10.next = 2;
                break;
              }

              throw new Error("value类型为：Array");

            case 2:
              this.setString(key, JSON.stringify(value), exprires);

            case 3:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "getList",
    value: function getList(key) {
      return regeneratorRuntime.async(function getList$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return regeneratorRuntime.awrap(this.getHashMap(key));

            case 2:
              return _context11.abrupt("return", _context11.sent);

            case 3:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      return regeneratorRuntime.async(function remove$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.del(key));

            case 2:
              return _context12.abrupt("return", _context12.sent);

            case 3:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    } // push 将给定值推入列表的右端 返回值 当前列表长度

  }, {
    key: "rPush",
    value: function rPush(key, list) {
      return regeneratorRuntime.async(function rPush$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.rPush(key, list));

            case 2:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    } // 查询list的值

  }, {
    key: "lrange",
    value: function lrange(key) {
      var startIndex,
          stopIndex,
          _args14 = arguments;
      return regeneratorRuntime.async(function lrange$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              startIndex = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : 0;
              stopIndex = _args14.length > 2 && _args14[2] !== undefined ? _args14[2] : -1;
              _context14.next = 4;
              return regeneratorRuntime.awrap(this.redisClient.lRange(key, startIndex, stopIndex));

            case 4:
              return _context14.abrupt("return", _context14.sent);

            case 5:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this);
    } // 清除list中n个值为value的项

  }, {
    key: "lrem",
    value: function lrem(key) {
      var n,
          value,
          _args15 = arguments;
      return regeneratorRuntime.async(function lrem$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              n = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : 1;
              value = _args15.length > 2 ? _args15[2] : undefined;
              _context15.next = 4;
              return regeneratorRuntime.awrap(this.redisClient.lRem(key, n, value));

            case 4:
              return _context15.abrupt("return", _context15.sent);

            case 5:
            case "end":
              return _context15.stop();
          }
        }
      }, null, this);
    } // lpop 从列表左端弹出一个值，并返回被弹出的值 lpop('key')

  }, {
    key: "lpop",
    value: function lpop(key) {
      return regeneratorRuntime.async(function lpop$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.lPop(key));

            case 2:
              return _context16.abrupt("return", _context16.sent);

            case 3:
            case "end":
              return _context16.stop();
          }
        }
      }, null, this);
    } // rpop 从列表右端弹出一个值，并返回被弹出的值 rpop('key')

  }, {
    key: "rpop",
    value: function rpop(key) {
      return regeneratorRuntime.async(function rpop$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return regeneratorRuntime.awrap(this.redisClient.rPop(key));

            case 2:
              return _context17.abrupt("return", _context17.sent);

            case 3:
            case "end":
              return _context17.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "publish",
    value: function publish(channel, value) {
      return regeneratorRuntime.async(function publish$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              if (!(typeof value !== 'string')) {
                _context18.next = 2;
                break;
              }

              throw new Error("value类型为：string");

            case 2:
              _context18.next = 4;
              return regeneratorRuntime.awrap(this.redisClient.publish(channel, value));

            case 4:
            case "end":
              return _context18.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "duplicate",
    value: function duplicate() {
      return this.redisClient.duplicate();
    }
  }]);

  return Redis;
}();

module.exports = new Redis();