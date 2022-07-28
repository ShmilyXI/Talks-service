import {
  JsonController,
  Body,
  Get,
  Post,
  Ctx,
  QueryParams,
  UploadedFile,
  HeaderParams,
} from 'routing-controllers';

//引入jwt做token验证
import jwt from 'jsonwebtoken';
import check from '../utils/regExp';
//解析token
import tools from '../utils/tool';
import { Context } from 'koa';
import * as UserTypes from '../types/UserTypes';
import {
  UpdateUserInfoRequest,
  UpdateUserInfoResponse,
  UploadAvatarResponse,
  UserLikedRequest,
  UserLikedResponse,
  UserPhotoFavoriteRequest,
  UserPhotoFavoriteResponse,
} from '../types/UserTypes';
import { PicGo } from 'picgo';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import _ from 'lodash';
import Models from '../utils/mysql/db';

//统一设置token有效时间
const expireTime = '999h';

@JsonController('/user')
export default class UserController {
  // 用户注册
  @Post('/register')
  async register(
    @Body() data: UserTypes.UserRegisterRequest,
  ): Promise<UserTypes.UserRegisterResponse> {
    let { username, telephone, password } = data || {};
    if (!check.checkName(username))
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

    // 用户名是否重复
    const _nameInfo = await Models.users.findOne({
      where: { username },
      raw: true,
    });
    if (_nameInfo?.id) {
      return {
        retCode: '-2',
        message: '用户名已存在',
      };
    }
    // 手机号是否重复
    const _telephoneInfo = await Models.users.findOne({
      where: { telephone },
      raw: true,
    });
    if (_telephoneInfo) {
      return {
        retCode: '-2',
        message: '该手机号已注册',
      };
    }
    await Models.users.create({
      username,
      display_name: username,
      telephone,
      password,
    });

    return { retCode: '0' };
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

    const userInfo = await Models.users.findOne({
      where: { telephone },
      raw: true,
    });
    if (userInfo) {
      if (userInfo?.password === password) {
        //生成token，验证登录有效期
        const token = jwt.sign(
          {
            id: userInfo?.id,
            username: userInfo?.username,
            telephone,
            password,
          },
          '126226',
          { expiresIn: expireTime },
        );
        return {
          retCode: '0',
          token,
          data: { id: userInfo?.id },
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
        const userInfo = await Models.users.findOne({
          where: { id: req.id },
          raw: true,
        });
        return {
          retCode: '0',
          data: userInfo,
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
    if (
      _.isNil(token) ||
      _.isNil(displayName) ||
      _.isNil(avatarUrl) ||
      _.isNil(email) ||
      _.isNil(userName)
    ) {
      return { retCode: '-1', message: '参数错误' };
    }
    const tokenInfo: any = await tools.verToken(token);
    await Models.users.update(
      {
        display_name: displayName,
        avatar_url: avatarUrl,
        email,
        username: userName,
        individual_resume: data?.individualResume,
        place: data?.place,
        place_id: data?.placeId,
        location: data?.location,
        provincial_name: data?.provincialName,
        city_name: data?.cityName,
        area_name: data?.areaName,
      },
      { where: { id: tokenInfo?.id } },
    );
    const userInfo = await Models.users.findOne({
      where: { id: tokenInfo?.id },
      raw: true,
    });

    return {
      retCode: '0',
      data: userInfo,
    };
  }

  // 用户点赞
  @Post('/user-liked')
  async userLiked(
    @HeaderParams() header,
    @Body() data: UserLikedRequest,
  ): Promise<UserLikedResponse> {
    const token = header.authorization;
    const { likedId, likedStatus, likedType } = data || {};

    if (_.isNil(likedId) || _.isNil(likedStatus) || _.isNil(likedType)) {
      return { retCode: '-1', message: '参数错误' };
    }

    const tokenInfo: any = await tools.verToken(token);

    const likedInfo = await Models.user_likes.findOne({
      where: { liked_id: likedId, liked_type: likedType },
      raw: true,
    });

    if (likedInfo?.id) {
      await Models.user_likes.update(
        {
          liked_status: likedStatus,
        },
        { where: { id: likedInfo?.id } },
      );
    } else {
      await Models.user_likes.create({
        user_id: tokenInfo?.id,
        liked_id: likedId,
        liked_type: likedType,
        liked_status: likedStatus,
      });
    }

    return {
      retCode: '0',
      data: likedInfo,
    };
  }

  // 用户收藏
  @Post('/user-photo-favorite')
  async userFavorite(
    @HeaderParams() header,
    @Body() data: UserPhotoFavoriteRequest,
  ): Promise<UserPhotoFavoriteResponse> {
    const token = header.authorization;
    const { photoId, favoriteStatus } = data || {};

    if (_.isNil(photoId) || _.isNil(favoriteStatus)) {
      return { retCode: '-1', message: '参数错误' };
    }

    const tokenInfo: any = await tools.verToken(token);
    const favoriteInfo = await Models.photo_favorites.findOne({
      where: { photo_id: photoId, user_id: tokenInfo?.id },
      raw: true,
    });

    if (favoriteInfo?.id) {
      await Models.photo_favorites.update(
        {
          favorite_status: favoriteStatus,
        },
        { where: { id: favoriteInfo?.id } },
      );
    } else {
      await Models.photo_favorites.create({
        user_id: tokenInfo?.id,
        photo_id: photoId,
        favorite_status: favoriteStatus,
      });
    }

    return {
      retCode: '0',
      data: favoriteInfo,
    };
  }
}
