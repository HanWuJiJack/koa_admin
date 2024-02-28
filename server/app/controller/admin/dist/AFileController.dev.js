"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BaseController = require('../BaseController');

var path = require('path');

var fs = require('fs-extra');

var JSZip = require('jszip');

var rootPath = process.cwd();

var _require = require("../../utils/ModelSchemas"),
    modelSchemas = _require.modelSchemas;

var _require2 = require(path.join(process.cwd(), "./config/Logger")),
    logger = _require2.logger; //读取目录及文件


function readDir(obj, nowPath, fatherPath) {
  var files = fs.readdirSync(nowPath); //读取目录中的所有文件及文件夹（同步操作）

  files.forEach(function (fileName, index) {
    //遍历检测目录中的文件
    var fillPath = nowPath + "/" + fileName;
    var file = fs.statSync(fillPath); //获取一个文件的属性

    if (file.isDirectory()) {
      //如果是目录的话，继续查询
      var dirlist = obj.folder(fileName); //压缩对象中生成该目录
      // logger.info(" readDir", fileName)

      readDir(dirlist, fillPath + '/', fileName); //重新检索目录文件
    } else {
      if (fileName.split(".")[1] != 'zip') {
        obj.file("".concat(fatherPath, "-").concat(index, ".").concat(fileName.split(".")[1]), fs.readFileSync(fillPath)); //压缩目录添加文件
      }
    }
  });
}

