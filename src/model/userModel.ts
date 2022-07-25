import query from '../sql/query';
import { UpdateUserInfoRequest, UserLikedRequest } from '../types/UserTypes';
import _ from 'lodash';

//获取用户
const getUser = async (username: string): Promise<any> =>
  await query(`SELECT * FROM user WHERE username = '${username}';`);

//获取用户手机号
const getTelephone = async (tel: string): Promise<any> =>
  await query(`SELECT * FROM user WHERE telephone = '${tel}';`);

// 获取用户信息
const getUserInfo = async (id: string): Promise<any> =>
  await query(`SELECT * FROM user WHERE id = '${id}';`);

// 更新用户信息
const updateUserInfo = async (
  values: UpdateUserInfoRequest & { id: string },
): Promise<any> => {
  return await query(
    `UPDATE user SET display_name = '${values?.displayName || ''}', email = '${
      values?.email || ''
    }', individual_resume = '${values?.individualResume || ''}', username = '${
      values?.userName || ''
    }', avatar_url = '${values?.avatarUrl || ''}', place = '${
      values?.place || ''
    }', place_id = '${values?.placeId || ''}', location = '${
      values?.location || ''
    }', provincial_name = '${values?.provincialName || ''}', city_name = '${
      values?.cityName || ''
    }', area_name = '${values?.areaName || ''}'
     WHERE id = '${values.id}';`,
  );
};

//用户注册
const insert = async (
  username: string,
  telephone: string,
  password: string,
): Promise<any> => {
  return await query(
    `INSERT INTO user(username,display_name, telephone, password) VALUES('${username}','${username}', '${telephone}', '${password}');`,
  );
};

// 用户点赞
const insertUserLiked = async (
  values: UserLikedRequest & { userId: number },
): Promise<any> => {
  return await query(
    `INSERT INTO user_like(user_id, liked_id, liked_status, liked_type) VALUES('${values.userId}','${values.likedId}', '${values.likedStatus}', '${values.likedType}');`,
  );
};

// 用户修改点赞状态
const updateUserLiked = async (
  id: number,
  likedStatus: number,
): Promise<any> => {
  return await query(
    `UPDATE user_like SET liked_status = '${likedStatus}' WHERE id = '${id}';`,
  );
};

// 获取用户点赞状态
const getUserLikedInfo = async (
  likedType: number,
  likedId: number,
  userId?: number,
  likedStatus?: number,
): Promise<any> =>
  await query(
    `SELECT * FROM user_like WHERE liked_id = '${likedId}' and liked_type = '${likedType}'${
      userId ? ` and user_id = '${userId}'` : ''
    }${!_.isNil(likedStatus) ? ` and liked_status = '${likedStatus}'` : ''};`,
  );

export default {
  getUser,
  getTelephone,
  getUserInfo,
  insert,
  updateUserInfo,
  insertUserLiked,
  updateUserLiked,
  getUserLikedInfo,
};
