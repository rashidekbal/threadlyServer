import express from "express";
import verifyToken from "../middlewares/authorization.js";
import connection from "../db/connection.js";
import verifyAge from "../utils/ageVerfy.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

let route = express.Router();
route.post("/mobile", verifyToken, (req, res) => {
  let phone = req.ObtainedData.phone;
  let password = req.body.nameValuePairs.password;
  let dob = req.body.nameValuePairs.dob;
  let username = req.body.nameValuePairs.username;
  if (!phone || !password || !dob || !username) {
    return res.sendStatus(400);
  }

  let userid = username.split(" ")[0] + Date.now();
  let isAdult = verifyAge(dob);
  let db_query = `insert into users (userid,username,phone,pass,dob) values (?,?,?,?,?)`;
  let data = [`${userid}`, `${username}`, `${phone}`, `${password}`, `${dob}`];
  if (!isAdult) {
    res.sendStatus(403);
  } else {
    connection.query(db_query, data, (err, response) => {
      if (!err) {
        let token = jwt.sign(userid, process.env.SECRET_TOKEN);
        res.json({
          message: "sucess",
          username: username,
          profile: null,
          userid: userid,
          token: token,
        });
      } else {
        res.sendStatus(500);
      }
    });
  }
});
route.post("/email", (req, res) => {
  res.send("route working");
});

export default route;
