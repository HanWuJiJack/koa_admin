
const Auth = require(process.cwd() + '/app/middleware/auth');
const Schema = require('./../model');
const vm2 = require("./../utils/vm");

exports.faas = async (ctx, next, method) => {
    const { code } = ctx.params
    const faasInfo = await Schema.faasSchema.findOne({ method, code }) // 查询所有数据
    if (faasInfo) {
        // console.log("faasInfo", faasInfo)
        let dictInfo = await Schema.dictSchema.findOne({ nameCode: "Schema_type" })
        const query = await Schema.dictTypeSchema.find({ dictId: dictInfo.id }) // 查询所有数据
        for (const iterator of query) {
            if (iterator.dictValue === code) {
                faasInfo.model = iterator.dictLabel
            }
        }
        if (faasInfo._doc.isAuth === "1") {
            await Auth(ctx, next)
        }
        try {
            let { Fnmodels, FN } = vm2(ctx, next, faasInfo)
            Fnmodels()
            const info = await FN()
            ctx.body = info
        } catch (error) {
            console.error('Failed to compile script.', error);
            next(error)
        }
    }

}