const mysql = require('mysql');
const util = require('util');

require('dotenv').config();
let host = process.env.DB_HOST
let port = process.env.DB_PORT
let user = process.env.DB_USER
let password = process.env.DB_PASS
let database = process.env.DB_NAME



const connection = mysql.createConnection({
    
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
    
    
});

connection.query = util.promisify(connection.query)

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});


module.exports = connection;