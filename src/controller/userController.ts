import {
  JsonController,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Ctx,
  QueryParams,
  Header,
  UploadedFile,
  HeaderParams,
} from 'routing-controllers';

//引入jwt做token验证
import jwt from 'jsonwebtoken';
import check from '../utils/regExp';
//解析token
import tools from '../utils/tool';
import { setTime } from '../utils/util';
import { Context } from 'koa';
import UserModel from '../model/UserModel';
import * as UserTypes from '../types/UserTypes';
import {
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UploadAvatarResponse,
} from '../types/UserTypes';
import { PicGo } from 'picgo';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

//统一设置token有效时间
const expireTime = '999h';

@JsonController('/user')
export default class UserController {
  // 用户注册
  @Post('/register')
  async register(
    @Body() data: UserTypes.UserRegisterRequest,
  ): Promise<UserTypes.UserRegisterResponse> {
    let { name, telephone, password } = data || {};

    if (!check.checkName(name))
      return {
        retCode: '-1',
        message: '用户名格式错误',
      };

    if (!check.checkTel(telephone))
      return {
        retCode: '-1',
        message: '手机号码格式错误',
      };

    if (!check.checkPassword(password))
      return {
        retCode: '-1',
        message: '密码格式错误',
      };

    const names = await UserModel.getUser(name); //用户名是否重复
    const tels = await UserModel.getTelephone(telephone); //手机号是否重复

    if (tels?.length > 0) {
      return {
        retCode: '-2',
        message: '该手机号已注册',
      };
    }

    if (names?.length > 0) {
      return {
        retCode: '-2',
        message: '用户名已存在',
      };
    }

    await UserModel.insert(name, telephone, password);
    const id = (await UserModel.getTelephone(telephone))[0]?.id;
    if (id) await setTime(id, 'create');

    return { retCode: '0', message: '注册成功' };
  }

  // 登录
  @Post('/login')
  async login(
    @Body() data: UserTypes.UserLoginRequest,
  ): Promise<UserTypes.UserLoginResponse> {
    const { telephone, password } = data || {};
    if (!check.checkTel(telephone))
      return {
        retCode: '-1',
        message: '手机号码格式错误',
      };

    if (!check.checkPassword(password))
      return {
        retCode: '-1',
        message: '密码格式错误',
      };

    const res = (await UserModel.getTelephone(telephone))?.[0];
    if (res) {
      if (res?.password === password) {
        //生成token，验证登录有效期
        const token = jwt.sign(
          {
            id: res?.id,
            telephone,
            password,
          },
          '126226',
          { expiresIn: expireTime },
        );
        await setTime(res.id, 'last_login');
        return {
          retCode: '0',
          token,
          data: { id: res?.id },
          message: '登录成功',
        };
      } else {
        return {
          retCode: '-2',
          message: '手机号码或密码不正确',
        };
      }
    } else {
      return { retCode: '-2', message: '手机号码不存在' };
    }
  }

  //获取用户信息
  @Get('/get-user-info')
  async getUserInfo(
    @Ctx() ctx: Context,
    @QueryParams() data: UserTypes.GetUserInfoRequest,
  ): Promise<UserTypes.GetUserInfoResponse> {
    const req = data;
    const token = ctx.headers.authorization;
    if (token) {
      try {
        // 校验token
        await tools.verToken(token);
        if (!req.id) {
          return {
            retCode: '-1',
            message: '参数错误',
          };
        }
        const data = (await UserModel.getUserInfo(req.id))?.[0] || {};
        return {
          retCode: '0',
          data,
          message: '获取用户信息成功',
        };
      } catch (error) {
        ctx.status = 401;
        return {
          retCode: '-1',
          message: '登陆过期，请重新登陆',
        };
      }
    } else {
      ctx.status = 401;
      return {
        retCode: '-1',
        message: '登陆过期，请重新登陆',
      };
    }
  }

  // 上传头像
  @Post('/upload-avatar')
  async uploadAvatar(
    @UploadedFile('UploadForm[file]') file: any,
  ): Promise<UploadAvatarResponse> {
    try {
      const picgo = new PicGo(path.join(__dirname, '../../picgo.config.json'));
      picgo.setConfig({
        'picBed.github.path': 'Talks/Avatars/',
      });
      const defaultFileName = file.originalname;
      const fileName = `${uuidv4(6)}-${defaultFileName}`;

      // 缓存到本地,上传后删除
      await fs.writeFileSync(fileName, file.buffer);
      const response = new Promise((resolve) => {
        picgo.on('finished', (ctx) => {
          resolve({
            retCode: '0',
            data: ctx?.output?.[0]?.imgUrl,
          });
        });
        picgo.on('notification', (notice) => {
          resolve({
            retCode: '-1',
            message: notice?.title,
          });
        });
      });
      await picgo.upload([fileName]);
      await fs.unlinkSync(fileName);
      return response;
    } catch (error) {
      return { retCode: '-1', message: error };
    }
  }

  // 更新用户信息
  @Post('/update-user-info')
  async updateUserInfo(
    @HeaderParams() header,
    @Body() data: UpdateUserInfoRequest,
  ): Promise<UpdateUserInfoResponse> {
    const token = header.authorization;
    const { displayName, avatarUrl, email, userName } = data || {};
    if (!token || !displayName || !avatarUrl || !email || !userName) {
      return { retCode: '-1', message: '参数错误' };
    }
    const tokenInfo: any = await tools.verToken(token);
    const nowDate = new Date();
    const values = {
      ...data,
      createDate: nowDate,
      updateDate: nowDate,
      id: tokenInfo?.id,
    };
    await UserModel.updateUserInfo(values);
    const userInfo = (await UserModel.getUserInfo(tokenInfo?.id))?.[0] || {};

    return {
      retCode: '0',
      data: userInfo,
    };
  }
}
