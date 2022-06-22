const query = require('../sql/query');
class UserModel {
  //获取用户
  getUser = async (name) =>
    await query(`SELECT * FROM user WHERE name = '${name}'`);

  //获取用户手机号
  getTelephone = async (tel) =>
    await query(`SELECT * FROM user WHERE telephone = '${tel}'`);

  // 获取用户信息
  getUserInfo = async (id) =>
    await query(`SELECT * FROM user WHERE id = '${id}'`);

  //用户注册
  insert = async (name, telephone, password) =>
    await query(
      `INSERT INTO user(name, telephone, password) VALUES('${name}', '${telephone}', '${password}')`,
    );
}
export default new UserModel();
