import "dotenv/config";
import mysql from "mysql2";
let host = process.env.HOST;
let user = process.env.USER;
let password = process.env.PASSWORD;
let database = process.env.DB;

let connection = mysql.createConnection({
  host,
  user,
  password,
  database,
});
export default connection;
