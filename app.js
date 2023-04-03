const express = require("express");
const app = express();
const config = require("config");
const bp = require("body-parser");
const session = require("express-session");

//所有router
const accountRouter = require("./routers/account");
const pageRouter = require("./routers/page");
const adminPageRouter = require("./routers/adminPage");
const checkToken = require("./jwt/token").checkToken;

//設定ejs
app.set("view engine", "ejs");

//以下開始middleware
app.use(bp.urlencoded());
app.use(bp.json());

//session初始化
app.use(
  session({
    secret: config.get("SESSION").secret,
    resave: config.get("SESSION").resave,
    saveUninitialized: config.get("SESSION").saveUninitialized,
    name: config.get("SESSION").name,
    cookie: {
      maxAge: config.get("SESSION").maxAge * 60 * 1000,
    },
  })
);

app.use("/", pageRouter); //無token畫面
app.use("/api", accountRouter); //專門管理登入登出api
app.use("/", checkToken, adminPageRouter); //有token畫面

app.listen(config.get("PORT"), () => {
  console.log(`server on at ${config.get("PORT")} port!`);
});
