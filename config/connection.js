const mysql = require('mysql');
const util = require('util');
const db = require('db')
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306, // Your port; if not 3306
    // Your username
    user: "",
    // Your password
    password: "",
    database: ""
});

connection.query = util.promisify(connection.query)

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});


module.exports = connection;