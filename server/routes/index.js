const Router = require('koa-router')
const ctrl = require('../controller/index')
const router = new Router()

let routes = [
  {
    path: "/:parmas",
    redirect: "/"
  },{
    path:"/",
    controller:ctrl.index
  }
]

// module.exports = function (app) {
//   routes.forEach(item => {
//     if (item.controller && item.path) {
//       app.use(router[item.method || "get"](item.path, item.controller))
//     } else if (item.redirect) {
//       app.use(router[item.method || "get"](item.path, async (ctx, next) => {
//         ctx.redirect(item.redirect);
//       }))
//     }
//   })
// }

routes.forEach(item => {
  if(item.path && item.controller){
    router[item.method || "get"](item.path , item.controller)
  }else if(item.redirect){
    router[item.method || "get"](item.path , async (ctx) => {
      ctx.redirect(item.redirect)
    })
  }
})

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router.routes()
