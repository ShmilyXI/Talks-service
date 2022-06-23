import Router from 'koa-router';
const router = new Router();

// 用户
const UserController = require('../controller/UserController');

router.prefix('/user');

// 用户注册
router.post('/register', UserController.register);
// 用户登录
router.post('/login', UserController.login);
// 获取用户信息
router.get('/user-info', UserController.getUserInfo);

module.exports = router;
