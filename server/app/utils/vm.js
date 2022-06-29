const { NodeVM, VMScript } = require('vm2');
const lodash = require("lodash")
const moment = require("moment")
const mongoose = require('mongoose')
const Tools = require("./tools")
const modelSchemas = Object.create({})

function VM2(ctx, next, info) {
    const vm = new NodeVM({
        console: 'inherit',
        timeout: 1000,
        wrapper: "commonjs",
        strict: true,
        sandbox: {
            ctx: ctx,
            _: lodash,
            next: next,
            moment: moment,
            Promise: Promise,
            console: console,
            mongoose,
            modelSchemas,
            Tools,
        },
        require: {
            external: true,
            builtin: ['fs', 'path'],
            root: "./",
            mock: {
                fs: {
                    readFileSync() { return 'Nice try!'; }
                }
            }
        }
    });
    const { fn } = info
    const Fnmodels = vm.run(`module.exports = async() =>{
        const Fnmodels=${info.model}
        return Fnmodels()
       }`);

    const FN = vm.run(`module.exports = async() =>{
        const  FN=${fn}
        return FN()
       }`);
    return {
        Fnmodels,
        FN
    }
}
module.exports = VM2
