import express from "express";
import jwt from "jsonwebtoken";
import connection from "../db/connection.js";
import "dotenv/config";
import bcrypt from "bcrypt";
let router = express.Router();
router.post("/mobile", async (req, res) => {
  let Obtained = req.body.nameValuePairs;
  if (Obtained == null) return res.sendStatus(400);
  let phone = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !phone) return res.sendStatus(400);
  try {
    let response = await fetchUser("phone", phone);
    if (response.length > 0) {
      let userdata = response[0];
      let is_match = await bcrypt.compare(password, userdata.pass);
      if (is_match) {
        let token = jwt.sign(userdata.userid, process.env.SECRET_KEY);
        res.json({
          message: "sucess",
          username: userdata.username,
          profile: userdata.profilepic,
          userid: userdata.userid,
          token: token,
        });
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    res.sendStatus(403);
  }
});
router.post("/email", async (req, res) => {
  let email = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !email) return res.sendStatus(400);
  try {
    let response = await fetchUser("email", email);
    if (response.length > 0) {
      let userdata = response[0];
      let is_match = await bcrypt.compare(password, userdata.pass);
      if (is_match) {
        let token = jwt.sign(userdata.userid, process.env.SECRET_KEY);
        res.json({
          message: "sucess",
          username: userdata.username,
          profile: userdata.profilepic,
          userid: userdata.userid,
          token: token,
        });
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    res.sendStatus(403);
  }
});
router.post("/userid", async (req, res) => {
  let userid = req.body.nameValuePairs.userid;
  let password = req.body.nameValuePairs.password;
  if (!password || !userid) return res.sendStatus(400);
  try {
    let response = await fetchUser("userid", userid);
    if (response.length > 0) {
      let userdata = response[0];
      let is_match = await bcrypt.compare(password, userdata.pass);
      if (is_match) {
        let token = jwt.sign(userdata.userid, process.env.SECRET_KEY);
        res.json({
          message: "sucess",
          username: userdata.username,
          profile: userdata.profilepic,
          userid: userdata.userid,
          token: token,
        });
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    res.sendStatus(403);
  }
});

function fetchUser(column, data) {
  let query = `select * from users where ${column} = ?`;
  return new Promise((resolve, reject) => {
    connection.query(query, [data], (err, response) => {
      if (!err) resolve(response);
      else reject(err);
    });
  });
}

export default router;
