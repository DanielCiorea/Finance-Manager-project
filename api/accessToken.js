const jwt = require("jsonwebtoken");

const secretKey = "!@#^$%ULTRA^secret&KEY!%*!*";

exports.createAccessToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, name: user.name }, secretKey);

exports.decodeAccessToken = (token) => jwt.verify(token, secretKey);
