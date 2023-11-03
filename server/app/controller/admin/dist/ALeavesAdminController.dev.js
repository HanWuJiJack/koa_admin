"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

// const Controller = require('../../../../core/controller/admin.js');
var BaseController = require('../BaseController');

var Schema = require('./../../model/Model.js');

var path = require("path");

var _require = require(path.join(process.cwd(), "./config/Logger")),
    logger = _require.logger;

var LeavesAdminController =
/*#__PURE__*/
function (_BaseController) {
  _inherits(LeavesAdminController, _BaseController);

  function LeavesAdminController(_ref) {
    var _this;

    var _ref$ctx = _ref.ctx,
        ctx = _ref$ctx === void 0 ? {
      state: {
        userInfo: {}
      }
    } : _ref$ctx,
        next = _ref.next;

    _classCallCheck(this, LeavesAdminController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LeavesAdminController).call(this));
    _this.ctx = ctx;
    _this.next = next;
    _this.userInfo = _this.ctx.state.userInfo;
    _this.url = "/admin/leaves";
    return _this;
  }

  _createClass(LeavesAdminController, [{
    key: "list",
    value: function list() {
      var _this$ctx$request$que, applyState, type, _get$call, page, skipIndex, userInfo, params, query, list, total;

      return regeneratorRuntime.async(function list$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _this$ctx$request$que = this.ctx.request.query, applyState = _this$ctx$request$que.applyState, type = _this$ctx$request$que.type;
              _get$call = _get(_getPrototypeOf(LeavesAdminController.prototype), "pager", this).call(this, this.ctx.request.query), page = _get$call.page, skipIndex = _get$call.skipIndex;
              userInfo = this.userInfo;
              params = {};

              if (type === 'approve') {
                // 待审核列表
                if (applyState == null || Number(applyState) === 0 || applyState === '') {
                  // 全部
                  params = {
                    "auditFlows.userId": userInfo.userId
                  };
                } else if (Number(applyState) === 1 || Number(applyState) === 2) {
                  // 待审核状态-审核中
                  params = {
                    "auditFlows.userId": userInfo.userId,
                    $or: [{
                      applyState: 1
                    }, {
                      applyState: 2
                    }]
                  };
                  params.curAuditUserName = userInfo.userName;
                } else {
                  // 其他状态
                  params = {
                    "auditFlows.userId": userInfo.userId,
                    applyState: applyState
                  };
                }
              } else {
                // 申请休假列表
                params = {
                  "applyUser.userId": userInfo.userId
                };
                if (applyState != null && Number(applyState)) params.applyState = applyState;
              } // 根据条件查询所有用户列表


              query = Schema.leavesSchema.find(params); //查询所有数据

              _context.next = 9;
              return regeneratorRuntime.awrap(query.skip(skipIndex).limit(page.pageSize));

            case 9:
              list = _context.sent;
              _context.next = 12;
              return regeneratorRuntime.awrap(Schema.leavesSchema.countDocuments(params));

            case 12:
              total = _context.sent;
              this.ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "success", this).call(this, {
                data: {
                  page: _objectSpread({}, page, {
                    total: total
                  }),
                  list: list
                }
              });
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              this.ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "fail", this).call(this, {
                msg: _context.t0.stack
              });

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 16]]);
    }
  }, {
    key: "create",
    value: function create() {
      var _this$ctx$request$bod, id, action, params, res, info, userInfo, applyPeoPledept, deptData_, deptData, orderNo, count, finance, _res;

      return regeneratorRuntime.async(function create$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this$ctx$request$bod = this.ctx.request.body, id = _this$ctx$request$bod.id, action = _this$ctx$request$bod.action, params = _objectWithoutProperties(_this$ctx$request$bod, ["id", "action"]);
              _context2.prev = 1;
              userInfo = this.userInfo;

              if (!(action == 'create')) {
                _context2.next = 30;
                break;
              }

              // 获取申请人所属部门
              applyPeoPledept = userInfo.deptId.pop(); // logger.info("applyPeoPledept", applyPeoPledept)
              // 根据部门查找到部门负责人

              _context2.next = 7;
              return regeneratorRuntime.awrap(Schema.deptSchema.findOne(applyPeoPledept));

            case 7:
              deptData_ = _context2.sent;
              deptData = deptData_._doc; // 当前审批人

              params.curAuditUserName = deptData.userName; // 生成申请单号

              orderNo = 'XS' + _get(_getPrototypeOf(LeavesAdminController.prototype), "formateDate", this).call(this, new Date(), 'yyyyMMdd');
              _context2.next = 13;
              return regeneratorRuntime.awrap(Schema.leavesSchema.countDocuments());

            case 13:
              count = _context2.sent;
              orderNo += count;
              params.orderNo = orderNo; // 申请人信息数据

              params.applyUser = {
                userId: userInfo.userId,
                userName: userInfo.userName,
                userEmail: userInfo.userEmail
              }; // 完整审核人名字

              params.auditUsers = deptData.userName; // 审批流数据

              _context2.next = 20;
              return regeneratorRuntime.awrap(Schema.deptSchema.find({
                deptName: {
                  $in: ['人事部门', '财务部门']
                }
              }));

            case 20:
              finance = _context2.sent;
              params.auditFlows = [{
                userId: deptData.userId,
                userName: deptData.userName,
                userEmail: deptData.userEmail
              }];
              finance.map(function (item) {
                params.auditFlows.push({
                  userId: item.userId,
                  userName: item.userName,
                  userEmail: item.userEmail
                });
                params.auditUsers += ',' + item.userName;
              }); // 审批日志

              params.auditLogs = [];
              _context2.next = 26;
              return regeneratorRuntime.awrap(Schema.leavesSchema.create(params));

            case 26:
              res = _context2.sent;
              info = '创建成功';
              _context2.next = 35;
              break;

            case 30:
              if (!(action === 'delete')) {
                _context2.next = 35;
                break;
              }

              _context2.next = 33;
              return regeneratorRuntime.awrap(Schema.leavesSchema.findOneAndUpdate({
                id: id
              }, {
                applyState: 5
              }));

            case 33:
              _res = _context2.sent;
              info = '作废成功';

            case 35:
              this.ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "success", this).call(this, {
                msg: info
              });
              _context2.next = 41;
              break;

            case 38:
              _context2.prev = 38;
              _context2.t0 = _context2["catch"](1);
              this.ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "fail", this).call(this, {
                msg: _context2.t0.stack
              });

            case 41:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[1, 38]]);
    }
  }, {
    key: "create_approve",
    value: function create_approve() {
      var _this$ctx$request$bod2, id, action, remark, userInfo, leavesinfo, doc, auditLogs, _auditLogs, _auditLogs2, curAuditUserName;

      return regeneratorRuntime.async(function create_approve$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this$ctx$request$bod2 = this.ctx.request.body, id = _this$ctx$request$bod2.id, action = _this$ctx$request$bod2.action, remark = _this$ctx$request$bod2.remark;
              userInfo = this.userInfo;
              _context3.prev = 2;
              _context3.next = 5;
              return regeneratorRuntime.awrap(Schema.leavesSchema.findOne({
                id: id
              }));

            case 5:
              leavesinfo = _context3.sent;
              doc = leavesinfo._doc;

              if (!(action === 'refuse')) {
                _context3.next = 14;
                break;
              }

              auditLogs = doc.auditLogs;
              auditLogs.push({
                userId: userInfo.userId,
                userName: userInfo.userName,
                createTime: new Date(),
                remark: remark,
                action: '驳回'
              });
              _context3.next = 12;
              return regeneratorRuntime.awrap(Schema.leavesSchema.findOneAndUpdate({
                id: id
              }, {
                applyState: 3,
                auditLogs: auditLogs
              }));

            case 12:
              _context3.next = 32;
              break;

            case 14:
              if (!(doc.auditLogs.length === doc.auditFlows.length)) {
                _context3.next = 19;
                break;
              }

              // 证明已经审核完了
              ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "success", this).call(this, {
                msg: '此单子已审核完成，无需再次审核！'
              });
              return _context3.abrupt("return");

            case 19:
              if (!(doc.auditLogs.length > 1)) {
                _context3.next = 26;
                break;
              }

              // 审核中状态
              _auditLogs = doc.auditLogs;

              _auditLogs.push({
                userId: userInfo.userId,
                userName: userInfo.userName,
                createTime: new Date(),
                remark: remark,
                action: '通过'
              });

              _context3.next = 24;
              return regeneratorRuntime.awrap(Schema.leavesSchema.findOneAndUpdate({
                id: id
              }, {
                applyState: 4,
                auditLogs: _auditLogs
              }));

            case 24:
              _context3.next = 32;
              break;

            case 26:
              if (!(doc.auditLogs.length === doc.auditFlows.length - 1)) {
                _context3.next = 32;
                break;
              }

              _auditLogs2 = doc.auditLogs;

              _auditLogs2.push({
                userId: userInfo.userId,
                userName: userInfo.userName,
                createTime: new Date(),
                remark: remark,
                action: '通过'
              }); // logger.info(777,auditLogs)


              curAuditUserName = _auditLogs2[_auditLogs2.length - 1].userName;
              _context3.next = 32;
              return regeneratorRuntime.awrap(Schema.leavesSchema.findOneAndUpdate({
                id: id
              }, {
                applyState: 2,
                auditLogs: _auditLogs2,
                curAuditUserName: curAuditUserName
              }));

            case 32:
              this.ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "success", this).call(this, {
                msg: "处理成功"
              });
              _context3.next = 38;
              break;

            case 35:
              _context3.prev = 35;
              _context3.t0 = _context3["catch"](2);
              this.ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "fail", this).call(this, {
                msg: "\u5BA1\u6838\u5931\u8D25=>".concat(_context3.t0.stack)
              });

            case 38:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[2, 35]]);
    }
  }, {
    key: "list_count",
    value: function list_count() {
      var userInfo, params, total;
      return regeneratorRuntime.async(function list_count$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userInfo = this.userInfo;
              params = {};
              _context4.prev = 2;
              params = {
                "auditFlows.userId": userInfo.userId,
                $or: [{
                  applyState: 1
                }, {
                  applyState: 2
                }]
              };
              params.curAuditUserName = userInfo.userName;
              _context4.next = 7;
              return regeneratorRuntime.awrap(Schema.leavesSchema.countDocuments(params));

            case 7:
              total = _context4.sent;
              this.ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "success", this).call(this, {
                data: total,
                msg: '查询成功'
              });
              _context4.next = 15;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](2);
              logger.info(_context4.t0);
              this.ctx.body = _get(_getPrototypeOf(LeavesAdminController.prototype), "fail", this).call(this, {
                msg: "\u67E5\u8BE2\u5F02\u5E38:".concat(_context4.t0.message)
              });

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[2, 11]]);
    }
  }]);

  return LeavesAdminController;
}(BaseController);

module.exports = LeavesAdminController;