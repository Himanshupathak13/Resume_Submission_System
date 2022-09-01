const mysql = require("mysql2");

const conn = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Dabra@1234",
    database: "crudmysql",
});

conn.connect((err) =>{
    if(err) throw err;
    console.log("Database connected successfully");
});

module.exports = conn;