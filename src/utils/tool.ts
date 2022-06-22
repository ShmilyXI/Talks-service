const getToken = require('jsonwebtoken');

const verToken = function (token) {
  return new Promise((resolve, rejece) => {
    const info = getToken.verify(token.split(' ')[1], '126226');
    resolve(info);
  });
};
export { verToken };
