import "dotenv/config";
import mysql from "mysql2";
let host = process.env.DB_HOST;
let user = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let database = process.env.DB;
let port=process.env.DB_PORT;

let connection = mysql.createConnection({
  port,
  host,
  user,
  password,
  database,
});
export default connection;
