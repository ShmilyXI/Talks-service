import query from '../sql/query';
//获取用户
const getUser = async (name: string): Promise<any> =>
  await query(`SELECT * FROM user WHERE name = '${name}'`);

export default { getUser };
