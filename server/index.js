const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
require("./db/conn");
const router = require("./Routes/router");
const path =require('path');
require('dotenv').config({
    path:path.join(__dirname,'.env')
});



app.use('/public',express.static('public'));
app.use(cors());
app.use(express.json());
app.use(router);


app.get("/",(req,res)=> {
    res.send("Hello from the express");
});
   

app.listen(3001, () => {
    console.log("Running on port 3001");
});