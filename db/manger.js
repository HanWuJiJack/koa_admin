/*
 Navicat Premium Data Transfer

 Source Server         : mongo
 Source Server Type    : MongoDB
 Source Server Version : 50005 (5.0.5)
 Source Host           : localhost:27018
 Source Schema         : manger

 Target Server Type    : MongoDB
 Target Server Version : 50005 (5.0.5)
 File Encoding         : 65001

 Date: 30/10/2023 15:43:33
*/


// ----------------------------
// Collection structure for counter
// ----------------------------
db.getCollection("counter").drop();
db.createCollection("counter");

// ----------------------------
// Documents of counter
// ----------------------------
db.getCollection("counter").insert([ {
    _id: "userId",
    currentIndex: NumberInt("1000011")
} ]);
db.getCollection("counter").insert([ {
    _id: "dictId",
    currentIndex: 29
} ]);
db.getCollection("counter").insert([ {
    _id: "dictTypeId",
    currentIndex: 39
} ]);

// ----------------------------
// Collection structure for depts
// ----------------------------
db.getCollection("depts").drop();
db.createCollection("depts");

// ----------------------------
// Documents of depts
// ----------------------------
db.getCollection("depts").insert([ {
    _id: ObjectId("62a9701548ec890bb426a354"),
    parentId: [
        null
    ],
    updateTime: ISODate("2022-06-24T03:08:16.966Z"),
    createTime: ISODate("2022-06-15T03:16:23.195Z"),
    deptName: "开发部门",
    userName: "hsueh",
    userId: "1000009",
    userEmail: "hsueh1@qq.com",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for dict
// ----------------------------
db.getCollection("dict").drop();
db.createCollection("dict");
db.getCollection("dict").createIndex({
    nameCode: NumberInt("1")
}, {
    name: "nameCode_1",
    background: true,
    unique: true
});

// ----------------------------
// Documents of dict
// ----------------------------
db.getCollection("dict").insert([ {
    _id: ObjectId("62ac302a4a59940e9803016a"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-17T07:39:58.439Z"),
    lastLoginTime: ISODate("2022-06-17T07:39:58.439Z"),
    id: NumberInt("9"),
    name: "FAAS方法类型",
    nameCode: "FAAS_Method_type",
    remark: "nisi commodo occaecat sunt esse",
    __v: NumberInt("0")
} ]);
db.getCollection("dict").insert([ {
    _id: ObjectId("62b935bf392d8739a48eb8f7"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-27T03:16:18.492Z"),
    lastLoginTime: ISODate("2022-06-27T03:16:18.492Z"),
    id: NumberInt("25"),
    name: "公司类型",
    nameCode: "company-type",
    remark: "",
    __v: NumberInt("0")
} ]);
db.getCollection("dict").insert([ {
    _id: ObjectId("62ba51711725a24020a2a68d"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-28T00:52:57.122Z"),
    lastLoginTime: ISODate("2022-06-28T00:52:57.122Z"),
    id: NumberInt("26"),
    name: "faas模型类型",
    nameCode: "Schema_type",
    remark: "",
    __v: NumberInt("0")
} ]);
db.getCollection("dict").insert([ {
    _id: ObjectId("62bcf710efdb000588ce45f7"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T01:05:24.482Z"),
    lastLoginTime: ISODate("2022-06-30T01:05:24.482Z"),
    id: NumberInt("27"),
    name: "场景表单",
    nameCode: "environment_form",
    remark: "",
    __v: NumberInt("0")
} ]);
db.getCollection("dict").insert([ {
    _id: ObjectId("62bd4a79cfdcc02a10354636"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T06:59:26.122Z"),
    lastLoginTime: ISODate("2022-06-30T06:59:26.122Z"),
    id: NumberInt("28"),
    name: "项目状态",
    nameCode: "project_status",
    remark: "",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for dictType
// ----------------------------
db.getCollection("dictType").drop();
db.createCollection("dictType");

// ----------------------------
// Documents of dictType
// ----------------------------
db.getCollection("dictType").insert([ {
    _id: ObjectId("62ac32c23c6f20329476928c"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-17T07:51:54.536Z"),
    lastLoginTime: ISODate("2022-06-17T07:51:54.536Z"),
    id: NumberInt("3"),
    dictId: NumberInt("9"),
    dictLabel: "get(单条)",
    dictValue: "get",
    dictSort: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62b557e1fc17e80e40b2d65e"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-24T04:57:20.737Z"),
    lastLoginTime: ISODate("2022-06-24T04:57:20.737Z"),
    id: NumberInt("7"),
    dictId: NumberInt("9"),
    dictLabel: "get（列表）",
    dictValue: "list",
    dictSort: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62b557eefc17e80e40b2d665"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-24T04:57:20.737Z"),
    lastLoginTime: ISODate("2022-06-24T04:57:20.737Z"),
    id: NumberInt("8"),
    dictId: NumberInt("9"),
    dictLabel: "post",
    dictValue: "post",
    dictSort: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62b557f8fc17e80e40b2d66c"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-24T04:57:20.737Z"),
    lastLoginTime: ISODate("2022-06-24T04:57:20.737Z"),
    id: NumberInt("9"),
    dictId: NumberInt("9"),
    dictLabel: "put",
    dictValue: "put",
    dictSort: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62b55806fc17e80e40b2d673"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-24T04:57:20.737Z"),
    lastLoginTime: ISODate("2022-06-24T04:57:20.737Z"),
    id: NumberInt("10"),
    dictId: NumberInt("9"),
    dictLabel: "delete",
    dictValue: "remove",
    dictSort: NumberInt("1"),
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62b935f2392d8739a48eb90b"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-27T03:16:18.494Z"),
    lastLoginTime: ISODate("2022-06-27T03:16:18.494Z"),
    id: NumberInt("11"),
    dictId: NumberInt("25"),
    dictLabel: "公司1",
    dictValue: "1",
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62ba51a01725a24020a2a6a3"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-28T00:52:57.137Z"),
    lastLoginTime: ISODate("2022-06-28T00:52:57.137Z"),
    id: NumberInt("12"),
    dictId: NumberInt("26"),
    dictLabel: "module.exports =async () => {     if (!modelSchemas.model100001) {         modelSchemas.model100001 = mongoose.model('test1', mongoose.Schema({             \"createTime\": {                 type: Date,                 default: Date.now()             },             \"lastLoginTime\": {                 type: Date,                 default: Date.now()             },             remark: String         }, { autoIndex: true, autoCreate: true }), 'test1')     } }",
    dictValue: "model100001-test1",
    __v: NumberInt("0"),
    remark: "测试",
    dictSort: null
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62bbf9c15ee56f4014349703"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-29T07:01:44.807Z"),
    lastLoginTime: ISODate("2022-06-29T07:01:44.807Z"),
    id: NumberInt("14"),
    dictId: NumberInt("26"),
    dictLabel: "module.exports =  async () => {     if (!modelSchemas.model100002) {         modelSchemas.model100002 = mongoose.model('form_create', mongoose.Schema({             \"name\": String,             \"code\":String,             \"config\": mongoose.Schema.Types.Mixed,             \"createTime\": {                 type: Date,                 default: Date.now()             },             \"lastLoginTime\": {                 type: Date,                 default: Date.now()             },             remark: String         }, { autoIndex: true, autoCreate: true }), 'form_create')     } }",
    dictValue: "model100002-form_create",
    __v: NumberInt("0"),
    remark: "表单",
    dictSort: null
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62bcf8b3efdb000588ce461b"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T01:05:24.483Z"),
    lastLoginTime: ISODate("2022-06-30T01:05:24.483Z"),
    id: NumberInt("15"),
    dictId: NumberInt("27"),
    dictLabel: "200001",
    dictValue: "100001",
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62bd0709efdb000588ce476f"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T01:05:24.483Z"),
    lastLoginTime: ISODate("2022-06-30T01:05:24.483Z"),
    id: NumberInt("16"),
    dictId: NumberInt("26"),
    dictLabel: "module.exports = async () => {     console.log(\"modelSchemas\", modelSchemas);     if (!modelSchemas.model100003) {         modelSchemas.model100003 = mongoose.model('project', mongoose.Schema({             \"name\": String,             \"startTime\": {                 type: Date,                 default: Date.now()             },             \"makeTime\": {                 type: Date,                 default: Date.now()             },             \"endTime\": {                 type: Date,                 default: Date.now()             },             \"state\": {                 type: String,                 default: 1             },             \"company\": String,             userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },             \"createTime\": {                 type: Date,                 default: Date.now()             },             \"lastLoginTime\": {                 type: Date,                 default: Date.now()             },             remark: String         }, { autoIndex: true, autoCreate: true }), 'project')     } }",
    dictValue: "model100003-project",
    __v: NumberInt("0"),
    remark: "项目",
    dictSort: null
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62bd4a86cfdcc02a10354640"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T06:59:26.123Z"),
    lastLoginTime: ISODate("2022-06-30T06:59:26.123Z"),
    id: NumberInt("17"),
    dictId: NumberInt("28"),
    dictLabel: "开始",
    dictValue: "1",
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("62bd6089cfdcc02a10354f9e"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T06:59:26.123Z"),
    lastLoginTime: ISODate("2022-06-30T06:59:26.123Z"),
    id: NumberInt("18"),
    dictId: NumberInt("25"),
    dictLabel: "公司2",
    dictValue: "2",
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("653f574a9db71330ff65f129"),
    state: NumberInt("1"),
    createTime: ISODate("2023-10-30T07:11:01.241Z"),
    lastLoginTime: ISODate("2023-10-30T07:11:01.241Z"),
    id: NumberInt("39"),
    remark: "",
    dictId: NumberInt("26"),
    dictLabel: "module.exports = async () => {     if (!modelSchemas.model100005) {         modelSchemas.model100005 = mongoose.model('test5', mongoose.Schema({             \"createTime\": {                 type: Date,                 default: Date.now()             },             \"lastLoginTime\": {                 type: Date,                 default: Date.now()             },             remark: String         }, {             autoIndex: true,             autoCreate: true         }), 'test5')     } }",
    dictValue: "model100005-test5",
    dictSort: null,
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for faas
// ----------------------------
db.getCollection("faas").drop();
db.createCollection("faas");
db.getCollection("faas").createIndex({
    code: NumberInt("1")
}, {
    name: "code_1",
    background: true
});

// ----------------------------
// Documents of faas
// ----------------------------
db.getCollection("faas").insert([ {
    _id: ObjectId("62b90e1abeea342cd09a1fe3"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-27T01:54:06.881Z"),
    lastLoginTime: ISODate("2022-06-27T01:54:06.881Z"),
    method: "list",
    fn: "// list\nmodule.exports = async () => {\n\n    try {\n        const { name, state } = ctx.request.query\n        const { page, skipIndex } = Tools.pager(ctx.request.query)\n        const params = {}\n        if (name) params.name = new RegExp(`^${name}`, 'ig')\n        if (state && state != '0') params.state = parseInt(state);\n\n        const query = modelSchemas.model100001.find(params) // 查询所有数据\n        const list = await query.sort({ _id: -1 }).skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据\n        const total = await modelSchemas.model100001.countDocuments(params);\n        return Tools.success({\n            data: {\n                page: {\n                    ...page,\n                    total\n                },\n                list\n            }\n\n        })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}\n",
    code: "100001",
    path: "/custom/faas/list/100001",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0"),
    schemaCode: "100001"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62b90e40beea342cd09a1fee"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-27T01:54:06.881Z"),
    lastLoginTime: ISODate("2022-06-27T01:54:06.881Z"),
    method: "post",
    fn: "// post\nmodule.exports = async () => {\n    try {\n        const { remark } = ctx.request.body;\n        if (false) {\n            return Tools.fail({ msg: '请填写完整再进行新增提交' })\n        } else {\n            let check = await modelSchemas.model100001.findOne({})\n            if (false) {\n                return Tools.fail({ msg: '添加失败，请联系管理员:字典类型不可重复！' })\n            }\n            const add = new modelSchemas.model100001({\n                // state: state ? state : undefined,\n                remark: remark ? remark : ''\n            });\n            await add.save();\n            return Tools.success({data:add, msg: '添加成功' })\n        }\n    } catch (error) {\n        return Tools.fail({ msg: '添加失败，请联系管理员' + error.stack })\n    }\n}",
    code: "100001",
    path: "/custom/faas/100001",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0"),
    schemaCode: "100001"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62b90e5bbeea342cd09a1ff4"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-27T01:54:06.881Z"),
    lastLoginTime: ISODate("2022-06-27T01:54:06.881Z"),
    method: "put",
    fn: "// put\nmodule.exports = async () => {\n    try {\n        const { _id } = ctx.request.body\n        const { ...params } = ctx.request.body;\n        params.updateTime = new Date();\n        const res = await modelSchemas.model100001.findOneAndUpdate({ _id }, params,{new:true});\n        return Tools.success({ data: res, msg: '修改成功！' })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}",
    code: "100001",
    path: "/custom/faas/100001",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0"),
    schemaCode: "100001"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62b90e6dbeea342cd09a1ffa"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-27T01:54:06.881Z"),
    lastLoginTime: ISODate("2022-06-27T01:54:06.881Z"),
    method: "remove",
    fn: "// delete\nmodule.exports = async () => {\n\n    try {\n        const { ids } = ctx.request.body\n        let arrId = ids.split(\",\").filter((item) => item)\n        let res = await modelSchemas.model100001.deleteMany({ _id: { $in: arrId } })\n        return Tools.success({ data: res, msg: `删除成功` })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}",
    code: "100001",
    path: "/custom/faas/100001",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0"),
    schemaCode: "100001"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62b90e9cbeea342cd09a2000"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-27T01:54:06.881Z"),
    lastLoginTime: ISODate("2022-06-27T01:54:06.881Z"),
    method: "get",
    fn: "// get\nmodule.exports = async () => {\n    try {\n        const { id } = ctx.params\n        const params = {}\n        if (id) params._id = id\n        const query = await modelSchemas.model100001.findOne(params) // 查询所有数据\n        return Tools.success({\n            data: { ...query._doc }\n        })\n    } catch (error) {\n        return Tools.fail(error.stack)\n    }\n}",
    code: "100001",
    path: "/custom/faas/100001/:id",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0"),
    schemaCode: "100001"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bbf9fb5ee56f401434970f"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-29T07:01:44.817Z"),
    lastLoginTime: ISODate("2022-06-29T07:01:44.817Z"),
    method: "get",
    fn: "// get\nmodule.exports = async () => {\n    try {\n        const { id,code} = ctx.request.query;\n        const params = {}\n        if (id) params._id = id\n        if (code) params.code = code\n        const query = await modelSchemas.model100002.findOne(params) // 查询所有数据\n        return Tools.success({\n            data: { ...query._doc }\n        })\n    } catch (error) {\n        return Tools.fail(error.stack)\n    }\n}",
    code: "100002",
    path: "/custom/faas/100002/:id",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0"),
    schemaCode: "100002"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bbfa315ee56f4014349715"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-29T07:01:44.817Z"),
    lastLoginTime: ISODate("2022-06-29T07:01:44.817Z"),
    method: "list",
    fn: "// list\nmodule.exports = async () => {\n    try {\n        const { name,code} = ctx.request.query\n        const { page, skipIndex } = Tools.pager(ctx.request.query)\n        const params = {}\n        if (name) params.name = new RegExp(`${name}`, 'ig')\n        if (code) params.code = new RegExp(`${code}`, 'ig')\n        const query = modelSchemas.model100002.find(params) // 查询所有数据\n        const list = await query.sort({ _id: -1 }).skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据\n        const total = await modelSchemas.model100002.countDocuments(params);\n        return Tools.success({\n            data: {\n                page: {\n                    ...page,\n                    total\n                },\n                list\n            }\n\n        })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}",
    code: "100002",
    path: "/custom/faas/list/100002",
    remark: "",
    __v: NumberInt("0"),
    isAuth: "1",
    schemaCode: "100002"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bbfb2f5ee56f401434971b"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-29T07:01:44.817Z"),
    lastLoginTime: ISODate("2022-06-29T07:01:44.817Z"),
    method: "post",
    fn: "// post\nmodule.exports = async () => {\n    try {\n        const { remark, name, config,code } = ctx.request.body;\n        if (false) {\n            return Tools.fail({ msg: '请填写完整再进行新增提交' })\n        } else {\n            let check = await modelSchemas.model100002.findOne({code})\n            if (check) {\n                 return Tools.fail({ msg: '添加失败，请联系管理员:code不可重复！' })\n            }\n            const add = new modelSchemas.model100002({\n                code,\n                name, config,\n                remark: remark ? remark : ''\n            });\n            await add.save();\n            return Tools.success({ msg: '添加成功' })\n        }\n    } catch (error) {\n        return Tools.fail({ msg: '添加失败，请联系管理员' + error.stack })\n    }\n}",
    code: "100002",
    path: "/custom/faas/100002",
    remark: "",
    __v: NumberInt("0"),
    isAuth: "1",
    schemaCode: "100002"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bbfb645ee56f4014349732"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-29T07:01:44.817Z"),
    lastLoginTime: ISODate("2022-06-29T07:01:44.817Z"),
    method: "put",
    fn: "// put\nmodule.exports = async () => {\n    try {\n        const { _id } = ctx.request.body\n        const { ...params } = ctx.request.body;\n        params.updateTime = new Date();\n        const res = await modelSchemas.model100002.findOneAndUpdate({ _id }, params, { new: true });\n        return Tools.success({ data: res, msg: '修改成功！' })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}",
    code: "100002",
    path: "/custom/faas/100002",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0"),
    schemaCode: "100002"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bbfb7d5ee56f4014349738"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-29T07:01:44.817Z"),
    lastLoginTime: ISODate("2022-06-29T07:01:44.817Z"),
    method: "remove",
    fn: "// delete\nmodule.exports = async () => {\n    try {\n      \n        const { ids } = ctx.request.body\n        let arrId = ids.split(\",\").filter((item) => item)\n        let res = await modelSchemas.model100002.deleteMany({ _id: { $in: arrId } })\n        return Tools.success({ data: res, msg: `删除成功` })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}",
    code: "100002",
    path: "/custom/faas/100002",
    remark: "",
    __v: NumberInt("0"),
    isAuth: "1",
    schemaCode: "100002"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bd08d5efdb000588ce479a"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T01:05:24.484Z"),
    lastLoginTime: ISODate("2022-06-30T01:05:24.484Z"),
    method: "post",
    fn: "module.exports = async () => {\n    try {\n        ctx.verifyParams({\n          name: 'string',\n        })\n        const { name, startTime, makeTime, remark, endTime, state, company,userId } = ctx.request.body;\n        const add = new modelSchemas.model100003({\n            userInfo: userId || ctx.state.userInfo._id,\n            name, startTime, makeTime, remark, endTime, state,\n            company: company || ctx.state.userInfo.company,\n            remark: remark ? remark : ''\n        });\n        await add.save();\n        return Tools.success({ msg: '添加成功' })\n    } catch (error) {\n        return Tools.fail({ msg: '添加失败，请联系管理员' + error.stack })\n    }\n}",
    code: "100003",
    path: "/custom/faas/100003",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0"),
    schemaCode: "100003"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bd16074563a03d880060eb"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T03:07:29.274Z"),
    lastLoginTime: ISODate("2022-06-30T03:07:29.274Z"),
    method: "list",
    fn: "module.exports = async () => {\n    try {\n        const { name, state } = ctx.request.query\n        const { page, skipIndex } = Tools.pager(ctx.request.query)\n        const params = {}\n        if (name) params.name = new RegExp(`${name}`, 'ig')\n        if (state && state != 0) params.state = state;\n\n        const query = modelSchemas.model100003.find(params) // 查询所有数据\n        const list = await query.sort({ endTime: -1 }).skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据\n        const total = await modelSchemas.model100003.countDocuments(params);\n        return Tools.success({\n            data: {\n                page: {\n                    ...page,\n                    total\n                },\n                list\n            }\n\n        })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}",
    code: "100003",
    path: "/custom/faas/list/100003",
    remark: "",
    __v: NumberInt("0"),
    isAuth: "2",
    schemaCode: "100003"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bd16414563a03d880060f6"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T03:07:29.274Z"),
    lastLoginTime: ISODate("2022-06-30T03:07:29.274Z"),
    method: "put",
    fn: "module.exports = async () => {\n    try {\n        const { _id } = ctx.request.body\n        const { ...params } = ctx.request.body;\n        console.log(\"params7777\",params)\n        params.updateTime = new Date();\n        const res = await modelSchemas.model100003.findOneAndUpdate({ _id }, params, { new: true });\n        return Tools.success({ data: res, msg: '修改成功！' })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}",
    code: "100003",
    path: "/custom/faas/100003",
    remark: "",
    __v: NumberInt("0"),
    isAuth: "1"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("62bd17a74563a03d880060fc"),
    state: NumberInt("1"),
    createTime: ISODate("2022-06-30T03:07:29.274Z"),
    lastLoginTime: ISODate("2022-06-30T03:07:29.274Z"),
    method: "remove",
    fn: "module.exports = async () => {\n    try {\n        const { ids } = ctx.request.body\n        let arrId = ids.split(\",\").filter((item) => item)\n        let res = await modelSchemas.model100003.deleteMany({ _id: { $in: arrId } })\n        return Tools.success({ data: res, msg: `删除成功` })\n    } catch (error) {\n        return Tools.fail({ msg: error.stack })\n    }\n}",
    code: "100003",
    path: "/custom/faas/100003",
    remark: "",
    __v: NumberInt("0"),
    isAuth: "1",
    schemaCode: "100003"
} ]);

