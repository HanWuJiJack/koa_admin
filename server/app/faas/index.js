
const Auth = require(process.cwd() + '/app/middleware/auth');
const Schema = require('./../model');
const vm2 = require("./../utils/vm");

exports.faas = async (ctx, next, method) => {
    const { code } = ctx.params
    const faasInfo = await Schema.faasSchema.findOne({ method, code }) // 查询所有数据
    if (faasInfo) {
        faasInfo.models = []
        let dictInfo = await Schema.dictSchema.findOne({ nameCode: "Schema_type" })
        const query = await Schema.dictTypeSchema.find({ dictId: dictInfo.id }) // 查询所有数据
        for (const iterator of query) {
            if (faasInfo.schemaCode.split(',').includes(iterator.dictValue)) {
                faasInfo.models.push(iterator.dictLabel)
            }
        }
        if (faasInfo._doc.isAuth === "1") {
            await Auth(ctx, next)
        }
        try {
            for (const key in faasInfo.models) {
                if (Object.hasOwnProperty.call(faasInfo.models, key)) {
                    await vm2(ctx, next, faasInfo.models[key])()
                }
            }
            ctx.body = await vm2(ctx, next, faasInfo.fn)()
        } catch (error) {
            console.error('Failed to compile script.', error);
            next(error)
        }
    }

}