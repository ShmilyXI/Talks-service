import {
  JsonController,
  Body,
  Get,
  Post,
  QueryParams,
  HeaderParams,
} from 'routing-controllers';

import tools from '../utils/tool';
import _ from 'lodash';
import {
  AddPhotoCommentRequest,
  AddPhotoCommentResponse,
  DeletePhotoCommentRequest,
  DeletePhotoCommentResponse,
  GetPhotoCommentListRequest,
  GetPhotoCommentListResponse,
} from '../types/CommentTypes';
import Models from '../utils/mysql/db';

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

    const commentList: any[] = await Models.comments.findAll({
      where: { photo_id: id, comment_level: 1, type: 1, is_delete: 0 },
      include: {
        model: Models.users,
        required: false,
        as: 'user',
        attributes: ['display_name'],
      },
      order: [
        ['top_status', 'DESC'],
        ['create_time', 'DESC'],
      ],
      nest: true, // 展开关联表数据为对象
      raw: true,
    });
    for (let index = 0; index < commentList.length; index++) {
      const item = commentList[index];
      if (!_.isNil(item.id)) {
        const childrenList: any[] = await Models.comments.findAll({
          where: {
            parent_comment_id: item.id,
            photo_id: id,
            comment_level: 2,
            type: 1,
            is_delete: 0,
          },
          include: {
            model: Models.users,
            required: false,
            as: 'user',
            attributes: ['display_name', 'username'],
          },
          order: [['create_time', 'DESC']],
          nest: true, // 展开关联表数据为对象
          raw: true,
        });
        for (let i = 0; i < childrenList.length; i++) {
          // 如果是子评论的回复内容,则拥有reply_comment_user_id,根据id获取对应用户信息
          const child = childrenList[i];
          // 获取当前用户与当前评论点赞信息
          const likedInfo = await Models.user_likes.findOne({
            where: { liked_id: child.id, liked_type: 1, user_id: tokenInfo.id },
            raw: true,
          });
          if (likedInfo?.id) {
            childrenList[index].likedStatus = likedInfo.liked_status;
          }
          // 获取当前评论点赞数量
          const likedCount = await Models.user_likes.count({
            where: {
              liked_id: child.id,
            },
          });
          childrenList[index].likedCount = likedCount;

          if (!_.isNil(child.reply_comment_user_id)) {
            const replyUserInfo = await Models.users.findOne({
              where: { id: child.reply_comment_user_id },
              attributes: ['id', 'display_name', 'username'],
              raw: true,
            });
            childrenList[i].replyUserInfo = replyUserInfo;
          }
        }

        // 获取当前用户与当前评论点赞信息
        const likedInfo = await Models.user_likes.findOne({
          where: { liked_id: item.id, liked_type: 1, user_id: tokenInfo.id },
          raw: true,
        });
        if (likedInfo?.id) {
          commentList[index].likedStatus = likedInfo.liked_status;
        }
        // 获取当前评论点赞数量
        const likedCount = await Models.user_likes.count({
          where: {
            liked_id: item.id,
          },
        });
        commentList[index].likedCount = likedCount;
        commentList[index].children = childrenList;
      }
    }

    return {
      retCode: '0',
      data: {
        list: commentList,
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
    const userInfo = await Models.users.findOne({
      where: { id: tokenInfo.id },
      raw: true,
    });
    await Models.comments.create({
      user_id: userInfo?.id,
      username: userInfo?.username,
      user_avatar_url: userInfo?.avatar_url,
      photo_id: photoId,
      type,
      content,
      comment_level: commentLevel,
      parent_comment_id: parentCommentId,
      parent_comment_user_id: parentCommentUserId,
      reply_comment_id: replyCommentId,
      reply_comment_user_id: replyCommentUserId,
    });

    return {
      retCode: '0',
    };
  }

  // 删除照片评论
  @Post('/delete-photo-comment')
  async deletePhotoComment(
    @Body() data: DeletePhotoCommentRequest,
  ): Promise<DeletePhotoCommentResponse> {
    const { id } = data || {};
    if (_.isNil(id)) {
      return { retCode: '-1', message: '参数错误' };
    }
    await Models.comments.destroy({
      where: { id },
    });

    return {
      retCode: '0',
    };
  }
}
