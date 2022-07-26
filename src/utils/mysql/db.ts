import { Sequelize } from 'sequelize';
import { initModels } from '../../models/init-models';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '127.0.0.1', //服务器地址
  port: 3306, //数据库端口
  username: 'root',
  password: '1262260527',
  database: 'talks',
  logging: true, // logging: true, 打印sql到控制台
  timezone: '+08:00', //时间上的统一,这里是东八区，默认为0时区
});
// 测试连接是否成功
sequelize
  .authenticate()
  .then(() => {
    console.log('数据库已成功建立连接。');
  })
  .catch((error) => {
    console.error('数据库连接失败', error);
    throw error;
  });

export default initModels(sequelize);
