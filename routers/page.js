const express = require("express");
const router = express.Router();

router.route("/register").get((req, res, next) => {
  res.render("register", { title: "註冊" });
});

router.route("/login").get((req, res, next) => {
  res.render("login", { title: "登入" });
});

router.route("/index").get((req, res, next) => {
  res.render("index", { title: "首頁" });
});

module.exports = router;
