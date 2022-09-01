const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
require("./db/conn");
const router = require("./Routes/router");




app.use(cors());
app.use(express.json());
app.use(router);


app.get("/",(req,res)=> {
    res.send("Hello from the express");
});
   

app.listen(3001, () => {
    console.log("Running on port 3001");
});