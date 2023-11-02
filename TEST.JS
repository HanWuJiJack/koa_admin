module.exports = async () => {
    modelSchemas.modelSchema = mongoose.model('model', mongoose.Schema({
        id: Number,
        "func": String,
        "name": String,
        "state": {
            type: Number,
            default: 1
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
    }), 'model')
}

module.exports = async () => {
    modelSchemas.formSchema = mongoose.model('form', mongoose.Schema({
        "name": String,
        "code": String,
        "config": mongoose.Schema.Types.Mixed,
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
    }), 'form')
}


module.exports = async () => {
    const params = {
        state: 1
    }
    const list = await modelSchemas.modelSchema.find(params)
    const total = await modelSchemas.modelSchema.countDocuments(params);
    return Tools.success({
        data: {
            page: {
                total
            },
            list
        }
    })
}

// // list
// module.exports = async () => {
//     const {
//         name,
//         state = 1
//     } = ctx.request.query

//     const {
//         page,
//         skipIndex
//     } = Tools.pager(ctx.request.query)

//     const params = {}
//     if (name) params.name = new RegExp(`${name}`, 'ig')
//     params.state = parseInt(state);
//     const query = modelSchemas.modelSchema.find(params)
//     const list = await query.sort({
//         _id: -1
//     }).skip(skipIndex).limit(page.pageSize)
//     const total = await modelSchemas.modelSchema.countDocuments(params);
//     return Tools.success({
//         data: {
//             page: {
//                 ...page,
//                 total
//             },
//             list
//         }

//     })
// }
// // get
// module.exports = async () => {
//     const {
//         id,
//         state = 1
//     } = ctx.request.query
//     if (!id) {
//         throw ExceptionCode.INVALID_PARAMS
//     }
//     const params = {}
//     params.state = parseInt(state);
//     params.id = parseInt(id);
//     const query = await modelSchemas.modelSchema.findOne(params)

//     return Tools.success({
//         data: {
//             ...query._doc
//         }
//     })
// }


// update
module.exports = async () => {
    ApiAuth(ctx, ["555"])
    const {
        ...params
    } = ctx.request.body;
    if (!params.id) {
        throw ExceptionCode.INVALID_PARAMS
    }
    params.updateTime = new Date();
    const res = await modelSchemas.modelSchema.findOneAndUpdate({
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
    let res = await modelSchemas.modelSchema.deleteMany({
        id: {
            $in: arrId
        }
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
        func
    } = ctx.request.body
    const ID = await AutoID({
        code: "modelID"
    })
    const add = new modelSchemas.modelSchema({
        id: ID,
        func,
        name
    });
    await add.save();
    await InitFaas()
    return Tools.success({
        msg: '添加成功'

    })
}