// ----------------------------
// Collection structure for form_create
// ----------------------------
db.getCollection("form_create").drop();
db.createCollection("form_create");

// ----------------------------
// Documents of form_create
// ----------------------------
db.getCollection("form_create").insert([ {
    _id: ObjectId("62bc040c32a9460c40f773e7"),
    createTime: ISODate("2022-06-29T07:41:49.092Z"),
    lastLoginTime: ISODate("2022-06-29T07:41:49.092Z"),
    name: "项目创建表单",
    config: {
        list: [
            {
                label: "名称",
                type: "input",
                options: {
                    width: "100%",
                    defaultValue: "",
                    placeholder: "",
                    maxlength: null,
                    prefix: "",
                    suffix: "",
                    prepend: "",
                    append: "",
                    disabled: false,
                    clearable: false,
                    readonly: false,
                    rules: {
                        trigger: "blur",
                        enum: "",
                        message: "",
                        pattern: "",
                        required: false,
                        type: "any"
                    }
                },
                key: "b299a6d5d32c4e72a6d1709c40be1c2d",
                model: "name",
                rules: [ ]
            },
            {
                label: "开始日期",
                type: "date",
                options: {
                    defaultValue: "",
                    width: "",
                    placeholder: "请选择时间",
                    format: "YYYY-MM-DD",
                    readonly: false,
                    editable: false,
                    clearable: true,
                    disabled: false,
                    rules: {
                        trigger: "blur",
                        enum: "",
                        message: "",
                        pattern: "",
                        required: false,
                        type: "any"
                    }
                },
                key: "d34d5bc4fd704d5ebfa3447d9747d9ef",
                model: "startTime",
                rules: [ ]
            },
            {
                label: "制作日期",
                type: "date",
                options: {
                    defaultValue: "",
                    width: "",
                    placeholder: "请选择时间",
                    format: "YYYY-MM-DD",
                    readonly: false,
                    editable: true,
                    clearable: true,
                    disabled: false,
                    rules: {
                        trigger: "blur",
                        enum: "",
                        message: "",
                        pattern: "",
                        required: false,
                        type: "any"
                    }
                },
                key: "89ed5c990a6c47f7930904bcb1e5ab63",
                model: "makeTime",
                rules: [ ]
            },
            {
                label: "结束日期",
                type: "date",
                options: {
                    defaultValue: "",
                    width: "",
                    placeholder: "请选择时间",
                    format: "YYYY-MM-DD",
                    readonly: false,
                    editable: true,
                    clearable: true,
                    disabled: false,
                    rules: {
                        trigger: "blur",
                        enum: "",
                        message: "",
                        pattern: "",
                        required: false,
                        type: "any"
                    }
                },
                key: "bcddf55b4cbe40ef902c80765e3058c4",
                model: "endTime",
                rules: [ ]
            },
            {
                label: "状态",
                type: "select",
                options: {
                    defaultValue: "",
                    width: "200px",
                    multiple: false,
                    placeholder: "请选择",
                    remote: true,
                    showLabel: true,
                    filterable: false,
                    clearable: false,
                    disabled: false,
                    props: {
                        label: "dictLabel",
                        value: "dictValue"
                    },
                    options: [
                        {
                            label: "Option 1",
                            value: "Option 1"
                        },
                        {
                            label: "Option 2",
                            value: "Option 2"
                        },
                        {
                            label: "Option 3",
                            value: "Option 3"
                        }
                    ],
                    remoteOptions: [ ],
                    remoteFunc: "/OA/api/dictType/dict/open/project_status",
                    rules: {
                        trigger: "blur",
                        enum: "",
                        message: "",
                        pattern: "",
                        required: false,
                        type: "any"
                    }
                },
                key: "6e4c8840d10c41e987252128efb6eaec",
                model: "state",
                rules: [ ]
            },
            {
                label: "公司",
                type: "select",
                options: {
                    defaultValue: "",
                    width: "200px",
                    multiple: false,
                    placeholder: "请选择",
                    remote: true,
                    showLabel: true,
                    filterable: false,
                    clearable: false,
                    disabled: false,
                    props: {
                        label: "dictLabel",
                        value: "dictValue"
                    },
                    options: [
                        {
                            label: "Option 1",
                            value: "Option 1"
                        },
                        {
                            label: "Option 2",
                            value: "Option 2"
                        },
                        {
                            label: "Option 3",
                            value: "Option 3"
                        }
                    ],
                    remoteOptions: [ ],
                    remoteFunc: "/OA/api/dictType/dict/open/company-type",
                    rules: {
                        trigger: "blur",
                        enum: "",
                        message: "",
                        pattern: "",
                        required: false,
                        type: "any"
                    }
                },
                key: "5809e8de2f6f4b9bb0dee0da7404ef31",
                model: "company",
                rules: [ ]
            },
            {
                label: "指定人员",
                type: "select",
                options: {
                    defaultValue: "",
                    width: "200px",
                    multiple: false,
                    placeholder: "请选择",
                    remote: true,
                    showLabel: true,
                    filterable: false,
                    clearable: false,
                    disabled: false,
                    props: {
                        label: "userName",
                        value: "_id"
                    },
                    options: [
                        {
                            label: "Option 1",
                            value: "Option 1"
                        },
                        {
                            label: "Option 2",
                            value: "Option 2"
                        },
                        {
                            label: "Option 3",
                            value: "Option 3"
                        }
                    ],
                    remoteOptions: [ ],
                    remoteFunc: "/OA/api/user/open",
                    rules: {
                        trigger: "blur",
                        enum: "",
                        message: "",
                        pattern: "",
                        required: false,
                        type: "any"
                    }
                },
                key: "71896cffdd2443c197c2cbbc9e4ba624",
                model: "userInfo",
                rules: [ ]
            },
            {
                label: "备注",
                type: "textarea",
                options: {
                    width: "100%",
                    defaultValue: "",
                    placeholder: "",
                    maxlength: null,
                    rows: NumberInt("4"),
                    autosize: false,
                    showWordLimit: false,
                    disabled: false,
                    clearable: false,
                    readonly: false,
                    rules: {
                        trigger: "blur",
                        enum: "",
                        message: "",
                        pattern: "",
                        required: false,
                        type: "any"
                    }
                },
                key: "6075e7694e9441be8f26025ecca96562",
                model: "remark",
                rules: [ ]
            }
        ],
        config: {
            size: "default",
            hideRequiredAsterisk: false,
            labelWidth: NumberInt("100"),
            labelPosition: "right"
        }
    },
    remark: "",
    __v: NumberInt("0"),
    code: "100001"
} ]);

