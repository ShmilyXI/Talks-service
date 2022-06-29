import query from '../sql/query';
//获取用户
const getUser = async (name: string): Promise<any> =>
  await query(`SELECT * FROM user WHERE name = '${name}'`);

//获取用户手机号
const getTelephone = async (tel: string): Promise<any> =>
  await query(`SELECT * FROM user WHERE telephone = '${tel}'`);

// 获取用户信息
const getUserInfo = async (id: number): Promise<any> =>
  await query(`SELECT * FROM user WHERE id = '${id}'`);

//用户注册
const insert = async (
  name: string,
  telephone: string,
  password: string,
): Promise<any> => {
  return await query(
    `INSERT INTO user(name, telephone, password) VALUES('${name}', '${telephone}', '${password}')`,
  );
};

export default { getUser, getTelephone, getUserInfo, insert };
