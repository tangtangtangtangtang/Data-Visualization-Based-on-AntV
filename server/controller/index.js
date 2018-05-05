const path = require("path")
// const koaBody = require("koa-body")
const fsExtra = require('fs-extra')
const logger = require('koa-logger')
const db = require('../dbService/dbconnect')
const md5 = require('md5')
module.exports = {
    index: async (ctx) => {
        await ctx.render("index.ejs")
    },
    saveGraphByAccount: async (ctx) => {
        await db.graphModel.create(ctx.request.body)
    },
    signUp: async (ctx) => {
        let user = {
            'account': ctx.request.body.account,
            'password': md5(ctx.request.body.password),
            'nickname': ctx.request.body.nickname
        }
        let data = await db.userModel.find({ 'account': user.account });
        if (data) {
            ctx.body = {
                code: false,
                message: '账号已经被注册'
            }
        } else {
            let promise = db.userModel.create(user);
            promise.then((err, user) => {
                console.log(err, user);
            })
            ctx.body = {
                code: true,
                message: "注册成功"
            }
        }
    },
    logIn: async (ctx) => {
        let data = await db.userModel.find({ 'account': ctx.request.body.account })
        if (data && md5(ctx.request.body.password) === data[0].password) {
            let graph = await db.graphModel.find({ 'account': ctx.request.body.account })
            ctx.body = {
                code: true,
                message: '登陆成功',
                account: data.account,
                nickname: data.nickname,
                graph: graph
            }
        } else {
            ctx.body = {
                code: false,
                message: '账户或密码错误'
            }
        }
    },
}