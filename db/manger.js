/*
 Navicat Premium Data Transfer

 Source Server         : mongo
 Source Server Type    : MongoDB
 Source Server Version : 50005 (5.0.5)
 Source Host           : 127.0.0.1:27017
 Source Schema         : manger

 Target Server Type    : MongoDB
 Target Server Version : 50005 (5.0.5)
 File Encoding         : 65001

 Date: 03/11/2023 15:43:28
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
    _id: ObjectId("65448270b07177223c65cb21"),
    id: "userId",
    currentIndex: NumberInt("10"),
    __v: NumberInt("0")
} ]);
db.getCollection("counter").insert([ {
    _id: ObjectId("654486dd32fddc26eb77a60e"),
    id: "dictId",
    currentIndex: NumberInt("2"),
    __v: NumberInt("0")
} ]);
db.getCollection("counter").insert([ {
    _id: ObjectId("654487df32fddc26eb77a634"),
    id: "deptId",
    currentIndex: NumberInt("28"),
    __v: NumberInt("0")
} ]);
db.getCollection("counter").insert([ {
    _id: ObjectId("65448f050051122c42dc80fc"),
    id: "modelID",
    currentIndex: NumberInt("3"),
    __v: NumberInt("0")
} ]);
db.getCollection("counter").insert([ {
    _id: ObjectId("654490030051122c42dc812c"),
    id: "dictTypeId",
    currentIndex: NumberInt("5"),
    __v: NumberInt("0")
} ]);
db.getCollection("counter").insert([ {
    _id: ObjectId("654490c30051122c42dc8172"),
    id: "faasFuncId",
    currentIndex: NumberInt("5"),
    __v: NumberInt("0")
} ]);
db.getCollection("counter").insert([ {
    _id: ObjectId("654492ba0051122c42dc81ae"),
    id: "formId",
    currentIndex: NumberInt("3"),
    __v: NumberInt("0")
} ]);
db.getCollection("counter").insert([ {
    _id: ObjectId("6544a047cd0480399b3df27c"),
    id: "roleId",
    currentIndex: NumberInt("1"),
    __v: NumberInt("0")
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
    _id: ObjectId("65449b5bfd2b9d3702fb440e"),
    state: NumberInt("2"),
    parentId: [
        null
    ],
    updateTime: ISODate("2023-11-03T07:03:44.543Z"),
    createTime: ISODate("2023-11-03T07:03:44.543Z"),
    deptName: "asdf",
    userName: "hsueh",
    userId: "7",
    userEmail: "hsueh@qq.com",
    id: NumberInt("26"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("depts").insert([ {
    _id: ObjectId("65449c0cfd2b9d3702fb442b"),
    state: NumberInt("1"),
    parentId: [
        null
    ],
    updateTime: ISODate("2023-11-03T07:03:44.543Z"),
    createTime: ISODate("2023-11-03T07:03:44.543Z"),
    deptName: "开发部门",
    userName: "hsueh",
    userId: "7",
    userEmail: "hsueh@qq.com",
    id: NumberInt("27"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("depts").insert([ {
    _id: ObjectId("65449c16fd2b9d3702fb4431"),
    state: NumberInt("1"),
    parentId: [
        null
    ],
    updateTime: ISODate("2023-11-03T07:03:44.543Z"),
    createTime: ISODate("2023-11-03T07:03:44.543Z"),
    deptName: "财务部门",
    userName: "hsueh",
    userId: "7",
    userEmail: "hsueh@qq.com",
    id: NumberInt("28"),
    createByUser: NumberInt("7"),
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
    _id: ObjectId("654486dd32fddc26eb77a610"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T05:27:15.747Z"),
    createTime: ISODate("2023-11-03T05:27:15.747Z"),
    id: NumberInt("1"),
    name: "environment_form",
    createByUser: NumberInt("7"),
    nameCode: "environment_form",
    remark: "",
    __v: NumberInt("0")
} ]);
db.getCollection("dict").insert([ {
    _id: ObjectId("654486fd32fddc26eb77a618"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T05:27:15.747Z"),
    createTime: ISODate("2023-11-03T05:27:15.747Z"),
    id: NumberInt("2"),
    name: "FAAS方法请求类型",
    createByUser: NumberInt("7"),
    nameCode: "FAAS_Method_type",
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
    _id: ObjectId("654490030051122c42dc812e"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:01:18.451Z"),
    createTime: ISODate("2023-11-03T06:01:18.451Z"),
    id: NumberInt("1"),
    remark: "",
    dictId: NumberInt("2"),
    createByUser: NumberInt("7"),
    dictLabel: "list",
    dictValue: "list",
    dictSort: null,
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("654490070051122c42dc8135"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:01:18.451Z"),
    createTime: ISODate("2023-11-03T06:01:18.451Z"),
    id: NumberInt("2"),
    remark: "",
    dictId: NumberInt("2"),
    createByUser: NumberInt("7"),
    dictLabel: "get",
    dictValue: "get",
    dictSort: null,
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("6544900e0051122c42dc813c"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:01:18.451Z"),
    createTime: ISODate("2023-11-03T06:01:18.451Z"),
    id: NumberInt("3"),
    remark: "",
    dictId: NumberInt("2"),
    createByUser: NumberInt("7"),
    dictLabel: "put",
    dictValue: "put",
    dictSort: null,
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("654490140051122c42dc8143"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:01:18.451Z"),
    createTime: ISODate("2023-11-03T06:01:18.451Z"),
    id: NumberInt("4"),
    remark: "",
    dictId: NumberInt("2"),
    createByUser: NumberInt("7"),
    dictLabel: "post",
    dictValue: "post",
    dictSort: null,
    __v: NumberInt("0")
} ]);
db.getCollection("dictType").insert([ {
    _id: ObjectId("6544901d0051122c42dc814a"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:17:27.971Z"),
    createTime: ISODate("2023-11-03T06:01:18.451Z"),
    id: NumberInt("5"),
    remark: "",
    dictId: NumberInt("2"),
    createByUser: NumberInt("7"),
    dictLabel: "remove",
    dictValue: "remove",
    dictSort: null,
    __v: NumberInt("0"),
    updateByUser: NumberInt("7")
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
    _id: ObjectId("654490c30051122c42dc8174"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:01:18.453Z"),
    createTime: ISODate("2023-11-03T06:01:18.453Z"),
    id: NumberInt("1"),
    createByUser: NumberInt("7"),
    method: "post",
    fn: "module.exports = async () => {\n    const {\n        name,\n        code,\n        config\n    } = ctx.request.body\n    const ID = await AutoID({\n        code: \"formId\"\n    })\n    const add = new modelSchemas.formSchema({\n        id: ID,\n        createByUser: ctx.state.userId.id,\n        name,\n        code,\n        config\n    });\n    await add.save();\n    return Tools.success({\n        msg: '添加成功'\n    })\n}",
    code: "form",
    path: "/custom/faas/post/form",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0")
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("6544912e0051122c42dc8184"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:01:18.453Z"),
    createTime: ISODate("2023-11-03T06:01:18.453Z"),
    id: NumberInt("2"),
    createByUser: NumberInt("7"),
    method: "remove",
    fn: "module.exports = async () => {\n    const {\n        ids\n    } = ctx.query;\n    if (!ids) {\n        throw ExceptionCode.INVALID_PARAMS\n    }\n\n    let arrId = ids.split(\",\").filter((item) => item).map((item) => parseInt(item))\n    let res = await modelSchemas.formSchema.updateMany({\n        id: {\n            $in: arrId\n        }\n    },{\n        state:2\n    })\n    return Tools.success({\n        data: res,\n        msg: '修改成功！'\n    })\n}",
    code: "form",
    path: "/custom/faas/remove/form",
    isAuth: "1",
    remark: "",
    __v: NumberInt("0")
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("654491840051122c42dc818b"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:33:38.241Z"),
    createTime: ISODate("2023-11-03T06:01:18.453Z"),
    id: NumberInt("3"),
    createByUser: NumberInt("7"),
    method: "put",
    fn: "module.exports = async () => {\n    const {\n        ...params\n    } = ctx.request.body;\n    if (!params.id) {\n        throw ExceptionCode.INVALID_PARAMS\n    }\n    params.updateTime = new Date();\n    params.updateByUser = ctx.state.userId.id\n    const res = await modelSchemas.formSchema.findOneAndUpdate({\n        id: parseInt(params.id)\n    }, params, {\n        new: true\n    });\n    return Tools.success({\n        data: res,\n        msg: '修改成功！'\n    })\n}",
    code: "form",
    path: "/custom/faas/put/form",
    remark: "",
    __v: NumberInt("0"),
    updateByUser: NumberInt("7"),
    isAuth: "1"
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("654491ab0051122c42dc8192"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:34:41.105Z"),
    createTime: ISODate("2023-11-03T06:01:18.453Z"),
    id: NumberInt("4"),
    createByUser: NumberInt("7"),
    method: "get",
    fn: "module.exports = async () => {\n    const {\n        id,\n    } = ctx.request.query\n    if (!id) {\n        throw ExceptionCode.INVALID_PARAMS\n    }\n    const params = {}\n    params.id = parseInt(id);\n    const query = await modelSchemas.formSchema.findOne(params)\n\n    return Tools.success({\n        data: {\n            ...query._doc\n        }\n    })\n}",
    code: "form",
    path: "/custom/faas/get/form",
    remark: "",
    __v: NumberInt("0"),
    isAuth: "1",
    updateByUser: NumberInt("7")
} ]);
db.getCollection("faas").insert([ {
    _id: ObjectId("654491e00051122c42dc8199"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:34:46.248Z"),
    createTime: ISODate("2023-11-03T06:01:18.453Z"),
    id: NumberInt("5"),
    createByUser: NumberInt("7"),
    method: "list",
    fn: "module.exports = async () => {\n    const {\n        name,\n        state = 1\n    } = ctx.request.query\n    const {\n        page,\n        skipIndex\n    } = Tools.pager(ctx.request.query)\n    const params = {}\n    if (name) params.name = new RegExp(`${name}`, 'ig')\n    params.state = parseInt(state);\n    const query = modelSchemas.formSchema.find(params)\n    const list = await query.sort({\n        id: -1\n    }).skip(skipIndex).limit(page.pageSize)\n    const total = await modelSchemas.formSchema.countDocuments(params);\n    return Tools.success({\n        data: {\n            page: {\n                ...page,\n                total\n            },\n            list\n        }\n    })\n}",
    code: "form",
    path: "/custom/faas/list/form",
    remark: "",
    __v: NumberInt("0"),
    isAuth: "1",
    updateByUser: NumberInt("7")
} ]);

// ----------------------------
// Collection structure for form
// ----------------------------
db.getCollection("form").drop();
db.createCollection("form");

// ----------------------------
// Documents of form
// ----------------------------
db.getCollection("form").insert([ {
    _id: ObjectId("654492ba0051122c42dc81b0"),
    state: NumberInt("2"),
    createTime: ISODate("2023-11-03T06:11:17.311Z"),
    updateTime: ISODate("2023-11-03T06:33:54.998Z"),
    id: NumberInt("1"),
    createByUser: NumberInt("7"),
    name: "xxx788",
    code: "xxxx",
    config: {
        list: [
            {
                label: "密码框",
                type: "password",
                options: {
                    width: "100%",
                    defaultValue: "",
                    placeholder: "",
                    maxlength: null,
                    prefix: "",
                    suffix: "",
                    prepend: "",
                    append: "",
                    showPassword: true,
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
                key: "09f4f2e0c1a04f2db04d8e3c05424b30",
                model: "password_09f4f2e0c1a04f2db04d8e3c05424b30",
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
    __v: NumberInt("0"),
    updateByUser: NumberInt("7")
} ]);
db.getCollection("form").insert([ {
    _id: ObjectId("654494fc4a155e319f3b40a8"),
    state: NumberInt("2"),
    createTime: ISODate("2023-11-03T06:33:43.662Z"),
    updateTime: ISODate("2023-11-03T06:33:43.662Z"),
    id: NumberInt("2"),
    createByUser: NumberInt("7"),
    name: "f",
    code: "ff",
    config: {
        list: [ ],
        config: {
            size: "default",
            hideRequiredAsterisk: false,
            labelWidth: NumberInt("100"),
            labelPosition: "right"
        }
    },
    __v: NumberInt("0")
} ]);
db.getCollection("form").insert([ {
    _id: ObjectId("654495004a155e319f3b40b1"),
    state: NumberInt("2"),
    createTime: ISODate("2023-11-03T06:33:43.662Z"),
    updateTime: ISODate("2023-11-03T06:33:43.662Z"),
    id: NumberInt("3"),
    createByUser: NumberInt("7"),
    name: "aa",
    code: "sas",
    config: {
        list: [ ],
        config: {
            size: "default",
            hideRequiredAsterisk: false,
            labelWidth: NumberInt("100"),
            labelPosition: "right"
        }
    },
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for leaves
// ----------------------------
db.getCollection("leaves").drop();
db.createCollection("leaves");

// ----------------------------
// Documents of leaves
// ----------------------------

// ----------------------------
// Collection structure for menus
// ----------------------------
db.getCollection("menus").drop();
db.createCollection("menus");

// ----------------------------
// Documents of menus
// ----------------------------
db.getCollection("menus").insert([ {
    _id: ObjectId("654487df32fddc26eb77a636"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        null
    ],
    updateTime: ISODate("2023-11-03T05:27:15.757Z"),
    createTime: ISODate("2023-11-03T05:27:15.757Z"),
    menuType: NumberInt("1"),
    component: "blankpage/index",
    icon: "Operation",
    code: "10001",
    path: "/system",
    menuName: "系统管理",
    id: NumberInt("1"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("654487fb32fddc26eb77a63e"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        null
    ],
    updateTime: ISODate("2023-11-03T05:27:15.757Z"),
    createTime: ISODate("2023-11-03T05:27:15.757Z"),
    menuType: NumberInt("1"),
    component: "blankpage/index",
    menuName: "Faas",
    path: "/faas",
    icon: "Position",
    code: "10002",
    id: NumberInt("2"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("6544893a713b9429b175d05c"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        NumberInt("2")
    ],
    updateTime: ISODate("2023-11-03T05:46:30.361Z"),
    createTime: ISODate("2023-11-03T05:46:30.361Z"),
    menuType: NumberInt("2"),
    menuName: "faas函数",
    menuCode: "",
    path: "/faas/func",
    icon: "",
    component: "Faas/index",
    code: "10003",
    id: NumberInt("5"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("654489dc713b9429b175d064"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        NumberInt("1")
    ],
    updateTime: ISODate("2023-11-03T05:46:30.361Z"),
    createTime: ISODate("2023-11-03T05:46:30.361Z"),
    menuType: NumberInt("2"),
    menuName: "路由管理",
    path: "/system/menu",
    menuCode: "",
    icon: "",
    component: "Menu/Menu",
    code: "10004",
    id: NumberInt("6"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("65448a16713b9429b175d06c"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        NumberInt("1")
    ],
    updateTime: ISODate("2023-11-03T05:46:30.361Z"),
    createTime: ISODate("2023-11-03T05:46:30.361Z"),
    menuType: NumberInt("2"),
    menuName: "字典管理",
    menuCode: "",
    path: "/system/dict",
    icon: "",
    component: "Dict/index",
    code: "10005",
    id: NumberInt("7"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("65448a50713b9429b175d074"),
    state: NumberInt("1"),
    isShow: NumberInt("2"),
    parentId: [
        NumberInt("1")
    ],
    updateTime: ISODate("2023-11-03T06:02:47.868Z"),
    createTime: ISODate("2023-11-03T05:46:30.361Z"),
    menuType: NumberInt("2"),
    menuName: "字典详情",
    menuCode: "",
    path: "/system/dictType/:id",
    icon: "",
    component: "Dict/DictType/index",
    code: "10005",
    id: NumberInt("8"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0"),
    updateByUser: NumberInt("7")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("65448cf90051122c42dc8064"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        NumberInt("1")
    ],
    updateTime: ISODate("2023-11-03T06:02:53.745Z"),
    createTime: ISODate("2023-11-03T06:01:18.46Z"),
    menuType: NumberInt("2"),
    menuName: "角色管理",
    menuCode: "",
    path: "/system/role",
    icon: "",
    component: "Roles/Roles",
    code: "10006",
    id: NumberInt("9"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0"),
    updateByUser: NumberInt("7")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("65448d370051122c42dc807f"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        NumberInt("1")
    ],
    updateTime: ISODate("2023-11-03T06:04:07.972Z"),
    createTime: ISODate("2023-11-03T06:01:18.46Z"),
    menuType: NumberInt("2"),
    menuName: "系统人员管理",
    path: "/system/user",
    component: "Users/Users",
    code: "10007",
    id: NumberInt("10"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0"),
    icon: "",
    menuCode: "",
    updateByUser: NumberInt("7")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("65448d820051122c42dc808d"),
    state: NumberInt("1"),
    isShow: NumberInt("2"),
    parentId: [
        NumberInt("1")
    ],
    updateTime: ISODate("2023-11-03T06:01:18.46Z"),
    createTime: ISODate("2023-11-03T06:01:18.46Z"),
    menuType: NumberInt("2"),
    menuName: "个人信息",
    menuCode: "",
    path: "/system/mine",
    icon: "",
    component: "Users/index",
    code: "10007",
    id: NumberInt("11"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("65448de10051122c42dc80bc"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        NumberInt("1")
    ],
    updateTime: ISODate("2023-11-03T06:01:18.46Z"),
    createTime: ISODate("2023-11-03T06:01:18.46Z"),
    menuType: NumberInt("2"),
    menuName: "部门管理",
    menuCode: "",
    path: "/system/dept",
    icon: "",
    component: "Dept/Dept",
    code: "10008",
    id: NumberInt("12"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("65448e240051122c42dc80c4"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        NumberInt("1")
    ],
    updateTime: ISODate("2023-11-03T06:07:51.837Z"),
    createTime: ISODate("2023-11-03T06:01:18.46Z"),
    menuType: NumberInt("2"),
    menuName: "表单管理",
    menuCode: "",
    path: "/faas/form",
    icon: "",
    component: "FormCreate/index",
    code: "10009",
    id: NumberInt("13"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0"),
    updateByUser: NumberInt("7")
} ]);
db.getCollection("menus").insert([ {
    _id: ObjectId("65448e710051122c42dc80db"),
    state: NumberInt("1"),
    isShow: NumberInt("1"),
    parentId: [
        NumberInt("2")
    ],
    updateTime: ISODate("2023-11-03T06:01:18.46Z"),
    createTime: ISODate("2023-11-03T06:01:18.46Z"),
    menuType: NumberInt("2"),
    menuName: "模型管理",
    menuCode: "",
    path: "/faas/model",
    icon: "",
    component: "DBModel/index",
    code: "100010",
    id: NumberInt("14"),
    createByUser: NumberInt("7"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for model
// ----------------------------
db.getCollection("model").drop();
db.createCollection("model");

// ----------------------------
// Documents of model
// ----------------------------
db.getCollection("model").insert([ {
    _id: ObjectId("65448f050051122c42dc80fe"),
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T06:01:18.466Z"),
    createTime: ISODate("2023-11-03T06:01:18.466Z"),
    id: NumberInt("1"),
    createByUser: NumberInt("7"),
    name: "form",
    func: "module.exports = async () => {\n    modelSchemas.formSchema = mongoose.model('form', mongoose.Schema({\n        id: Number,\n        \"state\": {\n            type: Number,\n            default: 1\n        },\n        \"name\": String,\n        \"code\": String,\n        \"config\": mongoose.Schema.Types.Mixed,\n        \"createTime\": {\n            type: Date,\n            default: Date.now()\n        },\n        updateTime: {\n            type: Date,\n            default: Date.now()\n        },\n        updateByUser:Number,\n        createTime: {\n            type: Date,\n            default: Date.now()\n        },\n        createByUser:Number,\n        remark: String\n    }, {\n        autoCreate: true\n    }), 'form')\n}",
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
    _id: ObjectId("65449d337b1a07386bab18b4"),
    permissionList: {
        checkedKeys: [
            NumberInt("6"),
            NumberInt("7"),
            NumberInt("8"),
            NumberInt("9"),
            NumberInt("10"),
            NumberInt("11"),
            NumberInt("12"),
            NumberInt("13"),
            NumberInt("5"),
            NumberInt("14")
        ],
        halfCheckedKeys: [
            NumberInt("1"),
            NumberInt("2")
        ]
    },
    state: NumberInt("1"),
    updateTime: ISODate("2023-11-03T07:11:53.739Z"),
    createTime: ISODate("2023-11-03T07:11:32.712Z"),
    id: NumberInt("3"),
    createByUser: NumberInt("7"),
    roleName: "开发者",
    remark: "",
    __v: NumberInt("0"),
    updateByUser: NumberInt("7")
} ]);
db.getCollection("roles").insert([ {
    _id: ObjectId("6544a047cd0480399b3df27e"),
    permissionList: {
        checkedKeys: [
            NumberInt("6"),
            NumberInt("7"),
            NumberInt("8"),
            NumberInt("9"),
            NumberInt("10"),
            NumberInt("11"),
            NumberInt("12"),
            NumberInt("13"),
            NumberInt("5"),
            NumberInt("14")
        ],
        halfCheckedKeys: [
            NumberInt("1"),
            NumberInt("2")
        ]
    },
    state: NumberInt("2"),
    updateTime: ISODate("2023-11-03T07:18:08.569Z"),
    createTime: ISODate("2023-11-03T07:18:08.569Z"),
    id: NumberInt("1"),
    createByUser: NumberInt("7"),
    roleName: "测试",
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
    _id: ObjectId("654484b632fddc26eb77a5bf"),
    deptId: [ ],
    state: NumberInt("1"),
    role: NumberInt("0"),
    roleList: [ ],
    updateTime: ISODate("2023-11-03T05:27:15.761Z"),
    createTime: ISODate("2023-11-03T05:27:15.761Z"),
    id: NumberInt("7"),
    userName: "hsueh",
    userPwd: "e10adc3949ba59abbe56e057f20f883e",
    userEmail: "hsueh@qq.com",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("65449c49fd2b9d3702fb4446"),
    deptId: [
        NumberInt("27")
    ],
    state: NumberInt("1"),
    role: NumberInt("1"),
    roleList: [
        NumberInt("3")
    ],
    updateTime: ISODate("2023-11-03T07:37:05.141Z"),
    createTime: ISODate("2023-11-03T07:03:44.56Z"),
    id: NumberInt("8"),
    createByUser: NumberInt("7"),
    userName: "admin",
    userPwd: "fcea920f7412b5da7be0cf42b8c93759",
    userEmail: "admin@qq.com",
    __v: NumberInt("0"),
    updateByUser: NumberInt("7")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("65449fe6cd0480399b3df252"),
    deptId: [
        NumberInt("28")
    ],
    state: NumberInt("2"),
    role: NumberInt("1"),
    roleList: [ ],
    updateTime: ISODate("2023-11-03T07:18:08.571Z"),
    createTime: ISODate("2023-11-03T07:18:08.571Z"),
    id: NumberInt("9"),
    createByUser: NumberInt("7"),
    userName: "dd",
    userPwd: "e10adc3949ba59abbe56e057f20f883e",
    userEmail: "dd@qq.com",
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("6544a039cd0480399b3df26a"),
    deptId: [
        NumberInt("28")
    ],
    state: NumberInt("2"),
    role: NumberInt("1"),
    roleList: [ ],
    updateTime: ISODate("2023-11-03T07:18:08.571Z"),
    createTime: ISODate("2023-11-03T07:18:08.571Z"),
    id: NumberInt("10"),
    createByUser: NumberInt("7"),
    userName: "sssa",
    userPwd: "e10adc3949ba59abbe56e057f20f883e",
    userEmail: "aa@qq.com",
    __v: NumberInt("0")
} ]);
