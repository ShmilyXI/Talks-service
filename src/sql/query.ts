import mysql from 'mysql';
import config from './config';

//创建连接池
const pool = mysql.createPool(config);
const query = (sql: string, val?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, val, (err, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve(fields);
          }
          connection.release();
        });
      }
    });
  });
};

export default query;
