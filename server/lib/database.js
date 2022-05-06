const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'3.39.30.117',
    port: '3306',
    user:'root',
    password:'Gumdong1!530',
    database:'TODO',
    connectionLimit : 10,
  });

const promisePool = pool.promise(); 
module.exports = promisePool;