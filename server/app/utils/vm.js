const { NodeVM, VMScript } = require('vm2');
const lodash = require("lodash")
const moment = require("moment")
const mongoose = require('mongoose')
const Tools = require("./Tools")
const ApiAuth = require("./ApiAuth")
const AutoID = require("./AutoID")
const ExceptionCode = require("./ExceptionCode")
const defaultSchemas = require('../model/Model')
const { modelSchemas } = require('./ModelSchemas')
const fse = require('fs-extra')

function VM2(ctx,text) {
    const vm = new NodeVM({
        console: 'inherit',
        timeout: 1000,
        wrapper: "commonjs",
        strict: true,
        sandbox: {
            fs:fse,
            ctx: ctx,
            _: lodash,
            moment: moment,
            Promise: Promise,
            console: console,
            mongoose,
            modelSchemas,
            Tools,
            ApiAuth,
            AutoID,
            ExceptionCode,
            defaultSchemas,
        },
        require: {
            external: true,
            // builtin: ['fs', 'path'],
            // root: "./",
            // mock: {
            //     fs: {
            //         readFileSync() { return 'Nice try!'; }
            //     }
            // }
        }
    });
    return vm.run(text)
}
module.exports = VM2


