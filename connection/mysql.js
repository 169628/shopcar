const mysql = require("mysql");
const config = require("config");

//mysql初始化
const mysqlConnection = mysql.createConnection({
  host: config.get("MYSQL").host,
  user: config.get("MYSQL").user,
  password: config.get("MYSQL").password,
  database: config.get("MYSQL").database,
});

mysqlConnection.connect(() => {
  console.log("mysql database connected!");
});

module.exports = mysqlConnection;
