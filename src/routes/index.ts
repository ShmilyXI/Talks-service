import Router from 'koa-router';
const router = new Router();

router.get('/', async (ctx: any) => {
  // view 首页内容渲染
  await ctx.render('index', {
    title: 'Hello Word!',
  });
});

module.exports = router;
