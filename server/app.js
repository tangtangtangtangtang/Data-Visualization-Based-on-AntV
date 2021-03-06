const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')


onerror(app)

app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))


//views
const views = require('koa-views')
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(koaBody({
  multipart: true,
  onError: (error, ctx) => {
    ctx.throw(error)
  }
}))

const routes = require('./routes/index')
app.use(routes)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen("8007", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`listened 8007`);
  }
})

module.exports = app
