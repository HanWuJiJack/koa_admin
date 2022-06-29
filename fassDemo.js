// list
async () => {
    try {
        const { name, state } = ctx.request.query
        const { page, skipIndex } = Tools.pager(ctx.request.query)
        const params = {}
        if (name) params.name = new RegExp(`^${name}`, 'ig')
        if (state && state != '0') params.state = parseInt(state);

        const query = modelSchemas.model100001.find(params) // 查询所有数据
        const list = await query.sort({ _id: -1 }).skip(skipIndex).limit(page.pageSize) // 根据查出的所有数据截取对应页数的数据
        const total = await modelSchemas.model100001.countDocuments(params);
        return Tools.success({
            data: {
                page: {
                    ...page,
                    total
                },
                list
            }

        })
    } catch (error) {
        return Tools.fail({ msg: error.stack })
    }
}

// post
async () => {
    try {
        const { remark } = ctx.request.body;
        if (false) {
            return Tools.fail({ msg: '请填写完整再进行新增提交' })
        } else {
            let check = await modelSchemas.model100001.findOne({})
            if (check) {
                return Tools.fail({ msg: '添加失败，请联系管理员:字典类型不可重复！' })
            }
            const add = new modelSchemas.model100001({
                // state: state ? state : undefined,
                remark: remark ? remark : ''
            });
            await add.save();
            return Tools.success({ msg: '添加成功' })
        }
    } catch (error) {
        return Tools.fail({ msg: '添加失败，请联系管理员' + error.stack })
    }
}

// put
async () => {
    try {
        const { _id } = ctx.request.body
        const { ...params } = ctx.request.body;
        params.updateTime = new Date();
        const res = await modelSchemas.model100001.findOneAndUpdate({ _id }, params, { new: true });
        return Tools.success({ data: res, msg: '修改成功！' })
    } catch (error) {
        return Tools.fail({ msg: error.stack })
    }
}

// delete
async () => {
    try {
        const { ids } = ctx.request.body
        let arrId = ids.split(",").filter((item) => item)
        up
        let res = await modelSchemas.model100001.deleteMany({ _id: { $in: arrId } })
        return Tools.success({ data: res, msg: `删除成功` })
    } catch (error) {
        return Tools.fail({ msg: error.stack })
    }
}

// get
async () => {
    try {
        const { id } = ctx.params
        const params = {}
        if (id) params._id = id
        const query = await modelSchemas.model100001.findOne(params) // 查询所有数据
        return Tools.success({
            data: { ...query._doc }
        })
    } catch (error) {
        return Tools.fail(error.stack)
    }
}

// model
async () => {
    if (!modelSchemas.model100001) {
        modelSchemas.model100001 = mongoose.model('test1', mongoose.Schema({
            "createTime": {
                type: Date,
                default: Date.now()
            },
            "lastLoginTime": {
                type: Date,
                default: Date.now()
            },
            remark: String
        }, { autoIndex: true, autoCreate: true }), 'test1')
    }
}




