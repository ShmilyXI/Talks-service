const query = require('../sql/query');
//获取用户
const getUser = async (name: string) =>
  await query(`SELECT * FROM user WHERE name = '${name}'`);

//获取用户手机号
const getTelephone = async (tel: string) =>
  await query(`SELECT * FROM user WHERE telephone = '${tel}'`);

// 获取用户信息
const getUserInfo = async (id: number) =>
  await query(`SELECT * FROM user WHERE id = '${id}'`);

/*
 * title: 设置时间
 * @param {'last_login' | 'create' | 'update'} type 时间字段类型
 */
const setTime = async (id: number, type: 'last_login' | 'create' | 'update') =>
  await query(
    `UPDATE user SET ${type}_date = '${new Date()}' WHERE id = '${id}';`,
  );

//用户注册
const insert = async (name: string, telephone: string, password: string) => {
  return await query(
    `INSERT INTO user(name, telephone, password) VALUES('${name}', '${telephone}', '${password}')`,
  );
};

export default { getUser, getTelephone, getUserInfo, setTime, insert };
