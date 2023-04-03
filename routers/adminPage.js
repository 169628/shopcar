const express = require("express");
const router = express.Router();

router.route("/car/:id").get((req, res, next) => {
  res.render("shopCar", { title: "購物車" });
});

router.route("/index/:id").get((req, res, next) => {
  res.render("index", { title: "首頁" });
});

module.exports = router;
