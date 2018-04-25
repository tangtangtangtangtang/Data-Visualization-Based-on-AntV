const path = require("path")
const koaBody = require("koa-body")
const fsExtra = require('fs-extra')
const logger = require('koa-logger')
module.exports = {
    index: async (ctx) => {
        await ctx.render("index.ejs")
    },
    receiveData: async (ctx) => {
        console.log("ctx.request.body", ctx.request.body);
        return ctx.body = ({
            num: "",
            message: "",
        })
    }
}