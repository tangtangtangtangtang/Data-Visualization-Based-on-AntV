const path = require("path")
// const koaBody = require("koa-body")
const fsExtra = require('fs-extra')
const logger = require('koa-logger')
const db = require('../dbService/dbconnect')
module.exports = {
    index: async (ctx) => {
        await ctx.render("index.ejs")
    },
    signUp: async (ctx) => {
        console.log(ctx);
        await db.userModel.create(query.name, (err, user) => {
            if (err) {
                ctx.body = {
                    message: '登陆失败'
                }
            } else if (!err && user.password === query.password) {
                ctx.body = {
                    message: "登陆成功"
                }
            }
        })
    },
    logIn: async (ctx) => {
        await db.userModel.findByName(query.name, (err, user) => {
            if (err) {
                ctx.body = {
                    message: '登陆失败'
                }
            } else if (!err && user.password === query.password) {
                ctx.body = {
                    message: "登陆成功"
                }
            }
        })
    },
}