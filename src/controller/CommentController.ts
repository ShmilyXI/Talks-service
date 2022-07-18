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
  UploadedFile,
  Header,
  HeaderParam,
  HeaderParams,
} from 'routing-controllers';

import { setTime } from '../utils/util';
import tools from '../utils/tool';
import { Context } from 'koa';
import CommentModel from '../model/CommentModel';
import * as PhotoTypes from '../types/PhotoTypes';
import _ from 'lodash';
import path from 'path';
import { PicGo } from 'picgo';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import {} from '../types/CommentTypes';
import UserModel from '../model/UserModel';

@JsonController('/comment')
export default class PhotoController {
  // 获取照片评论列表
  @Get('/get-photo-comment-list')
  async galleryPhotoList(@QueryParams() data: any): Promise<any> {
    const { id } = data;
    let list = await CommentModel.getPhotoCommentList(id);
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      if (!_.isNil(item.id)) {
        const children =
          (await CommentModel.getChildrenPhotoCommentList(id, item.id)) || [];
        for (let i = 0; i < children.length; i++) {
          // 如果是子评论的回复内容,则拥有reply_comment_user_id,根据id获取对应用户信息
          const child = children[i];
          if (!_.isNil(child.reply_comment_user_id)) {
            const replyUserInfo = (
              await UserModel.getUserInfo(child.reply_comment_user_id)
            )[0];
            children[i].replyUserInfo = _.pick(replyUserInfo, [
              'id',
              'display_name',
              'username',
            ]);
          }
        }
        list[index].children = children;
      }
    }

    return {
      retCode: '0',
      data: {
        list,
      },
    };
  }
  // 新增评论
  @Post('/add-photo-comment')
  async addPhotoComment(
    @HeaderParams() header,
    @Body() data: any,
  ): Promise<any> {
    const token = header.authorization;
    const {
      photoId,
      content,
      commentLevel,
      type,
      parentCommentId,
      parentCommentUserId,
      replyCommentId,
      replyCommentUserId,
    } = data || {};
    if (
      _.isNil(photoId) ||
      _.isNil(content) ||
      _.isNil(commentLevel) ||
      _.isNil(type) ||
      (commentLevel === 2 &&
        (_.isNil(parentCommentId) || _.isNil(parentCommentUserId)))
    ) {
      return { retCode: '-1', message: '参数错误' };
    }
    const tokenInfo: any = await tools.verToken(token);
    const userInfo = (await UserModel.getUserInfo(tokenInfo.id))[0];
    const result = await CommentModel.insertPhotoComment(
      userInfo?.id,
      userInfo?.username,
      userInfo?.avatar_url,
      photoId,
      type,
      content,
      commentLevel,
      parentCommentId,
      parentCommentUserId,
      replyCommentId,
      replyCommentUserId,
    );

    return {
      retCode: '0',
      data: { id: result?.insertId },
    };
  }
}
