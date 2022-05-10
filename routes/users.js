const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/test', function (ctx, next) {
  ctx.body = 'this is a users/test response'
})

module.exports = router
