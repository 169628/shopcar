const jwt = require("jsonwebtoken");
const config = require("config");

//發送號碼牌
const sendToken = (req, res, code, id) => {
  const token = jwt.sign({ id: id }, config.get("JWT").secret, {
    expiresIn: config.get("JWT").expires,
  });
  req.id = id;
  req.session.token = token;
  res.status(code).json({
    id: req.id,
    token: req.session.token,
    message: "token success!",
  });
};

//檢查號碼牌
const checkToken = (req, res, next) => {
  const token = req.session.token;
  if (!token) {
    res.status(400).json("please login!");
  } else {
    jwt.verify(token, config.get("JWT").secret, (err, result) => {
      if (err) {
        res.status(400).json("token expired!");
      } else {
        req.id = result.id;
        next();
      }
    });
  }
};

module.exports = { sendToken, checkToken };
