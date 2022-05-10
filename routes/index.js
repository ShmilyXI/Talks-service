const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  // view 首页内容渲染
  await ctx.render('index', {
    title: 'Hello Word!'
  })
})

module.exports = router
