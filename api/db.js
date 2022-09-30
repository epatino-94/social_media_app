const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "springstudent",
    password: "springstudent",
    database:"instapix"
})

module.exports = db;