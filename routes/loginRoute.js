import express from "express";
import jwt from "jsonwebtoken";
import connection from "../db/connection.js";
import "dotenv/config";
import bcrypt from "bcrypt";
let router = express.Router();
router.post("/mobile", async (req, res) => {
  let phone = req.body.nameValuePair.phone;
  let password = req.body.nameValuePair.password;
  if (!password || !phone) res.sendStatus(400);
  try {
    let response = await fetchUser("phone", phone);
    if (response.length > 0) {
      let userdata = response[0];
      let is_match = await bcrypt.compare(password, userdata.pass);
      if (is_match) {
        let token = jwt.sign({ id: userdata.userid }, process.env.SECRET_KEY);
        res.json({ token: token });
      } else {
        res.sendStatus(403);
      }
    } else {
      res.sendStatus(403);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(403);
  }
});
router.post("/email", async (req, res) => {
  res.send("working");
});
router.post("/userid", async (req, res) => {
  res.send("working");
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
