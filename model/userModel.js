const query = require('../sql/query');
class UserModel {
  //获取用户
  async getUser(name) {
    return await query(`SELECT * FROM user WHERE name = '${name}'`);
  }
  //获取用户手机号
  async getTelephone(tel) {
    return await query(`SELECT * FROM user WHERE telephone = '${tel}'`);
  }
  // 获取用户信息
  async getUserInfo(id) {
    return await query(`SELECT * FROM user WHERE id = '${id}'`);
  }
  //用户注册
  async insert(name, telephone, password) {
    return await query(
      `INSERT INTO user(name, telephone, password) VALUES('${name}', '${telephone}', '${password}')`,
    );
  }
}
module.exports = new UserModel();
