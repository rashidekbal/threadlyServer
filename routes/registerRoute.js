import express from "express";
import verifyToken from "../middlewares/authorization.js";
import connection from "../db/connection.js";
import verifyAge from "../utils/ageVerfy.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { regusterUserEmailController } from "../Controllers/authController.js";

let route = express.Router();
route.post("/mobile", verifyToken, async (req, res) => {
  let phone = req.ObtainedData.phone;
  let password = req.body.nameValuePairs.password;
  let dob = req.body.nameValuePairs.dob;
  let username = req.body.nameValuePairs.username;
  if (!phone || !password || !dob || !username) {
    return res.sendStatus(400);
  }
  try {
    password = await bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
  }

  let userid = username.split(" ")[0] + Date.now();
  let isAdult = verifyAge(dob);
  let db_query = `insert into users (userid,username,phone,pass,dob) values (?,?,?,?,?)`;
  let data = [`${userid}`, `${username}`, `${phone}`, `${password}`, `${dob}`];
  if (!isAdult) {
    return res.sendStatus(403);
  } else {
    connection.query(db_query, data, (err, response) => {
      if (!err) {
        let token = jwt.sign(userid, process.env.SECRET_KEY);
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
route.post("/email", verifyToken, regusterUserEmailController);

export default route;
