const Router = require('koa-router')
const ctrl = require('../controller/index')
const svc = require('../service/index')
const router = new Router()

let routes = [

  {
    path: '/saveGraph',
    controller: ctrl.saveGraphByAccount,
    method: 'post',
  }, {
    path: '/signUp',
    controller: ctrl.signUp,
    method: 'post'
  }, {
    path: '/logIn',
    controller: ctrl.logIn,
    method: 'post',
  }, {
    path: "/uploadData",
    controller: svc.uploadManger,
    method: "post",
  }, {
    path: '/getFile',
    controller: svc.sendFile,
    method: 'get'
  }, {
    path: "/:parmas",
    redirect: "/"
  }, {
    path: "/",
    controller: ctrl.index
  }
]
routes.forEach(item => {
  if (item.path && item.controller) {
    router[item.method || "get"](item.path, item.controller)
  } else if (item.redirect) {
    router[item.method || "get"](item.path, async (ctx) => {
      ctx.redirect(item.redirect)
    })
  }
})

module.exports = router.routes()
