// 校验姓名
const checkName = (name) => {
  const regExp = /^[\u4E00-\u9FA5A-Za-z0-9_]{3,20}$/;
  return regExp.test(name);
};

// 校验手机号
const checkTel = (tel) => {
  const regExp = /^1[3456789]\d{9}$/;
  return regExp.test(tel);
};

// 校验密码
const checkPassword = (password) => {
  const regExp = /^\w{8,32}$/;
  return regExp.test(password);
};

module.exports = {
  checkName,
  checkTel,
  checkPassword,
};
