import User from '../model/userModel';
//引入jwt做token验证
import jwt from 'jsonwebtoken';
import check from '../utils/regExp';
//解析token
import tools from '../utils/tool';

//统一设置token有效时间
const expireTime = '999h';

class UserController {
  // 用户注册
  async register(ctx: any) {
    let { name, telephone, password } = ctx.request.body;

    if (!check.checkName(name))
      return (ctx.body = {
        type: 'warning',
        code: '-1',
        message: '用户名格式错误',
      });

    if (!check.checkTel(telephone))
      return (ctx.body = {
        type: 'warning',
        code: '-1',
        message: '手机号码格式错误',
      });

    if (!check.checkPassword(password))
      return (ctx.body = {
        type: 'warning',
        code: '-1',
        message: '密码格式错误',
      });

    const names = await User.getUser(name); //用户名是否重复
    const tels = await User.getTelephone(telephone); //手机号是否重复

    if (tels.length > 0) {
      return (ctx.body = {
        type: 'error',
        code: '-2',
        message: '该手机号已注册',
      });
    }

    if (names.length > 0) {
      return (ctx.body = {
        type: 'error',
        code: '-2',
        message: '用户名已存在',
      });
    }

    await User.insert(name, telephone, password);
    const id = (await User.getTelephone(telephone))[0]?.id;
    if (id) await User.setTime(id, 'create');

    ctx.body = { type: 'success', code: '0', message: '注册成功' };
  }

  // 登录
  async login(ctx: any) {
    let telephone = ctx.request.body.telephone;
    let password = ctx.request.body.password;

    if (!check.checkTel(telephone))
      return (ctx.body = {
        type: 'warning',
        code: '-1',
        message: '手机号码格式错误',
      });

    if (!check.checkPassword(password))
      return (ctx.body = {
        type: 'warning',
        code: '-1',
        message: '密码格式错误',
      });

    const res = (await User.getTelephone(telephone))[0];
    if (res) {
      if (res.password === password) {
        //生成token，验证登录有效期
        const token = jwt.sign(
          {
            id: res.id,
            telephone,
            password,
          },
          '126226',
          { expiresIn: expireTime },
        );
        const userInfo = {
          id: res.id,
          name: res.name,
          telephone: res.telephone,
        };
        await User.setTime(res.id, 'last_login');
        ctx.body = {
          code: '0',
          data: userInfo,
          token,
          message: '登录成功',
          type: 'success',
        };
      } else {
        ctx.body = {
          type: 'error',
          code: '-2',
          message: '手机号码或密码不正确',
        };
      }
    } else {
      ctx.body = { type: 'error', code: '-2', message: '手机号码不存在' };
    }
  }

  //获取用户信息
  async getUserInfo(ctx: any) {
    const req = ctx.query;
    const token = ctx.headers.authorization;
    if (token) {
      try {
        // 校验token
        await tools.verToken(token);
        if (!req.id) {
          return (ctx.body = {
            code: '-1',
            message: '参数错误',
          });
        }
        let data = (await User.getUserInfo(req.id))[0];
        if (+req.id === data.id) {
          const userInfo = {
            id: data.id,
            name: data.name,
            telephone: data.telephone,
          };
          return (ctx.body = {
            code: '0',
            data: userInfo,
            message: '获取用户信息成功',
          });
        }
      } catch (error) {
        ctx.status = 401;
        return (ctx.body = {
          code: '-1',
          message: '登陆过期，请重新登陆',
        });
      }
    } else {
      ctx.status = 401;
      return (ctx.body = {
        code: '-1',
        message: '登陆过期，请重新登陆',
      });
    }
  }
}
module.exports = new UserController();
