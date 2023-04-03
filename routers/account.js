const express = require("express");
const router = express.Router();
const mysqlConnection = require("../connection/mysql");
const bcrypt = require("bcrypt");
const sendToken = require("../jwt/token").sendToken;

//註冊
router.route("/register").post(async (req, res, next) => {
  const { account, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);
  mysqlConnection.query(
    "insert into account(account,password) value(?,?)",
    [account, hashPassword],
    (err, result) => {
      if (err) {
        res.status(400).json("bad request!");
      } else {
        res.status(201).json({
          account: account,
          message: "insert success!",
        });
      }
    }
  );
});

//登入
router.route("/login").post(async (req, res, next) => {
  const { account, password } = req.body;
  mysqlConnection.query(
    "select * from account where account = ?",
    [account],
    async (err, result) => {
      if (err) {
        res.status(400).json("please register!");
      } else {
        const check = await bcrypt.compare(password, result[0].password);
        const id = result[0].id;
        if (!check) {
          res.status(400).json("wrong password");
        } else {
          sendToken(req, res, 200, id);
        }
      }
    }
  );
});

//登出
router.route("/logout").get((req, res, next) => {
  delete req.session.sendToken;
  res.status(200).json("logout success!");
});

module.exports = router;
