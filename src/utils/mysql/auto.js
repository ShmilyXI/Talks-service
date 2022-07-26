const SequelizeAuto = require('sequelize-auto')

const auto = new SequelizeAuto('talks', 'root', '1262260527', {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  directory: 'src/models', // 指定输出 models 文件的目录
  lang: 'ts',
  singularize: true, // 将表名转换为单数
  useDefine: true, // 使用 define 定义模型
});

auto.run();
