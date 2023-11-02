const Schema = require('./../model/Model')
module.exports = async function ({
    code
}) {
    const countDoc = await Schema.counterSchema.findOneAndUpdate({
        _id: code
    }, {
        $inc: {
            currentIndex: 1
        }
    }, {
        new: true
    });
    if(!countDoc){
        const add = new Schema.counterSchema({
            "_id": code, //唯一标识
            "currentIndex":1, //当前ID数
        });
        await add.save();
        return 1
    }
    return countDoc.currentIndex
}
