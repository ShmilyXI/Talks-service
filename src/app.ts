import 'reflect-metadata';
import Koa from 'koa'; // 导入koa
import path from 'path';
import logger from 'koa-logger'; // 导入日志
import views from 'koa-views';
import json from 'koa-json';
import onerror from 'koa-onerror';
import koabodyparser from 'koa-bodyparser';
import koajwt from 'koa-jwt';
import { createKoaServer, useContainer } from 'routing-controllers';

import UserController from './controller/UserController';
import PhotoController from './controller/PhotoController';
import CommunityController from './controller/CommunityController';

const app = createKoaServer({
  controllers: [UserController, PhotoController, CommunityController], // we specify controllers we want to use
});

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
  koabodyparser({
    enableTypes: ['json', 'form', 'text'],
    jsonLimit: '10mb',
    formLimit: '10mb',
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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

// module.exports = app;
export default app;
