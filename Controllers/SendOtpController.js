import request from "request";
import connection from "../db/connection.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

//generate anmd store and send otp model
let sendOtp = (req, res) => {
  let OTP = Math.floor(100000 + Math.random() * 900000);
  let phone = req.body.nameValuePairs.phone;
  let query = `insert into otpmodel (phone,otp) values ('${phone}',${OTP})`;
  connection.query(query, (err, result) => {
    if (!err) {
      let options = {
        method: "POST",
        url: "https://dbuddyz.com/send/",
        formData: {
          token: process.env.DBUDDY_API_KEY,
          otp: OTP,
          tonumber: `+91` + phone,
        },
      };
      request(options, (error, response) => {
        if (!error) {
          res.json({ message: "sucess", statuscode: response.statusCode });
        } else {
          res.sendStatus(500);
        }
      });
    } else {
      res.sendStatus(500);
    }
  });
};

//otp verify model
function verifyOtp(req, res) {
  let otp = req.body.nameValuePairs.otp;
  let phone = req.body.nameValuePairs.phone;
  if (!otp || !phone) return res.sendStatus(400);
  let query = `SELECT * FROM otpmodel WHERE phone= ? AND otp=? AND createdAt >=NOW() -INTERVAL 5 MINUTE AND flag='false' `;
  connection.query(query, [phone, otp], (err, response) => {
    if (!err) {
      if (response.length > 0) {
        let token = jwt.sign({ phone: phone }, process.env.SECRET_KEY, {
          expiresIn: "5m",
        });
        connection.query(
          `delete from otpmodel WHERE phone= '${phone}' AND otp='${otp}'`,
          (error, result) => {}
        );
        res.json({ token: token });
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(500).json({ msg: "something went wrong" });
    }
  });
}

export { sendOtp, verifyOtp };
