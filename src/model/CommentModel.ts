import query from '../sql/query';


// 获取照片评论列表,根据照片id
const getCommentListByPhotoId = async (id: number): Promise<any> =>
  await query(
    `
    select * from comment
    where photo_id = '${id}' and is_delete = 0;
    `,
  );


// 获取照片一级评论列表
const getPhotoCommentList = async (id: number): Promise<any> =>
  await query(
    `
    select
      a.*,
      b.display_name
    from comment
    a LEFT OUTER JOIN user b
      ON a.user_id = b.id
    where photo_id = '${id}' and comment_level = 1 and a.type = 1 and a.is_delete = 0
    ORDER BY top_status desc ,create_time desc;
    `,
  );

// 获取照片二级评论列表
const getChildrenPhotoCommentList = async (
  id: number,
  parentId: number,
): Promise<any> =>
  await query(
    `
    select
      a.*,
      b.display_name
    from comment
    a LEFT OUTER JOIN user b
      ON a.user_id = b.id
    where parent_comment_id = '${parentId}' and photo_id = '${id}' and comment_level = 2 and a.type = 1 and a.is_delete = 0
    ORDER BY create_time;
    `,
  );

// 新增照片评论
const insertPhotoComment = async (
  userId: number,
  userName: string,
  userAvatarUrl: string,
  photoId: number,
  type: number,
  content: string,
  commentLevel: number,
  parentCommentId?: number,
  parentCommentUserId?: number,
  replyCommentId?: number,
  replyCommentUserId?: number,
): Promise<any> => {
  return await query(
    `INSERT INTO comment SET user_id = '${userId}', username = '${userName}', user_avatar_url = '${
      userAvatarUrl || ''
    }', photo_id = '${photoId}', type = '${type}', content = '${content}', comment_level = '${commentLevel}' ${
      parentCommentId ? ', parent_comment_id = ' + parentCommentId : ''
    } ${
      parentCommentUserId
        ? ', parent_comment_user_id = ' + parentCommentUserId
        : ''
    } ${replyCommentId ? ', reply_comment_id = ' + replyCommentId : ''} ${
      replyCommentUserId
        ? ', reply_comment_user_id = ' + replyCommentUserId
        : ''
    };`,
  );
};

// 删除照片评论
const deletePhotoComment = async (id: number): Promise<any> => {
  return await query(`UPDATE comment SET is_delete = 1 WHERE id = '${id}';`);
};

export default {
  getCommentListByPhotoId,
  getPhotoCommentList,
  getChildrenPhotoCommentList,
  insertPhotoComment,
  deletePhotoComment,
};
