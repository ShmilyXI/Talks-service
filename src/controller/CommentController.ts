import {
  JsonController,
  Body,
  Get,
  Post,
  QueryParams,
  HeaderParams,
} from 'routing-controllers';

import tools from '../utils/tool';
import CommentModel from '../model/CommentModel';
import _ from 'lodash';
import { AddPhotoCommentRequest, AddPhotoCommentResponse, DeletePhotoCommentRequest, DeletePhotoCommentResponse, GetPhotoCommentListRequest, GetPhotoCommentListResponse } from '../types/CommentTypes';
import UserModel from '../model/UserModel';

@JsonController('/comment')
export default class PhotoController {
  // 获取照片评论列表
  @Get('/get-photo-comment-list')
  async getPhotoCommentList(
    @HeaderParams() header,
    @QueryParams() data: GetPhotoCommentListRequest,
  ): Promise<GetPhotoCommentListResponse> {
    const { id } = data;
    const token = header.authorization;
    const tokenInfo: any = await tools.verToken(token);

    let list = await CommentModel.getPhotoCommentList(id);
    for (let index = 0; index < list.length; index++) {
      const item = list[index];
      if (!_.isNil(item.id)) {
        const children =
          (await CommentModel.getChildrenPhotoCommentList(id, item.id)) || [];
        for (let i = 0; i < children.length; i++) {
          // 如果是子评论的回复内容,则拥有reply_comment_user_id,根据id获取对应用户信息
          const child = children[i];
          // 获取所有用户与当前评论点赞信息
          const likedAllInfo = await UserModel.getUserLikedInfo(
            1,
            child?.id,
            null,
            1,
          );
          // 获取当前用户与当前评论点赞信息
          const curLikedInfo = likedAllInfo.find(
            (v) => v.user_id === tokenInfo?.id,
          );
          if (curLikedInfo?.id) {
            children[i].likedStatus = curLikedInfo.liked_status;
          }
          if (likedAllInfo?.length) {
            children[i].liked_count = likedAllInfo.length;
          }
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
        // 获取所有用户与当前评论点赞信息
        const likedAllInfo = await UserModel.getUserLikedInfo(
          1,
          item.id,
          null,
          1,
        );
        // 获取当前用户与当前评论点赞信息
        const curLikedInfo = likedAllInfo.find(
          (v) => v.user_id === tokenInfo?.id,
        );
        if (curLikedInfo?.id) {
          list[index].likedStatus = curLikedInfo.liked_status;
        }
        if (likedAllInfo?.length) {
          list[index].liked_count = likedAllInfo.length;
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
  // 新增照片评论
  @Post('/add-photo-comment')
  async addPhotoComment(
    @HeaderParams() header,
    @Body() data: AddPhotoCommentRequest,
  ): Promise<AddPhotoCommentResponse> {
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

  // 删除照片评论
  @Post('/delete-photo-comment')
  async deletePhotoComment(@Body() data: DeletePhotoCommentRequest): Promise<DeletePhotoCommentResponse> {
    const { id } = data || {};
    if (_.isNil(id)) {
      return { retCode: '-1', message: '参数错误' };
    }
    const result = await CommentModel.deletePhotoComment(
     id
    );

    return {
      retCode: '0',
      data: { id: result?.insertId },
    };
  }
}