function startZIP(targetDir, filePath, path) {
  var zip;
  return regeneratorRuntime.async(function startZIP$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          zip = new JSZip();
          readDir(zip, targetDir, path);
          zip.generateAsync({
            //设置压缩格式，开始打包
            type: "nodebuffer",
            //nodejs用
            compression: "DEFLATE",
            //压缩算法
            compressionOptions: {
              //压缩级别
              level: 9
            }
          }).then(function (content) {
            if (fs.existsSync(filePath)) {
              fs.removeSync(filePath);
            }

            fs.writeFileSync(filePath, content, "utf-8");
          });

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

var FileController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(FileController, _BaseController);

  function FileController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, FileController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FileController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.userInfo = _this.ctx.state.userInfo;
    _this.url = "/admin/file";
    return _this;
  } // 接口字段：file
  // 上传文件


  _createClass(FileController, [{
    key: "create",
    value: function create() {
      var _this$ctx$request, body, files;

      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request = this.ctx.request, body = _this$ctx$request.body, files = _this$ctx$request.files; // const fileName = files.file.path + `-${files.file.name}`
              // if (fs.existsSync(files.file.path)) {
              //     await fs.move(files.file.path, fileName)
              // }

              this.ctx.body = _get(_getPrototypeOf(FileController.prototype), "success", this).call(this, {
                data: files.file.path
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "create_goods",
    value: function create_goods() {
      var _this$ctx$request2, body, files, id, goodsInfo, fileName, goodsPath, targetDir;

      return regeneratorRuntime.async(function create_goods$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$ctx$request2 = this.ctx.request, body = _this$ctx$request2.body, files = _this$ctx$request2.files;
              id = body.id;
              _context3.next = 4;
              return regeneratorRuntime.awrap(modelSchemas.model100004.findOne({
                id: id
              }));

            case 4:
              goodsInfo = _context3.sent;
              // 查询所有数据
              fileName = "".concat(new Date().getTime(), "-").concat(files.file.name);
              goodsPath = "".concat(goodsInfo._doc.projectInfo, "/").concat(goodsInfo._doc.projectInfo, "/").concat(goodsInfo._doc.spu, "/").concat(goodsInfo._doc.sku, "/");
              targetDir = path.join(rootPath, "../assets/".concat(goodsPath), fileName);

              if (!fs.existsSync(files.file.path)) {
                _context3.next = 11;
                break;
              }

              _context3.next = 11;
              return regeneratorRuntime.awrap(fs.move(files.file.path, targetDir));

            case 11:
              this.ctx.body = _get(_getPrototypeOf(FileController.prototype), "success", this).call(this, {
                data: {
                  url: "https://stp1.cn:8180/resources/".concat(goodsPath).concat(fileName),
                  name: fileName
                }
              });

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "get_zip",
    value: function get_zip() {
      var _this$ctx$request$bod, id, projectInfo, zipType, project, goodsPath, targetDir, filePath, goodsInfo, _goodsPath, _targetDir, _filePath, _goodsInfo, _goodsPath2, _targetDir2, _filePath2;

      return regeneratorRuntime.async(function get_zip$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, id = _this$ctx$request$bod.id, projectInfo = _this$ctx$request$bod.projectInfo, zipType = _this$ctx$request$bod.zipType;

              if (!(zipType === 'zip')) {
                _context4.next = 11;
                break;
              }

              _context4.next = 4;
              return regeneratorRuntime.awrap(modelSchemas.model100003.findOne({
                id: projectInfo
              }));

            case 4:
              project = _context4.sent;
              goodsPath = "".concat(projectInfo, "/").concat(projectInfo);
              targetDir = path.join(rootPath, "../assets/".concat(goodsPath));
              filePath = path.join(rootPath, "../assets/".concat(projectInfo, "/").concat(project.name, ".zip")); // logger.info(0, targetDir, filePath)

              _context4.next = 10;
              return regeneratorRuntime.awrap(startZIP(targetDir, filePath));

            case 10:
              this.ctx.body = _get(_getPrototypeOf(FileController.prototype), "success", this).call(this, {
                data: {
                  url: "https://stp1.cn:8180/resources/".concat(projectInfo, "/").concat(project.name, ".zip")
                }
              });

            case 11:
              if (!(zipType === 'zip-spu')) {
                _context4.next = 21;
                break;
              }

              _context4.next = 14;
              return regeneratorRuntime.awrap(modelSchemas.model100004.findOne({
                id: id
              }));

            case 14:
              goodsInfo = _context4.sent;
              _goodsPath = "".concat(goodsInfo._doc.projectInfo, "/").concat(goodsInfo._doc.projectInfo);
              _targetDir = path.join(rootPath, "../assets/".concat(_goodsPath, "/").concat(goodsInfo._doc.spu));
              _filePath = path.join(rootPath, "../assets/".concat(goodsInfo._doc.projectInfo, "/").concat(goodsInfo._doc.projectInfo, "-").concat(goodsInfo._doc.spu, ".zip")); // logger.info(1, targetDir, filePath)

              _context4.next = 20;
              return regeneratorRuntime.awrap(startZIP(_targetDir, _filePath, goodsInfo._doc.spu));

            case 20:
              this.ctx.body = _get(_getPrototypeOf(FileController.prototype), "success", this).call(this, {
                data: {
                  url: "https://stp1.cn:8180/resources/".concat(goodsInfo._doc.projectInfo, "/").concat(goodsInfo._doc.projectInfo, "-").concat(goodsInfo._doc.spu, ".zip")
                }
              });

            case 21:
              if (!(zipType === 'zip-sku')) {
                _context4.next = 31;
                break;
              }

              _context4.next = 24;
              return regeneratorRuntime.awrap(modelSchemas.model100004.findOne({
                id: id
              }));

            case 24:
              _goodsInfo = _context4.sent;
              _goodsPath2 = "".concat(_goodsInfo._doc.projectInfo, "/").concat(_goodsInfo._doc.projectInfo);
              _targetDir2 = path.join(rootPath, "../assets/".concat(_goodsPath2, "/").concat(_goodsInfo._doc.spu, "/").concat(_goodsInfo._doc.sku));
              _filePath2 = path.join(rootPath, "../assets/".concat(_goodsInfo._doc.projectInfo, "/").concat(_goodsInfo._doc.projectInfo, "-").concat(_goodsInfo._doc.sku, ".zip")); // logger.info(2, targetDir, filePath)

              _context4.next = 30;
              return regeneratorRuntime.awrap(startZIP(_targetDir2, _filePath2, _goodsInfo._doc.sku));

            case 30:
              this.ctx.body = _get(_getPrototypeOf(FileController.prototype), "success", this).call(this, {
                data: {
                  url: "https://stp1.cn:8180/resources/".concat(_goodsInfo._doc.projectInfo, "/").concat(_goodsInfo._doc.projectInfo, "-").concat(_goodsInfo._doc.sku, ".zip")
                }
              });

            case 31:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "remove",
    value: function remove() {
      var url, targetDir, filePath;
      return regeneratorRuntime.async(function remove$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              url = this.ctx.request.body.url;
              targetDir = path.join(rootPath, "../assets/");
              filePath = url.replace('https://stp1.cn:8180/resources/', targetDir);

              if (fs.existsSync(filePath)) {
                fs.removeSync(filePath);
              }

              this.ctx.body = _get(_getPrototypeOf(FileController.prototype), "success", this).call(this, {
                data: {}
              });

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "get_file_path",
    value: function get_file_path() {
      var _this$ctx$request3, body, files, fileName;

      return regeneratorRuntime.async(function get_file_path$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _this$ctx$request3 = this.ctx.request, body = _this$ctx$request3.body, files = _this$ctx$request3.files;
              fileName = files.file.path + "-".concat(files.file.name);

              if (!fs.existsSync(files.file.path)) {
                _context6.next = 5;
                break;
              }

              _context6.next = 5;
              return regeneratorRuntime.awrap(fs.move(files.file.path, fileName));

            case 5:
              this.ctx.body = _get(_getPrototypeOf(FileController.prototype), "success", this).call(this, {
                data: filesINfo
              });

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return FileController;
}(BaseController);

module.exports = FileController;