// ----------------------------
// Collection structure for leaves
// ----------------------------
db.getCollection("leaves").drop();
db.createCollection("leaves");

// ----------------------------
// Documents of leaves
// ----------------------------
db.getCollection("leaves").insert([ {
    _id: ObjectId("62b173b28fa4ac3a8cb62abf"),
    applyState: NumberInt("2"),
    applyType: NumberInt("1"),
    leaveTime: "29",
    reasons: "66",
    startTime: ISODate("2022-06-02T16:00:00.000Z"),
    endTime: ISODate("2022-06-30T16:00:00.000Z"),
    curAuditUserName: "hsueh",
    orderNo: "XS202206210",
    applyUser: {
        userId: "1000006",
        userName: "admin",
        userEmail: "admin@qq.com"
    },
    auditUsers: "hsueh",
    auditFlows: [
        {
            _id: ObjectId("62b173b28fa4ac3a8cb62ac0"),
            userId: "1000005",
            userName: "hsueh",
            userEmail: "7957@123.com"
        }
    ],
    auditLogs: [
        {
            _id: ObjectId("62b173d98fa4ac3a8cb62ae3"),
            userId: "1000005",
            userName: "hsueh",
            createTime: ISODate("2022-06-21T07:31:37.988Z"),
            remark: "666",
            action: "通过"
        }
    ],
    createTime: ISODate("2022-06-21T07:30:58.889Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leaves").insert([ {
    _id: ObjectId("62b173c08fa4ac3a8cb62ac9"),
    applyState: NumberInt("5"),
    applyType: NumberInt("1"),
    leaveTime: "29",
    reasons: "6666",
    startTime: ISODate("2022-06-02T16:00:00.000Z"),
    endTime: ISODate("2022-06-30T16:00:00.000Z"),
    curAuditUserName: "hsueh",
    orderNo: "XS202206211",
    applyUser: {
        userId: "1000006",
        userName: "admin",
        userEmail: "admin@qq.com"
    },
    auditUsers: "hsueh",
    auditFlows: [
        {
            _id: ObjectId("62b173c08fa4ac3a8cb62aca"),
            userId: "1000005",
            userName: "hsueh",
            userEmail: "7957@123.com"
        }
    ],
    auditLogs: [ ],
    createTime: ISODate("2022-06-21T07:31:12.208Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leaves").insert([ {
    _id: ObjectId("62b26a2cbac26d15c8120132"),
    applyState: NumberInt("5"),
    applyType: NumberInt("1"),
    leaveTime: "32",
    reasons: "66",
    startTime: ISODate("2022-06-02T16:00:00.000Z"),
    endTime: ISODate("2022-07-03T16:00:00.000Z"),
    curAuditUserName: "admin",
    orderNo: "XS202206222",
    applyUser: {
        userId: "1000005",
        userName: "hsueh",
        userEmail: "7957@123.com"
    },
    auditUsers: "admin",
    auditFlows: [
        {
            _id: ObjectId("62b26a2cbac26d15c8120133"),
            userId: "1000006",
            userName: "admin",
            userEmail: "admin@qq.com"
        }
    ],
    auditLogs: [ ],
    createTime: ISODate("2022-06-22T01:02:36.897Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leaves").insert([ {
    _id: ObjectId("62b26a4dbac26d15c812014c"),
    applyState: NumberInt("1"),
    applyType: NumberInt("1"),
    leaveTime: "47",
    reasons: "666",
    startTime: ISODate("2022-06-09T16:00:00.000Z"),
    endTime: ISODate("2022-07-25T16:00:00.000Z"),
    curAuditUserName: "hsueh",
    orderNo: "XS202206223",
    applyUser: {
        userId: "1000005",
        userName: "hsueh",
        userEmail: "7957@123.com"
    },
    auditUsers: "hsueh",
    auditFlows: [
        {
            _id: ObjectId("62b26a4dbac26d15c812014d"),
            userId: "1000005",
            userName: "hsueh",
            userEmail: "7957@123.com"
        }
    ],
    auditLogs: [ ],
    createTime: ISODate("2022-06-22T01:03:09.151Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leaves").insert([ {
    _id: ObjectId("62be54505768281544b7c696"),
    applyState: NumberInt("5"),
    applyType: NumberInt("1"),
    leaveTime: "34",
    reasons: "666",
    startTime: ISODate("2022-06-30T16:00:00.000Z"),
    endTime: ISODate("2022-08-02T16:00:00.000Z"),
    curAuditUserName: "hsueh",
    orderNo: "XS202207014",
    applyUser: {
        userId: "1000009",
        userName: "hsueh",
        userEmail: "hsueh1@qq.com"
    },
    auditUsers: "hsueh",
    auditFlows: [
        {
            _id: ObjectId("62be54505768281544b7c697"),
            userId: "1000009",
            userName: "hsueh",
            userEmail: "hsueh1@qq.com"
        }
    ],
    auditLogs: [ ],
    createTime: ISODate("2022-07-01T01:56:32.119Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("leaves").insert([ {
    _id: ObjectId("62be55315768281544b7c6b6"),
    applyState: NumberInt("1"),
    applyType: NumberInt("1"),
    leaveTime: "35",
    reasons: "666",
    startTime: ISODate("2022-06-30T16:00:00.000Z"),
    endTime: ISODate("2022-08-03T16:00:00.000Z"),
    curAuditUserName: "hsueh",
    orderNo: "XS202207015",
    applyUser: {
        userId: "1000009",
        userName: "hsueh",
        userEmail: "hsueh1@qq.com"
    },
    auditUsers: "hsueh",
    auditFlows: [
        {
            _id: ObjectId("62be55315768281544b7c6b7"),
            userId: "1000009",
            userName: "hsueh",
            userEmail: "hsueh1@qq.com"
        }
    ],
    auditLogs: [ ],
    createTime: ISODate("2022-07-01T02:00:17.246Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for menus
// ----------------------------
db.getCollection("menus").drop();
db.createCollection("menus");

// ----------------------------
// Documents of menus
// ----------------------------
db.getCollection("menus").insert([ {
    _id: ObjectId("62a956fe48ec890bb426a157"),
    parentId: [
        null
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-28T07:59:29.282Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    icon: "Operation",
    menuName: "系统管理",
    path: "/system",
    component: "blankpage/index",
    __v: NumberInt("0"),
    isShow: NumberInt("1"),
    code: "10001"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9578748ec890bb426a160"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-28T08:01:06.782Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "菜单管理",
    path: "/system/menu",
    component: "Menu/Menu",
    __v: NumberInt("0"),
    isShow: NumberInt("1"),
    icon: "Menu",
    code: 10002
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a957c548ec890bb426a163"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-28T08:03:28.287Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "角色管理",
    path: "/system/roles",
    component: "Roles/Roles",
    __v: NumberInt("0"),
    isShow: NumberInt("1"),
    icon: "Avatar",
    code: 10003
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9616548ec890bb426a19d"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-28T08:04:53.222Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "部门管理",
    component: "Dept/Dept",
    path: "/system/dept",
    __v: NumberInt("0"),
    isShow: NumberInt("1"),
    icon: "Promotion",
    code: 10004
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a961d448ec890bb426a1b7"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a9578748ec890bb426a160")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "menu-create",
    menuName: "添加",
    __v: NumberInt("0"),
    code: 10005
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a961e248ec890bb426a1ba"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a9578748ec890bb426a160")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "menu-edit",
    menuName: "编辑",
    __v: NumberInt("0"),
    code: 10006
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a961ef48ec890bb426a1bd"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a9578748ec890bb426a160")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "menu-delete",
    menuName: "删除",
    __v: NumberInt("0"),
    code: 10007
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9622f48ec890bb426a1c0"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a957c548ec890bb426a163")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "role-edit",
    menuName: "编辑",
    __v: NumberInt("0"),
    code: 10008
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9624048ec890bb426a1c3"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a957c548ec890bb426a163")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "role-setpermission",
    menuName: "设置权限",
    __v: NumberInt("0"),
    code: 10009
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9625048ec890bb426a1c6"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a957c548ec890bb426a163")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "role-delete",
    menuName: "删除",
    __v: NumberInt("0"),
    code: 100010
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9626b48ec890bb426a1c9"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a957c548ec890bb426a163")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "role-create",
    menuName: "创建角色",
    __v: NumberInt("0"),
    code: 100011
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9670c48ec890bb426a1d2"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a9616548ec890bb426a19d")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "dept-create",
    menuName: "新增部门",
    __v: NumberInt("0"),
    code: 100012
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9672148ec890bb426a1d5"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a9616548ec890bb426a19d")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "编辑",
    menuCode: "dept-edit",
    __v: NumberInt("0"),
    code: 100013
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9672c48ec890bb426a1d8"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a9616548ec890bb426a19d")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "删除",
    menuCode: "dept-delete",
    __v: NumberInt("0"),
    code: 100014
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a967de48ec890bb426a1f4"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-28T08:05:36.329Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "申请审批",
    path: "/system/leave",
    component: "Leave/Leave",
    __v: NumberInt("0"),
    isShow: NumberInt("1"),
    icon: "Calendar",
    code: 100015
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a9681e48ec890bb426a1fd"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-28T08:05:55.897Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "审批",
    path: "/system/approve",
    component: "Approve/Approve",
    __v: NumberInt("0"),
    isShow: NumberInt("1"),
    icon: "Checked",
    code: 100016
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a96e1748ec890bb426a2d6"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-28T08:00:16.761Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "用户管理",
    path: "/system/users",
    component: "Users/Users",
    __v: NumberInt("0"),
    isShow: NumberInt("1"),
    icon: "User",
    code: 100017
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a96e3948ec890bb426a2d9"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a96e1748ec890bb426a2d6")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "user-edit",
    menuName: "编辑",
    __v: NumberInt("0"),
    code: 100018
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a96e5048ec890bb426a2dc"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a96e1748ec890bb426a2d6")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "删除",
    menuCode: "user-delete",
    __v: NumberInt("0"),
    code: 100019
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a96e6748ec890bb426a2df"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a96e1748ec890bb426a2d6")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "新增用户",
    menuCode: "user-create",
    __v: NumberInt("0"),
    code: 100020
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a96e7348ec890bb426a2e2"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a96e1748ec890bb426a2d6")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "user-deletes",
    menuName: "批量删除",
    __v: NumberInt("0"),
    code: 100021
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a973ba48ec890bb426a3f0"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a967de48ec890bb426a1f4")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "申请休假",
    menuCode: "leave-create",
    __v: NumberInt("0"),
    code: 100022
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a973cf48ec890bb426a3f3"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a967de48ec890bb426a1f4")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "leave-see",
    menuName: "查看",
    __v: NumberInt("0"),
    code: 100023
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a973df48ec890bb426a3f6"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a967de48ec890bb426a1f4")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "leave-delete",
    menuName: "作废",
    __v: NumberInt("0"),
    code: 100024
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62a973fc48ec890bb426a3f9"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62a9681e48ec890bb426a1fd")
    ],
    createTime: ISODate("2022-06-15T03:16:23.192Z"),
    updateTime: ISODate("2022-06-15T03:16:23.192Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "approve-audit",
    menuName: "审核",
    __v: NumberInt("0"),
    code: 100025
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62afff407435064330e7b50c"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-20T04:54:55.508Z"),
    updateTime: ISODate("2022-06-28T08:06:48.776Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    path: "/system/dict",
    component: "Dict/index",
    menuName: "字典管理",
    isShow: NumberInt("1"),
    __v: NumberInt("0"),
    icon: "FolderOpened",
    code: 100026
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b000f97435064330e7b52c"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62afff407435064330e7b50c")
    ],
    createTime: ISODate("2022-06-20T04:54:55.508Z"),
    updateTime: ISODate("2023-10-30T07:17:19.919Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "dict-create",
    menuName: "新增",
    __v: NumberInt("0"),
    code: "100027"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b0010b7435064330e7b52f"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62afff407435064330e7b50c")
    ],
    createTime: ISODate("2022-06-20T04:54:55.508Z"),
    updateTime: ISODate("2023-10-30T07:17:37.262Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "dict-edit",
    menuName: "编辑",
    __v: NumberInt("0"),
    code: "100028"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b001177435064330e7b532"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62afff407435064330e7b50c")
    ],
    createTime: ISODate("2022-06-20T04:54:55.508Z"),
    updateTime: ISODate("2023-10-30T07:17:41.995Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "dict-ditail",
    menuName: "详情",
    __v: NumberInt("0"),
    code: "100029"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b001257435064330e7b535"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62afff407435064330e7b50c")
    ],
    createTime: ISODate("2022-06-20T04:54:55.508Z"),
    updateTime: ISODate("2023-10-30T07:17:46.007Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "删除",
    menuCode: "dict-delete",
    __v: NumberInt("0"),
    code: "30"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b005bd53614a2c4c03cd31"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-20T05:12:10.66Z"),
    updateTime: ISODate("2023-10-30T07:17:52.217Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "字典类型",
    path: "/system/dictType/:id",
    component: "Dict/DictType/index",
    isShow: NumberInt("2"),
    __v: NumberInt("0"),
    icon: "FolderOpened",
    code: "100031"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b0346c53614a2c4c03ce2f"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62b005bd53614a2c4c03cd31")
    ],
    createTime: ISODate("2022-06-20T05:12:10.66Z"),
    updateTime: ISODate("2023-10-30T07:17:57.542Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "dictType-create",
    menuName: "新增",
    __v: NumberInt("0"),
    code: "100032"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b0348053614a2c4c03ce32"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62b005bd53614a2c4c03cd31")
    ],
    createTime: ISODate("2022-06-20T05:12:10.66Z"),
    updateTime: ISODate("2023-10-30T07:18:03.316Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "dictType-edit",
    menuName: "编辑",
    __v: NumberInt("0"),
    code: "100033"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b0348b53614a2c4c03ce35"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62b005bd53614a2c4c03cd31")
    ],
    createTime: ISODate("2022-06-20T05:12:10.66Z"),
    updateTime: ISODate("2023-10-30T07:18:08.111Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "dictType-delete",
    menuName: "删除",
    __v: NumberInt("0"),
    code: "100034"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b54458fc17e80e40b2d4f1"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-24T04:57:20.742Z"),
    updateTime: ISODate("2023-10-30T07:18:13.877Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "FAAS",
    isShow: NumberInt("1"),
    __v: NumberInt("0"),
    component: "Faas/index",
    path: "/system/faas",
    icon: "Position",
    code: "100035"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b544d5fc17e80e40b2d516"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62b54458fc17e80e40b2d4f1")
    ],
    createTime: ISODate("2022-06-24T04:57:20.742Z"),
    updateTime: ISODate("2023-10-30T07:18:20.105Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "新增",
    menuCode: "faas-create",
    __v: NumberInt("0"),
    code: "100036"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b544e4fc17e80e40b2d51b"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62b54458fc17e80e40b2d4f1")
    ],
    createTime: ISODate("2022-06-24T04:57:20.742Z"),
    updateTime: ISODate("2023-10-30T07:18:26.222Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "批量删除",
    menuCode: "faas-deletes",
    __v: NumberInt("0"),
    code: "100037"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b544f2fc17e80e40b2d520"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62b54458fc17e80e40b2d4f1")
    ],
    createTime: ISODate("2022-06-24T04:57:20.742Z"),
    updateTime: ISODate("2023-10-30T07:18:30.88Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "编辑",
    menuCode: "faas-edit",
    __v: NumberInt("0"),
    code: "100038"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b544fffc17e80e40b2d525"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62b54458fc17e80e40b2d4f1")
    ],
    createTime: ISODate("2022-06-24T04:57:20.742Z"),
    updateTime: ISODate("2023-10-30T07:18:37.756Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "删除",
    menuCode: "faas-delete",
    __v: NumberInt("0"),
    code: "100039"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62b94a59e213d535c87592f0"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-27T06:00:16.5Z"),
    updateTime: ISODate("2023-10-30T07:18:45.629Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "个人中心",
    path: "/system/my",
    component: "Users/index",
    isShow: NumberInt("2"),
    __v: NumberInt("0"),
    code: "100040"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bbfc2e5ee56f4014349740"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157")
    ],
    createTime: ISODate("2022-06-29T07:01:44.833Z"),
    updateTime: ISODate("2023-10-30T07:18:50.495Z"),
    menuType: NumberInt("1"),
    menuState: NumberInt("1"),
    menuName: "表单管理",
    path: "/system/generator",
    icon: "Moon",
    component: "FormCreate/index",
    isShow: NumberInt("1"),
    __v: NumberInt("0"),
    code: "100041"
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bbfd170b77a1414c078f0c"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bbfc2e5ee56f4014349740")
    ],
    createTime: ISODate("2022-06-29T07:16:54.678Z"),
    updateTime: ISODate("2022-06-29T07:16:54.678Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "FormCreate-create",
    menuName: "新增",
    __v: NumberInt("0"),
    code: 100042
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bbfd240b77a1414c078f11"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bbfc2e5ee56f4014349740")
    ],
    createTime: ISODate("2022-06-29T07:16:54.678Z"),
    updateTime: ISODate("2022-06-29T07:16:54.678Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "FormCreate-deletes",
    menuName: "批量删除",
    __v: NumberInt("0"),
    code: 100043
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bbfd310b77a1414c078f16"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bbfc2e5ee56f4014349740")
    ],
    createTime: ISODate("2022-06-29T07:16:54.678Z"),
    updateTime: ISODate("2022-06-29T07:16:54.678Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "FormCreate-edit",
    menuName: "编辑",
    __v: NumberInt("0"),
    code: 100044
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bbfd3d0b77a1414c078f1b"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bbfc2e5ee56f4014349740")
    ],
    createTime: ISODate("2022-06-29T07:16:54.678Z"),
    updateTime: ISODate("2022-06-29T07:16:54.678Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "FormCreate-ditail",
    menuName: "详情",
    __v: NumberInt("0"),
    code: 100045
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bbfd490b77a1414c078f20"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bbfc2e5ee56f4014349740")
    ],
    createTime: ISODate("2022-06-29T07:16:54.678Z"),
    updateTime: ISODate("2022-06-29T07:16:54.678Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "FormCreate-delete",
    menuName: "删除",
    __v: NumberInt("0"),
    code: 100046
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bd011eefdb000588ce46a8"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bd00d0efdb000588ce469f")
    ],
    createTime: ISODate("2022-06-30T01:05:24.488Z"),
    updateTime: ISODate("2022-06-30T01:05:24.488Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "新增",
    menuCode: "project-create",
    __v: NumberInt("0"),
    code: 100047
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bd012cefdb000588ce46ad"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bd00d0efdb000588ce469f")
    ],
    createTime: ISODate("2022-06-30T01:05:24.488Z"),
    updateTime: ISODate("2022-06-30T01:05:24.488Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuName: "批量删除",
    menuCode: "project-deletes",
    __v: NumberInt("0"),
    code: 100048
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bd013befdb000588ce46b2"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bd00d0efdb000588ce469f")
    ],
    createTime: ISODate("2022-06-30T01:05:24.488Z"),
    updateTime: ISODate("2022-06-30T01:05:24.488Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "project-edit",
    menuName: "编辑",
    __v: NumberInt("0"),
    code: 100049
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bd014defdb000588ce46b7"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bd00d0efdb000588ce469f")
    ],
    createTime: ISODate("2022-06-30T01:05:24.488Z"),
    updateTime: ISODate("2022-06-30T01:05:24.488Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "project-ditail",
    menuName: "详情",
    __v: NumberInt("0"),
    code: 100050
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("62bd0157efdb000588ce46bc"),
    parentId: [
        ObjectId("62a956fe48ec890bb426a157"),
        ObjectId("62bd00d0efdb000588ce469f")
    ],
    createTime: ISODate("2022-06-30T01:05:24.488Z"),
    updateTime: ISODate("2022-06-30T01:05:24.488Z"),
    menuType: NumberInt("2"),
    menuState: NumberInt("1"),
    menuCode: "project-delete",
    menuName: "删除",
    __v: NumberInt("0"),
    code: 100051
} ]);

