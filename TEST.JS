module.exports = async () => {
    modelSchemas.formSchema = mongoose.model('form', mongoose.Schema({
        id: Number,
        "state": {
            type: Number,
            default: 1
        },
        "name": String,
        "code": String,
        "config": mongoose.Schema.Types.Mixed,
        "createTime": {
            type: Date,
            default: Date.now()
        },
        updateTime: {
            type: Date,
            default: Date.now()
        },
        updateByUser: Number,
        createTime: {
            type: Date,
            default: Date.now()
        },
        createByUser: Number,
        remark: String
    }, {
        autoCreate: true
    }), 'form')
}


// list
module.exports = async () => {
    const {
        name,
        state = 1
    } = ctx.request.query
    const {
        page,
        skipIndex
    } = Tools.pager(ctx.request.query)
    const params = {}
    if (name) params.name = new RegExp(`${name}`, 'ig')
    params.state = parseInt(state);
    const query = modelSchemas.formSchema.find(params)
    const list = await query.sort({
        id: -1
    }).skip(skipIndex).limit(page.pageSize)
    const total = await modelSchemas.formSchema.countDocuments(params);
    return Tools.success({
        data: {
            page: {
                ...page,
                total
            },
            list
        }
    })
}
// get
module.exports = async () => {
    const {
        id,
    } = ctx.request.query
    if (!id) {
        throw ExceptionCode.INVALID_PARAMS
    }
    const params = {}
    params.id = parseInt(id);
    const query = await modelSchemas.formSchema.findOne(params)

    return Tools.success({
        data: {
            ...query._doc
        }
    })
}


// update
module.exports = async () => {
    const {
        ...params
    } = ctx.request.body;
    if (!params.id) {
        throw ExceptionCode.INVALID_PARAMS
    }
    params.updateTime = new Date();
    params.updateByUser = ctx.state.userId.id
    const res = await modelSchemas.formSchema.findOneAndUpdate({
        id: parseInt(params.id)
    }, params, {
        new: true
    });
    return Tools.success({
        data: res,
        msg: '修改成功！'
    })
}

// remove
module.exports = async () => {
    const {
        ids
    } = ctx.query;
    if (!ids) {
        throw ExceptionCode.INVALID_PARAMS
    }

    let arrId = ids.split(",").filter((item) => item).map((item) => parseInt(item))
    let res = await modelSchemas.formSchema.updateMany({
        id: {
            $in: arrId
        }
    },{
        state:2
    })
    return Tools.success({
        data: res,
        msg: '修改成功！'
    })
}


// post
module.exports = async () => {
    const {
        name,
        code,
        config
    } = ctx.request.body
    const ID = await AutoID({
        code: "formId"
    })
    const add = new modelSchemas.formSchema({
        id: ID,
        createByUser: ctx.state.userId.id,
        name,
        code,
        config
    });
    await add.save();
    return Tools.success({
        msg: '添加成功'
    })
}







module.exports = async () => {
    if (!modelSchemas.projectSchemas) {
        modelSchemas.projectSchemas = mongoose.model('project', mongoose.Schema({
            "name": String,
            "startTime": {
                type: Date,
                default: Date.now()
            },
            "makeTime": {
                type: Date,
                default: Date.now()
            },
            "endTime": {
                type: Date,
                default: Date.now()
            },
            "state": {
                type: String,
                default: 1
            },
            "company": String,
            userInfo: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            "createTime": {
                type: Date,
                default: Date.now()
            },
            "lastLoginTime": {
                type: Date,
                default: Date.now()
            },
            remark: String
        }, {
            autoIndex: true,
            autoCreate: true
        }), 'project')
    }
}