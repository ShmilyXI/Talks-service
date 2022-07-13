import query from '../sql/query';
import { UpdateUserInfoRequest } from '../types/UserTypes';
//获取用户
const getUser = async (name: string): Promise<any> =>
  await query(`SELECT * FROM user WHERE name = '${name}';`);

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
    `UPDATE user SET display_name = '${values.displayName}', email = '${values.email}', individual_resume = '${values.individualResume}', location = '${values.location}', username = '${values.userName}', avatar_url = '${values.avatarUrl}' WHERE id = '${values.id}';`,
  );
};

//用户注册
const insert = async (
  name: string,
  telephone: string,
  password: string,
): Promise<any> => {
  return await query(
    `INSERT INTO user(name, telephone, password) VALUES('${name}', '${telephone}', '${password}');`,
  );
};

export default { getUser, getTelephone, getUserInfo, insert, updateUserInfo };