// ----------------------------
// Collection structure for project
// ----------------------------
db.getCollection("project").drop();
db.createCollection("project");

// ----------------------------
// Documents of project
// ----------------------------
db.getCollection("project").insert([ {
    _id: ObjectId("6333b771afe8905249238571"),
    startTime: ISODate("2022-08-31T16:00:00.000Z"),
    makeTime: ISODate("2022-08-31T16:00:00.000Z"),
    endTime: ISODate("2022-08-31T16:00:00.000Z"),
    state: "1",
    createTime: ISODate("2022-09-28T02:06:14.391Z"),
    lastLoginTime: ISODate("2022-09-28T02:06:14.391Z"),
    userInfo: ObjectId("62b52a27b7e86a21986a2328"),
    name: "7878",
    remark: "666",
    company: "2",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for roles
// ----------------------------
db.getCollection("roles").drop();
db.createCollection("roles");

// ----------------------------
// Documents of roles
// ----------------------------
db.getCollection("roles").insert([ {
    _id: ObjectId("62a96fa748ec890bb426a323"),
    permissionList: {
        checkedKeys: [
            "62a961d448ec890bb426a1b7",
            "62a961e248ec890bb426a1ba",
            "62a961ef48ec890bb426a1bd",
            "62a9622f48ec890bb426a1c0",
            "62a9624048ec890bb426a1c3",
            "62a9625048ec890bb426a1c6",
            "62a9626b48ec890bb426a1c9",
            "62a9670c48ec890bb426a1d2",
            "62a9672148ec890bb426a1d5",
            "62a9672c48ec890bb426a1d8",
            "62a973ba48ec890bb426a3f0",
            "62a973cf48ec890bb426a3f3",
            "62a973df48ec890bb426a3f6",
            "62a973fc48ec890bb426a3f9",
            "62a96e3948ec890bb426a2d9",
            "62a96e5048ec890bb426a2dc",
            "62a96e6748ec890bb426a2df",
            "62a96e7348ec890bb426a2e2",
            "62b000f97435064330e7b52c",
            "62b0010b7435064330e7b52f",
            "62b001177435064330e7b532",
            "62b001257435064330e7b535",
            "62b0346c53614a2c4c03ce2f",
            "62b0348053614a2c4c03ce32",
            "62b0348b53614a2c4c03ce35",
            "62b544d5fc17e80e40b2d516",
            "62b544e4fc17e80e40b2d51b",
            "62b544f2fc17e80e40b2d520",
            "62b544fffc17e80e40b2d525",
            "62b94a59e213d535c87592f0",
            "62bbfd170b77a1414c078f0c",
            "62bbfd240b77a1414c078f11",
            "62bbfd310b77a1414c078f16",
            "62bbfd3d0b77a1414c078f1b",
            "62bbfd490b77a1414c078f20",
            "62bd011eefdb000588ce46a8",
            "62bd012cefdb000588ce46ad",
            "62bd013befdb000588ce46b2",
            "62bd014defdb000588ce46b7",
            "62bd0157efdb000588ce46bc"
        ],
        halfCheckedKeys: [
            "62a956fe48ec890bb426a157",
            "62a9578748ec890bb426a160",
            "62a957c548ec890bb426a163",
            "62a9616548ec890bb426a19d",
            "62a967de48ec890bb426a1f4",
            "62a9681e48ec890bb426a1fd",
            "62a96e1748ec890bb426a2d6",
            "62afff407435064330e7b50c",
            "62b005bd53614a2c4c03cd31",
            "62b54458fc17e80e40b2d4f1",
            "62bbfc2e5ee56f4014349740",
            "62be6e9f5d9e5f43706ddc09",
            "62bd00d0efdb000588ce469f"
        ]
    },
    createTime: ISODate("2022-06-15T03:16:23.193Z"),
    roleName: "管理员",
    remark: "",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("62b52a27b7e86a21986a2328"),
    deptId: [
        "62a9701548ec890bb426a354"
    ],
    state: NumberInt("1"),
    role: NumberInt("0"),
    roleList: [
        "62a96fa748ec890bb426a323"
    ],
    createTime: ISODate("2022-06-24T02:57:16.842Z"),
    lastLoginTime: ISODate("2022-06-24T02:57:16.842Z"),
    userId: NumberInt("1000009"),
    userName: "hsueh",
    userPwd: "e10adc3949ba59abbe56e057f20f883e",
    userEmail: "hsueh@qq.com",
    mobile: "1666688",
    __v: NumberInt("0"),
    InvoiceTitle: "发票抬头",
    brand: "555",
    company: "1",
    companyAddress: "公司地址",
    dutyParagraph: "税号",
    expressAddress: "快递地址",
    expressName: "快递联系人",
    expressPhone: "快递联系人手机号",
    job: "岗位"
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("62b9390c392d8739a48eb926"),
    deptId: [
        "62a9701548ec890bb426a354"
    ],
    state: NumberInt("1"),
    role: NumberInt("1"),
    roleList: [
        "62a96ff048ec890bb426a347"
    ],
    createTime: ISODate("2022-06-27T03:16:18.504Z"),
    lastLoginTime: ISODate("2022-06-27T03:16:18.504Z"),
    userId: NumberInt("1000010"),
    userName: "admin",
    userPwd: "e10adc3949ba59abbe56e057f20f883e",
    userEmail: "admin@qq.com",
    __v: NumberInt("0"),
    job: null,
    mobile: null,
    InvoiceTitle: null,
    brand: null,
    company: null,
    companyAddress: null,
    dutyParagraph: null,
    expressAddress: null,
    expressName: null,
    expressPhone: null
} ]);
