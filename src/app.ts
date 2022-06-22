import Koa from 'koa'; // 导入koa
import path from 'path';
import logger from 'koa-logger'; // 导入日志
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const koajwt = require('koa-jwt');

const index = require('./routes/index');
const users = require('./routes/users');
const talk = require('./routes/talk');
const browse = require('./routes/browse');

const app = new Koa();

const staticPath = path.join(__dirname, '../public'); // 静态地址
const viewsPath = path.join(__dirname, '../views'); // 模板地址

// error handler
onerror(app);

// middlewares
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        type: 'warning',
        code: '-3',
        message: '登陆过期，请重新登陆',
      };
    } else {
      throw err;
    }
  });
});

app.use(
  koajwt({
    secret: '126226',
  }).unless({
    path: [/^\/user\/regist/, /^\/user\/login/],
  }),
);
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(staticPath));

app.use(
  views(viewsPath, {
    extension: 'pug',
  }),
);

// logger
app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next();
  const ms = new Date().getTime() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes());
app.use(users.routes());
app.use(talk.routes());
app.use(browse.routes());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// module.exports = app;
export default app;
