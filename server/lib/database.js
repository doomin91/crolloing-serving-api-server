const mysql = require('mysql');

const db = mysql.createConnection({
  host:'localhost',
  port: '3306',
  user:'root',
  password:'',
  database:'TODO',
});

db.connect();
module.exports = db;

