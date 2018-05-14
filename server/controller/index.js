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
        let data = ctx.request.body
        if (data.fileType === 'csv') {
            delete data.data
        } else {
            let fileName = data.owner + Date.now()
            let filePath = __dirname + `/../myCsvUploadFile/${fileName}.JSON`
            data.fileName = fileName;
        }
        if (data._id) {
            await db.graphModel.findOneAndUpdate({ _id: data._id }, data)
                .then((graph) => {
                    ctx.body = {
                        code: true,
                        message: '保存成功',
                        _id: graph.id
                    }
                })
                .catch(err => {
                    ctx.body = {
                        code: false,
                        message: err.message
                    }
                })
        } else {
            delete data._id
            await db.graphModel.create(data)
                .then((graph) => {
                    ctx.body = {
                        code: true,
                        message: '保存成功',
                        _id: graph.id
                    }
                })
                .catch(err => {
                    ctx.body = {
                        code: false,
                        message: err
                    }
                })
        }
    },
    signUp: async (ctx) => {
        let user = {
            'account': ctx.request.body.account,
            'password': md5(ctx.request.body.password),
            'nickname': ctx.request.body.nickname
        }
        let data = await db.userModel.find({ 'account': user.account });
        if (data.length > 0) {
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
        if (data.length > 0 && md5(ctx.request.body.password) === data[0].password) {
            let graph = await db.graphModel.find({ 'owner': ctx.request.body.account })
            ctx.body = {
                code: true,
                message: '登陆成功',
                account: data[0].account,
                nickname: data[0].nickname,
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