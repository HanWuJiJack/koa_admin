const { NodeVM, VMScript } = require('vm2');
const lodash = require("lodash")
const moment = require("moment")
const mongoose = require('mongoose')
const Tools = require("./tools")
const defaultSchemas = require('./../model/index')
const { modelSchemas } = require('./modelSchemas')


function VM2(ctx, next, text) {
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
            defaultSchemas,
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
    return vm.run(text)
}
module.exports = VM2


