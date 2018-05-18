const path = require("path")
// const koaBody = require("koa-body")
const fsExtra = require('fs-extra')
const logger = require('koa-logger')
const db = require('../dbService/dbconnect')
const md5 = require('md5')
const mongoose = require('mongoose')
module.exports = {
    index: async (ctx) => {
        await ctx.render("index.ejs")
    },
    saveGraphByAccount: async (ctx) => {
        let data = ctx.request.body;
        let fileExt = data.fileType;
        let fileBasePath = `${__dirname}/../fileStore`
        let ObjectId = new mongoose.Types.ObjectId()
        let _id = ObjectId.toHexString();
        if (fileExt === 'csv' && !data._id) {
            //初次保存csv文件
            data._id = _id;
            await fsExtra.copy(`${fileBasePath}/temp.csv`,
                `${fileBasePath}/${data._id}.csv`)
                .catch(err => {
                    console.log(err)
                })
            data.fileName = `${data._id}.csv`
            await db.graphModel.create(data)
                .then(graph => {
                    ctx.body = {
                        code: true,
                        message: '保存成功',
                        _id: data._id
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (fileExt === 'csv' && data._id) {
            await fsExtra.copy(`${fileBasePath}/temp.csv`,
                `${fileBasePath}/${data._id}.csv`)
                .catch(err => {
                    console.log(err)
                })
            await db.graphModel.findOneAndUpdate({ _id: data._id }, data)
                .then(graph => {
                    ctx.body = {
                        code: true,
                        message: '保存成功',
                        _id: data._id
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else if (fileExt === 'json' && !data._id) {
            data._id = _id;
            await fsExtra.outputFile(`${fileBasePath}/${data._id}.json`, JSON.parse(data.data))
                .catch(err => {
                    console.log(err)
                })
            data.fileName = `${data._id}.csv`
            await db.graphModel.create(data)
                .then(graph => {
                    ctx.body = {
                        code: true,
                        message: '保存成功',
                        _id: data._id
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            await fsExtra.outputFile(`${fileBasePath}/${data._id}.json`, JSON.parse(data.data))
                .catch(err => {
                    console.log(err)
                })
            await db.graphModel.create(data)
                .then(graph => {
                    ctx.body = {
                        code: true,
                        message: '保存成功',
                        _id: data._id
                    }
                })
                .catch(err => {
                    console.log(err)
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