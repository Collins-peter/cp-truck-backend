import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

//CONNECTING DATABASE
const dataBase = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

dataBase.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("MySQL connected...")
    }
})

export default dataBase;