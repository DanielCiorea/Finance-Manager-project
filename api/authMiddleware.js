const accessToken = require("./accessToken");

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  try {
    const user = accessToken.decodeAccessToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid access token." });
  }
};

module.exports = authMiddleware;
